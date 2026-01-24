export const HELIUS_API_KEY = 'fe72a059-a6c0-4103-b850-de304a3f56eb';
export const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

export interface HeliusAssetResponse {
    interface: string;
    id: string;
    content: {
        json_uri: string;
        files: {
            uri: string;
            cdn_uri: string;
            mime: string;
        }[];
        metadata: {
            name: string;
            symbol: string;
            description: string;
        };
        links: {
            external_url: string;
            image: string;
        };
    };
    token_info: {
        price_info: {
            price_per_token: number;
            currency: string;
        };
    };
}

export async function getAsset(assetId: string) {
    try {
        const response = await fetch(HELIUS_RPC_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'my-id',
                method: 'getAsset',
                params: {
                    id: assetId,
                    displayOptions: {
                        showFungible: true, // For token specific info
                        showNativeBalance: true,
                    },
                },
            }),
        });

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching asset from Helius:', error);
        return null;
    }
}
