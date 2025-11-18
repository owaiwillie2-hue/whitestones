import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Users, CheckCircle, XCircle, DollarSign, Eye, Settings, Plus, Minus } from "lucide-react";
import logo from "@/assets/logo.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [kycRequests, setKycRequests] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>({});
  const [selectedKyc, setSelectedKyc] = useState<any>(null);
  const [showKycDialog, setShowKycDialog] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [walletAction, setWalletAction] = useState<'add' | 'deduct'>('add');
  const [walletAmount, setWalletAmount] = useState("");

  useEffect(() => {
    const checkAdminAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin-login");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        navigate("/");
        return;
      }

      await fetchAdminData();
      setLoading(false);
    };

    checkAdminAuth();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      const [usersRes, kycRes, depositsRes, withdrawalsRes, settingsRes] = await Promise.all([
        supabase.from('profiles').select('*, user_wallets(*)').order('created_at', { ascending: false }),
        supabase.from('kyc_verifications').select('*, profiles(full_name)').eq('status', 'pending'),
        supabase.from('deposits').select('*, profiles(full_name)').eq('status', 'pending'),
        supabase.from('withdrawals').select('*, profiles(full_name)').eq('status', 'pending'),
        supabase.from('site_settings').select('*'),
      ]);

      if (usersRes.data) setUsers(usersRes.data);
      if (kycRes.data) setKycRequests(kycRes.data);
      if (depositsRes.data) setDeposits(depositsRes.data);
      if (withdrawalsRes.data) setWithdrawals(withdrawalsRes.data);
      
      if (settingsRes.data) {
        const settings: any = {};
        settingsRes.data.forEach((setting: any) => {
          settings[setting.setting_key] = setting.setting_value;
        });
        setSiteSettings(settings);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleKycAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('kyc_verifications')
        .update({
          status,
          reviewed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `KYC ${status} successfully`,
      });

      await fetchAdminData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDepositAction = async (id: string, status: 'approved' | 'rejected', userId: string, amount: number) => {
    try {
      const { error } = await supabase
        .from('deposits')
        .update({
          status,
          processed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      if (status === 'approved') {
        const { data: wallet } = await supabase
          .from('user_wallets')
          .select('balance, total_deposited')
          .eq('user_id', userId)
          .single();

        if (wallet) {
          const { error: walletError } = await supabase
            .from('user_wallets')
            .update({
              balance: Number(wallet.balance) + Number(amount),
              total_deposited: Number(wallet.total_deposited) + Number(amount),
            })
            .eq('user_id', userId);

          if (walletError) throw walletError;
        }
      }

      toast({
        title: "Success",
        description: `Deposit ${status} successfully`,
      });

      await fetchAdminData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleWithdrawalAction = async (id: string, status: 'approved' | 'rejected', userId: string, amount: number) => {
    try {
      const { error } = await supabase
        .from('withdrawals')
        .update({
          status,
          processed_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      if (status === 'approved') {
        const { data: wallet } = await supabase
          .from('user_wallets')
          .select('balance, total_withdrawn')
          .eq('user_id', userId)
          .single();

        if (wallet) {
          const { error: walletError } = await supabase
            .from('user_wallets')
            .update({
              balance: Number(wallet.balance) - Number(amount),
              total_withdrawn: Number(wallet.total_withdrawn) + Number(amount),
            })
            .eq('user_id', userId);

          if (walletError) throw walletError;
        }
      }

      toast({
        title: "Success",
        description: `Withdrawal ${status} successfully`,
      });

      await fetchAdminData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleWalletAdjustment = async () => {
    if (!selectedUser || !walletAmount) return;

    try {
      const amount = Number(walletAmount);
      const { data: wallet } = await supabase
        .from('user_wallets')
        .select('balance')
        .eq('user_id', selectedUser.id)
        .single();

      if (wallet) {
        const newBalance = walletAction === 'add' 
          ? Number(wallet.balance) + amount 
          : Number(wallet.balance) - amount;

        const { error } = await supabase
          .from('user_wallets')
          .update({ balance: newBalance })
          .eq('user_id', selectedUser.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: `${walletAction === 'add' ? 'Added' : 'Deducted'} $${amount} ${walletAction === 'add' ? 'to' : 'from'} user wallet`,
        });

        setShowWalletDialog(false);
        setWalletAmount("");
        await fetchAdminData();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleSiteSettingsUpdate = async (key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
        }, {
          onConflict: 'setting_key'
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });

      await fetchAdminData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Whitestones Markets" className="h-10" />
            <Badge variant="destructive">Admin</Badge>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
              <CheckCircle className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kycRequests.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Deposits</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{deposits.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Withdrawals</CardTitle>
              <DollarSign className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{withdrawals.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="kyc" className="space-y-6">
          <TabsList>
            <TabsTrigger value="kyc">KYC Requests</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="settings">Site Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="kyc">
            <Card>
              <CardHeader>
                <CardTitle>Pending KYC Verifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kycRequests.map((kyc) => (
                      <TableRow key={kyc.id}>
                        <TableCell>{kyc.profiles?.full_name}</TableCell>
                        <TableCell>{new Date(kyc.submitted_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedKyc(kyc);
                              setShowKycDialog(true);
                            }}
                          >
                            <Eye size={16} className="mr-1" />
                            View Docs
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleKycAction(kyc.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleKycAction(kyc.id, 'rejected')}
                            >
                              <XCircle size={16} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {kycRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No pending KYC requests
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deposits">
            <Card>
              <CardHeader>
                <CardTitle>Pending Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deposits.map((deposit) => (
                      <TableRow key={deposit.id}>
                        <TableCell>{deposit.profiles?.full_name}</TableCell>
                        <TableCell>${deposit.amount}</TableCell>
                        <TableCell>{new Date(deposit.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleDepositAction(deposit.id, 'approved', deposit.user_id, deposit.amount)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDepositAction(deposit.id, 'rejected', deposit.user_id, deposit.amount)}
                            >
                              <XCircle size={16} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {deposits.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No pending deposits
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Wallet Address</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawals.map((withdrawal) => (
                      <TableRow key={withdrawal.id}>
                        <TableCell>{withdrawal.profiles?.full_name}</TableCell>
                        <TableCell>${withdrawal.amount}</TableCell>
                        <TableCell className="font-mono text-xs">{withdrawal.wallet_address}</TableCell>
                        <TableCell>{new Date(withdrawal.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleWithdrawalAction(withdrawal.id, 'approved', withdrawal.user_id, withdrawal.amount)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle size={16} className="mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleWithdrawalAction(withdrawal.id, 'rejected', withdrawal.user_id, withdrawal.amount)}
                            >
                              <XCircle size={16} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {withdrawals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No pending withdrawals
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>${user.user_wallets?.[0]?.balance || 0}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setWalletAction('add');
                                setShowWalletDialog(true);
                              }}
                            >
                              <Plus size={16} className="mr-1" />
                              Add Funds
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setWalletAction('deduct');
                                setShowWalletDialog(true);
                              }}
                            >
                              <Minus size={16} className="mr-1" />
                              Deduct
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      defaultValue={siteSettings.contact_email || ''}
                      onBlur={(e) => handleSiteSettingsUpdate('contact_email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      defaultValue={siteSettings.contact_phone || ''}
                      onBlur={(e) => handleSiteSettingsUpdate('contact_phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_address">Contact Address</Label>
                    <Input
                      id="contact_address"
                      defaultValue={siteSettings.contact_address || ''}
                      onBlur={(e) => handleSiteSettingsUpdate('contact_address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="btc_deposit_address">BTC Deposit Address</Label>
                    <Input
                      id="btc_deposit_address"
                      defaultValue={siteSettings.btc_deposit_address || ''}
                      onBlur={(e) => handleSiteSettingsUpdate('btc_deposit_address', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="qr_code_url">QR Code URL</Label>
                    <Input
                      id="qr_code_url"
                      defaultValue={siteSettings.qr_code_url || ''}
                      onBlur={(e) => handleSiteSettingsUpdate('qr_code_url', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showKycDialog} onOpenChange={setShowKycDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>KYC Documents - {selectedKyc?.profiles?.full_name}</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">ID Document</h3>
                <img src={selectedKyc?.id_document_url} alt="ID Document" className="w-full rounded-lg" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Selfie</h3>
                <img src={selectedKyc?.selfie_url} alt="Selfie" className="w-full rounded-lg" />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {walletAction === 'add' ? 'Add Funds to' : 'Deduct Funds from'} {selectedUser?.full_name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <Button onClick={handleWalletAdjustment} className="w-full">
                {walletAction === 'add' ? 'Add' : 'Deduct'} Funds
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
