import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Award, X, Sparkles, ShieldCheck } from 'lucide-react';

export const VideoAdModal = ({ isOpen, onClose, onRewardEarned }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && isPlaying && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) {
            clearInterval(timer);
            setIsPlaying(false);
            setIsRewardClaimed(true);
            return 100;
          }
          return prev + 5;
        });
      }, 500); // 10-second video ad simulation
    }
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, progress]);

  if (!isOpen) return null;

  const handleStartVideo = () => {
    setIsPlaying(true);
    setProgress(0);
    setIsRewardClaimed(false);
  };

  const handleClaimReward = () => {
    if (onRewardEarned) onRewardEarned(50);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#121214] border border-amber-500/40 rounded-3xl p-6 space-y-5 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono uppercase text-white flex items-center gap-1.5">
                REWARDED VIDEO AD <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <span className="text-[11px] font-mono text-slate-400">Watch 10-sec ad to claim +50 Bonus XP</span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black rounded-2xl border border-slate-800 overflow-hidden flex flex-col items-center justify-center group shadow-inner">
          {/* Simulated Video Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-3 animate-pulse">
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <h4 className="text-base font-extrabold font-sans text-white tracking-wide">FITPULSE PRO ATHLETE AD</h4>
            <p className="text-xs font-mono text-slate-300 mt-1">Sponsor: Optimum Nutrition &amp; Nike Fitness Gear</p>
          </div>

          {/* Controls & Overlays */}
          {!isPlaying && !isRewardClaimed && (
            <button
              onClick={handleStartVideo}
              className="z-10 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-extrabold uppercase shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" /> Watch Video Ad (+50 XP)
            </button>
          )}

          {isPlaying && (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-xl bg-slate-900/80 text-white border border-slate-700"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[10px] font-mono font-bold bg-amber-500 text-slate-950 px-2.5 py-1 rounded-xl shadow">
                {Math.ceil((100 - progress) / 10)}s Remaining
              </span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Claim Reward Section */}
        {isRewardClaimed ? (
          <div className="space-y-3 animate-fade-in text-center">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> VIDEO COMPLETED! +50 XP UNLOCKED
            </div>
            <button
              onClick={handleClaimReward}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-lg hover:scale-105"
            >
              Claim +50 XP Reward Now
            </button>
          </div>
        ) : (
          <div className="text-center text-[10px] font-mono text-slate-500">
            High-CPM Pop-up Video Monetization Unit • Google AdMob / AdSense
          </div>
        )}
      </div>
    </div>
  );
};
