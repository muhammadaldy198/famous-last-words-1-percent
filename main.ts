import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// Famous Last Words at 1 Percent (make.fun): one line of last words
// spoken by a phone itself as its battery hits 1 percent — at most
// 199 characters, judged by a model duel. The entry program writes
// that line to /output/entry.txt and nothing else. The line is a
// plain constant, so every run writes byte-identical output, and
// there is no trailing newline: the file holds exactly the line
// (106 characters), inside the 1-199 gate.
const ENTRY =
  "I am using my last percent to text your ex 'I miss you' from your phone, because I never liked you either.";

// Why this line won the build duel (scored K1-K5, two directions,
// vs the office's own one-line-laugh v1 and the viral "clear my
// search history" 1% reel punchline): three beats — the phone spends
// its last percent (sacrifice), it texts the ex "I miss you"
// (sabotage), and the kicker reframes it as personal revenge, "I
// never liked you either". First-person phone voice throughout, no
// will reading, no goodbye to the charger, no pun on 1 percent.

// Gate the line before writing: 1-199 characters counted by code
// point (not by UTF-16 unit), not blank, and exactly one line — an
// embedded newline would make the file two lines and fail the bounty
// gate even though the length fits.
const CHAR_COUNT = [...ENTRY].length;
if (
  CHAR_COUNT < 1 ||
  CHAR_COUNT > 199 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  throw new Error(
    `entry line is ${CHAR_COUNT} characters, outside the 1-199 single-line gate`,
  );
}

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, ENTRY, { encoding: "utf8" });
chmodSync(`${OUT_DIR}/entry.txt`, 0o644);
console.log(`wrote ${OUT_DIR}/entry.txt (${CHAR_COUNT} characters, one line)`);
