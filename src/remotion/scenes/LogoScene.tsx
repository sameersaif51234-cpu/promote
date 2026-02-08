import { AbsoluteFill, Img, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

export const LogoScene = ({ coinName, symbol, logoUrl, text, style }: { coinName: string, symbol: string, logoUrl: string, text: string, style: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
        frame,
        fps,
        config: {
            damping: 12,
            stiffness: 100,
            mass: 0.5,
        },
    });

    const opacity = interpolate(frame, [0, 15], [0, 1]);

    // 3D rotation simulation
    const rotateY = interpolate(frame, [0, 60], [45, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Glitch effect (random movement)
    const glitchX = Math.random() > 0.9 ? (Math.random() - 0.5) * 20 : 0;
    const glitchY = Math.random() > 0.9 ? (Math.random() - 0.5) * 20 : 0;

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-60" />

            {/* Background particles simulation */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full opacity-20"
                        style={{
                            width: 2 + Math.random() * 4,
                            height: 2 + Math.random() * 4,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `translateY(${frame * (1 + Math.random() * 2)}px)`,
                        }}
                    />
                ))}
            </div>

            <div
                style={{
                    transform: `scale(${scale}) rotateY(${rotateY}deg) translate(${glitchX}px, ${glitchY}px)`,
                    opacity,
                    perspective: '1000px'
                }}
                className="relative z-10 flex flex-col items-center"
            >
                <div className="relative">
                    {/* Shadow/Glow behind logo */}
                    <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-30 animate-pulse" />

                    {logoUrl ? (
                        <Img src={logoUrl} className="w-72 h-72 rounded-full border-8 border-white/20 shadow-[0_0_80px_rgba(255,255,255,0.4)] mb-8 relative z-20" />
                    ) : (
                        <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-600 flex items-center justify-center text-8xl shadow-[0_0_80px_rgba(234,179,8,0.5)] mb-8 font-black text-black relative z-20">
                            {symbol || '$'}
                        </div>
                    )}
                </div>

                <h1 className="text-7xl font-black text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] font-poppins text-center px-4 leading-tight italic tracking-tighter uppercase">
                    {text || coinName}
                </h1>

                {/* Glow underline */}
                <div className="w-32 h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-4 rounded-full blur-sm" />
            </div>
        </AbsoluteFill>
    );
};
