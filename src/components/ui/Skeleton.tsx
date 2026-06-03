import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-[rgba(15,76,129,0.08)]", className)} />;
}

