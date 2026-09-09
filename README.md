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
