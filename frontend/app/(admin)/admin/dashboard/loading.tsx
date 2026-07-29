import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 12 }, (_, index) => (
        <Skeleton key={index} className="h-32" />
      ))}
    </div>
  );
}
