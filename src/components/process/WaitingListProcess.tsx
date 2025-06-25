
import { Card, CardContent } from "@/components/ui/card";
import { User, Users, UserCheck, Zap } from "lucide-react";

const WaitingListProcess = () => {
  const steps = [
    {
      icon: User,
      title: "Application Review",
      description: "After registering, your application undergoes an initial review to assess your eligibility. This helps us maintain a sustainable lending model.",
      bgColor: "bg-slate-700",
      textColor: "text-white"
    },
    {
      icon: Users,
      title: "Queue Position",
      description: "Approved applications are placed in our waiting queue. Your position depends on several factors, including subscription tier, application date, and available lending capacity.",
      bgColor: "bg-cyan-400",
      textColor: "text-slate-800"
    },
    {
      icon: UserCheck,
      title: "Group Assignment",
      description: "We use a group-based system for efficient processing. Each group consists of applicants with similar profiles. When your group reaches the front of the queue, you'll be notified.",
      bgColor: "bg-green-500",
      textColor: "text-white"
    },
    {
      icon: Zap,
      title: "Activation",
      description: "Once your waiting period ends, your account becomes fully active, allowing you to apply for loans according to your subscription tier's limits.",
      bgColor: "bg-slate-700",
      textColor: "text-white"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">The Waiting List Process</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Due to high demand and our commitment to responsible lending, we implement a structured 
          waiting list process to ensure fair access to our services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="p-6 border-l-4 border-cyan-400">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${step.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${step.textColor}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-cyan-50 rounded-lg border border-cyan-200">
        <div className="text-center">
          <p className="text-sm text-cyan-600 font-medium mb-2">
            Average waiting times vary by tier: Premium (1-7 days), Standard (7-14 days), Basic (14-30 days)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WaitingListProcess;
