# 1 Minimalist Digital Clock

A sleek, browser-based digital clock widget with a dynamic greeting, built as part of a daily coding challenge. 

## Features
* **12-Hour Format:** Displays time in a standard 12-hour AM/PM format using real-time system data.
* **Dynamic Greeting:** Automatically updates the greeting (Good Morning, Good Afternoon, Good Evening) based on the local time.
* **Minimalist Aesthetic:** Features a clean, dark grey UI designed for distraction-free viewing.

## Technologies Used
* HTML5
* CSS3 (Flexbox)
* Vanilla JavaScript

## How to Run
1. Download or clone these files to your local machine.
2. Locate the `DynamicClock.html` file.
3. Double-click `index.html` to open it in any modern web browser. No local server or installation is required!

<br>
<br>
<hr>

# 2 Random Quote Generator

A minimalist, browser-based application that serves up random quotes at the click of a button. Built as Day 2 of a daily coding challenge series.

## Features
* **Randomization Logic:** Utilizes JavaScript's `Math.random()` to dynamically select and display quotes from a custom data array.
* **Curated Content:** Pre-loaded with iconic quotes from anime series including *Attack on Titan*, *One Punch Man*, and *Chainsaw Man*.
* **Minimalist UI:** Designed with a sleek, dark grey aesthetic and smooth CSS transitions for a polished user experience.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Download or clone this repository to your local machine.
2. Locate the `RandomQuoteGen.html` file.
3. Double-click the file to open it in any modern web browser. No server setup or installation is required!

## Project Learnings
* Storing data in JavaScript arrays and objects.
* Using mathematical functions (`Math.floor` and `Math.random`) to generate random indices.
* Connecting HTML button elements to JavaScript functions using event listeners (`onclick`).

<br>
<br>
<hr>

# 3 Car Loan Calculator

A browser-based financial calculator that computes monthly car loan payments based on vehicle price, interest rate, term length, and down payment. Built as Day 3 of a daily coding challenge series.

## Features
* **Amortization Math:** Uses standard loan calculation formulas to determine exact monthly payments.
* **Textarea Output:** Dynamically generates a clean, readable text summary of the loan breakdown inside a readonly `<textarea>` element.
* **Error Handling:** Validates user input to ensure empty or invalid fields trigger a helpful error message rather than breaking the application.
* **Minimalist UI:** Maintains the series' signature dark grey aesthetic.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Locate the `carLoanInfo.html` file.
2. Double-click the file to open it in any modern web browser. 

## Project Learnings
* Retrieving and parsing string values from HTML inputs into JavaScript numbers (`parseFloat` and `parseInt`).
* Handling conditional logic for optional inputs (like Down Payments).
* Using JavaScript Template Literals (backticks) to format multi-line strings easily.
* Displaying output inside a `<textarea>` instead of standard HTML `<div>` elements.

<br>
<br>
<hr>

# 4 Timer

A distraction-free, browser-based Pomodoro timer designed to track 25-minute focus sessions. Built as Day 4 of a daily coding challenge series.

## Features
* **Session Management:** Standard 25-minute countdown with intuitive Start, Pause, and Reset controls.
* **Glassmorphism UI:** Features a dynamic, blurred background image with a frosted glass effect on the central timer card.
* **Bulletproof Centering:** Utilizes absolute positioning (`top: 50%`, `left: 50%`) to ensure the timer card remains perfectly centered regardless of the viewport or flexbox quirks.
* **Dynamic Tab Title:** Automatically updates the browser tab title so you can track your remaining time while working in other tabs.
* **Tabular Typography:** Utilizes CSS `font-variant-numeric: tabular-nums` to ensure the numbers remain a fixed width, preventing the layout from jittering as the seconds change.
* **State Protection:** Built-in JavaScript logic prevents users from accidentally triggering multiple overlapping intervals.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript

## How to Run
1. Download or clone this repository to your local machine.
2. Locate the `Timer.html` file.
3. Double-click the file to open it in any modern web browser. No server setup is required!

## Project Learnings
* Managing state variables (`isRunning`) in JavaScript to control application behavior.
* Using `setInterval()` to create loops based on real-time clock cycles, and `clearInterval()` to destroy those loops.
* Utilizing CSS pseudo-elements (`::before`) to create independent background layers for blur effects without affecting the foreground content.
* Implementing absolute positioning for foolproof vertical and horizontal centering.

