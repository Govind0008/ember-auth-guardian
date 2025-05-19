
import React, { useState, useEffect, useRef } from "react";
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
  const [showParticles, setShowParticles] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // For floating particles animation
  useEffect(() => {
    setShowParticles(true);
    return () => setShowParticles(false);
  }, []);
  
  const particleCount = 15;
  
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
    const card = cardRef.current;
    card?.classList.add("animate-pulse-subtle");
    
    try {
      // Create a wave effect
      createRippleEffect();
      
      // Create floating sparkles
      createSparkleEffects();
      
      // Simulate login success - we'll use hardcoded values for testing
      // In real app, this would be replaced with the actual login call
      if (data.email === "test@example.com" || data.email === "user@example.com") {
        // Success animation
        const successElement = document.createElement("div");
        successElement.className = "absolute inset-0 bg-green-500/20 rounded-lg animate-blur-in z-10";
        card?.appendChild(successElement);
        
        setTimeout(() => {
          if (successElement.parentNode === card) {
            card?.removeChild(successElement);
          }
          onOtpRequested(data.email);
        }, 1200);
      } else {
        // For demo purposes, still allow login with any email
        setTimeout(() => {
          onOtpRequested(data.email);
        }, 1200);
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        card?.classList.remove("animate-pulse-subtle");
      }, 1000);
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
    setTimeout(() => {
      if (circle.parentNode === button) {
        circle.remove();
      }
    }, 600);
  };
  
  const createSparkleEffects = () => {
    const card = cardRef.current;
    if (!card) return;
    
    for (let i = 0; i < 10; i++) {
      const sparkle = document.createElement("div");
      const size = Math.random() * 10 + 5; // 5-15px
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.left = `${Math.random() * 100}%`;
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.animationDelay = `${Math.random() * 1}s`;
      
      sparkle.classList.add(
        "absolute", "rounded-full", "bg-accent/50", "animate-sparkle", "pointer-events-none"
      );
      
      card.appendChild(sparkle);
      setTimeout(() => {
        if (sparkle.parentNode === card) {
          card.removeChild(sparkle);
        }
      }, 1500);
    }
  };

  return (
    <Card 
      ref={cardRef} 
      className="w-full max-w-md border-0 shadow-2xl login-card relative overflow-hidden backdrop-blur-sm bg-white/80"
    >
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-600/30 to-pink-500/30 rounded-full filter blur-xl animate-float"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-blue-500/30 to-violet-400/30 rounded-full filter blur-xl animate-float-slow-reverse"></div>
      
      {/* Floating particles */}
      {showParticles && Array.from({ length: particleCount }).map((_, index) => (
        <div 
          key={index}
          className="absolute rounded-full bg-white/40 animate-rise pointer-events-none"
          style={{
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 100}%`,
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      
      {/* Glowing ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] rounded-full border-2 border-primary/20 animate-pulse-ring pointer-events-none"></div>
      
      <CardHeader className="space-y-1 relative z-10">
        <div className={`mx-auto bg-gradient-to-br from-violet-600 to-fuchsia-500 w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-violet-500/30 transition-all duration-500 transform ${isFocused ? 'scale-110 rotate-3' : 'scale-100'}`}>
          <Mail className="h-10 w-10 text-white animate-float" />
        </div>
        <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">Welcome Back</CardTitle>
        <CardDescription className="text-center text-base">
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
                    <FormLabel className="text-lg font-medium">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        {...field} 
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="h-14 text-lg transition-all duration-500 bg-white/70 backdrop-blur-sm border-2 hover:border-primary focus:border-violet-500 focus:ring-4 focus:ring-violet-500/30 rounded-xl shadow-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold relative overflow-hidden submit-button bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/30 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full"></div>
                  <span>Sending Code...</span>
                </div>
              ) : "Continue with Email"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground pt-2">
              <p>Test credentials: <span className="font-semibold">test@example.com</span></p>
            </div>
          </form>
        </Form>
        
        {/* Animated geometric elements */}
        <div className="absolute top-1/4 left-[10%] w-3 h-3 bg-purple-400 rounded-full animate-float-3d"></div>
        <div className="absolute bottom-1/4 right-[15%] w-4 h-4 bg-pink-400 rounded-full animate-float-3d-reverse"></div>
        <div className="absolute top-3/4 left-1/4 transform w-2 h-2 bg-blue-400 rounded-full animate-bounce-slight"></div>
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
