const Detail = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => {
  return (
    <div className="min-w-0">
      <p className="text-xs text-gray-500 dark:text-slate-400">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-gray-900 dark:text-white">
        {value ?? "—"}
      </p>
    </div>
  );
};

export default Detail;
