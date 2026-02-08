import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig, Easing, spring } from 'remotion';

export const CTAScene = ({ ctaText, text, style }: { ctaText: string, text: string, style: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = interpolate(frame % (fps), [0, fps / 2, fps], [1, 1.15, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    });

    const entranceScale = spring({
        frame,
        fps,
        config: {
            stiffness: 100,
            damping: 10,
        },
    });

    const glowOpacity = interpolate(Math.sin(frame / 5), [-1, 1], [0.3, 0.7]);

    return (
        <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden">
            {/* Pulsing cinematic background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900 via-black to-orange-900 opacity-80" />
            <div
                className="absolute inset-0 bg-white opacity-5 pointer-events-none"
                style={{ mixBlendMode: 'overlay' }}
            />

            <div style={{ transform: `scale(${entranceScale})` }} className="relative z-10 flex flex-col items-center gap-12">
                <h2 className="text-5xl text-white font-black drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] uppercase italic tracking-widest text-center px-4">
                    {text || "READY TO PUMP?"}
                </h2>

                <div className="relative group">
                    {/* Animated Glow behind button */}
                    <div
                        className="absolute inset-0 bg-yellow-400 rounded-full blur-[60px]"
                        style={{ opacity: glowOpacity }}
                    />

                    <div
                        style={{ transform: `scale(${scale})` }}
                        className="bg-gradient-to-b from-yellow-300 to-orange-600 text-black px-16 py-8 rounded-3xl font-black text-7xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-b-[12px] border-orange-800 relative z-20"
                    >
                        {ctaText}
                    </div>
                </div>

                <div className="text-yellow-400/50 font-mono text-2xl tracking-[1em] animate-pulse mt-8">
                    CONFIRM TRANSACTION
                </div>
            </div>
        </AbsoluteFill>
    );
};
