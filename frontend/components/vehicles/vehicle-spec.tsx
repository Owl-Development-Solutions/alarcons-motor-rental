const VehicleSpec = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-500/10">
        <Icon className="h-4.5 w-4.5 text-orange-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-slate-400">{label}</p>
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
};

export default VehicleSpec;
