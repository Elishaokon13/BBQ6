import { http, createConfig } from "wagmi"
import { baseSepolia } from "wagmi/chains"
import { coinbaseWallet } from "wagmi/connectors"

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Onchain Event Registration",
      preference: "smartWalletOnly",
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
