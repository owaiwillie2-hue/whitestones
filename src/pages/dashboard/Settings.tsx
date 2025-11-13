import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  const [profile, setProfile] = useState<any>(null);
  const [withdrawalAccounts, setWithdrawalAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accountType, setAccountType] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const profileRes = await supabase.from('profiles').select('*').eq('id', session.user.id).maybeSingle();

      if (profileRes.data) setProfile(profileRes.data);
      // Temporary: Empty array until migration is run
      setWithdrawalAccounts([]);
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleAddAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const accountData: any = {
        user_id: session.user.id,
        account_type: accountType,
      };

      if (accountType === 'bank') {
        accountData.account_holder_name = formData.get('accountHolderName');
        accountData.account_number = formData.get('accountNumber');
        accountData.bank_name = formData.get('bankName');
        accountData.bank_currency = formData.get('bankCurrency');
        accountData.routing_number = formData.get('routingNumber');
        accountData.swift_code = formData.get('swiftCode');
      } else if (accountType === 'crypto') {
        accountData.wallet_name = formData.get('walletName');
        accountData.wallet_address = formData.get('walletAddress');
      } else if (accountType === 'paypal' || accountType === 'payoneer') {
        accountData.email_address = formData.get('emailAddress');
      }

      // Temporary: Disabled until migration is run
      toast({ 
        title: "Feature not available", 
        description: "Please run the database migration first",
        variant: "destructive" 
      });
      setDialogOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDeleteAccount = async (id: string) => {
    toast({ 
      title: "Feature not available", 
      description: "Please run the database migration first",
      variant: "destructive" 
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

        <Tabs defaultValue={defaultTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={profile?.full_name || ''} disabled />
                  </div>
                  <div>
                    <Label>Country</Label>
                    <Input value={profile?.country || ''} disabled />
                  </div>
                  <div>
                    <Label>Date of Birth</Label>
                    <Input value={profile?.date_of_birth || ''} disabled />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input value={profile?.phone_number || ''} disabled />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Withdrawal Accounts</CardTitle>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Withdrawal Account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Account Type</Label>
                        <Select value={accountType} onValueChange={setAccountType}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bank">Bank Account</SelectItem>
                            <SelectItem value="crypto">Crypto Wallet</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="payoneer">Payoneer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {accountType && (
                        <form onSubmit={handleAddAccount} className="space-y-4">
                          {accountType === 'bank' && (
                            <>
                              <div>
                                <Label>Account Holder Name</Label>
                                <Input name="accountHolderName" required />
                              </div>
                              <div>
                                <Label>Account Number</Label>
                                <Input name="accountNumber" required />
                              </div>
                              <div>
                                <Label>Bank Name</Label>
                                <Input name="bankName" required />
                              </div>
                              <div>
                                <Label>Bank Currency</Label>
                                <Input name="bankCurrency" required />
                              </div>
                              <div>
                                <Label>Routing Number</Label>
                                <Input name="routingNumber" />
                              </div>
                              <div>
                                <Label>Swift Code / BIC</Label>
                                <Input name="swiftCode" />
                              </div>
                            </>
                          )}

                          {accountType === 'crypto' && (
                            <>
                              <div>
                                <Label>Wallet Name</Label>
                                <Select name="walletName" required>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select wallet" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Bitcoin">Bitcoin</SelectItem>
                                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                                    <SelectItem value="Litecoin">Litecoin</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Wallet Address</Label>
                                <Input name="walletAddress" required />
                              </div>
                            </>
                          )}

                          {(accountType === 'paypal' || accountType === 'payoneer') && (
                            <div>
                              <Label>Email Address</Label>
                              <Input name="emailAddress" type="email" required />
                            </div>
                          )}

                          <Button type="submit" className="w-full">Add Account</Button>
                        </form>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {withdrawalAccounts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No withdrawal accounts added yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {withdrawalAccounts.map((account) => (
                      <Card key={account.id}>
                        <CardContent className="pt-6 flex justify-between items-center">
                          <div>
                            <p className="font-semibold capitalize">{account.account_type}</p>
                            <p className="text-sm text-muted-foreground">
                              {account.account_number || account.wallet_address || account.email_address}
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteAccount(account.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email on Unusual Activity</p>
                    <p className="text-sm text-muted-foreground">Get notified of suspicious logins</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Save Activity Logs</p>
                    <p className="text-sm text-muted-foreground">Keep track of your login history</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">Change Password</Button>
                  <Button variant="outline" className="w-full">Change Email Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  No activity logs available
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
