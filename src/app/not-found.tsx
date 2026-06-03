import Link from "next/link";
import { Compass } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <Container className="py-16">
      <Card>
        <CardHeader className="pb-0">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--light)] text-[color:var(--primary)]">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-900">Page not found</h1>
        </CardHeader>
        <CardBody className="pt-6">
          <p className="text-sm leading-7 text-slate-600">
            The page you’re looking for doesn’t exist or the quiz id is invalid.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quizzes">
              <Button>Browse quizzes</Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">Back to home</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
}

