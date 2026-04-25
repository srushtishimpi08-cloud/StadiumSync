/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MatchData, TransportOption } from './types';
import { predictMatchEnd } from './services/geminiService';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import MatchDashboard from './components/MatchDashboard';
import AIPredictionCard from './components/AIPredictionCard';
import TransportGrid from './components/TransportGrid';
import SOSPanel from './components/SOSPanel';
import MapContainer from './components/MapContainer';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Award, Info, ChevronRight, Navigation, Zap, Activity, Car, Train } from 'lucide-react';

function DashboardContent({ match, prediction, predLoading, transport, powerSave, selectedStadium }: { match: MatchData | null, prediction: any, predLoading: boolean, transport: TransportOption[], powerSave?: boolean, selectedStadium?: string | null }) {
  const { user, logout } = useAuth();
  const [mood, setMood] = useState('Tense');
  const [ticketScanned, setTicketScanned] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startVoice = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 3000);
  };

  useEffect(() => {
    if (match) {
      if (match.score.runs > 180) setMood('Euphoric');
      else if (match.score.wickets > 6) setMood('Anxious');
      else setMood('Excited');
    }
  }, [match]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-3xl font-display font-black text-slate-900 tracking-tight">Heyy, {user?.name.split(' ')[0]}! 👋</h2>
          <p className="text-slate-500 font-medium">Welcome back to the stadium command center.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors" onClick={logout}>
            <Zap size={20} className="rotate-180" />
          </button>
        </div>
      </div>

      {/* Top Row: SOS + Match Info */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <SOSPanel />
        </div>
        <div className="lg:col-span-8">
          {match ? (
            <MatchDashboard match={match} />
          ) : (
            <div className="h-[400px] w-full bg-slate-200 animate-pulse rounded-3xl"></div>
          )}
        </div>
      </section>

      {/* Second Row: Intelligence Engine + Arena Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
           {!powerSave && <AIPredictionCard prediction={prediction} loading={predLoading} />}
           {powerSave && (
              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 h-full">
                 <h2 className="text-white font-bold mb-2">CRITICAL INFO</h2>
                 <p className="text-emerald-400 text-3xl font-black">{prediction?.estimatedEndTime}</p>
                 <p className="text-slate-400 mt-2 text-sm">{prediction?.recommendation}</p>
              </div>
           )}
        </div>
        <div className="lg:col-span-6">
          <MapContainer stadiumName={selectedStadium} />
        </div>
      </section>

      {/* New Features Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="card-minimal flex flex-col items-center justify-center p-6 bg-indigo-50 border-indigo-100">
             <div className="text-[10px] font-black uppercase text-indigo-400 mb-2">Crowd Mood</div>
             <span className="text-2xl font-display font-black text-indigo-600">{mood}</span>
             <p className="text-[10px] text-indigo-400 mt-1 uppercase font-bold tracking-widest italic">{match?.score.runs > 150 ? 'Fans staying for finish' : 'Movement detected'}</p>
         </div>

         <div className="card-minimal flex flex-col items-center justify-center p-6 bg-emerald-50 border-emerald-100">
             <div className="text-[10px] font-black uppercase text-emerald-400 mb-2">Smart Gate Rec</div>
             <span className="text-2xl font-display font-black text-emerald-600">Gate 3</span>
             <p className="text-[10px] text-emerald-600 mt-1 uppercase font-bold">40% Less Crowd • 3m faster</p>
         </div>

         <div className="card-minimal flex flex-col items-center justify-center p-6 bg-amber-50 border-amber-100">
             <div className="text-[10px] font-black uppercase text-amber-400 mb-2">Traffic Flow</div>
             <div className="flex gap-1.5 mb-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                <div className="w-4 h-4 rounded-full bg-slate-200"></div>
             </div>
             <p className="text-[10px] text-amber-600 mt-1 uppercase font-bold">Signals Optimized for Exit</p>
         </div>

         <button 
          onClick={() => setTicketScanned(true)}
          className={`card-minimal flex flex-col items-center justify-center p-6 transition-all ${ticketScanned ? 'bg-indigo-600 text-white' : 'hover:border-indigo-600 border-dashed'}`}
         >
             <div className={`text-[10px] font-black uppercase mb-2 ${ticketScanned ? 'text-indigo-200' : 'text-slate-400'}`}>
               {ticketScanned ? 'Seat Recognized' : 'Personalize Exit'}
             </div>
             <span className="text-lg font-display font-bold">
               {ticketScanned ? 'Stand 4, Row G' : 'Scan Ticket (Sim)'}
             </span>
             {ticketScanned && <p className="text-[10px] text-indigo-200 mt-1 uppercase font-bold tracking-widest">Aisle 2 is closest</p>}
         </button>
      </section>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="card-minimal bg-slate-50 border-none">
             <div className="flex items-center gap-2 mb-4">
                <Navigation className="text-indigo-600" size={18} />
                <h4 className="text-sm font-bold text-slate-800">Optimized Walking Routes</h4>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                   <div className="text-xs font-black text-indigo-600 uppercase mb-1">Route Alpha</div>
                   <p className="text-sm font-bold text-slate-800">Walk 5m to Gate B → Reach Cabs 10m faster</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                   <div className="text-xs font-black text-indigo-600 uppercase mb-1">Route Beta</div>
                   <p className="text-sm font-bold text-slate-800">Use South Spiral → Direct platform access</p>
                </div>
             </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <button 
            onClick={startVoice}
            className="w-full card-minimal border-indigo-200 bg-indigo-50/50 flex items-center justify-center gap-3 py-12 hover:bg-white transition-all group relative overflow-hidden h-full"
          >
             {isListening && (
               <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
               >
                  <div className="flex gap-1 items-center">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [8, 16, 8] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-indigo-600 rounded-full"
                      />
                    ))}
                    <span className="ml-3 text-indigo-600 font-bold text-xs uppercase tracking-widest leading-none">Listening...</span>
                  </div>
               </motion.div>
             )}
             <div className="bg-indigo-600 p-3 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform">
                <Activity size={24} />
             </div>
             <div className="text-left">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Voice Assistant</p>
                <p className="text-lg font-display font-bold text-slate-900">"When should I leave?"</p>
             </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function TransportSection({ transport }: { transport: TransportOption[] }) {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Live Transport</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time coordinates and occupancy status</p>
        </div>
        <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600 text-xs font-bold border border-indigo-100 flex items-center gap-2">
           <Zap size={14} fill="currentColor" /> System Nominal
        </div>
      </div>
      
      <TransportGrid options={transport} />

      {/* Booking Integration Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-2xl">
                <Car size={24} />
              </div>
              <h3 className="text-xl font-display font-bold text-slate-900">Instant Cab Booking</h3>
            </div>
            <p className="text-slate-500 text-sm mb-6">Stadium parking is at 95% capacity. We recommend booking a private cab now.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-slate-950 rounded-2xl text-white hover:bg-slate-800 transition-all group">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black group-hover:scale-110 transition-transform">U</div>
              <span className="text-xs font-bold tracking-widest uppercase">Uber</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-3 p-6 bg-yellow-400 rounded-2xl text-black hover:bg-yellow-500 transition-all group">
              <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center font-black group-hover:scale-110 transition-transform italic">R</div>
              <span className="text-xs font-bold tracking-widest uppercase">Rapido</span>
            </button>
          </div>
        </div>

        <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-white/20 text-white rounded-2xl">
                <Train size={24} />
              </div>
              <h3 className="text-xl font-display font-bold">Fast-Track Metro</h3>
            </div>
            <p className="text-indigo-100 text-sm mb-6">Skip the physical queue at the stadium station. Book your digital tokens instantly.</p>
          </div>
          
          <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
            <Zap size={16} fill="currentColor" /> Purchase Digital Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Info size={20} className="text-indigo-600" />
          Pro-Travel Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm">Use Gate 2 for Cabs</h4>
            <p className="text-xs text-slate-500 mt-1">Cab pickup zone has moved to Gate 2 for less congestion during the final overs.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm">Metro Frequency Increased</h4>
            <p className="text-xs text-slate-500 mt-1">Trains are running every 3 minutes starting from 10:30 PM tonight.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthGate({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center max-w-2xl mx-auto">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-indigo-600 w-20 h-20 rounded-[32px] flex items-center justify-center mb-8 text-white shadow-2xl shadow-indigo-200"
      >
         <Zap size={40} fill="currentColor" />
      </motion.div>
      <h1 className="text-5xl md:text-7xl font-display font-black text-slate-900 tracking-tight mb-6">
        The Future of <span className="text-indigo-600">Stadium Travel.</span>
      </h1>
      <p className="text-xl text-slate-500 font-medium mb-10 leading-relaxed">
        Real-time match analysis, AI-powered traffic predictions, and instant travel booking. Log in to access your personalized match dashboard.
      </p>
      
      <button 
        onClick={onOpenAuth}
        className="px-12 py-5 bg-indigo-600 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-indigo-100 hover:bg-slate-900 hover:shadow-2xl transition-all active:scale-95"
      >
        Sign In to Begin Session
      </button>

      <div className="mt-16 grid grid-cols-3 gap-8 opacity-40 grayscale pointer-events-none">
        <div className="text-center">
          <div className="font-black text-2xl mb-1">0.5s</div>
          <div className="text-[10px] uppercase tracking-widest font-bold">Latency</div>
        </div>
        <div className="text-center">
          <div className="font-black text-2xl mb-1">99%</div>
          <div className="text-[10px] uppercase tracking-widest font-bold">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="font-black text-2xl mb-1">100k+</div>
          <div className="text-[10px] uppercase tracking-widest font-bold">Fans Active</div>
        </div>
      </div>
    </div>
  );
}

function StadiumSelector({ onSelect }: { onSelect: (stadium: string) => void }) {
  const stadiums = [
    { name: "Wankhede Stadium", city: "Mumbai", image: "https://images.unsplash.com/photo-1540741285278-0661459e2f42?auto=format&fit=crop&q=80&w=400", outline: "M20 20C40 10 160 10 180 20C190 30 190 170 180 180C160 190 40 190 20 180C10 170 10 30 20 20Z" },
    { name: "Eden Gardens", city: "Kolkata", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400", outline: "M100 20 A 80 80 0 1 0 100 180 A 80 80 0 1 0 100 20" },
    { name: "M. Chinnaswamy", city: "Bengaluru", image: "https://images.unsplash.com/photo-1540741285278-0661459e2f42?auto=format&fit=crop&q=80&w=400", outline: "M30 30L170 30L170 170L30 170Z" },
    { name: "M. A. Chidambaram", city: "Chennai", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400", outline: "M50 20L150 20L180 100L150 180L50 180L20 100Z" },
    { name: "Narendra Modi", city: "Ahmedabad", image: "https://images.unsplash.com/photo-1540741285278-0661459e2f42?auto=format&fit=crop&q=80&w=400", outline: "M100 10C150 10 190 50 190 100C190 150 150 190 100 190C50 190 10 150 10 100C10 50 50 10 100 10" }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <div className="bg-indigo-600 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-indigo-200">
           <Zap size={32} fill="currentColor" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 tracking-tight mb-4">
          StadiumSync <span className="text-indigo-600">IPL</span>
        </h1>
        <p className="text-lg text-slate-500 mb-12 max-w-xl mx-auto font-medium">
          The intelligent travel companion for the world's biggest cricket league. Choose your stadium to begin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stadiums.map((s, idx) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(`${s.name}, ${s.city}`)}
              className="group relative h-48 rounded-[32px] overflow-hidden shadow-sm border border-slate-100 bg-slate-950"
            >
              <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500" />
              
              {/* Stadium Outline Map Overlay */}
              <div className="absolute inset-x-0 top-4 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
                <svg viewBox="0 0 200 200" className="w-24 h-24 mx-auto fill-none stroke-indigo-400 stroke-2">
                  <path d={s.outline} className="animate-pulse" />
                </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{s.city}</p>
                 <h3 className="text-white font-display font-bold text-lg leading-tight">{s.name}</h3>
              </div>
            </motion.button>
          ))}
        </div>
        
        <div className="mt-12 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3 justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
           Data Privacy Priority • Real-time Sync Active
        </div>
      </motion.div>
    </div>
  );
}

