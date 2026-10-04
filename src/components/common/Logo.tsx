import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showSubtitle = false }) => {
  const iconSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 group transition-transform active:scale-95 ${className}`}>
      <div className={`relative ${iconSize} flex-shrink-0 flex items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 shadow-inner group-hover:border-zinc-700 transition-colors overflow-hidden`}>
        {/* Subtle dynamic neon accent lines */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-rose-500/10 to-transparent opacity-80" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-zinc-100 relative z-10 transition-transform group-hover:scale-110"
        >
          {/* Minimalist modern music/play crest */}
          <path d="M9 18V5l12-2v13" className="stroke-cyan-400" />
          <circle cx="6" cy="18" r="3" className="fill-cyan-400/20 stroke-cyan-400" />
          <circle cx="18" cy="16" r="3" className="fill-rose-500/20 stroke-rose-500" />
          <path d="M12 9l6-1" className="stroke-rose-400" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`${textSize} text-zinc-100 font-extrabold`}>TikTok</span>
          <span className={`${textSize} bg-gradient-to-r from-rose-500 via-rose-400 to-cyan-400 bg-clip-text text-transparent font-extrabold`}>
            Mastery
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400 -mt-1">
            Académie Pro
          </span>
        )}
      </div>
    </Link>
  );
};
