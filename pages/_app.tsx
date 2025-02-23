"use client"

import "../styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"

function MyApp({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" })
          setIsConnected(true)
        } catch (error) {
          console.error("Failed to connect to wallet:", error)
        }
      } else {
        console.error("MetaMask is not installed")
      }
    }

    connectWallet()
  }, [])

  return (
    <>
      {!isConnected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Please connect your wallet</h2>
            <p className="mb-4">This app requires a Web3 wallet like MetaMask to function properly.</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        </div>
      )}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

