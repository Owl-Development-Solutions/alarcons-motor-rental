"use client";

import { useUser } from "@/data/context/user-context";
import { Car, Menu, MessageSquare, NotebookPen, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserButton from "../shared/user-button";
import AuthForm from "../auth/auth-form";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

const navItems = [
  {
    label: "Home",
    href: "/",
    match: ["/"],
  },
  {
    label: "Bookings",
    href: "/booking",
    match: ["/booking"],
    icon: NotebookPen,
  },
  {
    label: "Vehicles",
    href: "/vehicles",
    match: ["/vehicles", "/vehicle"],
    icon: Car,
  },
];
const VehicleNavbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const pathName = usePathname();

  const isActive = (matches: string[]) =>
    matches.some((path) =>
      path === "/" ? pathName === "/" : pathName.startsWith(path),
    );

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/car1.jpg"
              alt="JE Cebu Tours Logo"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
              JE Cebu Tours
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ label, href, match, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-medium transition-colors flex items-center gap-2",
                  isActive(match)
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400",
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </Link>
            ))}
            <div className="relative">
              {user ? (
                <>
                  <UserButton user={user} />
                </>
              ) : (
                <>
                  <AuthForm type="Login" onOpenChange={setOpen} open={open} />
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
            <Sheet>
              <SheetTrigger className="align-middle">
                <Menu />
              </SheetTrigger>
              <SheetContent className="flex flex-col items-start p-6 bg-gray-100 dark:bg-gray-900 ">
                <SheetTitle>Menu</SheetTitle>
                <ul className="flex flex-col gap-4">
                  {navItems.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("#") ? (
                        <Button
                          onClick={() => scrollTo()}
                          className=" cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                        >
                          {link.label}
                        </Button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
                {user ? (
                  <>
                    <UserButton user={user} />
                  </>
                ) : (
                  <>
                    <AuthForm type="Login" onOpenChange={setOpen} open={open} />
                  </>
                )}
                <SheetDescription></SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VehicleNavbar;
