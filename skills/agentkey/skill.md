# AGENTKEY Project Skill

## Purpose
This skill provides accurate project context for agents assisting with AGENTKEY website development and maintenance.

## Network and contracts
- Network: BNB Smart Chain
- Chain ID: 56
- Native currency: BNB
- KRYVON (KRVN): `0x9D0F4E3387a585D6DF774b76d496D85C03E15237`
- AgentKey Ascend NFT: `0x7946d1F5D498116748C4168Ec23161FEfebDce37`
- Direct Claim: `0xc5EBE5e02f787837236A1D419CCEf30dF72d38C2`

## KRYVON
Fixed supply: 250,000,000 KRVN, 18 decimals. Allocation: Direct Claim 150M; Marketing 40M; DEX liquidity 20M; Team 10M; Presale 10M; Ecosystem 10M; Treasury 10M. Do not propose redeploying or minting additional tokens.

## AgentKey Ascend NFT
Supply: 150,000. Free Mint allocation: 10,000, max one per wallet. Paid Mint allocation: 140,000, max 30 per wallet, price 0.000075 BNB. Agent ID is required for either mint type. NFTs are soulbound and cannot be transferred or burned. Metadata is on-chain. The contract does not provide ERC721Enumerable, marketplace, staking, or claim functionality.

## Direct Claim
The claim contract is separate from the NFT contract. Every complete group of three unused eligible NFTs yields 3,000 KRVN. A wallet may claim multiple times. Every NFT token ID is consumable once. One or two remaining NFTs do not form a claim group. Final eligibility and payout are enforced on-chain.

## NFT discovery
Do not assume `balanceOf` enumerates token IDs. Use a reliable indexer or Transfer mint events starting at the verified deployment block. The deployment block has not been supplied and must not be guessed. Verify current ownership using `ownerOf` and claim usage using the exact verified claim ABI.

## Development and deployment
The website uses React, Vite, TypeScript, ethers v6, and Cloudflare Pages. Build command: `npm run build`. Output directory: `dist`. `public/_redirects` provides SPA fallback. Public VITE variables must never contain secrets.

## Safety
Never request or store private keys or seed phrases. Never send a transaction without explicit wallet approval. Never report a claim as successful before a successful receipt. Confirm all ABI fragments against verified BscScan source before production use.