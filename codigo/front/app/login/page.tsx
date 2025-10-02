import { Form } from "@/components/ui/form";
import Image from "next/image";
import { redirect } from "next/navigation";
import FormLogin from "./_components/FormLogin";
import Sidebar from "../_components/SideBar";

export default function Login() {
  return (
      <div className="flex flex-col justify-center items-center min-h-screen items-center justify-center bg-gradient-to-r from-[#1E3A5F] to-[#FBBF24]">
        <FormLogin />
      </div>
  );
}
