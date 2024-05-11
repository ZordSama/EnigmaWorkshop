"use client";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="h-full w-full max-h-screen p-6">{children}</div>
  );
}
