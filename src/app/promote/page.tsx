'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Rocket, Upload, Check, Coins, Layers, Palette } from 'lucide-react';
import Link from 'next/link';

// Helper for random number generation
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function PromotePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        coinName: '',
        contractAddress: '',
        chain: 'Solana', // Default
        theme: 'modern'
    });

    // Background Animation Elements
    const [stars, setStars] = useState<{ id: number; top: string; left: string; animationDelay: string }[]>([]);
    const [satellites, setSatellites] = useState<{ id: number; top: string; left: string; delay: string }[]>([]);

    useEffect(() => {
        // Generate stars
        const newStars = Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
            animationDelay: `${random(0, 5)}s`
        }));
        setStars(newStars);

        // Generate satellites for the network
        const newSatellites = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            top: `${random(10, 60)}%`, // Upper half mostly
            left: `${random(10, 90)}%`,
            delay: `${random(0, 2)}s`
        }));
        setSatellites(newSatellites);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.contractAddress && formData.chain) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call/Verification
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Redirect to the new dynamic coin page
        const params = new URLSearchParams({
            chain: formData.chain,
            name: formData.coinName || 'Custom Token', // Fallback if empty in UI (though required)
            theme: formData.theme
        });

        router.push(`/coin/${formData.contractAddress}?${params.toString()}`);
    };

    // Theme Selection Configuration
    const themes = [
        { id: 'modern', name: 'Dark', color: 'bg-gray-900', border: 'border-purple-500', activeClass: 'ring-2 ring-purple-500' },
        { id: 'light', name: 'Light', color: 'bg-white', border: 'border-gray-200', activeClass: 'ring-2 ring-blue-500' },
        { id: 'rainbow', name: 'Rainbow', color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500', border: 'border-transparent', activeClass: 'ring-2 ring-white' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden text-white selection:bg-accent selection:text-white">
            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 bg-black">
                {/* Earth Image - Positioned slightly off-center/bottom */}
                <div
                    className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[120%] opacity-90"
                    style={{
                        backgroundImage: 'url(/images/earth-view.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        backgroundRepeat: 'no-repeat',
                        // Optional slow spin if desired, but image might not be seamless
                        // transform: 'rotate(-5deg)' 
                    }}
                />

                {/* Network / Connection Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255, 230, 0, 0)" />
                            <stop offset="50%" stopColor="rgba(255, 230, 0, 0.5)" />
                            <stop offset="100%" stopColor="rgba(255, 230, 0, 0.8)" />
                        </linearGradient>
                    </defs>
                    {satellites.map((sat) => (
                        <line
                            key={sat.id}
                            x1={sat.left}
                            y1={sat.top}
                            x2="50%"        // Connect to center bottom (approx Earth location)
                            y2="100%"
                            stroke="yellow"
                            strokeWidth="1"
                            style={{ animation: `pulse-line ${3 + Math.random() * 2}s infinite ${sat.delay}` }} // Random pulse
                        />
                    ))}
                </svg>

                {/* Stars Layer */}
                {stars.map(star => (
                    <div
                        key={star.id}
                        className="absolute z-0 w-[2px] h-[2px] bg-white rounded-full animate-twinkle"
                        style={{ top: star.top, left: star.left, animationDelay: star.animationDelay }}
                    />
                ))}

                {/* Satellites (Nodes) */}
                {satellites.map(sat => (
                    <div
                        key={sat.id}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_yellow]"
                        style={{
                            top: sat.top,
                            left: sat.left,
                            animation: `twinkle 4s infinite ${sat.delay}`
                        }}
                    />
                ))}
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-5xl h-full flex flex-col items-center justify-center min-h-[80vh]">

                {/* Header (conditionally smaller on Step 2) */}
                <div className={`text-center transition-all duration-500 ${step === 2 ? 'mb-8 scale-90' : 'mb-12'}`}>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white font-poppins mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {step === 1 ? 'Promote Your Coin' : 'Customize Your Token Page'}
                    </h1>
                    {step === 1 && (
                        <p className="text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Join the global network. Launch your meme coin to the world.
                        </p>
                    )}
                </div>

                {/* STEP 1: Contract & Chain */}
                {step === 1 && (
                    <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <Card className="glass-panel p-8 md:p-10 shadow-2xl border border-gray-700/50 backdrop-blur-xl rounded-3xl">
                            <form onSubmit={handleNextStep} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Network
                                    </label>
                                    <Select
                                        name="chain"
                                        value={formData.chain}
                                        onChange={handleChange}
                                        required
                                        options={[
                                            { label: 'Solana', value: 'Solana' },
                                            { label: 'Ethereum', value: 'Ethereum' },
                                            { label: 'BNB Smart Chain', value: 'BNB' },
                                            { label: 'Base', value: 'Base' },
                                        ]}
                                        className="bg-gray-800/50 border-gray-600 text-white h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                                        <Coins className="w-4 h-4" /> Contract Address
                                    </label>
                                    <Input
                                        name="contractAddress"
                                        placeholder="0x..."
                                        value={formData.contractAddress}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    Continue to Customize <Rocket className="ml-2 w-6 h-6 animate-pulse" />
                                </Button>
                            </form>

                            <div className="mt-8 text-center">
                                <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                                </Link>
                            </div>
                        </Card>
                    </div>
                )}

                {/* STEP 2: Customization (Visual Layout from Reference) */}
                {step === 2 && (
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
                        {/* LEFT COLUMN: Upload & Name */}
                        <div className="space-y-6">
                            <Card className="glass-panel p-8 shadow-2xl border border-gray-700/50 backdrop-blur-xl rounded-3xl h-full flex flex-col justify-center">
                                {/* Upload Area */}
                                <div className="mb-8">
                                    <label className="block text-blue-300 text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <Upload className="w-4 h-4" /> Upload Meme Logo
                                    </label>
                                    <div className="border-2 border-dashed border-gray-600 rounded-2xl p-8 text-center hover:border-accent hover:bg-accent/5 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-accent" />
                                        </div>
                                        <p className="text-gray-300 font-medium mb-1">Drop your logo here</p>
                                        <p className="text-xs text-gray-500 mb-4">PNG, JPEG up to 5MB</p>
                                        <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:text-white hover:border-white">
                                            Choose File
                                        </Button>
                                    </div>
                                </div>

                                {/* Custom Name Input */}
                                <div className="mb-10">
                                    <label className="block text-blue-300 text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2">
                                        <Palette className="w-4 h-4" /> Custom Token Name
                                    </label>
                                    <Input
                                        name="coinName"
                                        placeholder="e.g. Bonk 2.0"
                                        value={formData.coinName}
                                        onChange={handleChange}
                                        required
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-accent/50 focus:border-accent transition-all"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="space-y-4 mt-auto">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 shadow-[0_0_20px_rgba(217,70,239,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] btn-glow transition-all duration-300"
                                        style={{ animation: 'pulse-glow 2s infinite' }}
                                    >
                                        {isLoading ? 'Launching...' : 'Generate Promotion Site 🚀'}
                                    </Button>

                                    <button
                                        onClick={handleBack}
                                        className="w-full py-3 text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-gray-700 rounded-lg"
                                    >
                                        <ArrowLeft className="w-4 h-4" /> Back to Step 1
                                    </button>
                                </div>
                            </Card>
                        </div>

                        {/* RIGHT COLUMN: Theme Selector */}
                        <div>
                            <Card className="glass-panel p-8 shadow-2xl border border-gray-700/50 backdrop-blur-xl rounded-3xl h-full">
                                <div className="mb-6 text-center lg:text-left">
                                    <h3 className="text-xl font-bold text-white mb-2">Set your preferred theme</h3>
                                    <p className="text-gray-400 text-sm">Choose how visitors will see your coin page.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {themes.map((theme) => (
                                        <div
                                            key={theme.id}
                                            onClick={() => setFormData(prev => ({ ...prev, theme: theme.id }))}
                                            className={`relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all duration-300 transform hover:scale-[1.02] group ${formData.theme === theme.id
                                                    ? `${theme.activeClass} shadow-xl`
                                                    : 'border-gray-700 hover:border-gray-500 opacity-70 hover:opacity-100'
                                                }`}
                                        >
                                            <div className={`p-6 ${theme.color} h-24 flex items-center justify-center`}>
                                                {theme.id === 'modern' && <div className="w-8 h-8 rounded-full bg-purple-600" />}
                                                {theme.id === 'light' && <div className="w-8 h-8 rounded-full bg-gray-200" />}
                                                {theme.id === 'rainbow' && <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm" />}
                                            </div>
                                            <div className="p-4 bg-gray-800 flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-white">{theme.name}</h4>
                                                    <span className="text-xs text-gray-400">
                                                        {theme.id === 'modern' && 'Classic dark theme'}
                                                        {theme.id === 'light' && 'Clean light theme'}
                                                        {theme.id === 'rainbow' && 'Colorful meme theme'}
                                                    </span>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${formData.theme === theme.id
                                                        ? 'bg-accent border-accent text-white'
                                                        : 'border-gray-600 bg-transparent'
                                                    }`}>
                                                    {formData.theme === theme.id && <Check className="w-4 h-4" />}
                                                </div>
                                            </div>

                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
