/*
 * Everything the site renders lives here. Edit this file to update the portfolio;
 * no build step needed. Facts are taken from each repository's README.
 */
window.PORTFOLIO = {
  person: {
    name: "Naveen Vikram R",
    nameLines: ["Naveen", "Vikram R"],
    role: "AI Engineer",
    location: "India",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
    status: "Open to roles & collaborations",
    tagline: "Building secure AI systems",
    // Shown in the hero's "Certified" row. Add a `url` to link a cert to its credential page.
    certifications: [
      { name: "ISC2 Certified in Cybersecurity (CC)", url: "" },
      { name: "Cranium AI Security", url: "" },
    ],
    github: "NaveenVikramR",
    // Fill these in to show them in the contact section and command palette.
    email: "naveenvikram27@gmail.com",
    linkedin: "https://www.linkedin.com/in/naveen-vikram-492428296",
    resume: "",
    // About: one thesis line, one line on how, one line of proof.
    thesis: "I make AI agents safe to trust with real work.",
    lede: "Agents should prove who they are, ask before they spend and show their work. I build that end to end, from the model to the payment rail.",
    shipped: ["agent payments on PayPal", "a voice on-call copilot for Alexa+", "an AI export desk for garment exporters"],
  },

  stats: [
    { value: "19", label: "public repositories" },
    { value: "4", label: "hackathon builds" },
    { value: "3", label: "live products" },
  ],

  categories: [
    { id: "all", label: "All" },
    { id: "agents", label: "AI agents & LLM apps" },
    { id: "systems", label: "Systems & infra" },
    { id: "ml", label: "ML & computer vision" },
    { id: "web", label: "Full-stack" },
  ],

  // Four projects shown large in "Selected work", in this order.
  featured: ["exportAgent", "handshake", "nightshift", "TruePay"],

  projects: [
    {
      id: "exportAgent",
      tagline: "An AI export desk for apparel and textile exporters, with a human approving every step.",
      name: "ExportAgent",
      repo: "NaveenVikramR/exportAgent",
      pushed: "2026-10-25",
      cats: ["agents", "web"],
      event: "Nebius × NVIDIA Global AI Hackathon",
      summary:
        "An AI export desk for apparel and textile exporters. It reads buyer emails, extracts the purchase order, diffs revisions, checks factory feasibility, drafts the reply and produces the Commercial Invoice and Packing List. A person approves every step.",
      metric: { value: "100%", label: "high-risk recall on the held-out test set" },
      stack: ["NVIDIA Nemotron", "Nebius Token Factory", "Tavily", "FastAPI", "PostgreSQL", "Next.js"],
      image: { src: "assets/img/exportagent.webp", alt: "ExportAgent risk review for a revised purchase order, with high-risk flags and their evidence" },
      links: { demo: "https://3-104-80-176.sslip.io" },
    },
    {
      id: "handshake",
      tagline: "A payment layer for personal AI agents: passkey approval, signed agents, PayPal settlement.",
      name: "Handshake",
      repo: "NaveenVikramR/handshake",
      pushed: "2026-11-09",
      cats: ["agents", "systems", "web"],
      event: "PayPal AI Hackathon",
      summary:
        "A payment layer for personal AI agents. A consumer agent buys from a merchant agent, the human approves the exact cart with a passkey, both agents sign what they send against a trust registry, and money only moves through PayPal authorize, capture and void.",
      metric: { value: "96/96", label: "attack cases blocked, 0 unauthorized charges" },
      stack: ["TypeScript", "Next.js", "WebAuthn", "Express", "PayPal APIs", "pnpm monorepo"],
      links: { demo: "https://handshake-web-debi.onrender.com" },
    },
    {
      id: "nightshift",
      tagline: "A voice on-call and security copilot for Alexa+, built as a self-hosted MCP server.",
      name: "Nightshift",
      repo: "NaveenVikramR/nightshift",
      pushed: "2026-10-23",
      cats: ["agents", "systems"],
      event: "Amazon Developer Hackathon · Alexa+ track",
      summary:
        "A voice on-call and security copilot for Alexa+. A self-hosted MCP server explains what's wrong in production and takes safe, explicitly confirmed actions like failovers, with Bedrock Guardrails screening untrusted text before the model sees it.",
      metric: { value: "625", label: "tests passing on the submitted commit" },
      stack: ["MCP", "Amazon Bedrock", "Bedrock Guardrails", "TypeScript", "Next.js", "Docker"],
      image: { src: "assets/img/nightshift.webp", alt: "Nightshift incident card in the simulated Alexa+ showing a critical Payments API error spike" },
      links: { video: "https://youtu.be/wR8AIjl1880" },
    },
    {
      id: "TruePay",
      tagline: "Payment reliability platform: idempotent webhooks, outbox to Kafka, reconciliation and DLQ replay.",
      name: "TruePay",
      repo: "NaveenVikramR/TruePay",
      pushed: "2026-09-03",
      cats: ["systems", "web"],
      summary:
        "A payment reliability platform: provider-agnostic origination across Stripe, Razorpay and PayPal, signature-verified idempotent webhooks, a transactional outbox to Kafka, reconciliation, refunds, chargebacks and safe DLQ replay behind a JWT-secured admin UI.",
      metric: { value: "8", label: "k6 load profiles, from smoke to soak" },
      stack: ["Java", "Spring Boot 3", "Kafka", "PostgreSQL", "React", "Prometheus", "k6"],
      links: {},
    },
    {
      id: "MedScribe",
      name: "MedScribe",
      repo: "NaveenVikramR/MedScribe",
      pushed: "2026-06-22",
      cats: ["agents", "web"],
      summary:
        "Turns a recorded clinical conversation into a corrected transcript and a structured SOAP note. Every correction is auditable, with a logged decision, similarity score and margin, and a post-hoc check that every structured fact made it into the note.",
      stack: ["Python", "FastAPI", "FasterWhisper", "Groq · Llama 3.3 70B", "pgvector", "React"],
      links: {},
    },
    {
      id: "KiranaStore_ops_Bot",
      name: "Kirana Ops Agent",
      repo: "NaveenVikramR/KiranaStore_ops_Bot",
      pushed: "2026-09-15",
      cats: ["agents"],
      summary:
        "Run a kirana store from Telegram in plain English: stock, bills, khata, GST, daily close, invoices and sales decks. A reasoning agent picks and chains the tools itself instead of routing keywords to menus.",
      stack: ["Python", "Claude Agent SDK", "MCP tools", "Telegram", "Railway"],
      links: { demo: "https://t.me/KiranaStore_opsBot" },
    },
    {
      id: "DarkMode-Extension",
      name: "Intelligent Dark Mode",
      repo: "NaveenVikramR/DarkMode-Extension",
      pushed: "2026-06-30",
      cats: ["web"],
      summary:
        "A Chrome extension that themes sites without CSS inversion. It classifies each element, assigns an elevation tier and maps its color in OKLCH, nudging until WCAG AA contrast is met. Runs fully local, with no network calls.",
      stack: ["TypeScript", "Chrome MV3", "Vite", "OKLCH"],
      links: {},
    },
    {
      id: "cvPhysio",
      name: "cvPhysio",
      repo: "NaveenVikramR/cvPhysio",
      pushed: "2026-11-17",
      status: "In progress",
      cats: ["ml"],
      summary:
        "A real-time webcam rehabilitation coach for shoulder exercises: pose estimation, joint-angle features, a correctness classifier trained on UI-PRMD with cross-subject splits, and live visual + spoken feedback.",
      stack: ["Python", "MediaPipe", "scikit-learn", "Streamlit"],
      links: {},
    },
  ],

  // Writing. Posts below are shown immediately; newer dev.to posts are added live in the browser.
  blog: {
    primary: { label: "dev.to", url: "https://dev.to/naveen_vikram_4022af2f49a", username: "naveen_vikram_4022af2f49a" },
    mirror: { label: "Medium", url: "https://medium.com/@naveenvikram27" },
    posts: [
      {
        title: "Nightshift: voice on-call and security copilot for Alexa+",
        url: "https://dev.to/naveen_vikram_4022af2f49a/nightshift-voice-on-call-and-security-copilot-for-alexa-2k63",
        date: "2026-10-23",
        minutes: 5,
        tags: ["devops", "mcp", "security", "sre"],
        blurb: "The story behind my Amazon Developer Hackathon build: an MCP server that explains production incidents by voice and only acts once you confirm.",
      },
      {
        title: "Your AI Guardrails Are a Taxonomy Pretending to Be an Ontology",
        url: "https://dev.to/naveen_vikram_4022af2f49a/your-ai-guardrails-are-a-taxonomy-pretending-to-be-an-ontology-334f",
        date: "2026-10-05",
        minutes: 3,
        tags: ["ai", "llm", "security"],
        blurb: "A guardrail that only knows categories can label a problem. It can't reason about one.",
      },
      {
        title: "Global Workspace Theory: The J-Space of Claude",
        url: "https://dev.to/naveen_vikram_4022af2f49a/global-workspace-theory-x-the-j-space-of-claude-52ej",
        date: "2026-09-17",
        minutes: 6,
        tags: ["ai", "claude", "llm"],
        blurb: "What a 40-year-old theory of human consciousness has to do with catching an AI model lying.",
      },
      {
        title: "Confidence-Gated AI: When Should a Model Refuse to Auto-Correct?",
        url: "https://dev.to/naveen_vikram_4022af2f49a/confidence-gated-ai-when-should-a-model-refuse-to-auto-correct-6jd",
        date: "2026-09-16",
        minutes: 10,
        tags: ["ai", "machinelearning", "medicalai", "architecture"],
        blurb: "What building a medical transcription pipeline taught me about when a model should correct a word and when it should flag it for a human.",
      },
    ],
  },

  // "How I work": shown in this order, numbered, because it's the order the work happens in.
  principles: [
    {
      title: "Understand the system, then design it",
      body:
        "AI writes code faster than anyone can read it, so understanding and architecture are now the bottleneck. I learn the domain and how it fails, set the boundaries, data flow and failure paths, then let AI fill in the pieces. In TruePay that meant an outbox to Kafka, idempotent webhooks and circuit breakers on every provider.",
    },
    {
      title: "Humans approve what matters",
      body:
        "The more an agent can do, the more it matters who signs off. Agents propose and people decide: passkeys approve payments in Handshake, exporters approve every draft in ExportAgent, and an engineer confirms each failover out loud in Nightshift.",
    },
    {
      title: "Measure before claiming",
      body:
        "AI makes it easy to sound right, so I only trust numbers from real runs: held-out test sets, attack suites and evals. Handshake ships with 96 adversarial cases, and ExportAgent reports recall on data it never saw.",
    },
  ],

};
