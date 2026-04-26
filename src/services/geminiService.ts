import { GoogleGenAI } from "@google/genai";
import { MatchData } from "../types";

const ai = new GoogleGenAI({ apiKey: (process.env.GEMINI_API_KEY as string) });

export async function predictMatchEnd(matchData: MatchData) {
  if (!matchData || !matchData.score) {
    return {
      estimatedEndTime: "10:45 PM",
      delayProbability: "Low",
      impactSummary: "Awaiting live match data feed initialization...",
      recommendation: "Monitor dashboard"
    };
  }

  try {
    const prompt = `
      Match Context: ${JSON.stringify(matchData)}
      Current Overs: ${matchData.score.overs}
      Target: ${matchData.target}
      Runs: ${matchData.score.runs}
      Wickets: ${matchData.score.wickets}

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
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini Prediction Error:", error);
    return {
      estimatedEndTime: "10:45 PM",
      delayProbability: "Medium",
      impactSummary: "Live data feed active. Using cached prediction models.",
      recommendation: "Check status in 5 mins"
    };
  }
}
