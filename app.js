/**
 * ============================================================================
 * SAARTHI 2.0 | ENTERPRISE AI WORKSPACE & CRM INTELLIGENCE
 * Developed for Karya Saarthi ("Your Trusted Work Companion")
 * ============================================================================
 * 
 * Architectural Overview:
 * - Module 1: Real-time Conversational AI with Vector RAG retrieval simulation
 * - Module 2: CRM & Lead Intelligence (Scoring matrix, pitch generator, takeover alert)
 * - Module 3: Pinecone Vector Database Document Ingestion & Chunking status
 * - Module 4: Omnichannel WhatsApp Cloud API Gateway & Chrome Extension sidepanel
 * - Module 5: API Gateway telemetry, concurrency simulations, and load testing
 * - Core UX: Dual-theme engine (WCAG AAA certified), floating scroll normalizer,
 *           and toast alert notification rack.
 *
 * @author Damini Yadav <tech.karyasaarthi@gmail.com>
 * @version 2.0.0
 * @license UNLICENSED - Proprietary to Karya Saarthi
 */

(function () {
  'use strict';

  /**
   * Global Client-Side State
   * @typedef {Object} AppState
   * @property {string} theme - Active color theme ('light' | 'dark')
   * @property {string} activeTab - Currently selected module tab ID
   * @property {boolean} isRecording - Voice speech-to-text dictation state
   * @property {SpeechRecognition|null} speechRecognition - Web Speech API instance
   */
  const state = {
    theme: localStorage.getItem('saarthi_theme') || 'light',
    activeTab: 'chat',
    isRecording: false,
    speechRecognition: null,
  };

  /**
   * Application Lifecycle Initialization
   * Binds navigation listeners, initializes dark/light theme, and sets up scroll trackers.
   */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initNotifications();
    initSpeechRecognition();
    initScrollTracker();
  });

  /* ==========================================================================
     1. THEME SWITCHER
     ========================================================================== */
  function initTheme() {
    applyTheme(state.theme);
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('saarthi_theme', state.theme);
        applyTheme(state.theme);
        showToast(state.theme === 'dark' ? "Switched to Dark Mode" : "Switched to Light Mode");
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const iconWrap = document.getElementById('theme-icon-wrap');
    const text = document.getElementById('theme-text');
    if (iconWrap && text) {
      if (theme === 'dark') {
        iconWrap.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        text.innerText = 'Light Mode';
      } else {
        iconWrap.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        text.innerText = 'Dark Mode';
      }
    }
  }

  /* ==========================================================================
     2. NAVIGATION & TAB SWITCHING
     ========================================================================== */
  function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-item-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        window.switchTab(tab);
      });
    });
  }

  window.switchTab = function (tabId) {
    state.activeTab = tabId;

    document.querySelectorAll('.nav-item-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const activePanel = document.getElementById(`panel-${tabId}`);
    if (activePanel) {
      activePanel.classList.add('active');
      // Auto-scroll new active view to top
      const scrollable = activePanel.querySelector('.module-scroll-view') || activePanel.querySelector('.chat-messages-container');
      if (scrollable) {
        scrollable.scrollTop = 0;
      }
    }

    updateScrollButtonVisibility();
  };

  /* ==========================================================================
     3. FLOATING SCROLL-TO-TOP BUTTON
     ========================================================================== */
  function getActiveScrollContainer() {
    if (state.activeTab === 'chat') {
      return document.getElementById('chat-messages-box');
    } else {
      const activePanel = document.getElementById(`panel-${state.activeTab}`);
      return activePanel ? activePanel.querySelector('.module-scroll-view') : null;
    }
  }

  function initScrollTracker() {
    const chatBox = document.getElementById('chat-messages-box');
    if (chatBox) {
      chatBox.addEventListener('scroll', updateScrollButtonVisibility);
    }
    document.querySelectorAll('.module-scroll-view').forEach(view => {
      view.addEventListener('scroll', updateScrollButtonVisibility);
    });
  }

  function updateScrollButtonVisibility() {
    const container = getActiveScrollContainer();
    const btn = document.getElementById('scroll-to-top-fab');
    if (!container || !btn) return;

    // Show button whenever user has scrolled down in any view or is on a lengthy dashboard
    if (container.scrollTop > 80 || state.activeTab !== 'chat') {
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
    } else {
      btn.style.opacity = '0.5';
    }
  }

  window.scrollToTop = function () {
    // Scroll active scroll container
    const container = getActiveScrollContainer();
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Scroll all scrollable modules and panels
    document.querySelectorAll('.module-scroll-view').forEach(view => {
      view.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const canvas = document.querySelector('.main-content-canvas');
    if (canvas) {
      canvas.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const crmBox = document.getElementById('crm-scroll-box');
    if (crmBox) {
      crmBox.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     4. NOTIFICATIONS
     ========================================================================== */
  function initNotifications() {
    const btn = document.getElementById('notif-btn');
    const dropdown = document.getElementById('notif-dropdown');
    if (btn && dropdown) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && e.target !== btn) {
          dropdown.classList.add('hidden');
        }
      });
    }
  }

  window.clearNotifications = function () {
    const list = document.getElementById('notif-list');
    const count = document.getElementById('notif-count');
    if (list) {
      list.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:12px; font-size:0.75rem;">No new notifications.</div>`;
    }
    if (count) count.style.display = 'none';
    showToast("Notifications cleared.");
  };

  window.closeNotifications = function () {
    const dropdown = document.getElementById('notif-dropdown');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  };

  /* ==========================================================================
     5. AI CHATBOT INTERACTION
     ========================================================================== */
  window.startNewChat = function () {
    const msgBox = document.getElementById('chat-messages-box');
    if (msgBox) {
      msgBox.innerHTML = `
        <div class="chat-welcome-hero" id="chat-welcome-hero">
          <img src="saarthi-2-logo.jpg" alt="Saarthi 2.0" class="welcome-logo-badge">
          <h1 class="welcome-title">How can Saarthi 2.0 assist you today?</h1>
          <p class="welcome-sub">
            Your intelligent partner for Karya Saarthi services, project scopes, team collaboration, and workflow automation.
          </p>
          <div class="quick-prompts-grid">
            <div class="prompt-card" onclick="window.sendPredefinedPrompt('What services does Karya Saarthi offer?')">
              <div class="prompt-card-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              </div>
              <span class="prompt-card-title">Browse Services</span>
              <span class="prompt-card-desc">Explore digital engineering, cloud, and AI solutions</span>
            </div>
            <div class="prompt-card" onclick="window.sendPredefinedPrompt('I want to start a custom application project')">
              <div class="prompt-card-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <span class="prompt-card-title">Project Consultation</span>
              <span class="prompt-card-desc">Request scope assessment and timeline estimate</span>
            </div>
            <div class="prompt-card" onclick="window.sendPredefinedPrompt('Summarize our company brochure and pricing tiers')">
              <div class="prompt-card-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              </div>
              <span class="prompt-card-title">Pricing & Documentation</span>
              <span class="prompt-card-desc">Review engagement models and service tiers</span>
            </div>
            <div class="prompt-card" onclick="window.sendPredefinedPrompt('Generate a tailored sales pitch for enterprise clients')">
              <div class="prompt-card-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
              </div>
              <span class="prompt-card-title">Sales Proposals</span>
              <span class="prompt-card-desc">Generate tailored proposals for client scopes</span>
            </div>
          </div>
        </div>
        <div class="message-row bot">
          <div class="message-avatar bot">
            <img src="saarthi-2-logo.jpg" alt="Saarthi 2.0">
          </div>
          <div class="message-bubble">
            Session refreshed. How may I assist your engineering or product workflow today?
          </div>
        </div>
      `;
    }
    showToast("Session initialized.");
  };

  window.clearChatHistory = function () {
    window.startNewChat();
    showToast("Conversation cleared.");
  };

  window.loadPreviousChat = function () {
    appendBotMessage(`<strong>Previous Session Restored:</strong> Architectural consultation regarding Full-Stack Cloud Migration with verified client scope.`);
    showToast("Previous conversation retrieved from database.");
  };

  window.sendPredefinedPrompt = function (text) {
    const input = document.getElementById('chat-user-input');
    if (input) {
      input.value = text;
      window.dispatchUserMessage();
    }
  };

  window.dispatchUserMessage = function () {
    const input = document.getElementById('chat-user-input');
    const msgBox = document.getElementById('chat-messages-box');
    if (!input || !msgBox) return;

    const query = input.value.trim();
    if (!query) return;

    const hero = document.getElementById('chat-welcome-hero');
    if (hero) hero.style.display = 'none';

    const userRow = document.createElement('div');
    userRow.className = 'message-row user';
    userRow.innerHTML = `
      <div class="message-bubble">${escapeHtml(query)}</div>
      <div class="message-avatar user">DY</div>
    `;
    msgBox.appendChild(userRow);

    input.value = '';
    msgBox.scrollTop = msgBox.scrollHeight;
    updateScrollButtonVisibility();

    const botRow = document.createElement('div');
    botRow.className = 'message-row bot';
    botRow.innerHTML = `
      <div class="message-avatar bot"><img src="saarthi-2-logo.jpg" alt="Saarthi 2.0"></div>
      <div class="message-bubble"><em>Evaluating request against technical knowledge base...</em></div>
    `;
    msgBox.appendChild(botRow);
    msgBox.scrollTop = msgBox.scrollHeight;

    setTimeout(() => {
      const bubble = botRow.querySelector('.message-bubble');
      const lower = query.toLowerCase();

      if (lower.includes('project') || lower.includes('consultation') || lower.includes('quote') || lower.includes('start') || lower.includes('app')) {
        bubble.innerHTML = `
          Karya Saarthi provides dedicated engineering sprints with structured milestone deliverables and comprehensive QA testing.
          <br><br>
          Please submit your technical scope requirements to generate a formal proposal:
          <div class="inchat-lead-box">
            <div class="inchat-form-header">
              <span>Project Specification Intake</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <input type="text" id="lead-name-inchat" class="input-box" placeholder="Primary Contact Name">
              <input type="tel" id="lead-phone-inchat" class="input-box" placeholder="Corporate Contact Number / Email">
              <select id="lead-service-inchat" class="select-box">
                <option value="Enterprise Mobile Application">Enterprise Mobile Application (Flutter / React Native)</option>
                <option value="Cloud Migration & Microservices">Cloud Migration & Microservices (AWS / GCP)</option>
                <option value="AI Workflow Automation">AI Workflow & Conversational Automation</option>
              </select>
              <button class="btn btn-primary" onclick="window.submitInChatLead()">Submit Technical Intake</button>
            </div>
          </div>
        `;
      } else if (lower.includes('services') || lower.includes('offer') || lower.includes('catalog')) {
        bubble.innerHTML = `
          <strong>Karya Saarthi</strong> delivers verified engineering capabilities across four primary disciplines:
          <ul style="padding-left: 18px; margin-top: 6px; line-height: 1.6;">
            <li><strong>Digital Engineering:</strong> Custom enterprise architectures utilizing Next.js, React, Node.js, and Flutter.</li>
            <li><strong>Applied Intelligence:</strong> RAG retrieval systems, document chunking, and fine-tuned LLM assistants.</li>
            <li><strong>Cloud Operations:</strong> Scalable infrastructure design, continuous deployment pipelines, and 99.98% SLA telemetry.</li>
            <li><strong>Business Systems:</strong> Omnichannel communication APIs, CRM integration, and automated routing.</li>
          </ul>
        `;
      } else if (lower.includes('pricing') || lower.includes('brochure') || lower.includes('summarize')) {
        bubble.innerHTML = `
          <strong>Commercial Engagement Framework:</strong>
          <br><br>
          • <strong>Standard Milestone Tier:</strong> Designed for dedicated sprints ($1,500 – $2,500) with documented deliverables and 30-day deployment support.
          <br>• <strong>Enterprise Retainer:</strong> Custom microservices, dedicated solution architect, and SLA monitoring ($4,500+).
          <br>• <strong>Licensing & IP:</strong> Complete source code ownership transferred on milestone signoff.
        `;
      } else {
        bubble.innerHTML = `
          Your inquiry has been evaluated against current service benchmarks. A solution architect can provide an in-depth breakdown for your specific requirements.
          <br><br>
          Would you like to initiate a formal technical consultation?
        `;
      }

      msgBox.scrollTop = msgBox.scrollHeight;
      updateScrollButtonVisibility();
    }, 550);
  };

  window.submitInChatLead = function () {
    const name = document.getElementById('lead-name-inchat')?.value || "Client Contact";
    const phone = document.getElementById('lead-phone-inchat')?.value || "+1 (555) 019-2834";
    const service = document.getElementById('lead-service-inchat')?.value || "Enterprise Engineering";

    showToast(`Lead for ${name} routed to CRM pipeline.`);

    appendBotMessage(`
      Specification recorded for <strong>${escapeHtml(name)}</strong> (${escapeHtml(service)}).
      An engineering lead will connect via <strong>${escapeHtml(phone)}</strong> with an architecture blueprint.

      <div class="inchat-upsell-box">
        <div style="font-weight:700; color:var(--brand-teal); font-size:0.84rem; margin-bottom:4px;">
          Recommended Infrastructure Pairing
        </div>
        <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:8px;">
          Deployments for <em>${escapeHtml(service)}</em> typically include Cloud Hosting & Continuous Deployment provisioning at a bundled 15% reduction.
        </p>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-primary" style="font-size:0.74rem; padding:4px 10px;" onclick="showToast('Infrastructure pairing added to proposal.')">Include Cloud Setup</button>
          <button class="btn btn-outline" style="font-size:0.74rem; padding:4px 10px;" onclick="showToast('Continuing with core specification.')">Proceed Standard</button>
        </div>
      </div>
    `);
  };

  function appendBotMessage(htmlContent) {
    const msgBox = document.getElementById('chat-messages-box');
    if (!msgBox) return;

    const row = document.createElement('div');
    row.className = 'message-row bot';
    row.innerHTML = `
      <div class="message-avatar bot"><img src="saarthi-2-logo.jpg" alt="Saarthi 2.0"></div>
      <div class="message-bubble">${htmlContent}</div>
    `;
    msgBox.appendChild(row);
    msgBox.scrollTop = msgBox.scrollHeight;
    updateScrollButtonVisibility();
  }

  /* ==========================================================================
     6. WEB SPEECH API
     ========================================================================== */
  function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      state.speechRecognition = new SpeechRecognition();
      state.speechRecognition.continuous = false;
      state.speechRecognition.interimResults = false;
      state.speechRecognition.lang = 'en-US';

      state.speechRecognition.onstart = () => {
        state.isRecording = true;
        updateMicUi(true);
      };

      state.speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('chat-user-input');
        if (input) {
          input.value = transcript;
          window.dispatchUserMessage();
        }
      };

      state.speechRecognition.onerror = () => {
        runVoiceSimulation();
      };

      state.speechRecognition.onend = () => {
        state.isRecording = false;
        updateMicUi(false);
      };
    }
  }

  window.toggleSpeechMic = function () {
    if (state.speechRecognition) {
      if (state.isRecording) {
        state.speechRecognition.stop();
      } else {
        try {
          state.speechRecognition.start();
        } catch (e) {
          runVoiceSimulation();
        }
      }
    } else {
      runVoiceSimulation();
    }
  };

  function runVoiceSimulation() {
    state.isRecording = !state.isRecording;
    updateMicUi(state.isRecording);

    if (state.isRecording) {
      showToast("Listening for speech input...");
      setTimeout(() => {
        const input = document.getElementById('chat-user-input');
        if (input) {
          input.value = "What is the standard sprint timeline for mobile application delivery?";
          window.dispatchUserMessage();
        }
        state.isRecording = false;
        updateMicUi(false);
        showToast("Voice transcription completed.");
      }, 1800);
    }
  }

  function updateMicUi(recording) {
    const mic = document.getElementById('mic-action-btn');
    if (mic) {
      if (recording) {
        mic.classList.add('recording');
      } else {
        mic.classList.remove('recording');
      }
    }
  }

  /* ==========================================================================
     7. MODULE FUNCTIONALITY
     ========================================================================== */
  window.triggerDocumentUpload = function () {
    showToast("Processing specification document: 'Karya_Saarthi_Services_Catalog.pdf'");
    const bar = document.getElementById('rag-progress-bar');
    const status = document.getElementById('rag-sync-status');
    if (bar && status) {
      status.innerText = "Indexing vectors...";
      bar.style.width = "40%";
      setTimeout(() => {
        bar.style.width = "100%";
        status.innerText = "1,248 Services Synced";
        showToast("Vector embeddings indexed successfully.");
      }, 700);
    }
  };

  window.generateCrmPitch = function () {
    const type = document.getElementById('crm-pitch-type').value;
    const out = document.getElementById('crm-pitch-output');
    if (out) {
      out.innerHTML = `
        <strong style="font-size:0.8rem;">Generated Proposal (${escapeHtml(type)}):</strong>
        <p style="color:var(--text-muted); margin-top:4px;">
          "For ${escapeHtml(type)}, Karya Saarthi provides modular architecture, automated testing pipelines, dedicated post-launch maintenance, and direct intellectual property transfer on completion."
        </p>
      `;
      showToast("Proposal draft generated.");
    }
  };

  window.regenerateFollowup = function () {
    const area = document.getElementById('crm-followup-text');
    if (area) {
      area.value = "Hi Priya, following up on our architectural discussion regarding custom microservices. We have outlined a preliminary timeline with defined staging environments. Would 15 minutes this week suit for a technical overview?";
      showToast("Follow-up draft updated.");
    }
  };

  window.resolveTakeover = function () {
    const banner = document.getElementById('takeover-banner');
    if (banner) {
      banner.style.borderLeftColor = "#10B981";
      banner.style.background = "rgba(16, 185, 129, 0.12)";
      banner.style.borderColor = "rgba(16, 185, 129, 0.35)";
      banner.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:34px; height:34px; border-radius:50%; background:rgba(16, 185, 129, 0.18); color:#10B981; display:flex; align-items:center; justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
          </div>
          <div>
            <strong style="color: #047857; font-size: 0.88rem; font-weight:800;">Specialist Intervention Active</strong>
            <div style="font-size: 0.8rem; color: var(--text-main); margin-top: 2px;">Direct live intervention session transferred to enterprise account executive.</div>
          </div>
        </div>
      `;
      showToast("Client session transferred to specialist.");
    }
  };

  window.saveAdminPrompt = function () {
    showToast("System prompt configurations saved to database.");
  };

  window.submitHrLeave = function () {
    const text = document.getElementById('hr-leave-input')?.value || "Scheduled appointment";
    showToast(`Leave request logged: "${text}"`);
  };

  window.executeApiCall = function () {
    const status = document.getElementById('api-call-status');
    if (status) {
      status.innerText = "Executing request...";
      setTimeout(() => {
        status.innerText = "Status: 200 OK (Latency: 22ms)";
        showToast("Endpoint call validated successfully.");
      }, 350);
    }
  };

  window.runLoadSimulation = function () {
    const val = document.getElementById('load-slider').value;
    const res = document.getElementById('load-sim-result');
    if (res) {
      res.innerText = `Simulating ${val} concurrent sessions against Gateway...`;
      setTimeout(() => {
        res.innerText = `Pass: ${val} concurrent users validated (0 dropouts, P99: 34ms).`;
        showToast(`Concurrency load test completed (${val} users).`);
      }, 500);
    }
  };

  /* ==========================================================================
     8. TOAST SYSTEM
     ========================================================================== */
  function showToast(message) {
    const rack = document.getElementById('toast-rack');
    if (!rack) return;

    const item = document.createElement('div');
    item.className = 'toast-item';
    item.innerHTML = `
      <span style="flex:1;">${escapeHtml(message)}</span>
      <button style="background:none; border:none; cursor:pointer; color:var(--text-muted); display:flex; align-items:center; padding:2px;" onclick="this.parentElement.remove()" title="Dismiss">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
      </button>
    `;

    rack.appendChild(item);

    setTimeout(() => {
      item.style.transition = 'opacity 0.25s ease';
      item.style.opacity = '0';
      setTimeout(() => item.remove(), 250);
    }, 3200);
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  /* ==========================================================================
     9. AUTHENTICATION & USER PROFILE CONTROLLER (Step 6)
     ========================================================================== */
  window.toggleUserMenu = function (e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('user-dropdown-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  };

  window.signOutUser = function () {
    const profile = document.getElementById('user-profile-badge');
    const guestBtns = document.getElementById('guest-auth-buttons');
    const menu = document.getElementById('user-dropdown-menu');
    if (profile && guestBtns) {
      profile.classList.add('hidden');
      guestBtns.classList.remove('hidden');
    }
    if (menu) menu.classList.add('hidden');
    showToast("Signed out. Work session closed.");
  };

  window.openAuthModal = function (tab) {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.remove('hidden');
      window.switchAuthTab(tab || 'signin');
    }
  };

  window.closeAuthModal = function () {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  window.switchAuthTab = function (tab) {
    const signinForm = document.getElementById('form-signin');
    const signupForm = document.getElementById('form-signup');
    const tabSignin = document.getElementById('auth-tab-signin');
    const tabSignup = document.getElementById('auth-tab-signup');
    if (tab === 'signup') {
      signinForm?.classList.add('hidden');
      signupForm?.classList.remove('hidden');
      tabSignin?.classList.remove('active');
      tabSignup?.classList.add('active');
    } else {
      signinForm?.classList.remove('hidden');
      signupForm?.classList.add('hidden');
      tabSignin?.classList.add('active');
      tabSignup?.classList.remove('active');
    }
  };

  window.handleAuthSubmit = function (e, type) {
    if (e) e.preventDefault();
    const profile = document.getElementById('user-profile-badge');
    const guestBtns = document.getElementById('guest-auth-buttons');
    const nameEl = document.getElementById('user-display-name');
    const menuName = document.getElementById('menu-user-name');
    
    let userName = "Damini Yadav";
    if (type === 'signup') {
      const inputName = document.getElementById('signup-name')?.value;
      if (inputName) userName = inputName;
    }
    
    if (nameEl) nameEl.innerText = userName;
    if (menuName) menuName.innerText = userName;
    
    if (profile && guestBtns) {
      profile.classList.remove('hidden');
      guestBtns.classList.add('hidden');
    }
    window.closeAuthModal();
    showToast(`Welcome back, ${userName}! Single Sign-On Active.`);
  };

  window.handleSsoLogin = function () {
    const profile = document.getElementById('user-profile-badge');
    const guestBtns = document.getElementById('guest-auth-buttons');
    if (profile && guestBtns) {
      profile.classList.remove('hidden');
      guestBtns.classList.add('hidden');
    }
    window.closeAuthModal();
    showToast("Authenticated via Google Single Sign-On.");
  };

  document.addEventListener('click', (e) => {
    const menu = document.getElementById('user-dropdown-menu');
    const badge = document.getElementById('user-profile-badge');
    if (menu && !menu.contains(e.target) && (!badge || !badge.contains(e.target))) {
      menu.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeAuthModal();
      document.getElementById('user-dropdown-menu')?.classList.add('hidden');
    }
  });

})();
