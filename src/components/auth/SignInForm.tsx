
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignInFormProps {
  setError: (error: string | null) => void;
  error: string | null;
}

export default function SignInForm({ setError, error }: SignInFormProps) {
  const { signIn, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signIn(authData.email, authData.password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4 pt-4">
      {error && (
        <Alert className="mb-4 bg-destructive/15 text-destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            required
            value={authData.email}
            onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button variant="link" className="p-0 h-auto text-xs">
            Forgot password?
          </Button>
        </div>
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            value={authData.password}
            onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
