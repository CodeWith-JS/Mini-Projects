<<<<<<< HEAD
# LinkShield

LinkShield is a lightweight, privacy-friendly URL security analyzer built as a small full-stack web project.

The main idea is simple:

> **Don't click. Check first.**

A user enters a URL, LinkShield analyzes its structure using a rule-based security engine, calculates a risk score, and presents the findings in a modern cybersecurity-focused interface.

The current version does **not require user accounts or a database** to perform scans. The architecture is intentionally organized so authentication, MySQL, scan history, and a dashboard can be added later without rewriting the core scanner.

---

## 1. Project Goals

### Current Goals

- Build a polished cybersecurity-style web application.
- Allow anyone to enter a URL and scan it.
- Analyze URLs using local/rule-based heuristics.
- Generate a security score from 0 to 100.
- Classify the result as:
  - LOW
  - MEDIUM
  - HIGH
  - INVALID
- Explain individual security checks instead of only showing a score.
- Keep the current scanner independent from authentication and databases.
- Maintain a clean backend structure that can be extended later.

### Future Goals

- Add optional user authentication.
- Add MySQL for persistent data.
- Store scan history.
- Create a personal dashboard.
- Add more advanced URL and domain analysis.
- Add external threat-intelligence integrations where appropriate.
- Add rate limiting, logging, validation, testing, and production deployment.
- Improve the scoring engine as new detection rules are added.

---

## 2. Important Security Disclaimer

LinkShield's score is a **heuristic risk assessment**, not proof that a website is safe or malicious.

A URL can receive a LOW score and still be dangerous, or receive a warning because of a legitimate URL pattern.

The application should therefore use wording such as:

- "Low risk detected"
- "Potentially suspicious"
- "Some concerns detected"

It should not claim:

- "This website is definitely safe."
- "This website is definitely malware."
- "This URL is guaranteed secure."

The project is intended as an educational and practical URL-analysis tool.

---

## 3. Current Technology Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Backend

- Node.js
- Express.js

### Security / Middleware

- Helmet
- CORS
- dotenv

### Current URL Analysis

- JavaScript `URL` parser
- Custom rule-based detection engine

### Planned Database

- MySQL
- MySQL Workbench for development

### Planned Authentication

- bcrypt/bcryptjs for password hashing
- JWT for authentication

---

## 4. Current Application Flow

```text
User
  |
  v
Frontend URL Input
  |
  v
JavaScript fetch()
  |
  | POST /api/scan
  v
Express Server
  |
  v
scanRoutes.js
  |
  v
URL Analyzer
  |
  +--> HTTPS check
  +--> IP address check
  +--> suspicious keyword check
  +--> URL length check
  +--> port check
  +--> @ symbol check
  |
  v
Security Score
  |
  v
Risk Level
  |
  v
JSON Response
  |
  v
Frontend Result Card
```

---

# 5. Current Features

## 5.1 URL Scanner

The user enters a URL such as:

```text
https://example.com
```

The frontend sends the URL to:

```text
POST /api/scan
```

The backend analyzes it and returns the result.

---

## 5.2 HTTPS Detection

The analyzer checks whether the URL uses HTTPS.

Example:

```text
https://example.com
```

is treated more favorably than:

```text
http://example.com
```

HTTPS alone does not prove that a website is trustworthy.

---

## 5.3 IP Address Detection

The analyzer checks whether a URL uses an IPv4 address instead of a normal domain.

Example:

```text
http://192.168.1.10/login
```

This can receive a warning because direct IP URLs are sometimes used in suspicious links.

---

## 5.4 Suspicious Keyword Detection

The current analyzer checks for words such as:

```text
login
verify
verification
password
account
update
secure
confirm
bank
wallet
signin
free
```

The presence of these words does not automatically mean a URL is malicious.

The engine uses them as one signal among several.

---

## 5.5 URL Length Detection

Unusually long URLs can receive a warning.

This is only a heuristic because legitimate services can also use long URLs.

---

## 5.6 Port Detection

The analyzer checks for explicitly specified ports.

Common web ports are treated differently from unusual ports.

---

## 5.7 `@` Symbol Detection

URLs containing an `@` symbol receive additional scrutiny.

For example:

```text
https://example.com@evil.example
```

can be deceptive because the actual hostname is after the `@`.

This is one of the important URL-structure checks.

---

# 6. Current Security Score

The current scoring system starts at:

```text
100
```

Potential deductions are applied when suspicious patterns are detected.

The final score is restricted to:

```text
0 - 100
```

Current risk classification:

