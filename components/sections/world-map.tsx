export function WorldMap() {
  return (
    <div className="rounded-xl border border-[var(--gm-color-border)] bg-[radial-gradient(circle_at_center,_rgba(198,164,93,0.15),transparent_55%),#161616] p-3">
      <svg className="h-full w-full" viewBox="0 0 900 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#202020" />
          </linearGradient>
        </defs>
        <rect fill="#141414" height="450" rx="18" width="900" x="0" y="0" />

        <path
          d="M70 170 C120 130 180 110 230 130 C280 150 310 200 280 235 C250 270 170 285 110 255 C70 235 45 200 70 170Z"
          fill="url(#land)"
          stroke="#323232"
        />
        <path
          d="M310 120 C350 95 430 90 490 120 C540 145 565 200 545 245 C520 300 430 320 360 285 C295 255 275 165 310 120Z"
          fill="url(#land)"
          stroke="#323232"
        />
        <path
          d="M520 135 C580 105 655 105 720 135 C760 155 790 185 805 220 C820 255 790 295 740 305 C680 318 620 300 575 270 C535 245 500 200 520 135Z"
          fill="url(#land)"
          stroke="#323232"
        />
        <path
          d="M390 275 C430 255 485 260 510 295 C530 322 522 360 485 380 C445 402 390 392 368 358 C350 332 356 292 390 275Z"
          fill="url(#land)"
          stroke="#323232"
        />

        {[
          { x: 180, y: 200, label: "North America" },
          { x: 395, y: 188, label: "Europe" },
          { x: 450, y: 248, label: "Middle East" },
          { x: 458, y: 336, label: "Africa" },
          { x: 655, y: 220, label: "Asia-Pacific" },
        ].map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} fill="#c6a45d" r="7" />
            <circle cx={point.x} cy={point.y} fill="none" r="16" stroke="#c6a45d" strokeOpacity="0.45" />
            <text
              fill="#f5f5f5"
              fontFamily="sans-serif"
              fontSize="12"
              letterSpacing="1"
              textAnchor="middle"
              x={point.x}
              y={point.y - 20}
            >
              {point.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
