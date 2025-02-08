'use client';
import { PrivyProvider } from '@privy-io/react-auth';
// Replace this with any of the networks listed at https://github.com/wevm/viem/blob/main/src/chains/index.ts
import { baseSepolia } from 'viem/chains';


export default function Providers({ children }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        loginMethods: ['twitter', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: '/assets/logo.png',
        },
        externalWallets: {
          coinbaseWallet: {
            connectionOptions: 'smartWalletOnly',
          },
          metaMask: {
            connectionOptions: 'smartWalletOnly',
          },
          injected: {
            connectionOptions: 'smartWalletOnly',
          },
        },
        embeddedWallets: { createOnLogin: 'users-without-wallets' },
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia],
      }}
    >
      {children}

    </PrivyProvider>
  );
} 