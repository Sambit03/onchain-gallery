"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resolveENSName } from "@/lib/resovleENS";

export default function HomePage() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resolved = await resolveENSName(input);
    if (resolved) {
      router.push(`/address/${resolved}`);
    } else {
      alert("Invalid ENS name or wallet address.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <h1 className="text-4xl font-extrabold mb-4">NFT Explorer</h1>
      <p className="text-lg mb-8 text-gray-300">
        Enter an ENS name or Ethereum address to view NFTs
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. vitalik.eth or 0x..."
          className="flex-1 px-4 py-3 rounded-md text-black w-full sm:w-auto"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md font-semibold"
        >
          Search
        </button>
      </form>
    </main>
  );
}
