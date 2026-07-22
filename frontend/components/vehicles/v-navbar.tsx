"use client";

import { useUser } from "@/data/context/user-context";
import { Car, MessageSquare, NotebookPen, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserButton from "../shared/user-button";
import AuthForm from "../auth/auth-form";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

              {/* <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={() => setShowSettingsMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 transition-colors text-left">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div> */}
            </div>
          </nav>

          {/* <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button> */}
        </div>

        {/* Mobile Navigation */}
        {/* {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Car className="w-4 h-4" />
              Booking
            </Link>
            <Link
              href="/feedback"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Link>
            <div className="px-4 py-2">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              {showSettingsMenu && (
                <div className="mt-2 space-y-1 pl-6">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    onClick={() => {
                      setShowSettingsMenu(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors text-left">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>
        )} */}
      </div>
    </header>
  );
};

export default VehicleNavbar;
