// Skills data - ordered by suggested workflow (top to bottom, left to right)
const SKILLS_DATA = [
  {
    "name": "config",
    "displayName": "Setup Wizard",
    "description": "First-run setup wizard. Configures CLAUDE.md with identity and contact info.",
    "type": "builder",
    "whenToUse": "First time setting up, or when updating your contact info.",
    "howItWorks": [
      "Asks your name, role, email, LinkedIn, GitHub",
      "Asks your voice style (builder, strategist, executor, technical)",
      "Optionally reads your resume, notes, LinkedIn export",
      "Auto-generates portfolio drafts if sources provided",
      "Creates personalized CLAUDE.md"
    ]
  },
  {
    "name": "content-strategist",
    "displayName": "Content Router",
    "description": "Entry point for adding portfolio content. Decides what goes where and routes to appropriate skills.",
    "type": "builder",
    "whenToUse": "When you want to add content but aren't sure where to start.",
    "howItWorks": [
      "Asks what content you have or want to create",
      "Decides: portfolio, LinkedIn, or article?",
      "Routes to the right specialist skill",
      "Prevents content sprawl that dilutes your brand"
    ]
  },
  {
    "name": "story-adapter",
    "displayName": "Story Builder",
    "description": "Transform work experiences into anonymized portfolio content.",
    "type": "builder",
    "whenToUse": "When you have work stories to turn into case studies or highlights.",
    "howItWorks": [
      "Takes your raw work story (notes, bullets, stream of consciousness)",
      "Structures it using STAR format (Situation, Task, Action, Result)",
      "Scans for sensitive content (employers, projects, metrics)",
      "Hands off to /anonymizer if needed",
      "Outputs portfolio-ready content"
    ]
  },
  {
    "name": "anonymizer",
    "displayName": "Privacy Guard",
    "description": "Scans for sensitive elements and asks your preference for each.",
    "type": ["evaluator", "builder"],
    "whenToUse": "When work content mentions employers, clients, projects, or specific metrics.",
    "howItWorks": [
      "Scans content for four areas: employers, clients, projects, metrics",
      "Shows what it found with context",
      "Asks your preference per item: keep, anonymize, or remove",
      "Applies your decisions consistently",
      "Not global rules — per-content decisions"
    ]
  },
  {
    "name": "portfolio-copywriter",
    "displayName": "Copy Writer",
    "description": "Write and improve portfolio website copy - hero, about, contact, project showcases.",
    "type": "builder",
    "whenToUse": "When you need to write or improve hero, about, or project sections.",
    "howItWorks": [
      "Leads with outcome, not role (\"I build X\" not \"I'm a PM\")",
      "Uses tension to create interest",
      "Keeps each section focused on one idea",
      "Ends with clear call-to-action",
      "Knows SEO and web design basics"
    ]
  },
  {
    "name": "website-expert",
    "displayName": "Code & Design",
    "description": "Technical and design expert for the portfolio site.",
    "type": "builder",
    "whenToUse": "When you need to implement changes, fix bugs, or improve design.",
    "howItWorks": [
      "Explores codebase to understand structure",
      "Knows modern web design (2024-2025 trends)",
      "Writes clean vanilla HTML/CSS/JS",
      "Optimizes for performance",
      "Mobile-first responsive design"
    ]
  },
  {
    "name": "voice-guardian",
    "displayName": "Voice Check",
    "description": "Review content for voice and tone. Catches corporate speak, ensures authentic voice.",
    "type": "evaluator",
    "whenToUse": "After drafting content, before publishing.",
    "howItWorks": [
      "Reads your voice profile from CLAUDE.md",
      "Grades content A/B/C/D",
      "Flags corporate speak and passive voice",
      "Shows what works and what doesn't",
      "Suggests specific fixes with priority (P0/P1/P2)"
    ]
  },
  {
    "name": "web-content-optimizer",
    "displayName": "SEO & Performance",
    "description": "Optimize content for web delivery - SEO, readability, images, mobile UX, performance.",
    "type": "evaluator",
    "whenToUse": "Before publishing to check SEO and web performance.",
    "howItWorks": [
      "Checks on-page SEO (titles, meta, headers, keywords)",
      "Reviews readability and typography",
      "Assesses image optimization",
      "Tests responsive/mobile experience",
      "Grades A/B/C/D with prioritized fixes"
    ]
  },
  {
    "name": "quality-check",
    "displayName": "Final Gate",
    "description": "Final gate before publishing. Verifies all specialist skills have run and passed.",
    "type": "evaluator",
    "whenToUse": "Last step before going live. The final gate.",
    "howItWorks": [
      "Checks if /voice-guardian ran (needs B or better)",
      "Checks if /web-content-optimizer ran (needs B or better)",
      "Checks if /anonymizer ran (if work content)",
      "Does NOT duplicate work — verifies specialists ran",
      "B+ is good enough. Perfection is the enemy."
    ]
  },
  {
    "name": "update",
    "displayName": "Skill Updater",
    "description": "Check for and install new or updated skills from the upstream kit.",
    "type": "builder",
    "whenToUse": "Periodically, or when new skills are announced.",
    "howItWorks": [
      "Fetches latest skills.json from GitHub",
      "Compares versions with your local skills",
      "Shows what's new or updated",
      "You pick what to install — never auto-updates",
      "Never touches your CLAUDE.md or content files"
    ]
  }
];

