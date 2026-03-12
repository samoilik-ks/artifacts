import { useState, useEffect, useRef } from "react";

const ACCENT = "#E05A1C";
const ACCENT_BG = "#FEF3EE";
const BG = "#FAFAF8";
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
  { id: "islamic", label: "Islamic Finance", num: "08" },
  { id: "appendix", label: "Appendices & Materials", num: "09" },
];

const SOURCES = {
  1: { full: "GSMA: State of the Industry Report on Mobile Money 2024" },
  2: { full: "Central Bank of Kenya: Annual Report & Financial Stability Report 2024" },
  3: { full: "FSD Kenya: FinAccess Household Survey 2024" },
  4: { full: "World Bank Global Findex Database: Kenya 2024" },
  5: { full: "Safaricom PLC: Integrated Annual Report 2024" },
  6: { full: "Equity Group Holdings: Integrated Annual Report 2024" },
  7: { full: "KCB Group PLC: Annual Report 2024" },
  8: { full: "NCBA Group PLC: Annual Report & Sustainability Report 2024" },
  9: { full: "McKinsey & Company: Digital Finance in Sub-Saharan Africa 2025" },
  10: { full: "DataReportal / We Are Social: Digital 2026 Kenya Country Report" },
  11: { full: "CBK: Digital Credit Providers Regulations 2022 & Implementation Update 2024" },
  12: { full: "CBK: National Payments Strategy 2022–2025" },
  13: { full: "Co-operative Bank of Kenya: Annual Report 2024" },
  14: { full: "Tala: Impact Report & User Statistics 2024" },
  15: { full: "Gulf African Bank: Annual Report & Islamic Finance Review 2024" },
  16: { full: "First Community Bank Kenya: Annual Report 2024" },
  17: { full: "Airtel Africa PLC: Annual Report 2024 — Kenya Mobile Money Operations" },
  18: { full: "Absa Kenya PLC: Integrated Annual Report 2024" },
  19: { full: "Kenya National Bureau of Statistics (KNBS): Population & Housing Census 2023 Update" },
  20: { full: "Kenya National Bureau of Statistics: Economic Survey 2024" },
  21: { full: "IMF Article IV Consultation: Kenya 2025" },
  22: { full: "World Bank: Kenya Economic Update 2025" },
  23: { full: "CBK: Mobile Payments Statistics & Quarterly Bulletin 2024" },
  24: { full: "FSD Kenya: Digital Credit in Kenya — Market Development & Consumer Protection 2024" },
  25: { full: "GSMA: Connected Society Kenya — Mobile Internet Usage and Barriers 2024" },
  26: { full: "Intermedia / Financial Sector Deepening: InterMedia Financial Inclusion Tracker Kenya 2024" },
  27: { full: "Mercy Corps: Chama Research — Informal Savings Groups in Kenya 2023" },
  28: { full: "Central Bank of Kenya: Agent Banking Annual Report 2024" },
  29: { full: "M-Pesa Africa: Fuliza Overdraft Product Performance Report 2024" },
  30: { full: "Safaricom: M-Shwari Product Statistics & NCBA Partnership Report 2024" },
  31: { full: "Kenya Bankers Association: State of Banking Report 2024" },
  32: { full: "Tala: State of Digital Credit Kenya 2024" },
  33: { full: "Branch International: Kenya Operations & Impact Report 2024" },
  34: { full: "CBK: Diaspora Remittances Monthly Data & Annual Summary 2024" },
  35: { full: "World Bank: Kenya Remittance Costs & Flows Analysis 2024" },
  36: { full: "KNBS: Agriculture Sector Monitor 2024" },
  37: { full: "DigiFarm (Safaricom x Syngenta): Digital Agriculture Platform Impact Report 2024" },
  38: { full: "Inkomoko / IFC: Kenya SME Finance & Digital Banking Access Study 2024" },
  39: { full: "Kenya ICT Authority: National ICT Policy 2024 Implementation Report" },
  40: { full: "Partech Africa: Africa Tech Venture Capital Report 2024 — Kenya Chapter" },
  41: { full: "Standard Chartered Kenya: Annual Report 2024" },
  42: { full: "Stanbic Kenya: Annual Report 2024" },
  43: { full: "Islamic Finance News (IFN): Kenya Islamic Finance Market Report 2024" },
  44: { full: "CBK: Licensing & Supervision of Islamic Banking Windows in Kenya 2023–2024" },
  45: { full: "Ipsos Kenya: Digital Consumer Behaviour & Financial Attitudes Survey 2024" },
  46: { full: "GeoPoll: Kenya Mobile & Digital Usage Study 2024" },
  47: { full: "Kantar: BrandZ Kenya Top Brands 2024" },
  48: { full: "Infobip / Africa: Mobile Messaging & Financial Services Marketing Kenya 2024" },
  49: { full: "Jumia: Africa Mobile Report 2024 — Kenya Chapter" },
  50: { full: "Mastercard: New Payments Index 2024 — Sub-Saharan Africa" },
  51: { full: "Visa: Consumer Payment Attitudes Study Kenya 2024" },
  52: { full: "TransUnion Africa: Kenya Consumer Credit & Lending Landscape Report 2024" },
  53: { full: "Nielsen Kenya: Media Consumption & Advertising Effectiveness Report 2024" },
  54: { full: "Meta for Business: Kenya Advertising & Audience Insights Q4 2024" },
  55: { full: "KNBS: Labour Force Report Q3 2024 — Youth Employment & Informal Economy" },
  56: { full: "Kenya Revenue Authority: Hustler Fund Performance & Disbursement Report 2024" },
  57: { full: "CBK: Credit Information Sharing — CRB Statistics Annual Report 2024" },
  58: { full: "CGAP: Digital Finance & Customer Protection in Kenya 2024" },
  59: { full: "Consultative Group to Assist the Poor (CGAP): Chama Digitisation Landscape Kenya 2024" },
  60: { full: "FSD Kenya: AgriFinance & Smallholder Farmer Financial Inclusion 2024" },
  61: { full: "MicroSave Consulting: Kenya BNPL & Embedded Finance Landscape 2024" },
  62: { full: "Deloitte Africa: Kenya Financial Services Outlook 2025" },
  63: { full: "PwC Kenya: FinTech Survey & Digital Banking Benchmarking 2025" },
  64: { full: "Communications Authority of Kenya: Quarterly Sector Statistics Q3 2024" },
  65: { full: "We Are Social x Meltwater: Kenya Digital Media Landscape 2025" },
  66: { full: "GeoPoll / Sauti ya Watumiaji: Consumer Trust in Digital Financial Services Kenya 2024" },
  67: { full: "CBK: National Financial Inclusion Strategy 2022–2025 Mid-Term Review" },
};

