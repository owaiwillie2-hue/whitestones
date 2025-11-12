import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

export default function KYCVerification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      setUserId(session.user.id);

      // Check if KYC already submitted
      const { data: kycData } = await supabase
        .from('kyc_verifications')
        .select('status')
        .eq('user_id', session.user.id)
        .single();

      if (kycData) {
        setKycStatus(kycData.status);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idDocument || !selfie) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload both ID document and selfie",
      });
      return;
    }

    if (!userId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User not authenticated",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload ID document
      const idFileName = `${userId}/id-${Date.now()}-${idDocument.name}`;
      const { error: idError } = await supabase.storage
        .from('kyc-documents')
        .upload(idFileName, idDocument);

      if (idError) throw idError;

      // Upload selfie
      const selfieFileName = `${userId}/selfie-${Date.now()}-${selfie.name}`;
      const { error: selfieError } = await supabase.storage
        .from('kyc-documents')
        .upload(selfieFileName, selfie);

      if (selfieError) throw selfieError;

      // Get public URLs
      const { data: { publicUrl: idUrl } } = supabase.storage
        .from('kyc-documents')
        .getPublicUrl(idFileName);

      const { data: { publicUrl: selfieUrl } } = supabase.storage
        .from('kyc-documents')
        .getPublicUrl(selfieFileName);

      // Insert KYC verification record
      const { error: insertError } = await supabase
        .from('kyc_verifications')
        .insert({
          user_id: userId,
          id_document_url: idUrl,
          selfie_url: selfieUrl,
          status: 'pending',
        });

      if (insertError) throw insertError;

      toast({
        title: "Success!",
        description: "Your KYC documents have been submitted for review.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error('KYC submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to submit KYC documents. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (kycStatus) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={logo} alt="Whitestones Markets" className="h-12 mx-auto mb-4" />
            <CardTitle>KYC Status</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {kycStatus === 'pending' && (
              <>
                <Upload className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Under Review</h3>
                <p className="text-muted-foreground mb-6">
                  Your KYC documents are being reviewed. This usually takes 24-48 hours.
                </p>
              </>
            )}
            {kycStatus === 'approved' && (
              <>
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Verified</h3>
                <p className="text-muted-foreground mb-6">
                  Your KYC verification has been approved. You can now access all features.
                </p>
              </>
            )}
            {kycStatus === 'rejected' && (
              <>
                <p className="text-red-600 mb-6">
                  Your KYC verification was rejected. Please contact support for assistance.
                </p>
              </>
            )}
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <img src={logo} alt="Whitestones Markets" className="h-12 mx-auto mb-4" />
          <CardTitle className="text-center">KYC Verification</CardTitle>
          <p className="text-center text-muted-foreground">
            Please upload your identification documents to verify your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="idDocument">ID Document</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Upload a clear photo of your Passport, National ID, or Driver's License
              </p>
              <Input
                id="idDocument"
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setIdDocument(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div>
              <Label htmlFor="selfie">Selfie Photo</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Upload a clear selfie photo holding your ID document
              </p>
              <Input
                id="selfie"
                type="file"
                accept="image/*"
                onChange={(e) => setSelfie(e.target.files?.[0] || null)}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-primary"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Submit for Verification"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
