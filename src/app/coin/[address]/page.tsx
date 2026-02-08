'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
    Rocket, Globe, ShieldCheck, Zap,
    TrendingUp, TrendingDown, DollarSign,
    Copy, CheckCircle, ExternalLink,
    ArrowRight, Share2, ArrowUpRight, Download,
    Twitter, Facebook, Instagram, Send, MessageCircle, PenTool
} from "lucide-react";
import { fetchTokenDetails, TokenDetails } from "@/lib/token";
import { generateDownloadableHtml } from '@/lib/download';
import Link from 'next/link';

declare global {
    interface Window {
        solana?: any;
    }
}

export default function CoinPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const address = Array.isArray(params.address) ? params.address[0] : params.address;
    const chainFromQuery = searchParams.get('chain');
    const themeFromQuery = searchParams.get('theme') || 'galaxy';

    const [token, setToken] = useState<TokenDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (address) {
            const loadToken = async () => {
                setLoading(true);
                const details = await fetchTokenDetails(address, chainFromQuery || 'Solana');
                setToken(details);
                setLoading(false);
            };
            loadToken();
        }
    }, [address, chainFromQuery]);

    const handleDownload = () => {
        if (!token) return;
        const html = generateDownloadableHtml(token, themeFromQuery);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${token.name.toLowerCase().replace(/\s+/g, '-')}-landing.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleShare = (platform: string) => {
        const url = window.location.href;
        const text = `Check out $${token?.symbol || 'Token'} on Coinface!`;

        let shareUrl = '';
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                break;
            case 'reddit':
                shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'instagram':
                navigator.clipboard.writeText(url);
                alert("Link copied! Open Instagram to share.");
                return;
            case 'medium':
                window.open('https://medium.com/new-story', '_blank');
                return;
        }

        if (shareUrl) window.open(shareUrl, '_blank');
    };

    if (loading) return <div className="min-h-screen bg-[#111827] text-white flex items-center justify-center">Loading...</div>;
    if (!token) return <div className="min-h-screen bg-[#111827] text-white flex items-center justify-center">Token not found</div>;

    return (
        <div className="min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden relative text-white">

            {/* Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: "url('/images/space-bg.png')" }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">

                {/* Top Nav / Breadcrumb */}
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowRight className="w-4 h-4 rotate-180 mr-2" />
                    Back to Home
                </Link>

                {/* Main Promo Card */}
                <Card className="bg-[#1e293b]/90 border-white/10 p-8 md:p-12 mb-8 backdrop-blur-xl relative overflow-hidden group">
                    {/* Glossy Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">

                        {/* Left Column: Token Identity */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                                {token.imageUrl ? (
                                    <img src={token.imageUrl} alt={token.name} className="w-24 h-24 rounded-2xl shadow-2xl border-2 border-white/10" />
                                ) : (
                                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-2xl border-2 border-white/10">
                                        {token.symbol[0]}
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                        {token.name}
                                    </h1>
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1 text-sm font-semibold">
                                            {token.chain}
                                        </Badge>
                                        <span className="text-xl text-gray-400 font-medium">${token.symbol}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Contract Address */}
                            <div className="bg-black/40 rounded-xl p-4 mb-8 border border-white/5 flex items-center justify-between group/address hover:border-white/10 transition-colors">
                                <code className="text-gray-300 font-mono text-sm sm:text-base truncate mr-4">
                                    {token.address}
                                </code>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => {
                                        navigator.clipboard.writeText(token.address);
                                    }}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* DEX Terminals */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm text-gray-400">
                                    <span>View on DEX Terminals</span>
                                    <div className="flex items-center text-green-400 text-xs">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Valid token address
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <Link href={`https://dexscreener.com/${token.chain.toLowerCase()}/${token.address}`} target="_blank" className="w-full">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-blue-400/50 text-gray-300 group/dex h-auto py-2 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/dex:opacity-100 transition-opacity" />
                                            <span className="mr-2 relative z-10">📊</span>
                                            <span className="relative z-10">DexScreener (Live)</span>
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            </div>
                                        </Button>
                                    </Link>
                                    <Link
                                        href={`https://gmgn.ai/${(() => {
                                            const c = token.chain.toLowerCase();
                                            if (c === 'solana') return 'sol';
                                            if (c === 'ethereum') return 'eth';
                                            if (c === 'bnb') return 'bsc';
                                            return c;
                                        })()}/token/${token.address}`}
                                        target="_blank"
                                        className="w-full"
                                        onClick={() => {
                                            // Optional: You could add a toast here like "Opening GMGN Terminal..."
                                            // For now, it just opens in a new tab as expected.
                                        }}
                                    >
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-purple-400/50 text-gray-300 h-auto py-2 relative overflow-hidden group/btn">
                                            <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                            <span className="mr-2 relative z-10">⚡</span>
                                            <span className="relative z-10">GMGN (Live)</span>
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            </div>
                                        </Button>
                                    </Link>
                                    <Link href={`https://birdeye.so/token/${token.address}?chain=${token.chain.toLowerCase()}`} target="_blank" className="w-full">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-orange-400/50 text-gray-300 h-auto py-2 relative overflow-hidden group/bird">
                                            <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover/bird:opacity-100 transition-opacity" />
                                            <span className="mr-2 relative z-10">🦅</span>
                                            <span className="relative z-10">Birdeye (Live)</span>
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            </div>
                                        </Button>
                                    </Link>
                                    <Link href={`https://www.geckoterminal.com/${token.chain.toLowerCase()}/tokens/${token.address}`} target="_blank" className="w-full">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-green-500/50 text-gray-300 h-auto py-2 relative overflow-hidden group/gecko">
                                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover/gecko:opacity-100 transition-opacity" />
                                            <span className="mr-2 relative z-10">🦎</span>
                                            <span className="relative z-10">CoinGecko (Live)</span>
                                            <div className="absolute top-0 right-0 p-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            </div>
                                        </Button>
                                    </Link>

                                    {token.chain.toLowerCase() === 'solana' && (
                                        <>
                                            <Link href={`https://raydium.io/swap/?outputCurrency=${token.address}`} target="_blank" className="w-full">
                                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-blue-500/50 text-gray-300 h-auto py-2 relative overflow-hidden group/ray">
                                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover/ray:opacity-100 transition-opacity" />
                                                    <span className="mr-2 relative z-10">R</span>
                                                    <span className="relative z-10">Raydium (Live)</span>
                                                    <div className="absolute top-0 right-0 p-1">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    </div>
                                                </Button>
                                            </Link>
                                            <Link href={`https://photon-sol.tinyastro.io/en/lp/${token.address}`} target="_blank" className="w-full">
                                                <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-purple-500/50 text-gray-300 h-auto py-2 relative overflow-hidden group/photon">
                                                    <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover/photon:opacity-100 transition-opacity" />
                                                    <span className="mr-2 relative z-10">🌑</span>
                                                    <span className="relative z-10">Photon (Live)</span>
                                                    <div className="absolute top-0 right-0 p-1">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                    </div>
                                                </Button>
                                            </Link>
                                        </>
                                    )}

                                    <Link href={`https://www.dextools.io/app/en/${token.chain.toLowerCase()}/pair-explorer/${token.address}`} target="_blank" className="w-full">
                                        <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-blue-400/50 text-gray-300 h-auto py-2">
                                            <span className="mr-2">🛠️</span> DexTools
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Social Sharing (Main Card) */}
                            <div className="border-t border-white/10 pt-6">
                                <h3 className="text-center text-gray-400 text-sm mb-4 flex items-center justify-center gap-2">
                                    <Share2 className="w-4 h-4" /> Share Your Token
                                </h3>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <Button
                                        onClick={() => handleShare('twitter')}
                                        className="bg-[#1DA1F2] hover:bg-[#1a94df] text-white border-0" size="sm">
                                        <Twitter className="w-4 h-4 mr-2" /> Twitter
                                    </Button>
                                    <Button
                                        onClick={() => handleShare('reddit')}
                                        className="bg-[#FF4500] hover:bg-[#e03d00] text-white border-0" size="sm">
                                        <MessageCircle className="w-4 h-4 mr-2" /> Reddit
                                    </Button>
                                    <Button
                                        onClick={() => handleShare('telegram')}
                                        className="bg-[#0088cc] hover:bg-[#0077b5] text-white border-0" size="sm">
                                        <Send className="w-4 h-4 mr-2" /> Telegram
                                    </Button>
                                    <Button
                                        onClick={() => handleShare('facebook')}
                                        className="bg-[#1877F2] hover:bg-[#166fe5] text-white border-0" size="sm">
                                        <Facebook className="w-4 h-4 mr-2" /> Facebook
                                    </Button>
                                    {/* Additional Buttons (Icon only for space) */}
                                    <Button size="sm" onClick={() => handleShare('instagram')} className="w-9 h-9 p-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white border-0">
                                        <Instagram className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" onClick={() => handleShare('medium')} className="bg-black text-white border border-white/20 w-9 h-9 p-0">
                                        <PenTool className="w-4 h-4" />
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                        }}
                                        className="bg-purple-600 hover:bg-purple-700 text-white border-0" size="sm">
                                        <Copy className="w-4 h-4 mr-2" /> Copy Link
                                    </Button>
                                </div>
                            </div>

                        </div>

                        {/* Right Column: Actions */}
                        <div className="w-full md:w-80 flex flex-col gap-4">

                            {/* Primary Actions */}
                            <div className="p-4 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 space-y-3">
                                <Link href={`https://jup.ag/swap/SOL-${token.address}`} target="_blank" className="block w-full">
                                    <Button size="lg" className="w-full text-lg font-bold bg-gradient-to-r from-green-400 to-[#19FB9B] text-black hover:opacity-90 border-0 shadow-lg shadow-green-900/20">
                                        Quick Swap <Zap className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>

                                <Link href={token.dexUrl} target="_blank" className="block w-full">
                                    <Button size="lg" variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white">
                                        Quick Buy <ArrowUpRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Downloads */}
                            <Button
                                onClick={handleDownload}
                                variant="ghost"
                                className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                            >
                                <Download className="w-4 h-4 mr-2" /> Download Page
                            </Button>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price</p>
                                    <p className="font-mono text-green-400">$0.00042</p>
                                </div>
                                <div className="bg-black/20 p-3 rounded-xl border border-white/5 text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">24h</p>
                                    <p className="font-mono text-green-400 flex items-center justify-center">
                                        <TrendingUp className="w-3 h-3 mr-1" /> +12%
                                    </p>
                                </div>
                                <div className="col-span-2 bg-black/20 p-3 rounded-xl border border-white/5 flex items-center justify-between px-4">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Mkt Cap</p>
                                    <p className="font-mono text-white">$420,000</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </Card>

                {/* Reddit Communities Section (NEW) */}
                <Card className="bg-[#FF4500]/10 border-[#FF4500]/20 p-8 mb-8 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <MessageCircle className="w-40 h-40 text-[#FF4500]" />
                    </div>

                    <div className="relative z-10 w-full">
                        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                            <span className="bg-[#FF4500] p-2 rounded-full mr-3">
                                <MessageCircle className="w-6 h-6 text-white" />
                            </span>
                            Promote on Reddit Communities
                        </h2>
                        <p className="text-gray-400 mb-6 ml-14">
                            Post your coin page to these top crypto communities to gain instant traction.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: 'r/memecoins', members: '150k+' },
                                { name: 'r/memecoinmoonshots', members: '85k+' },
                                { name: 'r/SolanaMemeCoins', members: '45k+' },
                                { name: 'r/solana', members: '200k+' },
                                { name: 'r/CryptoMoonShots', members: '1.2m+' },
                            ].map((sub) => (
                                <div key={sub.name} className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col hover:border-[#FF4500]/50 transition-colors group/sub">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white group-hover/sub:text-[#FF4500] transition-colors">{sub.name}</h3>
                                        <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{sub.members}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="mt-auto bg-[#FF4500] hover:bg-[#CC3700] text-white border-0 w-full"
                                        onClick={() => {
                                            const url = window.location.href;
                                            const title = `Check out $${token?.symbol || 'Token'} on Coinface! 🚀`;
                                            const subreddit = sub.name.replace('r/', '');
                                            // Reddit submit URL format
                                            window.open(`https://www.reddit.com/r/${subreddit}/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
                                        }}
                                    >
                                        Post Now <ExternalLink className="w-3 h-3 ml-2" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* New Section: Share This Token (Dedicated) */}
                <Card className="bg-[#1e293b]/80 border-white/10 p-8 backdrop-blur-md relative overflow-hidden">
                    {/* Floating background elements for fun */}
                    <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
                        <Share2 className="w-32 h-32 text-purple-500" />
                    </div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6 flex items-center justify-center gap-3">
                            <span className="text-3xl">📢</span> Share This Token
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button
                                onClick={() => handleShare('twitter')}
                                className="h-12 px-8 text-lg bg-[#1DA1F2] hover:bg-[#1a94df] text-white border-0 shadow-lg shadow-blue-900/20">
                                <Twitter className="w-6 h-6 mr-2" /> Twitter
                            </Button>
                            <Button
                                onClick={() => handleShare('telegram')}
                                className="h-12 px-8 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white border-0 shadow-lg shadow-blue-900/20">
                                <Send className="w-6 h-6 mr-2" /> Telegram
                            </Button>
                            <Button
                                onClick={() => handleShare('reddit')}
                                className="h-12 px-8 text-lg bg-[#FF4500] hover:bg-[#e03d00] text-white border-0 shadow-lg shadow-orange-900/20">
                                <MessageCircle className="w-6 h-6 mr-2" /> Reddit
                            </Button>
                        </div>

                        <div className="max-w-xl mx-auto">
                            <p className="text-sm text-gray-400 mb-2">Share Link:</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    readOnly
                                    value={typeof window !== 'undefined' ? window.location.href : '...'}
                                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 text-gray-300 font-mono text-sm focus:outline-none focus:border-purple-500/50"
                                />
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white border-0">
                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
}
