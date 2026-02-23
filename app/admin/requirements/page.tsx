import { updateRequirementStatusAction } from "@/app/admin/actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { REQUIREMENT_STATUSES } from "@/lib/constants";
import { db } from "@/lib/db";
import { formatDate, parseJsonArray } from "@/lib/utils";

export default async function AdminRequirementsPage() {
  const requirements = await db.requirementRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4 rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4">
      <h1 className="font-[family-name:var(--font-heading)] text-3xl text-white">Requirement Requests</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Buyer</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requirements.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>
                <div className="font-medium text-white">{item.productName}</div>
                <div className="text-xs text-[var(--gm-color-text-muted)]">{item.targetCountry}</div>
              </TableCell>
              <TableCell>
                {item.quantity} {item.unit}
              </TableCell>
              <TableCell>
                {item.name}
                <br />
                <span className="text-xs text-[var(--gm-color-text-muted)]">{item.email}</span>
              </TableCell>
              <TableCell>
                <form action={updateRequirementStatusAction} className="space-y-1">
                  <input name="id" type="hidden" value={item.id} />
                  <select
                    className="h-9 rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-bg)] px-2 text-xs"
                    defaultValue={item.status}
                    name="status"
                  >
                    {REQUIREMENT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button className="block text-xs text-[var(--gm-color-gold)]" type="submit">
                    Save
                  </button>
                </form>
                {parseJsonArray(item.attachments).length ? (
                  <a
                    className="mt-1 block text-xs text-[var(--gm-color-text-muted)] underline"
                    href={parseJsonArray(item.attachments)[0]}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View attachment
                  </a>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
