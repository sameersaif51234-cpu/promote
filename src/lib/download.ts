import { TokenDetails } from './token';


export function generateDownloadableHtml(token: TokenDetails, themeClass: string) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${token.name} - Official Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://terminal.jup.ag/main-v3.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
    </style>
</head>
<body class="${themeClass}">
    <div class="min-h-screen pb-20">
        <!-- Header -->
        <section class="bg-gradient-to-b from-blue-50/50 to-transparent py-12 border-b border-gray-100/10">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div class="flex items-center gap-6">
                        ${token.imageUrl ? `<img src="${token.imageUrl}" alt="${token.name}" class="h-24 w-24 rounded-full shadow-lg border-4 border-white/20 object-cover">` :
            `<div class="h-20 w-20 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg" style="background-color: ${token.logoColor}">${token.name.charAt(0)}</div>`}
                        
                        <div>
                            <h1 class="text-3xl md:text-5xl font-bold mb-2">${token.name}</h1>
                            <div class="flex items-center gap-3 text-sm opacity-80">
                                <span class="px-2 py-1 bg-gray-100/20 rounded text-xs font-mono font-medium">${token.symbol}</span>
                                <span class="px-2 py-1 bg-gray-100/20 rounded text-xs font-mono">${token.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        ${token.chain.toLowerCase() === 'solana' ?
            `<button onclick="window.Jupiter.init({ endpoint: 'https://api.mainnet-beta.solana.com', formProps: { fixedOutputMint: true, initialOutputMint: '${token.address}' } })" 
                            class="px-6 py-3 bg-black text-[#19FB9B] rounded-lg font-bold border border-[#19FB9B]/20 shadow-lg hover:opacity-90 transition flex items-center">
                            Buy with Jupiter
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                         </button>` : ''}
                        
                        <a href="${token.dexUrl}" target="_blank" class="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg hover:bg-blue-700 transition">
                            Buy on ${token.dexName}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="container mx-auto px-4 py-12">
            <div class="grid md:grid-cols-3 gap-8">
                <!-- Stats & Chart -->
                <div class="md:col-span-2 space-y-8">
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-white/5 rounded-xl border border-gray-200/20 shadow-sm">
                            <p class="text-xs opacity-60 uppercase mb-1">Price</p>
                            <div class="text-2xl font-bold">${token.price}</div>
                        </div>
                        <div class="p-4 bg-white/5 rounded-xl border border-gray-200/20 shadow-sm">
                            <p class="text-xs opacity-60 uppercase mb-1">24h Change</p>
                            <div class="text-2xl font-bold ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}">
                                ${token.priceChange24h}%
                            </div>
                        </div>
                        <div class="p-4 bg-white/5 rounded-xl border border-gray-200/20 shadow-sm">
                            <p class="text-xs opacity-60 uppercase mb-1">Market Cap</p>
                            <div class="text-2xl font-bold">${token.marketCap}</div>
                        </div>
                    </div>

                    <!-- Chart -->
                    <div class="h-[500px] bg-gray-900 rounded-xl overflow-hidden shadow-inner relative">
                        ${token.pairAddress ?
            `<iframe src="https://dexscreener.com/${token.chain.toLowerCase()}/${token.pairAddress}?embed=1&theme=dark&trades=0&info=0" class="w-full h-full border-0"></iframe>` :
            '<div class="h-full flex items-center justify-center text-gray-500">Chart data unavailable</div>'}
                    </div>

                    <!-- About -->
                    <div class="bg-white/5 p-8 rounded-xl border border-gray-200/20">
                        <h3 class="text-2xl font-bold mb-4">About ${token.name}</h3>
                        <p class="leading-relaxed opacity-80 mb-4">${token.description}</p>
                        <p class="leading-relaxed opacity-80">
                            Generated by CoinFace.
                        </p>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <div class="p-6 bg-gradient-to-br from-blue-600 to-blue-900 text-white rounded-xl shadow-xl">
                        <h3 class="font-bold text-lg mb-4">Tokenomics</h3>
                        <ul class="space-y-3 text-sm text-blue-100">
                             <li class="flex justify-between border-b border-white/10 pb-2">
                                <span>Total Supply</span>
                                <span class="font-mono font-bold">1B</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        
        <footer class="text-center py-8 opacity-40 text-sm">
            Powered by CoinFace
        </footer>
    </div>
</body>
</html>
    `;
    return html;
}
