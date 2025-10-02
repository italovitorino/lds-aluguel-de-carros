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
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.original.status === "ATIVO"
              ? "bg-green-100 text-green-800"
              : row.original.status === "CANCELADO"
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "automovel.modelo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modelo
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize font-medium text-gray-800">
          {row.original.automovel.modelo}
        </div>
      ),
    },
    {
      accessorKey: "automovel.placa",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Placa
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="uppercase tracking-wide text-gray-700">
          {row.original.automovel.placa}
        </div>
      ),
    },
    {
      accessorKey: "inicio",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Início
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const dataInicio = row.original.inicio
          ? format(new Date(row.original.inicio), "dd/MM/yyyy HH:mm")
          : "";
        return <div className="text-gray-600">{dataInicio}</div>;
      },
    },
    {
      accessorKey: "termino",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Término
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const dataTermino = row.original.termino
          ? format(new Date(row.original.termino), "dd/MM/yyyy HH:mm")
          : "";
        return <div className="text-gray-600">{dataTermino}</div>;
      },
    },
    {
      accessorKey: "credito",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Crédito
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.original.credito
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {row.original.credito ? "Sim" : "Não"}
        </span>
      ),
    },
    {
      accessorKey: "precoTotal",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Preço Total
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-gray-800">
          {`R$ ${row.original.precoTotal}`}
        </div>
      ),
    },
    {
      accessorKey: "realizadoEm",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Realizado Em
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const dataRealizadoEm = row.original.realizadoEm
          ? format(new Date(row.original.realizadoEm), "dd/MM/yyyy HH:mm")
          : "";
        return <div className="text-gray-600">{dataRealizadoEm}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
              >
                <BsThreeDots className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-lg shadow-lg border bg-white"
            >
              <DropdownMenuItem
                className="text-red-600 hover:text-red-700 cursor-pointer"
                onClick={async (e) => {
                  e.stopPropagation();
                  await api
                    .put(`api/pedidos/cancelar/${row.original.id}`)
                    .then(() => refetch());
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
    <div className="w-full max-w-6xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Meus Pedidos</h2>
      <DataTable
        columnDef={columns}
        data={data || []}
        onClickRow={() => {}}
      />
    </div>
  );
}
