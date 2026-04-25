import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { GoogleGenAI } from "@google/genai";

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());

  // --- Mock Data Simulation ---
  let matchData = {
    teams: { home: 'MI', visitor: 'CSK' },
    score: { runs: 156, wickets: 4, overs: 17.2 },
    target: 182,
    status: 'Live',
    timestamp: Date.now()
  };

  // Simulate "Live" updates
  setInterval(() => {
    if (matchData.score.overs < 19.5) {
      matchData.score.overs = parseFloat((matchData.score.overs + 0.1).toFixed(1));
      if (matchData.score.overs % 1 === 0.6) matchData.score.overs = Math.floor(matchData.score.overs) + 1.0;
      matchData.score.runs += Math.floor(Math.random() * 4);
      if (Math.random() > 0.95) matchData.score.wickets += 1;
      matchData.timestamp = Date.now();
    }
  }, 10000);

  // --- Auth Middleware ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // --- API Routes ---
  app.post('/api/auth/signup', (req, res) => {
    const { email, password, stadium } = req.body;
    // Mock user storage
    const token = jwt.sign({ email, stadium }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    res.json({ email, stadium, message: 'Signup successful' });
  });

  app.post('/api/auth/login', (req, res) => {
    const { email, stadium } = req.body;
    const token = jwt.sign({ email, stadium }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    res.json({ email, stadium, message: 'Login successful' });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  });

  app.get('/api/auth/me', authenticateToken, (req: any, res) => {
    res.json({ user: req.user });
  });

  app.get('/api/match/live', (req, res) => {
    res.json(matchData);
  });

  app.post('/api/ai/predict', async (req, res) => {
    const { match } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback response if no API key
    const fallbackResponse = {
      estimatedEndTime: "10:45 PM",
      recommendation: "Leave at 19th over",
      delayProbability: "High",
      impactSummary: "Match is reaching a tense finish. Expect massive congestion at Gate 4. Use the South Exit for a 15% faster commute."
    };

    if (!apiKey) {
      return res.json(fallbackResponse);
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
        Match Context: ${JSON.stringify(match)}
        Current Overs: ${match.score.overs}
        Target: ${match.target}
        Runs: ${match.score.runs}
        Wickets: ${match.score.wickets}

        As an AI Travel Assistant for an IPL Stadium, predict the match end time, suggest a leaving strategy to avoid crowd, and estimate delay probability.
        Return ONLY a JSON object with:
        {
          "estimatedEndTime": "HH:MM PM",
          "recommendation": "Short recommendation string",
          "delayProbability": "Low" | "Medium" | "High",
          "impactSummary": "A concise detailed summary"
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      const text = response.text || "";
      const cleaned = text.replace(/```json|```/g, '').trim();
      res.json(JSON.parse(cleaned));
    } catch (error) {
      console.error("Gemini Error:", error);
      res.json(fallbackResponse);
    }
  });

  app.get('/api/transport/status', (req, res) => {
    res.json([
      { id: 1, type: 'Metro', line: 'Yellow Line', direction: 'Huda City Centre', status: 'Arriving Early', eta: '4 mins', density: 'High' },
      { id: 2, type: 'Bus', number: '502', direction: 'Terminal 3', status: 'On Time', eta: '12 mins', density: 'Medium' },
      { id: 3, type: 'Metro', line: 'Violet Line', direction: 'Kashmere Gate', status: 'Delayed', eta: '18 mins', density: 'Low' },
      { id: 4, type: 'Shuttle', number: 'S1', direction: 'Parking Lot A', status: 'Extra Deployed', eta: '2 mins', density: 'High' }
    ]);
  });

  // --- Vite Integration ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
