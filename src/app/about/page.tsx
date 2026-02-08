import { Card } from '@/components/ui/Card';
import { Shield, Target, Users } from 'lucide-react';
import { SolarSystemBackground } from '@/components/SolarSystemBackground';

export default function AboutPage() {
    return (
        <div className="relative min-h-screen text-white">
            <SolarSystemBackground />

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-poppins mb-6">About Coinface</h1>
                        <p className="text-xl text-purple-100 leading-relaxed">
                            We are the leading platform dedicated to discovering, tracking, and promoting the most exciting meme coins in the crypto universe.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 mb-20">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-poppins mb-4 flex items-center">
                                <Target className="h-6 w-6 mr-2 text-purple-400" />
                                Our Mission
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Our mission is to democratize crypto marketing. We believe that every project, no matter how small, deserves a chance to find its community. By providing an accessible platform for promotion, we level the playing field for creators and investors alike.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                We strive to create a transparent ecosystem where users can discover new opportunities safely and efficiently.
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-center group overflow-hidden">
                            <img
                                src="/images/community-network.jpg"
                                alt="Community First"
                                className="w-full h-auto rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <Card className="p-8 bg-purple-900/60 backdrop-blur-md border border-purple-500/20 text-white shadow-xl mb-16">
                        <div className="flex items-start space-x-4">
                            <Shield className="h-8 w-8 text-purple-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Security & Trust</h3>
                                <p className="text-purple-100 leading-relaxed">
                                    Coinface employs automated checks to flag potentially malicious contracts. However, cryptocurrency investments carry inherent risks. We strongly advise all users to conduct their own research (DYOR) before investing in any project listed on our platform. We do not endorse any specific coin and are not responsible for financial losses.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
