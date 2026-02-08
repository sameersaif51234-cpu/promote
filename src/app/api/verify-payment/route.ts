
import { NextResponse } from 'next/server';
import { verifySolanaTransaction } from '@/lib/solscan';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { txSignature, chain, isDevnet } = body;

        if (!txSignature) {
            return NextResponse.json(
                { success: false, message: 'Transaction signature is required' },
                { status: 400 }
            );
        }

        // We currently only support Solana verification via Solscan as requested
        if (chain && chain.toLowerCase() !== 'solana') {
            return NextResponse.json(
                { success: true, message: 'Manual verification required for this chain. Proceeding.' },
                { status: 200 }
            );
        }

        const RECEIVER_ADDRESS = 'B1ArEadB8EWJ5tv9fyWogpEZ3GFEV4C8KMRmDCoRJN9U';

        const verification = await verifySolanaTransaction(txSignature, RECEIVER_ADDRESS, isDevnet ? 'devnet' : 'mainnet');

        if (verification.success) {
            return NextResponse.json({ success: true, message: 'Payment verified!' });
        } else {
            return NextResponse.json(
                { success: false, message: verification.message },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Verification API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
