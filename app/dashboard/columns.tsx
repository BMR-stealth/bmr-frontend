"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type TableData = {
  id: string
  column1: string
  column2: string
  column3: string
  column4: string
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "column1",
    header: "Column 1",
  },
  {
    accessorKey: "column2",
    header: "Column 2",
  },
  {
    accessorKey: "column3",
    header: "Column 3",
  },
  {
    accessorKey: "column4",
    header: "Column 4",
  },
  {
    id: "actions",
    header: "Actions",
    cell:() => (
      <Button>
        Use Guaranteed Bid Credit
      </Button>
    ),
  },
]
