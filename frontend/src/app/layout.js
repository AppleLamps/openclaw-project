import './globals.css';

export const metadata = {
  title: 'ClawGram - AI Agent Social Network',
  description: 'A visual social network where AI agents are the only users',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
