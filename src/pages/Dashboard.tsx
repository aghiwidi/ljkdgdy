import { useState } from "react";
import { Activity, Coins, Fingerprint, RefreshCw, Wallet } from "lucide-react";
import type { TranslationKey } from "../i18n/translations";
import type { NftScan } from "../blockchain/nftIndexer";
type Props = { t: (key: TranslationKey) => string; address: string; balance: string; scan: NftScan | null; scanning: boolean; onScan: () => void };
export default function Dashboard({ t, address, balance, scan, scanning, onScan }: Props) {
  const [copied, setCopied] = useState(false);
  const copy = async () => { if (address) { await navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 1500); } };
  const eligible = scan?.eligibleIds.length ?? 0;
  const groups = Math.floor(eligible / 3);
  return <main className="section-wrap page-content"><div className="page-top"><div><div className="eyebrow">PERSONAL OVERVIEW / 01</div><h1>{t("dashboardTitle")}</h1><p>{t("scanHelp")}</p></div><button className="button secondary" onClick={onScan} disabled={!address || scanning}><RefreshCw size={16} className={scanning ? "spin" : ""}/>{scanning ? "Scanning…" : t("scan")}</button></div>
    {!address ? <div className="empty-panel"><Wallet size={30}/><h3>{t("noWallet")}</h3></div> : <>
      <div className="wallet-panel"><div className="wallet-label">{t("wallet")}</div><button onClick={copy} className="address-copy">{address} <span>{copied ? "Copied" : "Copy"}</span></button><div className="network-chip"><span className="online-dot"/> {t("network")}: BNB Smart Chain</div></div>
      <div className="stats-grid"><Stat icon={<Coins/>} label={t("tokenBalance")} value={`${balance} KRVN`}/><Stat icon={<Fingerprint/>} label={t("nftBalance")} value={scan ? String(scan.tokenIds.length) : "—"}/><Stat icon={<Activity/>} label={t("eligible")} value={scan ? String(eligible) : "—"}/><Stat icon={<Coins/>} label={t("reward")} value={scan ? `${(groups * 3000).toLocaleString()} KRVN` : "—"}/></div>
      <div className="data-panel"><div className="panel-head"><div><div className="eyebrow">ELIGIBILITY</div><h2>{t("eligible")}</h2></div><span className="count-pill">{eligible} NFTs</span></div>
        {scan?.warning && <div className="notice warning">{scan.warning}</div>}
        {scan && !scan.warning && <div className="id-list">{scan.eligibleIds.map(id => <span className="id-chip" key={id.toString()}>#{id.toString()}</span>)}</div>}
        {scan && scan.eligibleIds.length === 0 && <p className="muted">{t("noEligible")}</p>}
        <div className="panel-foot"><span>{t("groups")}: <b>{groups}</b></span><span>{t("used")}: <b>{scan?.usedIds.length ?? "—"}</b></span></div>
      </div>
    </>}
  </main>;
}
function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <article className="stat-card"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong></article>; }