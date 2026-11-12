import React from 'react';
import { Loader2 } from 'lucide-react';

export function Loader({
  show = false,
  overlay = true,
  message = 'Loading...',
  className = '',
}) {
  if (!show) return null;

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div className="relative w-12 h-12">
        <Loader2 className="w-full h-full text-emerald-400 animate-spin" />
        <div
          className="absolute inset-0 w-full h-full border-4 border-zinc-700 border-t-emerald-400 rounded-full animate-[spin_1s_linear_infinite]"
        />
      </div>
      <p className="text-zinc-200 text-sm font-medium tracking-wide uppercase">
        {message}
      </p>
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="inset-0 absolute z-[60] bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center">
      {spinner}
    </div>
  );
}

export default Loader;