```text
80 - 100  -> LOW
50 - 79   -> MEDIUM
0 - 49    -> HIGH
```

Invalid URLs receive:

```text
0 / INVALID
```

The scoring system is intentionally simple in the first version.

It should become more sophisticated as the project grows.

---

# 7. API

## GET /

Health-check endpoint.

Example response:

```json
{
  "success": true,
  "message": "LinkShield API is running"
}
```

---

## POST /api/scan

Analyzes a URL.

### Request

```json
{
  "url": "https://example.com"
}
```

### Successful response

```json
{
  "success": true,
  "result": {
    "valid": true,
    "url": "https://example.com",
    "domain": "example.com",
    "protocol": "https:",
    "score": 100,
    "riskLevel": "LOW",
    "checks": []
  }
}
```

### Invalid request

```json
{
  "success": false,
  "message": "URL is required."
}
```

---

# 8. Current File Structure

The project is designed to separate frontend and backend code.

```text
linkshield/
│
├── frontend/
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   └── dashboard.js
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── backend/
│   │
│   ├── config/
│   │   └── database.js              # Planned
│   │
│   ├── controllers/
│   │   ├── authController.js        # Planned
│   │   └── scanController.js        # Planned/refactor target
│   │
│   ├── middleware/
│   │   └── authMiddleware.js        # Planned
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Planned
│   │   └── scanRoutes.js
│   │
│   ├── services/
│   │   └── urlAnalyzer.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md                        # This document can become the main README
```

Some files are intentionally planned ahead of implementation. Empty or unused future modules should not be allowed to break the current public scanner.

---

# 9. Backend Architecture

The intended backend architecture is:

```text
server.js
   |
   +--> routes
           |
           +--> controllers
                    |
                    +--> services
                    |
                    +--> database
```

### server.js

Responsible for:

- Creating the Express application.
- Registering middleware.
- Registering routes.
- Starting the HTTP server.

It should not contain the complete URL-analysis logic.

### routes/

Responsible for:

- Defining API endpoints.
- Passing requests to the appropriate controller.

### controllers/

Responsible for:

- Reading request data.
- Validating request-level requirements.
- Calling services.
- Returning HTTP responses.

### services/

Responsible for business logic.

The URL analyzer belongs here because URL analysis should be independent from Express.

### middleware/

Future location for:

- Authentication
- Authorization
- Rate limiting
- Request validation
- Error handling

### config/

Future location for:

- MySQL connection
- Application configuration
- Other external service configuration

---

# 10. Future URL Analysis Engine

The current analyzer is intentionally small.

Future checks can include:

## Domain Checks

- Punycode / IDN detection
- Excessive subdomains
- Suspicious domain structure
- Homograph-style indicators
- Domain length
- Unusual TLD indicators
- Numeric-heavy domains

## URL Checks

- Excessive URL encoding
- Hexadecimal encoding
- Suspicious redirects
- Excessive query parameters
- Very long paths
- Repeated special characters
- Multiple `@`-style deceptive patterns
- Unusual ports
- Fragment abuse

## Shortened URL Detection

Potential shortener domains could be identified and flagged as:

```text
Redirect-based URL
```

The application should avoid claiming that URL shortening is inherently malicious.

## Keyword Analysis

Improve the current keyword system by:

- Weighting keywords differently.
- Looking at keyword combinations.
- Separating benign and suspicious contexts.
- Avoiding excessive false positives.

---

# 11. Future Threat Intelligence

Later versions can optionally integrate external intelligence services.

Possible architecture:

```text
                 URL
                  |
                  v
          Local URL Analyzer
                  |
          +-------+-------+
          |               |
          v               v
     Local Rules     Threat Intel API
          |               |
          +-------+-------+
                  |
                  v
            Final Analysis
```

External APIs should be added only after the local analyzer is stable.

The application should also handle:

- API failures
- API timeouts
- Rate limits
- Missing API keys
- Privacy considerations
- Service availability

The scanner should not completely fail just because an external intelligence service is unavailable.

---

# 12. Future Database Plan

MySQL is **not required for the current public scanner**.

It is kept as a future capability.

When persistence is needed, the planned database can contain tables such as:

```text
users
scans
```

Potential `users` table:

```text
users
--------------------------------
id
name
email
password
created_at
```

Potential `scans` table:

```text
scans
--------------------------------
id
user_id
url
score
risk_level
result
created_at
```

Relationship:

```text
users
  |
  | 1
  |
  | many
  v
scans
```

A user can therefore have many scan records.

---

