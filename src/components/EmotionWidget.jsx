import React, { useState } from 'react';
import { 
  WeightlifterCharacter, 
  CyclistCharacter, 
  SwimmerCharacter, 
  FoodieCharacter 
} from './SectionCharacters';
import { switchAudio } from '../utils/audio';

export const EMOTIONS = [
  { id: 'energized', emoji: '🔥', label: 'Energized', motto: 'Beast mode activated! Crushing today\'s workout.', color: 'from-amber-500 to-rose-600', char: 'weightlifter' },
  { id: 'motivated', emoji: '💪', label: 'Motivated', motto: 'Consistency is key. Ready for heavy lifts!', color: 'from-blue-600 to-indigo-600', char: 'cyclist' },
  { id: 'calm', emoji: '😌', label: 'Focused', motto: 'Mindful, calm & locked into performance.', color: 'from-emerald-500 to-teal-600', char: 'swimmer' },
  { id: 'recovery', emoji: '💤', label: 'Recovery', motto: 'Prioritizing hydration & muscle recovery.', color: 'from-purple-600 to-indigo-700', char: 'foodie' },
  { id: 'fueled', emoji: '🥗', label: 'Fueled Up', motto: 'Healthy macros & clean caffeine energy.', color: 'from-green-500 to-emerald-700', char: 'foodie' }
];

export const EmotionWidget = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(EMOTIONS[0]);

  const handleSelectEmotion = (emotion) => {
    switchAudio.playClickSound();
    setSelectedEmotion(emotion);
  };

  const renderCharacterAvatar = (charType) => {
    switch (charType) {
      case 'cyclist':
        return <CyclistCharacter className="w-20 h-20 animate-bounce" />;
      case 'swimmer':
        return <SwimmerCharacter className="w-20 h-20 animate-pulse" />;
      case 'foodie':
        return <FoodieCharacter className="w-20 h-20" />;
      case 'weightlifter':
      default:
        return <WeightlifterCharacter className="w-20 h-20" />;
    }
  };

  return (
    <div className="w-full rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-2xl space-y-4 select-none">
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{selectedEmotion.emoji}</span>
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            ATHLETE MOOD & EMOTION WIDGET
          </h3>
        </div>
        <span className="text-[10px] font-mono text-blue-400 font-bold px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30">
          {selectedEmotion.label}
        </span>
      </div>

      {/* Center Character Reaction Box */}
      <div className={`p-4 rounded-2xl bg-gradient-to-r ${selectedEmotion.color} flex items-center justify-between text-white shadow-xl transition-all duration-300`}>
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-2xl bg-black/20 backdrop-blur-md border border-white/20">
            {renderCharacterAvatar(selectedEmotion.char)}
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200">
              {selectedEmotion.emoji} {selectedEmotion.label} State
            </div>
            <p className="text-xs font-sans font-medium mt-1 leading-snug text-white/95">
              "{selectedEmotion.motto}"
            </p>
          </div>
        </div>
      </div>

      {/* Emotion Emoji Selector Buttons */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
          SELECT YOUR DAILY EMOTION
        </span>
        <div className="grid grid-cols-5 gap-2">
          {EMOTIONS.map((e) => {
            const isSelected = selectedEmotion.id === e.id;
            return (
              <button
                key={e.id}
                onClick={() => handleSelectEmotion(e)}
                className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-md' 
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span className="text-xl mb-0.5">{e.emoji}</span>
                <span className="text-[9px] font-mono font-bold">{e.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
