import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded cursor-pointer font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variants = {
    default: 'bg-white text-black border border-zinc-200 hover:bg-zinc-100',
    outline:
      'bg-transparent text-zinc-200 border border-zinc-600 hover:bg-zinc-800/50',
    destructive:
      'bg-zinc-800 text-zinc-200 border border-zinc-800 hover:bg-red-900/80 hover:border-red-900/80',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500',
    ghost: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
    link: 'text-zinc-400 hover:text-zinc-200 underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={loading || disabled ? undefined : onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && children}
    </button>
  );
}