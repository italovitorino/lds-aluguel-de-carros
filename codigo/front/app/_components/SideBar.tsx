"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Pedidos", href: "/pedidos" },
    { name: "Clientes", href: "/clientes" },
    { name: "Veículos", href: "/veiculos" },
    { name: "Relatórios", href: "/relatorios" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "group relative flex flex-col items-center bg-[#1E3A5F] text-white shadow-2xl transition-all duration-300 w-20 hover:w-64"
            )}
        >
            <div className="flex flex-col items-center py-6 w-full">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="transition-all duration-300 group-hover:w-20 group-hover:h-20"
                />
                <h2 className="mt-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Car Rental
                </h2>
            </div>
            <nav className="flex flex-col gap-4 mt-10 w-full px-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === item.href
                                ? "bg-[#FBBF24] text-[#1E3A5F]"
                                : "hover:bg-[#FBBF24] hover:text-[#1E3A5F]"
                        )}
                    >
                        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
