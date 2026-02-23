import { Button } from "@/components/ui/Button";
import { Share2, Twitter, MessageCircle, Send, Facebook, Instagram, PenTool, Copy } from "lucide-react";

interface SocialSharingProps {
    tokenSymbol: string;
    handleShare: (platform: string) => void;
}

export function SocialSharing({ tokenSymbol, handleShare }: SocialSharingProps) {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
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
                <Button size="sm" onClick={() => handleShare('instagram')} className="w-9 h-9 p-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white border-0">
                    <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" onClick={() => handleShare('medium')} className="bg-black text-white border border-white/20 w-9 h-9 p-0">
                    <PenTool className="w-4 h-4" />
                </Button>

                <Button
                    onClick={handleCopyLink}
                    className="bg-purple-600 hover:bg-purple-700 text-white border-0" size="sm">
                    <Copy className="w-4 h-4 mr-2" /> Copy Link
                </Button>
            </div>
        </div>
    );
}
