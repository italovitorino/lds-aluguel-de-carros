'use client'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from '@tanstack/react-query';
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/data-tables";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";
import { format } from "date-fns";
import { BsThreeDots } from "react-icons/bs";

export default function TabelaPedidos() {
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("usuarioId");
    setUsuarioId(id);
  }, []);

  const { data, refetch } = useQuery<any[]>({
    queryKey: ['pedidos'],
    queryFn: async () => {
      if (!usuarioId) return [];
      const response = await api.get(
        `http://localhost:8080/api/pedidos/cliente/${usuarioId}`
      );
      return response.data;
    },
    enabled: !!usuarioId,
  });

  const columns: ColumnDef<any>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.original.status}</div>,
  },
  {
    accessorKey: "automovel.modelo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modelo
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.automovel.modelo}</div>
    ),
  },
  {
    accessorKey: "automovel.placa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Placa
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase">{row.original.automovel.placa}</div>
    ),
  },
  {
    accessorKey: "inicio",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Início
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const dataInicio = row.original.inicio
        ? format(new Date(row.original.inicio), "dd/MM/yyyy HH:mm")
        : "";
      return <div className="uppercase">{dataInicio}</div>;
    },
  },
  {
    accessorKey: "termino",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Término
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const dataTermino = row.original.termino
        ? format(new Date(row.original.termino), "dd/MM/yyyy HH:mm")
        : "";
      return <div className="uppercase">{dataTermino}</div>;
    },
  },
  {
    accessorKey: "credito",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Crédito
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.original.credito ? "Sim" : "Não"}</div>
    ),
  },
  {
    accessorKey: "precoTotal",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Preço Total
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase">{`R$ ${row.original.precoTotal}`}</div>
    ),
  },
  {
    accessorKey: "realizadoEm",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Realizado Em
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const dataRealizadoEm = row.original.realizadoEm
        ? format(new Date(row.original.realizadoEm), "dd/MM/yyyy HH:mm")
        : "";
      return <div className="uppercase">{dataRealizadoEm}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 !p-2">
              <BsThreeDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                await api.put(`api/pedidos/cancelar/${row.original.id}`).then(() => refetch());
              }}
            >
              Cancelar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

  return (
    <div className="w-3xl">
      <DataTable
        columnDef={columns}
        data={data || []}
        onClickRow={() => {}}
      />
    </div>
  );
}
