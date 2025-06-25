
import { Card, CardContent } from "@/components/ui/card";
import { Building, Users, Award, Shield } from "lucide-react";

const CompanyInfo = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Company Information</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            J Bridge Financial Services is a registered financial institution committed to providing innovative lending solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Registration</h3>
              <p className="text-gray-600">CC/2019/02711</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Founded</h3>
              <p className="text-gray-600">2019</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Customers</h3>
              <p className="text-gray-600">1000+ Active</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Licensed</h3>
              <p className="text-gray-600">Namibia FSC</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            To revolutionize the lending industry in Namibia by providing affordable, transparent, and ethical financial services 
            through our innovative subscription-based model. We believe everyone deserves access to fair financing without the 
            burden of excessive interest rates.
          </p>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Our Vision</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            To become the leading alternative lending platform in Southern Africa, setting new standards for responsible 
            lending and empowering individuals and businesses to achieve their financial goals without falling into debt traps.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
