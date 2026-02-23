import { Button } from "@/components/ui/Button";
import { Zap, ArrowUpRight, Download, TrendingUp } from "lucide-react";
import Link from 'next/link';
import { TokenDetails } from "@/lib/token";

interface ActionPanelProps {
    token: TokenDetails;
    handleDownload: () => void;
}

export function ActionPanel({ token, handleDownload }: ActionPanelProps) {
    return (
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
    );
}
