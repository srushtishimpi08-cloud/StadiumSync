import React from 'react';
import { Sparkles, Clock, AlertCircle, CheckCircle2, Navigation } from 'lucide-react';

interface Prediction {
  estimatedEndTime: string;
  delayProbability: string;
  impactSummary: string;
  recommendation: string;
}

interface Props {
  prediction: Prediction;
  loading: boolean;
}

const AIPredictionCard: React.FC<Props> = ({ prediction, loading }) => {
  if (loading || !prediction) {
    return (
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 h-full flex flex-col justify-center items-center gap-4">
        <div className="w-10 h-10 border-[3px] border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <p className="font-display font-bold text-slate-900 leading-tight">Analyzing Flow</p>
          <p className="text-[10px] uppercase font-black text-slate-400 mt-1 tracking-widest">Gemini Engine V2</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 h-full relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8 border border-indigo-100 w-fit px-3 py-1 rounded-lg bg-indigo-50">
          <Sparkles size={12} className="text-indigo-600" />
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.1em]">Intelligence Engine</span>
        </div>

        <div className="mb-8">
           <div className="text-[10px] uppercase font-black text-slate-400 mb-2 tracking-[0.2em]">Estimated End</div>
           <div className="text-5xl font-display font-black text-indigo-600 tracking-tighter">{prediction.estimatedEndTime}</div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl ${prediction.delayProbability === 'High' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {prediction.delayProbability === 'High' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-tight">Traffic Probability</p>
              <p className="text-sm font-bold text-slate-800">{prediction.delayProbability} Risk</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
               <Navigation size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-tight">AI Recommendation</p>
              <p className="text-sm font-bold text-indigo-600">{prediction.recommendation}</p>
            </div>
          </div>
          
          <div className="mt-4 p-5 bg-slate-50 rounded-[20px] border border-slate-100 italic text-[13px] text-slate-500 leading-relaxed font-medium">
            "{prediction.impactSummary}"
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Rewards Active</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors uppercase tracking-widest">Details</div>
        </div>
      </div>
    </div>
  );
};

export default AIPredictionCard;
