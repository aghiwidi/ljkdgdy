import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Contract } from "ethers";
import Header from "./components/Header";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Claim from "./pages/Claim";
import { translations, type Language, type TranslationKey } from "./i18n/translations";
import { connectWallet } from "./blockchain/wallet";
import { getTokenBalance } from "./blockchain/contracts";
import { discoverEligibleNfts, type NftScan } from "./blockchain/nftIndexer";
import { CLAIM_ABI, CONTRACTS } from "./blockchain/config";

declare global { interface Window { ethereum?: any } }
export default function App() {
  const [lang, setLang] = useState<Language>("ko");
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState<any>(null);
  const [balance, setBalance] = useState("—");
  const [scan, setScan] = useState<NftScan | null>(null);
  const [scanning, setScanning] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang]);

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  const refresh = useCallback(async (wallet: string) => {
    try { setBalance(await getTokenBalance(wallet)); } catch { setBalance("Unavailable"); }
  }, []);
  const handleConnect = useCallback(async () => {
    try {
      const result = await connectWallet();
      setAddress(result.address); setSigner(result.signer); await refresh(result.address); setMessage("");
    } catch (e: any) { setMessage(e?.shortMessage || e?.message || "Wallet connection failed."); }
  }, [refresh]);
  const handleDisconnect = () => { setAddress(""); setSigner(null); setScan(null); setBalance("—"); };
  const handleScan = useCallback(async () => {
    if (!address) return;
    setScanning(true); setMessage("");
    try { const result = await discoverEligibleNfts(address); setScan(result); await refresh(address); }
    catch (e: any) { setMessage(e?.shortMessage || e?.message || "NFT scan failed."); }
    finally { setScanning(false); }
  }, [address, refresh]);
  const handleClaim = async (ids: bigint[]) => {
    if (!signer || ids.length < 3 || ids.length % 3 !== 0) return;
    const confirmed = window.confirm(`Submit a Direct Claim using ${ids.length} NFTs for an estimated ${(ids.length / 3 * 3000).toLocaleString()} KRVN? The wallet will ask you to approve the transaction and gas.`);
    if (!confirmed) return;
    setClaiming(true); setMessage("");
    try {
      const contract = new Contract(CONTRACTS.claim, CLAIM_ABI, signer);
      const tx = await contract.claim(ids);
      setMessage(`Transaction submitted: ${tx.hash}`);
      await tx.wait();
      setMessage(`Claim confirmed. Transaction: ${tx.hash}`);
      await Promise.all([refresh(address), handleScan()]);
    } catch (e: any) { setMessage(e?.shortMessage || e?.reason || e?.message || "Claim failed."); }
    finally { setClaiming(false); }
  };
  useEffect(() => {
    if (!window.ethereum) return;
    const onAccounts = (accounts: string[]) => { if (!accounts.length) handleDisconnect(); else if (accounts[0] !== address) { setAddress(accounts[0]); setSigner(null); setScan(null); refresh(accounts[0]); } };
    const onChain = () => { setScan(null); setSigner(null); setMessage("Network changed. Reconnect your wallet."); };
    window.ethereum.on?.("accountsChanged", onAccounts); window.ethereum.on?.("chainChanged", onChain);
    return () => { window.ethereum.removeListener?.("accountsChanged", onAccounts); window.ethereum.removeListener?.("chainChanged", onChain); };
  }, [address, refresh]);
  const footerYear = new Date().getFullYear();
  return <div className="app-shell"><Header lang={lang} setLang={setLang} t={t} address={address} onConnect={handleConnect} onDisconnect={handleDisconnect}/>
    {message && <div className="global-message" role="status">{message}<button onClick={() => setMessage("")}>×</button></div>}
    <Routes>
      <Route path="/" element={<Home t={t} onConnect={handleConnect}/>}/>
      <Route path="/dashboard" element={<Dashboard t={t} address={address} balance={balance} scan={scan} scanning={scanning} onScan={handleScan}/>}/>
      <Route path="/claim" element={<Claim t={t} address={address} scan={scan} scanning={scanning} claiming={claiming} onScan={handleScan} onClaim={handleClaim}/>}/>
      <Route path="*" element={<Home t={t} onConnect={handleConnect}/>}/>
    </Routes>
    <footer className="footer section-wrap"><div><img src="/logo.svg" alt="AGENTKEY"/><p>{t("footer")} · BNB Smart Chain</p></div><span>© {footerYear} AGENTKEY. All rights reserved.</span><a href="https://bscscan.com/address/0x9D0F4E3387a585D6DF774b76d496D85C03E15237" target="_blank" rel="noreferrer">KRVN Contract ↗</a></footer>
  </div>;
}