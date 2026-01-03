// Root Layout with Loading Support
import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import MyNav from "@/components/MyNav";

export const metadata = {
  metadataBase: new URL('https://kuberjimandir.com'),
  title: {
    default: "KuberJi Mandir - Pandukeshwar | Ancient Temple of Lord Kuber",
    template: "%s | KuberJi Mandir Pandukeshwar"
  },
  description: "Visit the ancient KuberJi Mandir in Pandukeshwar, Uttarakhand - the winter abode of Lord Kuber, God of Wealth. Book online Aarti, Pooja services & sacred rituals. Experience divine blessings for prosperity and spiritual growth.",
  keywords: ["KuberJi Mandir", "Pandukeshwar Temple", "Lord Kuber", "God of Wealth", "Uttarakhand Temple", "Badrinath", "Hindu Temple", "Aarti Booking", "Online Pooja", "Dharma", "Spiritual Tourism", "कुबेर जी मंदिर", "पांडुकेश्वर"],
  authors: [{ name: "KuberJi Mandir Trust" }],
  creator: "KuberJi Mandir Pandukeshwar",
  publisher: "KuberJi Mandir Trust",
  formatDetection: {
    email: false,
    telephone: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: "https://kuberjimandir.com",
    siteName: "KuberJi Mandir Pandukeshwar",
    title: "KuberJi Mandir - Ancient Temple of Lord Kuber in Pandukeshwar",
    description: "Visit the ancient KuberJi Mandir in Pandukeshwar, Uttarakhand - the winter abode of Lord Kuber, God of Wealth. Book online Aarti & Pooja services.",
    images: [
      {
        url: "/images/kuberji/kuberji1.jpeg",
        width: 1200,
        height: 630,
        alt: "KuberJi Mandir Pandukeshwar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KuberJi Mandir - Ancient Temple of Lord Kuber",
    description: "Visit the ancient KuberJi Mandir in Pandukeshwar, Uttarakhand. Book online Aarti & Pooja services.",
    images: ["/images/kuberji/kuberji1.jpeg"],
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
  alternates: {
    canonical: "https://kuberjimandir.com",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative font-rubik">
        <LanguageProvider>
          <Suspense fallback={<Loading />}>
          <MyNav />
            {children}
          </Suspense>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
