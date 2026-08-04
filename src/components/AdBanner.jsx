import React, { useEffect } from 'react';

export const AdBanner = ({ 
  adClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4331871930564491', 
  adSlot = import.meta.env.VITE_ADSENSE_SLOT_ID || '', 
  format = 'auto', 
  responsive = 'true',
  label = 'Sponsored Partner' 
}) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // Ignore duplicate init
    }
  }, []);

  return (
    <div className="w-full my-4">
      <div className="w-full bg-[#18181b]/90 border border-slate-800 rounded-2xl p-3 shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="flex items-center justify-between w-full mb-2 border-b border-slate-800/80 pb-1.5 px-1">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            ⚡ {label}
          </span>
          <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            ADSENSE VERIFIED
          </span>
        </div>
        
        {/* Official Google AdSense Ad Frame */}
        <div className="w-full min-h-[90px] flex items-center justify-center bg-black/40 rounded-xl p-1 border border-slate-800/60 overflow-hidden">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={adClient}
            {...(adSlot ? { 'data-ad-slot': adSlot } : {})}
            data-ad-format={format}
            data-full-width-responsive={responsive}
          />
        </div>
      </div>
    </div>
  );
};
