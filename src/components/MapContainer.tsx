import React from 'react';
import { MapPin, Users, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface MapContainerProps {
  stadiumName?: string | null;
}

const MapContainer: React.FC<MapContainerProps> = ({ stadiumName }) => {
  const displayStadium = stadiumName?.split(',')[0] || "Stadium Overview";

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Navigation size={20} />
          </div>
          <h2 className="text-xl font-display font-bold text-slate-800 tracking-tight">Arena Overview</h2>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Density</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 rounded-[32px] bg-slate-50 relative overflow-hidden flex items-center justify-center border border-slate-100 group">
         {/* Blueprint Grid Lines */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         </div>
         
         {/* Abstract Stadium Outline */}
         <div className="relative w-64 h-48 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-[3px] border-slate-200 rounded-[50px] transform -skew-x-6 backdrop-blur-[1px]"></div>
            {/* Inner Ring (Pitch) */}
            <div className="w-40 h-28 border border-indigo-100 rounded-[30px] flex items-center justify-center bg-white/50 relative">
               <div className="w-20 h-10 border border-indigo-50 rounded-md"></div>
            </div>

            {/* Labels */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">STADIUM LEVEL 0</span>
               <div className="text-xs font-display font-bold text-slate-600 text-center uppercase">
                 {displayStadium}
               </div>
            </div>

            {/* User Position */}
            <motion.div 
               animate={{ y: [0, -4, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute top-12 left-1/2 -translate-x-1/2 z-10"
            >
               <MapPin className="text-indigo-600 drop-shadow-[0_4px_8px_rgba(79,70,229,0.4)]" size={28} />
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-indigo-600/20 rounded-full blur-[2px]"></div>
            </motion.div>

            {/* Density Blobs */}
            <div className="absolute top-4 right-8 w-16 h-16 bg-rose-500/10 rounded-full animate-pulse blur-2xl"></div>
            <div className="absolute -bottom-6 left-12 w-20 h-20 bg-rose-500/15 rounded-full animate-pulse blur-3xl delay-500"></div>
         </div>

         {/* Corner Notifications */}
         <div className="absolute top-6 left-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-lg shadow-slate-200/50">
            <div className="flex items-center gap-2 mb-1">
               <Users size={12} className="text-orange-500" />
               <span className="text-[10px] font-black text-slate-400 uppercase">Stand B-4</span>
            </div>
            <div className="text-sm font-display font-bold text-slate-800">88% Capacity</div>
         </div>

         <div className="absolute bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200/50 animate-in slide-in-from-right-4 duration-700">
            <div className="text-[10px] uppercase font-black text-indigo-200 mb-1 leading-none tracking-widest">Recommended Exit</div>
            <div className="text-sm font-bold leading-none">Gate 4 → Metro Access</div>
         </div>
      </div>
    </div>
  );
};

export default MapContainer;
