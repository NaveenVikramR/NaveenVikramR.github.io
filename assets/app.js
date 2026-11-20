(() => {
  "use strict";
  const D = window.PORTFOLIO;
  const P = D.person;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icon = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
    out: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5"/></svg>',
    plus: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 1v10M1 6h10"/></svg>',
    gh: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.66 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z"/></svg>',
    play: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5-9-5.5Z"/></svg>',
  };

  const projects = D.projects;
  const byId = Object.fromEntries(projects.map((p) => [p.id, p]));
  const catLabel = Object.fromEntries(D.categories.map((c) => [c.id, c.label]));
  const fmtDate = (iso) => new Date(iso + (iso.length === 10 ? "T00:00:00" : "")).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  const ago = (iso) => {
    const days = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 864e5));
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 30) return `${days} days ago`;
    const m = Math.round(days / 30);
    return m === 1 ? "a month ago" : `${m} months ago`;
  };
  const repoUrl = (p) => `https://github.com/${p.repo}`;

  /* ── Theme ─────────────────────────────────────────────── */
  const root = document.documentElement;
  const savedTheme = store.get("theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const themeBtn = $("#theme-toggle");
  const paintThemeBtn = () => {
    themeBtn.setAttribute("aria-label", isDark() ? "Switch to light theme" : "Switch to dark theme");
    themeBtn.innerHTML = isDark()
      ? '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3 3l1 1M12 12l1 1M3 13l1-1M12 4l1-1"/></svg>'
      : '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7Z"/></svg>';
  };
  const toggleTheme = () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    store.set("theme", root.dataset.theme);
    paintThemeBtn();
  };
  themeBtn.addEventListener("click", toggleTheme);
  paintThemeBtn();

  /* ── Hero ──────────────────────────────────────────────── */
  let ci = 0;
  $("#hero-name").innerHTML = P.nameLines
    .map((line) => `<span class="hero__line">${[...line].map((ch) => `<span class="hero__char" style="--i:${ci++}">${ch === " " ? "&nbsp;" : esc(ch)}</span>`).join("")}</span>`)
    .join("");
  $("#hero-name").setAttribute("aria-label", P.name);

  $("#lede").innerHTML =
    `<span class="lede__thesis">${esc(P.thesis)}</span>` +
    `<span class="lede__body">${esc(P.lede)}</span>` +
    `<span class="lede__proof"><span class="label">Shipped</span>${P.shipped.map((s) => `<span>${esc(s)}</span>`).join("")}</span>`;

  $("#status-text").textContent = P.status;
  $("#tagline").textContent = P.tagline;
  const shield = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M8 1.5 2.5 3.5v4c0 3.2 2.3 5.9 5.5 7 3.2-1.1 5.5-3.8 5.5-7v-4L8 1.5Z"/><path d="m5.5 8 1.8 1.8L10.7 6.4"/></svg>';
  $("#meta-cert").innerHTML = P.certifications
    .map((c) => `<span class="cert__item">${shield}${c.url ? `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>` : esc(c.name)}</span>`)
    .join("");
  $("#meta-location").textContent = P.location;

  $("#stats").innerHTML = D.stats
    .map((s) => `<div class="stat"><span class="stat__value">${esc(s.value)}</span><span class="stat__label">${esc(s.label)}</span></div>`)
    .join("");


  /* ── Featured ──────────────────────────────────────────── */
  $("#featured-count").textContent = String(D.featured.length).padStart(2, "0");
  $("#featured").innerHTML = D.featured
    .map((id) => byId[id])
    .filter(Boolean)
    .map(
      (p) => `
      <a class="feature" href="#p-${esc(p.id)}" data-open="${esc(p.id)}">
        <div class="feature__top">
          <div>
            <h3 class="feature__name">${esc(p.name)}</h3>
            <div class="feature__event">${esc(p.event || p.stack.slice(0, 3).join(" · "))}</div>
          </div>
          <span class="arrow">${icon.arrow}</span>
        </div>
        <div class="feature__metric">
          <span class="feature__value">${esc(p.metric.value)}</span>
          <span class="feature__metric-label">${esc(p.metric.label)}</span>
        </div>
        <p class="feature__summary">${esc(p.tagline || p.summary.split(". ")[0])}</p>
        <div class="feature__foot">
          <ul class="tags">${p.stack.slice(0, 4).map((s) => `<li class="tag">${esc(s)}</li>`).join("")}</ul>
          <span class="mono" style="color:var(--muted)">${esc(p.repo.split("/")[1])}</span>
        </div>
      </a>`
    )
    .join("");
  $$(".feature").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* Phone swipe row for featured cards: dots + position */
  const featuredEl = $("#featured");
  const cards = $$(".feature", featuredEl);
  $("#featured-dots").innerHTML = cards.map((c, i) => `<button type="button" aria-label="Show ${esc($(".feature__name", c).textContent)}" aria-current="${i === 0}"></button>`).join("");
  const dots = $$("#featured-dots button");
  const step = () => (cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : 1);
  let curCard = 0;
  featuredEl.addEventListener("scroll", () => {
    const i = Math.max(0, Math.min(cards.length - 1, Math.round(featuredEl.scrollLeft / step())));
    if (i === curCard) return;
    curCard = i;
    dots.forEach((d, k) => d.setAttribute("aria-current", String(k === i)));
    $("#featured-pos").textContent = `${i + 1} / ${cards.length} · swipe`;
  }, { passive: true });
  dots.forEach((d, i) => d.addEventListener("click", () => featuredEl.scrollTo({ left: i * step(), behavior: reduced ? "auto" : "smooth" })));

  /* ── Index ─────────────────────────────────────────────── */
  const sorted = [...projects].sort((a, b) => b.pushed.localeCompare(a.pushed));
  const linkButtons = (p) => {
    const out = [];
    if (p.links.video) out.push(`<a class="btn btn--primary" href="${esc(p.links.video)}" target="_blank" rel="noopener">${icon.play} Watch demo</a>`);
    out.push(`<a class="btn" href="${repoUrl(p)}" target="_blank" rel="noopener">${icon.gh} Source</a>`);
    return out.join("");
  };
  const rowHtml = (p) => `
    <li class="row" id="p-${esc(p.id)}" data-cats="${esc(p.cats.join(" "))}" data-search="${esc([p.name, p.summary, p.stack.join(" "), p.event || ""].join(" ").toLowerCase())}">
      <button class="row__btn" type="button" aria-expanded="false" aria-controls="panel-${esc(p.id)}">
        <span class="row__date mono" data-pushed="${esc(p.id)}">${fmtDate(p.pushed)}</span>
        <span class="row__name">${esc(p.name)}${p.status ? `<span class="row__wip">${esc(p.status)}</span>` : ""}</span>
        <span class="row__summary">${esc(p.summary)}</span>
        <span class="row__cats"><span class="tag">${esc(catLabel[p.cats[0]])}</span></span>
        <span class="row__plus">${icon.plus}</span>
      </button>
      <div class="row__panel" id="panel-${esc(p.id)}" role="region" aria-label="${esc(p.name)} details">
        <div>
          <div class="detail${p.image ? " has-image" : ""}">
            <div class="detail__text">
              ${p.event ? `<span class="label">${esc(p.event)}</span>` : ""}
              <p class="detail__summary">${esc(p.summary)}</p>
              <p class="detail__stack">${p.stack.map(esc).join(" · ")}</p>
              <div class="links">${linkButtons(p)}</div>
            </div>
            ${p.image ? `<figure class="shot"><img src="${esc(p.image.src)}" alt="${esc(p.image.alt)}" loading="lazy" decoding="async"></figure>` : ""}
          </div>
        </div>
      </div>
    </li>`;
  $("#index").innerHTML = sorted.map(rowHtml).join("") + '<li class="empty" id="index-empty" hidden>No projects match that search.</li>';
  $("#index-count").textContent = String(projects.length).padStart(2, "0");

  const toggleRow = (row, force) => {
    const open = force ?? !row.classList.contains("is-open");
    row.classList.toggle("is-open", open);
    $(".row__btn", row).setAttribute("aria-expanded", String(open));
  };
  $("#index").addEventListener("click", (e) => {
    const btn = e.target.closest(".row__btn");
    if (!btn) return;
    const row = btn.closest(".row");
    toggleRow(row);
    if (row.classList.contains("is-open")) history.replaceState(null, "", `#${row.id}`);
  });

  let activeCat = store.get("cat") || "all";
  if (!catLabel[activeCat]) activeCat = "all";
  let query = "";
  const counts = (id) => (id === "all" ? projects.length : projects.filter((p) => p.cats.includes(id)).length);
  $("#chips").innerHTML = D.categories
    .filter((c) => c.id === "all" || counts(c.id) >= 2)
    .map((c) => `<button class="chip" type="button" data-cat="${c.id}" aria-pressed="${c.id === activeCat}">${esc(c.label)} <span class="chip__count">${counts(c.id)}</span></button>`)
    .join("");
  const applyFilter = () => {
    let shown = 0;
    $$("#index .row").forEach((row) => {
      const ok = (activeCat === "all" || row.dataset.cats.split(" ").includes(activeCat)) && (!query || row.dataset.search.includes(query));
      row.classList.toggle("is-hidden", !ok);
      if (ok) shown++;
    });
    $("#index-empty").hidden = shown > 0;
    $("#index-count").textContent = String(shown).padStart(2, "0");
  };
  $("#chips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeCat = chip.dataset.cat;
    store.set("cat", activeCat);
    $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
    applyFilter();
  });
  $("#search").addEventListener("input", (e) => {
    query = e.target.value.trim().toLowerCase();
    applyFilter();
  });
  applyFilter();

  const openProject = (id, scroll = true) => {
    const row = document.getElementById(`p-${id}`);
    if (!row) return;
    if (row.classList.contains("is-hidden")) {
      activeCat = "all";
      query = "";
      $("#search").value = "";
      $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.cat === "all")));
      applyFilter();
    }
    toggleRow(row, true);
    if (scroll) row.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#p-${id}`);
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-open], a[href^='#p-']");
    if (!a || a.closest(".row__btn")) return;
    e.preventDefault();
    openProject(a.dataset.open || a.getAttribute("href").slice(3));
  });
  const fromHash = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (h.startsWith("p-") && byId[h.slice(2)]) openProject(h.slice(2));
  };
  window.addEventListener("hashchange", fromHash);


  /* ── Writing (baked posts + live dev.to) ──────────────── */
  const B = D.blog;
  const postHtml = (p, isNew) => `
    <li class="post"><a href="${esc(p.url)}" target="_blank" rel="noopener">
      <span class="post__date mono">${fmtDate(p.date)}</span>
      <span class="post__body">
        <span class="post__title">${esc(p.title)}${isNew ? '<span class="post__new">New</span>' : ""}</span>
        ${p.blurb ? `<span class="post__blurb">${esc(p.blurb)}</span>` : ""}
      </span>
      <span class="post__meta mono">${p.minutes ? `${p.minutes} min read` : ""}</span>
      <span class="arrow">${icon.out}</span>
    </a></li>`;
  const renderPosts = (posts, fresh = new Set()) => {
    const list = [...posts].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 6);
    $("#posts").innerHTML = list.map((p) => postHtml(p, fresh.has(p.url))).join("");
    $("#writing-count").textContent = String(posts.length).padStart(2, "0");
  };
  renderPosts(B.posts);
  $("#posts-more").innerHTML =
    `<a class="btn btn--primary" href="${esc(B.primary.url)}" target="_blank" rel="noopener">${icon.out} All posts on ${esc(B.primary.label)}</a>` +
    `<a class="btn" href="${esc(B.mirror.url)}" target="_blank" rel="noopener">${icon.out} Also on ${esc(B.mirror.label)}</a>`;
  const mergeLive = (articles) => {
    const known = new Set(B.posts.map((p) => p.url));
    const fresh = new Set();
    articles.forEach((x) => {
      if (known.has(x.url)) return;
      const blurb = (x.description || "").replace(/\s+/g, " ").replace(/\s*\.\.\.$/, "").trim();
      B.posts.push({ title: x.title, url: x.url, date: x.published_at.slice(0, 10), minutes: x.reading_time_minutes, blurb: /https?:\/\//.test(blurb) ? "" : blurb });
      fresh.add(x.url);
    });
    if (fresh.size) renderPosts(B.posts, fresh);
  };
  const cachedPosts = store.get("devto-posts");
  if (cachedPosts && Date.now() - cachedPosts.t < 36e5) mergeLive(cachedPosts.a);
  else if (location.protocol.startsWith("http")) {
    fetch(`https://dev.to/api/articles?username=${encodeURIComponent(B.primary.username)}&per_page=12`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((arr) => {
        const slim = arr.map((x) => ({ title: x.title, url: x.url, published_at: x.published_at, reading_time_minutes: x.reading_time_minutes, description: x.description }));
        store.set("devto-posts", { t: Date.now(), a: slim });
        mergeLive(slim);
      })
      .catch(() => { /* offline or blocked: keep baked-in posts */ });
  }

  /* ── Principles, stack, contact ───────────────────────── */
  $("#principles").innerHTML = D.principles.map((p, i) => `<article class="principle"><span class="principle__num">${String(i + 1).padStart(2, "0")}</span><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></article>`).join("");

  const ghUrl = `https://github.com/${P.github}`;
  const contactBits = [`<a class="btn btn--primary" href="${ghUrl}" target="_blank" rel="noopener">${icon.gh} github.com/${esc(P.github)}</a>`];
  if (P.linkedin) contactBits.push(`<a class="btn" href="${esc(P.linkedin)}" target="_blank" rel="noopener">${icon.out} LinkedIn</a>`);
  if (P.resume) contactBits.push(`<a class="btn" href="${esc(P.resume)}" target="_blank" rel="noopener">${icon.out} Résumé</a>`);
  if (P.email) contactBits.unshift(`<span class="copy-field"><span id="email-text">${esc(P.email)}</span><button class="btn" type="button" id="copy-email">Copy</button></span>`);
  $("#contact-links").innerHTML = contactBits.join("");
  $("#contact-big").innerHTML = P.email
    ? `Let's build<br>something <a href="mailto:${esc(P.email)}">together.</a>`
    : `Let's build<br>something <a href="${ghUrl}" target="_blank" rel="noopener">together.</a>`;
  $("#year").textContent = new Date().getFullYear();
  $("#foot-name").textContent = P.name;

  const toast = (msg) => {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("is-on"), 1800);
  };
  const copyEmail = () => {
    if (!P.email) return;
    navigator.clipboard
      ?.writeText(P.email)
      .then(() => toast("Email copied"))
      .catch(() => {
        const r = document.createRange();
        r.selectNodeContents($("#email-text"));
        getSelection().removeAllRanges();
        getSelection().addRange(r);
        toast("Press Ctrl+C to copy");
      });
  };
  $("#copy-email")?.addEventListener("click", copyEmail);

  /* ── Header state + active nav ─────────────────────────── */
  const bar = $(".bar");
  const onScroll = () => bar.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if ("IntersectionObserver" in window) {
    const links = $$(".nav a");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const nav = $(".nav");
        links.forEach((l) => {
          const on = l.getAttribute("href") === `#${en.target.id}`;
          l.classList.toggle("is-active", on);
          l.setAttribute("aria-current", on ? "true" : "false");
          // keep the active tab visible in the phone's swipe row
          if (on && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: l.offsetLeft - nav.clientWidth / 2 + l.offsetWidth / 2, behavior: reduced ? "auto" : "smooth" });
        });
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main section[id]").forEach((s) => io.observe(s));
  }

  /* ── Command palette (⌘K / Ctrl+K or /) ───────────────── */
  const pal = $("#palette");
  const palInput = $("#palette-input");
  const palList = $("#palette-list");
  const go = (sel) => () => document.querySelector(sel)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  const commands = [
    { group: "Go to", label: "Selected work", hint: "section", run: go("#work") },
    { group: "Go to", label: "Project index", hint: "section", run: go("#index-section") },
    { group: "Go to", label: "Writing", hint: "section", run: go("#writing") },
    { group: "Go to", label: "How I work", hint: "section", run: go("#approach") },
    { group: "Go to", label: "Contact", hint: "section", run: go("#contact") },
    ...sorted.map((p) => ({ group: "Projects", label: p.name, hint: catLabel[p.cats[0]], keys: `${p.summary} ${p.stack.join(" ")}`, run: () => openProject(p.id) })),
    { group: "Actions", label: "Toggle light / dark theme", hint: "theme", run: toggleTheme },
    { group: "Actions", label: "Open GitHub profile", hint: "github.com", href: ghUrl },
    ...D.blog.posts.map((p) => ({ group: "Writing", label: p.title, hint: `${p.minutes} min read`, href: p.url })),
    { group: "Actions", label: "Read the blog on dev.to", hint: "dev.to", href: D.blog.primary.url },
    ...(P.email ? [{ group: "Actions", label: "Copy email address", hint: "email", run: copyEmail }] : []),
    ...sorted.filter((p) => p.links.video).map((p) => ({ group: "Demos", label: `Watch the ${p.name} demo`, hint: "video", href: p.links.video })),
  ];
  let palItems = [];
  let palIndex = 0;
  const renderPalette = () => {
    const q = palInput.value.trim().toLowerCase();
    palItems = commands.filter((c) => !q || `${c.label} ${c.hint} ${c.group} ${c.keys || ""}`.toLowerCase().includes(q));
    palIndex = Math.min(palIndex, Math.max(0, palItems.length - 1));
    if (!palItems.length) {
      palList.innerHTML = `<li class="palette__empty">Nothing matches “${esc(q)}”.</li>`;
      return;
    }
    let lastGroup = "";
    palList.innerHTML = palItems
      .map((c, i) => {
        const head = c.group !== lastGroup ? `<li class="palette__group label" role="presentation">${esc(c.group)}</li>` : "";
        lastGroup = c.group;
        return `${head}<li class="palette__item${i === palIndex ? " is-active" : ""}" role="option" id="pal-${i}" aria-selected="${i === palIndex}" data-i="${i}"><span>${esc(c.label)}</span><small>${esc(c.hint)}</small></li>`;
      })
      .join("");
    palInput.setAttribute("aria-activedescendant", `pal-${palIndex}`);
    $(`#pal-${palIndex}`)?.scrollIntoView({ block: "nearest" });
  };
  let lastFocus = null;
  const openPalette = () => {
    lastFocus = document.activeElement;
    pal.hidden = false;
    palInput.value = "";
    palIndex = 0;
    renderPalette();
    palInput.focus();
  };
  const closePalette = () => {
    pal.hidden = true;
    lastFocus?.focus?.();
  };
  const runItem = (c) => {
    if (!c) return;
    closePalette();
    if (c.href) {
      const a = Object.assign(document.createElement("a"), { href: c.href, target: "_blank", rel: "noopener" });
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else c.run();
  };
  $("#palette-open").addEventListener("click", openPalette);
  palInput.addEventListener("input", () => { palIndex = 0; renderPalette(); });
  palList.addEventListener("click", (e) => {
    const li = e.target.closest(".palette__item");
    if (li) runItem(palItems[+li.dataset.i]);
  });
  palList.addEventListener("pointermove", (e) => {
    const li = e.target.closest(".palette__item");
    if (li && +li.dataset.i !== palIndex) { palIndex = +li.dataset.i; renderPalette(); }
  });
  pal.addEventListener("click", (e) => { if (e.target === pal) closePalette(); });
  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing && pal.hidden)) {
      e.preventDefault();
      pal.hidden ? openPalette() : closePalette();
      return;
    }
    if (pal.hidden) return;
    if (e.key === "Escape") closePalette();
    else if (e.key === "ArrowDown") { e.preventDefault(); palIndex = (palIndex + 1) % Math.max(1, palItems.length); renderPalette(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); palIndex = (palIndex - 1 + palItems.length) % Math.max(1, palItems.length); renderPalette(); }
    else if (e.key === "Enter") { e.preventDefault(); runItem(palItems[palIndex]); }
  });
  $("#palette-open .kbd").textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K";

  /* ── Live GitHub activity (falls back to baked-in dates) ─ */
  const applyLive = (repos) => {
    repos.forEach((r) => {
      const p = projects.find((x) => x.repo.toLowerCase() === r.full_name.toLowerCase());
      if (p && r.pushed_at && r.pushed_at.slice(0, 10) > p.pushed) {
        p.pushed = r.pushed_at.slice(0, 10);
        const el = $(`[data-pushed="${p.id}"]`);
        if (el) el.textContent = fmtDate(p.pushed);
      }
    });
  };
  const cached = store.get("gh-repos");
  if (cached && Date.now() - cached.t < 36e5) applyLive(cached.repos);
  else if (location.protocol.startsWith("http")) {
    fetch(`https://api.github.com/users/${P.github}/repos?per_page=100&sort=pushed`, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((repos) => {
        const slim = repos.map((r) => ({ full_name: r.full_name, pushed_at: r.pushed_at }));
        store.set("gh-repos", { t: Date.now(), repos: slim });
        applyLive(slim);
      })
      .catch(() => { /* offline, rate-limited or blocked: keep baked-in dates */ });
  }

  fromHash();
})();
