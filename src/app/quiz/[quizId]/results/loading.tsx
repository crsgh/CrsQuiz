import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-10">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="mt-4 h-5 w-2/3" />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Skeleton className="h-20 w-full rounded-3xl" />
          <Skeleton className="h-20 w-full rounded-3xl" />
          <Skeleton className="h-20 w-full rounded-3xl" />
        </div>
        <Skeleton className="mt-8 h-12 w-40 rounded-full" />
      </div>
    </Container>
  );
}

