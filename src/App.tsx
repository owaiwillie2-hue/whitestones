import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import KYCVerification from "./pages/KYCVerification";
import NotFound from "./pages/NotFound";
import Deposit from "./pages/dashboard/Deposit";
import Withdraw from "./pages/dashboard/Withdraw";
import Settings from "./pages/dashboard/Settings";
import Cryptocurrency from "./pages/investments/Cryptocurrency";
import RealEstate from "./pages/investments/RealEstate";
import OilGas from "./pages/investments/OilGas";
import NFT from "./pages/investments/NFT";
import Retirement from "./pages/investments/Retirement";
import Loans from "./pages/investments/Loans";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/deposit" element={<Deposit />} />
          <Route path="/dashboard/withdraw" element={<Withdraw />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/transactions" element={<Dashboard />} />
          <Route path="/dashboard/investments" element={<Dashboard />} />
          <Route path="/dashboard/plans" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<Settings />} />
          <Route path="/dashboard/referrals" element={<Dashboard />} />
          <Route path="/dashboard/activity" element={<Settings />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
          <Route path="/investments/cryptocurrency" element={<Cryptocurrency />} />
          <Route path="/investments/real-estate" element={<RealEstate />} />
          <Route path="/investments/oil-gas" element={<OilGas />} />
          <Route path="/investments/nft" element={<NFT />} />
          <Route path="/investments/retirement" element={<Retirement />} />
          <Route path="/investments/loans" element={<Loans />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
