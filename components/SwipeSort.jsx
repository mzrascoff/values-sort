"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { VALUES, TIERS } from "@/lib/values";

const DRAG_RANGE = 150; // px each side mapped across the five tiers
const COMMIT = 45; // min drag distance to count as a swipe

function tierFromDx(dx) {
  const idx = Math.round(((dx + DRAG_RANGE) / (2 * DRAG_RANGE)) * 4);
  return Math.min(4, Math.max(0, idx)) + 1; // 1..5
}

// Fisher-Yates shuffle so every session sees a fresh order.
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SwipeSort() {
  const router = useRouter();
  const [deck] = useState(() => shuffle(VALUES));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const startX = useRef(0);
  const pointerId = useRef(null);

  const current = deck[idx];
  const done = idx >= deck.length;
  const hlTier = dragging || Math.abs(dx) > 0 ? tierFromDx(dx) : null;

  const assign = useCallback(
    (tier) => {
      const v = deck[idx];
      if (!v) return;
      setAnswers((a) => ({ ...a, [v.key]: tier }));
      setDx(0);
      setDragging(false);
      setIdx((i) => i + 1);
    },
    [idx]
  );

  const goBack = useCallback(() => {
    if (idx === 0) return;
    const prev = deck[idx - 1];
    setAnswers((a) => {
      const next = { ...a };
      delete next[prev.key];
      return next;
    });
    setDx(0);
    setIdx((i) => i - 1);
  }, [idx]);

  // Keyboard: 1-5 assigns, backspace goes back.
  useEffect(() => {
    function onKey(e) {
      if (done || submitting) return;
      if (e.key >= "1" && e.key <= "5") assign(Number(e.key));
      else if (e.key === "Backspace") { e.preventDefault(); goBack(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [assign, goBack, done, submitting]);

  function onPointerDown(e) {
    if (submitting) return;
    setDragging(true);
    startX.current = e.clientX;
    pointerId.current = e.pointerId;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragging) return;
    setDx(e.clientX - startX.current);
  }
  function onPointerUp() {
    if (!dragging) return;
    if (Math.abs(dx) > COMMIT) assign(tierFromDx(dx));
    else { setDx(0); setDragging(false); }
  }

  // Submit once every value is sorted.
  const submit = useCallback(async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Could not save");
      const { id } = await res.json();
      router.push(`/r/${id}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSubmitting(false);
    }
  }, [answers, router]);

  useEffect(() => {
    if (done && !submitting && !error) submit();
  }, [done, submitting, error, submit]);

  const pct = Math.round((idx / deck.length) * 100);

  if (done) {
    return (
      <div className="survey" style={{ textAlign: "center" }}>
        <div className="progress"><span style={{ width: "100%" }} /></div>
        <p className="counter" style={{ marginTop: 30, fontSize: 16 }}>
          {error ? error : "Building your values map…"}
        </p>
        {error && (
          <button className="btn" onClick={submit} style={{ marginTop: 16 }}>Try again</button>
        )}
      </div>
    );
  }

  const rot = Math.max(-8, Math.min(8, dx / 14));

  return (
    <div className="survey">
      <div className="progress"><span style={{ width: `${pct}%` }} /></div>
      <div className="counter">{idx + 1} of {deck.length}</div>

      <div className="stage">
        <div
          className="card-v"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            transform: `translateX(${dx}px) rotate(${rot}deg)`,
            transition: dragging ? "none" : "transform 0.2s ease",
          }}
        >
          <div className="vname">{current.name}</div>
          <div className="vdef">{current.def}</div>
          <div className="card-hint">swipe toward a tier, tap below, or press 1&ndash;5</div>
        </div>
      </div>

      <div className="tierbar">
        {TIERS.map((t) => (
          <button
            key={t.n}
            className={`tierbtn t${t.n}${hlTier === t.n ? " hl" : ""}`}
            onClick={() => assign(t.n)}
          >
            <span className="num">{t.n}</span>
            <span>{t.short}</span>
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="linkbtn" onClick={goBack} disabled={idx === 0}>&larr; Back</button>
        <span className="muted">most important &rarr; not important</span>
      </div>
    </div>
  );
}
