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

// Progress survives a reload: the deck order, position, answers, and group name are kept in
// sessionStorage, one entry per solo sort or group, and cleared once the sort is saved. Storage
// can be missing or throw (private windows, blocked site data), so every access is wrapped and
// the sort simply starts fresh without it.
const VALUE_KEYS = new Set(VALUES.map((v) => v.key));
const VALUE_BY_KEY = Object.fromEntries(VALUES.map((v) => [v.key, v]));

function storageKey(group) {
  return `values-sort:progress:${group ? group.code : "solo"}`;
}

function loadProgress(group) {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey(group)) || "null");
    if (!saved || !Array.isArray(saved.order)) return null;
    // Only resume a deck that is exactly today's values, so an edit to lib/values.js between
    // visits can't leave a card missing or a stale one in the middle.
    const order = saved.order;
    if (order.length !== VALUES.length || new Set(order).size !== order.length) return null;
    if (!order.every((k) => VALUE_KEYS.has(k))) return null;
    const idx = Number.isInteger(saved.idx) && saved.idx >= 0 && saved.idx <= order.length ? saved.idx : 0;
    const answers = {};
    for (const k of order.slice(0, idx)) {
      const t = saved.answers && saved.answers[k];
      if (!Number.isInteger(t) || t < 1 || t > 5) return null;
      answers[k] = t;
    }
    return {
      deck: order.map((k) => VALUE_BY_KEY[k]),
      idx,
      answers,
      label: typeof saved.label === "string" ? saved.label.slice(0, 24) : "",
      joined: saved.joined === true,
    };
  } catch {
    return null;
  }
}

function saveProgress(group, state) {
  try {
    window.sessionStorage.setItem(storageKey(group), JSON.stringify(state));
  } catch {
    // Storage full or blocked: the sort still works, it just won't survive a reload.
  }
}

function clearProgress(group) {
  try {
    window.sessionStorage.removeItem(storageKey(group));
  } catch {
    // Nothing to clean up if storage was never reachable.
  }
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

export default function SwipeSort({ group = null }) {
  const router = useRouter();
  // Picked after mount, not in the useState initializer: the server render and the client's first
  // render must match, and two independent Math.random() orders never do (React errors #418, #423,
  // #425). Until the effect runs, `deck` is null and the card renders empty, at its full size.
  const [deck, setDeck] = useState(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [label, setLabel] = useState("");
  // Sorting alone starts straight away; joining a group needs a name first, so
  // the comparison has something to put at the top of each column.
  const [joined, setJoined] = useState(!group);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const startX = useRef(0);
  const pointerId = useRef(null);

  // Once per mount: resume this tab's sort if there is one, otherwise shuffle a fresh deck.
  useEffect(() => {
    const saved = loadProgress(group);
    if (saved) {
      setDeck(saved.deck);
      setIdx(saved.idx);
      setAnswers(saved.answers);
      if (group && saved.joined && saved.label.trim()) {
        setLabel(saved.label);
        setJoined(true);
      }
    } else {
      setDeck(shuffle(VALUES));
    }
  }, []);

  useEffect(() => {
    if (!deck) return;
    saveProgress(group, { order: deck.map((v) => v.key), idx, answers, label, joined });
  }, [deck, idx, answers, label, joined, group]);

  const ready = deck !== null;
  const current = ready ? deck[idx] : null;
  // `ready` matters here: an empty placeholder deck must never read as a finished sort.
  const done = ready && idx >= deck.length;
  const hlTier = dragging || Math.abs(dx) > 0 ? tierFromDx(dx) : null;

  const assign = useCallback(
    (tier) => {
      const v = deck && deck[idx];
      if (!v) return;
      setAnswers((a) => ({ ...a, [v.key]: tier }));
      setDx(0);
      setDragging(false);
      setIdx((i) => i + 1);
    },
    [deck, idx]
  );

  const goBack = useCallback(() => {
    if (!deck || idx === 0) return;
    const prev = deck[idx - 1];
    setAnswers((a) => {
      const next = { ...a };
      delete next[prev.key];
      return next;
    });
    setDx(0);
    setIdx((i) => i - 1);
  }, [deck, idx]);

  // Keyboard: 1-5 assigns, backspace goes back.
  useEffect(() => {
    function onKey(e) {
      if (!joined || !ready || done || submitting) return;
      if (e.key >= "1" && e.key <= "5") assign(Number(e.key));
      else if (e.key === "Backspace") { e.preventDefault(); goBack(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [assign, goBack, ready, done, submitting, joined]);

  function onPointerDown(e) {
    if (!ready || submitting) return;
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
        body: JSON.stringify(
          group ? { answers, group: group.code, label: label.trim() } : { answers }
        ),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "Could not save");
      const { id } = await res.json();
      clearProgress(group);
      router.push(`/r/${id}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSubmitting(false);
    }
  }, [answers, router, group, label]);

  useEffect(() => {
    if (done && !submitting && !error) submit();
  }, [done, submitting, error, submit]);

  const pct = ready ? Math.round((idx / deck.length) * 100) : 0;

  if (!joined) {
    return (
      <div className="survey">
        <h1>Join {group.title ? `“${group.title}”` : "the group"}</h1>
        <p className="sub">
          What should the others call you? First name or a nickname is plenty — it labels your
          column in the comparison and nothing else.
        </p>
        <form
          className="gate"
          onSubmit={(e) => {
            e.preventDefault();
            if (label.trim()) setJoined(true);
          }}
        >
          <input
            className="input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Your name"
            maxLength={24}
            autoFocus
          />
          <button className="btn" type="submit" disabled={!label.trim()}>
            Start the sort
          </button>
        </form>
      </div>
    );
  }

  if (done) {
    return (
      <div className="survey" style={{ textAlign: "center" }}>
        <h1 className="sr-only">Sort your values</h1>
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
      <h1 className="sr-only">Sort your values</h1>
      <div className="progress"><span style={{ width: `${pct}%` }} /></div>

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
          {/* Non-breaking spaces hold the card's height while the order is being picked. */}
          <div className="vname">{current ? current.name : "\u00a0"}</div>
          <div className="vdef">{current ? current.def : "\u00a0"}</div>
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
