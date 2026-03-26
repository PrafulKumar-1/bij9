import Link from "next/link";

import { deleteCategoryAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";

type CategoryRow = Awaited<ReturnType<typeof db.category.findMany>>[number];

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const categories: CategoryRow[] = await db.category.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categories</CardTitle>
        <Button asChild size="sm">
          <Link href="/admin/categories/new">Add Category</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="mb-4 rounded-md border border-[var(--gm-color-danger)]/40 bg-[var(--gm-color-danger)]/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: CategoryRow) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category._count.products}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild size="sm" variant="secondary">
                      <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                    </Button>
                    <form action={deleteCategoryAction}>
                      <input name="id" type="hidden" value={category.id} />
                      <Button
                        disabled={category._count.products > 0}
                        size="sm"
                        title={
                          category._count.products > 0
                            ? "Delete products in this category first"
                            : "Delete category"
                        }
                        type="submit"
                        variant="destructive"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
