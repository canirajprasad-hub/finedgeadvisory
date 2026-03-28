import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets API Setup
  const getSheetsClient = () => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      console.warn("⚠️ Google Sheets credentials missing. Please set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in the Secrets panel.");
      return null;
    }

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      return google.sheets({ version: 'v4', auth });
    } catch (error) {
      console.error("❌ Failed to initialize Google Sheets client:", error);
      return null;
    }
  };

  const SPREADSHEET_ID = '1ryjuko3GoSXGdZ7geqIbdGcpQxO4K1NuHyu3ocwVMmc';

  // API Route for Consultation Form
  app.post("/api/consultation", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;
      
      if (!name || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const sheets = getSheetsClient();
      if (!sheets) {
        return res.status(503).json({ 
          error: "Google Sheets integration not configured. Please contact the administrator to set up API credentials." 
        });
      }

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:E',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            new Date().toISOString(),
            name,
            email,
            phone,
            message || ""
          ]],
        },
      });

      res.json({ success: true, message: "Data submitted successfully" });
    } catch (error) {
      console.error("Google Sheets Error:", error);
      res.status(500).json({ error: "Failed to submit to Google Sheets" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
