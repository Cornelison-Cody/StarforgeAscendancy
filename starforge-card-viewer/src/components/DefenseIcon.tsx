import React from "react";

interface DefenseIconProps {
    value: number;
}

const DefenseIcon: React.FC<DefenseIconProps> = ({ value }) => (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }}>
        <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="defenseRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2ec4ff" />
                    <stop offset="100%" stopColor="#1976d2" />
                </linearGradient>
            </defs>
            <path
                d="M22 8
                   Q25.5 12 30 12
                   Q32 12 32 15
                   Q32 27 22 34
                   Q12 27 12 15
                   Q12 12 14 12
                   Q18.5 12 22 8
                   Z"
                fill="#2ec4ff"
                stroke="#1976d2"
                strokeWidth="1.5"
                filter="url(#glow-blue)"
                fillOpacity="0.5"
                strokeOpacity="0.5"
            />
            <text
                x="23"
                y="22"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Orbitron,Segoe UI,Arial,sans-serif"
                fontWeight="bold"
                fontSize="26"
                fill="#F0F0F0"
                fillOpacity="0.7"
                filter="url(#glow-blue)"
            >
                {value}
            </text>
        </svg>
    </span>
);

export default DefenseIcon;
