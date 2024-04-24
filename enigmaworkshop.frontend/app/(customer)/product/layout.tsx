export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-screen flex-grow px-6 pt-16">{children}</main>;
}
