import { AlchemyProvider, isAddress } from "ethers";

const provider = new AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

export async function resolveENSName(input: string): Promise<string | null> {
  if (isAddress(input)) return input;

  try {
    const address = await provider.resolveName(input);
    return address;
  } catch (error) {
    console.error("Failed to resolve ENS:", error);
    return null;
  }
}
