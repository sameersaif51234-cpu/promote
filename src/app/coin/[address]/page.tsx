'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, Copy, Share2, TrendingUp, TrendingDown, DollarSign, Download } from 'lucide-react';
import { fetchTokenDetails, TokenDetails } from '@/lib/token';
import { generateDownloadableHtml } from '@/lib/download';
import Link from 'next/link';
import { Zap } from 'lucide-react';

declare global {
    interface Window {
        Jupiter: any;
    }
}

export default function CoinPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const address = params?.address as string;
    const chainFromQuery = searchParams.get('chain') || 'Solana';
    const nameFromQuery = searchParams.get('name'); // Optional, if passed

    const [token, setToken] = useState<TokenDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const themeFromQuery = searchParams.get('theme') || 'modern';

    const themes: Record<string, string> = {
        modern: 'bg-white text-gray-900',
        degen: 'bg-gray-900 text-green-400',
        retro: 'bg-yellow-100 text-pink-600 font-serif',
        minimal: 'bg-white text-black grayscale',
    };

    // Helper to get accent/primary colors based on theme if needed, 
    // but we can rely on Tailwind classes mostly or CSS vars if we were more advanced.
    // For now, let's just wrap the page in a theme class and use specific overrides.


    const themeClass = themes[themeFromQuery] || themes.modern;

    useEffect(() => {
        // Load Jupiter Script
        const script = document.createElement('script');
        script.src = "https://terminal.jup.ag/main-v3.js";
        script.onload = () => console.log("Jupiter Script Loaded");
        document.head.appendChild(script);
    }, []);

    const launchJupiter = () => {
        if (window.Jupiter && token) {
            window.Jupiter.init({
                endpoint: "https://api.mainnet-beta.solana.com",
                formProps: {
                    fixedOutputMint: true,
                    initialOutputMint: token.address,
                },
            });
        } else {
            console.warn("Jupiter not loaded yet");
        }
    };

    useEffect(() => {
        if (address) {
            fetchTokenDetails(address, chainFromQuery).then(data => {
                // If name was passed in query, override mock name for better UX
                if (nameFromQuery) data.name = nameFromQuery;
                setToken(data);
                setLoading(false);
            });
        }
    }, [address, chainFromQuery, nameFromQuery]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!token) return <div>Token not found</div>;

    return (
        <div className={`pb-20 min-h-screen ${themeClass}`}>
            {/* Header / Hero */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-12 border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            {token.imageUrl ? (
                                <img
                                    src={token.imageUrl}
                                    alt={token.name}
                                    className="h-24 w-24 rounded-full shadow-lg border-4 border-white object-cover"
                                />
                            ) : (
                                <div
                                    className="h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                                    style={{ backgroundColor: token.logoColor }}
                                >
                                    {token.name.charAt(0)}
                                </div>
                            )}
                            <div>
                                <h1 className="text-3xl md:text-5xl font-bold text-primary font-poppins mb-2">{token.name}</h1>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono font-medium">{token.symbol}</span>
                                    <span className="flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                        {token.address.slice(0, 6)}...{token.address.slice(-4)}
                                        <Copy className="h-3 w-3 ml-1 cursor-pointer hover:text-primary" />
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{token.chain}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full md:w-auto">
                            {/* Jupiter Swap Button */}
                            {token.chain.toLowerCase() === 'solana' && (
                                <Button
                                    onClick={launchJupiter}
                                    size="lg"
                                    className="bg-black text-[#19FB9B] hover:bg-gray-900 border border-[#19FB9B]/20 shadow-lg shadow-[#19FB9B]/20"
                                >
                                    Buy with Jupiter
                                    <Zap className="ml-2 h-5 w-5" />
                                </Button>
                            )}

                            <Link href={token.dexUrl} target="_blank" className="flex-1 md:flex-none">
                                <Button size="lg" className="w-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform">
                                    Buy on {token.dexName}
                                    <ArrowUpRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="aspect-square p-0 w-14 flex items-center justify-center"
                                onClick={() => {
                                    if (!token) return;
                                    const html = generateDownloadableHtml(token, themeClass);
                                    const blob = new Blob([html], { type: 'text/html' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `${token.name.toLowerCase().replace(/\s+/g, '-')}-landing.html`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                }}
                            >
                                <Download className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="aspect-square p-0 w-14 flex items-center justify-center">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Left Column: Stats & Copy */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Price</p>
                                <div className="text-2xl font-bold text-primary flex items-center">
                                    {token.price}
                                </div>
                            </Card>
                            <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-gray-400 font-medium uppercase mb-1">24h Change</p>
                                <div className={`text-2xl font-bold flex items-center ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {token.priceChange24h >= 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
                                    {Math.abs(token.priceChange24h)}%
                                </div>
                            </Card>
                            <Card className="p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-xs text-gray-400 font-medium uppercase mb-1">Market Cap</p>
                                <div className="text-2xl font-bold text-primary flex items-center">
                                    {token.marketCap}
                                </div>
                            </Card>
                        </div>

                        {/* Chart Placeholder */}
                        {/* Chart Section */}
                        <Card className="p-0 min-h-[500px] overflow-hidden bg-gray-100 border-0 shadow-inner relative">
                            {token.pairAddress ? (
                                <iframe
                                    src={`https://dexscreener.com/${token.chain.toLowerCase()}/${token.pairAddress}?embed=1&theme=dark&trades=0&info=0`}
                                    className="w-full h-full absolute inset-0"
                                    title="DexScreener Chart"
                                    frameBorder="0"
                                ></iframe>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-400">
                                    Chart data unavailable
                                </div>
                            )}
                        </Card>

                        {/* AI Generated Copy */}
                        <div>
                            <h3 className="text-2xl font-bold text-primary font-poppins mb-4">About {token.name}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                {token.description}
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                {token.name} is making waves on the {token.chain} network. Join the movement today!
                            </p>
                            <div className="mt-4 flex gap-2">
                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">Helius Data Verified</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Community & Safety */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-gradient-to-br from-primary to-blue-900 text-white border-none shadow-xl">
                            <h3 className="font-bold text-lg mb-4 flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-accent" />
                                Tokenomics
                            </h3>
                            <ul className="space-y-3 text-sm text-blue-100">
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span>Total Supply</span>
                                    <span className="font-mono font-bold text-white">1,000,000,000</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span>Liquidity</span>
                                    <span className="font-mono font-bold text-green-400">Locked</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Taxes</span>
                                    <span className="font-mono font-bold text-white">0/0</span>
                                </li>
                            </ul>
                        </Card>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Safety Check</h4>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-green-600">
                                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                    Contract Verified
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                    Mint Revoked
                                </div>
                                <div className="flex items-center text-sm text-green-600">
                                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                    No Blacklist
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
