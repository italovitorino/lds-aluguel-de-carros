'use client'
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from '@tanstack/react-query'
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/data-tables";
import api from "@/lib/axios";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "codigo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="!p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Código
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.codigo}</div>
    ),
  },
]

export default function TabelaPedidos() {

    const { data, refetch } = useQuery<any[]>({
        queryKey: ['pedidos'],
        queryFn: async () => {
            const response = await api.get('api/pedidos');
            return response.data; 
        },
    })

  return (
    <div className="w-3xl">
        <DataTable
            columnDef={columns}
            data={[]}
            onClickRow={() => {}}
        />
    </div>
  );
}
