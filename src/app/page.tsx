import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Rocket, Zap, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { InteractiveSpaceBackground } from '@/components/InteractiveSpaceBackground';

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20 relative min-h-screen text-white">

      {/* Interactive Space Background */}
      <InteractiveSpaceBackground />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 scale-110 md:scale-125 origin-center">
            <div className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg md:text-xl font-black shadow-[0_0_25px_rgba(220,38,38,0.6)] transform -rotate-3 border-2 border-red-400">
              LIMITED OFFER
            </div>
            <div className="bg-green-500 text-black px-6 py-2 rounded-lg text-lg md:text-xl font-black shadow-[0_0_25px_rgba(34,197,94,0.6)] transform rotate-2 border-2 border-green-300">
              50% OFF
            </div>
            <div className="bg-black/60 backdrop-blur-md border-2 border-green-500/50 px-6 py-2 rounded-lg text-lg md:text-xl font-bold flex items-center gap-3 shadow-xl">
              <span className="text-gray-400 line-through decoration-red-500 decoration-2">$50</span>
              <ArrowRight className="w-5 h-5 text-gray-300" />
              <span className="text-green-400 text-2xl md:text-3xl font-black drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">$25 <span className="text-lg md:text-xl align-middle font-bold text-green-300/80">/ 0.2 SOL</span></span>
            </div>
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-0 bg-black/60 blur-2xl rounded-full opacity-70"></div>
            <h1 className="relative z-10 text-5xl md:text-7xl font-bold tracking-tight text-white font-poppins mb-6 max-w-4xl mx-auto leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Promote your meme coin to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 drop-shadow-none filter brightness-110">Moon</span>
            </h1>
          </div>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Boost visibility, drive engagement, and launch your meme coin across Solana, Ethereum, and BNB chains in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/promote">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.7)] transition-all transform hover:-translate-y-1 bg-gradient-to-r from-purple-600 to-purple-800 hover:bg-purple-700 border-none">
                Promote Your Coin
                <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
                How it works
              </Button>
            </Link>
          </div>

          {/* New Promotional Banner */}
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl border border-yellow-500/30 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(234,179,8,0.15)] max-w-4xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-500 text-black p-1.5 rounded-full">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-yellow-400 font-black text-lg tracking-wide uppercase">Limited Offer</span>
              </div>
              <div className="h-px md:h-8 w-full md:w-px bg-yellow-500/30" />
              <p className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white leading-tight">
                Get a <span className="text-yellow-400 underline decoration-yellow-400/50 underline-offset-4">free website</span> and list your token on all the DEX&apos;s to make more reach to your token
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Founder Legend Section (New) */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Texture - Golden Nebula */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14] via-purple-900/10 to-[#0B0E14]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-bold text-sm mb-6 animate-fade-in-up">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                </span>
                New Feature Unlocked
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 font-poppins">
                Become a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">Legendary Founder</span>
              </h2>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                Your journey deserves to be immortalized. Create a stunning, shareable "Flex Page" that showcases your wins, coins launched, and total earnings.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Showcase your crypto conquests",
                  "Shareable heroic profile card",
                  "Verified Founder Status badge"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-200">
                    <div className="mr-4 p-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Rocket className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/founder">
                <Button size="lg" className="h-16 px-10 text-xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black border-none shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] transform hover:-translate-y-1 transition-all">
                  Create Your Legend <Zap className="ml-2 w-6 h-6 fill-black" />
                </Button>
              </Link>
            </div>

            {/* Right Visual - Tilt Card Effect using CSS */}
            <div className="relative perspective-1000 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

              <div className="relative bg-[#1a1a2e]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 transform rotate-y-12 group-hover:rotate-y-0 transition-transform duration-700 ease-out shadow-2xl">
                {/* Mockup of the Flex Page */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">Satoshi Jr.</h4>
                      <span className="text-xs text-yellow-400 font-mono">VERIFIED FOUNDER</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase">Total Earnings</div>
                    <div className="text-xl font-black text-green-400">$1,000,000+</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                    <span className="text-gray-400">Coins Launched</span>
                    <span className="text-white font-bold text-xl">42 🚀</span>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                    <span className="text-gray-400">DEXs Conquered</span>
                    <span className="text-white font-bold text-xl">15 ⚔️</span>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5 italic text-gray-300 text-sm">
                    "I started with nothing but a memecoin dream and a laptop..."
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                  <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                    coinface.com/founder/share
                  </div>
                </div>

                {/* Decorative Shine */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-tr-3xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white font-poppins mb-4">Why Choose Coinface?</h2>
          <p className="text-gray-400 max-w-xl mx-auto">We provide the tools you need to get your token in front of thousands of potential investors.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-accent bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins text-white">Multi-Chain Support</h3>
            <p className="text-gray-400 leading-relaxed">
              Whether you're on Solana, Ethereum, or BNB Smart Chain, we support seamless promotion for all major networks.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-purple-500 bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins text-white">Instant Launch</h3>
            <p className="text-gray-400 leading-relaxed">
              No waiting periods. Submit your coin details and your promotion campaign goes live instantly to our network.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all border-t-4 border-t-accent bg-gray-900/60 backdrop-blur-md border-white/5 hover:-translate-y-2">
            <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
              <ShieldCheck className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 font-poppins text-white">Verified Security</h3>
            <p className="text-gray-400 leading-relaxed">
              We vet all submissions to ensure a safe environment for investors, building trust for your community.
            </p>
          </Card>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/5">
              <h2 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-6 leading-tight">
                Get your coin trending in <br />three simple steps
              </h2>
              <p className="text-gray-200 mb-8 text-lg font-medium">
                Stop struggling with complex marketing. We've simplified the process so you can focus on building your community.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">1</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Submit Coin Details</h4>
                    <p className="text-gray-300">Enter your contract address, chain, and basic info.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">2</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Pay & Launch</h4>
                    <p className="text-gray-300">Send <span className="text-green-400 font-bold">$25 or 0.2 SOL</span> to start your campaign.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-[0_0_15px_#4F46E5] text-lg">3</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">Watch it Grow</h4>
                    <p className="text-gray-300">Your coin is listed and promoted to our active user base.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Reviews */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 rounded-3xl transform rotate-2 scale-105 opacity-20 blur-xl animate-pulse"></div>
              <Card className="relative p-8 border border-white/10 shadow-2xl bg-[#0f172a]/90 backdrop-blur-xl h-full rounded-3xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-purple-400 to-blue-500`}></div>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">500+ Happy Creators</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">What people are saying</h3>

                <div className="space-y-6">
                  {/* Review 1 */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500">★</div>)}
                    </div>
                    <p className="text-gray-300 italic mb-3">"Insane ROI! My token did 10x after listing here. The process was super smooth."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs">JP</div>
                      <div>
                        <p className="text-white text-sm font-bold">J.P. Morgan (Not really)</p>
                        <p className="text-xs text-green-400">Launched $BANK</p>
                      </div>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500">★</div>)}
                    </div>
                    <p className="text-gray-300 italic mb-3">"Best promotion platform for Solana memecoins. Simple, fast, and effective."</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xs">AK</div>
                      <div>
                        <p className="text-white text-sm font-bold">Alex K.</p>
                        <p className="text-xs text-green-400">Launched $PEPE2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
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
    </div>
  );
}
