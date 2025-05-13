
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col auth-layout-pattern">
      {/* Animated gradient circles in the background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-spin-slow"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-spin-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-subtle"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 bg-primary/10 rounded-full px-6 py-2 text-sm font-medium text-primary animate-fade-in-up">
            Secure Authentication System
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up [animation-delay:100ms]">
            RAG-Spring: Advanced Passwordless Authentication
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 animate-fade-in-up [animation-delay:200ms]">
            Experience secure, passwordless authentication with email OTP verification and JWT-based session management.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
            <Button size="lg" onClick={() => navigate("/login")}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Features section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            {
              title: "Passwordless Login",
              description: "Secure authentication using email OTP verification without storing passwords.",
              delay: "400ms"
            },
            {
              title: "Role-Based Access",
              description: "Separate authentication workflows for administrators and regular users.",
              delay: "500ms"
            },
            {
              title: "JWT Authentication",
              description: "Stateless session management with secure JSON Web Tokens.",
              delay: "600ms"
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`bg-card p-6 rounded-xl border animate-fade-in-up [animation-delay:${feature.delay}]`}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 RAG-Spring • Secure Authentication System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
