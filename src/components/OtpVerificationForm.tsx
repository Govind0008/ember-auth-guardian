
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
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
      await verifyOtp(email, data.otp, role);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-lg animate-fade-in-up">
      <CardHeader className="space-y-1">
        <Button 
          variant="ghost" 
          className="w-fit -ml-2 mb-2" 
          onClick={onBack}
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
        <CardTitle className="text-2xl font-bold">Enter Verification Code</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-4">
                    <FormLabel className="text-center">One-Time Passcode</FormLabel>
                    <FormControl>
                      <InputOTP 
                        maxLength={6}
                        pattern="^[0-9]+$"
                        {...field}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Code expires in <span className={`font-medium ${timeLeft < 60 ? "text-destructive" : ""}`}>{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code? <Button variant="link" className="p-0 h-auto">Resend OTP</Button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default OtpVerificationForm;
