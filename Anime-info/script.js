/* ==========================================================
   AniScope — powered by the AniList GraphQL API
   (Switched from Jikan/MAL due to Jikan's known, ongoing 504
   reliability issues — see their GitHub issue tracker. AniList
   is free, needs no API key, and allows ~90 requests/minute.)

     Phase 1: graphqlRequest() + renderGrid()  — MVP grid
     Phase 2: setupFilters()                   — category buttons
     Phase 3: setupSearch()                    — debounced search
     Phase 4: openModal() / closeModal()       — detail view
     Phase 5: retry + cache + error banner     — resilience
     Phase 6: CSS handles responsive/hover     — see style.css
   ========================================================== */

const API_URL = "https://graphql.anilist.co";

const gridEl = document.getElementById("anime-grid");
const headingEl = document.getElementById("grid-heading");
const statusBanner = document.getElementById("status-banner");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");

const modalOverlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close");

/* ----------------------------------------------------------
   GRAPHQL QUERIES
   ---------------------------------------------------------- */

const LIST_QUERY = `
  query ($page: Int, $perPage: Int, $sort: [MediaSort], $status: MediaStatus, $search: String, $season: MediaSeason, $seasonYear: Int) {
    Page(page: $page, perPage: $perPage) {
      media(type: ANIME, sort: $sort, status: $status, search: $search, season: $season, seasonYear: $seasonYear) {
        id
        title { romaji english }
        coverImage { large }
        averageScore
        episodes
        status
        genres
      }
    }
  }
`;

const DETAIL_QUERY = `
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title { romaji english }
      coverImage { large extraLarge }
      averageScore
      episodes
      status
      genres
      description(asHtml: false)
      studios(isMain: true) { nodes { name } }
      trailer { id site }
    }
  }
`;

/* ----------------------------------------------------------
   FETCH LAYER
   ---------------------------------------------------------- */

/* Cache keyed by a request's cache key — avoids refetching the
   same data twice and keeps us comfortably under AniList's
   ~90 requests/minute limit. */
const cache = {};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const RETRYABLE_STATUSES = new Set([502, 503, 504]);
const MAX_RETRIES = 3;

/**
 * Sends a GraphQL query to AniList and returns the `data` object.
 * Retries transient server errors with backoff. Throws a readable
 * error (including GraphQL-level errors) for the caller to display.
 */
async function graphqlRequest(query, variables, cacheKey, attempt = 1) {
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  let res;
  try {
    res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (networkErr) {
    if (attempt <= MAX_RETRIES) {
      await sleep(attempt * 700);
      return graphqlRequest(query, variables, cacheKey, attempt + 1);
    }
    throw new Error("Can't reach AniList right now. Check your connection and retry.");
  }

  if (res.status === 429) {
    throw new Error("AniList is rate-limiting us — wait a few seconds and retry.");
  }

  if (RETRYABLE_STATUSES.has(res.status) && attempt <= MAX_RETRIES) {
    await sleep(attempt * 700);
    return graphqlRequest(query, variables, cacheKey, attempt + 1);
  }

  const json = await res.json();

  if (json.errors && json.errors.length > 0) {
    throw new Error(json.errors[0].message || "AniList returned an error.");
  }
  if (!res.ok) {
    throw new Error(`Request failed (${res.status}). Please try again.`);
  }

  cache[cacheKey] = json.data;
  return json.data;
}

async function fetchList(variables, cacheKey) {
  const data = await graphqlRequest(LIST_QUERY, variables, cacheKey);
  return data.Page.media;
}

async function fetchDetail(id) {
  const data = await graphqlRequest(DETAIL_QUERY, { id }, `detail:${id}`);
  return data.Media;
}

/* ----------------------------------------------------------
   FILTER DEFINITIONS
   ---------------------------------------------------------- */

function currentSeason() {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 1 && month <= 3) return "WINTER";
  if (month >= 4 && month <= 6) return "SPRING";
  if (month >= 7 && month <= 9) return "SUMMER";
  return "FALL";
}

