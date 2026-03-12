import { useState, useEffect, useRef } from "react";

const ACCENT = "#D6336C";
const ACCENT_BG = "#FDF2F8";
const BG = "#FAFAF9";
const TEXT = "#1A1A1A";
const TEXT_SECONDARY = "#4B5563";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const CARD_BG = "#FFFFFF";

const SECTIONS = [
  { id: "exec", label: "Executive Summary", num: "01" },
  { id: "context", label: "Country Context", num: "02" },
  { id: "landscape", label: "Market Landscape", num: "03" },
  { id: "trends", label: "Industry Trends", num: "04" },
  { id: "competitors", label: "Competitive Analysis", num: "05" },
  { id: "consumer", label: "Consumer Insights", num: "06" },
  { id: "comms", label: "Communication Landscape", num: "07" },
  { id: "islamic", label: "Islamic Finance Deep Dive", num: "08" },
  { id: "appendix", label: "Appendices & Materials", num: "09" },
];

const SOURCES = {
  1: { short: "Fintechnews MY 2026", full: "Fintechnews Malaysia: Digital Banks & Fintech Landscape 2026" },
  2: { short: "McKinsey Digital MY", full: "McKinsey & Company: Southeast Asia Digital Banking Revolution \u2014 Malaysia Deep Dive" },
  3: { short: "FAOM Report 2025", full: "Fintech Association of Malaysia (FAOM): Ecosystem & Adoption Report 2025" },
  4: { short: "Ken Research MY", full: "Ken Research: Malaysia Digital Banking Market Outlook 2030" },
  5: { short: "BNM Annual 2024", full: "Bank Negara Malaysia: Annual Report 2024" },
  6: { short: "DataReportal MY 2026", full: "DataReportal/Meltwater: Digital 2026 Malaysia Country Report" },
  7: { short: "GXBank Reports", full: "GXBank Berhad: Annual Impact & Product Reports 2024\u20132025" },
  8: { short: "Boost Bank Updates", full: "Boost Bank Berhad: Product Announcements & Press Releases 2025" },
  9: { short: "NIQ Consumer 2026", full: "NIQ (NielsenIQ) Consumer Outlook 2026 Global" },
  10: { short: "Dentsu MY 2026", full: "Dentsu Malaysia: Consumer Trends & Media Report 2026" },
  11: { short: "BNM Digital Bank Policy", full: "Bank Negara Malaysia: Policy Document on Licensing Framework for Digital Banks (2020)" },
  12: { short: "BNM IFSA 2013", full: "Islamic Financial Services Act 2013 (IFSA) \u2014 Malaysia" },
  13: { short: "TNG Digital Report", full: "TNG Digital: Annual Performance & User Impact Report 2025" },
  14: { short: "MIFC Annual 2025", full: "Malaysia International Islamic Finance Centre (MIFC): Islamic Finance Malaysia Report 2025" },
  15: { short: "Capgemini 2025", full: "Capgemini: What Matters to Today's Consumer 2025" },
  16: { short: "Deloitte Global 2025", full: "Deloitte: Global Consumer Trends 2025" },
  17: { short: "World Bank MY", full: "World Bank: Malaysia Financial Inclusion & Findex Data 2024" },
  18: { short: "PwC MY 2025", full: "PwC Malaysia: FinTech & Digital Banking Survey 2025" },
  19: { short: "We Are Social MY", full: "We Are Social: Malaysian Social Media Statistics 2025" },
  20: { short: "Meltwater MY 2026", full: "Meltwater: Digital Media & Social Landscape Malaysia 2026" },
  21: { short: "TNG 20M Users", full: "The Star: TNG Digital Surpasses 20 Million Users, March 2025" },
  22: { short: "GXBank Milestone", full: "Fintechnews Malaysia: GXBank Reaches 1 Million Users, September 2024" },
  23: { short: "BNM Open Finance", full: "Bank Negara Malaysia: Open Banking Roadmap & API Framework 2024" },
  24: { short: "BNM Crypto Policy", full: "BNM Policy on Digital Assets & Virtual Currency Licensing 2024" },
  25: { short: "ISRA MY", full: "ISRA International Centre for Education in Islamic Finance: Malaysia Islamic Finance Research" },
  26: { short: "BNM Takaful Reg", full: "BNM: Takaful Operational Framework & Regulations 2024" },
  27: { short: "BNM AEON Bank Launch", full: "BNM Press Release: AEON Bank Begins Operations as Malaysia's First Islamic Digital Bank, March 2024" },
  28: { short: "Bank Islam Annual 2024", full: "Bank Islam Malaysia Berhad: Integrated Annual Report 2024" },
  29: { short: "ADB Islamic MY", full: "Asian Development Bank: Islamic Finance in Malaysia \u2014 Policy Environment & Market Analysis" },
  30: { short: "MIFC Stats Q4 2025", full: "MIFC: Islamic Finance Statistical Dashboard Q4 2025" },
  31: { short: "BNM FSR 2024", full: "Bank Negara Malaysia: Financial Stability Review 2024" },
  32: { short: "DOSM 2025", full: "Department of Statistics Malaysia: Population & Demographic Statistics 2025" },
  33: { short: "PwC MY Fintech", full: "PwC Malaysia: FinTech & Digital Banking Benchmarking Study 2025" },
  34: { short: "Statista MY Pay", full: "Statista: Digital Payments Malaysia 2025 \u2014 Market Size & Forecasts" },
  35: { short: "Google-Temasek SEA 2025", full: "Google-Temasek-Bain: e-Conomy SEA 2025 Report" },
  36: { short: "World Bank Findex MY", full: "World Bank Global Findex Database: Malaysia 2024 Update" },
  37: { short: "IMF MY Article IV", full: "IMF Article IV Consultation: Malaysia 2025" },
  38: { short: "DOSM Demographics", full: "DOSM: 2025 Malaysia Population by Ethnicity, Age & Religion" },
  39: { short: "GSMA Mobile MY", full: "GSMA: The Mobile Economy Asia Pacific 2025 \u2014 Malaysia Country Spotlight" },
  40: { short: "PayNet Annual 2024", full: "PayNet: Annual Report 2024 \u2014 DuitNow, FPX, JomPAY Statistics" },
  41: { short: "GXBank Investor H2", full: "GXBank: Growth Update & Investor Communication H2 2025" },
  42: { short: "Boost Bank Press", full: "Boost Bank: Press Releases & Product Launch Communications 2024\u20132025" },
  43: { short: "BigPay Blog 2025", full: "BigPay: Company Blog, Product Announcements & User Reports 2025" },
  44: { short: "Maybank Annual 2024", full: "Maybank: 2024 Annual Report" },
  45: { short: "CIMB Annual 2024", full: "CIMB Group: 2024 Annual Report" },
  46: { short: "We Are Social MY 2026", full: "We Are Social x Meltwater: Digital 2026 Malaysia Full Country Report" },
  47: { short: "Kantar BrandZ MY", full: "Kantar BrandZ: Most Valuable Malaysian Brands 2025" },
  48: { short: "BNM Consumer 2024", full: "BNM: Consumer & Market Conduct Annual Report 2024" },
  49: { short: "SME Corp MY", full: "SME Corporation Malaysia: SME Annual Report 2024" },
  50: { short: "MDEC Digital 2025", full: "Malaysia Digital Economy Corporation (MDEC): Digital Economy Blueprint Update 2025" },
  51: { short: "PayNet Stats 2025", full: "PayNet: Malaysian Payments Landscape Statistics & Annual Summary 2025" },
  52: { short: "Star/NST Fintech", full: "The Star & New Straits Times: Malaysian Fintech & Digital Banking Coverage Archive 2024\u20132025" },
  53: { short: "Nielsen MY Media", full: "Nielsen Malaysia: TV & Digital Audience Measurement Report 2025" },
  54: { short: "Meta MY Insights", full: "Meta for Business: Malaysia Advertising & Audience Insights Q4 2025" },
  55: { short: "Euromonitor MY", full: "Euromonitor International: Financial Services Malaysia 2025" },
  56: { short: "Tabung Haji Report", full: "Lembaga Tabung Haji: Annual Report 2024" },
  57: { short: "AEON Bank Annual", full: "AEON Bank Berhad: First Annual Report & Shariah Compliance Statement 2024" },
  58: { short: "YTL Digital", full: "YTL Digital Capital Berhad: Company Profile, Licensing & Progress Update 2025" },
  59: { short: "UnaFinancial SEA", full: "UnaFinancial: Southeast Asia Fintech Study March 2025" },
  60: { short: "Visa MY Consumer", full: "Visa Consumer Payment Attitudes Study Malaysia 2024" },
  61: { short: "TransUnion MY", full: "TransUnion: Malaysia Consumer Credit & Fintech Landscape Report 2024" },
  62: { short: "PDRM Scam Data", full: "Royal Malaysia Police (PDRM): Commercial Crime Statistics & Fraud Report 2024" },
  63: { short: "Ipsos MY Digital", full: "Ipsos Malaysia: Digital Consumer Behaviour & Financial Attitudes Study 2024" },
  64: { short: "MDEC MSME Digital", full: "MDEC: SME Digitalisation Initiative Impact & Adoption Report 2025" },
  65: { short: "BNM Remittance 2024", full: "BNM: Inward & Outward Remittance Statistics 2024" },
  66: { short: "CIMB Multicultural", full: "CIMB Foundation: Multi-Ethnic Financial Attitudes & Behaviours in Malaysia 2024" },
  67: { short: "BNM Digital Banks Q3", full: "BNM: Digital Banks Combined Deposit & Performance Data Q3 2025" },
};

