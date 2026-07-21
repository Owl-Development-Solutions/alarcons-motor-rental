"use client";

import { LogIn } from "lucide-react";
import { useState } from "react";
import AuthForm from "../auth/auth-form";

const SignedOutBookingState = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-orange-50 dark:bg-orange-900 hover:from-orange-600 hover:to-orange-700  flex items-center justify-center mb-4 transition-transform hover:scale-105"
        >
          <LogIn className="w-6 h-6 text-orange-600 dark:text-orange-400" />
        </button>

        <p className="text-orange-600 dark:text-orange-400 font-medium mb-1">
          Sign in to see your booking history
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
          To view your past and upcoming reservations, log in with the email you
          used when booking
        </p>
      </div>

      <AuthForm
        type="Login"
        open={open}
        onOpenChange={setOpen}
        showTrigger={false}
      />
    </>
  );
};

export default SignedOutBookingState;
