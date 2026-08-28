import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const Container: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

export const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden", className)}>
    {children}
  </section>
);

export const SectionHeading: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}> = ({ eyebrow, title, subtitle, centered = false, dark = false, className }) => (
  <div className={cn("mb-12 md:mb-16 max-w-3xl", centered && "mx-auto text-center", className)}>
    {eyebrow && (
      <span className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border",
        dark 
          ? "bg-brand-teal/10 text-brand-teal border-brand-teal/30"
          : "bg-brand-soft text-brand-blue border-brand-teal/20"
      )}>
        {eyebrow}
      </span>
    )}
    <h2 className={cn(
      "font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight",
      dark ? "text-white" : "text-brand-navy"
    )}>
      {title}
    </h2>
    {subtitle && (
      <p className={cn(
        "mt-4 text-base sm:text-lg leading-relaxed font-normal",
        dark ? "text-slate-300" : "text-slate-600"
      )}>
        {subtitle}
      </p>
    )}
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg relative overflow-hidden group";
  
  const variants = {
    primary: "bg-brand-teal text-white hover:bg-[#20968E] shadow-md hover:shadow-brand-glow focus-visible:ring-brand-teal active:scale-[0.98]",
    secondary: "bg-brand-blue text-white hover:bg-[#09294F] shadow-md focus-visible:ring-brand-blue active:scale-[0.98]",
    outline: "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus-visible:ring-brand-blue active:scale-[0.98]",
    ghost: "text-brand-blue hover:bg-brand-soft focus-visible:ring-brand-blue",
    dark: "bg-brand-navy text-white hover:bg-slate-800 border border-slate-700 shadow-lg focus-visible:ring-brand-teal active:scale-[0.98]"
  };

  const sizes = {
    sm: "text-xs px-3.5 py-2 space-x-1.5",
    md: "text-sm px-5 py-2.5 space-x-2",
    lg: "text-base px-7 py-3.5 space-x-2.5"
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {/* Shine overlay animation */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-shine pointer-events-none" />
      )}
      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; variant?: 'teal' | 'blue' | 'gray'; className?: string }> = ({
  children,
  variant = 'teal',
  className
}) => {
  const variants = {
    teal: "bg-brand-teal/10 text-brand-teal border-brand-teal/20",
    blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    gray: "bg-slate-100 text-slate-700 border-slate-200"
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border", variants[variant], className)}>
      {children}
    </span>
  );
};
