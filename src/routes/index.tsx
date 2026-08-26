import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CardStage } from "@/components/game/CardStage";
import { IntroScreen } from "@/components/game/IntroScreen";
import { ResultScreen } from "@/components/game/ResultScreen";
import { cards } from "@/data/cards";
import { emptyTotals, type Totals } from "@/lib/scoring";

const TITLE = "Baca Aku — Latihan Baca Maksud Tersembunyi Orang";
const DESCRIPTION =
  "Card game bahasa Indonesia berisi 30 situasi sosial. Tebak maksud tersembunyi, pilih respons terbaik, dan lihat skor Insight, Empathy, serta Social Damage kamu.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "baca-aku-progress";

type Progress = { phase: "intro" | "playing" | "result"; index: number; totals: Totals };

function Index() {
  const [progress, setProgress] = useState<Progress>({
    phase: "intro",
    index: 0,
    totals: emptyTotals,
  });

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw) as Progress);
    } catch {
      /* abaikan */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      /* abaikan */
    }
  }, [progress]);

  const handleNext = (delta: Totals) => {
    setProgress((prev) => {
      const totals: Totals = {
        insight: prev.totals.insight + delta.insight,
        empathy: prev.totals.empathy + delta.empathy,
        socialDamage: prev.totals.socialDamage + delta.socialDamage,
      };
      const nextIndex = prev.index + 1;
      if (nextIndex >= cards.length) return { phase: "result", index: prev.index, totals };
      return { phase: "playing", index: nextIndex, totals };
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const card = cards[progress.index];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-4 py-8">
      {progress.phase === "intro" ? (
        <IntroScreen
          totalCards={cards.length}
          onStart={() => setProgress({ phase: "playing", index: 0, totals: emptyTotals })}
        />
      ) : null}

      {progress.phase === "playing" && card ? (
        <CardStage
          key={card.id}
          card={card}
          index={progress.index}
          total={cards.length}
          isLast={progress.index === cards.length - 1}
          onNext={handleNext}
        />
      ) : null}

      {progress.phase === "result" ? (
        <ResultScreen
          totals={progress.totals}
          cardsPlayed={cards.length}
          onRestart={() => setProgress({ phase: "intro", index: 0, totals: emptyTotals })}
        />
      ) : null}

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Dibikin buat latihan peka, bukan buat nge-judge siapa-siapa.
      </p>
    </main>
  );
}
