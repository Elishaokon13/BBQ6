import React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Roboto_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const pixelFont = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel"
})

const mono = Roboto_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
})

export const metadata: Metadata = {
  title: "Pixel Merch Store",
  description: "Get your exclusive pixel merch with crypto payments",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${pixelFont.variable} ${mono.variable} font-mono`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
