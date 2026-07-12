import { Button } from "../ui/button";

const Section = () => {
  return (
    <section
      id="concern"
      className="py-20 bg-gray-900 dark:bg-slate-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Have a Concern?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            We value your feedback and are committed to resolving any issues you
            may have
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            {/* @TODO CONVERT THIS TO FORM */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Concern
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Describe your concern"
                ></textarea>
              </div>
              <Button className="h-15 cursor-pointer text-base w-full px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors">
                Submit Concern
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
