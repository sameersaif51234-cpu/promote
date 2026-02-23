'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { CinematicEarthBackground } from '@/components/promote/CinematicEarthBackground';
import { PromotionForm } from '@/components/promote/PromotionForm';
import { CustomizationForm } from '@/components/promote/CustomizationForm';

export default function PromotePage() {
    const router = useRouter();
    const { open } = useAppKit();
    const { address, isConnected } = useAppKitAccount();
    const { walletProvider } = useAppKitProvider('solana');
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isDevnet, setIsDevnet] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        coinName: '',
        contractAddress: '',
        chain: 'Solana', // Default
        theme: 'modern',
        txSignature: ''
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                setIsDevnet(prev => !prev);
                console.log('Devnet Mode:', !isDevnet);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDevnet]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.contractAddress) {
            alert('Please enter a contract address.');
            return;
        }

        if (!isConnected || !walletProvider) {
            open();
            return;
        }

        setIsLoading(true);
        try {
            // Trigger payment immediately
            const connectionUrl = isDevnet ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com';
            const connection = new Connection(connectionUrl);
            const toPublicKey = new PublicKey('B1ArEadB8EWJ5tv9fyWogpEZ3GFEV4C8KMRmDCoRJN9U');
            const amountSOL = 0.25;

            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(address!),
                    toPubkey: toPublicKey,
                    lamports: amountSOL * LAMPORTS_PER_SOL,
                })
            );

            transaction.feePayer = new PublicKey(address!);
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;

            // @ts-ignore
            const signature = await walletProvider.sendTransaction(transaction, connection);
            console.log('Payment sent:', signature);

            // Verify
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    txSignature: signature,
                    chain: 'Solana',
                    isDevnet: isDevnet
                }),
            });

            const data = await response.json();
            if (!data.success) {
                alert(`Verification failed: ${data.message}`);
                return;
            }

            setFormData(prev => ({ ...prev, txSignature: signature }));
            setStep(2);
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed or cancelled. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Final submission (Step 2 after customization)
        const params = new URLSearchParams({
            chain: formData.chain,
            name: formData.coinName || 'My Token',
            theme: formData.theme
        });

        router.push(`/coin/${formData.contractAddress}?${params.toString()}`);
        setIsLoading(false);
    };

    return (
        <div className="relative min-h-screen overflow-hidden text-white selection:bg-accent selection:text-white">
            {/* Cinematic Background */}
            <CinematicEarthBackground />

            {/* Content Wrapper */}
            <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 max-w-5xl h-full flex flex-col items-center justify-center min-h-[80vh]">

                {/* Header */}
                <div className={`text-center transition-all duration-500 ${step >= 2 ? 'mb-8 scale-90' : 'mb-12'}`}>
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-white font-poppins mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                        {step === 1 && 'Promote Your Coin'}
                        {step === 2 && 'Customize Your Landing Page'}
                    </h1>
                    {isDevnet && (
                        <div className="mb-4">
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50 px-4 py-1 animate-pulse">
                                DEVNET MODE ACTIVE (Ctrl + E to toggle)
                            </Badge>
                        </div>
                    )}
                </div>

                {/* STEP 1: Contract & Payment */}
                {step === 1 && (
                    <PromotionForm
                        formData={formData}
                        handleChange={handleChange}
                        handleNextStep={handleNextStep}
                        isLoading={isLoading}
                        isConnected={isConnected}
                    />
                )}

                {/* STEP 2: Customization */}
                {step === 2 && (
                    <CustomizationForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleBack={handleBack}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </div>
    );
}
