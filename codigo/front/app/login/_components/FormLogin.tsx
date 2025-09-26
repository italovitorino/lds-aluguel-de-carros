'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  login: z.string().refine(val => val !== "", { message: "Informe um login válido." }),
  senha: z.string().refine(val => val !== "", { message: "Informe uma senha." })
});

export default function FormLogin() {

    const router = useRouter()
    const form = useForm<z.infer<typeof loginSchema>>({
        mode: 'onBlur',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            senha: ""
        }
    });

    const handleSubmit = async () => {
        const data = form.getValues() 
        console.log(data)
        await api.post("http://localhost:8080/api/login", 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        ).then((respose) => {
            console.log(respose)
            if(respose.status == 200){
                console.log(respose.data)
                localStorage.setItem("usuarioId", respose.data)
                router.push("/pedidos")
            }
        })
    }

    return (
        <>
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col justify-center items-center-safe gap-y-4 w-md"
            >
                <h1 className="font-bold text-2xl">Bem-Vindo</h1>
                <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                    <FormItem className="align-baseline w-full">
                    <FormControl>
                        <Input
                        value={String(field.value)}
                        onChange={field.onChange}
                        placeholder="Login"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="senha"
                render={({ field }) => (
                    <FormItem className="align-baseline w-full">
                    <FormControl>
                        <Input
                        value={String(field.value)}
                        onChange={field.onChange}
                        type="password"
                        placeholder="Senha"
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
                Login
                </Button>
            </form>
            </Form>
        </>
    );
}
