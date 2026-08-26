# Baca Aku — Card Game Bahasa Indonesia

Web app single-page, mobile-first, tanpa login/database. 30 kartu dimuat dari `kartuv3.json`.

## Alur main
1. Layar pembuka: judul "Baca Aku", 1-2 kalimat cara main, tombol "Mulai".
2. Per kartu (progress "Kartu 7 / 30" + badge kategori):
   - Tahap situasi + pertanyaan
   - Tahap tafsir: 4 opsi. Setelah dipilih → tanda benar/kurang tepat (kartu dengan lebih dari satu `isMostLikely` menerima keduanya), lalu reasoning muncul, plus badge halus "Kartu Twist" kalau `twist: true`.
   - Tahap respons: 4 opsi. Setelah dipilih → skor Insight / Empathy / Social Damage yang didapat, feedback, dan penanda halus pada opsi yang `isBest`.
   - Tombol "Kartu berikutnya".
3. Layar akhir: total tiga dimensi + persona singkat (mis. "Peka tapi suka overthinking") berdasar kombinasi skor, plus tombol "Main lagi".

Progress tersimpan sementara di sessionStorage supaya refresh nggak bikin hilang.

## Struktur file
- `src/data/cards.json` — salinan data kartu dari file yang kamu kirim
- `src/data/cards.ts` — tipe TypeScript + loader + daftar kategori
- `src/lib/scoring.ts` — total skor & logika persona
- `src/routes/index.tsx` — halaman game (state mesin: intro → kartu → hasil) + metadata SEO
- Komponen di `src/components/game/`:
  - `IntroScreen.tsx`
  - `CardStage.tsx` (kontainer satu kartu, atur tahap)
  - `SituationBlock.tsx`
  - `OptionButton.tsx` (dipakai tafsir & respons, punya state benar/salah/best)
  - `ReasoningPanel.tsx` (berisi `TwistBadge.tsx`)
  - `ScoreDeltaRow.tsx` (chip Insight/Empathy/Social Damage)
  - `ProgressBar.tsx`
  - `ResultScreen.tsx`

## Desain
- Token warna baru di `src/styles.css` (oklch): peach, lavender, sage, cream, dusty rose; background cream, kartu putih hangat.
- Radius 24px, soft shadow, spacing lega, layar penuh maksimal ~28rem di desktop.
- Font: Fraunces (judul) + Plus Jakarta Sans (body), dimuat lewat `<link>` di root route.
- Semua teks bahasa Indonesia, hangat dan playful ringan. Animasi halus saat opsi dibuka.
