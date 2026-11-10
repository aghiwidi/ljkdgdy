import { Interface, JsonRpcProvider, getAddress, zeroPadValue } from "ethers";
import { BSC_RPC, CONTRACTS, DEPLOYMENT_BLOCK, TRANSFER_TOPIC } from "./config";
import { isNftUsed } from "./contracts";

const provider = new JsonRpcProvider(BSC_RPC);
const transferInterface = new Interface(["event Transfer(address indexed from,address indexed to,uint256 indexed tokenId)"]);

export type NftScan = { tokenIds: bigint[]; eligibleIds: bigint[]; usedIds: bigint[]; warning?: string };

export async function discoverEligibleNfts(owner: string): Promise<NftScan> {
  if (!DEPLOYMENT_BLOCK || !/^\d+$/.test(DEPLOYMENT_BLOCK)) {
    return { tokenIds: [], eligibleIds: [], usedIds: [], warning: "Set VITE_NFT_DEPLOYMENT_BLOCK to the verified NFT deployment block, or configure an indexer." };
  }
  const latest = await provider.getBlockNumber();
  const start = Number(DEPLOYMENT_BLOCK);
  if (!Number.isSafeInteger(start) || start < 0 || start > latest) throw new Error("Invalid NFT deployment block configuration.");
  const ownerTopic = zeroPadValue(getAddress(owner), 32);
  const found = new Set<string>();
  const chunkSize = 1500;
  for (let from = start; from <= latest; from += chunkSize) {
    const to = Math.min(from + chunkSize - 1, latest);
    const logs = await provider.getLogs({
      address: CONTRACTS.nft, fromBlock: from, toBlock: to,
      topics: [TRANSFER_TOPIC, null, ownerTopic]
    });
    for (const log of logs) {
      const parsed = transferInterface.parseLog(log);
      if (parsed) found.add(BigInt(parsed.args.tokenId).toString());
    }
  }
  const tokenIds = [...found].map(BigInt).sort((a,b) => a < b ? -1 : a > b ? 1 : 0);
  const stillOwned: bigint[] = [];
  const nft = new (await import("ethers")).Contract(CONTRACTS.nft, ["function ownerOf(uint256) view returns (address)"], provider);
  for (const id of tokenIds) {
    try { if (getAddress(await nft.ownerOf(id)) === getAddress(owner)) stillOwned.push(id); } catch { /* burned or unavailable IDs are excluded */ }
  }
  const states = await Promise.all(stillOwned.map(async id => ({ id, used: await isNftUsed(id) })));
  return {
    tokenIds: stillOwned,
    eligibleIds: states.filter(x => !x.used).map(x => x.id),
    usedIds: states.filter(x => x.used).map(x => x.id)
  };
}