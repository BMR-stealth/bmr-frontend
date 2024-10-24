"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Icons } from "./icons"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  typeOf?: string // Add typeOf property
}

export function DataTable<TData, TValue>({ columns, data, typeOf }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns: typeOf === "action-table" ? [...columns, {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button  className="px-1 py-0.5 bg-blue-800 text-white " onClick={() => handlePlaceBid(row.original)}>
          <Icons.gem className="mr-1 h-[5px] w-[5px] text-white" />
          Use Guaranteed Bid
        </Button>
      ),
    }] : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const handlePlaceBid = (data: TData) => {
    console.log("Placing bid for:", data)
    // Implement your bid logic here
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
