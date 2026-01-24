import { Card } from '@/components/ui/Card';
import { Shield, Target, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-primary font-poppins mb-6">About Coinface</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We are the leading platform dedicated to discovering, tracking, and promoting the most exciting meme coins in the crypto universe.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl font-bold text-primary font-poppins mb-4 flex items-center">
                            <Target className="h-6 w-6 mr-2 text-accent" />
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Our mission is to democratize crypto marketing. We believe that every project, no matter how small, deserves a chance to find its community. By providing an accessible platform for promotion, we level the playing field for creators and investors alike.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We strive to create a transparent ecosystem where users can discover new opportunities safely and efficiently.
                        </p>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
                        {/* Placeholder for an about image */}
                        <div className="text-center">
                            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-400 font-medium">Community First</p>
                        </div>
                    </div>
                </div>

                <Card className="p-8 bg-blue-900 text-white border-none shadow-xl mb-16">
                    <div className="flex items-start space-x-4">
                        <Shield className="h-8 w-8 text-accent flex-shrink-0" />
                        <div>
                            <h3 className="text-xl font-bold mb-2">Security & Trust</h3>
                            <p className="text-blue-100 leading-relaxed">
                                Coinface employs automated checks to flag potentially malicious contracts. However, cryptocurrency investments carry inherent risks. We strongly advise all users to conduct their own research (DYOR) before investing in any project listed on our platform. We do not endorse any specific coin and are not responsible for financial losses.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
