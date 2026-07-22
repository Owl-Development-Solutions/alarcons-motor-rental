"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Booking } from "@/data/models";
import {
  formatCurrency,
  formatDateTime,
  getPageRange,
  PAGE_SIZE,
} from "@/lib/utils";
import { Badge } from "../ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { BOOKING_STATUS_BADGE_VARIANT } from "@/lib/booking.status";

const BookingTable = ({ bookings }: { bookings: Booking[] }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(bookings.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return bookings.slice(start, start + PAGE_SIZE);
  }, [bookings, page]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* error here */}

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Pick-up</TableHead>
                <TableHead>Drop-off</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                {/* <TableHead className="text-right">Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((booking) => {
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">
                      {booking.vehicle
                        ? `${booking.vehicle.make} ${booking.vehicle.model} (${booking.vehicle.year})`
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(booking.pickup_datetime).dateTime}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(booking.dropoff_datetime).dateTime}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(booking.total_amount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={BOOKING_STATUS_BADGE_VARIANT[booking.status]}
                        className="capitalize"
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={
                    page === 1 ? "pointer-events-none opacity-50" : undefined
                  }
                />
              </PaginationItem>

              {getPageRange(page, totalPages).map((item, i) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

export default BookingTable;
