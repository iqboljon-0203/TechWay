export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="premium-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0070F3" />
          <stop offset="100%" stopColor="#035397" />
        </linearGradient>
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feOffset dx="0" dy="1" result="offsetBlur" />
          <feMerge>
            <feMergeNode in="offsetBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium Base Container */}
      <rect x="2" y="2" width="96" height="96" rx="26" fill="#001B3D" fillOpacity="0.1" />
      <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#premium-logo-grad)" />
      
      {/* Subtle Glass Reflection */}
      <path d="M4 25C4 13.402 13.402 4 25 4H75C86.598 4 96 13.402 96 25V40L4 60V25Z" fill="white" fillOpacity="0.07" />
      
      {/* Stylized 'T' Symbol */}
      <path 
        d="M32 32H68V40H54V72H46V40H32V32Z" 
        fill="white" 
        filter="url(#logo-shadow)"
      />
      
      {/* Digital Node Accent */}
      <circle cx="50" cy="56" r="3.5" fill="#4DA8FF" />
      
      {/* Border Highlight */}
      <rect x="4.5" y="4.5" width="91" height="91" rx="23.5" stroke="white" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}
