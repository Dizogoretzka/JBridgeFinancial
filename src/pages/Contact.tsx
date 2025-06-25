
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission logic here
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get in touch with J Bridge Financial Services. We're here to help with your financial needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800">Address</h3>
                    <p className="text-gray-600">
                      123 Independence Avenue<br />
                      Windhoek, Namibia<br />
                      10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800">Phone</h3>
                    <p className="text-gray-600">+264 81 219 1482</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800">Email</h3>
                    <p className="text-gray-600">info@jbridgefinance.online</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-800">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-medium">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
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

export default Contact;