const Ref = ({ n }) => (
  <sup style={{ fontSize: 9, color: ACCENT, cursor: "help", fontWeight: 600, marginLeft: 1 }} title={SOURCES[n]?.full || ""}>[{n}]</sup>
);

const COMPETITORS = [
  {
    name: "Touch 'n Go eWallet", type: "Super Wallet / E-Wallet", users: "20M+", founded: "2017 (digital); TNG card from 1997", funding: "TNG Digital (Ant Group strategic partner + Capital A / AirAsia Group)",
    website: "tngdigital.com.my",
    positioning: "Malaysia's dominant super wallet \u2014 the nation's financial nervous system. What began as a highway toll card has evolved into an all-purpose payments, investments, and lifestyle platform used by 60%+ of Malaysian adults.",
    products: "QR merchant payments (DuitNow QR), P2P transfers, GoPlus+ savings (6.88% p.a.), GoInvest (unit trusts), GoInsure, GoProtect, GoXchange (multi-currency), Tabung (goal savings), DuitNow cross-border, RFID highway toll, transit fare, JomPAY bills",
    ux: "Signature teal (#00C2BD) and green gradient. Super-app architecture with tabs for Payments, Rewards, Finance, and Lifestyle. GoPlus+ savings UX is clean and compelling.",
    strength: "20M+ registered users in a 33.4M population is near-total adult penetration. DuitNow QR integration means acceptance is universal. Highway RFID means 7M+ vehicles are TNG-linked.",
    weakness: "Not a licensed bank \u2014 operates under BNM e-money licence. Ant Group partnership creates geopolitical sensitivity. Super-app feature accumulation is cluttering UX.",
    visualLang: "Teal (#00C2BD) and white. Multi-ethnic Malaysian photography (highways, hawker centres, LRT stations). The iconic TNG wave mark carries 25 years of recognition.",
    recentComms: "GoPlus+ savings rate campaigns across TV, digital OOH, and social. DuitNow cross-border Malaysia-Singapore launch. Hari Raya 'Duit Raya Digital' campaign. Chinese New Year digital ang pow activation.",
    logo: "TNG teal wordmark + wave chip icon", matrixX: 45, matrixY: 90, matrixR: 26, matrixC: "#0D9488",
  },
  {
    name: "GXBank", type: "Digital Bank (BNM-Licensed, Conventional)", users: "~1M+ (est.)", founded: "2022 (licensed), July 2023 (launched)", funding: "Grab Holdings (60%) + Kuok Brothers Sdn Bhd (40%)",
    website: "gxbank.com.my",
    positioning: "Malaysia's first digital bank with the most defensible ecosystem advantage. GXBank's thesis: Grab's 10M+ Malaysian users generate millions of gig economy transactions daily. By embedding banking inside Grab, GXBank acquires customers at near-zero CAC.",
    products: "High-yield savings (4.02% p.a.), personal loans (ML-powered, up to RM100K), DuitNow transfers, GX Rewards, micro-financing for Grab driver-partners, GrabFood merchant business accounts, contactless debit card",
    ux: "Grab green (#01A36A) adapted for banking. Embedded tab within Grab super app. Loan application to conditional approval in under 5 minutes. Clean, modern interface.",
    strength: "Grab's 10M+ Malaysian users are the most efficient digital bank distribution channel. Behavioural data from ride, food, and grocery transactions enables sophisticated credit profiling. First-mover advantage.",
    weakness: "Ecosystem dependency: growth ceiling tied to Grab's trajectory. Non-Grab users have little reason to choose GXBank. No physical touchpoints. Product breadth still narrow.",
    visualLang: "Grab green (#01A36A). Photography shows Malaysian gig economy workers, delivery riders, freelancers. Rounded, modern, approachable sans-serif typography. Multi-ethnic, urban-skewing imagery.",
    recentComms: "Malaysia's first digital bank launch campaign (Jul 2023). GX Rewards x Grab linking campaign. Personal loan awareness via TikTok creator partnerships. Hari Raya financial wellness content.",
    logo: "GXBank green wordmark within Grab ecosystem", matrixX: 62, matrixY: 50, matrixR: 16, matrixC: "#16A34A",
  },
  {
    name: "Boost Bank", type: "Digital Bank (BNM-Licensed, Conventional)", users: "Boost eWallet heritage: 10M+ users", founded: "2022 (licensed), 2023 (launched)", funding: "Axiata Digital Sdn Bhd (60%) + RHB Banking Group Berhad (40%)",
    website: "boostbank.my",
    positioning: "Banking built on Malaysia's deepest SME merchant fintech network. Boost Bank inherits Boost eWallet's decade of presence at pasar malam stalls, kedai runcit counters, and hawker centres.",
    products: "High-yield savings, DuitNow transfers, bill payments, BoostBiz merchant banking module, personal financing, SME micro-business accounts, telco-linked account benefits",
    ux: "Orange (#FF6B00) heritage from Boost eWallet. App UI is functional and SME-friendly. BoostBiz merchant account module is a genuine differentiator.",
    strength: "10M+ Boost eWallet users provide a conversion-ready base. CelcomDigi offers rural and lower-income distribution reach. RHB's banking risk infrastructure.",
    weakness: "Brand identity confusion between Boost eWallet and Boost Bank. Orange palette competes in crowded mid-market space. Slower feature launch cadence than GXBank.",
    visualLang: "Orange (#FF6B00) gradient rocketship identity. Multi-ethnic photography across SME merchant and consumer contexts. Bold, functional sans-serif. Accessible, entrepreneurial tone.",
    recentComms: "BoostBiz merchant campaign. CelcomDigi co-branded subscriber campaigns. Personal financing digital advertising. SME financial literacy content via Malay-language Facebook and YouTube.",
    logo: "Boost orange rocketship gradient wordmark", matrixX: 55, matrixY: 36, matrixR: 14, matrixC: "#EA580C",
  },
  {
    name: "AEON Bank", type: "Islamic Digital Bank (BNM-Licensed)", users: "Growing (launched March 2024)", founded: "2022 (licensed), March 2024 (launched)", funding: "AEON Credit Service (M) Berhad (70%) + MoneyLion Inc. USA (30%)",
    website: "aeonbank.my",
    positioning: "A world first: the first Islamic digital bank in Malaysia \u2014 and among the first anywhere globally. AEON Bank makes Shariah-compliant banking as frictionless as shopping at AEON Mall.",
    products: "Shariah-compliant savings (Wadiah-based), commodity murabahah personal financing, Islamic vehicle financing (Al-Ijarah), DuitNow transfers, goal-based savings (Tabung Impian), AEON loyalty integration, MoneyLion AI financial wellness tools",
    ux: "Purple (#6B21A8) \u2014 deliberately breaking Islamic banking's traditional green-gold aesthetic. Clean, modern interface that reads 'tech startup' not 'religious institution.'",
    strength: "World's first Islamic digital bank \u2014 a positioning that cannot be overtaken. AEON retail footprint provides physical presence. MoneyLion's US fintech product DNA introduces UX innovation.",
    weakness: "Islamic digital bank is a new category \u2014 consumer education burden is high. MoneyLion's US product orientation may not translate seamlessly. Competing against 40+ year incumbents.",
    visualLang: "Purple (#6B21A8) with AEON retail brand continuity. Deliberately modern \u2014 no mosque imagery, no Arabic calligraphy. Young Malaysian Muslims in contemporary contexts.",
    recentComms: "Malaysia's first Islamic digital bank launch campaign (Mar 2024). 'Bank Halal, Bank Digital' across Malay-language social. MoneyLion AI financial wellness feature campaign. AEON loyalty-linked Hari Raya cashback.",
    logo: "AEON Bank purple wordmark with Islamic geometry accent", matrixX: 58, matrixY: 22, matrixR: 12, matrixC: "#7C3AED",
  },
  {
    name: "Maybank / MAE", type: "Traditional Bank (Legacy) / Full-Service", users: "~15M customers; 10M+ MAE app users", founded: "1960", funding: "Public listed (Bursa Malaysia); market cap ~RM120B+",
    website: "maybank.com",
    positioning: "Malaysia's largest bank and ASEAN's fifth-largest by assets. 'Humanity drives us' attempts to place warmth at the centre of institutional weight.",
    products: "Full retail banking: savings, current, fixed deposits, Maybank Islamic (complete Shariah suite), personal loans, home loans (HouzKEY), vehicle financing, 15+ credit card variants, Etiqa insurance, Maybank Investment Bank, MAE e-wallet, M2U internet banking",
    ux: "Yellow (#FFC80A) and black brand identity. MAE app is genuinely well-designed. The MAE product evolved from simple e-wallet to feature-rich mobile banking app.",
    strength: "Malaysia's largest bank \u2014 RM960B+ total assets, 2,600+ ATMs, 400+ branches. Multi-generational trust spanning 60+ years. Etiqa insurance and Maybank Investment Bank form a complete ecosystem.",
    weakness: "Legacy IT infrastructure creates innovation lag. Civil-service salary bank perception limits premium positioning among younger consumers.",
    visualLang: "Yellow/gold (#FFC80A) \u2014 the most iconic bank colour in Malaysia. Multi-ethnic photography is a Maybank brand standard. Institutional typography.",
    recentComms: "MAE wallet feature campaigns. Maybank Islamic Hari Raya family finance campaigns. Home loan and vehicle financing rate campaigns. Maybank Foundation CSR visibility campaigns.",
    logo: "Maybank yellow tiger wordmark", matrixX: 90, matrixY: 82, matrixR: 26, matrixC: "#CA8A04",
  },
  {
    name: "CIMB / Octo", type: "Traditional Bank (Legacy) / Full-Service", users: "~8M+ digital banking users (MY)", founded: "1974", funding: "Public listed (Bursa Malaysia); market cap ~RM65B+",
    website: "cimb.com.my",
    positioning: "ASEAN's bank. CIMB's regional footprint across Malaysia, Indonesia, Thailand, Singapore, and the Philippines is both its greatest strategic asset and defining communications platform.",
    products: "Full retail banking: savings, current, fixed deposits, CIMB Islamic (complete Shariah suite), personal loans, mortgages, credit cards, investments (CIMB Principal), CIMB Octo app, ASEAN cross-border transfers, business banking",
    ux: "Deep red (#D00C31) brand identity. CIMB Octo represents meaningful UX improvement. Clean, tile-based navigation. ASEAN transfer feature is distinctive.",
    strength: "ASEAN regional scale provides cross-border utility. Malaysia's second-largest bank by assets. CIMB Islamic is the second-largest Islamic banking franchise in Malaysia.",
    weakness: "Regional ambition sometimes dilutes Malaysia-specific brand relevance. Digital banking investment reactive rather than proactive. Red palette creates political association risk.",
    visualLang: "Deep red (#D00C31). Pan-ASEAN diversity photography. CIMB Islamic uses same red with Islamic geometric overlays. Octo sub-brand attempts cleaner, modern expression.",
    recentComms: "CIMB Octo feature campaigns. CIMB Islamic Hari Raya campaigns. ASEAN corridor transfer campaigns. JomPAY and DuitNow QR merchant activation.",
    logo: "CIMB red wordmark", matrixX: 85, matrixY: 60, matrixR: 22, matrixC: "#B91C1C",
  },
  {
    name: "BigPay", type: "Fintech / Multi-Currency Wallet / Remittance", users: "~2M+", founded: "2017 (originally AirAsia Money)", funding: "Partners Group (PE majority stake since 2022)",
    website: "bigpayme.com",
    positioning: "The fintech for Malaysians who travel, remit, and think beyond Ringgit. BigPay's Visa prepaid card with zero foreign exchange markup is genuinely loved by Malaysian travelers.",
    products: "Multi-currency wallet (40+ currencies), BigPay Visa prepaid card (zero forex markup), international remittance (50+ countries), DuitNow P2P, bill payments, BigPay Later (BNPL), BigPay Insurance, BigPay Invest",
    ux: "Dark navy / teal aesthetic. Clean, travel-informed design language. Currency conversion is the star feature. Predominantly English-first interface.",
    strength: "Zero-forex-markup card is genuinely unique and defensible. International remittance addresses both Malaysian travellers and 3M+ foreign workers. Partners Group PE backing.",
    weakness: "Brand skews toward urban, English-comfortable traveller segment. Not a BNM-licensed bank. AirAsia brand equity diminished post-ownership change.",
    visualLang: "Dark navy (#1A2E44) and teal (#00C9BE). English-first, global aesthetic. Travel imagery dominant. Photography skews urban professional, 25\u201340 demographic.",
    recentComms: "Zero-forex travel card campaigns. Remittance cost comparison vs Western Union. BigPay Later BNPL awareness. BigPay Invest unit trust awareness. Cross-border worker remittance campaigns.",
    logo: "BigPay navy wordmark", matrixX: 30, matrixY: 28, matrixR: 12, matrixC: "#4338CA",
  },
  {
    name: "Bank Islam", type: "Full-Service Islamic Bank (BIMB Holdings)", users: "~3M+ customers", founded: "1983 (Malaysia's first dedicated Islamic bank)", funding: "BIMB Holdings Berhad (listed); Lembaga Tabung Haji holds significant minority stake",
    website: "bankislam.com",
    positioning: "The original. Malaysia's first Islamic bank \u2014 founded in 1983 when Shariah-compliant banking was still a radical concept. 40+ years of Islamic banking expertise.",
    products: "Full Islamic banking suite: Al-Wadiah savings, Al-Qard current accounts, Mudharabah investment deposits, personal financing (Tawarruq), home financing (Al-Ijarah Thumma Al-Bay'), vehicle financing, Islamic credit cards, Zakat channeling, Waqf banking, Tabung Haji linkage",
    ux: "Green (#1E7145) Islamic banking palette. BIMBest app is meaningfully improved. Zakat payment feature creates Ramadan engagement spike unique to Islamic banks.",
    strength: "40+ years of pure-play Islamic banking expertise. Tabung Haji's 10M+ depositors create institutional distribution. Zakat and waqf banking capabilities are unique.",
    weakness: "Innovation pace lags behind digital-first competitors. BIMBest app perceived as 'catching up.' Legacy branch-heavy cost structure. Limited appeal to non-Muslim consumers.",
    visualLang: "Green (#1E7145) \u2014 the universal Islamic brand colour. Arabic calligraphy accents. Multi-ethnic Malaysian photography (Malay Muslim majority). Conservative typography.",
    recentComms: "Hari Raya family finance and takaful campaigns. Zakat calculator awareness during Ramadan. Bank Islam GO digital banking push. Home financing halal alternative campaigns. Waqf banking social impact storytelling.",
    logo: "Bank Islam green wordmark with crescent motif", matrixX: 82, matrixY: 42, matrixR: 18, matrixC: "#059669",
  },
  {
    name: "GrabPay", type: "E-Wallet / Payment Platform", users: "~10M+ (Grab app users in Malaysia)", founded: "2016", funding: "Grab Holdings (Nasdaq: GRAB)",
    website: "grab.com/my",
    positioning: "The default payment method for Malaysia's urban on-demand economy. GrabPay dominates through ecosystem necessity \u2014 10M+ Malaysians use Grab for rides, food delivery, and grocery delivery.",
    products: "In-app payments (GrabRide, GrabFood, GrabMart, GrabExpress), GrabPay QR merchant payments, PayLater (BNPL, up to RM5K), GrabRewards, DuitNow QR acceptance, GrabGifts, GrabPay Business",
    ux: "Grab green (#01A36A) \u2014 embedded payment rail, not standalone app. GrabPay is frictionless because payment is incidental to the primary service. PayLater checkout seamlessly integrated.",
    strength: "Mandatory use creates habitual payment behaviour for 10M+ users without acquisition cost. GrabRewards creates loyalty loops. PayLater BNPL is among the most seamless. GXBank integration creates structurally complete ecosystem.",
    weakness: "Not a standalone financial product. Cannot independently challenge TNG's multi-merchant QR infrastructure. Perceived as 'payment for Grab' rather than complete financial platform.",
    visualLang: "Grab green (#01A36A) \u2014 GrabPay identity inseparable from Grab's brand. Clean, functional design. Predominantly English with Bahasa navigation. Delivery rider and GrabFood photography.",
    recentComms: "PayLater BNPL campaigns. GrabPay merchant QR expansion. GrabRewards x GXBank integration campaign. GrabFood + GrabPay cashback bundle promotions. Hari Raya and CNY digital gift-sending via GrabGifts.",
    logo: "GrabPay green wordmark within Grab ecosystem", matrixX: 20, matrixY: 70, matrixR: 16, matrixC: "#22C55E",
  },
];

