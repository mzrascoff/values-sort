import Link from "next/link";
import SwipeSort from "@/components/SwipeSort";
import { getGroup, kvConfigured } from "@/lib/kv";
import { normalizeCode } from "@/lib/id";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = { title: "Sort your values" };

export default async function SortPage({ searchParams }) {
  const code = normalizeCode(searchParams && searchParams.g);

  if (!code) return <SwipeSort />;

  let group = null;
  if (kvConfigured) {
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
        <p className="sub">
          That group code does not exist, or the invite link is mistyped. You can still sort on your
          own.
        </p>
        <Link className="btn" href="/sort">Sort on your own</Link>
      </main>
    );
  }

  return <SwipeSort group={{ code: group.code, title: group.title || "" }} />;
}
