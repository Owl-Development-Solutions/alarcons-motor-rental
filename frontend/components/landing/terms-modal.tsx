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
            Terms & Conditions
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
          <p>
            Welcome to JE Cebu Tours. Please read these terms carefully before using our car rental services.
          </p>

          <h5 className="font-semibold">1. Booking and Rental Agreement</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>
              By making a reservation with JE Cebu Tours, you agree to the terms and conditions outlined herein.
            </li>
            <li>
              The rental agreement is formed between the renter and JE Cebu Tours upon confirmation of the booking.
            </li>
          </ul>

          <h5 className="font-semibold">2. Driver’s Age and License</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The primary driver must be at least 21 years old and hold a valid driver’s license.
            </li>
            <li>
              Additional drivers must be declared and approved by JE Cebu Tours before driving the rented vehicle.
            </li>
          </ul>

          <h5 className="font-semibold">3. Reservation and Payment</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>Reservations are subject to vehicle availability.</li>
            <li>Payment terms and methods will be outlined during the booking process.</li>
            <li>Cancellation policies and associated fees will be communicated at the time of reservation.</li>
          </ul>

          <h5 className="font-semibold">4. Vehicle Usage</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The rented vehicle is to be used within the designated areas and must not be taken outside Cebu without prior consent.
            </li>
            <li>
              It should not be used for any illegal purposes, racing, or transportation of hazardous materials.
            </li>
          </ul>

          <h5 className="font-semibold">5. Insurance and Damage</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>
              The rental fee includes basic insurance coverage. Additional insurance options may be available at an extra cost.
            </li>
            <li>
              Any damage to the vehicle during the rental period must be reported immediately to JE Cebu Tours.
            </li>
          </ul>

          <h5 className="font-semibold">6. Return of the Vehicle</h5>
          <ul className="list-disc list-inside space-y-1">
            <li>The vehicle should be returned at the agreed time and location.</li>
            <li>Late returns may incur additional charges as per the agreement.</li>
          </ul>

          <h5 className="font-semibold">7. Liability</h5>
          <p>
            JE Cebu Tours is not liable for any loss, damage, or injury arising from the use of the rented vehicle.
          </p>

          <h5 className="font-semibold">8. Modifications to Terms</h5>
          <p>
            These terms and conditions are subject to change without prior notice. Any changes will be updated on our website.
          </p>

          <h5 className="font-semibold">9. Governing Law</h5>
          <p>
            Any disputes arising from these terms and conditions will be governed by the laws of Cebu City, Philippines.
          </p>

          <p>
            By using our services, you acknowledge that you have read, understood, and agreed to these terms and conditions.
          </p>

          <p>
            For any inquiries or clarifications, please contact us at johnearlalarcon19@gmail.com or phone 09817407642.
          </p>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-2">
        </div>
      </div>
    </div>
  );
}
