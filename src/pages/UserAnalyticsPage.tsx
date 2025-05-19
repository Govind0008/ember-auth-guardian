
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, ArrowLeft, Calendar, FileText, Search, TrendingUp, Clock, Eye, Zap, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

// Sample data for charts
const usageData = [
  { name: "Mon", queries: 4, documents: 2 },
  { name: "Tue", queries: 6, documents: 3 },
  { name: "Wed", queries: 8, documents: 4 },
  { name: "Thu", queries: 5, documents: 2 },
  { name: "Fri", queries: 10, documents: 5 },
  { name: "Sat", queries: 3, documents: 1 },
  { name: "Sun", queries: 2, documents: 1 },
];

const documentData = [
  { name: "Financial", value: 35, color: "#9333EA" }, // Violet
  { name: "Legal", value: 25, color: "#C026D3" },    // Fuchsia
  { name: "Technical", value: 20, color: "#7C3AED" }, // Purple
  { name: "Reports", value: 15, color: "#6366F1" },  // Indigo
  { name: "Others", value: 5, color: "#8B5CF6" },    // Violet/purple
];

const queryTypeData = [
  { name: "Summary", value: 40, color: "#9333EA" },
  { name: "Analysis", value: 30, color: "#C026D3" },
  { name: "Comparison", value: 15, color: "#7C3AED" },
  { name: "Extraction", value: 15, color: "#6366F1" },
];

const UserAnalyticsPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeTimeRange, setActiveTimeRange] = useState<string>("week");
  const [hoveredChart, setHoveredChart] = useState<number | null>(null);
  const [animateNumbers, setAnimateNumbers] = useState<boolean>(false);
  const [chartValues, setChartValues] = useState({
    totalQueries: 0,
    documents: 0,
    responseTime: 0,
    increase: 0
  });
  
  // Trigger number animation on page load
  useEffect(() => {
    setAnimateNumbers(true);
    
    const timer = setTimeout(() => {
      setChartValues({
        totalQueries: 128,
        documents: 36,
        responseTime: 1.2,
        increase: 24
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Animated number effect
  const AnimatedNumber = ({ value, suffix = "", decimals = 0 }: { value: number, suffix?: string, decimals?: number }) => {
    const [displayValue, setDisplayValue] = useState(0);
    
    useEffect(() => {
      if (!animateNumbers) return;
      
      let startValue = 0;
      const duration = 1500;
      const startTime = performance.now();
      
      const updateValue = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (value - startValue) * easeOutQuart;
        
        setDisplayValue(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateValue);
        }
      };
      
      requestAnimationFrame(updateValue);
    }, [value, animateNumbers]);
    
    return (
      <span>
        {displayValue.toFixed(decimals)}
        {suffix}
      </span>
    );
  };

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
      { color: 'rgba(147, 51, 234, 0.05)', amplitude: 50, frequency: 0.02, speed: 0.01 },
      { color: 'rgba(192, 38, 211, 0.05)', amplitude: 40, frequency: 0.03, speed: 0.02 },
      { color: 'rgba(124, 58, 237, 0.05)', amplitude: 60, frequency: 0.01, speed: 0.015 }
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
  
  // Create ripple effect
  const createRippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    
    circle.classList.add("absolute", "rounded-full", "bg-white", "opacity-30", "animate-ripple", "pointer-events-none");
    
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

  return (
    <div className="min-h-screen bg-background">
      {/* Canvas for background animation */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Header with glassmorphism */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 py-4 shadow-lg sticky top-0 z-50">
        <div className="container flex items-center">
          <Link to="/user/dashboard" className="mr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-violet-500/10 hover:text-violet-700 transition-all"
              onClick={(e) => createRippleEffect(e as any)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 animate-pulse-subtle">
              <BarChart2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">Analytics Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Time range selector */}
        <div className="flex justify-end mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 inline-flex">
            {['day', 'week', 'month', 'year'].map((range) => (
              <Button
                key={range}
                variant={activeTimeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={(e) => {
                  setActiveTimeRange(range);
                  createRippleEffect(e);
                }}
                className={`relative overflow-hidden ${activeTimeRange === range ? 'bg-violet-500 text-white' : 'hover:bg-white/10 text-foreground'}`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Queries",
              value: chartValues.totalQueries,
              icon: <Search className="h-5 w-5" />,
              color: "bg-violet-500/20 text-violet-700",
              change: "+12% from last week",
              gradient: "from-violet-500/20 to-violet-500/5"
            },
            {
              title: "Documents Analyzed",
              value: chartValues.documents,
              icon: <FileText className="h-5 w-5" />,
              color: "bg-fuchsia-500/20 text-fuchsia-700",
              change: "+5 new documents",
              gradient: "from-fuchsia-500/20 to-fuchsia-500/5"
            },
            {
              title: "Avg. Response Time",
              value: chartValues.responseTime,
              suffix: "s",
              decimals: 1,
              icon: <Clock className="h-5 w-5" />,
              color: "bg-purple-500/20 text-purple-700",
              change: "20% faster",
              gradient: "from-purple-500/20 to-purple-500/5"
            },
            {
              title: "Usage Trend",
              value: chartValues.increase,
              suffix: "%",
              icon: <TrendingUp className="h-5 w-5" />,
              color: "bg-indigo-500/20 text-indigo-700",
              change: "Consistent growth",
              gradient: "from-indigo-500/20 to-indigo-500/5"
            }
          ].map((card, index) => (
            <Card 
              key={index} 
              className="animate-fade-in-up backdrop-blur-xl bg-white/5 border-white/20 relative overflow-hidden group"
              style={{animationDelay: `${index * 100}ms`}}
              onMouseEnter={() => setHoveredChart(index)}
              onMouseLeave={() => setHoveredChart(null)}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">
                  <AnimatedNumber value={card.value} suffix={card.suffix} decimals={card.decimals || 0} />
                </div>
                <p className="text-sm text-muted-foreground">{card.change}</p>
                
                {/* Simple sparkline visualization */}
                <div className="h-2 mt-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${hoveredChart === index ? 'animate-pulse-subtle' : ''} bg-gradient-to-r from-violet-500 to-fuchsia-500`} 
                    style={{ 
                      width: `${Math.max(30, Math.min(95, Math.random() * 100))}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Usage Chart */}
          <Card className="animate-fade-in-up [animation-delay:400ms] backdrop-blur-xl bg-white/5 border-white/20 relative overflow-hidden group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl group-hover:text-violet-600 transition-colors">Usage Trends</CardTitle>
                  <CardDescription>Activity metrics over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-violet-500/10"
                    onClick={(e) => createRippleEffect(e)}
                  >
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-violet-500/10"
                    onClick={(e) => createRippleEffect(e)}
                  >
                    <Filter className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={usageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    className="animate-blur-in"
                  >
                    <defs>
                      <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333EA" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C026D3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#C026D3" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                    <YAxis stroke="rgba(255,255,255,0.5)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="queries" 
                      name="Queries" 
                      stroke="#9333EA" 
                      fillOpacity={1} 
                      fill="url(#colorQueries)" 
                      activeDot={{ r: 8, fill: "#9333EA", stroke: "white", strokeWidth: 2 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="documents" 
                      name="Documents" 
                      stroke="#C026D3" 
                      fillOpacity={1} 
                      fill="url(#colorDocs)" 
                      activeDot={{ r: 8, fill: "#C026D3", stroke: "white", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Document Types Chart */}
          <Card className="animate-fade-in-up [animation-delay:500ms] backdrop-blur-xl bg-white/5 border-white/20 relative overflow-hidden group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl group-hover:text-fuchsia-600 transition-colors">Document Categories</CardTitle>
                  <CardDescription>Distribution of document types</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-fuchsia-500/10"
                    onClick={(e) => createRippleEffect(e)}
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-fuchsia-500/10"
                    onClick={(e) => createRippleEffect(e)}
                  >
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart className="animate-blur-in">
                    <Pie
                      data={documentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentData.map((entry) => (
                        <Cell 
                          key={entry.name} 
                          fill={entry.color}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value} documents`, "Count"]}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(8px)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '0.5rem'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Query Type Distribution */}
        <Card className="animate-fade-in-up [animation-delay:600ms] backdrop-blur-xl bg-white/5 border-white/20 relative overflow-hidden group">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">Query Type Distribution</CardTitle>
                <CardDescription>Types of queries performed</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-purple-500/10"
                  onClick={(e) => createRippleEffect(e)}
                >
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-purple-500/10"
                  onClick={(e) => createRippleEffect(e)}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={queryTypeData} 
                  layout="vertical" 
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  className="animate-blur-in"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                  <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {queryTypeData.map((entry) => (
                      <Cell 
                        key={entry.name} 
                        fill={entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional insights cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {[
            {
              title: "Top Performing Queries",
              icon: <Zap className="h-5 w-5 text-violet-500" />,
              content: (
                <div className="space-y-3">
                  {["What are the financial projections?", "Summarize key findings", "Extract risk factors"].map((query, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
                      <span className="text-sm">{query}</span>
                      <span className="text-xs bg-violet-500/20 text-violet-200 px-2 py-0.5 rounded-full">{95 - i * 10}%</span>
                    </div>
                  ))}
                </div>
              )
            },
            {
              title: "Usage Insights",
              icon: <Eye className="h-5 w-5 text-fuchsia-500" />,
              content: (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm">Peak Usage Time</span>
                    <span className="text-xs font-medium">2:00 PM - 4:00 PM</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" style={{width: '65%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>8 AM</span>
                    <span>12 PM</span>
                    <span>4 PM</span>
                    <span>8 PM</span>
                  </div>
                </div>
              )
            },
            {
              title: "Accuracy Metrics",
              icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
              content: (
                <div>
                  <div className="flex items-center justify-center h-24">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-8 border-white/10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">92%</span>
                      </div>
                      <svg className="absolute inset-0 w-24 h-24" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="38" 
                          fill="none" 
                          stroke="url(#accuracy-gradient)" 
                          strokeWidth="8"
                          strokeDasharray="239.2"
                          strokeDashoffset="19.136" // 239.2 * (1 - 0.92)
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="accuracy-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#9333EA" />
                            <stop offset="100%" stopColor="#C026D3" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    Overall query accuracy rating
                  </div>
                </div>
              )
            }
          ].map((card, index) => (
            <Card 
              key={index} 
              className="animate-fade-in-up backdrop-blur-xl bg-white/5 border-white/20 relative overflow-hidden group hover:shadow-lg hover:shadow-violet-500/10 transition-all"
              style={{animationDelay: `${index * 100 + 700}ms`}}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>{card.content}</CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserAnalyticsPage;
