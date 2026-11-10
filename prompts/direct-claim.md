# AGENTKEY Direct Claim Integration Prompt

Implement the Direct Claim flow against the deployed BNB Smart Chain contract at `0xc5EBE5e02f787837236A1D419CCEf30dF72d38C2`.

NFT contract: `0x7946d1F5D498116748C4168Ec23161FEfebDce37`
KRVN token: `0x9D0F4E3387a585D6DF774b76d496D85C03E15237`

Rules:
- Every complete group of 3 unused eligible NFTs yields 3,000 KRVN.
- 6 NFTs yield 6,000 KRVN; 9 yield 9,000 KRVN.
- Remainders of 1 or 2 NFTs remain unused.
- A wallet may claim repeatedly; there is no one-claim-per-wallet cap.
- Each NFT token ID may only be used once.

Before implementation, inspect the verified contract source and confirm the exact ABI, function names, parameters, events, and return values. Do not guess ABI details. Discover NFT token IDs using a reliable indexer or Transfer mint logs from the verified deployment block; the deployment block must be configured, never guessed. Verify each token with `ownerOf` and `usedNFT`. Show the exact token IDs and estimated reward before asking the wallet to sign. Require explicit confirmation and wait for transaction receipt before reporting success.