
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How does J Bridge make money if you don't charge interest?",
      answer: "Our business model is built on subscription fees and a small transaction fee of 6% on each loan. This allows us to operate sustainably while offering significantly cheaper loans compared to traditional 30% monthly interest loans."
    },
    {
      question: "What happens if I can't repay my loan on time?",
      answer: "We understand that financial situations can change. If you're facing difficulties with repayment, contact us immediately to discuss options. We may be able to adjust your repayment schedule. However, consistent non-payment without communication may result in blacklisting."
    },
    {
      question: "Can I change my subscription tier?",
      answer: "Yes, you can upgrade your subscription tier at any time to access higher loan limits. Downgrades are also possible but may be subject to a waiting period if you have active loans."
    },
    {
      question: "How is the J Bridge Credit Score calculated?",
      answer: "The JBCS is based on your repayment history, subscription duration, consistency in payments, and other factors that demonstrate financial responsibility. Higher scores unlock larger loan amounts and better terms."
    },
    {
      question: "What are the requirements to join J Bridge?",
      answer: "You need to be at least 18 years old, have a valid ID, proof of regular income, and a bank account. Additional requirements may apply based on your chosen subscription tier."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="border border-gray-200">
            <CardContent className="p-0">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800 pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
