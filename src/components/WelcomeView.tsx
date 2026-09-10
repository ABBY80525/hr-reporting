import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Calendar, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';
import { SubMenuItem } from '../types';

interface WelcomeViewProps {
  onEnterSystem: (targetPage?: SubMenuItem) => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onEnterSystem }) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time details
  const timeString = currentTime.toLocaleTimeString('zh-TW', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const dateString = currentTime.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const weekdayString = currentTime.toLocaleDateString('zh-TW', {
    weekday: 'long',
  });

  // Calculate greeting by hour
  const hour = currentTime.getHours();
  let greeting = '您好';
  let shiftTag = '日班核心時段';
  if (hour >= 5 && hour < 12) {
    greeting = '早安';
    shiftTag = '早班 / 日班考勤時段';
  } else if (hour >= 12 && hour < 14) {
    greeting = '午安';
    shiftTag = '午間交接時段';
  } else if (hour >= 14 && hour < 18) {
    greeting = '下午好';
    shiftTag = '日班統計結算時段';
  } else if (hour >= 18 && hour < 22) {
    greeting = '晚安';
    shiftTag = '中班 / 夜班交接時段';
  } else {
    greeting = '夜深了，注意休息';
    shiftTag = '大夜班考勤監控時段';
  }

  return (
    <div className="relative w-full h-full flex-1 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-8 select-none">
      
      {/* Dynamic Animated Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle mesh base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/70" />

        {/* Animated Glow Orb 1 - Top Left Blue */}
        <motion.div
          animate={{
            x: [0, 45, -25, 0],
            y: [0, -35, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"
        />

        {/* Animated Glow Orb 2 - Bottom Right Emerald/Cyan */}
        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-28 -right-20 w-[28rem] h-[28rem] rounded-full bg-teal-300/25 blur-3xl"
        />

        {/* Animated Glow Orb 3 - Center Violet Accent */}
        <motion.div
          animate={{
            x: [0, 35, -40, 0],
            y: [0, 30, -25, 0],
            scale: [0.95, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-indigo-200/20 blur-[90px]"
        />

        {/* Floating Digital Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Floating Light Ring Animation */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 90,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-blue-200/40 pointer-events-none opacity-40"
        />

        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[920px] rounded-full border border-dashed border-sky-300/30 pointer-events-none opacity-30"
        />
      </div>

      {/* Main Content Card Container */}
      <div className="relative z-10 w-full max-w-5xl my-auto flex flex-col items-center">
        
        {/* Main Welcome Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
            歡迎使用
            <span className="text-gradient-animated ml-2 inline-block drop-shadow-xs">
              考勤報表系統
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            {greeting}，<span className="font-bold text-blue-600">王大明</span>！系統已就緒，自動匯總每日考勤刷卡、製造課別名冊與出缺勤分析。
          </p>
        </motion.div>

        {/* Central Time & Date Dynamic Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-xl shadow-blue-900/5 p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          {/* Subtle accent ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2B7FFF] to-[#00D492]" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Live Clock Section */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-blue-600 mb-1">
                <Clock className="w-4 h-4 animate-spin-slow text-blue-600" />
                <span>實時動態時間 (LIVE CLOCK)</span>
              </div>
              <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums flex items-baseline">
                {timeString}
                <span className="text-xs font-sans text-blue-600 font-bold ml-2.5 px-2 py-0.5 bg-blue-50 border border-blue-200 rounded-md">
                  UTC+8
                </span>
              </div>
            </div>

            {/* Date & Shift Info Section */}
            <div className="flex flex-col sm:items-end text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-8 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium justify-center sm:justify-end mb-1">
                <Calendar className="w-4 h-4 text-teal-600" />
                <span>{weekdayString}</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
                {dateString}
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>{shiftTag}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Primary Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-4"
        >
          <button
            id="enter-system-btn"
            onClick={() => onEnterSystem('每日出勤報表')}
            className="group px-8 py-4 btn-gradient-animated text-white font-bold text-base rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all duration-300 flex items-center gap-3 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>進入考勤系統</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-200" />
          </button>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            ABBY 企業 SSO 身份認證
          </span>
          <span>•</span>
          <span>伺服器節點: 正常運作</span>
          <span>•</span>
          <span>版本: v2.5.0 Production</span>
        </motion.div>

      </div>
    </div>
  );
};
