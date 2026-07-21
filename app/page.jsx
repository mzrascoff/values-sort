import Link from "next/link";
import { VALUES } from "@/lib/values";

export default function Home() {
  return (
    <main className="wrap narrow">
      <h1>What matters most to you?</h1>
      <p className="sub">
        A quick card sort of {VALUES.length} personal values. Swipe or tap each one into how much
        it matters, from most important to not important. Takes about three minutes. No login, and
        it stays anonymous. At the end you get a visual map of your values you can save and share.
      </p>
      <Link className="btn" href="/sort">Start the sort</Link>
      <p className="muted" style={{ marginTop: 18 }}>
        Nothing is tied to your name. Your results live at a private link that only you have unless
        you choose to share it.
      </p>
    </main>
  );
}
