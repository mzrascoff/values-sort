import "./globals.css";

const DESCRIPTION = "A quick card sort of your personal values, mapped by what matters most.";

// The favicon is app/icon.svg. The Open Graph tags are the link preview people see when a sort or
// group invite is shared; pages that set their own title keep it, and inherit the rest.
export const metadata = {
  metadataBase: new URL("https://values-sort-three.vercel.app"),
  title: "Values sort",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Values sort",
    title: "Values sort",
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: "Values sort", description: DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
