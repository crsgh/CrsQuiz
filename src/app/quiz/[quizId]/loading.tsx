import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-10">
      <div className="glass rounded-3xl p-6 sm:p-8">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="mt-4 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-5/6" />
        <div className="mt-6 flex flex-wrap gap-2">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-28 rounded-full" />
        </div>
        <Skeleton className="mt-8 h-12 w-40 rounded-full" />
      </div>
    </Container>
  );
}

