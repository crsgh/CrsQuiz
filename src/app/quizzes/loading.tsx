import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-10">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="glass rounded-3xl p-6">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
            <Skeleton className="mt-6 h-10 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </Container>
  );
}

