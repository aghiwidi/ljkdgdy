import { Contract, JsonRpcProvider } from 'ethers'
import { CONTRACTS } from './config'
import { ERC721_ABI } from './contracts'

export async function discoverOwnedNfts(owner: string): Promise<bigint[]> {
  const deploymentBlock = Number(import.meta.env.VITE_NFT_DEPLOYMENT_BLOCK || 0)
  if (!deploymentBlock) return []

  const provider = new JsonRpcProvider(import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org/')
  const nft = new Contract(CONTRACTS.NFT, ERC721_ABI, provider)

  const filter = nft.filters.Transfer(null, owner)
  const events = await nft.queryFilter(filter, deploymentBlock)

  const tokenIds = new Set<bigint>()
  for (const event of events) {
    if ('args' in event && event.args?.tokenId) {
      tokenIds.add(event.args.tokenId)
    }
  }

  const owned: bigint[] = []
  for (const id of tokenIds) {
    try {
      const ownerOf = await nft.ownerOf(id)
      if (ownerOf.toLowerCase() === owner.toLowerCase()) {
        owned.push(id)
      }
    } catch {}
  }

  return owned
}