const COMPETITORS = [
  {
    name: "M-Pesa", type: "Mobile Money / Super Platform", users: "40M+ active users (Kenya, Q1 2026)", founded: "2007 (Safaricom / Vodafone)",
    funding: "Safaricom PLC (listed NSE + LSE); Vodacom/Vodafone international", website: "safaricom.co.ke/mpesa",
    positioning: "M-Pesa is not a product — it is the infrastructure of the Kenyan economy. Launched in 2007 as a simple send-money tool for unbanked Kenyans, M-Pesa has evolved into the world's most cited mobile money success story and handles transactions equivalent to nearly 55% of Kenya's GDP annually. Every financial product built in Kenya is built either on, around, or in competition with M-Pesa. Its agent network of 250,000+ physical touchpoints reaches rural communities that bank branches have never served.",
    products: "P2P transfers, Lipa na M-Pesa (merchant QR + till payments), Fuliza (overdraft), M-Shwari (savings & loans via NCBA), KCB M-Pesa (loans), M-Pesa Global (international remittance, 200+ countries), Pochi la Biashara (SME wallet), DigiFarm (agricultural finance), Bonga Points, M-Pesa Business, M-Pesa API for developers",
    ux: "Green (#4CAF50) — the most recognised mobile money interface in Africa. Feature phone compatibility via USSD (*334#) gives M-Pesa universal reach across all handset types — smartphones and 2G phones alike. The app redesign (2023) brought a cleaner smartphone UX while preserving USSD for feature phone users.",
    strength: "17 years of habit-loop dominance. 250,000+ agents make physical cash in/out possible in villages with no electricity grid. Fuliza credit line embedded in the send-money flow has 40M+ eligible users. M-Pesa infrastructure is so embedded in Kenyan life that salary payments, rent, school fees, and market stall payments all flow through it.",
    weakness: "Transaction fees are a persistent consumer frustration — small amount transfers carry disproportionate cost. Safaricom's dominance is under regulatory scrutiny (Competition Authority of Kenya). Innovation pace constrained by the need to maintain backward compatibility with feature phones and USSD architecture.",
    visualLang: "Safaricom green (#4CAF50) and white. Market vendor photography, boda boda riders, rural women saving in groups. The 'hakuna matata na M-Pesa' (no worries with M-Pesa) brand voice is warm and trustworthy. Kiswahili and English dual-language across all communications.",
    recentComms: "Fuliza 'Fulizia Maisha Yako' campaign. M-Pesa Global remittance diaspora activation. Lipa na M-Pesa small business merchant QR roll-out. Annual M-Pesa Foundation CSR visibility. DigiFarm agriculture season campaigns.",
    matrixX: 60, matrixY: 95, matrixR: 34, matrixC: "#16A34A",
  },
  {
    name: "Equity Bank / Equity Mobile", type: "Full-Service Bank / Digital Platform", users: "17M+ customers across Africa (12–13M in Kenya)",
    founded: "1984 (as Equity Building Society), listed NSE 2006", funding: "Equity Group Holdings PLC (listed NSE); IFC, DEG strategic shareholders",
    website: "equitybankgroup.com",
    positioning: "Kenya's largest bank by customer count — built on a radical proposition in the 1990s: banking for the poor and unbanked. Equity's 'Wings to Fly' and 'Equitel' narratives have made it the bank of the Kenyan aspiration class — not the wealthy, but those working their way up. Equitel mobile banking via the thin-SIM card technology gave Equity a direct challenge to M-Pesa. EazzyBanking is its current digital platform.",
    products: "Full retail banking: savings, current accounts, fixed deposits, loans, mortgages, EazzyBanking app, Equitel (MVNO mobile money), EazzyPay (merchant payments), agency banking, Equity BNPL, Equity Investment Bank, insurance products, diaspora banking, Pan-Africa operations (Uganda, Tanzania, Rwanda, DRC, Ethiopia, South Sudan)",
    ux: "Red (#E53935) brand identity. EazzyBanking app has undergone significant redesign to compete with M-Pesa's UX. Equitel USSD provides feature-phone fallback. Equity's agent banking network of 60,000+ agents is second only to M-Pesa in rural reach.",
    strength: "Largest customer base among Kenya's commercial banks. Pan-African operations create genuine cross-border utility. Equity Foundation's 'Wings to Fly' scholarship programme creates aspirational brand association among Kenya's upwardly mobile population.",
    weakness: "Equitel MVNO strategy created complexity without displacing M-Pesa's dominance. EazzyBanking UX historically lagged behind digital-native competitors. The bank's 'for the poor' origin positioning creates tension with premium product aspirations.",
    visualLang: "Red (#E53935) — bold, aspirational. Photography of Kenyan business owners, students, and families achieving milestones. Kiswahili and English dual-language. 'Wings to Fly' scholarship images are the most emotionally powerful assets in the Equity brand library.",
    recentComms: "EazzyBanking digital push campaigns. Pan-Africa corridor banking ads. Wings to Fly scholarship announcement (annual high-visibility moment). Equity BNPL launch campaign. DigitalHub innovation lab visibility campaigns.",
    matrixX: 88, matrixY: 75, matrixR: 26, matrixC: "#E53935",
  },
  {
    name: "KCB Group / KCB MoBangi", type: "Full-Service Bank / Mobile Banking", users: "14M+ customers across East Africa",
    founded: "1896 (as National Bank of India), fully Kenyan 1970", funding: "KCB Group PLC (listed NSE); Kenya government strategic shareholder",
    website: "kcbgroup.com",
    positioning: "Kenya's oldest bank and the one most associated with national institutional authority. KCB has built on its 130-year heritage to position as the bank of Kenya's infrastructure, enterprise, and government. KCB MoBangi is its digital-first proposition for the mobile generation. The KCB M-Pesa partnership (launched 2015 on M-Pesa rails) is among the most used mobile loans in Kenya's history.",
    products: "Full retail banking, KCB MoBangi app, KCB M-Pesa mobile loans (via M-Pesa rails), KCB Vooma (USSD wallet), KCB Business, agency banking, mortgage & home loans, diaspora banking, government payroll banking, East Africa regional operations (Uganda, Tanzania, Rwanda, Burundi, South Sudan, Ethiopia)",
    ux: "Blue (#1565C0) brand identity. KCB MoBangi represents a genuine digital banking effort — clean app UX with biometric login, instant transfers, and integrated loan application. KCB Vooma USSD provides feature-phone access.",
    strength: "130-year heritage creates institutional trust unmatched by any digital challenger. Government relationship gives KCB access to civil service payroll banking (500,000+ civil servants). KCB M-Pesa loan product had 8M+ borrowers at its peak.",
    weakness: "Legacy infrastructure creates innovation lag. 'Oldest bank' positioning can read as 'slowest to change.' KCB's digital products are reactive to M-Pesa and Equity rather than category-defining.",
    visualLang: "Blue (#1565C0) — institutional, authoritative. Infrastructure photography: bridges, buildings, agriculture, enterprise. Kenyan national imagery. Dual language Kiswahili/English. The 'Together We Can' tagline attempts warmth within an institutional frame.",
    recentComms: "KCB MoBangi digital banking push. KCB Foundation Scholarship programme. Government housing finance campaign. East Africa regional integration campaigns. KCB M-Pesa loan awareness via TV and radio.",
    matrixX: 85, matrixY: 68, matrixR: 24, matrixC: "#1565C0",
  },
  {
    name: "NCBA / Loop", type: "Full-Service Bank / Digital Innovation", users: "5M+ digital banking users",
    founded: "2019 (merger of NIC Bank + CBA Group)", funding: "NCBA Group PLC (listed NSE); Kenyatta Family Trust significant shareholder",
    website: "ncbagroup.com",
    positioning: "NCBA's most strategically important asset is its operational partnership with Safaricom: NCBA operates M-Shwari (embedded savings and loans within M-Pesa) and co-developed Fuliza (the overdraft product). This gives NCBA access to M-Pesa's 40M+ user base without competing head-on. Loop is NCBA's digital-first banking proposition for urban professionals.",
    products: "Full retail banking, Loop digital bank (neo-bank proposition), M-Shwari (savings & loans within M-Pesa, operated by NCBA), Fuliza co-operator, NCBA Business (SME), trade finance, investment banking, agency banking",
    ux: "Teal/grey brand identity. Loop app has one of Kenya's best bank UX designs — clean, modern, feature-rich for urban professionals. M-Shwari UX lives within M-Pesa's interface but is NCBA-operated.",
    strength: "M-Shwari and Fuliza partnerships give NCBA direct access to 40M+ M-Pesa users for savings and lending products. Loop provides the modern urban banking experience competitive with international digital banks.",
    weakness: "NCBA's strategic value is deeply tied to its Safaricom relationship — if Safaricom shifts financial partners, NCBA's embedded product distribution evaporates. Loop brand recognition is low outside urban Nairobi.",
    visualLang: "Dark teal and grey. Professional urban photography. Loop sub-brand attempts a fresher aesthetic — younger imagery, bolder typography. English-dominant, urban-professional targeting.",
    recentComms: "Loop digital bank urban professional campaigns. M-Shwari savings campaigns on M-Pesa. Fuliza 'just in case' positioning campaigns. NCBA Foundation CSR visibility. SME banking campaigns.",
    matrixX: 72, matrixY: 48, matrixR: 18, matrixC: "#0D9488",
  },
  {
    name: "Co-operative Bank / MCo-op Cash", type: "Full-Service Bank / Cooperative Banking", users: "9M+ co-op society members",
    founded: "1968 (as Co-operative Bank of Kenya)", funding: "Co-operative Holdings Ltd (60%); public float (40%) via NSE listing",
    website: "co-opbank.co.ke",
    positioning: "The bank built by Kenya's cooperative movement — serving the 14,000+ registered co-operative societies, Sacco (Savings & Credit Co-operatives), tea farmers, coffee growers, and dairy cooperatives. MCo-op Cash is Kenya's most important rural mobile banking product for agricultural communities. Co-op Bank's structural advantage is its deep roots in Kenya's agricultural economy — the backbone of 60%+ of rural livelihoods.",
    products: "Full retail banking, MCo-op Cash mobile banking, Sacco integration banking, agricultural co-operative accounts, MCo-op Cash loans, Co-op Kwa Jirani (agency banking), tea/coffee/dairy co-operative payroll banking, mortgage and home loans",
    ux: "Dark green (#1B5E20) and white brand identity. MCo-op Cash app serves 5M+ users with a straightforward UX optimised for rural smartphone users. USSD fallback available for feature phone users in agricultural areas.",
    strength: "Structural monopoly on Kenya's co-operative sector banking — 14,000+ co-operative societies, 12M+ Sacco members. Tea, coffee, and dairy co-operative payroll flows give Co-op Bank recurring institutional revenue independent of consumer preferences.",
    weakness: "Co-operative sector focus limits urban and Gen Z brand relevance. MCo-op Cash brand recognition weak outside agricultural communities. Limited innovation velocity compared to digital challengers.",
    visualLang: "Dark green (#1B5E20) — agricultural, community, cooperative identity. Photography of tea farmers, dairy co-operatives, rural savings groups. Kiswahili dominant in rural communications. 'Jibu ni Co-op' (The answer is Co-op) tagline is well-known in agricultural regions.",
    recentComms: "Tea and coffee season harvest payment campaigns. Sacco digitisation push. MCo-op Cash rural mobile banking awareness. Agricultural co-operative community events. Annual Sacco Congress visibility.",
    matrixX: 82, matrixY: 52, matrixR: 20, matrixC: "#15803D",
  },
  {
    name: "Tala", type: "Digital Lender / Neobank (Global)", users: "7M+ globally; 3M+ in Kenya",
    founded: "2011 (as InVenture, rebranded Tala 2016)", funding: "PayPal Ventures, Revolution Growth, Lowercase Capital, GGV Capital (Series E, $145M+, 2021)",
    website: "tala.co",
    positioning: "Tala pioneered ML-based credit scoring for thin-file borrowers in Kenya — building credit scores from smartphone metadata (SMS patterns, app usage, call history) when no formal credit bureau data existed. For millions of Kenyans shut out of bank credit, Tala was the first institution to say 'yes'. Tala's transition from pure digital lender to broader financial services platform — adding savings, send money, and bill payments — reflects the ambition to become Kenya's neobank for the underserved.",
    products: "Digital loans (KES 500–30,000), Tala Wallet (savings), instant transfers, bill payments, merchant payments, credit score building, WhatsApp integration for account management",
    ux: "Purple (#7B1FA2) brand identity. Entirely app-based — no USSD fallback. Clean, approachable UX designed for first-time digital financial services users. Loan application to disbursement in under 3 minutes.",
    strength: "ML credit scoring proprietary to Tala is a genuine technological moat — 12+ years of Kenyan credit data creates an advantage digital bank challengers cannot easily replicate. Brand is strongly associated with financial inclusion and 'getting your first loan.'",
    weakness: "High non-performing loan rates during economic stress periods. Transition from lender to full neobank requires trust-building in savings and payments beyond credit. CBK's 2022 Digital Credit Provider regulations imposed new compliance costs.",
    visualLang: "Purple (#7B1FA2) — distinctive, non-bank-green. Kenyan youth in urban and peri-urban contexts. Photography reflects aspiration: market stall owners, boda boda riders, university students. English-primary with Kiswahili for product-specific comms.",
    recentComms: "Tala Wallet savings product launch. WhatsApp credit application awareness. Tala Score credit building campaign. Financial literacy content series on TikTok and YouTube. Digital Credit Provider compliance communication.",
    matrixX: 40, matrixY: 32, matrixR: 16, matrixC: "#7C3AED",
  },
  {
    name: "Airtel Money Kenya", type: "Mobile Money (Telco)", users: "7M+ users",
    founded: "2010 (as Zain Money; rebranded Airtel Money 2010)", funding: "Airtel Africa PLC (listed LSE + NSE); Bharti Airtel parent",
    website: "airtel.co.ke",
    positioning: "Kenya's number-two mobile money service — permanently in M-Pesa's shadow but serving a loyal user base drawn by competitive pricing and rural telco coverage. Airtel Money's most significant development of 2024–2025 was the full operationalisation of CBK-mandated mobile money interoperability, allowing Airtel Money users to send and receive from M-Pesa wallets seamlessly. This has meaningfully increased Airtel Money's transaction volumes even without proportional user growth — as M-Pesa users now transact through Airtel channels without friction.",
    products: "Airtel Money P2P transfers, merchant payments, Lipa bills, airtime purchase, international money transfers (Airtel Money International), Airtel Money Bank (partnership with KCB and Equity for account linkage)",
    ux: "Red (#D32F2F) brand identity — directly competitive with M-Pesa's green. USSD (*334# Airtel equivalent) provides feature-phone access. App provides smartphone experience. Interface is functional but lacks M-Pesa's decade of iterative refinement.",
    strength: "Full mobile money interoperability (operationalised 2024–2025) has structurally changed Airtel Money's competitive position — transaction volumes have increased significantly as M-Pesa users transact via Airtel channels. Competitive pricing in rural areas where Airtel telco coverage is strong.",
    weakness: "M-Pesa's 17-year head start in Kenya is an almost insurmountable brand and habit-loop advantage. Airtel Africa's corporate financial pressures have limited Kenya product investment. '2nd choice' perception is sticky.",
    visualLang: "Red (#D32F2F) — echoes Equity's red but lacks its warmth. Photography of Kenyan everyday life. Kiswahili and English dual-language. Promotional offers (data + money transfer bundles) dominate communications.",
    recentComms: "Airtel Money interoperability launch campaign. M-Pesa-to-Airtel transfer awareness ads. Rural Uganda/Tanzania diaspora campaigns. Bundle offers combining data and money transfer promotions.",
    matrixX: 50, matrixY: 72, matrixR: 18, matrixC: "#DC2626",
  },
  {
    name: "Gulf African Bank", type: "Full-Service Islamic Bank", users: "~400K+ customers",
    founded: "2007 (Kenya's first dedicated Islamic bank)", funding: "Gulf African Bank Ltd (private); IFC minority strategic shareholder",
    website: "gulfafricanbank.com",
    positioning: "Kenya's first dedicated Islamic bank — founded to serve the Kenyan Muslim community (approximately 11% of the population, ~5.5M people concentrated in Coast, North Eastern, and Nairobi) with Shariah-compliant financial products. Gulf African Bank also serves non-Muslim customers who choose Islamic banking's ethical framework. In a market defined by M-Pesa and conventional banking, GAB occupies a niche with genuine depth: Kenya's Muslim population has historically been underserved by conventional banking's interest-based structure.",
    products: "Murabahah personal financing, Ijarah vehicle financing, Musharakah business finance, Wadiah savings accounts, takaful referral, MCo-op Cash-linked payments, mobile banking app, trade finance",
    ux: "Dark green and gold Islamic brand identity. Mobile banking app is functional but less refined than digital-native competitors. Branch-dependent for significant transactions.",
    strength: "First-mover in Kenyan Islamic banking (17+ years). IFC shareholder provides international credibility and capital access. Kenya's Muslim community is underserved and loyal to institutions offering genuine Shariah compliance.",
    weakness: "Scale constraints limit product breadth and technology investment. No mobile money integration with M-Pesa at the savings/lending layer. Digital banking UX significantly behind conventional bank competitors.",
    visualLang: "Dark green and gold — standard Islamic finance visual vocabulary. Swahili coast imagery. Professional Kenyan Muslim families. English and Kiswahili with occasional Arabic script accents for Shariah product names.",
    recentComms: "Ramadan takaful and savings campaigns. Hajj savings product awareness. Coast region branch expansion communications. SME Islamic financing campaigns for Mombasa business community.",
    matrixX: 28, matrixY: 22, matrixR: 14, matrixC: "#059669",
  },
  {
    name: "Absa Kenya", type: "Full-Service Bank (International)", users: "~1.5M+ customers",
    founded: "1916 (as National Bank of South Africa), rebranded from Barclays 2020", funding: "Absa Group Limited (listed JSE); 23.7% Kenyan public float via NSE",
    website: "absa.co.ke",
    positioning: "The transition from Barclays to Absa in 2020 was Kenya's most significant bank rebranding event of the decade — and a test of whether an international bank could reinvent itself with genuine African identity after 100+ years of colonial-era brand association. The 'Africanacity' positioning attempts to marry global banking standards with Pan-African pride. Absa Kenya serves the premium urban professional and corporate banking segment.",
    products: "Full retail and corporate banking, Absa Mobile Banking app, FlexiPay (BNPL), home loans, vehicle asset finance, trade finance, Absa Private Banking, wealth management, Timiza digital lending (previously Barclays)",
    ux: "Red (#EF4444) brand identity — the Absa global rebrand. Modern app UX with biometric login, clean dashboard, and integrated loan application. Timiza app provides mobile-first access for mid-market segment.",
    strength: "Absa Group's Pan-African and international banking scale provides product sophistication (structured finance, trade finance, FX) that Kenyan-only banks cannot match. Premium positioning in the corporate and SME banking segment is defensible.",
    weakness: "Barclays-to-Absa rebrand created customer confusion and some attrition. 'Africanacity' marketing positioning feels externally constructed rather than authentically earned. Limited rural reach compared to Equity, KCB, and Co-op.",
    visualLang: "Red (#EF4444) Absa rebrand — bold, Pan-African pride. African portraits, landscape photography, urban professional imagery. The 'Africanacity' visual campaign uses distinctive typographic treatments.",
    recentComms: "Absa FlexiPay BNPL launch. Africanacity brand campaign. Home loan campaign for urban professionals. SME trade finance. Annual Absa Cape Epic Kenya cycling event sponsorship.",
    matrixX: 68, matrixY: 35, matrixR: 16, matrixC: "#EF4444",
  },
];

