
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ArrowLeft, Calendar, FileText, Search, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Sample data for charts
const usageData = [
  { name: "Mon", queries: 4 },
  { name: "Tue", queries: 6 },
  { name: "Wed", queries: 8 },
  { name: "Thu", queries: 5 },
  { name: "Fri", queries: 10 },
  { name: "Sat", queries: 3 },
  { name: "Sun", queries: 2 },
];

const documentData = [
  { name: "Financial", value: 35 },
  { name: "Legal", value: 25 },
  { name: "Technical", value: 20 },
  { name: "Reports", value: 15 },
  { name: "Others", value: 5 },
];

const queryTypeData = [
  { name: "Summary", value: 40 },
  { name: "Analysis", value: 30 },
  { name: "Comparison", value: 15 },
  { name: "Extraction", value: 15 },
];

const COLORS = ['#4a6cf7', '#6e59a5', '#9b87f5', '#d6bcfa', '#c4b5fd'];
const PIE_COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899'];

const UserAnalyticsPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background animation effect
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
    
    // Wave animation
    const waves = [
      { color: 'rgba(99, 102, 241, 0.05)', amplitude: 50, frequency: 0.02, speed: 0.01 },
      { color: 'rgba(139, 92, 246, 0.05)', amplitude: 30, frequency: 0.03, speed: 0.02 },
      { color: 'rgba(217, 70, 239, 0.05)', amplitude: 40, frequency: 0.01, speed: 0.015 }
    ];
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        
        ctx.moveTo(0, canvas.height / 2);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + canvas.height / 2;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      });
      
      time++;
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Canvas for background animation */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Header with glassmorphism */}
      <header className="bg-card/40 backdrop-blur-md border-b py-4 shadow-md sticky top-0 z-50">
        <div className="container flex items-center">
          <Link to="/user/dashboard" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Queries",
              value: "128",
              icon: <Search className="h-5 w-5" />,
              color: "bg-blue-100 text-blue-700",
              change: "+12% from last week"
            },
            {
              title: "Documents Analyzed",
              value: "36",
              icon: <FileText className="h-5 w-5" />,
              color: "bg-purple-100 text-purple-700",
              change: "+5 new documents"
            },
            {
              title: "Avg. Response Time",
              value: "1.2s",
              icon: <Clock className="h-5 w-5" />,
              color: "bg-green-100 text-green-700",
              change: "20% faster"
            },
            {
              title: "Usage Trend",
              value: "Increasing",
              icon: <TrendingUp className="h-5 w-5" />,
              color: "bg-amber-100 text-amber-700",
              change: "Consistent growth"
            }
          ].map((card, index) => (
            <Card key={index} className="animate-fade-in-up backdrop-blur-sm bg-white/70 border-white/20" style={{animationDelay: `${index * 100}ms`}}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <div className={`w-9 h-9 rounded-full ${card.color} flex items-center justify-center`}>
                    {card.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Usage Chart */}
          <Card className="animate-fade-in-up [animation-delay:400ms] backdrop-blur-sm bg-white/70 border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Weekly Usage</CardTitle>
                  <CardDescription>Number of queries per day</CardDescription>
                </div>
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="queries" stroke="#8884d8" fillOpacity={1} fill="url(#colorQueries)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Document Types Chart */}
          <Card className="animate-fade-in-up [animation-delay:500ms] backdrop-blur-sm bg-white/70 border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Categories</CardTitle>
                  <CardDescription>Distribution of document types</CardDescription>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Query Type Distribution */}
        <Card className="animate-fade-in-up [animation-delay:600ms] backdrop-blur-sm bg-white/70 border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Query Type Distribution</CardTitle>
                <CardDescription>Types of queries performed</CardDescription>
              </div>
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={queryTypeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(0,0,0,0.1)" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Bar dataKey="value">
                    {queryTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default UserAnalyticsPage;
