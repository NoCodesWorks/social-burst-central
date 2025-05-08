
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import CreatePost from "./pages/CreatePost";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CustomizeDashboard from "./pages/CustomizeDashboard";
import { AuthProvider } from "./contexts/AuthContext";
import EmailMarketing from "./pages/EmailMarketing";
import EmailCampaign from "./pages/EmailCampaign";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Check if user is authenticated by looking at localStorage
  // This will be replaced by the real auth check once we implement Supabase
  const session = localStorage.getItem('supabase.auth.token');
  
  if (!session) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes with layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="email-marketing" element={<EmailMarketing />} />
              <Route path="email-campaign/:id?" element={<EmailCampaign />} />
              <Route path="customize-dashboard" element={<CustomizeDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
