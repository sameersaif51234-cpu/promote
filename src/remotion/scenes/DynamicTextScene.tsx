
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing, Img } from 'remotion';
import { TextEntranceConfig } from '../types';

export const DynamicTextScene = ({
    config,
    text,
    logoUrl,
    coinName
}: {
    config: TextEntranceConfig;
    text: string;
    logoUrl?: string;
    coinName: string;
}) => {
    const frame = useCurrentFrame();
    const { animation } = config;

    // Easing selection
    const easing = animation.easing === 'easeOutBack' ? Easing.out(Easing.back()) : Easing.bezier(0.33, 1, 0.68, 1);

    // Opacity
    const opacity = interpolate(
        frame,
        [0, 15],
        animation.opacity,
        { extrapolateRight: 'clamp' }
    );

    // Scale (using spring for better look if it's dynamic, but interpolating based on config values)
    const scale = interpolate(
        frame,
        [0, animation.duration_frames / 2, animation.duration_frames],
        animation.scale.length === 3 ? animation.scale : [animation.scale[0], animation.scale[1], animation.scale[1]],
        {
            easing,
            extrapolateRight: 'clamp'
        }
    );

    // Displacement based on 'from' direction
    const moveMax = 200;
    let translateX = 0;
    let translateY = 0;

    if (animation.from === 'left') translateX = interpolate(frame, [0, 20], [-moveMax, 0], { easing, extrapolateRight: 'clamp' });
    if (animation.from === 'right') translateX = interpolate(frame, [0, 20], [moveMax, 0], { easing, extrapolateRight: 'clamp' });
    if (animation.from === 'top') translateY = interpolate(frame, [0, 20], [-moveMax, 0], { easing, extrapolateRight: 'clamp' });
    if (animation.from === 'bottom') translateY = interpolate(frame, [0, 20], [moveMax, 0], { easing, extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill className="flex items-center justify-center p-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-50" />

            <div
                style={{
                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                    opacity
                }}
                className="flex flex-col items-center"
            >
                {logoUrl && (
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150" />
                        <Img src={logoUrl} className="w-64 h-64 rounded-full border-8 border-white/10 relative z-10 shadow-2xl" />
                    </div>
                )}

                <h1 className="text-8xl font-black text-white text-center italic uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    {text || coinName}
                </h1>
            </div>
        </AbsoluteFill>
    );
};
