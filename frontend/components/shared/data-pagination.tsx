"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface DataPaginationProps {
  /** e.g. res.vehicles.current_page / res.users.current_page / res.bookings.current_page */
  currentPage: number;
  /** e.g. res.vehicles.last_page */
  lastPage: number;
  /** Name of the query param to use for the page number. Defaults to "page". */
  paramName?: string;
}

/**
 * Generic, reusable pagination that reads/writes a page number in the URL
 * (default `?page=`), while preserving every other existing query param
 * (search, vehicle_type, status, etc). Works with any Laravel paginator
 * response shape since it only needs current_page + last_page.
 *
 * Usage:
 *   <DataPagination
 *     currentPage={res.vehicles.current_page}
 *     lastPage={res.vehicles.last_page}
 *   />
 */
const DataPagination = ({
  currentPage,
  lastPage,
  paramName = "page",
}: DataPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (lastPage <= 1) return null;

  const goToPage = (page: number) => {
    if (page < 1 || page > lastPage || page === currentPage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, String(page));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Builds e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 20]
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const delta = 1;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(lastPage - 1, currentPage + delta);
    const pages: (number | "ellipsis")[] = [1];

    if (left > 2) pages.push("ellipsis");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < lastPage - 1) pages.push("ellipsis");
    if (lastPage > 1) pages.push(lastPage);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <Pagination className={cn(isPending && "pointer-events-none opacity-60")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage - 1);
            }}
            className={cn(currentPage <= 1 && "pointer-events-none opacity-50")}
          />
        </PaginationItem>

        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage + 1);
            }}
            className={cn(
              currentPage >= lastPage && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default DataPagination;
