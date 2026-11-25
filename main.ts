// One Star for the Tea Towel — make.fun entry
// "The Most Boring Object, Reviewed in One Line"
// Writes one funny, true one-line review of a boring everyday object
// (a tea towel) to /output/entry.txt. Gate: 1-200 characters, one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Gate limits from competition.yaml: UTF-8 text of 1 to 200 characters,
// not only white space, a single line.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

const ENTRY =
  "One star. The tea towel has been damp since 2019, smells faintly of dishwater, and still gets handed to guests like it's fine.";

function checkEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

checkEntry(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Byte-for-byte read-back: what the grader will read must be exactly ENTRY.
const written = readFileSync("/output/entry.txt");
if (!written.equals(Buffer.from(ENTRY, "utf8"))) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt (verified)`);
