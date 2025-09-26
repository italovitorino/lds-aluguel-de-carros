'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

const pedidoSchema = z.object({
  veiculo: z.string().refine(val => val !== "", { message: "Informe um veículo." }),
  data: z.iso.date().nullable().refine(val => typeof val !== "string", { message: "Informe uma data." })
});

export default function FormPedido() {
    const form = useForm<z.infer<typeof pedidoSchema>>({
        mode: 'onTouched',
        resolver: zodResolver(pedidoSchema),
        defaultValues: {
            veiculo: "",
            data: null
        }
    });

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
                  <FormControl>
                    <Input
                      value={String(field.value)}
                      onChange={field.onChange}
                      placeholder="Veículo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data"
              render={({ field }) => (
                <FormItem className="align-baseline w-full">
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
