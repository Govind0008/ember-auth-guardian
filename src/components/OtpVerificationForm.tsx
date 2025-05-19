
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Define form schema with validation
const formSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6),
});

type FormData = z.infer<typeof formSchema>;

interface OtpVerificationFormProps {
  email: string;
  role: "user" | "admin";
  onBack: () => void;
}

const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({ email, role, onBack }) => {
  const { verifyOtp } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Initialize form with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Timer for OTP expiry
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // For demo purposes, accept any 6-digit OTP
      // In real app, this would call the actual verifyOtp method
      
      // Animation for verification in progress
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For testing, use hardcoded values - success for "123456" or any code for test@example.com
      if (data.otp === "123456" || email === "test@example.com" || email === "user@example.com") {
        // Success animation
        setVerificationSuccess(true);
        
        // Wait for animation before redirecting
        setTimeout(() => {
          await verifyOtp(email, data.otp, role);
        }, 1000);
      } else {
        // Simulate verification and redirect anyway for demo purposes
        await verifyOtp(email, data.otp, role);
      }
    } catch (error) {
      console.error("OTP verification failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create sparkle effect
  const createSparkleEffect = () => {
    const container = document.querySelector(".otp-card");
    if (!container) return;
    
    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("div");
      const size = Math.random() * 10 + 2; // 2-12px
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
      
      sparkle.classList.add(
        "absolute", "rounded-full", "bg-green-400", "animate-sparkle", "pointer-events-none", "z-20"
      );
      
      container.appendChild(sparkle);
      setTimeout(() => {
        if (sparkle.parentNode === container) {
          container.removeChild(sparkle);
        }
      }, 2000);
    }
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-2xl animate-fade-in-up otp-card relative overflow-hidden backdrop-blur-sm bg-white/80">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-violet-600/30 to-fuchsia-500/30 rounded-full filter blur-xl animate-float"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/30 to-violet-400/30 rounded-full filter blur-xl animate-float-slow-reverse"></div>
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-0"></div>
      
      {/* Success overlay */}
      {verificationSuccess && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/20 backdrop-blur-sm z-30 animate-blur-in">
          <CheckCircle className="w-20 h-20 text-green-500 animate-bounce-slight" />
          <p className="text-xl font-bold text-green-700 mt-4">Verification Successful!</p>
          <p className="text-green-600">Redirecting to dashboard...</p>
        </div>
      )}
      
      <CardHeader className="space-y-1 relative z-10">
        <Button 
          variant="ghost" 
          className="w-fit -ml-2 mb-2 hover:bg-white/50 hover:text-violet-700 transition-colors" 
          onClick={onBack}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">Enter Verification Code</CardTitle>
        <CardDescription className="text-base">
          We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-6">
                    <FormLabel className="text-center text-lg font-medium">One-Time Passcode</FormLabel>
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-xl blur-lg animate-pulse-ring"></div>
                      <FormControl>
                        <InputOTP 
                          maxLength={6}
                          pattern="^[0-9]+$"
                          {...field}
                          className="gap-2"
                        >
                          <InputOTPGroup className="gap-2">
                            <InputOTPSlot index={0} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                            <InputOTPSlot index={1} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                            <InputOTPSlot index={2} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                            <InputOTPSlot index={3} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                            <InputOTPSlot index={4} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                            <InputOTPSlot index={5} className="h-14 w-14 rounded-lg border-2 shadow-sm shadow-violet-500/10 transition-all duration-300" />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center text-base mt-4">
                <p className="text-muted-foreground">
                  Code expires in <span className={`font-medium ${timeLeft < 60 ? "text-destructive" : "text-violet-600"}`}>{formatTime(timeLeft)}</span>
                </p>
                <p className="mt-3 text-sm">For testing, use code: <span className="font-semibold text-violet-700">123456</span></p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold relative overflow-hidden mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/30 rounded-xl"
              disabled={isSubmitting || verificationSuccess}
              onClick={() => !isSubmitting && !verificationSuccess && createSparkleEffect()}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full"></div>
                  <span>Verifying...</span>
                </div>
              ) : "Verify OTP"}
            </Button>
          </form>
        </Form>
        
        {/* Animated dots */}
        <div className="absolute top-1/3 left-[5%] w-2.5 h-2.5 bg-violet-400/60 rounded-full animate-float-3d"></div>
        <div className="absolute bottom-1/3 right-[5%] w-3.5 h-3.5 bg-fuchsia-400/60 rounded-full animate-float-3d-reverse"></div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center relative z-10">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code? <Button variant="link" className="p-0 h-auto font-semibold text-violet-600 hover:text-violet-700">Resend OTP</Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default OtpVerificationForm;
