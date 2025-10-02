import FormPedido from "./_components/FormPedido";
import TabelaPedidos from "./_components/TabelaPedidos";
import Sidebar from "../_components/SideBar";

export default function PedidosPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start p-8 gap-8">
        <FormPedido />
        <TabelaPedidos />
      </main>
    </div>
  );
}
