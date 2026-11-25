// =========================================================================
// APPLICATION STATE
// =========================================================================
let activeTab = 'home';
let activeOrgPeriod = '2026';
let activeOrgUnitId = null;
let activeProgramCategory = 'Semua';
let activeHeroIndex = 0;
let heroAutoplayTimer = null;
let activeCommunitySubtab = 'businesses';
let activeCommunityBizFilter = 'Semua';
let activeCommunityInterestFilter = 'Semua';
let activeShopMemberFilter = 'Semua';
let activePlaygroundView = 'hub';
let activeShopModalProduct = null;
let activeShopPhotoIndex = 0;
let partnerToastTimer = null;

function showToastNotification(message) {
  const toast = document.getElementById('partner-toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove('hidden');
  if (partnerToastTimer) clearTimeout(partnerToastTimer);
  partnerToastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 4000);
}

function handleSopDownload(event) {
  event.preventDefault();
  showToastNotification('Dokumen SOP Partnership sedang disiapkan di assets/docs/SOP-Partnership-FEBerbisnis.pdf.');
}

function switchTab(tabName) {
  activeTab = tabName;

  // Toggle visible view section
  document.querySelectorAll('.tab-view').forEach((section) => {
    section.classList.add('hidden');
  });
  const targetView = document.getElementById(`view-${tabName}`);
  if (targetView) {
    targetView.classList.remove('hidden');
  }

  // Update desktop nav buttons
  document.querySelectorAll('[data-nav-tab]').forEach((btn) => {
    const isActive = btn.getAttribute('data-nav-tab') === tabName;
    if (isActive) {
      btn.classList.add('bg-charcoal', 'text-cream');
      btn.classList.remove('text-charcoal/80', 'hover:bg-charcoal/10');
    } else {
      btn.classList.remove('bg-charcoal', 'text-cream');
      btn.classList.add('text-charcoal/80', 'hover:bg-charcoal/10');
    }
  });

  // Update mobile nav buttons
  document.querySelectorAll('[data-nav-tab-mobile]').forEach((btn) => {
    const isActive = btn.getAttribute('data-nav-tab-mobile') === tabName;
    if (isActive) {
      btn.classList.add('bg-charcoal', 'text-cream');
      btn.classList.remove('text-charcoal/80', 'hover:bg-charcoal/10');
    } else {
      btn.classList.remove('bg-charcoal', 'text-cream');
      btn.classList.add('text-charcoal/80', 'hover:bg-charcoal/10');
    }
  });

  if (tabName === 'playground') {
    openPlaygroundTool(activePlaygroundView || 'hub');
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function toggleMobileMenu(forceState) {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('mobile-menu-btn');
  const hamburger = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-menu-icon');
  if (!menu) return;

  const shouldOpen = typeof forceState === 'boolean' ? forceState : menu.classList.contains('hidden');
  menu.classList.toggle('hidden', !shouldOpen);
  if (btn) btn.setAttribute('aria-expanded', String(shouldOpen));
  if (hamburger) hamburger.classList.toggle('hidden', shouldOpen);
  if (closeIcon) closeIcon.classList.toggle('hidden', !shouldOpen);
}

function getInitials(name) {
  return String(name || 'FB')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

// =========================================================================
// HERO INTERACTIVE PHOTO CAROUSEL
// =========================================================================
function renderHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  const dots = document.getElementById('hero-carousel-dots');
  if (!track || !dots) return;

  track.innerHTML = SITE_DATA.heroSlides
    .map(
      (slide) => `
      <div class="w-full h-full shrink-0 relative overflow-hidden" style="background-color:${slide.palette.bg}">
        <!-- Geometric Swiss Fallback Illustration -->
        <svg viewBox="0 0 800 600" class="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="grid-${slide.id}" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FEF6EB" stroke-opacity="0.06" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="${slide.palette.bg}" />
          <rect width="800" height="600" fill="url(#grid-${slide.id})" />
          <circle cx="670" cy="115" r="185" fill="${slide.palette.accent1}" fill-opacity="0.92" />
          <circle cx="135" cy="495" r="140" fill="${slide.palette.accent2}" fill-opacity="0.72" />
          <rect x="44" y="42" width="136" height="12" rx="6" fill="#FFCE13" />
        </svg>

        <!-- Actual Photo Slot (clean full-bleed photo without text overlay) -->
        <img
          src="assets/img/hero/${slide.filename}"
          alt="${escapeHtml(slide.title)}"
          class="absolute inset-0 w-full h-full object-cover"
          onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
          onerror="this.style.display='none'"
        />
      </div>
    `
    )
    .join('');

  dots.innerHTML = SITE_DATA.heroSlides
    .map(
      (slide, idx) => `
      <button
        type="button"
        onclick="goToHeroSlide(${idx})"
        aria-label="Slide ${idx + 1}: ${escapeHtml(slide.title)}"
        class="hero-dot h-2 rounded-full transition-all duration-300 ${
          idx === activeHeroIndex ? 'w-6 bg-yellowbrand' : 'w-2 bg-cream/45 hover:bg-cream/80'
        }"
      ></button>
    `
    )
    .join('');

  updateHeroSlidePosition();
  resetHeroAutoplay();
}

function updateHeroSlidePosition() {
  const track = document.getElementById('hero-carousel-track');
  if (track) {
    track.style.transform = `translateX(-${activeHeroIndex * 100}%)`;
  }
  document.querySelectorAll('.hero-dot').forEach((dot, idx) => {
    if (idx === activeHeroIndex) {
      dot.classList.add('w-6', 'bg-yellowbrand');
      dot.classList.remove('w-2', 'bg-cream/45');
    } else {
      dot.classList.remove('w-6', 'bg-yellowbrand');
      dot.classList.add('w-2', 'bg-cream/45');
    }
  });
}

function nextHeroSlide() {
  activeHeroIndex = (activeHeroIndex + 1) % SITE_DATA.heroSlides.length;
  updateHeroSlidePosition();
  resetHeroAutoplay();
}

function prevHeroSlide() {
  activeHeroIndex = (activeHeroIndex - 1 + SITE_DATA.heroSlides.length) % SITE_DATA.heroSlides.length;
  updateHeroSlidePosition();
  resetHeroAutoplay();
}

function goToHeroSlide(index) {
  activeHeroIndex = index;
  updateHeroSlidePosition();
  resetHeroAutoplay();
}

function resetHeroAutoplay() {
  if (heroAutoplayTimer) clearInterval(heroAutoplayTimer);
  heroAutoplayTimer = setInterval(() => {
    if (activeTab === 'home') {
      activeHeroIndex = (activeHeroIndex + 1) % SITE_DATA.heroSlides.length;
      updateHeroSlidePosition();
    }
  }, 5500);
}

// =========================================================================
// ECOSYSTEM & PARTNERS FULL-WIDTH MARQUEE & BECOME A PARTNER MODAL
// =========================================================================
function renderEcosystemMarquee() {
  const track = document.getElementById('ecosystem-marquee-track');
  if (!track) return;

  const buildPartnerSet = () =>
    SITE_DATA.ecosystemPartners
      .map(
        (partner) => `
        <div class="mx-3 sm:mx-4 shrink-0">
          <div class="h-14 px-5 rounded-2xl bg-cream hairline-border shadow-xs flex items-center justify-center select-none">
            <img
              src="assets/img/ecosystem/${partner.filename}"
              alt="${escapeHtml(partner.name)}"
              class="h-8 w-auto max-w-[150px] object-contain"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div style="display:none;" class="items-center gap-3">
              <span class="relative inline-flex items-center shrink-0">
                <span class="w-4 h-4 rounded-full" style="background-color:${partner.accent}"></span>
                <span class="w-3 h-3 rounded-full bg-yellowbrand -ml-1.5 opacity-90"></span>
              </span>
              <div class="leading-tight pr-1">
                <span class="block text-sm font-extrabold tracking-tight text-charcoal whitespace-nowrap">
                  ${escapeHtml(partner.name)}
                </span>
                <span class="block text-[9px] font-bold uppercase tracking-[0.14em] text-charcoal/50">
                  ${escapeHtml(partner.tag)}
                </span>
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join('');

  // Duplicate track seamlessly for continuous -50% CSS marquee loop
  track.innerHTML = buildPartnerSet() + buildPartnerSet();
}

function renderPartnerModalContent() {
  const data = SITE_DATA.partnership;
  const typesEl = document.getElementById('partner-modal-types');
  const benefitsEl = document.getElementById('partner-modal-benefits');
  const sopEl = document.getElementById('partner-modal-sop');
  const picNameEl = document.getElementById('partner-pic-name');
  const picDescEl = document.getElementById('partner-pic-desc');
  const waLinkEl = document.getElementById('partner-wa-link');
  const emailLinkEl = document.getElementById('partner-email-link');
  const sopPdfLinkEl = document.getElementById('partner-sop-pdf-link');

  if (typesEl) {
    typesEl.innerHTML = data.types
      .map(
        (t) => `
        <span class="text-[11px] font-bold px-3 py-1 rounded-full bg-cream hairline-border text-charcoal">
          ${escapeHtml(t)}
        </span>
      `
      )
      .join('');
  }

  if (benefitsEl) {
    benefitsEl.innerHTML = data.benefits
      .map(
        (b) => `
        <div class="p-4 rounded-2xl bg-white/85 hairline-border">
          <span class="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-yellowbrand/55 text-charcoal mb-2">
            ${escapeHtml(b.num)}
          </span>
          <h5 class="text-sm font-extrabold text-charcoal leading-snug">${escapeHtml(b.title)}</h5>
          <p class="text-xs text-charcoal/70 mt-1.5 leading-relaxed">${escapeHtml(b.desc)}</p>
        </div>
      `
      )
      .join('');
  }

  if (sopEl) {
    sopEl.innerHTML = data.sopRules
      .map(
        (rule, idx) => `
        <li class="flex items-start gap-3 text-xs sm:text-sm text-charcoal/80 leading-relaxed">
          <span class="w-6 h-6 rounded-full bg-magenta/10 text-magenta font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
            ${idx + 1}
          </span>
          <span>${escapeHtml(rule)}</span>
        </li>
      `
      )
      .join('');
  }

  if (picNameEl) picNameEl.textContent = data.pic.title;
  if (picDescEl) picDescEl.textContent = data.pic.desc;
  if (waLinkEl) waLinkEl.href = data.pic.whatsappUrl;
  if (emailLinkEl) emailLinkEl.href = data.pic.emailUrl;
  if (sopPdfLinkEl) sopPdfLinkEl.href = data.pic.sopPdfUrl;
}

function openPartnerModal() {
  const modal = document.getElementById('partner-modal');
  if (!modal) return;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closePartnerModal() {
  const modal = document.getElementById('partner-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// =========================================================================
// MISSIONS & CORE VALUES
// =========================================================================
function renderMissions() {
  const grid = document.getElementById('mission-grid');
  if (!grid) return;

  grid.innerHTML = SITE_DATA.missions
    .map(
      (m) => `
      <article class="p-6 sm:p-7 rounded-3xl bg-white/[0.04] hairline-dark-border hover:border-yellowbrand/50 transition-colors duration-200">
        <span class="inline-block text-xs font-extrabold tracking-widest px-3 py-1 rounded-full bg-magenta text-white mb-4">
          ${escapeHtml(m.num)}
        </span>
        <h4 class="text-lg sm:text-xl font-extrabold tracking-tight text-cream">
          ${escapeHtml(m.title)}
        </h4>
        <p class="mt-2.5 text-sm sm:text-[15px] text-cream/75 leading-relaxed">
          ${escapeHtml(m.desc)}
        </p>
      </article>
    `
    )
    .join('');
}

function renderCoreValues() {
  const grid = document.getElementById('values-grid');
  if (!grid) return;

  grid.innerHTML = SITE_DATA.coreValues
    .map((v, idx) => {
      const pillClass =
        idx % 2 === 0
          ? 'bg-yellowbrand/55 text-charcoal'
          : 'bg-magenta/10 text-magenta';

      return `
        <article class="p-6 sm:p-7 rounded-3xl bg-white hairline-border hover:shadow-swiss transition-all duration-200">
          <div class="mb-5">
            <span class="inline-block text-xs font-extrabold px-3 py-1 rounded-full ${pillClass}">
              ${escapeHtml(v.num)}
            </span>
          </div>
          <h3 class="text-lg sm:text-xl font-extrabold tracking-tight text-charcoal">
            ${escapeHtml(v.title)}
          </h3>
          <p class="mt-2.5 text-sm text-charcoal/75 leading-relaxed">
            ${escapeHtml(v.desc)}
          </p>
        </article>
      `;
    })
    .join('');
}

// =========================================================================
// ORGANOGRAM PERIOD SWITCHER & HELPERS
// =========================================================================
function switchOrgPeriod(period) {
  if (!SITE_DATA.organogramByYear[period]) return;
  activeOrgPeriod = period;
  activeOrgUnitId = null;

  ['2026', '2025'].forEach((yr) => {
    const btn = document.getElementById(`period-btn-${yr}`);
    if (!btn) return;
    const isActive = yr === period;
    btn.setAttribute('aria-selected', String(isActive));
    if (isActive) {
      btn.classList.add('bg-charcoal', 'text-cream', 'shadow-xs');
      btn.classList.remove('text-charcoal/75', 'hover:text-charcoal');
    } else {
      btn.classList.remove('bg-charcoal', 'text-cream', 'shadow-xs');
      btn.classList.add('text-charcoal/75', 'hover:text-charcoal');
    }
  });

  renderOrganogram();
}

function slugifyName(name) {
  return String(name || 'member')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function renderOrgNodeButton(unit, variant = 'division') {
  if (!unit) return '';
  const countLabel = `${unit.members.length} Orang`;
  const isSelected = activeOrgUnitId === unit.id ? 'is-active' : '';

  // 1. PRESIDENT CARD: Dark card with signature top Magenta -> Yellow -> Magenta gradient strip
  if (variant === 'president') {
    return `
      <button
        type="button"
        onclick="openOrgDrawer('${unit.id}')"
        class="org-node ${isSelected} w-72 text-left rounded-2xl bg-charcoal text-white overflow-hidden shadow-md relative cursor-pointer focus:outline-none"
      >
        <div
          class="h-1.5 w-full"
          style="background: linear-gradient(90deg, #E5006E 0%, #FFCE13 50%, #E5006E 100%);"
        ></div>
        <div class="p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-yellowbrand">
              ${escapeHtml(unit.shortCode)}
            </span>
            <span class="text-xs font-medium text-white/60">
              ${countLabel}
            </span>
          </div>
          <div class="text-xl font-extrabold tracking-tight text-white mt-2">
            ${escapeHtml(unit.title)}
          </div>
          <div class="text-xs text-white/75 mt-1 truncate">
            ${escapeHtml(unit.subtitle)}
          </div>
        </div>
      </button>
    `;
  }

  // 2. GENSEC / VP INTERNAL / VP EXTERNAL CARDS: Clean white card
  if (variant === 'core') {
    const hasShortCode = Boolean(unit.shortCode && unit.shortCode.trim());
    if (!hasShortCode) {
      return `
        <button
          type="button"
          onclick="openOrgDrawer('${unit.id}')"
          class="org-node ${isSelected} w-64 text-left rounded-2xl bg-white border border-charcoal/10 p-5 cursor-pointer hover:border-charcoal/25 hover:shadow-md transition-all focus:outline-none"
        >
          <div class="flex items-center justify-between gap-2">
            <span class="text-base font-extrabold tracking-tight text-charcoal">
              ${escapeHtml(unit.title)}
            </span>
            <span class="text-xs font-medium text-charcoal/55 whitespace-nowrap">
              ${countLabel}
            </span>
          </div>
          <div class="text-xs text-charcoal/60 mt-1.5 truncate">
            ${escapeHtml(unit.subtitle)}
          </div>
        </button>
      `;
    }

    return `
      <button
        type="button"
        onclick="openOrgDrawer('${unit.id}')"
        class="org-node ${isSelected} w-64 text-left rounded-2xl bg-white border border-charcoal/10 p-5 cursor-pointer hover:border-charcoal/25 hover:shadow-md transition-all focus:outline-none"
      >
        <div class="flex items-center justify-between gap-2">
          <span class="text-[11px] font-extrabold uppercase tracking-[0.14em] text-magenta">
            ${escapeHtml(unit.shortCode)}
          </span>
          <span class="text-xs font-medium text-charcoal/55">
            ${countLabel}
          </span>
        </div>
        <div class="text-base font-extrabold tracking-tight text-charcoal mt-2">
          ${escapeHtml(unit.title)}
        </div>
        <div class="text-xs text-charcoal/60 mt-0.5 truncate">
          ${escapeHtml(unit.subtitle)}
        </div>
      </button>
    `;
  }

  // 3. DIVISION CARDS: Strict equal-height flex column, soft yellow pill left, plain gray count right
  return `
    <button
      type="button"
      onclick="openOrgDrawer('${unit.id}')"
      class="org-node ${isSelected} w-full h-full min-h-[212px] flex flex-col justify-between bg-white rounded-2xl border border-charcoal/10 p-5 text-left cursor-pointer hover:border-charcoal/25 hover:shadow-md transition-all focus:outline-none"
    >
      <div>
        <div class="flex items-center justify-between gap-2">
          <span class="inline-block bg-yellowbrand/55 text-charcoal text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
            ${escapeHtml(unit.shortCode)}
          </span>
          <span class="text-xs font-medium text-charcoal/55 whitespace-nowrap">
            ${countLabel}
          </span>
        </div>
        <div class="text-[15px] font-extrabold tracking-tight text-charcoal leading-snug mt-3.5">
          ${escapeHtml(unit.title)}
        </div>
        <div class="text-xs text-charcoal/60 mt-1.5 leading-relaxed">
          ${escapeHtml(unit.subtitle)}
        </div>
      </div>
      <div class="mt-5 pt-3.5 hairline-t flex items-center justify-between text-xs font-bold text-magenta">
        <span>Lihat Pengurus</span>
        <span aria-hidden="true">&rarr;</span>
      </div>
    </button>
  `;
}

function renderOrganogram() {
  const container = document.getElementById('organogram-tree');
  if (!container) return;

  const periodData = SITE_DATA.organogramByYear[activeOrgPeriod];
  if (!periodData) return;
  const u = periodData.units;

  if (periodData.hasVP) {
    // Periode 2026: President -> GENSEC side branch -> VPI (2 cols) & VPE (3 cols) -> 5 Equal-Height Divisions
    container.innerHTML = `
      <div class="flex flex-col items-center w-full">
        <!-- Tier 1: President -->
        <div class="flex justify-center">
          ${renderOrgNodeButton(u['president'], 'president')}
        </div>

        <!-- Tier 1.5: General Secretary Side Branch -->
        <div class="tree-gs-row">
          <div class="tree-gs-left">
            ${renderOrgNodeButton(u['general-secretary'], 'core')}
          </div>
          <div class="tree-gs-spine"></div>
          <div></div>
        </div>

        <!-- Tier 2 & 3: Unified 5-Column Grid for VPI/VPE + 5 Equal-Height Divisions -->
        <div class="tree-grid-5">
          <!-- Top Bridge Connector from Center Trunk to VPI (center of cols 1-2) & VPE (center of cols 3-5) -->
          <div class="col-span-5 relative h-6">
            <div class="tree-line absolute top-0 h-[1px]" style="left: calc((100% - 64px) * 0.2 + 8px); right: calc((100% - 64px) * 0.3 + 16px);"></div>
            <div class="tree-line absolute top-0 w-[1px] h-6" style="left: calc((100% - 64px) * 0.2 + 8px);"></div>
            <div class="tree-line absolute top-0 w-[1px] h-6" style="right: calc((100% - 64px) * 0.3 + 16px);"></div>
          </div>

          <!-- Row 2: VP Internal (cols 1-2) & VP External (cols 3-5) -->
          <div class="col-span-2 flex justify-center">
            ${renderOrgNodeButton(u['vp-internal'], 'core')}
          </div>
          <div class="col-span-3 flex justify-center">
            ${renderOrgNodeButton(u['vp-external'], 'core')}
          </div>

          <!-- Row 3: Branch Connectors from VPI -> 2 Divisions and VPE -> 3 Divisions -->
          <div class="col-span-2 relative h-11">
            <div class="tree-line absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[22px]"></div>
            <div class="tree-line absolute top-[22px] h-[1px]" style="left: calc((100% - 16px) / 4); right: calc((100% - 16px) / 4);"></div>
            <div class="tree-line absolute top-[22px] w-[1px] h-[22px]" style="left: calc((100% - 16px) / 4);"></div>
            <div class="tree-line absolute top-[22px] w-[1px] h-[22px]" style="right: calc((100% - 16px) / 4);"></div>
          </div>
          <div class="col-span-3 relative h-11">
            <div class="tree-line absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[22px]"></div>
            <div class="tree-line absolute top-[22px] h-[1px]" style="left: calc((100% - 32px) / 6); right: calc((100% - 32px) / 6);"></div>
            <div class="tree-line absolute top-[22px] w-[1px] h-[22px]" style="left: calc((100% - 32px) / 6);"></div>
            <div class="tree-line absolute top-[22px] left-1/2 -translate-x-1/2 w-[1px] h-[22px]"></div>
            <div class="tree-line absolute top-[22px] w-[1px] h-[22px]" style="right: calc((100% - 32px) / 6);"></div>
          </div>

          <!-- Row 4: All 5 Division Cards in the SAME Grid Row (100% Equal Height & Width) -->
          <div class="h-full">${renderOrgNodeButton(u['program-event'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['talent-community'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['branding-media'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['external-relation'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['business-development'], 'division')}</div>
        </div>
      </div>
    `;
  } else {
    // Periode 2025: President -> GENSEC side branch -> Direct 5 Equal-Height Divisions
    container.innerHTML = `
      <div class="flex flex-col items-center w-full">
        <!-- Tier 1: President -->
        <div class="flex justify-center">
          ${renderOrgNodeButton(u['president'], 'president')}
        </div>

        <!-- Tier 1.5: General Secretary Side Branch -->
        <div class="tree-gs-row">
          <div class="tree-gs-left">
            ${renderOrgNodeButton(u['general-secretary'], 'core')}
          </div>
          <div class="tree-gs-spine"></div>
          <div></div>
        </div>

        <!-- Tier 2: Direct 5-Division Unified Grid -->
        <div class="tree-grid-5">
          <!-- Horizontal Distribution Bar & 5 Centered Vertical Drops -->
          <div class="col-span-5 relative h-7">
            <div class="tree-line absolute top-0 h-[1px]" style="left: calc((100% - 64px) / 10); right: calc((100% - 64px) / 10);"></div>
            <div class="tree-line absolute top-0 w-[1px] h-7" style="left: calc((100% - 64px) / 10);"></div>
            <div class="tree-line absolute top-0 w-[1px] h-7" style="left: calc((100% - 64px) * 0.3 + 16px);"></div>
            <div class="tree-line absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-7"></div>
            <div class="tree-line absolute top-0 w-[1px] h-7" style="right: calc((100% - 64px) * 0.3 + 16px);"></div>
            <div class="tree-line absolute top-0 w-[1px] h-7" style="right: calc((100% - 64px) / 10);"></div>
          </div>

          <!-- All 5 Division Cards in the SAME Grid Row -->
          <div class="h-full">${renderOrgNodeButton(u['program-event'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['talent-community'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['branding-media'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['external-relation'], 'division')}</div>
          <div class="h-full">${renderOrgNodeButton(u['business-development'], 'division')}</div>
        </div>
      </div>
    `;
  }
}

function openOrgDrawer(unitId) {
  const periodData = SITE_DATA.organogramByYear[activeOrgPeriod];
  const unit = periodData && periodData.units[unitId];
  if (!unit) return;

  activeOrgUnitId = unitId;
  renderOrganogram();

  const modal = document.getElementById('org-overlay-modal');
  document.getElementById('drawer-level-badge').textContent = unit.levelLabel;
  document.getElementById('drawer-count').textContent = `${unit.members.length} Orang`;
  document.getElementById('drawer-title').textContent = unit.title;
  document.getElementById('drawer-desc').textContent = unit.description;
  document.getElementById('drawer-footer-label').textContent = `Data Struktural Resmi • FEBerbisnis ${activeOrgPeriod}`;

  const listEl = document.getElementById('drawer-members-list');
  let staffColorIndex = 0;

  listEl.innerHTML = unit.members
    .map((member) => {
      const isLeader = !/staff/i.test(member.role);
      const initials = getInitials(member.name);
      const photoPath = `assets/img/org/${activeOrgPeriod}/${slugifyName(member.name)}.jpg`;

      // Cycle fallback avatar colors: Magenta for Leaders, alternating Yellow & Charcoal for Staff
      let avatarClass = 'bg-magenta text-white';
      if (!isLeader) {
        avatarClass = staffColorIndex % 2 === 0 ? 'bg-yellowbrand text-charcoal' : 'bg-charcoal text-cream';
        staffColorIndex += 1;
      }

      const roleBadgeClass = isLeader
        ? 'bg-magenta text-white'
        : 'bg-yellowbrand text-charcoal';

      const subtitleText =
        member.major && member.batch
          ? `${member.major} • Angkatan ${member.batch}`
          : member.major || (member.batch ? `Angkatan ${member.batch}` : '');

      return `
        <article class="aspect-[3/4] rounded-2xl overflow-hidden relative border border-charcoal/10 bg-cream swiss-grid-bg shadow-xs group">
          <!-- Fallback Editorial Avatar (shown cleanly until real portrait photo is uploaded) -->
          <div class="absolute inset-0 flex items-center justify-center pb-14">
            <div class="w-24 h-24 rounded-full ${avatarClass} flex items-center justify-center text-2xl font-extrabold tracking-tight shadow-sm">
              ${escapeHtml(initials)}
            </div>
          </div>

          <!-- Full-Bleed Real Portrait Photo Slot (assets/img/org/{year}/{nama-slug}.jpg) -->
          <img
            src="${photoPath}"
            alt="${escapeHtml(member.name)}"
            class="absolute inset-0 w-full h-full object-cover object-top"
            onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
          />

          <!-- Smooth Dark Bottom Gradient Scrim for High Legibility -->
          <div class="member-name-overlay absolute inset-x-0 bottom-0 h-[56%] pointer-events-none"></div>

          <!-- Bottom Overlay Info: Role Pill, Name & Major/Batch -->
          <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10">
            <span class="inline-block text-[10px] font-extrabold uppercase tracking-[0.12em] px-2.5 py-1 rounded-md ${roleBadgeClass} mb-2">
              ${escapeHtml(member.role)}
            </span>
            <h4 class="text-white font-bold text-base leading-snug">
              ${escapeHtml(member.name)}
            </h4>
            ${
              subtitleText
                ? `<p class="text-white/75 text-xs mt-0.5">${escapeHtml(subtitleText)}</p>`
                : ''
            }
          </div>
        </article>
      `;
    })
    .join('');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeOrgDrawer() {
  const modal = document.getElementById('org-overlay-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  activeOrgUnitId = null;
  renderOrganogram();
}

// =========================================================================
// PROGRAM & EVENTS + PUBLICATION MODAL
// =========================================================================
function renderProgramFilters() {
  const container = document.getElementById('program-filters');
  if (!container) return;

  const categories = ['Semua', ...SITE_DATA.programs.map((p) => p.category)];
  container.innerHTML = categories
    .map((cat) => {
      const isActive = activeProgramCategory === cat;
      return `
        <button
          type="button"
          onclick="setProgramFilter('${cat.replace(/'/g, "\\'")}')"
          role="tab"
          aria-selected="${isActive}"
          class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
            isActive
              ? 'bg-charcoal text-cream shadow-xs'
              : 'bg-white/80 text-charcoal/75 hairline-border hover:border-magenta hover:text-magenta'
          }"
        >
          ${escapeHtml(cat)}
        </button>
      `;
    })
    .join('');
}

function setProgramFilter(category) {
  activeProgramCategory = category;
  renderProgramFilters();
  renderProgramsGrid();
}

function renderProgramsGrid() {
  const grid = document.getElementById('programs-grid');
  if (!grid) return;

  const filtered =
    activeProgramCategory === 'Semua'
      ? SITE_DATA.programs
      : SITE_DATA.programs.filter((p) => p.category === activeProgramCategory);

  grid.innerHTML = filtered
    .map(
      (program) => `
      <article
        onclick="openProgramModal('${program.id}')"
        class="cursor-pointer rounded-3xl bg-white/90 hairline-border overflow-hidden shadow-swiss hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
      >
        <div>
          <div
            class="h-44 sm:h-48 p-6 flex flex-col justify-between relative overflow-hidden"
            style="background: linear-gradient(125deg, ${program.palette.from}, ${program.palette.to});"
          >
            <div class="flex items-center justify-between relative z-10">
              <span class="text-[11px] font-extrabold uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-cream/90 text-charcoal">
                ${escapeHtml(program.category)}
              </span>
              <span class="text-3xl font-extrabold text-cream/35">${escapeHtml(program.index)}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white relative z-10">
              ${escapeHtml(program.title)}
            </h2>
          </div>

          <div class="p-6 sm:p-7">
            <p class="text-sm sm:text-[15px] text-charcoal/80 leading-relaxed">
              ${escapeHtml(program.shortDesc)}
            </p>
          </div>
        </div>

        <div class="px-6 sm:px-7 pb-6 pt-4 hairline-t flex items-center justify-between">
          <span class="text-xs font-semibold text-charcoal/55">Publikasi &amp; Dokumentasi</span>
          <span class="text-xs sm:text-sm font-extrabold text-magenta group-hover:translate-x-1 transition-transform">
            Baca Detail &rarr;
          </span>
        </div>
      </article>
    `
    )
    .join('');
}

function openProgramModal(programId) {
  const program = SITE_DATA.programs.find((p) => p.id === programId);
  if (!program) return;

  document.getElementById('modal-program-category').textContent = program.category;
  document.getElementById('modal-program-title').textContent = program.title;
  document.getElementById('modal-program-background').textContent = program.publication.background;
  document.getElementById('modal-program-focus').textContent = program.publication.focus;
  document.getElementById('modal-program-impact').textContent = program.publication.impact;

  const galleryEl = document.getElementById('modal-program-gallery');
  galleryEl.innerHTML = program.gallery
    .map(
      (item, idx) => `
      <figure class="rounded-2xl overflow-hidden hairline-border bg-white">
        <div
          class="aspect-[16/10] p-5 flex flex-col justify-between relative overflow-hidden"
          style="background: linear-gradient(${idx % 2 === 0 ? '130deg' : '220deg'}, ${program.palette.from}, ${program.palette.to});"
        >
          <span class="text-[10px] font-extrabold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-cream/90 text-charcoal w-fit">
            ${escapeHtml(item.label)}
          </span>
          <span class="text-xs font-bold text-white/85">Dokumentasi Kegiatan FEBerbisnis</span>
        </div>
        <figcaption class="p-3.5 text-xs text-charcoal/75 leading-relaxed">
          ${escapeHtml(item.caption)}
        </figcaption>
      </figure>
    `
    )
    .join('');

  const modal = document.getElementById('program-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeProgramModal() {
  const modal = document.getElementById('program-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// =========================================================================
// COMMUNITY HUB (MEMBER BUSINESSES & INTEREST CONNECT)
// =========================================================================
function switchCommunitySubtab(subtab) {
  activeCommunitySubtab = subtab;
  const btnBiz = document.getElementById('community-subtab-businesses');
  const btnInt = document.getElementById('community-subtab-interests');
  const panelBiz = document.getElementById('community-panel-businesses');
  const panelInt = document.getElementById('community-panel-interests');

  const isBiz = subtab === 'businesses';
  if (panelBiz) panelBiz.classList.toggle('hidden', !isBiz);
  if (panelInt) panelInt.classList.toggle('hidden', isBiz);

  const styleBtn = (btn, active) => {
    if (!btn) return;
    btn.setAttribute('aria-selected', String(active));
    if (active) {
      btn.classList.add('bg-charcoal', 'text-cream', 'shadow-xs');
      btn.classList.remove('text-charcoal/75', 'hover:text-charcoal');
    } else {
      btn.classList.remove('bg-charcoal', 'text-cream', 'shadow-xs');
      btn.classList.add('text-charcoal/75', 'hover:text-charcoal');
    }
  };

  styleBtn(btnBiz, isBiz);
  styleBtn(btnInt, !isBiz);
}

function generateVisualCardSVG(title, subtitle, palette) {
  const bg = (palette && palette.bg) || '#343333';
  const a1 = (palette && palette.accent1) || '#E5006E';
  const a2 = (palette && palette.accent2) || '#FFCE13';
  return `
    <svg viewBox="0 0 600 450" class="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="450" fill="${bg}" />
      <circle cx="490" cy="95" r="130" fill="${a1}" fill-opacity="0.88" />
      <circle cx="105" cy="375" r="115" fill="${a2}" fill-opacity="0.68" />
      <text x="36" y="345" fill="#FEF6EB" font-family="Plus Jakarta Sans, sans-serif" font-size="28" font-weight="800">
        ${escapeHtml(title)}
      </text>
      <text x="36" y="380" fill="#FEF6EB" fill-opacity="0.72" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600">
        ${escapeHtml(subtitle)}
      </text>
    </svg>
  `;
}

function renderCommunityBizFilters() {
  const container = document.getElementById('community-biz-filters');
  if (!container) return;

  const cats = ['Semua', ...new Set(SITE_DATA.communityBusinesses.map((b) => b.category))];
  container.innerHTML = cats
    .map((cat) => {
      const isActive = activeCommunityBizFilter === cat;
      return `
        <button
          type="button"
          onclick="setCommunityBizFilter('${cat.replace(/'/g, "\\'")}')"
          class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
            isActive
              ? 'bg-charcoal text-cream shadow-xs'
              : 'bg-white/85 text-charcoal/75 hairline-border hover:border-magenta hover:text-magenta'
          }"
        >
          ${escapeHtml(cat)}
        </button>
      `;
    })
    .join('');
}

function setCommunityBizFilter(cat) {
  activeCommunityBizFilter = cat;
  renderCommunityBizFilters();
  renderCommunityBusinesses();
}

function renderCommunityBusinesses() {
  const grid = document.getElementById('community-biz-grid');
  const countEl = document.getElementById('community-biz-count');
  if (!grid) return;

  const filtered =
    activeCommunityBizFilter === 'Semua'
      ? SITE_DATA.communityBusinesses
      : SITE_DATA.communityBusinesses.filter((b) => b.category === activeCommunityBizFilter);

  if (countEl) countEl.textContent = `Menampilkan ${filtered.length} bisnis member`;

  grid.innerHTML = filtered
    .map(
      (biz) => `
      <article
        onclick="openCommunityBizModal('${biz.id}')"
        class="cursor-pointer rounded-3xl bg-white/95 hairline-border overflow-hidden shadow-swiss hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
      >
        <div>
          <div class="aspect-[16/10] relative overflow-hidden bg-charcoal">
            ${generateVisualCardSVG(biz.name, biz.instagramHandle, biz.palette)}
            <img
              src="${biz.photo}"
              alt="${escapeHtml(biz.name)}"
              class="absolute inset-0 w-full h-full object-cover"
              onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
            />
            <span class="absolute top-3.5 left-3.5 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-yellowbrand text-charcoal shadow-xs">
              ${escapeHtml(biz.category)}
            </span>
          </div>

          <div class="p-6">
            <h3 class="text-xl font-extrabold tracking-tight text-charcoal group-hover:text-magenta transition-colors">
              ${escapeHtml(biz.name)}
            </h3>
            <p class="text-xs font-semibold text-charcoal/55 mt-1">
              Founder: ${escapeHtml(biz.founder)} &bull; ${escapeHtml(biz.major)} ${escapeHtml(biz.batch)}
            </p>
            <p class="mt-3 text-sm text-charcoal/75 leading-relaxed">
              ${escapeHtml(biz.tagline)}
            </p>
          </div>
        </div>

        <div class="px-6 pb-5 pt-3.5 hairline-t flex items-center justify-between text-xs font-bold">
          <span class="text-charcoal/60">${escapeHtml(biz.instagramHandle)}</span>
          <span class="text-magenta group-hover:translate-x-1 transition-transform">Lihat Detail &rarr;</span>
        </div>
      </article>
    `
    )
    .join('');
}

function openCommunityBizModal(bizId) {
  const biz = SITE_DATA.communityBusinesses.find((b) => b.id === bizId);
  if (!biz) return;

  document.getElementById('community-modal-badge').textContent = `Member Business • ${biz.category}`;
  document.getElementById('community-modal-title').textContent = biz.name;

  document.getElementById('community-modal-body').innerHTML = `
    <div class="aspect-[16/9] rounded-2xl overflow-hidden border border-charcoal/15 relative bg-charcoal">
      ${generateVisualCardSVG(biz.name, biz.instagramHandle, biz.palette)}
      <img
        src="${biz.photo}"
        alt="${escapeHtml(biz.name)}"
        class="absolute inset-0 w-full h-full object-cover"
        onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
      />
    </div>

    <div class="p-4 rounded-2xl bg-white/85 hairline-border flex flex-wrap items-center justify-between gap-3">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-charcoal/55 block">Founder</span>
        <span class="text-sm font-extrabold text-charcoal">${escapeHtml(biz.founder)}</span>
        <span class="text-xs text-charcoal/65 block">${escapeHtml(biz.major)} &bull; Angkatan ${escapeHtml(biz.batch)}</span>
      </div>
      <span class="text-xs font-bold px-3 py-1 rounded-full bg-cream hairline-border text-charcoal">
        ${escapeHtml(biz.instagramHandle)}
      </span>
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-magenta mb-2">Tentang Bisnis</h4>
      <p class="text-sm sm:text-[15px] text-charcoal/80 leading-relaxed">${escapeHtml(biz.story)}</p>
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-charcoal/60 mb-2.5">Produk / Layanan Utama</h4>
      <div class="flex flex-wrap gap-2">
        ${biz.offerings
          .map(
            (item) => `
            <span class="text-xs font-semibold px-3 py-1.5 rounded-full bg-white hairline-border text-charcoal">
              ${escapeHtml(item)}
            </span>
          `
          )
          .join('')}
      </div>
    </div>

    <div class="pt-4 hairline-t flex flex-col sm:flex-row gap-3">
      <a
        href="${biz.instagramUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-magenta hover:bg-charcoal text-white text-sm font-bold transition-colors"
      >
        <span>Kunjungi Instagram (${escapeHtml(biz.instagramHandle)})</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  `;

  const modal = document.getElementById('community-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function renderCommunityInterestFilters() {
  const container = document.getElementById('community-interest-filters');
  if (!container) return;

  const allInterests = ['Semua', 'F&B', 'Fashion', 'Digital & Tech', 'Creative', 'Lainnya'];
  container.innerHTML = allInterests
    .map((item) => {
      const isActive = activeCommunityInterestFilter === item;
      return `
        <button
          type="button"
          onclick="setCommunityInterestFilter('${item.replace(/'/g, "\\'")}')"
          class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
            isActive
              ? 'bg-charcoal text-cream shadow-xs'
              : 'bg-white/85 text-charcoal/75 hairline-border hover:border-magenta hover:text-magenta'
          }"
        >
          ${escapeHtml(item)}
        </button>
      `;
    })
    .join('');
}

function setCommunityInterestFilter(interest) {
  activeCommunityInterestFilter = interest;
  renderCommunityInterestFilters();
  renderCommunityInterests();
}

function renderCommunityInterests() {
  const grid = document.getElementById('community-interest-grid');
  const countEl = document.getElementById('community-interest-count');
  if (!grid) return;

  const filtered =
    activeCommunityInterestFilter === 'Semua'
      ? SITE_DATA.communityInterests
      : SITE_DATA.communityInterests.filter((m) => m.interests.includes(activeCommunityInterestFilter));

  if (countEl) countEl.textContent = `Menampilkan ${filtered.length} member`;

  grid.innerHTML = filtered
    .map(
      (member) => `
      <article
        onclick="openCommunityInterestModal('${member.id}')"
        class="cursor-pointer rounded-3xl bg-white/95 hairline-border p-6 shadow-swiss hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
      >
        <div>
          <div class="flex items-center gap-3.5 mb-4">
            <div class="w-12 h-12 rounded-2xl bg-charcoal text-yellowbrand font-extrabold text-base flex items-center justify-center shrink-0">
              ${escapeHtml(getInitials(member.name))}
            </div>
            <div class="min-w-0">
              <h3 class="text-lg font-extrabold tracking-tight text-charcoal truncate group-hover:text-magenta transition-colors">
                ${escapeHtml(member.name)}
              </h3>
              <p class="text-xs text-charcoal/60 truncate">
                ${escapeHtml(member.major)} &bull; ${escapeHtml(member.batch)}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 mb-4">
            ${member.interests
              .map(
                (tag) => `
                <span class="text-[11px] font-bold px-2.5 py-1 rounded-full bg-magenta/10 text-magenta">
                  ${escapeHtml(tag)}
                </span>
              `
              )
              .join('')}
          </div>

          <p class="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
            ${escapeHtml(member.lookingFor)}
          </p>
        </div>

        <div class="mt-5 pt-3.5 hairline-t flex items-center justify-between text-xs font-bold">
          <span class="text-charcoal/55">${escapeHtml(member.skills.join(' • '))}</span>
          <span class="text-magenta shrink-0 ml-2">Connect &rarr;</span>
        </div>
      </article>
    `
    )
    .join('');
}

function openCommunityInterestModal(memberId) {
  const member = SITE_DATA.communityInterests.find((m) => m.id === memberId);
  if (!member) return;

  document.getElementById('community-modal-badge').textContent = 'Interest Connect';
  document.getElementById('community-modal-title').textContent = member.name;

  document.getElementById('community-modal-body').innerHTML = `
    <div class="flex items-center gap-4 p-4 rounded-2xl bg-white/85 hairline-border">
      <div class="w-14 h-14 rounded-2xl bg-charcoal text-yellowbrand font-extrabold text-xl flex items-center justify-center shrink-0">
        ${escapeHtml(getInitials(member.name))}
      </div>
      <div>
        <div class="text-base font-extrabold text-charcoal">${escapeHtml(member.name)}</div>
        <div class="text-xs text-charcoal/65">${escapeHtml(member.major)} &bull; Angkatan ${escapeHtml(member.batch)}</div>
      </div>
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-magenta mb-2">Bidang yang Diminati</h4>
      <div class="flex flex-wrap gap-2">
        ${member.interests
          .map(
            (tag) => `
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-magenta/10 text-magenta">
              ${escapeHtml(tag)}
            </span>
          `
          )
          .join('')}
      </div>
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-charcoal/60 mb-2">Keahlian / Skill</h4>
      <div class="flex flex-wrap gap-2">
        ${member.skills
          .map(
            (skill) => `
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-yellowbrand/50 text-charcoal">
              ${escapeHtml(skill)}
            </span>
          `
          )
          .join('')}
      </div>
    </div>

    <div class="p-4 rounded-2xl bg-white/85 hairline-border space-y-2">
      <h4 class="text-xs font-bold uppercase tracking-[0.14em] text-charcoal/60">Sedang Mencari &amp; Bio</h4>
      <p class="text-sm font-bold text-charcoal">${escapeHtml(member.lookingFor)}</p>
      <p class="text-sm text-charcoal/75 leading-relaxed">${escapeHtml(member.bio)}</p>
    </div>

    <div class="pt-4 hairline-t">
      <a
        href="${member.instagramUrl}"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-charcoal hover:bg-magenta text-cream text-sm font-bold transition-colors"
      >
        <span>Connect via Instagram (${escapeHtml(member.instagramHandle)})</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  `;

  const modal = document.getElementById('community-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeCommunityModal() {
  const modal = document.getElementById('community-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// =========================================================================
// SHOP (OFFICIAL MERCH & MEMBER'S SHOP + MULTI-PHOTO OVERLAY)
// =========================================================================
function renderShopCardHTML(product, isMerch = false) {
  const firstPhoto = product.photos && product.photos[0] ? product.photos[0] : { src: '', label: product.title };
  const bizBadgeClass = isMerch
    ? 'bg-magenta text-white'
    : 'bg-yellowbrand text-charcoal';

  return `
    <article
      onclick="openShopModal('${product.id}')"
      class="cursor-pointer rounded-3xl bg-white/95 hairline-border overflow-hidden shadow-swiss hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
    >
      <div>
        <!-- Product Visual Stage (1:1) -->
        <div class="aspect-square relative overflow-hidden bg-charcoal">
          ${generateVisualCardSVG(product.title, firstPhoto.label, product.palette)}
          <img
            src="${firstPhoto.src}"
            alt="${escapeHtml(product.title)}"
            class="absolute inset-0 w-full h-full object-cover"
            onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
          />
          <!-- Top-Left Business Name Badge -->
          <span class="absolute top-3.5 left-3.5 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full ${bizBadgeClass} shadow-xs">
            ${escapeHtml(product.businessName)}
          </span>
          <!-- Top-Right Product Type Pill -->
          <span class="absolute top-3.5 right-3.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-cream/90 text-charcoal">
            ${escapeHtml(product.productType)}
          </span>
        </div>

        <div class="p-5 sm:p-6">
          <h3 class="text-lg font-extrabold tracking-tight text-charcoal leading-snug group-hover:text-magenta transition-colors">
            ${escapeHtml(product.title)}
          </h3>
          <p class="mt-1.5 text-lg font-extrabold text-magenta">
            ${formatRupiah(product.price)}
          </p>
          <p class="mt-2 text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-2">
            ${escapeHtml(product.shortDesc)}
          </p>
        </div>
      </div>

      <div class="px-5 sm:px-6 pb-5 pt-3.5 hairline-t flex items-center justify-between gap-3">
        <span class="text-xs font-bold text-charcoal/55 group-hover:text-charcoal transition-colors">
          Lihat Detail
        </span>
        <a
          href="${product.instagramUrl}"
          target="_blank"
          rel="noopener noreferrer"
          onclick="event.stopPropagation()"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal hover:bg-magenta text-cream text-xs font-bold transition-colors"
        >
          <span>Order</span>
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  `;
}

function renderShopOfficialMerch() {
  const grid = document.getElementById('shop-merch-grid');
  if (!grid) return;
  grid.innerHTML = SITE_DATA.shopOfficialMerch.map((p) => renderShopCardHTML(p, true)).join('');
}

function renderShopMemberFilters() {
  const container = document.getElementById('shop-member-filters');
  if (!container) return;

  const filters = ['Semua', 'Produk Fisik', 'Produk Digital'];
  container.innerHTML = filters
    .map((type) => {
      const isActive = activeShopMemberFilter === type;
      return `
        <button
          type="button"
          onclick="setShopMemberFilter('${type}')"
          role="tab"
          aria-selected="${isActive}"
          class="px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
            isActive
              ? 'bg-charcoal text-cream shadow-xs'
              : 'bg-white/90 text-charcoal/75 hairline-border hover:border-magenta hover:text-magenta'
          }"
        >
          ${escapeHtml(type)}
        </button>
      `;
    })
    .join('');
}

function setShopMemberFilter(type) {
  activeShopMemberFilter = type;
  renderShopMemberFilters();
  renderShopMemberProducts();
}

function renderShopMemberProducts() {
  const grid = document.getElementById('shop-member-grid');
  if (!grid) return;

  const filtered =
    activeShopMemberFilter === 'Semua'
      ? SITE_DATA.shopMemberProducts
      : SITE_DATA.shopMemberProducts.filter((p) => p.productType === activeShopMemberFilter);

  grid.innerHTML = filtered.map((p) => renderShopCardHTML(p, false)).join('');
}

function openShopModal(productId) {
  const allProducts = [...SITE_DATA.shopOfficialMerch, ...SITE_DATA.shopMemberProducts];
  const product = allProducts.find((p) => p.id === productId);
  if (!product) return;

  activeShopModalProduct = product;
  activeShopPhotoIndex = 0;

  document.getElementById('shop-modal-biz').textContent = product.businessName;
  document.getElementById('shop-modal-type').textContent = product.productType;
  document.getElementById('shop-modal-title').textContent = product.title;
  document.getElementById('shop-modal-price').textContent = formatRupiah(product.price);
  document.getElementById('shop-modal-desc').textContent = product.description;

  document.getElementById('shop-modal-specs').innerHTML = product.specs
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join('');

  const orderLink = document.getElementById('shop-modal-order-link');
  const orderText = document.getElementById('shop-modal-order-text');
  if (orderLink) orderLink.href = product.instagramUrl;
  if (orderText) orderText.textContent = `Order via Instagram (${product.instagramHandle})`;

  selectShopModalPhoto(0);

  const modal = document.getElementById('shop-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function selectShopModalPhoto(index) {
  if (!activeShopModalProduct) return;
  activeShopPhotoIndex = index;

  const photos = activeShopModalProduct.photos || [];
  const current = photos[index] || { src: '', label: activeShopModalProduct.title };
  const stage = document.getElementById('shop-modal-stage');
  const thumbs = document.getElementById('shop-modal-thumbs');

  if (stage) {
    stage.innerHTML = `
      ${generateVisualCardSVG(activeShopModalProduct.title, current.label, activeShopModalProduct.palette)}
      <img
        src="${current.src}"
        alt="${escapeHtml(current.label)}"
        class="absolute inset-0 w-full h-full object-cover"
        onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
      />
      <span class="absolute bottom-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-charcoal/80 text-cream">
        ${escapeHtml(current.label)}
      </span>
    `;
  }

  if (thumbs) {
    thumbs.innerHTML = photos
      .map(
        (ph, idx) => `
        <button
          type="button"
          onclick="selectShopModalPhoto(${idx})"
          class="aspect-square rounded-xl overflow-hidden relative border-2 transition-all ${
            idx === activeShopPhotoIndex
              ? 'border-magenta ring-2 ring-magenta/20'
              : 'border-charcoal/15 opacity-75 hover:opacity-100'
          }"
          aria-label="Lihat foto ${escapeHtml(ph.label)}"
        >
          ${generateVisualCardSVG(String(idx + 1), ph.label, activeShopModalProduct.palette)}
          <img
            src="${ph.src}"
            alt="${escapeHtml(ph.label)}"
            class="absolute inset-0 w-full h-full object-cover"
            onload="if(this.previousElementSibling) this.previousElementSibling.style.display='none';"
            onerror="this.style.display='none'"
          />
        </button>
      `
      )
      .join('');
  }
}

function closeShopModal() {
  const modal = document.getElementById('shop-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
  activeShopModalProduct = null;
}

// Close any open modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOrgDrawer();
    closeProgramModal();
    closeCommunityModal();
    closeShopModal();
    closePartnerModal();
    closePdfPreviewModal();
  }
});

// =========================================================================
// BUSINESS PLAYGROUND: HUB SWITCHER, HELP POPOVERS, ITEMIZED COST & PRESETS
// =========================================================================
const PLAYGROUND_PRESETS = {
  kopi: {
    namaUsaha: 'Es Kopi Susu',
    modalAwal: 12000000,
    modalAwalItems: [
      { name: 'Mesin Espresso / Alat Seduh', amount: 5000000 },
      { name: 'Kulkas Showcase', amount: 3000000 },
      { name: 'Booth & Meja', amount: 2500000 },
      { name: 'Stok Bahan Awal', amount: 1500000 },
    ],
    biayaRutin: 3500000,
    biayaRutinItems: [
      { name: 'Sewa Booth', amount: 1500000 },
      { name: 'Listrik & Air', amount: 400000 },
      { name: 'Internet', amount: 200000 },
      { name: 'Gaji Barista Part-time', amount: 1400000 },
    ],
    hpp: 9500,
    hppItems: [
      { name: 'Kopi & Susu', amount: 6000 },
      { name: 'Gula Aren & Es', amount: 1500 },
      { name: 'Cup & Sedotan', amount: 1500 },
      { name: 'Stiker Label', amount: 500 },
    ],
    usePlatform: true,
    platformFee: 15,
    marginPct: 40,
    hargaJual: 21000,
    targetUntung: 4500000,
  },
  baju: {
    namaUsaha: 'Brand Baju Lokal',
    modalAwal: 8000000,
    modalAwalItems: [
      { name: 'Sample & Pola', amount: 1000000 },
      { name: 'Produksi Batch Pertama', amount: 5000000 },
      { name: 'Pemotretan Katalog', amount: 1200000 },
      { name: 'Kemasan & Hangtag', amount: 800000 },
    ],
    biayaRutin: 1500000,
    biayaRutinItems: [
      { name: 'Iklan Media Sosial', amount: 800000 },
      { name: 'Langganan Aplikasi Desain', amount: 200000 },
      { name: 'Internet & Kuota', amount: 200000 },
      { name: 'Operasional Pengiriman', amount: 300000 },
    ],
    hpp: 65000,
    hppItems: [
      { name: 'Kain & Jahit Konveksi', amount: 48000 },
      { name: 'Sablon / Bordir', amount: 10000 },
      { name: 'Polybag & Hangtag', amount: 5000 },
      { name: 'Thank You Card', amount: 2000 },
    ],
    usePlatform: true,
    platformFee: 10,
    marginPct: 40,
    hargaJual: 130000,
    targetUntung: 5000000,
  },
  desain: {
    namaUsaha: 'Studio Jasa Desain',
    modalAwal: 2000000,
    modalAwalItems: [
      { name: 'Upgrade Software / Asset', amount: 800000 },
      { name: 'Pembuatan Portofolio Web', amount: 500000 },
      { name: 'Perlengkapan Kerja', amount: 700000 },
    ],
    biayaRutin: 800000,
    biayaRutinItems: [
      { name: 'Langganan Adobe / Figma', amount: 350000 },
      { name: 'Internet & Listrik', amount: 250000 },
      { name: 'Promosi Portofolio', amount: 200000 },
    ],
    hpp: 50000,
    hppItems: [
      { name: 'Lisensi Font / Stock Asset', amount: 30000 },
      { name: 'Biaya Revisi & Operasional Proyek', amount: 20000 },
    ],
    usePlatform: false,
    platformFee: 15,
    marginPct: 75,
    hargaJual: 200000,
    targetUntung: 4000000,
  },
};

// Tracks whether Harga Jual has already been established (preset / manual / margin slider)
// so adding HPP items later realistically lowers profit & margin instead of inflating price
let isPriceLockedByUser = false;

// State for custom itemized lists (Bagian A, B, C)
const playgroundItems = {
  a: [],
  b: [],
  c: [],
};

const ITEMIZED_CONFIG = {
  a: {
    singleInputId: 'pg-modal-awal',
    namePlaceholder: 'Nama item (misal: Kulkas)',
    amountPlaceholder: 'Nominal',
    defaultLabel: 'Modal Awal',
  },
  b: {
    singleInputId: 'pg-biaya-rutin',
    namePlaceholder: 'Nama biaya (misal: Listrik)',
    amountPlaceholder: 'Nominal / bln',
    defaultLabel: 'Biaya Rutin',
  },
  c: {
    singleInputId: 'pg-hpp',
    namePlaceholder: 'Komponen (misal: Cup & Sedotan)',
    amountPlaceholder: 'Biaya / produk',
    defaultLabel: 'Komponen HPP',
  },
};

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatRibuan(value) {
  const num = Math.round(Number(value) || 0);
  return num.toLocaleString('id-ID');
}

function formatRupiah(value) {
  const num = Math.round(Number(value) || 0);
  if (num < 0) {
    return `-Rp ${Math.abs(num).toLocaleString('id-ID')}`;
  }
  return `Rp ${num.toLocaleString('id-ID')}`;
}

function parseRupiahValue(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return 0;
  const digits = String(el.value || '').replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

function getActivePlatformFeePct() {
  const checkbox = document.getElementById('pg-use-platform');
  if (!checkbox || !checkbox.checked) return 0;
  const raw = parseFloat(document.getElementById('pg-platform-fee')?.value);
  if (Number.isNaN(raw) || raw < 0) return 0;
  return Math.min(raw, 60);
}

function updateSliderPinkTrack(slider) {
  if (!slider) return;
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const val = parseFloat(slider.value) || 0;
  const pct = max > min ? Math.min(Math.max(((val - min) / (max - min)) * 100, 0), 100) : 0;
  slider.style.background = `linear-gradient(to right, #E5006E 0%, #E5006E ${pct}%, rgba(52, 51, 51, 0.14) ${pct}%, rgba(52, 51, 51, 0.14) 100%)`;
}

function updateAllSliderTracks() {
  ['slider-margin', 'slider-diskon', 'slider-hpp'].forEach((id) => {
    updateSliderPinkTrack(document.getElementById(id));
  });
}

function syncMarginSliderCap() {
  const slider = document.getElementById('slider-margin');
  const maxLabel = document.getElementById('slider-margin-max-label');
  if (!slider) return;
  const adminPct = getActivePlatformFeePct();
  const maxMargin = Math.max(10, Math.min(75, Math.floor(85 - adminPct)));
  slider.max = String(maxMargin);
  if (maxLabel) maxLabel.textContent = `${maxMargin}%`;
  if (parseFloat(slider.value) > maxMargin) {
    slider.value = String(maxMargin);
    const valEl = document.getElementById('val-slider-margin');
    if (valEl) valEl.textContent = `${maxMargin}%`;
  }
  updateSliderPinkTrack(slider);
}

function computePriceFromMargin() {
  const hpp = getEffectiveSectionValue('c');
  const marginSlider = document.getElementById('slider-margin');
  const priceInput = document.getElementById('pg-harga-jual');
  if (!marginSlider || !priceInput || hpp <= 0) return;

  const marginPct = parseFloat(marginSlider.value) || 40;
  const adminPct = getActivePlatformFeePct();
  const denom = 1 - (marginPct + adminPct) / 100;
  if (denom <= 0.05) return;

  const rawPrice = hpp / denom;
  const roundedPrice = Math.max(500, Math.round(rawPrice / 500) * 500);
  priceInput.value = formatRibuan(roundedPrice);
}

function calculatePlayground() {
  const d = collectPlaygroundReportData();

  // Update optional scenario slider badges
  const diskonBadge = document.getElementById('val-slider-diskon');
  const hppBadge = document.getElementById('val-slider-hpp');
  if (diskonBadge) diskonBadge.textContent = `${d.diskonPct}%`;
  if (hppBadge) hppBadge.textContent = `+${d.kenaikanHppPct}%`;

  const hasAnyInput =
    d.modalAwal > 0 ||
    d.biayaRutin > 0 ||
    d.hppBase > 0 ||
    d.hargaJualBase > 0 ||
    d.targetUntung > 0;

  const emptyEl = document.getElementById('pg-empty-state');
  const resultEl = document.getElementById('pg-results-panel');
  if (emptyEl) emptyEl.classList.toggle('hidden', hasAnyInput);
  if (resultEl) resultEl.classList.toggle('hidden', !hasAnyInput);

  if (!hasAnyInput) return;

  const scenarioTag = document.getElementById('pg-scenario-active-tag');
  if (scenarioTag) {
    scenarioTag.classList.toggle('hidden', !(d.useScenario && (d.diskonPct > 0 || d.kenaikanHppPct > 0)));
  }

  // Update status badge
  const statusBadge = document.getElementById('pg-status-badge');
  const statusDot = document.getElementById('pg-status-dot');
  const statusText = document.getElementById('pg-status-text');
  if (statusBadge && statusDot && statusText) {
    statusText.textContent = d.statusLabel;
    statusBadge.className = 'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider border';
    if (d.statusLabel === 'Sehat') {
      statusBadge.classList.add('bg-emerald-100', 'text-emerald-800', 'border-emerald-300');
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500';
    } else if (d.statusLabel === 'Waspada') {
      statusBadge.classList.add('bg-amber-100', 'text-amber-800', 'border-amber-300');
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-amber-500';
    } else {
      statusBadge.classList.add('bg-rose-100', 'text-rose-800', 'border-rose-300');
      statusDot.className = 'w-2.5 h-2.5 rounded-full bg-rose-500';
    }
  }

  // Edge-case alert banner
  const errorAlert = document.getElementById('pg-error-alert');
  const errorDetail = document.getElementById('pg-error-detail');
  if (errorAlert) {
    const showError = !d.active.valid;
    errorAlert.classList.toggle('hidden', !showError);
    if (showError && errorDetail) {
      errorDetail.textContent =
        d.hargaJualBase <= 0
          ? 'Masukkan Rencana Harga Jual atau geser slider Margin Keuntungan untuk melihat proyeksi profit & BEP.'
          : 'Harga jual efektif saat ini belum menutup HPP & potongan admin platform. Naikkan harga jual, tekan biaya HPP, atau kurangi diskon.';
    }
  }

  // Metric 1: Profit Bersih per 1 Produk
  const profitEl = document.getElementById('res-profit-unit');
  const marginEl = document.getElementById('res-margin-pct');
  const breakdownEl = document.getElementById('res-unit-breakdown');
  if (profitEl) profitEl.textContent = formatRupiah(d.active.profitUnit);
  if (marginEl) marginEl.textContent = `${d.active.marginPct.toFixed(1)}%`;
  if (breakdownEl) {
    const adminStr = d.usePlatform ? ` - Admin ${formatRupiah(d.active.adminUnit)}` : '';
    breakdownEl.textContent = `Jual ${formatRupiah(d.active.price)} - HPP ${formatRupiah(d.active.hpp)}${adminStr}`;
  }

  // Metric 2: BEP
  const bepTextEl = document.getElementById('res-bep-text');
  const bepOmzetEl = document.getElementById('res-bep-omzet');
  if (bepTextEl && bepOmzetEl) {
    if (d.active.valid) {
      bepTextEl.textContent = `${formatRibuan(d.active.bepBulan)} pcs/bulan (atau ${formatRibuan(d.active.bepHari)} pcs/hari, asumsi 30 hari)`;
      bepOmzetEl.textContent = `Omzet titik impas: ${formatRupiah(d.active.bepOmzet)}/bulan`;
    } else {
      bepTextEl.textContent = 'Belum dapat dihitung';
      bepOmzetEl.textContent = 'Pastikan harga jual lebih tinggi dari HPP & biaya admin.';
    }
  }

  // Metric 3: Target Jualan
  const targetTextEl = document.getElementById('res-target-text');
  const targetOmzetEl = document.getElementById('res-target-omzet');
  if (targetTextEl && targetOmzetEl) {
    if (d.active.valid) {
      targetTextEl.textContent = `Butuh jual ${formatRibuan(d.active.targetBulan)} pcs/bulan (${formatRibuan(d.active.targetHari)} pcs/hari)`;
      targetOmzetEl.textContent = `Estimasi omzet bulanan: ${formatRupiah(d.active.targetOmzet)}`;
    } else {
      targetTextEl.textContent = 'Belum dapat dihitung';
      targetOmzetEl.textContent = 'Estimasi omzet bulanan: Rp 0';
    }
  }

  // Metric 4: Payback Period & ROI
  const paybackEl = document.getElementById('res-payback');
  const roiEl = document.getElementById('res-roi');
  if (paybackEl) paybackEl.textContent = d.paybackText;
  if (roiEl) roiEl.textContent = d.roiText;
}

function buildPrintReportHTML() {
  const d = collectPlaygroundReportData();

  const badgeStyle =
    d.statusLabel === 'Sehat'
      ? 'background:#d1fae5;color:#065f46;border:1px solid #6ee7b7;'
      : d.statusLabel === 'Waspada'
      ? 'background:#fef3c7;color:#92400e;border:1px solid #fcd34d;'
      : 'background:#ffe4e6;color:#9f1239;border:1px solid #fda4af;';

  const renderTableBlock = (title, rows, totalVal, suffix) => `
    <div class="mb-5 print-break-avoid">
      <h4 class="text-xs font-extrabold uppercase tracking-wider text-charcoal mb-2">${escapeHtml(title)}</h4>
      <table class="w-full border-collapse text-xs">
        <thead>
          <tr style="background:#FEF6EB;">
            <th class="border border-charcoal/20 px-3 py-2 text-left w-10">No</th>
            <th class="border border-charcoal/20 px-3 py-2 text-left">Uraian Item</th>
            <th class="border border-charcoal/20 px-3 py-2 text-right w-40">Nominal${escapeHtml(suffix)}</th>
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r) => `
              <tr>
                <td class="border border-charcoal/15 px-3 py-1.5 text-charcoal/70">${escapeHtml(r[0])}</td>
                <td class="border border-charcoal/15 px-3 py-1.5 text-charcoal">${escapeHtml(r[1])}</td>
                <td class="border border-charcoal/15 px-3 py-1.5 text-right font-semibold text-charcoal">${escapeHtml(r[2])}</td>
              </tr>
            `
            )
            .join('')}
          <tr style="background:#f8f8f8;">
            <td colspan="2" class="border border-charcoal/20 px-3 py-2 font-extrabold text-charcoal">Subtotal ${escapeHtml(title)}</td>
            <td class="border border-charcoal/20 px-3 py-2 text-right font-extrabold text-magenta">${formatRupiah(totalVal)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  const scenarioAppendix = d.useScenario
    ? `
      <div class="mt-6 pt-5 border-t border-charcoal/20 print-break-avoid">
        <h4 class="text-xs font-extrabold uppercase tracking-wider text-magenta mb-2">
          E. Lampiran Uji Skenario (Diskon ${d.diskonPct}%, Kenaikan Bahan +${d.kenaikanHppPct}%)
        </h4>
        <table class="w-full border-collapse text-xs">
          <thead>
            <tr style="background:#343333;color:#FEF6EB;">
              <th class="border border-charcoal px-3 py-2 text-left">Parameter</th>
              <th class="border border-charcoal px-3 py-2 text-right">Kondisi Normal</th>
              <th class="border border-charcoal px-3 py-2 text-right">Kondisi Skenario</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Harga Jual Efektif</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right">${formatRupiah(d.normal.price)}</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${formatRupiah(d.active.price)}</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">HPP Efektif / Produk</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right">${formatRupiah(d.normal.hpp)}</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${formatRupiah(d.active.hpp)}</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Profit Bersih / Produk</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right">${formatRupiah(d.normal.profitUnit)}</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${formatRupiah(d.active.profitUnit)}</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Margin Bersih</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right">${d.normal.marginPct.toFixed(1)}%</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${d.active.marginPct.toFixed(1)}%</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">BEP (Titik Balik Modal)</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right">${d.normal.valid ? `${formatRibuan(d.normal.bepBulan)} pcs/bln` : 'Tidak tercapai'}</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${d.active.valid ? `${formatRibuan(d.active.bepBulan)} pcs/bln` : 'Tidak tercapai'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
    : '';

  return `
    <div class="text-charcoal font-sans">
      <!-- Report Kop -->
      <div class="pb-4 mb-5 border-b-2 border-charcoal flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-[10px] font-extrabold uppercase tracking-[0.16em] text-magenta">
            FEBERBISNIS &bull; BUSINESS PLAYGROUND
          </p>
          <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight text-charcoal mt-1">
            Laporan Simulasi Kelayakan Usaha &amp; BEP
          </h2>
          <p class="text-xs sm:text-sm font-semibold text-charcoal/70 mt-1">
            Nama Usaha: <span class="text-charcoal font-extrabold">${escapeHtml(d.namaUsaha)}</span>
          </p>
        </div>
        <div class="text-left sm:text-right text-xs text-charcoal/65">
          <p class="font-bold text-charcoal">${escapeHtml(d.tanggal)}</p>
          <p class="mt-0.5">We Connect, Learn and Grow together.</p>
        </div>
      </div>

      <!-- Status & Rekomendasi -->
      <div class="p-4 rounded-2xl mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style="background:#FEF6EB;border:1px solid rgba(52,51,51,0.16);">
        <div>
          <span class="text-[10px] font-extrabold uppercase tracking-wider text-charcoal/60 block">Status Kelayakan Usaha</span>
          <p class="text-xs sm:text-sm text-charcoal/85 mt-1 leading-relaxed">${escapeHtml(d.rekomendasi)}</p>
        </div>
        <span class="shrink-0 self-start sm:self-center text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full" style="${badgeStyle}">
          ${escapeHtml(d.statusLabel)}
        </span>
      </div>

      <!-- Key Metrics Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 print-break-avoid">
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">Harga Jual</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${formatRupiah(d.active.price)}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">HPP / Produk</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${formatRupiah(d.active.hpp)}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">Profit &amp; Margin</span>
          <span class="text-sm font-extrabold text-magenta mt-0.5 block">${formatRupiah(d.active.profitUnit)} (${d.active.marginPct.toFixed(1)}%)</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">BEP / Bulan</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${d.active.valid ? `${formatRibuan(d.active.bepBulan)} pcs` : '-'}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">Omzet BEP / Bln</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${d.active.valid ? formatRupiah(d.active.bepOmzet) : '-'}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">Target Jualan</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${d.active.valid ? `${formatRibuan(d.active.targetHari)} pcs/hari` : '-'}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">Payback Period</span>
          <span class="text-sm font-extrabold text-charcoal mt-0.5 block">${escapeHtml(d.paybackText)}</span>
        </div>
        <div class="p-3 rounded-xl border border-charcoal/15 bg-white">
          <span class="text-[10px] font-bold uppercase text-charcoal/55 block">ROI Bulanan</span>
          <span class="text-sm font-extrabold text-magenta mt-0.5 block">${escapeHtml(d.roiText)}</span>
        </div>
      </div>

      <!-- Rincian Biaya A, B, C -->
      ${renderTableBlock('A. Modal Awal Buka Usaha', d.rowsA, d.modalAwal, '')}
      ${renderTableBlock('B. Biaya Rutin Bulanan', d.rowsB, d.biayaRutin, ' / bln')}
      ${renderTableBlock('C. Modal per Produk (HPP)', d.rowsC, d.hppBase, ' / pcs')}

      <!-- D. Struktur Harga -->
      <div class="mb-4 print-break-avoid">
        <h4 class="text-xs font-extrabold uppercase tracking-wider text-charcoal mb-2">D. Struktur Harga &amp; Target Penjualan</h4>
        <table class="w-full border-collapse text-xs">
          <tbody>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Modal per Produk (HPP Dasar)</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${formatRupiah(d.hppBase)}</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Biaya Admin Platform</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${d.usePlatform ? `${d.platformFeePct}% (${formatRupiah(d.active.adminUnit)}/pcs)` : 'Tidak aktif (0%)'}</td>
            </tr>
            <tr>
              <td class="border border-charcoal/15 px-3 py-1.5">Rencana Harga Jual Final</td>
              <td class="border border-charcoal/15 px-3 py-1.5 text-right font-bold">${formatRupiah(d.active.price)}</td>
            </tr>
            <tr style="background:#FEF6EB;">
              <td class="border border-charcoal/20 px-3 py-2 font-extrabold">Target Laba Bersih Bulanan</td>
              <td class="border border-charcoal/20 px-3 py-2 text-right font-extrabold text-magenta">${formatRupiah(d.targetUntung)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${scenarioAppendix}

      <div class="mt-6 pt-3 border-t border-charcoal/15 flex items-center justify-between text-[10px] text-charcoal/55">
        <span>Dihasilkan oleh FEBerbisnis Business Playground</span>
        <span>Simulasi ini bersifat estimasi awal perencanaan usaha.</span>
      </div>
    </div>
  `;
}

function getItemizedSum(sectionKey) {
  return (playgroundItems[sectionKey] || []).reduce(
    (acc, item) => acc + (Number(item.amount) || 0),
    0
  );
}

function isSectionItemized(sectionKey) {
  const cb = document.getElementById(`pg-itemized-${sectionKey}`);
  return Boolean(cb && cb.checked);
}

function getEffectiveSectionValue(sectionKey) {
  if (isSectionItemized(sectionKey)) {
    return getItemizedSum(sectionKey);
  }
  return parseRupiahValue(ITEMIZED_CONFIG[sectionKey].singleInputId);
}

function updateItemizedSummaryDisplay(sectionKey) {
  const sum = getItemizedSum(sectionKey);
  const sumEl = document.getElementById(`pg-sum-${sectionKey}`);
  if (sumEl) sumEl.textContent = formatRupiah(sum);
}

function renderItemizedRows(sectionKey) {
  const container = document.getElementById(`pg-rows-${sectionKey}`);
  if (!container) return;
  const cfg = ITEMIZED_CONFIG[sectionKey];
  const rows = playgroundItems[sectionKey];

  container.innerHTML = rows
    .map(
      (item, idx) => `
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <input
          type="text"
          value="${escapeHtml(item.name)}"
          placeholder="${cfg.namePlaceholder}"
          oninput="updateItemizedName('${sectionKey}', ${idx}, this.value)"
          class="flex-1 px-3.5 py-2.5 rounded-xl bg-cream/70 border border-charcoal/20 text-xs sm:text-sm font-semibold text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-magenta focus:bg-white transition-all"
        />
        <div class="flex items-center gap-2">
          <div class="relative flex-1 sm:w-44">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-charcoal/55">Rp</span>
            <input
              type="text"
              inputmode="numeric"
              value="${item.amount > 0 ? formatRibuan(item.amount) : ''}"
              placeholder="${cfg.amountPlaceholder}"
              oninput="updateItemizedAmount('${sectionKey}', ${idx}, this)"
              class="w-full pl-9 pr-3 py-2.5 rounded-xl bg-cream/70 border border-charcoal/20 text-xs sm:text-sm font-bold text-charcoal placeholder:text-charcoal/35 focus:outline-none focus:border-magenta focus:bg-white transition-all"
            />
          </div>
          <button
            type="button"
            onclick="removeItemizedRow('${sectionKey}', ${idx})"
            aria-label="Hapus item"
            class="w-9 h-9 rounded-xl hairline-border bg-white hover:bg-rose-50 hover:border-rose-400 hover:text-rose-600 text-charcoal/60 font-bold text-base flex items-center justify-center shrink-0 transition-colors"
          >&times;</button>
        </div>
      </div>
    `
    )
    .join('');

  updateItemizedSummaryDisplay(sectionKey);
}

function toggleItemizedSection(sectionKey) {
  const isOn = isSectionItemized(sectionKey);
  const singleBox = document.getElementById(`pg-single-box-${sectionKey}`);
  const itemizedBox = document.getElementById(`pg-itemized-box-${sectionKey}`);
  const cfg = ITEMIZED_CONFIG[sectionKey];
  const singleInput = document.getElementById(cfg.singleInputId);

  if (singleBox) singleBox.classList.toggle('hidden', isOn);
  if (itemizedBox) itemizedBox.classList.toggle('hidden', !isOn);

  if (isOn) {
    // Preserve typed single amount if no itemized rows exist yet
    if (playgroundItems[sectionKey].length === 0) {
      const existingSingle = parseRupiahValue(cfg.singleInputId);
      if (existingSingle > 0) {
        playgroundItems[sectionKey].push({ name: cfg.defaultLabel, amount: existingSingle });
      } else {
        playgroundItems[sectionKey].push({ name: '', amount: 0 });
      }
    }
    renderItemizedRows(sectionKey);
  } else {
    // Carry over calculated itemized sum back to single total input
    const sum = getItemizedSum(sectionKey);
    if (singleInput) {
      singleInput.value = sum > 0 ? formatRibuan(sum) : '';
    }
  }

  if (sectionKey === 'c') {
    syncAfterCostOrFeeChange();
  }
  calculatePlayground();
}

function addItemizedRow(sectionKey, defaultName) {
  // If there's only 1 completely blank row and user clicked a Quick-Add chip, fill it neatly
  const rows = playgroundItems[sectionKey];
  if (
    defaultName &&
    rows.length === 1 &&
    !rows[0].name.trim() &&
    (!rows[0].amount || rows[0].amount === 0)
  ) {
    rows[0].name = defaultName;
  } else {
    rows.push({ name: defaultName || '', amount: 0 });
  }
  clearActivePresetHighlight();
  renderItemizedRows(sectionKey);
}

function removeItemizedRow(sectionKey, idx) {
  playgroundItems[sectionKey].splice(idx, 1);
  if (playgroundItems[sectionKey].length === 0) {
    playgroundItems[sectionKey].push({ name: '', amount: 0 });
  }
  clearActivePresetHighlight();
  renderItemizedRows(sectionKey);
  if (sectionKey === 'c') {
    syncAfterCostOrFeeChange();
  }
  calculatePlayground();
}

function updateItemizedName(sectionKey, idx, val) {
  if (!playgroundItems[sectionKey][idx]) return;
  playgroundItems[sectionKey][idx].name = val;
  clearActivePresetHighlight();
}

function updateItemizedAmount(sectionKey, idx, inputEl) {
  if (!playgroundItems[sectionKey][idx]) return;
  const digits = String(inputEl.value || '').replace(/\D/g, '');
  const numVal = digits ? parseInt(digits, 10) : 0;
  inputEl.value = numVal > 0 ? numVal.toLocaleString('id-ID') : '';
  playgroundItems[sectionKey][idx].amount = numVal;
  clearActivePresetHighlight();
  updateItemizedSummaryDisplay(sectionKey);

  if (sectionKey === 'c') {
    syncAfterCostOrFeeChange();
  }
  calculatePlayground();
}

function openPlaygroundTool(viewName) {
  activePlaygroundView = viewName;
  const hubEl = document.getElementById('playground-hub-view');
  const simEl = document.getElementById('playground-simulator-view');
  if (!hubEl || !simEl) return;

  const isSim = viewName === 'simulator';
  hubEl.classList.toggle('hidden', isSim);
  simEl.classList.toggle('hidden', !isSim);
  if (isSim) {
    updateAllSliderTracks();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleHelpPopover(popoverId, evt) {
  if (evt) evt.stopPropagation();
  const target = document.getElementById(popoverId);
  const btn = evt && evt.currentTarget;
  if (!target) return;

  const isCurrentlyHidden = target.classList.contains('hidden');

  document.querySelectorAll('.help-popover').forEach((el) => el.classList.add('hidden'));
  document.querySelectorAll('.help-btn').forEach((b) => b.setAttribute('aria-expanded', 'false'));

  if (isCurrentlyHidden) {
    target.classList.remove('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.help-popover-wrap') && !e.target.closest('.help-popover')) {
    document.querySelectorAll('.help-popover').forEach((el) => el.classList.add('hidden'));
    document.querySelectorAll('.help-btn').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  }
});

/**
 * Sync Margin Slider & badge from current Harga Jual, HPP, and Platform Fee
 */
function syncMarginSliderFromCurrentPrice() {
  const hpp = getEffectiveSectionValue('c');
  const price = parseRupiahValue('pg-harga-jual');
  const adminPct = getActivePlatformFeePct();
  const slider = document.getElementById('slider-margin');

  if (price > 0 && hpp >= 0 && slider) {
    const adminUnit = price * (adminPct / 100);
    const impliedMargin = ((price - hpp - adminUnit) / price) * 100;
    const minVal = parseFloat(slider.min) || 5;
    const maxVal = parseFloat(slider.max) || 75;
    const clamped = Math.min(Math.max(Math.round(impliedMargin), minVal), maxVal);
    slider.value = String(clamped);
    document.getElementById('val-slider-margin').textContent = `${impliedMargin.toFixed(0)}%`;
    updateSliderPinkTrack(slider);
  }
}

/**
 * Decide whether to auto-compute initial Harga Jual or keep existing Harga Jual fixed
 * so increasing HPP/platform cost realistically reduces profit & margin
 */
function syncAfterCostOrFeeChange() {
  const hpp = getEffectiveSectionValue('c');
  const currentPrice = parseRupiahValue('pg-harga-jual');

  if (!isPriceLockedByUser && hpp > 0) {
    computePriceFromMargin();
  } else if (currentPrice > 0) {
    syncMarginSliderFromCurrentPrice();
  }
}

/**
 * Auto-format ribuan for general Rupiah inputs (Modal Awal, Biaya Rutin, Target Untung)
 */
function handleRupiahInput(inputEl) {
  const digits = String(inputEl.value || '').replace(/\D/g, '');
  inputEl.value = digits ? parseInt(digits, 10).toLocaleString('id-ID') : '';
  clearActivePresetHighlight();
  calculatePlayground();
}

/**
 * When HPP is edited:
 * - If Harga Jual has not been set/locked yet, auto-calculate from Margin slider.
 * - If Harga Jual is already set, keep Harga Jual steady so profit & margin drop naturally.
 */
function handleHppOrFeeChange(inputEl) {
  const digits = String(inputEl.value || '').replace(/\D/g, '');
  inputEl.value = digits ? parseInt(digits, 10).toLocaleString('id-ID') : '';
  clearActivePresetHighlight();
  syncAfterCostOrFeeChange();
  calculatePlayground();
}

/**
 * When Margin Slider moves, update pink track & auto-compute Harga Jual
 */
function handleMarginSliderChange() {
  const slider = document.getElementById('slider-margin');
  document.getElementById('val-slider-margin').textContent = `${slider.value}%`;
  updateSliderPinkTrack(slider);
  clearActivePresetHighlight();
  computePriceFromMargin();
  if (parseRupiahValue('pg-harga-jual') > 0) {
    isPriceLockedByUser = true;
  }
  calculatePlayground();
}

/**
 * Two-way sync: when user edits Harga Jual manually, sync Margin Slider & badge
 */
function handleManualPriceInput(inputEl) {
  const digits = String(inputEl.value || '').replace(/\D/g, '');
  inputEl.value = digits ? parseInt(digits, 10).toLocaleString('id-ID') : '';
  clearActivePresetHighlight();
  isPriceLockedByUser = parseRupiahValue('pg-harga-jual') > 0;
  syncMarginSliderFromCurrentPrice();
  calculatePlayground();
}

function handlePlatformFeeInput() {
  clearActivePresetHighlight();
  syncMarginSliderCap();
  syncAfterCostOrFeeChange();
  calculatePlayground();
}

function togglePlatformFee(shouldRecalculate = true) {
  const checkbox = document.getElementById('pg-use-platform');
  const feeBox = document.getElementById('pg-platform-fee-box');
  if (!checkbox || !feeBox) return;
  feeBox.classList.toggle('hidden', !checkbox.checked);
  syncMarginSliderCap();
  if (shouldRecalculate) {
    clearActivePresetHighlight();
    syncAfterCostOrFeeChange();
    calculatePlayground();
  }
}

function toggleScenarioSection() {
  const toggle = document.getElementById('pg-use-scenario');
  const box = document.getElementById('pg-scenario-box');
  if (!toggle || !box) return;
  box.classList.toggle('hidden', !toggle.checked);
  updateAllSliderTracks();
  calculatePlayground();
}

function handleScenarioSliderChange() {
  updateSliderPinkTrack(document.getElementById('slider-diskon'));
  updateSliderPinkTrack(document.getElementById('slider-hpp'));
  calculatePlayground();
}

function clearActivePresetHighlight() {
  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.classList.remove('bg-charcoal', 'text-cream', 'border-charcoal');
    btn.classList.add('bg-cream', 'text-charcoal');
  });
}

/**
 * Apply beginner-friendly Quick-Fill preset (populates both single & itemized data)
 */
function applyPlaygroundPreset(presetKey) {
  const data = PLAYGROUND_PRESETS[presetKey];
  if (!data) return;

  const namaUsahaEl = document.getElementById('pg-nama-usaha');
  if (namaUsahaEl) namaUsahaEl.value = data.namaUsaha || '';

  // Populate itemized arrays so toggling ON immediately shows realistic items
  playgroundItems.a = (data.modalAwalItems || []).map((x) => ({ ...x }));
  playgroundItems.b = (data.biayaRutinItems || []).map((x) => ({ ...x }));
  playgroundItems.c = (data.hppItems || []).map((x) => ({ ...x }));

  document.getElementById('pg-modal-awal').value = formatRibuan(data.modalAwal);
  document.getElementById('pg-biaya-rutin').value = formatRibuan(data.biayaRutin);
  document.getElementById('pg-hpp').value = formatRibuan(data.hpp);

  // Re-render any itemized boxes that are currently toggled ON
  ['a', 'b', 'c'].forEach((k) => {
    if (isSectionItemized(k)) renderItemizedRows(k);
  });

  document.getElementById('pg-use-platform').checked = data.usePlatform;
  document.getElementById('pg-platform-fee').value = data.platformFee;
  togglePlatformFee(false);

  const marginSlider = document.getElementById('slider-margin');
  marginSlider.value = String(Math.min(data.marginPct, parseFloat(marginSlider.max)));
  document.getElementById('val-slider-margin').textContent = `${data.marginPct}%`;

  document.getElementById('pg-harga-jual').value = formatRibuan(data.hargaJual);
  document.getElementById('pg-target-untung').value = formatRibuan(data.targetUntung);
  isPriceLockedByUser = true;

  // Reset optional Bagian E scenario toggle to OFF
  document.getElementById('pg-use-scenario').checked = false;
  document.getElementById('pg-scenario-box').classList.add('hidden');
  document.getElementById('slider-diskon').value = 0;
  document.getElementById('slider-hpp').value = 0;

  updateAllSliderTracks();

  clearActivePresetHighlight();
  const activeBtn = document.getElementById(`preset-btn-${presetKey}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-cream', 'text-charcoal');
    activeBtn.classList.add('bg-charcoal', 'text-cream', 'border-charcoal');
  }

  calculatePlayground();
}

/**
 * Reset entire simulation back to clean Empty State
 */
function resetPlaygroundSimulation() {
  [
    'pg-nama-usaha',
    'pg-modal-awal',
    'pg-biaya-rutin',
    'pg-hpp',
    'pg-harga-jual',
    'pg-target-untung',
  ].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Reset itemized toggles & arrays back to OFF
  ['a', 'b', 'c'].forEach((k) => {
    playgroundItems[k] = [];
    const cb = document.getElementById(`pg-itemized-${k}`);
    if (cb) cb.checked = false;
    const singleBox = document.getElementById(`pg-single-box-${k}`);
    const itemizedBox = document.getElementById(`pg-itemized-box-${k}`);
    if (singleBox) singleBox.classList.remove('hidden');
    if (itemizedBox) itemizedBox.classList.add('hidden');
  });

  document.getElementById('pg-use-platform').checked = false;
  document.getElementById('pg-platform-fee').value = 15;
  togglePlatformFee(false);

  const marginSlider = document.getElementById('slider-margin');
  marginSlider.value = '40';
  document.getElementById('val-slider-margin').textContent = '40%';
  isPriceLockedByUser = false;

  document.getElementById('pg-use-scenario').checked = false;
  document.getElementById('pg-scenario-box').classList.add('hidden');
  document.getElementById('slider-diskon').value = 0;
  document.getElementById('slider-hpp').value = 0;

  updateAllSliderTracks();
  clearActivePresetHighlight();
  calculatePlayground();
}

/**
 * Collect normalized simulator data for both A4 Preview Modal & Direct jsPDF Export
 */
function collectPlaygroundReportData() {
  const namaUsahaRaw = (document.getElementById('pg-nama-usaha')?.value || '').trim();
  const namaUsaha = namaUsahaRaw || 'Simulasi Usaha Tanpa Nama';
  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const modalAwal = getEffectiveSectionValue('a');
  const biayaRutin = getEffectiveSectionValue('b');
  const hppBase = getEffectiveSectionValue('c');
  const hargaJualBase = parseRupiahValue('pg-harga-jual');
  const targetUntung = parseRupiahValue('pg-target-untung');

  const usePlatform = document.getElementById('pg-use-platform').checked;
  const platformFeePct = getActivePlatformFeePct();

  const useScenario = document.getElementById('pg-use-scenario').checked;
  const diskonPct = useScenario ? parseFloat(document.getElementById('slider-diskon').value) || 0 : 0;
  const kenaikanHppPct = useScenario ? parseFloat(document.getElementById('slider-hpp').value) || 0 : 0;

  const computeScenarioMetrics = (price, hpp) => {
    const adminUnit = usePlatform ? price * (platformFeePct / 100) : 0;
    const profitUnit = price - hpp - adminUnit;
    const marginPct = price > 0 ? (profitUnit / price) * 100 : 0;
    const valid = price > 0 && profitUnit > 0;
    const bepBulan = valid ? (biayaRutin > 0 ? Math.ceil(biayaRutin / profitUnit) : 0) : null;
    const bepHari = bepBulan !== null ? (bepBulan > 0 ? Math.ceil(bepBulan / 30) : 0) : null;
    const bepOmzet = bepBulan !== null ? bepBulan * price : null;
    const targetBulan = valid ? Math.ceil((biayaRutin + targetUntung) / profitUnit) : null;
    const targetHari = targetBulan !== null ? (targetBulan > 0 ? Math.ceil(targetBulan / 30) : 0) : null;
    const targetOmzet = targetBulan !== null ? targetBulan * price : null;
    return {
      price,
      hpp,
      adminUnit,
      profitUnit,
      marginPct,
      valid,
      bepBulan,
      bepHari,
      bepOmzet,
      targetBulan,
      targetHari,
      targetOmzet,
    };
  };

  const normal = computeScenarioMetrics(hargaJualBase, hppBase);
  const active = useScenario
    ? computeScenarioMetrics(
        hargaJualBase * (1 - diskonPct / 100),
        hppBase * (1 + kenaikanHppPct / 100)
      )
    : normal;

  let statusLabel = 'Rawan Boncos';
  let rekomendasi =
    'Margin keuntungan terlalu tipis atau minus. Evaluasi kembali harga jual, tekan biaya HPP, atau kurangi potongan diskon.';

  if (active.valid && active.marginPct > 35) {
    statusLabel = 'Sehat';
    rekomendasi =
      'Struktur margin tergolong sehat. Fokus pada konsistensi penjualan harian untuk mencapai target laba bersih dan mempercepat balik modal.';
  } else if (active.valid && active.marginPct >= 15) {
    statusLabel = 'Waspada';
    rekomendasi =
      'Usaha masih menghasilkan profit, namun ruang untuk diskon promo atau kenaikan harga bahan baku cukup terbatas. Pantau efisiensi biaya rutin.';
  }

  let paybackText = '-';
  let roiText = '-';
  if (active.valid) {
    if (modalAwal <= 0) {
      paybackText = 'Langsung balik modal';
      roiText = 'Tanpa modal awal';
    } else if (targetUntung <= 0) {
      paybackText = 'Belum diisi';
      roiText = '0%';
    } else {
      const pb = modalAwal / targetUntung;
      const roi = (targetUntung / modalAwal) * 100;
      paybackText = `${pb.toLocaleString('id-ID', {
        minimumFractionDigits: pb % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1,
      })} bulan`;
      roiText = `${roi.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
      })}%`;
    }
  }

  const getSectionRows = (sectionKey, fallbackLabel, totalVal) => {
    const itemized = isSectionItemized(sectionKey);
    const validRows = itemized
      ? playgroundItems[sectionKey].filter((r) => (r.name && r.name.trim()) || r.amount > 0)
      : [];
    if (itemized && validRows.length > 0) {
      return validRows.map((r, i) => [
        String(i + 1),
        r.name.trim() || `Item ${i + 1}`,
        formatRupiah(r.amount),
      ]);
    }
    return [['1', `Total ${fallbackLabel} (Input Langsung)`, formatRupiah(totalVal)]];
  };

  return {
    namaUsaha,
    tanggal,
    modalAwal,
    biayaRutin,
    hppBase,
    hargaJualBase,
    targetUntung,
    usePlatform,
    platformFeePct,
    useScenario,
    diskonPct,
    kenaikanHppPct,
    normal,
    active,
    statusLabel,
    rekomendasi,
    paybackText,
    roiText,
    rowsA: getSectionRows('a', 'Modal Awal Buka Usaha', modalAwal),
    rowsB: getSectionRows('b', 'Biaya Rutin Bulanan', biayaRutin),
    rowsC: getSectionRows('c', 'Modal per Produk (HPP)', hppBase),
  };
}

function printPlaygroundSummary() {
  const html = buildPrintReportHTML();
  const reportEl = document.getElementById('simulator-print-report');
  const sheetEl = document.getElementById('pdf-preview-sheet');
  const modalEl = document.getElementById('pdf-preview-modal');

  if (reportEl) reportEl.innerHTML = html;
  if (sheetEl) sheetEl.innerHTML = html;

  if (modalEl) {
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closePdfPreviewModal() {
  const modalEl = document.getElementById('pdf-preview-modal');
  if (!modalEl) return;
  modalEl.classList.add('hidden');
  modalEl.classList.remove('flex');
  document.body.style.overflow = '';
}

function triggerBrowserPrint() {
  try {
    window.print();
  } catch (err) {
    showToastNotification('Dialog print diblokir browser. Gunakan tombol "Unduh PDF" untuk menyimpan file PDF.');
  }
}

/**
 * Direct A4 PDF Export via jsPDF + AutoTable (works reliably inside sandboxed previews & all browsers)
 */
function downloadPlaygroundPDF() {
  try {
    if (!window.jspdf || !window.jspdf.jsPDF) {
      showToastNotification('Library PDF sedang dimuat, coba klik sekali lagi atau gunakan tombol Print.');
      return;
    }

    const d = collectPlaygroundReportData();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;
    let y = 14;

    // Top Brand Accent Bar
    doc.setFillColor(229, 0, 110);
    doc.rect(0, 0, pageW * 0.65, 3, 'F');
    doc.setFillColor(255, 206, 19);
    doc.rect(pageW * 0.65, 0, pageW * 0.35, 3, 'F');

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(229, 0, 110);
    doc.text('FEBERBISNIS • BUSINESS PLAYGROUND', margin, y);

    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text(`Tanggal: ${d.tanggal}`, pageW - margin, y, { align: 'right' });

    y += 6.5;
    doc.setFontSize(16);
    doc.setTextColor(52, 51, 51);
    doc.text('Laporan Simulasi Kelayakan Usaha & BEP', margin, y);

    y += 5.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Nama Usaha: ${d.namaUsaha}`, margin, y);

    y += 4;
    doc.setDrawColor(52, 51, 51);
    doc.setLineWidth(0.6);
    doc.line(margin, y, pageW - margin, y);
    y += 6;

    // Status & Rekomendasi Box
    doc.setFillColor(254, 246, 235);
    doc.setDrawColor(212, 212, 212);
    doc.setLineWidth(0.3);
    const recLines = doc.splitTextToSize(d.rekomendasi, pageW - margin * 2 - 42);
    const boxH = Math.max(16, recLines.length * 4.5 + 8);
    doc.roundedRect(margin, y, pageW - margin * 2, boxH, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text('STATUS KELAYAKAN USAHA', margin + 4, y + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(52, 51, 51);
    doc.text(recLines, margin + 4, y + 10.5);

    // Status Pill
    const badgeColor =
      d.statusLabel === 'Sehat'
        ? [16, 185, 129]
        : d.statusLabel === 'Waspada'
        ? [217, 119, 6]
        : [225, 29, 72];
    doc.setFillColor(...badgeColor);
    doc.roundedRect(pageW - margin - 34, y + 4, 30, 7.5, 3.5, 3.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(d.statusLabel.toUpperCase(), pageW - margin - 19, y + 8.8, { align: 'center' });

    y += boxH + 6;

    // Ringkasan Analisis Kelayakan Table
    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      theme: 'grid',
      head: [['Metrik Analisis Kelayakan', 'Hasil Simulasi', 'Metrik Bisnis', 'Hasil Simulasi']],
      body: [
        [
          'Harga Jual',
          formatRupiah(d.active.price),
          'BEP (Titik Balik Modal)',
          d.active.valid ? `${formatRibuan(d.active.bepBulan)} pcs/bln` : 'Belum tercapai',
        ],
        [
          'HPP per Produk',
          formatRupiah(d.active.hpp),
          'Omzet BEP / Bulan',
          d.active.valid ? formatRupiah(d.active.bepOmzet) : '-',
        ],
        [
          'Profit Bersih / Produk',
          `${formatRupiah(d.active.profitUnit)} (${d.active.marginPct.toFixed(1)}%)`,
          'Target Jualan Harian',
          d.active.valid ? `${formatRibuan(d.active.targetHari)} pcs/hari (${formatRibuan(d.active.targetBulan)}/bln)` : '-',
        ],
        [
          'Target Laba / Bulan',
          formatRupiah(d.targetUntung),
          'Payback Period / ROI',
          `${d.paybackText} • ROI ${d.roiText}`,
        ],
      ],
      headStyles: { fillColor: [52, 51, 51], textColor: [254, 246, 235], fontSize: 8.5 },
      bodyStyles: { fontSize: 8.5, textColor: [52, 51, 51] },
      columnStyles: {
        0: { fontStyle: 'bold', fillColor: [252, 249, 244] },
        2: { fontStyle: 'bold', fillColor: [252, 249, 244] },
      },
    });

    const addSectionTable = (title, rows, totalVal, unitSuffix) => {
      const nextY = doc.lastAutoTable.finalY + 7;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(52, 51, 51);
      doc.text(title, margin, nextY);

      doc.autoTable({
        startY: nextY + 2.5,
        margin: { left: margin, right: margin },
        theme: 'grid',
        head: [['No', 'Uraian Item', `Nominal${unitSuffix}`]],
        body: [...rows, ['', `Subtotal ${title}`, formatRupiah(totalVal)]],
        headStyles: { fillColor: [254, 246, 235], textColor: [52, 51, 51], fontSize: 8.5, lineColor: [212, 212, 212], lineWidth: 0.2 },
        bodyStyles: { fontSize: 8.5, textColor: [52, 51, 51] },
        columnStyles: {
          0: { cellWidth: 12 },
          2: { halign: 'right', cellWidth: 42, fontStyle: 'bold' },
        },
        didParseCell(data) {
          if (data.row.index === rows.length) {
            data.cell.styles.fontStyle = 'bold';
            data.cell.styles.fillColor = [245, 245, 245];
            if (data.column.index === 2) {
              data.cell.styles.textColor = [229, 0, 110];
            }
          }
        },
      });
    };

    addSectionTable('A. Modal Awal Buka Usaha', d.rowsA, d.modalAwal, '');
    addSectionTable('B. Biaya Rutin Bulanan', d.rowsB, d.biayaRutin, ' / bln');
    addSectionTable('C. Modal per Produk (HPP)', d.rowsC, d.hppBase, ' / pcs');

    // D. Struktur Harga
    const structY = doc.lastAutoTable.finalY + 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(52, 51, 51);
    doc.text('D. Struktur Harga & Target Penjualan', margin, structY);

    doc.autoTable({
      startY: structY + 2.5,
      margin: { left: margin, right: margin },
      theme: 'grid',
      body: [
        ['Modal per Produk (HPP Dasar)', formatRupiah(d.hppBase)],
        [
          'Biaya Admin Platform',
          d.usePlatform ? `${d.platformFeePct}% (${formatRupiah(d.active.adminUnit)}/pcs)` : 'Tidak aktif (0%)',
        ],
        ['Rencana Harga Jual Final', formatRupiah(d.active.price)],
        ['Profit Bersih per 1 Produk', `${formatRupiah(d.active.profitUnit)} (${d.active.marginPct.toFixed(1)}%)`],
      ],
      bodyStyles: { fontSize: 8.5, textColor: [52, 51, 51] },
      columnStyles: { 1: { halign: 'right', fontStyle: 'bold', cellWidth: 55 } },
    });

    // Optional Appendix E: Uji Skenario
    if (d.useScenario) {
      const scenY = doc.lastAutoTable.finalY + 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(229, 0, 110);
      doc.text(
        `E. Lampiran Uji Skenario (Diskon ${d.diskonPct}%, Kenaikan Bahan +${d.kenaikanHppPct}%)`,
        margin,
        scenY
      );

      doc.autoTable({
        startY: scenY + 2.5,
        margin: { left: margin, right: margin },
        theme: 'grid',
        head: [['Parameter', 'Kondisi Normal', 'Kondisi Skenario']],
        body: [
          ['Harga Jual Efektif', formatRupiah(d.normal.price), formatRupiah(d.active.price)],
          ['HPP Efektif / Produk', formatRupiah(d.normal.hpp), formatRupiah(d.active.hpp)],
          ['Profit Bersih / Produk', formatRupiah(d.normal.profitUnit), formatRupiah(d.active.profitUnit)],
          ['Margin Bersih', `${d.normal.marginPct.toFixed(1)}%`, `${d.active.marginPct.toFixed(1)}%`],
          [
            'BEP (Titik Balik Modal)',
            d.normal.valid ? `${formatRibuan(d.normal.bepBulan)} pcs/bln` : 'Tidak tercapai',
            d.active.valid ? `${formatRibuan(d.active.bepBulan)} pcs/bln` : 'Tidak tercapai',
          ],
        ],
        headStyles: { fillColor: [52, 51, 51], textColor: [254, 246, 235], fontSize: 8.5 },
        bodyStyles: { fontSize: 8.5, textColor: [52, 51, 51] },
        columnStyles: {
          1: { halign: 'right' },
          2: { halign: 'right', fontStyle: 'bold' },
        },
      });
    }

    // Footer on every page
    const totalPages = doc.internal.getNumberOfPages();
    for (let p = 1; p <= totalPages; p += 1) {
      doc.setPage(p);
      const pageH = doc.internal.pageSize.getHeight();
      doc.setDrawColor(212, 212, 212);
      doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 120);
      doc.text('FEBerbisnis Business Playground • We Connect, Learn and Grow together.', margin, pageH - 7.5);
      doc.text(`Halaman ${p} dari ${totalPages}`, pageW - margin, pageH - 7.5, { align: 'right' });
    }

    const safeSlug = slugifyName(d.namaUsaha) || 'simulasi-usaha';
    doc.save(`Laporan-Kelayakan-${safeSlug}.pdf`);
    showToastNotification(`Berhasil mengunduh Laporan-Kelayakan-${safeSlug}.pdf`);
  } catch (err) {
    console.error('Error generating PDF:', err);
    showToastNotification('Gagal mengunduh PDF langsung. Silakan gunakan tombol Print.');
  }
}

// =========================================================================
// INITIALIZE APPLICATION ON LOAD
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderHeroCarousel();
  renderEcosystemMarquee();
  renderPartnerModalContent();
  renderMissions();
  renderCoreValues();
  renderOrganogram();
  renderProgramFilters();
  renderProgramsGrid();
  renderCommunityBizFilters();
  renderCommunityBusinesses();
  renderCommunityInterestFilters();
  renderCommunityInterests();
  renderShopOfficialMerch();
  renderShopMemberFilters();
  renderShopMemberProducts();
  resetPlaygroundSimulation();
  switchTab('home');
});
