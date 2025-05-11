
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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import EmailMarketing from "./pages/EmailMarketing";
import EmailCampaign from "./pages/EmailCampaign";
import { useState, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Error boundary for catching rendering errors
const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-semibold text-red-800">Something went wrong</h2>
        <p className="mt-2 text-red-700">{error.message || "Unknown error"}</p>
        <pre className="mt-4 bg-red-100 p-2 rounded text-xs overflow-auto max-h-40">
          {error.stack}
        </pre>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

// Component to wrap routes with error handling
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error);
      setError(event.error);
      // Prevent the browser from showing the default error dialog
      event.preventDefault();
    };
    
    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);
  
  if (error) {
    return <ErrorFallback error={error} />;
  }
  
  return <>{children}</>;
};

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  // Show loading indicator while authentication state is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-primary border-solid rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

// Wrapper for routes that need auth context
const AppRoutes = () => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

const App = () => {
  console.log("App rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
