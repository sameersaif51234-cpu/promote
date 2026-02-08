"use client";

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, arbitrum, solana, solanaDevnet } from '@reown/appkit/networks'
import React, { ReactNode } from 'react'

// 1. Get projectId from https://cloud.reown.com
const projectId = '8497df71db8808110b32a923a9664531'

// 2. Set up networks
const networks = [mainnet, arbitrum, solana, solanaDevnet] as [any, ...any[]]

// 3. Create modal
createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    defaultNetwork: solana,
    projectId,
    metadata: {
        name: 'Coinface',
        description: 'Meme Coin Promotion Platform',
        url: 'https://coinface.fun',
        icons: ['https://avatars.githubusercontent.com/u/179229932']
    },
    features: {
        email: true,
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        emailShowWallets: true,
        analytics: true,
        onramp: true,
        swaps: true
    },
    allWallets: 'SHOW',
    themeMode: 'dark',
    themeVariables: {
        '--w3m-accent': '#6366f1',
        '--w3m-border-radius-master': '1px',
        '--w3m-z-index': 1000
    }
})

export function AppKitProvider({ children }: { children: ReactNode }) {
    // Ethers adapter doesn't need a specific provider wrapper like Wagmi
    return (
        <>
            {children}
        </>
    )
}
