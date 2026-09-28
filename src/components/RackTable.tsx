import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { AppIcon } from "@/components/ProjectIcon";
import { StatusDot } from "@/components/Rows";
import { site, type System } from "@/content/site";
import { cn } from "@/lib/utils";

type Row = System;

/**
 * Sortable index of the rack, built directly on TanStack Table v8 core.
 *
 * SpaceUI's `data-grid` ships only a context provider — its nine table
 * sub-parts are separate registry items whose props are undocumented, so
 * composing them blind was a worse bet than ~50 lines of controlled markup
 * that matches the hairline layout exactly.
 */
export function RackTable({ onOpen }: { onOpen: (slug: string) => void }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => site.systems as readonly Row[], []);

  const columns = useMemo<ColumnDef<Row, unknown>[]>(
    () => [
      {
        id: "system",
        header: "system",
        accessorFn: (r) => r.codename,
        cell: ({ row }) => (
          <span className="flex items-center gap-2">
            <AppIcon slug={row.original.slug} size="sm" />
            <span className="truncate font-semibold">{row.original.codename}</span>
          </span>
        ),
      },
      {
        id: "role",
        header: "role",
        accessorFn: (r) => r.role,
        cell: ({ getValue }) => <span className="mono text-xs uppercase o-2">{getValue<string>()}</span>,
      },
      {
        id: "language",
        header: "language",
        accessorFn: (r) => r.language,
        cell: ({ getValue }) => <span className="mono text-xs uppercase">{getValue<string>()}</span>,
      },
      {
        id: "status",
        header: "status",
        accessorFn: (r) => r.status,
        cell: ({ getValue }) => (
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <StatusDot status={getValue<Row["status"]>()} />
            <span className="text-xs">{getValue<string>()}</span>
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: data as Row[],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] border-collapse text-left">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id} className="border-y">
              {hg.headers.map((h) => {
                const dir = h.column.getIsSorted();
                return (
                  <th
                    key={h.id}
                    scope="col"
                    className="px-2 py-2 font-normal first:pl-0 last:pr-0"
                  >
                    <button
                      type="button"
                      onClick={h.column.getToggleSortingHandler()}
                      className="mono flex cursor-pointer items-center gap-1 text-[0.625rem] tracking-[0.14em] o-3 uppercase transition-colors hover:o-1"
                    >
                      {h.column.columnDef.header as string}
                      {dir === "asc" && <ArrowUp className="size-3 text-chroma" />}
                      {dir === "desc" && <ArrowDown className="size-3 text-chroma" />}
                    </button>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onOpen(row.original.slug)}
              className={cn(
                "cursor-pointer border-b transition-colors last:border-b-0 hover:bg-accent/40",
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-2 text-sm first:pl-0 last:pr-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
