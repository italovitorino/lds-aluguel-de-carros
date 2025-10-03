"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Package, LogOut } from "lucide-react";

const menuItems = [
  { name: "Pedidos", href: "/pedidos", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "group relative flex flex-col items-center bg-[#1E3A5F] text-white shadow-2xl transition-all duration-300 w-20 hover:w-64"
      )}
    >
      {/* Logo */}
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

      {/* Menu principal */}
      <nav className="flex flex-col gap-2 mt-8 w-full px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#FBBF24] text-[#1E3A5F]"
                  : "hover:bg-[#FBBF24]/80 hover:text-[#1E3A5F]"
              )}
            >
              {/* Ícone sempre visível */}
              <Icon className="h-5 w-5 shrink-0" />

              {/* Texto aparece só com hover na sidebar */}
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Botão de sair */}
      <div className="mt-auto mb-6 w-full px-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-lg px-2 py-2 text-sm font-medium transition-colors hover:bg-[#FBBF24]/80 hover:text-[#1E3A5F]"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
}
