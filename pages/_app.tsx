import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/Layout"
import { AuthProvider, CHAIN } from '@arcana/auth'
import { ProvideAuth } from '@arcana/auth-react'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

const appAddress = '48c31b59874588631f4557b580c026fc15c76c20'
const provider = new AuthProvider(`${appAddress}`, {
  network: 'testnet',
  alwaysVisible: true,
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/' // 'https://polygon-rpc.com', 
  },
})

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY as string,
    baseUrl: 'https://livepeer.studio/api',
  }),
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={provider}>
      <LivepeerConfig client={livepeerClient}>
        <Layout>
          <Component {...pageProps} />
          </Layout>
      </LivepeerConfig>
    </ProvideAuth>
  )
}
