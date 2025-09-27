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

interface MobileMenuProps {
  navigation: readonly { name: string; href: string }[];
}

export default function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.substring(2);
      setIsOpen(false);

      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

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
          {navigation.map((item) => (
            <Link
              key={item.name}
              onClick={(e) => handleLinkClick(item.href, e)}
              href={item.href}
              className="transition hover:text-teal-500"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
