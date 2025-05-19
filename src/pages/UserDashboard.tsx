
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, FileSearch, BarChart2, Settings, FileText, Home } from "lucide-react";
import { Link } from "react-router-dom";

const UserDashboard: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    const POINT_COUNT = 150; // Increased point count
    const MAX_DEPTH = 1200;
    
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * MAX_DEPTH,
        vx: Math.random() * 0.4 - 0.2,
        vy: Math.random() * 0.4 - 0.2,
        vz: Math.random() * 2 + 1.5
      });
    }
    
    // Enhanced colors for a more vibrant look
    const colors = [
      'rgba(147, 51, 234, ', // Violet
      'rgba(192, 38, 211, ', // Fuchsia
      'rgba(172, 54, 255, ', // Purple
      'rgba(217, 70, 239, ', // Pink
    ];
    
    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const connectedPoints = [];
      
      // Mouse interaction
      const mouseX = mousePosition.x - centerX;
      const mouseY = mousePosition.y - centerY;
      
      // Update and draw points
      for (let i = 0; i < POINT_COUNT; i++) {
        const p = points[i];
        
        // Update position with slight mouse influence
        p.z -= p.vz;
        p.x += p.vx + (mouseX * 0.0001);
        p.y += p.vy + (mouseY * 0.0001);
        
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
      ctx.strokeStyle = 'rgba(172, 54, 255, 0.15)';
      ctx.lineWidth = 0.7;
      
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
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Canvas for 3D background animation */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Header with glassmorphism effect */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 py-4 shadow-lg sticky top-0 z-50">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 animate-pulse-subtle">
              <Home className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/30 shadow-inner">
              <User className="h-4 w-4 text-violet-500" />
              <span className="text-sm font-medium">{userEmail || "test@example.com"}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout} 
              className="hover:bg-white/20 hover:text-violet-700 transition-all border border-white/30 bg-white/10 backdrop-blur-lg"
            >
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
          {[
            {
              title: "PDF Query",
              description: "Search and analyze PDF documents",
              icon: <FileSearch className="h-7 w-7 text-violet-500" />,
              color: "from-violet-500/10 to-fuchsia-500/5",
              buttonColor: "bg-violet-500/10 border-violet-500/30 text-violet-700 hover:bg-violet-500/20",
              path: "/user/pdf-query",
              delay: "0ms"
            },
            {
              title: "Analytics",
              description: "Track usage and insights",
              icon: <BarChart2 className="h-7 w-7 text-fuchsia-500" />,
              color: "from-fuchsia-500/10 to-purple-500/5",
              buttonColor: "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-700 hover:bg-fuchsia-500/20",
              path: "/user/analytics",
              delay: "100ms"
            },
            {
              title: "Reports",
              description: "Generate custom reports",
              icon: <FileText className="h-7 w-7 text-purple-500" />,
              color: "from-purple-500/10 to-indigo-500/5",
              buttonColor: "bg-purple-500/10 border-purple-500/30 text-purple-700 hover:bg-purple-500/20",
              path: "/user/reports",
              delay: "200ms"
            },
            {
              title: "Settings",
              description: "Configure preferences",
              icon: <Settings className="h-7 w-7 text-indigo-500" />,
              color: "from-indigo-500/10 to-blue-500/5",
              buttonColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 hover:bg-indigo-500/20",
              path: "/user/settings",
              delay: "300ms"
            }
          ].map((feature, index) => (
            <Link 
              to={feature.path} 
              className="block group" 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card 
                className={`h-full transition-all duration-500 hover:shadow-2xl hover:shadow-violet-500/10 hover:scale-[1.03] animate-fade-in-up [animation-delay:${feature.delay}] border border-white/20 bg-gradient-to-br ${feature.color} backdrop-blur-md relative overflow-hidden`}
              >
                {/* Animated background elements */}
                <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Animated corner glows */}
                <div className={`absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-violet-600/10 to-fuchsia-500/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100`}></div>
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-fuchsia-500/10 to-violet-600/5 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200`}></div>
                
                <CardHeader className="pb-2 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-white/80 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-violet-800 transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-sm">
                    {index === 0 && "Ask questions about your documents and get instant answers with AI-powered search."}
                    {index === 1 && "View detailed analytics on your document queries and usage patterns."}
                    {index === 2 && "Create and export comprehensive reports from your document analysis."}
                    {index === 3 && "Customize your experience and manage account settings."}
                  </p>
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className={`w-full ${feature.buttonColor} shadow group-hover:shadow-md transition-all duration-500`}
                    >
                      {index === 0 && "Query Documents"}
                      {index === 1 && "View Analytics"}
                      {index === 2 && "Generate Reports"}
                      {index === 3 && "Manage Settings"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity Section with animated gradients */}
        <div className="mt-12 relative overflow-hidden rounded-xl">
          {/* Animated gradient background */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-violet-600/20 to-fuchsia-400/20 rounded-full filter blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500/20 to-indigo-400/20 rounded-full filter blur-3xl animate-float-slow-reverse"></div>
          
          <div className="relative z-10 p-8 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              <span className="mr-2">Recent Activity</span>
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
            </h2>
            
            <div className="space-y-4">
              {[
                { 
                  title: "PDF Query", 
                  description: "Queried 'Financial Report 2024.pdf'", 
                  timestamp: "Just now",
                  icon: <FileSearch className="h-5 w-5 text-violet-500" />,
                  color: "bg-violet-500/10"
                },
                { 
                  title: "Report Generated", 
                  description: "Created 'Q2 Summary Report'", 
                  timestamp: "2 hours ago",
                  icon: <FileText className="h-5 w-5 text-fuchsia-500" />,
                  color: "bg-fuchsia-500/10"
                },
                { 
                  title: "Login", 
                  description: "Successful login to your account", 
                  timestamp: "Today",
                  icon: <User className="h-5 w-5 text-purple-500" />,
                  color: "bg-purple-500/10"
                }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/10 hover:bg-white/5 transition-colors rounded-xl p-3 animate-fade-in-up group"
                  style={{animationDelay: `${index * 100 + 400}ms`}}
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{activity.title}</p>
                      <p className="text-base text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { label: "Documents Analyzed", value: "24", color: "from-violet-500/20 to-fuchsia-500/10" },
                { label: "Total Queries", value: "156", color: "from-fuchsia-500/20 to-purple-500/10" },
                { label: "Reports Generated", value: "8", color: "from-purple-500/20 to-indigo-500/10" },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`rounded-xl p-4 bg-gradient-to-br ${stat.color} border border-white/20 backdrop-blur-md animate-fade-in-up flex flex-col items-center justify-center`}
                  style={{animationDelay: `${index * 100 + 700}ms`}}
                >
                  <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer with glassmorphism */}
      <footer className="bg-white/10 backdrop-blur-xl border-t border-white/20 py-4 mt-8">
        <div className="container text-center">
          <p className="text-base">
            © 2025 <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent font-semibold">RAG-Spring</span> • Secure Document Analysis
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;
