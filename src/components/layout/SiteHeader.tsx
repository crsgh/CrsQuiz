"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const nav = [{ href: "/quizzes", label: "Quizzes" }] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="font-sans text-xl font-bold tracking-tighter text-white">
            CrsQuiz
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide text-zinc-400 transition hover:text-white",
                  active && "text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/quizzes">
            <Button variant="secondary" className="px-5 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-zinc-200 transition-colors">
              Get Started
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}

