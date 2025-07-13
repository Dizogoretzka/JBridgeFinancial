
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, X, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Documents = () => {
  const { user } = useAuth();
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch existing documents
  const { data: documents, refetch: refetchDocuments } = useQuery({
    queryKey: ['documents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Set up real-time subscription for documents
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('documents-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          refetchDocuments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, refetchDocuments]);

  const handleFileUpload = (file: File, type: 'front' | 'back') => {
    if (type === 'front') {
      setFrontIdFile(file);
    } else {
      setBackIdFile(file);
    }
  };

  const uploadFile = async (file: File, documentType: string) => {
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    // Save document record to database
    const { error: dbError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        document_type: documentType,
        file_url: publicUrl,
      });

    if (dbError) throw dbError;

    return publicUrl;
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
    
    try {
      await Promise.all([
        uploadFile(frontIdFile, 'id_front'),
        uploadFile(backIdFile, 'id_back')
      ]);

      toast({
        title: "Documents Uploaded",
        description: "Your ID documents have been uploaded successfully",
      });

      // Clear the selected files
      setFrontIdFile(null);
      setBackIdFile(null);
      
      // Reset file inputs
      const frontInput = document.getElementById('front-id') as HTMLInputElement;
      const backInput = document.getElementById('back-id') as HTMLInputElement;
      if (frontInput) frontInput.value = '';
      if (backInput) backInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getExistingDocument = (type: string) => {
    return documents?.find(doc => doc.document_type === type);
  };

  const frontDoc = getExistingDocument('id_front');
  const backDoc = getExistingDocument('id_back');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Document Upload</h2>
        <p className="text-gray-600 mt-2">
          Upload your identification documents for verification.
        </p>
      </div>

      {/* Existing Documents */}
      {documents && documents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{doc.file_name}</p>
                      <p className="text-sm text-gray-600">
                        Uploaded on {new Date(doc.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(doc.file_url, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload New Documents */}
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
                {frontDoc ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">Already uploaded</p>
                    <p className="text-xs text-gray-500">{frontDoc.file_name}</p>
                  </div>
                ) : frontIdFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">{frontIdFile.name}</p>
                    <p className="text-xs text-gray-500">Ready to upload</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFrontIdFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
                  disabled={!!frontDoc}
                />
                {!frontDoc && (
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('front-id')?.click()}
                  >
                    Choose File
                  </Button>
                )}
              </div>
            </div>

            {/* Back ID Upload */}
            <div className="space-y-2">
              <Label htmlFor="back-id">ID Back Side</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {backDoc ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">Already uploaded</p>
                    <p className="text-xs text-gray-500">{backDoc.file_name}</p>
                  </div>
                ) : backIdFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">{backIdFile.name}</p>
                    <p className="text-xs text-gray-500">Ready to upload</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBackIdFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
                  disabled={!!backDoc}
                />
                {!backDoc && (
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => document.getElementById('back-id')?.click()}
                  >
                    Choose File
                  </Button>
                )}
              </div>
            </div>
          </div>

          {(!frontDoc || !backDoc) && (
            <div className="pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={!frontIdFile || !backIdFile || uploading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {uploading ? "Uploading..." : "Submit Documents"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;