function MainView() {
  const [match, setMatch] = useState<MatchData | null>(null);
  const [transport, setTransport] = useState<TransportOption[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [predLoading, setPredLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transport'>('dashboard');
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [powerSave, setPowerSave] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.stadium) setSelectedStadium(user.stadium);
  }, [user]);

  useEffect(() => {
    if (!selectedStadium) return;

    const fetchData = async () => {
      try {
        const [matchRes, transportRes] = await Promise.all([
          fetch('/api/match/live'),
          fetch('/api/transport/status')
        ]);
        const mData = await matchRes.json();
        const tData = await transportRes.json();
        
        setMatch(mData);
        setTransport(tData);

        const pred = await predictMatchEnd(mData);
        setPrediction(pred);
        setPredLoading(false);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [selectedStadium]);

  if (!user) {
    return (
      <div className="min-h-screen pt-12">
        <AuthGate onOpenAuth={() => setIsAuthOpen(true)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  if (!selectedStadium) {
    return <StadiumSelector onSelect={setSelectedStadium} />;
  }

  return (
    <div className={`min-h-screen ${powerSave ? 'bg-slate-900 text-slate-400' : 'bg-slate-50'}`}>
      <Navbar 
        onOpenAuth={() => setIsAuthOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        powerSave={powerSave}
        setPowerSave={setPowerSave}
      />
      
      <main className={`max-w-7xl mx-auto px-6 md:px-12 py-8 ${powerSave ? 'opacity-90 grayscale' : ''}`}>
        {activeTab === 'dashboard' ? (
          <DashboardContent 
            match={match} 
            prediction={prediction} 
            predLoading={predLoading} 
            transport={transport} 
            powerSave={powerSave}
            selectedStadium={selectedStadium}
          />
        ) : (
          <TransportSection transport={transport} />
        )}

        <footer className="mt-20 pt-8 pb-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">S</div>
              <h2 className="text-lg font-display font-bold text-slate-900 tracking-tight">StadiumSync</h2>
           </div>
           <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Priority</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Security Audit</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Data Protocol</a>
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-tight">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              Systems Nominal
           </div>
        </footer>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainView />
    </AuthProvider>
  );
}
