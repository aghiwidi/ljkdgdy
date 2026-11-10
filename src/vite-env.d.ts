/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BSC_RPC_URL?: string;
  readonly VITE_NFT_DEPLOYMENT_BLOCK?: string;
  readonly VITE_INDEXER_API_URL?: string;
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }