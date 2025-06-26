
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Documents = () => {
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (file: File, type: 'front' | 'back') => {
    if (type === 'front') {
      setFrontIdFile(file);
    } else {
      setBackIdFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!frontIdFile || !backIdFile) {
      toast({
        title: "Missing Documents",
        description: "Please upload both front and back of your ID",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Documents Uploaded",
        description: "Your ID documents have been uploaded successfully",
      });
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Document Upload</h2>
        <p className="text-gray-600 mt-2">
          Upload your identification documents for verification.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span>ID Document Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Front ID Upload */}
            <div className="space-y-2">
              <Label htmlFor="front-id">ID Front Side</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {frontIdFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">{frontIdFile.name}</p>
                    <p className="text-xs text-gray-500">File uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">Click to upload front of ID</p>
                  </div>
                )}
                <Input
                  id="front-id"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'front');
                  }}
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => document.getElementById('front-id')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>

            {/* Back ID Upload */}
            <div className="space-y-2">
              <Label htmlFor="back-id">ID Back Side</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {backIdFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">{backIdFile.name}</p>
                    <p className="text-xs text-gray-500">File uploaded successfully</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">Click to upload back of ID</p>
                  </div>
                )}
                <Input
                  id="back-id"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, 'back');
                  }}
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => document.getElementById('back-id')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={!frontIdFile || !backIdFile || uploading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {uploading ? "Uploading..." : "Submit Documents"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
