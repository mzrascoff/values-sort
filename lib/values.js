// Full personal values card sort: 104 values across nine themes.
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
  // Love & belonging
  { key: "family", name: "Family", def: "to have a happy, loving family", theme: "Love & belonging" },
  { key: "friendship", name: "Friendship", def: "to have close, supportive friends", theme: "Love & belonging" },
  { key: "belonging", name: "Belonging", def: "to have a sense of belonging, being part of", theme: "Love & belonging" },
  { key: "loved", name: "Loved", def: "to be loved by those close to me", theme: "Love & belonging" },
  { key: "loving", name: "Loving", def: "to give love to others", theme: "Love & belonging" },
  { key: "caring", name: "Caring", def: "to take care of others", theme: "Love & belonging" },
  { key: "compassion", name: "Compassion", def: "to feel and act on concern for others", theme: "Love & belonging" },
  { key: "nurturance", name: "Nurturance", def: "to encourage and support others", theme: "Love & belonging" },
  { key: "protect", name: "Protect", def: "to protect and keep safe those I love", theme: "Love & belonging" },
  { key: "provide", name: "Provide", def: "to provide for and take care of my family", theme: "Love & belonging" },
  { key: "faithfulness", name: "Faithfulness", def: "to be loyal and true in relationships", theme: "Love & belonging" },
  { key: "generosity", name: "Generosity", def: "to give what I have to others", theme: "Love & belonging" },
  { key: "monogamy", name: "Monogamy", def: "to have one close, loving relationship", theme: "Love & belonging" },
  { key: "romance", name: "Romance", def: "to have intense, exciting love in my life", theme: "Love & belonging" },
  { key: "commitment", name: "Commitment", def: "to make enduring, meaningful commitments", theme: "Love & belonging" },
  { key: "forgiveness", name: "Forgiveness", def: "to be forgiving of others", theme: "Love & belonging" },
  { key: "sexuality", name: "Sexuality", def: "to have an active and satisfying sex life", theme: "Love & belonging" },
  { key: "intimacy", name: "Intimacy", def: "to share my innermost experiences with others", theme: "Love & belonging" },
  // Service & justice
  { key: "service", name: "Service", def: "to be helpful and of service to others", theme: "Service & justice" },
  { key: "justice", name: "Justice", def: "to promote fair and equal treatment for all", theme: "Service & justice" },
  { key: "tolerance", name: "Tolerance", def: "to accept and respect those who differ from me", theme: "Service & justice" },
  { key: "world-peace", name: "World peace", def: "to work to promote peace in the world", theme: "Service & justice" },
  { key: "ecology", name: "Ecology", def: "to live in harmony with the environment", theme: "Service & justice" },
  { key: "cooperation", name: "Cooperation", def: "to work collaboratively with others", theme: "Service & justice" },
  { key: "compromise", name: "Compromise", def: "to be willing to give and take in reaching agreements", theme: "Service & justice" },
  { key: "courtesy", name: "Courtesy", def: "to be considerate and polite toward others", theme: "Service & justice" },
  // Growth & curiosity
  { key: "growth", name: "Growth", def: "to keep changing and growing", theme: "Growth & curiosity" },
  { key: "curiosity", name: "Curiosity", def: "to seek out, experience, and learn new things", theme: "Growth & curiosity" },
  { key: "knowledge", name: "Knowledge", def: "to learn and contribute valuable knowledge", theme: "Growth & curiosity" },
  { key: "creativity", name: "Creativity", def: "to create new things or ideas", theme: "Growth & curiosity" },
  { key: "imagination", name: "Imagination", def: "to have dreams and see possibilities", theme: "Growth & curiosity" },
  { key: "openness", name: "Openness", def: "to be open to new experiences, ideas, and options", theme: "Growth & curiosity" },
  { key: "novelty", name: "Novelty", def: "to have a life full of change and variety", theme: "Growth & curiosity" },
  { key: "adventure", name: "Adventure", def: "to have new and exciting experiences", theme: "Growth & curiosity" },
  { key: "challenge", name: "Challenge", def: "to take on difficult tasks and problems", theme: "Growth & curiosity" },
  { key: "complexity", name: "Complexity", def: "to embrace the intricacies of life", theme: "Growth & curiosity" },
  { key: "contribution", name: "Contribution", def: "to make a lasting contribution in the world", theme: "Growth & curiosity" },
  { key: "intelligence", name: "Intelligence", def: "to keep my mind sharp and active", theme: "Growth & curiosity" },
  { key: "passion", name: "Passion", def: "to have deep feelings about ideas, activities, or people", theme: "Growth & curiosity" },
  { key: "excitement", name: "Excitement", def: "to have a life full of thrills and stimulation", theme: "Growth & curiosity" },
  // Meaning & spirit
  { key: "purpose", name: "Purpose", def: "to have meaning and direction in my life", theme: "Meaning & spirit" },
  { key: "hope", name: "Hope", def: "to maintain a positive and optimistic outlook", theme: "Meaning & spirit" },
  { key: "gratitude", name: "Gratitude", def: "to be thankful and appreciative", theme: "Meaning & spirit" },
  { key: "spirituality", name: "Spirituality", def: "to grow and mature spiritually", theme: "Meaning & spirit" },
  { key: "gods-will", name: "God's will", def: "to seek and follow a higher purpose", theme: "Meaning & spirit" },
  { key: "inner-peace", name: "Inner peace", def: "to experience personal peace", theme: "Meaning & spirit" },
  { key: "mindfulness", name: "Mindfulness", def: "to live conscious and mindful of the present moment", theme: "Meaning & spirit" },
  // Authenticity & integrity
  { key: "genuineness", name: "Genuineness", def: "to act in a manner that is true to who I am", theme: "Authenticity & integrity" },
  { key: "integrity", name: "Integrity", def: "to live my daily life in a way that is consistent with my values", theme: "Authenticity & integrity" },
  { key: "dependability", name: "Dependability", def: "to be reliable and trustworthy", theme: "Authenticity & integrity" },
  { key: "honesty", name: "Honesty", def: "to be honest and truthful", theme: "Authenticity & integrity" },
  { key: "self-knowledge", name: "Self-knowledge", def: "to have a deep and honest understanding of myself", theme: "Authenticity & integrity" },
  { key: "self-acceptance", name: "Self-acceptance", def: "to accept myself as I am", theme: "Authenticity & integrity" },
  { key: "acceptance", name: "Acceptance", def: "to be accepted as I am", theme: "Authenticity & integrity" },
  { key: "virtue", name: "Virtue", def: "to live a morally pure and excellent life", theme: "Authenticity & integrity" },
  { key: "merit", name: "Merit", def: "be judged by what I do, not what I say", theme: "Authenticity & integrity" },
  { key: "responsibility", name: "Responsibility", def: "to make and carry out responsible decisions", theme: "Authenticity & integrity" },
  { key: "duty", name: "Duty", def: "to carry out my duties and obligations", theme: "Authenticity & integrity" },
  { key: "humility", name: "Humility", def: "to be modest and unassuming", theme: "Authenticity & integrity" },
  { key: "self-esteem", name: "Self-esteem", def: "to feel good about myself", theme: "Authenticity & integrity" },
  { key: "self-control", name: "Self-control", def: "to be disciplined in my own actions", theme: "Authenticity & integrity" },
  // Achievement & mastery
  { key: "accomplishment", name: "Accomplishment", def: "excel at you whatever I do", theme: "Achievement & mastery" },
  { key: "quality", name: "Quality", def: "expect/deliver high quality", theme: "Achievement & mastery" },
  { key: "appreciation", name: "Appreciation", def: "my accomplishments are appreciated", theme: "Achievement & mastery" },
  { key: "mastery", name: "Mastery", def: "to be competent in my everyday activities", theme: "Achievement & mastery" },
  { key: "diligence", name: "Diligence", def: "to be thorough and conscientious in whatever I do", theme: "Achievement & mastery" },
  { key: "leadership", name: "Leadership", def: "to inspire and guide others", theme: "Achievement & mastery" },
  { key: "achievement", name: "Achievement", def: "to have important accomplishments", theme: "Achievement & mastery" },
  { key: "industry", name: "Industry", def: "to work hard and well at my life tasks", theme: "Achievement & mastery" },
  // Autonomy & freedom
  { key: "autonomy", name: "Autonomy", def: "to be self-determined and independent", theme: "Autonomy & freedom" },
  { key: "non-conformity", name: "Non-conformity", def: "to question and challenge authority and norms", theme: "Autonomy & freedom" },
  { key: "freedom", name: "Freedom", def: "to be free from undue restrictions and limitations", theme: "Autonomy & freedom" },
  { key: "independence-to-be-free-from-depending-on-others", name: "Independence to be free from depending on others", def: "", theme: "Autonomy & freedom" },
  { key: "flexibility", name: "Flexibility", def: "to adjust to new circumstances easily", theme: "Autonomy & freedom" },
  { key: "risk", name: "Risk", def: "to take risks and chances", theme: "Autonomy & freedom" },
  // Wellbeing & joy
  { key: "moderation", name: "Moderation", def: "to avoid excesses and find a middle ground", theme: "Wellbeing & joy" },
  { key: "fun", name: "Fun", def: "to play and have fun", theme: "Wellbeing & joy" },
  { key: "humor", name: "Humor", def: "to see the humorous side of myselfand the world", theme: "Wellbeing & joy" },
  { key: "leisure", name: "Leisure", def: "to take time to relax and enjoy", theme: "Wellbeing & joy" },
  { key: "health", name: "Health", def: "to be physically well and healthy", theme: "Wellbeing & joy" },
  { key: "comfort", name: "Comfort", def: "to have a pleasant and comfortable life", theme: "Wellbeing & joy" },
  { key: "safety", name: "Safety", def: "to be safe and secure", theme: "Wellbeing & joy" },
  { key: "stability", name: "Stability", def: "to have a life that stays fairly consistent", theme: "Wellbeing & joy" },
  { key: "simplicity", name: "Simplicity", def: "to live life simply, with minimal needs", theme: "Wellbeing & joy" },
  { key: "art", name: "Art", def: "to appreciate or express myself through art", theme: "Wellbeing & joy" },
  { key: "practicality", name: "Practicality", def: "to focus on what is practical, prudent, and sensible", theme: "Wellbeing & joy" },
  { key: "tradition", name: "Tradition", def: "to follow respected patterns of the past", theme: "Wellbeing & joy" },
  { key: "fitness", name: "Fitness", def: "to be physically fit and strong", theme: "Wellbeing & joy" },
  { key: "beauty", name: "Beauty", def: "to appreciate beauty around me", theme: "Wellbeing & joy" },
  { key: "music", name: "Music", def: "to enjoy or express myself in music", theme: "Wellbeing & joy" },
  { key: "pleasure", name: "Pleasure", def: "to feel good", theme: "Wellbeing & joy" },
  { key: "solitude", name: "Solitude", def: "to have time and space where I canbe apart from others", theme: "Wellbeing & joy" },
  { key: "courage", name: "Courage", def: "to be brave and strong in the face of adversity", theme: "Wellbeing & joy" },
  { key: "realism", name: "Realism", def: "to see and act realistically and practically", theme: "Wellbeing & joy" },
  // Status & recognition
  { key: "authority", name: "Authority", def: "to be in charge of others", theme: "Status & recognition" },
  { key: "power", name: "Power", def: "to have control over others", theme: "Status & recognition" },
  { key: "wealth", name: "Wealth", def: "to have enough money to not worry about finances", theme: "Status & recognition" },
  { key: "attractiveness", name: "Attractiveness", def: "to be physically attractive", theme: "Status & recognition" },
  { key: "patriotism", name: "Patriotism", def: "to love, serve, and protect my country", theme: "Status & recognition" },
  { key: "popularity", name: "Popularity", def: "to be well-liked by many people", theme: "Status & recognition" },
  { key: "rationality", name: "Rationality", def: "to be guided by reason, logic, and evidence", theme: "Status & recognition" },
  { key: "order", name: "Order", def: "to have a life that is well-ordered and organized", theme: "Status & recognition" },
  { key: "accuracy", name: "Accuracy", def: "to be correct in my opinions and beliefs", theme: "Status & recognition" },
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

