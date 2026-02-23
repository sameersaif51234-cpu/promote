import { Card } from '@/components/ui/Card';

export function Reviews() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 rounded-3xl transform rotate-2 scale-105 opacity-20 blur-xl animate-pulse"></div>
            <Card className="relative p-8 border border-white/10 shadow-2xl bg-[#0f172a]/90 backdrop-blur-xl h-full rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-purple-400 to-blue-500`}></div>
                        ))}
                    </div>
                    <span className="text-gray-400 text-sm ml-2">500+ Happy Creators</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">What people are saying</h3>

                <div className="space-y-6">
                    {/* Review 1 */}
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500">★</div>)}
                        </div>
                        <p className="text-gray-300 italic mb-3">&quot;Insane ROI! My token did 10x after listing here. The process was super smooth.&quot;</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">JP</div>
                            <div>
                                <p className="text-white text-sm font-bold">J.P. Morgan (Not really)</p>
                                <p className="text-xs text-green-400">Launched $BANK</p>
                            </div>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex items-center gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500">★</div>)}
                        </div>
                        <p className="text-gray-300 italic mb-3">&quot;Best promotion platform for Solana memecoins. Simple, fast, and effective.&quot;</p>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs">AK</div>
                            <div>
                                <p className="text-white text-sm font-bold">Alex K.</p>
                                <p className="text-xs text-green-400">Launched $PEPE2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
