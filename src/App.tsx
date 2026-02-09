import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Remittances from "@/pages/Remittances";
import Deposits from "@/pages/Deposits";
import Matching from "@/pages/Matching";
import PaymentLines from "@/pages/PaymentLines";
import Watchlist from "@/pages/Watchlist";
import Rules from "@/pages/Rules";
import Settings from "@/pages/Settings";
import AuditLog from "@/pages/AuditLog";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/remittances" element={<Remittances />} />
              <Route path="/deposits" element={<Deposits />} />
              <Route path="/matching" element={<Matching />} />
              <Route path="/payment-lines" element={<PaymentLines />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/audit-log" element={<AuditLog />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