// Load and render skills
document.addEventListener('DOMContentLoaded', () => {
    renderSkills(SKILLS_DATA);
    updateSkillCount(SKILLS_DATA.length);
    initTracking();
    initTerminalDemo();
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Terminal demo - one continuous conversation showing full workflow
const TERMINAL_LINES = [
    // Setup
    { type: 'user', text: '<span class="skill">/config</span>' },
    { type: 'response', text: 'Let\'s set up your portfolio. Name?' },
    { type: 'user', text: 'Alex Chen' },
    { type: 'response', text: 'Role?' },
    { type: 'user', text: 'Product Manager' },
    { type: 'response', text: 'Voice style? (builder, analytical, or describe your own)' },
    { type: 'user', text: 'builder + analytical' },
    { type: 'response', text: 'CLAUDE.md created <span class="success">✓</span>' },
    { type: 'spacer', text: '' },
    // Content strategist
    { type: 'user', text: '<span class="skill">/content-strategist</span>, I have a case study from work' },
    { type: 'response', text: 'Work content → portfolio. Running <span class="skill">/story-adapter</span>...' },
    { type: 'response', text: 'Tell me about the project.' },
    { type: 'user', text: 'Led a data migration, 6 months, saved $2M annually' },
    { type: 'response', text: 'Structuring with STAR format...' },
    { type: 'response', text: 'Found: \'Acme Corp\', \'$2M\'. Running <span class="skill">/anonymizer</span>...' },
    { type: 'response', text: 'Keep, anonymize, or remove each?' },
    { type: 'user', text: 'anonymize company, keep metric as ratio' },
    { type: 'response', text: '→ \'enterprise SaaS\', \'70% cost reduction\' <span class="success">✓</span>' },
    { type: 'spacer', text: '' },
    // Voice check
    { type: 'user', text: '<span class="skill">/voice-guardian</span>' },
    { type: 'response', text: 'Checking voice and tone...' },
    { type: 'response', text: 'Grade: <span class="success">B+</span> — authentic, shows process' },
    { type: 'response', text: 'Suggestion: "Led migration" → "Migrated 50 services"' },
    { type: 'user', text: 'apply that' },
    { type: 'response', text: 'Updated <span class="success">✓</span>' },
    { type: 'spacer', text: '' },
    // Quality check
    { type: 'user', text: '<span class="skill">/quality-check</span>' },
    { type: 'response', text: 'Running final gate...' },
    { type: 'response', text: 'Voice <span class="success">✓</span> Anonymized <span class="success">✓</span> SEO <span class="success">✓</span>' },
    { type: 'response', text: 'Ready to ship! 🚀' },
];

function initTerminalDemo() {
    const terminal = document.getElementById('terminal-content');
    let lineIndex = 0;

    function addLine() {
        const lineData = TERMINAL_LINES[lineIndex];

        // Create new line
        const div = document.createElement('div');
        div.className = `terminal-line ${lineData.type}`;
        div.innerHTML = lineData.text;
        terminal.appendChild(div);

        // Animate in
        setTimeout(() => div.classList.add('visible'), 50);

        // Smooth scroll to bottom
        terminal.scrollTop = terminal.scrollHeight;

        // Move to next line, loop back at end
        lineIndex = (lineIndex + 1) % TERMINAL_LINES.length;

        // If we looped, pause and reset
        if (lineIndex === 0) {
            setTimeout(() => {
                // Fade out all lines
                terminal.classList.add('resetting');
                setTimeout(() => {
                    terminal.innerHTML = '';
                    terminal.classList.remove('resetting');
                    setTimeout(addLine, 300);
                }, 500);
            }, 2500);
        } else {
            // Determine delay based on line type
            const delay = lineData.type === 'spacer' ? 800 :
                          lineData.type === 'user' ? 1200 : 700;
            setTimeout(addLine, delay);
        }
    }

    addLine();
}

// Analytics tracking
function initTracking() {
    // Track copy events on code blocks
    document.addEventListener('copy', () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'copy', {event_category: 'Engagement', event_label: 'Code copied'});
        }
    });

    // Track scroll depth (25%, 50%, 75%, 100%)
    let scrollMarkers = [25, 50, 75, 100];
    let scrollTracked = [];

    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

        scrollMarkers.forEach(marker => {
            if (scrollPercent >= marker && !scrollTracked.includes(marker)) {
                scrollTracked.push(marker);
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'scroll', {event_category: 'Engagement', event_label: `${marker}% scrolled`});
                }
            }
        });
    });
}

