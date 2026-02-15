# Caroline Lundy — Portfolio

A modern, single-page portfolio site that showcases work experience, education, and an **AI-powered book recommendations** feature. Built as a Laravel-backed Vue 3 SPA with a clean, responsive UI.

---

## Key Features

- **Profile section** — Bio, tagline, and contact with semantic structure and optional content overrides
- **Work experience** — Flip cards (education + experience) with grid layout, equal sizing, and gap-based spacing
- **Education timeline** — Same card component and layout for consistent presentation
- **Book recommendations** — Enter a favorite book; get AI suggestions via Google Gemini with fallback recommendations on rate limit or parse errors
- **References** — Dedicated section for professional references
- **Responsive navigation** — Centered navbar with dropdown section menu and smooth scroll; mobile-friendly
- **Footer** — Section links and contact with accessible markup
- **Testing** — Vitest for Vue components (e.g. BookRecContainer); Pest/PHPUnit for Laravel

---

## Tech Stack

| Layer        | Technologies |
|-------------|--------------|
| **Backend** | PHP 8.2+, Laravel 12 |
| **Frontend**| Vue 3 (Composition API, `<script setup>`), TypeScript where used |
| **Build**   | Vite 7, Laravel Vite Plugin |
| **Styling** | Tailwind CSS 4 |
| **HTTP**    | Axios (frontend); Laravel HTTP client (Gemini API) |
| **Testing** | Vitest, Vue Test Utils, Happy DOM (JS); Pest, PHPUnit (PHP) |
| **Other**   | Vue composables (MVC-style separation), Tailwind PostCSS |

---

## Getting Started

### Prerequisites

- **PHP** 8.2 or higher  
- **Composer**  
- **Node.js** 18+ (LTS recommended) and **npm**  
- **MySQL** 8+ (or MariaDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd caroline-portfolio
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   For **book recommendations**, add to `.env`:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   # GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
   ```
   Leave `GEMINI_API_KEY` unset to disable AI recommendations; the app will return a clear error and optional fallback list when the key is missing.

4. **Database** (MySQL)
   Create a database, then set in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```
   Then run:
   ```bash
   php artisan migrate
   ```

5. **Install frontend dependencies and build**
   ```bash
   npm install
   npm run build
   ```

### Running the app

- **Development (recommended)** — Backend, Vite dev server, queue, and logs together:
  ```bash
  composer run dev
  ```
  Then open the app at the URL shown (e.g. `http://localhost:8000` with `php artisan serve`).

- **Backend only**
  ```bash
  php artisan serve
  ```
  Use `npm run dev` in another terminal for Vite HMR.

- **Production-style**
  ```bash
  npm run build
  php artisan serve
  ```

### Environment variables (from `.env.example`)

| Variable | Description |
|----------|-------------|
| `APP_NAME`, `APP_ENV`, `APP_KEY`, `APP_DEBUG`, `APP_URL` | Standard Laravel app config |
| `DB_*` | Database (MySQL: `DB_CONNECTION`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) |

| **`GEMINI_API_KEY`** | **Required for AI book recommendations** (Google AI Studio) |


---

## Project Structure

```
caroline-portfolio/
├── app/
│   ├── Http/Controllers/
│   │   ├── BookController.php      # AI recommendations, fallbacks
│   │   └── BookCommentController.php
│   ├── Models/                     # Book, Message, etc.
│   └── Observers/
├── config/
│   └── services.php                # Gemini key/url
├── resources/
│   ├── js/
│   │   ├── app.js                  # Vue entry point
│   │   ├── App.vue                 # Root SPA layout
│   │   ├── components/             # Vue SFCs (Profile, BookRec, Education, WorkExperience, Common)
│   │   ├── composables/           # useBookRecommendations, useNavbar, useFooter, useEducation, etc.
│   │   └── services/              # bookService.ts (API + DTOs)
│   └── css/
│       └── app.css                 # Tailwind entry
├── routes/
│   ├── web.php                     # SPA catch-all
│   └── api.php                     # /books, /comments, recommendations-from-favorite
├── tests/
│   └── js/components/              # Vitest specs (e.g. BookRecContainer)
├── .env.example
├── vite.config.js
├── package.json
└── composer.json
```

The frontend follows an MVC-style split: **services** (API/data), **composables** (state + logic), **components** (humble views).

---

## Usage

**Local development**

```bash
composer run dev
```

Then visit the app (e.g. `http://localhost:8000`). Use the nav or footer to jump to Work Experience, Education, or Book Recommendations. For book recommendations, enter a favorite book and submit; results use the Gemini API when `GEMINI_API_KEY` is set.

**Running tests**

```bash
# Frontend (Vitest)
npm run test
# or
npm run test:run

# Backend (Pest/PHPUnit)
composer test
# or
php artisan test
```

---

## Contributing

1. Fork the repository and create a feature branch from `main`.
2. Follow existing code style (Tailwind for UI, Vue 3 Composition API and composables for logic).
3. Add or update tests as needed (Vitest for Vue, Pest for PHP).
4. Open a Pull Request with a short description of the change.

---

## License

