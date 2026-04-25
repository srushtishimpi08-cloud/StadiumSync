export interface MatchData {
  teams: {
    home: string;
    visitor: string;
  };
  stadium: string;
  score: {
    runs: number;
    wickets: number;
    overs: number;
  };
  target: number;
  status: 'Live' | 'Upcoming' | 'Finished';
  timestamp: number;
}

export interface TransportOption {
  id: string;
  type: 'Metro' | 'Bus' | 'Cab' | 'Walk';
  line?: string;
  number?: string;
  direction: string;
  eta: string;
  density: 'Low' | 'Medium' | 'High';
  status: 'On Time' | 'Delayed' | 'Extra Service';
}

export interface PredictionData {
  recommendation: string;
  estimatedEndTime: string;
  delayProbability: 'Low' | 'Medium' | 'High';
  impactSummary: string;
}

export interface User {
  id: string;
  email: string;
  stadium?: string;
  points: number;
}
