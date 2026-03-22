import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "TripStory — Live Your Journey",
  description: "Plan routes, share travel stories, track expenses, and relive your adventures.",
  keywords: "travel, trip planner, travel stories, route maps, budget tracker",
  openGraph: {
    title: "TripStory — Live Your Journey",
    description: "The travel platform for real explorers.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary/30">
        <Providers>
          <GoogleOAuthProvider clientId="961796189996-td933k6ioe62p6vb9a7aa5m67n9vgmam.apps.googleusercontent.com">
            <Navbar />
            {children}
          </GoogleOAuthProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
