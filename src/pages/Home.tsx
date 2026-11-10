import { ArrowUpRight, Fingerprint, KeyRound, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import type { TranslationKey } from "../i18n/translations";
type Props = { t: (key: TranslationKey) => string; onConnect: () => void };
export default function Home({ t, onConnect }: Props) {
  return <main>
    <section className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span className="pulse"/> {t("eyebrow")}</div>
      <h1>{t("heroTitle")}<span className="lime">.</span></h1><p className="hero-text">{t("heroText")}</p>
      <div className="hero-actions"><Link className="button primary" to="/dashboard">{t("explore")} <ArrowUpRight size={17}/></Link><button className="button secondary" onClick={onConnect}>{t("connect")}</button></div>
      <div className="hero-meta"><span><span className="online-dot"/> {t("liveNetwork")}</span><span>CHAIN ID / 56</span></div>
    </div><div className="hero-art" aria-label="Abstract AGENTKEY geometric identity artwork"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="core"><KeyRound size={76} strokeWidth={1.1}/><span>AK / 01</span></div><div className="art-tag tag-top">IDENTITY VERIFIED</div><div className="art-tag tag-bottom">BNB · ON-CHAIN</div><div className="art-cross cross-a">+</div><div className="art-cross cross-b">+</div></div>
    </section>
    <section className="section-wrap ecosystem"><div className="section-heading"><div><div className="eyebrow">{t("ecosystem")}</div><h2>{t("ecosystemTitle")}</h2></div><span className="section-index">01 / 03</span></div>
      <div className="feature-grid"><article className="feature-card"><div className="feature-icon"><Fingerprint/></div><div className="card-kicker">01 — SOULBOUND NFT</div><h3>{t("nftTitle")}</h3><p>{t("nftText")}</p><span className="card-line"/></article>
      <article className="feature-card"><div className="feature-icon"><Layers3/></div><div className="card-kicker">02 — FIXED SUPPLY</div><h3>{t("tokenTitle")}</h3><p>{t("tokenText")}</p><span className="card-line"/></article>
      <article className="feature-card feature-claim"><div className="feature-icon"><Sparkles/></div><div className="card-kicker">03 — HOLDER UTILITY</div><h3>{t("claimTitle")}</h3><p>{t("claimText")}</p><Link to="/claim" className="text-link">{t("openClaim")} <ArrowUpRight size={16}/></Link></article></div>
    </section>
    <section className="bottom-banner section-wrap"><div className="banner-mark"><ShieldCheck size={28}/></div><div><div className="eyebrow">BUILT ON BNB SMART CHAIN</div><h2>Ownership. Utility. Identity.</h2></div><Link to="/claim" className="button primary">{t("openClaim")} <ArrowUpRight size={17}/></Link></section>
  </main>;
}