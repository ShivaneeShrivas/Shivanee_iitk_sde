// server.js  ✅ in same folder as index.html
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Gemini API endpoint
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const response = await fetch(`${GEMINI_URL}?key=${process.env.API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3 }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(500).json({ error: 'Gemini API call failed', details: data });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text returned.";
    res.json({ text });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("✅ Backend running on http://localhost:3000"));
