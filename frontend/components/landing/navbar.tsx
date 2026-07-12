"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact Us",
    href: "#contact",
  },
  {
    label: "Concern",
    href: "#concern",
  },
  {
    label: "Vehicles",
    href: "/vehicles",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-orange-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group "
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src="/car1.jpg"
                alt="JE Cebu Tours Logo"
                width={50}
                height={50}
                className="rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                JE Cebu Tours
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex">
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollTo(link.href)}
                      className=" cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                    >
                      {link.label}
                    </button>
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
            <button className="ml-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
              Sign Up
            </button>
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
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("#") ? (
                        <button
                          onClick={() => scrollTo(link.href)}
                          className=" cursor-pointer text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                        >
                          {link.label}
                        </button>
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
                <button className="ml-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                  Sign Up
                </button>
                <SheetDescription></SheetDescription>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