// Compare several sorts side by side.
// members: [{ label, answers }]. Returns the theme table plus the three lists
// that carry the conversation: where everyone agrees it matters, where everyone
// agrees it doesn't, and where the group splits.
export function buildGroupModel(members) {
  const people = (members || []).filter((m) => m && m.answers);

  const themes = THEME_ORDER.map((theme) => {
    const items = VALUES.filter((v) => v.theme === theme);
    const per = people.map((p) => {
      const tiers = items.map((v) => p.answers[v.key]).filter(Boolean);
      const avg = tiers.length ? tiers.reduce((s, t) => s + t, 0) / tiers.length : null;
      return { label: p.label, avg };
    });
    const got = per.filter((p) => p.avg != null).map((p) => p.avg);
    const groupAvg = got.length ? got.reduce((s, a) => s + a, 0) / got.length : null;
    const spread = got.length > 1 ? Math.max(...got) - Math.min(...got) : 0;
    return { theme, per, groupAvg, spread };
  }).filter((t) => t.groupAvg != null);
  themes.sort((a, b) => a.groupAvg - b.groupAvg);

  // Only values every person actually sorted can be compared.
  const rows = [];
  for (const v of VALUES) {
    const tiers = people.map((p) => p.answers[v.key] ?? null);
    if (!tiers.length || tiers.some((t) => t == null)) continue;
    rows.push({
      key: v.key,
      name: v.name,
      def: v.def,
      theme: v.theme,
      tiers,
      min: Math.min(...tiers),
      max: Math.max(...tiers),
      spread: Math.max(...tiers) - Math.min(...tiers),
      sum: tiers.reduce((s, t) => s + t, 0),
    });
  }

  const byName = (a, b) => a.name.localeCompare(b.name);
  const sharedCore = rows
    .filter((r) => r.max <= 2)
    .sort((a, b) => a.sum - b.sum || byName(a, b));
  const sharedEdge = rows
    .filter((r) => r.min >= 4)
    .sort((a, b) => b.sum - a.sum || byName(a, b));
  const divergent = rows
    .filter((r) => r.spread >= 2)
    .sort((a, b) => b.spread - a.spread || a.sum - b.sum || byName(a, b));

  const widestTheme = themes.length
    ? themes.reduce((w, t) => (t.spread > w.spread ? t : w), themes[0])
    : null;

  return {
    people: people.map((p) => p.label),
    themes,
    sharedCore,
    sharedEdge,
    divergent,
    widestTheme,
    compared: rows.length,
  };
}