const Card = ({ children, style, accent = false }) => (
  <div style={{ background: CARD_BG, borderRadius: 12, padding: "26px 30px", border: `1px solid ${accent ? ACCENT + "30" : BORDER}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 16, ...style }}>{children}</div>
);
const SectionTitle = ({ num, title, subtitle }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontSize: 11, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 6, fontFamily: "sans-serif" }}>SECTION {num}</div>
    <h2 style={{ fontSize: 30, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.2, letterSpacing: "-0.02em" }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 15, color: TEXT_MUTED, marginTop: 8, lineHeight: 1.6, maxWidth: 700 }}>{subtitle}</p>}
  </div>
);
const SubHead = ({ children, color = TEXT }) => (
  <h3 style={{ fontSize: 17, fontWeight: 600, color, margin: "0 0 12px", letterSpacing: "-0.01em" }}>{children}</h3>
);
const Label = ({ children, color = ACCENT }) => (
  <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color, fontWeight: 700, marginBottom: 8 }}>{children}</div>
);
const Prose = ({ children, style }) => (
  <p style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.8, margin: "0 0 14px", ...style }}>{children}</p>
);
const Ref = ({ n }) => (
  <sup style={{ fontSize: 9, color: ACCENT, cursor: "help", fontWeight: 600, marginLeft: 1 }} title={SOURCES[n]?.full || ""}>[{n}]</sup>
);
const Severity = ({ level }) => {
  const c = { Critical: "#DC2626", High: "#F59E0B", Medium: "#3B82F6", Low: "#10B981" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 10px", borderRadius: 5, background: (c[level] || "#888") + "15", color: c[level] || "#888" }}>{(level || "").toUpperCase()}</span>;
};

export default function KenyaReport() {
  const [activeSection, setActiveSection] = useState("exec");
  const [compIdx, setCompIdx] = useState(0);
  const sectionRefs = useRef({});
  const [showNav, setShowNav] = useState(false);
  const comp = COMPETITORS[compIdx];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((r) => { if (r) observer.observe(r); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" }); setShowNav(false); };

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Georgia', serif" }}>
      {/* TOP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,248,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🇰🇪</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>Kenya Digital Finance Landscape</span>
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontFamily: "sans-serif", letterSpacing: 1 }}>Q1 2026</span>
        </div>
        <button onClick={() => setShowNav(!showNav)} style={{ background: showNav ? ACCENT : "transparent", color: showNav ? "#fff" : TEXT_MUTED, border: `1px solid ${showNav ? ACCENT : BORDER}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "sans-serif" }}>{showNav ? "✕ Close" : "☰ Navigate"}</button>
      </div>

      {showNav && (
        <div style={{ position: "fixed", top: 48, right: 24, zIndex: 99, background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 8px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 260 }}>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", borderRadius: 8, cursor: "pointer", background: activeSection === s.id ? ACCENT_BG : "transparent", color: activeSection === s.id ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: activeSection === s.id ? 600 : 400, fontFamily: "sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, width: 20, fontFamily: "monospace" }}>{s.num}</span>{s.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px 80px" }}>

        {/* COVER */}
        <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: `2px solid ${TEXT}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 16, fontFamily: "sans-serif" }}>MARKET INTELLIGENCE & BRAND LANDSCAPE ANALYSIS</div>
          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.03em", color: TEXT }}>
            55 Million Hustlers:<br />
            <span style={{ color: ACCENT, fontWeight: 400 }}>The Kenyan Digital Finance Landscape</span>
          </h1>
          <p style={{ fontSize: 17, color: TEXT_SECONDARY, lineHeight: 1.7, maxWidth: 640, margin: "0 0 28px" }}>
            A comprehensive market intelligence and brand landscape analysis of the Kenyan digital banking ecosystem — Sub-Saharan Africa's fintech pioneer, home to the world's most cited mobile money success story, and a market where M-Pesa's dominance is simultaneously the biggest opportunity and the most formidable competitive barrier any entrant will face.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 12, color: TEXT_MUTED, fontFamily: "sans-serif" }}>
            <span>📅 Q1 2026</span><span>📄 {Object.keys(SOURCES).length}+ sources cited</span><span>🔒 Confidential</span>
          </div>
        </div>

        {/* WHO THIS IS FOR */}
        <div style={{ marginBottom: 64, padding: "38px 42px", background: TEXT, borderRadius: 16, color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 18, fontFamily: "sans-serif" }}>WHO THIS REPORT IS FOR</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#E5E7EB", margin: "0 0 20px" }}>
                Kenya is not an emerging fintech market — it is the market that invented mobile money. M-Pesa's 17-year dominance has created an infrastructure reality that makes Kenya simultaneously the most exciting and most difficult market to enter in Africa. Understanding this market requires understanding one central fact: M-Pesa is not a competitor. It is the utility layer. Everything else is built on, around, or against it.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: "#9CA3AF", margin: 0 }}>
                This report is a working reference document for brand strategy and market entry teams who need the full picture — competitor intelligence, consumer psychology, regulatory environment, chama culture, agricultural finance dynamics, and the Islamic finance opportunity — before committing to a Kenya market strategy.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { role: "Brand & Communications Leads", use: "Section 07 covers Kenya's multi-channel media landscape, Kiswahili vs English strategy, and the creative campaigns that have earned trust in a market with high scam awareness." },
                { role: "Strategy & Market Entry Teams", use: "Sections 02–04 map the macro context, M-Pesa infrastructure reality, and the six structural trends reshaping Kenyan fintech in 2025–2026." },
                { role: "Product Teams", use: "Section 06 covers the consumer journey with specific attention to chama savings groups, boda boda economy banking, agricultural finance seasonality, and the Hustler Fund's impact on digital credit expectations." },
                { role: "Islamic Finance Teams", use: "Section 08 covers Kenya's ~5.5M Muslim population (11%), Gulf African Bank's first-mover position, the pending Sukuk legal framework, and the significant Islamic finance whitespace that remains unaddressed by any digital-first player." },
                { role: "Research Teams", use: "Appendix E translates this report's hypotheses into a qualitative and quantitative research design brief, with specific guidance on rural/urban sampling and agricultural community engagement." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "sans-serif", marginBottom: 2 }}>{r.role}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.5 }}>{r.use}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLE OF CONTENTS */}
        <div style={{ marginBottom: 64, padding: "34px 38px", background: CARD_BG, borderRadius: 16, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: TEXT_MUTED, textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 18 }}>TABLE OF CONTENTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
            {[
              [
                { num: "01", title: "Executive Summary", id: "exec", subs: ["Six Key Market Findings", "Headline Metrics & Data Note"] },
                { num: "02", title: "Country Context", id: "context", subs: ["Macroeconomic Overview", "Digital Infrastructure", "Cultural Context: Harambee, Chama & Hustler"] },
                { num: "03", title: "Market Landscape", id: "landscape", subs: ["Market Size & Structure", "CBK Regulatory Environment", "Competitive Positioning Matrix"] },
                { num: "04", title: "Industry Trends", id: "trends", subs: ["M-Pesa as Infrastructure (not competitor)", "Chama Digitisation", "Digital Credit Regulation", "Agricultural Finance", "Diaspora Remittance Corridor", "Silicon Savannah Innovation", "Hustler Fund 2.0 Disruption", "Digital Shilling (CBDC) 2026 Pilot"] },
                { num: "05", title: "Competitive Analysis", id: "competitors", subs: ["9 Competitor Deep-Dive Profiles", "Product · UX · Visual · Strengths · Vulnerabilities"] },
              ],
              [
                { num: "06", title: "Consumer Insights", id: "consumer", subs: ["Generational & Geographic Segmentation", "Chama Savings Groups (TAM)", "Boda Boda Economy", "Trust & Scam Dynamics", "Customer Journey Map (5 stages)"] },
                { num: "07", title: "Communication Landscape", id: "comms", subs: ["7.1 Media Consumption Patterns", "7.2 Advertising Landscape", "7.3 Kiswahili vs English Strategy", "7.4 Messaging Themes Audit", "7.5 Visual & Brand Personality Index", "7.6 Best-in-Class Campaigns"] },
                { num: "08", title: "Islamic Finance", id: "islamic", subs: ["Regulatory Framework (CBK Windows + Sukuk Outlook)", "Market Size (~5.5M Muslim Kenyans, 11%)", "Product Architecture", "Digital Disruption Opportunity", "Non-Muslim Ethical Banking"] },
                { num: "09", title: "Appendices", id: "appendix", subs: ["A — CBK Regulatory Reference", "B — Data Sources (67 cited)", "C — Glossary (35+ terms)", "D — Visual Audit Index", "E — Research Design & Hypotheses"] },
              ]
            ].map((col, ci) => (
              <div key={ci}>
                {col.map((s, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollTo(s.id); }} style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10, cursor: "pointer" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, fontFamily: "monospace", minWidth: 20 }}>{s.num}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{s.title}</span>
                    </a>
                    <div style={{ paddingLeft: 30, marginTop: 3 }}>
                      {s.subs.map((sub, j) => <div key={j} style={{ fontSize: 11, color: TEXT_MUTED, lineHeight: 1.65, paddingLeft: 10, borderLeft: `1px solid ${BORDER}` }}>{sub}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 01 */}
        <section id="exec" ref={(el) => (sectionRefs.current["exec"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="01" title="Executive Summary" subtitle="Kenya invented mobile money — and that invention now both defines and constrains the market's competitive landscape. M-Pesa is not a competitor for new market entrants; it is the infrastructure layer that all 55 million Kenyan financial services consumers already use. The strategic question is not whether to compete with M-Pesa, but how to build valuable financial relationships within or adjacent to it." />
          <Card accent>
            <Prose style={{ fontSize: 15, color: TEXT, lineHeight: 1.85 }}>
              Kenya's digital finance market is the most-cited fintech success story in emerging markets — and simultaneously the most misunderstood. M-Pesa's launch in 2007 and its evolution to 40M+ active users<Ref n={5} /> in a 55M population has produced a market structure unlike any other: financial inclusion of approximately 84.8% (FinAccess 2024<Ref n={3} />, projected 86–88% by Q1 2026) driven primarily by mobile money, not bank accounts. Only ~35% have formal bank accounts — meaning M-Pesa has achieved financial inclusion that banking infrastructure alone could not. This creates the central competitive paradox: you can reach almost every Kenyan through M-Pesa's rails, but building a differentiated financial brand above those rails requires solving for trust, loyalty, and product depth in entirely different ways from markets where banking infrastructure is the primary inclusion vehicle.
            </Prose>
            <Prose style={{ fontSize: 15, color: TEXT }}>
              Five dynamics define Kenya's fintech landscape above all others. First, M-Pesa's infrastructure moat: Safaricom's 250,000+ agent network<Ref n={28} /> and 17 years of habit-loop dominance create an asymmetric competitive barrier that no challenger has meaningfully overcome. Second, the chama economy: Kenya's 300,000+ informal savings groups (chamas) represent a $2B+ annual savings pool that is simultaneously the country's most trusted financial institution and the most underdigitised.<Ref n={27} /> Third, the digital credit proliferation and CBK's 2022 regulatory response: over 100 unregulated digital lenders operated before CBK's Digital Credit Provider Regulations — and the resulting consumer protection framework fundamentally restructured the market.<Ref n={11} /> Fourth, agricultural finance seasonality: 60%+ of Kenya's working population depends on agriculture and experiences income concentration around harvest periods, creating financial product demand patterns with no equivalent in urban-only fintech markets.<Ref n={36} /> Fifth, the diaspora remittance corridor: Kenya receives $4B+ annually in remittances<Ref n={34} /> — a structural financial flow that makes international money transfer a high-priority product category.
            </Prose>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
            {[{ v: "~86–88%", l: "Financial inclusion (incl. mobile money, Q1 2026 est.)", a: true }, { v: "40M+", l: "M-Pesa active users (55M population)", a: true }, { v: "$4B+", l: "Annual diaspora remittances (2024)", a: false }, { v: "300K+", l: "Active chama savings groups", a: false }, { v: "~35%", l: "Formal bank account penetration", a: true }, { v: "250K+", l: "M-Pesa / mobile money agent network", a: false }].map((s, i) => (
              <div key={i} style={{ padding: "18px", background: s.a ? ACCENT_BG : "#F9FAFB", borderRadius: 10, borderLeft: `3px solid ${s.a ? ACCENT : BORDER}` }}>
                <div style={{ fontSize: 26, fontWeight: 300, color: s.a ? ACCENT : TEXT }}>{s.v}</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED, marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
          <Card>
            <SubHead>Six Key Market Findings</SubHead>
            {[
              { f: "M-Pesa is infrastructure, not just a competitor: any entrant must build a strategy for M-Pesa coexistence, not M-Pesa replacement.", w: "No player has displaced M-Pesa in 17 years. The question is how to build value on top of or adjacent to M-Pesa's rails — not how to replace them." },
              { f: "The chama economy ($2B+ annually, 300,000+ groups) is the most important underdigitised financial institution in Kenya.", w: "Chamas have operated as Kenya's savings, credit, and social insurance system for generations. The first digital bank to genuinely serve chama treasury management will acquire the most trusted financial network in Kenya." },
              { f: "Digital credit regulation (CBK 2022) restructured the market: the proliferation era is over, the compliance era is here.", w: "Over 100 unregulated digital lenders operated before CBK's 2022 Digital Credit Provider Regulations. The regulatory framework now creates barriers that favour established players with CBK relationships." },
              { f: "Agricultural finance seasonality is structurally different from urban fintech: 60%+ of Kenyans are income-seasonal.", w: "Tea, coffee, and maize harvests create income spikes 2–3 times per year. Financial products designed around urban monthly salary cycles miss Kenya's dominant income pattern." },
              { f: "The diaspora remittance corridor ($4B+ annually) is competitive but evolving: M-Pesa Global, Equity, and KCB all compete for diaspora flows.", w: "Kenya's diaspora (primarily in the US, UK, and Gulf) sends $4B+ annually. M-Pesa Global charges competitive rates but the market is contested — WorldRemit, Wise, and Remitly all have significant Kenya market share." },
              { f: "Islamic finance whitespace: Kenya's ~5.5M Muslims (~11%) are served by only 2 dedicated Islamic banks and a handful of Islamic windows. No Sukuk legal framework exists yet.", w: "No Islamic digital bank or M-Pesa-integrated Islamic savings product exists in Kenya. The pending Sukuk framework (expected 2025–2026) is the regulatory catalyst that could unlock this market. The opportunity mirrors Malaysia's AEON Bank moment — but 5–10x less served." },
            ].map((f, i) => (
              <div key={i} style={{ padding: "14px 16px", background: i < 2 ? ACCENT_BG : "#F9FAFB", borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${i < 2 ? ACCENT : BORDER}` }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: i < 2 ? ACCENT : "#D1D5DB", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "sans-serif" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{f.f}</div>
                    <div style={{ fontSize: 11, color: TEXT_MUTED, fontStyle: "italic" }}>{f.w}</div>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* SECTION 02 */}
        <section id="context" ref={(el) => (sectionRefs.current["context"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="02" title="Country Context" subtitle="Kenya is Sub-Saharan Africa's most sophisticated digital economy — the Silicon Savannah — but one where 60%+ of livelihoods remain tied to agriculture, where the informal economy is larger than the formal, and where community structures like chamas shape financial behaviour more than any product feature." />
          <Card>
            <SubHead>Macroeconomic Overview</SubHead>
            <Prose>Kenya is approximately a $110 billion economy<Ref n={20} /> growing at 5.0–5.5% annually — one of East Africa's strongest performers, anchored by services (50%+ of GDP), agriculture (~25%), and manufacturing. GDP per capita of approximately $2,100 places Kenya firmly in lower-middle-income status — a demographic context where financial product pricing must accommodate income levels dramatically different from Malaysia or the Philippines. The Kenya Shilling (KES) has experienced significant depreciation against the US dollar (KES 130 → 160 between 2022–2024), creating remittance-side demand and import-price inflation.<Ref n={21} /> The Central Bank of Kenya (CBK) held its Central Bank Rate (CBR) at 13.0% through early 2025 — one of the highest rates in the region, reflecting inflation management after the KES depreciation.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[{ v: "~$110B", l: "GDP" }, { v: "$2,100", l: "GDP per capita" }, { v: "5.0–5.5%", l: "GDP growth" }, { v: "13.0%", l: "CBK Central Bank Rate" }, { v: "55M", l: "Population" }, { v: "~20", l: "Median age" }, { v: "~30%", l: "Urbanisation rate" }, { v: "$4B+", l: "Annual diaspora remittances" }].map((m, i) => (
                <div key={i} style={{ padding: "12px", background: "#F9FAFB", borderRadius: 8 }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: i < 2 ? ACCENT : TEXT }}>{m.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>Digital Infrastructure</SubHead>
            <Prose>Internet penetration in Kenya reached approximately 43% of the population (24M+ users) in 2025 — reflecting the rapid smartphone adoption among the urban youth demographic while rural penetration remains significantly lower.<Ref n={10} /> The distinction between 'internet user' and 'mobile money user' is critical in Kenya: M-Pesa operates on USSD (*334#), which works on any mobile phone including 2G feature phones with no internet required. This makes M-Pesa financially accessible to approximately 95%+ of the population with a phone — dramatically higher than internet-dependent banking alternatives. Smartphone penetration is approximately 60% nationally but skews heavily urban — 85%+ in Nairobi vs 30–40% in rural counties.<Ref n={25} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[{ v: "43%", l: "Internet penetration" }, { v: "~60%", l: "Smartphone penetration nationally" }, { v: "95%+", l: "Mobile phone coverage (2G+, USSD-capable)" }, { v: "~86–88%", l: "Financial inclusion (mobile money + bank, Q1 2026 est.)" }, { v: "40M+", l: "M-Pesa active users (Q1 2026)" }, { v: "250K+", l: "Mobile money agent touchpoints" }, { v: "~70%", l: "Mobile share of e-commerce transactions" }, { v: "KES 7.6T", l: "M-Pesa transaction value annually (~$47B)" }].map((d, i) => (
                <div key={i} style={{ padding: "12px", background: "#F9FAFB", borderRadius: 8 }}>
                  <div style={{ fontSize: 18, fontWeight: 300, color: i < 2 ? ACCENT : TEXT }}>{d.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{d.l}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card accent>
            <SubHead color={ACCENT}>Cultural Context: Harambee, Chama & Hustler</SubHead>
            <Prose>Three cultural dynamics shape financial brand strategy in Kenya more than any product feature or pricing decision. First, <strong>Harambee</strong> — Kenya's founding philosophy of collective self-help, institutionalised by Jomo Kenyatta and embedded in the national coat of arms. Harambee creates cultural expectations around communal financial pooling, mutual support, and collective action. Financial products that align with Harambee values — group savings, community lending, collective investment — carry an implicit legitimacy that individual-oriented products do not.<Ref n={27} /></Prose>
            <Prose>Second, the <strong>chama</strong> — Kenya's informal savings and investment group, gathering between 5 and 30 members who pool contributions regularly for rotating loans, group investments, and emergency mutual aid. An estimated 300,000+ active chamas manage $2B+ in annual savings flows.<Ref n={27} /> Chamas are Kenya's most trusted financial institution — more trusted than banks, mobile money providers, or regulated SACCOs (Savings and Credit Cooperatives) among the majority of financially active adults. The chama is simultaneously the biggest undigitised financial opportunity and the most culturally sensitive platform for technology intervention.</Prose>
            <Prose style={{ marginBottom: 0 }}>Third, the <strong>Hustler</strong> identity — Kenya's Gen Z and Millennial cultural archetype. Kenya's Hustler culture celebrates informal entrepreneurship, resourcefulness, and self-determination in the face of formal economy exclusion. The Government of Kenya's 'Hustler Fund' (launched November 2022) gave this identity an institutional name, disbursing over KES 30B+ in digital micro-credit to 21M+ registered borrowers.<Ref n={56} /> Any fintech that authentically speaks to the Hustler identity — dignifying informal economic activity rather than treating it as a risk factor — has a structural advantage in the 18–40 demographic.</Prose>
          </Card>
        </section>

        {/* SECTION 03 */}
        <section id="landscape" ref={(el) => (sectionRefs.current["landscape"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="03" title="Market Landscape" subtitle="Kenya's fintech market is defined by a single structural fact that makes it unlike any other in the world: M-Pesa processes transactions equivalent to approximately 55% of Kenya's GDP annually. Understanding the competitive landscape requires understanding M-Pesa's dual nature — as both market participant and market infrastructure." />
          <Card>
            <SubHead>Market Size & Structure</SubHead>
            <Prose>Kenya's mobile money market processed KES 7.6 trillion (~$47B) in transactions in 2024<Ref n={23} /> — in an economy with a nominal GDP of approximately $110B, this means mobile money transaction volume is equivalent to approximately 43% of GDP flowing through the payment rails annually. The formal banking sector manages approximately KES 6.3 trillion in deposits across 42 licensed commercial banks.<Ref n={31} /> Total financial inclusion stands at 83%<Ref n={3} />, with mobile money accounting for the majority of the inclusion gain since 2007. SACCO (Savings & Credit Cooperatives) assets exceed KES 900B, serving 14M+ members — Kenya's second-largest formal savings pool after the banking system.<Ref n={3} /></Prose>
            <Prose>The competitive structure is oligopolistic around M-Pesa: Safaricom holds approximately 65%+ of mobile money market share by users and significantly more by transaction value.<Ref n={2} /> Airtel Money is the primary challenger. In banking, Equity Bank leads by customer count, KCB leads by assets, and Co-operative Bank dominates the rural agricultural cooperative segment. The Hustler Fund (government-backed digital credit) entered as an unexpected market disruptor in 2022, setting a KES 50 daily credit floor for any Kenyan with a national ID.</Prose>
          </Card>
          <Card>
            <SubHead>CBK Regulatory Environment</SubKey>
            <Prose>The Central Bank of Kenya operates a progressive but increasingly assertive digital finance regulatory framework. Key regulatory pillars:<Ref n={2} /></Prose>
            {[
              { label: "Mobile Money Regulation", text: "Safaricom and Airtel Money operate under CBK's National Payment System Regulations (2014, updated 2021). CBK mandated mobile money interoperability in 2023 — M-Pesa and Airtel Money users can now transact across networks, reducing the network effect advantage M-Pesa previously held." },
              { label: "Digital Credit Provider Regulations (2022)", text: "CBK's most significant 2022 intervention: all digital lenders required to register with CBK, meet minimum capital requirements (KES 20M), disclose all fees, and report to licensed Credit Reference Bureaus. Over 100 unregulated lenders were forced to formalise or exit. This created a structurally cleaner market that favours regulated players." },
              { label: "Banking Sector Digital Banking", text: "CBK's National Payments Strategy 2022–2025 mandates interoperability across all payment channels, open banking data portability, and a DeFi policy framework for crypto asset oversight." },
              { label: "Interest Rate Policy", text: "The removal of the interest rate cap in 2019 (repealing the Banking (Amendment) Act 2016) allowed banks to price credit to riskier borrowers — enabling a formal credit expansion that partly explains the digital lending boom and subsequent CBK regulatory response." },
            ].map((r, i) => (
              <div key={i} style={{ padding: "12px 16px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${[ACCENT, "#3B82F6", "#10B981", "#F59E0B"][i]}` }}>
                <Label color={[ACCENT, "#3B82F6", "#10B981", "#F59E0B"][i]}>{r.label}</Label>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.6 }}>{r.text}</p>
              </div>
            ))}
          </Card>
          <Card>
            <SubHead>Competitive Positioning Matrix</SubHead>
            <Prose style={{ marginBottom: 16 }}>Mapped on product breadth (narrow → full-service) and user scale (emerging → mass adoption). Click to view detailed profiles in Section 05.</Prose>
            <div style={{ position: "relative", width: "100%", height: 340, background: "#FAFAFA", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}` }}>
              {[20, 40, 60, 80].map(v => <div key={`x${v}`} style={{ position: "absolute", left: `${v}%`, top: 0, bottom: 0, borderLeft: "1px dashed #E5E7EB" }} />)}
              {[20, 40, 60, 80].map(v => <div key={`y${v}`} style={{ position: "absolute", top: `${100 - v}%`, left: 0, right: 0, borderTop: "1px dashed #E5E7EB" }} />)}
              <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "sans-serif" }}>← Narrow / Specialist</div>
              <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "sans-serif" }}>Full-Service →</div>
              <div style={{ position: "absolute", top: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "sans-serif" }}>Mass Adoption ↑</div>
              {COMPETITORS.map((c, i) => (
                <div key={i} onClick={() => { setCompIdx(i); scrollTo("competitors"); }} style={{ position: "absolute", left: `${c.matrixX}%`, bottom: `${c.matrixY}%`, transform: "translate(-50%, 50%)", cursor: "pointer", zIndex: 10 }}>
                  <div style={{ width: c.matrixR, height: c.matrixR, borderRadius: "50%", background: c.matrixC + "25", border: `2px solid ${c.matrixC}80`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.matrixC }} />
                  </div>
                  <div style={{ fontSize: 9, color: c.matrixC, fontWeight: 700, textAlign: "center", marginTop: 2, whiteSpace: "nowrap", fontFamily: "sans-serif" }}>{c.name.split(" ")[0]}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* SECTION 04 */}
        <section id="trends" ref={(el) => (sectionRefs.current["trends"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="04" title="Industry Trends" subtitle="Six structural trends are reshaping Kenyan fintech — each revealing tensions between M-Pesa's infrastructure dominance and the emerging financial needs that M-Pesa alone cannot serve." />
          {[
            { t: "M-Pesa as Infrastructure Layer", d: "The most important strategic insight in Kenyan fintech is that M-Pesa has transitioned from 'mobile money product' to 'national financial infrastructure.' M-Pesa Global handles 200+ country remittances. M-Shwari provides savings and loans built on M-Pesa rails, operated by NCBA. Fuliza is an overdraft built into M-Pesa's send-money flow. DigiFarm provides agricultural financing on M-Pesa infrastructure. The strategic response to M-Pesa dominance is not competition — it is complementarity or deep differentiation.", why: "Any digital bank that builds on M-Pesa's API ecosystem can access 40M+ active users. The challenge is building a financial relationship above the utility layer — making your brand the emotional context for financial decisions that happen on M-Pesa rails.", icon: "📱", src: 5 },
            { t: "Chama Digitisation: The $2B Savings Opportunity", d: "Kenya's 300,000+ active chamas manage an estimated $2B+ in annual savings flows — and the majority still operate via cash-in-a-tin or basic M-Pesa group accounts without treasury management, loan tracking, or investment tools.<Ref n={27} /> Startups like Chamasoft and Kachoo have begun digitising chama treasury management, but no major bank or M-Pesa has built a compelling chama-native financial product. The chama is Kenya's most trusted savings institution.", why: "The chama that adopts a digital treasury tool becomes a distribution channel — reaching every member of every member's social network. 300,000 chamas × average 15 members = 4.5M+ potential users accessible through chama digitisation.", icon: "🤝", src: 27 },
            { t: "Digital Credit Regulation: The Post-Proliferation Era", d: "Between 2015–2022, over 100 digital lenders operated in Kenya, many without CBK oversight. Predatory lending practices — 60%+ effective APRs, CRB-blacklisting for KES 100 defaults — drove CBK's 2022 Digital Credit Provider Regulations.<Ref n={11} /> Over 60 lenders exited the market or failed to register. The remaining players (Tala, Branch, Safaricom's products, bank-embedded digital credit) now operate under disclosure, CRB reporting, and appeals requirements.", why: "The regulatory clean-up has reduced supply-side lending capacity significantly, creating a credit gap — particularly for thin-file borrowers (informal sector, agricultural workers, youth first-timers). Any regulated player with superior credit risk data can serve this gap profitably.", icon: "⚖️", src: 11 },
            { t: "Agricultural Finance Seasonality", d: "60%+ of Kenya's working population is engaged in agriculture — tea, coffee, maize, horticulture, dairy, and livestock.<Ref n={36} /> Agricultural income is structurally seasonal: tea farmers in Kericho receive 2 main payments per year, coffee farmers in Nyeri receive 1, maize farmers in the Rift Valley harvest twice annually. These seasonal income spikes create financial product demand patterns — input financing before planting season, savings and insurance products after harvest — that M-Pesa's generic product architecture doesn't serve well.", why: "DigiFarm (Safaricom × Syngenta) and Co-operative Bank's MCo-op Cash have begun addressing agricultural finance, but the market is dramatically underserved. Seasonal income smoothing, harvest insurance, and co-operative payroll banking for 8M+ smallholder farmers are the most underpenetrated financial product category in Kenya.", icon: "🌾", src: 36 },
            { t: "Diaspora Remittance Corridor ($4B+ annually)", d: "Kenya's diaspora — concentrated in the US (30%), UK (25%), and Gulf (20%) — sent $4B+ to Kenya in 2024.<Ref n={34} /> M-Pesa Global, Equity Bank, KCB, and WorldRemit compete for these flows. Remittance costs have fallen significantly (from 8–10% to 3–5%) under CBK pressure and market competition. Mobile-first remittance platforms (Wise, Remitly) have taken significant market share from traditional transfer operators.", why: "The $4B+ remittance market is growing at 7–10% annually, driven by Kenya's rapidly expanding diaspora population. Competitors are primarily competing on cost — the brand that wins on speed, reliability, and emotional resonance ('sending love home') can build durable loyalty in a cost-commoditised category.", icon: "✈️", src: 34 },
            { t: "Silicon Savannah: Kenya as Africa's Fintech Innovation Hub", d: "Nairobi is Sub-Saharan Africa's undisputed technology capital — home to Google, Microsoft, and IBM Africa headquarters, Safaricom's M-Pesa API (one of Africa's most referenced developer platforms), and a startup ecosystem that attracted $800M+ in venture capital in 2023–2024.<Ref n={40} /> Kenya's fintech talent pipeline — USIU, Strathmore, University of Nairobi — produces engineers and product designers who have gone on to build financial products across Africa.", why: "Any regional fintech strategy in East or Sub-Saharan Africa that does not begin with Kenya is strategically incomplete. Kenya is the reference market, the talent market, and the regulatory laboratory for the continent.", icon: "🚀", src: 40 },
            { t: "Hustler Fund 2.0: The Government Credit Disruption", d: "The Government of Kenya's Hustler Fund — launched November 2022 — has disrupted Kenya's digital credit market in ways regulators did not anticipate. With KES 30B+ disbursed to 21M+ borrowers at government-subsidised rates, Hustler Fund 2.0 (expanded scope post-2024 elections) has structurally depressed private lender volume by setting a near-zero-cost credit floor.<Ref n={56} /> Tala and Branch report that price-sensitive borrowers now benchmark all private credit against the Hustler Fund rate. The second phase added group lending (chama-level credit) and enterprise loans — directly entering territory previously exclusive to banks and SACCOs.", why: "No private lender can price below the government. The competitive response is to differentiate on product (credit + savings + insurance in one interface), speed (instant disbursement for recurring customers), and relationship (financial coaching, credit score building) rather than rate. Tala's pivot toward full neobank is partly a Hustler Fund response.", icon: "🏛", src: 56 },
            { t: "Digital Shilling (CBDC): CBK's 2025–2026 Pilot Horizon", d: "The Central Bank of Kenya published its CBDC discussion paper in 2023 and has been in active policy development through 2024–2025. CBK's Digital Shilling is expected to enter pilot phase in 2026 — targeting government payment flows, cross-border settlement, and financial inclusion for the unbanked population that even M-Pesa has not reached (approximately 12–14% of adults).<Ref n={2} /> Kenya's CBDC design draws lessons from Nigeria's eNaira (adoption failure due to poor UX and limited use cases) and focuses on M-Pesa interoperability and merchant acceptance from day one.", why: "A CBK Digital Shilling that operates on M-Pesa's agent infrastructure would reach every Kenyan with a phone without requiring a bank account. For private fintechs, the CBDC question is: does it compete with or complement private digital money? CBK's current design intent is complementarity — but the boundary between government and private financial infrastructure in Kenya is already blurred by the Hustler Fund.", icon: "🏦", src: 12 },
          ].map((t, i) => (
            <Card key={i} style={{ borderLeft: i < 2 ? `4px solid ${ACCENT}` : `4px solid ${BORDER}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{t.icon}</span>
                <SubHead color={i < 2 ? ACCENT : TEXT}>{t.t}</SubHead>
              </div>
              <Prose>{t.d}</Prose>
              <div style={{ padding: "12px 16px", background: "#FFF7ED", borderRadius: 8, borderLeft: "3px solid #F59E0B" }}>
                <Label color="#D97706">Market Significance</Label>
                <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.6, margin: 0 }}>{t.why}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* SECTION 05 */}
        <section id="competitors" ref={(el) => (sectionRefs.current["competitors"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="05" title="Competitive Analysis" subtitle="Deep-dive profiles of 9 key competitors — from M-Pesa's infrastructure dominance to Islamic banking's Gulf African Bank niche and the digital lending category defined by Tala." />
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {COMPETITORS.map((c, i) => (
              <button key={i} onClick={() => setCompIdx(i)} style={{ padding: "7px 13px", borderRadius: 8, cursor: "pointer", border: i === compIdx ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`, background: i === compIdx ? ACCENT_BG : CARD_BG, color: i === compIdx ? ACCENT : TEXT_SECONDARY, fontSize: 12, fontWeight: i === compIdx ? 700 : 500, fontFamily: "sans-serif" }}>{c.name.split(" ")[0]}</button>
            ))}
          </div>
          <Card accent>
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 24, fontWeight: 400, margin: "0 0 8px", color: TEXT }}>{comp.name}</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 6, background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontFamily: "sans-serif" }}>{comp.type}</span>
                <span style={{ fontSize: 12, color: TEXT_MUTED, fontFamily: "sans-serif" }}>Founded: {comp.founded}</span>
                <span style={{ fontSize: 12, color: TEXT_MUTED, fontFamily: "sans-serif" }}>Users: {comp.users}</span>
              </div>
            </div>
            {[{ label: "Positioning", text: comp.positioning }, { label: "Products & Services", text: comp.products }, { label: "UX & Design", text: comp.ux }, { label: "Visual & Verbal Identity", text: comp.visualLang }].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <Label color={i === 0 ? ACCENT : TEXT_MUTED}>{s.label}</Label>
                <Prose style={{ marginBottom: 0 }}>{s.text}</Prose>
              </div>
            ))}
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
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

        {/* SECTION 06 */}
        <section id="consumer" ref={(el) => (sectionRefs.current["consumer"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="06" title="Consumer Insights" subtitle="Kenya's financial consumer is the youngest, most mobile-money-dependent, and most entrepreneurially oriented in East Africa — shaped by a median age of 20, the chama savings culture, the boda boda informal economy, and a digital credit over-indebtedness crisis that has reset trust expectations." />
          <Card accent>
            <SubHead color={ACCENT}>Key Consumer Data Points</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[{ v: "~86–88%", l: "Financial inclusion (84.8% actual 2024, Q1 2026 est.)", src: 3, a: true }, { v: "~35%", l: "Formal bank account penetration", src: 4, a: false }, { v: "40M+", l: "M-Pesa active users (Q1 2026)", src: 5, a: true }, { v: "21M+", l: "Hustler Fund registered borrowers", src: 56, a: false }, { v: "300K+", l: "Active chama savings groups", src: 27, a: true }, { v: "$4B+", l: "Annual diaspora remittances", src: 34, a: false }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: s.a ? ACCENT_BG : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${s.a ? ACCENT : BORDER}` }}>
                  <div style={{ fontSize: 22, fontWeight: 300, color: s.a ? ACCENT : TEXT }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}<Ref n={s.src} /></div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>Generational & Geographic Segmentation</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
              {[{ gen: "Gen Z", age: "15–28", pct: "35%", traits: "Digital-native, M-Pesa from secondary school, TikTok financial literacy, Hustler Fund borrowers, boda boda economy participants", color: ACCENT }, { gen: "Millennials", age: "29–44", pct: "28%", traits: "Primary digital banking adopters, highest chama participation, side hustle economy leaders, diaspora remittance senders", color: "#3B82F6" }, { gen: "Gen X", age: "45–60", pct: "20%", traits: "Hybrid branch + mobile, highest asset accumulation, co-operative and Sacco loyalty, agricultural landowners", color: "#F59E0B" }, { gen: "Boomers+", age: "61+", pct: "17%", traits: "Branch-dependent, highest savings balances, pension/NSSF focus, most vulnerable to phone scam fraud", color: "#10B981" }].map((g, i) => (
                <div key={i} style={{ padding: "14px", background: "#F9FAFB", borderRadius: 10, borderTop: `3px solid ${g.color}` }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: g.color }}>{g.pct}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginTop: 2 }}>{g.gen}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED }}>Age {g.age}</div>
                  <p style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "6px 0 0" }}>{g.traits}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ seg: "Urban Nairobi / Mombasa", pct: "~30%", traits: "Smartphone-heavy, multi-app banking, corporate employment + informal side hustle, highest income", color: ACCENT }, { seg: "Peri-Urban (Tier 2 cities)", pct: "~25%", traits: "Growing smartphone adoption, M-Pesa primary, small trader economy, Sacco membership common", color: "#3B82F6" }, { seg: "Rural Agricultural", pct: "~35%", traits: "Feature phone M-Pesa USSD, co-operative banking, seasonal income, chama savings dominant", color: "#F59E0B" }, { seg: "Arid & Semi-Arid (ASAL)", pct: "~10%", traits: "Pastoralist economy, lowest formal banking, climate vulnerability, M-Pesa primary and often only financial tool", color: "#10B981" }].map((g, i) => (
                <div key={i} style={{ padding: "12px 14px", background: "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${g.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: TEXT, fontFamily: "sans-serif" }}>{g.seg}</span>
                    <span style={{ fontSize: 11, color: g.color, fontWeight: 700, fontFamily: "sans-serif" }}>{g.pct}</span>
                  </div>
                  <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.5 }}>{g.traits}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card accent>
            <SubHead color={ACCENT}>The Chama: Kenya's Most Important Undigitised Financial Institution</SubHead>
            <Prose>The chama (Kiswahili for 'group' or 'club') is Kenya's defining financial institution — more trusted by more Kenyans than any bank, mobile money service, or government savings programme. An estimated 300,000+ active chamas manage $2B+ in annual savings flows, primarily as merry-go-round (rotating savings and credit), joint investment accounts, or emergency mutual aid funds.<Ref n={27} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
              {[{ v: "300K+", l: "Active chamas in Kenya", a: true }, { v: "$2B+", l: "Estimated annual savings under management", a: true }, { v: "~15", l: "Average members per chama", a: false }, { v: "60%+", l: "Adult Kenyan women participate in a chama", a: false }, { v: "95%", l: "Chamas that still operate cash-in-hand or basic M-Pesa", a: false }, { v: "$400M+", l: "Estimated chama savings digitisation opportunity", a: true }].map((s, i) => (
                <div key={i} style={{ padding: "12px", background: s.a ? ACCENT_BG : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${s.a ? ACCENT : BORDER}` }}>
                  <div style={{ fontSize: 18, fontWeight: 300, color: s.a ? ACCENT : TEXT }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", background: "#FFF7ED", borderRadius: 8, borderLeft: "3px solid #F59E0B" }}>
              <Label color="#D97706">Strategic Whitespace</Label>
              <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.6, margin: 0 }}>No major bank, M-Pesa, or fintech has built a genuinely chama-native digital product — one that manages rotating savings rounds, tracks loan repayments, sends Kiswahili-language meeting reminders, and provides group investment portfolios in a single mobile interface. The player that wins chama treasury digitisation will acquire 300,000 community financial institutions as distribution partners — each serving 10–30 of Kenya's highest-savings-rate adults.</p>
            </div>
          </Card>
          <Card>
            <SubHead>The Boda Boda Economy: Kenya's Informal Financial Frontier</SubHead>
            <Prose>Kenya's boda boda (motorcycle taxi) industry employs approximately 1.5 million riders and generates KES 200B+ in annual income.<Ref n={55} /> The boda boda economy is Kenya's most visible informal financial segment — high daily cash flow, no formal employment contract, no payslip for bank loan applications, and primary financial management via M-Pesa. Platforms like M-Pesa Pochi la Biashara, Little (ride-hailing), and Sendy (logistics) have begun building digital financial products for boda boda riders. The boda boda rider is Kenya's archetype of the Hustler demographic: hard-working, digitally connected, financially excluded by traditional banking criteria, and acutely aware of every shilling's value.<Ref n={24} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8, borderLeft: "3px solid #3B82F6" }}>
                <Label color="#3B82F6">Unmet Needs</Label>
                <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>Income smoothing across daily/weekly earnings. Motorcycle asset financing (current loan options are loan-shark rates). Accident and liability insurance. Pension/retirement savings that accommodate irregular income. Credit building without payslip-dependent underwriting.</p>
              </div>
              <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8, borderLeft: "3px solid #10B981" }}>
                <Label color="#10B981">TAM</Label>
                <p style={{ fontSize: 12, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>1.5M+ boda boda riders. Average daily income KES 600–1,200. Annual income pool: KES 300–600B. Addressable financial services (insurance, credit, savings): estimated KES 100B+ annually. Currently largely served by informal money lenders and basic M-Pesa.</p>
              </div>
            </div>
          </Card>
          <Card style={{ borderTop: "4px solid #EF4444" }}>
            <SubHead color="#EF4444">The Digital Credit Trust Deficit</SubHead>
            <Prose>Kenya's digital lending crisis is one of the most documented consumer protection failures in global fintech. Between 2015–2022, over 100 unregulated digital lenders operated with effective APRs of 60–500%. CGAP estimated that 14–50% of borrowers were over-indebted.<Ref n={58} /> CRB Kenya's blacklist reached 4M+ negative listings — driven by defaults as small as KES 100 ($0.60). The social damage — relationships broken over digital loan shame, suicides linked to CRB blacklisting — led to CBK's 2022 intervention and a presidential directive to write off Hustler Fund penalties.</Prose>
            <div style={{ padding: "14px 18px", background: "#FEF2F2", borderRadius: 8, borderLeft: "4px solid #EF4444" }}>
              <p style={{ fontSize: 12, color: "#991B1B", margin: 0, lineHeight: 1.6 }}><strong>Brand implication:</strong> Any fintech entering Kenya with a credit product faces a recovery-of-trust challenge. Transparent pricing, CRB-safe grace periods, and human-readable terms are not differentiators — they are minimum entry requirements. The brand that most credibly signals 'we are different from the predatory lenders' has a structural advantage in a market traumatised by credit.<Ref n={66} /></p>
            </div>
          </Card>
          <Card>
            <SubHead>Customer Journey Map</SubHead>
            {[
              { stage: "Awareness", icon: "🔍", color: "#3B82F6", text: "Radio remains Kenya's highest-reach mass media — approximately 80% of adults listen weekly, including in rural areas with no electricity (battery/solar radios).<Ref n={53} /> Facebook reaches ~15M Kenyans; YouTube is rapidly growing among urban Gen Z; TikTok is the primary financial literacy platform for the 18–28 demographic. WhatsApp is the primary community communication channel — chama updates, Sacco meeting reminders, and financial product referrals happen primarily via WhatsApp groups. For the 65%+ of Kenyans outside Nairobi/Mombasa, radio advertising in local languages (Kikuyu, Luo, Luhya, Kamba, Kalenjin) is more effective than digital media." },
              { stage: "Consideration", icon: "🤔", color: "#A78BFA", text: "Ranked decision factors for Kenyan digital financial services: (1) Security & fraud protection — 82%, (2) Cost of transactions — 76%, (3) M-Pesa compatibility (can I receive/send to M-Pesa?) — 72%, (4) Ease of use (USSD fallback for non-smartphone) — 68%, (5) Community endorsement (has my chama or someone I trust used this?) — 63%, (6) Agent availability for cash in/out — 55%.<Ref n={66} /> CRB reporting transparency has become a new consideration factor post-2022 regulation. Kiswahili-language customer service is a strong differentiator outside urban Nairobi." },
              { stage: "Activation", icon: "⚡", color: "#10B981", text: "Five activation triggers: (1) M-Pesa ecosystem — existing M-Pesa users are offered an embedded product (Fuliza, M-Shwari) that requires zero new account opening. This is the most frictionless activation in Kenyan fintech. (2) Chama referral — trusted peer in a savings group recommends a financial product. (3) Harvest payroll — agricultural cooperative pays season earnings via a specific financial platform. (4) Hustler credit need — a time-sensitive need (repair bike, purchase stock, cover school fee) drives first digital credit application. (5) Diaspora receipt — receiving money from abroad via a specific platform prompts account creation." },
              { stage: "Usage Patterns", icon: "🔄", color: "#F59E0B", text: "The median M-Pesa user transacts 27 times per month — overwhelmingly small-value: airtime purchase, small merchant payment, transport fare, low-value P2P transfer.<Ref n={23} /> Agricultural users show extreme seasonal concentration: 80%+ of a smallholder farmer's annual savings deposit may occur in a single 2-week post-harvest window. December is Kenya's highest transaction month — school fees, Christmas, and end-of-year chama distributions converge. Ramadan creates a spending and savings spike for Kenya's 5.5M+ Muslim population (approximately 11% of national total)." },
              { stage: "Churn Triggers", icon: "🚪", color: "#EF4444", text: "Five churn drivers: (1) CRB negative listing — customers who receive a CRB blacklisting from a digital product often exit that platform permanently and warn their chama. (2) M-Pesa fee increase — even small transaction cost increases drive comparative behaviour. (3) Agent unavailability — if a product requires cash in/out and the local agent is consistently unavailable, the product fails in practice. (4) Hidden fees — undisclosed charges are the single most trust-destroying product design failure in Kenya's post-predatory-lending market. (5) Network failure — USSD downtime during critical payment moments (rent due, market day) creates lasting negative association.<Ref n={66} />" },
            ].map((j, i) => (
              <div key={i} style={{ padding: "14px 18px", borderLeft: `4px solid ${j.color}`, marginBottom: 10, background: i === 4 ? "#FEF2F2" : "#F9FAFB", borderRadius: "0 10px 10px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{j.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: j.color, letterSpacing: 0.5, fontFamily: "sans-serif" }}>{j.stage.toUpperCase()}</span>
                </div>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.7, margin: 0 }}>{j.text}</p>
              </div>
            ))}
          </Card>
        </section>

        {/* SECTION 07 */}
        <section id="comms" ref={(el) => (sectionRefs.current["comms"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="07" title="Communication Landscape" subtitle="Kenyan fintech communications operate across a radical media spectrum — from national Kiswahili radio reaching rural farmers to TikTok financial literacy for Nairobi's Gen Z Hustlers. The brand that wins radio wins Kenya." />
          <Card>
            <SubHead>7.1 — Media Consumption Patterns</SubHead>
            <Prose>Kenya's media landscape is stratified by geography, language, and income in ways that make national campaign planning genuinely complex. Radio reaches approximately 80% of adults weekly — including rural communities that cannot receive internet or TV signals. Television reaches approximately 55% of adults. Facebook reaches approximately 15M users. TikTok is the fastest-growing platform for Gen Z (18–28) financial content — financial literacy 'money hacks' in Kiswahili and Sheng (urban youth dialect) are among the platform's most-shared content types.<Ref n={10} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[{ n: "Radio", p: "~80%", note: "Highest mass-reach media. Kiswahili + local language essential. Rural reach unmatched. Most important channel for financial inclusion comms." }, { n: "TV (Citizen, NTV, KTN)", p: "~55%", note: "Urban and peri-urban. Kiswahili news dominant. Safaricom M-Pesa emotional brand films air here." }, { n: "Facebook", p: "~15M users", note: "Primary social platform. Community groups, chama pages, market women networks." }, { n: "YouTube", p: "Growing", note: "Financial product reviews, personal finance tutorials. KimaniMwenda-type influencers." }, { n: "TikTok", p: "Rapid Gen Z growth", note: "Kiswahili + Sheng financial literacy. Hustler identity content. Highest Gen Z purchase intent." }, { n: "WhatsApp", p: "~20M users", note: "Primary community comms. Chama groups, Sacco updates, M-Pesa money requests. Word-of-mouth lives here." }].map((p, i) => (
                <div key={i} style={{ padding: "12px 14px", background: "#F9FAFB", borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>{p.n}</span>
                    <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700, fontFamily: "sans-serif" }}>{p.p}</span>
                  </div>
                  <p style={{ fontSize: 11, color: TEXT_MUTED, margin: 0 }}>{p.note}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>7.2 — Language Strategy: Kiswahili vs English</SubHead>
            <Prose>Kenya's official languages are Kiswahili and English — but the functional reality of financial communications is more complex. Nairobi urban professionals: English-first brand communications, Kiswahili product names acceptable. Gen Z urban: Sheng (street slang mixing Kiswahili, English, and ethnic language elements) for social media. Rural agricultural communities: mother tongue (Kikuyu, Dholuo, Luhya, Kamba, Kalenjin) radio/community content. National broadcast: Kiswahili.</Prose>
            <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${ACCENT}` }}>
              <Label>Language Decision Framework</Label>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>Brand positioning and premium communications: English. Product naming (M-Pesa, Fuliza, Pochi la Biashara): Kiswahili — Kiswahili product names signal 'built for Kenyans not for London.' Mass-market advertising and community events: Kiswahili. Radio in agricultural counties: local mother tongue. Social media for Gen Z: Sheng and Kiswahili mixed. Any brand entering Kenya with English-only positioning will be perceived as foreign and inaccessible by 70%+ of the target market.</p>
            </div>
          </Card>
          <Card>
            <SubHead>7.3 — Messaging Themes Audit</SubHead>
            <Prose>Core category messaging themes in Kenyan fintech: maisha bora (good life / better living), biashara (business success), familia (family protection), usalama (safety/security), ukweli (transparency/honesty), and pamoja (together/community).<Ref n={47} /> The most differentiating brand message in a post-predatory-lending market: transparency and honesty — brands that can credibly signal 'no hidden fees, no surprises, no CRB blacklisting for small defaults' have a structural advantage among the 4M+ Kenyans who have experienced a CRB negative listing.</Prose>
            <div style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8 }}>
              <Label>Brand Messaging by Competitor</Label>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>M-Pesa: 'Hakuna Matata' (no worries — ubiquitous safety). Equity: 'Wings to Fly' (aspiration and financial empowerment). KCB: 'Together We Can' (heritage partnership). NCBA/Loop: 'Banking for the Next Generation' (urban professional digital). Co-op: 'Jibu ni Co-op' (the answer is Co-op — cooperative trust). Tala: 'Get more done' (Hustler enablement). Absa: 'Africanacity' (Pan-African pride). Gulf African Bank: 'Finance for All' (Islamic inclusion).</p>
            </div>
          </Card>
          <Card>
            <SubHead>7.4 — Visual & Brand Personality Index</SubHead>
            <Label color={ACCENT}>Competitive Colour Spectrum</Label>
            {[
              { brand: "M-Pesa", hex: "#4CAF50", desc: "Safaricom green — Kenya's most recognisable financial colour by a massive margin. 17 years of habit makes green = money = M-Pesa in Kenyan visual culture." },
              { brand: "Equity Bank", hex: "#E53935", desc: "Bold red — aspirational, energetic. 'Wings to Fly' scholarship imagery elevates this beyond standard corporate red into genuine emotional warmth." },
              { brand: "KCB Group", hex: "#1565C0", desc: "Institutional blue — heritage, authority, stability. 130-year bank credibility in colour form. Conservative but trusted." },
              { brand: "NCBA / Loop", hex: "#0D9488", desc: "Dark teal — professional, modern, urban. Loop sub-brand attempts differentiation from parent bank's more institutional identity." },
              { brand: "Co-op Bank", hex: "#15803D", desc: "Agricultural dark green — closely echoes M-Pesa green but with darker, more community-rooted connotation. Distinctly cooperative." },
              { brand: "Tala", hex: "#7C3AED", desc: "Purple — deliberately non-bank, deliberately not green. 'We are not M-Pesa' in colour form. Digital-native, inclusive, disruptive." },
              { brand: "Airtel Money", hex: "#DC2626", desc: "Airtel red — aggressive but lacks Equity's emotional depth. Primarily promotional-offer-red." },
              { brand: "Gulf African Bank", hex: "#059669", desc: "Dark Islamic green — standard Islamic finance palette. Authority in the Kenyan Muslim community but limited mainstream appeal." },
              { brand: "Absa Kenya", hex: "#EF4444", desc: "Absa rebrand red — 'Africanacity' campaign attempted to own pride and ambition in this colour. Execution stronger regionally than locally." },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", marginBottom: 3, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: 44, background: c.hex, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "8px 12px", background: "#F9FAFB", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TEXT, minWidth: 80, fontFamily: "sans-serif" }}>{c.brand}</span>
                  <span style={{ fontSize: 11, color: TEXT_SECONDARY }}>{c.desc}</span>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 18 }}>
              <Label color={ACCENT}>Brand Personality Index (0–100)</Label>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${TEXT}` }}>
                      <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 700, color: TEXT }}>Brand</th>
                      {["Warmth", "Formality", "Trust", "Innovation", "Hustle"].map(h => (
                        <th key={h} style={{ textAlign: "center", padding: "8px 6px", fontWeight: 600, color: TEXT_MUTED, fontSize: 10 }}>{h}</th>
                      ))}
                      <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: TEXT_MUTED, fontSize: 10 }}>Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { b: "M-Pesa", c: "#4CAF50", w: 70, fo: 40, t: 92, i: 78, h: 80, a: "National infrastructure. Trusted utility. Warm by default of ubiquity." },
                      { b: "Equity Bank", c: "#E53935", w: 82, fo: 50, t: 85, i: 60, h: 75, a: "Most emotionally warm bank. 'Wings to Fly' is Kenya's most powerful bank brand asset." },
                      { b: "KCB Group", c: "#1565C0", w: 55, fo: 78, t: 88, i: 45, h: 45, a: "Maximum institutional trust. Minimum aspirational energy. Reliable but uninspiring." },
                      { b: "NCBA / Loop", c: "#0D9488", w: 50, fo: 60, t: 72, i: 68, h: 55, a: "Loop attempts innovation credibility. Parent bank identity weighs it down." },
                      { b: "Co-op Bank", c: "#15803D", w: 75, fo: 55, t: 82, i: 35, h: 60, a: "Community trust is exceptional in agricultural markets. Urban brand recognition weak." },
                      { b: "Tala", c: "#7C3AED", w: 65, fo: 25, t: 58, i: 85, h: 90, a: "Highest Hustler resonance. Post-regulation trust recovery still in progress." },
                      { b: "Airtel Money", c: "#DC2626", w: 40, fo: 35, t: 60, i: 45, h: 50, a: "Functional challenger. Interoperability has helped but brand warmth is limited." },
                      { b: "Gulf African Bank", c: "#059669", w: 65, fo: 70, t: 80, i: 30, h: 45, a: "High trust in Muslim community. Limited mainstream awareness. Digital gap critical." },
                      { b: "Absa Kenya", c: "#EF4444", w: 55, fo: 72, t: 70, i: 55, h: 40, a: "Premium positioning works in corporate segment. Mass-market Kenyan identity thin." },
                    ].map((r, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: TEXT }}>
                          <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: r.c, marginRight: 6, verticalAlign: "middle" }} />{r.b}
                        </td>
                        {[r.w, r.fo, r.t, r.i, r.h].map((v, j) => (
                          <td key={j} style={{ textAlign: "center", padding: "8px 6px" }}>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                              <div style={{ width: 34, height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                                <div style={{ width: `${v}%`, height: "100%", background: v > 70 ? "#10B981" : v > 40 ? "#F59E0B" : "#EF4444", borderRadius: 2 }} />
                              </div>
                              <span style={{ fontSize: 10, color: TEXT_MUTED }}>{v}</span>
                            </div>
                          </td>
                        ))}
                        <td style={{ padding: "8px 10px", color: TEXT_SECONDARY, fontSize: 10 }}>{r.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ padding: "12px 16px", background: ACCENT_BG, borderRadius: 8, marginTop: 12, borderLeft: `3px solid ${ACCENT}` }}>
                <p style={{ fontSize: 12, color: TEXT, margin: 0, lineHeight: 1.6 }}>Most underoccupied brand territory: <strong>warm + innovative + Hustler + trustworthy</strong> simultaneously. M-Pesa has trust and warmth but is perceived as the establishment. Tala has hustle and innovation but is recovering trust post-regulation. No current player credibly combines all four dimensions. This is the positioning white space for a new market entrant.</p>
              </div>
            </div>
          </Card>
          <Card>
            <SubHead>7.5 — Best-in-Class Campaigns</SubHead>
            {[
              { brand: "Safaricom / M-Pesa", campaign: "'Twaweza' — The M-Pesa National Film Series", desc: "Safaricom's Twaweza ('We Can') annual campaign films have become Kenya's equivalent of a national financial narrative. Documenting how M-Pesa has enabled smallholder farmers, market women, and boda boda riders to build businesses and educate children, the films are not product advertisements — they are cultural testimony to M-Pesa's role in Kenyan life.", why: "The films resonate because they are true. M-Pesa literally transformed Kenyan financial access — and the campaign's authenticity is unimpeachable because the stories are real. The brand becomes synonymous with Kenyan progress rather than a commercial service.", lesson: "When your product has genuinely changed lives, the most powerful marketing strategy is testimony, not advertising. M-Pesa's emotional equity is built on millions of real stories. Any challenger must decide: do we compete on emotion, or find an emotion M-Pesa cannot own?" },
              { brand: "Equity Bank", campaign: "Wings to Fly Scholarship Annual Announcement", desc: "Equity Bank's Wings to Fly scholarship programme — funding secondary school for top-performing students from low-income families — has transcended commercial banking to become a genuine national social institution. The annual announcement of scholarship recipients is among the most emotionally watched news events in Kenya.", why: "Equity was founded to bank the poor. Wings to Fly is the brand proof that this mission is real, not merely messaging. Parents across Kenya know that performing well in KCPE (Kenya Primary School Leaving Exam) creates a path to an Equity scholarship — which creates an awareness moment that reaches every family every year.", lesson: "Sustained corporate social investment, executed with structural integrity, builds brand equity that advertising cannot purchase. Wings to Fly has been running for 15+ years — creating generational brand loyalty in scholarship recipients and their families." },
              { brand: "KCB Foundation", campaign: "KCB 2Jiajiri Entrepreneurship Programme", desc: "KCB's 2Jiajiri ('Self-Employment') programme provides vocational training and startup financing to young Kenyans outside formal employment. The campaign documents the transformation from informal worker to trained entrepreneur — connecting the bank's lending product to genuine livelihood transformation.", why: "2Jiajiri is KCB's answer to Equity's Wings to Fly — a signature social investment programme that demonstrates the bank's relevance to Kenya's youth unemployment challenge. For a 130-year-old bank, associating with youth entrepreneurship is a brand relevance move.", lesson: "Legacy banks in emerging markets need signature youth programmes to remain aspirationally relevant to the 35% of Kenya's population under 18 who are forming their first financial brand impressions." },
              { brand: "Tala", campaign: "'Duka Yangu, Nguvu Yangu' (My Shop, My Strength)", desc: "Tala's most effective campaigns document the journey of small traders — mama mbogas (market women selling vegetables), bodaboda riders, salon owners — from financially excluded to loan-funded micro-entrepreneurs. The Kiswahili campaign name 'Duka Yangu, Nguvu Yangu' positions the credit product as personal empowerment rather than financial transaction.", why: "Tala understood before the rest of the market that their customers' relationship with credit was emotional — shame when denied, pride when approved. Framing the loan as proof of entrepreneurial strength rather than financial need transformed the product's psychographic positioning.", lesson: "In a market with a digital credit trust deficit, the brand that most authentically humanises credit — making it about the borrower's capability rather than the lender's risk assessment — will disproportionately earn loyalty." },
              { brand: "M-Pesa", campaign: "Fuliza 'Jinajibu Haraka' (Quick Self-Help) Launch", desc: "The Fuliza overdraft product launch was one of the most efficiently executed financial product activations in Sub-Saharan Africa. By embedding the overdraft into M-Pesa's existing send-money flow and communicating 'your M-Pesa account now has a safety net' to all 20M+ eligible users simultaneously, Fuliza achieved 1M+ activations within its first week and 30M+ eligible users by year two.", why: "Fuliza's success was 90% distribution and 10% product — the embedded nature of the activation within M-Pesa's existing UX removed all friction. Communicating to an existing qualified audience (every M-Pesa user) via the product interface itself is more efficient than any paid media campaign.", lesson: "The most powerful product launch is one that requires the customer to do almost nothing. Fuliza's 'opt in by sending money' mechanic turned every M-Pesa transaction into a potential Fuliza activation." },
            ].map((bc, i) => (
              <div key={i} style={{ padding: "18px 20px", borderRadius: 10, marginBottom: 14, background: i === 0 ? ACCENT_BG : "#F9FAFB", borderLeft: `4px solid ${i === 0 ? ACCENT : i < 3 ? ACCENT + "60" : BORDER}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{bc.brand}: {bc.campaign}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 5, background: ACCENT + "15", color: ACCENT, fontWeight: 700, fontFamily: "sans-serif" }}>#{i + 1}</span>
                </div>
                <Prose style={{ fontSize: 13 }}>{bc.desc}</Prose>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ padding: "10px 14px", background: CARD_BG, borderRadius: 8, border: `1px solid ${BORDER}` }}>
                    <Label color="#10B981">Why It Worked</Label>
                    <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{bc.why}</p>
                  </div>
                  <div style={{ padding: "10px 14px", background: CARD_BG, borderRadius: 8, border: `1px solid ${BORDER}` }}>
                    <Label color="#F59E0B">Key Insight</Label>
                    <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{bc.lesson}</p>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* SECTION 08 */}
        <section id="islamic" ref={(el) => (sectionRefs.current["islamic"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="08" title="Islamic Finance" subtitle="Kenya's ~5.5M Muslim population (approximately 11% of the population) is served by only 2 dedicated Islamic banks and a handful of Islamic windows — and no Islamic digital bank exists. Islamic banking assets represent approximately 2–3% of sector total (CAGR ~15%), but are constrained by the absence of a Sukuk legal framework that CBK is expected to address in 2025–2026." />
          <Card accent>
            <SubHead color={ACCENT}>Why Islamic Finance is a Strategic Frontier in Kenya</SubHead>
            <Prose>Unlike Malaysia (where Islamic banking is mainstream at 30%+ of banking assets), Kenya's Islamic finance sector is genuinely nascent. Yet the market opportunity is real: approximately 5.5 million Kenyan Muslims — approximately 11% of the total population<Ref n={19} /> — concentrated in Coast Province (Mombasa, Malindi, Kilifi), North Eastern Province (Garissa, Wajir, Mandera), and Eastleigh in Nairobi — represent a financially underserved population whose exclusion from conventional banking is partly structural (riba/interest prohibition) and partly demographic (many are pastoralist and agricultural communities with limited bank access). Islamic banking assets represent approximately 2–3% of Kenya's total banking assets, growing at a CAGR of approximately 15% — significantly faster than the conventional sector.<Ref n={43} /></Prose>
            <Prose style={{ marginBottom: 0 }}>The additional dimension that Kenya shares with Malaysia: approximately 15–20% of Gulf African Bank's customers are non-Muslim — choosing Islamic banking for its ethical framework, competitive product pricing, or community association. Kenya's Somali and Arab business communities (concentrated in Eastleigh, Mombasa Old Town) represent some of the country's highest-value Islamic banking customers, with significant trade finance and real estate financing needs. The most significant regulatory catalyst expected in 2025–2026 is CBK and National Treasury's development of a Kenya Sukuk legal framework — which would unlock sovereign Sukuk issuance, create a Shariah-compliant government securities market, and provide the capital structure necessary for domestically-capitalised takaful and Islamic banking expansion.<Ref n={43} /></Prose>
          </Card>
          <Card>
            <SubHead>8.1 — Regulatory Framework</SubHead>
            <Prose>CBK's approach to Islamic banking is permissive but underdeveloped compared to Malaysia's comprehensive IFSA framework. Islamic banking in Kenya operates under:<Ref n={44} /></Prose>
            {[
              { label: "Islamic Banking Windows", text: "CBK allows conventional banks to operate dedicated Islamic banking windows — separate reporting, Shariah supervisory boards, and ring-fenced funds. Kenya Commercial Bank (KCB), National Bank, and several others have Islamic windows operating alongside conventional operations. The window structure allows conventional banks to serve Muslim customers without full Islamic banking conversion." },
              { label: "Dedicated Islamic Banks", text: "Two dedicated Islamic banks are CBK-licensed: Gulf African Bank (founded 2007, Kenya's first) and First Community Bank (founded 2008). Neither has built a compelling digital-first product. Both operate primarily through branch networks in Coast and North Eastern Provinces with limited digital banking investment." },
              { label: "CBK Shariah Advisory", text: "Unlike Malaysia's BNM SAC (binding authority), Kenya's Shariah oversight is institution-level — each bank maintains its own Shariah Supervisory Board whose rulings are advisory and not standardised across institutions. This creates product variability that complicates customer education and market development." },
              { label: "Digital Islamic Finance Gap", text: "No digital lender, M-Pesa product, or fintech in Kenya offers Shariah-compliant digital credit or savings. The Hustler Fund (government digital credit) is interest-bearing. Fuliza and M-Shwari are interest-bearing. This means Kenya's ~5.5M Muslims using mobile money have no Islamic digital finance option. A critical structural barrier is the absence of a Sukuk (Islamic bond) legal framework at the government level — CBK and the National Treasury are expected to address this in 2025–2026, which could unlock sovereign Sukuk issuance and, downstream, a viable Shariah-compliant capital market layer for Islamic retail deposits." },
            ].map((item, i) => (
              <div key={i} style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: `3px solid ${[ACCENT, "#3B82F6", "#10B981", "#F59E0B"][i]}` }}>
                <Label color={[ACCENT, "#3B82F6", "#10B981", "#F59E0B"][i]}>{item.label}</Label>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </Card>
          <Card>
            <SubHead>8.2 — Market Size & Opportunity</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
              {[{ v: "~5.5M", l: "Muslim Kenyans (~11% of population)", a: true }, { v: "2", l: "Dedicated Islamic banks (Gulf African + First Community)", a: false }, { v: "~12", l: "Conventional banks with Islamic windows", a: false }, { v: "2–3%", l: "Islamic banking share of total sector assets (CAGR ~15%)", a: false }, { v: "$0", l: "Shariah-compliant digital lending products on M-Pesa", a: true }, { v: "Pending", l: "Sukuk legal framework — expected CBK action 2025–2026", a: true }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: s.a ? ACCENT_BG : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${s.a ? ACCENT : BORDER}` }}>
                  <div style={{ fontSize: 20, fontWeight: 300, color: s.a ? ACCENT : TEXT }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>8.3 — Shariah-Compliant Product Architecture in Kenya</SubHead>
            {[
              { label: "Savings (Wadiah / Mudarabah)", text: "Gulf African Bank and First Community Bank offer Wadiah current accounts (guaranteed safekeeping, hibah returns) and Mudarabah investment accounts (profit-sharing). No mobile money-integrated Wadiah savings product exists. An M-Pesa-compatible Islamic savings wallet — where the 'interest' is reframed as hibah — could be built on existing M-Pesa API infrastructure.", icon: "💰" },
              { label: "Personal Financing (Murabahah / Tawarruq)", text: "Both Islamic banks offer Murabahah personal financing for asset purchases and commodity Tawarruq for general purpose financing. No digital lender offers Shariah-compliant personal credit — a massive gap given Kenya's ~5.5M Muslim population who currently either use interest-bearing digital credit against their beliefs or go without.", icon: "📋" },
              { label: "Agricultural Finance (Salam / Diminishing Musharakah)", text: "Salam contracts (pre-payment for future delivery of goods) are the Islamic equivalent of agricultural input financing — Safaricom's DigiFarm provides this conventionally, but no Shariah-compliant agricultural finance product exists for Kenya's pastoral and smallholder Muslim farming communities in Coast, North Eastern, and Rift Valley.", icon: "🌾" },
              { label: "Takaful (Islamic Insurance)", text: "Kenya has no licensed takaful operator — an extraordinary gap for a market with ~5.5M Muslims. Gulf African Bank offers takaful referrals to offshore takaful providers. The pending Sukuk legal framework (expected 2025–2026) is a prerequisite for a domestically-capitalized takaful industry — as Sukuk instruments are the primary investment vehicle for takaful fund reserves.", icon: "🛡" },
            ].map((p, i) => (
              <div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 10, marginBottom: 8, borderLeft: `3px solid ${[ACCENT, "#3B82F6", "#10B981", "#F59E0B"][i]}` }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{p.label}</span>
                </div>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.65, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </Card>
          <Card>
            <SubHead>8.4 — Structural Challenges & Entry Approach</SubHead>
            {[
              { c: "No standardised CBK Shariah framework", sev: "Medium", m: "Unlike Malaysia's BNM SAC (binding rulings), Kenya's institution-level Shariah boards create variability. Recommend engaging CBK proactively to support a national Shariah Advisory Council — the institution that builds this relationship gains regulatory influence and product certainty.", col: "#F59E0B" },
              { c: "M-Pesa integration is mandatory but Islamic equivalent absent", sev: "High", m: "Any Islamic fintech product in Kenya must be M-Pesa compatible or risk reaching only smartphone-owning urban Muslims (a fraction of the total). Building Shariah-compliant savings or credit products on M-Pesa's API is technically feasible — Safaricom's partnership appetite for Islamic finance products is currently unexplored.", col: "#EF4444" },
              { c: "Limited Islamic finance talent pipeline in Kenya vs Malaysia", sev: "Medium", m: "Kenya has no ISRA or INCEIF equivalent. Shariah scholars qualified for product committee roles are scarce. Recommend engaging Gulf African Bank's existing Shariah board as advisors and partnering with international Islamic finance institutions (AAOIFI, IFSB) for product certification.", col: "#F59E0B" },
              { c: "Geographic concentration of Muslim population", sev: "Low", m: "Kenya's Muslim community is geographically concentrated (Coast, North Eastern, Eastleigh-Nairobi). This makes targeted distribution strategy more efficient than national rollout — but requires Coast Province and North Eastern language/cultural competency (Kiswahili + Somali) that most national fintechs lack.", col: "#10B981" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${c.col}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{c.c}</span>
                  <Severity level={c.sev} />
                </div>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{c.m}</p>
              </div>
            ))}
          </Card>
          <Card>
            <SubHead>8.5 — The Non-Muslim Ethical Banking Opportunity</SubHead>
            <Prose>Gulf African Bank reports approximately 15–20% of customers are non-Muslim — primarily Kenyan Somali and Arab business community members, some Indian Kenyan businesspeople, and occasional non-Muslim customers who prefer Islamic banking's transparent fee structure and community orientation. Kenya's Somali community in Eastleigh (estimated 250,000+ residents) represents the highest-density Islamic banking opportunity in Sub-Saharan Africa outside Nigeria — with significant trade finance, remittance, and SME banking needs.</Prose>
            <div style={{ padding: "14px 18px", background: "#FFF7ED", borderRadius: 8, borderLeft: "4px solid #F59E0B" }}>
              <Label color="#D97706">Strategic Positioning Opportunity</Label>
              <p style={{ fontSize: 13, color: "#92400E", lineHeight: 1.65, margin: 0 }}>An Islamic digital fintech in Kenya positioned not as 'banking for Muslims' but as 'Kenya's most honest financial service — fair fees, community values, Shariah-compliant' could attract both Muslim customers and the broader Kenyan consumer who is deeply sceptical of conventional finance after the digital credit predation of 2015–2022. The ethical banking frame has potential well beyond the Muslim community in a market with acute consumer protection wounds.</p>
            </div>
          </Card>
        </section>

        {/* SECTION 09 */}
        <section id="appendix" ref={(el) => (sectionRefs.current["appendix"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="09" title="Appendices & Additional Materials" subtitle="CBK regulatory reference, source database, glossary of Kenyan financial terms, and research design inputs." />
          <Card>
            <SubHead>Appendix A — CBK Regulatory Reference</SubHead>
            {[
              { ref: "CBK National Payments Strategy 2022–2025", year: "2022", detail: "Mandates mobile money interoperability, open banking roadmap, digital payments infrastructure expansion, and a DeFi/crypto policy framework. Requires all payment service providers to support DFS interoperability by 2025." },
              { ref: "Digital Credit Provider Regulations (2022)", year: "2022", detail: "All digital credit providers must register with CBK (min. capital KES 20M), disclose effective annual percentage rates (EAPRs), report all loans to licensed CRBs, maintain a customer complaints mechanism, and provide CRB dispute resolution. CBK can cancel licences for non-compliance." },
              { ref: "Banking Act & CBK Act", year: "Ongoing", detail: "Commercial bank licensing, capital adequacy (Core Capital minimum KES 1B), liquidity requirements, consumer protection, and CBK supervisory powers. Digital-only banking permitted under existing framework — no separate digital bank licence category (unlike Malaysia or Philippines)." },
              { ref: "Deposit Protection Fund (DPF)", year: "Active", detail: "Kenya's deposit insurance scheme — protects deposits up to KES 500,000 per depositor per institution. DPF membership is mandatory for all CBK-licensed commercial banks. Key trust signal for deposit-taking digital finance products." },
              { ref: "Islamic Banking Windows (CBK Guidelines)", year: "2023 update", detail: "CBK licensing conditions for Islamic banking windows within conventional banks: separate accounting, dedicated Shariah Supervisory Board, ring-fenced Islamic banking funds, and annual Shariah audit. No dedicated Islamic digital bank licence category exists." },
              { ref: "Kenya Sukuk Legal Framework (in development)", year: "2025–2026 expected", detail: "CBK and National Treasury have been developing a legal and regulatory framework for Sukuk (Islamic bonds) since 2023. Enactment expected in 2025–2026 — would enable sovereign Sukuk issuance on the NSE, provide Shariah-compliant government securities for Islamic banking institution balance sheets, and create the capital structure prerequisite for a domestic takaful industry. This is the single most important regulatory catalyst for Kenya's Islamic finance market expansion." },
              { ref: "CRB Regulations & Consumer Credit Data Act", year: "2022", detail: "Credit Reference Bureau regulations: all licensed lenders (banks, SACCOs, and now digital credit providers) must report positive and negative credit data. CBK's 2022 amendments strengthened consumer dispute rights and set minimum listing thresholds (no CRB listing for loans under KES 1,000)." },
            ].map((r, i) => (
              <div key={i} style={{ padding: "12px 16px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{r.ref}</span>
                  <span style={{ fontSize: 11, color: TEXT_MUTED, fontFamily: "sans-serif" }}>{r.year}</span>
                </div>
                <p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: "4px 0 0", lineHeight: 1.5 }}>{r.detail}</p>
              </div>
            ))}
          </Card>
          <Card>
            <SubHead>Appendix B — Data Sources ({Object.keys(SOURCES).length} cited)</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {Object.entries(SOURCES).map(([num, src]) => (
                <div key={num} style={{ padding: "6px 10px", background: "#F9FAFB", borderRadius: 6, display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, fontFamily: "monospace", minWidth: 22 }}>[{num}]</span>
                  <span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{src.full}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>Appendix C — Glossary</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {[
                { term: "Harambee", def: "Kenya's founding philosophy of collective self-help — shapes community financial behaviour and cooperative economics" },
                { term: "Chama", def: "Informal savings and investment group — Kenya's most trusted grassroots financial institution" },
                { term: "Hustler", def: "Cultural identity of informal entrepreneurship and resourcefulness — Gen Z/Millennial archetype" },
                { term: "M-Pesa", def: "Safaricom's mobile money platform — Kenya's national financial infrastructure since 2007" },
                { term: "Fuliza", def: "M-Pesa overdraft product (Safaricom/NCBA) — 30M+ eligible users; 'complete the transaction even with no balance'" },
                { term: "M-Shwari", def: "M-Pesa savings & loans product operated by NCBA — embedded within M-Pesa interface" },
                { term: "Pochi la Biashara", def: "M-Pesa merchant/SME wallet — separate business and personal M-Pesa funds" },
                { term: "Lipa na M-Pesa", def: "'Pay with M-Pesa' — merchant payment rails, QR code payments, till numbers" },
                { term: "Boda Boda", def: "Motorcycle taxi — employs 1.5M+ Kenyans; Kenya's informal transport and delivery economy" },
                { term: "Mama Mboga", def: "Market vegetable seller — archetype of Kenya's informal women trader economy" },
                { term: "SACCO", def: "Savings and Credit Cooperative — formal cooperative financial institution; 14M+ Kenyan members" },
                { term: "Merry-Go-Round", def: "Rotating savings format within chamas — each member receives the pooled fund in turn" },
                { term: "CBK", def: "Central Bank of Kenya — primary financial regulator" },
                { term: "CRB", def: "Credit Reference Bureau — Kenya has 3 licensed CRBs; negative listing a major consumer protection issue" },
                { term: "DPF", def: "Deposit Protection Fund — insures deposits up to KES 500,000 per depositor per bank" },
                { term: "NSE", def: "Nairobi Securities Exchange — Kenya's stock exchange; Equity, KCB, NCBA, Co-op all listed" },
                { term: "Hustler Fund", def: "Government-backed digital micro-credit product (2022) — 21M+ registered borrowers, KES 30B+ disbursed" },
                { term: "DigiFarm", def: "Safaricom/Syngenta agricultural finance platform — input loans, insurance, market linkage for smallholder farmers" },
                { term: "KES", def: "Kenya Shilling — national currency; approximately 130 KES = $1 USD as of 2024" },
                { term: "USSD", def: "Unstructured Supplementary Service Data — M-Pesa operates via USSD (*334#), accessible on all phones" },
                { term: "Agent Banking", def: "CBK-licensed third-party banking agents — 60,000+ Equity agents; supplements branches for rural access" },
                { term: "KCPE", def: "Kenya Certificate of Primary Education — national primary school leaving exam; gateway to secondary school" },
                { term: "Sheng", def: "Urban Kenyan youth dialect mixing Kiswahili, English, and ethnic languages — dominant social media voice for 18–28" },
                { term: "Silicon Savannah", def: "Nairobi's identity as Sub-Saharan Africa's technology capital — Google, Microsoft, IBM Africa HQs based here" },
                { term: "Maisha Bora", def: "'Good life / Better living' — dominant aspirational theme in Kenyan financial services advertising" },
                { term: "Biashara", def: "'Business' — central cultural value in Kenyan fintech communications; entrepreneurship is aspirational" },
                { term: "Murabahah", def: "Cost-plus Islamic financing structure — principal Islamic credit product at Gulf African Bank" },
                { term: "Takaful", def: "Islamic insurance — no domestic takaful operator licensed in Kenya; significant market gap" },
                { term: "NSSF", def: "National Social Security Fund — mandatory pension contributions; often accessed by Kenyans in financial distress" },
                { term: "Eastleigh", def: "Nairobi district with Kenya's largest Somali community — highest-density Islamic banking market in East Africa" },
                { term: "Digital Shilling", def: "Kenya's proposed CBDC — CBK pilot expected 2026; designed to interoperate with M-Pesa's agent infrastructure from launch, drawing lessons from Nigeria's eNaira underperformance" },
                { term: "Hustler Fund 2.0", def: "Expanded government digital micro-credit programme (post-2024) adding chama-level lending and enterprise credit — has structurally depressed private digital lender pricing and volume" },
                { term: "Sukuk", def: "Islamic bonds — Kenya awaiting legal framework (expected 2025–2026) which would unlock sovereign Sukuk issuance and catalyse domestic takaful and Islamic banking expansion" },
                { term: "FinAccess", def: "FSD Kenya's nationally representative annual financial inclusion survey — primary research benchmark" },
                { term: "EFT / RTGS", def: "Electronic Funds Transfer / Real Time Gross Settlement — Kenya's formal interbank settlement systems" },
              ].map((g, i) => (
                <div key={i} style={{ padding: "7px 10px", background: "#F9FAFB", borderRadius: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT }}>{g.term}</span>
                  <span style={{ fontSize: 11, color: TEXT_SECONDARY, marginLeft: 8 }}>{g.def}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <SubHead>Appendix E — Research Design & Priority Hypotheses</SubHead>
            <Label color={ACCENT}>Priority Hypotheses to Validate</Label>
            {[
              "H1: M-Pesa compatibility is a non-negotiable product requirement for any new fintech in Kenya — consumers will not adopt a product that cannot interact with M-Pesa, regardless of feature advantages. (Method: Conjoint analysis — product with/without M-Pesa compatibility)",
              "H2: Chama digitisation is the highest-value distribution strategy in Kenyan fintech — a product adopted by a chama reaches all members faster and with higher loyalty than individual digital acquisition. (Method: Chama adoption case studies + network analysis)",
              "H3: The digital credit trust deficit is sectorally acute but recoverable — consumers can be re-engaged with credit if pricing transparency and CBK-compliance are prominently communicated. (Method: Post-regulation trust recovery tracking study)",
              "H4: Agricultural income seasonality requires a fundamentally different product architecture than urban salary-cycle design — fintech products built for monthly salary cycles have 40%+ lower retention among agricultural communities. (Method: A/B product test in Rift Valley agricultural counties)",
              "H5: Kiswahili-first product communications achieve 30%+ higher adoption among non-Nairobi urban and rural segments vs English-primary. (Method: Language A/B campaign test across Coast + Rift Valley)",
              "H6: Kenya's 4.5M+ Muslims would adopt a Shariah-compliant M-Pesa alternative product (Islamic savings wallet) if it were embedded within M-Pesa's existing interface. (Method: Concept test with Muslim communities in Mombasa, Garissa, Eastleigh)",
              "H7: The boda boda community (1.5M+ riders) represents the highest-density untapped market for motorcycle asset financing and income-smoothing products — and boda boda peer networks are the most efficient distribution channel for this segment. (Method: Boda boda ethnography in Nairobi, Kisumu, Mombasa)",
              "H8: Diaspora remittance recipients make financial product adoption decisions based on the platform their diaspora family member uses, not on domestic product features — making diaspora market entry a prerequisite for domestic product adoption in recipient communities. (Method: Dyadic study of diaspora senders and Kenyan recipients)",
              "H9: The Hustler Fund's KES 30B+ disbursement has permanently changed Kenyan Gen Z's credit price expectations — they expect digital credit at single-digit annual rates or will default to the government product. Hustler Fund 2.0's chama-level lending further raises the bar. (Method: Gen Z credit price sensitivity study + chama borrowing preference interviews)",
              "H10: Islamic banking's ethical positioning ('fair fees, community values') has measurable appeal among non-Muslim Kenyans who have experienced digital credit predation — validating Islamic banking as a post-trust-crisis positioning strategy. (Method: Non-Muslim concept test with Islamic vs ethical banking framing)",
              "H11 (NEW): CBK's Digital Shilling pilot (2026) will generate higher awareness than adoption in Year 1 — similar to Nigeria's eNaira trajectory — unless distribution is explicitly designed around M-Pesa agent infrastructure from launch. (Method: Digital Shilling concept test; M-Pesa agent activation simulation)",
            ].map((h, i) => (
              <div key={i} style={{ padding: "10px 14px", background: i < 5 ? ACCENT_BG : "#F9FAFB", borderRadius: 6, marginBottom: 4, borderLeft: i < 5 ? `3px solid ${ACCENT}` : "none" }}>
                <p style={{ fontSize: 12, color: TEXT, margin: 0, lineHeight: 1.5 }}>{h}</p>
              </div>
            ))}
            <div style={{ marginTop: 18 }}>
              <Label color="#8B5CF6">Recommended Research Design (3 Phases)</Label>
              {[
                { phase: "Phase 1 — Qualitative", detail: "8–10 focus groups across Nairobi (urban professional + Eastleigh Somali community), Mombasa (Coast Muslim community), Kisumu (Luo fishing community), Nakuru/Eldoret (agricultural Rift Valley), and a boda boda rider group. Chama group treasury discussions. Separate Islamic finance discussion with Muslim participants.", timeline: "5–7 weeks" },
                { phase: "Phase 2 — Quantitative", detail: "National probability sample n=2,000 with geographic oversample: urban Nairobi (n=500), peri-urban (n=400), rural agricultural (n=600), ASAL (n=200), Muslim oversample (n=300). Modules: M-Pesa compatibility, chama digitisation, digital credit trust, agricultural finance seasonality, Islamic banking.", timeline: "7–9 weeks" },
                { phase: "Phase 3 — Ethnography", detail: "Agricultural community financial diary during tea/coffee harvest period (March–June). Boda boda rider financial tracking study (3-month daily diary). Chama treasury observation — 6 chamas across Nairobi, Nakuru, and Mombasa. Eastleigh Somali business community interviews on Islamic finance needs.", timeline: "3-month harvest season timing ideal" },
              ].map((p, i) => (
                <div key={i} style={{ padding: "12px 16px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: "3px solid #8B5CF6" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: TEXT, fontFamily: "sans-serif" }}>{p.phase}</span>
                    <span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "sans-serif" }}>{p.timeline}</span>
                  </div>
                  <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{p.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <footer style={{ marginTop: 48, padding: "24px 0", borderTop: `2px solid ${TEXT}`, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0, fontFamily: "sans-serif" }}>
            Kenya Digital Finance — Market Intelligence & Brand Landscape Analysis — Q1 2026 — {Object.keys(SOURCES).length}+ sources cited
          </p>
          <p style={{ fontSize: 10, color: "#D1D5DB", margin: "8px 0 0", fontFamily: "sans-serif" }}>
            CBK · GSMA · FSD Kenya · World Bank Findex · Safaricom · Equity Group · KCB · NCBA · DataReportal · CGAP · MicroSave · KNBS
          </p>
        </footer>
      </div>

      <style>{`* { box-sizing: border-box; } html { scroll-behavior: smooth; scroll-padding-top: 64px; } button:hover { filter: brightness(0.96); }`}</style>
    </div>
  );
}
