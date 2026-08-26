import { useState } from "react";
import type { Card } from "@/data/cards";
import { categoryLabel } from "@/data/cards";
import type { Totals } from "@/lib/scoring";
import { OptionButton } from "./OptionButton";
import { ProgressBar } from "./ProgressBar";
import { ReasoningPanel } from "./ReasoningPanel";
import { ScoreDeltaRow } from "./ScoreDeltaRow";
import { SituationBlock } from "./SituationBlock";

type Props = {
  card: Card;
  index: number;
  total: number;
  isLast: boolean;
  onNext: (delta: Totals) => void;
};

export function CardStage({ card, index, total, isLast, onNext }: Props) {
  const [pickedInterpretation, setPickedInterpretation] = useState<string | null>(null);
  const [pickedResponse, setPickedResponse] = useState<string | null>(null);

  const chosenInterpretation = card.interpretations.find((i) => i.id === pickedInterpretation);
  const chosenResponse = card.responses.find((r) => r.id === pickedResponse);

  return (
    <div className="surface-card space-y-6 px-5 py-6">
      <ProgressBar current={index + 1} total={total} category={categoryLabel(card.category)} />

      <SituationBlock situation={card.situation} question={card.question} />

      <div className="space-y-2.5">
        {card.interpretations.map((option) => {
          const revealed = pickedInterpretation !== null;
          const isPicked = option.id === pickedInterpretation;
          let state: "idle" | "correct" | "wrong" = "idle";
          if (revealed && option.isMostLikely) state = "correct";
          else if (revealed && isPicked) state = "wrong";
          return (
            <OptionButton
              key={option.id}
              letter={option.id}
              text={option.text}
              disabled={revealed}
              selected={isPicked}
              state={state}
              hint={revealed && option.isMostLikely ? "Salah satu tafsir paling mungkin" : undefined}
              onClick={() => setPickedInterpretation(option.id)}
            />
          );
        })}
      </div>

      {chosenInterpretation ? (
        <ReasoningPanel
          correct={chosenInterpretation.isMostLikely}
          reasoning={card.reasoning}
          twist={card.twist}
        />
      ) : null}

      {chosenInterpretation ? (
        <div className="animate-rise space-y-4">
          <h3 className="text-lg text-foreground">Terus kamu jawab apa?</h3>
          <div className="space-y-2.5">
            {card.responses.map((option) => {
              const revealed = pickedResponse !== null;
              const isPicked = option.id === pickedResponse;
              let state: "idle" | "correct" | "wrong" | "best" = "idle";
              if (revealed && isPicked) state = option.isBest ? "correct" : "wrong";
              else if (revealed && option.isBest) state = "best";
              return (
                <OptionButton
                  key={option.id}
                  letter={option.id}
                  text={option.text}
                  disabled={revealed}
                  selected={isPicked}
                  state={state}
                  hint={revealed && option.isBest ? "✿ respons paling pas" : undefined}
                  onClick={() => setPickedResponse(option.id)}
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {chosenResponse ? (
        <div className="animate-rise space-y-3 rounded-2xl bg-cream px-4 py-4">
          <ScoreDeltaRow
            insight={chosenResponse.insight}
            empathy={chosenResponse.empathy}
            socialDamage={chosenResponse.socialDamage}
          />
          {chosenResponse.feedback ? (
            <p className="text-[0.92rem] leading-relaxed text-muted-foreground">
              {chosenResponse.feedback}
            </p>
          ) : null}
        </div>
      ) : null}

      {chosenResponse ? (
        <button
          type="button"
          onClick={() =>
            onNext({
              insight: chosenResponse.insight,
              empathy: chosenResponse.empathy,
              socialDamage: chosenResponse.socialDamage,
            })
          }
          className="animate-rise w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
        >
          {isLast ? "Lihat hasilku" : "Kartu berikutnya"}
        </button>
      ) : null}
    </div>
  );
}
