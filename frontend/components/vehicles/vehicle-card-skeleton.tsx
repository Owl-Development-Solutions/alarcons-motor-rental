const VehicleCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-neutral-200 dark:border-slate-700">
      <div className="h-48 w-full bg-neutral-200 dark:bg-[#314158]" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-[#314158]" />
        <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-[#314158]" />
        <div className="h-3 w-1/3 rounded bg-neutral-200 dark:bg-[#314158]" />
      </div>
    </div>
  );
};

export default VehicleCardSkeleton;
