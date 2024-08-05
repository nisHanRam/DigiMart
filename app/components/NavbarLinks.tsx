"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const navbarLinks = [
  { id: 0, name: "Home", href: "/" },
  { id: 1, name: "Templates", href: "/products/template" },
  { id: 2, name: "UI Kits", href: "/products/uiKit" },
  { id: 3, name: "Icons", href: "/products/icon" },
];

const NavbarLinks = () => {
  const location = usePathname();

  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group flex items-center p-2 font-medium rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
