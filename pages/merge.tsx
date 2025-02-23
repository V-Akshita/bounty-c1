"use client"

import { useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import { CyborgNFT } from "../contracts/contracts"

const Merge = () => {
  const [alienId, setAlienId] = useState("")
  const [robotId, setRobotId] = useState("")

  const mergeNFTs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CyborgNFT.address, CyborgNFT.abi, signer)

      await contract.merge(alienId, robotId)
      alert("NFTs merged successfully!")
    } catch (error) {
      console.error("Error merging NFTs:", error)
      alert("Error merging NFTs. Check console for details.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/mint">Mint</Link>
          </li>
          <li>
            <Link href="/merge">Merge</Link>
          </li>
          <li>
            <Link href="/gallery">Gallery</Link>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Merge Your NFTs</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Alien NFT ID</label>
            <input
              type="text"
              value={alienId}
              onChange={(e) => setAlienId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Robot NFT ID</label>
            <input
              type="text"
              value={robotId}
              onChange={(e) => setRobotId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={mergeNFTs}
            >
              Merge NFTs
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Merging Laboratory</h2>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="flex justify-around items-center">
              <div className="w-1/3 text-center">
                <div className="bg-purple-600 w-32 h-32 mx-auto rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">👽</span>
                </div>
                <p className="text-white mt-2">Alien</p>
              </div>
              <div className="w-1/3 text-center">
                <div className="bg-yellow-400 w-32 h-32 mx-auto rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚡</span>
                </div>
                <p className="text-white mt-2">Merge</p>
              </div>
              <div className="w-1/3 text-center">
                <div className="bg-blue-600 w-32 h-32 mx-auto rounded-full flex items-center justify-center">
                  <span className="text-white text-4xl">🤖</span>
                </div>
                <p className="text-white mt-2">Robot</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Merge

