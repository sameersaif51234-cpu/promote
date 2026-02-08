import React from 'react';

export const SolarSystemBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[#050510] overflow-hidden pointer-events-none perspective-[1200px]">

            {/* Deep Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#000000_100%)] opacity-60"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

            {/* 3D Plane Container */}
            <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 perspective-3d" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}>

                {/* Sun */}
                <div className="absolute top-1/2 left-1/2 w-[120px] h-[120px] rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 animate-sun shadow-[0_0_100px_rgba(253,186,116,0.6)] z-20"></div>

                {/* Mercury System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]">
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '6s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6" style={{ transform: 'rotateX(-75deg)' }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-300 to-gray-500 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Venus System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]">
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '10s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8" style={{ transform: 'rotateX(-75deg)' }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-200 to-yellow-600 shadow-[0_0_10px_rgba(255,165,0,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Earth System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] border border-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]">
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '18s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10" style={{ transform: 'rotateX(-75deg)' }}>
                            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-green-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                {/* Moon inside Earth's billboarded frame? No, better to stick moon to Earth's container */}
                            </div>
                            {/* Moon (Simple floating next to Earth) */}
                            <div className="absolute top-1/2 -right-6 w-3 h-3 rounded-full bg-gray-200 shadow-sm animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Mars System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] border border-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]">
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '24s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7" style={{ transform: 'rotateX(-75deg)' }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 to-red-700 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        </div>
                    </div>
                </div>

                {/* Jupiter System */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-white/5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]">
                    <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '45s' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20" style={{ transform: 'rotateX(-75deg)' }}>
                            <div className="w-full h-full rounded-full bg-gradient-to-b from-orange-300 via-yellow-200 to-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.5)]"></div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Stars */}
            {Array.from({ length: 40 }).map((_, i) => (
                <div
                    key={`star-l1-${i}`}
                    className="absolute rounded-full bg-white opacity-60 animate-pulse"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2}px`,
                        height: `${Math.random() * 2}px`,
                        animationDuration: `${Math.random() * 3 + 2}s`,
                    }}
                ></div>
            ))}

            {/* Meteoroids (Overlay) */}
            <div className="absolute top-[10%] left-[10%] w-[200px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent animate-[meteor_7s_linear_infinite] blur-sm opacity-0" style={{ transform: 'rotate(45deg)' }}></div>
        </div>
    );
};
