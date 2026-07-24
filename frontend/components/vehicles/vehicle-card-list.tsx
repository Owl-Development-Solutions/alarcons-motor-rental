"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import VehicleCard from "@/components/vehicles/vehicle-card";
import { Vehicle } from "@/data/models";
import { getVehiclesByUrl } from "@/data/actions/vehicle";
import { PaginatedResponse } from "@/data/models/paginated.model";
import VehicleCardSkeleton from "./vehicle-card-skeleton";

interface VehicleListProps {
  initialVehicles: PaginatedResponse<Vehicle>;
}

const VehicleList = ({ initialVehicles }: VehicleListProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles.data);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(
    initialVehicles.next_page_url,
  );
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    // Guard: no next page, or already fetching -> do nothing.
    if (!nextPageUrl || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = await getVehiclesByUrl(nextPageUrl);
      setVehicles((prev) => [...prev, ...nextPage.vehicles.data]);
      setNextPageUrl(nextPage.vehicles.next_page_url);
    } catch (error) {
      console.error("Failed to load more vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  }, [nextPageUrl, isLoading]);

  useEffect(() => {
    if (!sentinelRef.current || !nextPageUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "300px" },
    );

    const el = sentinelRef.current;
    observer.observe(el);

    return () => observer.unobserve(el);
  }, [loadMore, nextPageUrl]);

  return (
    <>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <VehicleCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* Only rendered (and only observed) while there's a next page */}
      {nextPageUrl && <div ref={sentinelRef} className="h-1 w-full" />}

      {!nextPageUrl && vehicles.length > 0 && (
        <p className="mt-8 text-center text-sm text-neutral-400">
          You&apos;ve reached the end of the list.
        </p>
      )}
    </>
  );
};

export default VehicleList;
