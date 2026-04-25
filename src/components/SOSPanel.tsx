import React, { useState } from 'react';
import { AlertCircle, MapPin, Shield } from 'lucide-react';
import { motion } from 'motion/react';

const SOSPanel: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className={`rounded-[32px] p-6 transition-all duration-500 border ${active ? 'bg-rose-600 shadow-xl shadow-rose-200 border-rose-500' : 'bg-white shadow-sm border-slate-100'}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-2xl ${active ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-500'}`}>
          <AlertCircle size={24} className={active ? 'animate-ping' : ''} />
        </div>
        <div>
          <h3 className={`text-lg font-display font-bold ${active ? 'text-white' : 'text-slate-800'}`}>Medical SOS</h3>
          <p className={`text-xs ${active ? 'text-rose-100' : 'text-slate-500'}`}>Instant emergency response</p>
        </div>
      </div>

      {!active ? (
        <div className="space-y-4">
          <button 
            onClick={() => setActive(true)}
            className="w-full bg-rose-500 text-white font-bold py-4 rounded-2xl hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-100"
          >
            Trigger Emergency Alert
          </button>
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <MapPin size={18} className="text-slate-400" />
             <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Nearest Medical Post</p>
                <p className="text-sm font-bold text-slate-700">Apollo First Aid • Zone B (4 min)</p>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
             <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-widest">Live Location</span>
                <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div> SHARING
                </div>
             </div>
             <p className="text-xs text-rose-100 mb-4 text-left">Your coordinates are live with stadium security and paramedics.</p>
             <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-white"
                />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-left">
                <p className="text-[10px] font-bold text-rose-100 uppercase">Hospital</p>
                <p className="text-sm font-bold text-white leading-tight">Fortis Raheja</p>
             </div>
             <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-left">
                <p className="text-[10px] font-bold text-rose-100 uppercase">ETA</p>
                <p className="text-sm font-bold text-white">12-14 min</p>
             </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setActive(false)}
              className="flex-1 bg-white text-rose-600 font-bold py-3 rounded-xl hover:bg-rose-50 transition-all text-xs"
            >
              Cancel Alert
            </button>
            <button className="flex items-center justify-center gap-2 px-4 bg-rose-800 text-white rounded-xl">
               <Shield size={16} /> <span className="text-xs font-bold uppercase">Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOSPanel;
