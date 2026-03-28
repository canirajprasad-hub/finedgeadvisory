import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(express.json());

// Google Sheets API Setup
const getSheetsClient = () => {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    console.warn("⚠️ Google Sheets credentials missing.");
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
        error: "Google Sheets integration not configured. Please set up API credentials in Netlify Environment Variables." 
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

export const handler = serverless(app);
