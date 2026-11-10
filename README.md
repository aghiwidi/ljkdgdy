# AGENTKEY Website

A React + Vite + TypeScript frontend starter for the AGENTKEY ecosystem on BNB Smart Chain.

## Project information

- Website: https://agentkey.xyz
- Network: BNB Smart Chain (chain ID 56)
- KRYVON (KRVN): `0x9D0F4E3387a585D6DF774b76d496D85C03E15237`
- AgentKey Ascend NFT: `0x7946d1F5D498116748C4168Ec23161FEfebDce37`
- Direct Claim: `0xc5EBE5e02f787837236A1D419CCEf30dF72d38C2`

## Technology

React, Vite, TypeScript, React Router, ethers.js v6, and Lucide React.

## Local development

1. Install Node.js LTS.
2. Extract or clone this repository.
3. Run `npm install`.
4. Copy `.env.example` to `.env`.
5. Configure `VITE_BSC_RPC_URL` and the verified `VITE_NFT_DEPLOYMENT_BLOCK`.
6. Run `npm run dev`.
7. Run `npm run build` before deployment.

## Environment variables

| Variable | Purpose |
|---|---|
| `VITE_BSC_RPC_URL` | Public BSC RPC endpoint |
| `VITE_NFT_DEPLOYMENT_BLOCK` | Verified NFT contract deployment block; required for browser event scanning |
| `VITE_INDEXER_API_URL` | Optional indexer endpoint; integration must be implemented to match its API |
| `VITE_WALLETCONNECT_PROJECT_ID` | Optional WalletConnect project ID; WalletConnect is not wired in this starter |

Never place private keys, seed phrases, or secret API credentials in `VITE_` variables. Vite exposes them to browser users.

## GitHub and Cloudflare Pages

1. Create a GitHub repository named `agentkey-website`.
2. Upload the contents of this folder to the repository root (not an extra nested folder).
3. In Cloudflare, open **Workers & Pages** and create a Pages project connected to the repository.
4. Set the project root directory to the folder containing `package.json` (if you uploaded the ZIP contents directly, this is the repository root; if the archive folder itself was uploaded as a nested directory, select `agentkey-website`). Select the Vite framework preset, or configure:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add the public environment variables from `.env.example` in the Cloudflare Pages project settings.
6. Deploy, then add `agentkey.xyz` as a custom domain in the Pages project and follow Cloudflare's DNS instructions.

The `public/_redirects` file configures SPA fallback for client-side routes.

## Direct Claim workflow

The interface discovers NFT token IDs from ERC-721 mint Transfer logs, checks current ownership, and queries the Direct Claim `usedNFT` state. It groups eligible NFTs in multiples of three and requests an explicit wallet confirmation before calling `claim(uint256[])`.

Reward rule: 3 unused eligible NFTs = 3,000 KRVN. Six = 6,000 KRVN, nine = 9,000 KRVN. Remainders of one or two are not used. A wallet can claim repeatedly as long as it has another complete group of unused eligible NFTs.

## Important production requirements

This repository is a functional starter, not an audited or production-certified dApp. Before public launch:

1. Verify all ABI fragments against the exact verified BscScan source for the deployed contracts.
2. Confirm the Direct Claim function signature and event definitions. The frontend currently assumes `REWARD_PER_GROUP()`, `usedNFT(uint256)`, and `claim(uint256[])`; these must be checked against verified source.
3. Set `VITE_NFT_DEPLOYMENT_BLOCK` to the actual NFT deployment block. It is intentionally blank because the verified block was not supplied. Never guess it.
4. Prefer a reliable indexer for production NFT discovery. Direct browser log scanning can be slow or limited by RPC providers for large block ranges.
5. Test with a safe test wallet and small eligible test set before launch. Do not consume valuable NFTs just to test.
6. Perform a security review and test wallet rejection, chain changes, RPC errors, and transaction reverts.
7. WalletConnect is not integrated in this starter; injected EVM wallets are supported.

## Team vesting

The 10,000,000 KRVN team allocation has a 12-month cliff vesting requirement. The Team Vesting contract address has not been provided. No vesting transaction is enabled here. LP tokens are not locked.

## Privacy notes

The website UI and repository metadata do not intentionally display developer location or domain registrar details. This does not make the project anonymous. DNS, WHOIS/RDAP, hosting, registrar, public blockchain records, and infrastructure providers may expose information depending on their configuration and policies.

## Project files

See `src/` for application code, `prompts/` for English AI prompts, and `skills/agentkey/skill.md` for the agent skill reference.