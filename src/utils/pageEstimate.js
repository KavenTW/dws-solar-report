// Estimating printed page numbers for the table of contents.
//
// Browsers expose no API for print pagination, so the numbers were filled in by
// hand after a test print. This reproduces the print layout on screen — the
// real @media print rules applied as ordinary rules, the container clamped to
// the printable width — and walks the document counting pages.
//
// The count is reliable because of how the document is built: `.portfolio-page`
// and `.portfolio-report` force a page break before them, and `.section` sets
// `break-inside: avoid`, so a section is never split. Pagination is therefore
// whole sections packed into fixed-height pages, which is what packSections
// does. It is still an estimate — verify against one test print before issuing.

const PAGE_HEIGHT = 941; // Letter at 0.6in/0.65in margins
const PAGE_WIDTH = 690;

/** Collect every rule inside an `@media print` block, as plain CSS text. */
function printRulesText() {
  const out = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin sheet; nothing of ours lives there
    }
    if (!rules) continue;
    for (const rule of rules) {
      if (rule.type === CSSRule.MEDIA_RULE && /print/i.test(rule.conditionText || '')) {
        for (const inner of rule.cssRules) out.push(inner.cssText);
      }
    }
  }
  return out.join('\n');
}

/** Whole sections packed into fixed-height pages — never split. */
function packSections(el) {
  const sections = [...el.children].flatMap(child =>
    child.classList && child.classList.contains('container') ? [...child.children] : [child]);

  let pages = 1;
  let used = 0;
  for (const section of sections) {
    const h = section.getBoundingClientRect().height;
    if (h <= 1) continue;
    if (h > PAGE_HEIGHT) {
      // Taller than a page: it will split regardless of break-inside.
      pages += Math.ceil(h / PAGE_HEIGHT) - 1;
      used = h % PAGE_HEIGHT;
    } else if (used + h > PAGE_HEIGHT) {
      pages += 1;
      used = h;
    } else {
      used += h;
    }
  }
  return pages;
}

/**
 * Returns { pages: { slug: pageNumber }, totalPages }, or null when the
 * document is not on screen. Applies the print layout, measures, and restores.
 */
export function estimateTocPages(extraSlugMap = {}) {
  const doc = document.querySelector('.portfolio-doc');
  if (!doc) return null;

  const style = document.createElement('style');
  style.id = 'gcsr-page-estimate';
  style.textContent = `${printRulesText()}
    .container, .portfolio-page { max-width: ${PAGE_WIDTH}px !important; width: ${PAGE_WIDTH}px !important; }`;
  document.head.appendChild(style);

  try {
    // Force layout before measuring.
    void doc.getBoundingClientRect();

    const blocks = doc.querySelectorAll('.portfolio-title-page, .portfolio-page, .portfolio-report');
    const pages = {};
    let page = 1;

    for (const block of blocks) {
      if (block.id) pages[block.id] = page;

      let span;
      if (block.classList.contains('portfolio-title-page')) {
        span = 1; // full-bleed cover, always exactly one page
      } else if (block.classList.contains('portfolio-report')) {
        span = packSections(block);
      } else {
        span = Math.max(1, Math.ceil(block.getBoundingClientRect().height / PAGE_HEIGHT));
      }
      page += span;
    }

    // Entries that render inside another page rather than starting their own.
    for (const [slug, hostSlug] of Object.entries(extraSlugMap)) {
      if (pages[hostSlug] != null) pages[slug] = pages[hostSlug];
    }

    return { pages, totalPages: page - 1 };
  } finally {
    style.remove();
  }
}
