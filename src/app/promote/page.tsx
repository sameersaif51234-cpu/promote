'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { useMemo } from 'react';
import { ArrowLeft, Rocket, Upload, Check, Coins, Layers, Palette, X, DollarSign, Copy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Helper for random number generation
const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function PromotePage() {
    const router = useRouter();
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('solana');
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDevnet, setIsDevnet] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        coinName: '',
        contractAddress: '',
        chain: 'Solana', // Default
        theme: 'modern',
        txSignature: ''
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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                setIsDevnet(prev => !prev);
                console.log('Devnet Mode:', !isDevnet);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDevnet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.contractAddress) {
            alert('Please enter a contract address.');
            return;
        }

        if (!isConnected || !walletProvider) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            // Trigger payment immediately
            const connectionUrl = isDevnet ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com';
            const connection = new Connection(connectionUrl);
            const toPublicKey = new PublicKey('B1ArEadB8EWJ5tv9fyWogpEZ3GFEV4C8KMRmDCoRJN9U');
            const amountSOL = 0.2;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(address!),
                    toPubkey: toPublicKey,
                    lamports: amountSOL * LAMPORTS_PER_SOL,
                })
            );

            transaction.feePayer = new PublicKey(address!);
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;

            // @ts-ignore
            const signature = await walletProvider.sendTransaction(transaction, connection);
            console.log('Payment sent:', signature);

            // Verify
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    txSignature: signature,
                    chain: 'Solana',
                    isDevnet: isDevnet
                }),
            });

            const data = await response.json();
            if (!data.success) {
                alert(`Verification failed: ${data.message}`);
                return;
            }

            setFormData(prev => ({ ...prev, txSignature: signature }));
            setStep(2);
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed or cancelled. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Final submission (Step 2 after customization)
        const params = new URLSearchParams({
            chain: formData.chain,
            name: formData.coinName || 'My Token',
            theme: formData.theme
        });

        router.push(`/coin/${formData.contractAddress}?${params.toString()}`);
        setIsLoading(false);
    };

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
                        backgroundRepeat: 'no-repeat'
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
                            x2="50%"
                            y2="100%"
                            stroke="yellow"
                            strokeWidth="1"
                            style={{ animation: `pulse-line ${3 + Math.random() * 2}s infinite ${sat.delay}` }}
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

                {/* Header */}
                <div className={`text-center transition-all duration-500 ${step >= 2 ? 'mb-8 scale-90' : 'mb-12'}`}>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white font-poppins mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {step === 1 && 'Promote Your Coin'}
                        {step === 2 && 'Customize Your Landing Page'}
                    </h1>
                    {isDevnet && (
                        <div className="mb-4">
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 px-4 py-1 animate-pulse">
                                DEVNET MODE ACTIVE (Ctrl + E to toggle)
                            </Badge>
                        </div>
                    )}
                </div>

                {/* STEP 1: Contract & Payment */}
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
                                        placeholder="Enter token address"
                                        value={formData.contractAddress}
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>


                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {isConnected ? 'Verifying Payment...' : 'Connecting...'}
                                        </div>
                                    ) : (
                                        <>Pay & Continue <Rocket className="ml-2 w-6 h-6 animate-pulse" /></>
                                    )}
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

                {/* STEP 2: Customization */}
                {step === 2 && (
                    <div className="w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-500">
                        <Card className="glass-panel p-8 md:p-10 shadow-2xl border border-blue-500/30 backdrop-blur-xl rounded-3xl relative overflow-hidden">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                    <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                                        <Rocket className="w-4 h-4" /> Token Name
                                    </label>
                                    <Input
                                        name="coinName"
                                        placeholder="e.g. Moonshot Coin"
                                        value={formData.coinName}
                                        onChange={handleChange}
                                        required
                                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                                        <Palette className="w-4 h-4" /> Landing Page Theme
                                    </label>
                                    <Select
                                        name="theme"
                                        value={formData.theme}
                                        onChange={handleChange}
                                        options={[
                                            { label: 'Modern Dark', value: 'modern' },
                                            { label: 'Cyberpunk', value: 'cyberpunk' },
                                            { label: 'Minimal', value: 'minimal' },
                                        ]}
                                        className="bg-gray-800/50 border-gray-600 text-white h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="space-y-2 pt-4">
                                    <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                                        <Upload className="w-4 h-4" /> Upload Logo (Optional)
                                    </label>
                                    <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-gray-900/40">
                                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                                        <p className="text-sm text-gray-400">Click or drag and drop to upload token logo</p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    {isLoading ? 'Launching...' : 'Launch Promotion Page'}
                                </Button>

                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="w-full py-2 text-gray-400 hover:text-white text-sm"
                                >
                                    Back to Details
                                </button>
                            </form>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
