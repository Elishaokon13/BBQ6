import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Registration
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
            <p className="text-gray-600">Last updated: June 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Data Collection</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your name, email, physical address, and wallet address are collected for event registration and swag
                  delivery. We only collect the data you explicitly choose to share through our Smart Wallet Profiles
                  integration.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">How We Use Your Data</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Name:</strong> Used for event registration, certificates, and personalized communications
                  </li>
                  <li>
                    <strong>Email:</strong> Used for event updates, notifications, and important announcements
                  </li>
                  <li>
                    <strong>Physical Address:</strong> Used exclusively for shipping hackathon swag and prizes
                  </li>
                  <li>
                    <strong>Wallet Address:</strong> Used for prize distribution and onchain interactions
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your data is stored securely using industry-standard encryption and security practices. We implement
                  appropriate technical and organizational measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  All collected data will be securely deleted within 90 days after the event concludes, unless you
                  explicitly opt-in to receive future event notifications. Prize-related information may be retained
                  longer for tax and legal compliance purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                  <li>Access the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
                <p className="text-gray-700 leading-relaxed">
                  This application uses Smart Wallet Profiles for secure data collection and Base blockchain for payment
                  processing. These services have their own privacy policies and terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at
                  privacy@hackathon-event.com.
                </p>
              </section>

              <div className="bg-blue-50 p-4 rounded-lg mt-8">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> This privacy policy is specific to the Virtual Hackathon 2025 event
                  registration system. By registering for the event, you acknowledge that you have read and agree to
                  this privacy policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
