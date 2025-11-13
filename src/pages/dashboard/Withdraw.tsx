import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function Withdraw() {
  const navigate = useNavigate();
  const [hasWithdrawalAccount, setHasWithdrawalAccount] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWithdrawalAccount = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      // Temporary: Set to false until migration is run
      setHasWithdrawalAccount(false);
      setLoading(false);
    };

    checkWithdrawalAccount();
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!hasWithdrawalAccount) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>You're almost ready to withdraw!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                To make a withdraw, please add a withdraw account from your profile (withdraw accounts).
              </p>

              <Alert className="bg-amber-50 dark:bg-amber-950 border-amber-500">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  You have not added any withdraw account yet in your account. 
                  Please add the personal or company accounts that you'd like to withdraw funds.
                </AlertDescription>
              </Alert>

              <div className="flex gap-4">
                <Link to="/dashboard/settings?tab=account" className="flex-1">
                  <Button className="w-full bg-gradient-primary">ADD ACCOUNT</Button>
                </Link>
                <Link to="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">Go to Dashboard</Button>
                </Link>
              </div>

              <p className="text-sm text-center text-muted-foreground">
                Please feel free to contact us if you have any question.
              </p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Withdraw Funds</h1>
        <Card>
          <CardContent className="pt-6">
            <p>Withdrawal form will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
