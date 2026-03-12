import { useState, useEffect, useRef } from "react";

const ACCENT = "#D6336C";
const ACCENT_LIGHT = "#FFF0F5";
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
  { id: "expat", label: "Expat Economy Deep Dive", num: "08" },
  { id: "appendix", label: "Appendices & Materials", num: "09" },
];

const SOURCES = {
  1: { short: "SAMA Fintech Report", full: "Saudi Central Bank (SAMA): Saudi Fintech Annual Report 2024" },
  2: { short: "Vision 2030 FSDP", full: "Saudi Vision 2030: Financial Sector Development Program Progress Report 2024" },
  3: { short: "McKinsey KSA Banking", full: "McKinsey & Company: Digital Banking Transformation in Saudi Arabia 2025" },
  4: { short: "BCG Saudi Fintech", full: "Boston Consulting Group: Saudi Arabia Fintech Market Landscape 2025" },
  5: { short: "DataReportal KSA 2026", full: "DataReportal/Meltwater: Digital 2026 Saudi Arabia Country Report" },
  6: { short: "We Are Social KSA", full: "We Are Social x Meltwater: Saudi Arabia Digital 2026 Annual Report" },
  7: { short: "SAMA Annual Report", full: "Saudi Arabian Monetary Authority: Annual Report 2024" },
  8: { short: "SAMA Open Banking", full: "SAMA: Open Banking Framework — Phase 2 Implementation Update 2024" },
  9: { short: "Tabby Investor Reports", full: "Tabby: Company Reports, Press Releases & Investor Disclosures 2024-2025" },
  10: { short: "Tamara Reports", full: "Tamara Company Reports & Fundraising Announcements 2024-2025" },
  11: { short: "STC Bank Annual", full: "STC Bank (formerly STC Pay): Annual Report & Regulatory Filings 2024" },
  12: { short: "Al Rajhi Annual", full: "Al Rajhi Bank: Annual Report 2024 & Investor Presentation Q3 2025" },
  13: { short: "SNB Annual", full: "Saudi National Bank: Annual Report 2024 & Merger Integration Update" },
  14: { short: "D360 Launch", full: "D360 Bank: Official Launch Announcements & Product Disclosures 2023-2025" },
  15: { short: "Alinma Annual", full: "Alinma Bank: Annual Report 2024 & Digital Innovation Disclosure" },
  16: { short: "Mastercard KSA", full: "Mastercard: The Cashless Journey — Saudi Arabia Progress Report 2025" },
  17: { short: "Visa KSA Consumer", full: "Visa: Consumer Payment Attitudes Study Saudi Arabia & GCC 2024" },
  18: { short: "PwC MENA Fintech", full: "PwC: MENA Fintech Pulse Survey & FinTech100 Regional Analysis 2025" },
  19: { short: "Deloitte MENA 2025", full: "Deloitte: Global Consumer Trends 2025 — MENA & Saudi Arabia Edition" },
  20: { short: "GSMA MENA 2025", full: "GSMA: The Mobile Economy MENA 2025 — Saudi Arabia Spotlight" },
  21: { short: "Snapchat Business KSA", full: "Snap Inc.: Saudi Arabia Snapchat Audience & Advertising Insights 2025" },
  22: { short: "Meta MENA Insights", full: "Meta for Business: Saudi Arabia & GCC Advertising Audience Insights 2025" },
  23: { short: "Google MENA Trends", full: "Google MENA: Saudi Arabia Year in Search & Consumer Trends 2025" },
  24: { short: "YouGov KSA 2025", full: "YouGov: Saudi Arabia Consumer Finance & Digital Banking Survey 2025" },
  25: { short: "Nielsen KSA Media", full: "Nielsen: Media Audience Measurement Saudi Arabia 2025" },
  26: { short: "World Bank Remittances", full: "World Bank: Migration and Development Brief — GCC Remittance Flows 2024" },
  27: { short: "ILO Gulf Report", full: "International Labour Organization: Labour Market Assessment GCC Countries 2024" },
  28: { short: "IMF KSA Article IV", full: "IMF Article IV Consultation: Saudi Arabia 2025" },
  29: { short: "GaStat Demographics", full: "General Authority for Statistics (GaStat): Saudi Arabia Population Estimates 2024" },
  30: { short: "Fintech Saudi 2024", full: "Fintech Saudi: Saudi Fintech Market Report — Ecosystem Overview 2024" },
  31: { short: "SAMA BNPL Rules", full: "SAMA: Buy Now Pay Later Regulatory Framework & Licensing Requirements 2023" },
  32: { short: "Tabby Unicorn", full: "Tabby achieves $1.5B unicorn valuation: Multiple GCC business media sources 2023" },
  33: { short: "STV Portfolio", full: "Saudi Technology Ventures (STV): Portfolio & Investment Thesis 2024" },
  34: { short: "Urpay ANB", full: "Arab National Bank (ANB) / Urpay: Product Updates & Company Profile 2024" },
  35: { short: "Lendo SAMA", full: "Lendo: SAMA Licensing & SME Finance Market Announcements 2024-2025" },
  36: { short: "Riyad Bank Digital", full: "Riyad Bank: Digital Transformation Annual Disclosure 2024" },
  37: { short: "SAMA Fintech Sandbox", full: "SAMA: Fintech Regulatory Sandbox Cohort Reports 2022-2025" },
  38: { short: "Arab Monetary Fund", full: "Arab Monetary Fund: Financial Inclusion Across Arab Countries 2024" },
  39: { short: "GCC Fintech Study", full: "S&P Global/KPMG: GCC Digital Banking & Fintech Landscape Study 2025" },
  40: { short: "Euromonitor KSA", full: "Euromonitor International: Financial Services Saudi Arabia 2025 Market Report" },
  41: { short: "MHRSD Expat Stats", full: "Ministry of Human Resources & Social Development (MHRSD): Expat Workforce Statistics 2024" },
  42: { short: "Kafala Reform Docs", full: "Saudi Labour Ministry: Kafala Reform & Labour Mobility Initiative Progress 2021-2024" },
  43: { short: "SAMA Wage Protection", full: "SAMA: Wage Protection System (WPS) Annual Statistics & Compliance Report 2024" },
  44: { short: "ILO Kafala 2024", full: "ILO: Kafala System Review — Assessment of Reform Progress 2024" },
  45: { short: "World Bank GCC OFW", full: "World Bank: Remittances from Gulf Cooperation Council Countries 2024 Data" },
  46: { short: "MISA Expat Finance", full: "Ministry of Investment Saudi Arabia (MISA): Expat Financial Inclusion Strategy 2024" },
  47: { short: "Lean Technologies", full: "Lean Technologies: State of Open Banking in Saudi Arabia 2024 Report" },
  48: { short: "SAMA Cybersecurity", full: "SAMA: Cybersecurity Framework for Financial Institutions — Update 2024" },
  49: { short: "Al Rajhi Neoleap", full: "Al Rajhi Bank / Neoleap: Product Launch, Growth Metrics & Announcements 2024-2025" },
  50: { short: "STC Pay History", full: "STC Pay / Bank STC: Digital Bank License Receipt & Product Timeline 2023" },
  51: { short: "SAMA CBS Stats", full: "Saudi Central Bank: Payment Systems Annual Statistics Report 2024" },
  52: { short: "Kantar BrandZ KSA", full: "Kantar BrandZ: Most Valuable Saudi Arabian Brands 2025" },
  53: { short: "BCG Women Finance", full: "BCG: Women's Financial Inclusion in Saudi Arabia — Vision 2030 Progress 2024" },
  54: { short: "Saudi Gazette Fintech", full: "Saudi Gazette: Fintech & Digital Banking Coverage Archive 2024-2025" },
  55: { short: "Arab News Digital", full: "Arab News: Digital Banking, Vision 2030, and Fintech Coverage 2025" },
  56: { short: "Statista KSA Payments", full: "Statista: Digital Payments Saudi Arabia Market Report 2025" },
  57: { short: "Google-Temasek MENA", full: "Google-Temasek-Bain: MENA Digital Economy and Fintech Outlook 2025" },
  58: { short: "SAMA Digital Banks Q3", full: "SAMA: Licensed Digital Banks Status & Deposit Data Q3 2025" },
  59: { short: "IMF Islamic Finance", full: "IMF: Islamic Finance — Developments and Emerging Regulatory Issues 2024" },
  60: { short: "AAOIFI Standards 2024", full: "AAOIFI: Shariah Standards for Financial Institutions — 2024 Edition" },
  61: { short: "IFSB Saudi Report", full: "Islamic Financial Services Board (IFSB): Saudi Arabia Islamic Finance Data 2024" },
  62: { short: "World Bank Findex KSA", full: "World Bank Global Findex Database: Saudi Arabia 2024 Update" },
  63: { short: "Oxford Business KSA", full: "Oxford Business Group: The Report Saudi Arabia — Banking & Finance 2025" },
  64: { short: "SAMA Consumer Survey", full: "SAMA Consumer Protection & Financial Inclusion Survey Q4 2025" },
  65: { short: "SAMA Remittance Stats", full: "SAMA: Inward and Outward Remittance Statistics 2024 (~$33.5B outward)" },
  66: { short: "NEOM Financial", full: "NEOM / Tonomus: Financial Services & Digital Infrastructure Announcement 2025" },
  67: { short: "KPMG KSA Fintech", full: "KPMG: Saudi Arabia Financial Services Outlook & Fintech Ecosystem 2025" },
};

const Ref = ({ n }) => (
  <sup style={{ fontSize: 9, color: ACCENT, cursor: "help", fontWeight: 600, marginLeft: 1 }} title={SOURCES[n]?.full || ""}>[{n}]</sup>
);

