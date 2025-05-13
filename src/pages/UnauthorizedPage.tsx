
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, X } from "lucide-react";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const goBack = () => {
    // Navigate to the appropriate dashboard based on role
    if (userRole === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="bg-destructive/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <X className="h-10 w-10 text-destructive" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Unauthorized Access</h1>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={goBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go to Dashboard
        </Button>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