# 13. Future Authentication

Authentication is optional and should be introduced later.

Planned flow:

```text
Register
   |
   v
Password Hashing
   |
   v
MySQL
   |
   v
Login
   |
   v
JWT
   |
   v
Protected Dashboard
```

Security requirements:

- Never store plaintext passwords.
- Hash passwords using bcrypt/bcryptjs.
- Keep JWT secrets in environment variables.
- Validate input.
- Protect private routes.
- Use appropriate token expiration.
- Do not expose passwords in API responses.

---

# 14. Future Dashboard

A future dashboard can show:

```text
----------------------------------------
           LINKSHIELD DASHBOARD
----------------------------------------

Total Scans       42
Low Risk          31
Medium Risk        7
High Risk          4

----------------------------------------

Recent Scans

example.com              100   LOW
github.com                98   LOW
unknown-site.xyz          41   HIGH
some-login-site.com       62   MEDIUM
```

Possible future dashboard features:

- Scan history
- Search
- Filtering
- Sorting
- Statistics
- Charts
- Delete scan history
- Re-scan URL
- Export results

---

# 15. Privacy Model

A major design goal is to keep the public scanner simple and privacy-friendly.

Current model:

```text
No account required
No database required
No scan history required
```

The current backend should analyze the URL and return the result without needing to permanently store it.

If database functionality is added later, the application should clearly explain:

- What is stored.
- Why it is stored.
- How long it is stored.
- How users can delete it.

---

# 16. Production Improvements

Before calling LinkShield production-ready, the project should add:

## Backend

- Centralized error handling
- Request validation
- Rate limiting
- Structured logging
- Security headers
- Input size limits
- CORS configuration
- Environment-based configuration
- API versioning if appropriate

## Frontend

- Better loading states
- Accessible forms
- Keyboard navigation
- Mobile optimization
- Error messages
- Empty states
- Scan history UI when persistence is introduced

## Testing

Planned testing levels:

```text
Unit Tests
    |
    v
URL Analyzer Tests
    |
    v
API Tests
    |
    v
Frontend Integration Tests
```

Important test cases:

- Valid HTTPS URL
- HTTP URL
- Invalid URL
- IP address
- Long URL
- Suspicious keywords
- `@` symbol
- Unusual port
- Empty input
- Malformed JSON
- Very large input

---

# 17. Future File Structure

As the project becomes more advanced, the structure can evolve into:

```text
linkshield/
│
├── frontend/
│   ├── css/
│   │   ├── style.css
│   │   ├── auth.css
│   │   └── dashboard.css
│   │
│   ├── js/
│   │   ├── app.js
│   │   ├── api.js
│   │   ├── auth.js
│   │   └── dashboard.js
│   │
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── scanController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── rateLimitMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── scanRoutes.js
│   │
│   ├── services/
│   │   ├── urlAnalyzer.js
│   │   ├── threatIntelService.js
│   │   └── scoringService.js
│   │
│   ├── utils/
│   │   ├── validators.js
│   │   └── logger.js
│   │
│   ├── tests/
│   │   ├── analyzer.test.js
│   │   └── scan.test.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── docs/
│   ├── architecture.md
│   └── api.md
│
├── README.md
└── LICENSE
```

---

# 18. Development Roadmap

## Phase 1 — Core Scanner

Status:

- [x] Project created
- [x] Express server
- [x] Frontend landing page
- [x] Modern dark/glass UI
- [x] URL input
- [x] Scan API
- [x] Basic URL analyzer
- [x] Security score
- [x] Risk classification
- [x] Result UI

## Phase 2 — Better Detection

Planned:

- [ ] Better domain analysis
- [ ] Punycode detection
- [ ] URL encoding detection
- [ ] Subdomain analysis
- [ ] Shortened URL detection
- [ ] Better suspicious-pattern detection
- [ ] Improved scoring engine
- [ ] More test cases

## Phase 3 — Better UX

Planned:

- [ ] Animated scan state
- [ ] Score animation
- [ ] Detailed result page
- [ ] Copy URL/result
- [ ] Better error handling
- [ ] Mobile polish
- [ ] Accessibility improvements

## Phase 4 — Optional Persistence

Planned:

- [ ] MySQL connection
- [ ] Database schema
- [ ] Scan storage
- [ ] Scan retrieval
- [ ] Delete scan history

## Phase 5 — Optional Authentication

Planned:

- [ ] Registration
- [ ] Login
- [ ] Password hashing
- [ ] JWT
- [ ] Protected routes
- [ ] User dashboard

