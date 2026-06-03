import { cn } from "@/lib/cn";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[rgba(15,76,129,0.14)] bg-white/70 px-3 py-1 text-xs font-semibold text-[color:var(--primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}

