import React from "react";

interface PowerIconProps {
    value: number;
}

const PowerIcon: React.FC<PowerIconProps> = ({ value }) => (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }}>
        <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Outer orange ring gradient */}
                <linearGradient id="outerRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe156" />
                    <stop offset="100%" stopColor="#ff9500" />
                </linearGradient>

                {/* Green glow gradient for waves */}
                <radialGradient id="waveGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#43d675" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#43d675" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Outer bold glowing ring */}
            <circle
                cx="22"
                cy="22"
                r="20"
                stroke="url(#outerRing)"
                strokeWidth="2.5"
                fill="none"
                filter="url(#glow)"
            />

            {/* Wavy overlapping energy rings */}
            <path
                d="M22 6 
       Q30 10, 36 16 
       Q40 22, 36 28 
       Q30 34, 22 38 
       Q14 34, 8 28 
       Q4 22, 8 16 
       Q14 10, 22 6 Z"
                fill="none"
                stroke="#43d675"
                strokeWidth="1.2"
                filter="url(#glow)"
            />
                // ...removed inner green border path...

            {/* Center glowing number */}
            <text
                x="22"
                y="24"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Orbitron,Segoe UI,Arial,sans-serif"
                fontWeight="bold"
                fontSize="22"
                fill="#43d675"
                filter="url(#glow)"
            >
                {value}
            </text>
        </svg>
    </span>
);

export default PowerIcon;
