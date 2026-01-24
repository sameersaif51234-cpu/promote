export interface TokenDetails {
    name: string;
    symbol: string;
    address: string;
    chain: string;
    price: string;
    priceChange24h: number;
    marketCap: string;
    logoColor: string;
    dexUrl: string;
    dexName: string;
    description?: string;
    imageUrl?: string;
    pairAddress?: string; // For embedding the chart
}


import { getAsset } from './helius';
import { getDexPair } from './dexscreener';

export async function fetchTokenDetails(address: string, chain: string = 'Solana'): Promise<TokenDetails> {

    // Default values
    let name = 'MemeCoin ' + address.slice(0, 4);
    let symbol = 'MEME';
    let description = 'A generic meme coin.';
    let imageUrl = '';
    let price = '$0.000000';
    let priceChange24h = 0;
    let marketCap = '$0';
    let pairAddress = '';
    let dexUrl = '#';
    let dexName = 'DEX';

    // 1. Fetch Metadata (Helius for Solana)
    if (chain.toLowerCase() === 'solana') {
        const heliusData = await getAsset(address);
        if (heliusData) {
            name = heliusData.content?.metadata?.name || name;
            symbol = heliusData.content?.metadata?.symbol || symbol;
            description = heliusData.content?.metadata?.description || description;
            imageUrl = heliusData.content?.links?.image || heliusData.content?.files?.[0]?.uri || '';
        }
    }

    // 2. Fetch Market Data (DexScreener - Multi-chain)
    const dexPair = await getDexPair(address);
    if (dexPair) {
        price = '$' + dexPair.priceUsd;
        priceChange24h = dexPair.priceChange.h24;
        marketCap = dexPair.marketCap ? '$' + (dexPair.marketCap / 1000).toFixed(1) + 'K' : (dexPair.fdv ? '$' + (dexPair.fdv / 1000).toFixed(1) + 'K' : '$0');
        pairAddress = dexPair.pairAddress;
        dexUrl = dexPair.url;
        dexName = dexPair.dexId.charAt(0).toUpperCase() + dexPair.dexId.slice(1);

        // If we didn't get metadata from Helius (e.g. not Solana or failed), try DexScreener baseToken
        if (name.startsWith('MemeCoin')) {
            name = dexPair.baseToken.name;
            symbol = dexPair.baseToken.symbol;
        }
    } else {
        // Fallback Mock Data if DexScreener fails
        price = '$' + (Math.random() * 0.001).toFixed(6);
        const isPositive = Math.random() > 0.3;
        priceChange24h = parseFloat(((Math.random() * 20) * (isPositive ? 1 : -1)).toFixed(2));
        marketCap = '$' + (Math.floor(Math.random() * 1000) + 50) + 'K';
    }

    // Construct Dex links if not found
    if (dexUrl === '#' || dexUrl === undefined) {
        switch (chain.toLowerCase()) {
            case 'solana':
                dexUrl = `https://raydium.io/swap/?inputCurrency=sol&outputCurrency=${address}`;
                dexName = 'Raydium';
                break;
            case 'ethereum':
                dexUrl = `https://app.uniswap.org/#/swap?outputCurrency=${address}`;
                dexName = 'Uniswap';
                break;
            case 'bnb':
                dexUrl = `https://pancakeswap.finance/swap?outputCurrency=${address}`;
                dexName = 'PancakeSwap';
                break;
        }
    }

    return {
        name,
        symbol,
        address,
        chain,
        price,
        priceChange24h,
        marketCap,
        logoColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        dexUrl,
        dexName,
        description,
        imageUrl,
        pairAddress
    };
}
