import Link from "next/link";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[var(--gm-color-bg)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4">
          <div>
            <Link className="font-[family-name:var(--font-heading)] text-2xl text-white" href="/admin">
              GlobalMerch Admin
            </Link>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--gm-color-text-muted)]">Signed in as {session.email}</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <Button size="sm" type="submit" variant="secondary">
              Logout
            </Button>
          </form>
        </header>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <AdminSidebar />
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
