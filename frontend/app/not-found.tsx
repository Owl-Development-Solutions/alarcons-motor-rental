import { Compass, Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0F172A] px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/10">
        <Compass className="h-9 w-9 text-orange-500" />
      </div>

      <p className="mt-6 text-sm font-semibold tracking-wide text-orange-500">
        404
      </p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        This page took a wrong turn
      </h1>
      <p className="mt-3 max-w-sm text-sm text-gray-500 dark:text-slate-400">
        We couldn't find what you're looking for. It may have been moved, or the
        link might be incorrect.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
        <Link
          href="/vehicles"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          Browse vehicles
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
