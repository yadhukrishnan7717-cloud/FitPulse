import React, { useEffect } from 'react';

export const AdBanner = ({ 
  adClient = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-4331871930564491', 
  adSlot = '1234567890', 
  format = 'auto', 
  responsive = 'true',
  label = 'Sponsored Fitness Partner' 
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch {
      // Catch duplicate pushes
    }
  }, []);

  return (
    <div className="w-full my-4 px-1">
      <div className="w-full bg-[#18181b]/80 border border-slate-800/80 rounded-2xl p-3 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
          {label} (AD)
        </span>
        
        {/* Google AdSense Ad Unit Tag */}
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', minHeight: '60px' }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />

        {/* Fallback Revenue Banner Preview */}
        <div className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-left">
            <span className="text-lg">⚡</span>
            <div>
              <div className="text-xs font-mono font-bold text-slate-200">FITPULSE AD MONETIZATION READY</div>
              <span className="text-[10px] font-mono text-slate-400">Earn revenue per 1,000 views (CPM/CPC)</span>
            </div>
          </div>
          <span className="text-[9px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold border border-emerald-500/30 whitespace-nowrap">
            MONETIZED
          </span>
        </div>
      </div>
    </div>
  );
};
