import type { Metadata } from "next";
import "../styles/globals.scss";
import "../styles/app.scss";
import "../styles/tailwind.css";
import DockElement from "../components/DockElement";
import GitHubStars from "../components/GitHubStars";
import MainWrapper from "../components/MainWrapper";

export const metadata: Metadata = {
  title: {
    default: "Docerium",
    template: "%s | Docerium",
  },
  description:
    "Docerium is the all-in-one educational platform combining interactive whiteboards, notebook functionality, and visual graphs for enhanced teaching and learning experiences.",
  keywords: [
    "education",
    "teaching",
    "learning",
    "whiteboard",
    "notebook",
    "graphs",
    "interactive",
    "educational technology",
    "e-learning",
    "classroom tools",
    "digital education",
    "teaching platform",
    "docerium",
  ],
  authors: [{ name: "Docerium Team" }],
  creator: "Docerium",
  publisher: "Docerium",
  applicationName: "Docerium",
  category: "Education",
  classification: "Educational Technology",
  metadataBase: new URL("https://docerium.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://docerium.com",
    siteName: "Docerium",
    title: "Docerium - Teaching Made Easy",
    description:
      "The all-in-one educational platform combining interactive whiteboards, notebook functionality, and visual graphs for enhanced teaching and learning experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Docerium - Teaching Made Easy",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@docerium",
    creator: "@docerium",
    title: "Docerium - Teaching Made Easy",
    description:
      "The all-in-one educational platform combining interactive whiteboards, notebook functionality, and visual graphs for enhanced teaching and learning experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://avatars.githubusercontent.com/u/226850329?s=200&v=4",
    shortcut: "https://avatars.githubusercontent.com/u/226850329?s=200&v=4",
    apple: "https://avatars.githubusercontent.com/u/226850329?s=200&v=4",
  },
  manifest: "/manifest.json",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Docerium",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1f2937",
    "theme-color": "#1f2937",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="bg-gray-900 overflow-x-hidden">
        <MainWrapper>{children}</MainWrapper>
        <DockElement />
        <GitHubStars />
      </body>
    </html>
  );
}
