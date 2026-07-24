import { LockKeyhole, LogIn } from "lucide-react";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-[#0F172A] px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 dark:bg-orange-500/10">
        <LockKeyhole className="h-9 w-9 text-orange-500" />
      </div>

      <p className="mt-6 text-sm font-semibold tracking-wide text-orange-500">
        401
      </p>
      <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
        Sign in to continue
      </h1>
      <p className="mt-3 max-w-sm text-sm text-gray-500 dark:text-slate-400">
        You need to be signed in to view this page. Log in with your account to
        continue.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <LogIn className="h-4 w-4" />
          Go to sign in
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
