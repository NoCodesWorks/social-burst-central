
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SignUpFormProps {
  setError: (error: string | null) => void;
  error: string | null;
}

export default function SignUpForm({ setError, error }: SignUpFormProps) {
  const { signUp, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!authData.name) {
      setError("Please enter your name");
      return;
    }
    
    try {
      await signUp(authData.email, authData.password, authData.name);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4 pt-4">
      {error && (
        <Alert className="mb-4 bg-destructive/15 text-destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          required
          value={authData.name}
          onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="signup-email"
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
        <Label htmlFor="signup-password">Password</Label>
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
            id="signup-password"
            type={showPassword ? "text" : "password"}
            required
            value={authData.password}
            onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
          />
        </div>
        <p className="text-sm text-gray-500">Password must be at least 8 characters</p>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
