import { describe, expect, it, vi } from "vitest";

import { ValidationError } from "@/lib/errors";

vi.mock("@/services/instances", () => {
  return {
    quizService: {
      gradeQuiz: vi.fn(),
    },
  };
});

describe("POST /api/quizzes/[id]/submit", () => {
  it("returns grading result", async () => {
    const { quizService } = await import("@/services/instances");
    (quizService.gradeQuiz as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      score: 8,
      percentage: 80,
      passed: true,
    });

    const { POST } = await import("@/app/api/quizzes/[id]/submit/route");

    const request = new Request("http://localhost/api/quizzes/sample/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers: [] }),
    });

    const res = await POST(request, { params: { id: "sample" } });
    expect(res.status).toBe(200);

    const json = (await res.json()) as { score: number; percentage: number; passed: boolean };
    expect(json).toEqual({ score: 8, percentage: 80, passed: true });
  });

  it("maps validation errors to 400", async () => {
    const { quizService } = await import("@/services/instances");
    (quizService.gradeQuiz as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new ValidationError("Invalid submission")
    );

    const { POST } = await import("@/app/api/quizzes/[id]/submit/route");

    const request = new Request("http://localhost/api/quizzes/sample/submit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ answers: [] }),
    });

    const res = await POST(request, { params: { id: "sample" } });
    expect(res.status).toBe(400);
    const json = (await res.json()) as { error: { code: string; message: string } };
    expect(json.error.code).toBe("VALIDATION_ERROR");
  });
});

