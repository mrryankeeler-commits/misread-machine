const contentUrls = {
  sections: "./content/sections.json",
  examples: "./content/examples.json",
  signals: "./content/signals.json"
};

const signalState = {};
let presetButtons = [];

function escapeHtml(text) {
  return text
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
  const specificity = signalState.specificity ?? 50;
  const proof = signalState.proof ?? 50;
  const clarity = signalState.clarity ?? 50;
  const tension = signalState.tension ?? 50;
  const warmth = signalState.warmth ?? 50;

  const base = "I help experienced professionals become easier to trust online";

  const specificityPhrase = metricWord(
    specificity,
    35,
    70,
    "through better communication",
    "through clearer positioning",
    "by clarifying who they help, where value shows up, and what outcomes shift"
  );

  const proofPhrase = metricWord(
    proof,
    35,
    70,
    "using practical ideas",
    "using practical examples and lived patterns",
    "using concrete examples, real decision patterns, and observable outcomes"
  );

  const clarityPhrase = metricWord(
    clarity,
    35,
    70,
    "in ways that feel useful",
    "so buyers can understand quickly",
    "so sophisticated buyers can read credibility in seconds"
  );

  const tensionPhrase = metricWord(
    tension,
    35,
    70,
    "without overcomplicating the message",
    "while naming common mistakes that dilute trust",
    "by challenging safe generic takes that flatten expertise"
  );

  const warmthPhrase = metricWord(
    warmth,
    35,
    70,
    "with a direct style",
    "with a direct but human tone",
    "with precision, warmth, and the occasional dry eyebrow raise"
  );

  const output = `${base} ${specificityPhrase}, ${proofPhrase}, ${clarityPhrase}, ${tensionPhrase}, ${warmthPhrase}.`;

  const trustIndex = Math.round((specificity + proof + clarity + tension + warmth) / 5);
  const annotation =
    trustIndex >= 70
      ? "Interpretation: high trust signal. The message feels specific, credible, and thought-through."
      : trustIndex >= 45
      ? "Interpretation: moderate trust signal. The idea is sound, but some parts still read broad."
      : "Interpretation: weak trust signal. It sounds safe, but hard to distinguish quickly.";

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