const Card = ({ children, style, accent = false }) => (
  <div style={{ background: CARD_BG, borderRadius: 12, padding: "28px 32px", border: `1px solid ${accent ? ACCENT + "30" : BORDER}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", ...style }}>{children}</div>
);
const SectionTitle = ({ num, title, subtitle }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontSize: 12, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 6 }}>SECTION {num}</div>
    <h2 style={{ fontSize: 32, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.2, letterSpacing: "-0.02em" }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 16, color: TEXT_MUTED, marginTop: 8, lineHeight: 1.6, maxWidth: 700 }}>{subtitle}</p>}
  </div>
);
const SubHead = ({ children, color = TEXT }) => (
  <h3 style={{ fontSize: 18, fontWeight: 600, color, margin: "0 0 12px", letterSpacing: "-0.01em" }}>{children}</h3>
);
const Label = ({ children, color = ACCENT }) => (
  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color, fontWeight: 700, marginBottom: 8 }}>{children}</div>
);
const Prose = ({ children, style }) => (
  <p style={{ fontSize: 15, color: TEXT_SECONDARY, lineHeight: 1.8, margin: "0 0 16px", ...style }}>{children}</p>
);
const StatBox = ({ value, label, accent = false }) => (
  <div style={{ padding: "20px 18px", background: accent ? ACCENT_BG : "#F9FAFB", borderRadius: 10, borderLeft: accent ? `3px solid ${ACCENT}` : "3px solid #E5E7EB" }}>
    <div style={{ fontSize: 28, fontWeight: 300, color: accent ? ACCENT : TEXT, letterSpacing: "-0.02em" }}>{value}</div>
    <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 4, letterSpacing: 0.3 }}>{label}</div>
  </div>
);
const Severity = ({ level }) => {
  const colors = { Critical: "#DC2626", High: "#F59E0B", Medium: "#3B82F6", Low: "#10B981" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 10px", borderRadius: 5, background: (colors[level] || "#888") + "12", color: colors[level] || "#888" }}>{level?.toUpperCase()}</span>;
};

export default function MalaysiaReport() {
  const [activeSection, setActiveSection] = useState("exec");
  const [compIdx, setCompIdx] = useState(0);
  const sectionRefs = useRef({});
  const [showNav, setShowNav] = useState(false);

  const handlePrint = () => {
    const allEls = document.querySelectorAll('*');
    const saved = [];
    allEls.forEach((el) => {
      const cs = window.getComputedStyle(el);
      if (cs.overflow === 'hidden' || cs.overflow === 'scroll' || cs.overflowY === 'hidden' || cs.overflowY === 'scroll') {
        saved.push({ el, overflow: el.style.overflow, overflowY: el.style.overflowY, maxHeight: el.style.maxHeight, height: el.style.height });
        el.style.overflow = 'visible'; el.style.overflowY = 'visible'; el.style.maxHeight = 'none'; el.style.height = 'auto';
      }
    });
    document.documentElement.style.overflow = 'visible'; document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'visible'; document.body.style.height = 'auto';
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        saved.forEach(({ el, overflow, overflowY, maxHeight, height }) => { el.style.overflow = overflow; el.style.overflowY = overflowY; el.style.maxHeight = maxHeight; el.style.height = height; });
        document.documentElement.style.overflow = ''; document.documentElement.style.height = '';
        document.body.style.overflow = ''; document.body.style.height = '';
      }, 1000);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.values(sectionRefs.current).forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" }); setShowNav(false); };
  const comp = COMPETITORS[compIdx];

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Source Serif 4', 'Georgia', serif" }}>
      {/* TOP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,249,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>{"\uD83C\uDDF2\uD83C\uDDFE"}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>Malaysia Digital Finance Landscape</span>
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: 1 }}>Q1 2026</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handlePrint} style={{ background: "transparent", color: TEXT_MUTED, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{"\uD83D\uDDA8"} Print</button>
          <button onClick={() => setShowNav(!showNav)} style={{ background: showNav ? ACCENT : "transparent", color: showNav ? "#fff" : TEXT_MUTED, border: `1px solid ${showNav ? ACCENT : BORDER}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{showNav ? "\u2715 Close" : "\u2630 Navigate"}</button>
        </div>
      </div>

      {showNav && (
        <div style={{ position: "fixed", top: 48, right: 24, zIndex: 99, background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 8px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 260 }}>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", borderRadius: 8, cursor: "pointer", background: activeSection === s.id ? ACCENT_BG : "transparent", color: activeSection === s.id ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: activeSection === s.id ? 600 : 400, fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, width: 20, fontFamily: "monospace" }}>{s.num}</span>{s.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px 80px" }}>

        {/* COVER */}
        <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: `2px solid ${TEXT}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>MARKET INTELLIGENCE &amp; BRAND LANDSCAPE ANALYSIS</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.03em", color: TEXT }}>
            33 Million Builders:<br />
            <span style={{ color: ACCENT, fontWeight: 400 }}>The Malaysian Digital Finance Landscape</span>
          </h1>
          <p style={{ fontSize: 18, color: TEXT_SECONDARY, lineHeight: 1.7, maxWidth: 640, margin: "0 0 28px" }}>
            A comprehensive market intelligence and brand landscape analysis of the Malaysian digital banking ecosystem {"\u2014"} ASEAN's most complex multi-ethnic financial market and the world's undisputed Islamic finance hub.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 12, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>
            <span>{"\uD83D\uDCC5"} February 2026</span>
            <span>{"\uD83D\uDCD6"} {Object.keys(SOURCES).length}+ sources cited</span>
            <span>{"\uD83D\uDD12"} Confidential</span>
          </div>
        </div>

        {/* EXECUTIVE SUMMARY */}
        <section id="exec" ref={(el) => (sectionRefs.current["exec"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="01" title="Executive Summary" subtitle="Malaysia's digital finance market appears mature \u2014 but beneath 90% banking penetration, a three-way battle is reshaping the landscape." />

          <Card accent style={{ marginBottom: 24 }}>
            <Prose style={{ fontSize: 16, color: TEXT, lineHeight: 1.85 }}>
              The Malaysian digital financial landscape is at a structural inflection point. With 90%+ financial inclusion<Ref n={17} /> and all five digital banking licences issued in 2022<Ref n={11} />, Malaysia presents a sophisticated disruption challenge. Touch 'n Go eWallet commands 20M+ users<Ref n={21} />, Maybank holds RM960B+ in assets<Ref n={44} />, and Islamic banking comprises 30%+ of total banking assets, making Malaysia the world's #1 Islamic finance hub.<Ref n={14} />
            </Prose>
            <Prose style={{ fontSize: 16, color: TEXT }}>
              Three forces define this market. First, multi-ethnic complexity: Malay/Bumiputera (~68.8%), Chinese (~23.2%), Indian (~7%) {"\u2014"} three distinct financial cultures, three seasonal peaks, three communication codes.<Ref n={66} /> Second, the trust deficit: PDRM recorded RM2B+ in scam-related losses in 2024.<Ref n={62} /> Third, <em>kepercayaan</em> (trustworthiness) {"\u2014"} the foundational value bridging all three communities' financial decision-making.<Ref n={63} />
            </Prose>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
            <StatBox value="90%+" label="Adult financial inclusion rate" accent />
            <StatBox value="20M+" label="Touch 'n Go eWallet registered users" accent />
            <StatBox value="5/5" label="Digital bank licences issued (BNM cap reached)" />
            <StatBox value="30%+" label="Banking assets that are Islamic (RM1.3T+)" />
            <StatBox value="83%" label="Digital share of retail transactions (2024)" accent />
            <StatBox value="RM2B+" label="Estimated annual scam/fraud losses (PDRM 2024)" />
          </div>

          <Card style={{ marginBottom: 24 }}>
            <SubHead>Six Key Market Findings</SubHead>
            {[
              { finding: "Mature market, disrupted economics: 90% banked but five digital banks fighting for differentiation beyond savings rates.", why: "Rate competition is already commoditising the most visible product feature. The real battleground is ecosystem integration." },
              { finding: "Islamic banking is mainstream: 30%+ of banking assets, the world's #1 market \u2014 and now disrupted by AEON Bank's digital-first model.", why: "AEON Bank's launch creates a product innovation imperative the entire sector must respond to. 35%+ of Islamic bank customers are non-Muslim." },
              { finding: "Three markets, one budget: Malay, Chinese Malaysian, and Indian Malaysian consumers require distinct cultural codes.", why: "Brands that treat Malaysia as culturally monolithic consistently underperform. Hari Raya, CNY, and Deepavali are structurally different financial events." },
              { finding: "Touch 'n Go's infrastructure moat is the defining competitive fact of Malaysian fintech.", why: "TNG's highway RFID creates an entry point that forces 7M+ vehicle owners into the TNG ecosystem. 25 years of transport infrastructure embedding." },
              { finding: "DuitNow is the invisible level-playing-field: any licensed player can offer instant transfers.", why: "DuitNow QR democratises transactional capability but removes it as a differentiator. The race is for financial depth, not payment rails." },
              { finding: "The foreign worker corridor (RM40B+ outward remittance) is structurally underserved with 3M+ potential customers.", why: "3M+ potential customers, RM40B+ in flows, and existing players operating at 3\u20136% fees. First-mover opportunity." },
            ].map((f, i) => (
              <div key={i} style={{ padding: "18px 20px", background: i < 2 ? ACCENT_BG : "#F9FAFB", borderRadius: 10, marginBottom: 10, borderLeft: `3px solid ${i < 2 ? ACCENT : "#E5E7EB"}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, background: i < 2 ? ACCENT : "#D1D5DB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 6, lineHeight: 1.5 }}>{f.finding}</div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, fontStyle: "italic" }}>Why: {f.why}</div>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* COUNTRY CONTEXT */}
        <section id="context" ref={(el) => (sectionRefs.current["context"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="02" title="Country Context" subtitle="Malaysia presents a paradox: a high-income-adjacent economy with near-universal banking access, yet with three demographically distinct financial cultures operating simultaneously." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Macroeconomic Overview</SubHead>
            <Prose>Malaysia is a ~RM1.77 trillion (~$400 billion) economy growing at approximately 4.5{"\u2013"}5% annually.<Ref n={37} /> GDP per capita of approximately $13,000 positions Malaysia as upper-middle-income on the cusp of the World Bank's high-income threshold. The 33.4 million population has a median age of approximately 30.<Ref n={32} /> 3M+ foreign workers generate RM40B+ in outward remittances annually.<Ref n={65} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
              {[{ v: "~$400B", l: "GDP (RM1.77T)" }, { v: "$13,000", l: "GDP per capita" }, { v: "4.5\u20135%", l: "GDP growth" }, { v: "2.3\u20132.5%", l: "Inflation" },
              { v: "33.4M", l: "Population" }, { v: "~30", l: "Median age" }, { v: "~78%", l: "Urbanisation rate" }, { v: "3.00%", l: "BNM OPR" }].map((m, i) => (
                <div key={i} style={{ padding: "12px", background: "#F9FAFB", borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: i < 2 ? ACCENT : TEXT }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Digital Infrastructure</SubHead>
            <Prose>Internet penetration reaches approximately 97%<Ref n={6} />, smartphone adoption approximately 83%, and social media usage approximately 82%. Digital payments surged from approximately 60% of retail transactions in 2020 to 83% in 2024.<Ref n={40} /> E-commerce reached approximately RM185B (~$40B) in 2024.<Ref n={35} /></Prose>
          </Card>

          <Card accent>
            <SubHead color={ACCENT}>Cultural Context: Muhibbah, Malu & Kepercayaan</SubHead>
            <Prose>Three cultural dynamics shape financial brand strategy. <strong>Muhibbah</strong> {"\u2014"} the spirit of goodwill between ethnic communities. <strong>Malu</strong> {"\u2014"} shame and face-preservation that shapes financial behaviour around debt. <strong>Kepercayaan</strong> {"\u2014"} trustworthiness, the cross-cultural trust value that is the single most important brand requirement.<Ref n={63} /></Prose>
            <Prose style={{ marginBottom: 0 }}>The three seasonal spending peaks {"\u2014"} Hari Raya, Chinese New Year, Deepavali {"\u2014"} create distinct financial product demand patterns. The brand that wins Hari Raya wins the financial trust of 68.8% of the Malaysian population for the following twelve months.</Prose>
          </Card>
        </section>

        {/* MARKET LANDSCAPE */}
        <section id="landscape" ref={(el) => (sectionRefs.current["landscape"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="03" title="Market Landscape" subtitle="TNG eWallet's 20M-user network effect and Maybank's institutional scale define the market \u2014 but five new digital banks are creating structural competitive pressure." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Market Size & Structure</SubHead>
            <Prose>Malaysia's digital banking market is valued at approximately RM25{"\u2013"}35B and growing at 15{"\u2013"}20% annually.<Ref n={4} /> All five digital bank licences have been issued: GXBank, Boost Bank (conventional), AEON Bank, YTL Digital Capital (Islamic), KAF Digital.<Ref n={11} /> TNG commands approximately 60% e-wallet market share by users.<Ref n={13} /> DuitNow QR accepted at approximately 2 million merchants.<Ref n={40} /></Prose>
          </Card>

          <Card>
            <SubHead>Competitive Positioning Matrix</SubHead>
            <Prose style={{ marginBottom: 16 }}>Product breadth (x-axis) vs. user scale (y-axis). Bubble size represents relative market influence.</Prose>
            <div style={{ position: "relative", width: "100%", height: 360, background: "#FAFAFA", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}` }}>
              {[20, 40, 60, 80].map(v => <div key={`x${v}`} style={{ position: "absolute", left: `${v}%`, top: 0, bottom: 0, borderLeft: "1px dashed #E5E7EB" }} />)}
              {[20, 40, 60, 80].map(v => <div key={`y${v}`} style={{ position: "absolute", top: `${100 - v}%`, left: 0, right: 0, borderTop: "1px dashed #E5E7EB" }} />)}
              <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{"\u2190"} Narrow / Specialist</div>
              <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>Full-Service {"\u2192"}</div>
              <div style={{ position: "absolute", top: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>Mass Adoption {"\u2191"}</div>
              <div style={{ position: "absolute", bottom: 26, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{"\u2193"} Emerging</div>
              {COMPETITORS.map((c, i) => (
                <div key={i} style={{ position: "absolute", left: `${c.matrixX}%`, bottom: `${c.matrixY}%`, transform: "translate(-50%, 50%)", cursor: "pointer", zIndex: 10 }} onClick={() => { setCompIdx(i); scrollTo("competitors"); }}>
                  <div style={{ width: c.matrixR, height: c.matrixR, borderRadius: "50%", background: c.matrixC + "25", border: `2px solid ${c.matrixC}80`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.matrixC }} />
                  </div>
                  <div style={{ fontSize: 9, color: c.matrixC, fontWeight: 700, textAlign: "center", marginTop: 3, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>{c.name.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* INDUSTRY TRENDS */}
        <section id="trends" ref={(el) => (sectionRefs.current["trends"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="04" title="Industry Trends" subtitle="Six defining trends are reshaping Malaysian fintech." />
          {[
            { t: "Ecosystem Banking", d: "GXBank is embedded inside Grab's 10M+ user super-app. Boost Bank distributes via CelcomDigi's telco subscriber base. AEON Bank acquires customers through 35 shopping malls. The digital bank is not acquired \u2014 it is encountered.", why: "Zero-CAC distribution is the only sustainable model for digital banks in a market where traditional banks have 60+ years of relationship history.", icon: "\uD83C\uDF10", src: 7 },
            { t: "Islamic Fintech Goes Digital", d: "AEON Bank's March 2024 launch created a category that did not previously exist. Shariah-compliant savings, murabahah financing, and digital takaful now compete on the same UX standards as conventional digital banks.", why: "Malaysia's 22M Muslim consumers previously had to choose between digital convenience and Shariah compliance. AEON Bank eliminates this trade-off.", icon: "\u262A\uFE0F", src: 27 },
            { t: "DuitNow: The Invisible Infrastructure", d: "PayNet's DuitNow ecosystem has become Malaysia's invisible financial infrastructure. Every licensed bank and e-wallet connects to the same rails.", why: "DuitNow removes payment network effects as a competitive moat. What remains is financial depth and emotional brand preference.", icon: "\u26A1", src: 40 },
            { t: "Multi-Ethnic Financial Design", d: "The most underestimated complexity: designing simultaneously for three financially distinct ethnic communities with distinct seasonal financial dynamics.", why: "Brands that treat Malaysia as culturally monolithic consistently underperform in brand affinity scores.", icon: "\uD83C\uDDFA", src: 66 },
            { t: "Foreign Worker Remittance Corridor", d: "Malaysia hosts approximately 3M+ documented foreign workers whose outward remittance needs (RM40B+) are structurally underserved at 3\u20136% fees.", why: "The first digital bank that authentically solves the foreign worker remittance experience can acquire a captive, recurring-transaction user base.", icon: "\u2708\uFE0F", src: 65 },
            { t: "BNPL & Alternative Credit", d: "Buy Now Pay Later adoption is accelerating. 65%+ of Malaysians under 35 have used a BNPL product in the past 12 months.", why: "Malaysia's malu culture makes BNPL's framing as 'instalments' rather than 'credit' a structural advantage.", icon: "\uD83D\uDCB3", src: 61 },
          ].map((t, i) => (
            <Card key={i} style={{ marginBottom: 16, borderLeft: i < 2 ? `4px solid ${ACCENT}` : `4px solid ${BORDER}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <SubHead color={i < 2 ? ACCENT : TEXT}>{t.t}</SubHead>
              </div>
              <Prose>{t.d}<Ref n={t.src} /></Prose>
              <div style={{ padding: "14px 18px", background: "#FFF7ED", borderRadius: 8, borderLeft: "3px solid #F59E0B" }}>
                <Label color="#D97706">Market Significance</Label>
                <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6, margin: 0 }}>{t.why}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* COMPETITIVE ANALYSIS */}
        <section id="competitors" ref={(el) => (sectionRefs.current["competitors"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="05" title="Competitive Analysis" subtitle="Deep-dive profiles of 9 key competitors." />

          <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {COMPETITORS.map((c, i) => (
              <button key={i} onClick={() => setCompIdx(i)} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", border: i === compIdx ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`, background: i === compIdx ? ACCENT_BG : CARD_BG, color: i === compIdx ? ACCENT : TEXT_SECONDARY, fontSize: 12, fontWeight: i === compIdx ? 700 : 500, fontFamily: "'DM Sans', sans-serif" }}>{c.name.split(" ").slice(0, 2).join(" ")}</button>
            ))}
          </div>

          <Card accent style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 28, fontWeight: 400, margin: "0 0 8px", color: TEXT, letterSpacing: "-0.02em" }}>{comp.name}</h3>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{comp.type}</span>
                  <span style={{ fontSize: 12, color: TEXT_MUTED }}>Founded: {comp.founded}</span>
                  <span style={{ fontSize: 12, color: TEXT_MUTED }}>Users: {comp.users}</span>
                </div>
              </div>
              <a href={`https://${comp.website}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ACCENT, textDecoration: "none", padding: "4px 10px", border: `1px solid ${ACCENT}40`, borderRadius: 6, fontFamily: "'DM Sans', sans-serif" }}>{"\uD83D\uDD17"} {comp.website}</a>
            </div>
            {[{ label: "Positioning", text: comp.positioning }, { label: "Products & Services", text: comp.products }, { label: "UX & Design", text: comp.ux }, { label: "Visual & Verbal Identity", text: comp.visualLang }].map((s, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <Label color={i === 0 ? ACCENT : TEXT_MUTED}>{s.label}</Label>
                <Prose style={{ marginBottom: 0 }}>{s.text}</Prose>
              </div>
            ))}
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            <Card style={{ borderLeft: "4px solid #10B981" }}>
              <Label color="#10B981">Key Strengths</Label>
              <Prose style={{ marginBottom: 0 }}>{comp.strength}</Prose>
            </Card>
            <Card style={{ borderLeft: "4px solid #EF4444" }}>
              <Label color="#EF4444">Key Weaknesses</Label>
              <Prose style={{ marginBottom: 0 }}>{comp.weakness}</Prose>
            </Card>
          </div>

          <Card style={{ borderLeft: "4px solid #8B5CF6" }}>
            <Label color="#8B5CF6">Recent Communications & Campaigns</Label>
            <Prose style={{ marginBottom: 0 }}>{comp.recentComms}</Prose>
          </Card>
        </section>

        {/* CONSUMER INSIGHTS */}
        <section id="consumer" ref={(el) => (sectionRefs.current["consumer"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="06" title="Consumer Insights" subtitle="The Malaysian financial consumer is simultaneously among Southeast Asia's most banked and most behaviourally complex." />

          <Card accent style={{ marginBottom: 20 }}>
            <SubHead color={ACCENT}>Key Consumer Data Points</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { v: "90%+", l: "Adult financial inclusion rate", src: 17 },
                { v: "80%+", l: "E-wallet adoption rate", src: 60 },
                { v: "83%", l: "Digital share of retail transactions", src: 40 },
                { v: "RM2B+", l: "Estimated scam/fraud losses (PDRM 2024)", src: 62 },
                { v: "65%+", l: "BNPL adoption among consumers under 35", src: 61 },
                { v: "35%+", l: "Islamic bank customers who are non-Muslim", src: 14 },
              ].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: i === 3 ? "#FEF2F2" : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${i === 3 ? "#EF4444" : (i < 3 ? ACCENT : "#3B82F6")}` }}>
                  <div style={{ fontSize: 22, fontWeight: 300, color: i === 3 ? "#EF4444" : (i < 3 ? ACCENT : "#3B82F6") }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}<Ref n={s.src} /></div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Tri-Ethnic Demographic Segmentation</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {[
                { eth: "Malay / Bumiputera", pct: "68.8%", traits: "Shariah-compliance is a product prerequisite. Duit raya digital gifting is the highest-value financial seasonal moment.", color: ACCENT },
                { eth: "Chinese Malaysian", pct: "23.2%", traits: "Kiasu drives rate comparison and loyalty switching. Ang pow digitisation via TNG/GrabPay at CNY is a major engagement moment.", color: "#3B82F6" },
                { eth: "Indian Malaysian", pct: "7%", traits: "Deepavali spending and family obligations create a distinct seasonal pattern. Tamil-language financial services are underserved.", color: "#F59E0B" },
              ].map((g, i) => (
                <div key={i} style={{ padding: "16px", background: "#F9FAFB", borderRadius: 10, borderTop: `3px solid ${g.color}` }}>
                  <div style={{ fontSize: 22, fontWeight: 300, color: g.color }}>{g.pct}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginTop: 2 }}>{g.eth}</div>
                  <p style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "8px 0 0" }}>{g.traits}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20, borderTop: "4px solid #EF4444" }}>
            <SubHead color="#EF4444">Critical Barrier: The Trust Deficit</SubHead>
            <Prose>Despite 90%+ banking penetration, PDRM recorded RM2B+ in scam losses in 2024.<Ref n={62} /> Macau Scam syndicates target elderly Malaysians. BNM launched the National Scam Response Centre (NSCS) in 2022 but losses continue to grow.</Prose>
          </Card>
        </section>

        {/* COMMUNICATIONS LANDSCAPE */}
        <section id="comms" ref={(el) => (sectionRefs.current["comms"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="07" title="Communication Landscape" subtitle="Malaysian fintech communications exist at the intersection of three ethnic media ecosystems, two dominant seasonal moments, and a trust deficit." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Media & Advertising</SubHead>
            <Prose>Malaysia's media landscape is inherently multilingual: Bahasa Malaysia, English, Mandarin/Cantonese, and Tamil. Facebook reaches 85% of internet users. YouTube is #1 per capita in SEA for long-form video. TikTok accelerating rapidly for Gen Z.<Ref n={20} /></Prose>
            <Prose>Maybank dominates share of voice at approximately 25{"\u2013"}30%, followed by TNG eWallet (~20%), CIMB (~15%), and GXBank (~8{"\u2013"}10%).<Ref n={47} /> Hari Raya season drives 40{"\u2013"}60% advertising spend increase.<Ref n={10} /></Prose>
          </Card>

          <Card>
            <SubHead>Best-in-Class Campaigns</SubHead>
            {[
              { brand: "Maybank", campaign: "Hari Raya Short Films (annual series)", desc: "Emotionally rich 5\u201310 minute narrative films each Ramadan. The films consistently rank among the most-shared branded content in Malaysian social media.", lesson: "The Hari Raya film is the most emotionally potent creative vehicle for the 68.8% Malay majority." },
              { brand: "TNG eWallet", campaign: "Duit Raya Digital \u2014 'Kirim Salam, Kirim Duit'", desc: "Made digital duit raya feel emotionally equivalent to physical cash gifting. Functional mechanic embedded within emotional story.", lesson: "The first brand to fully own digital duit raya will own the financial relationship with 22M+ Muslims for the following year." },
              { brand: "AEON Bank", campaign: "'Bank Halal, Bank Digital'", desc: "Deliberately broke Islamic banking's visual conventions \u2014 purple instead of green, modern instead of traditional. Non-Muslim customer acquisition reportedly reached 28%.", lesson: "Islamic banking's aesthetic conventions are inherited, not mandated by Shariah. Redesigning them for digital natives expands the addressable market." },
            ].map((bc, i) => (
              <div key={i} style={{ padding: "22px 24px", borderRadius: 10, marginBottom: 16, background: i === 0 ? ACCENT_BG : "#F9FAFB", borderLeft: `4px solid ${i === 0 ? ACCENT : BORDER}` }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{bc.brand}: {bc.campaign}</span>
                <Prose style={{ marginTop: 6 }}>{bc.desc}</Prose>
                <div style={{ padding: "10px 14px", background: CARD_BG, borderRadius: 8, border: `1px solid ${BORDER}` }}>
                  <Label color="#F59E0B">Key Insight</Label>
                  <p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{bc.lesson}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* ISLAMIC FINANCE */}
        <section id="islamic" ref={(el) => (sectionRefs.current["islamic"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="08" title="Islamic Finance Deep Dive" subtitle="Malaysia is the world's #1 Islamic finance hub \u2014 RM1.3T+ in Islamic banking assets, 250+ sukuk issuances annually, and the global reference framework for Shariah-compliant regulation." />

          <Card accent style={{ marginBottom: 20 }}>
            <SubHead color={ACCENT}>Why This Section is the Most Strategically Consequential</SubHead>
            <Prose>Islamic banking already accounts for 30%+ of total banking assets and 68.8% of the population is Muslim.<Ref n={14} /> The question is whether digital banking can disrupt an Islamic finance market that has had 40+ years to build institutional depth. AEON Bank's launch answers: yes, it can.</Prose>
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
            <StatBox value="RM1.3T+" label="Islamic banking assets (30%+ of total)" accent />
            <StatBox value="250+" label="Sukuk issuances annually (global #1)" accent />
            <StatBox value="35%+" label="Non-Muslim share of Islamic bank customers" />
          </div>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Digital Disruption Opportunities</SubHead>
            {[
              { reason: "UX Democratisation", detail: "AEON Bank's digital-first approach eliminates traditional Islamic banking friction \u2014 Shariah-compliant account opening in under 10 minutes, plain-language product descriptions.", color: ACCENT },
              { reason: "Non-Muslim Market Expansion", detail: "35%+ of Islamic bank customers are non-Muslim. AEON Bank's secular visual identity positions Islamic banking as ethical banking for everyone.", color: "#3B82F6" },
              { reason: "Gen Z Islamic Banking Redefinition", detail: "Malaysian Gen Z Muslims want Shariah compliance without compromising on modern, elegant UX. AEON Bank's purple aesthetic leads this transition.", color: "#10B981" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "18px 22px", background: i === 0 ? ACCENT_BG : "#F9FAFB", borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${r.color}` }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>{r.reason}</span>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: "8px 0 0" }}>{r.detail}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* APPENDICES */}
        <section id="appendix" ref={(el) => (sectionRefs.current["appendix"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="09" title="Appendices & Additional Materials" subtitle="BNM regulatory reference, source database, and glossary." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Source Database ({Object.keys(SOURCES).length} cited)</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(SOURCES).map(([num, src]) => (
                <div key={num} style={{ padding: "8px 12px", background: "#F9FAFB", borderRadius: 6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, fontFamily: "monospace", minWidth: 24 }}>[{num}]</span>
                  <span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{src.full}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <SubHead>Glossary</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { term: "Kepercayaan", def: "Trustworthiness \u2014 the primary brand evaluation criterion across all Malaysian ethnic communities" },
                { term: "Muhibbah", def: "Spirit of harmony and goodwill between Malaysia's ethnic communities" },
                { term: "Malu", def: "Shame/face-saving \u2014 shapes financial decision-making around debt" },
                { term: "Duit Raya", def: "Cash gifts given during Hari Raya Aidilfitri" },
                { term: "Ang Pow", def: "Red envelope cash gifts given during Chinese New Year" },
                { term: "BNM", def: "Bank Negara Malaysia \u2014 central bank and primary financial regulator" },
                { term: "PIDM", def: "Perbadanan Insurans Deposit Malaysia \u2014 insures deposits up to RM250K" },
                { term: "IFSA", def: "Islamic Financial Services Act 2013" },
                { term: "DuitNow", def: "PayNet's real-time payment ecosystem" },
                { term: "Takaful", def: "Islamic insurance based on cooperative mutual aid" },
                { term: "Murabahah", def: "Cost-plus sale \u2014 bank buys asset, sells to customer at markup" },
                { term: "Wadiah", def: "Safekeeping \u2014 bank guarantees return of principal" },
                { term: "Sukuk", def: "Islamic bond \u2014 asset-backed, Shariah-compliant certificate" },
                { term: "BARMM", def: "Bangsamoro Autonomous Region in Muslim Mindanao" },
                { term: "Tabung Haji", def: "World's first pilgrimage savings fund; 10M+ depositors" },
              ].map((g, i) => (
                <div key={i} style={{ padding: "8px 12px", background: "#F9FAFB", borderRadius: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{g.term}</span>
                  <span style={{ fontSize: 12, color: TEXT_SECONDARY, marginLeft: 10 }}>{g.def}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 48, padding: "24px 0", borderTop: `2px solid ${TEXT}`, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
            Malaysia Digital Finance {"\u2014"} Market Intelligence & Brand Landscape Analysis {"\u2014"} Q1 2026 {"\u2014"} {Object.keys(SOURCES).length}+ sources cited
          </p>
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: "8px 0 0", fontFamily: "'DM Sans', sans-serif" }}>
            Market Analysis {"\u00B7"} Islamic Finance Deep Dive {"\u00B7"} Tri-Ethnic Consumer Intelligence {"\u00B7"} Regulatory Reference
          </p>
        </footer>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; scroll-padding-top: 64px; }
        button:hover { filter: brightness(0.96); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #F3F4F6; }
        ::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 3px; }
        sup { cursor: help; }
        @media print {
          @page { margin: 20mm 18mm; size: A4; }
          html, body { height: auto !important; overflow: visible !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          button, [style*="position: sticky"], [style*="position: fixed"] { display: none !important; }
          * { box-shadow: none !important; }
          section { page-break-inside: avoid; break-inside: avoid; }
          h2, h3 { page-break-after: avoid; break-after: avoid; }
        }
      `}</style>
    </div>
  );
}
