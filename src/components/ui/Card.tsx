import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("glass rounded-3xl", className)}>{children}</div>;
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-6 pt-6", className)}>{children}</div>;
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("px-6 pb-6", className)}>{children}</div>;
}

