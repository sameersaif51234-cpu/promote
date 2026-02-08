'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Rocket, Play, RefreshCw, Wand2 } from 'lucide-react';
import { InteractiveSpaceBackground } from '@/components/InteractiveSpaceBackground';
import { Player } from '@remotion/player';
import { MainComposition } from '@/remotion/Composition';

export default function VideoGeneratorPage() {
    const [formData, setFormData] = useState({
        coinName: '',
        symbol: '',
        logoUrl: '',
        chartUrl: '',
        ctaText: 'BUY NOW',
        style: 'pump',
        videoIdea: ''
    });

    const [logoFile, setLogoFile] = useState<string>('');
    const [chartFile, setChartFile] = useState<string>('');
    const [showPreview, setShowPreview] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'chart') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (type === 'logo') setLogoFile(reader.result as string);
                else setChartFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const [isGenerating, setIsGenerating] = useState(false);
    const [script, setScript] = useState<string[]>([]);

    const handleGenerateVideo = async () => {
        setIsGenerating(true);
        setShowPreview(false);
        try {
            const response = await fetch('/api/generate-script', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coinName: formData.coinName,
                    style: formData.style,
                    videoIdea: formData.videoIdea
                }),
            });

            const data = await response.json();
            if (data.script) {
                setScript(data.script);
                setShowPreview(true);
            } else {
                console.error("No script returned");
            }
        } catch (error) {
            console.error("Failed to generate script", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const [isPaid, setIsPaid] = useState(false);

    const handlePayment = () => {
        // Simulate payment
        const confirmed = window.confirm("Pay 0.1 SOL to remove watermark and enable HD download?");
        if (confirmed) {
            setIsPaid(true);
        }
    };

    const [template, setTemplate] = useState({
        template_name: "Crypto Hype Intro",
        duration_seconds: 12,
        style: {
            font: "Bold Sans",
            primary_color: "#00FFAA",
            background: "dark_gradient",
            glow: true
        },
        scenes: [
            {
                type: "text_entrance" as const,
                text_source: "ai_hype_text",
                animation: {
                    from: "left" as const,
                    scale: [0.8, 1.1, 1],
                    opacity: [0, 1],
                    duration_frames: 45,
                    easing: "easeOutBack" as const
                }
            },
            {
                type: "chart_zoom" as const,
                source: "chart_image" as const,
                animation: {
                    zoom: [1, 1.2],
                    pan: "center" as const,
                    duration_frames: 60
                }
            },
            {
                type: "cta_punch" as const,
                text: "BUY NOW",
                animation: {
                    scale: [1, 1.3, 1],
                    shake: true,
                    duration_frames: 30
                }
            }
        ]
    });

    const totalDurationFrames = template.scenes.reduce((acc, scene) => acc + scene.animation.duration_frames, 0);

    return (
        <div className="min-h-screen text-white relative flex flex-col font-sans">
            <InteractiveSpaceBackground />

            <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-4 font-poppins">
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Hype Video</span> Generator
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Turn your meme coin into a viral sensation. Generate a professional promo video in seconds.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Input Form */}
                    <Card className="p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Coin Name</label>
                                    <Input
                                        placeholder="e.g. DogeToMars"
                                        value={formData.coinName}
                                        onChange={(e) => setFormData({ ...formData, coinName: e.target.value })}
                                        className="bg-black/50 border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Symbol</label>
                                    <Input
                                        placeholder="e.g. DTM"
                                        value={formData.symbol}
                                        onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                                        className="bg-black/50 border-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Upload Logo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'logo')}
                                    className="block w-full text-sm text-gray-400
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-purple-600 file:text-white
                                      hover:file:bg-purple-700
                                    "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Upload Chart Image (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'chart')}
                                    className="block w-full text-sm text-gray-400
                                      file:mr-4 file:py-2 file:px-4
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-semibold
                                      file:bg-purple-600 file:text-white
                                      hover:file:bg-purple-700
                                    "
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Video Idea / Theme</label>
                                <textarea
                                    placeholder="Describe your video idea... e.g. Elon Musk tweeting about it, going to Mars, community takeover..."
                                    value={formData.videoIdea}
                                    onChange={(e) => setFormData({ ...formData, videoIdea: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 text-white rounded-md p-3 h-24 focus:ring-2 focus:ring-purple-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">CTA Text</label>
                                    <Input
                                        placeholder="e.g. BUY NOW"
                                        value={formData.ctaText}
                                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                                        className="bg-black/50 border-white/10 text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Video Style</label>
                                    <Select
                                        value={formData.style}
                                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                                        options={[
                                            { value: 'pump', label: '🚀 Pump (High Energy)' },
                                            { value: 'degen', label: '🐸 Degen (Meme heavy)' },
                                            { value: 'serious', label: '💼 Serious (Professional)' },
                                        ]}
                                        className="bg-black/50 border-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleGenerateVideo}
                                    disabled={isGenerating || !formData.coinName || !logoFile}
                                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-900/20"
                                >
                                    {isGenerating ? (
                                        <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <Wand2 className="mr-2 h-5 w-5" />
                                    )}
                                    {isGenerating ? 'Generating Video...' : 'Generate Video'}
                                </Button>
                            </div>

                            {script.length > 0 && (
                                <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Generated Script</h3>
                                    <ul className="space-y-2">
                                        {script.map((line, i) => (
                                            <li key={i} className="flex gap-3 text-gray-200">
                                                <span className="text-purple-400 font-mono">0{i + 1}</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Preview Area */}
                    <div className="sticky top-24">
                        <Card className="aspect-[9/16] bg-black rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl flex items-center justify-center group max-w-sm mx-auto">
                            {showPreview ? (
                                <Player
                                    component={MainComposition}
                                    durationInFrames={totalDurationFrames}
                                    compositionWidth={1080}
                                    compositionHeight={1920}
                                    fps={30}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    controls
                                    inputProps={{
                                        coinName: formData.coinName || 'Coin Name',
                                        symbol: formData.symbol || 'SYMBOL',
                                        logoUrl: logoFile,
                                        chartUrl: chartFile,
                                        ctaText: formData.ctaText || 'BUY NOW',
                                        script: script.length > 0 ? script : ['HYPE HYPE', 'TO THE MOON', '100X GEM', 'BUY NOW'],
                                        style: formData.style,
                                        template: template
                                    }}
                                />
                            ) : (
                                <div className="text-center z-10 p-8">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4">
                                        {isGenerating ? (
                                            <RefreshCw className="h-8 w-8 text-purple-400 animate-spin" />
                                        ) : (
                                            <Play className="h-8 w-8 text-white/50 fill-white/50 ml-1" />
                                        )}
                                    </div>
                                    <p className="text-gray-400 font-medium">
                                        {isGenerating ? "AI is crafting your masterpiece..." : "Fill details & click Generate to watch preview"}
                                    </p>
                                </div>
                            )}
                        </Card>

                        <div className="mt-8 flex flex-col items-center gap-4">
                            {!isPaid && (
                                <button
                                    onClick={handlePayment}
                                    className="text-sm text-yellow-500 hover:text-yellow-400 underline underline-offset-4"
                                >
                                    Pay to Remove Watermark & Enable HD
                                </button>
                            )}

                            <Button
                                size="lg"
                                className="h-16 px-12 text-xl font-bold bg-white text-black hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={script.length === 0}
                            >
                                {isPaid ? 'Download HD Video' : 'Download Video (Watermarked)'} <Rocket className="ml-2 h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
