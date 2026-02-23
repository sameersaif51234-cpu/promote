import { Card } from '@/components/ui/Card';
import { Globe, Zap, ShieldCheck } from 'lucide-react';

export function Features() {
    return (
        <section className="container mx-auto px-4 relative z-10 pt-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white font-poppins mb-4">Why Choose Coinface?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">We provide the tools you need to get your token in front of thousands of potential investors.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-accent bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
                    <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                        <Globe className="h-6 w-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-poppins text-white">Multi-Chain Support</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Whether you&apos;re on Solana, Ethereum, or BNB Smart Chain, we support seamless promotion for all major networks.
                    </p>
                </Card>

                <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-purple-500 bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
                    <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                        <Zap className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-poppins text-white">Instant Launch</h3>
                    <p className="text-gray-400 leading-relaxed">
                        No waiting periods. Submit your coin details and your promotion campaign goes live instantly to our network.
                    </p>
                </Card>

                <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-accent bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
                    <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                        <ShieldCheck className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-poppins text-white">Verified Security</h3>
                    <p className="text-gray-400 leading-relaxed">
                        We vet all submissions to ensure a safe environment for investors, building trust for your community.
                    </p>
                </Card>
            </div>
        </section>
    );
}
