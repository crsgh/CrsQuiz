import { Container } from "@/components/layout/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-transparent">
      <Container className="flex flex-col gap-2 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm font-semibold tracking-wide text-white">CrsQuiz</p>
        <p className="text-xs text-zinc-500">JSON-driven from MongoDB Atlas.</p>
      </Container>
    </footer>
  );
}

