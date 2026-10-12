import Link from "next/link";
import { getSort, kvConfigured } from "@/lib/kv";
import ValuesMap from "@/components/ValuesMap";
import ResultActions from "@/components/ResultActions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Your values map",
  robots: { index: false },
};

export default async function ResultPage({ params }) {
  if (!kvConfigured) {
    return (
      <main className="wrap narrow">
        <h1>Storage not configured</h1>
        <p className="sub">Add the Upstash KV integration on Vercel, then submit a sort to see results here.</p>
        <Link className="btn" href="/">Home</Link>
      </main>
    );
  }

  let record = null;
  try {
    record = await getSort(params.id);
  } catch {
    record = null;
  }

  if (!record || !record.answers) {
    return (
      <main className="wrap narrow">
        <h1>Not found</h1>
        <p className="sub">This results link does not exist or has expired.</p>
        <Link className="btn" href="/sort">Take the sort</Link>
      </main>
    );
  }

  const when = new Date(record.createdAt).toLocaleDateString(undefined, {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <main className="wrap">
      <h1>Your values map</h1>
      <p className="sub">
        Sorted {when}. Themes run from most central (top-left) to most peripheral, and each value is
        colored by how much it matters to you.
      </p>
      <ResultActions />
      <div style={{ height: 8 }} />
      <ValuesMap answers={record.answers} />
      {record.groupCode && (
        <p className="muted" style={{ marginTop: 28 }}>
          You sorted as part of a group.{" "}
          <Link href={`/g/${record.groupCode}`}>See everyone side by side</Link>.
        </p>
      )}
      <p className="muted" style={{ marginTop: record.groupCode ? 8 : 28 }}>
        This page is private to whoever has the link. <Link href="/sort">Take the sort yourself</Link>.
      </p>
    </main>
  );
}
