
import AuthCard from "@/components/auth/AuthCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Auth() {
  const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(false);
  const { user, loading } = useAuth();
  
  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        // Simple ping to check if Supabase is properly configured
        const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        setIsSupabaseConfigured(error === null);
      } catch (e) {
        setIsSupabaseConfigured(false);
      }
    };
    
    checkSupabaseConfig();
  }, []);
  
  // If user is already logged in, redirect to dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      {!isSupabaseConfigured && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Connection Issue</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              Cannot connect to Supabase. Please check:
            </p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Your internet connection</li>
              <li>Supabase project is up and running</li>
              <li>Environment variables are set correctly</li>
            </ol>
            <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
              Refresh after fixing
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <AuthCard />
    </div>
  );
}
