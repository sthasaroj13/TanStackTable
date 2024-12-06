import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import data from "../Api/data1.json";
import { useState } from "react";

interface User {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "postId",
    header: "PostId",
    enableSorting: true,
  },
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "body",
    header: "Body",
    enableSorting: false,
  },
];

const Prac = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: { pageIndex: 0, pageSize: 4 },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });
  console.log("table", table);
  console.log("setpageIndex", table.getState());

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="px-4 py-2 border rounded bg-slate-100 "
          />
        </div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGrp) => (
              <tr key={headerGrp.id} className=" bg-red-400">
                {headerGrp.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-sm font-medium text-white border-b border-gray-300"
                    //logic to handle sorting
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div>
                      {header.column.getIsSorted() === "asc" && " 🔼"}
                      {header.column.getIsSorted() === "desc" && " 🔽"}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-sm text-gray-800 border-b border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" flex gap-4 mt-2">
          <button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
          >
            prev
          </button>

          <span>
            <strong>
              page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-500"
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Prac;
