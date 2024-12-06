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
import data from "./Api/data.json";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id", // Accessor for the 'id' field in the data
    header: "ID",
    enableSorting: true,
  },
  {
    accessorKey: "name", // Accessor for the 'name' field in the data
    header: "Name",
    enableSorting: true,
  },
  {
    accessorKey: "email", // Accessor for the 'email' field in the data
    header: "Email",
    enableSorting: true,
  },
  {
    accessorKey: "phone", // Accessor for the 'phone' field in the data
    header: "Phone",
    enableSorting: true,
  },
];
import Prac from "./pages/Prac";
import { useState } from "react";

const App = () => {
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
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 2,
      },
    },
  });
  // console.log("table", table.getHeaderGroups());

  return (
    <div className="p-8 max-w-[80rem]">
      <Prac /> <br />
      <br /> <br />
      <br />
      <div>
        <input
          type="text"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-4 py-2 border rounded bg-slate-100 "
        />
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          {/*  so getheaderGroup is the object  tanstack table where  it contain array object inside the object there is  headers array object */}

          {table.getHeaderGroups().map((headerGrp) => (
            <tr key={headerGrp.id} className="bg-gray-100">
              {/*  headers array is map here */}
              {headerGrp.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-300"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div>
                    {/*flexReader is import from tanstack table  */}
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
            <tr key={row.id} className="hover:bg-gray-50">
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
      {/* Pagination Controls */}
      <div className="mt-4 flex items-center  justify-end">
        <button
          onClick={() =>
            table.setPageIndex(table.getState().pagination.pageIndex - 1)
          }
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-sm">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() =>
            table.setPageIndex(table.getState().pagination.pageIndex + 1)
          }
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
