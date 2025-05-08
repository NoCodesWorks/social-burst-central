
import AuthCard from "@/components/auth/AuthCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Auth() {
  // Check if Supabase environment variables are set
  const isSupabaseConfigured = 
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY;

  return (
    <div className="container flex h-screen flex-col items-center justify-center">
      {!isSupabaseConfigured && (
        <Alert variant="destructive" className="mb-6 max-w-md">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Missing Configuration</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              Supabase environment variables are missing. To fix this:
            </p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Click on the Supabase button at the top right</li>
              <li>Connect to your Supabase project</li>
              <li>Set the required environment variables</li>
            </ol>
            <Button className="mt-4" variant="outline" onClick={() => window.location.reload()}>
              Refresh after configuration
            </Button>
          </AlertDescription>
        </Alert>
      )}
      <AuthCard />
    </div>
  );
}
