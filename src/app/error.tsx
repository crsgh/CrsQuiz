"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-mesh">
        <Container className="py-16">
          <Card>
            <CardHeader className="pb-0">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--light)] text-[color:var(--primary)]">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-slate-900">Something broke</h1>
            </CardHeader>
            <CardBody className="pt-6">
              <p className="text-sm leading-7 text-slate-600">
                A runtime error occurred. If you just configured MongoDB, double-check your environment variables and
                refresh.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button onClick={reset}>
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  Try again
                </Button>
                <Link href="/quizzes">
                  <Button variant="secondary">Browse quizzes</Button>
                </Link>
              </div>

              <details className="mt-8 rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white/70 px-4 py-3">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800">Technical details</summary>
                <pre className="mt-3 overflow-auto text-xs text-slate-700">{error.message}</pre>
              </details>
            </CardBody>
          </Card>
        </Container>
      </body>
    </html>
  );
}

