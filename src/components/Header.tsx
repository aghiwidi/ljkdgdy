import { Link, NavLink } from "react-router-dom";
import { Languages, Menu, X, Wallet } from "lucide-react";
import { useState } from "react";
import type { Language, TranslationKey } from "../i18n/translations";

type Props = { lang: Language; setLang: (v: Language) => void; t: (key: TranslationKey) => string; address: string; onConnect: () => void; onDisconnect: () => void };
export default function Header({ lang, setLang, t, address, onConnect, onDisconnect }: Props) {
  const [open, setOpen] = useState(false);
  return <header className="header"><Link to="/" className="brand"><img src="/logo.svg" alt="AGENTKEY" /></Link>
    <button className="mobile-toggle icon-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? "nav nav-open" : "nav"}>
      <NavLink to="/" onClick={() => setOpen(false)}>{t("navHome")}</NavLink>
      <NavLink to="/dashboard" onClick={() => setOpen(false)}>{t("navDashboard")}</NavLink>
      <NavLink to="/claim" onClick={() => setOpen(false)}>{t("navClaim")}</NavLink>
    </nav>
    <div className="header-actions"><button className="language" onClick={() => setLang(lang === "ko" ? "en" : "ko")}><Languages size={16}/>{lang === "ko" ? "EN" : "한국어"}</button>
      {address ? <button className="wallet-button connected" onClick={onDisconnect}><span className="online-dot"/>{address.slice(0,6)}…{address.slice(-4)}</button> : <button className="wallet-button" onClick={onConnect}><Wallet size={16}/>{t("connect")}</button>}
    </div>
  </header>;
}