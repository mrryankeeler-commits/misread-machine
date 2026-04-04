const contentUrls = {
  sections: "./content/sections.json",
  examples: "./content/examples.json"
};

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderHero(heroData) {
  const hero = document.querySelector("#hero");
  hero.innerHTML = `
    <p class="eyebrow">${escapeHtml(heroData.kicker)}</p>
    <h1>${escapeHtml(heroData.headline)}</h1>
    <p class="lead">${escapeHtml(heroData.subhead)}</p>
    <div class="cta-row">
      <a class="button" href="${escapeHtml(heroData.cta.url)}" target="_blank" rel="noreferrer">${escapeHtml(heroData.cta.label)}</a>
    </div>
  `;
}

function renderPremise(premiseData) {
  const premise = document.querySelector("#premise");
  premise.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Premise</p>
      <h2>${escapeHtml(premiseData.headline)}</h2>
    </div>
    ${premiseData.paragraphs.map((paragraph) => `<p class="section-copy">${escapeHtml(paragraph)}</p>`).join("")}
  `;
}

function renderComparisons(comparisons) {
  const container = document.querySelector("#comparisonCards");
  container.innerHTML = comparisons
    .map(
      (item, index) => `
      <article class="card">
        <h3>Example ${index + 1}</h3>
        <p><span class="label">Technique</span>${escapeHtml(item.technique)}</p>
        <p><span class="label">Weak example</span>${escapeHtml(item.bad_example)}</p>
        <p><span class="label">Strong example</span>${escapeHtml(item.good_example)}</p>
        <p class="annotation">${escapeHtml(item.annotation)}</p>
      </article>
    `
    )
    .join("");
}

function renderBeforeAfter(beforeAfterItems) {
  const container = document.querySelector("#beforeAfterCards");
  container.innerHTML = beforeAfterItems
    .map(
      (item) => `
      <article class="card">
        <p><span class="label">Before</span>${escapeHtml(item.before)}</p>
        <p><span class="label">After</span>${escapeHtml(item.after)}</p>
        <p class="annotation">${escapeHtml(item.annotation)}</p>
      </article>
    `
    )
    .join("");
}

function renderPrinciples(principlesData) {
  const container = document.querySelector("#principles");
  container.innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Principles</p>
      <h2>${escapeHtml(principlesData.headline)}</h2>
    </div>
    <div class="grid principles-grid">
      ${principlesData.items
        .map(
          (item) => `
          <article class="card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.body)}</p>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function renderClosing(closingData) {
  const container = document.querySelector("#closing");
  container.innerHTML = `
    <h2>${escapeHtml(closingData.headline)}</h2>
    <p class="section-copy">${escapeHtml(closingData.body)}</p>
    <p><a class="button" href="${escapeHtml(closingData.cta.url)}" target="_blank" rel="noreferrer">${escapeHtml(closingData.cta.label)}</a></p>
  `;
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.json();
}

async function initialize() {
  try {
    const [sectionsData, examplesData] = await Promise.all([
      getJson(contentUrls.sections),
      getJson(contentUrls.examples)
    ]);

    renderHero(sectionsData.hero);
    renderPremise(sectionsData.premise);
    renderComparisons(examplesData.comparisons);
    renderBeforeAfter(examplesData.before_after);
    renderPrinciples(sectionsData.principles);
    renderClosing(sectionsData.closing);
  } catch (error) {
    document.querySelector("main").innerHTML = `<section class="section"><h1>Unable to load content.</h1><p class="section-copy">${escapeHtml(error.message)}</p></section>`;
  }
}

initialize();
