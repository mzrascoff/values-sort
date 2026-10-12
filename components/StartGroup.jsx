"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StartGroup() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function create(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) {
        throw new Error((await res.json().catch(() => ({}))).error || "Could not create the group");
      }
      const data = await res.json();
      router.push(`/g/${data.code}`);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setBusy(false);
    }
  }

  function join(e) {
    e.preventDefault();
    const clean = code.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    if (clean) router.push(`/g/${clean}`);
  }

  if (!open) {
    return (
      <p className="muted" style={{ marginTop: 20 }}>
        Doing this with other people?{" "}
        <button className="linkbtn inline" onClick={() => setOpen(true)}>
          Sort as a group
        </button>{" "}
        and you get one page comparing everyone&rsquo;s map.
      </p>
    );
  }

  return (
    <div className="groupbox">
      <h2>Sort as a group</h2>
      <p className="muted" style={{ marginBottom: 14 }}>
        Start a group and share the invite link. Everyone sorts on their own, and the group page
        shows where you converge and where you split.
      </p>
      <form className="gate" onSubmit={create}>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name the group (optional)"
          maxLength={60}
        />
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Creating…" : "Create a group"}
        </button>
      </form>
      {error && <p className="muted" style={{ color: "#b4452f" }}>{error}</p>}
      <form className="gate" onSubmit={join} style={{ marginTop: 10 }}>
        <input
          className="input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Or open an existing group code"
          maxLength={12}
        />
        <button className="btn secondary" type="submit" disabled={!code.trim()}>
          Open
        </button>
      </form>
    </div>
  );
}
