import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';

export const MemeScene = ({ text, style }: { text: string, style: string }) => {
    const frame = useCurrentFrame();

    const rotation = interpolate(frame, [0, 150], [-3, 3], {
        easing: Easing.bezier(0.33, 1, 0.68, 1),
    });
    const scale = interpolate(frame, [0, 75, 150], [1.1, 1.25, 1.1]);

    // Strobing flash effect for intensity
    const flash = frame % 10 < 2 ? 'opacity-80' : 'opacity-100';

    return (
        <AbsoluteFill className={`bg-purple-900 flex items-center justify-center overflow-hidden ${flash}`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-black to-blue-900" />

            {/* Dynamic background shapes */}
            <div className="absolute inset-0 opacity-20">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute border-[20px] border-white/10"
                        style={{
                            width: 600,
                            height: 600,
                            top: '50%',
                            left: '50%',
                            marginTop: -300,
                            marginLeft: -300,
                            transform: `rotate(${frame * (i + 1) * 0.2}deg) scale(${1 + i * 0.5})`,
                            borderRadius: i % 2 === 0 ? '50%' : '0%',
                        }}
                    />
                ))}
            </div>

            <div style={{ transform: `rotate(${rotation}deg) scale(${scale})` }} className="relative z-10 text-center px-8">
                <div className="text-[120px] mb-8 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">🚀💎👑</div>
                <h2 className="text-white text-7xl font-black bg-white/10 p-10 rounded-[40px] backdrop-blur-2xl font-poppins border-8 border-white/20 transform -rotate-3 uppercase italic tracking-tighter shadow-2xl">
                    {text}
                </h2>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 bg-yellow-400 text-black font-black text-4xl px-4 py-2 rounded-lg rotate-12 shadow-xl">
                    LEGEND
                </div>
            </div>
        </AbsoluteFill>
    );
};
