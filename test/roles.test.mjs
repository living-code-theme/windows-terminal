// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';

const flavors = resolveAll();

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const TERMINALS = {"windows-terminal": (f) => {
    const s = JSON.parse(read(`${f.slug}.json`));
    const names = ["black", "red", "green", "yellow", "blue", "purple", "cyan", "white"];
    const up = (n) => `bright${n[0].toUpperCase()}${n.slice(1)}`;
    return { bg: s.background, fg: s.foreground, cursor: s.cursorColor, selection: s.selectionBackground, ansi: [...names.map((n) => s[n]), ...names.map((n) => s[up(n)])] };
  }};

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

test("every terminal has the same ANSI colors, background, foreground, cursor and selection", () => {
  const failures = [];
  for (const f of flavors) {
    const want = { bg: f.r("bg"), fg: f.r("fg"), cursor: f.r("cursor"), selection: f.r("selection"), ansi: [...f.ansi.normal, ...f.ansi.bright] };
    for (const [port, load] of Object.entries(TERMINALS)) {
      const got = load(f);
      for (const k of ["bg", "fg", "cursor", "selection"]) {
        if (k in got && norm(got[k]) !== norm(want[k])) failures.push(`${port} ${f.id} ${k}: ${want[k]}, got ${got[k]}`);
      }
      got.ansi.forEach((c, i) => { if (norm(c) !== norm(want.ansi[i])) failures.push(`${port} ${f.id} ANSI ${i}: ${want.ansi[i]}, got ${c}`); });
    }
  }
  assert.deepEqual(failures, []);
});
