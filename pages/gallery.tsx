"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Link from "next/link"
import { AlienNFT, RobotNFT, CyborgNFT } from "../contracts/contracts"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

const NFTModel = ({ type, traits }) => {
  return (
    <mesh>
      {type === "alien" && (
        <>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color={`hsl(${traits[2] * 72}, 100%, 50%)`} />
          {[...Array(traits[0])].map((_, i) => (
            <mesh key={i} position={[0.5 - i * 0.25, 0.5, 0.9]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="white" />
            </mesh>
          ))}
        </>
      )}
      {type === "robot" && (
        <>
          <boxGeometry args={[1, 1.5, 1]} />
          <meshStandardMaterial color={traits[2] % 2 === 0 ? "#888" : "#666"} />
          {[...Array(traits[0])].map((_, i) => (
            <mesh key={i} position={[0.6 - i * 0.4, 0, 0.6]}>
              <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
              <meshStandardMaterial color="#444" />
            </mesh>
          ))}
        </>
      )}
      {type === "cyborg" && (
        <>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color={`hsl(${traits[0] * 72}, 100%, 50%)`} />
          <mesh position={[0, 0.7, 0]}>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial color={traits[1] % 2 === 0 ? "#888" : "#666"} />
          </mesh>
          {[...Array(traits[2])].map((_, i) => (
            <mesh key={i} position={[0.5 - i * 0.25, 0.3, 0.7]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}
        </>
      )}
    </mesh>
  )
}

const Gallery = () => {
  const [nfts, setNfts] = useState([])

  useEffect(() => {
    const fetchNFTs = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      const alienContract = new ethers.Contract(AlienNFT.address, AlienNFT.abi, signer)
      const robotContract = new ethers.Contract(RobotNFT.address, RobotNFT.abi, signer)
      const cyborgContract = new ethers.Contract(CyborgNFT.address, CyborgNFT.abi, signer)

      const alienBalance = await alienContract.balanceOf(address)
      const robotBalance = await robotContract.balanceOf(address)
      const cyborgBalance = await cyborgContract.balanceOf(address)

      const fetchedNFTs = []

      for (let i = 0; i < alienBalance; i++) {
        const tokenId = await alienContract.tokenOfOwnerByIndex(address, i)
        const alien = await alienContract.getAlien(tokenId)
        fetchedNFTs.push({ type: "alien", id: tokenId.toString(), traits: [alien.eyes, alien.tentacles, alien.color] })
      }

      for (let i = 0; i < robotBalance; i++) {
        const tokenId = await robotContract.tokenOfOwnerByIndex(address, i)
        const robot = await robotContract.getRobot(tokenId)
        fetchedNFTs.push({ type: "robot", id: tokenId.toString(), traits: [robot.arms, robot.legs, robot.material] })
      }

      for (let i = 0; i < cyborgBalance; i++) {
        const tokenId = await cyborgContract.tokenOfOwnerByIndex(address, i)
        const cyborg = await cyborgContract.getCyborg(tokenId)
        fetchedNFTs.push({
          type: "cyborg",
          id: tokenId.toString(),
          traits: [cyborg.alienDNA, cyborg.robotDNA, cyborg.powerLevel],
        })
      }

      setNfts(fetchedNFTs)
    }

    fetchNFTs()
  }, [])

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
        <h1 className="text-4xl font-bold mb-8">Your NFT Gallery</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts.map((nft) => (
            <div key={`${nft.type}-${nft.id}`} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">
                {nft.type.charAt(0).toUpperCase() + nft.type.slice(1)} #{nft.id}
              </h2>
              <div className="h-64 w-full">
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <OrbitControls />
                  <NFTModel type={nft.type} traits={nft.traits} />
                </Canvas>
              </div>
              <div className="mt-4">
                <h3 className="font-bold">Traits:</h3>
                <ul>
                  {nft.traits.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Gallery

