# Colorfy

Project integrating Gemini AI for color analysis or similar features.

## Prerequisites

- Node.js installed

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   - Duplicate `.env.example` and rename it to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your `GEMINI_API_KEY`.

## Running the Project

To start the server:

```bash
npm start
```

## Structure

- `api/`: Backend API routes
- `Frontend/`: Frontend source code
- `gemini.js`: Gemini AI integration logic
- `server.js`: Main server entry point
