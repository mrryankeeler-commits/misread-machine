const contentUrls = {
  sections: "./content/sections.json",
  examples: "./content/examples.json",
  signals: "./content/signals.json"
};

const signalState = {};
let presetButtons = [];

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function metricWord(value, low, high, lowText, midText, highText) {
  if (value < low) return lowText;
  if (value > high) return highText;
  return midText;
}

function buildOutput() {
  const curiosity = signalState.curiosity_gap ?? 50;
  const specificity = signalState.specificity ?? 50;
  const tension = signalState.tension ?? 50;
  const payoff = signalState.payoff ?? 50;
  const credibility = signalState.credibility ?? 50;

  const openLine = metricWord(
    curiosity,
    35,
    70,
    "I want to share something useful about writing hooks.",
    "Most people lose trust in the first two lines and never notice why.",
    "I almost deleted a draft that later became my highest-trust post. The first line was the difference."
  );

  const specificityLine = metricWord(
    specificity,
    35,
    70,
    "It changed how I think about messaging.",
    "It changed how I structure opening lines for expert audiences.",
    "It changed how I write openings for operators and founders who get overlooked in under 10 seconds."
  );

  const tensionLine = metricWord(
    tension,
    35,
    70,
    "The old approach was not ideal.",
    "The old approach sounded smart but was quietly ignored.",
    "The old approach looked polished and still killed trust before the real insight even appeared."
  );

  const payoffLine = metricWord(
    payoff,
    35,
    70,
    "I'll explain the lesson.",
    "I'll show the structure and why it works.",
    "I'll break down the exact 3-part opening pattern so you can apply it immediately."
  );

  const credibilityLine = metricWord(
    credibility,
    35,
    70,
    "This is based on recent writing experiments.",
    "This comes from repeated tests with real client drafts.",
    "This comes from live rewrites where small opening changes materially shifted replies, saves, and qualified inbound."
  );

  const output = `${openLine} ${specificityLine} ${tensionLine} ${payoffLine} ${credibilityLine}`;

  const hookScore = Math.round((curiosity + specificity + tension + payoff + credibility) / 5);
  const annotation =
    hookScore >= 70
      ? "Interpretation: strong hook. Curiosity feels earned, and the payoff seems credible."
      : hookScore >= 45
      ? "Interpretation: decent hook. Attention is there, but clarity or trust can still improve."
      : "Interpretation: weak hook. Safe language reduces curiosity and lowers read-through intent.";

  return { output, annotation };
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
        <h3>Hook example ${index + 1}</h3>
        <p><span class="label">Weak hook</span>${escapeHtml(item.weak_hook)}</p>
        <p><span class="label">Strong hook</span>${escapeHtml(item.strong_hook)}</p>
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
        <p><span class="label">Bad opening</span>${escapeHtml(item.before)}</p>
        <p><span class="label">Better opening</span>${escapeHtml(item.after)}</p>
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

function updatePlaygroundOutput() {
  const { output, annotation } = buildOutput();
  document.querySelector("#playgroundOutput").textContent = output;
  document.querySelector("#playgroundAnnotation").textContent = annotation;
}

function setPresetActive(presetId) {
  presetButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.presetId === presetId);
  });
}

function applyPreset(preset) {
  Object.entries(preset.signals).forEach(([id, value]) => {
    signalState[id] = value;
    const slider = document.querySelector(`input[data-signal-id="${id}"]`);
    const valueNode = document.querySelector(`[data-signal-value="${id}"]`);
    if (slider) slider.value = String(value);
    if (valueNode) valueNode.textContent = String(value);
  });

  setPresetActive(preset.id);
  updatePlaygroundOutput();
}

function renderPlayground(signalsData, playgroundData) {
  const controlContainer = document.querySelector("#signalControls");

  controlContainer.innerHTML = `
    <h3>Signals</h3>
    ${signalsData.signals
      .map(
        (signal) => `
        <div class="signal-group">
          <div class="signal-row">
            <strong>${escapeHtml(signal.label)}</strong>
            <span data-signal-value="${escapeHtml(signal.id)}">50</span>
          </div>
          <p class="section-copy">${escapeHtml(signal.description)}</p>
          <input type="range" min="${signal.min}" max="${signal.max}" step="${signal.step}" value="50" data-signal-id="${escapeHtml(signal.id)}" aria-label="${escapeHtml(signal.label)}" />
        </div>
      `
      )
      .join("")}
    <div class="preset-row" id="presetRow"></div>
  `;

  signalsData.signals.forEach((signal) => {
    signalState[signal.id] = 50;
  });

  const sliders = controlContainer.querySelectorAll("input[type='range']");
  sliders.forEach((slider) => {
    slider.addEventListener("input", (event) => {
      const target = event.target;
      const id = target.dataset.signalId;
      const value = Number(target.value);
      signalState[id] = value;
      const valueNode = document.querySelector(`[data-signal-value="${id}"]`);
      if (valueNode) valueNode.textContent = String(value);
      setPresetActive("");
      updatePlaygroundOutput();
    });
  });

  const presetRow = document.querySelector("#presetRow");
  presetRow.innerHTML = playgroundData.presets
    .map(
      (preset) =>
        `<button type="button" class="preset-btn" data-preset-id="${escapeHtml(preset.id)}">${escapeHtml(preset.label)}</button>`
    )
    .join("");

  presetButtons = [...presetRow.querySelectorAll(".preset-btn")];

  presetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const presetId = button.dataset.presetId;
      const preset = playgroundData.presets.find((item) => item.id === presetId);
      if (preset) applyPreset(preset);
    });
  });

  applyPreset(playgroundData.presets[1] ?? playgroundData.presets[0]);
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
    const [sectionsData, examplesData, signalsData] = await Promise.all([
      getJson(contentUrls.sections),
      getJson(contentUrls.examples),
      getJson(contentUrls.signals)
    ]);

    renderHero(sectionsData.hero);
    renderPremise(sectionsData.premise);
    renderComparisons(examplesData.comparisons);
    renderPlayground(signalsData, examplesData.playground);
    renderBeforeAfter(examplesData.before_after);
    renderPrinciples(sectionsData.principles);
    renderClosing(sectionsData.closing);
  } catch (error) {
    document.querySelector("main").innerHTML = `<section class="section"><h1>Unable to load content.</h1><p class="section-copy">${escapeHtml(error.message)}</p></section>`;
  }
}

initialize();
