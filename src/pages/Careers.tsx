
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Careers = () => {
  const navigate = useNavigate();

  const jobOpenings = [
    {
      title: "Loan Officer",
      location: "Windhoek, Namibia",
      type: "Full-time",
      department: "Operations",
      description: "Join our team to help evaluate loan applications and assist customers with their financial needs.",
      requirements: ["Bachelor's degree in Finance or related field", "2+ years experience in banking/finance", "Strong communication skills"]
    },
    {
      title: "Customer Service Representative",
      location: "Windhoek, Namibia", 
      type: "Full-time",
      department: "Customer Service",
      description: "Provide excellent customer support and help clients navigate our subscription-based loan model.",
      requirements: ["High school diploma", "Previous customer service experience", "Fluent in English and local languages"]
    },
    {
      title: "Financial Analyst",
      location: "Windhoek, Namibia",
      type: "Full-time", 
      department: "Finance",
      description: "Analyze financial data and help optimize our innovative lending model.",
      requirements: ["Bachelor's degree in Finance/Economics", "Strong analytical skills", "Experience with financial modeling"]
    }
  ];

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

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Be part of revolutionizing financial services in Namibia. Help us make loans more affordable and accessible.
          </p>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Why Work at J Bridge?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-cyan-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Collaborative Environment</h3>
                <p className="text-gray-600">Work with a passionate team dedicated to making financial services better for everyone.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Growth Opportunities</h3>
                <p className="text-gray-600">Advance your career in a rapidly growing fintech company with plenty of learning opportunities.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Work-Life Balance</h3>
                <p className="text-gray-600">Enjoy flexible working arrangements and comprehensive benefits that support your wellbeing.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Current Openings</h2>
            <p className="text-xl text-gray-600">Join us in transforming the financial landscape of Namibia</p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.type}
                        </Badge>
                        <Badge className="bg-cyan-100 text-cyan-800">{job.department}</Badge>
                      </div>
                    </div>
                    <Button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium">
                      Apply Now
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Don't see a position that fits? We're always looking for talented individuals.</p>
            <Button variant="outline" className="border-cyan-400 text-cyan-600 hover:bg-cyan-50">
              Send Us Your Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">J Bridge</h3>
              <p className="text-gray-300 mb-4">
                Affordable loans with a subscription model. Replacing 30% monthly interest loans.
              </p>
              <div className="space-y-2 text-gray-300">
                <p>📞 +264 81 219 1482</p>
                <p>✉️ info@jbridgefinance.online</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-300">
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/")}>Home</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/about")}>About Us</p>
                <p className="hover:text-cyan-400 cursor-pointer" onClick={() => navigate("/contact")}>Contact</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-gray-300">
                <p className="hover:text-cyan-400 cursor-pointer">Terms of Service</p>
                <p className="hover:text-cyan-400 cursor-pointer">Privacy Policy</p>
                <p className="hover:text-cyan-400 cursor-pointer">Loan Agreement</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
            <p className="text-gray-300">© 2025 J Bridge Financial Services. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <p className="text-gray-300">Developed by</p>
              <a href="https://www.aisod.tech" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 font-medium">AISOD</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;
