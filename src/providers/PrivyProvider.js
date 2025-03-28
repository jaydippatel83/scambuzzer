'use client';
import { PrivyProvider } from '@privy-io/react-auth'; 
import { baseSepolia, flowTestnet, arbitrum, arbitrumSepolia } from 'viem/chains';


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
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia, flowTestnet, arbitrum, arbitrumSepolia],
      }}
    >
      {children}

    </PrivyProvider>
  );
} 