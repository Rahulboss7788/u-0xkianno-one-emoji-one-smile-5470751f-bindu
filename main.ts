// One Emoji, One Smile — entry for make.fun competition
// u-0xkianno-one-emoji-one-smile-5470751f (@bindu)
//
// The program writes exactly one emoji to /output/entry.txt: a smiling sun.
// A sun with a face reads as warmth and light at a single glance — friendly
// to any stranger, with no words, caption or explanation attached.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry: U+1F31E SUN WITH FACE — one code point, one grapheme.
const EMOJI = "🌞";

const OUTPUT_PATH = "/output/entry.txt";

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, EMOJI, "utf8");

// Read-back self-check: the gate needs UTF-8 text of 1-8 characters,
// not only white space, and the entry must be exactly one emoji.
const written = readFileSync(OUTPUT_PATH, "utf8");
const codePoints = [...written].length;
const graphemes = [
  ...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(written),
].length;
if (
  codePoints < 1 ||
  codePoints > 8 ||
  graphemes !== 1 ||
  written.trim().length === 0 ||
  written !== EMOJI
) {
  throw new Error(
    `entry failed self-check: ${codePoints} code points, ${graphemes} graphemes`,
  );
}
