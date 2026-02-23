import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Rocket, Palette, Upload } from 'lucide-react';

interface CustomizationFormProps {
    formData: {
        coinName: string;
        theme: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleBack: () => void;
    isLoading: boolean;
}

export function CustomizationForm({
    formData,
    handleChange,
    handleSubmit,
    handleBack,
    isLoading
}: CustomizationFormProps) {
    return (
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-right-8 duration-500">
            <Card className="glass-panel p-8 md:p-10 shadow-2xl border border-blue-500/30 backdrop-blur-xl rounded-3xl relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            <Rocket className="w-4 h-4" /> Token Name
                        </label>
                        <Input
                            name="coinName"
                            placeholder="e.g. Moonshot Coin"
                            value={formData.coinName}
                            onChange={handleChange}
                            required
                            className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-500 h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            <Palette className="w-4 h-4" /> Landing Page Theme
                        </label>
                        <Select
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            options={[
                                { label: 'Modern Dark', value: 'modern' },
                                { label: 'Cyberpunk', value: 'cyberpunk' },
                                { label: 'Minimal', value: 'minimal' },
                            ]}
                            className="bg-gray-800/50 border-gray-600 text-white h-14 text-lg focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2 pt-4">
                        <label className="text-blue-300 ml-1 text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
                            <Upload className="w-4 h-4" /> Upload Logo (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-gray-900/40">
                            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <p className="text-sm text-gray-400">Click or drag and drop to upload token logo</p>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 text-xl font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] transform hover:-translate-y-1 transition-all duration-300"
                    >
                        {isLoading ? 'Launching...' : 'Launch Promotion Page'}
                    </Button>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full py-2 text-gray-400 hover:text-white text-sm"
                    >
                        Back to Details
                    </button>
                </form>
            </Card>
        </div>
    );
}
