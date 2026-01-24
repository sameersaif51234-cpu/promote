'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Check, Copy, Home } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function ConfirmationContent() {
    const searchParams = useSearchParams();

    const coinName = searchParams.get('coinName');
    const contractAddress = searchParams.get('contractAddress');
    const chain = searchParams.get('chain');

    return (
        <div className="text-center">
            <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
                <Check className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-primary font-poppins mb-4">Submission Successful!</h1>
            <p className="text-gray-600 mb-10 max-w-lg mx-auto">
                Your coin <span className="font-bold text-primary">{coinName}</span> has been submitted for promotion on the <span className="font-bold text-primary">{chain}</span> network.
            </p>

            <Card className="max-w-lg mx-auto p-6 bg-gray-50 mb-10 text-left border-dashed border-2">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Submission Details</h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500">Contract Address</label>
                        <div className="flex items-center justify-between bg-white p-3 rounded border">
                            <code className="text-sm text-primary font-mono truncate mr-2">{contractAddress}</code>
                            <button className="text-gray-400 hover:text-primary">
                                <Copy className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-gray-500">Chain</label>
                        <p className="font-medium text-primary">{chain}</p>
                    </div>
                </div>
            </Card>

            <Link href="/">
                <Button variant="outline" className="min-w-[200px]">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                </Button>
            </Link>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <Suspense fallback={<div>Loading...</div>}>
                <ConfirmationContent />
            </Suspense>
        </div>
    );
}
