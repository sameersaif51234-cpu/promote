import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTA() {
    return (
        <section className="container mx-auto px-4 text-center py-10 relative z-10">
            <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-12 relative overflow-hidden border border-purple-500/20 shadow-2xl">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-purple-600 opacity-20 blur-3xl animate-pulse"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white font-poppins mb-6">Ready to skyrocket?</h2>
                    <p className="text-purple-100 mb-8 max-w-xl mx-auto">Join thousands of successful projects that started on Coinface.</p>
                    <Link href="/promote">
                        <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-purple-700 hover:bg-gray-100 shadow-xl">
                            Start Promoting Now <ArrowRight className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
