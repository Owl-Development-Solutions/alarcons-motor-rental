import Navbar from "@/components/landing/navbar";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="flex flex-col gap-4 items-center text-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                Privacy Policy
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Privacy Policy
              </h1>
              <p className="mt-6 mx-auto max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
                Your data protection matters to us – explore our commitment to safeguarding your information while providing exceptional rental services in Cebu.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
              <h2 className="text-xl font-semibold text-white">Privacy Policy for cebusistours.com</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                At cebusistours.com, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information received and collected by cebusistours.com and how it is used.
              </p>
            </section>

            <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
              <h2 className="text-xl font-semibold text-white">Information Collected</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>
                  We may collect personal information such as names, email addresses, phone numbers, and other details voluntarily submitted by visitors through contact forms or newsletter sign-ups.
                </p>
                <p>
                  Additionally, non-personal information like IP addresses, browser types, referring pages, and time of visit may be automatically collected for analytical purposes.
                </p>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
              <h2 className="text-xl font-semibold text-white">Use of Information</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>
                  The information collected is used to provide and personalize our services, improve website content, respond to inquiries, and share updates about promotions or services.
                </p>
                <p>
                  Personal information will not be sold, exchanged, transferred, or given to any other company without consent, except to deliver the requested product or service.
                </p>
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-slate-950/30">
              <h2 className="text-xl font-semibold text-white">Cookies and Web Beacons</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                cebusistours.com may use cookies to store visitor preferences, record which pages are accessed, and customize webpage content based on browser type or other usage data.
              </p>
            </section>
          </div>

          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/85 p-8 shadow-xl shadow-slate-950/30">
            <h2 className="text-2xl font-semibold text-white">Third-party Links</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Our website may contain links to third-party sites. These sites have their own privacy policies, and we do not assume responsibility for their content or activities.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/70 p-6 text-slate-300 ring-1 ring-slate-800">
                <h3 className="text-lg font-semibold text-white">Security</h3>
                <p className="mt-3 text-sm leading-7">
                  We are committed to industry-standard security measures to prevent unauthorized access, disclosure, alteration, or destruction of personal data.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-900/70 p-6 text-slate-300 ring-1 ring-slate-800">
                <h3 className="text-lg font-semibold text-white">Consent & Updates</h3>
                <p className="mt-3 text-sm leading-7">
                  By using our website, you consent to this policy. This policy may be updated periodically, and changes will be posted on this page.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-900/70 p-6 text-slate-300 ring-1 ring-slate-800">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <p className="mt-3 text-sm leading-7">
                For questions about our privacy policy, email <span className="font-medium text-orange-400">johnearlalarcon19@gmail.com</span> or call <span className="font-medium text-orange-400">09817407642</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