function renderSkills(skills) {
    const grid = document.getElementById('skills-grid');

    // Skills are pre-ordered by suggested workflow - no sorting needed
    grid.innerHTML = skills.map((skill, index) => {
        // Handle type as string or array
        const types = Array.isArray(skill.type) ? skill.type : [skill.type];
        const typeLabels = types.map(t => `<span class="skill-type ${t}">${t}</span>`).join(' ');

        return `
        <div class="skill-card" data-index="${index}" onclick="toggleSkill(this)">
            <div class="skill-card-header">
                <div class="skill-title-row">
                    <span class="skill-display-name">${skill.displayName}</span>
                    <span class="skill-slash-name">/${skill.name}</span>
                </div>
                <span class="expand-icon">►</span>
            </div>
            <div class="skill-type-row">${typeLabels}</div>
            <p class="skill-summary">${skill.description}</p>
            <div class="skill-details">
                <h4>When to use</h4>
                <p>${skill.whenToUse || ''}</p>
                <h4>How it works</h4>
                <ul>
                    ${(skill.howItWorks || []).map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
        </div>
    `}).join('');
}

function toggleSkill(card) {
    card.classList.toggle('expanded');

    // Track skill expansion in GA
    if (card.classList.contains('expanded') && typeof gtag !== 'undefined') {
        const skillName = card.querySelector('.skill-display-name').textContent;
        gtag('event', 'expand', {event_category: 'Skill', event_label: skillName});
    }
}

function updateSkillCount(count) {
    document.getElementById('skill-count').textContent = `(${count})`;
}

function switchSetupTab(tab, btn) {
    // Update tab buttons
    document.querySelectorAll('.setup-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update content
    document.querySelectorAll('.setup-content').forEach(content => content.classList.remove('active'));
    document.getElementById('setup-' + tab).classList.add('active');

    // Update prerequisite install link
    const prereqInstall = document.getElementById('prereq-install');
    if (tab === 'desktop') {
        prereqInstall.innerHTML = '<a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer">Claude Desktop app</a>';
    } else {
        prereqInstall.innerHTML = '<a href="https://docs.anthropic.com/en/docs/claude-code/getting-started" target="_blank" rel="noopener noreferrer">Claude Code CLI</a>';
    }

    // Track in GA
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {event_category: 'Setup', event_label: 'Tab: ' + tab});
    }
}

function showWorkflow() {
    document.getElementById('workflow-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (typeof gtag !== 'undefined') {
        gtag('event', 'view', {event_category: 'Workflow', event_label: 'Modal opened'});
    }
}

function closeWorkflow(event) {
    if (!event || event.target.id === 'workflow-modal') {
        document.getElementById('workflow-modal').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeWorkflow();
});
