import { useEffect, useRef, useCallback } from 'react';
import './style.css';

// ── Constants ────────────────────────────────────────────────────────────────

const API = 'http://localhost:8000/ai/api/v1/check-eligibility';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
  'Jammu And Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];

const BASE_STEPS = [
  {
    key: 'name',
    ask: "Hello! 👋 I'm your MedSec Health Advisor.\n\nI'll help you find government healthcare schemes you're eligible for. It only takes a minute!\n\nLet's start — what's your *full name*?",
    type: 'text',
    placeholder: 'e.g. Raj Sharma',
    validate: (v) => v.trim().length >= 2,
    errMsg: 'Please enter your full name (at least 2 characters).',
  },
  {
    key: 'age',
    askFn: (a) => `Nice to meet you, *${a.name.split(' ')[0]}!* 😊\n\nHow old are you? (in years)`,
    type: 'number',
    placeholder: 'e.g. 62',
    validate: (v) => v !== '' && +v >= 0 && +v <= 120,
    errMsg: 'Please enter a valid age between 0 and 120.',
  },
  {
    key: 'gender',
    ask: 'What is your gender?',
    type: 'quickreply',
    options: ['Male', 'Female', 'Other'],
    validate: (v) => ['male', 'female', 'other'].includes(v.toLowerCase()),
  },
  {
    key: 'state',
    ask: 'Which *Indian state* do you currently live in?',
    type: 'statepick',
    placeholder: 'Type or select your state…',
    validate: (v) =>
      INDIAN_STATES.map((s) => s.toLowerCase()).includes(v.trim().toLowerCase()),
    errMsg: 'Please enter a valid Indian state name.',
  },
  {
    key: 'disease',
    ask: 'What is your primary *health condition* or illness?\n\n(e.g. kidney disease, cancer, diabetes, pregnancy, disability…)',
    type: 'text',
    placeholder: 'e.g. kidney disease',
    validate: (v) => v.trim().length >= 2,
    errMsg: 'Please describe your health condition (at least 2 characters).',
  },
  {
    key: 'bpl',
    askFn: () =>
      'Do you hold a *BPL (Below Poverty Line) card*? This unlocks several additional schemes.',
    type: 'quickreply',
    options: ['Yes', 'No'],
    validate: (v) => ['yes', 'no'].includes(v.toLowerCase()),
  },
  {
    key: 'annual_income',
    ask: 'What is your *annual household income* in rupees? (₹)\n\nThis helps us find schemes with the right income limits for you.',
    type: 'number',
    placeholder: 'e.g. 150000',
    validate: (v) => v !== '' && +v >= 0,
    errMsg: 'Please enter a valid annual income (0 or above).',
  },
  {
    key: 'disability',
    ask: 'Do you have any *disability*?\n\n(Physical, visual, hearing, intellectual, or any other recognised disability)',
    type: 'quickreply',
    options: ['Yes', 'No'],
    validate: (v) => ['yes', 'no'].includes(v.toLowerCase()),
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function esc(t) {
  return String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mdToHtml(t) {
  return esc(t)
    .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function buildSteps(answers) {
  const steps = [...BASE_STEPS];
  if (answers.gender && answers.gender.toLowerCase() === 'female') {
    steps.push({
      key: 'pregnant',
      ask: 'Are you currently *pregnant*?',
      type: 'quickreply',
      options: ['Yes', 'No'],
      validate: (v) => ['yes', 'no'].includes(v.toLowerCase()),
    });
  }
  return steps;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AIEligibilityAssistant({ onClose }) {
  // Refs for mutable state that doesn't need re-renders (mirrors original imperative design)
  const chatAreaRef = useRef(null);
  const userInputRef = useRef(null);
  const sendBtnRef = useRef(null);

  const answersRef = useRef({});
  const stepIndexRef = useRef(0);
  const awaitingInputRef = useRef(false);

  // ── DOM / Scroll helpers ──────────────────────────────────────────────────

  const scrollBottom = useCallback(() => {
    setTimeout(() => {
      if (chatAreaRef.current)
        chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, 50);
  }, []);

  const enableInput = useCallback((type = 'text', placeholder = 'Type your message…') => {
    const input = userInputRef.current;
    const btn = sendBtnRef.current;
    if (!input || !btn) return;
    input.disabled = false;
    btn.disabled = false;
    input.type = type === 'number' ? 'number' : 'text';
    input.placeholder = placeholder;
    input.value = '';
    input.focus();
    awaitingInputRef.current = true;
  }, []);

  const disableInput = useCallback(() => {
    const input = userInputRef.current;
    const btn = sendBtnRef.current;
    if (input) input.disabled = true;
    if (btn) btn.disabled = true;
    awaitingInputRef.current = false;
  }, []);

  // ── Bubble builders ───────────────────────────────────────────────────────

  const addDateLabel = useCallback((text) => {
    const d = document.createElement('div');
    d.className = 'date-label';
    d.textContent = text;
    chatAreaRef.current?.appendChild(d);
  }, []);

  const addBotBubble = useCallback(
    (md, delayMs = 0) =>
      new Promise((res) => {
        setTimeout(() => {
          const row = document.createElement('div');
          row.className = 'msg-row bot';
          row.innerHTML = `<div class="avatar">🏥</div><div class="bubble">${mdToHtml(md)}</div>`;
          chatAreaRef.current?.appendChild(row);
          scrollBottom();
          res();
        }, delayMs);
      }),
    [scrollBottom]
  );

  const addUserBubble = useCallback(
    (text) => {
      const row = document.createElement('div');
      row.className = 'msg-row user';
      row.innerHTML = `<div class="bubble">${esc(text)}</div>`;
      chatAreaRef.current?.appendChild(row);
      scrollBottom();
    },
    [scrollBottom]
  );

  const showTyping = useCallback(() => {
    const row = document.createElement('div');
    row.className = 'typing-row';
    row.id = 'typing';
    row.innerHTML = `<div class="avatar">🏥</div><div class="typing-bubble"><span></span><span></span><span></span></div>`;
    chatAreaRef.current?.appendChild(row);
    scrollBottom();
    return row;
  }, [scrollBottom]);

  const removeTyping = useCallback(() => {
    document.getElementById('typing')?.remove();
  }, []);

  const addQuickReplies = useCallback(
    (options, onSelect) => {
      const wrap = document.createElement('div');
      wrap.className = 'quick-replies';
      wrap.id = 'qrWrap';
      options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'qr';
        btn.textContent = opt;
        btn.onclick = () => {
          wrap.querySelectorAll('.qr').forEach((b) => (b.disabled = true));
          btn.classList.add('selected');
          setTimeout(() => wrap.remove(), 350);
          onSelect(opt);
        };
        wrap.appendChild(btn);
      });
      chatAreaRef.current?.appendChild(wrap);
      scrollBottom();
    },
    [scrollBottom]
  );

  const addStateInput = useCallback(() => {
    // Attach datalist to the existing controlled input
    let dl = document.getElementById('stateList');
    if (!dl) {
      dl = document.createElement('datalist');
      dl.id = 'stateList';
      INDIAN_STATES.forEach((s) => {
        const o = document.createElement('option');
        o.value = s;
        dl.appendChild(o);
      });
      document.body.appendChild(dl);
    }
    userInputRef.current?.setAttribute('list', 'stateList');
    enableInput('text', 'Type your state name…');
  }, [enableInput]);

  // ── Results rendering ─────────────────────────────────────────────────────

  const addSchemeCard = useCallback(
    (s, rank, maxScore) => {
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      const av = document.createElement('div');
      av.className = 'avatar';
      av.textContent = '🏥';

      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.padding = '0';
      bubble.style.overflow = 'hidden';
      bubble.style.maxWidth = '340px';

      const rankClass = rank === 1 ? 'r1' : rank === 2 ? 'r2' : rank === 3 ? 'r3' : 'rn';
      const rankLabel = rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : `#${rank}`;
      const barPct = Math.min(100, Math.round((s.total_score / (maxScore * 1.1)) * 100));
      const barColor =
        s.benefit_level === 'High'
          ? '#1A7A4A'
          : s.benefit_level === 'Medium'
          ? '#E07B2A'
          : '#C8372D';

      const reasons = (s.matching_reasons || [])
        .slice(0, 4)
        .map((r) => `<div class="rc-reason"><span>✓</span><span>${esc(r)}</span></div>`)
        .join('');

      const docs = (s.required_documents || [])
        .map((d) => `<div class="doc-tag">📄 ${esc(d)}</div>`)
        .join('');

      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <div class="rc-header">
          <div class="rc-rank ${rankClass}">${rankLabel}</div>
          <div class="rc-name">${esc(s.scheme_name)}</div>
          <span class="rc-level lv-${s.benefit_level}">${s.benefit_level}</span>
        </div>
        <div class="rc-body">
          <div style="margin-bottom:.5rem;font-size:12px;color:#6B7A99">
            ${esc(s.description.length > 100 ? s.description.slice(0, 100) + '…' : s.description)}
          </div>
          <div class="rc-reasons">${reasons}</div>
        </div>
        <div class="score-row">
          <span style="font-size:11px;color:#6B7A99">Score</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width:${barPct}%;background:${barColor}"></div>
          </div>
          <span class="score-num">${s.total_score}pts</span>
        </div>
        ${docs ? `<div class="rc-docs">${docs}</div>` : ''}
      `;

      bubble.appendChild(card);
      row.appendChild(av);
      row.appendChild(bubble);
      chatAreaRef.current?.appendChild(row);
      scrollBottom();
    },
    [scrollBottom]
  );

  const showRestartPrompt = useCallback(() => {
    const div = document.createElement('div');
    div.className = 'restart-prompt';
    div.innerHTML = `Want to check for another patient? <button id="restartBtn">Start over ↺</button>`;
    chatAreaRef.current?.appendChild(div);
    // Bind restart — avoid inline onclick so it picks up the ref-based restart
    div.querySelector('#restartBtn').onclick = () => restartChat(); // eslint-disable-line
    scrollBottom();
  }, [scrollBottom]); // eslint-disable-line

  // ── API call & results ────────────────────────────────────────────────────

  const showResults = useCallback(
    async (data) => {
      const total = data.total_eligible_schemes;
      const name = data.patient_name.split(' ')[0];
      const answers = answersRef.current;

      showTyping();
      await delay(700);
      removeTyping();

      // Summary card
      const row = document.createElement('div');
      row.className = 'msg-row bot';
      const av = document.createElement('div');
      av.className = 'avatar';
      av.textContent = '🏥';
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      const sc = document.createElement('div');
      sc.className = 'summary-card';

      const flags = [];
      if (answers.bpl === true) flags.push('BPL Card');
      if (answers.age >= 60) flags.push('Senior Citizen');
      if (answers.disability === true) flags.push('PwD');
      if (answers.pregnant === true) flags.push('Pregnant');

      sc.innerHTML = `
        <div class="sc-title">📋 Health Profile Summary</div>
        <div class="sc-row"><span class="sc-label">Name</span><span class="sc-value">${esc(data.patient_name)}</span></div>
        <div class="sc-row"><span class="sc-label">Condition</span><span class="sc-value">${esc(String(answers.disease).replace(/\b\w/g, (c) => c.toUpperCase()))}</span></div>
        <div class="sc-row"><span class="sc-label">State</span><span class="sc-value">${esc(answers.state)}</span></div>
        <div class="sc-row"><span class="sc-label">Income</span><span class="sc-value">₹${Number(answers.annual_income).toLocaleString('en-IN')}/yr</span></div>
        ${flags.length ? `<div class="sc-row"><span class="sc-label">Status</span><span class="sc-value">${flags.join(' · ')}</span></div>` : ''}
        <div>
          <span class="sc-badge ${total > 0 ? 'good' : 'none'}">
            ${total > 0 ? `✅ ${total} Scheme${total !== 1 ? 's' : ''} Found` : '❌ No Schemes Found'}
          </span>
        </div>
      `;

      bubble.appendChild(sc);
      row.appendChild(av);
      row.appendChild(bubble);
      chatAreaRef.current?.appendChild(row);
      scrollBottom();

      await delay(600);

      if (total === 0) {
        showTyping();
        await delay(700);
        removeTyping();
        await addBotBubble(
          `I'm sorry, *${name}* — based on your current profile, no government schemes matched your eligibility.\n\nThis could be due to income limits, disease coverage, or state availability.\n\n💡 *Suggestions:*\n• Visit your nearest government hospital\n• Contact your district health office\n• Check *pmjay.gov.in* for Ayushman Bharat`
        );
        showRestartPrompt();
        return;
      }

      showTyping();
      await delay(700);
      removeTyping();
      await addBotBubble(
        `Great news, *${name}!* 🎉 I found *${total} eligible scheme${total !== 1 ? 's' : ''}* for you. Here they are, ranked from most to least beneficial:`
      );

      const maxScore = data.ranked_schemes[0]?.total_score || 100;
      for (let i = 0; i < data.ranked_schemes.length; i++) {
        showTyping();
        await delay(i === 0 ? 500 : 400);
        removeTyping();
        addSchemeCard(data.ranked_schemes[i], i + 1, maxScore);
        await delay(100);
      }

      await delay(600);
      showTyping();
      await delay(900);
      removeTyping();
      await addBotBubble(
        `📝 *How to apply:*\n1. Gather the required documents listed above\n2. Visit your nearest government hospital or Common Service Centre\n3. Ask for the scheme enrolment desk\n4. For Ayushman Bharat: *pmjay.gov.in*\n\n⚠️ This is an AI-assisted estimate — always verify with official sources.\n\nStay healthy, *${name}!* 🙏`
      );

      showRestartPrompt();
    },
    [addBotBubble, addSchemeCard, removeTyping, scrollBottom, showRestartPrompt, showTyping]
  );

  const submitEligibility = useCallback(async () => {
    const answers = answersRef.current;

    showTyping();
    await delay(600);
    removeTyping();
    await addBotBubble(
      `Perfect! Let me check all available government schemes for you, *${answers.name.split(' ')[0]}*... 🔍`
    );

    showTyping();
    await delay(1800);
    removeTyping();

    const payload = {
      name: answers.name,
      age: answers.age,
      gender: answers.gender,
      state: answers.state,
      annual_income: answers.annual_income,
      disease: answers.disease,
      bpl: answers.bpl === true,
      disability: answers.disability === true,
      pregnant: answers.pregnant === true || false,
      senior_citizen: answers.age >= 60,
    };

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        const msg =
          typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        await addBotBubble(`⚠️ There was a validation issue:\n${msg}`);
        showRestartPrompt();
        return;
      }

      await showResults(data);
    } catch {
      showTyping();
      await delay(400);
      removeTyping();
      await addBotBubble(
        `❌ I couldn't reach the MedSec backend.\n\nMake sure the API server is running:\n*uvicorn main:app --reload*\n\nThen restart this chat.`
      );
      showRestartPrompt();
    }
  }, [addBotBubble, removeTyping, showRestartPrompt, showResults, showTyping]);

  // ── Conversation engine ───────────────────────────────────────────────────

  const askStep = useCallback(
    async (idx, steps) => {
      stepIndexRef.current = idx;
      if (idx >= steps.length) {
        await submitEligibility();
        return;
      }
      const step = steps[idx];

      showTyping();
      await delay(750);
      removeTyping();

      const question = step.ask ? step.ask : step.askFn(answersRef.current);
      await addBotBubble(question);

      if (step.type === 'quickreply') {
        disableInput();
        addQuickReplies(step.options, (val) => {
          addUserBubble(val);
          answersRef.current[step.key] =
            val.toLowerCase() === 'yes'
              ? true
              : val.toLowerCase() === 'no'
              ? false
              : val.toLowerCase();
          askStep(idx + 1, buildSteps(answersRef.current));
        });
      } else if (step.type === 'statepick') {
        addStateInput();
      } else {
        enableInput(step.type, step.placeholder || 'Type your answer…');
      }
    },
    [
      addBotBubble,
      addQuickReplies,
      addStateInput,
      addUserBubble,
      disableInput,
      enableInput,
      removeTyping,
      showTyping,
      submitEligibility,
    ]
  );

  const processUserInput = useCallback(
    async (val) => {
      const steps = buildSteps(answersRef.current);
      const step = steps[stepIndexRef.current];
      if (!step) return;

      // Remove datalist if present
      const dl = document.getElementById('stateList');
      if (dl) {
        dl.remove();
        userInputRef.current?.removeAttribute('list');
      }

      if (!step.validate(val)) {
        showTyping();
        await delay(500);
        removeTyping();
        await addBotBubble('⚠️ ' + (step.errMsg || 'Invalid input, please try again.'));
        if (step.type === 'statepick') addStateInput();
        else enableInput(step.type, step.placeholder);
        return;
      }

      let stored = val.trim();
      if (step.type === 'number') stored = parseInt(val);
      if (step.key === 'state') {
        stored =
          INDIAN_STATES.find((s) => s.toLowerCase() === val.trim().toLowerCase()) ||
          val.trim();
      }
      answersRef.current[step.key] = stored;

      disableInput();
      askStep(stepIndexRef.current + 1, buildSteps(answersRef.current));
    },
    [
      addBotBubble,
      addStateInput,
      disableInput,
      enableInput,
      removeTyping,
      showTyping,
      askStep,
    ]
  );

  const startChat = useCallback(async () => {
    if (chatAreaRef.current) chatAreaRef.current.innerHTML = '';
    const dl = document.getElementById('stateList');
    if (dl) dl.remove();
    userInputRef.current?.removeAttribute('list');

    answersRef.current = {};
    stepIndexRef.current = 0;
    disableInput();

    addDateLabel(
      'Today · ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    await delay(400);
    await askStep(0, buildSteps({}));
  }, [addDateLabel, askStep, disableInput]);

  // Alias for restart button closures
  // eslint-disable-next-line no-unused-vars
  const restartChat = useCallback(() => startChat(), [startChat]);

  // ── Input event handlers ──────────────────────────────────────────────────

  const handleSend = useCallback(() => {
    const val = userInputRef.current?.value.trim();
    if (!val || !awaitingInputRef.current) return;
    addUserBubble(val);
    disableInput();
    processUserInput(val);
  }, [addUserBubble, disableInput, processUserInput]);

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Enter') handleSend();
    },
    [handleSend]
  );

  // ── Boot ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    startChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── JSX ───────────────────────────────────────────────────────────────────

  return (
    <div className="medsec-root">
      {/* Header */}
      <header className="medsec-header">
        <div className="hd-avatar">🏥</div>
        <div className="hd-info">
          <div className="hd-name">MedSec Advisor</div>
          <div className="hd-status">
            <span className="dot" />
            Online · AI-Powered
          </div>
        </div>
        <div className="hd-actions">
          <button className="hd-restart" onClick={startChat}>↺ Restart</button>
          {onClose && (
            <button className="hd-close" onClick={onClose} aria-label="Close chat">✕</button>
          )}
        </div>
      </header>

      {/* Chat area — messages are injected imperatively to preserve timing/animation parity */}
      <div className="chat-area" ref={chatAreaRef} />

      {/* Input bar */}
      <div className="input-bar">
        <input
          ref={userInputRef}
          type="text"
          placeholder="Type your message…"
          autoComplete="off"
          onKeyDown={handleKey}
          disabled
        />
        <button className="send-btn" ref={sendBtnRef} onClick={handleSend} disabled>
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
