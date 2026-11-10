import { Contract, JsonRpcProvider, formatUnits } from "ethers";
import { BSC_RPC, CONTRACTS, TOKEN_ABI, CLAIM_ABI } from "./config";

const provider = new JsonRpcProvider(BSC_RPC);
export async function getTokenBalance(address: string): Promise<string> {
  const token = new Contract(CONTRACTS.token, TOKEN_ABI, provider);
  const [balance, decimals] = await Promise.all([token.balanceOf(address), token.decimals()]);
  return Number(formatUnits(balance, decimals)).toLocaleString("en-US", { maximumFractionDigits: 4 });
}
export async function getRewardPerGroup(): Promise<bigint> {
  const claim = new Contract(CONTRACTS.claim, CLAIM_ABI, provider);
  return BigInt(await claim.REWARD_PER_GROUP());
}
export async function isNftUsed(tokenId: bigint): Promise<boolean> {
  const claim = new Contract(CONTRACTS.claim, CLAIM_ABI, provider);
  return Boolean(await claim.usedNFT(tokenId));
}