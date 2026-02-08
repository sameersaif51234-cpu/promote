import { Rocket, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    return (
        <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center">
                                <Rocket className="h-5 w-5 text-accent" />
                            </div>
                            <span className="text-xl font-bold font-poppins">Coinface</span>
                        </div>
                        <p className="text-gray-400 text-sm max-w-sm">
                            The premier platform for promoting and discovering the next big meme coins across all major chains.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-poppins">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-accent">Home</Link></li>
                            <li><Link href="/promote" className="hover:text-accent">Promote</Link></li>
                            <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-poppins">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                                <MessageCircle className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Coinface. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
