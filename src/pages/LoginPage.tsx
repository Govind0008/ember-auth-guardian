
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import AuthBackground from "@/components/AuthBackground";
import EmailLoginForm from "@/components/EmailLoginForm";
import OtpVerificationForm from "@/components/OtpVerificationForm";
import { useAuth } from "@/contexts/AuthContext";

enum AuthStep {
  EMAIL_FORM,
  OTP_VERIFICATION
}

const LoginPage = () => {
  const [authStep, setAuthStep] = useState<AuthStep>(AuthStep.EMAIL_FORM);
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");
  const { isAuthenticated, userRole } = useAuth();

  // If already authenticated, redirect to the appropriate dashboard
  if (isAuthenticated) {
    if (userRole === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/user/dashboard" replace />;
    }
  }

  const handleOtpRequested = (email: string) => {
    setEmail(email);
    setAuthStep(AuthStep.OTP_VERIFICATION);
  };

  const handleBack = () => {
    setAuthStep(AuthStep.EMAIL_FORM);
  };

  return (
    <AuthBackground>
      {authStep === AuthStep.EMAIL_FORM && (
        <EmailLoginForm onOtpRequested={handleOtpRequested} />
      )}
      
      {authStep === AuthStep.OTP_VERIFICATION && (
        <OtpVerificationForm 
          email={email} 
          role={role}
          onBack={handleBack} 
        />
      )}
    </AuthBackground>
  );
};

export default LoginPage;
