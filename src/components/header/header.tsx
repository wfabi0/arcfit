import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Planos", href: "/#planos" },
  { name: "Sobre", href: "/#sobre" },
  { name: "Vantagens", href: "/#vantagens" },
] as const;

export default function Header() {
  return (
    <header className="bg-black/20 w-full px-6 py-10 lg:px-10 border-1 border-b-zinc-800">
      {/* Mobile */}
      <div className="flex md:hidden flex-row justify-between items-center">
        <div className="flex items-center">
          <Link
            href={"/"}
            className="hover:transition hover:scale-105 duration-150"
          >
            <Image
              src={"/logo-arcfit-2.png"}
              alt="Logo"
              width={180}
              height={40}
            />
          </Link>
        </div>
        <div className="flex">
          <MobileMenu navigation={navigation} />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-row justify-between items-center">
        <div className="flex items-center">
          <Link
            href={"/"}
            className="hover:transition hover:scale-105 duration-150"
          >
            <Image
              src={"/logo-arcfit-2.png"}
              alt="Logo"
              width={292 - 80}
              height={61 - 10}
            />
          </Link>
        </div>
        <div
          className={`flex-row grid grid-cols-4 md:gap-6 lg:gap-10 xl:gap-12 text-xl text-white font-semibold`}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition hover:text-teal-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button className="bg-teal-700 hover:cursor-pointer hover:bg-teal-600 transition duration-200 px-10 py-5 text-xl font-thin text-white">
          FAÇA SUA MATRÍCULA
        </Button>
      </div>
    </header>
  );
}
