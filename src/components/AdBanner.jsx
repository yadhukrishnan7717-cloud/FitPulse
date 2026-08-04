import React, { useEffect } from 'react';

export const AdBanner = ({ 
  adClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4331871930564491', 
  adSlot = import.meta.env.VITE_ADSENSE_SLOT_ID || '', 
  format = 'auto', 
  responsive = 'true',
  label = 'Sponsored Fitness Partner' 
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
      <div className="w-full bg-[#18181b]/95 border border-slate-800 rounded-3xl p-4 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Top Ad Label */}
        <div className="flex items-center justify-between w-full mb-3 border-b border-slate-800/80 pb-2 px-1">
          <span className="text-[10px] font-mono font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            ⚡ {label} (SPONSORED)
          </span>
          <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            GOOGLE ADSENSE READY
          </span>
        </div>
        
        {/* Official Google AdSense Ad Frame */}
        <ins 
          className="adsbygoogle w-full block"
          style={{ display: 'block', width: '100%', minHeight: '60px' }}
          data-ad-client={adClient}
          {...(adSlot ? { 'data-ad-slot': adSlot } : {})}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />

        {/* Live Visual Fitness Sponsor Ad Banner */}
        <div className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 flex items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-xl shrink-0">
              🏋️
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-1">
                NIKE ATHLETIC GEAR &amp; ON WHEY
              </div>
              <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                Up to 40% OFF Pro Fitness Equipment &amp; Supplements
              </span>
            </div>
          </div>

          <a 
            href="https://adsense.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-extrabold uppercase transition-all shadow-md shrink-0"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};
