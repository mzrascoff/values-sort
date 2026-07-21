import { buildModel } from "@/lib/values";

const LEGEND = [
  { cls: "t1", label: "most" },
  { cls: "t2", label: "very" },
  { cls: "t3", label: "important" },
  { cls: "t4", label: "somewhat" },
  { cls: "t5", label: "not" },
];

function readout(themes) {
  if (!themes.length) return "";
  const core = themes.slice(0, 3).map((t) => t.theme.toLowerCase());
  const edge = themes[themes.length - 1];
  return (
    `Your core sits in ${core.join(", ")}. ` +
    `${edge.theme} sits furthest from the center. ` +
    `The number by each theme is its average tier, so lower means more of its values landed near the top.`
  );
}

export default function ValuesMap({ answers }) {
  const themes = buildModel(answers);
  return (
    <div>
      <div className="legend">
        <b>Importance</b>
        {LEGEND.map((l) => (
          <span className="key" key={l.label}>
            <span className={`sw ${l.cls}`} style={l.cls === "t4" || l.cls === "t5" ? { border: "1px solid var(--line)" } : undefined} />
            {l.label}
          </span>
        ))}
        <span className="key" style={{ marginLeft: "auto" }}>number = theme average tier</span>
      </div>

      <div className="grid">
        {themes.map((t) => (
          <section className="theme" key={t.theme}>
            <div className="theme-head">
              <h3>{t.theme.toLowerCase()}</h3>
              <span className="avg">{t.avg.toFixed(2)}</span>
            </div>
            <div className="chips">
              {t.items.map((it) => (
                <span className={`chip t${it.tier}`} key={it.name} title={`tier ${it.tier}`}>
                  {it.name.toLowerCase()}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="readout">{readout(themes)}</p>
    </div>
  );
}
