import React from 'react';
import { LogIn, LogOut, User, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
  onOpenAuth: () => void;
  activeTab: 'dashboard' | 'transport';
  setActiveTab: (tab: 'dashboard' | 'transport') => void;
  powerSave: boolean;
  setPowerSave: (val: boolean) => void;
}

const Navbar: React.FC<Props> = ({ onOpenAuth, activeTab, setActiveTab, powerSave, setPowerSave }) => {
  const { user, logout } = useAuth();

  return (
    <nav className={`sticky top-0 z-50 py-4 px-6 md:px-12 flex items-center justify-between transition-colors ${powerSave ? 'bg-slate-900 border-b border-slate-800' : 'bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm'}`}>
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
          <Zap size={22} fill="white" />
        </div>
        <div>
          <h1 className={`text-xl font-display font-bold leading-none ${powerSave ? 'text-white' : 'text-slate-900'}`}>
            StadiumSync
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600">
            {user?.stadium ? user.stadium : "IPL Edition • Live"}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('transport')}
          className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === 'transport' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Transport
        </button>
        
        <button 
          onClick={() => setPowerSave(!powerSave)}
          className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border transition-all ${powerSave ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-50 text-slate-400 border-slate-100 hover:text-indigo-600'}`}
        >
          <Zap size={12} fill={powerSave ? 'white' : 'none'} />
          {powerSave ? 'Power Save On' : 'Power Saver'}
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Fan Member</p>
              <p className="text-sm font-bold text-slate-700">{user.email.split('@')[0]}</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
               <User size={20} className="text-slate-500" />
            </div>
            <button 
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 bg-indigo-600 px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg shadow-indigo-100 hover:shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
          >
            <LogIn size={18} />
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
