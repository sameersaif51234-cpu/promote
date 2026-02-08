import { AbsoluteFill, Img, useCurrentFrame, interpolate, useVideoConfig } from 'remotion';

export const ChartScene = ({ chartUrl, text, style }: { chartUrl: string, text: string, style: string }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Heroic pan/zoom effect
    const scale = interpolate(frame, [0, 150], [1.1, 1.5], {
        extrapolateRight: 'clamp',
    });

    // Constant slow movement
    const translateX = Math.sin(frame / 30) * 20;
    const translateY = Math.cos(frame / 30) * 20;

    // Shake effect (more intense if style is pump)
    const shakeAmount = style === 'pump' ? 5 : 2;
    const shakeX = Math.sin(frame * 0.5) * shakeAmount;
    const shakeY = Math.cos(frame * 0.5) * shakeAmount;

    return (
        <AbsoluteFill className="bg-black overflow-hidden">
            <div
                style={{
                    transform: `scale(${scale}) translate(${translateX + shakeX}px, ${translateY + shakeY}px)`,
                    width: '100%',
                    height: '100%',
                }}
                className="relative"
            >
                {chartUrl ? (
                    <Img
                        src={chartUrl}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-t from-green-900 via-black to-black flex items-center justify-center">
                        <div className="text-green-500 font-mono text-9xl font-bold italic drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                            PUMP IT! 🚀
                        </div>
                    </div>
                )}

                {/* Overlay scanlines effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            </div>

            <AbsoluteFill className="flex justify-center items-end pb-24 bg-gradient-to-t from-black via-transparent to-transparent">
                <div className="px-8 transform -rotate-1">
                    <h2 className="text-green-400 text-6xl font-black text-center drop-shadow-[0_0_20px_rgba(34,197,94,0.8)] font-poppins uppercase italic tracking-tighter">
                        {text || "TO THE MOON"}
                    </h2>
                </div>
            </AbsoluteFill>

            {/* Speed lines effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-[1px] bg-white/20"
                        style={{
                            width: '200px',
                            left: `-200px`,
                            top: `${Math.random() * 100}%`,
                            transform: `translateX(${((frame * 20 + i * 100) % (2000))}px)`,
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};
