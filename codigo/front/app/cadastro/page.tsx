"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

// schema de validação
const cadastroSchema = z
    .object({
        nome: z.string().min(3, "Informe um nome válido.").max(100),
        endereco: z.string().min(5, "Informe um endereço válido.").max(300),
        rg: z.string().min(2).max(14, "RG inválido"),
        cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
        email: z.string().email("Informe um e-mail válido."),
        senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
        confirmarSenha: z.string(),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
        message: "As senhas não coincidem.",
        path: ["confirmarSenha"],
    });

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function FormCadastro() {
    const router = useRouter();
    const form = useForm<CadastroForm>({
        mode: "onBlur",
        resolver: zodResolver(cadastroSchema),
        defaultValues: {
            nome: "",
            endereco: "",
            rg: "",
            cpf: "",
            email: "",
            senha: "",
            confirmarSenha: "",
        },
    });

    const handleSubmit = async () => {
        const { confirmarSenha, ...data } = form.getValues(); // tira o confirmarSenha antes do envio
        try {
            const response = await api.post("http://localhost:8080/api/clientes", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 201 || response.status === 200) {
                alert("Cadastro realizado com sucesso!");
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao realizar cadastro.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1E3A5F] to-[#FBBF24]">
            <div className="bg-white rounded-2xl shadow-2xl p-10 w-[500px] flex flex-col items-center">
                <Image src="/logo.png" alt="Logo" width={120} height={120} />
                <h1 className="font-bold text-3xl text-[#1E3A5F] mt-6">Cadastro de Cliente</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col justify-center items-center gap-y-6 w-full mt-6"
                    >
                        {/* Nome */}
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} placeholder="Nome completo" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* Endereço */}
                        <FormField
                            control={form.control}
                            name="endereco"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} placeholder="Endereço" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* RG */}
                        <FormField
                            control={form.control}
                            name="rg"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} placeholder="RG" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* CPF */}
                        <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} placeholder="CPF" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="E-mail" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* Senha */}
                        <FormField
                            control={form.control}
                            name="senha"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Senha" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                        {/* Confirmar Senha */}
                        <FormField
                            control={form.control}
                            name="confirmarSenha"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Confirmar senha" className="rounded-xl border-[#1E3A5F]" />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-[#1E3A5F] hover:bg-[#16304A] text-[#FBBF24] font-semibold py-2 px-4 rounded-xl shadow-lg"
                        >
                            Cadastrar
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
