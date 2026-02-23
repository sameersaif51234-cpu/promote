import { Button } from '@/components/ui/Button';
import { Rocket, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 scale-110 md:scale-125 origin-center">
                    <div className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg md:text-xl font-black shadow-[0_0_25px_rgba(220,38,38,0.6)] transform -rotate-3 border-2 border-red-400">
                        LIMITED OFFER
                    </div>
                    <div className="bg-green-500 text-black px-6 py-2 rounded-lg text-lg md:text-xl font-black shadow-[0_0_25px_rgba(34,197,94,0.6)] transform rotate-2 border-2 border-green-300">
                        50% OFF
                    </div>
                    <div className="bg-black/60 backdrop-blur-md border-2 border-green-500/50 px-6 py-2 rounded-lg text-lg md:text-xl font-bold flex items-center gap-3 shadow-xl">
                        <span className="text-gray-400 line-through decoration-red-500 decoration-2">$50</span>
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                        <span className="text-green-400 text-2xl md:text-3xl font-black drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">$25 <span className="text-lg md:text-xl align-middle font-bold text-green-300/80">/ 0.25 SOL</span></span>
                    </div>
                </div>

                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full opacity-70"></div>
                    <h1 className="relative z-10 text-5xl md:text-7xl font-bold tracking-tight text-white font-poppins mb-6 max-w-4xl mx-auto leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                        Promote your meme coin to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-none filter brightness-110">Moon</span>
                    </h1>
                </div>
                <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                    Boost visibility, drive engagement, and launch your meme coin across Solana, Ethereum, and BNB chains in minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/promote">
                        <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] transition-all transform hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:bg-purple-700 border-none">
                            Promote Your Coin
                            <Rocket className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                            How it works
                        </Button>
                    </Link>
                </div>

                {/* Promotional Banner */}
                <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-yellow-500/30 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.15)] max-w-4xl mx-auto">
                        <div className="flex items-center gap-3">
                            <div className="bg-yellow-500 text-black p-1.5 rounded-full">
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-yellow-400 font-black text-lg tracking-wide uppercase">Limited Offer</span>
                        </div>
                        <div className="h-px md:h-8 w-full md:w-px bg-yellow-500/30" />
                        <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white leading-tight">
                            Get a <span className="text-yellow-400 underline decoration-yellow-400/50 underline-offset-4">free website</span> and list your token on all the DEX&apos;s to make more reach to your token
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
