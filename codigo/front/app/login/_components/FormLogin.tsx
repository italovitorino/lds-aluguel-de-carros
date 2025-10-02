'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
        await api.post("http://localhost:8080/api/login", 
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        ).then((respose) => {
            if(respose.status == 200){
                localStorage.setItem("usuarioId", respose.data)
                router.push("/pedidos")
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-[400px] flex flex-col items-center">
                <Image src="/logo.png" alt="Logo" width={120} height={120} />
                <h1 className="font-bold text-3xl text-[#1E3A5F] mt-6">Bem-Vindo</h1>
                <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col justify-center items-center gap-y-6 w-full mt-6"
                >
                    <FormField
                    control={form.control}
                    name="login"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl>
                            <Input
                            value={String(field.value)}
                            onChange={field.onChange}
                            placeholder="Login"
                            className="rounded-xl border-[#1E3A5F] focus:ring-[#FBBF24]"
                            />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                        <FormItem className="w-full">
                        <FormControl>
                            <Input
                            value={String(field.value)}
                            onChange={field.onChange}
                            type="password"
                            placeholder="Senha"
                            className="rounded-xl border-[#1E3A5F] focus:ring-[#FBBF24]"
                            />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                        </FormItem>
                    )}
                    />
                    <Button
                    type="submit"
                    className="w-full bg-[#1E3A5F] hover:bg-[#16304A] text-[#FBBF24] font-semibold py-2 px-4 rounded-xl shadow-lg"
                    >
                    Login
                    </Button>
                </form>
                </Form>
            </div>
        </div>
    );
}
