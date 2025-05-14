
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { Mail } from "lucide-react";

// Define form schema with validation
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormData = z.infer<typeof formSchema>;

interface EmailLoginFormProps {
  onOtpRequested: (email: string) => void;
}

const EmailLoginForm: React.FC<EmailLoginFormProps> = ({ onOtpRequested }) => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Initialize form with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Add vibration effect to card
    const card = document.querySelector(".login-card");
    card?.classList.add("animate-pulse-subtle");
    
    try {
      // Create a wave effect
      createRippleEffect();
      
      const result = await login(data.email, "user");
      if (result) {
        // Success animation
        const successElement = document.createElement("div");
        successElement.className = "absolute inset-0 bg-green-500/20 rounded-lg animate-ping z-10";
        card?.appendChild(successElement);
        
        setTimeout(() => {
          card?.removeChild(successElement);
          onOtpRequested(data.email);
        }, 800);
      }
    } finally {
      setIsSubmitting(false);
      setTimeout(() => card?.classList.remove("animate-pulse-subtle"), 1000);
    }
  };
  
  const createRippleEffect = () => {
    const button = document.querySelector(".submit-button");
    if (!button) return;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${0}px`;
    circle.style.top = `${0}px`;
    circle.classList.add("absolute", "rounded-full", "bg-white/30", "animate-ripple", "pointer-events-none");
    
    const ripple = button.getElementsByClassName("animate-ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-2xl login-card relative overflow-hidden backdrop-blur-sm bg-white/80">
      {/* Animated background elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-600/30 to-pink-500/30 rounded-full filter blur-xl animate-float-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500/30 to-cyan-400/30 rounded-full filter blur-xl animate-float-slow-reverse"></div>
      
      <CardHeader className="space-y-1 relative z-10">
        <div className={`mx-auto bg-gradient-to-br from-purple-600 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-glow transition-all duration-300 transform ${isFocused ? 'scale-110' : 'scale-100'}`}>
          <Mail className="h-10 w-10 text-white animate-pulse-subtle" />
        </div>
        <CardTitle className="text-2xl text-center font-bold text-gradient animate-pulse-glow">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive a one-time login code
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        {...field} 
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="h-12 text-base transition-all duration-300 bg-white/50 backdrop-blur-sm border-2 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold relative overflow-hidden submit-button bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Sending Code...</span>
                </div>
              ) : "Continue with Email"}
            </Button>
          </form>
        </Form>
        
        {/* Animated dots */}
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float-3d"></div>
        <div className="absolute top-3/4 right-1/4 transform -translate-y-1/2 w-3 h-3 bg-pink-400 rounded-full animate-float-3d-reverse"></div>
        <div className="absolute bottom-1/4 left-1/3 transform w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce-subtle"></div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-center relative z-10">
        <p className="text-sm text-muted-foreground">
          Secure, passwordless authentication
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailLoginForm;
