import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, Upload, Calendar } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [wallet, setWallet] = useState<any>(null);
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [daysActive, setDaysActive] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      await fetchUserData(session.user.id);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      const [profileRes, walletRes, kycRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_wallets').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('kyc_verifications').select('status').eq('user_id', userId).maybeSingle(),
      ]);

      if (profileRes.data) {
        setProfile(profileRes.data);
        const createdDate = new Date(profileRes.data.created_at);
        const today = new Date();
        const days = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
        setDaysActive(days);
      }
      if (walletRes.data) setWallet(walletRes.data);
      if (kycRes.data) setKycStatus(kycRes.data.status);
    } catch (error: any) {
      console.error('Error fetching user data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || 'Investor'}!</h1>
          <p className="text-muted-foreground">Manage your investments and track your portfolio</p>
        </div>

        {/* KYC Alert */}
        {!kycStatus && (
          <Card className="mb-8 border-amber-500 bg-amber-50 dark:bg-amber-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Upload className="text-amber-600" size={24} />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">KYC Verification Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    To start investing, please complete your KYC verification by uploading your ID and a selfie.
                  </p>
                  <Link to="/kyc-verification">
                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                      Complete KYC Verification
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {kycStatus === 'pending' && (
          <Card className="mb-8 border-blue-500 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Upload className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold mb-2">KYC Under Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Your KYC verification is being reviewed. This usually takes 24-48 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Account Balance */}
        <Card className="mb-6 bg-gradient-primary text-white">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm opacity-90">Main Account Balance</p>
                <h2 className="text-4xl font-bold mt-2">${wallet?.balance || 0}</h2>
              </div>
              <Wallet className="h-8 w-8 opacity-80" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>Profits ({daysActive}d active) - ${wallet?.total_profit || 0}</span>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Overview */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Deposited</CardTitle>
              <ArrowDownRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_deposited || 0}</div>
              <p className="text-xs text-muted-foreground">All time deposits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_profit || 0}</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Withdrawn</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${wallet?.total_withdrawn || 0}</div>
              <p className="text-xs text-muted-foreground">All time withdrawals</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <Link to="/dashboard/deposit">
                <Button className="w-full bg-gradient-primary" disabled={kycStatus !== 'approved'}>
                  Deposit Funds
                </Button>
              </Link>
              <Link to="/dashboard/plans">
                <Button className="w-full" variant="outline" disabled={kycStatus !== 'approved'}>
                  Start Investment
                </Button>
              </Link>
              <Link to="/dashboard/withdraw">
                <Button className="w-full" variant="outline" disabled={kycStatus !== 'approved'}>
                  Withdraw Funds
                </Button>
              </Link>
            </div>
            {kycStatus !== 'approved' && (
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Complete KYC verification to access investment features
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
