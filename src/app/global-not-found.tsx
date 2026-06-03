import "./globals.css";
import { Manrope } from "next/font/google";
import Link from "next/link";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col items-center justify-center bg-black text-white">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold text-purple-400">404</h1>
          <p className="mt-4 text-lg text-slate-300">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/quizzes"
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-500 transition"
            >
              Browse quizzes
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