const COMPETITORS = [
  {
    name: "Al Rajhi Bank", type: "Full-Service Islamic Bank", users: "14M+ (Saudi Arabia)", founded: "1957", funding: "~$200B+ assets; publicly listed (TADAWUL: 1120)",
    website: "alrajhibank.com.sa",
    positioning: "The world's largest Islamic bank — and Saudi Arabia's undisputed financial superpower. Al Rajhi is not a digital bank trying to be a heritage bank, or a heritage bank trying to go digital. It is both, simultaneously. With 14M+ customers in Saudi Arabia alone, an AI-powered app rated #1 in the Kingdom, and Neoleap as its Gen Z/expat wallet, Al Rajhi has begun its transformation from monolith to ecosystem.",
    products: "Full Islamic banking suite: current accounts (wadiah), savings (mudarabah), Al Rajhi Card (credit — murabahah-based), home finance (murabahah), investment funds (Amanah), Al Rajhi brokerage, Apple Pay & STC Pay integration, WhatsApp Banking, Al Rajhi Business (SME), Neoleap (standalone digital wallet for Gen Z/expats), Al Rajhi International",
    ux: "Deep green aesthetic (a category-owning color in Saudi banking). Mobile app rated 4.8+ on both stores — consistently #1 in Saudi banking. Arabic-first design with English support. Neoleap operates as a separate, younger identity: dark backgrounds, neon green accents, emoji-heavy Taglish-adjacent Arabic. WhatsApp Banking (2024) allows natural-language banking in Arabic.",
    strength: "14M customers is an almost structurally insurmountable base. The Al Rajhi name carries religious credibility — deeply trusted by Saudi nationals for Shariah compliance. Neoleap demonstrates ability to innovate without cannibalizing the core brand. $200B+ assets mean product breadth no neobank can replicate. Vision 2030 alignment is fundamental to their identity.",
    weakness: "Scale creates inertia — legacy banking culture coexists with digital ambition. Neoleap feels like an afterthought to a truly digital native. Branch dependency remains structural. International customers and expats often perceive Al Rajhi as 'for Saudi nationals.' Credit and BNPL products lag Tabby and Tamara in user experience.",
    visualLang: "Green owns Islamic banking in Saudi Arabia the way blue owns payments (GCash in the Philippines). Gold accents. Formal Arabic calligraphic typography for institutional content. Hero photography features Saudi families, Vision 2030-aligned professional imagery (women in workplaces, youth in tech). Ramadan campaign visual language is the most sophisticated in the category.",
    recentComms: "Ramadan campaigns are the gold standard: 'Al Rajhi — We Share Your Journey' seasonal series. Neoleap Gen Z social activation on Snapchat and TikTok. Vision 2030 alignment content (women in finance, SME empowerment). WhatsApp Banking launch 2024. Hajj/Umrah financial services campaigns (unique Saudi opportunity). Zakat payment reminders are a brand touchpoint competitors can't replicate.",
    logo: "Al Rajhi deep green Arabic/English wordmark with geometric pattern", matrixX: 95, matrixY: 95, matrixR: 30, matrixC: "#16A34A",
  },
  {
    name: "Saudi National Bank (SNB)", type: "Full-Service Commercial Bank", users: "9M+ customers", founded: "2021 (merger of NCB + SAMBA)", funding: "~$260B+ assets; publicly listed (TADAWUL: 1180)",
    website: "alahli.com",
    positioning: "Saudi Arabia's largest bank by total assets, formed from the merger of National Commercial Bank (NCB) and Samba Financial Group in 2021. SNB operates under the AlAhli brand for retail banking. The national champion by scale — but a brand still finding its post-merger identity.",
    products: "Full retail and corporate banking: AlAhli Current Account, AlAhli Savings, AlAhli Credit Card (multiple tiers), home financing, auto loans, investment banking, AlAhli Mobile (digital platform), Apple Pay, mada payments, corporate banking, international banking",
    ux: "Blue/teal palette (AlAhli). Modern but conservative. AlAhli Mobile app is solid but not the most innovative in market. Arabic-first with strong English support. Post-merger UX unification project ongoing — some inconsistencies between NCB-legacy and SAMBA-legacy product interfaces.",
    strength: "Largest assets in Saudi Arabia (~$260B). National champion status creates institutional trust. International credibility (Credit Suisse investment, global correspondent network). Widest corporate banking relationships. Post-merger scale creates pricing and distribution advantages competitors can't match.",
    weakness: "Post-merger brand is still settling — NCB's 'AlAhli' brand carries more consumer equity than SNB. Two legacy tech stacks being unified. Corporate-skewing perception alienates youth and SMEs. Mobile app UX trails Alinma and Al Rajhi. Credit Suisse stake (acquired 2023) became a reputational liability. No standout digital-first product.",
    visualLang: "Blue/teal. Professional, institutional. Post-merger communications have leaned into 'New Saudi' Vision 2030 imagery. Photography skews corporate and formal — less emotionally resonant than Al Rajhi's community-first approach. Merger communications in 2021 were high-spend but confusion about whether 'SNB' or 'AlAhli' is the customer brand persists.",
    recentComms: "'AlAhli — Your Financial Partner' brand consolidation campaign. SME empowerment series aligned with Vision 2030 giga-projects. International banking services promotion (for the Saudi investment class). Digital banking feature launches (Apple Pay, mada upgrades). Credit card reward points campaigns.",
    logo: "SNB/AlAhli blue-teal wordmark", matrixX: 93, matrixY: 87, matrixR: 27, matrixC: "#0891B2",
  },
  {
    name: "STC Bank", type: "Digital Bank (SAMA-Licensed)", users: "10M+ (wallet + bank combined)", founded: "STC Pay 2018; Bank license 2023", funding: "Saudi Telecom Company (STC) — SAR 40B+ market cap",
    website: "stcbank.com.sa",
    positioning: "Saudi Arabia's telecom-backed digital bank — the market's closest equivalent to GCash in the Philippines. STC Bank leveraged STC's 24M+ mobile subscriber base to build the Kingdom's dominant digital payments platform before graduating to a full digital bank license in 2023. Now competing head-to-head with full-service banks, not just wallets.",
    products: "Digital savings accounts, STC Pay (P2P, merchant QR payments), international remittance (100+ countries via Western Union partnership), mada/Visa debit card, bill payments (utility, STC, government), small business payments, investment products (post-banking license), instant account opening, SADAD bill payment",
    ux: "STC blue palette. Bilingual Arabic-English, with Arabic dominant. WhatsApp payment integration for peer transfers. Clean and functional — the UI is more utilitarian than inspiring. Merchant QR code ecosystem is the strongest in Saudi Arabia outside of mada POS. International remittance UX is simple and accessible for expat workers.",
    strength: "10M+ users from STC Pay era provides immediate network effect for banking products. STC's 24M+ subscribers provide organic distribution channel. Bill payment integration with STC bills drives daily engagement (telco payments are habitual). SAMA banking license allows savings, lending, and investment products unavailable to e-wallets. International remittance to 100+ countries serves expat corridor.",
    weakness: "STC brand association: consumers perceive it as a telecom product, not a bank — creating credibility gap vs. Al Rajhi and SNB for high-value products (home finance, large deposits). Transition from payments wallet to full banking is operationally complex. App UX for banking products trails pure-play neobanks. No physical branches means complex products need digital-only support.",
    visualLang: "STC trademark royal blue (#0069FF). Bold, modern sans-serif. Arabic-English bilingual. Photography features Saudi young professionals and families. Campaign tone has shifted from 'telecoms payment utility' to 'your digital bank' post-license — but the transition in consumer perception lags the rebrand.",
    recentComms: "'STC Bank — Not Just Payments Anymore' brand repositioning series (2024). International remittance campaigns targeting expat workers. Merchant QR adoption campaigns for SMEs. Government salary receipts positioning. Digital savings rate comparison content on Snapchat and YouTube.",
    logo: "STC Bank blue wordmark", matrixX: 74, matrixY: 78, matrixR: 22, matrixC: "#2563EB",
  },
  {
    name: "Alinma Bank", type: "Full-Service Islamic Bank (Digital-Forward)", users: "3M+ customers", founded: "2006", funding: "SAR 30B+ assets; publicly listed (TADAWUL: 1150)",
    website: "alinma.com",
    positioning: "The most digitally sophisticated of Saudi Arabia's established Islamic banks — and the brand most likely to eat Al Rajhi's lunch among younger Saudi nationals. Alinma was the first Saudi bank to offer Apple Pay, the first with biometric authentication, and has consistently led on mobile UX innovation. For 25-40 year old Saudi nationals, Alinma is the 'smart person's bank.'",
    products: "Full Shariah-compliant banking: Alinma Savings (mudarabah, competitive rates), home financing (murabahah), Alinma Credit Card, Alinma Invest (robo-advisory + managed funds), Alinma Business (SME), Apple Pay / STC Pay, Alinma WPS (wage protection for businesses)",
    ux: "Green/emerald palette — distinct from Al Rajhi's darker green. Clean, minimal, modern. App consistently rated 4.7+ on both stores. Arabic-first with excellent English support. Digital account opening in under 3 minutes via biometrics — fastest KYC in Saudi banking. First Saudi bank with Apple Pay (2016) signals innovation-first culture.",
    strength: "Digital innovation leadership creates a defensible brand identity among tech-savvy Saudis. 3M+ loyal customers are disproportionately high-income and digitally engaged. App quality is genuinely best-in-class among established banks. Alinma Invest was a first-mover in accessible retail investing. WPS (wage protection) creates business banking stickiness.",
    weakness: "3M customers vs. Al Rajhi's 14M — the gap is structural, not tactical. No equivalent of Neoleap for Gen Z/expat segments. International coverage trail SNB and Al Rajhi. Smaller balance sheet limits lending at scale. Brand awareness significantly lower than top-3 banks outside urban areas.",
    visualLang: "Emerald green (#059669) — sufficiently distinct from Al Rajhi's forest green to avoid confusion. Modern sans-serif typography. Photography is aspirational-professional: Saudi women in tech, youth entrepreneurs. Imagery positions Alinma as the choice of the educated, urban Saudi — Vision 2030's new professional class.",
    recentComms: "Innovation leadership campaigns ('First in Saudi to...') across digital channels. Alinma Invest financial literacy series on YouTube and Snapchat. Ramadan 'smart giving' Zakat and charity integration campaigns. SME growth story series. Women's financial empowerment content (post-2018 guardianship reform).",
    logo: "Alinma emerald green wordmark", matrixX: 70, matrixY: 60, matrixR: 18, matrixC: "#059669",
  },
  {
    name: "D360 Bank", type: "Pure-Play Digital Bank (SAMA-Licensed)", users: "Est. 500K-1M+ (launched 2023)", founded: "2023", funding: "Backed by Kingdom Holding (Prince Al-Waleed bin Talal), Derayah Financial, others",
    website: "d360bank.com",
    positioning: "Saudi Arabia's first purpose-built, zero-branch digital bank. D360 was built from scratch with no legacy infrastructure — no branches, no mainframes, no paper. Backed by Kingdom Holding's prestige and targeting the digitally native Saudi national who wants premium banking without ever entering a branch.",
    products: "Premium digital savings accounts (competitive mudarabah rates), instant account opening (< 5 min), investment access via integrated platform, premium Visa debit card, P2P transfers via Aani (Saudi real-time payment system), international transfers, budgeting and financial insights tools",
    ux: "Dark premium aesthetic — charcoal backgrounds, gold and white accents. The most visually sophisticated UX in Saudi digital banking. Arabic-first with seamless English switch. Onboarding is the centerpiece: face recognition, NFC-based ID scan, and account open in under 4 minutes. App is the product — no fallback to physical.",
    strength: "Clean technology architecture means faster product iteration than legacy banks. Kingdom Holding backing adds prestige and regulatory credibility. Premium brand positioning creates pricing power for high-yield savings. Zero branch cost structure provides sustainable economics. First-mover as a true digital-only bank (others are digital banks that retain some physical presence).",
    weakness: "No track record — brand trust must be built from zero in a market where trust is the key barrier. Small user base vs. established banks. Cashless Saudi Arabia still has segments (older, provincial, expat) who need physical touchpoints. SAMA banking license for new entrants has more scrutiny — any operational failure carries outsized reputational risk.",
    visualLang: "Dark charcoal (#1A1A2E) with gold (#D4AF37) and white accents. Premium aesthetic more akin to a private bank than a retail digital bank. Arabic typography is calligraphic-inspired in marketing materials — traditional roots in contemporary execution. Photography features aspirational young Saudis in premium settings — a direct contrast to Al Rajhi's community warmth.",
    recentComms: "Launch campaign focused exclusively on digital channels (Snapchat, YouTube, X/Twitter). 'Banking without walls' positioning. Influencer partnerships with Saudi tech/finance Snapchat creators. Competitive savings rate promotions vs. conventional banks. Kingdom Holding heritage references for trust-building with high-net-worth segments.",
    logo: "D360 Bank dark charcoal wordmark with gold accent", matrixX: 36, matrixY: 16, matrixR: 12, matrixC: "#D97706",
  },
  {
    name: "Riyad Bank", type: "Full-Service Commercial Bank", users: "5M+ customers", founded: "1957", funding: "SAR 120B+ assets; publicly listed (TADAWUL: 1010)",
    website: "riyadbank.com",
    positioning: "Saudi Arabia's fourth-largest bank — respected, reliable, and steadily building digital capability. Riyad Bank lacks the glamour of Al Rajhi's scale or Alinma's innovation reputation, but its mobile app consistently rates 4.7+ and its loyalty program (Riyad Points) creates genuine behavioral stickiness. The bank for Saudis who want solidity over excitement.",
    products: "Full banking suite: Riyad Savings, Riyad Home Finance, Riyad Credit Card (multiple tiers with Riyad Points), Riyad Business (SME), Riyad Trade, international banking via correspondent network, RiyadMobile (digital banking), Apple Pay, mada",
    ux: "Red/maroon palette. Conservative, professional. RiyadMobile app is solid: rated 4.7+. Riyad Points loyalty integration creates daily engagement. Arabic-first with good English support. Digital account opening improved significantly 2023-2024 but still lags Alinma in speed.",
    strength: "60+ years of institutional trust. 5M loyal customers with strong retention. Riyad Points program is among the most generous in Saudi banking. Strong corporate banking provides earnings stability that funds digital investment. International network covers Saudi expat corridors.",
    weakness: "Brand lacks differentiation in a competitive market — 'the fourth bank' positioning is strategically vulnerable. No digital-first product to attract new-to-bank customers. Youth perception gap (older demographic skew). Sandwiched between SNB/Al Rajhi scale and Alinma/D360 digital ambition — unclear strategic positioning.",
    visualLang: "Red/maroon heritage palette. Formal typography. Photography features Saudi professionals, homeowners, business owners. Traditional banking visual language — respectable but not exciting. Riyad Points campaigns are the most engaging visual content, using reward destination photography (international travel, luxury goods).",
    recentComms: "Riyad Points lifestyle campaign (travel, dining, shopping rewards). Home finance rate campaigns. SME business growth series. Ramadan charity and Zakat content. Digital banking feature promotion ('New RiyadMobile — Faster Than Ever'). Credit card travel benefit campaigns for Saudi outbound tourism (Vision 2030-aligned).",
    logo: "Riyad Bank red/maroon wordmark", matrixX: 80, matrixY: 62, matrixR: 18, matrixC: "#DC2626",
  },
  {
    name: "Tabby", type: "BNPL — Super-App Aspirant", users: "10M+ consumers across GCC", founded: "2019", funding: "$1.5B valuation; Sequoia Capital India, STV, Visa, PayPal, Mubadala",
    website: "tabby.ai",
    positioning: "Saudi Arabia's BNPL unicorn and the GCC's most credible challenger to traditional retail credit. Tabby has redefined how Saudis think about credit: not as debt (culturally stigmatized) but as 'split payments' (smart shopping). The $1.5B valuation in 2023 validated what the product data already showed — Tabby is not a feature, it is a behavior change.",
    products: "Tabby Split (split into 4 interest-free installments), Tabby Card (Shariah-compliant shopping card, pay later up to 2 months), Tabby Shop (merchant discovery marketplace), Tabby for Business (merchant integration API), 1,500+ merchant partners (SHEIN, noon, H&M, IKEA, Careem, Styli)",
    ux: "Purple/violet brand palette. Clean, modern, mobile-first. Checkout integration is seamless — Tabby appears as a native payment option in partner apps. Tabby Card is a physical/virtual card that extends 'pay later' to any merchant. App onboarding is credit assessment disguised as identity verification — fast, frictionless, Arabic-first.",
    strength: "10M+ users across Saudi Arabia and UAE. $1.5B unicorn valuation signals global investor confidence. 1,500+ merchant partners creates a reinforcing loop: merchants drive acquisition, acquisition drives merchant demand. Tabby Card transforms BNPL from an at-checkout option into a general-purpose credit product. Sequoia/PayPal/Visa backing provides global expansion optionality.",
    weakness: "SAMA BNPL regulation (2023) introduced licensing requirements that increased compliance costs. Profitability timeline is unclear at consumer scale. Default risk grows with credit portfolio scale. Tabby Card vs. conventional credit cards is a murkier value proposition than the original split-4 offer. Competition from Tamara and bank-owned BNPL products intensifying.",
    visualLang: "Purple (#7C3AED) — a distinctive category-breaker in a market dominated by blue and green banking colors. Bold, playful typography. Lifestyle photography — young Saudi women shopping, delivery unboxing, café scenes. Merchant co-branding is visually heavy (merchant logos dominate app and social content). TikTok-native creative for Gen Z.",
    recentComms: "'Shop Smarter' campaign series across Snapchat and TikTok. Merchant partnership announcements (IKEA, SHEIN integration). Tabby Card 'Your New Way to Shop' launch campaign. Ramadan shopping spree promotions with top retail partners. Financial literacy content reframing BNPL as empowerment, not debt. Influencer haul content with embedded Tabby integration.",
    logo: "Tabby purple wordmark", matrixX: 16, matrixY: 52, matrixR: 16, matrixC: "#7C3AED",
  },
  {
    name: "Tamara", type: "BNPL — Saudi-Market Focused", users: "4M+ consumers", founded: "2020", funding: "Backed by Checkout.com, Shorooq Partners, Impulse VC, SNB Capital",
    website: "tamara.co",
    positioning: "Riyadh-born BNPL challenger with a deeper Saudi market focus than the GCC-wide Tabby. Tamara has differentiated by being more 'Saudi-first' — stronger merchant relationships with Saudi retail, more Arabic-language content, and an emphasis on local brand partnerships that Tabby's GCC-wide focus sometimes misses.",
    products: "Split-3 (interest-free in 3 installments), Split-6 (installments with a service fee), Tamara Card (physical + virtual pay later card), merchant API integration, 500+ merchant partners",
    ux: "Dark teal/green palette. Modern, Arabic-forward. App onboarding is fast. Tamara Card product is nearly identical to Tabby Card in proposition. The UX differentiator is language and cultural tone — Tamara's Arabic copywriting has a more distinctly Saudi vernacular than Tabby's GCC-neutral approach.",
    strength: "Saudi-born brand has authentic local credibility that UAE-founded Tabby must work to match. SNB Capital backing provides institutional validation and banking channel distribution. Tamara Card extends reach beyond BNPL. Strong relationships with Saudi-specific retailers (local fashion, electronics chains).",
    weakness: "Smaller user base (4M vs. Tabby's 10M). Lower brand awareness outside Saudi Arabia. Less international investor credibility than Tabby's Sequoia/PayPal backing. Product differentiation from Tabby is thin — ultimately both offer split payments, and the stronger brand will win.",
    visualLang: "Teal-green palette. Warmer than Tabby's purple — feels more locally grounded. Arabic typography is slightly more traditional. Photography emphasizes Saudi settings — local retail environments, Saudi women shopping. Less polished than Tabby's global-facing visual identity, but more culturally resonant for the Saudi core market.",
    recentComms: "Saudi-specific retail partnership campaigns (local brands). Ramadan shopping promotions with Saudi and GCC retailers. Split-6 awareness campaigns targeting higher-ticket purchases. Women empowerment financial content (post-2018 shopping independence). Tamara Card 'Freedom to Buy' campaign. TikTok product demo series.",
    logo: "Tamara teal wordmark", matrixX: 24, matrixY: 35, matrixR: 13, matrixC: "#0D9488",
  },
  {
    name: "Urpay", type: "Expat Digital Wallet (ANB-Backed)", users: "1.5M+ (primarily expat workers)", founded: "2019", funding: "Arab National Bank (ANB)",
    website: "urpay.com.sa",
    positioning: "The only financial product in Saudi Arabia built explicitly for the Kingdom's 13.4 million expat workers. Urpay holds a unique positioning: it does not compete with Al Rajhi or STC Bank — it serves a population those institutions deliberately underserve. The blue-collar expat worker (construction, domestic, F&B) who receives their salary via WPS (Wage Protection System) and needs to send it home.",
    products: "International remittance (60+ countries, with dedicated corridors to India, Pakistan, Bangladesh, Philippines, Egypt, Indonesia), bill payment, salary receipt (WPS-compatible), mada prepaid card (physical), P2P transfers between Urpay users, no minimum balance",
    ux: "Blue brand (ANB colors). Simple, deliberately accessible interface — designed for users who may have low digital literacy and are using the app in a second language. Arabic and English with expanding language support (Urdu, Bengali being added). ATM access via mada network for cash withdrawal.",
    strength: "Only purpose-built expat wallet in a market of 13.4M expats — first-mover advantage with almost no direct competition. WPS integration means salary hits Urpay automatically for partner employers. mada prepaid card solves the cash access problem without requiring a full bank account. ANB backing provides regulatory stability and correspondent bank relationships.",
    weakness: "1.5M users vs. 13.4M potential expats = massive underpenetration. Low brand awareness outside of word-of-mouth among expat communities. App UX is functional but not modern. Limited to Saudi Arabia — no multi-country expat banking vision. Kafala system reform could either help (workers have more mobility) or hurt (workers change employers more frequently, disrupting WPS relationships).",
    visualLang: "Blue. Simple. The marketing is primarily word-of-mouth and employer-introduction — Urpay doesn't have a bold consumer brand identity because it hasn't needed one (captive market via WPS). Marketing materials exist in multiple languages for expat communities. No celebrity endorsement, no lifestyle photography — product utility is the brand.",
    recentComms: "Employer partner acquisition campaigns (B2B focus). Remittance corridor promotions (Eid al-Adha and Ramadan sending spikes). WPS employer onboarding guides. Community-language social media (Urdu Facebook, Bengali WhatsApp groups). Fee comparison vs. traditional money transfer operators.",
    logo: "Urpay blue wordmark", matrixX: 12, matrixY: 18, matrixR: 10, matrixC: "#64748B",
  },
  {
    name: "Lendo", type: "Fintech SME Lending (SAMA-Licensed)", users: "2,000+ SME clients", founded: "2019", funding: "SAMA-licensed; backed by STV, Derayah Financial, others",
    website: "lendo.sa",
    positioning: "Saudi Arabia's leading B2B fintech lending platform — filling the gap that banks leave between 'too small for corporate banking' and 'too big for personal loans.' Lendo's invoice financing and supply chain credit model is precisely calibrated for the 700,000+ SMEs that Vision 2030 is mobilizing as the backbone of Saudi economic diversification.",
    products: "Invoice financing (get paid early on outstanding invoices), supply chain finance (extend payment terms), working capital credit lines, Shariah-compliant structures throughout, SIMAH credit-based underwriting, integration with Saudi e-invoicing system (ZATCA Fatoorah)",
    ux: "Clean B2B SaaS interface. Invoice upload, financing request, and disbursement in under 24 hours. Arabic-first dashboard. Integration with accounting software (QuickBooks, ZATCA). Not consumer-facing — the UX serves finance managers and business owners, not retail users.",
    strength: "SAMA license as a Crowdfunding platform provides regulatory credibility in SME lending. ZATCA e-invoicing integration creates a data-rich underwriting edge — Lendo can assess business health in ways traditional banks cannot. Vision 2030 SME push creates government tailwind. STV backing signals Saudi tech ecosystem investment.",
    weakness: "B2B lending is slower to scale than consumer products. Credit risk assessment in Saudi SME market is complex — many small businesses operate informally. No consumer brand — exists largely outside public awareness. Platform lending model depends on both SME borrowers and institutional investors being active simultaneously.",
    visualLang: "Amber/gold palette — distinct from banking green and blue. Professional, clean, B2B-focused. Photography features Saudi business owners, entrepreneurs, supply chain workers. Brand language emphasizes 'growth capital' and 'your business's potential' rather than 'finance' or 'loans.' Vision 2030 entrepreneurship imagery throughout.",
    recentComms: "SME growth story case studies on LinkedIn (B2B channel dominant). SAMA licensing and compliance announcements. ZATCA e-invoicing integration announcement. Partnership with business chambers and Vision 2030 entrepreneurship programs. Arabic-language entrepreneur content on YouTube.",
    logo: "Lendo amber wordmark", matrixX: 20, matrixY: 12, matrixR: 10, matrixC: "#D97706",
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
  const colors = { Critical: "#DC2626", High: "#F59E0B", Medium: "#3B82F6" };
  return <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: "3px 10px", borderRadius: 5, background: (colors[level] || "#888") + "12", color: colors[level] || "#888" }}>{level?.toUpperCase()}</span>;
};

