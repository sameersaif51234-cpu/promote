import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Rocket, Zap, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white opacity-70"></div>
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            The #1 Meme Coin Promotion Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary font-poppins mb-6 max-w-4xl mx-auto leading-tight">
            Promote your meme coin to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Moon</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Boost visibility, drive engagement, and launch your meme coin across Solana, Ethereum, and BNB chains in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/promote">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all transform hover:-translate-y-1">
                Promote Your Coin
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
                How it works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary font-poppins mb-4">Why Choose Coinface?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">We provide the tools you need to get your token in front of thousands of potential investors.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-t-accent">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins">Multi-Chain Support</h3>
            <p className="text-gray-500 leading-relaxed">
              Whether you're on Solana, Ethereum, or BNB Smart Chain, we support seamless promotion for all major networks.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-t-primary">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins">Instant Launch</h3>
            <p className="text-gray-500 leading-relaxed">
              No waiting periods. Submit your coin details and your promotion campaign goes live instantly to our network.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-shadow border-t-4 border-t-accent">
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins">Verified Security</h3>
            <p className="text-gray-500 leading-relaxed">
              We vet all submissions to ensure a safe environment for investors, building trust for your community.
            </p>
          </Card>
        </div>
      </section>

      {/* Steps Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary font-poppins mb-6">
                Get your coin trending in <br />three simple steps
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Stop struggling with complex marketing. We've simplified the process so you can focus on building your community.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Submit Coin Details</h4>
                    <p className="text-gray-500">Enter your contract address, chain, and basic info.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Select Package</h4>
                    <p className="text-gray-500">Choose the promotion duration that fits your budget.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Watch it Grow</h4>
                    <p className="text-gray-500">Your coin is listed and promoted to our active user base.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 rounded-2xl transform rotate-3 scale-105 opacity-20 blur-lg"></div>
              <Card className="relative p-8 border-0 shadow-2xl">
                <div className="space-y-6">
                  <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  <div className="h-12 bg-blue-50 rounded border border-blue-100"></div>
                  <div className="h-12 bg-blue-50 rounded border border-blue-100"></div>
                  <div className="h-24 bg-gray-50 rounded border border-gray-100"></div>
                  <div className="h-12 bg-primary rounded w-full"></div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="container mx-auto px-4 text-center py-10">
        <div className="bg-primary rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-accent opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white font-poppins mb-6">Ready to skyrocket?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join thousands of successful projects that started on Coinface.</p>
            <Link href="/promote">
              <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold">
                Start Promoting Now <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
