'use client';

import { useState, useEffect } from 'react';

// Helper for random number generation
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export function CinematicEarthBackground() {
    // Background Animation Elements
    const [stars, setStars] = useState<{ id: number; top: string; left: string; animationDelay: string }[]>([]);
    const [satellites, setSatellites] = useState<{ id: number; top: string; left: string; delay: string }[]>([]);

    useEffect(() => {
        // Generate stars
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
            animationDelay: `${random(0, 5)}s`
        }));
        setStars(newStars);

        // Generate satellites for the network
        const newSatellites = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            top: `${random(10, 60)}%`, // Upper half mostly
            left: `${random(10, 90)}%`,
            delay: `${random(0, 2)}s`
        }));
        setSatellites(newSatellites);
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-black">
            {/* Earth Image - Positioned slightly off-center/bottom */}
            <div
                className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[120%] opacity-90"
                style={{
                    backgroundImage: 'url(/images/earth-view.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    backgroundRepeat: 'no-repeat'
                }}
            />

            {/* Network / Connection Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 230, 0, 0)" />
                        <stop offset="50%" stopColor="rgba(255, 230, 0, 0.5)" />
                        <stop offset="100%" stopColor="rgba(255, 230, 0, 0.8)" />
                    </linearGradient>
                </defs>
                {satellites.map((sat) => (
                    <line
                        key={sat.id}
                        x1={sat.left}
                        y1={sat.top}
                        x2="50%"
                        y2="100%"
                        stroke="yellow"
                        strokeWidth="1"
                        style={{ animation: `pulse-line ${3 + Math.random() * 2}s infinite ${sat.delay}` }}
                    />
                ))}
            </svg>

            {/* Stars Layer */}
            {stars.map(star => (
                <div
                    key={star.id}
                    className="absolute z-0 w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
                    style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }}
                />
            ))}

            {/* Satellites (Nodes) */}
            {satellites.map(sat => (
                <div
                    key={sat.id}
                    className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_yellow]"
                    style={{
                        top: sat.top,
                        left: sat.left,
                        animation: `twinkle 4s infinite ${sat.delay}`
                    }}
                />
            ))}
        </div>
    );
}