export default function SaudiReport() {
  const [activeSection, setActiveSection] = useState("exec");
  const [compIdx, setCompIdx] = useState(0);
  const sectionRefs = useRef({});
  const [showNav, setShowNav] = useState(false);

  const handlePrint = () => {
    const allEls = document.querySelectorAll("*");
    const saved = [];
    allEls.forEach((el) => {
      const cs = window.getComputedStyle(el);
      if (cs.overflow === "hidden" || cs.overflowY === "hidden" || cs.overflowY === "scroll") {
        saved.push({ el, overflow: el.style.overflow, overflowY: el.style.overflowY, maxHeight: el.style.maxHeight, height: el.style.height });
        el.style.overflow = "visible"; el.style.overflowY = "visible"; el.style.maxHeight = "none"; el.style.height = "auto";
      }
    });
    setTimeout(() => {
      window.print();
      setTimeout(() => saved.forEach(({ el, overflow, overflowY, maxHeight, height }) => { el.style.overflow = overflow; el.style.overflowY = overflowY; el.style.maxHeight = maxHeight; el.style.height = height; }), 1000);
    }, 300);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }), { rootMargin: "-20% 0px -70% 0px" });
    Object.values(sectionRefs.current).forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => { sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" }); setShowNav(false); };
  const comp = COMPETITORS[compIdx];

  return (
    <div style={{ minHeight: "100vh", background: BG, color: TEXT, fontFamily: "'Source Serif 4', 'Georgia', serif" }}>
      {/* TOP BAR */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(250,250,249,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🇸🇦</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.01em" }}>Saudi Arabia Digital Finance Landscape</span>
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 4, background: ACCENT_BG, color: ACCENT, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: 1 }}>Q1 2026</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={handlePrint} style={{ background: "transparent", color: TEXT_MUTED, border: `1px solid ${BORDER}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>🖨 Print</button>
          <button onClick={() => setShowNav(!showNav)} style={{ background: showNav ? ACCENT : "transparent", color: showNav ? "#fff" : TEXT_MUTED, border: `1px solid ${showNav ? ACCENT : BORDER}`, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{showNav ? "✕ Close" : "☰ Navigate"}</button>
        </div>
      </div>

      {/* NAV DROPDOWN */}
      {showNav && (
        <div style={{ position: "fixed", top: 48, right: 24, zIndex: 99, background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 8px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 260 }}>
          {SECTIONS.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", border: "none", borderRadius: 8, cursor: "pointer", background: activeSection === s.id ? ACCENT_BG : "transparent", color: activeSection === s.id ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: activeSection === s.id ? 600 : 400, fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
              <span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, width: 20, fontFamily: "monospace" }}>{s.num}</span>
              {s.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px 80px" }}>

        {/* COVER */}
        <div style={{ marginBottom: 64, paddingBottom: 48, borderBottom: `2px solid ${TEXT}` }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>MARKET INTELLIGENCE &amp; BRAND LANDSCAPE ANALYSIS</div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px", letterSpacing: "-0.03em", color: TEXT }}>
            36 Million Ambitions:<br /><span style={{ color: ACCENT, fontWeight: 400 }}>The Saudi Digital Finance Landscape</span>
          </h1>
          <p style={{ fontSize: 18, color: TEXT_SECONDARY, lineHeight: 1.7, maxWidth: 640, margin: "0 0 28px" }}>
            A comprehensive market intelligence and brand landscape analysis of Saudi Arabia's digital finance ecosystem — the most rapidly transforming financial market in the Middle East. Vision 2030 regulatory ambition, 13.4 million expat workers, $33.5B in annual remittance outflows, two BNPL unicorns, and the world's highest Snapchat usage rate define a market unlike any other.
          </p>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontSize: 12, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>
            <span>📅 February 2026</span><span>📄 {Object.keys(SOURCES).length}+ sources cited</span><span>🔒 Confidential</span>
          </div>
        </div>

        {/* WHO THIS IS FOR */}
        <div style={{ marginBottom: 64, padding: "40px 44px", background: TEXT, borderRadius: 16, color: "#fff" }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: ACCENT, fontWeight: 700, marginBottom: 20, fontFamily: "'DM Sans', sans-serif" }}>WHO THIS REPORT IS FOR</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#E5E7EB", margin: "0 0 24px" }}>This encyclopedia was built for brand and strategy teams entering Saudi Arabia — a market that rewards those who understand its structural uniqueness: a 70% cashless economy achieved ahead of schedule, a regulatory sandbox that actively courts fintech entrants, and a 13.4M expat population that represents both the largest financial inclusion gap and the largest untapped opportunity in the GCC.</p>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#9CA3AF", margin: 0 }}>This is not a macroeconomics briefing. It is a working intelligence document for teams building brands, communications strategies, and product roadmaps in the Saudi digital finance market.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { role: "Brand & Communications Leads", use: "Section 07 is your primary reference — the full communications audit including the Snapchat-first media strategy, Ramadan campaign analysis, celebrity endorsement architecture, and Arabic vs. Taglish-equivalent language dynamics." },
                { role: "Strategy & Market Entry Teams", use: "Sections 02-04 give you the Vision 2030 policy tailwind, market structure, and six industry trends reshaping the competitive landscape. Start here for business case pressure-testing." },
                { role: "Product Teams", use: "Section 06 maps the three consumer segments — Saudi nationals, professional expats, and blue-collar expat workers — with distinct financial needs, trust barriers, and digital adoption curves." },
                { role: "Research Teams", use: "Appendix E provides a ready-to-brief qualitative and quantitative research design, including Kafala-aware expat research methodology and Arabic-language discussion guide themes." },
                { role: "Leadership & New Joiners", use: "Read Section 01 (Executive Summary) and Section 08 (Expat Economy Deep Dive) first — the six key findings and the expat financial inclusion gap are the two most strategically consequential sections in the document." },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT, marginTop: 6, flexShrink: 0 }} />
                  <div><div style={{ fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>{r.role}</div><div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.55 }}>{r.use}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid #374151", display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[{ label: "What this is", value: "A primary reference document for brand strategy and market entry in Saudi Arabia" }, { label: "What this is not", value: "A regulatory filing, legal opinion, or investment prospectus" }, { label: "How to use it", value: "Navigate by role above, or use the Table of Contents to go straight to your priority section" }].map((n, i) => (
              <div key={i} style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, fontWeight: 700, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{n.label.toUpperCase()}</div>
                <div style={{ fontSize: 12, color: "#D1D5DB", lineHeight: 1.5 }}>{n.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TABLE OF CONTENTS */}
        <div style={{ marginBottom: 64, padding: "36px 40px", background: CARD_BG, borderRadius: 16, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: TEXT_MUTED, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 20 }}>TABLE OF CONTENTS</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 40px" }}>
            <div>
              {[
                { num: "01", title: "Executive Summary", id: "exec", subs: ["Six Key Market Findings", "Headline Metrics Dashboard"] },
                { num: "02", title: "Country Context", id: "context", subs: ["Macroeconomic Overview", "Digital Infrastructure", "Cultural Context: Islam, Izzah & Vision 2030"] },
                { num: "03", title: "Market Landscape", id: "landscape", subs: ["Market Size & Structure", "SAMA Regulatory Framework", "Competitive Positioning Matrix"] },
                { num: "04", title: "Industry Trends", id: "trends", subs: ["BNPL Explosion", "Open Banking Infrastructure", "Vision 2030 Fintech Enablement", "Women's Financial Revolution", "Gig Economy Banking", "AI-Powered Islamic Finance"] },
                { num: "05", title: "Competitive Analysis", id: "competitors", subs: ["10 Competitor Deep-Dive Profiles", "Product Architecture · UX · Visual Identity · Strengths · Vulnerabilities"] },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); sectionRefs.current[s.id]?.scrollIntoView({ behavior: "smooth" }); }} style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10, cursor: "pointer" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, fontFamily: "'JetBrains Mono', monospace", minWidth: 20 }}>{s.num}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, lineHeight: 1.4 }}>{s.title}</span>
                  </a>
                  <div style={{ paddingLeft: 30, marginTop: 4 }}>{s.subs.map((sub, j) => (<div key={j} style={{ fontSize: 11, color: TEXT_MUTED, lineHeight: 1.7, paddingLeft: 10, borderLeft: `1px solid ${BORDER}` }}>{sub}</div>))}</div>
                </div>
              ))}
            </div>
            <div>
              {[
                { num: "06", title: "Consumer Insights", id: "consumer", subs: ["Saudi National vs. Expat Segmentation", "Behavioral Segments (with TAM)", "Trust Architecture in an Islamic Market", "Customer Journey Map (5 stages)", "Adoption Drivers & Cultural Barriers"] },
                { num: "07", title: "Communication Landscape", id: "comms", subs: ["7.1 Media Consumption: Snapchat-First Saudi Arabia", "7.2 Fintech Advertising Landscape", "7.3 Content Strategy Analysis", "7.4 Messaging Themes Audit", "7.5 Visual & Verbal Identity Audit", "7.6 Best-in-Class Campaigns"] },
                { num: "08", title: "Expat Economy Deep Dive", id: "expat", subs: ["8.1 Who Are Saudi Arabia's 13.4M Expats?", "8.2 Financial Exclusion Under Kafala", "8.3 The $33.5B Remittance Corridor", "8.4 Product Gap Analysis", "8.5 Regulatory Evolution & Opportunity", "8.6 Market Potential & Structural Barriers"] },
                { num: "09", title: "Appendices", id: "appendix", subs: ["A — SAMA Regulatory Reference", "B — Data Sources (67 cited)", "C — Glossary (35+ terms)", "D — Visual Audit Gallery Index", "E — Research Design & Hypotheses"] },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); sectionRefs.current[s.id]?.scrollIntoView({ behavior: "smooth" }); }} style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 10, cursor: "pointer" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: ACCENT, fontFamily: "'JetBrains Mono', monospace", minWidth: 20 }}>{s.num}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: TEXT, lineHeight: 1.4 }}>{s.title}</span>
                  </a>
                  <div style={{ paddingLeft: 30, marginTop: 4 }}>{s.subs.map((sub, j) => (<div key={j} style={{ fontSize: 11, color: TEXT_MUTED, lineHeight: 1.7, paddingLeft: 10, borderLeft: `1px solid ${BORDER}` }}>{sub}</div>))}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>67 sources cited · 10 competitor profiles · Snapchat-first communications audit</span>
            <span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>Companion deliverable: Visual Audit Gallery (interactive)</span>
          </div>
        </div>

        {/* ══ SECTION 1: EXECUTIVE SUMMARY ══ */}
        <section id="exec" ref={(el) => (sectionRefs.current["exec"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="01" title="Executive Summary" subtitle="Saudi Arabia's digital finance market is the product of deliberate policy ambition meeting consumer readiness — a rare alignment that has produced the fastest cashless transition of any major economy in the past decade." />
          <Card accent style={{ marginBottom: 24 }}>
            <Prose style={{ fontSize: 16, color: TEXT, lineHeight: 1.85 }}>
              The Kingdom of Saudi Arabia has achieved something extraordinary: a cashless transaction rate of approximately 79% by 2025<Ref n={16} /> — exceeding its Vision 2030 target of 70% ahead of schedule, up from a baseline of just 36% in 2017. SAMA has issued digital bank licenses, launched an open banking framework, published a BNPL regulatory structure, and maintained a fintech sandbox that has graduated over 40 companies.<Ref n={1} /> The market has produced two BNPL unicorns (Tabby at $1.5B,<Ref n={32} /> Tamara at significant valuation), a telecom-backed digital bank (STC Bank), and the world's largest Islamic bank (Al Rajhi, $200B+ assets<Ref n={12} />) accelerating its digital transformation. This is not a market still debating whether to go digital. It already has.
            </Prose>
            <Prose style={{ fontSize: 16, color: TEXT }}>
              Yet beneath the macro success story lies structural complexity. Of the Kingdom's ~36 million population, approximately 38% — some 13.4 million people — are expatriate workers<Ref n={29} /> who generate $33.5B in annual remittance outflows<Ref n={65} /> (the world's second-largest after the United States) while remaining largely excluded from full banking services. The Kafala employer-sponsorship system has historically tethered financial identity to employment status, creating a uniquely Saudi financial inclusion problem. Meanwhile, the 67% of Saudi nationals under 35<Ref n={29} /> represent a mobile-first generation being shaped by Vision 2030's new economy — new sectors, new careers, new financial products. And Islamic finance is not a niche consideration: every banking product in Saudi Arabia must be Shariah-compliant, making structural product knowledge a prerequisite for any market entrant.
            </Prose>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
            <StatBox value="79%" label="Cashless transaction rate (2025, ahead of 70% target)" accent />
            <StatBox value="$33.5B" label="Annual outward remittances (world's 2nd largest)" accent />
            <StatBox value="13.4M" label="Expatriate workers (~38% of population)" />
            <StatBox value="$1.5B" label="Tabby BNPL valuation — GCC's first fintech unicorn" />
            <StatBox value="67%" label="Saudi nationals under age 35" accent />
            <StatBox value="5" label="SAMA-licensed digital banks (as of Q1 2026)" />
          </div>

          <Card style={{ marginBottom: 24 }}>
            <SubHead>Six Key Market Findings</SubHead>
            {[
              { finding: "Vision 2030 has created the most favorable regulatory environment for fintech entry in the Middle East — but the window is closing as incumbents accelerate.", why: "SAMA's sandbox has graduated 40+ companies. Four remaining digital bank license slots are likely to fill within 24 months. Open Banking Phase 2 is live. BNPL regulation published. Every regulatory enabler a fintech needs is either live or in final stages. The question is not 'will SAMA allow it?' — it is 'how fast can you move?'" },
              { finding: "The Kafala system has created 13.4M financially excluded expat workers — an underserved market generating $33.5B in annual remittances with almost zero purpose-built digital financial products.", why: "Urpay has 1.5M users from a potential base of 13.4M. That is 11% penetration in the market's most captive segment. The top-5 expat nationalities (Indian ~2.5M, Pakistani ~1.5M, Bangladeshi ~1M, Egyptian ~1M, Filipino ~700K) all have massive remittance corridors and sub-standard financial services access." },
              { finding: "Saudi Arabia is the world's #1 Snapchat market by daily time spent — and Snapchat is not optional for reaching Saudi youth under 35.", why: "Saudi users average 30+ minutes per day on Snapchat, with the platform reaching 21M+ Saudi users. This is not a niche channel — it is the primary communications medium for Saudi Gen Z and millennials. Financial brands that run Facebook-first campaigns are speaking into an empty room for anyone under 30." },
              { finding: "BNPL has transformed credit behavior: Tabby and Tamara prove that Saudi consumers who culturally resist 'debt' will enthusiastically use 'split payments' — the framing is everything.", why: "Saudi Arabia has strong cultural norms around avoiding riba (interest). Conventional credit card penetration is relatively low. Yet BNPL adoption has exploded because it is framed as a purchase installment, not a loan. Tabby's 10M users and Tamara's 4M users together suggest 14M BNPL relationships in a market of ~22M adult consumers." },
              { finding: "Women's financial inclusion has accelerated faster than any other segment post-2018 — the reforms are structural, not symbolic, and 8M+ Saudi women are entering the financial system as independent consumers.", why: "The 2018 guardianship reforms (right to drive, right to work, reduced mahram requirements for transactions) unlocked financial independence for Saudi women at scale. Female labor force participation rose from 17% to 33%+ between 2017-2025. BCG estimates 8M+ Saudi women became financial services customers in this period. No financial brand has fully owned this moment." },
              { finding: "All banking products in Saudi Arabia must be Shariah-compliant — this is not a constraint for the right player. Al Rajhi Bank's $200B+ assets prove that Islamic finance is a feature, not a limitation.", why: "International fintechs routinely underestimate the complexity of Shariah compliance. Murabahah structures for lending, mudarabah for savings, and takaful for insurance are not alternatives to conventional products — they are the only products. Partners with AAOIFI-certified Shariah boards and experienced Islamic finance product teams are not optional; they are market entry prerequisites." },
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

        {/* ══ SECTION 2: COUNTRY CONTEXT ══ */}
        <section id="context" ref={(el) => (sectionRefs.current["context"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="02" title="Country Context" subtitle="Saudi Arabia is the GCC's dominant economy, the Arab world's largest market, and the site of the most deliberate economic transformation program of any nation this century." />
          <Card style={{ marginBottom: 20 }}>
            <SubHead>Macroeconomic Overview</SubHead>
            <Prose>Saudi Arabia's GDP of approximately $1.1 trillion (2024) makes it the Arab world's largest economy and the world's 17th-largest.<Ref n={28} /> Oil revenues (~60-70% of government revenue) provide macroeconomic stability, while Vision 2030 is systematically building a non-oil economy targeting a 50% GDP share from diversified sectors by 2030. GDP growth was approximately 1.3% in 2024 (impacted by OPEC+ production cuts) but non-oil GDP grew at ~4.5% — the metric Vision 2030 tracks.<Ref n={28} /> Per capita GDP of ~$30,000 places Saudi nationals in the upper-middle income bracket, but this hides extreme income heterogeneity: affluent Saudi nationals on one end, blue-collar migrant workers earning SAR 1,500-2,500/month (~$400-667) on the other.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
              {[{ v: "$1.1T", l: "GDP (2024)" }, { v: "$30K", l: "GDP per capita (national avg)" }, { v: "~4.5%", l: "Non-oil GDP growth" }, { v: "5.4%", l: "Unemployment (Saudi nationals)" }, { v: "~36M", l: "Total population" }, { v: "38%", l: "Expatriate share of population" }, { v: "2.9%", l: "Inflation rate (2024)" }, { v: "33%+", l: "Female labor force participation" }].map((m, i) => (<div key={i} style={{ padding: "12px", background: "#F9FAFB", borderRadius: 8 }}><div style={{ fontSize: 20, fontWeight: 300, color: i < 2 ? ACCENT : TEXT }}>{m.v}</div><div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{m.l}</div></div>))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Digital Infrastructure</SubHead>
            <Prose>Saudi Arabia ranks among the world's most digitally connected nations: smartphone penetration exceeds 98%,<Ref n={5} /> internet penetration reaches 99%, and 5G coverage has reached ~99% of the population — the fastest 5G rollout of any major emerging market.<Ref n={20} /> Saudis consume approximately 7 hours of digital media daily,<Ref n={6} /> with Snapchat, YouTube, and X (Twitter) as the dominant platforms (Facebook trails significantly, unlike most markets). The MADA domestic card network and SARIE (Saudi Arabia's real-time payment system, equivalent to the Philippines' InstaPay) provide the payment rails, with QR standardization driving merchant adoption. The Aani instant payment platform (launched 2022) handles real-time P2P transfers across all licensed banks and digital banks.<Ref n={51} /></Prose>
            <Prose>Cashless transaction penetration reached ~79%<Ref n={16} /> by 2025 — achieved ahead of the Vision 2030 target of 70% by 2030. E-commerce reached approximately $14B by 2025 (growing ~25% annually), with noon, Amazon.sa, and Namshi dominating.<Ref n={57} /> ZATCA's mandatory e-invoicing (Fatoorah) for all businesses is embedding digital financial infrastructure into B2B transactions, creating a data-rich SME lending opportunity for fintech platforms like Lendo. Saudi Arabia is the world's #1 Snapchat market by time spent per user.<Ref n={21} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16 }}>
              {[{ v: "99%", l: "Internet penetration" }, { v: "~79%", l: "Cashless transactions (2025)" }, { v: "7h/day", l: "Digital media consumption" }, { v: "#1", l: "Snapchat market globally" }, { v: "$14B", l: "E-commerce market (2025)" }, { v: "99%", l: "5G coverage" }, { v: "40+", l: "SAMA sandbox graduates" }, { v: "5", l: "SAMA digital bank licenses issued" }].map((d, i) => (<div key={i} style={{ padding: "12px", background: "#F9FAFB", borderRadius: 8 }}><div style={{ fontSize: 20, fontWeight: 300, color: i < 2 ? ACCENT : TEXT }}>{d.v}</div><div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{d.l}</div></div>))}
            </div>
          </Card>

          <Card accent>
            <SubHead color={ACCENT}>Cultural Context: Islam, Izzah &amp; Vision 2030</SubHead>
            <Prose>Three forces shape Saudi consumer behavior in financial services above all others. First, <strong>Islamic finance as default architecture</strong>: every banking product must be Shariah-compliant. Riba (interest) is prohibited; risk-sharing (mudarabah, musharakah) and cost-plus sale (murabahah) structures replace conventional interest-based products. This is not a market preference — it is a regulatory and cultural non-negotiable. AAOIFI standards govern product certification.<Ref n={60} /></Prose>
            <Prose>Second, <strong>izzah</strong> — a concept of dignity and honour that fundamentally shapes financial behavior. Debt is culturally associated with weakness; financial vulnerability is a private matter. BNPL succeeded precisely because it bypassed the word 'debt.' Any brand that communicates financial products in ways that suggest the customer is struggling, borrowing out of desperation, or financially inadequate will fail. The aspiration frame — saving for the hajj, building family security, investing in a Vision 2030 future — is mandatory.</Prose>
            <Prose style={{ marginBottom: 0 }}>Third, <strong>Vision 2030 as cultural frame</strong>: Crown Prince Mohammed bin Salman's transformation program has reshaped Saudi identity narratives at speed. Saudi youth are experiencing the opening of cinemas, concerts, mixed-gender workplaces, and new financial products simultaneously. Vision 2030 is not just policy — it is identity. Brands that align with the new Saudi self-image (ambitious, globally confident, technologically sophisticated) consistently outperform those using traditional conservative framing.<Ref n={2} /> The 2018 guardianship reforms that allowed women to drive, open bank accounts independently, and access financial services without male permission have created the single fastest-growing financial inclusion segment in the market.<Ref n={53} /></Prose>
          </Card>
        </section>

        {/* ══ SECTION 3: MARKET LANDSCAPE ══ */}
        <section id="landscape" ref={(el) => (sectionRefs.current["landscape"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="03" title="Market Landscape" subtitle="Saudi fintech sits at a unique intersection: the world's largest Islamic finance market, an active regulatory sandbox, and a cashless infrastructure that is already built." />
          <Card style={{ marginBottom: 20 }}>
            <SubHead>Market Size &amp; Structure</SubHead>
            <Prose>The Saudi fintech market was valued at approximately $3.5-4.5B in 2025 and is projected to exceed $9B by 2030 — a CAGR of ~17%.<Ref n={4} /> SAMA has issued 5 digital bank licenses (STC Bank, D360 Bank, and others), with capacity for additional entrants under the Vision 2030 FSDP framework.<Ref n={58} /> The payments market is dominated by MADA (domestic network), with Apple Pay, STC Pay, and Google Pay layered above. BNPL is the fastest-growing segment: Tabby ($1.5B valuation<Ref n={32} />) and Tamara together claim 14M+ consumers. Open Banking Phase 1 (account information) was completed; Phase 2 (payment initiation) is live as of 2024.<Ref n={8} /> The SME lending market is underserved: only 5% of Saudi SMEs have accessed formal credit (vs. 20%+ OECD average).<Ref n={38} /> Remittance outflows of $33.5B annually make Saudi Arabia the world's second-largest remittance origin market after the United States.<Ref n={65} /></Prose>
          </Card>
          <Card style={{ marginBottom: 20 }}>
            <SubHead>SAMA Regulatory Framework</SubHead>
            <Prose>SAMA's fintech regulatory architecture is the most comprehensive in the Middle East and among the most sophisticated globally. The Regulatory Sandbox (launched 2018) provides a controlled testing environment with expedited licensing — 40+ companies graduated.<Ref n={37} /> Digital bank licensing under the Digital Bank Regulatory Framework (2020) set minimum capital at SAR 1.5B (~$400M) for full-service digital banks — higher than most comparable markets, reflecting SAMA's quality-over-quantity approach. Open Banking Framework (2021-2022) mandated APIs for account access and established the Open Banking Lab for testing.<Ref n={8} /> BNPL Regulation (2023) introduced licensing requirements, minimum capital, consumer protection obligations, and credit bureau reporting for BNPL providers.<Ref n={31} /> Consumer Protection Framework includes right to portability (switching banks), Shariah compliance oversight, and SIMAH (Saudi Credit Bureau) integration requirements. SAMA's Wage Protection System (WPS) mandates digital salary disbursement for all private sector employers — a structural digital finance driver affecting all 13.4M expat workers.<Ref n={43} /></Prose>
          </Card>
          <Card>
            <SubHead>Competitive Positioning Matrix</SubHead>
            <Prose style={{ marginBottom: 16 }}>This matrix maps 10 competitors across product breadth (narrow specialist → full-service) and user scale (emerging → mass adoption). Click a competitor name to navigate to their deep-dive profile.</Prose>
            <div style={{ position: "relative", width: "100%", height: 360, background: "#FAFAFA", borderRadius: 12, overflow: "hidden", border: `1px solid ${BORDER}` }}>
              {[20, 40, 60, 80].map(v => <div key={`x${v}`} style={{ position: "absolute", left: `${v}%`, top: 0, bottom: 0, borderLeft: "1px dashed #E5E7EB" }} />)}
              {[20, 40, 60, 80].map(v => <div key={`y${v}`} style={{ position: "absolute", top: `${100 - v}%`, left: 0, right: 0, borderTop: "1px dashed #E5E7EB" }} />)}
              <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>← Narrow / Specialist</div>
              <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>Full-Service →</div>
              <div style={{ position: "absolute", top: 8, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>Mass Adoption ↑</div>
              <div style={{ position: "absolute", bottom: 26, left: 12, fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>↓ Emerging</div>
              {COMPETITORS.map((c, i) => (
                <div key={i} style={{ position: "absolute", left: `${c.matrixX}%`, bottom: `${c.matrixY}%`, transform: "translate(-50%, 50%)", cursor: "pointer", zIndex: 10 }} onClick={() => { setCompIdx(i); scrollTo("competitors"); }}>
                  <div style={{ width: c.matrixR, height: c.matrixR, borderRadius: "50%", background: c.matrixC + "25", border: `2px solid ${c.matrixC}80`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.matrixC }} />
                  </div>
                  <div style={{ fontSize: 9, color: c.matrixC, fontWeight: 700, textAlign: "center", marginTop: 3, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>{c.name}</div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* ══ SECTION 4: INDUSTRY TRENDS ══ */}
        <section id="trends" ref={(el) => (sectionRefs.current["trends"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="04" title="Industry Trends" subtitle="Six structural forces are reshaping Saudi digital finance — from a BNPL explosion that rewrote credit behavior to a women's financial revolution that unlocked 8 million new consumers." />
          {[
            { t: "BNPL Explosion: Debt Without the D-Word", d: "Tabby's 10M users and $1.5B valuation, Tamara's 4M users and heavyweight backers — together representing approximately 14M active BNPL relationships in a market of ~22M adult consumers. The BNPL breakthrough in Saudi Arabia is a masterclass in cultural product design: Saudis resist 'debt' (riba connotations) but enthusiastically embrace 'split payment' (taqsit). The reframing is everything.", why: "Saudi Arabia has cultural and religious resistance to interest-bearing credit. Conventional credit card penetration is significantly lower than in Western markets. BNPL resolved this by separating the mechanics of credit (installments) from the perception (borrowing/debt). The product is Shariah-compliant when structured correctly (no interest, fee-based), making it religiously acceptable and psychologically accessible simultaneously.", icon: "🛒", src: 9 },
            { t: "Open Banking: The Infrastructure Layer", d: "SAMA's Open Banking Phase 2 (payment initiation) went live in 2024,<Ref n={8} /> enabling third-party providers to initiate payments on behalf of customers. Lean Technologies — Saudi Arabia's open banking infrastructure layer — is enabling fintechs to aggregate financial data and build on top of existing banking relationships. This is creating a new product category: financial management tools, credit scoring based on real bank data, and payments initiated without app switching.", why: "Open banking in Saudi Arabia is genuinely more advanced than most comparable markets. SAMA mandated API access; major banks complied; infrastructure providers like Lean built the tooling. The result is a live, functional open banking ecosystem — not a regulatory promise but a product reality. Any fintech entering Saudi Arabia should evaluate open banking as a core distribution and underwriting advantage.", icon: "🔌", src: 8 },
            { t: "Vision 2030 Fintech Enablement", d: "The Financial Sector Development Program (FSDP), one of Vision 2030's 13 vision realization programs, has explicit targets: 70% cashless transactions (achieved), 5% fintech contribution to GDP, and a globally competitive financial sector. SAMA was given explicit mandate to enable fintech competition. The sandbox, digital bank licenses, open banking, BNPL regulation, and Islamic fintech development are all products of this policy environment.", why: "This is the most important structural force in Saudi fintech. In most markets, regulators enable fintech cautiously and reactively. In Saudi Arabia, fintech enablement is government strategy. SAMA has a mandate to grow the sector. This means regulatory decisions are made with a growth orientation rather than a purely protective one — the single most favorable regulatory environment for market entry in the region.", icon: "🏛", src: 2 },
            { t: "Women's Financial Revolution", d: "Female labor force participation rose from 17% (2017) to 33%+ (2025), driven by Vision 2030's economic diversification mandate.<Ref n={53} /> The 2018 guardianship reforms removed requirements for male permission on financial transactions, bank account openings, and many business activities. BCG estimates 8M+ Saudi women became independent financial services consumers between 2018-2025 — the fastest women's financial inclusion event in modern history.", why: "This is not a social trend — it is a structural expansion of the total addressable market. 8M new financial consumers acquiring financial products they previously could not access independently represents a product design and acquisition opportunity that no brand has fully captured. Most financial brands in Saudi Arabia are still marketing primarily to male Saudis or using gender-neutral framing that misses the specificity of newly financially independent women.", icon: "👩‍💼", src: 53 },
            { t: "Gig Economy & New-Work Banking", d: "Vision 2030's economic diversification has created an explosion of new employment categories: Saudis entering entertainment, hospitality, retail, and creative sectors for the first time. Gig and freelance work is growing — Saudi Arabia has one of the fastest-growing Upwork and Fiverr user bases in MENA.<Ref n={57} /> These workers have irregular income, no traditional payroll structure, and complex financial needs (irregular deposits, business expenses mixed with personal, VAT obligations).", why: "Saudi banks and neobanks are almost entirely designed for salaried workers (stable salary → salary account → products). The gig and freelance economy creates a financial services gap that is growing faster than incumbents are addressing it. Variable income, self-employment banking, expense categorization, and freelance-specific products represent a structural whitespace for a neobank positioning as the platform for Saudi Arabia's new workforce.", icon: "💼", src: 4 },
            { t: "AI-Powered Islamic Finance", d: "Al Rajhi Bank's WhatsApp Banking uses Arabic natural language processing for account queries and transfers.<Ref n={12} /> D360 Bank's AI-powered credit assessment runs in under 60 seconds. Tabby uses ML for real-time BNPL credit decisions across 10M+ consumers. 42%+ of Saudi internet users are experimenting with generative AI tools.<Ref n={23} /> The convergence of AI and Islamic finance compliance checking (automated Shariah screening of products, transactions, and portfolios) is an emerging category with no dominant player.", why: "AI adoption in Saudi Arabia is high and accelerating — the government's National Strategy for Data and AI has invested $20B+ and positioned Saudi Arabia as the Arab world's AI hub. In financial services, AI's most distinctive Saudi application is automating Shariah compliance screening — a complex, expertise-scarce task that currently requires human scholars reviewing every product. The fintech that automates Shariah screening at scale creates a structural advantage over every competitor.", icon: "🤖", src: 3 },
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

        {/* ══ SECTION 5: COMPETITIVE ANALYSIS ══ */}
        <section id="competitors" ref={(el) => (sectionRefs.current["competitors"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="05" title="Competitive Analysis" subtitle="Deep-dive profiles of 10 competitors — from the world's largest Islamic bank to Saudi Arabia's first pure-play digital bank to the BNPL unicorns reshaping retail credit." />
          <div style={{ display: "flex", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {COMPETITORS.map((c, i) => (
              <button key={i} onClick={() => setCompIdx(i)} style={{ padding: "8px 16px", borderRadius: 8, cursor: "pointer", border: i === compIdx ? `2px solid ${ACCENT}` : `1px solid ${BORDER}`, background: i === compIdx ? ACCENT_BG : CARD_BG, color: i === compIdx ? ACCENT : TEXT_SECONDARY, fontSize: 13, fontWeight: i === compIdx ? 700 : 500, fontFamily: "'DM Sans', sans-serif" }}>{c.name}</button>
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
              <a href={`https://${comp.website}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ACCENT, textDecoration: "none", padding: "4px 10px", border: `1px solid ${ACCENT}40`, borderRadius: 6, fontFamily: "'DM Sans', sans-serif" }}>🔗 {comp.website}</a>
            </div>
            {[{ label: "Positioning", text: comp.positioning }, { label: "Products & Services", text: comp.products }, { label: "UX & Design", text: comp.ux }, { label: "Visual & Verbal Identity", text: comp.visualLang }].map((s, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <Label color={i === 0 ? ACCENT : TEXT_MUTED}>{s.label}</Label>
                <Prose style={{ marginBottom: 0 }}>{s.text}</Prose>
              </div>
            ))}
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
            <Card style={{ borderLeft: "4px solid #10B981" }}><Label color="#10B981">Key Strengths</Label><Prose style={{ marginBottom: 0 }}>{comp.strength}</Prose></Card>
            <Card style={{ borderLeft: "4px solid #EF4444" }}><Label color="#EF4444">Key Weaknesses</Label><Prose style={{ marginBottom: 0 }}>{comp.weakness}</Prose></Card>
          </div>
          <Card style={{ borderLeft: "4px solid #8B5CF6" }}><Label color="#8B5CF6">Recent Communications &amp; Campaigns</Label><Prose style={{ marginBottom: 0 }}>{comp.recentComms}</Prose></Card>
        </section>

        {/* ══ SECTION 6: CONSUMER INSIGHTS ══ */}
        <section id="consumer" ref={(el) => (sectionRefs.current["consumer"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="06" title="Consumer Insights" subtitle="Saudi Arabia's financial consumer base is not one market — it is three: Saudi nationals (62%), professional expats, and blue-collar expat workers. Each has distinct financial needs, trust architectures, and digital adoption curves." />
          <Card accent style={{ marginBottom: 20 }}>
            <SubHead color={ACCENT}>Key Consumer Data Points</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[{ v: "~79%", l: "Cashless transaction rate (ahead of 70% target)", src: 16 }, { v: "14M+", l: "Combined Tabby + Tamara BNPL users", src: 9 }, { v: "67%", l: "Saudi nationals under 35 years old", src: 29 }, { v: "38%", l: "Expat share of population (~13.4M people)", src: 29 }, { v: "33%+", l: "Female labor force participation (up from 17% in 2017)", src: 53 }, { v: "$33.5B", l: "Annual outward remittances (world's 2nd largest)", src: 65 }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: i === 3 ? "#FEF2F2" : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${i === 3 ? "#EF4444" : i < 3 ? ACCENT : "#3B82F6"}` }}>
                  <div style={{ fontSize: 22, fontWeight: 300, color: i === 3 ? "#EF4444" : i < 3 ? ACCENT : "#3B82F6" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}<Ref n={s.src} /></div>
                </div>
              ))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>The Three-Market Segmentation</SubHead>
            <Prose>Saudi Arabia's financial consumer base requires a fundamentally different segmentation model from most markets. The national/expat split — with its distinct cultural frameworks, income profiles, and regulatory treatment — creates three relatively non-overlapping consumer markets that require distinct product architectures, trust-building strategies, and communications approaches.<Ref n={29} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { seg: "Saudi Nationals", size: "~22M", traits: "Vision 2030 ambition, Islamic finance by default, Snapchat-native, BNPL adopters, growing financial independence (esp. women)", color: ACCENT, products: "Full banking, home finance, investments, BNPL, gig banking" },
                { seg: "Professional Expats", size: "~3-4M", traits: "High income, multi-currency needs, international mobility, prefer conventional banking familiar from home country", color: "#3B82F6", products: "Multi-currency accounts, international transfers, investment platforms, global credit" },
                { seg: "Blue-Collar Expats", size: "~9-10M", traits: "WPS salary recipients, cash-reliant, remittance-first, limited credit access, Kafala-constrained, low digital literacy", color: "#F59E0B", products: "Salary receipt, international remittance, bill pay, no-frills savings" },
              ].map((s, i) => (<div key={i} style={{ padding: "16px", background: "#F9FAFB", borderRadius: 10, borderTop: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>{s.seg}</span><span style={{ fontSize: 11, color: s.color, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{s.size}</span></div>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "0 0 6px" }}>{s.traits}</p>
                <div style={{ fontSize: 10, color: TEXT_MUTED }}><strong>Priority products:</strong> {s.products}</div>
              </div>))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Saudi National Sub-Segmentation</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 12 }}>
              {[
                { gen: "Gen Z Saudi", age: "18-28", pct: "28%", traits: "Snapchat-first. BNPL native. Entertainment economy (post-cinema). Creator economy. Crypto curious. New-sector careers.", color: ACCENT },
                { gen: "Millennial Saudi", age: "29-42", pct: "31%", traits: "Family formation stage. Home finance demand. Investment appetite. Vision 2030 career beneficiaries. Dual income (women).", color: "#3B82F6" },
                { gen: "Saudi Women (All Ages)", age: "18-55", pct: "~48% of above", traits: "Post-2018 financial independence. 8M+ new financial consumers 2018-2025. Fastest-growing segment. Underserved by current brand messaging.", color: "#A855F7" },
                { gen: "Affluent Saudi", age: "35+", pct: "12% by wealth share", traits: "Private banking, international investment, wealth transfer. Relationship-driven. Not digital-first — but digital-enabled.", color: "#10B981" },
              ].map((g, i) => (<div key={i} style={{ padding: "14px", background: "#F9FAFB", borderRadius: 10, borderTop: `3px solid ${g.color}` }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: g.color }}>{g.pct}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginTop: 2 }}>{g.gen}</div>
                <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 2 }}>Age {g.age}</div>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.5, margin: "8px 0 0" }}>{g.traits}</p>
              </div>))}
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED, fontStyle: "italic" }}>Source: GaStat 2024, BCG Vision 2030 analysis<Ref n={29} /><Ref n={53} /></div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Geographic Segmentation</SubHead>
            {[
              { region: "Riyadh", adoption: "85%+", behavior: "Digital banking hub. Tech-savvy consumers. Giga-project workers. D360 and fintech launch market.", opportunity: "Premium products, investments, gig economy banking", color: ACCENT },
              { region: "Jeddah & Mecca", adoption: "~75%", behavior: "Commercial city. Tourist and Hajj/Umrah economy. Diverse consumer base.", opportunity: "Tourism fintech, religious financial products, SME payments", color: "#3B82F6" },
              { region: "Eastern Province", adoption: "~70%", behavior: "Oil economy workers. ARAMCO ecosystem. Higher incomes, more conservative adoption.", opportunity: "Energy sector employee banking, corporate payroll fintech", color: "#10B981" },
              { region: "Provincial & Rural KSA", adoption: "~45%", behavior: "Lower digital adoption. Cash reliance. SAMA financial inclusion programs active.", opportunity: "Financial inclusion, agent banking, government-to-person payments", color: "#F59E0B" },
            ].map((r, i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "140px 90px 1fr 1fr", gap: 0, marginBottom: 4, borderRadius: 8, overflow: "hidden" }}>
              <div style={{ background: r.color, padding: "12px 14px", color: "#fff", display: "flex", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{r.region}</span></div>
              <div style={{ background: r.color + "15", padding: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: 16, fontWeight: 300, color: r.color }}>{r.adoption}</span></div>
              <div style={{ background: "#F9FAFB", padding: "10px 14px" }}><div style={{ fontSize: 9, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>BEHAVIOR</div><span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{r.behavior}</span></div>
              <div style={{ background: "#FAFAFA", padding: "10px 14px" }}><div style={{ fontSize: 9, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: 1, marginBottom: 3 }}>OPPORTUNITY</div><span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{r.opportunity}</span></div>
            </div>))}
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Behavioral Segments (with TAM)</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { name: "BNPL Shopper", size: "~14M active", useCase: "Online and in-store split payments", unmet: "Shariah-compliant credit card equivalent, loyalty integration", color: ACCENT },
                { name: "New-to-Work Saudi Woman", size: "~8M (2018-2025 cohort)", useCase: "Salary receipt, everyday spending, first investment", unmet: "Purpose-built women's financial products, financial education", color: "#A855F7" },
                { name: "Expat Remitter", size: "~9M active senders", useCase: "Monthly salary remittance to home country", unmet: "Low-fee corridor, family spending visibility, multi-currency", color: "#F59E0B" },
                { name: "Vision 2030 Entrepreneur", size: "~700K SMEs", useCase: "Business banking, working capital, invoice finance", unmet: "Fast credit, ZATCA-integrated accounting, VAT management", color: "#10B981" },
                { name: "Saudi Gig Worker", size: "~2-3M and growing", useCase: "Variable income management, tax compliance, savings", unmet: "Irregular income banking, freelance-specific financial tools", color: "#3B82F6" },
              ].map((s, i) => (<div key={i} style={{ padding: "16px 18px", background: "#F9FAFB", borderRadius: 10, borderLeft: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{s.name}</span><span style={{ fontSize: 11, color: s.color, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{s.size}</span></div>
                <div style={{ fontSize: 11, color: TEXT_SECONDARY, marginBottom: 4 }}><strong>Primary use:</strong> {s.useCase}</div>
                <div style={{ fontSize: 11, color: TEXT_SECONDARY }}><strong>Unmet needs:</strong> {s.unmet}</div>
              </div>))}
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED, fontStyle: "italic", marginTop: 8 }}>Sources: Visa KSA 2024, SAMA Consumer Survey 2025, BCG Saudi Fintech<Ref n={17} /><Ref n={64} /><Ref n={4} /></div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Customer Journey Map</SubHead>
            {[
              { stage: "Awareness", icon: "🔍", color: "#3B82F6", text: "Snapchat is the dominant first-awareness channel for Saudis under 35 — brands that don't run Snapchat campaigns are invisible to a majority of the target market. YouTube pre-roll and YouTube financial creators are second. X (Twitter) carries significant influence among Saudi opinion leaders and is essential for professional/brand credibility. Word-of-mouth (wasta-driven recommendations from trusted family and social networks) drives approximately 30% of bank selection. Celebrity endorsement is powerful but must be a Saudi or regionally recognized personality — international celebrities carry little trust transfer in financial services." },
              { stage: "Consideration", icon: "🤔", color: "#A78BFA", text: "Trust-first evaluation. Saudi consumers verify: SAMA license (regulatory legitimacy), Shariah compliance certificate (religious legitimacy), App Store/Google Play rating (peer legitimacy). Ranked decision factors: (1) SAMA license visible — 84%, (2) Shariah compliance — 79%, (3) App quality — 71%, (4) Family/friend recommendation — 65%, (5) Competitive rates — 58%, (6) Celebrity endorsement — 44%. Arabic language quality is a filter: poorly translated or unnatural Arabic signals 'foreign product not built for us.' RTL interface design errors are an instant disqualifier." },
              { stage: "Activation", icon: "⚡", color: "#10B981", text: "Four primary trigger types: (1) Employer payroll — salary directed to digital bank (strongest trigger; WPS makes this structural for blue-collar expats). (2) BNPL at checkout — Tabby/Tamara account created at first purchase, then retained. (3) Friend/family transfer — Aani P2P payment creates involuntary recipient onboarding. (4) Promotional rate — high-yield savings promotion drives account opening by rate-seekers. Biometric ID (Absher/Nafath integration for Saudi nationals) removes the most significant onboarding friction — SAMA-mandated eKYC using the national ID system means account opening in under 5 minutes for Saudi nationals." },
              { stage: "Usage Patterns", icon: "🔄", color: "#F59E0B", text: "Saudi nationals: Mada QR payments dominate daily use (coffee shops, restaurants, retail). BNPL triggers monthly active use cycles around payday (Saudi private sector typically pays 25th-30th of month). Ramadan and Eid al-Fitr/Adha create seasonal spikes — gifting, shopping, charity (zakat). Hajj season (Dhul Hijjah) creates a unique financial services pattern for the 2.5M+ annual Hajj pilgrims. Expat workers: monthly remittance is the primary financial transaction — everything else (bill pay, savings) is secondary." },
              { stage: "Churn Triggers", icon: "🚪", color: "#EF4444", text: "Five primary churn drivers in Saudi Arabia: (1) Shariah compliance concern — any news suggesting non-compliance triggers immediate exit from religiously observant consumers. (2) Security/fraud incident — SAMA cyber framework is sophisticated, but consumer confidence is fragile. (3) App failure at critical moment (payroll, Hajj transfer). (4) Competitive rate arbitrage — high-yield savings customers are the least loyal segment, switching when better rates appear. (5) Employer change (expat workers) — Kafala system means job change = potential bank change if salary routing changes." },
            ].map((j, i) => (<div key={i} style={{ padding: "18px 22px", borderLeft: `4px solid ${j.color}`, marginBottom: 12, background: i === 4 ? "#FEF2F2" : "#F9FAFB", borderRadius: "0 10px 10px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><span style={{ fontSize: 18 }}>{j.icon}</span><span style={{ fontSize: 14, fontWeight: 700, color: j.color, letterSpacing: 0.5, fontFamily: "'DM Sans', sans-serif" }}>{j.stage.toUpperCase()}</span></div>
              <p style={{ fontSize: 14, color: TEXT_SECONDARY, lineHeight: 1.75, margin: 0 }}>{j.text}</p>
            </div>))}
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Adoption Drivers</SubHead>
            <Prose>Saudi Arabia's cashless transition has been structurally driven by government policy (WPS for salary digitization, MADA ubiquity), merchant adoption (Vision 2030-aligned business formalization requiring digital payments), and app quality (SAMA standards and competition producing genuinely excellent apps — Al Rajhi and Alinma consistently rate 4.7-4.8+).<Ref n={1} /> The BNPL adoption curve demonstrates that credit-averse Saudi consumers will adopt credit products when they are framed correctly. Women's financial inclusion is the fastest-growing demand segment. AI tool adoption (42%+ of Saudis use ChatGPT monthly) signals strong openness to AI-powered financial tools.<Ref n={23} /></Prose>
          </Card>
        </section>

        {/* ══ SECTION 7: COMMUNICATIONS LANDSCAPE ══ */}
        <section id="comms" ref={(el) => (sectionRefs.current["comms"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="07" title="Communication Landscape" subtitle="Saudi Arabia's media environment is defined by a single insight that changes everything: this is the world's #1 Snapchat market. Financial brands that don't lead on Snapchat are invisible to the majority of their target audience." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>7.1 — Media Consumption: The Snapchat-First Market</SubHead>
            <Prose>Saudi Arabia is ranked #1 globally for Snapchat daily time spent per user — approximately 30+ minutes daily, with Snapchat reaching 21M+ Saudi users (~60% of the total population).<Ref n={21} /> This is not a youth niche; it is a mainstream communications platform that rivals television in reach and exceeds it in engagement for the 18-45 demographic. YouTube is equally strong: Saudi Arabia ranks among the world's top YouTube markets per capita, with long-form financial content (banking tutorials, investment advice, product reviews) performing exceptionally well.<Ref n={23} /> X (Twitter) is disproportionately important for opinion leadership, brand credibility, and crisis communications — far more so than in any comparable market. Facebook's reach in Saudi Arabia is significantly lower than the regional/global average, inverting the media planning assumptions most international brands bring from other markets.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[{ n: "Snapchat", p: "#1 globally", note: "30+ min/day. 21M+ users. Saudi-first platform." }, { n: "YouTube", p: "Top 5 globally", note: "Long-form financial content. High trust for tutorials." }, { n: "X/Twitter", p: "High influence", note: "Opinion leadership. Brand credibility. Crisis channel." }, { n: "Instagram", p: "Strong visual", note: "Aspirational lifestyle. Less engagement than Snapchat." }, { n: "TikTok", p: "Rapidly growing", note: "Gen Z Saudi. Short-form. Entertainment-finance hybrid." }, { n: "WhatsApp", p: "Dominant messaging", note: "Customer service. WhatsApp Banking. Community groups." }].map((p, i) => (<div key={i} style={{ padding: "14px 16px", background: "#F9FAFB", borderRadius: 8 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{p.n}</span><span style={{ fontSize: 11, color: ACCENT, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{p.p}</span></div><p style={{ fontSize: 11, color: TEXT_MUTED, margin: 0 }}>{p.note}</p></div>))}
            </div>
            <div style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${ACCENT}` }}>
              <Label>Peak Engagement Windows</Label>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.6 }}>After Fajr prayer (4-6 AM): early morning social media spike. After Maghrib prayer (6-8 PM): peak digital commerce. Late night (10 PM - 1 AM): entertainment and social content. Ramadan: inverted schedule (night-active, day-low). Payday week (25th-30th): financial app activity surges. Hajj season: travel-related financial services. National Day (September 23): high-engagement patriotic content window.<Ref n={21} /></p>
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>7.2 — Fintech Advertising Landscape</SubHead>
            <Prose>Al Rajhi Bank dominates share of voice across all channels, with estimated marketing spend of SAR 800M-1B+ annually. SNB/AlAhli and STC Bank follow. Tabby and Tamara have driven aggressive performance marketing (digital-only, primarily Snapchat and TikTok) to build their consumer bases. Alinma runs the most emotionally sophisticated brand campaigns among established banks. D360 has gone exclusively digital for launch. The Ramadan period (30 days) accounts for approximately 40% of annual fintech marketing spend — comparable to the BER months phenomenon in the Philippines, but compressed into a single month with a spiritual and communal dimension that transcends seasonal shopping.</Prose>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>7.3 — Content Strategy Analysis</SubHead>
            <Prose>Snapchat Stories and Spotlight are the primary high-reach formats for Saudi fintech brands. YouTube tutorials (Arabic-language 'how to use') drive the highest-quality acquisition. X/Twitter is the brand credibility and thought leadership platform — senior bank executives tweet; financial analysts post; brand crises play out in real-time. WhatsApp Banking (Al Rajhi's Arabic NLP banking) represents the next content frontier: conversational financial services as the interface.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ padding: "16px", background: "#F9FAFB", borderRadius: 8 }}>
                <Label>Ramadan Content Calendar (The Saudi BER Months)</Label>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>Pre-Ramadan (weeks -2 to -1): product launch, savings challenges. Ramadan weeks 1-2: charity/zakat integration, community giving campaigns. Ramadan weeks 3-4: Eid shopping BNPL promotions, gifting features. Eid al-Fitr: peak spend, cash transfer promotions. Eid al-Adha (2 months later): second major peak.<Ref n={25} /></p>
              </div>
              <div style={{ padding: "16px", background: "#F9FAFB", borderRadius: 8 }}>
                <Label>Arabic Content Quality as Brand Signal</Label>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>Poor Arabic translation is one of the most reliable signals that a brand is foreign-built and not committed to the Saudi market. Arabic-first design (RTL interface, Arabic typography, Saudi dialect copywriting) signals genuine market commitment. Saudi Arabic dialect differs significantly from MSA (Modern Standard Arabic) and Gulf Arabic — authentic Saudi dialect in campaigns outperforms formal MSA significantly for under-35s.<Ref n={6} /></p>
              </div>
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>7.4 — Messaging Themes Audit</SubHead>
            <Prose>The dominant messaging architecture in Saudi fintech is shaped by three poles: <strong>Vision 2030 alignment</strong> (ambition, national pride, new economy), <strong>Islamic authenticity</strong> (Shariah compliance, community values, zakat, halal), and <strong>security/trust</strong> (SAMA regulation, data protection, Saudi-owned). The emotional vs. functional split runs approximately 55% functional / 45% emotional — slightly more functional than Philippines (60% emotional) due to the importance of regulatory credibility signaling.<Ref n={24} /></Prose>
            <div style={{ padding: "16px", background: "#F9FAFB", borderRadius: 8, marginBottom: 14 }}>
              <Label>Brand Positioning by Messaging</Label>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: 0 }}>Al Rajhi: 'Your Islamic bank — always' (trust + heritage). STC Bank: 'Your digital bank, beyond payments' (transition framing). Alinma: 'Banking for the future Saudi' (innovation). D360: 'Banking without walls' (freedom + digital native). Tabby: 'Shop smarter' (empowerment without debt framing). Tamara: 'Your way to own more' (aspiration). Urpay: 'Send home, simply' (utility + emotional). Riyad Bank: 'Built on trust, moving forward' (heritage + progress).<Ref n={52} /></p>
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>7.5 — Visual &amp; Verbal Identity Audit</SubHead>
            <div style={{ marginBottom: 20 }}>
              <Label color={ACCENT}>Competitive Color Spectrum</Label>
              {[
                { brand: "Al Rajhi", hex: "#1A6B3C", desc: "Deep forest green — Islamic banking's most owned color in KSA. As unassailable as GCash blue in the Philippines. Competitors must actively differentiate." },
                { brand: "SNB/AlAhli", hex: "#0891B2", desc: "Blue/teal — national commercial bank palette. Professional but less warm. Post-merger identity still settling between NCB blue and SAMBA heritage." },
                { brand: "STC Bank", hex: "#0046AA", desc: "STC royal blue — telecom heritage. Instantly recognized but carries 'bills app' baggage that the bank license must overcome." },
                { brand: "Alinma", hex: "#059669", desc: "Emerald — distinct from Al Rajhi's forest green. Modern Islamic bank. The 'smart green' vs. traditional green positioning is subtle but effective." },
                { brand: "D360", hex: "#1A1A2E", desc: "Dark charcoal — a category-breaking premium choice. Most distinctive brand in the market. Premium financial services aesthetic for a digital-native audience." },
                { brand: "Riyad Bank", hex: "#B91C1C", desc: "Heritage red — institutional but dated. Red in Saudi banking reads as 'old establishment' rather than brand energy. Limited differentiation." },
                { brand: "Tabby", hex: "#7C3AED", desc: "Purple — brilliant category-breaker. No bank uses purple. Signals 'not a bank — a shopping companion.' Color itself communicates the BNPL category." },
                { brand: "Tamara", hex: "#0D9488", desc: "Teal — softer category break. Less distinctive than Tabby's purple but warmer than banking blues and greens." },
                { brand: "Urpay", hex: "#1E40AF", desc: "Conservative blue — no brand personality. Functional identity serving a captive market. No strategic differentiation investment." },
              ].map((c, i) => (<div key={i} style={{ display: "flex", gap: 0, marginBottom: 3, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: 48, background: c.hex, flexShrink: 0 }} />
                <div style={{ flex: 1, padding: "8px 12px", background: "#F9FAFB", display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 12, fontWeight: 700, color: TEXT, minWidth: 70, fontFamily: "'DM Sans', sans-serif" }}>{c.brand}</span><span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.45 }}>{c.desc}</span></div>
              </div>))}
              <div style={{ padding: "12px 16px", background: "#FFF7ED", borderRadius: 8, marginTop: 10, borderLeft: "3px solid #F59E0B" }}>
                <p style={{ fontSize: 12, color: "#92400E", margin: 0, lineHeight: 1.55 }}><strong>Color landscape finding:</strong> Green is so thoroughly owned by Islamic banking (Al Rajhi, Alinma) that any new entrant using green risks constant brand confusion. Blue carries telecom/establishment associations. The significant color whitespace for a new fintech entrant is warm tones (amber, coral, warm orange) or premium dark treatments — neither of which is currently occupied by any licensed bank.</p>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Label color={ACCENT}>Brand Personality Index (0-100)</Label>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>
                  <thead><tr style={{ borderBottom: `2px solid ${TEXT}` }}><th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 700, color: TEXT }}>Brand</th>{["Warmth", "Formality", "Playfulness", "Trust", "Innovation"].map(h => (<th key={h} style={{ textAlign: "center", padding: "8px 6px", fontWeight: 600, color: TEXT_MUTED, fontSize: 10 }}>{h}</th>))}<th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, color: TEXT_MUTED, fontSize: 10 }}>Assessment</th></tr></thead>
                  <tbody>
                    {[{ b: "Al Rajhi", c: "#1A6B3C", w: 70, fo: 70, p: 30, t: 98, i: 60, a: "Warmth + trust = the formula. Scale insurmountable." }, { b: "SNB/AlAhli", c: "#0891B2", w: 40, fo: 80, p: 15, t: 85, i: 50, a: "National scale, post-merger identity vacuum." }, { b: "STC Bank", c: "#0046AA", w: 45, fo: 55, p: 40, t: 75, i: 65, a: "Telecom utility brand transitioning to trust brand." }, { b: "Alinma", c: "#059669", w: 65, fo: 45, p: 50, t: 80, i: 85, a: "Best digital + Islamic combination. Limited scale." }, { b: "D360", c: "#1A1A2E", w: 35, fo: 25, p: 35, t: 55, i: 95, a: "Most innovative. Trust must be built from zero." }, { b: "Riyad Bank", c: "#B91C1C", w: 45, fo: 75, p: 20, t: 80, i: 45, a: "Solid but undifferentiated. Loyalty-over-acquisition." }, { b: "Tabby", c: "#7C3AED", w: 70, fo: 15, p: 90, t: 65, i: 80, a: "Best brand in BNPL. Trust trajectory improving." }, { b: "Tamara", c: "#0D9488", w: 65, fo: 20, p: 80, t: 60, i: 70, a: "More Saudi than Tabby. Less polished globally." }, { b: "Urpay", c: "#1E40AF", w: 25, fo: 50, p: 10, t: 55, i: 30, a: "Zero brand equity. Pure utility. Ripe for disruption." }].map((r, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${BORDER}`, background: i % 2 === 0 ? "#FAFAFA" : "#fff" }}>
                        <td style={{ padding: "8px 10px", fontWeight: 700, color: TEXT }}><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: r.c, marginRight: 6, verticalAlign: "middle" }} />{r.b}</td>
                        {[r.w, r.fo, r.p, r.t, r.i].map((v, j) => (<td key={j} style={{ textAlign: "center", padding: "8px 6px" }}><div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><div style={{ width: 36, height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}><div style={{ width: `${v}%`, height: "100%", background: v > 70 ? "#10B981" : v > 40 ? "#F59E0B" : "#EF4444", borderRadius: 2 }} /></div><span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'JetBrains Mono', monospace" }}>{v}</span></div></td>))}
                        <td style={{ padding: "8px 10px", color: TEXT_SECONDARY, fontSize: 10, lineHeight: 1.4 }}>{r.a}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          <Card>
            <SubHead>7.6 — Best-in-Class Campaigns</SubHead>
            {[
              { brand: "Al Rajhi Bank", campaign: "Ramadan: 'We Share Your Journey'", desc: "Annual Ramadan campaign — the gold standard of Saudi financial brand communications. Combines family values, spiritual reflection, and financial planning into a 30-day content journey. Consistently the highest-engagement financial services campaign in the Kingdom.", why: "Ramadan in Saudi Arabia is not just the most important advertising window — it is a cultural synchronization event. All Saudis shift their sleep, eating, social, and spending patterns simultaneously. Al Rajhi's campaign is built for this rhythm, not fighting it. The Shariah finance alignment (zakat calculators, charity integration) makes the brand indispensable during the most religiously significant month.", lesson: "In Saudi Arabia, Ramadan campaign quality is the single strongest brand signal a financial institution can send. A brand that does Ramadan badly signals deep cultural misalignment. A brand that does it brilliantly earns loyalty that outlasts the month by years." },
              { brand: "Tabby", campaign: "'Shop Smarter' BNPL Acquisition", desc: "Multi-channel acquisition campaign reframing BNPL as intelligence, not credit dependency. Snapchat and TikTok native content showed Saudi consumers splitting payments on everyday purchases (groceries, electronics, fashion) with ease and no debt stigma.", why: "The cultural insight was precise: Saudis resist 'debt' but aspire to 'smart management.' Tabby's campaign never showed a customer who couldn't afford something — it showed customers who chose to manage their money intelligently. The psychological reframe from 'I need this credit' to 'I choose to split this payment' is the entire brand architecture in one campaign insight.", lesson: "In markets with cultural or religious resistance to credit, product framing is as important as product quality. Tabby's success is fundamentally a communications achievement — the product is similar to BNPL globally, but the framing is specifically Saudi." },
              { brand: "Alinma Bank", campaign: "Women's Financial Independence Series (2022-2025)", desc: "Long-running content series celebrating Saudi women entering the workforce, launching businesses, and managing finances independently. Post-2018 guardianship reform timing captured a structural cultural shift at its inflection point.", why: "8M+ Saudi women became independent financial consumers post-2018. Alinma was among the first established banks to create dedicated, non-condescending financial content for newly financially independent Saudi women — without reducing them to a single stereotype or treating financial independence as a novelty.", lesson: "The fastest-growing financial services segment in Saudi Arabia has been consistently underserved by established brands' marketing. The first brand to fully own 'the bank for Saudi women's financial independence' — with product depth, not just campaign messaging — will capture a multi-million customer cohort." },
              { brand: "STC Bank", campaign: "International Remittance — 'Send Anywhere'", desc: "Targeted remittance corridor campaign reaching expat workers in Saudi Arabia via their social media communities. Language-localized content (Urdu, Tagalog, Bengali) for top expat nationalities. Fee comparison vs. Western Union and traditional exchange houses.", why: "Expat workers are price-sensitive on remittance and highly motivated to switch providers for better fees. STC Bank's campaign in expat languages (not Arabic or English) signaled genuine intent to serve this community — a rare distinction in a market where expats are often treated as secondary consumers.", lesson: "Language is the most powerful signal of genuine intent in a multi-language market. A Tagalog-language Snapchat ad for Filipino expats costs no more than an Arabic ad — but communicates 'we built this for you' in a way no Arabic campaign can replicate." },
            ].map((bc, i) => (<div key={i} style={{ padding: "22px 24px", borderRadius: 10, marginBottom: 16, background: i === 0 ? ACCENT_BG : "#F9FAFB", borderLeft: `4px solid ${i === 0 ? ACCENT : i < 3 ? ACCENT + "80" : BORDER}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{bc.brand}: {bc.campaign}</span><span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 5, background: ACCENT + "15", color: ACCENT, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>#{i + 1}</span></div>
              <Prose>{bc.desc}</Prose>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ padding: "12px 16px", background: CARD_BG, borderRadius: 8, border: `1px solid ${BORDER}` }}><Label color="#10B981">Why It Worked</Label><p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{bc.why}</p></div>
                <div style={{ padding: "12px 16px", background: CARD_BG, borderRadius: 8, border: `1px solid ${BORDER}` }}><Label color="#F59E0B">Key Insight</Label><p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{bc.lesson}</p></div>
              </div>
            </div>))}
          </Card>
        </section>

        {/* ══ SECTION 8: EXPAT ECONOMY DEEP DIVE ══ */}
        <section id="expat" ref={(el) => (sectionRefs.current["expat"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="08" title="Expat Economy Deep Dive" subtitle="Saudi Arabia's 13.4 million expatriate workers generate the world's second-largest remittance outflow — $33.5B annually — while remaining among the most financially excluded populations in any major economy." />

          <Card accent style={{ marginBottom: 20 }}>
            <SubHead color={ACCENT}>Why This Section Exists</SubHead>
            <Prose style={{ fontSize: 16, color: TEXT }}>The expat economy is Saudi Arabia's equivalent of the Philippines' Islamic finance opportunity: a massive, clearly defined, structurally underserved market with specific needs that almost no digital player has fully addressed. 13.4 million people — nearly 38% of the total population — live and work in Saudi Arabia as expatriates, most under the Kafala employer-sponsorship system.<Ref n={41} /> They collectively send $33.5B abroad annually.<Ref n={65} /> Their primary financial need (remittance) is served by high-fee traditional money transfer operators. Their banking needs are served by a system designed for Saudi nationals. And the one digital product built specifically for them — Urpay — has captured just 1.5M of a 13.4M market. The first mover to build a genuinely expat-first digital bank in Saudi Arabia will serve the most underserved major financial population in the Middle East.</Prose>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>8.1 — Who Are Saudi Arabia's 13.4M Expats?</SubHead>
            <Prose>Saudi Arabia's expatriate population is the most diverse workforce concentration in the world. Approximately 13.4M expats comprise ~38% of the total population<Ref n={29} /> and an even higher share of the labor force (approximately 75% of private sector workers are expat).<Ref n={41} /> The population is highly stratified by income, nationality, and legal status.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { nation: "Indian", est: "~2.5M", sector: "Construction, IT, healthcare, hospitality", income: "SAR 1,500-15,000/mo", remit: "~$8-10B corridor", color: "#FF9933" },
                { nation: "Pakistani", est: "~1.5M", sector: "Construction, labour, domestic", income: "SAR 1,200-3,000/mo", remit: "~$5B corridor", color: "#01411C" },
                { nation: "Bangladeshi", est: "~1M", sector: "Construction, cleaning, domestic", income: "SAR 1,200-2,500/mo", remit: "~$3.5B corridor", color: "#006A4E" },
                { nation: "Egyptian", est: "~1M", sector: "Media, education, professional services", income: "SAR 3,000-10,000/mo", remit: "~$3B corridor", color: "#CE1126" },
                { nation: "Filipino", est: "~700K", sector: "Domestic, healthcare, hospitality", income: "SAR 1,500-5,000/mo", remit: "~$2.5B corridor", color: "#0038A8" },
                { nation: "Others", est: "~6.7M", sector: "Diverse (Yemeni, Indonesian, Nepali, Western)", income: "Wide range", remit: "~$10B+ combined", color: "#6B7280" },
              ].map((n, i) => (<div key={i} style={{ padding: "14px", background: "#F9FAFB", borderRadius: 8, borderTop: `3px solid ${n.color}` }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: TEXT, marginBottom: 4 }}>{n.nation}</div>
                <div style={{ fontSize: 20, fontWeight: 300, color: n.color }}>{n.est}</div>
                <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 4 }}>{n.sector}</div>
                <div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 2 }}>Income: {n.income}</div>
                <div style={{ fontSize: 10, color: "#16A34A", fontWeight: 600, marginTop: 2 }}>{n.remit}</div>
              </div>))}
            </div>
            <div style={{ fontSize: 11, color: TEXT_MUTED, fontStyle: "italic" }}>Sources: MHRSD 2024, World Bank Migration Brief 2024<Ref n={41} /><Ref n={26} /></div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>8.2 — Financial Exclusion Under Kafala</SubHead>
            <Prose>The Kafala (sponsorship) system links an expatriate worker's legal status in Saudi Arabia to a specific employer (kafeel). This creates structural financial vulnerabilities that conventional banking products do not address.<Ref n={42} /> A worker whose employer changes — whether due to contract expiry, job change, or Kafala transfer — may experience interruption to salary, banking relationships, and remittance access simultaneously. Workers in dispute with employers may be legally prevented from leaving the country, creating a trapped population with critical financial needs and no recourse through conventional channels.</Prose>
            <Prose>Banking access under Kafala: Major banks require a Saudi iqama (residency permit), employer documentation, and minimum salary thresholds that exclude large portions of the expat workforce. Many blue-collar workers cannot qualify for savings accounts, credit, or investment products. Bank account portability across employers is not guaranteed. SAMA's Wage Protection System (WPS) ensures salary is paid digitally — but the receiving wallet (often Urpay) is constrained to basic services.<Ref n={43} /> Credit access is essentially zero for most expat workers. This is financial exclusion operating at scale.</Prose>
            {[
              { constraint: "Kafala employer-linked legal status", severity: "Critical", impact: "Banking relationship may terminate when employment changes. No bank account portability guarantee. Financial identity tethered to employer, not individual.", color: "#DC2626" },
              { constraint: "Income minimums for account products", severity: "High", impact: "Most premium banking products require SAR 3,000-5,000/month minimum salary. Majority of blue-collar expats earn SAR 1,200-2,500. Structural exclusion from most bank products.", color: "#F59E0B" },
              { constraint: "No credit history outside KSA", severity: "High", impact: "SIMAH (Saudi credit bureau) only captures Saudi credit history. Expat workers have no accessible credit score, making any credit product approval binary and limited.", color: "#F59E0B" },
              { constraint: "Language and digital literacy barriers", severity: "Medium", impact: "Bank KYC, onboarding, and dispute resolution primarily in Arabic. Expat workers from Bangladesh, Nepal, Ethiopia may have limited Arabic and English literacy. Digital apps assume smartphone fluency.", color: "#3B82F6" },
            ].map((c, i) => (<div key={i} style={{ padding: "16px 20px", background: "#F9FAFB", borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${c.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{c.constraint}</span><Severity level={c.severity} /></div>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{c.impact}</p>
            </div>))}
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>8.3 — The $33.5B Remittance Corridor</SubHead>
            <Prose>Saudi Arabia is the world's second-largest origin of remittances after the United States, with $33.5B in outward flows in 2024.<Ref n={65} /> This figure represents the labor of 13.4M workers converted into family support across South Asia, Southeast Asia, the Arab world, and East Africa. Yet the infrastructure for these flows remains largely unchanged: money exchange houses (sarafas) and global MTO networks (Western Union, MoneyGram) charging fees that often exceed 5-7% — well above the UN SDG target of 3%.<Ref n={26} /></Prose>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[{ v: "$33.5B", l: "Annual outward remittances (2024)", accent: true }, { v: "#2", l: "Largest remittance origin market globally (after US)", accent: true }, { v: "5-7%", l: "Average corridor fee (vs. UN 3% target)", accent: false }, { v: "SAR 500", l: "Average fee per $400 transfer (2.5x UN target)", accent: false }, { v: "~$1.7B", l: "Estimated annual over-charge vs. 3% target", accent: true }, { v: "75%", l: "Still use traditional MTOs (vs. digital alternatives)", accent: false }].map((s, i) => (<div key={i} style={{ padding: "14px", background: s.accent ? ACCENT_BG : "#F9FAFB", borderRadius: 8, borderLeft: `3px solid ${s.accent ? ACCENT : BORDER}` }}><div style={{ fontSize: 22, fontWeight: 300, color: s.accent ? ACCENT : TEXT }}>{s.v}</div><div style={{ fontSize: 10, color: TEXT_MUTED, marginTop: 3 }}>{s.l}</div></div>))}
            </div>
            <Prose>The remittance window dynamics matter for product design. End-of-month (post-WPS salary, typically 25th-30th) is the primary sending window. Eid periods (al-Fitr and al-Adha) are secondary peaks — workers send extra amounts as gifts to families. Ramadan's final 10 days create a small late-night digital transfer window. The Philippine OFW pattern of Pamasko-as-remittance has an exact Saudi parallel: Eid money sent by Saudi-based workers to children who could not afford to fly home for the holiday.</Prose>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>8.4 — Product Gap Analysis</SubHead>
            {[
              { gap: "Fully digital, expat-first bank account", status: "Gap", desc: "Urpay serves ~1.5M of 13.4M expats. No full-service digital bank has built an expat-first product with Kafala-aware design (no employer-tethered account, portable iqama-based identity). The product needs to work on day one of a new job, survive employer changes, and offer basic banking without the minimum income thresholds of conventional banks.", icon: "🏦" },
              { gap: "Low-fee digital remittance (corridor-specific)", status: "Gap", desc: "India, Pakistan, Bangladesh, Philippines corridors represent ~$19-21B of Saudi outflows. STC Bank offers remittance but with limited corridor depth. A corridor-specific digital product (INR, PKR, BDT, PHP endpoints fully integrated) with sub-2% fees and 5-minute settlement would immediately displace incumbent MTOs.", icon: "💸" },
              { gap: "Family financial visibility for senders", status: "Gap", desc: "OFW families in the Philippines use GCash to show senders how money is spent. No Saudi-based remittance product offers sender visibility into recipient spending — a product feature that would deepen stickiness for the sender and create a banking entry point for the recipient.", icon: "👨‍👩‍👧" },
              { gap: "Micro-credit for expat workers", status: "Gap", desc: "Blue-collar expat workers have essentially zero credit access in Saudi Arabia. Alternative credit scoring using WPS salary history, ZATCA employment records, and transaction history could underwrite small personal loans (SAR 1,000-5,000) for workers with 12+ months clean salary record. No licensed institution does this today.", icon: "💳" },
              { gap: "Multi-language digital banking", status: "Partial", desc: "STC Bank and Urpay offer some non-Arabic support. No bank offers full app localization in Urdu, Bengali, Tagalog, and Amharic — the top 4 expat worker languages. Language localization is the single highest-ROI investment for any brand seeking expat acquisition.", icon: "🌐" },
            ].map((p, i) => (<div key={i} style={{ padding: "18px 22px", background: p.status === "Gap" ? ACCENT_BG : "#FFFBEB", borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${p.status === "Gap" ? ACCENT : "#F59E0B"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{p.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{p.gap}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 5, background: p.status === "Gap" ? ACCENT + "20" : "#F59E0B20", color: p.status === "Gap" ? ACCENT : "#D97706", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{p.status.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
            </div>))}
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>8.5 — Regulatory Evolution &amp; Opportunity</SubHead>
            <Prose>Three regulatory developments between 2021-2025 have materially changed the expat financial services opportunity in Saudi Arabia.</Prose>
            {[
              { dev: "Labour Mobility Initiative (2021)", detail: "Saudi Arabia's most significant Kafala reform: workers with 12+ months tenure can now change employers without needing kafeel (sponsor) approval. This partially decouples legal status from a specific employer — reducing the financial risk of account disruption during job changes. It does not fully solve the problem, but it reduces the most extreme financial vulnerability scenarios.", color: "#10B981" },
              { dev: "Wage Protection System (WPS) Expansion", detail: "SAMA has systematically expanded WPS coverage: private sector mandatory since 2013, now covering domestic workers (2024). WPS creates a real-time salary data trail for every covered worker — the most powerful alternative credit scoring dataset in the Kingdom. Any fintech with WPS data access can underwrite expat worker credit with far more precision than conventional banks using income documentation.", color: "#3B82F6" },
              { dev: "SAMA Fintech Inclusion Strategy", detail: "SAMA's Financial Inclusion Strategy (2024) explicitly lists expat workers as an underserved priority segment. This is a policy signal that SAMA will look favorably on license applications and regulatory sandbox entries that address expat financial inclusion — a significant de-risking of the regulatory environment for purpose-built expat banking products.", color: ACCENT },
            ].map((r, i) => (<div key={i} style={{ padding: "18px 22px", background: "#F9FAFB", borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${r.color}` }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>{r.dev}</span>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: "8px 0 0" }}>{r.detail}<Ref n={42} /></p>
            </div>))}
          </Card>

          <Card>
            <SubHead>8.6 — Market Potential &amp; Structural Barriers</SubHead>
            <Prose>The structural data points toward an expat-first digital bank as the highest-potential financial inclusion opportunity in Saudi Arabia. Three factors define the opportunity scale.</Prose>
            {[
              { reason: "Completely uncontested market", detail: "Urpay has 1.5M users from 13.4M potential (11% penetration). No full-service digital bank is expat-first. The one existing product is owned by a conventional bank (ANB) with no strategic motivation to radically improve it. This is not a market with 10 competitors where differentiation is incremental — it is a market with one under-invested incumbent.", color: ACCENT },
              { reason: "Structural demand drivers are growing", detail: "Saudi Vision 2030's economic diversification is increasing expat workers in new sectors (entertainment, tourism, hospitality) alongside the traditional construction/domestic categories. The Labour Mobility Initiative creates a population of workers who can change jobs — and therefore want banking that travels with them, not with their employer.", color: "#3B82F6" },
              { reason: "Remittance as acquisition + retention engine", detail: "Remittance creates monthly behavioral necessity: workers must send money home. An expat-first digital bank that makes remittance frictionless and cheap becomes the most-used financial app in the worker's life. This is structurally more powerful than any rewards program — the product solves a genuine monthly necessity.", color: "#10B981" },
            ].map((r, i) => (<div key={i} style={{ padding: "18px 22px", background: i === 0 ? ACCENT_BG : "#F9FAFB", borderRadius: 10, marginBottom: 10, borderLeft: `4px solid ${r.color}` }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>{r.reason}</span>
              <p style={{ fontSize: 13, color: TEXT_SECONDARY, lineHeight: 1.6, margin: "8px 0 0" }}>{r.detail}</p>
            </div>))}

            <div style={{ marginTop: 20 }}>
              <SubHead>Structural Barriers</SubHead>
              {[
                { barrier: "Kafala residual complexity", severity: "High", mitigation: "Labour Mobility Initiative reduces but doesn't eliminate Kafala risk. Product design must anticipate employer changes: portable identity (iqama-based not employer-based), transferable WPS linkage, account persistence through job changes." },
                { barrier: "Multi-language KYC at scale", severity: "Medium", mitigation: "Iqama-based biometric KYC (ABSHER for Saudi nationals, iqama scan for expats) is standardized and works in Arabic. The barrier is app localization, customer support, and dispute resolution in 5+ languages — an operational challenge that requires genuine investment, not translation-on-the-cheap." },
                { barrier: "SAMA capital requirements for full banking", severity: "Medium", mitigation: "SAR 1.5B minimum capital for digital bank license. Alternatively, an EMI (Electronic Money Institution) license has lower thresholds and enables payments/remittance without full banking — potentially the right first step before the banking license." },
                { barrier: "Credit risk in undocumented worker economy", severity: "Medium", mitigation: "WPS data provides 12+ months of salary history for ~9M+ workers. Alternative credit scoring models built on WPS + ZATCA employment records + behavioral data significantly outperform traditional bank underwriting for expats." },
              ].map((c, i) => (<div key={i} style={{ padding: "16px 20px", background: "#F9FAFB", borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${["#F59E0B", "#3B82F6", "#10B981", "#8B5CF6"][i]}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{c.barrier}</span><Severity level={c.severity} /></div>
                <p style={{ fontSize: 13, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{c.mitigation}</p>
              </div>))}
            </div>
          </Card>
        </section>

        {/* ══ SECTION 9: APPENDICES ══ */}
        <section id="appendix" ref={(el) => (sectionRefs.current["appendix"] = el)} style={{ marginBottom: 80 }}>
          <SectionTitle num="09" title="Appendices &amp; Additional Materials" subtitle="SAMA regulatory reference, source database, glossary, visual audit index, and research design inputs." />

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Appendix A — SAMA Regulatory Reference</SubHead>
            {[
              { ref: "Digital Bank Regulatory Framework", year: "2020", detail: "Establishes digital bank category. SAR 1.5B minimum capital. Maximum 5 licenses in first phase (now expanding). No physical branches required. Must have a Saudi-based technology operations centre. Consumer protection obligations identical to conventional banks." },
              { ref: "SAMA Fintech Regulatory Sandbox", year: "2018, updated 2023", detail: "Controlled testing environment with expedited licensing. 40+ companies graduated. Open to Saudi and international applicants. Covers payments, lending, insurance, regtech, and Islamic fintech. Maximum testing period: 18 months." },
              { ref: "Open Banking Framework", year: "2021, Phase 2 live 2024", detail: "Phase 1 (account information): banks must expose read APIs. Phase 2 (payment initiation): third parties can initiate payments. API security standards aligned to UK Open Banking and EU PSD2. SAMA-operated Open Banking Lab for testing." },
              { ref: "BNPL Regulatory Framework", year: "2023", detail: "Licensing requirement for all BNPL providers. Minimum capital SAR 200M for BNPL license. Consumer protection obligations: clear disclosure, credit bureau reporting, no hidden fees. Shariah compliance required." },
              { ref: "Consumer Finance Law (CFL)", year: "Updated 2024", detail: "Maximum effective profit rate for personal finance. Credit bureau (SIMAH) reporting obligations. Borrower protection and dispute resolution. Islamic finance disclosure requirements." },
              { ref: "Wage Protection System (WPS)", year: "2013, expanded 2024", detail: "Mandatory digital salary disbursement for all private sector employers. Domestic workers added in 2024 expansion. SAMA monitors compliance; violations result in work permit freeze." },
              { ref: "National Data Governance Framework", year: "2021-2024", detail: "Personal data protection legislation. Cross-border data transfer regulations. Financial data localization requirements (data must be stored in Saudi Arabia). Consumer consent and portability rights." },
            ].map((r, i) => (<div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{r.ref}</span><span style={{ fontSize: 11, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{r.year}</span></div>
              <p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: "6px 0 0", lineHeight: 1.5 }}>{r.detail}</p>
            </div>))}
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Appendix B — Data Sources ({Object.keys(SOURCES).length} cited)</SubHead>
            <Prose>All data points cross-referenced against primary sources (SAMA filings, company reports, academic research). Financial market data from SAMA annual reports, Bloomberg, and company disclosures. Consumer data from published surveys (YouGov, Visa, Mastercard, BCG, McKinsey, PwC). Social media from We Are Social/Meltwater methodology. Remittance data from World Bank Migration & Development Brief and SAMA statistics.</Prose>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {Object.entries(SOURCES).map(([num, src]) => (<div key={num} style={{ padding: "8px 12px", background: "#F9FAFB", borderRadius: 6, display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ fontSize: 10, color: ACCENT, fontWeight: 700, fontFamily: "monospace", minWidth: 24 }}>[{num}]</span><span style={{ fontSize: 11, color: TEXT_SECONDARY, lineHeight: 1.4 }}>{src.full}</span></div>))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Appendix C — Glossary</SubHead>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { term: "SAMA", def: "Saudi Arabian Monetary Authority — Saudi Arabia's central bank and financial regulator" },
                { term: "Kafala", def: "Employer-sponsorship system tying expat workers' legal status to a specific employer" },
                { term: "Iqama", def: "Residency permit for expatriate workers in Saudi Arabia" },
                { term: "WPS", def: "Wage Protection System — SAMA-mandated digital salary disbursement" },
                { term: "MADA", def: "Saudi national payment network (domestic debit card network)" },
                { term: "SARIE", def: "Saudi Arabia's real-time interbank settlement system" },
                { term: "Aani", def: "Instant payment platform for P2P transfers between Saudi banks" },
                { term: "SIMAH", def: "Saudi Credit Bureau — central credit information registry" },
                { term: "ZATCA", def: "Zakat, Tax and Customs Authority (Saudi tax authority)" },
                { term: "Fatoorah", def: "ZATCA's mandatory e-invoicing system for Saudi businesses" },
                { term: "FSDP", def: "Financial Sector Development Program — Vision 2030's financial reform agenda" },
                { term: "BNPL", def: "Buy Now Pay Later — installment payment at point of sale" },
                { term: "MTO", def: "Money Transfer Operator (Western Union, MoneyGram, etc.)" },
                { term: "Sarafa", def: "Money exchange house (traditional remittance intermediary)" },
                { term: "IBU", def: "Islamic Banking Unit within a conventional bank" },
                { term: "AAOIFI", def: "Accounting and Auditing Organization for Islamic Financial Institutions" },
                { term: "IFSB", def: "Islamic Financial Services Board — global standard-setter" },
                { term: "Murabahah", def: "Cost-plus sale: Islamic lending structure without interest" },
                { term: "Mudarabah", def: "Profit-sharing arrangement between depositor and bank" },
                { term: "Takaful", def: "Islamic cooperative insurance based on mutual contribution" },
                { term: "Zakat", def: "Islamic obligatory almsgiving (2.5% of surplus wealth annually)" },
                { term: "Riba", def: "Interest/usury: prohibited in Islamic finance" },
                { term: "Halal", def: "Permissible under Islamic law" },
                { term: "Wasta", def: "Social capital/influence network; personal connections in Arab culture" },
                { term: "Izzah", def: "Dignity and honour — shapes attitudes to financial vulnerability in Saudi culture" },
                { term: "BER months", def: "Philippines equivalent: Ramadan month + Eid periods as Saudi marketing peaks" },
                { term: "CFL", def: "Consumer Finance Law — governs lending products in Saudi Arabia" },
                { term: "NEOM", def: "Saudi Arabia's flagship futuristic city mega-project" },
                { term: "Giga-projects", def: "Vision 2030 large-scale development projects (NEOM, Red Sea, Diriyah)" },
                { term: "SOV", def: "Share of Voice — brand's advertising presence relative to competitors" },
                { term: "EMI", def: "Electronic Money Institution — lighter-touch licence for payments/wallets" },
                { term: "Open Banking", def: "API-based framework allowing third parties to access bank data (with consent)" },
                { term: "GCC", def: "Gulf Cooperation Council — Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman" },
              ].map((g, i) => (<div key={i} style={{ padding: "8px 12px", background: "#F9FAFB", borderRadius: 6 }}><span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{g.term}</span><span style={{ fontSize: 12, color: TEXT_SECONDARY, marginLeft: 10 }}>{g.def}</span></div>))}
            </div>
          </Card>

          <Card style={{ marginBottom: 20 }}>
            <SubHead>Appendix D — Visual Audit Gallery Index</SubHead>
            {[
              { category: "Mobile App UI/UX", count: "50+ screens", brands: "Al Rajhi, SNB/AlAhli, STC Bank, Alinma, D360, Riyad Bank, Tabby, Tamara, Urpay, Neoleap", detail: "Onboarding flows, home screens, savings interfaces, BNPL checkout, remittance flows, KYC processes. Arabic RTL design evaluation. Shariah compliance disclosure patterns. Bilingual UX analysis." },
              { category: "Website & Landing Pages", count: "20 pages", brands: "All 10 competitors + SAMA.gov.sa", detail: "Arabic-first vs. English-first homepage hierarchy. Trust signals (SAMA license badge placement, Shariah compliance certification). BNPL merchant checkout integration design. Expat product visibility assessment." },
              { category: "Social Media & Advertising", count: "40+ assets", brands: "Al Rajhi, STC Bank, Alinma, Tabby, Tamara", detail: "Snapchat Stories and Spotlight ads. YouTube pre-roll. X/Twitter promoted content. Ramadan campaign series. Arabic dialect vs. MSA copywriting analysis. BNPL lifestyle photography. Women's financial independence content." },
              { category: "Brand Identity Systems", count: "10 brand boards", brands: "All 10 competitors", detail: "Color palette extraction (green dominance analysis). Arabic typography classification. Islamic geometric pattern usage. Photography direction (aspiration vs. utility vs. heritage). Mapped on Warmth–Institutional and Digital–Physical axes." },
              { category: "Physical Touchpoints", count: "15+ photos", brands: "Al Rajhi, SNB/AlAhli, Riyad Bank, Sarafa (exchange houses)", detail: "Bank branch exterior and interior design. ATM network coverage. Sarafa (exchange house) physical presence — the incumbent Urpay competes against. Mall banking kiosks. Remittance collection point photography." },
            ].map((v, i) => (<div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${[ACCENT, "#3B82F6", "#F59E0B", "#10B981", "#8B5CF6"][i]}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}><span style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>{v.category}</span><span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{v.count}</span></div>
              <div style={{ fontSize: 11, color: ACCENT, fontWeight: 600, marginBottom: 4 }}>{v.brands}</div>
              <p style={{ fontSize: 12, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.5 }}>{v.detail}</p>
            </div>))}
          </Card>

          <Card>
            <SubHead>Appendix E — Inputs for Qualitative &amp; Quantitative Research</SubHead>
            <div style={{ marginBottom: 20 }}>
              <Label color={ACCENT}>Priority Hypotheses to Validate</Label>
              {[
                "H1: Shariah compliance certification is a hygiene factor (without it, no consideration) rather than a differentiator (with it, no competitive advantage). — Method: Conjoint analysis, Saudi nationals",
                "H2: Expat workers would switch from their current MTO to a digital bank remittance product if fees dropped below 2% and transfer time was under 5 minutes. — Method: Price sensitivity survey, expat sample n=500",
                "H3: Saudi women under 40 feel the current financial brand landscape does not speak to their financial independence — they want financial products marketed to them, not just 'open to them.' — Method: Focus groups, Saudi women 25-40",
                "H4: BNPL users in Saudi Arabia self-identify as 'smart shoppers' rather than 'credit users' — the debt stigma does not apply to split payments in their self-concept. — Method: In-depth interviews, Tabby/Tamara users",
                "H5: Blue-collar expat workers would bank with an expat-first digital bank if it offered (a) multi-language app, (b) no minimum income, (c) fee-free remittance to home corridor. — Method: Concept test, expat workers n=300 across 3 nationalities",
                "H6: Gen Z Saudi users discover new financial products on Snapchat rather than through bank branch awareness, word-of-mouth from parents, or search advertising. — Method: Brand tracker survey, Saudi nationals 18-28",
                "H7: The Kafala-related job change moment is the highest-risk churn moment for expat banking — workers who change employers and have poor account experience do not return. — Method: Exit survey / retrospective interviews",
                "H8: Ramadan is the single most important brand-building window in Saudi fintech — brands that run during Ramadan are remembered; brands that run in Q1/Q2 alone are not. — Method: Ad recall study comparing Ramadan vs. non-Ramadan exposure",
              ].map((h, i) => (<div key={i} style={{ padding: "10px 14px", background: i < 5 ? ACCENT_BG : "#F9FAFB", borderRadius: 6, marginBottom: 4, borderLeft: i < 5 ? `3px solid ${ACCENT}` : "none" }}><p style={{ fontSize: 12, color: TEXT, margin: 0, lineHeight: 1.5 }}>{h}</p></div>))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <Label color="#3B82F6">Discussion Guide Themes (Focus Groups / IDIs)</Label>
              {[
                { theme: "Trust Formation — Saudi Nationals", questions: "How did you choose your primary bank? What role did SAMA license play vs. Shariah compliance vs. app quality? Would you trust a new digital bank with no physical presence? What would make you move your salary account?" },
                { theme: "Women's Financial Independence", questions: "How has your relationship with financial services changed since 2018? What products do you wish existed specifically for you? Do any current brands make you feel 'seen' as a financially independent Saudi woman? What tone feels patronizing vs. empowering?" },
                { theme: "BNPL Psychology", questions: "Do you use Tabby or Tamara? How do you think about split payments vs. credit? Does it feel like debt? When would you refuse to use BNPL? What brands/products would you not split-pay and why?" },
                { theme: "Expat Financial Reality (separate groups by nationality)", questions: "How do you currently send money home? What are your biggest frustrations? Have you tried Urpay? What would a better product look like? What do you trust to handle your salary? What happens if you change jobs — does your banking survive?" },
                { theme: "Ramadan Financial Behavior", questions: "How does your financial behavior change during Ramadan? Do you engage more or less with financial apps? Have you seen any financial brand campaigns during Ramadan that you remembered? What makes a Ramadan campaign feel authentic vs. commercial?" },
              ].map((t, i) => (<div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: "3px solid #3B82F6" }}><span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{t.theme}</span><p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: "4px 0 0", lineHeight: 1.55 }}>{t.questions}</p></div>))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <Label color="#10B981">Quantitative Survey Modules</Label>
              {[
                { module: "M1: Brand Awareness & Consideration", items: "Aided/unaided awareness of 10 competitors. Consideration set. Primary financial app. Trust attribute ratings. SAMA license importance. Shariah compliance importance.", sample: "n=1,200 Saudi nationals, nationally representative, 18-55" },
                { module: "M2: Trust & Decision Drivers", items: "Ranked trust factors (Shariah compliance, SAMA license, friend recommendation, celebrity, app rating). Deal-breakers. Willingness to trial new digital bank. Brand personality mapping.", sample: "n=1,200 same panel" },
                { module: "M3: Expat Financial Behavior", items: "Current remittance provider, frequency, cost, satisfaction. WPS awareness and salary receipt. Banking barriers. Willingness to switch for fee reduction. Concept test: expat-first digital bank.", sample: "n=600 expats: Indian 200, Pakistani 150, Bangladeshi 150, Filipino 100" },
                { module: "M4: BNPL Adoption & Psychology", items: "Current BNPL usage, providers. Debt stigma index. Purchase categories using BNPL. Willingness to use BNPL for financial products (savings, insurance). Brand preference.", sample: "n=800, Saudi nationals + expats, 18-45" },
                { module: "M5: Women's Financial Independence", items: "Self-reported financial independence level (2018 vs. now). Product ownership. Brand resonance. Advertising recall and response. Unmet product needs.", sample: "n=400 Saudi women, 20-45, working/recently employed" },
                { module: "M6: Positioning Concept Test", items: "Three positioning concepts (Vision 2030 Champion, Expat-First Digital Bank, Islamic Finance Pioneer). Appeal, uniqueness, relevance, believability by segment.", sample: "n=600 split sample" },
              ].map((m, i) => (<div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: "3px solid #10B981" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{m.module}</span><span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{m.sample}</span></div>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{m.items}</p>
              </div>))}
            </div>

            <div>
              <Label color="#8B5CF6">Recommended Research Design (3 Phases)</Label>
              {[
                { phase: "Phase 1 — Qualitative", detail: "8-10 focus groups: Saudi nationals (Riyadh, Jeddah, Dammam); Saudi women specifically (urban, 25-40); expat workers by nationality (separate Indian, Pakistani, Filipino groups — language-appropriate facilitation); Gen Z Saudi nationals. 20-30 in-depth interviews. Arabic-language or mother-tongue facilitation.", timeline: "5-7 weeks" },
                { phase: "Phase 2 — Quantitative", detail: "Online panel (Saudi nationals, professional expats) + CAWI with language localization (Urdu, Bengali, Tagalog, Amharic for blue-collar expat segments). n=2,500 total with module structure above. CATI backup for older/rural Saudi nationals. All questionnaires in Arabic with Saudi dialect where appropriate.", timeline: "7-9 weeks" },
                { phase: "Phase 3 — Expat Ethnography", detail: "In-context research: observe expat workers at sarafas (exchange houses) during remittance sending. Ride-along with delivery drivers, construction workers during payday. Home visits to Filipino and Indian expat workers' accommodation. Document real financial workarounds, cash handling, and MTO interaction patterns.", timeline: "3-4 weeks" },
              ].map((p, i) => (<div key={i} style={{ padding: "14px 18px", background: "#F9FAFB", borderRadius: 8, marginBottom: 6, borderLeft: "3px solid #8B5CF6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{p.phase}</span><span style={{ fontSize: 10, color: TEXT_MUTED, fontFamily: "'DM Sans', sans-serif" }}>{p.timeline}</span></div>
                <p style={{ fontSize: 11, color: TEXT_SECONDARY, margin: 0, lineHeight: 1.55 }}>{p.detail}</p>
              </div>))}
            </div>
          </Card>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: 48, padding: "24px 0", borderTop: `2px solid ${TEXT}`, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: TEXT_MUTED, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>Saudi Arabia Digital Finance — Market Intelligence &amp; Brand Landscape Analysis — Q1 2026 — {Object.keys(SOURCES).length}+ sources cited</p>
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: "8px 0 0", fontFamily: "'DM Sans', sans-serif" }}>Market Analysis · Brand &amp; Communications Audit · Consumer Intelligence · Expat Economy Deep Dive</p>
          <p style={{ fontSize: 10, color: "#D1D5DB", margin: "6px 0 0", fontFamily: "'DM Sans', sans-serif" }}>Sources: SAMA · McKinsey · BCG · PwC · Deloitte · Visa · Mastercard · Snap Inc. · World Bank · ILO · Kantar · Euromonitor · GaStat</p>
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
          #root, #root > div { height: auto !important; overflow: visible !important; max-height: none !important; }
          button, [style*="position: sticky"], [style*="position: fixed"] { display: none !important; }
          * { box-shadow: none !important; }
          section { page-break-inside: avoid; break-inside: avoid; }
          h2, h3 { page-break-after: avoid; break-after: avoid; }
        }
      `}</style>
    </div>
  );
}
