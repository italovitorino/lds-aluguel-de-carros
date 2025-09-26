import FormPedido from "./_components/FormPedido";
import TabelaPedidos from "./_components/TabelaPedidos";

export default function Login() {
  return (
    <div className="flex justify-evenly items-center">
        <FormPedido />
        <TabelaPedidos />
    </div>
  );
}
