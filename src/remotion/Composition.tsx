import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';
import { Template, SceneConfig } from './types';
import { DynamicTextScene } from './scenes/DynamicTextScene';
import { DynamicChartScene } from './scenes/DynamicChartScene';
import { DynamicCTAScene } from './scenes/DynamicCTAScene';

export const MainComposition = ({
    coinName,
    symbol,
    logoUrl,
    chartUrl,
    ctaText,
    script,
    style,
    isPaid,
    template // New prop
}: {
    coinName: string;
    symbol: string;
    logoUrl: string;
    chartUrl: string;
    ctaText: string;
    script: string[];
    style: string;
    isPaid?: boolean;
    template?: Template; // New prop
}) => {
    const { fps } = useVideoConfig();

    // Default fallback scenes if no template is provided
    const scenes: SceneConfig[] = template?.scenes || [
        {
            type: 'text_entrance',
            text_source: 'ai_hype_text',
            animation: {
                from: 'left',
                scale: [0.8, 1],
                opacity: [0, 1],
                duration_frames: 60,
                easing: 'easeOutBack'
            }
        },
        {
            type: 'chart_zoom',
            source: 'chart_image',
            animation: {
                zoom: [1, 1.2],
                pan: 'center',
                duration_frames: 150
            }
        },
        {
            type: 'cta_punch',
            text: ctaText,
            animation: {
                scale: [1, 1.2],
                shake: true,
                duration_frames: 90
            }
        }
    ];

    let currentFrame = 0;

    return (
        <AbsoluteFill style={{ backgroundColor: template?.style.background === 'dark_gradient' ? '#000' : '#000' }}>
            {/* Background Layer could be added here based on template.style */}

            {scenes.map((scene, index) => {
                const duration = scene.animation.duration_frames;
                const from = currentFrame;
                currentFrame += duration;

                return (
                    <Sequence key={index} from={from} durationInFrames={duration}>
                        {scene.type === 'text_entrance' && (
                            <DynamicTextScene
                                config={scene}
                                text={script[index % script.length]}
                                logoUrl={logoUrl}
                                coinName={coinName}
                            />
                        )}
                        {scene.type === 'chart_zoom' && (
                            <DynamicChartScene
                                config={scene}
                                chartUrl={chartUrl}
                            />
                        )}
                        {scene.type === 'cta_punch' && (
                            <DynamicCTAScene
                                config={scene}
                                ctaText={scene.text === 'BUY NOW' ? ctaText : scene.text}
                            />
                        )}
                    </Sequence>
                );
            })}

            {/* Watermark Overlay */}
            {!isPaid && (
                <AbsoluteFill className="justify-end items-end p-8 pointer-events-none">
                    <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                        <h3 className="text-white/50 font-bold text-xl uppercase tracking-widest">
                            Created with Coinface
                        </h3>
                    </div>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};
