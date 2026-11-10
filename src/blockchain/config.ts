export const CHAIN_ID = 56;
export const CHAIN_HEX = "0x38";
export const BSC_RPC = import.meta.env.VITE_BSC_RPC_URL || "https://bsc-dataseed.binance.org/";
export const CONTRACTS = {
  token: "0x9D0F4E3387a585D6DF774b76d496D85C03E15237",
  nft: "0x7946d1F5D498116748C4168Ec23161FEfebDce37",
  claim: "0xc5EBE5e02f787837236A1D419CCEf30dF72d38C2"
} as const;
export const TOKEN_ABI = ["function balanceOf(address) view returns (uint256)", "function decimals() view returns (uint8)"];
// Confirm these fragments against the verified BscScan source before production use.
export const NFT_ABI = ["function balanceOf(address) view returns (uint256)", "function ownerOf(uint256) view returns (address)"];
export const CLAIM_ABI = [
  "function REWARD_PER_GROUP() view returns (uint256)",
  "function usedNFT(uint256) view returns (bool)",
  "function claim(uint256[] tokenIds)"
];
export const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
export const DEPLOYMENT_BLOCK = import.meta.env.VITE_NFT_DEPLOYMENT_BLOCK || "";