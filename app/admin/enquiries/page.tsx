import { updateEnquiryStatusAction } from "@/app/admin/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ENQUIRY_STATUSES } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export default async function AdminEnquiriesPage() {
  const enquiries = await db.enquiry.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white">Enquiries</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.map((enquiry) => (
            <TableRow key={enquiry.id}>
              <TableCell>{formatDate(enquiry.createdAt)}</TableCell>
              <TableCell>
                {enquiry.type}
                {enquiry.product ? ` (${enquiry.product.title})` : ""}
              </TableCell>
              <TableCell>
                {enquiry.name}
                <br />
                <span className="text-xs text-[var(--gm-color-text-muted)]">{enquiry.email}</span>
              </TableCell>
              <TableCell className="max-w-sm text-xs text-[var(--gm-color-text-muted)]">{enquiry.message}</TableCell>
              <TableCell>
                <form action={updateEnquiryStatusAction} className="flex gap-2">
                  <input name="id" type="hidden" value={enquiry.id} />
                  <select
                    className="h-9 rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-bg)] px-2 text-xs"
                    defaultValue={enquiry.status}
                    name="status"
                  >
                    {ENQUIRY_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button className="text-xs text-[var(--gm-color-gold)]" type="submit">
                    Save
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
