# Saarthi 2.0 | Enterprise AI Workspace & CRM Intelligence
**Developed for Karya Saarthi ("Your Trusted Work Companion")**

A production-ready frontend web application implementing the enterprise B2B architecture roadmap across **8 Phases and 50 Steps**.

---

## 🏛️ Architecture & System Modules

### 1. Dual-Brand Identity & Lockup
- **Saarthi 2.0 (Core AI Platform):** Cyber globe badge with futuristic compass `S` emblem.
- **Karya Saarthi (Parent Enterprise):** Monogram badge with corporate navy and teal accents.
- **Header Lockup:** Structured hierarchy with `Saarthi 2.0 Enterprise` as primary title and `by Karya Saarthi` as parent company lockup.

### 2. Design System & Iconography
- **Lucide Vector Icons:** Complete elimination of Unicode emojis across all interfaces, headers, badges, and tables. All icons are rendered as minimal stroke SVGs (`stroke-width="2"`, size `14px - 18px`).
- **WCAG AAA Dual Themes:**
  - **Light Mode:** Slate `#F8FAFC` base, surface `#FFFFFF`, crisp borders `#E2E8F0`, brand teal `#0D9488`.
  - **Dark Mode:** Deep midnight `#090D16` base, surface `#111827`, high-contrast navy active badges (`#08101E`) with pure white bold text (`#FFFFFF`) and teal accents (`#14B8A6`).
- **Floating Scroll Normalizer:** Dedicated floating circular button (`#scroll-to-top-fab`) fixed at bottom-right corner for effortless viewport reset.

---

## 📦 Getting Started

### Development Server
```bash
# Start local development server (serves on http://localhost:3000 or http://localhost:3001)
npm run dev

# Or run with Node directly:
node server.js
```

### Standalone Browser Execution
Double-click `index.html` or execute `launch.bat` to run offline with zero external package dependencies.

---

## 🛠️ Modules & Technical Roadmap Coverage

### Module 1: Core AI Chatbot
- Streaming conversational container with context-aware prompt suggestion cards.
- Interactive in-chat specification intake form for project scopes and budget ranges.
- Built-in Web Speech API microphone integration for speech-to-text dictation.

### Module 2: CRM & Sales Intelligence (Phase 3)
- **Human Takeover Alert Banner:** High-contrast intervention banner with dark text (`text-slate-900`) on warm amber.
- **Sales Proposal Drafter:** Instant tailored client pitch preview with estimated milestones.
- **Auto Follow-up Composer:** Pre-configured follow-up generator with regenerative drafting.
- **Lead Scoring Matrix:** Dynamic priority scoring with Lucide `Flame` (Hot), `Activity` (Warm), and `Clock` (Standard) indicators.

### Module 3: Knowledge Base & RAG Ingestion (Phase 1)
- Pinecone vector database embedding sync status counter (1,248 services indexed).
- Drag-and-drop specification upload container supporting PDF, Markdown, and DOCX formats.

### Module 4: Omnichannel & WhatsApp Gateway (Phases 4–6)
- WhatsApp Business Cloud API gateway thread simulator.
- Chrome extension sidepanel mock with active document summarizer.
- Natural language internal HR leave submission assistant.

### Module 5: Developer Hub & Telemetry (Phase 8)
- Interactive API Gateway testing harness (`POST /api/v1/chat/completions`).
- Synthetic concurrency load testing slider simulating 100 to 1,000 parallel sessions.

---

## 🔌 Backend Integration Contract (Hand-off Notes)

1. **SSE / WebSocket Streaming Endpoint:**
   - Wire `POST /api/v1/chat/completions` into `window.dispatchUserMessage()` in `app.js`.
   - Stream tokens into the message bubble container.
2. **CRM Lead Ingestion:**
   - Listen to `window.submitInchatLead()` form submissions and persist payloads to PostgreSQL.
3. **Pinecone Vector Database:**
   - Bind file upload events in `window.triggerDocumentUpload()` to the RAG document parser.
4. **WhatsApp Webhook:**
   - Forward inbound Twilio / Meta Cloud API webhook events to the Omnichannel notification rack.

---

## 📄 License
Proprietary & Confidential — Karya Saarthi. All rights reserved.
