/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import LoadingAnimation from "@/components/loadingAnimation";

export default function OnchainGallery({
  params,
}: {
  params: { slug: string };
}) {
  const [nfts, setNfts] = useState<any[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<any | null>(null);
  const walletAddress = params.slug;

  const fetchNFTs = async (walletAddress: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    const chains = [
      "worldchain-mainnet",
      "shape-mainnet",
      "eth-mainnet",
      "zksync-mainnet",
      "opt-mainnet",
      "polygon-mainnet",
      "arb-mainnet",
      "arbnova-mainnet",
      "zetachain-mainnet",
      "berachain-mainnet",
      "blast-mainnet",
      "linea-mainnet",
      "zora-mainnet",
      "monad-testnet",
      "ronin-mainnet",
      "settlus-mainnet",
      "rootstock-mainnet",
      "base-mainnet",
      "lens-mainnet",
      "avax-mainnet",
      "gnosis-mainnet",
      "bnb-mainnet",
      "apechain-mainnet",
      "anime-mainnet",
      "scroll-mainnet",
      "unichain-mainnet",
      "soneium-mainnet",
      "abstract-mainnet",
    ];

    let allNFTs: any[] = [];

    for (const chain of chains) {
      try {
        const url = `https://${chain}.g.alchemy.com/v2/${API_KEY}/getNFTs?owner=${walletAddress}&excludeFilters=SPAM`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error fetching from ${chain}`);
        const data = await response.json();
        const filteredNFTs = data.ownedNfts.filter(
          (nft: any) =>
            nft.media?.[0].thumbnail && nft.title && nft.title.trim() !== ""
        );
        allNFTs = [...allNFTs, ...filteredNFTs];
      } catch (error) {
        console.error(`Failed to fetch NFTs from ${chain}:`, error);
      }
    }

    setNfts(allNFTs);
  };

  useEffect(() => {
    fetchNFTs(walletAddress);
  }, []);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center">
        Onchain NFT Gallery
      </h1>

      {nfts.length === 0 ? (
        <LoadingAnimation />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 cursor-pointer hover:shadow-md transition"
              onClick={() => setSelectedNFT(nft)}
            >
              <Image
                src={nft.media?.[0]?.thumbnail}
                alt={nft.title || "NFT Image"}
                width={300}
                height={300}
                className="w-full h-auto object-cover rounded"
              />
              <p className="mt-2 font-medium text-center text-sm sm:text-base">
                {nft.title || "Unnamed NFT"}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedNFT && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-[80%] max-w-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNFT(null)}
              className="absolute top-0.5 right-1 text-md text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <Image
              src={
                selectedNFT.media?.[0]?.gateway ||
                selectedNFT.media?.[0]?.thumbnail
              }
              alt={selectedNFT.title || "NFT Image"}
              width={500}
              height={500}
              className="w-full max-h-[60vh] object-contain rounded"
            />
            <h2 className="text-lg text-cyan-400 font-semibold mt-4">
              {selectedNFT.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {selectedNFT.description || "No description available."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
