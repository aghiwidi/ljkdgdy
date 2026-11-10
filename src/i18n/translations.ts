export type Language = "ko" | "en";
export const translations = {
  ko: {
    navHome: "홈", navDashboard: "대시보드", navClaim: "다이렉트 클레임",
    connect: "지갑 연결", disconnect: "연결 해제", eyebrow: "ON-CHAIN IDENTITY ECOSYSTEM",
    heroTitle: "당신의 다음 정체성을 여는 열쇠", heroText: "AgentKey Ascend와 KRYVON 생태계를 탐험하세요. BNB 스마트 체인에서 소유권을 확인하고 보상을 확인할 수 있습니다.",
    explore: "대시보드 보기", learn: "생태계 살펴보기", liveNetwork: "BNB 스마트 체인",
    ecosystem: "생태계", ecosystemTitle: "소유권에서 유틸리티까지", nftTitle: "AgentKey Ascend", nftText: "온체인 메타데이터를 갖춘 소울바운드 NFT 컬렉션.", tokenTitle: "KRYVON", tokenText: "고정 공급량을 기반으로 하는 생태계 토큰.",
    claimTitle: "보유한 NFT로 KRVN 클레임", claimText: "사용되지 않은 적격 NFT 3개마다 3,000 KRVN을 받을 수 있습니다.", openClaim: "클레임 시작",
    dashboardTitle: "내 대시보드", wallet: "지갑", network: "네트워크", tokenBalance: "KRVN 잔액", nftBalance: "NFT 보유량",
    eligible: "클레임 가능 NFT", used: "사용된 NFT", groups: "클레임 그룹", reward: "예상 보상",
    scan: "NFT 확인", scanHelp: "지갑을 연결한 후 NFT 보유 내역을 확인하세요.", claimNow: "클레임하기",
    claimPageTitle: "KRYVON 다이렉트 클레임", claimPageText: "미사용 적격 AgentKey Ascend NFT를 3개 단위로 사용합니다.",
    tokenIds: "사용할 토큰 ID", noWallet: "먼저 지갑을 연결하세요.", noEligible: "클레임 가능한 NFT가 아직 없습니다.",
    wrongNetwork: "BNB 스마트 체인으로 전환해 주세요.", connectFirst: "지갑 연결", footer: "AGENTKEY 생태계",
    howTitle: "작동 방식", step1: "지갑 연결", step2: "NFT 소유권 및 사용 여부 확인", step3: "3개 단위로 클레임 승인",
    disclaimer: "예상 보상은 참고용입니다. 실제 자격과 지급은 온체인 컨트랙트가 결정합니다."
  },
  en: {
    navHome: "Home", navDashboard: "Dashboard", navClaim: "Direct Claim",
    connect: "Connect wallet", disconnect: "Disconnect", eyebrow: "ON-CHAIN IDENTITY ECOSYSTEM",
    heroTitle: "The key to your next identity", heroText: "Explore AgentKey Ascend and the KRYVON ecosystem. Verify ownership and discover rewards on BNB Smart Chain.",
    explore: "Explore dashboard", learn: "Explore ecosystem", liveNetwork: "BNB Smart Chain",
    ecosystem: "Ecosystem", ecosystemTitle: "From ownership to utility", nftTitle: "AgentKey Ascend", nftText: "A soulbound NFT collection with on-chain metadata.", tokenTitle: "KRYVON", tokenText: "An ecosystem token with a fixed supply.",
    claimTitle: "Claim KRVN with your NFTs", claimText: "Receive 3,000 KRVN for every 3 unused eligible NFTs.", openClaim: "Start claiming",
    dashboardTitle: "My dashboard", wallet: "Wallet", network: "Network", tokenBalance: "KRVN balance", nftBalance: "NFTs owned",
    eligible: "Eligible NFTs", used: "Used NFTs", groups: "Claim groups", reward: "Estimated reward",
    scan: "Check NFTs", scanHelp: "Connect your wallet to inspect NFT ownership.", claimNow: "Claim now",
    claimPageTitle: "KRYVON Direct Claim", claimPageText: "Use unused eligible AgentKey Ascend NFTs in groups of three.",
    tokenIds: "Token IDs to use", noWallet: "Connect your wallet first.", noEligible: "No eligible NFTs found yet.",
    wrongNetwork: "Please switch to BNB Smart Chain.", connectFirst: "Connect wallet", footer: "AGENTKEY Ecosystem",
    howTitle: "How it works", step1: "Connect your wallet", step2: "Verify NFT ownership and usage", step3: "Approve a claim in groups of three",
    disclaimer: "Estimated rewards are informational. Final eligibility and payout are determined by the on-chain contract."
  }
} as const;
export type TranslationKey = keyof typeof translations.en;