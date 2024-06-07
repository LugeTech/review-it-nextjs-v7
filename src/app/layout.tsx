import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { dark as clerkDark } from "@clerk/themes";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./util/QueryProvider";
import JotaiProvider from "./util/JotaiProvider";
import type { Metadata, Viewport } from "next";

const APP_NAME = "Review It";
const APP_DEFAULT_TITLE = "Review It";
const APP_TITLE_TEMPLATE = "%s - Review It";
const APP_DESCRIPTION =
  "Review It is a website where you can share and read reviews on anything. It is easy, fun, and free to use.";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
// export const metadata = {
//   title: "Review It",
//   description:
//     "Review It is a website where you can share and read reviews on anything. It is easy, fun, and free to use.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JotaiProvider>
      <ClerkProvider>
        <QueryProvider>
          <html
            className="bg-myTheme-lightbg dark:bg-myTheme-niceBlack"
            lang="en"
          >
            <head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
            </head>
            <body
              className={`${poppins.className} bg-myTheme-lightbg dark:bg-myTheme-niceBlack `}
            >
              <Navbar>{children}</Navbar>
              <Analytics />
            </body>
          </html>
        </QueryProvider>
      </ClerkProvider>
    </JotaiProvider>
  );
}
