"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function AppShell({
  children,
  contactEmail,
  whatsappNumber,
}: {
  children: React.ReactNode;
  contactEmail: string;
  whatsappNumber: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SiteFooter contactEmail={contactEmail} whatsappNumber={whatsappNumber} />
      </div>
    </>
  );
}
