'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
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
  inicio: z.iso.date().nullable().refine(val => typeof val !== "string", { message: "Informe uma data." }),
  termino: z.iso.date().nullable().refine(val => typeof val !== "string", { message: "Informe uma data." }),
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

    const { data: veiculos, refetch } = useQuery<AutomovelResponseDTO[]>({
            queryKey: ['pedidos'],
            queryFn: async () => {
                const response = await api.get('http://localhost:8080/api/automoveis');
                console.log(response.data)
                return response.data; 
            },
        })

  return (
    <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => console.log(form.getValues()))}
            className="flex flex-col justify-center items-center-safe gap-y-4 w-md"
          >
            <h1 className="font-bold text-2xl">Novo pedido</h1>
            <FormField
              control={form.control}
              name="veiculo"
              render={({ field }) => (
                <FormItem className="align-baseline w-full">
                  <FormLabel>Veículo</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um veículo" />
                      </SelectTrigger>
                      <SelectContent>
                        {veiculos?.map((veiculo) => (
                          <SelectItem key={veiculo.id} value={veiculo.id.toString()}>
                            {veiculo.modelo} - {veiculo.placa}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="inicio"
              render={({ field }) => (
                <FormItem className="align-baseline w-full">
                  <FormLabel>Data de início</FormLabel>
                  <FormControl>
                    <Input
                      value={String(field.value)}
                      onChange={field.onChange}
                      type="date"
                      placeholder="Data de início"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termino"
              render={({ field }) => (
                <FormItem className="align-baseline w-full">
                  <FormLabel>Data de início</FormLabel>
                  <FormControl>
                    <Input
                      value={String(field.value)}
                      onChange={field.onChange}
                      type="date"
                      placeholder="Data"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comCredito"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Com crédito</FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-min text-accent"
            >
              Enviar
            </Button>
          </form>
        </Form>
    </>
  );
}
