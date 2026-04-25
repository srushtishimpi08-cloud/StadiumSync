import React from 'react';
import { Bus, Train, Car, Clock, Navigation } from 'lucide-react';
import { motion } from 'motion/react';
import { TransportOption } from '../types';

interface Props {
  options: TransportOption[];
}

const TransportGrid: React.FC<Props> = ({ options }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Metro': return Train;
      case 'Bus': return Bus;
      case 'Cab': return Car;
      default: return Bus;
    }
  };

  const getStatusStyle = (status: string) => {
    if (status.includes('Early')) return 'text-emerald-700 bg-emerald-100';
    if (status.includes('Delayed')) return 'text-amber-700 bg-amber-100';
    if (status.includes('Extra')) return 'text-indigo-700 bg-indigo-100';
    return 'text-slate-600 bg-slate-200';
  };

  const getDensityColor = (density: string) => {
    switch (density) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-rose-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((opt, idx) => {
        const Icon = getIcon(opt.type);
        return (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="card-minimal group hover:border-indigo-200 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">
                <Icon size={24} />
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyle(opt.status)}`}>
                {opt.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {opt.type} {opt.line || opt.number}
              </h3>
              <p className="text-xs font-bold text-slate-400 mt-1 flex items-center gap-1.5 uppercase tracking-wide">
                <Navigation size={12} />
                {opt.direction}
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-300" />
                <span className="text-sm font-black text-slate-700">{opt.eta}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-300 uppercase">Load</span>
                <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden">
                   <div 
                    className={`h-full ${getDensityColor(opt.density)}`}
                    style={{ width: opt.density === 'High' ? '100%' : opt.density === 'Medium' ? '60%' : '30%' }}
                   ></div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TransportGrid;
