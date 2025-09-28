import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - ArcFit",
  description: "Painel administrativo da ArcFit",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
