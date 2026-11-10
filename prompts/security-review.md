# AGENTKEY Security Review Checklist

Review the complete repository for:
- Correct chain ID enforcement (56).
- Correct contract addresses and verified ABIs.
- No private keys, seed phrases, or secret API keys in frontend code.
- Explicit wallet confirmation for every transaction.
- Integer-safe token arithmetic.
- Correct NFT ownerOf checks.
- Correct usedNFT checks.
- Claim groups restricted to multiples of three.
- No wallet-level claim cap in frontend logic.
- Safe handling of RPC failures, wallet rejection, and chain/account changes.
- No false success messages before transaction receipt.
- No fabricated deployment block or transaction data.
- Cloudflare Pages SPA routing and reproducible production build.

Report findings by severity and provide exact file/line references.