const FILTERS = {
  airing: {
    label: "Top Airing",
    variables: { sort: ["POPULARITY_DESC"], status: "RELEASING", perPage: 20 },
  },
  popular: {
    label: "Most Popular",
    variables: { sort: ["POPULARITY_DESC"], perPage: 20 },
  },
  upcoming: {
    label: "Top Upcoming",
    variables: { sort: ["POPULARITY_DESC"], status: "NOT_YET_RELEASED", perPage: 20 },
  },
  seasonal: {
    label: "Seasonal",
    variables: {
      sort: ["POPULARITY_DESC"],
      season: currentSeason(),
      seasonYear: new Date().getFullYear(),
      perPage: 20,
    },
  },
};

/* ----------------------------------------------------------
   GRID RENDERING
   ---------------------------------------------------------- */

const STATUS_LABELS = {
  RELEASING: "Currently Airing",
  FINISHED: "Finished Airing",
  NOT_YET_RELEASED: "Not Yet Aired",
  CANCELLED: "Cancelled",
  HIATUS: "On Hiatus",
};

function getScoreTier(scoreOutOf10) {
  if (!scoreOutOf10) return "low";
  if (scoreOutOf10 >= 8) return "high";
  if (scoreOutOf10 >= 6.5) return "mid";
  return "low";
}

function escapeHtml(str = "") {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/** Strips any leftover HTML tags from AniList's description field. */
function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || "";
}

function getTitle(anime) {
  return anime.title?.english || anime.title?.romaji || "Untitled";
}

function createCard(anime) {
  const card = document.createElement("article");
  card.className = "anime-card";
  card.tabIndex = 0;

  const poster = anime.coverImage?.large || "";
  const scoreOutOf10 = anime.averageScore ? anime.averageScore / 10 : 0;
  const score = scoreOutOf10 ? scoreOutOf10.toFixed(2) : "—";
  const scoreTier = getScoreTier(scoreOutOf10);

  const isAiring = anime.status === "RELEASING";
  const statusLabel = STATUS_LABELS[anime.status] || "Unknown";
  const episodes = anime.episodes ? `${anime.episodes} eps` : "? eps";
  const title = getTitle(anime);

  card.innerHTML = `
    <div class="poster-wrap">
      <img src="${poster}" alt="${escapeHtml(title)} poster" loading="lazy" />
      <span class="status-pill ${isAiring ? "airing" : ""}">${statusLabel}</span>
      <div class="score-stamp ${scoreTier}">
        <span class="num">${score}</span>
      </div>
      <div class="card-info">
        <h3 class="card-title">${escapeHtml(title)}</h3>
        <span class="card-meta">${episodes}</span>
      </div>
    </div>
  `;

  const openHandler = () => openModal(anime.id);
  card.addEventListener("click", openHandler);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openHandler();
    }
  });

  return card;
}

function renderSkeletons(count = 10) {
  gridEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const sk = document.createElement("div");
    sk.className = "skeleton";
    sk.innerHTML = `<div class="poster-wrap"></div>`;
    gridEl.appendChild(sk);
  }
}

function renderGrid(animeList) {
  gridEl.innerHTML = "";

  if (!animeList || animeList.length === 0) {
    showStatus("No results found. Try a different search or category.");
    return;
  }

  hideStatus();
  const fragment = document.createDocumentFragment();
  animeList.forEach((anime) => fragment.appendChild(createCard(anime)));
  gridEl.appendChild(fragment);
}

/* ----------------------------------------------------------
   STATUS BANNER (errors + empty states)
   ---------------------------------------------------------- */

function showStatus(message, { retryable = false } = {}) {
  statusBanner.innerHTML = "";
  statusBanner.append(document.createTextNode(message));

  if (retryable) {
    const retryBtn = document.createElement("button");
    retryBtn.className = "retry-btn";
    retryBtn.textContent = "Retry";
    retryBtn.addEventListener("click", () => {
      if (lastLoad) runLoad(lastLoad.cacheKey, lastLoad.headingText, lastLoad.fetchFn);
    });
    statusBanner.appendChild(retryBtn);
  }

  statusBanner.classList.remove("hidden");
}

function hideStatus() {
  statusBanner.classList.add("hidden");
}

/* ----------------------------------------------------------
   CORE LOAD / RENDER PIPELINE
   ---------------------------------------------------------- */

let lastLoad = null; // { cacheKey, headingText, fetchFn } — replayed by Retry
let activeRequestId = 0; // guards against out-of-order responses

