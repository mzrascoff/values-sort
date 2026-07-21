"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResultActions() {
  const [toast, setToast] = useState("");

  function show(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      show("Link copied");
    } catch {
      show("Copy failed — select the address bar");
    }
  }

  return (
    <div className="actions">
      <button className="btn" onClick={copyLink}>Copy share link</button>
      <button className="btn secondary" onClick={() => window.print()}>Save as PDF</button>
      <Link className="btn secondary" href="/sort">Take it again</Link>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
