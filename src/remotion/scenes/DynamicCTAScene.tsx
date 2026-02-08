
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { CTAPunchConfig } from '../types';

export const DynamicCTAScene = ({
    config,
    ctaText
}: {
    config: CTAPunchConfig;
    ctaText: string;
}) => {
    const frame = useCurrentFrame();
    const { animation } = config;

    // Pulsing Scale
    const scaleValues = animation.scale.length === 3 ? animation.scale : [animation.scale[0], animation.scale[1], animation.scale[0]];
    const scale = interpolate(
        frame % 30, // Loop pulses
        [0, 15, 30],
        scaleValues,
        { easing: Easing.bezier(0.25, 0.1, 0.25, 1.0) }
    );

    // Shake
    const shakeX = animation.shake ? Math.sin(frame * 0.8) * 5 : 0;
    const shakeY = animation.shake ? Math.cos(frame * 0.8) * 5 : 0;

    return (
        <AbsoluteFill className="flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950 via-black to-orange-950 opacity-90" />

            <div
                style={{
                    transform: `scale(${scale}) translate(${shakeX}px, ${shakeY}px)`
                }}
                className="flex flex-col items-center gap-12 relative"
            >
                {/* Glow */}
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-[100px] opacity-20 scale-150" />

                <div className="bg-gradient-to-b from-yellow-300 to-orange-600 text-black px-20 py-10 rounded-[40px] font-black text-8xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] border-b-[16px] border-orange-800 relative z-10 uppercase italic">
                    {ctaText}
                </div>

                <div className="text-yellow-400/50 font-mono text-3xl tracking-[1.5em] animate-pulse">
                    LIMITED SUPPLY
                </div>
            </div>
        </AbsoluteFill>
    );
};