## Phase 6 — Advanced Security

Planned:

- [ ] Threat intelligence integration
- [ ] Reputation checks
- [ ] Redirect analysis
- [ ] Domain intelligence
- [ ] More advanced scoring

## Phase 7 — Production

Planned:

- [ ] Automated tests
- [ ] Rate limiting
- [ ] Logging
- [ ] API documentation
- [ ] Deployment
- [ ] Environment configuration
- [ ] Security review
- [ ] Performance improvements

---

# 19. Design Direction

The visual identity of LinkShield should remain:

- Dark
- Modern
- Minimal
- Cybersecurity-inspired
- Glassmorphism
- Professional
- Responsive

Primary visual concepts:

```text
Dark background
+
Blue/purple glow
+
Glass cards
+
Security indicators
+
Clean typography
+
Subtle animations
```

The UI should avoid looking like a generic hacker-themed website. The goal is a polished modern SaaS/security product.

---

# 20. Project Philosophy

LinkShield should be developed incrementally.

Do not add a database, authentication system, external APIs, or complex infrastructure simply because they are available.

The priority is:

```text
Simple
   ↓
Correct
   ↓
Clean
   ↓
Useful
   ↓
Secure
   ↓
Scalable
```

The public scanner should remain functional even if future features such as authentication or external threat intelligence are disabled.

---

# 21. Current Status

Current milestone:

```text
Phase 1 — Core Scanner
████████████████░░░░  ~80%
```

The basic application architecture and scanner are in place.

The next development target is:

> **Upgrade the URL analysis engine and make the security scoring more intelligent.**

After the core scanner is stable, optional database and authentication features can be added without changing the fundamental public scanning experience.

---

## License

License to be decided when the project is prepared for public release.
=======
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

Anime info is a live content portal for anime discovery. Instead of static, hardcoded content, every card on the screen is pulled from a real, external data source in real time.

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

<br>
<br>
<hr>

# 10 Chrono Snake

A modern, time-bending twist on the classic grid-based snake game built entirely with HTML5 Canvas and Vanilla JavaScript. 

Instead of relying on perfect reflexes alone, Chrono Snake introduces tactical decision-making, resource management, and risk-vs-reward scoring through its custom-built "History Engine".

## 🚀 What Makes This Unique?

Most snake games end instantly upon collision. Chrono Snake rewrites that rule.

* **The History Engine:** The game silently records a running snapshot buffer of your exact grid coordinates and game state over the last 2 seconds.
* **Time Travel (Rewind Mechanic):** If you crash, time freezes. If you have banked a Rewind Charge, you can literally turn back the clock to escape death.
* **The Penalty:** Rewinding isn't a free undo. Using a rewind costs 1 charge, reverses your position, and *permanently* trims 2 segments off your tail. Surviving via time travel shrinks your legacy.
* **Clean Run Economy:** Using a rewind saves your life, but finishing a run with zero rewinds grants a massive **1.5x multiplier** to your final score. 

## 🎮 Game Rules & Mechanics

1. **Movement:** Standard `WASD` or `Arrow Keys`. You cannot reverse directly into yourself.
2. **Growth:** Eat standard Red Packets to grow your tail by 1 segment and gain 100 points.
3. **Chrono Shards:** Every 4th item spawned is a golden Chrono Shard. 
    * *Time-to-Live (TTL):* Shards expire after 50 ticks of movement and revert back to standard food. 
    * *Banking:* Eating a Shard does not grow your tail. Instead, it banks 1 Rewind Charge.
4. **Death & Decisions:** Crashing into a wall or your own tail triggers a system freeze.
    * **Accept Fate:** Ends the run and calculates your final score.
    * **Rewind Time:** Consumes a charge, drops you 2 seconds in the past, and deletes 2 tail segments.

## 🛠️ Tech Stack

* **HTML5 Canvas:** For high-performance 2D grid rendering.
* **CSS3:** Custom minimalist dark theme (`#1a1a1a`), CSS Grid, and CRT scanline/glitch overlay effects (`mix-blend-mode`, `@keyframes`).
* **Vanilla JavaScript:** Zero dependencies. Handles the 10FPS game loop (`setTimeout`), array buffer manipulation for state saving, and collision detection logic. 

## ⚙️ Installation & Setup

No build steps, no package managers. 

1. Clone the repository or download the source code.
2. Open `index.html` directly in any modern web browser.
3. Add your own background fallback URL in the CSS if desired. 
>>>>>>> fe15dfe6232bfca2c3c41f611a39b69902f64618
