import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Layers, Coins, Rocket, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PromotionFormProps {
    formData: {
        chain: string;
        contractAddress: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleNextStep: (e: React.FormEvent) => void;
    isLoading: boolean;
    isConnected: boolean;
}

export function PromotionForm({
    formData,
    handleChange,
    handleNextStep,
    isLoading,
    isConnected
}: PromotionFormProps) {
    return (
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Card className="glass-panel p-8 md:p-10 shadow-2xl border border-gray-700/50 backdrop-blur-xl rounded-3xl">
                <form onSubmit={handleNextStep} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            <Layers className="w-4 h-4" /> Network
                        </label>
                        <Select
                            name="chain"
                            value={formData.chain}
                            onChange={handleChange}
                            required
                            options={[
                                { label: 'Solana', value: 'Solana' },
                                { label: 'Ethereum', value: 'Ethereum' },
                                { label: 'BNB Smart Chain', value: 'BNB' },
                                { label: 'Base', value: 'Base' },
                            ]}
                            className="bg-gray-800/50 border-gray-600 text-white h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            <Coins className="w-4 h-4" /> Contract Address
                        </label>
                        <Input
                            name="contractAddress"
                            placeholder="Enter token address"
                            value={formData.contractAddress}
                            onChange={handleChange}
                            required
                            autoFocus
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] transform hover:-translate-y-1 transition-all duration-300"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                {isConnected ? 'Verifying Payment...' : 'Connecting...'}
                            </div>
                        ) : (
                            <>Pay & Continue <Rocket className="ml-2 w-6 h-6 animate-pulse" /></>
                        )}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                    </Link>
                </div>
            </Card>
        </div>
    );
}
