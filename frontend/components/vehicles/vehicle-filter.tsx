"use client";

import { Car, Filter, Bike, Search, Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const VehicleFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentType = searchParams.get("vehicle_type") ?? "all";
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Debounce the search box. Typing a search term resets the URL to
  // just `?search=...`, clearing any other active filters (e.g. vehicle_type).
  useEffect(() => {
    const handle = setTimeout(() => {
      const current = searchParams.get("search") ?? "";
      if (search === current) return;

      startTransition(() => {
        if (!search) {
          router.push(pathname);
          return;
        }

        const params = new URLSearchParams();
        params.set("search", search);
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400);

    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleTypeClick = (type: "all" | "car" | "motorcycle") => {
    updateParams({ vehicle_type: type === "all" ? null : type });
  };

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-35">
        {isPending ? (
          <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-orange-500 md:h-5 md:w-5" />
        ) : (
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 md:h-5 md:w-5" />
        )}
        <Input
          type="text"
          placeholder="Search make, model, type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 text-sm md:text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Filter Buttons */}
      <div
        className={cn(
          "flex shrink-0 gap-1 md:gap-2 transition-opacity",
          isPending && "pointer-events-none opacity-60",
        )}
      >
        <Button
          variant="outline"
          className={cn(
            currentType === "all" &&
              "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white  rounded-lg transition-all shadow-lg hover:shadow-xl",
          )}
          onClick={() => handleTypeClick("all")}
        >
          <Filter className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">All</span>
        </Button>

        <Button
          variant="outline"
          className={cn(
            currentType === "car" &&
              "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white  rounded-lg transition-all shadow-lg hover:shadow-xl",
          )}
          onClick={() => handleTypeClick("car")}
        >
          <Car className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Cars</span>
        </Button>

        <Button
          variant="outline"
          className={cn(
            currentType === "motorcycle" &&
              "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white  rounded-lg transition-all shadow-lg hover:shadow-xl",
          )}
          onClick={() => handleTypeClick("motorcycle")}
        >
          <Bike className="w-3 h-3 md:w-4 md:h-4" />
          <span className="hidden sm:inline">Motorcycles</span>
        </Button>
      </div>
    </div>
  );
};

export default VehicleFilter;
