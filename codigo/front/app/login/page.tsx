import { Form } from "@/components/ui/form";
import Image from "next/image";
import { redirect } from "next/navigation";
import FormLogin from "./_components/FormLogin";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
        <FormLogin/>
    </div>
  );
}
