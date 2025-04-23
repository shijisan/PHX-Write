# 📝 phx-write

A privacy-focused, minimalist notes app built with Next.js — supporting both **offline local storage** and **cloud sync**. Migrate your notes when you sign in. Smooth, modern, and open source.

## ✨ Features

- 🔒 **End-to-End Encryption (E2EE)**  
  Your notes stay private — even we can’t read them.

- 💾 **Offline Local Storage Mode**  
  Works without an account. Your notes live in your browser, like old-school diaries.

- ☁️ **Cloud Sync & Note Migration**  
  Log in anytime to save and sync notes to the cloud. Local notes can be migrated in a tap.

- 💖 **Open Source & Hackable**  
  Powered by Next.js, Prisma, PostgreSQL, React Quill, and more light-weight libraries,

---

## 🚀 Tech Stack

- **Frontend**: Next.js App Router, React 19, TailwindCSS
- **Backend**: API Routes with optional NextAuth for authentication
- **Database**: PostgreSQL (Prisma ORM)
- **Editor**: Rich text via `react-quill-new`
- **Auth**: Next-Auth with Credentials and Google Provider
- **Encryption**: `crypto` for E2EE encryption

---

## 📦 Local Development

```bash
git clone https://github.com/shijisan/phx-write.git
cd phx-write
pnpm install

# Set up your .env.local (see below)
pnpm dev
```

---

## 🛠️ Environment Setup

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/phxwrite
NEXTAUTH_SECRET=your_generated_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

> 🧪 Generate a secret with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🧠 To-do

  - Google O-auth Web App registration
  - Prompt mobile users to download PWA
  - More usage of icons
  - Increase sections in Home page
