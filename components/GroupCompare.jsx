import { buildGroupModel, TIER_LABEL } from "@/lib/values";

const MAX_LIST = 14;

function Tiers({ row, people }) {
  return (
    <span className="tiers">
      {row.tiers.map((t, i) => (
        <span className={`tpill t${t}`} key={people[i] + i} title={`${people[i]}: ${TIER_LABEL[t]}`}>
          {t}
        </span>
      ))}
    </span>
  );
}

function List({ title, note, rows, people, empty }) {
  return (
    <section className="theme">
      <div className="theme-head">
        <h3>{title}</h3>
        <span className="avg">{rows.length}</span>
      </div>
      <p className="muted" style={{ margin: "0 0 12px" }}>{note}</p>
      {rows.length === 0 ? (
        <p className="muted" style={{ margin: 0 }}>{empty}</p>
      ) : (
        <ul className="cmplist">
          {rows.slice(0, MAX_LIST).map((r) => (
            <li key={r.key}>
              <span className="vlabel">{r.name.toLowerCase()}</span>
              <Tiers row={r} people={people} />
            </li>
          ))}
          {rows.length > MAX_LIST && (
            <li className="muted">and {rows.length - MAX_LIST} more</li>
          )}
        </ul>
      )}
    </section>
  );
}

export default function GroupCompare({ members }) {
  const model = buildGroupModel(members);
  const { people, themes } = model;

  if (people.length < 2) return null;

  return (
    <div>
      <div className="legend">
        <b>Who sorted</b>
        {people.map((p, i) => (
          <span className="key" key={p + i}>{p || "unnamed"}</span>
        ))}
        <span className="key" style={{ marginLeft: "auto" }}>
          1 = most important, 5 = not important
        </span>
      </div>

      <h2 style={{ marginTop: 26 }}>Themes, side by side</h2>
      <p className="muted" style={{ margin: "0 0 14px" }}>
        Each number is that person&rsquo;s average tier for the theme, so lower sits closer to their
        center. Themes run from the group&rsquo;s most central down.
      </p>
      <div className="cmpwrap">
        <table className="cmp">
          <thead>
            <tr>
              <th>Theme</th>
              {people.map((p, i) => (
                <th key={p + i}>{p || "unnamed"}</th>
              ))}
              <th>Gap</th>
            </tr>
          </thead>
          <tbody>
            {themes.map((t) => (
              <tr key={t.theme} className={t.spread >= 1 ? "split" : undefined}>
                <th scope="row">{t.theme.toLowerCase()}</th>
                {t.per.map((p, i) => (
                  <td key={(p.label || "") + i}>{p.avg == null ? "—" : p.avg.toFixed(2)}</td>
                ))}
                <td className="gap">{t.spread.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: 32 }}>Where you converge and diverge</h2>
      <p className="muted" style={{ margin: "0 0 14px" }}>
        Comparing the {model.compared} values everyone sorted. Each row shows one person&rsquo;s tier
        per pill, in the order above.
      </p>
      <div className="grid">
        <List
          title="shared core"
          note="Everyone put these in the top two tiers."
          rows={model.sharedCore}
          people={people}
          empty="No value landed in the top two tiers for all of you."
        />
        <List
          title="widest splits"
          note="Two tiers apart or more — the ones worth talking about."
          rows={model.divergent}
          people={people}
          empty="Nobody is more than one tier apart on anything."
        />
        <List
          title="shared periphery"
          note="Everyone put these in the bottom two tiers."
          rows={model.sharedEdge}
          people={people}
          empty="No value landed in the bottom two tiers for all of you."
        />
      </div>

      <p className="readout">
        {model.sharedCore.length} of the {model.compared} values everyone sorted are core to all of
        you, and {model.divergent.length} sit two tiers apart or more.
        {model.widestTheme && model.widestTheme.spread >= 0.5
          ? ` ${model.widestTheme.theme} is where you spread furthest apart as a group.`
          : " No theme pulls you far apart."}
      </p>
    </div>
  );
}
