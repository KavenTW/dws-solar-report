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

/**
 * Whole sections packed into fixed-height pages — never split.
 *
 * `getBoundingClientRect` excludes margins, but sections sit 13–16px apart and
 * that gap decides the page break on a nearly-full page: the largest asset
 * report measures 917px of content across its first three sections — under the
 * page — and 946px once the gaps are counted, which is why it prints on three
 * pages rather than two. A margin is dropped at a page break, so it only counts
 * between two sections that land on the same page.
 */
function packSections(el) {
  const sections = [...el.children].flatMap(child =>
    child.classList && child.classList.contains('container') ? [...child.children] : [child]);

  let pages = 1;
  let used = 0;
  let gap = 0; // trailing margin of the section above
  // Ids carried by a section, or anything inside it, resolve to the page that
  // section lands on — a contents entry for a sub-section (Methodology inside
  // the Scope page, the Glossary inside Key Considerations) needs the page it
  // actually prints on, not the page its host block starts on.
  const ids = {};
  for (const section of sections) {
    const h = section.getBoundingClientRect().height;
    if (h <= 1) continue;
    const cost = used === 0 ? h : gap + h;
    if (h > PAGE_HEIGHT) {
      // Taller than a page: it will split regardless of break-inside.
      pages += Math.ceil(h / PAGE_HEIGHT) - 1;
      used = h % PAGE_HEIGHT;
    } else if (used + cost > PAGE_HEIGHT) {
      pages += 1;
      used = h;
    } else {
      used += cost;
    }
    gap = parseFloat(getComputedStyle(section).marginBottom) || 0;

    const offset = pages - 1;
    if (section.id) ids[section.id] = offset;
    for (const el2 of section.querySelectorAll('[id]')) ids[el2.id] = offset;
  }
  return { pages, ids };
}

/**
 * Returns { pages: { slug: pageNumber }, pagesByName: { assetName: pageNumber },
 * totalPages }, or null when the document is not on screen. Applies the print
 * layout, measures, and restores.
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
    // Asset reports are keyed in the contents by the saved project's internal
    // id. Record the printed asset name as well, so a report whose id does not
    // line up still resolves — the name is what the reader sees either way.
    const pagesByName = {};
    let page = 1;

    for (const block of blocks) {
      if (block.id) pages[block.id] = page;
      const assetName = block.querySelector('.asset-band-name')?.textContent?.trim();
      if (assetName) pagesByName[assetName] = page;

      let span;
      if (block.classList.contains('portfolio-title-page')) {
        span = 1; // full-bleed cover, always exactly one page
      } else if (block.classList.contains('portfolio-report') || block.querySelectorAll(':scope > .section').length > 1) {
        // Several whole sections packed into pages — asset reports, and any
        // front-matter page carrying more than one section.
        const packed = packSections(block);
        span = packed.pages;
        for (const [id, offset] of Object.entries(packed.ids)) pages[id] = page + offset;
      } else {
        span = Math.max(1, Math.ceil(block.getBoundingClientRect().height / PAGE_HEIGHT));
        for (const el of block.querySelectorAll('[id]')) pages[el.id] ??= page;
      }
      page += span;
    }

    // Entries that render inside another page rather than starting their own.
    for (const [slug, hostSlug] of Object.entries(extraSlugMap)) {
      if (pages[hostSlug] != null) pages[slug] = pages[hostSlug];
    }

    return { pages, pagesByName, totalPages: page - 1 };
  } finally {
    style.remove();
  }
}
