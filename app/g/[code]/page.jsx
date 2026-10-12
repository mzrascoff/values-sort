import Link from "next/link";
import { getGroup, getGroupMembers, getSort, kvConfigured } from "@/lib/kv";
import { normalizeCode } from "@/lib/id";
import GroupCompare from "@/components/GroupCompare";
import GroupActions from "@/components/GroupActions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your group's values",
  robots: { index: false },
};

export default async function GroupPage({ params }) {
  if (!kvConfigured) {
    return (
      <main className="wrap narrow">
        <h1>Storage not configured</h1>
        <p className="sub">
          Add the Upstash KV integration on Vercel, then start a group to see it here.
        </p>
        <Link className="btn" href="/">Home</Link>
      </main>
    );
  }

  const code = normalizeCode(params.code);
  let group = null;
  if (code) {
    try {
      group = await getGroup(code);
    } catch {
      group = null;
    }
  }

  if (!group) {
    return (
      <main className="wrap narrow">
        <h1>No such group</h1>
        <p className="sub">That group code does not exist, or the link is mistyped.</p>
        <Link className="btn" href="/">Start a group</Link>
      </main>
    );
  }

  let entries = [];
  try {
    entries = await getGroupMembers(code);
  } catch {
    entries = [];
  }

  const members = (
    await Promise.all(
      entries.map(async (m) => {
        let record = null;
        try {
          record = await getSort(m.id);
        } catch {
          record = null;
        }
        if (!record || !record.answers) return null;
        return { id: m.id, label: m.label || "unnamed", answers: record.answers };
      })
    )
  ).filter(Boolean);

  const heading = group.title || "Your group's values";

  return (
    <main className="wrap">
      <h1>{heading}</h1>
      <p className="sub">
        Group code <code className="codechip">{group.code}</code>
        {members.length === 1
          ? " · one sort in so far"
          : ` · ${members.length} sorts in so far`}
      </p>

      <GroupActions code={group.code} />

      {members.length < 2 ? (
        <div className="groupbox" style={{ marginTop: 22 }}>
          <h2>Waiting on the others</h2>
          <p className="muted" style={{ margin: 0 }}>
            The comparison appears once a second person finishes. Send them the invite link above;
            they sort on their own and land back here.
            {members.length === 1 && (
              <>
                {" "}
                So far: <strong>{members[0].label}</strong>.
              </>
            )}
          </p>
        </div>
      ) : (
        <>
          <div style={{ height: 8 }} />
          <GroupCompare members={members} />
          <div className="legend" style={{ marginTop: 26 }}>
            <b>Individual maps</b>
            {members.map((m) => (
              <Link className="key" key={m.id} href={`/r/${m.id}`}>
                {m.label}
              </Link>
            ))}
          </div>
        </>
      )}

      <p className="muted" style={{ marginTop: 28 }}>
        This page is private to whoever has the link. Anyone with the group code can add a sort to
        it and see the comparison.
      </p>
    </main>
  );
}
