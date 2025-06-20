"use client"

import React, { useEffect, useState } from "react"
import { encodeFunctionData, parseEther } from "viem"
import { useConnect, useSendCalls, useAccount, useDisconnect } from "wagmi"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, CheckCircle, XCircle, Wallet, ShoppingBag, Sparkles } from "lucide-react"

interface ProfileResult {
  success: boolean
  email?: string
  address?: string
  error?: string
}

const MERCH_ITEMS = [
  {
    id: 1,
    name: "Pixel Hoodie",
    price: "0.0001",
    description: "Limited edition pixel art hoodie with glow-in-dark print",
    image: "🧥"
  },
  {
    id: 2,
    name: "Cyber Cap",
    price: "0.0001",
    description: "RGB-enabled cap with programmable LED display",
    image: "🧢"
  },
  {
    id: 3,
    name: "Matrix Tee",
    price: "0.0001",
    description: "Digital rain pattern t-shirt with AR effects",
    image: "👕"
  }
]

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendCalls, data, error, isPending } = useSendCalls()
  const [selectedItem, setSelectedItem] = useState(MERCH_ITEMS[0])
  const [result, setResult] = useState<ProfileResult | null>(null)

  // Handle response data when sendCalls completes
  useEffect(() => {
          if (data?.capabilities?.dataCallback) {
      const callbackData = data.capabilities.dataCallback
      const newResult: ProfileResult = { success: true }

      // Extract email if provided
      if (callbackData.email) newResult.email = callbackData.email

      // Extract address if provided
      if (callbackData.physicalAddress) {
        const addr = callbackData.physicalAddress
        newResult.address = [addr.address1, addr.address2, addr.city, addr.state, addr.postalCode, addr.countryCode]
          .filter(Boolean)
          .join(", ")
      }

      setResult(newResult)
    } else if (data && !data.capabilities?.dataCallback) {
      setResult({ success: false, error: "Transaction failed" })
    }
  }, [data])

  // Handle errors
  useEffect(() => {
    if (error) {
      setResult({
        success: false,
        error: error.message || "Transaction failed",
      })
    }
  }, [error])

  // Handle purchase
  async function handlePurchase() {
    try {
      setResult(null)
      
      // Send calls using wagmi hook
      // Build requests array for profile data
      const requests = [
        { type: "email", optional: false },
        { type: "physicalAddress", optional: false }
      ];

      sendCalls({
        connector: connectors[0],
        account: address,
        calls: [
          {
            to: "0x1B958A48373109E9146A950a75F5bD25B845143b",
            value: parseEther(selectedItem.price),
            data: "0x",
          },
        ],
        chainId: 84532, // Base Sepolia
        capabilities: {
          dataCallback: {
            requests: requests,
            callbackURL: "https://5e90-194-116-208-73.ngrok-free.app/api/data-validation",
          },
        },
      })
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error occurred",
      })
    }
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Header */}
      <header className="border-b border-neon-blue/20 bg-cyber-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Sparkles className="h-8 w-8 text-neon-blue animate-glow" />
              <h1 className="font-pixel text-xl bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent">
                PIXEL MERCH
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              {isConnected ? (
                <Button 
                  variant="outline" 
                  onClick={() => disconnect()}
                  className="font-mono border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                >
                  Disconnect
                </Button>
              ) : null}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {MERCH_ITEMS.map((item) => (
              <Card 
                key={item.id}
                className={`bg-cyber-dark border-2 transition-all duration-300 cursor-pointer ${
                  selectedItem.id === item.id 
                    ? 'border-neon-blue shadow-lg shadow-neon-blue/20' 
                    : 'border-cyber-light hover:border-neon-blue/50'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <CardHeader>
                  <div className="text-4xl text-center mb-2">{item.image}</div>
                  <CardTitle className="font-pixel text-sm text-center text-neon-blue">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="font-mono text-xs text-center text-gray-400">
                    {item.price} ETH
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Purchase Card */}
          <Card className="bg-cyber-dark border-2 border-neon-pink/50">
            <CardHeader>
              <CardTitle className="font-pixel text-neon-pink">Selected Item</CardTitle>
              <CardDescription className="font-mono">{selectedItem.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <Button 
                  onClick={() => connect({ connector: connectors[0], chainId: 84532 })} 
                  className="w-full bg-neon-blue hover:bg-neon-blue/80 text-cyber-black font-pixel"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-cyber-light rounded-lg p-3">
                    <p className="font-mono text-sm text-neon-green">
                      ✓ Wallet: {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>

                  <Button 
                    onClick={handlePurchase} 
                    disabled={isPending} 
                    className="w-full bg-neon-pink hover:bg-neon-pink/80 text-cyber-black font-pixel"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Buy Now ({selectedItem.price} ETH)
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Transaction Result */}
              {result && (
                <div className="mt-6">
                  {result.success ? (
                    <Alert className="border-neon-green bg-neon-green/10">
                      <CheckCircle className="h-4 w-4 text-neon-green" />
                      <AlertDescription className="font-mono text-neon-green">
                        <div className="space-y-2">
                          <p>Purchase successful! 🎉</p>
                          {result.email && (
                            <p className="text-sm">Email: {result.email}</p>
                          )}
                          {result.address && (
                            <p className="text-sm">Shipping to: {result.address}</p>
                          )}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert className="border-neon-pink bg-neon-pink/10">
                      <XCircle className="h-4 w-4 text-neon-pink" />
                      <AlertDescription className="font-mono text-neon-pink">
                        {result.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
