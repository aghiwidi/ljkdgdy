import { useMemo } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, Coins, Fingerprint, ShieldCheck } from "lucide-react";
import type { TranslationKey } from "../i18n/translations";
import type { NftScan } from "../blockchain/nftIndexer";
type Props = { t: (key: TranslationKey) => string; address: string; scan: NftScan | null; scanning: boolean; claiming: boolean; onScan: () => void; onClaim: (ids: bigint[]) => void };
export default function Claim({ t, address, scan, scanning, claiming, onScan, onClaim }: Props) {
  const ids = useMemo(() => (scan?.eligibleIds ?? []).slice(0, Math.floor((scan?.eligibleIds.length ?? 0) / 3) * 3), [scan]);
  const reward = ids.length / 3 * 3000;
  return <main className="section-wrap page-content claim-page"><div className="page-top"><div><div className="eyebrow">KRYVON / HOLDER REWARDS</div><h1>{t("claimPageTitle")}</h1><p>{t("claimPageText")}</p></div><div className="reward-badge"><Coins size={17}/> 3,000 KRVN / 3 NFTs</div></div>
    <div className="claim-layout"><section className="claim-main">
      <div className="claim-amount"><span>{t("reward")}</span><strong>{reward.toLocaleString()} <small>KRVN</small></strong><p>{ids.length} NFTs · {Math.floor(ids.length / 3)} complete groups</p></div>
      <div className="data-panel"><div className="panel-head"><div><div className="eyebrow">NFT SELECTION</div><h2>{t("tokenIds")}</h2></div><span className="count-pill">{ids.length} selected</span></div>
        {!address ? <div className="notice"><CircleAlert size={17}/>{t("noWallet")}</div> : !scan ? <button className="button secondary" onClick={onScan} disabled={scanning}>{scanning ? "Scanning…" : t("scan")}</button> : scan.warning ? <div className="notice warning"><CircleAlert size={17}/>{scan.warning}</div> : ids.length === 0 ? <div className="notice"><CircleAlert size={17}/>{t("noEligible")}</div> : <div className="id-list">{ids.map(id => <span className="id-chip selected" key={id.toString()}>#{id.toString()} <CheckCircle2 size={13}/></span>)}</div>}
        <p className="disclaimer">{t("disclaimer")}</p>
      </div>
      <button className="button primary claim-button" disabled={!address || !ids.length || claiming || !!scan?.warning} onClick={() => onClaim(ids)}>{claiming ? "Waiting for wallet…" : t("claimNow")} <ArrowRight size={17}/></button>
    </section>
    <aside className="claim-aside"><div className="aside-icon"><ShieldCheck size={25}/></div><h3>{t("howTitle")}</h3><ol><li>{t("step1")}</li><li>{t("step2")}</li><li>{t("step3")}</li></ol><div className="aside-rule"/><p>Each NFT can only be used once. Your wallet may claim repeatedly as long as it owns at least three unused eligible NFTs.</p><a href="https://bscscan.com/address/0xc5EBE5e02f787837236A1D419CCEf30dF72d38C2" target="_blank" rel="noreferrer">View claim contract on BscScan ↗</a></aside></div>
  </main>;
}