# FinEdge Advisory Landing Page

A modern, professional, and responsive landing page for **FinEdge Advisory**, a financial services firm specializing in accounting, taxation, and corporate compliance in India.

## Features

- **Modern UI/UX**: Professional blue and white theme with high-quality typography.
- **Dark Mode**: Integrated dark mode toggle for a premium viewing experience.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Google Sheets Integration**: "Free Consultation" form submissions are automatically logged to a Google Sheet.
- **Serverless Ready**: Configured for deployment on **Netlify** using Netlify Functions.
- **Animations**: Smooth transitions and entry animations using `motion`.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Motion.
- **Backend**: Express.js (Local), Netlify Functions (Production).
- **Integration**: Google Sheets API (googleapis).

## Setup & Local Development

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd finedge-advisory
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Google Sheets credentials:
   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account-email@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Key-Here\n-----END PRIVATE KEY-----\n"
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Deployment

### Netlify (Recommended)

This project is pre-configured for Netlify.

1. Connect your GitHub repository to Netlify.
2. In the Netlify dashboard, go to **Site settings > Environment variables**.
3. Add `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY`.
4. Netlify will automatically detect the `netlify.toml` and deploy the site.

## License

This project is for private use by FinEdge Advisory.
