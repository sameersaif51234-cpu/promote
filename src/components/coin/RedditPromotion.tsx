import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageCircle, ExternalLink } from "lucide-react";

interface RedditPromotionProps {
    tokenSymbol: string;
}

export function RedditPromotion({ tokenSymbol }: RedditPromotionProps) {
    const subreddits = [
        { name: 'r/memecoins', members: '150k+' },
        { name: 'r/memecoinmoonshots', members: '85k+' },
        { name: 'r/SolanaMemeCoins', members: '45k+' },
        { name: 'r/solana', members: '200k+' },
        { name: 'r/CryptoMoonShots', members: '1.2m+' },
    ];

    const handlePost = (subredditName: string) => {
        const url = window.location.href;
        const title = `Check out $${tokenSymbol || 'Token'} on Coinface! 🚀`;
        const subreddit = subredditName.replace('r/', '');
        window.open(`https://www.reddit.com/r/${subreddit}/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
    };

    return (
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
                    {subreddits.map((sub) => (
                        <div key={sub.name} className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col hover:border-[#FF4500]/50 transition-colors group/sub">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-white group-hover/sub:text-[#FF4500] transition-colors">{sub.name}</h3>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">{sub.members}</span>
                            </div>
                            <Button
                                size="sm"
                                className="mt-auto bg-[#FF4500] hover:bg-[#CC3700] text-white border-0 w-full"
                                onClick={() => handlePost(sub.name)}
                            >
                                Post Now <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
