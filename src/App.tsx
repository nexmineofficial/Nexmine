import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Trophy, 
  Share2, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  LayoutDashboard, 
  Wallet, 
  User, 
  History, 
  Settings, 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  Database, 
  FileText,
  Menu,
  X,
  ChevronRight,
  Clock,
  TrendingUp,
  Gift,
  Youtube,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

// --- Types ---
type ViewState = 'landing' | 'app' | 'docs';

// --- Components ---

const Logo = ({ className = "w-full h-full" }: { className?: string }) => (
  <img 
    src="https://storage.googleapis.com/generativeai-downloads/images/input_file_1.png" 
    alt="NexMine Logo" 
    className={`${className} object-contain`}
    referrerPolicy="no-referrer"
  />
);

const Navbar = ({ setView }: { setView: (v: ViewState) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center p-1 border border-amber-500/20 shadow-lg shadow-amber-500/10">
            <Logo />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">NexMine</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => setView('landing')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Home</button>
          <button onClick={() => setView('docs')} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Documentation</button>
          <button 
            onClick={() => setView('app')}
            className="px-5 py-2.5 bg-amber-500 text-black text-sm font-bold rounded-full hover:bg-amber-400 transition-all active:scale-95 shadow-lg shadow-amber-500/20"
          >
            Launch App
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ setView }: { setView: (v: ViewState) => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex items-center">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b,black)]" />
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://storage.googleapis.com/generativeai-downloads/images/input_file_0.png" 
          alt="Background" 
          className="w-full h-full object-cover mix-blend-overlay opacity-50"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="max-w-7xl mx-auto px-6 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:justify-end order-2 lg:order-1"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full" />
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="w-64 h-64 md:w-96 md:h-96 relative z-10"
            >
              <Logo className="w-full h-full drop-shadow-[0_0_50px_rgba(245,158,11,0.8)]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-1 lg:order-2"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight tracking-tighter">
            NexMine Social Mining
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-8">
            Mine digital rewards daily.
          </h2>
          <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Join the revolution of digital rewards. Simple, secure, and motivated by community engagement.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={() => setView('app')}
              className="w-full sm:w-auto px-10 py-4 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-amber-500/40 text-lg uppercase tracking-widest"
            >
              Start Mining <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg">
              Whitepaper
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const steps = [
    { title: "Create Account", desc: "Sign up with your email and mobile number to get started.", icon: <User size={32} /> },
    { title: "Start Daily Mining", desc: "Activate your mining session every 24 hours with a single tap.", icon: <Logo className="w-8 h-8" /> },
    { title: "Earn Rewards", desc: "Watch your NXP balance grow and withdraw to your wallet.", icon: <Trophy size={32} /> },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it Works</h2>
          <p className="text-white/50">Three simple steps to start your mining journey.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl hover:border-amber-500/30 transition-all group">
              <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Step {idx + 1}: {step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RewardTable = () => {
  const tiers = [
    { users: "0 – 5k", reward: 1.0, label: "1.0 NXP/hr" },
    { users: "5k – 10k", reward: 0.5, label: "0.5 NXP/hr" },
    { users: "10k – 20k", reward: 0.3, label: "0.3 NXP/hr" },
    { users: "20k – 50k", reward: 0.2, label: "0.2 NXP/hr" },
    { users: "50k – 100k", reward: 0.1, label: "0.1 NXP/hr" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Mining Reward Halving</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              NexMine implements a fair distribution model. As the community grows, the mining difficulty increases and rewards are halved to ensure long-term sustainability and value for NXP tokens.
            </p>
            
            <div className="space-y-4">
              {tiers.map((tier, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-white/70 font-medium">{tier.users} Users</span>
                  </div>
                  <span className="text-amber-500 font-bold">{tier.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-[400px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="w-6 h-6">
                  <Logo />
                </div>
                Reward Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tiers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="users" 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value} NXP`}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#f59e0b', fontWeight: 'bold' }}
                />
                <Bar dataKey="reward" radius={[6, 6, 0, 0]}>
                  {tiers.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#f59e0b' : '#f59e0b40'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const TasksRewards = () => {
  const tasks = [
    { name: "Telegram Join", reward: "50 NXP", icon: <MessageCircle size={20} />, color: "bg-[#0088cc]/10 text-[#0088cc]" },
    { name: "X Follow + Retweet", reward: "50 NXP", icon: <Twitter size={20} />, color: "bg-[#1DA1F2]/10 text-[#1DA1F2]" },
    { name: "YouTube Subscribe", reward: "50 NXP", icon: <Youtube size={20} />, color: "bg-[#FF0000]/10 text-[#FF0000]" },
    { name: "Instagram Follow", reward: "50 NXP", icon: <Instagram size={20} />, color: "bg-purple-500/10 text-purple-500" },
    { name: "Facebook Follow", reward: "50 NXP", icon: <Facebook size={20} />, color: "bg-[#1877F2]/10 text-[#1877F2]" },
  ];

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Task Rewards</h2>
          <p className="text-white/50">Complete simple social tasks to boost your balance instantly.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tasks.map((task, idx) => (
            <div key={idx} className="bg-zinc-900 border border-white/5 p-6 rounded-2xl text-center hover:scale-105 transition-all">
              <div className={`w-12 h-12 ${task.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {task.icon}
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{task.name}</h3>
              <p className="text-amber-500 font-black">{task.reward}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReferralProgram = () => {
  const levels = [
    { level: "Level 1", bonus: "10%" },
    { level: "Level 2", bonus: "5%" },
    { level: "Level 3", bonus: "3%" },
    { level: "Level 4", bonus: "2%" },
    { level: "Level 5", bonus: "1%" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Referral Program</h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              Invite your friends and build a mining team. Earn a massive <span className="text-amber-500 font-bold">100 NXP</span> for every successful signup plus recurring mining bonuses across 5 levels.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center font-bold">1</div>
                <p className="text-white/80 font-medium">Share your unique referral link</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center font-bold">2</div>
                <p className="text-white/80 font-medium">Friend signs up and verifies OTP</p>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl">
                <div className="w-10 h-10 bg-amber-500 text-black rounded-full flex items-center justify-center font-bold">3</div>
                <p className="text-white/80 font-medium">Both receive rewards instantly</p>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Share2 className="text-amber-500" size={24} />
              Mining Bonus Levels
            </h3>
            <div className="space-y-3">
              {levels.map((lvl, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/5">
                  <span className="text-white/60">{lvl.level}</span>
                  <span className="text-amber-500 font-bold">{lvl.bonus} Bonus</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-amber-500 rounded-2xl text-center">
              <p className="text-black font-bold text-sm uppercase tracking-wider">Start Building Your Team Today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- APP DEMO COMPONENTS ---

const MobileAppDemo = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMining, setIsMining] = useState(false);
  const [balance, setBalance] = useState(1250.50);
  const [timeLeft, setTimeLeft] = useState(24 * 3600);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isMining && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setBalance(prev => prev + (0.5 / 3600)); // 0.5 NXP per hour
      }, 1000);
    } else if (timeLeft === 0) {
      setIsMining(false);
      setTimeLeft(24 * 3600);
    }
    return () => clearInterval(interval);
  }, [isMining, timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startMining = () => {
    if (!isMining) {
      setIsMining(true);
    }
  };

  if (showSplash) {
    return (
      <div className="w-full h-full bg-black flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-amber-500/10 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/20 border border-amber-500/20 p-2">
            <Logo className="w-full h-full drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">NexMine</h1>
          <p className="text-amber-500/60 text-xs font-bold uppercase tracking-widest mt-2">Social Mining</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col text-white overflow-hidden relative">
      {/* App Header */}
      <div className="px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden p-1.5">
            <Logo />
          </div>
          <div>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Welcome back</p>
            <p className="text-sm font-bold">Alex Rivera</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center relative">
            <Bell size={18} className="text-white/70" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-zinc-900" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 pt-4"
            >
              {/* Balance Card */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-600 p-6 rounded-[32px] shadow-xl shadow-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16" />
                <p className="text-black/60 text-xs font-black uppercase tracking-widest mb-1">Total Balance</p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl font-black text-black">{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                  <span className="text-black/80 font-bold text-sm">NXP</span>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-amber-400 bg-zinc-800 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="User" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-amber-400 bg-black flex items-center justify-center text-[10px] font-bold">+12</div>
                  </div>
                  <button className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full">Withdraw</button>
                </div>
              </div>

              {/* Mining Status */}
              <div className="bg-zinc-900 border border-white/5 p-6 rounded-[32px] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center p-1.5 ${isMining ? 'bg-amber-500/20 border border-amber-500/50 animate-pulse' : 'bg-zinc-800 text-white/40'}`}>
                      <Logo className={`w-full h-full ${isMining ? '' : 'grayscale opacity-50'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Mining Status</p>
                      <p className={`text-sm font-bold ${isMining ? 'text-amber-500' : 'text-white/60'}`}>{isMining ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Speed</p>
                    <p className="text-sm font-bold text-green-500">0.5 NXP/hr</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={startMining}
                    disabled={isMining}
                    className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest transition-all active:scale-95 ${isMining ? 'bg-zinc-800 text-white/20 cursor-not-allowed' : 'bg-white text-black hover:bg-amber-500 shadow-lg shadow-white/5'}`}
                  >
                    {isMining ? 'MINING IN PROGRESS' : 'START MINING'}
                  </button>
                  {isMining && (
                    <div className="mt-4 flex flex-col items-center">
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mb-1">Session Ends In</p>
                      <p className="text-xl font-mono font-bold text-amber-500">{formatTime(timeLeft)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Rewards Sections (Moved from Landing) */}
              <div className="space-y-6">
                <TasksRewards />
                <RewardTable />
                <ReferralProgram />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900 border border-white/5 p-5 rounded-[28px] flex flex-col items-center text-center group active:scale-95 transition-all">
                  <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-3">
                    <Trophy size={24} />
                  </div>
                  <p className="text-xs font-bold text-white/80">Tasks</p>
                  <p className="text-[10px] text-white/30 mt-1">Earn 250+ NXP</p>
                </div>
                <div className="bg-zinc-900 border border-white/5 p-5 rounded-[28px] flex flex-col items-center text-center group active:scale-95 transition-all">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-3">
                    <Share2 size={24} />
                  </div>
                  <p className="text-xs font-bold text-white/80">Referral</p>
                  <p className="text-[10px] text-white/30 mt-1">100 NXP Bonus</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mining' && (
            <motion.div
              key="mining"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="pt-8 space-y-8"
            >
              <div className="text-center">
                <h2 className="text-2xl font-black mb-2">Mining Hub</h2>
                <p className="text-white/40 text-sm">Maximize your daily earnings</p>
              </div>

              <div className="relative flex items-center justify-center py-10">
                <div className={`absolute w-64 h-64 rounded-full border-2 border-dashed border-white/10 ${isMining ? 'animate-spin-slow' : ''}`} />
                <div className={`w-48 h-48 rounded-full bg-zinc-900 border border-white/5 flex flex-col items-center justify-center relative z-10 shadow-2xl p-8 ${isMining ? 'shadow-amber-500/20' : ''}`}>
                  <Logo className={`w-full h-full ${isMining ? 'drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'grayscale opacity-20'}`} />
                  {isMining && <p className="mt-4 font-mono text-xl font-bold text-amber-500">{formatTime(timeLeft)}</p>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-amber-500" />
                    <span className="text-sm font-medium">Team Bonus</span>
                  </div>
                  <span className="text-sm font-bold text-green-500">+15%</span>
                </div>
                <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5">
                      <Logo />
                    </div>
                    <span className="text-sm font-medium">Base Rate</span>
                  </div>
                  <span className="text-sm font-bold">0.5 NXP/hr</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wallet' && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="pt-8 space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-black mb-2">My Wallet</h2>
                <p className="text-white/40 text-sm">Manage your NXP assets</p>
              </div>

              <div className="bg-zinc-900 border border-white/5 p-6 rounded-[32px] space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white/60">Total Balance</p>
                  <p className="text-xl font-black text-amber-500">{balance.toFixed(2)} NXP</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-white text-black rounded-xl font-bold text-xs">Deposit</button>
                  <button className="py-3 bg-zinc-800 text-white rounded-xl font-bold text-xs">Withdraw</button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold mb-4 px-2">Transaction History</h3>
                <div className="space-y-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="bg-zinc-900/30 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center p-2">
                          <Logo />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Mining Reward</p>
                          <p className="text-[10px] text-white/30">Today, 10:45 AM</p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-green-500">+12.00</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 pt-4 bg-gradient-to-t from-black to-transparent pointer-events-none">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-[28px] p-2 flex items-center justify-between pointer-events-auto shadow-2xl">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center py-2 transition-all ${activeTab === 'home' ? 'text-amber-500' : 'text-white/40'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-bold mt-1">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('mining')}
            className={`flex-1 flex flex-col items-center py-2 transition-all ${activeTab === 'mining' ? 'text-amber-500' : 'text-white/40'}`}
          >
            <div className="w-5 h-5 mb-1">
              <Logo className={`${activeTab === 'mining' ? '' : 'grayscale opacity-50'}`} />
            </div>
            <span className="text-[10px] font-bold">Mining</span>
          </button>
          <button 
            onClick={() => setActiveTab('wallet')}
            className={`flex-1 flex flex-col items-center py-2 transition-all ${activeTab === 'wallet' ? 'text-amber-500' : 'text-white/40'}`}
          >
            <Wallet size={20} />
            <span className="text-[10px] font-bold mt-1">Wallet</span>
          </button>
          <button 
            className={`flex-1 flex flex-col items-center py-2 transition-all text-white/40`}
          >
            <User size={20} />
            <span className="text-[10px] font-bold mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Documentation = () => {
  const [activeDoc, setActiveDoc] = useState<'firebase' | 'flutter' | 'deploy'>('deploy');
  
  const docs = {
    firebase: {
      title: "Firebase Structure",
      icon: <Database size={20} />,
      content: `
### Collections
- **users**: user_id, email, mobile, referral_code, balance_nxp, mining_start_time, last_mining_time, total_referrals
- **mining**: id, user_id, start_time, end_time, reward_earned, status
- **referrals**: referrer_id, referral_id, level, timestamp
- **tasks**: task_id, name, reward_nxp, link
- **rewards**: reward_id, user_id, amount, type, timestamp

### Security Rules
- Only one account per email.
- Only one account per mobile number.
- Users can only read/write their own data.
      `
    },
    flutter: {
      title: "Flutter UI Code",
      icon: <Smartphone size={20} />,
      content: `
### Key Screens
- **SplashScreen**: Branding & Animation
- **SignupScreen**: Email, Mobile, Password, Referral Code
- **LoginScreen**: Email, Password, Forgot Password (Telegram Redirect)
- **Dashboard**: Balance, Mining Speed, Start Button, 24h Timer
- **MiningScreen**: Timer & Session Management
- **TasksScreen**: Social Task List
- **ReferralScreen**: Multi-level Bonus Tracking
- **WalletScreen**: Balance & Transactions
- **ProfileScreen**: User Settings
      `
    },
    deploy: {
      title: "Deployment Guide",
      icon: <FileText size={20} />,
      content: `
### 1. GitHub Pages
- Upload 'nexmine' folder to a new GitHub repo.
- Enable GitHub Pages in Settings.

### 2. Firebase Integration
- Create project in Firebase Console.
- Enable Auth (Email/Password).
- Enable Firestore Database.
- Update 'firebase/config.js' with your credentials.

### 3. Mining Logic
- Handled in 'js/mining.js'.
- Uses 24-hour countdown timer.
- Automatically adds rewards to wallet.
      `
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-32">
      <div className="grid md:grid-cols-[250px_1fr] gap-12">
        <div className="space-y-2">
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 px-4">Documentation</p>
          {(Object.keys(docs) as Array<keyof typeof docs>).map(key => (
            <button
              key={key}
              onClick={() => setActiveDoc(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeDoc === key ? 'bg-amber-500 text-black' : 'text-white/60 hover:bg-white/5'}`}
            >
              {docs[key].icon}
              {docs[key].title}
            </button>
          ))}
        </div>
        
        <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            {docs[activeDoc].icon}
            {docs[activeDoc].title}
          </h2>
          <div className="prose prose-invert max-w-none">
            <pre className="bg-black/50 p-6 rounded-2xl border border-white/5 text-sm text-white/70 whitespace-pre-wrap font-mono leading-relaxed">
              {docs[activeDoc].content.trim()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-amber-500 selection:text-black">
      <Navbar setView={setView} />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero setView={setView} />
              <HowItWorks />
              <RewardTable />
              <TasksRewards />
              <ReferralProgram />
              
              <footer className="py-20 border-t border-white/5 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center p-1 border border-amber-500/20">
                    <Logo />
                  </div>
                  <span className="text-xl font-bold text-white">NexMine</span>
                </div>
                <p className="text-white/40 text-sm">© 2026 NexMine Social Mining Platform. All rights reserved.</p>
              </footer>
            </motion.div>
          )}

          {view === 'app' && (
            <motion.div
              key="app"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="fixed inset-0 z-[60] bg-black flex items-center justify-center p-4 md:p-10"
            >
              <button 
                onClick={() => setView('landing')}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-[70]"
              >
                <X size={24} />
              </button>
              
              <div className="relative w-full max-w-[400px] aspect-[9/19] bg-zinc-900 rounded-[60px] border-[8px] border-zinc-800 shadow-[0_0_100px_rgba(245,158,11,0.1)] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-3xl z-[80]" />
                <MobileAppDemo />
              </div>
              
              <div className="hidden lg:block ml-20 max-w-sm">
                <h2 className="text-4xl font-black text-white mb-4">Interactive Demo</h2>
                <p className="text-white/50 mb-8">Experience the NexMine mobile interface. Start mining, check your balance, and explore the ecosystem.</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-white/70">
                    <CheckCircle2 className="text-amber-500" size={20} />
                    <span className="text-sm font-medium">Real-time mining simulation</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <CheckCircle2 className="text-amber-500" size={20} />
                    <span className="text-sm font-medium">Responsive mobile UI</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/70">
                    <CheckCircle2 className="text-amber-500" size={20} />
                    <span className="text-sm font-medium">24-hour session logic</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'docs' && (
            <motion.div
              key="docs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Documentation />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
