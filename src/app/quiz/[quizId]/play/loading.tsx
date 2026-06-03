import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-10">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-4 w-40 rounded-full" />
        <Skeleton className="h-8 w-2/3" />
      </div>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="mt-4 h-6 w-full" />
        <Skeleton className="mt-2 h-6 w-5/6" />
        <div className="mt-6 grid gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    </Container>
  );
}

