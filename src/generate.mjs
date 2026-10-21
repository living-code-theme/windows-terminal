// This port owns its application mappings. Inputs come only from the pinned local palette.


const WT_NAMES = ["black", "red", "green", "yellow", "blue", "purple", "cyan", "white"];

function windowsTerminalScheme(f) {
  const scheme = { name: f.name };
  WT_NAMES.forEach((n, i) => { scheme[n] = f.ansi.normal[i]; });
  WT_NAMES.forEach((n, i) => { scheme["bright" + n[0].toUpperCase() + n.slice(1)] = f.ansi.bright[i]; });
  scheme.background = f.r("bg");
  scheme.foreground = f.r("fg");
  scheme.cursorColor = f.r("cursor");
  scheme.selectionBackground = f.r("selection");
  return scheme;
}

const windowsTerminal = {
files: (f) => [{ path: `${f.slug}.json`, content: JSON.stringify(windowsTerminalScheme(f), null, 2) + "\n" }],
all: (fs) => [{ path: "living-code.json", content: JSON.stringify({ schemes: fs.map(windowsTerminalScheme) }, null, 2) + "\n" }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => windowsTerminal.files(f)), ...(windowsTerminal.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
