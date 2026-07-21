import AuthForm from "@/components/auth/auth-form";
import SignedOutBookingState from "@/components/booking/signed-out-booking";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getCurrentUser } from "@/data/actions/user";
import { useUser } from "@/data/context/user-context";
import { LogIn } from "lucide-react";

const Booking = async () => {
  const user = await getCurrentUser();

  const bookings = [];

  return (
    <div className=" max-w-6xl mx-auto p-4">
      {/* <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Booking history
      </h1> */}

      {!user ? (
        <SignedOutBookingState />
      ) : bookings.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-10 text-center">
          You don't have any bookings yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">{/* @todo table here */}</div>
      )}
    </div>
  );
};

export default Booking;
