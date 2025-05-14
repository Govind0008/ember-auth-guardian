
import React, { useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, FileSearch, BarChart2, Settings, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    let animationId: number;
    
    // 3D grid animation
    const points: { x: number; y: number; z: number; vx: number; vy: number; vz: number; }[] = [];
    const POINT_COUNT = 100;
    const MAX_DEPTH = 1000;
    
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * MAX_DEPTH,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        vz: Math.random() * 2 + 2
      });
    }
    
    const colors = ['rgba(74, 108, 247, ', 'rgba(111, 89, 165, ', 'rgba(155, 135, 245, ', 'rgba(214, 188, 250, '];
    
    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const connectedPoints = [];
      
      // Update and draw points
      for (let i = 0; i < POINT_COUNT; i++) {
        const p = points[i];
        
        // Update position
        p.z -= p.vz;
        p.x += p.vx;
        p.y += p.vy;
        
        // Reset if out of bounds
        if (p.z < 1) {
          p.z = MAX_DEPTH;
          p.x = Math.random() * canvas.width - canvas.width / 2;
          p.y = Math.random() * canvas.height - canvas.height / 2;
        }
        
        // Project 3D point to 2D
        const scale = canvas.width / p.z;
        const x2d = centerX + p.x * scale;
        const y2d = centerY + p.y * scale;
        const r = Math.max(0.5, 5 - p.z / 100);
        
        // Check if point is in visible area
        if (x2d >= 0 && x2d <= canvas.width && y2d >= 0 && y2d <= canvas.height) {
          const colorIndex = Math.floor((1 - p.z / MAX_DEPTH) * colors.length);
          const opacity = Math.max(0.2, 1 - p.z / MAX_DEPTH);
          ctx.fillStyle = colors[colorIndex % colors.length] + opacity + ')';
          
          // Draw point
          ctx.beginPath();
          ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
          ctx.fill();
          
          // Store for connection lines
          connectedPoints.push({ x: x2d, y: y2d, z: p.z });
        }
      }
      
      // Draw connections between nearby points
      ctx.strokeStyle = 'rgba(155, 135, 245, 0.2)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < connectedPoints.length; i++) {
        const p1 = connectedPoints[i];
        
        for (let j = i + 1; j < connectedPoints.length; j++) {
          const p2 = connectedPoints[j];
          const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Canvas for 3D background animation */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Header with glassmorphism effect */}
      <header className="bg-card/40 backdrop-blur-md border-b py-4 shadow-md sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center animate-pulse-subtle">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-card/60 backdrop-blur-md px-3 py-2 rounded-full">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm">{userEmail}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="hover:bg-destructive/10 transition-colors">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Main Features Cards */}
          <Link to="/user/pdf-query" className="block">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-sm border border-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2">
                  <FileSearch className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle>PDF Query</CardTitle>
                <CardDescription>Search and analyze PDF documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Ask questions about your documents and get instant answers with AI-powered search.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-blue-500/10 border-blue-500/30 text-blue-700 hover:bg-blue-500/20">
                    Query Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/analytics" className="block">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up [animation-delay:100ms] bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-sm border border-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2">
                  <BarChart2 className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Track your usage and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">View detailed analytics on your document queries and usage patterns.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-purple-500/10 border-purple-500/30 text-purple-700 hover:bg-purple-500/20">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/reports" className="block">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up [animation-delay:200ms] bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-sm border border-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-2">
                  <FileText className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate custom reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Create and export comprehensive reports from your document analysis.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-green-500/10 border-green-500/30 text-green-700 hover:bg-green-500/20">
                    Generate Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/settings" className="block">
            <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 animate-fade-in-up [animation-delay:300ms] bg-gradient-to-br from-white/70 to-white/20 backdrop-blur-sm border border-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-2">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Customize your experience and manage account settings.</p>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-amber-500/10 border-amber-500/30 text-amber-700 hover:bg-amber-500/20">
                    Manage Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity Section with animated gradients */}
        <div className="mt-12 relative overflow-hidden rounded-xl">
          {/* Animated gradient background */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-600/30 to-blue-400/30 rounded-full filter blur-2xl animate-float-slow"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-pink-500/30 to-purple-400/30 rounded-full filter blur-2xl animate-float-slow-reverse"></div>
          
          <div className="relative z-10 p-6 backdrop-blur-md bg-white/30 rounded-xl border border-white/20 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-2">Recent Activity</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </h2>
            
            <div className="space-y-4">
              {[
                { 
                  title: "PDF Query", 
                  description: "Queried 'Financial Report 2024.pdf'", 
                  timestamp: "Just now",
                  icon: <FileSearch className="h-4 w-4 text-blue-500" />,
                  color: "bg-blue-500/10"
                },
                { 
                  title: "Report Generated", 
                  description: "Created 'Q2 Summary Report'", 
                  timestamp: "2 hours ago",
                  icon: <FileText className="h-4 w-4 text-green-500" />,
                  color: "bg-green-500/10"
                },
                { 
                  title: "Login", 
                  description: "Successful login to your account", 
                  timestamp: "Today",
                  icon: <User className="h-4 w-4 text-purple-500" />,
                  color: "bg-purple-500/10"
                }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/20 hover:bg-white/10 transition-colors rounded-md p-2 animate-fade-in-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${activity.color} flex items-center justify-center mr-3`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer with glassmorphism */}
      <footer className="bg-card/40 backdrop-blur-md border-t py-4 mt-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 RAG-Spring • Secure Document Analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
