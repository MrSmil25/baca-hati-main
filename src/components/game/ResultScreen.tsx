import { dimensionNote, getPersona, type Totals } from "@/lib/scoring";

type Props = {
  totals: Totals;
  cardsPlayed: number;
  onRestart: () => void;
};

export function ResultScreen({ totals, cardsPlayed, onRestart }: Props) {
  const persona = getPersona(totals, cardsPlayed);

  const rows = [
    { key: "insight" as const, label: "Insight", value: totals.insight, tone: "bg-lavender/70 text-lavender-foreground" },
    { key: "empathy" as const, label: "Empathy", value: totals.empathy, tone: "bg-sage/70 text-sage-foreground" },
    {
      key: "socialDamage" as const,
      label: "Social Damage",
      value: totals.socialDamage,
      tone: "bg-peach/80 text-peach-foreground",
    },
  ];

  return (
    <div className="animate-rise surface-card space-y-6 px-6 py-8">
      <div className="text-center">
        <span className="inline-flex rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-lavender-foreground">
          {cardsPlayed} kartu selesai
        </span>
        <h1 className="mt-4 text-3xl text-foreground">{persona.title}</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
          {persona.description}
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="rounded-2xl bg-cream px-4 py-3.5">
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.tone}`}>
                {row.label}
              </span>
              <span className="font-display text-2xl tabular-nums text-foreground">
                {row.value > 0 ? `+${row.value}` : row.value}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {dimensionNote(row.key, row.value, cardsPlayed)}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        Main lagi dari awal
      </button>
    </div>
  );
}
