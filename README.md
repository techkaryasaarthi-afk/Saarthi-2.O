# Karya Saarthi & Saarthi 2.0 AI Enterprise Platform

A comprehensive, production-ready frontend web application implementing all the frontend developer tasks detailed across the **8 Phases and 50 Steps** of the technical architecture roadmap.

---

## 🎨 Brand Identity & Theme Harmonization

### 1. Dual Logo Integration
- **Main Brand Logo (White Badge):** `karya-saarthi-logo.jpg`
  - Monogram "KS" with navy blue circular frame.
  - Handshake symbol in Teal & Warm Gold.
  - Subtitle: *"YOUR TRUSTED WORK COMPANION"*.
  - Displayed prominently in the top header and navigation.
- **AI Core Logo (Cyber Globe Badge):** `saarthi-2-logo.jpg`
  - Futuristic compass "S" badge with cyber globe and orbital rings.
  - Displayed alongside the main logo, in the AI engine playground, and on the **always-accessible floating chatbot widget** at the bottom-right corner!

### 2. Dual Themes (Dark & Light Mode)
- **Toggle Button:** Located at the top-right header with instant switching.
- **Light Theme:**
  - Background: Crisp Slate `#f8fafc` / Pure White `#ffffff`.
  - Brand Navy: `#0e2a47` & Vibrant Teal `#00a896`.
  - Accent Gold: `#f5a623`.
- **Dark Theme (Inspired by Saarthi 2.0 Cosmic Globe):**
  - Background: Deep Cosmic Navy `#070d1e` / `#0f182e`.
  - Cyber Cyan Glow: `#00f2fe` & Neon Teal `#009688`.
  - Solar Amber Gold: `#ffb703`.

---

## 🚀 How to Run

### Option 1: Direct Browser Launch (Recommended)
Double click `index.html` or run `launch.bat`.
It opens instantly in any browser with **zero dependencies**, full offline functionality, and no compilation step needed.

### Option 2: Node.js Local Server
```bash
node server.js
```
Then visit: `http://localhost:3000`

---

## 📋 Complete 50-Step Roadmap Coverage (Frontend Deliverables)

### Phase 1: Foundation & Core Architecture (Steps 1–10)
- **Step 1: Central API Gateway Setup** → Interactive Swagger / API documentation explorer (`/api/v1/chat`, `/api/v1/rag`).
- **Step 2: Database & User Schema Creation** → PostgreSQL & Supabase database structure visualizer.
- **Step 3: AI Engine (LLM) Integration** → Interactive LLM playground (Google Gemini 1.5 Pro vs OpenAI GPT-4o with streaming output).
- **Step 4: RAG System (Knowledge Base) Setup** → Admin drag-and-drop document upload UI for company PDFs and pricing sheets.
- **Step 5: Data Ingestion (Knowledge Feeding)** → Ingestion progress tracker for 1,200+ services into Pinecone / pgvector.
- **Step 6: Authentication & Security (JWT)** → Central Login / Registration SSO portal with RBAC role switching.
- **Step 7: Context Memory (Chat History)** → "Clear History" and "Load Previous Chat" controls.
- **Step 8: Multilingual Support Setup** → Global language switcher (Hindi, English, Spanish, Gujarati, Marathi).
- **Step 9: Webhook Architecture** → Real-time CRM webhook status monitor.
- **Step 10: Rate Limiting & Cost Control** → Token usage meter and simulated HTTP 429 ("Too many requests") alert banner.

### Phase 2: Official Website Chatbot (Steps 11–15)
- **Step 11: Floating Chat Widget Design** → Bottom-right floating trigger with animated pulsing Saarthi 2.0 badge.
- **Step 12: Real-time Typing & UI** → Real-time streaming response window with typing indicator and markdown rendering.
- **Step 13: Lead Generation via Chat** → Interactive in-chat lead capture form (Name, Phone, Service requirement).
- **Step 14: Voice-to-Text Integration** → Microphone speech recognition powered by Web Speech API (Hindi/English).
- **Step 15: Website Analytics Dashboard** → Visual metrics for chat leads, conversion rate, and weekly volume.