async function runLoad(cacheKey, headingText, fetchFn) {
  const requestId = ++activeRequestId;
  lastLoad = { cacheKey, headingText, fetchFn };

  headingEl.textContent = headingText;
  renderSkeletons();
  hideStatus();

  try {
    const animeList = await fetchFn();
    if (requestId !== activeRequestId) return;
    renderGrid(animeList);
  } catch (err) {
    if (requestId !== activeRequestId) return;
    gridEl.innerHTML = "";
    showStatus(err.message || "Something went wrong.", { retryable: true });
  }
}

/* ----------------------------------------------------------
   PHASE 2: FILTERS
   ---------------------------------------------------------- */

function setupFilters() {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;

      searchInput.value = "";
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.dataset.filter;
      const { label, variables } = FILTERS[key];
      runLoad(`filter:${key}`, label, () => fetchList(variables, `filter:${key}`));
    });
  });
}

/* ----------------------------------------------------------
   PHASE 3: DEBOUNCED SEARCH
   ---------------------------------------------------------- */

const DEBOUNCE_MS = 400;
let debounceTimer = null;

function setupSearch() {
  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    debounceTimer = setTimeout(() => {
      if (query.length === 0) {
        const active = document.querySelector(".filter-btn.active") || filterButtons[0];
        const key = active.dataset.filter;
        const { label, variables } = FILTERS[key];
        runLoad(`filter:${key}`, label, () => fetchList(variables, `filter:${key}`));
        return;
      }

      filterButtons.forEach((b) => b.classList.remove("active"));

      const cacheKey = `search:${query}`;
      const variables = { search: query, sort: ["SEARCH_MATCH"], perPage: 20 };
      runLoad(cacheKey, `Results for "${query}"`, () => fetchList(variables, cacheKey));
    }, DEBOUNCE_MS);
  });
}

/* ----------------------------------------------------------
   PHASE 4: DETAIL MODAL
   ---------------------------------------------------------- */

function buildTrailerLink(anime) {
  const trailer = anime.trailer;
  if (!trailer || !trailer.id || (trailer.site || "").toLowerCase() !== "youtube") return "";
  const url = `https://www.youtube.com/watch?v=${trailer.id}`;
  return `
    <a class="trailer-link" href="${url}" target="_blank" rel="noopener noreferrer">
      ▶ Watch trailer
    </a>
  `;
}

function renderModal(anime) {
  const poster = anime.coverImage?.large || anime.coverImage?.extraLarge || "";
  const title = getTitle(anime);
  const scoreOutOf10 = anime.averageScore ? (anime.averageScore / 10).toFixed(2) : "—";

  const genres = (anime.genres || [])
    .map((g) => `<span class="tag">${escapeHtml(g)}</span>`)
    .join("");

  const studios = (anime.studios?.nodes || []).map((s) => s.name).join(", ") || "Unknown studio";
  const synopsis = anime.description
    ? escapeHtml(stripHtml(anime.description))
    : "No synopsis available for this title yet.";

  modalBody.innerHTML = `
    <div class="modal-hero">
      <img src="${poster}" alt="${escapeHtml(title)} poster" />
      <div class="modal-hero-info">
        <h2 id="modal-title">${escapeHtml(title)}</h2>
        <div class="modal-tags">${genres}</div>
        <div class="modal-stats">
          <span>★ <strong>${scoreOutOf10}</strong></span>
          <span>${anime.episodes ? `${anime.episodes} episodes` : "Episodes TBA"}</span>
          <span>${escapeHtml(studios)}</span>
        </div>
      </div>
    </div>
    <div class="modal-body-content">
      <h3>Synopsis</h3>
      <p>${synopsis}</p>
      ${buildTrailerLink(anime)}
    </div>
  `;
}

async function openModal(animeId) {
  modalOverlay.classList.remove("hidden");
  modalBody.innerHTML = `<div class="modal-body-content"><p>Loading details…</p></div>`;
  document.body.style.overflow = "hidden";

  try {
    const anime = await fetchDetail(animeId);
    renderModal(anime);
  } catch (err) {
    modalBody.innerHTML = `
      <div class="modal-body-content">
        <h3>Couldn't load details</h3>
        <p>${escapeHtml(err.message || "Something went wrong.")}</p>
      </div>
    `;
  }
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  document.body.style.overflow = "";
}

function setupModal() {
  modalCloseBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */

setupFilters();
setupSearch();
setupModal();
runLoad("filter:airing", FILTERS.airing.label, () =>
  fetchList(FILTERS.airing.variables, "filter:airing")
);