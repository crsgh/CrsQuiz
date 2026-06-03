"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";

import { cn } from "@/lib/cn";
import type { PublicQuiz, Submission } from "@/validators/quiz";

type PublicQuestion = PublicQuiz["questions"][number];
type Answer = Submission["answers"][number];

function ChoiceButton({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all backdrop-blur-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
        selected
          ? "border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-white"
          : "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300"
      )}
    >
      <span className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
            selected ? "border-purple-500 bg-purple-500 text-white" : "border-zinc-600 bg-transparent"
          )}
        >
          {selected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Circle className="h-3.5 w-3.5 opacity-0" aria-hidden="true" />}
        </span>
        <span className="leading-6">{children}</span>
      </span>
    </button>
  );
}

export function QuestionRenderer({
  question,
  value,
  onChange,
}: {
  question: PublicQuestion;
  value: Answer | undefined;
  onChange: (answer: Answer) => void;
}) {
  if (question.type === "multiple_choice") {
    const selectedIndex = value?.type === "multiple_choice" ? value.answerIndex : null;

    return (
      <div className="grid gap-3">
        {question.choices.map((choice, idx) => (
          <ChoiceButton
            key={idx}
            selected={selectedIndex === idx}
            onClick={() => onChange({ questionId: question.id, type: "multiple_choice", answerIndex: idx })}
          >
            {choice}
          </ChoiceButton>
        ))}
      </div>
    );
  }

  if (question.type === "true_false") {
    const selected = value?.type === "true_false" ? value.answerBoolean : null;
    const options = [
      { label: "True", value: true },
      { label: "False", value: false },
    ] as const;

    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <ChoiceButton
            key={opt.label}
            selected={selected === opt.value}
            onClick={() => onChange({ questionId: question.id, type: "true_false", answerBoolean: opt.value })}
          >
            {opt.label}
          </ChoiceButton>
        ))}
      </div>
    );
  }

  const textValue = value?.type === "free_text" ? value.answerText : "";

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-zinc-400" htmlFor={`q-${question.id}`}>
        Your answer
      </label>
      <motion.input
        id={`q-${question.id}`}
        value={textValue}
        onChange={(e) => onChange({ questionId: question.id, type: "free_text", answerText: e.target.value })}
        placeholder="Type your answer…"
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-600 backdrop-blur-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500/50"
        )}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.15 }}
      />
      <p className="text-xs text-zinc-500">Spelling is case-insensitive. Extra spaces are ignored.</p>
    </div>
  );
}

