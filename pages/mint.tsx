"use client"

import { useState } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import { AlienNFT, RobotNFT } from "../contracts/contracts"

const Mint = () => {
  const [nftType, setNftType] = useState("alien")
  const [trait1, setTrait1] = useState(1)
  const [trait2, setTrait2] = useState(1)
  const [trait3, setTrait3] = useState(1)

  const mintNFT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      if (nftType === "alien") {
        const contract = new ethers.Contract(AlienNFT.address, AlienNFT.abi, signer)
        await contract.mint(await signer.getAddress(), trait1, trait2, trait3)
      } else {
        const contract = new ethers.Contract(RobotNFT.address, RobotNFT.abi, signer)
        await contract.mint(await signer.getAddress(), trait1, trait2, trait3)
      }

      alert("NFT minted successfully!")
    } catch (error) {
      console.error("Error minting NFT:", error)
      alert("Error minting NFT. Check console for details.")
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
        <h1 className="text-4xl font-bold mb-8">Mint Your NFT</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">NFT Type</label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={nftType}
              onChange={(e) => setNftType(e.target.value)}
            >
              <option value="alien">Alien</option>
              <option value="robot">Robot</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {nftType === "alien" ? "Eyes" : "Arms"}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={trait1}
              onChange={(e) => setTrait1(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {nftType === "alien" ? "Tentacles" : "Legs"}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={trait2}
              onChange={(e) => setTrait2(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {nftType === "alien" ? "Color" : "Material"}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={trait3}
              onChange={(e) => setTrait3(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={mintNFT}
            >
              Mint NFT
            </button>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <svg width="200" height="200" viewBox="0 0 100 100">
            {nftType === "alien" ? (
              <>
                <circle cx="50" cy="50" r="40" fill={`hsl(${trait3 * 72}, 100%, 50%)`} />
                {[...Array(trait1)].map((_, i) => (
                  <circle key={i} cx={40 + i * 10} cy="40" r="5" fill="white" />
                ))}
                {[...Array(trait2)].map((_, i) => (
                  <path
                    key={i}
                    d={`M ${50 + i * 10} 90 Q ${60 + i * 10} 100, ${70 + i * 10} 90`}
                    stroke="black"
                    fill="none"
                  />
                ))}
              </>
            ) : (
              <>
                <rect x="20" y="20" width="60" height="60" fill={trait3 % 2 === 0 ? "#888" : "#666"} />
                {[...Array(trait1)].map((_, i) => (
                  <rect key={i} x={10 + i * 20} y="85" width="10" height="30" fill="#444" />
                ))}
                {[...Array(trait2)].map((_, i) => (
                  <rect key={i} x={20 + i * 20} y="80" width="10" height="40" fill="#444" />
                ))}
              </>
            )}
          </svg>
        </div>
      </main>
    </div>
  )
}

export default Mint

