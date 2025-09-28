import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        <div className="flex flex-col">
          <Link href="/" className="mb-4">
            <Image
              src="/logo-arcfit-2.png"
              alt="ArcFit Logo"
              width={140}
              height={40}
              className="object-contain"
            />
          </Link>
          <p className="text-gray-400">
            Sua jornada para uma vida mais saudável começa aqui. Equipamentos de
            ponta e profissionais qualificados.
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <p className="text-gray-400">Rua da Academia, 123</p>
          <p className="text-gray-400">Cidade, Estado</p>
          <p className="text-gray-400">(00) 99999-9999</p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">
            Horário de Funcionamento
          </h3>
          <p className="text-gray-400">Seg - Sex: 6h - 22h</p>
          <p className="text-gray-400">Sáb: 8h - 18h</p>
          <p className="text-gray-400">Dom: 8h - 12h</p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram size={24} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter size={24} />
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center text-muted-foreground mt-8 border-t border-border pt-6">
        <p>
          &copy; {new Date().getFullYear()} ArcFit. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
