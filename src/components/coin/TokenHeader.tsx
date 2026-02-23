import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Copy } from "lucide-react";
import { TokenDetails } from "@/lib/token";

interface TokenHeaderProps {
    token: TokenDetails;
}

export function TokenHeader({ token }: TokenHeaderProps) {
    return (
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
        </div>
    );
}
