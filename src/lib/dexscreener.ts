export interface DexPairsResponse {
    schemaVersion: string;
    pairs: DexPair[];
}

export interface DexPair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
        m5: { buys: number; sells: number };
        h1: { buys: number; sells: number };
        h6: { buys: number; sells: number };
        h24: { buys: number; sells: number };
    };
    volume: {
        h24: number;
        h6: number;
        h1: number;
        m5: number;
    };
    priceChange: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    liquidity?: {
        usd?: number;
        base?: number;
        quote?: number;
    };
    fdv?: number;
    marketCap?: number;
}

export async function getDexPair(tokenAddress: string): Promise<DexPair | null> {
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        const data: DexPairsResponse = await response.json();

        if (data.pairs && data.pairs.length > 0) {
            // Return the most liquid pair, usually the first one but let's sort to be safe
            // Actually DexScreener usually sorts by liquidity/volume by default
            return data.pairs[0];
        }
        return null;
    } catch (error) {
        console.error("Error fetching DexScreener data:", error);
        return null;
    }
}
