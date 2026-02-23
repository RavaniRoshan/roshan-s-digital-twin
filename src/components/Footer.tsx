const Footer = () => {
  return (
    <footer className="border-t border-border mt-16 relative overflow-hidden">
      {/* Watermark area */}
      <div className="relative max-w-5xl mx-auto py-20 px-6">
        {/* SVG Circuit/Neural illustration - blended watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none watermark-fade">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full text-foreground opacity-[0.03] dark:opacity-[0.06] mix-blend-multiply dark:mix-blend-screen"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Central brain shape */}
            <ellipse cx="400" cy="200" rx="120" ry="100" strokeDasharray="4 6" />
            <ellipse cx="400" cy="200" rx="90" ry="75" strokeDasharray="3 5" />
            {/* Neural pathways */}
            <path d="M280 200 Q200 150 120 180 Q60 200 40 160" />
            <path d="M280 200 Q200 250 130 230 Q70 210 30 250" />
            <path d="M520 200 Q600 150 680 180 Q740 200 760 160" />
            <path d="M520 200 Q600 250 670 230 Q730 210 770 250" />
            <path d="M400 100 Q380 40 340 20" />
            <path d="M400 100 Q420 40 460 20" />
            <path d="M400 300 Q380 360 340 380" />
            <path d="M400 300 Q420 360 460 380" />
            {/* Circuit nodes */}
            {[
              [120, 180], [130, 230], [40, 160], [30, 250],
              [680, 180], [670, 230], [760, 160], [770, 250],
              [340, 20], [460, 20], [340, 380], [460, 380],
              [200, 120], [600, 120], [200, 280], [600, 280],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3" fill="currentColor" opacity="0.5" />
            ))}
            {/* Cross connections */}
            <path d="M200 120 L280 200" strokeDasharray="2 4" />
            <path d="M600 120 L520 200" strokeDasharray="2 4" />
            <path d="M200 280 L280 200" strokeDasharray="2 4" />
            <path d="M600 280 L520 200" strokeDasharray="2 4" />
            {/* Inner brain folds */}
            <path d="M350 160 Q400 130 450 160" strokeDasharray="3 3" />
            <path d="M340 200 Q400 170 460 200" strokeDasharray="3 3" />
            <path d="M350 240 Q400 210 450 240" strokeDasharray="3 3" />
            {/* Additional circuit traces */}
            <path d="M150 150 L200 120 L250 140" strokeDasharray="2 6" />
            <path d="M650 150 L600 120 L550 140" strokeDasharray="2 6" />
            <path d="M150 260 L200 280 L250 260" strokeDasharray="2 6" />
            <path d="M650 260 L600 280 L550 260" strokeDasharray="2 6" />
          </svg>
        </div>

        {/* Quote overlay */}
        <p className="relative text-center text-lg sm:text-xl md:text-2xl italic font-light text-foreground/[0.08] dark:text-foreground/[0.12] rotate-[-2deg] leading-relaxed max-w-2xl mx-auto select-none pointer-events-none">
          "sometimes or most times the best way is just the way you know to do it"
        </p>

        {/* Stylized signature */}
        <div className="absolute bottom-6 right-8 rotate-[-3deg] pointer-events-none select-none">
          <svg
            viewBox="0 0 200 50"
            className="w-32 h-auto text-muted-foreground/20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* "Ravani" */}
            <path d="M10 35 Q12 15 18 15 Q24 15 20 30 L22 18 Q28 12 32 20 L30 35 M36 20 Q40 12 44 20 L42 35 M48 25 Q52 18 56 25 Q54 32 48 30 M60 15 L60 35 M66 20 Q70 12 74 20 L72 35 M78 15 L78 35" />
            {/* "Roshan" */}
            <path d="M95 35 Q97 15 103 15 Q109 15 105 30 M110 20 Q114 10 118 20 Q118 32 110 30 M122 20 Q126 12 130 20 L128 35 M134 15 L134 35 Q138 30 142 25 Q138 35 134 35 M148 20 Q152 12 156 20 L154 35 M160 20 Q164 12 168 20 L166 35" />
            {/* Underline flourish */}
            <path d="M8 40 Q60 44 120 38 Q160 36 190 40" strokeDasharray="3 2" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Footer content */}
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>email: ravaniroshansingh[at]gmail.com</span>
        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/ravani-roshan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://github.com/RavaniRoshan" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
        <span>© 2026 Ravani Roshan</span>
      </div>
    </footer>
  );
};

export default Footer;
