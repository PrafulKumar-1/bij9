import Link from "next/link";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/requirements", label: "Requirements" },
  { href: "/admin/import", label: "CSV Import" },
];

export function AdminSidebar() {
  return (
    <aside className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4">
      <h2 className="mb-3 text-xs uppercase tracking-[0.24em] text-[var(--gm-color-gold)]">Admin Panel</h2>
      <nav className="space-y-1">
        {links.map((item) => (
          <Link
            className="block rounded-md px-3 py-2 text-sm text-[var(--gm-color-text-muted)] transition-colors hover:bg-white/5 hover:text-white"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
