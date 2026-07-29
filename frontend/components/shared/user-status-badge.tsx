import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function UserStatusBadge({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium",
        isActive
          ? "border-green-200 bg-green-100 text-green-800 hover:bg-green-100 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300",
        className,
      )}
    >
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}
