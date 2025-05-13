
import React from "react";

const AuthBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col auth-layout-pattern relative">
      {/* Animated gradient circles in the background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-spin-slow"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-spin-slow"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-subtle"></div>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        {children}
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 RAG-Spring • Secure Authentication System</p>
      </footer>
    </div>
  );
};

export default AuthBackground;
