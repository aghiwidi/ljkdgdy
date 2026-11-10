import { BrowserProvider, type JsonRpcSigner } from "ethers";
import { CHAIN_HEX } from "./config";

declare global { interface Window { ethereum?: any } }

export async function connectWallet(): Promise<{ address: string; signer: JsonRpcSigner }> {
  if (!window.ethereum) throw new Error("No compatible browser wallet detected.");
  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  let network = await provider.getNetwork();
  if (Number(network.chainId) !== 56) {
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: CHAIN_HEX }] });
    } catch (error: any) {
      if (error?.code === 4902) {
        await window.ethereum.request({ method: "wallet_addEthereumChain", params: [{
          chainId: CHAIN_HEX, chainName: "BNB Smart Chain",
          nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
          rpcUrls: ["https://bsc-dataseed.binance.org/"], blockExplorerUrls: ["https://bscscan.com/"]
        }] });
      } else throw error;
    }
  }
  const freshProvider = new BrowserProvider(window.ethereum);
  network = await freshProvider.getNetwork();
  if (Number(network.chainId) !== 56) throw new Error("Please switch to BNB Smart Chain.");
  const signer = await freshProvider.getSigner();
  return { address: await signer.getAddress(), signer };
}