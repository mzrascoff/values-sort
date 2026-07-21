import "./globals.css";

export const metadata = {
  title: "Values sort",
  description: "A quick card sort of your personal values, mapped by what matters most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
