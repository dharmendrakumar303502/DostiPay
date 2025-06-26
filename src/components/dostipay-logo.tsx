import { cn } from '@/lib/utils';

export function DostiPayLogo({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-label="DostiPay Logo"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <rect width="64" height="64" rx="12.8" fill="white" />

      {/* Orange Figure */}
      <g fill="#F97316">
        <circle cx="42" cy="22" r="9" />
        <rect x="32" y="31" width="20" height="24" rx="5" />
      </g>
      
      {/* Blue Figure */}
      <g fill="#007BA7">
        <circle cx="22" cy="22" r="9" />
        <rect x="12" y="31" width="20" height="24" rx="5" />
        {/* Arm */}
        <path d="M28,33 C38,31,44,36,46,44 l-3,0 C42,38,37,34,28,35 Z" />
      </g>

      {/* Rupee Badge on Orange Figure */}
      <g>
        <circle cx="42" cy="43" r="8" fill="#22C55E"/>
        <path
            d="M 38 41 h 8 M 38 45 h 8 M 39.5 41 a 2 2 0 0 1 2.5 2 a 2 2 0 0 1 -2.5 2 H 38"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
