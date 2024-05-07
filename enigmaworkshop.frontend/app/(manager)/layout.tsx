import { AdminNav } from "@/components/admin-nav";
import { ThemeProvider } from "@/components/themesprovider";
import { fontSans } from "@/config/fonts";
import clsx from "clsx";
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AdminSidebar } from "@/components/admin-sidebar";

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
export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AdminNav />
          <div className="flex flex-row">
            <AdminSidebar />
            <main className="grow pt-16">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
