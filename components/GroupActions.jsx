"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GroupActions({ code }) {
  const [origin, setOrigin] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => setOrigin(window.location.origin), []);

  function show(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
      show(msg);
    } catch {
      show("Copy failed — select the link and copy it");
    }
  }

  const joinUrl = `${origin}/sort?g=${code}`;

  return (
    <div>
      <div className="joinbox">
        <div>
          <div className="muted">Invite link</div>
          <code className="joinurl">{origin ? joinUrl : `/sort?g=${code}`}</code>
        </div>
        <button className="btn secondary" onClick={() => copy(joinUrl, "Invite link copied")}>
          Copy
        </button>
      </div>
      <div className="actions">
        <Link className="btn" href={`/sort?g=${code}`}>Add your sort</Link>
        <button
          className="btn secondary"
          onClick={() => copy(window.location.href, "Link to this page copied")}
        >
          Copy link to this page
        </button>
        <button className="btn secondary" onClick={() => window.print()}>Save as PDF</button>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
