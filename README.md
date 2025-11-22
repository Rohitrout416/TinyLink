# TinyLink 🔗

A modern, fast, and simple URL shortener built with **Next.js 15**, **Prisma**, and **PostgreSQL**.

![TinyLink Preview](public/logo.png)

## ✨ Features

- 🚀 **Fast & Modern**: Built with Next.js 15 (App Router) for optimal performance.
- 🎨 **Beautiful UI**: Clean, responsive interface styled with Tailwind CSS v4.
- 🔗 **Custom Short Codes**: Create random or custom aliases for your links.
- 📊 **Click Tracking**: Track how many times your links have been visited.
- 🔄 **Real-time Updates**: Dashboard updates automatically to show new links and stats.
- 🛡️ **Type-Safe**: Full end-to-end type safety with TypeScript and Zod.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A PostgreSQL database (e.g., local or Neon/Supabase)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohitrout416/TinyLink.git
   cd TinyLink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/db?sslmode=require"
   ```

4. **Initialize the database**
   ```bash
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

This project is optimized for deployment on **Vercel**.

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your `DATABASE_URL` to Vercel's Environment Variables.
4. Deploy! 🚀

(See `DEPLOY_TO_VERCEL.md` for a detailed guide).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by [Rohit](https://github.com/Rohitrout416)
