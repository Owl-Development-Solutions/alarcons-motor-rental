"use client";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TermsModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      <div className="relative max-w-3xl w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-700">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            Terms and Conditions
          </h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto text-sm text-gray-700 dark:text-gray-300 space-y-4 no-scrollbar">
          {/* Insert the terms content here - keep markup semantic and readable */}
          <p>
            The renter agrees to pay the rental fee, taxes, and any additional
            charges. A security deposit may be required and will be refunded,
            minus any deductions.
          </p>
          <p>
            Unit is unlimited mileage but only allowed in part of Cebu. Bringing
            the unit by ferries will have a penalty of 3000 depending on the
            days.
          </p>
          <p>
            The borrower also agrees to clean or wash the vehicle or pay for 300
            (small car), 350 (SUV), and 400 (Van).
          </p>

          <ul className="list-disc list-inside space-y-1">
            <li>
              Renter must provide a valid ID for renting. Company ID is not
              accepted. For long term rent, owner must hold a valid ID for the
              full rental period.
            </li>
            <li>
              Do not use the vehicle for practice, ride-hailing, racing, towing,
              or commercial activities unless authorized.
            </li>
            <li>
              Renter must comply with all traffic laws. Once violated, renter
              must present only his/her driver's license and the OR/CR of the
              unit.
            </li>
            <li>
              Smoking inside the vehicle and transporting hazardous or illegal
              materials is prohibited.
            </li>
          </ul>

          <p>
            The vehicle must be returned in good condition, subject to normal
            wear and tear. All keys, documents, and accessories must be
            returned.
          </p>

          <p>
            The vehicle is checked before release to ensure all tires,
            including spare tire, are in good and safe condition. The renter is
            responsible for any tire damage during the rental period; if the
            tire can be vulcanized, the renter will shoulder the repair cost.
          </p>

          <p>
            Responsibility for loss and damage to the vehicle: LESSEE is
            responsible for the FULL VALUE regardless of fault. Lessee is
            responsible for returning the vehicle with as much fuel in the
            tank as when received. If returned with less fuel, a fuel charge
            applies. At the time of return, LESSEE will not receive credit for
            any fuel remaining in the vehicle.
          </p>

          <p>
            LIABILITY: If the rented vehicle has been lost or stolen or in any
            case the renter can't return the vehicle, the renter is
            responsible for the whole amount of the rented vehicle.
          </p>

          <p>
            EXTENSION PER HOUR RATE: 250 per hour for small car, 350 SUV and
            VAN. If the renter exceeded more than 6 hours, the lessee agrees to
            pay the whole day rent. If unit returned early, we will not refund
            the remaining time.
          </p>

          <p>
            We require at least a Non-professional Driver's License. Student
            Permit are not allowed to rent. Only the driver declared in the
            rental agreement is authorized to drive the vehicle.
          </p>

          <p>
            Renter shall bear the cost of gas during the use of vehicle (same
            gas level upon returning the vehicle). Charges may apply on the
            excess time of use if more than the actual rental booking
            (Motorcycle - 10% of full price, Car - 10% of full price, Carwash -
            250php).
          </p>

          <p>
            Extension of rent should be notified by the renter 2 hours prior to
            end of contract. Failure to inform will be charged for full day
            rent. 15 minutes will be allocated before charging it to 1 day
            extensions.
          </p>

          <p>
            NO REFUND POLICY. Early return of rented unit will still be charged
            full. Unlimited mileage. Restrictions may apply when taking or
            transporting the rented vehicle outside the Province of Cebu.
          </p>

          <p>
            Check the unit before signing the contract. You can also take
            photos &amp; videos on the return unit. In case of accident, theft,
            loss, and damages of vehicle, helmets or any parts and raincoats,
            renter will cover the necessary cost of repairs and replacements.
          </p>

          <p>
            Renter must comply with national traffic laws and regulations. Not
            to engage in subleasing or unauthorized use. No half-day rentals on
            weekends. No hourly extensions on weekends. Return the vehicle in
            the same condition as received, except for normal wear and tear.
          </p>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-2">
        </div>
      </div>
    </div>
  );
}
