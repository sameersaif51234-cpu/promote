'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/Card";
import {
    Rocket, Share2, ArrowRight, Copy
} from "lucide-react";
import { fetchTokenDetails, TokenDetails } from "@/lib/token";
import { generateDownloadableHtml } from '@/lib/download';
import Link from 'next/link';
import { TokenHeader } from '@/components/coin/TokenHeader';
import { DexTerminals } from '@/components/coin/DexTerminals';
import { SocialSharing } from '@/components/coin/SocialSharing';
import { ActionPanel } from '@/components/coin/ActionPanel';
import { RedditPromotion } from '@/components/coin/RedditPromotion';
import { Button } from '@/components/ui/Button';

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
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
                        {/* Token Header Info */}
                        <TokenHeader token={token} />

                        {/* Actions Panel */}
                        <ActionPanel token={token} handleDownload={handleDownload} />
                    </div>

                    <div className="mt-8">
                        {/* Dex Terminals for token */}
                        <DexTerminals token={token} />

                        {/* Social Sharing block */}
                        <SocialSharing tokenSymbol={token.symbol} handleShare={handleShare} />
                    </div>
                </Card>

                {/* Reddit Promotion Section */}
                <RedditPromotion tokenSymbol={token.symbol} />

                {/* Share Link Card */}
                <Card className="bg-[#1e293b]/80 border-white/10 p-8 backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
                        <Share2 className="w-32 h-32 text-purple-500" />
                    </div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 mb-6 flex items-center justify-center gap-3">
                            <span className="text-3xl">📢</span> Share This Token
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <Button onClick={() => handleShare('twitter')} className="h-12 px-8 text-lg bg-[#1DA1F2] hover:bg-[#1a94df] text-white border-0 shadow-lg shadow-blue-900/20">Twitter</Button>
                            <Button onClick={() => handleShare('telegram')} className="h-12 px-8 text-lg bg-[#0088cc] hover:bg-[#0077b5] text-white border-0 shadow-lg shadow-blue-900/20">Telegram</Button>
                            <Button onClick={() => handleShare('reddit')} className="h-12 px-8 text-lg bg-[#FF4500] hover:bg-[#e03d00] text-white border-0 shadow-lg shadow-orange-900/20">Reddit</Button>
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
                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                                >
                                    <Copy className="h-4 w-4 mr-2" /> Copy
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
