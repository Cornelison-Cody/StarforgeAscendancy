import React from "react";

interface AttackIconProps {
    value: number;
}

const AttackIcon: React.FC<AttackIconProps> = ({ value }) => (
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }}>
        <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <linearGradient id="attackRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff6f61" />
                    <stop offset="100%" stopColor="#ff1744" />
                </linearGradient>
            </defs>
            {/* Removed red circle border */}
            <polygon
                points="22,4 30,30 22,22 14,30"
                fill="#ff6f61"
                stroke="#ff1744"
                strokeWidth="1.5"
                filter="url(#glow-red)"
                fillOpacity="0.5"
                strokeOpacity="0.5"
                transform="rotate(30 22 22)"
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
                filter="url(#glow-red)"
            >
                {value}
            </text>
        </svg>
    </span>
);

export default AttackIcon;
