type Props = {
  onStart: () => void;
  totalCards: number;
};

export function IntroScreen({ onStart, totalCards }: Props) {
  return (
    <div className="animate-rise surface-card px-6 py-10 text-center">
      <span className="inline-flex rounded-full bg-lavender/70 px-3 py-1 text-xs font-semibold text-lavender-foreground">
        {totalCards} kartu situasi
      </span>
      <h1 className="mt-5 text-4xl text-foreground">Baca Aku</h1>
      <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
        Latihan baca maksud orang lewat kartu-kartu situasi sehari-hari. Tebak apa yang sebenernya
        dia rasain, terus pilih respons paling pas.
      </p>
      <ol className="mx-auto mt-6 max-w-xs space-y-2 text-left text-sm text-muted-foreground">
        <li className="rounded-2xl bg-cream px-4 py-3">1. Baca situasinya pelan-pelan</li>
        <li className="rounded-2xl bg-cream px-4 py-3">2. Tebak maksud tersembunyinya</li>
        <li className="rounded-2xl bg-cream px-4 py-3">3. Pilih responsmu, lihat skornya</li>
      </ol>
      <button
        type="button"
        onClick={onStart}
        className="mt-8 w-full rounded-2xl bg-rose px-6 py-3.5 font-semibold text-rose-foreground soft-shadow transition-transform duration-200 hover:-translate-y-0.5"
      >
        Mulai main
      </button>
      <p className="mt-4 text-xs text-muted-foreground">Nggak ada skor benar-salah mutlak, santai aja.</p>
    </div>
  );
}
