import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { MatchData } from '../types';

interface Props {
  match: MatchData;
}

const MatchDashboard: React.FC<Props> = ({ match }) => {
  const crr = (match.score.runs / Math.max(match.score.overs, 0.1)).toFixed(2);
  const runsRemaining = match.target - match.score.runs;
  const oversRemaining = 120 - (Math.floor(match.score.overs) * 6 + (match.score.overs % 1 * 10)); // Total balls remaining (approx)
  
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col gap-1 w-full md:w-auto">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Live Match • IPL 2026 Mumbai</span>
        <div className="flex items-center gap-6 mt-4">
          <div className="flex flex-col">
            <span className="text-3xl font-display font-black text-slate-900 leading-none tracking-tight">{match.teams.home}</span>
            <span className="text-xs font-bold text-slate-500 mt-1">Target: {match.target}</span>
          </div>
          
          <div className="w-px h-12 bg-slate-200"></div>

          <motion.div 
            key={match.score.runs}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-indigo-600 tracking-tighter"
          >
            {match.score.runs}<span className="text-2xl text-indigo-300">/{match.score.wickets}</span>
          </motion.div>

          <div className="w-px h-12 bg-slate-200"></div>

          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 leading-none">
              {match.score.overs.toFixed(1)} 
              <span className="text-[10px] font-bold text-slate-400 uppercase ml-1">Overs</span>
            </span>
            <span className="text-xs font-bold text-emerald-600 mt-1">RR: {crr}</span>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex gap-4 items-center w-full md:w-64">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
          <Activity size={24} className="animate-pulse" />
        </div>
        <div>
          <div className="text-[10px] font-black text-indigo-900 uppercase tracking-tight">Sync Reliability</div>
          <div className="text-lg font-bold text-indigo-600">98.4%</div>
          <div className="text-[10px] font-bold text-indigo-400">Real-time telemetry</div>
        </div>
      </div>
    </div>
  );
};

export default MatchDashboard;
