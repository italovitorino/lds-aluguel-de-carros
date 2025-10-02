'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface AutomovelResponseDTO {
  id: number
  matricula: string
  ano: number
  modelo: string
  placa: string
  valorDiaria: number
  status: string
}

const pedidoSchema = z.object({
  veiculo: z.string().refine(val => val !== "", { message: "Informe um veículo." }),
  inicio: z.string().nullable(),
  termino: z.string().nullable(),
  comCredito: z.boolean()
});

export default function FormPedido() {
    const form = useForm<z.infer<typeof pedidoSchema>>({
        mode: 'onTouched',
        resolver: zodResolver(pedidoSchema),
        defaultValues: {
            veiculo: "",
            inicio: null,
            termino: null,
            comCredito: false,
        }
    });

    const { data: veiculos } = useQuery<AutomovelResponseDTO[]>({
        queryKey: ['automoveis'],
        queryFn: async () => {
            const response = await api.get('http://localhost:8080/api/automoveis');
            return response.data; 
        },
    })

    const queryClient = useQueryClient()

    const handleSubmit = async () => {
      const data = form.getValues();
      const usuarioId = localStorage.getItem('usuarioId')
      await api.post('http://localhost:8080/api/pedidos',
        {
          idCliente: usuarioId,
          idAutomovel: data.veiculo,
          inicio: data.inicio ? `${data.inicio}T00:00:00` : null,
          termino: data.termino ? `${data.termino}T00:00:00` : null,
          credito: data.comCredito
        }
      ).then((response) => {
        if(response.status === 200){
          queryClient.invalidateQueries({ queryKey: ['pedidos'] })
          form.reset()
        } 
      });
    }

  return (
    <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col justify-center items-center gap-y-6 w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl"
          >
            <h1 className="font-bold text-3xl text-[#1E3A5F]">Novo Pedido</h1>
            <FormField
              control={form.control}
              name="veiculo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#1E3A5F] font-semibold">Veículo</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="rounded-xl border-[#1E3A5F] focus:ring-[#FBBF24]">
                        <SelectValue placeholder="Selecione um veículo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {veiculos?.map((veiculo) => (
                            <SelectItem key={veiculo.id} value={veiculo.id.toString()}>
                              {veiculo.modelo} - {veiculo.placa} - R$ {veiculo.valorDiaria}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inicio"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#1E3A5F] font-semibold">Data de início</FormLabel>
                  <FormControl>
                    <Input
                      value={String(field.value)}
                      onChange={field.onChange}
                      type="date"
                      placeholder="Data de início"
                      className="rounded-xl border-[#1E3A5F] focus:ring-[#FBBF24]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termino"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-[#1E3A5F] font-semibold">Data de término</FormLabel>
                  <FormControl>
                    <Input
                      value={String(field.value)}
                      onChange={field.onChange}
                      type="date"
                      placeholder="Data de término"
                      className="rounded-xl border-[#1E3A5F] focus:ring-[#FBBF24]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comCredito"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 rounded-md p-4 bg-gray-50 w-full border border-gray-200">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-[#1E3A5F] data-[state=checked]:bg-[#1E3A5F] data-[state=checked]:text-[#FBBF24]"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-[#1E3A5F] font-semibold">Com crédito</FormLabel>
                    <FormMessage className="text-red-500" />
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#1E3A5F] hover:bg-[#16304A] text-[#FBBF24] font-semibold py-2 px-4 rounded-xl shadow-lg"
            >
              Enviar
            </Button>
          </form>
        </Form>
    </>
  );
}
