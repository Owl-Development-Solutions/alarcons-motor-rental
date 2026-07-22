import BookingTable from "@/components/booking/booking-table";
import SignedOutBookingState from "@/components/booking/signed-out-booking";
import { getUserOrGuestBooking } from "@/data/actions/booking";
import { getCurrentUser } from "@/data/actions/user";

const Booking = async (props: {
  searchParams: Promise<{
    page?: number;
  }>;
}) => {
  const { page } = await props.searchParams;

  const user = await getCurrentUser();

  const res = await getUserOrGuestBooking(page);

  return (
    <div className=" max-w-6xl mx-auto p-4">
      {/* <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Booking history
      </h1> */}

      {!user ? (
        <SignedOutBookingState />
      ) : res!.data.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 py-10 text-center">
          You don't have any bookings yet.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          <BookingTable bookings={res!.data} />
        </div>
      )}
    </div>
  );
};

export default Booking;
