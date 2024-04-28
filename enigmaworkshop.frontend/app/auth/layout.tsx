import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Viewport, Metadata } from "next";
import { ThemeProvider } from "@/components/themesprovider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo.png",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <main className="h-screen w-screen">{children}</main>
      </body>
    </html>
  );
}
