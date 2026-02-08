
import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';
import { ChartZoomConfig } from '../types';

export const DynamicChartScene = ({
    config,
    chartUrl
}: {
    config: ChartZoomConfig;
    chartUrl?: string;
}) => {
    const frame = useCurrentFrame();
    const { animation } = config;

    // Zoom
    const scale = interpolate(
        frame,
        [0, animation.duration_frames],
        animation.zoom,
        { extrapolateRight: 'clamp' }
    );

    // Pan simulation
    const panY = animation.pan === 'top' ? -100 : animation.pan === 'bottom' ? 100 : 0;
    const translateY = interpolate(frame, [0, animation.duration_frames], [0, panY]);

    return (
        <AbsoluteFill className="bg-black overflow-hidden">
            <div
                style={{
                    transform: `scale(${scale}) translateY(${translateY}px)`,
                    width: '100%',
                    height: '100%'
                }}
            >
                {chartUrl ? (
                    <Img
                        src={chartUrl}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-t from-green-900 via-black to-black flex items-center justify-center">
                        <div className="text-green-500 font-mono text-9xl font-bold italic drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                            PUMPING 📈
                        </div>
                    </div>
                )}
            </div>

            {/* Cinematic Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
        </AbsoluteFill>
    );
};