<br>
<br>
<hr>

#  5 Music Player

A sleek, minimalist web-based music player built using pure HTML, CSS, and JavaScript. It features a dark theme UI, custom audio controls, and dynamic track switching.

## ✨ Features

* **Custom Controls:** Play, pause, skip forward, and skip backward.
* **Progress Tracking:** Interactive progress bar with real-time current and total duration displays.
* **Repeat Functionality:** Toggle a repeat mode to loop the current track continuously.
* **Minimalist UI:** A clean, fixed-card layout with a dark theme and frosted background effects.
* **Dynamic Loading:** Automatically updates the cover art, track title, and artist name when switching songs.

## 🛠️ Technologies Used

* **HTML5:** Audio element integration and structural layout.
* **CSS3:** Flexbox, custom range sliders, absolute positioning, and hover animations.
* **JavaScript (Vanilla):** DOM manipulation, event listeners (`timeupdate`, `ended`, `loadedmetadata`), and array-based playlist management.

---

## 📂 Folder Structure

For the code to successfully find your songs and images, your files **must** be kept together in the exact following structure. 

```text
MusicPlayer/
│
├── MusicPlayer.html                 # Your main HTML file containing the player code
│
├── MusicBackground/            # Folder containing all visuals
│   ├── background.jpg
│   └── coverart.png
│
└── MusicAudio/                 # Folder containing all music tracks
    ├── 7 Years [Official Music Video]_LHCob76kigA.mp3
    ├── Another Love (Lyrics)_QFE0WqS2mhI.mp3
    ├── Eastside (official video).mp3
    └── Ed_Sheeran_-_Shape_of_You_[Official_Video].mp3
```

<br>
<br>
<hr>

# 6 Kanban Board

A sleek, self-contained task management tool built entirely with front-end technologies. Designed with a signature minimalist dark grey aesthetic, this project demonstrates dynamic DOM manipulation, persistent browser storage, and native browser APIs without relying on external libraries or frameworks.

## 🚀 Features

* **HTML5 Drag and Drop:** Seamlessly pick up, drag, and snap task cards across three distinct columns (To Do, In Progress, Done) using the native HTML5 Drag and Drop API.
* **Persistent Local Storage:** Tasks are saved directly to the browser's `localStorage`. Your board state is instantly preserved and restored even after refreshing or closing the page.
* **Dynamic Task Management:** Create new tasks on the fly using the input field (or by pressing the `Enter` key) and remove completed tasks using the hidden-on-hover delete button.
* **Single-File Architecture:** The entire application, including the custom Base64-encoded background image, is contained within a single HTML file for ultimate portability and zero broken links.
* **Tactile UI/UX:** Features soft CSS transitions, hover elevations (`transform: translateY`), and column drop-zone highlighting to provide immediate visual feedback.

## 🛠️ Technology Stack

* **HTML5:** Semantic structure and native Drag and Drop event handling (`dragstart`, `dragover`, `drop`).
* **CSS3:** Flexbox-driven layouts, custom scrollbars, and a cohesive dark grey color palette (`#1a1a1a`, `#262626`, `#333333`).
* **Vanilla JavaScript:** Core logic for DOM element creation, event listeners, and local storage read/write operations.

## 📋 How to Use

1. **Run the App:** There is no build step or server required. Simply double-click the `index.html` file to open it in any modern web browser.
2. **Add a Task:** Type your task into the "What needs to be done?" input field and click **Add** or press **Enter**.
3. **Move a Task:** Click and hold any task card, drag it over to a new column, and release the mouse to drop it.
4. **Delete a Task:** Hover over any existing task card to reveal the **×** button in the top right corner. Click it to permanently remove the task.

## 🧠 Core Concepts Explored

* **Data Serialization:** Converting DOM elements into stringified HTML to store in `localStorage` and parsing them back upon page load.
* **Event Propagation:** Utilizing `event.stopPropagation()` to ensure delete button clicks do not accidentally trigger the drag-and-drop event listeners.
* **Base64 Image Encoding:** Embedding heavy visual assets directly into the CSS via Data URIs to eliminate external HTTP requests and folder dependencies.

<br>
<br>
<hr>

# 7 Movie Search

