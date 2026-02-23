import { ReactNode } from 'react';

interface StepsProps {
    children?: ReactNode;
}

export function Steps({ children }: StepsProps) {
    return (
        <section className="py-20 relative z-10">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Text Content */}
                    <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5">
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-6 leading-tight">
                            Get your coin trending in <br />three simple steps
                        </h2>
                        <p className="text-gray-200 mb-8 text-lg font-medium">
                            Stop struggling with complex marketing. We&apos;ve simplified the process so you can focus on building your community.
                        </p>

                        <div className="space-y-8">
                            <div className="flex gap-4 group">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">1</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Submit Coin Details</h4>
                                    <p className="text-gray-300">Enter your contract address, chain, and basic info.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">2</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Pay & Launch</h4>
                                    <p className="text-gray-300">Send <span className="text-green-400 font-bold">$25 or 0.25 SOL</span> to start your campaign.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 group">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">3</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Watch it Grow</h4>
                                    <p className="text-gray-300">Get your <span className="text-blue-400 font-bold">Promotional Web Page, 2 Hype Shorts & QR Code</span> instantly.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
