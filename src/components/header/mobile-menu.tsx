"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu
          size={26}
          className={`transition-transform duration-150 ${
            isOpen ? "rotate-90" : "duration-500 rotate-0"
          }`}
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center font-thin text-lg">
            MENU
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-1 space-y-6 px-4 font-thin">
          <Link href={"/"} className="transition hover:text-teal-500">
            Início
          </Link>
          <Link href={"/#planos"} className="transition hover:text-teal-500">
            Planos
          </Link>
          <Link href={"/#sobre"} className="transition hover:text-teal-500">
            Sobre
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
