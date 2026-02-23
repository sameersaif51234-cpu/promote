import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import Link from 'next/link';
import { TokenDetails } from "@/lib/token";

interface DexTerminalsProps {
    token: TokenDetails;
}

export function DexTerminals({ token }: DexTerminalsProps) {
    return (
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
                            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 hover:border-purple-400/50 text-gray-300 h-auto py-2 relative overflow-hidden group/photon">
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
    );
}
