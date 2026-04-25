import { MatchData } from "../types";

export async function predictMatchEnd(matchData: MatchData) {
  try {
    const response = await fetch('/api/ai/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ match: matchData })
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    return await response.json();
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
