
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to auth page instead of dashboard
    navigate("/auth");
  }, [navigate]);
  
  return <div>Redirecting to sign in...</div>;
}
