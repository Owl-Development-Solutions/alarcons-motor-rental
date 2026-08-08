import Navbar from "@/components/landing/navbar";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/90 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 items-center text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                Terms & Conditions
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Terms and Condition
              </h1>
              <p className="mt-6 mx-auto max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Explore the terms and conditions of our Cebu car rental services to ensure a smooth and secure experience.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="text-xl font-semibold text-white">Booking and Rental</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Confirmation occurs once your reservation is accepted, and all bookings are governed by the terms below.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                <li>Bookings are subject to availability and confirmation.</li>
                <li>Rental agreements are valid on confirmation and payment.</li>
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="text-xl font-semibold text-white">Driver Criteria</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Drivers must meet our age and licensing standards before the rental begins.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                <li>Primary driver must be at least 21 years old.</li>
                <li>Valid driver’s license is required at pickup.</li>
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/40">
              <h2 className="text-xl font-semibold text-white">Usage & Return</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Use the vehicle responsibly and return it in the agreed condition to maintain a smooth rental experience.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-400">
                <li>Vehicle must remain within Cebu unless approved.</li>
                <li>Late returns may be subject to fees.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-slate-800 bg-slate-950/85 p-8 shadow-xl shadow-slate-950/40">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Insurance & Liability</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                  Basic coverage is included, with additional insurance available. JE Cebu Tours is not liable for unauthorized use or damages outside agreed terms.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 px-5 py-4 text-sm text-slate-300 ring-1 ring-slate-700">
                Need clarification? Email <span className="text-orange-400">johnearlalarcon19@gmail.com</span> or call <span className="text-orange-400">09817407642</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
