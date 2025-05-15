"use client";

import { useEffect, useState } from "react";

const phrases = [
  "Summoning your NFTs...",
  "Verifying your ENS magic...",
  "Whispering to the Ethereum elves...",
  "Opening the vault of JPEGs...",
  "Decrypting your onchain art...",
  "Dusting off ancient meme scrolls...",
  "Fetching shiny profile pictures...",
  "Evaluating NFT flex levels...",
  "You got so many NFTs 😮",
  "Hope your wallet is ready for this 🧙‍♂️",
  "Almost there... hold tight!",
  "Finalizing the NFT gallery layout...",
];

export default function LoadingAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const isLast = index === phrases.length - 1;
    const delay = isLast ? 4000 : 2000;

    const timeout = setTimeout(() => {
      setIndex((prev) => (isLast ? prev : (prev + 1) % phrases.length));
    }, delay);

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-white text-lg animate-pulse">{phrases[index]}</p>
    </div>
  );
}