A sleek, single-page web application that interfaces directly with the OMDb API to fetch and display movie information in real-time. Built with a minimalist dark grey aesthetic, this project demonstrates asynchronous JavaScript, API integration, and dynamic DOM manipulation.

## 🚀 Features

* **Live API Integration:** Communicates with the OMDb (Open Movie Database) API to retrieve up-to-date information on global film releases.
* **Asynchronous Data Fetching:** Utilizes modern JavaScript `async/await` and the `fetch` API to handle network requests smoothly without freezing the user interface.
* **Dynamic DOM Manipulation:** Generates and injects HTML structural elements (movie posters, cast details, plots, and metadata) on the fly based on the JSON response.
* **Error Handling:** Built-in fallback logic to display a user-friendly error message if a movie title cannot be found in the database.
* **Keyboard Accessibility:** Includes an event listener that allows users to seamlessly trigger a search by pressing the `Enter` key.

## 🛠️ Technology Stack

* **HTML5:** Semantic structure for the search interface and data presentation.
* **CSS3:** Flexbox-driven layout with a cohesive dark theme (`#1a1a1a`, `#262626`) and responsive design principles.
* **Vanilla JavaScript:** Core logic for API requests, JSON parsing, and DOM updates without the need for external libraries like React or jQuery.
* **OMDb API:** A RESTful web service to obtain movie information.

## 📋 How to Use

1. **Run the App:** No build step or local server is required. Simply double-click the HTML file to open it in any modern web browser.
2. **Search:** Type a movie title into the search bar (e.g., *Project Hail Mary*, *Train to Busan*, or *The Odyssey*) and press **Enter** or click the **Search** button.
3. **View Results:** The application will instantly reveal the movie's official poster, release year, age rating, runtime, plot summary, director, cast, and genre.

## 🔑 API Key Setup

This application currently uses a public demo key (`d0061f7e`) for testing purposes. If you plan to deploy this project or use it heavily, you should replace it with your own free OMDb API key.

1. Get a free API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).
2. Open the HTML file in your code editor.
3. Locate the `apiKey` variable at the top of the `<script>` section.
4. Replace the demo key with your new, private string: `const apiKey = 'YOUR_KEY_HERE';`


<br>
<br>
<hr>

# 8 Valorant Protocol | Agent Roster

A dynamic, single-page web application that displays the complete roster of Valorant agents. Built with a responsive CSS Grid and Vanilla JavaScript, this project fetches live data from the community-driven Valorant API and allows users to filter characters by their tactical roles.

## 🚀 Features

* **Live API Integration:** Automatically fetches up-to-date agent data (names, roles, descriptions, and official transparent portraits) using the `valorant-api.com` REST service.
* **Instant Array Filtering:** Seamlessly filter the roster by role (Duelist, Initiator, Controller, Sentinel) using JavaScript's `.filter()` method for instant DOM updates without page reloads.
* **Responsive CSS Grid:** Utilizes advanced `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` to automatically adapt the layout to any screen size.
* **Sleek UI/UX:** Features a custom dark theme with "Valorant Red" accents (`#ff4655`), smooth hover elevations, image zoom transitions, and a parallax background overlay to maintain strict text contrast.
* **Zero Dependencies:** Built entirely with native HTML5, CSS3, and modern ES6 JavaScript (`async/await`, `fetch`). No React, jQuery, or external CSS frameworks required.

## 🛠️ Technology Stack

* **HTML5:** Semantic document structure.
* **CSS3:** Flexbox for alignment, CSS Grid for responsive cards, CSS transitions for interactive hover states, and linear gradients for image overlays.
* **Vanilla JavaScript:** API requests, JSON parsing, dynamic DOM element creation, and event-driven array filtering.

## 📋 How to Use

1. **Run the App:** There is no build step, `npm install`, or local server required. Save the code as an `.html` file and open it directly in any modern web browser.
2. **Browse Agents:** Scroll through the grid to view every playable agent currently in the game.
3. **Filter by Role:** Click any of the category buttons at the top of the screen (e.g., "Duelists" or "Sentinels") to instantly isolate specific agent types. 
4. **View All:** Click "All Agents" to reset the grid and view the full roster again.

## 🧠 Code Architecture Notes

