// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';

const flavors = resolveAll();

const windowsTerminal = {files: f=>generate([f]).filter(x=>x.path!=='living-code.json'), all: fs=>generate(fs).filter(x=>x.path==='living-code.json'||x.path==='theme.css'||x.path.startsWith('snippets/')), install:readFileSync(new URL('../README.md',import.meta.url),'utf8')};

const windowsTerminalScheme = f => JSON.parse(generate([f]).find(x=>x.path===`${f.slug}.json`).content);

const HEX = /^#[0-9a-f]{6}$/i;

test("Windows Terminal schemes carry all 16 ANSI slots and the fragment holds one scheme per flavor", () => {
  const names = ["black", "red", "green", "yellow", "blue", "purple", "cyan", "white"];
  for (const f of flavors) {
    const s = JSON.parse(windowsTerminal.files(f)[0].content);
    assert.deepEqual(s, windowsTerminalScheme(f));
    assert.equal(s.name, f.name);
    names.forEach((n, i) => {
      assert.equal(s[n], f.ansi.normal[i]);
      assert.equal(s["bright" + n[0].toUpperCase() + n.slice(1)], f.ansi.bright[i]);
    });
    for (const k of ["background", "foreground", "cursorColor", "selectionBackground"]) assert.match(s[k], HEX, k);
  }
  const fragment = JSON.parse(windowsTerminal.all(flavors)[0].content);
  assert.deepEqual(Object.keys(fragment), ["schemes"]);
  assert.deepEqual(fragment.schemes.map((s) => s.name), flavors.map((f) => f.name));
  assert.equal(windowsTerminal.all(flavors)[0].path, "living-code.json");
});
