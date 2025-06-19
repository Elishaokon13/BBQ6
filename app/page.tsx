"use client"

import { useEffect, useState } from "react"
import { encodeFunctionData, erc20Abi, parseUnits } from "viem"
import { useConnect, useSendCalls, useAccount, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Wallet, Users, Trophy } from "lucide-react"
import Link from "next/link"

interface DataRequest {
  email: boolean
  address: boolean
}

interface ProfileResult {
  success: boolean
  email?: string
  address?: string
  error?: string
}

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendCalls, data, error, isPending } = useSendCalls()

  const [dataToRequest, setDataToRequest] = useState<DataRequest>({
    email: true,
    address: true,
  })
  const [result, setResult] = useState<ProfileResult | null>(null)

  // Function to get callback URL - replace with your ngrok URL
  function getCallbackURL() {
    return "https://kzmjoumrqc5kb6l6p9bf.lite.vusercontent.net/api/data-validation"
  }

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
      setResult({ success: false, error: "Invalid response - no data callback" })
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

  // Handle form submission
  async function handleSubmit() {
    try {
      setResult(null)

      // Build requests array based on checkboxes
      const requests = []
      if (dataToRequest.email) requests.push({ type: "email", optional: false })
      if (dataToRequest.address) requests.push({ type: "physicalAddress", optional: false })

      if (requests.length === 0) {
        setResult({ success: false, error: "Select at least one data type" })
        return
      }

      // Send calls using wagmi hook
      sendCalls({
        connector: connectors[0],
        account: null,
        calls: [
          {
            to: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC contract address on Base Sepolia
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "transfer",
              args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", parseUnits("0.01", 6)],
            }),
          },
        ],
        chainId: 84532, // Base Sepolia
        capabilities: {
          dataCallback: {
            requests: requests,
            callbackURL: getCallbackURL(),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Virtual Hackathon 2025</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
              {isConnected ? (
                <Button variant="outline" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              ) : null}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-4 rounded-full">
              <Users className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join the Future of Development</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Register for our virtual hackathon using Smart Wallet Profiles. Build the next generation of onchain
            applications and win amazing prizes!
          </p>
        </div>

        {/* Registration Card */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Event Registration</span>
            </CardTitle>
            <CardDescription>Registration fee: 0.01 USDC on Base Sepolia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Data Collection Explanation */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Data Collection</h3>
              <p className="text-blue-800 text-sm">
                We collect your email and address to register you for the hackathon and ship swag. Select which data
                you'd like to share:
              </p>
            </div>

            {/* Data Selection Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={dataToRequest.email}
                  onCheckedChange={(checked) => setDataToRequest((prev) => ({ ...prev, email: checked as boolean }))}
                />
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address (for event updates and notifications)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="address"
                  checked={dataToRequest.address}
                  onCheckedChange={(checked) => setDataToRequest((prev) => ({ ...prev, address: checked as boolean }))}
                />
                <label htmlFor="address" className="text-sm font-medium">
                  Physical Address (for swag shipping)
                </label>
              </div>
            </div>

            {/* Connection Status */}
            {!isConnected ? (
              <div className="text-center">
                <Button onClick={() => connect({ connector: connectors[0] })} className="w-full" size="lg">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Smart Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800 text-sm">
                    ✅ Wallet connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>

                <Button onClick={handleSubmit} disabled={isPending} className="w-full" size="lg">
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Registration...
                    </>
                  ) : (
                    "Register for Hackathon (0.01 USDC)"
                  )}
                </Button>
              </div>
            )}

            {/* Results Display */}
            {result && (
              <div className="mt-6">
                {result.success ? (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <div className="space-y-2">
                        <p className="font-semibold">Registration Successful! 🎉</p>
                        <div className="text-sm space-y-1">
                          {result.email && (
                            <p>
                              <strong>Email:</strong> {result.email}
                            </p>
                          )}
                          {result.address && (
                            <p>
                              <strong>Address:</strong> {result.address}
                            </p>
                          )}
                        </div>
                        <p className="text-sm">Check your email for further instructions!</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>{result.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Need Base Sepolia USDC for testing? Visit the{" "}
            <a href="https://faucet.quicknode.com/base/sepolia" className="text-indigo-600 hover:underline">
              Base Sepolia Faucet
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
