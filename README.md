## 🚀 Project Description

**Threadify Platform** is a modern full‑stack discussion system built to explore scalable architecture, clean code principles, and production‑grade web patterns.

It is designed around a structured conversation model:

- 🏷️ Topics
- 📝 Posts
- 💬 Threaded Discussions

The project focuses on:

- ⚡ Server Components & Server Actions
- 🧱 Clear separation between UI, domain logic, and data layer
- 🔒 Type‑safe data handling
- 🧭 Scalable routing with the Next.js App Router
- 📁 Maintainable folder structure for long‑term growth
- 🎨 Clean, responsive UI architecture

Threadify is intended as:

- 🏗️ A foundation for building community platforms
- 📂 A full‑stack portfolio project
- 🧠 A learning environment for modern React & Next.js patterns
- 🚀 A base architecture for future SaaS or internal discussion tools

The goal is not just to build a forum — but to build it the right way. ✅

---

## 🎯 Features

- 🧵 **Topic-Based Discussions** — Create, browse, and manage topics for organized conversations.
- 🔐 **GitHub OAuth Authentication** — Sign up and sign in securely using GitHub account.
- ✍️ **Post Creation Workflow** — Simple, structured interface for writing and publishing posts.
- 💬 **Threaded Comments** — Support for nested, meaningful discussions.
- ⚡ **Server Components** — Fast, efficient rendering with minimal client-side overhead.
- 🛠️ **Server Actions** — Type-safe form handling and mutation logic directly on the server.
- 🗂️ **Scalable Folder Architecture** — Maintainable layout suitable for long-term growth.
- 🔄 **Dynamic & Static Rendering** — Optimized data fetching using Next.js rules (static, dynamic, revalidation).
- 🎨 **Tailwind CSS 4** — Modern, utility-first styling with responsive design out of the box.
- 🔷 **TypeScript 5** — End-to-end static typing across server and client.
- 🧩 **Reusable UI Components** — Composable interfaces following clean React patterns.
- 🧪 **Production-Style Patterns** — Validation, error boundaries, loading states, and UX correctness.
- 🚀 **Performance-Oriented Build** — Powered by Turbopack for ultra-fast local development.

---

## 🛠 Tech Stack

| Tool         | Version            |
| ------------ | ------------------ |
| Next.js      | 16.2.4             |
| React        | 19.2.4             |
| React DOM    | 19.2.4             |
| NextAuth     | 5.0.0-beta.25      |
| Prisma       | 5.5.2              |
| TypeScript   | 5                  |
| Tailwind CSS | 4                  |
| ESLint       | 9                  |
| Node Types   | 20                 |
| Turbopack    | Built‑in (Next.js) |

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/esmaeil-ahmadipour/threadify_platform.git
cd threadify_platform
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
# GitHub OAuth (required for authentication)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Database
DATABASE_URL="file:./dev.db"
```

**Get GitHub OAuth credentials:**

1. GitHub Settings → Developer settings → OAuth Apps → New OAuth App
2. Homepage URL: `http://localhost:3000`
3. Callback URL: `http://localhost:3000/api/auth/callback/github`

4. **Set up the database:**

```bash
pnpm prisma generate
pnpm prisma db push
```

5. **Run development server:**

```bash
pnpm dev
```

Visit 👉 http://localhost:3000

6. **Build for production:**

```bash
pnpm build
```

7. **Run production build:**

```bash
pnpm start
```

8. **Lint code:**

```bash
pnpm lint
```

---

## 🔐 Authentication

Threadify uses **GitHub OAuth** via NextAuth.js (Auth.js):

- ✅ Sign in with GitHub account
- ✅ Auto-registration on first login
- ✅ Server-side session management
- ✅ Prisma adapter for database persistence

---

## 📜 Scripts

```bash
pnpm dev              # Start dev server with Turbopack
pnpm build            # Production build
pnpm start            # Run production build
pnpm lint             # Run ESLint
pnpm prisma studio    # Open Prisma database UI
```

---

## 📄 License

LICENSE File](./LICENSE)
