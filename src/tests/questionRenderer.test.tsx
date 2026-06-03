import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { QuestionRenderer } from "@/features/quiz/player/QuestionRenderer";
import type { PublicQuiz } from "@/validators/quiz";

const baseQuestion: PublicQuiz["questions"][number] = {
  id: 1,
  question: "Pick one",
  choices: ["A", "B"],
  type: "multiple_choice",
};

describe("QuestionRenderer", () => {
  it("renders multiple_choice options and emits selection", async () => {
    const user = userEvent.setup();
    const onChange = (v: unknown) => {
      last = v;
    };
    let last: unknown = null;

    render(<QuestionRenderer question={baseQuestion} value={undefined} onChange={onChange as never} />);
    await user.click(screen.getByRole("button", { name: /A/i }));

    expect(last).toEqual({ questionId: 1, type: "multiple_choice", answerIndex: 0 });
  });

  it("renders free_text input and emits text updates", async () => {
    const user = userEvent.setup();
    const question: PublicQuiz["questions"][number] = { ...baseQuestion, type: "free_text" };
    let last: unknown = null;

    render(
      <QuestionRenderer
        question={question}
        value={{ questionId: 1, type: "free_text", answerText: "" }}
        onChange={(v) => {
          last = v;
        }}
      />
    );

    await user.type(screen.getByLabelText(/your answer/i), "hello");
    expect(last).toMatchObject({ type: "free_text", answerText: "hello" });
  });
});

