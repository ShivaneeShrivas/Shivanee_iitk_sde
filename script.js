(() => {
  // ---------- ELEMENTS ----------
  const taskSelect = document.getElementById('taskSelect');
  const rawInput = document.getElementById('rawInput');
  const generateBtn = document.getElementById('generateBtn');
  const outputArea = document.getElementById('outputArea');
  const agentAvatar = document.getElementById('agentAvatar');
  const dataScore = document.getElementById('dataScore');
  const ecoScore = document.getElementById('ecoScoreLarge');
  const ecoTip = document.getElementById('ecoTipLarge');
  const safetyBox = document.getElementById('safetyBox');
  const reflectionList = document.getElementById('reflectionList');

  // ---------- NAVIGATION ----------
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.getElementById(btn.dataset.tab).classList.add('active');
      document.getElementById('currentTabTitle').textContent = btn.textContent.replace('📘 ','').trim();
    };
  });

  // ---------- HELPERS ----------
  const escapeHtml = s => s.replace(/[&<>"']/g, m => (
    { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]
  ));
  const avatarThinking = (on) => agentAvatar.classList.toggle('thinking', on);

  function parseNumbers(text) {
    const numbers = (text.match(/\d+(\.\d+)?/g) || []).map(Number);
    const completeness = Math.min(100, numbers.length * 15);
    dataScore.textContent = completeness + '%';
    return numbers;
  }

  function renderChart(nums) {
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: nums.map((_, i) => i + 1),
        datasets: [{
          label: 'Extracted Numeric Data',
          data: nums,
          fill: false,
          borderColor: '#0b63c5',
          tension: 0.3
        }]
      }
    });
  }

  function sustainabilityEval(text) {
    let score = 80;
    const lower = text.toLowerCase();
    if (lower.includes('ethanol') || lower.includes('chloroform')) score -= 30;
    if (lower.includes('water') || lower.includes('room')) score += 10;
    const tip = score < 60
      ? 'Consider greener solvents or reducing temperature for eco-friendliness.'
      : 'Conditions appear sustainable for lab-scale experiments.';
    return { score, tip };
  }

  function safetyEval(text) {
    const lower = text.toLowerCase();
    if (lower.includes('acid')) return '⚠️ Corrosive chemicals detected — use gloves, goggles, and a fume hood.';
    if (lower.includes('heat')) return '🔥 High temperature involved — ensure proper ventilation and PPE.';
    if (lower.includes('gas')) return '💨 Gas evolution — work under fume hood and avoid ignition sources.';
    return '✅ No major hazards detected. Follow general lab safety practices.';
  }

  // ---------- BACKEND COMMUNICATION ----------
  async function callBackendGenerate(prompt) {
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      return data.text || JSON.stringify(data);
    } catch (err) {
      console.error(err);
      return '(⚠️ Backend not reachable. Please start server.js)';
    }
  }

  // ---------- GENERATE REPORT ----------
  generateBtn.onclick = async () => {
    const raw = rawInput.value.trim();
    if (!raw) {
      alert('Please enter experiment data or notes.');
      return;
    }

    avatarThinking(true);
    outputArea.innerHTML = '<em>Generating structured report...</em>';

    const task = taskSelect.value;
    const prompt = `
      You are a ChemE Research Assistant. Generate a professional ${task} 
      based on the following notes:\n${raw}
      Include experimental details, analysis, safety, sustainability, and key findings.
    `;

    const reply = await callBackendGenerate(prompt);
    avatarThinking(false);
    outputArea.innerHTML = escapeHtml(reply).replace(/\n/g, '<br>');

    // Derived metrics
    const nums = parseNumbers(raw);
    if (nums.length) renderChart(nums);

    const eco = sustainabilityEval(raw);
    ecoScore.textContent = eco.score + '%';
    ecoTip.textContent = eco.tip;

    const safe = safetyEval(raw);
    safetyBox.textContent = safe;

    reflectionList.innerHTML = `
      <li>How can yield or purity be improved?</li>
      <li>Which parameter had the strongest influence?</li>
      <li>How can sustainability be enhanced next time?</li>
    `;
  };

  // ---------- CHEMBOT CHATBOT ----------
  const chatPanel = document.getElementById('chatbotPanel');
  const openChatBtn = document.getElementById('openChatBtn');
  const closeChat = document.getElementById('closeChat');
  const chatMessages = document.getElementById('chatMessages');
  const chatText = document.getElementById('chatText');
  const sendChat = document.getElementById('sendChat');

  openChatBtn.onclick = () => chatPanel.classList.add('active');
  closeChat.onclick = () => chatPanel.classList.remove('active');

  sendChat.onclick = async () => {
    const q = chatText.value.trim();
    if (!q) return;
    appendMsg('user', q);
    chatText.value = '';
    appendMsg('bot', '💭 ChemBot is thinking...');

    // Start glowing animation
    openChatBtn.classList.add('replying');

    const prompt = `
      You are ChemBot, an AI Research Mentor for chemical engineers.
      Respond concisely but informatively to this question:
      "${q}"
      If relevant, include sustainability or safety aspects.
    `;

    const ans = await callBackendGenerate(prompt);
    chatMessages.lastElementChild.remove(); // remove "thinking..."
    appendMsg('bot', ans);

    // Stop glowing animation
    openChatBtn.classList.remove('replying');

    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  function appendMsg(sender, text) {
    const div = document.createElement('div');
    div.classList.add('msg', sender);
    div.textContent = text;
    chatMessages.appendChild(div);
  }

})();
