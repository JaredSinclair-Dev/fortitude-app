import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#080a0f", surface: "#0d1018", surfaceAlt: "#111520",
  border: "#18202e", borderHover: "#243040",
  accent: "#29a8ff", accentDim: "#1a6ea8", accentGlow: "rgba(41,168,255,0.10)",
  pink: "#e91ea7", pinkDim: "#9c1470", pinkGlow: "rgba(233,30,167,0.09)",
  gold: "#d0d8e8", goldDim: "#6b7a8f", goldGlow: "rgba(208,216,232,0.07)",
  text: "#dce6f5", textMuted: "#56677a", textDim: "#2e3d52",
};

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400&family=Inter:wght@300;400;500;600&display=swap');
  @font-face {
    font-family: 'Counter-Strike';
    src: url('https://db.onlinewebfonts.com/t/e0b1fd7acc6b8c6aed1db44b3a69a9f0.woff2') format('woff2'),
         url('https://db.onlinewebfonts.com/t/e0b1fd7acc6b8c6aed1db44b3a69a9f0.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:${C.bg};color:${C.text};font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
  .df{font-family:'Counter-Strike','Inter',sans-serif;letter-spacing:.08em}
  .mn{font-family:'JetBrains Mono',monospace}
  @keyframes fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pu{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes dr{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
  .fi{animation:fi .4s ease forwards}
  .pu{animation:pu 2s infinite}
  .ni{display:flex;align-items:center;gap:9px;padding:9px 14px;border-radius:6px;cursor:pointer;transition:all .2s;color:${C.textMuted};font-size:12px;font-weight:500;letter-spacing:.01em;border:1px solid transparent;white-space:nowrap;overflow:hidden}
  .ni:hover{background:${C.surfaceAlt};color:${C.text}}
  .ni.ac{background:${C.accentGlow};color:${C.accent};border-color:rgba(41,168,255,.2)}
  .mc{background:rgba(13,16,24,.82);border:1px solid ${C.border};border-radius:8px;padding:20px;transition:border-color .2s;backdrop-filter:blur(8px)}
  .mc:hover{border-color:rgba(41,168,255,.18)}
  .btn{padding:10px 20px;border-radius:5px;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;letter-spacing:.06em;text-transform:uppercase;border:none;font-family:'Inter',sans-serif}
  .bp{background:${C.accent};color:${C.bg}}.bp:hover{background:#45baff}
  .bg{background:transparent;color:${C.textMuted};border:1px solid ${C.border}}.bg:hover{border-color:${C.accent};color:${C.accent};background:${C.accentGlow}}
  .tg{display:inline-flex;align-items:center;padding:3px 8px;border-radius:3px;font-size:10px;font-weight:600;letter-spacing:.07em;text-transform:uppercase}
  .ta{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .td{background:${C.pinkGlow};color:${C.pink};border:1px solid rgba(233,30,167,.22)}
  .tg2{background:${C.goldGlow};color:${C.gold};border:1px solid rgba(208,216,232,.2)}
  .tb{background:${C.accentGlow};color:${C.accent};border:1px solid rgba(41,168,255,.22)}
  .sl{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${C.textDim};margin-bottom:12px}
  .inp{background:rgba(17,21,32,.85);border:1px solid ${C.border};color:${C.text};border-radius:5px;padding:10px 14px;font-size:13px;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s;width:100%;backdrop-filter:blur(4px)}
  .inp:focus{border-color:${C.accent}}
  .inp option{background:${C.surfaceAlt}}
  .pb{height:3px;border-radius:2px;background:${C.border};overflow:hidden}
  .pf{height:100%;border-radius:2px;background:linear-gradient(90deg,${C.accent},${C.pink})}
  table{width:100%;border-collapse:collapse}
  th{text-align:left;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.textDim};padding:8px 12px;border-bottom:1px solid ${C.border}}
  td{padding:11px 12px;border-bottom:1px solid ${C.border};font-size:13px;color:${C.textMuted}}
  tr:last-child td{border-bottom:none}
  tr:hover td{background:${C.surfaceAlt};color:${C.text}}
  hr.dv{border:none;border-top:1px solid ${C.border};margin:16px 0}
  .tradingview-widget-container{width:100%;border-radius:8px;overflow:hidden}
  .tradingview-widget-copyright{font-size:11px;color:${C.textDim};padding:6px 0}
  .tradingview-widget-copyright .blue-text{color:${C.accent};text-decoration:none}
  .tradingview-widget-copyright .trademark{color:${C.textDim}}
`;

const IC = ({ n, s = 16, c = "currentColor" }) => {
  const p = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    intel: <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    edu: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>,
    comm: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    acct: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    chart: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    admin: <><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 1 1-14.14 14.14A10 10 0 0 1 19.07 4.93z"/></>,
    journal: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    coach: <><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.98-3 2.5 2.5 0 0 1-1.32-4.24 3 3 0 0 1 .34-5.58 2.5 2.5 0 0 1 1.96-3.1A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.98-3 2.5 2.5 0 0 0 1.32-4.24 3 3 0 0 0-.34-5.58 2.5 2.5 0 0 0-1.96-3.1A2.5 2.5 0 0 0 14.5 2Z"/></>,
    trend: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    zap: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{p[n]}</svg>;
};

const EqChart = ({ data, color = C.accent, h = 60 }) => {
  const w = 300, mn = Math.min(...data), mx = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - mn) / (mx - mn || 1)) * (h - 8) - 4}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: h }} preserveAspectRatio="none">
      <defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity=".18"/><stop offset="100%" stopColor={color} stopOpacity="0"/></linearGradient></defs>
      <path d={`M ${pts.split(" ")[0]} L ${pts} L ${w},${h} L 0,${h} Z`} fill="url(#eg)"/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" style={{ strokeDasharray: 1000, animation: "dr 2s ease forwards" }}/>
    </svg>
  );
};

const Radial = ({ val, max = 100, label, color = C.accent }) => {
  const r = 28, cx = 36, cy = 36, circ = 2 * Math.PI * r;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth="3"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="3" strokeDasharray={`${(val / max) * circ} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`}/>
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fill={color} fontFamily="JetBrains Mono" fontSize="13">{val}</text>
      </svg>
      <span style={{ fontSize: 10, color: C.textDim, letterSpacing: ".08em", textTransform: "uppercase" }}>{label}</span>
    </div>
  );
};

const BgSVG = () => (
  <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="rg1" cx="65%" cy="20%" r="65%"><stop offset="0%" stopColor="#29a8ff" stopOpacity=".13"/><stop offset="100%" stopColor="#080a0f" stopOpacity="0"/></radialGradient>
      <radialGradient id="rg2" cx="10%" cy="60%" r="45%"><stop offset="0%" stopColor="#29a8ff" stopOpacity=".07"/><stop offset="100%" stopColor="#080a0f" stopOpacity="0"/></radialGradient>
      <filter id="gw"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="1200" height="700" fill="#060810"/>
    <rect width="1200" height="700" fill="url(#rg1)"/>
    <rect width="1200" height="700" fill="url(#rg2)"/>
    <g stroke="#29a8ff" strokeOpacity=".18" strokeWidth=".7" fill="none">
      <line x1="120" y1="80" x2="280" y2="140"/><line x1="280" y1="140" x2="420" y2="60"/><line x1="420" y1="60" x2="560" y2="120"/>
      <line x1="560" y1="120" x2="680" y2="40"/><line x1="680" y1="40" x2="820" y2="100"/><line x1="820" y1="100" x2="960" y2="30"/>
      <line x1="960" y1="30" x2="1100" y2="90"/><line x1="120" y1="80" x2="200" y2="220"/><line x1="280" y1="140" x2="360" y2="250"/>
      <line x1="420" y1="60" x2="480" y2="210"/><line x1="560" y1="120" x2="600" y2="270"/><line x1="680" y1="40" x2="720" y2="190"/>
      <line x1="820" y1="100" x2="860" y2="240"/><line x1="960" y1="30" x2="1000" y2="170"/><line x1="1100" y1="90" x2="1120" y2="220"/>
      <line x1="200" y1="220" x2="360" y2="250"/><line x1="360" y1="250" x2="480" y2="210"/><line x1="480" y1="210" x2="600" y2="270"/>
      <line x1="600" y1="270" x2="720" y2="190"/><line x1="720" y1="190" x2="860" y2="240"/><line x1="860" y1="240" x2="1000" y2="170"/>
      <line x1="1000" y1="170" x2="1120" y2="220"/><line x1="120" y1="80" x2="360" y2="250"/><line x1="280" y1="140" x2="480" y2="210"/>
      <line x1="50" y1="160" x2="120" y2="80"/><line x1="50" y1="160" x2="200" y2="220"/>
    </g>
    <g stroke="#29a8ff" strokeOpacity=".45" strokeWidth=".9" fill="none">
      <line x1="420" y1="60" x2="680" y2="40"/><line x1="560" y1="120" x2="820" y2="100"/><line x1="480" y1="210" x2="720" y2="190"/>
    </g>
    <g fill="#29a8ff">
      <circle cx="120" cy="80" r="2.5" opacity=".7"/><circle cx="280" cy="140" r="2" opacity=".6"/>
      <circle cx="420" cy="60" r="3" opacity=".85"/><circle cx="560" cy="120" r="2" opacity=".6"/>
      <circle cx="680" cy="40" r="3.5" opacity=".9" filter="url(#gw)"/><circle cx="820" cy="100" r="2" opacity=".6"/>
      <circle cx="960" cy="30" r="2.5" opacity=".7"/><circle cx="1100" cy="90" r="2" opacity=".5"/>
      <circle cx="200" cy="220" r="2" opacity=".5"/><circle cx="360" cy="250" r="2.5" opacity=".55"/>
      <circle cx="480" cy="210" r="2" opacity=".5"/><circle cx="600" cy="270" r="2" opacity=".5"/>
      <circle cx="720" cy="190" r="2.5" opacity=".55"/><circle cx="860" cy="240" r="2" opacity=".5"/>
      <circle cx="50" cy="160" r="1.5" opacity=".4"/>
    </g>
    <g fill="#29a8ff" filter="url(#gw)">
      <circle cx="420" cy="60" r="4" opacity=".3"/><circle cx="680" cy="40" r="5" opacity=".3"/><circle cx="960" cy="30" r="3" opacity=".35"/>
    </g>
  </svg>
);

// ── API Client ────────────────────────────────────────────────────────────────
const API_BASE = "https://fortitude-backend-production-4ca8.up.railway.app/api/v1";

const api = {
  async post(path, body, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST", headers, credentials: "include",
      body: JSON.stringify(body),
    });
    return res.json();
  },
  async get(path, token = null) {
    const headers = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, { headers, credentials: "include" });
    return res.json();
  },
};

// Map backend tier IDs to frontend tier IDs
const mapTier = (backendTier) => {
  const map = { free: "free", core_45: "45", pro_65: "65", elite_95: "95", lifetime: "lifetime" };
  return map[backendTier] || "free";
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [mode, setMode] = useState("login"); // login | register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !pass) { setError("Please enter your email and password."); return; }
    setError(""); setLoading(true);
    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const data = await api.post(path, { email, password: pass });
      if (data.success) {
        const token = data.data.accessToken;
        const user  = data.data.user;
        localStorage.setItem("fis_token", token);
        localStorage.setItem("fis_user", JSON.stringify(user));
        onLogin({ token, user });
      } else {
        setError(data.error?.message || "Something went wrong. Please try again.");
      }
    } catch (e) {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <BgSVG/>
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,8,16,.78)" }}/>
      <div className="fi" style={{ position: "relative", zIndex: 1, width: 380, padding: 40, background: "rgba(13,16,24,.93)", border: `1px solid ${C.border}`, borderRadius: 10, backdropFilter: "blur(16px)", boxShadow: "0 0 60px rgba(41,168,255,.07)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div className="df" style={{ fontSize: 34, fontWeight: 300, letterSpacing: ".06em", background: `linear-gradient(90deg,${C.accent} 55%,${C.pink})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FORTITUDE</div>
          <div style={{ fontSize: 10, color: C.textDim, letterSpacing: ".16em", textTransform: "uppercase", marginTop: 6 }}>Market Intelligence Platform</div>
        </div>
        {error && (
          <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(233,30,167,.08)", border: `1px solid ${C.pink}`, borderRadius: 6, fontSize: 12, color: C.pink }}>
            {error}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <input className="inp" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}/>
          <input className="inp" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}/>
        </div>
        <button className="btn bp" style={{ width: "100%", padding: 12, opacity: loading ? .6 : 1 }} onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Access Platform" : "Create Account"}
        </button>
        <div style={{ textAlign: "center", marginTop: 14, display: "flex", justifyContent: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: C.textDim, cursor: "pointer" }}>Forgot password?</span>
          <span style={{ fontSize: 12, color: C.accent, cursor: "pointer" }} onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Create Account" : "Back to Login"}
          </span>
        </div>
        <div style={{ marginTop: 22, padding: 12, background: C.surfaceAlt, borderRadius: 6, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.textDim, textAlign: "center", lineHeight: 1.7 }}>Fortitude is an educational platform. Content does not constitute financial advice.</p>
        </div>
      </div>
    </div>
  );
};

// ── TradingView News Widget ───────────────────────────────────────────────────
const TVNewsWidget = () => {
  const container = useRef();
  useEffect(() => {
    if (!container.current) return;
    // Remove any existing script to prevent duplicates on re-render
    const existing = container.current.querySelector('script');
    if (existing) existing.remove();

    const widgetDiv = container.current.querySelector('.tradingview-widget-container__widget');
    if (widgetDiv) widgetDiv.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
    script.type = "text/javascript";
    script.async = true;
    // Must use textContent not innerHTML for script config
    script.textContent = JSON.stringify({
      displayMode: "adaptive",
      feedMode: "all_symbols",
      colorTheme: "dark",
      isTransparent: true,
      locale: "en",
      width: "100%",
      height: 450,
    });
    container.current.appendChild(script);
  }, []);

  return (
    <div style={{ marginTop:14 }}>
      <div className="sl" style={{ marginBottom:10 }}>Market News Feed</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <div className="tradingview-widget-container" ref={container} style={{ width:"100%",minHeight:450 }}>
          <div className="tradingview-widget-container__widget" style={{ width:"100%",height:"100%" }}/>
        </div>
        <div style={{ padding:"6px 16px",borderTop:`1px solid ${C.border}` }}>
          <a href="https://www.tradingview.com/news/top-providers/tradingview/" rel="noopener nofollow" target="_blank" style={{ fontSize:11,color:C.accent,textDecoration:"none" }}>Top stories</a>
          <span style={{ fontSize:11,color:C.textDim }}> by TradingView</span>
        </div>
      </div>
    </div>
  );
};

// ── Trading Sessions World Map ────────────────────────────────────────────────
const TradingSessionsMap = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Session times in UTC
  const SESSIONS = [
    { id:"asia",   label:"Asia",     city:"Tokyo",    tzOffset:9,  open:0,  close:9,  color:C.pink,   x:72, y:36, cx:75, cy:34 },
    { id:"london", label:"London",   city:"London",   tzOffset:0,  open:8,  close:17, color:C.accent, x:43, y:26, cx:46, cy:27 },
    { id:"ny",     label:"New York", city:"New York", tzOffset:-5, open:13, close:22, color:C.gold,   x:19, y:32, cx:22, cy:33 },
  ];

  // Get UTC decimal hour (e.g. 14.5 = 14:30 UTC)
  const utcH = now.getUTCHours() + now.getUTCMinutes() / 60;

  const getSessionState = (s) => {
    const localH = ((utcH + s.tzOffset) % 24 + 24) % 24;
    const isOpen = localH >= s.open && localH < s.close;
    const minsToOpen = isOpen ? 0 : (((s.open - localH) * 60 + 1440) % 1440);
    const minsToClose = isOpen ? ((s.close - localH) * 60 + 1440) % 1440 : 0;
    const pct = isOpen ? Math.round(((localH - s.open) / (s.close - s.open)) * 100) : 0;
    // Local time at session city
    const cityH = Math.floor(((utcH + s.tzOffset) % 24 + 24) % 24);
    const cityM = now.getUTCMinutes();
    const cityTime = `${String(cityH).padStart(2,'0')}:${String(cityM).padStart(2,'0')}`;
    return { isOpen, minsToOpen, minsToClose, pct, cityTime };
  };

  const fmt = (mins) => {
    const h = Math.floor(mins / 60);
    const m = Math.round(mins % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  // User local time
  const localTime = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  const utcTime = `${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')} UTC`;

  // Simplified world map path data (equirectangular projection, viewBox 0 0 100 55)
  const LANDMASS = "M3,18 L5,16 L8,15 L10,13 L13,14 L14,16 L12,18 L10,19 L8,20 Z M14,22 L16,20 L20,19 L22,21 L25,20 L27,22 L26,25 L23,27 L20,26 L17,25 Z M28,20 L30,18 L34,17 L38,18 L40,20 L42,19 L45,20 L46,22 L44,24 L40,25 L36,24 L32,23 L29,22 Z M43,25 L45,24 L48,25 L50,27 L49,30 L46,31 L43,29 Z M46,14 L48,12 L52,11 L56,12 L58,14 L60,13 L64,14 L66,16 L64,18 L60,19 L56,18 L52,17 L48,16 Z M56,20 L58,18 L62,19 L64,21 L66,23 L64,25 L60,24 L57,22 Z M62,26 L64,24 L68,25 L70,27 L68,30 L64,29 Z M70,15 L72,13 L76,12 L80,13 L82,15 L84,14 L88,15 L90,17 L88,20 L84,21 L80,20 L75,19 L71,17 Z M84,22 L86,20 L90,21 L92,23 L90,26 L86,25 Z M88,28 L90,26 L94,27 L96,29 L94,32 L90,31 Z M72,30 L74,28 L78,29 L80,31 L78,34 L74,33 Z M36,30 L38,28 L42,29 L44,32 L42,35 L38,34 Z M38,36 L40,34 L44,35 L46,38 L44,41 L40,40 Z M18,35 L20,33 L24,34 L26,37 L28,36 L32,37 L34,40 L32,43 L28,42 L24,41 L20,40 Z";

  return (
    <div className="mc" style={{ padding:"14px 18px",marginBottom:14 }}>
      {/* Header row */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <div className="sl" style={{ marginBottom:0 }}>Trading Sessions</div>
        <div style={{ display:"flex",gap:16,alignItems:"center" }}>
          <span className="mn" style={{ fontSize:11,color:C.accent }}>{localTime}</span>
          <span style={{ fontSize:10,color:C.textDim }}>{utcTime}</span>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"start" }}>
        {/* SVG World Map */}
        <div style={{ position:"relative" }}>
          <svg viewBox="0 0 100 55" style={{ width:"100%",height:"auto",display:"block" }}>
            {/* Ocean */}
            <rect x="0" y="0" width="100" height="55" fill="rgba(6,8,16,0)" />
            {/* Grid lines */}
            {[20,40,60,80].map(x => <line key={x} x1={x} y1="0" x2={x} y2="55" stroke={C.border} strokeWidth="0.2" strokeDasharray="1,2"/>)}
            {[15,30,45].map(y => <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={C.border} strokeWidth="0.2" strokeDasharray="1,2"/>)}
            {/* Landmass */}
            <path d={LANDMASS} fill={C.surfaceAlt} stroke={C.border} strokeWidth="0.4"/>
            {/* Session region highlight arcs */}
            {SESSIONS.map(s => {
              const st = getSessionState(s);
              return (
                <ellipse key={s.id} cx={s.cx} cy={s.cy} rx="9" ry="6"
                  fill={st.isOpen ? s.color : "transparent"}
                  stroke={s.color}
                  strokeWidth={st.isOpen ? "0.6" : "0.3"}
                  opacity={st.isOpen ? 0.15 : 0.25}
                />
              );
            })}
            {/* Session dots + labels */}
            {SESSIONS.map(s => {
              const st = getSessionState(s);
              return (
                <g key={s.id}>
                  {/* Pulse ring when open */}
                  {st.isOpen && (
                    <circle cx={s.x} cy={s.y} r="3.5" fill="none" stroke={s.color} strokeWidth="0.5" opacity="0.4"
                      style={{ animation:"pu 2s infinite" }}/>
                  )}
                  <circle cx={s.x} cy={s.y} r="1.8"
                    fill={st.isOpen ? s.color : C.surfaceAlt}
                    stroke={s.color}
                    strokeWidth="0.6"
                    style={{ filter: st.isOpen ? `drop-shadow(0 0 2px ${s.color})` : "none" }}
                  />
                  <text x={s.x} y={s.y - 2.8} textAnchor="middle" fontSize="2.2"
                    fill={st.isOpen ? s.color : C.textDim}
                    fontFamily="Inter,sans-serif" fontWeight="600"
                    letterSpacing="0.05">
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Session status cards */}
        <div style={{ display:"flex",flexDirection:"column",gap:6,minWidth:180 }}>
          {SESSIONS.map(s => {
            const st = getSessionState(s);
            return (
              <div key={s.id} style={{ padding:"8px 12px",borderRadius:5,border:`1px solid ${st.isOpen ? s.color+"50" : C.border}`,background:st.isOpen ? `${s.color}08` : "transparent",transition:"all .3s" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                    <span className="pu" style={{ width:5,height:5,borderRadius:"50%",background:st.isOpen?s.color:C.textDim,display:"inline-block",animation:st.isOpen?"pu 2s infinite":"none" }}/>
                    <span style={{ fontSize:12,fontWeight:600,color:st.isOpen?s.color:C.textMuted }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize:10,color:st.isOpen?s.color:C.textDim,fontWeight:600,letterSpacing:".06em",textTransform:"uppercase" }}>{st.isOpen?"Open":"Closed"}</span>
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span className="mn" style={{ fontSize:10,color:C.textDim }}>{s.city} {st.cityTime}</span>
                  <span style={{ fontSize:10,color:C.textDim }}>
                    {st.isOpen
                      ? <span style={{ color:s.color }}>Closes {fmt(st.minsToClose)}</span>
                      : `Opens ${fmt(st.minsToOpen)}`}
                  </span>
                </div>
                {st.isOpen && (
                  <div style={{ marginTop:5 }}>
                    <div style={{ height:2,borderRadius:1,background:C.border,overflow:"hidden" }}>
                      <div style={{ width:`${st.pct}%`,height:"100%",background:s.color,borderRadius:1,transition:"width 1s linear" }}/>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ setPage }) => {
  const eq = [100,98,102,107,105,110,108,115,112,118,116,122,120,125,128,124,130,135,132,138];
  // Live scores from engine
  const revenge    = computeRevengeScore(TRADE_DATA);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability([100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130]);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const pdiMeta    = pdiLabel(pdi);
  return (
    <div className="fi">
      <div style={{ marginBottom: 20 }}>
        <h1 className="df" style={{ fontSize: 28, fontWeight: 300, marginBottom: 6 }}>Market Intelligence Dashboard</h1>
        <p style={{ color: C.textMuted, fontSize: 13 }}>Structured analysis. Probabilistic framing. Institutional methodology.</p>
      </div>

      <TradingSessionsMap/>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:14 }}>
        {[{l:"Analyses Completed",v:"47",s:"This month",c:C.accent},{l:"Current Tier",v:"FMF Owner",s:"Full access",c:C.accent},{l:"Course Progress",v:"68%",s:"FMF Course",c:C.gold},{l:"Community Posts",v:"12",s:"Contributions",c:C.textMuted}].map(m=>(
          <div key={m.l} className="mc">
            <div className="sl">{m.l}</div>
            <div className="df" style={{ fontSize:26,color:m.c,fontWeight:400,lineHeight:1.1 }}>{m.v}</div>
            <div style={{ fontSize:11,color:C.textDim,marginTop:4 }}>{m.s}</div>
          </div>
        ))}
      </div>
      {/* PDI summary banner */}
      <div className="mc" style={{ marginBottom:14,display:"flex",alignItems:"center",gap:18,padding:"14px 20px",borderColor:pdiMeta.color,background:`linear-gradient(90deg,rgba(13,16,24,.92),${pdiMeta.color}08)`,cursor:"pointer" }} onClick={()=>setPage("behavioral")}>
        <div style={{ textAlign:"center",flexShrink:0 }}>
          <svg width="54" height="54" viewBox="0 0 54 54">
            <circle cx="27" cy="27" r="22" fill="none" stroke={C.border} strokeWidth="3"/>
            <circle cx="27" cy="27" r="22" fill="none" stroke={pdiMeta.color} strokeWidth="3"
              strokeDasharray={`${(pdi/100)*2*Math.PI*22} ${2*Math.PI*22}`}
              strokeLinecap="round" transform="rotate(-90 27 27)"
              style={{ filter:`drop-shadow(0 0 6px ${pdiMeta.color}70)` }}/>
            <text x="27" y="32" textAnchor="middle" fill={pdiMeta.color} fontFamily="JetBrains Mono" fontSize="13">{pdi}</text>
          </svg>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4 }}>Performance Discipline Index</div>
          <div style={{ fontSize:14,color:pdiMeta.color,fontWeight:500,marginBottom:4 }}>{pdiMeta.label}</div>
          <div style={{ display:"flex",gap:14 }}>
            {[{l:"Risk",v:riskCons.score,c:riskConsLabel(riskCons.score).color},{l:"Revenge",v:revenge.score,c:revengeLabel(revenge.score).color},{l:"Overtrade",v:overtrading.score,c:overtradingLabel(overtrading.score).color},{l:"Equity",v:equity.score,c:equityLabel(equity.score).color}].map(s=>(
              <div key={s.l} style={{ fontSize:11,color:C.textDim }}>{s.l} <span className="mn" style={{ color:s.c }}>{s.v}</span></div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6,flexShrink:0 }}>
          {revenge.flags.sizeEscalation>0&&<span className="tg td">Size Flag</span>}
          {revenge.flags.rapidReentry>0&&<span className="tg td">Re-entry Flag</span>}
          <span style={{ fontSize:18,color:C.textDim,marginLeft:8 }}>›</span>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14 }}>
        <div className="mc">
          <div className="sl">Recent Analyses</div>
          {[{a:"EURUSD",tf:"H4",d:"22 Feb",t:"Bearish",tc:"td"},{a:"BTCUSD",tf:"D1",d:"21 Feb",t:"Transitional",tc:"tg2"},{a:"US500",tf:"H1",d:"20 Feb",t:"Bullish",tc:"ta"},{a:"XAUUSD",tf:"H4",d:"19 Feb",t:"Range-bound",tc:"tg2"}].map((r,i)=>(
            <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <span className="mn" style={{ color:C.accent,fontSize:13,width:64 }}>{r.a}</span>
                <span className="tg ta">{r.tf}</span>
              </div>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <span className={`tg ${r.tc}`}>{r.t}</span>
                <span style={{ fontSize:11,color:C.textDim }}>{r.d}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mc">
          <div className="sl">Platform Activity</div>
          <EqChart data={eq}/>
          <div style={{ display:"flex",justifyContent:"space-between",marginTop:10 }}>
            <span style={{ fontSize:11,color:C.textDim }}>Analyses over 20 days</span>
            <span style={{ fontSize:11,color:C.accent }}>+38% activity</span>
          </div>
        </div>
      </div>
      <div className="mc" style={{ borderLeft:`3px solid ${C.accent}` }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12 }}>
          <div>
            <div className="sl">Latest Market Update</div>
            <div className="df" style={{ fontSize:18,color:C.text,fontWeight:400 }}>DXY Compression Phase — Structural Context</div>
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <span className="tg ta">Admin</span>
            <span style={{ fontSize:11,color:C.textDim,lineHeight:2.2 }}>23 Feb 2026</span>
          </div>
        </div>
        <p style={{ color:C.textMuted,lineHeight:1.8,fontSize:13 }}>DXY continues to exhibit compression between 103.40 and 104.20. Structural bias remains indeterminate until a confirmed break with sufficient momentum. Watch for liquidity sweep below 103.40 as a potential institutional positioning mechanism.</p>
      </div>

      <TVNewsWidget/>
    </div>
  );
};

const Intelligence = () => {
  const [step, setStep] = useState("upload");
  const [asset, setAsset] = useState("forex");
  const [tf, setTf] = useState("H4");
  const [thesis, setThesis] = useState("");
  const [img, setImg] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const run = () => { if(!img) return; setAnalyzing(true); setTimeout(()=>{setAnalyzing(false);setStep("result");},2200); };
  if(step==="result") return (
    <div className="fi">
      <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
        <button className="btn bg" style={{ padding:"7px 14px" }} onClick={()=>setStep("upload")}>← New Analysis</button>
        <div style={{ marginLeft:"auto",display:"flex",gap:8 }}>
          <span className="tg ta">{asset.toUpperCase()}</span><span className="tg tb">{tf}</span>
        </div>
      </div>
      {img&&<div style={{ marginBottom:20,borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,maxHeight:200 }}><img src={img} alt="chart" style={{ width:"100%",maxHeight:200,objectFit:"cover",display:"block",opacity:.85 }}/></div>}
      <div className="df" style={{ fontSize:22,fontWeight:300,marginBottom:4 }}>Fortitude Market Framework Analysis</div>
      <p style={{ color:C.textDim,fontSize:12,marginBottom:20 }}>Generated {new Date().toLocaleString()} — Educational interpretation only</p>
      <hr className="dv"/>
      {[{t:"Market Structure Assessment",c:C.accent,b:"Current structural bias presents as transitional. Price action has demonstrated a sequence of lower highs since the most recent swing high, however a prior higher low remains intact on the selected timeframe. This creates structural ambiguity that should not be resolved through assumption. A confirmed break above the most recent lower high would shift bias toward bullish continuation."},{t:"Liquidity & Order Flow Context",c:C.accent,b:"Equal lows are present at the base of the most recent consolidation range, representing a probable stop cluster for long positions initiated at that level. Inducement behavior is visible on the immediate left side of current price — a shallow push designed to trigger premature directional entries."},{t:"Risk Architecture Consideration",c:C.gold,b:"Logical invalidation resides below the most recent structural low. Volatility context is compressive — expansion has not been confirmed. This environment does not favor directional commitment. Asymmetric risk definition is possible only if structure confirms at the referenced invalidation boundary."},{t:"Scenario Mapping",c:C.accent,b:"Primary Scenario: Structural continuation requires a break above the most recent lower high with closing price confirmation.\n\nSecondary Scenario: Failure case involves continuation below the equal lows. Should that occur, the structural framework shifts to bearish continuation."},{t:"Behavioral Discipline Reminder",c:C.textMuted,b:"Markets operate within probabilistic frameworks, not deterministic outcomes. The disciplined practitioner identifies structural conditions, defines risk parameters, and executes only when probability and asymmetry align."}].map((s,i)=>(
        <div key={i} style={{ marginBottom:22 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
            <span style={{ width:3,height:18,background:s.c,borderRadius:2,display:"inline-block" }}/>
            <span style={{ fontSize:10,fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",color:s.c }}>{i+1}. {s.t}</span>
          </div>
          {s.b.split("\n\n").map((p,j)=><p key={j} style={{ color:C.textMuted,lineHeight:1.85,fontSize:13,paddingLeft:13,marginBottom:8 }}>{p}</p>)}
        </div>
      ))}
      <div style={{ background:C.surfaceAlt,border:`1px solid ${C.border}`,borderRadius:6,padding:16 }}>
        <div style={{ display:"flex",gap:10 }}><IC n="alert" s={13} c={C.textDim}/><p style={{ color:C.textDim,fontSize:12,lineHeight:1.7 }}>This analysis is educational in nature and reflects structural interpretation, not financial advice. Markets are probabilistic. Risk management remains the user's responsibility.</p></div>
      </div>
    </div>
  );
  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Market Intelligence</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Upload a chart for institutional-grade structural analysis using the Fortitude Market Framework.</p>
      </div>
      <div className="mc" style={{ marginBottom:18,display:"flex",alignItems:"center",gap:16,padding:"12px 16px" }}>
        <IC n="shield" s={14} c={C.accent}/>
        <span style={{ fontSize:12,color:C.textMuted }}>Analysis quota:</span>
        <div style={{ flex:1,maxWidth:200 }}><div className="pb"><div className="pf" style={{ width:"40%" }}/></div></div>
        <span className="mn" style={{ fontSize:12,color:C.accent }}>2 / 5 today</span>
        <span className="tg ta" style={{ marginLeft:"auto" }}>FMF Owner</span>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
        <div>
          <div className="sl">Chart Upload</div>
          <div onClick={()=>document.getElementById("fi").click()} style={{ border:`1px dashed ${C.borderHover}`,borderRadius:8,background:"rgba(17,21,32,.7)",backdropFilter:"blur(6px)",cursor:"pointer",transition:"all .2s",padding:img?0:48,textAlign:"center" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.accent} onMouseLeave={e=>e.currentTarget.style.borderColor=C.borderHover}>
            <input id="fi" type="file" accept="image/*" style={{ display:"none" }} onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setImg(ev.target.result);r.readAsDataURL(f);}}}/>
            {img?(<div style={{ position:"relative" }}><img src={img} alt="chart" style={{ width:"100%",borderRadius:8,display:"block",maxHeight:260,objectFit:"cover" }}/><button className="btn bg" style={{ position:"absolute",top:8,right:8,padding:"4px 10px",fontSize:11 }} onClick={e=>{e.stopPropagation();setImg(null);}}>Remove</button></div>):(<><IC n="upload" s={22} c={C.textDim}/><div style={{ marginTop:10,color:C.textMuted,fontSize:13 }}>Drop chart image here</div><div style={{ marginTop:4,color:C.textDim,fontSize:11 }}>PNG · JPG · JPEG</div></>)}
          </div>
        </div>
        <div>
          <div className="sl">Analysis Parameters</div>
          <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
            {[["Asset Class",<select className="inp" value={asset} onChange={e=>setAsset(e.target.value)}>{["forex","crypto","indices","commodities","equities"].map(o=><option key={o} value={o}>{o.charAt(0).toUpperCase()+o.slice(1)}</option>)}</select>],["Timeframe",<select className="inp" value={tf} onChange={e=>setTf(e.target.value)}>{["M1","M5","M15","M30","H1","H4","D1","W1","MN"].map(o=><option key={o}>{o}</option>)}</select>],["Optional Thesis",<textarea className="inp" value={thesis} onChange={e=>setThesis(e.target.value)} placeholder="Describe your structural observation..." style={{ resize:"vertical",minHeight:80 }}/>]].map(([label,el])=>(
              <div key={label}><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>{label}</label>{el}</div>
            ))}
            <button className="btn bp" onClick={run} disabled={!img||analyzing} style={{ opacity:!img?.5:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8 }}>
              {analyzing?<><span className="pu" style={{ width:7,height:7,borderRadius:"50%",background:C.bg,display:"inline-block" }}/>Analysing...</>:<><IC n="intel" s={14} c={C.bg}/>Run FMF Analysis</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Journal = ({ setPage }) => {
  const eq=[100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130];
  const biasFlags   = computeBiasFlags(TRADE_DATA);
  const fatigue     = computeFatigueIndex(TRADE_DATA);
  const riskCons    = computeRiskConsistency(TRADE_DATA);
  const revenge     = computeRevengeScore(TRADE_DATA);
  const overtrading = computeOvertradingScore(TRADE_DATA);
  const equity      = computeEquityStability(eq);
  const pdi         = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Performance Journal</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Institutional analytics. Behavioral diagnostics. Risk evaluation.</p>
      </div>
      <div className="mc" style={{ marginBottom:14,display:"flex",alignItems:"center",gap:16,padding:"14px 20px",borderColor:C.accentDim }}>
        <IC n="journal" s={18} c={C.accent}/>
        <div><div style={{ color:C.text,fontSize:13,fontWeight:500,marginBottom:2 }}>Import Trade Data</div><div style={{ color:C.textMuted,fontSize:12 }}>MT4/MT5 CSV, broker export, or manual entry supported</div></div>
        <div style={{ marginLeft:"auto",display:"flex",gap:8 }}><button className="btn bg">Upload CSV</button><button className="btn bp">Add Trade</button></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:14 }}>
        {[{l:"Net P/L",v:"+$4,820",c:C.accent},{l:"Win Rate",v:"57.3%",c:C.accent},{l:"Profit Factor",v:"1.84",c:C.accent},{l:"Expectancy",v:"+0.31R",c:C.accent},{l:"Max Drawdown",v:"−6.2%",c:C.pink}].map(m=>(
          <div key={m.l} className="mc" style={{ textAlign:"center" }}>
            <div className="sl" style={{ textAlign:"center" }}>{m.l}</div>
            <div className="df" style={{ fontSize:22,color:m.c,fontWeight:400 }}>{m.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14,marginBottom:14 }}>
        <div className="mc">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
            <div className="sl" style={{ margin:0 }}>Equity Curve</div>
            <div style={{ display:"flex",gap:6 }}>{["Balance","R-Growth"].map((t,i)=><span key={t} className="tg ta" style={{ cursor:"pointer",opacity:i===0?1:.5 }}>{t}</span>)}</div>
          </div>
          <EqChart data={eq} h={80}/>
          <div style={{ display:"flex",justifyContent:"space-between",marginTop:10 }}>
            <span style={{ fontSize:11,color:C.textDim }}>21 trades tracked</span>
            <span style={{ fontSize:11,color:C.accent }}>+30% growth</span>
          </div>
        </div>
        <div className="mc">
          <div className="sl">Risk Profile</div>
          <div style={{ display:"flex",justifyContent:"space-around" }}>
            <Radial val={72} label="Consistency"/>
            <Radial val={61} label="Discipline" color={C.pink}/>
            <Radial val={84} label="Adherence" color={C.gold}/>
          </div>
        </div>
      </div>
      <div className="mc" style={{ marginBottom:14,borderLeft:`3px solid ${C.accent}` }}>
        <div className="sl">AI Behavioral Analysis</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {[{t:"Risk Consistency",b:"Position sizing shows moderate variance across 21 recorded trades. Standard deviation in risk percentage is 0.34R above target. Compression of sizing during drawdown phases observed — consistent with defensive behavioral response."},{t:"Behavioral Observations",b:"No revenge cluster behavior detected. Late-session performance after 18:00 UTC shows a 12% degradation in R-expectancy. Reducing activity in this window would statistically improve overall performance metrics."}].map(s=>(
            <div key={s.t}><div style={{ fontSize:12,fontWeight:500,color:C.text,marginBottom:8 }}>{s.t}</div><p style={{ color:C.textMuted,fontSize:12,lineHeight:1.8 }}>{s.b}</p></div>
          ))}
        </div>
      </div>
      <div className="sl">Trade Log</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <table><thead><tr><th>Instrument</th><th>Type</th><th>Entry</th><th>Exit</th><th>R</th><th>Net P/L</th><th>Duration</th></tr></thead>
          <tbody>{[{i:"EURUSD",t:"Long",en:"1.08240",ex:"1.08840",r:"+2.1",pl:"+$420",d:"4h 22m"},{i:"XAUUSD",t:"Short",en:"2031.50",ex:"2018.20",r:"+1.8",pl:"+$665",d:"6h 10m"},{i:"NAS100",t:"Long",en:"17840",ex:"17760",r:"−0.8",pl:"−$160",d:"1h 05m"},{i:"BTCUSD",t:"Short",en:"52400",ex:"51100",r:"+2.6",pl:"+$1300",d:"11h 40m"}].map((r,i)=>(
            <tr key={i}><td><span className="mn" style={{ color:C.accent }}>{r.i}</span></td><td><span className={`tg ${r.t==="Long"?"ta":"td"}`}>{r.t}</span></td><td className="mn" style={{ fontSize:12 }}>{r.en}</td><td className="mn" style={{ fontSize:12 }}>{r.ex}</td><td><span className="mn" style={{ color:r.r.startsWith("+")? C.accent:C.pink }}>{r.r}R</span></td><td style={{ color:r.pl.startsWith("+")? C.accent:C.pink }}>{r.pl}</td><td style={{ color:C.textDim,fontSize:12 }}>{r.d}</td></tr>
          ))}</tbody>
        </table>
      </div>

      <CognitiveDashboard pdi={pdi} fatigue={fatigue} biasFlags={biasFlags} commitment={DEFAULT_COMMITMENT} trades={TRADE_DATA} sessions={INIT_SESSIONS} setPage={setPage}/>
    </div>
  );
};

const COACH_PROMPT = `You are the Fortitude Performance Coach. You are not a motivational speaker, therapist, or friend. You are a structured trading performance advisor.

Objective: improve consistency, discipline, emotional control, and structured decision-making.

Tone: professional, analytical, direct, calm authority. No hype. No emojis. No emotional exaggeration.

You do NOT: provide trade signals, financial advice, promise improvement, validate destructive behavior, or use motivational phrases.
You DO: ask structured questions, identify behavioral inconsistencies, reference performance data, highlight risk inconsistency, reinforce probabilistic thinking.

COACHING HIERARCHY (follow every session):
1. Emotional State Check
2. Behavioral Review
3. Risk Discipline Review
4. Structural Thinking Calibration
5. Action Adjustment

ADAPTIVE TONE PROTOCOL — adjust based on PDI:
- PDI ≥ 85: Analytical peer-level discussion. Refine execution nuance.
- PDI 70–84: Mild corrective questioning. Identify drift early.
- PDI 55–69: Direct structural correction. Clear recalibration needed.
- PDI < 55: Calm but firm intervention. Pre-exposure recalibration required.

LIVE SYSTEM DATA (reference naturally and precisely):
PDI: 74/100 — Minor Discipline Drift → use Mild Corrective tone
Risk Consistency: 72/100 | Revenge Score: 38/100 | Fatigue Index: 28/100 | Equity Stability: 81/100

ACTIVE COGNITIVE FLAGS:
- Recency Distortion: Detected. Outlier event followed by >40% risk shift within 3 trades.
- Loss Aversion: Monitor. Recent avg win contracting vs historical baseline.

BEHAVIORAL MEMORY:
- Short-term: Post-loss size escalation flagged twice in last 10 sessions.
- Mid-term: Recurring late-session degradation (−12% expectancy after 18:00 UTC) across 3 weeks.
- Long-term: Post-drawdown risk expansion pattern detected twice in 90-day window.

VOLATILITY CONTEXT:
- Current ATR expanded +44% above 30-day baseline. Position size unchanged. Silent risk inflation present.

PRE-COMMITMENT (if active): Max 4 trades, 1.0R per trade, stop on 2 consecutive losses.

STRUCTURAL RECOMMENDATIONS ACTIVE:
1. 30-min post-loss pause protocol
2. Fix sizing at 1R for next 10 trades
3. 60-min instrument cooldown post-loss
4. Restrict to London session (07:00–12:00 UTC) for 5 sessions

Response style: concise, short paragraphs. Challenge irrational thinking calmly. Never shame. Reference specific data points, not general observations.

If user expresses extreme distress: "I am here to help with trading performance. If you are experiencing significant emotional distress, it may be beneficial to seek professional support outside this platform."`;

const MODES = {
  "post-loss": { label: "Post-Loss Debrief", color: C.pink, icon: "alert", desc: "Review consecutive losses, drawdown response, and risk deviation." },
  "weekly":    { label: "Weekly Review",     color: C.accent, icon: "chart", desc: "Structured review of prior week expectancy, consistency, and behavioral patterns." },
  "free":      { label: "Free Reflection",   color: C.gold,  icon: "coach", desc: "Open session. Address any discipline break, hesitation, or behavioral concern." },
};
const OPENERS = {
  "post-loss": "You have logged multiple consecutive losses recently. Before we begin, I want to establish some structure. How are you approaching the next session — are you in an active trading period, or have you stepped back?",
  "weekly": "Weekly performance review initiated. Your data for the prior seven days shows an expectancy of +0.31R across 6 trades. Risk consistency scored 72 out of 100. Before I provide observations — what do you feel went well this week, and what felt inconsistent?",
  "free": "Session open. What would you like to address today? You can begin with a specific event, a pattern you have noticed, or a behavioral concern. Be as direct as you prefer.",
};
const INIT_SESSIONS = [
  { id: 1, mode: "post-loss", date: "21 Feb 2026", title: "Post-Loss Debrief", preview: "Three consecutive losses reviewed. Risk sizing consistent in two of three cases.", msgs: [
    { r:"a", t:"You logged three consecutive losses over the past 48 hours. Before we proceed, I want to understand the structural context of each trade. Were your invalidation levels defined before entry in all three cases?" },
    { r:"u", t:"Yes for the first two. The third I entered without a clear level — I was trying to recover." },
    { r:"a", t:"That is a notable distinction. The first two losses are structurally acceptable. The third trade represents a behavioral deviation. You recognised the absence of a clear level and entered anyway. What was the internal reasoning?" },
    { r:"u", t:"I felt like I needed to get the money back." },
    { r:"a", t:"That is the pattern we need to address. The impulse to recover losses through additional exposure is a risk amplification mechanism, not a recovery strategy. After two consecutive losses, your protocol should include a defined pause period before any further entries. Not as punishment — as structural protection." },
  ]},
  { id: 2, mode: "weekly", date: "17 Feb 2026", title: "Weekly Performance Review", preview: "W/C 10 Feb reviewed. Expectancy positive. Late-session flag noted.", msgs: [
    { r:"a", t:"Weekly review — week commencing 10 February. Your expectancy held at +0.29R across 8 trades. Risk sizing was consistent in 7 of 8 cases. One outlier: a position at 19:40 UTC with 1.4x standard risk. That is the second week this pattern has appeared. What is driving activity after 18:00?" },
  ]},
];

const BehavioralTimeline = () => {
  const events = [
    { date:"10 Feb", label:"Risk spike",       color:C.pink },
    { date:"12 Feb", label:"Discipline break", color:C.pink },
    { date:"14 Feb", label:"Stabilised",       color:C.accent },
    { date:"17 Feb", label:"Weekly review",    color:C.gold },
    { date:"19 Feb", label:"Consistent",       color:C.accent },
    { date:"21 Feb", label:"Post-loss debrief",color:C.pink },
    { date:"23 Feb", label:"Stable",           color:C.accent },
  ];
  return (
    <div style={{ position:"relative",padding:"18px 0 6px" }}>
      <div style={{ position:"absolute",top:32,left:"7%",right:"7%",height:1,background:C.border }}/>
      <div style={{ display:"flex",justifyContent:"space-between" }}>
        {events.map((e,i)=>(
          <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:7,flex:1 }}>
            <div style={{ fontSize:9,color:C.textDim,letterSpacing:".05em",whiteSpace:"nowrap" }}>{e.date}</div>
            <div style={{ width:10,height:10,borderRadius:"50%",background:e.color,boxShadow:`0 0 8px ${e.color}70`,border:`2px solid ${e.color}`,zIndex:1 }}/>
            <div style={{ fontSize:9,color:e.color,textAlign:"center",lineHeight:1.3 }}>{e.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Coach = () => {
  const [view, setView] = useState("home");
  const [mode, setMode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState(INIT_SESSIONS);
  const [readOnly, setReadOnly] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);

  const startSession = m => { setMode(m); setReadOnly(false); setMessages([{r:"a",t:OPENERS[m]}]); setView("session"); };
  const openSaved = s => { setMode(s.mode); setMessages(s.msgs); setReadOnly(true); setView("session"); };
  const endSession = () => {
    if(!readOnly&&messages.length>1) setSessions(p=>[{id:Date.now(),mode,date:new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"}),title:MODES[mode]?.label,preview:messages[1]?.t?.slice(0,85)+"...",msgs:[...messages]},...p]);
    setView("home"); setMessages([]); setMode(null); setReadOnly(false);
  };

  const send = async () => {
    if(!input.trim()||loading) return;
    const um={r:"u",t:input.trim()};
    const next=[...messages,um];
    setMessages(next); setInput(""); setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:COACH_PROMPT,messages:next.map(m=>({role:m.r==="a"?"assistant":"user",content:m.t}))})});
      const data = await res.json();
      const reply = data.content?.find(b=>b.type==="text")?.text||"Session processing error. Please retry.";
      setMessages(p=>[...p,{r:"a",t:reply}]);
    } catch { setMessages(p=>[...p,{r:"a",t:"Connection error. Please check your network and try again."}]); }
    setLoading(false);
  };

  if(view==="session") {
    const mc=MODES[mode]||MODES.free;
    return (
      <div className="fi" style={{ display:"flex",flexDirection:"column",height:"calc(100vh - 80px)" }}>
        <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:18,flexShrink:0 }}>
          <button className="btn bg" style={{ padding:"7px 14px" }} onClick={endSession}>← End Session</button>
          <div style={{ width:1,height:18,background:C.border }}/>
          <span className="pu" style={{ width:7,height:7,borderRadius:"50%",background:mc.color,display:"inline-block" }}/>
          <span style={{ fontSize:12,color:C.textMuted }}>{mc.label}</span>
          {readOnly&&<span style={{ fontSize:11,color:C.textDim }}>— read only</span>}
          <span style={{ marginLeft:"auto",fontSize:11,color:C.textDim }}>{messages.length} exchanges</span>
        </div>
        <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingBottom:8 }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",alignItems:"flex-start",gap:10 }}>
              {m.r==="a"&&<div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><IC n="coach" s={13} c={C.accent}/></div>}
              <div style={{ maxWidth:"72%",background:m.r==="a"?"rgba(13,16,24,.92)":C.accentGlow,border:`1px solid ${m.r==="a"?C.border:"rgba(41,168,255,.25)"}`,borderRadius:m.r==="a"?"2px 12px 12px 12px":"12px 2px 12px 12px",padding:"13px 16px",backdropFilter:"blur(8px)" }}>
                {m.r==="a"&&<div style={{ fontSize:9,color:C.accentDim,letterSpacing:".1em",textTransform:"uppercase",marginBottom:7,fontWeight:600 }}>Performance Coach</div>}
                <p style={{ fontSize:13,color:m.r==="a"?C.text:C.accent,lineHeight:1.8,whiteSpace:"pre-wrap" }}>{m.t}</p>
              </div>
              {m.r==="u"&&<div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}><span className="df" style={{ fontSize:12,color:C.accent }}>J</span></div>}
            </div>
          ))}
          {loading&&(
            <div style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center" }}><IC n="coach" s={13} c={C.accent}/></div>
              <div style={{ background:"rgba(13,16,24,.92)",border:`1px solid ${C.border}`,borderRadius:"2px 12px 12px 12px",padding:"16px 20px",display:"flex",gap:5,alignItems:"center" }}>
                {[0,1,2].map(i=><div key={i} style={{ width:5,height:5,borderRadius:"50%",background:C.accentDim,animation:`pu 1.2s ease ${i*0.2}s infinite` }}/>)}
              </div>
            </div>
          )}
          <div ref={endRef}/>
        </div>
        {!readOnly&&(
          <div style={{ flexShrink:0,display:"flex",gap:10,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Respond to the coach... (Enter to send)" disabled={loading}
              style={{ flex:1,background:"rgba(17,21,32,.85)",border:`1px solid ${C.border}`,color:C.text,borderRadius:6,padding:"11px 14px",fontSize:13,fontFamily:"Inter,sans-serif",resize:"none",height:50,outline:"none",backdropFilter:"blur(4px)" }}
              onFocus={e=>e.target.style.borderColor=C.accent} onBlur={e=>e.target.style.borderColor=C.border}/>
            <button onClick={send} disabled={!input.trim()||loading} style={{ padding:"0 18px",background:input.trim()&&!loading?C.accent:C.border,border:"none",borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .2s",flexShrink:0 }}>
              <IC n="send" s={14} c={input.trim()&&!loading?C.bg:C.textDim}/>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df" style={{ fontSize:28,fontWeight:300 }}>Performance Coach</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Private · Structured · Analytical</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:560 }}>An interactive performance calibration system. Not motivation. Not therapy. Structured accountability for discipline, risk consistency, and behavioral correction.</p>
      </div>
      <div style={{ background:"rgba(233,30,167,.06)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14 }}>
        <span className="pu" style={{ width:6,height:6,borderRadius:"50%",background:C.pink,display:"inline-block",flexShrink:0 }}/>
        <div style={{ flex:1 }}><span style={{ fontSize:13,color:C.text }}>Journal detected 2 consecutive losses this week. </span><span style={{ fontSize:13,color:C.textMuted }}>A structured post-loss debrief may be appropriate.</span></div>
        <button className="btn bg" style={{ fontSize:11,borderColor:C.pinkDim,color:C.pink,flexShrink:0 }} onClick={()=>startSession("post-loss")}>Initiate Debrief</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:18,marginBottom:20 }}>
        <div>
          <div className="sl">Initiate Session</div>
          <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
            {Object.entries(MODES).map(([key,m])=>(
              <div key={key} onClick={()=>startSession(key)} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,padding:"15px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,backdropFilter:"blur(8px)",transition:"all .2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=m.color;e.currentTarget.style.boxShadow=`0 4px 24px ${m.color}18`;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.boxShadow="none";}}>
                <div style={{ width:32,height:32,borderRadius:"50%",background:`${m.color}18`,border:`1px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><IC n={m.icon} s={14} c={m.color}/></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:3 }}>{m.label}</div>
                  <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.5 }}>{m.desc}</div>
                </div>
                <span style={{ fontSize:18,color:C.textDim }}>›</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="sl">Behavioral Flags</div>
          <div className="mc" style={{ marginBottom:12 }}>
            {[{l:"Revenge cluster",s:"Clear",c:C.accent},{l:"Late-session (18:00+)",s:"Monitor",c:C.gold},{l:"Size consistency",s:"Moderate",c:C.gold},{l:"Post-loss frequency",s:"Elevated",c:C.pink}].map(f=>(
              <div key={f.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{f.l}</span>
                <span style={{ fontSize:11,color:f.c,fontWeight:500 }}>{f.s}</span>
              </div>
            ))}
          </div>
          <div className="mc">
            {[{l:"Expectancy",v:"+0.31R"},{l:"Risk consistency",v:"72 / 100"},{l:"Max drawdown",v:"−6.2%"}].map(m=>(
              <div key={m.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{m.l}</span>
                <span className="mn" style={{ fontSize:12,color:C.accent }}>{m.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginBottom:20 }}>
        <div className="sl">Behavioral Pattern Timeline</div>
        <div className="mc">
          <BehavioralTimeline/>
          <div style={{ display:"flex",gap:20,marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            {[{c:C.pink,l:"Discipline break / Risk spike"},{c:C.accent,l:"Stable / Recovery"},{c:C.gold,l:"Review session"}].map(l=>(
              <div key={l.l} style={{ display:"flex",alignItems:"center",gap:6 }}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:l.c }}/>
                <span style={{ fontSize:11,color:C.textDim }}>{l.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
          <div className="sl" style={{ margin:0 }}>Session History</div>
          <span style={{ fontSize:11,color:C.textDim }}>{sessions.length} sessions · private</span>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {sessions.map(s=>{
            const mc=MODES[s.mode]||MODES.free;
            return (
              <div key={s.id} onClick={()=>openSaved(s)} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,backdropFilter:"blur(6px)",transition:"border-color .2s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=mc.color+"60"} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
                <div style={{ width:7,height:7,borderRadius:"50%",background:mc.color,flexShrink:0 }}/>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                    <span style={{ fontSize:13,color:C.text }}>{s.title}</span>
                    <span style={{ fontSize:9,color:mc.color,letterSpacing:".07em",textTransform:"uppercase",border:`1px solid ${mc.color}40`,borderRadius:3,padding:"1px 6px" }}>{mc.label}</span>
                  </div>
                  <div style={{ fontSize:12,color:C.textMuted,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{s.preview}</div>
                </div>
                <span style={{ fontSize:11,color:C.textDim,flexShrink:0 }}>{s.date}</span>
                <span style={{ fontSize:16,color:C.textDim }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// BEHAVIORAL INTELLIGENCE ENGINE — All 8 parts
// ═══════════════════════════════════════════════════════════════════════════════

// Simulated trade dataset (in production: from journal CSV/API)
const TRADE_DATA = [
  { id:1,  instrument:"EURUSD", type:"Long",  r:1.0, result:"+2.1", win:true,  time:"2026-02-10T09:14:00", size:1.0, session:"London" },
  { id:2,  instrument:"XAUUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-10T11:30:00", size:1.0, session:"London" },
  { id:3,  instrument:"XAUUSD", type:"Long",  r:1.8, result:"-1.0", win:false, time:"2026-02-10T11:58:00", size:1.8, session:"London" },  // size spike after loss + rapid reentry
  { id:4,  instrument:"NAS100", type:"Long",  r:1.0, result:"+1.8", win:true,  time:"2026-02-11T14:20:00", size:1.0, session:"NY" },
  { id:5,  instrument:"BTCUSD", type:"Short", r:1.0, result:"+2.6", win:true,  time:"2026-02-12T08:45:00", size:1.0, session:"London" },
  { id:6,  instrument:"EURUSD", type:"Short", r:1.2, result:"-1.0", win:false, time:"2026-02-13T16:10:00", size:1.2, session:"NY" },
  { id:7,  instrument:"EURUSD", type:"Long",  r:2.1, result:"-1.0", win:false, time:"2026-02-13T16:38:00", size:2.1, session:"NY" },  // size spike + same instrument reentry
  { id:8,  instrument:"EURUSD", type:"Short", r:1.9, result:"-1.0", win:false, time:"2026-02-13T17:02:00", size:1.9, session:"NY" },  // 3rd loss cluster
  { id:9,  instrument:"XAUUSD", type:"Long",  r:1.0, result:"+1.4", win:true,  time:"2026-02-14T09:00:00", size:1.0, session:"London" },
  { id:10, instrument:"NAS100", type:"Short", r:1.0, result:"+0.9", win:true,  time:"2026-02-17T10:15:00", size:1.0, session:"London" },
  { id:11, instrument:"BTCUSD", type:"Long",  r:0.8, result:"+1.1", win:true,  time:"2026-02-18T13:40:00", size:0.8, session:"NY" },
  { id:12, instrument:"EURUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-19T19:22:00", size:1.0, session:"Late" }, // late session
  { id:13, instrument:"XAUUSD", type:"Long",  r:1.0, result:"+2.1", win:true,  time:"2026-02-20T08:55:00", size:1.0, session:"London" },
  { id:14, instrument:"NAS100", type:"Long",  r:1.0, result:"-1.0", win:false, time:"2026-02-21T10:10:00", size:1.0, session:"London" },
  { id:15, instrument:"EURUSD", type:"Short", r:1.0, result:"-1.0", win:false, time:"2026-02-21T10:44:00", size:1.0, session:"London" },
  { id:16, instrument:"BTCUSD", type:"Long",  r:1.6, result:"-1.0", win:false, time:"2026-02-21T11:05:00", size:1.6, session:"London" }, // post-loss size escalation
  { id:17, instrument:"XAUUSD", type:"Short", r:1.0, result:"+1.8", win:true,  time:"2026-02-22T09:30:00", size:1.0, session:"London" },
  { id:18, instrument:"EURUSD", type:"Long",  r:1.0, result:"+0.8", win:true,  time:"2026-02-23T08:20:00", size:1.0, session:"London" },
];

// ── PART 1: Revenge Trading Detection ────────────────────────────────────────
function computeRevengeScore(trades) {
  const flags = { sizeEscalation:0, freqSpike:0, rapidReentry:0, structural:0 };
  const avgSize = trades.slice(0,10).reduce((a,t)=>a+t.size,0)/Math.min(10,trades.length);

  for(let i=1;i<trades.length;i++) {
    const prev = trades[i-1], cur = trades[i];
    const dt = (new Date(cur.time)-new Date(prev.time))/60000; // minutes

    // Size escalation post-loss
    if(!prev.win && cur.size > avgSize * 1.5) flags.sizeEscalation = Math.min(1, flags.sizeEscalation + 0.5);

    // Rapid reentry same instrument
    if(!prev.win && cur.instrument === prev.instrument && dt < 30) flags.rapidReentry = Math.min(1, flags.rapidReentry + 0.6);

    // Frequency spike: count trades in 2h window after a loss
    if(!prev.win) {
      const window = trades.filter(t => {
        const d = (new Date(t.time)-new Date(prev.time))/60000;
        return d > 0 && d <= 120;
      }).length;
      const avgFreq = trades.length / 30; // avg per 2h over 30 days baseline
      if(window > avgFreq * 2) flags.freqSpike = Math.min(1, flags.freqSpike + 0.4);
    }
  }

  const score = Math.round(
    (flags.sizeEscalation * 30) +
    (flags.freqSpike * 30) +
    (flags.rapidReentry * 20) +
    (flags.structural * 20)
  );
  return { score: Math.min(100, score), flags };
}

// ── PART 2: Risk Consistency Score ───────────────────────────────────────────
function computeRiskConsistency(trades) {
  const sizes = trades.map(t=>t.size);
  const avg = sizes.reduce((a,b)=>a+b,0)/sizes.length;
  const stdDev = Math.sqrt(sizes.reduce((a,b)=>a+Math.pow(b-avg,2),0)/sizes.length);
  const score = Math.max(0, Math.round(100 - (stdDev/avg)*100));
  return { score, avg: avg.toFixed(2), stdDev: stdDev.toFixed(2) };
}

// ── PART 3: Overtrading Cluster Detection ────────────────────────────────────
function computeOvertradingScore(trades) {
  const days = {};
  trades.forEach(t => {
    const d = t.time.slice(0,10);
    days[d] = (days[d]||0)+1;
  });
  const dayVals = Object.values(days);
  const avgPerDay = dayVals.reduce((a,b)=>a+b,0)/dayVals.length;
  const today = trades.filter(t=>t.time.startsWith("2026-02-23")).length;
  const todayDev = today/avgPerDay;
  const sessionCounts = {};
  trades.forEach(t=>{sessionCounts[t.session]=(sessionCounts[t.session]||0)+1;});
  const avgSession = Object.values(sessionCounts).reduce((a,b)=>a+b,0)/Object.keys(sessionCounts).length;
  const maxSession = Math.max(...Object.values(sessionCounts));
  const sessionDev = maxSession/avgSession;
  const score = Math.min(100, Math.round((todayDev*50)+(sessionDev > 2 ? 50 : sessionDev*25)));
  return { score, todayCount: today, avgPerDay: avgPerDay.toFixed(1), sessionCounts };
}

// ── PART 4: Equity Curve Stability ───────────────────────────────────────────
function computeEquityStability(curve) {
  const n = curve.length;
  const xs = curve.map((_,i)=>i);
  const xMean = xs.reduce((a,b)=>a+b,0)/n;
  const yMean = curve.reduce((a,b)=>a+b,0)/n;
  const slope = xs.reduce((a,x,i)=>a+(x-xMean)*(curve[i]-yMean),0)/xs.reduce((a,x)=>a+Math.pow(x-xMean,2),0);
  const intercept = yMean - slope*xMean;
  const residuals = curve.map((y,i)=>Math.pow(y-(slope*i+intercept),2));
  const rmse = Math.sqrt(residuals.reduce((a,b)=>a+b,0)/n);
  const range = Math.max(...curve)-Math.min(...curve);
  const score = Math.max(0, Math.round(100-(rmse/range)*100));
  return { score, slope: slope.toFixed(2), rmse: rmse.toFixed(2) };
}

// ── PART 5: Performance Discipline Index (PDI) ───────────────────────────────
function computePDI(riskScore, revengeScore, overtradingScore, equityScore) {
  return Math.round(
    (riskScore * 0.30) +
    ((100 - revengeScore) * 0.25) +
    ((100 - overtradingScore) * 0.25) +
    (equityScore * 0.20)
  );
}

function pdiLabel(score) {
  if(score>=85) return { label:"Professional Range", color:C.accent };
  if(score>=70) return { label:"Minor Discipline Drift", color:C.accent };
  if(score>=55) return { label:"Behavioral Risk Emerging", color:C.gold };
  return { label:"Structural Breakdown Phase", color:C.pink };
}

function revengeLabel(score) {
  if(score<=25) return { label:"Stable", color:C.accent };
  if(score<=50) return { label:"Mild Emotional Risk", color:C.gold };
  if(score<=75) return { label:"Elevated Risk", color:C.gold };
  return { label:"High Behavioral Instability", color:C.pink };
}

function riskConsLabel(score) {
  if(score>=85) return { label:"Institutional Discipline", color:C.accent };
  if(score>=70) return { label:"Acceptable", color:C.accent };
  if(score>=50) return { label:"Risk Drift", color:C.gold };
  return { label:"Behavioral Instability", color:C.pink };
}

function overtradingLabel(score) {
  if(score<=25) return { label:"Within Baseline", color:C.accent };
  if(score<=50) return { label:"Elevated Activity", color:C.gold };
  if(score<=75) return { label:"Session Overextension", color:C.gold };
  return { label:"Daily Overtrading", color:C.pink };
}

function equityLabel(score) {
  if(score>=85) return { label:"Controlled Growth", color:C.accent };
  if(score>=65) return { label:"Moderate Volatility", color:C.gold };
  if(score>=45) return { label:"High Instability", color:C.gold };
  return { label:"Emotional Equity Swings", color:C.pink };
}

// ── Structural Improvement Recommendations ───────────────────────────────────
function generateRecommendations(revenge, risk, overtrading, pdi) {
  const recs = [];
  if(revenge.score > 50) recs.push({ icon:"zap", title:"Post-Loss Protocol", body:`Your revenge score is ${revenge.score}/100. For the next 5 sessions, implement a mandatory 30-minute pause after any stopped-out trade before re-evaluating the market.`, priority:"high" });
  if(risk.score < 70) recs.push({ icon:"target", title:"Risk Normalisation", body:`Risk consistency scored ${risk.score}/100 with std deviation of ${risk.stdDev}R. Fix position sizing at exactly 1R for your next 10 trades to recalibrate consistency.`, priority:"high" });
  if(overtrading.score > 40) recs.push({ icon:"trend", title:"Frequency Cap", body:`Trade frequency is running at ${(overtrading.todayCount/parseFloat(overtrading.avgPerDay)*100).toFixed(0)}% of your 30-day baseline today. Cap daily trades at your baseline average of ${overtrading.avgPerDay} for the next week.`, priority:"medium" });
  if(pdi < 70) recs.push({ icon:"brain", title:"Structured Operating Window", body:`PDI of ${pdi} indicates behavioral drift. Restrict trading to London open session (07:00–12:00 UTC) only for the next 5 sessions. This window historically shows your highest-quality structural setups.`, priority:"medium" });
  if(revenge.flags.rapidReentry > 0) recs.push({ icon:"shield", title:"Instrument Cooldown Rule", body:"Rapid re-entry flags detected on the same instrument post-loss. Apply a 60-minute instrument cooldown after any stopped-out trade on that specific asset.", priority:"high" });
  if(recs.length === 0) recs.push({ icon:"check", title:"Maintain Current Framework", body:"All behavioral metrics are within acceptable ranges. Continue executing within your defined framework. No structural adjustments recommended at this time.", priority:"low" });
  return recs;
}

// ── Score Gauge component ─────────────────────────────────────────────────────
const ScoreGauge = ({ score, label, sublabel, color }) => {
  const r=38, cx=50, cy=50, circ=2*Math.PI*r;
  const dash = (score/100)*circ;
  return (
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:8 }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.border} strokeWidth="4"/>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter:`drop-shadow(0 0 6px ${color}60)` }}/>
        <text x={cx} y={cy-6} textAnchor="middle" fill={color} fontFamily="JetBrains Mono" fontSize="18" fontWeight="400">{score}</text>
        <text x={cx} y={cy+10} textAnchor="middle" fill={C.textDim} fontFamily="Inter" fontSize="9" letterSpacing="1">/100</text>
      </svg>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:11,fontWeight:600,color:C.text,letterSpacing:".04em" }}>{label}</div>
        <div style={{ fontSize:10,color:color,marginTop:2 }}>{sublabel}</div>
      </div>
    </div>
  );
};

// ── Flag Badge ────────────────────────────────────────────────────────────────
const FlagBadge = ({ active, label, color }) => (
  <div style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 14px",borderRadius:6,background:active?`${color}12`:"rgba(13,16,24,.6)",border:`1px solid ${active?color+60:C.border}`,transition:"all .2s" }}>
    <div style={{ width:7,height:7,borderRadius:"50%",background:active?color:C.textDim,boxShadow:active?`0 0 8px ${color}`:undefined,flexShrink:0 }}/>
    <span style={{ fontSize:12,color:active?C.text:C.textMuted }}>{label}</span>
    <span style={{ marginLeft:"auto",fontSize:10,fontWeight:600,color:active?color:C.textDim }}>
      {active?"ACTIVE":"CLEAR"}
    </span>
  </div>
);

// ── Mini bar chart for session breakdown ─────────────────────────────────────
const SessionBar = ({ sessions }) => {
  const maxVal = Math.max(...Object.values(sessions));
  const colors = { London:C.accent, NY:C.gold, Asia:C.pink, Late:C.pink };
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
      {Object.entries(sessions).map(([s,v])=>(
        <div key={s} style={{ display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:11,color:C.textMuted,width:52,flexShrink:0 }}>{s}</span>
          <div style={{ flex:1,height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
            <div style={{ width:`${(v/maxVal)*100}%`,height:"100%",borderRadius:3,background:colors[s]||C.accent,transition:"width .8s ease" }}/>
          </div>
          <span className="mn" style={{ fontSize:11,color:colors[s]||C.accent,width:16,textAlign:"right" }}>{v}</span>
        </div>
      ))}
    </div>
  );
};

// ── BEHAVIORAL INTELLIGENCE ENGINE — Main Component ───────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
// COGNITIVE PERFORMANCE LAYER — Parts 1–8
// ═══════════════════════════════════════════════════════════════════════════════

// ── PART 1: Cognitive Bias Detection ─────────────────────────────────────────
function computeBiasFlags(trades) {
  const flags = [];
  if (!trades || trades.length < 4) return flags;

  // Overconfidence Bias: win streak ≥ 4 + size expansion
  let streak = 0, maxStreak = 0;
  for (let i = trades.length - 1; i >= 0; i--) {
    if (trades[i].win) { streak++; maxStreak = Math.max(maxStreak, streak); } else break;
  }
  const avgSize10 = trades.slice(-10).reduce((a,t) => a + t.size, 0) / Math.min(10, trades.length);
  const last3Size = trades.slice(-3).reduce((a,t) => a + t.size, 0) / 3;
  if (maxStreak >= 4 && last3Size > avgSize10 * 1.3) {
    flags.push({ id:"overconfidence", label:"Overconfidence Bias", color:C.gold, severity:"medium",
      detail:`Win streak of ${maxStreak}. Size expanded to ${last3Size.toFixed(2)}R vs baseline ${avgSize10.toFixed(2)}R.`,
      coachCue:"Your size allocation increased during the recent winning sequence. Was that a structured adjustment or confidence-driven expansion?" });
  }

  // Loss Aversion: avg win R contracted vs historical
  const wins = trades.filter(t => t.win);
  if (wins.length >= 6) {
    const recent5WinR = wins.slice(-5).reduce((a,t) => a + parseFloat(t.result), 0) / 5;
    const hist10WinR = wins.slice(0, Math.min(10, wins.length)).reduce((a,t) => a + parseFloat(t.result), 0) / Math.min(10, wins.length);
    if (hist10WinR > 0 && recent5WinR < hist10WinR * 0.75) {
      flags.push({ id:"lossaversion", label:"Loss Aversion — Defensive Profit-Taking", color:C.pink, severity:"high",
        detail:`Recent avg win: +${recent5WinR.toFixed(2)}R vs historical: +${hist10WinR.toFixed(2)}R. Contraction of ${((1-recent5WinR/hist10WinR)*100).toFixed(0)}%.`,
        coachCue:"Your average win multiple has contracted while losses remain consistent. Are you cutting winners to protect emotional discomfort?" });
    }
  }

  // Confirmation Bias: 3+ same direction trades after a losing trade in that direction
  const last6 = trades.slice(-6);
  const longs = last6.filter(t => t.type === "Long").length;
  const shorts = last6.filter(t => t.type === "Short").length;
  if (longs >= 4 || shorts >= 4) {
    const dom = longs >= 4 ? "Long" : "Short";
    const lostsInDir = last6.filter(t => t.type === dom && !t.win).length;
    if (lostsInDir >= 1) {
      flags.push({ id:"confirmation", label:"Confirmation Bias Persistence", color:C.gold, severity:"medium",
        detail:`${longs >= 4 ? longs : shorts} consecutive ${dom.toLowerCase()} trades including ${lostsInDir} loss(es) in that direction.`,
        coachCue:"Structure may have shifted, yet directional bias remained unchanged. What data justified maintaining that bias?" });
    }
  }

  // Recency Bias: major outlier followed by sharp risk change
  for (let i = 1; i < Math.min(trades.length, 10); i++) {
    const prev = trades[trades.length - 1 - i];
    const next3 = trades.slice(trades.length - i).slice(0, 3);
    if (next3.length >= 2) {
      const prevR = parseFloat(prev.result);
      const isOutlier = Math.abs(prevR) > 2.5;
      const avgNext = next3.reduce((a,t) => a + t.size, 0) / next3.length;
      const sizeShift = Math.abs(avgNext - prev.size) / prev.size;
      if (isOutlier && sizeShift > 0.4) {
        flags.push({ id:"recency", label:"Recency Distortion", color:C.gold, severity:"medium",
          detail:`Outlier event (${prevR > 0 ? "+" : ""}${prevR}R) followed by ${(sizeShift*100).toFixed(0)}% risk size shift within 3 trades.`,
          coachCue:"A single outlier outcome appears to have influenced subsequent risk parameters. Size decisions should be independent of individual results." });
        break;
      }
    }
  }

  return flags;
}

// ── PART 2: Decision Fatigue Index ───────────────────────────────────────────
function computeFatigueIndex(trades) {
  const today = trades.filter(t => t.time.startsWith("2026-02-23"));
  const sessionTrades = trades.filter(t => t.session === "London" || t.session === "NY");

  // Trades per hour in last session
  const avgDailyTrades = trades.length / 14; // 14 active days
  const todayRate = today.length / avgDailyTrades;

  // Risk consistency in last 5 trades
  const last5 = trades.slice(-5);
  const avgR5 = last5.reduce((a,t) => a + t.size, 0) / 5;
  const stdR5 = Math.sqrt(last5.reduce((a,t) => a + Math.pow(t.size - avgR5, 2), 0) / 5);
  const riskShift = (stdR5 / avgR5) * 100;

  // Loss clustering in last 5
  const recentLosses = last5.filter(t => !t.win).length;
  const lossCluster = recentLosses / 5;

  // Session length proxy (number of trades in any 3h window)
  const sessionLen = today.length > 4 ? 1 : today.length / 4;

  const score = Math.min(100, Math.round(
    (Math.min(todayRate, 2) / 2 * 25) +
    (Math.min(riskShift, 50) / 50 * 25) +
    (lossCluster * 25) +
    (sessionLen * 25)
  ));

  let label, color;
  if (score <= 30)      { label = "Focused";               color = C.accent; }
  else if (score <= 60) { label = "Mild Fatigue";          color = C.gold; }
  else if (score <= 80) { label = "Cognitive Degradation"; color = C.gold; }
  else                  { label = "Decision Exhaustion";   color = C.pink; }

  return { score, label, color, todayTrades: today.length, riskShift: riskShift.toFixed(1), lossCluster: recentLosses };
}

// ── PART 3: Volatility-Adjusted Risk ─────────────────────────────────────────
// Simulated ATR data (production: real-time from broker API)
const ATR_DATA = {
  baseline30d: 0.00820,  // 30-day avg ATR (EURUSD representative)
  current: 0.01180,       // current ATR
  instrument: "EURUSD",
};

function computeVolatilityAlignment(atrData, avgRiskSize) {
  const expansion = (atrData.current - atrData.baseline30d) / atrData.baseline30d;
  const misaligned = expansion > 0.40;
  const expansionPct = (expansion * 100).toFixed(0);
  return {
    misaligned,
    expansionPct,
    current: atrData.current,
    baseline: atrData.baseline30d,
    label: misaligned ? "Volatility Misalignment" : "Aligned",
    color: misaligned ? C.pink : C.accent,
    coachCue: misaligned
      ? `Volatility has expanded ${expansionPct}% above the 30-day baseline while position size remained constant. Is risk calibrated to current range conditions?`
      : null,
  };
}

// ── PART 4: Adaptive Coaching Tone ───────────────────────────────────────────
function getCoachingTone(pdi) {
  if (pdi >= 85) return { label:"Analytical Peer",    desc:"Peer-level discussion. Refine execution nuance.", color:C.accent };
  if (pdi >= 70) return { label:"Mild Corrective",    desc:"Measured questioning. Identify drift early.",     color:C.accent };
  if (pdi >= 55) return { label:"Direct Correction",  desc:"Structural correction. Clear recalibration needed.", color:C.gold };
  return             { label:"Firm Intervention",   desc:"Calm but direct. Pre-exposure recalibration required.", color:C.pink };
}

// ── PART 5: Memory Weighting (session history pattern detection) ─────────────
function computeMemoryPatterns(sessions) {
  const patterns = [];
  const postLoss = sessions.filter(s => s.mode === "post-loss").length;
  const weekly   = sessions.filter(s => s.mode === "weekly").length;
  if (postLoss >= 2) patterns.push({ label:"Recurring Post-Loss Escalation", count: postLoss, severity:"high",
    note:"This pattern has appeared in multiple sessions. A pre-commitment risk cap protocol is warranted." });
  if (weekly >= 1)   patterns.push({ label:"Weekly Review Compliance", count: weekly, severity:"low",
    note:"Consistent engagement with structured review. Positive behavioral indicator." });
  if (sessions.length === 0) patterns.push({ label:"No Session History", count:0, severity:"neutral",
    note:"Initiate a coaching session to begin building behavioral memory." });
  return patterns;
}

// ── PART 6: Pre-Session Commitment ───────────────────────────────────────────
const DEFAULT_COMMITMENT = { maxTrades:4, maxRisk:1.0, stopCondition:"2 consecutive losses", duration:180 };

// ── Cognitive Stability Dashboard (Part 7) ───────────────────────────────────
const CognitiveDashboard = ({ pdi, fatigue, biasFlags, commitment, trades, sessions, setPage }) => {
  const riskCons    = computeRiskConsistency(trades);
  const revenge     = computeRevengeScore(trades);
  const tone        = getCoachingTone(pdi);
  const memPatterns = computeMemoryPatterns(sessions);
  const compliance  = commitment.actual
    ? Math.max(0, Math.round(100 - ((Math.max(0, commitment.actual.trades - commitment.maxTrades) / commitment.maxTrades) * 50) - (commitment.actual.maxR > commitment.maxRisk * 1.2 ? 30 : 0)))
    : null;

  return (
    <div style={{ marginTop:24 }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
        <div className="sl" style={{ margin:0 }}>Cognitive Metrics Panel</div>
        <button className="btn bg" style={{ fontSize:11,padding:"5px 12px" }} onClick={()=>setPage("behavioral")}>Full Engine →</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:12 }}>
        {[
          { l:"Discipline Index",    v:pdi,              unit:"/100", c:pdi>=70?C.accent:pdi>=55?C.gold:C.pink },
          { l:"Fatigue Index",       v:fatigue.score,    unit:"/100", c:fatigue.color },
          { l:"Revenge Risk",        v:revenge.score,    unit:"/100", c:revenge.score<=25?C.accent:revenge.score<=50?C.gold:C.pink },
          { l:"Bias Flags Active",   v:biasFlags.length, unit:" flags", c:biasFlags.length===0?C.accent:biasFlags.length===1?C.gold:C.pink },
          { l:"Commitment",          v:compliance!==null?compliance:"—", unit:compliance!==null?"%":"", c:compliance===null?C.textDim:compliance>=80?C.accent:C.gold },
        ].map(m => (
          <div key={m.l} className="mc" style={{ textAlign:"center",padding:14 }}>
            <div className="sl" style={{ textAlign:"center",marginBottom:8 }}>{m.l}</div>
            <div className="mn" style={{ fontSize:20,color:m.c,fontWeight:400 }}>{m.v}<span style={{ fontSize:11,color:C.textDim }}>{m.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Active bias flags */}
      {biasFlags.length > 0 && (
        <div style={{ display:"flex",flexDirection:"column",gap:6,marginBottom:12 }}>
          {biasFlags.map(f => (
            <div key={f.id} style={{ background:`${f.color}0c`,border:`1px solid ${f.color}50`,borderRadius:6,padding:"11px 14px",display:"flex",gap:12,alignItems:"flex-start" }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:f.color,marginTop:5,flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:3 }}>
                  <span style={{ fontSize:12,fontWeight:600,color:f.color }}>{f.label}</span>
                  <span style={{ fontSize:9,color:f.color,border:`1px solid ${f.color}40`,borderRadius:2,padding:"1px 6px",textTransform:"uppercase" }}>{f.severity}</span>
                </div>
                <div style={{ fontSize:12,color:C.textMuted }}>{f.detail}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Coaching tone indicator */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
        <div className="mc" style={{ padding:14,borderColor:tone.color }}>
          <div className="sl">Adaptive Coaching Tone</div>
          <div style={{ fontSize:13,fontWeight:600,color:tone.color,marginBottom:4 }}>{tone.label}</div>
          <div style={{ fontSize:12,color:C.textMuted }}>{tone.desc}</div>
        </div>
        <div className="mc" style={{ padding:14 }}>
          <div className="sl">Behavioral Memory</div>
          {memPatterns.slice(0,2).map((p,i) => (
            <div key={i} style={{ fontSize:12,color:p.severity==="high"?C.pink:p.severity==="low"?C.accent:C.textMuted,marginBottom:4,lineHeight:1.6 }}>
              <span style={{ fontWeight:600 }}>{p.label}</span> — {p.note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PART 6: Pre-Session Commitment Component ──────────────────────────────────
const PreCommitment = ({ onCommit }) => {
  const [vals, setVals] = useState(DEFAULT_COMMITMENT);
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setVals(p => ({ ...p, [k]: v }));

  if (submitted) return (
    <div className="fi" style={{ background:"rgba(41,168,255,.06)",border:`1px solid ${C.accentDim}`,borderRadius:8,padding:"14px 18px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
        <IC n="check" s={14} c={C.accent}/>
        <span style={{ fontSize:13,fontWeight:500,color:C.text }}>Pre-Session Commitment Active</span>
        <span style={{ marginLeft:"auto",fontSize:11,color:C.textDim }}>{new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</span>
      </div>
      <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
        {[
          {l:"Max Trades",   v:vals.maxTrades},
          {l:"Max Risk/Trade",v:`${vals.maxRisk}R`},
          {l:"Stop Condition",v:vals.stopCondition},
          {l:"Session Cap",  v:`${vals.duration}min`},
        ].map(i => (
          <div key={i.l} style={{ fontSize:11,color:C.textMuted }}>{i.l}: <span className="mn" style={{ color:C.accent }}>{i.v}</span></div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mc" style={{ borderColor:C.accentDim }}>
      <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:16 }}>
        <IC n="target" s={16} c={C.accent}/>
        <div>
          <div style={{ fontSize:13,fontWeight:500,color:C.text }}>Pre-Session Commitment</div>
          <div style={{ fontSize:11,color:C.textMuted }}>Define parameters before trading. Deviations will be flagged.</div>
        </div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14 }}>
        {[
          {l:"Max Trades Today", k:"maxTrades", type:"number", min:1, max:20},
          {l:"Max Risk Per Trade (R)", k:"maxRisk", type:"number", min:0.1, max:5, step:0.1},
        ].map(f => (
          <div key={f.k}>
            <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>{f.l}</label>
            <input className="inp" type={f.type} min={f.min} max={f.max} step={f.step||1} value={vals[f.k]} onChange={e=>set(f.k, parseFloat(e.target.value)||e.target.value)}/>
          </div>
        ))}
        <div>
          <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>Stop Condition</label>
          <select className="inp" value={vals.stopCondition} onChange={e=>set("stopCondition",e.target.value)}>
            {["2 consecutive losses","3 consecutive losses","Daily loss limit hit","Max drawdown reached","Manual decision"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:5,letterSpacing:".08em",textTransform:"uppercase" }}>Session Duration (minutes)</label>
          <input className="inp" type="number" min={30} max={480} step={30} value={vals.duration} onChange={e=>set("duration",parseInt(e.target.value))}/>
        </div>
      </div>
      <button className="btn bp" onClick={()=>{setSubmitted(true);onCommit&&onCommit(vals);}} style={{ width:"100%" }}>
        Commit to Session Parameters
      </button>
    </div>
  );
};

// ── PART 8: Full Cognitive Intelligence Page ──────────────────────────────────
const CognitiveIntelligence = ({ setPage }) => {
  const EQUITY_CURVE = [100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130];
  const [commitment, setCommitment] = useState(DEFAULT_COMMITMENT);
  const [committed, setCommitted]   = useState(false);

  const biasFlags  = computeBiasFlags(TRADE_DATA);
  const fatigue    = computeFatigueIndex(TRADE_DATA);
  const volAlign   = computeVolatilityAlignment(ATR_DATA, computeRiskConsistency(TRADE_DATA).avg);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const revenge    = computeRevengeScore(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability(EQUITY_CURVE);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const tone       = getCoachingTone(pdi);
  const memPatterns= computeMemoryPatterns(INIT_SESSIONS);
  const escalate   = pdi < 55 || (fatigue.score > 65) || biasFlags.some(f=>f.severity==="high");

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df" style={{ fontSize:28,fontWeight:300 }}>Cognitive Intelligence</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Adaptive · Continuous · Invisible</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:580 }}>
          Bias detection, decision fatigue modelling, volatility alignment, adaptive coaching tone, and pre-commitment enforcement. All computed continuously in the background.
        </p>
      </div>

      {/* Escalation */}
      {escalate && (
        <div style={{ background:"rgba(233,30,167,.07)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:14 }} className="fi">
          <IC n="warning" s={16} c={C.pink}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:2 }}>
              {fatigue.score>65 ? "Decision Fatigue Detected" : pdi<55 ? "Structural Breakdown Phase" : "High-Severity Bias Flag Active"}
            </div>
            <div style={{ fontSize:12,color:C.textMuted }}>
              {fatigue.score>65
                ? `Session metrics show accelerated decision pacing and declining risk uniformity. It may be cognitive fatigue rather than market conditions.`
                : `PDI: ${pdi}/100. Active bias flags: ${biasFlags.length}. A structured coaching session is recommended before further exposure.`}
            </div>
          </div>
          <button className="btn" style={{ background:C.pink,color:"#fff",flexShrink:0,fontSize:11 }} onClick={()=>setPage("coach")}>Open Coach</button>
        </div>
      )}

      {/* Tone + PDI strip */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:18 }}>
        <div className="mc" style={{ borderColor:tone.color,background:`${tone.color}08`,padding:16 }}>
          <div className="sl">Adaptive Coaching Tone</div>
          <div style={{ fontSize:16,fontWeight:600,color:tone.color,marginBottom:4 }}>{tone.label}</div>
          <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.7 }}>{tone.desc}</div>
          <div style={{ marginTop:10,display:"flex",gap:4 }}>
            {[{l:"Analytical",v:85},{l:"Corrective",v:70},{l:"Direct",v:55},{l:"Intervention",v:0}].map((t,i) => {
              const active = (i===0&&pdi>=85)||(i===1&&pdi>=70&&pdi<85)||(i===2&&pdi>=55&&pdi<70)||(i===3&&pdi<55);
              return <div key={i} style={{ flex:1,height:3,borderRadius:2,background:active?tone.color:C.border }}/>;
            })}
          </div>
        </div>
        <div className="mc" style={{ padding:16 }}>
          <div className="sl">Decision Fatigue</div>
          <div style={{ display:"flex",alignItems:"center",gap:14 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="24" fill="none" stroke={C.border} strokeWidth="3.5"/>
              <circle cx="30" cy="30" r="24" fill="none" stroke={fatigue.color} strokeWidth="3.5"
                strokeDasharray={`${(fatigue.score/100)*2*Math.PI*24} ${2*Math.PI*24}`}
                strokeLinecap="round" transform="rotate(-90 30 30)"/>
              <text x="30" y="35" textAnchor="middle" fill={fatigue.color} fontFamily="JetBrains Mono" fontSize="14">{fatigue.score}</text>
            </svg>
            <div>
              <div style={{ fontSize:13,fontWeight:600,color:fatigue.color,marginBottom:4 }}>{fatigue.label}</div>
              <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
                Today: <span className="mn" style={{ color:C.accent }}>{fatigue.todayTrades} trades</span><br/>
                Risk shift: <span className="mn" style={{ color:C.gold }}>{fatigue.riskShift}%</span><br/>
                Loss cluster: <span className="mn" style={{ color:fatigue.lossCluster>=3?C.pink:C.accent }}>{fatigue.lossCluster}/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mc" style={{ padding:16,borderColor:volAlign.color }}>
          <div className="sl">Volatility Alignment</div>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:volAlign.color,boxShadow:`0 0 8px ${volAlign.color}` }}/>
            <span style={{ fontSize:13,fontWeight:600,color:volAlign.color }}>{volAlign.label}</span>
          </div>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
            ATR (current): <span className="mn" style={{ color:C.accent }}>{volAlign.current.toFixed(5)}</span><br/>
            ATR (30d avg): <span className="mn" style={{ color:C.gold }}>{volAlign.baseline.toFixed(5)}</span><br/>
            Expansion: <span className="mn" style={{ color:volAlign.color }}>+{volAlign.expansionPct}%</span>
          </div>
          {volAlign.coachCue && <div style={{ fontSize:11,color:C.pink,marginTop:8,lineHeight:1.7,fontStyle:"italic" }}>"{volAlign.coachCue.slice(0,80)}..."</div>}
        </div>
      </div>

      {/* Cognitive Bias Flags */}
      <div style={{ marginBottom:18 }}>
        <div className="sl">Cognitive Bias Detection</div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {biasFlags.length === 0 ? (
            <div className="mc" style={{ padding:14,display:"flex",alignItems:"center",gap:12 }}>
              <IC n="check" s={16} c={C.accent}/>
              <span style={{ fontSize:13,color:C.textMuted }}>No cognitive bias patterns detected in current trade sequence.</span>
            </div>
          ) : biasFlags.map(f => (
            <div key={f.id} className="mc" style={{ borderLeft:`3px solid ${f.color}`,padding:"14px 18px" }}>
              <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8 }}>
                <span style={{ fontSize:13,fontWeight:600,color:f.color }}>{f.label}</span>
                <span style={{ fontSize:9,color:f.color,border:`1px solid ${f.color}40`,borderRadius:3,padding:"1px 7px",textTransform:"uppercase" }}>{f.severity}</span>
              </div>
              <div style={{ fontSize:12,color:C.textMuted,marginBottom:8 }}>{f.detail}</div>
              <div style={{ background:`${f.color}0a`,borderRadius:5,padding:"9px 12px",borderLeft:`2px solid ${f.color}60` }}>
                <div style={{ fontSize:10,color:f.color,letterSpacing:".08em",textTransform:"uppercase",marginBottom:4 }}>Coach Cue</div>
                <div style={{ fontSize:12,color:C.text,lineHeight:1.8,fontStyle:"italic" }}>"{f.coachCue}"</div>
              </div>
            </div>
          ))}

          {/* Always show the 4 bias categories as status cards */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginTop:4 }}>
            {["Overconfidence","Loss Aversion","Confirmation","Recency"].map(b => {
              const ids = {Overconfidence:"overconfidence","Loss Aversion":"lossaversion",Confirmation:"confirmation",Recency:"recency"};
              const active = biasFlags.find(f=>f.id===ids[b]);
              return (
                <div key={b} style={{ padding:"10px 12px",borderRadius:6,background:active?`${active.color}10`:"rgba(13,16,24,.6)",border:`1px solid ${active?active.color+"50":C.border}` }}>
                  <div style={{ fontSize:10,fontWeight:600,color:active?active.color:C.textDim,letterSpacing:".06em",textTransform:"uppercase",marginBottom:3 }}>{b}</div>
                  <div style={{ fontSize:11,color:active?C.text:C.textMuted }}>{active?"Detected":"Clear"}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Behavioral Memory */}
      <div style={{ marginBottom:18 }}>
        <div className="sl">AI Memory Layers</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          {[
            { tier:"Short-Term", range:"Last 10 sessions", patterns: memPatterns.filter(p=>p.severity!=="neutral").slice(0,2), color:C.accent },
            { tier:"Mid-Term",   range:"Last 30 days",     patterns:[{label:"Late-session degradation",note:"Recurring −12% expectancy after 18:00 UTC. Identified across 3 separate weeks."}], color:C.gold },
            { tier:"Long-Term",  range:"90-day tendency",  patterns:[{label:"Post-drawdown risk expansion",note:"Pattern detected twice following drawdown phases exceeding −5%. Pre-commitment cap protocol recommended."}], color:C.textMuted },
          ].map(layer => (
            <div key={layer.tier} className="mc" style={{ padding:14,borderColor:layer.color+"50" }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                <span style={{ fontSize:11,fontWeight:600,color:layer.color,letterSpacing:".06em",textTransform:"uppercase" }}>{layer.tier}</span>
                <span style={{ fontSize:10,color:C.textDim }}>{layer.range}</span>
              </div>
              {layer.patterns.length===0
                ? <div style={{ fontSize:12,color:C.textDim }}>No patterns logged.</div>
                : layer.patterns.map((p,i)=>(
                  <div key={i} style={{ marginBottom:8 }}>
                    <div style={{ fontSize:12,fontWeight:500,color:C.text,marginBottom:2 }}>{p.label}</div>
                    <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>{p.note}</div>
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>

      {/* Pre-session commitment */}
      <PreCommitment onCommit={v=>{setCommitment(v);setCommitted(true);}}/>
    </div>
  );
};

const BehavioralEngine = ({ setPage }) => {
  const EQUITY_CURVE = [100,97,99,103,101,105,102,108,106,111,109,114,112,117,115,120,118,123,121,126,130];

  const revenge    = computeRevengeScore(TRADE_DATA);
  const riskCons   = computeRiskConsistency(TRADE_DATA);
  const overtrading= computeOvertradingScore(TRADE_DATA);
  const equity     = computeEquityStability(EQUITY_CURVE);
  const pdi        = computePDI(riskCons.score, revenge.score, overtrading.score, equity.score);
  const pdiMeta    = pdiLabel(pdi);
  const recs       = generateRecommendations(revenge, riskCons, overtrading, pdi);

  const escalationTriggered = revenge.score > 70 && riskCons.score < 60;

  return (
    <div className="fi">
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df" style={{ fontSize:28,fontWeight:300 }}>Behavioral Intelligence</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Live Engine · 18 Trades Analysed</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:580 }}>
          Data-driven behavioral diagnostics. Revenge detection, risk consistency scoring, overtrading analysis, and equity curve stability — all feeding the Performance Coach.
        </p>
      </div>

      {/* Escalation alert */}
      {escalationTriggered && (
        <div style={{ background:"rgba(233,30,167,.07)",border:`1px solid ${C.pinkDim}`,borderRadius:8,padding:"13px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:14 }} className="fi">
          <IC n="warning" s={16} c={C.pink}/>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13,fontWeight:500,color:C.text,marginBottom:2 }}>Coaching Escalation Triggered</div>
            <div style={{ fontSize:12,color:C.textMuted }}>Revenge score exceeds 70 and risk consistency below 60. A structured performance review is recommended.</div>
          </div>
          <button className="btn" style={{ background:C.pink,color:"#fff",flexShrink:0,fontSize:11 }} onClick={()=>setPage("coach")}>Initiate Review</button>
        </div>
      )}

      {/* PDI Hero */}
      <div className="mc" style={{ marginBottom:18,borderColor:pdiMeta.color,background:`linear-gradient(135deg,rgba(13,16,24,.92),${pdiMeta.color}08)` }}>
        <div style={{ display:"flex",alignItems:"center",gap:28 }}>
          <div style={{ textAlign:"center",flexShrink:0 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke={C.border} strokeWidth="5"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke={pdiMeta.color} strokeWidth="5"
                strokeDasharray={`${(pdi/100)*2*Math.PI*50} ${2*Math.PI*50}`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ filter:`drop-shadow(0 0 12px ${pdiMeta.color}80)` }}/>
              <text x="60" y="54" textAnchor="middle" fill={pdiMeta.color} fontFamily="JetBrains Mono" fontSize="28" fontWeight="300">{pdi}</text>
              <text x="60" y="71" textAnchor="middle" fill={C.textDim} fontFamily="Inter" fontSize="9" letterSpacing="1">/100</text>
            </svg>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10,color:C.textDim,letterSpacing:".12em",textTransform:"uppercase",marginBottom:6 }}>Performance Discipline Index</div>
            <div className="df" style={{ fontSize:24,color:pdiMeta.color,fontWeight:300,marginBottom:6 }}>{pdiMeta.label}</div>
            <p style={{ fontSize:13,color:C.textMuted,lineHeight:1.8,maxWidth:480 }}>
              Composite score weighted across risk consistency (30%), revenge behaviour (25%), overtrading (25%), and equity stability (20%). This score feeds directly into Performance Coach session context.
            </p>
            <div style={{ display:"flex",gap:14,marginTop:12 }}>
              <div style={{ fontSize:11,color:C.textDim }}>Risk <span style={{ color:riskConsLabel(riskCons.score).color }}>{riskCons.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Revenge <span style={{ color:revengeLabel(revenge.score).color }}>{revenge.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Overtrading <span style={{ color:overtradingLabel(overtrading.score).color }}>{overtrading.score}</span></div>
              <div style={{ fontSize:11,color:C.textDim }}>Equity <span style={{ color:equityLabel(equity.score).color }}>{equity.score}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Score gauges */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:18 }}>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={riskCons.score} label="Risk Consistency" sublabel={riskConsLabel(riskCons.score).label} color={riskConsLabel(riskCons.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Avg: <span className="mn" style={{ color:C.accent }}>{riskCons.avg}R</span><br/>
            Std Dev: <span className="mn" style={{ color:C.gold }}>{riskCons.stdDev}R</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={revenge.score} label="Revenge Score" sublabel={revengeLabel(revenge.score).label} color={revengeLabel(revenge.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Size flags: <span className="mn" style={{ color:revenge.flags.sizeEscalation>0?C.pink:C.accent }}>{revenge.flags.sizeEscalation>0?"Detected":"Clear"}</span><br/>
            Re-entry: <span className="mn" style={{ color:revenge.flags.rapidReentry>0?C.pink:C.accent }}>{revenge.flags.rapidReentry>0?"Detected":"Clear"}</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={overtrading.score} label="Overtrading Index" sublabel={overtradingLabel(overtrading.score).label} color={overtradingLabel(overtrading.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Today: <span className="mn" style={{ color:C.accent }}>{overtrading.todayCount} trades</span><br/>
            30d avg: <span className="mn" style={{ color:C.gold }}>{overtrading.avgPerDay}/day</span>
          </div>
        </div>
        <div className="mc" style={{ textAlign:"center" }}>
          <ScoreGauge score={equity.score} label="Equity Stability" sublabel={equityLabel(equity.score).label} color={equityLabel(equity.score).color}/>
          <hr className="dv"/>
          <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.7 }}>
            Slope: <span className="mn" style={{ color:C.accent }}>+{equity.slope}</span><br/>
            RMSE: <span className="mn" style={{ color:C.gold }}>{equity.rmse}</span>
          </div>
        </div>
      </div>

      {/* Flags + Session breakdown */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18 }}>
        <div>
          <div className="sl">Active Behavioral Flags</div>
          <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
            <FlagBadge active={revenge.flags.sizeEscalation > 0} label="Size Escalation Post-Loss" color={C.pink}/>
            <FlagBadge active={revenge.flags.freqSpike > 0}      label="Overcompensation Frequency Spike" color={C.pink}/>
            <FlagBadge active={revenge.flags.rapidReentry > 0}   label="Emotional Re-entry Risk" color={C.pink}/>
            <FlagBadge active={overtrading.score > 50}            label="Session Overextension" color={C.gold}/>
            <FlagBadge active={false}                             label="Structural Discipline Degradation" color={C.gold}/>
          </div>
        </div>
        <div>
          <div className="sl">Session Distribution</div>
          <div className="mc">
            <SessionBar sessions={overtrading.sessionCounts}/>
            <hr className="dv"/>
            <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>
              {overtrading.sessionCounts.Late > 0
                ? <span style={{ color:C.gold }}>Late-session activity detected ({overtrading.sessionCounts.Late} trades after 18:00 UTC). Historical degradation: −12% expectancy in this window.</span>
                : <span style={{ color:C.accent }}>No late-session activity detected. Session distribution within normal parameters.</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Revenge detail breakdown */}
      <div className="mc" style={{ marginBottom:18 }}>
        <div className="sl">Revenge Trading Decomposition</div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14 }}>
          {[
            { label:"Size Escalation", weight:"×30", val:Math.round(revenge.flags.sizeEscalation*30), color:revenge.flags.sizeEscalation>0?C.pink:C.accent, desc:"Position size >1.5x average after loss" },
            { label:"Frequency Spike", weight:"×30", val:Math.round(revenge.flags.freqSpike*30),      color:revenge.flags.freqSpike>0?C.pink:C.accent,      desc:"Trade count 2x average in 2h post-loss window" },
            { label:"Rapid Re-entry",  weight:"×20", val:Math.round(revenge.flags.rapidReentry*20),   color:revenge.flags.rapidReentry>0?C.pink:C.accent,   desc:"Same instrument re-entry within 30 min" },
            { label:"Structural Dev.", weight:"×20", val:Math.round(revenge.flags.structural*20),      color:C.accent, desc:"Higher-risk setup frequency post-loss" },
          ].map(f=>(
            <div key={f.label} style={{ padding:"12px 0",borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <span style={{ fontSize:11,color:C.textMuted }}>{f.label}</span>
                <span className="mn" style={{ fontSize:11,color:f.color }}>{f.val}pts</span>
              </div>
              <div className="pb"><div className="pf" style={{ width:`${f.val}%`,background:f.color }}/></div>
              <div style={{ fontSize:10,color:C.textDim,marginTop:6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Structural Improvement Recommendations */}
      <div>
        <div className="sl">Structural Improvement Recommendations</div>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          {recs.map((r,i)=>{
            const priorityColor = r.priority==="high"?C.pink:r.priority==="medium"?C.gold:C.accent;
            return (
              <div key={i} className="mc" style={{ borderLeft:`3px solid ${priorityColor}`,display:"flex",gap:16 }}>
                <div style={{ width:32,height:32,borderRadius:"50%",background:`${priorityColor}18`,border:`1px solid ${priorityColor}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>
                  <IC n={r.icon} s={14} c={priorityColor}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
                    <span style={{ fontSize:13,fontWeight:500,color:C.text }}>{r.title}</span>
                    <span style={{ fontSize:9,color:priorityColor,border:`1px solid ${priorityColor}40`,borderRadius:3,padding:"1px 7px",textTransform:"uppercase",letterSpacing:".07em" }}>{r.priority}</span>
                  </div>
                  <p style={{ fontSize:13,color:C.textMuted,lineHeight:1.8 }}>{r.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  const [active, setActive] = useState(null);
  const courses=[{id:1,title:"Beginner Trading Course",lessons:12,done:12,pct:100,tier:"Free",tc:"ta"},{id:2,title:"Beginner Crypto Course",lessons:8,done:5,pct:63,tier:"Free",tc:"ta"},{id:3,title:"Fortitude Market Framework",lessons:24,done:16,pct:68,tier:"FMF Owner",tc:"tg2"},{id:4,title:"Workshop Series",lessons:6,done:0,pct:0,tier:"Mentorship",tc:"tb"},{id:5,title:"Mentorship Content",lessons:18,done:0,pct:0,tier:"Mentorship",tc:"tb",locked:true}];
  const TITLES=["Introduction to Market Structure","Understanding Timeframes","Liquidity Theory Fundamentals","Order Flow Concepts","Structural Bias Identification","Entry Framework Architecture","Risk Definition Methodology","Session Mechanics","Inducement Recognition","Scenario Construction","Trade Management Framework","Review & Application"];
  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Education Framework</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Structured progression. Foundational to advanced market methodology.</p>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 2fr",gap:20 }}>
        <div>
          <div className="sl">Course Library</div>
          {courses.map(c=>(
            <div key={c.id} className="mc" style={{ marginBottom:10,cursor:c.locked?"default":"pointer",opacity:c.locked?.55:1,borderColor:active===c.id?C.accentDim:undefined }} onClick={()=>!c.locked&&setActive(c.id===active?null:c.id)}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  {c.locked&&<IC n="lock" s={12} c={C.textDim}/>}
                  <span style={{ fontSize:13,color:C.text }}>{c.title}</span>
                </div>
                <span className={`tg ${c.tc}`}>{c.tier}</span>
              </div>
              <div className="pb" style={{ marginBottom:6 }}><div className="pf" style={{ width:`${c.pct}%` }}/></div>
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,color:C.textDim }}><span>{c.done}/{c.lessons} lessons</span><span>{c.pct}%</span></div>
            </div>
          ))}
        </div>
        <div>
          {active?(
            <div className="fi">
              <div className="sl">{courses.find(c=>c.id===active)?.title} — Lesson Index</div>
              <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
                {Array.from({length:courses.find(c=>c.id===active)?.lessons||6},(_,i)=>{
                  const done=i<(courses.find(c=>c.id===active)?.done||0);
                  return (<div key={i} style={{ display:"flex",alignItems:"center",gap:14,padding:"13px 16px",borderBottom:`1px solid ${C.border}`,cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ width:24,height:24,borderRadius:"50%",background:done?C.accent:C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      {done?<IC n="check" s={11} c={C.bg}/>:<span style={{ fontSize:10,color:C.textDim }}>{i+1}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize:13,color:done?C.text:C.textMuted }}>Lesson {i+1} — {TITLES[i%12]}</div>
                      <div style={{ fontSize:11,color:C.textDim,marginTop:2 }}>Video · PDF Reference</div>
                    </div>
                    {done&&<span className="tg ta" style={{ marginLeft:"auto" }}>Complete</span>}
                  </div>);
                })}
              </div>
            </div>
          ):(
            <div style={{ height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:40,background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,backdropFilter:"blur(8px)" }}>
              <IC n="edu" s={32} c={C.textDim}/>
              <div style={{ color:C.textDim,fontSize:13,marginTop:16,lineHeight:1.8 }}>Select a course to view lesson index and track progression</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const [msg,setMsg]=useState("");
  const msgs=[{u:"T.Adeyemi",time:"09:14",tag:"FMF",tc:"tg2",text:"DXY structure looks compressive ahead of the NY session. Equal lows sitting below 103.40 — watching for a liquidity sweep before any directional commitment."},{u:"K.Morrow",time:"09:28",tag:"Member",tc:"tb",text:"Structural bias on EURUSD H4 shifted bearish after the break of the most recent lower high confirmation. Risk parameters defined accordingly."},{u:"J.Ashford",time:"09:41",tag:"FMF",tc:"tg2",text:"XAUUSD showing classic inducement behavior above 2040. No structural confirmation. Monitoring, not positioned."},{u:"Admin",time:"09:55",tag:"Admin",tc:"td",text:"Reminder: Chart analysis discussions are structural only. Specific entry prices and signals are not permitted per platform guidelines."},{u:"P.Nkosi",time:"10:07",tag:"Member",tc:"tb",text:"Question on structural context — in a compression range, does liquidity engineering at both ends indicate institutional accumulation or distribution?"}];
  return (
    <div className="fi">
      <div style={{ marginBottom:20 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Fortitude Community</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Professional market discussion. Structural analysis only.</p>
      </div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 16px",marginBottom:14,display:"flex",gap:24,backdropFilter:"blur(8px)" }}>
        <div><div style={{ fontSize:10,fontWeight:600,color:C.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:5 }}>Permitted</div><div style={{ fontSize:12,color:C.textMuted }}>Market structure · Framework discussion · Risk methodology</div></div>
        <div style={{ width:1,background:C.border }}/>
        <div><div style={{ fontSize:10,fontWeight:600,color:C.pink,letterSpacing:".1em",textTransform:"uppercase",marginBottom:5 }}>Not Permitted</div><div style={{ fontSize:12,color:C.textMuted }}>Signal requests · Profit flexing · Prediction hype · Emotional venting</div></div>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:"1fr 240px",gap:14 }}>
        <div>
          <div style={{ maxHeight:400,overflowY:"auto",marginBottom:12,display:"flex",flexDirection:"column",gap:8 }}>
            {msgs.map((m,i)=>(
              <div key={i} style={{ padding:"13px 15px",borderRadius:6,background:"rgba(17,21,32,.82)",border:`1px solid ${C.border}`,backdropFilter:"blur(6px)" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:7 }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ fontSize:13,fontWeight:500,color:C.text }}>{m.u}</span>
                    <span className={`tg ${m.tc}`}>{m.tag}</span>
                  </div>
                  <span className="mn" style={{ fontSize:10,color:C.textDim }}>{m.time}</span>
                </div>
                <p style={{ fontSize:13,color:C.textMuted,lineHeight:1.7 }}>{m.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:8 }}>
            <input className="inp" value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Contribute to the structural discussion..." style={{ flex:1 }} onKeyDown={e=>e.key==="Enter"&&setMsg("")}/>
            <button className="btn bp" onClick={()=>setMsg("")}>Post</button>
          </div>
        </div>
        <div>
          <div className="sl">Online</div>
          <div className="mc" style={{ padding:14,marginBottom:12 }}>
            {[{u:"T.Adeyemi",t:"FMF",tc:"tg2"},{u:"K.Morrow",t:"Member",tc:"tb"},{u:"J.Ashford",t:"FMF",tc:"tg2"},{u:"P.Nkosi",t:"Member",tc:"tb"},{u:"Admin",t:"Admin",tc:"td"}].map((m,i)=>(
              <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<4?`1px solid ${C.border}`:"none" }}>
                <span className="pu" style={{ width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block" }}/>
                <span style={{ flex:1,fontSize:12,color:C.textMuted }}>{m.u}</span>
                <span className={`tg ${m.tc}`}>{m.t}</span>
              </div>
            ))}
          </div>
          <div className="sl">Today</div>
          <div className="mc" style={{ padding:14 }}>
            {[{l:"Messages",v:"47"},{l:"Active",v:"12"},{l:"Charts",v:"8"}].map(s=>(
              <div key={s.l} style={{ display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12,color:C.textMuted }}>{s.l}</span>
                <span className="mn" style={{ fontSize:12,color:C.accent }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SUBSCRIPTION & ACCESS ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════════════════

// Tier definitions — single source of truth
const TIERS = {
  free:     { id:"free",     label:"Free",                price:"$0",       billing:"",          color:C.textMuted, order:0 },
  "45":     { id:"45",       label:"Fortitude",           price:"$45",      billing:"/month",     color:C.accent,    order:1 },
  "65":     { id:"65",       label:"Fortitude Pro",       price:"$65",      billing:"/month",     color:C.pink,   order:2 },
  "95":     { id:"95",       label:"Full Access",         price:"$95",      billing:"/month",     color:C.gold,      order:3 },
  lifetime: { id:"lifetime", label:"Lifetime",            price:"$3,995",   billing:"once-off",  color:C.pink,      order:4 },
};

// Access control matrix — single source of truth
const ACCESS = {
  dashboard:       { free:"limited", "45":true, "65":true, "95":true, lifetime:true },
  intelligence:    { free:false,     "45":true, "65":true, "95":true, lifetime:true },
  journal:         { free:false,     "45":false,"65":true, "95":true, lifetime:true },
  behavioral:      { free:false,     "45":false,"65":true, "95":true, lifetime:true },
  cognitive:       { free:false,     "45":false,"65":true, "95":true, lifetime:true },
  coach:           { free:false,     "45":false,"65":true, "95":true, lifetime:true },
  education:       { free:true,      "45":true, "65":true, "95":true, lifetime:true },
  community:       { free:false,     "45":true, "65":true, "95":true, lifetime:true },
  account:         { free:true,      "45":true, "65":true, "95":true, lifetime:true },
  admin:           { free:false,     "45":false,"65":false,"95":false,lifetime:false },
  // Add-on products (require active sub unless lifetime)
  advanced_course: { free:false,     "45":true, "65":true, "95":true, lifetime:true },
  workshop:        { free:false,     "45":true, "65":true, "95":true, lifetime:true },
  mentorship:      { free:false,     "45":true, "65":true, "95":true, lifetime:true },
};

// AI usage caps by tier (requests/day)
const AI_CAPS = {
  free:0, "45":5, "65":10, "95":999, lifetime:999,
};

// Check access for a given tier + feature
function canAccess(tier, feature) {
  const rule = ACCESS[feature];
  if (!rule) return false;
  // Lifetime bypasses all subscription validation
  if (tier === "lifetime") return true;
  return rule[tier] === true || rule[tier] === "limited";
}

function isLimited(tier, feature) {
  return ACCESS[feature]?.[tier] === "limited";
}

// Upgrade recommendation for a blocked feature
function requiredTier(feature) {
  const rule = ACCESS[feature];
  if (!rule) return "95";
  for (const t of ["45","65","95","lifetime"]) {
    if (rule[t] === true) return t;
  }
  return "lifetime";
}

// ── Gate Wall Component ───────────────────────────────────────────────────────
const GateWall = ({ feature, currentTier, setPage, readOnly = false, hasData = false }) => {
  const req = requiredTier(feature);
  const tierMeta = TIERS[req] || TIERS["95"];
  const featureLabels = {
    journal:"Performance Journal", behavioral:"Behavioral Intelligence", cognitive:"Cognitive Intelligence",
    coach:"Performance Coach", intelligence:"Market Intelligence", community:"Community",
    admin:"Administration",
  };
  const label = featureLabels[feature] || feature;

  return (
    <div className="fi" style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:380,textAlign:"center",padding:48 }}>
      <div style={{ width:52,height:52,borderRadius:"50%",background:`${readOnly?C.gold:tierMeta.color}18`,border:`1px solid ${readOnly?C.gold:tierMeta.color}40`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20 }}>
        <IC n={readOnly?"lock":"shield"} s={22} c={readOnly?C.gold:tierMeta.color}/>
      </div>

      {readOnly ? (
        <>
          <div className="df" style={{ fontSize:22,fontWeight:300,color:C.text,marginBottom:10 }}>Subscription Inactive</div>
          <div style={{ fontSize:13,color:C.textMuted,lineHeight:2,maxWidth:400,marginBottom:8 }}>
            Your subscription is no longer active. Access to <span style={{ color:C.text }}>{label}</span> has been suspended.
          </div>
          {hasData && (
            <div style={{ padding:"10px 18px",background:"rgba(200,169,110,.06)",border:`1px solid ${C.goldDim}`,borderRadius:6,marginBottom:20,maxWidth:400 }}>
              <div style={{ fontSize:12,color:C.gold,marginBottom:3,fontWeight:500 }}>Data Preserved</div>
              <div style={{ fontSize:12,color:C.textMuted,lineHeight:1.8 }}>
                All journal entries, behavioral metrics, and coaching history are preserved in full. Access resumes immediately upon reactivating your subscription. No data has been deleted.
              </div>
            </div>
          )}
          {!hasData && <div style={{ height:20 }}/>}
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn bp" style={{ minWidth:180,padding:"12px 24px" }} onClick={()=>setPage("pricing")}>
              Reactivate Subscription
            </button>
            <button className="btn bg" style={{ padding:"12px 20px" }} onClick={()=>setPage("account")}>
              Account
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="df" style={{ fontSize:22,fontWeight:300,color:C.text,marginBottom:10 }}>Access Restricted</div>
          <div style={{ fontSize:13,color:C.textMuted,lineHeight:2,maxWidth:400,marginBottom:6 }}>
            <span style={{ color:C.text }}>{label}</span> requires{" "}
            <span style={{ color:tierMeta.color,fontWeight:500 }}>{tierMeta.label} membership</span>
            {req!=="lifetime" ? ` (${tierMeta.price}${tierMeta.billing})` : ` (${tierMeta.price} once-off)`} or above.
          </div>
          <div style={{ fontSize:12,color:C.textDim,marginBottom:24,maxWidth:360,lineHeight:1.8 }}>
            Upgrade to unlock this feature. All data accumulated on a higher tier is preserved if you downgrade.
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button className="btn bp" style={{ minWidth:180,padding:"12px 24px" }} onClick={()=>setPage("pricing")}>
              View Membership Options
            </button>
            <button className="btn bg" style={{ padding:"12px 20px" }} onClick={()=>setPage("account")}>
              Account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ── AI Usage Meter ────────────────────────────────────────────────────────────
const AIUsageMeter = ({ tier, used, setPage }) => {
  const cap = AI_CAPS[tier];
  const unlimited = cap >= 999;
  const pct = unlimited ? 100 : Math.min(100, Math.round((used / cap) * 100));
  const nearLimit = !unlimited && pct >= 80;
  return (
    <div style={{ display:"flex",alignItems:"center",gap:14,padding:"11px 16px",background:"rgba(13,16,24,.82)",border:`1px solid ${nearLimit?C.gold:C.border}`,borderRadius:6,backdropFilter:"blur(8px)" }}>
      <IC n="zap" s={13} c={nearLimit?C.gold:C.accent}/>
      <span style={{ fontSize:12,color:C.textMuted }}>AI analyses today:</span>
      {unlimited
        ? <span className="mn" style={{ fontSize:12,color:C.accent }}>Unlimited</span>
        : <>
            <div style={{ flex:1,maxWidth:140 }}><div className="pb"><div className="pf" style={{ width:`${pct}%`,background:nearLimit?C.gold:undefined }}/></div></div>
            <span className="mn" style={{ fontSize:12,color:nearLimit?C.gold:C.accent }}>{used}/{cap}</span>
          </>
      }
      {nearLimit && <button className="btn bg" style={{ fontSize:10,padding:"3px 10px",borderColor:C.gold,color:C.gold }} onClick={()=>setPage("account")}>Upgrade</button>}
    </div>
  );
};

// ── Pricing Page (standalone) ─────────────────────────────────────────────────
const Pricing = ({ currentTier, setPage, onUpgrade, subStatus, setSubStatus }) => {
  const [selectedAddon, setSelectedAddon] = useState(null);

  const TIER_FEATURES = {
    free:     ["Beginner Trading Course","Beginner Crypto Course","Platform login"],
    "45":     ["Full Dashboard","Market Intelligence","AI Chart Analysis (5/day)","Community Chat","Market Updates"],
    "65":     ["Everything in Fortitude","Trading Journal","Performance Metrics","Behavioral Analytics","Performance Coach","Pre-Commitment System","Cognitive Dashboard","AI Chart Analysis (10/day)"],
    "95":     ["Everything in Fortitude Pro","Unlimited AI Chart Analysis","Unlimited Journal Imports","Priority AI Response","Full Behavioral Engine Access"],
    lifetime: ["Entire platform — all tiers","All current & future features","Highest AI usage tier","Never expires","One-time payment"],
  };

  const ADDONS = [
    { id:"advanced_course", label:"Advanced Trading Course", price:"$495", note:"Requires active subscription or Lifetime", desc:"In-depth structural analysis methodology. Institutional framework extension." },
    { id:"workshop",        label:"Workshop Series",         price:"$495", note:"Requires active subscription or Lifetime", desc:"Live workshop recordings. Applied FMF techniques across multiple asset classes." },
    { id:"mentorship",      label:"Mentorship Program",      price:"$2,995",note:"Recommended: Pro or Full Access",        desc:"Direct coaching engagement. Personalised performance review and structural guidance." },
  ];

  return (
    <div className="fi">
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex",alignItems:"baseline",gap:14,marginBottom:6 }}>
          <h1 className="df" style={{ fontSize:28,fontWeight:300 }}>Membership</h1>
          <span style={{ fontSize:10,color:C.textDim,letterSpacing:".1em",textTransform:"uppercase" }}>Structured access. No hidden terms.</span>
        </div>
        <p style={{ color:C.textMuted,fontSize:13,maxWidth:520 }}>Access to structured market intelligence and disciplined performance tools. Select the tier appropriate to your current stage of development.</p>
      </div>

      {/* Monthly tiers — Free first, then ascending */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:24 }}>
        {["free","45","65","95","lifetime"].map(tid => {
          const t = TIERS[tid];
          const isCurrent = t.id === currentTier;
          const isBelow = t.order < TIERS[currentTier].order;
          return (
            <div key={t.id} style={{ border:`1px solid ${isCurrent?t.color:C.border}`,borderRadius:8,padding:18,background:isCurrent?`linear-gradient(135deg,rgba(13,16,24,.95),${t.color}08)`:"rgba(13,16,24,.82)",backdropFilter:"blur(8px)",display:"flex",flexDirection:"column",transition:"all .2s",position:"relative" }}
              onMouseEnter={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=t.color+"80"; }}
              onMouseLeave={e=>{ if(!isCurrent) e.currentTarget.style.borderColor=C.border; }}>
              {t.id==="95" && <div style={{ position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:C.pink,color:"#fff",fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"2px 10px",borderRadius:"0 0 5px 5px" }}>Most Popular</div>}
              {t.id==="lifetime" && <div style={{ position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:C.accentDim,color:"#fff",fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",padding:"2px 10px",borderRadius:"0 0 5px 5px" }}>Best Value</div>}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:11,fontWeight:600,color:t.color,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6 }}>{t.label}</div>
                <div className="df" style={{ fontSize:26,color:isCurrent?t.color:C.text,fontWeight:300,lineHeight:1 }}>{t.price}</div>
                <div style={{ fontSize:10,color:C.textDim,marginTop:3 }}>{t.billing||"free forever"}</div>
              </div>
              <hr className="dv" style={{ margin:"10px 0" }}/>
              <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7,marginBottom:14 }}>
                {TIER_FEATURES[t.id].map(f=>(
                  <div key={f} style={{ display:"flex",gap:7,alignItems:"flex-start" }}>
                    <IC n="check" s={10} c={isCurrent?t.color:C.textDim}/>
                    <span style={{ fontSize:11,color:isCurrent?C.textMuted:C.textDim,lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              {isCurrent
                ? <div style={{ textAlign:"center",fontSize:11,fontWeight:600,color:t.color,padding:"8px 0",border:`1px solid ${t.color}40`,borderRadius:4 }}>Current Plan</div>
                : isBelow
                ? <div style={{ textAlign:"center",fontSize:11,color:C.textDim,padding:"8px 0" }}>Downgrade</div>
                : <button className="btn bp" style={{ width:"100%",fontSize:11,background:t.color,padding:"9px 0" }} onClick={()=>{onUpgrade(t.id);setSubStatus&&setSubStatus("active");}}>
                    {t.id==="lifetime"?"Purchase Lifetime":"Upgrade"}
                  </button>
              }
            </div>
          );
        })}
      </div>

      {/* Add-on products */}
      <div className="sl">Programs & Courses</div>
      <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
        {ADDONS.map(a => {
          const accessible = canAccess(currentTier, a.id);
          return (
            <div key={a.id} className="mc" style={{ display:"flex",alignItems:"center",gap:18,opacity:accessible?1:.6 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                  <span style={{ fontSize:14,fontWeight:500,color:C.text }}>{a.label}</span>
                  {!accessible && <span className="tg td">Subscription Required</span>}
                </div>
                <div style={{ fontSize:12,color:C.textMuted,marginBottom:4 }}>{a.desc}</div>
                <div style={{ fontSize:11,color:C.textDim }}>{a.note}</div>
              </div>
              <div style={{ textAlign:"right",flexShrink:0 }}>
                <div className="df" style={{ fontSize:20,color:C.gold,fontWeight:300,marginBottom:8 }}>{a.price}</div>
                <button className="btn bg" style={{ fontSize:11 }} disabled={!accessible}>
                  {accessible ? "Purchase" : "Requires Subscription"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Institutional tone note */}
      <div style={{ padding:"14px 18px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
        <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>
          All subscriptions process via Stripe. Monthly tiers bill on the same date each month. Downgrade takes effect at the end of the current billing period — no data is deleted. Lifetime membership is a one-time payment with no recurring charges. Programs and courses require an active subscription to access; if your subscription lapses, program content is preserved in read-only mode and resumes on reactivation.
        </div>
      </div>
    </div>
  );
};

// ── Account Page ──────────────────────────────────────────────────────────────
const Account = ({ currentTier, setTier, setPage, aiUsed, subStatus, setSubStatus, onUpgrade }) => {
  const [tab, setTab] = useState("subscription");
  const tier = TIERS[currentTier];

  return (
    <div className="fi">
      <div style={{ marginBottom:24 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Account</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Subscription management, usage tracking, and security settings.</p>
      </div>

      {/* Profile strip */}
      <div className="mc" style={{ marginBottom:18,borderColor:tier.color,display:"flex",gap:18,alignItems:"center",padding:"14px 20px" }}>
        <div style={{ width:44,height:44,borderRadius:"50%",background:`${tier.color}18`,border:`1px solid ${tier.color}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span className="df" style={{ fontSize:19,color:tier.color }}>J</span>
        </div>
        <div>
          <div style={{ fontSize:14,fontWeight:500,color:C.text,marginBottom:2 }}>J. Harrison</div>
          <div style={{ fontSize:12,color:C.textMuted }}>j.harrison@email.com</div>
        </div>
        <div style={{ marginLeft:"auto",display:"flex",gap:10,alignItems:"center" }}>
          <div style={{ textAlign:"right",marginRight:8 }}>
            <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase" }}>Current Plan</div>
            <div style={{ fontSize:13,fontWeight:600,color:tier.color }}>{tier.label} — {tier.price}{tier.billing}</div>
          </div>
          <span className="tg" style={{ background:`${tier.color}18`,color:tier.color,border:`1px solid ${tier.color}40` }}>Active</span>
          <button className="btn bg">Edit Profile</button>
          <button className="btn bg" style={{ display:"flex",alignItems:"center",gap:6 }}><IC n="logout" s={13}/>Sign Out</button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display:"flex",gap:2,marginBottom:20,borderBottom:`1px solid ${C.border}`,paddingBottom:0 }}>
        {[{id:"subscription",label:"Subscription"},{id:"usage",label:"AI Usage & Limits"},{id:"security",label:"Security"}].map(t=>(
          <div key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"8px 18px",cursor:"pointer",fontSize:12,fontWeight:500,color:tab===t.id?C.accent:C.textMuted,borderBottom:`2px solid ${tab===t.id?C.accent:"transparent"}`,transition:"all .2s",marginBottom:-1 }}>{t.label}</div>
        ))}
      </div>

      {tab==="subscription" && (
        <div className="fi">
          {/* Current plan detail */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18 }}>
            <div className="mc" style={{ borderColor:subStatus==="active"?tier.color:C.gold }}>
              <div className="sl">Active Plan</div>
              <div className="df" style={{ fontSize:22,color:subStatus==="active"?tier.color:C.gold,fontWeight:300,marginBottom:6 }}>{tier.label}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                {[
                  {l:"Status",      v:subStatus==="active"?"Active":"Suspended", c:subStatus==="active"?C.accent:C.gold},
                  {l:"Billing",     v:tier.billing||"One-time",                   c:C.text},
                  {l:"AI Analyses", v:AI_CAPS[currentTier]>=999?"Unlimited":`${AI_CAPS[currentTier]}/day`, c:C.accent},
                  {l:"Next billing",v:currentTier==="lifetime"?"Never":"23 Mar 2026", c:C.textMuted},
                ].map(r=>(
                  <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:12,color:C.textMuted }}>{r.l}</span>
                    <span className="mn" style={{ fontSize:12,color:r.c }}>{r.v}</span>
                  </div>
                ))}
              </div>
              {/* Downgrade/lapse rules — shown when active */}
              {subStatus==="active" && currentTier!=="free" && currentTier!=="lifetime" && (
                <div style={{ marginTop:12,padding:"10px 12px",background:"rgba(13,16,24,.6)",borderRadius:5,border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6 }}>Downgrade policy</div>
                  <div style={{ fontSize:11,color:C.textMuted,lineHeight:1.8 }}>Journal becomes read-only. Coach history preserved. No data deleted. Takes effect end of billing period.</div>
                </div>
              )}
            </div>
            <div className="mc">
              <div className="sl">Tier Simulator <span style={{ fontSize:10,color:C.textDim,fontWeight:400,textTransform:"none",letterSpacing:0 }}>(demo — change access level)</span></div>
              <div style={{ fontSize:12,color:C.textMuted,marginBottom:12 }}>Switch tier to preview access gates across the platform.</div>
              {Object.values(TIERS).map(t=>(
                <div key={t.id} onClick={()=>{setTier(t.id);if(t.id==="free"||t.id==="lifetime")setSubStatus("active");}} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background=C.surfaceAlt}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <div style={{ width:7,height:7,borderRadius:"50%",background:t.color }}/>
                    <span style={{ fontSize:12,color:currentTier===t.id?t.color:C.textMuted,fontWeight:currentTier===t.id?600:400 }}>{t.label}</span>
                  </div>
                  <span style={{ fontSize:11,color:t.color }}>{t.price}{t.billing}</span>
                </div>
              ))}

              {/* Subscription status toggle for demo */}
              <div style={{ marginTop:14,paddingTop:12,borderTop:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10,color:C.textDim,letterSpacing:".08em",textTransform:"uppercase",marginBottom:8 }}>Simulate Subscription State</div>
                <div style={{ display:"flex",gap:8 }}>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="active"?C.accent:C.border,color:subStatus==="active"?C.accent:C.textMuted }} onClick={()=>setSubStatus("active")}>Active</button>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="expired"?C.gold:C.border,color:subStatus==="expired"?C.gold:C.textMuted }} onClick={()=>setSubStatus("expired")}>Lapsed</button>
                  <button className="btn bg" style={{ flex:1,fontSize:11,padding:"7px 0",borderColor:subStatus==="cancelled"?C.pink:C.border,color:subStatus==="cancelled"?C.pink:C.textMuted }} onClick={()=>setSubStatus("cancelled")}>Cancelled</button>
                </div>
                <div style={{ fontSize:11,color:C.textDim,marginTop:8,lineHeight:1.7 }}>
                  {subStatus==="expired"&&"Subscription lapsed. Premium features frozen. Data preserved. Reactivate to restore access."}
                  {subStatus==="cancelled"&&"Subscription cancelled. Access ends at period close. Data preserved for 30 days post-expiry."}
                  {subStatus==="active"&&"Subscription active. All tier-appropriate features accessible."}
                </div>
              </div>
            </div>
          </div>
          <button className="btn bp" style={{ width:"100%" }} onClick={()=>setPage("pricing")}>View All Plans & Upgrade</button>
        </div>
      )}

      {tab==="usage" && (
        <div className="fi">
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:18 }}>
            {[{l:"Chart Analyses Today",v:`${aiUsed}/${AI_CAPS[currentTier]>=999?"∞":AI_CAPS[currentTier]}`,c:C.accent},{l:"Coach Sessions",v:"3 this month",c:C.accent},{l:"Journal Imports",v:currentTier==="65"||currentTier==="95"||currentTier==="lifetime"?"Unlimited":"N/A",c:C.textMuted}].map(m=>(
              <div key={m.l} className="mc" style={{ textAlign:"center" }}>
                <div className="sl" style={{ textAlign:"center" }}>{m.l}</div>
                <div className="mn" style={{ fontSize:20,color:m.c }}>{m.v}</div>
              </div>
            ))}
          </div>
          <div className="sl">Daily AI Caps by Tier</div>
          <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
            <table>
              <thead><tr><th>Tier</th><th>Chart Analysis</th><th>Journal AI</th><th>Coach Messages</th><th>Caching</th></tr></thead>
              <tbody>
                {[
                  {t:"Free",          chart:"0",    journal:"—",       coach:"—",         cache:"N/A"},
                  {t:"Fortitude",     chart:"5/day",journal:"—",       coach:"—",         cache:"Yes"},
                  {t:"Fortitude Pro", chart:"10/day",journal:"Batch",  coach:"20/session",cache:"Yes"},
                  {t:"Full Access",   chart:"∞ (fair-use)",journal:"∞",coach:"∞",          cache:"Yes"},
                  {t:"Lifetime",      chart:"∞ (fair-use)",journal:"∞",coach:"∞",          cache:"Yes"},
                ].map((r,i)=>(
                  <tr key={i}><td style={{ fontWeight:currentTier===Object.keys(TIERS)[i]?600:400,color:Object.values(TIERS)[i].color }}>{r.t}</td><td className="mn" style={{ fontSize:12 }}>{r.chart}</td><td className="mn" style={{ fontSize:12 }}>{r.journal}</td><td className="mn" style={{ fontSize:12 }}>{r.coach}</td><td className="mn" style={{ fontSize:12,color:C.accent }}>{r.cache}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:14,padding:"12px 16px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
            <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>AI cost protection: Identical chart submissions within 24h return cached analysis. Background behavioral metric recalculation is batched every 30 minutes. Fair-use cap applies to unlimited tiers at 50 chart analyses/24h.</div>
          </div>
        </div>
      )}

      {tab==="security" && (
        <div className="fi">
          <div className="mc" style={{ marginBottom:14 }}>
            <div className="sl">Account Credentials</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
              <div><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>Email Address</label><input className="inp" defaultValue="j.harrison@email.com"/></div>
              <div><label style={{ fontSize:10,color:C.textDim,display:"block",marginBottom:6,letterSpacing:".08em",textTransform:"uppercase" }}>New Password</label><input className="inp" type="password" placeholder="••••••••"/></div>
            </div>
            <div style={{ marginTop:14 }}><button className="btn bp">Save Changes</button></div>
          </div>
          <div className="mc">
            <div className="sl">Data & Privacy</div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {["Journal data is stored server-side and never shared with third parties.","Downgrading preserves all data in read-only format.","Account deletion removes all data permanently after 30-day grace period.","AI analysis inputs are not used for model training."].map((t,i)=>(
                <div key={i} style={{ display:"flex",gap:10,alignItems:"flex-start" }}>
                  <IC n="check" s={11} c={C.accent}/>
                  <span style={{ fontSize:12,color:C.textMuted,lineHeight:1.7 }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop:14 }}><button className="btn bg" style={{ borderColor:C.pinkDim,color:C.pink,fontSize:11 }}>Request Account Deletion</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Admin Page ────────────────────────────────────────────────────────────────
const Admin = ({ setPage }) => {
  const TIER_DIST = [{t:"Free",v:142,c:C.textMuted},{t:"Fortitude $45",v:78,c:C.accent},{t:"Pro $65",v:43,c:C.pink},{t:"Full $95",v:17,c:C.gold},{t:"Lifetime",v:4,c:C.pink}];
  const total = TIER_DIST.reduce((a,t)=>a+t.v,0);
  return (
    <div className="fi">
      <div style={{ marginBottom:22 }}>
        <h1 className="df" style={{ fontSize:28,fontWeight:300,marginBottom:6 }}>Administration</h1>
        <p style={{ color:C.textMuted,fontSize:13 }}>Platform management, subscription oversight, and AI cost controls.</p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:18 }}>
        {[{l:"Total Members",v:"284",s:"+12 this month",c:C.accent},{l:"Active Subscriptions",v:"142",s:"50% conversion",c:C.accent},{l:"MRR",v:"$9,840",s:"+$420 this month",c:C.gold},{l:"AI Calls Today",v:"347",s:"Within budget",c:C.accent},{l:"Flagged",v:"3",s:"Requires review",c:C.pink}].map(m=>(
          <div key={m.l} className="mc" style={{ borderColor:m.c==="C.pink"?C.pinkDim:undefined }}>
            <div className="sl">{m.l}</div>
            <div className="df" style={{ fontSize:24,color:m.c,fontWeight:400 }}>{m.v}</div>
            <div style={{ fontSize:11,color:C.textDim,marginTop:2 }}>{m.s}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18 }}>
        {/* Tier distribution */}
        <div className="mc">
          <div className="sl">Subscription Distribution</div>
          {TIER_DIST.map(t=>(
            <div key={t.t} style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
              <span style={{ fontSize:12,color:C.textMuted,width:100,flexShrink:0 }}>{t.t}</span>
              <div style={{ flex:1,height:6,borderRadius:3,background:C.border,overflow:"hidden" }}>
                <div style={{ width:`${(t.v/total)*100}%`,height:"100%",borderRadius:3,background:t.c,transition:"width .8s ease" }}/>
              </div>
              <span className="mn" style={{ fontSize:11,color:t.c,width:28,textAlign:"right" }}>{t.v}</span>
            </div>
          ))}
        </div>

        {/* AI cost controls */}
        <div className="mc">
          <div className="sl">AI Cost Protection Layer</div>
          {[
            {l:"Free tier",       cap:"Blocked",    used:"0",    c:C.textDim},
            {l:"Fortitude $45",   cap:"5/day",      used:"312",  c:C.accent},
            {l:"Fortitude Pro",   cap:"10/day",     used:"287",  c:C.pink},
            {l:"Full Access",     cap:"Fair-use",   used:"48",   c:C.gold},
            {l:"Cache hit rate",  cap:"—",          used:"34%",  c:C.accent},
          ].map(r=>(
            <div key={r.l} style={{ display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:12,color:C.textMuted }}>{r.l}</span>
              <div style={{ display:"flex",gap:16 }}>
                <span style={{ fontSize:11,color:C.textDim }}>{r.cap}</span>
                <span className="mn" style={{ fontSize:11,color:r.c }}>{r.used}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:18 }}>
        <div>
          <div className="sl">Post Market Update</div>
          <div className="mc">
            <input className="inp" placeholder="Update title..." style={{ marginBottom:10 }}/>
            <textarea className="inp" placeholder="Market update content..." style={{ minHeight:70,resize:"vertical",fontFamily:"inherit",marginBottom:10 }}/>
            <button className="btn bp">Publish Update</button>
          </div>
        </div>
        <div>
          <div className="sl">Access Gate Override</div>
          <div className="mc">
            <div style={{ fontSize:12,color:C.textMuted,marginBottom:12 }}>Manual subscription override for specific users. Server-side enforcement applies regardless.</div>
            <input className="inp" placeholder="User email..." style={{ marginBottom:10 }}/>
            <select className="inp" style={{ marginBottom:10 }}>
              {Object.values(TIERS).map(t=><option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
            <button className="btn bg" style={{ width:"100%" }}>Apply Override</button>
          </div>
        </div>
      </div>

      <div className="sl">Recent Activity</div>
      <div style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden",backdropFilter:"blur(8px)" }}>
        <table>
          <thead><tr><th>User</th><th>Event</th><th>Tier</th><th>Time</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {[
              {u:"T.Adeyemi",  e:"Chart upload",    t:"45",  time:"09:12",s:"Analysed",tc:"ta"},
              {u:"K.Morrow",   e:"Coach session",   t:"65",  time:"09:28",s:"Complete", tc:"ta"},
              {u:"J.Ashford",  e:"Chart upload",    t:"45",  time:"10:01",s:"Flagged",  tc:"td"},
              {u:"M.Okafor",   e:"Tier upgrade",    t:"95",  time:"10:44",s:"$45→$95",  tc:"tg2"},
              {u:"P.Nkosi",    e:"Journal import",  t:"65",  time:"11:02",s:"Complete", tc:"ta"},
            ].map((r,i)=>(
              <tr key={i}>
                <td>{r.u}</td>
                <td style={{ color:C.text }}>{r.e}</td>
                <td><span className="tg ta" style={{ fontSize:9 }}>{TIERS[r.t]?.label||r.t}</span></td>
                <td className="mn" style={{ fontSize:11 }}>{r.time}</td>
                <td><span className={`tg ${r.tc}`}>{r.s}</span></td>
                <td><div style={{ display:"flex",gap:6 }}>
                  <button className="btn bg" style={{ padding:"3px 10px",fontSize:11 }}>View</button>
                  <button className="btn bg" style={{ padding:"3px 10px",fontSize:11,borderColor:C.pinkDim,color:C.pink }}>Flag</button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Database schema reference */}
      <div style={{ marginTop:24 }}>
        <div className="sl">Database Schema Reference</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10 }}>
          {[
            { table:"users", fields:["id (uuid)","email","password_hash","role (user/admin)","membership_tier","subscription_status","created_at","updated_at"] },
            { table:"subscriptions", fields:["id","user_id","tier","stripe_subscription_id","start_date","end_date","status (active/cancelled/expired)"] },
            { table:"one_time_purchases", fields:["id","user_id","product_type (course/workshop/mentorship/lifetime)","payment_id","purchase_date","active (boolean)"] },
            { table:"trades", fields:["id","user_id","instrument","direction","entry/exit_price","lot_size","net_pl","r_multiple","open_time","close_time","session_tag"] },
            { table:"performance_metrics", fields:["user_id","win_rate","expectancy","profit_factor","risk_consistency_score","revenge_score","fatigue_score","discipline_index","updated_at"] },
            { table:"ai_analysis_history", fields:["id","user_id","type (chart/journal/coach)","input_reference","output_text","created_at"] },
          ].map(s=>(
            <div key={s.table} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${C.border}`,borderRadius:6,padding:14,backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:10,fontWeight:700,color:C.accent,letterSpacing:".1em",textTransform:"uppercase",marginBottom:10,fontFamily:"JetBrains Mono" }}>{s.table}</div>
              {s.fields.map(f=>(
                <div key={f} style={{ fontSize:11,color:C.textMuted,fontFamily:"JetBrains Mono",padding:"3px 0",borderBottom:`1px solid ${C.border}` }}>{f}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Backend enforcement rules */}
      <div style={{ marginTop:20 }}>
        <div className="sl">Backend Enforcement Rules</div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
          {[
            { tier:"Free",         color:C.textMuted, rules:["Block /api/journal endpoints","Block /api/ai/chart","Block /api/coach","Allow /api/education","Allow /api/auth"] },
            { tier:"$45 Fortitude",color:C.accent,    rules:["Allow /api/intelligence (5/day cap)","Block /api/journal","Block /api/coach","Allow /api/community","Stripe subscription validation on each request"] },
            { tier:"$65 Pro",      color:C.pink,   rules:["Allow /api/journal","Allow /api/coach","Allow /api/behavioral","AI cap: 10/day","Cache identical chart submissions 24h"] },
            { tier:"$95 / Lifetime",color:C.gold,     rules:["All endpoints unlocked","Fair-use cap: 50 chart analyses/24h","Background behavioral batching every 30min","Lifetime: bypass subscription validation entirely"] },
          ].map(r=>(
            <div key={r.tier} style={{ background:"rgba(13,16,24,.82)",border:`1px solid ${r.color}40`,borderRadius:6,padding:14,backdropFilter:"blur(8px)" }}>
              <div style={{ fontSize:11,fontWeight:600,color:r.color,letterSpacing:".06em",textTransform:"uppercase",marginBottom:10 }}>{r.tier}</div>
              {r.rules.map((rule,i)=>(
                <div key={i} style={{ display:"flex",gap:8,padding:"4px 0",borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ color:r.color,fontSize:10,marginTop:2 }}>›</span>
                  <span style={{ fontSize:11,color:C.textMuted,fontFamily:"JetBrains Mono" }}>{rule}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop:10,padding:"12px 16px",background:"rgba(13,16,24,.6)",border:`1px solid ${C.border}`,borderRadius:6 }}>
          <div style={{ fontSize:11,color:C.textDim,lineHeight:1.9 }}>
            <strong style={{ color:C.text }}>Enforcement principles:</strong> Server-side only — never rely on frontend gating as the sole control. Stripe webhooks validate subscription status on every premium API call. Downgrade takes effect end of billing period; features enter read-only state, no data deleted. Lifetime purchases bypass all subscription_status checks.
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP SHELL — subscription state + access enforcement
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [authed,    setAuthed]    = useState(false);
  const [page,      setPage]      = useState("dashboard");
  const [tier,      setTier]      = useState("free");
  const [aiUsed,    setAiUsed]    = useState(0);
  const [subStatus, setSubStatus] = useState("inactive");
  const [token,     setToken]     = useState(null);

  // ── Restore session on load ──────────────────────────────────────────────
  useEffect(() => {
    const savedToken = localStorage.getItem("fis_token");
    const savedUser  = localStorage.getItem("fis_user");
    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setToken(savedToken);
        setTier(mapTier(user.membership_tier));
        setSubStatus(user.subscription_status === "active" || user.subscription_status === "trial" ? "active" : "inactive");
        setAuthed(true);
        // Refresh access from API
        api.get("/membership/access", savedToken).then(data => {
          if (data.success) {
            setTier(mapTier(data.data.tier));
            setSubStatus(data.data.subscriptionStatus === "active" || data.data.subscriptionStatus === "trial" ? "active" : "inactive");
            setAiUsed(data.data.ai?.used || 0);
          }
        }).catch(() => {});
      } catch (e) {
        localStorage.removeItem("fis_token");
        localStorage.removeItem("fis_user");
      }
    }
  }, []);

  const handleLogin = ({ token: t, user }) => {
    setToken(t);
    setTier(mapTier(user.membership_tier));
    setSubStatus(user.subscription_status === "active" || user.subscription_status === "trial" ? "active" : "inactive");
    setAuthed(true);
    // Fetch full access details
    api.get("/membership/access", t).then(data => {
      if (data.success) {
        setTier(mapTier(data.data.tier));
        setSubStatus(data.data.subscriptionStatus === "active" || data.data.subscriptionStatus === "trial" ? "active" : "inactive");
        setAiUsed(data.data.ai?.used || 0);
      }
    }).catch(() => {});
  };

  const handleLogout = () => {
    if (token) api.post("/auth/logout", {}, token).catch(() => {});
    localStorage.removeItem("fis_token");
    localStorage.removeItem("fis_user");
    setAuthed(false);
    setToken(null);
    setTier("free");
    setSubStatus("inactive");
    setPage("dashboard");
  };

  const NAV = [
    { id:"dashboard",   label:"Dashboard",              icon:"dashboard" },
    { id:"intelligence",label:"Market Intelligence",    icon:"intel" },
    { id:"journal",     label:"Performance Journal",    icon:"journal" },
    { id:"behavioral",  label:"Behavioral Intelligence",icon:"brain" },
    { id:"cognitive",   label:"Cognitive Intelligence", icon:"zap" },
    { id:"coach",       label:"Performance Coach",      icon:"coach" },
    { id:"education",   label:"Education",              icon:"edu" },
    { id:"community",   label:"Community",              icon:"comm" },
    { id:"pricing",     label:"Membership",             icon:"shield" },
    { id:"account",     label:"Account",                icon:"acct" },
    { id:"admin",       label:"Admin",                  icon:"admin" },
  ];

  const PAGES = {
    dashboard:   Dashboard,
    intelligence:Intelligence,
    journal:     Journal,
    behavioral:  BehavioralEngine,
    cognitive:   CognitiveIntelligence,
    coach:       Coach,
    education:   Education,
    community:   Community,
    pricing:     Pricing,
    account:     Account,
    admin:       Admin,
  };

  // ── Access enforcement per spec ──────────────────────────────────────────────
  // Rules:
  // 1. Lifetime overrides everything — always granted
  // 2. Free tier — only free-flagged features accessible
  // 3. Active subscription — access per tier matrix
  // 4. Expired/cancelled subscription — premium features frozen (read-only where data exists)
  // 5. Never delete user data on downgrade
  // 6. Account + pricing + education always accessible
  const ALWAYS_OPEN = new Set(["account","pricing","education"]);

  const renderPage = () => {
    // Admin is gated to admin role (production: server-side role check)
    if (page === "admin") {
      if (tier === "admin") {
        return <Admin setPage={setPage}/>;
      }
      return <GateWall feature="admin" currentTier={tier} setPage={setPage}/>;
    }
    // Always-accessible pages
    if (ALWAYS_OPEN.has(page)) {
      const P = PAGES[page];
      if (!P) return null;
      return <P currentTier={tier} setTier={setTier} setPage={setPage} aiUsed={aiUsed} subStatus={subStatus} setSubStatus={setSubStatus} onUpgrade={t=>{setTier(t);setSubStatus("active");}}/>;
    }
    // Lifetime bypasses all subscription validation
    if (tier === "lifetime") {
      const P = PAGES[page] || Dashboard;
      return <P setPage={setPage} currentTier={tier} aiUsed={aiUsed}/>;
    }
    // Expired subscription — data preserved, access frozen
    // Journal, coach, behavioral, cognitive: show read-only gate (data preserved message)
    // Other paid features: show reactivation gate
    if (subStatus !== "active" && tier !== "free") {
      const dataPreserved = new Set(["journal","behavioral","cognitive","coach"]);
      return <GateWall feature={page} currentTier={tier} setPage={setPage} readOnly={true} hasData={dataPreserved.has(page)}/>;
    }
    // Standard tier-based access check
    const rule = ACCESS[page];
    if (rule !== undefined) {
      const granted = canAccess(tier, page);
      if (!granted) {
        return <GateWall feature={page} currentTier={tier} setPage={setPage} readOnly={false}/>;
      }
    }
    const P = PAGES[page] || Dashboard;
    return <P setPage={setPage} currentTier={tier} aiUsed={aiUsed}/>;
  };

  if (!authed) return <><style>{STYLES}</style><Login onLogin={handleLogin}/></>;

  const currentTierMeta = TIERS[tier] || TIERS[tier] || TIERS["free"];

  return (
    <>
      <style>{STYLES}</style>
      <div style={{ display:"flex",minHeight:"100vh",position:"relative" }}>
        <BgSVG/>
        <div style={{ position:"fixed",inset:0,background:"rgba(6,8,16,.84)",zIndex:0,pointerEvents:"none" }}/>

        {/* Sidebar */}
        <div style={{ width:240,background:"rgba(10,13,20,.93)",borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",padding:"22px 10px",flexShrink:0,position:"sticky",top:0,height:"100vh",overflowY:"auto",zIndex:2,backdropFilter:"blur(16px)" }}>
          <div style={{ padding:"0 8px 20px",borderBottom:`1px solid ${C.border}`,marginBottom:16 }}>
            <div className="df" style={{ fontSize:22,fontWeight:300,letterSpacing:".08em",background:`linear-gradient(90deg,${C.accent} 55%,${C.pink})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>FORTITUDE</div>
            <div style={{ fontSize:9,color:C.textDim,letterSpacing:".16em",textTransform:"uppercase",marginTop:2 }}>Performance Operating System</div>
          </div>

          <nav style={{ flex:1,display:"flex",flexDirection:"column",gap:1 }}>
            {NAV.map(n => {
              const access = ACCESS[n.id];
              const granted = access === undefined || canAccess(tier, n.id);
              const isActive = page === n.id;
              return (
                <div key={n.id}
                  className={`ni${isActive?" ac":""}`}
                  style={{ opacity: granted ? 1 : 0.42, position:"relative" }}
                  onClick={()=>setPage(n.id)}>
                  <IC n={n.icon} s={14}/>
                  <span style={{ flex:1 }}>{n.label}</span>
                  {!granted && <IC n="lock" s={10} c={C.textDim}/>}
                  {n.id==="behavioral" && tier==="free" && null}
                </div>
              );
            })}
          </nav>

          {/* Tier badge + user */}
          <div style={{ paddingTop:12,borderTop:`1px solid ${C.border}` }}>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8,padding:"6px 8px",background:`${currentTierMeta.color}10`,borderRadius:5,border:`1px solid ${currentTierMeta.color}30` }}>
              <div style={{ width:6,height:6,borderRadius:"50%",background:currentTierMeta.color }}/>
              <span style={{ fontSize:11,color:currentTierMeta.color,fontWeight:600 }}>{currentTierMeta.label}</span>
              {AI_CAPS[tier]<999 && <span className="mn" style={{ fontSize:10,color:C.textDim,marginLeft:"auto" }}>{aiUsed}/{AI_CAPS[tier]} AI</span>}
            </div>
            <div style={{ display:"flex",alignItems:"center",gap:9 }}>
              <div style={{ width:28,height:28,borderRadius:"50%",background:C.accentGlow,border:`1px solid ${C.accentDim}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <span className="df" style={{ fontSize:13,color:C.accent }}>J</span>
              </div>
              <div>
                <div style={{ fontSize:12,color:C.text,fontWeight:500 }}>J. Harrison</div>
                <div style={{ fontSize:10,color:C.textDim }}>j.harrison@email.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main style={{ flex:1,padding:32,overflowY:"auto",position:"relative",zIndex:1,maxWidth:1080 }}>
          {/* AI usage bar — shown on intelligence page */}
          {page==="intelligence" && canAccess(tier,"intelligence") && (
            <div style={{ marginBottom:16 }}>
              <AIUsageMeter tier={tier} used={aiUsed} setPage={setPage}/>
            </div>
          )}
          {renderPage()}
        </main>
      </div>
    </>
  );
}