### Phase 3: CRM AI Agent (Steps 16–22)
- **Step 16: CRM Sidebar AI Assistant UI** → Collapsible AI assistant side panel.
- **Step 17: Sales Pitch Generator** → One-click "Generate Pitch" proposal builder based on project budget.
- **Step 18: Auto-Follow-up Drafting** → "Draft with AI" button composing contextual follow-up messages.
- **Step 19: Intelligent Lead Scoring** → CRM table with dynamic lead scores (1-100) and Hot/Cold sentiment tags.
- **Step 20: Chat History Sync** → Lead profile tab displaying omnichannel conversation transcripts.
- **Step 21: Human Takeover Alert** → Real-time red alert popup when client frustration is detected.
- **Step 22: Admin Prompt Control** → CRM Settings "AI Prompt Guidelines" editor with dynamic database sync.

### Phase 4: WhatsApp & Communication (Steps 23–27)
- **Step 23: WhatsApp Cloud API Setup** → WhatsApp inbox UI inside CRM with message threads.
- **Step 24: Webhook Listener for Incoming Messages** → Real-time notification toast when incoming message arrives.
- **Step 25: Auto-Reply via AI** → Admin toggle switch for 24/7 AI Auto-Reply (ON/OFF).
- **Step 26: Media Sharing via WhatsApp** → Attach company portfolio PDF and brochures in chat.
- **Step 27: WhatsApp to CRM Lead Routing** → Dashboard widget tracking WhatsApp lead sources.

### Phase 5: Chrome Extension & Attendance (Steps 28–33)
- **Step 28: Extension SidePanel AI UI** → 360px browser extension sidepanel simulator.
- **Step 29: Research Paper Summarization** → "Summarize" button extracting active webpage/PDF key findings.
- **Step 30: Attendance Portal AI Chat UI** → Integrated chatbot for employee leave balances and punch times.
- **Step 31: AI Leave Application System** → Natural language chat ("Mujhe kal chutti chahiye") auto-filling leave forms.
- **Step 32: Auto-Report Generator** → Daily work notes converted into structured Daily Progress Reports (DPR).
- **Step 33: Agent Notifications & Reminders** → Bell dropdown alert: *"Aapki attendance mark nahi hui!"*

### Phase 6: Mobile App & Digital Library (Steps 34–39)
- **Step 34: Mobile App AI Chat Screen** → Mobile device viewport frame simulator.
- **Step 35: App AI Voice Assistant** → Hold-to-speak voice interaction button.
- **Step 36: Digital Library AI Search UI** → Natural language library search bar (*"Mujhe AI pe latest book chahiye"*).
- **Step 37: Document Summarization UI** → 1-click "AI Summary" badge and preview modal on library books.
- **Step 38: App Push Notifications** → In-app push notification banner alerts.
- **Step 39: Offline Chat Storage** → Offline mode banner indicating SQLite local cache.

### Phase 7: Gaming & Cross-Platform Tracking (Steps 40–45)
- **Step 40: Gaming AI Guide UI** → Gaming HUD overlay with floating "Saarthi Guide" avatar.
- **Step 41: Interactive Game Help** → Step-by-step contextual hint card.
- **Step 42: Cross-Platform User Tracking** → 360-degree timeline linking Website, WhatsApp, and Mobile journeys.
- **Step 43: AI Upselling Engine** → End-of-chat contextual service add-on card (e.g., Mobile App 15% discount).
- **Step 44: Multilingual Translation Engine** → Instant live UI re-rendering in chosen language.
- **Step 45: Sentiment Analysis Tracking** → Real-time mood emojis (😊 Happy, 😐 Neutral, 😡 Angry).

### Phase 8: Testing, Security & Deployment (Steps 46–50)
- **Step 46: E2E Frontend Testing** → Cypress/Playwright automated test suite dashboard.
- **Step 47: Load Testing Backend** → Console to simulate 100 to 1,000 concurrent dummy user requests.
- **Step 48: Security Audit** → Client-side API key leak scanner & CSP verification report.
- **Step 49: Cloud Deployment** → Multi-cloud monitor (Vercel Frontend, Cloud Run API, Supabase DB).
- **Step 50: Go-Live & Monitoring** → Sentry error rates, Datadog latency metrics, and 99.98% uptime SLA.
