
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-medium cursor-pointer" onClick={() => navigate("/")}>
                <span className="font-bold">J Bridge</span> 
                <span className="text-cyan-400 text-sm ml-2">Financial Services</span>
              </h1>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-800" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-800 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using J Bridge Financial Services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Subscription Model</h2>
            <p>
              J Bridge operates on a subscription-based loan model. By subscribing to our service, 
              you agree to pay monthly subscription fees as outlined in your chosen plan. Subscription 
              fees are non-refundable unless otherwise specified.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Loan Terms</h2>
            <p>All loans are subject to the following terms:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>A 6% transaction fee applies to each loan</li>
              <li>No interest charges apply to loan amounts</li>
              <li>Repayment terms are agreed upon at the time of loan approval</li>
              <li>Late payment fees may apply as outlined in your loan agreement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Eligibility</h2>
            <p>To be eligible for our services, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Be a Namibian citizen or permanent resident</li>
              <li>Have a verifiable source of income</li>
              <li>Provide accurate and complete information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Blacklist Policy</h2>
            <p>
              Failure to meet loan obligations may result in being added to our blacklist registry. 
              This registry is maintained to protect our lending community and may be shared with 
              other financial institutions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Limitation of Liability</h2>
            <p>
              J Bridge Financial Services shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of profits, 
              data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> info@jbridgefinance.online</p>
              <p><strong>Phone:</strong> +264 81 219 1482</p>
              <p><strong>Registration:</strong> CC/2019/02711</p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">© 2025 J Bridge Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
