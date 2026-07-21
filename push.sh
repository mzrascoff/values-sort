#!/usr/bin/env bash
# Create the values-sort GitHub repo and push this project.
# Run from inside the values-sort folder on your Mac (you're already signed into GitHub).
set -e

REPO="values-sort"
VIS="public"   # change to "private" if you prefer

if [ ! -f package.json ]; then
  echo "Run this from inside the values-sort folder."; exit 1
fi

git init -q
git add -A
git commit -qm "Initial commit: values-sort" || true
git branch -M main

if command -v gh >/dev/null 2>&1; then
  echo "Creating GitHub repo with gh CLI…"
  gh repo create "$REPO" --"$VIS" --source=. --remote=origin --push
  echo "Done. Repo pushed."
else
  echo "GitHub CLI (gh) not found."
  echo "1) Create an empty repo named '$REPO' at https://github.com/new (no README)."
  echo "2) Then run:"
  echo "   git remote add origin https://github.com/<your-username>/$REPO.git"
  echo "   git push -u origin main"
fi
