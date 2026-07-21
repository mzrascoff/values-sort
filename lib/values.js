// Curated ~40 values across nine themes for the quick card sort.
// Each value: key (stable id), name, def (short definition), theme.

export const THEME_ORDER = [
  "Love & belonging",
  "Service & justice",
  "Growth & curiosity",
  "Meaning & spirit",
  "Authenticity & integrity",
  "Achievement & mastery",
  "Autonomy & freedom",
  "Wellbeing & joy",
  "Status & recognition",
];

export const TIERS = [
  { n: 1, label: "Most important", short: "Most" },
  { n: 2, label: "Very important", short: "Very" },
  { n: 3, label: "Important", short: "Important" },
  { n: 4, label: "Somewhat", short: "Somewhat" },
  { n: 5, label: "Not important", short: "Not" },
];

export const VALUES = [
  { key: "family", name: "Family", def: "to have a happy, loving family", theme: "Love & belonging" },
  { key: "friendship", name: "Friendship", def: "to have close, supportive friends", theme: "Love & belonging" },
  { key: "love", name: "Love", def: "to give and receive love", theme: "Love & belonging" },
  { key: "belonging", name: "Belonging", def: "to feel part of something", theme: "Love & belonging" },
  { key: "compassion", name: "Compassion", def: "to feel and act on concern for others", theme: "Love & belonging" },

  { key: "justice", name: "Justice", def: "to promote fair and equal treatment", theme: "Service & justice" },
  { key: "service", name: "Service", def: "to be helpful and of service to others", theme: "Service & justice" },
  { key: "tolerance", name: "Tolerance", def: "to accept and respect those who differ", theme: "Service & justice" },
  { key: "cooperation", name: "Cooperation", def: "to work collaboratively with others", theme: "Service & justice" },

  { key: "growth", name: "Growth", def: "to keep changing and growing", theme: "Growth & curiosity" },
  { key: "curiosity", name: "Curiosity", def: "to seek out and learn new things", theme: "Growth & curiosity" },
  { key: "creativity", name: "Creativity", def: "to create new things or ideas", theme: "Growth & curiosity" },
  { key: "knowledge", name: "Knowledge", def: "to learn and contribute knowledge", theme: "Growth & curiosity" },
  { key: "openness", name: "Openness", def: "to be open to new experiences and ideas", theme: "Growth & curiosity" },

  { key: "purpose", name: "Purpose", def: "to have meaning and direction in life", theme: "Meaning & spirit" },
  { key: "hope", name: "Hope", def: "to keep a positive, optimistic outlook", theme: "Meaning & spirit" },
  { key: "gratitude", name: "Gratitude", def: "to be thankful and appreciative", theme: "Meaning & spirit" },
  { key: "spirituality", name: "Spirituality", def: "to grow and mature spiritually", theme: "Meaning & spirit" },
  { key: "mindfulness", name: "Mindfulness", def: "to live conscious of the present moment", theme: "Meaning & spirit" },

  { key: "integrity", name: "Integrity", def: "to live consistently with my values", theme: "Authenticity & integrity" },
  { key: "honesty", name: "Honesty", def: "to be honest and truthful", theme: "Authenticity & integrity" },
  { key: "authenticity", name: "Authenticity", def: "to act in a way that is true to who I am", theme: "Authenticity & integrity" },
  { key: "self-knowledge", name: "Self-knowledge", def: "to understand myself honestly and deeply", theme: "Authenticity & integrity" },
  { key: "dependability", name: "Dependability", def: "to be reliable and trustworthy", theme: "Authenticity & integrity" },

  { key: "accomplishment", name: "Accomplishment", def: "to excel at whatever I do", theme: "Achievement & mastery" },
  { key: "mastery", name: "Mastery", def: "to be competent in what I take on", theme: "Achievement & mastery" },
  { key: "quality", name: "Quality", def: "to expect and deliver high quality", theme: "Achievement & mastery" },
  { key: "leadership", name: "Leadership", def: "to inspire and guide others", theme: "Achievement & mastery" },

  { key: "autonomy", name: "Autonomy", def: "to be self-determined and independent", theme: "Autonomy & freedom" },
  { key: "freedom", name: "Freedom", def: "to be free from undue restriction", theme: "Autonomy & freedom" },
  { key: "independence", name: "Independence", def: "to not depend on others", theme: "Autonomy & freedom" },
  { key: "non-conformity", name: "Non-conformity", def: "to question and challenge norms", theme: "Autonomy & freedom" },

  { key: "health", name: "Health", def: "to be physically well and healthy", theme: "Wellbeing & joy" },
  { key: "fun", name: "Fun", def: "to play and have fun", theme: "Wellbeing & joy" },
  { key: "humor", name: "Humor", def: "to see the humorous side of life", theme: "Wellbeing & joy" },
  { key: "adventure", name: "Adventure", def: "to have new and exciting experiences", theme: "Wellbeing & joy" },
  { key: "beauty", name: "Beauty", def: "to appreciate beauty around me", theme: "Wellbeing & joy" },

  { key: "wealth", name: "Wealth", def: "to have plenty of money", theme: "Status & recognition" },
  { key: "power", name: "Power", def: "to have influence over others", theme: "Status & recognition" },
  { key: "popularity", name: "Popularity", def: "to be well-liked by many people", theme: "Status & recognition" },
  { key: "fame", name: "Fame", def: "to be known and recognized", theme: "Status & recognition" },
];

export const VALUE_BY_KEY = Object.fromEntries(VALUES.map((v) => [v.key, v]));

export const TIER_LABEL = Object.fromEntries(TIERS.map((t) => [t.n, t.label]));

// Build the themed model from an answers map { valueKey: tier(1-5) }.
// Returns themes ordered by average tier (most central first).
export function buildModel(answers) {
  const byTheme = {};
  for (const theme of THEME_ORDER) byTheme[theme] = [];
  for (const v of VALUES) {
    const tier = answers[v.key];
    if (!tier) continue;
    byTheme[v.theme].push({ name: v.name, tier });
  }
  const themes = [];
  for (const theme of THEME_ORDER) {
    const items = byTheme[theme];
    if (!items.length) continue;
    items.sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name));
    const avg = items.reduce((s, i) => s + i.tier, 0) / items.length;
    themes.push({ theme, items, avg });
  }
  themes.sort((a, b) => a.avg - b.avg);
  return themes;
}
