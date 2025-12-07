# Food Safety Scanner

An AI-powered Next.js application for analyzing food safety using Google's Gemini API and Firebase.

## Features

- 🖼️ **Image Upload**: Drag-and-drop or click to upload food images
- 🤖 **AI Analysis**: Powered by Google Gemini AI for intelligent food safety assessment
- 📊 **Safety Meter**: Visual gauge showing safety scores (0-100)
- 🔍 **OCR Support**: Tesseract.js for reading labels and expiration dates
- 🔥 **Firebase Integration**: Authentication and Firestore database
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Built with Tailwind CSS and Lucide icons

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API
- **Backend**: Firebase (Auth + Firestore)
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **OCR**: Tesseract.js
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase project created
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prototype
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration
   - Add your Gemini API key

```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Required environment variables (see `.env.example`):

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `GEMINI_API_KEY`

## Project Structure

```
prototype/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── analyze/       # Image analysis endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── FileUpload.tsx     # File upload component
│   ├── SafetyMeter.tsx    # Safety gauge component
│   └── AnalysisResults.tsx # Results display
├── lib/                   # Utility functions
│   ├── firebase.ts        # Firebase configuration
│   ├── gemini.ts          # Gemini AI integration
│   ├── ocr.ts             # OCR functionality
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript definitions
│   └── index.ts           # Type interfaces
└── public/               # Static assets
```

## Key Components

### FileUpload
Drag-and-drop file upload component with validation for image types and sizes.

### SafetyMeter
Visual gauge using Recharts to display safety scores with color-coded status indicators.

### AnalysisResults
Displays AI-generated findings and recommendations from food safety analysis.

## API Routes

### POST /api/analyze
Analyzes uploaded food images using Gemini AI.

**Request Body:**
```json
{
  "imageData": "base64-encoded-image"
}
```

**Response:**
```json
{
  "safetyScore": 85,
  "status": "safe",
  "findings": ["..."],
  "recommendations": ["..."],
  "rawResponse": "..."
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