* **Single-File Structure:** The entire application is contained within one file, utilizing internal `<style>` and `<script>` tags for ultimate portability.
* **Data Mapping:** The raw API payload is mapped down to a simplified object structure (`name`, `role`, `desc`, `img`) before rendering, keeping the DOM generation logic clean and readable.
* **CSS Object-Fit:** Portrait images utilize `object-fit: cover` and `object-position: top` to perfectly fill the uniform placeholder boxes regardless of the raw image dimensions.

<br>
<br>
<hr>

# 9 Anime info  — Anime Discovery Dashboard

A dynamic, single-page web app that lets users search, browse, and explore anime through a live, dark-themed dashboard. Built as a portfolio project to practice real-world frontend fundamentals: async data fetching, dynamic DOM rendering, and responsive UI design — all without a framework.

---

## 1. About the Project

AniScope is a live content portal for anime discovery. Instead of static, hardcoded content, every card on the screen is pulled from a real, external data source in real time.

**Core features:**
- **Live Search** — a debounced search bar that looks up any anime as you type, without spamming requests on every keystroke
- **Category Filters** — quick-switch buttons for Top Airing, Most Popular, Top Upcoming, and Seasonal releases
- **Interactive Media Grid** — a responsive card grid showing poster art, score badges, airing status, and episode counts
- **Detail Modal** — clicking any card opens an overlay with the full synopsis, genres, studio, and trailer link
- **Error Handling & Retry** — if the data source has a temporary hiccup, the app retries automatically, and shows a manual Retry option if it still fails

The goal was to build something that *feels* like a real product, not a static demo — the kind of project that shows up well in a portfolio because the data is alive.

---

## 2. Design & Tech Stack

**Visual direction:** a dark, high-contrast UI inspired by manga print aesthetics — a subtle halftone dot texture in the header, and score badges styled like circular ink stamps, tilted slightly for a hand-stamped feel.

**Design tokens:**
- **Color:** deep navy/ink background, elevated card surfaces, a warm gold accent for scores and highlights, teal for "airing" status, and a muted rose for errors
- **Typography:** a bold condensed display face for headings and titles (poster-like feel), a clean sans-serif for body text, and a monospace face for data — scores, episode counts — to give it a "readout" feel
- **Layout:** CSS Grid with `auto-fill` and `minmax()` so the card grid reflows automatically across mobile, tablet, and desktop with no manual breakpoints needed for the grid itself

**Tech stack:**
| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styling | Vanilla CSS3 — CSS Grid, Flexbox, custom properties (CSS variables), transitions |
| Logic | Vanilla JavaScript (ES6+) — no frameworks, no build tools |

Everything runs directly in the browser from three files — no bundler, no dependencies, no installation required.

---

## 3. JavaScript & API

The app is powered by a **free, open-source, key-free public API** for anime data. No signup, no API key, and no backend server of our own — the browser talks directly to the API.

**How the JavaScript is structured:**
- **Fetch layer** — a single reusable function handles every outgoing request, including error handling and automatic retries if the server has a temporary issue
- **Caching** — results are cached in memory per request, so switching back to a filter or search you've already used doesn't re-fetch the same data
- **Render layer** — a dedicated function clears and rebuilds the grid from whatever data comes back, keeping data-fetching and DOM-building cleanly separated
- **Race-condition protection** — if the user fires off multiple requests quickly (e.g. clicking filters fast), only the most recently requested response is allowed to render, so the screen never shows stale results
- **Event layer** — separate setup functions wire up the filter buttons, the debounced search input, and the modal's open/close behavior

The JavaScript is written entirely in modern ES6+ style: `async/await`, template literals, arrow functions, and `fetch()` — no libraries involved.

---

## 4. File Structure

```
anime-dashboard/
├── index.html     → page structure & layout
├── style.css      → all visual styling
└── script.js      → all app logic & data fetching
```

**How the three files connect:**

```
index.html
   ├─ loads style.css   (in <head>, applies the visual theme)
   └─ loads script.js   (at the end of <body>, runs after the page loads)

script.js
   ├─ selects elements already defined in index.html
   │    (search input, filter buttons, grid container, modal)
   ├─ fetches data from the API
   └─ injects new HTML into index.html's grid/modal containers,
        which is then styled automatically by style.css
```

In short: **`index.html`** provides the empty skeleton and containers, **`script.js`** fills those containers with live data and handles all interaction, and **`style.css`** makes everything look intentional. None of the three files needs to be edited to update the others — new cards, new filters, or new modal content all flow through the same containers already defined in the HTML.
