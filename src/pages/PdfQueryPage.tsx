
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileSearch, ArrowLeft, Send, Upload, File, X, CheckCircle, Download, Save } from "lucide-react";
import { Link } from "react-router-dom";

const PdfQueryPage: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated background
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
      { color: 'rgba(124, 58, 237, 0.05)', amplitude: 50, frequency: 0.02, speed: 0.01, y: canvas.height * 0.2 },
      { color: 'rgba(192, 38, 211, 0.05)', amplitude: 40, frequency: 0.03, speed: 0.02, y: canvas.height * 0.5 },
      { color: 'rgba(79, 70, 229, 0.05)', amplitude: 60, frequency: 0.01, speed: 0.015, y: canvas.height * 0.8 }
    ];
    
    let animationId: number;
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        ctx.fillStyle = wave.color;
        ctx.beginPath();
        
        ctx.moveTo(0, wave.y);
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude + wave.y;
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      // Reset result when new file is selected
      setResult(null);
      
      // Add animated particles
      createSuccessParticles();
    }
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !selectedFile) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult(`Based on the analysis of "${selectedFile.name}", here's the answer to your query "${query}":\n\nThe document contains information about financial projections for Q2 2024, showing a 15% increase in revenue compared to Q1. Key factors include new product launches and market expansion into European territories. Risk factors include potential supply chain disruptions and currency exchange fluctuations.`);
      setIsLoading(false);
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 2000);
  };
  
  const createSuccessParticles = () => {
    const container = document.querySelector(".upload-container");
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 8 + 2; // 2-10px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particle.classList.add(
        "absolute", "rounded-full", "bg-violet-500", "animate-sparkle", "pointer-events-none", "z-10"
      );
      
      container.appendChild(particle);
      setTimeout(() => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      }, 1500);
    }
  };
  
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
      {/* Animated background */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      
      {/* Header with glassmorphism */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 py-4 shadow-lg sticky top-0 z-50">
        <div className="container flex items-center">
          <Link to="/user/dashboard" className="mr-4">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-violet-500/10 hover:text-violet-700 transition-all">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/25 animate-pulse-subtle">
              <FileSearch className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent animate-gradient-shift">PDF Query</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* File Upload Section */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up upload-container">
            <CardHeader>
              <CardTitle className="text-2xl">Upload Document</CardTitle>
              <CardDescription className="text-lg">Upload a PDF file to analyze and query</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer relative overflow-hidden ${selectedFile ? 'bg-violet-100/30 border-violet-400' : 'border-white/30 hover:border-violet-400 hover:bg-white/5'}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 ${selectedFile ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-500`}></div>
                
                {selectedFile ? (
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/10 animate-float">
                      <File className="h-10 w-10 text-violet-700" />
                    </div>
                    <p className="font-semibold text-xl text-violet-800">{selectedFile.name}</p>
                    <p className="text-base text-violet-700/80 mb-6">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="flex items-center gap-2 bg-white/70 hover:bg-white/90 hover:text-red-600 transition-all"
                    >
                      <X className="h-4 w-4" />
                      <span>Remove</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center relative z-10">
                    <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center mb-6 animate-pulse-ring">
                      <Upload className="h-10 w-10 text-violet-700" />
                    </div>
                    <p className="font-medium text-xl">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-base text-muted-foreground mt-2">
                      PDF (max. 10MB)
                    </p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf"
                />
              </div>
              
              {/* Demo files list */}
              <div className="mt-6">
                <p className="text-sm mb-3 font-medium">Or use one of our sample documents:</p>
                <div className="space-y-2">
                  {["Financial Report 2024.pdf", "Market Analysis Q2.pdf", "Strategic Plan 2025.pdf"].map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center p-3 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-all border border-white/20 hover:border-violet-400/30"
                      onClick={() => {
                        const fakeFile = new File([""], file, { type: "application/pdf" });
                        setSelectedFile(fakeFile);
                        createSuccessParticles();
                      }}
                    >
                      <File className="h-5 w-5 text-violet-500 mr-3" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Query Form */}
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up [animation-delay:100ms]">
            <CardHeader>
              <CardTitle className="text-2xl">Ask Questions</CardTitle>
              <CardDescription className="text-lg">Query your document with natural language</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuerySubmit} className="space-y-5">
                <div className="space-y-3">
                  <Textarea
                    placeholder="Example: 'What are the key financial projections for Q2?'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[140px] text-lg bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:border-violet-400/50 focus:border-violet-500 transition-all rounded-xl shadow-inner resize-none"
                    disabled={!selectedFile || isLoading}
                  />
                  
                  {/* Query suggestions */}
                  {selectedFile && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        "What are the key findings?", 
                        "Summarize the document", 
                        "What are the main risks?"
                      ].map((suggestion, index) => (
                        <Button 
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          className="bg-white/20 border-white/30 hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-700 transition-all animate-fade-in-up [animation-delay:400ms]"
                          onClick={() => setQuery(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-semibold relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/30 rounded-xl"
                  disabled={!query.trim() || !selectedFile || isLoading}
                  onClick={(e) => !isLoading && createRippleEffect(e)}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full"></div>
                      <span>Analyzing Document...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="mr-2 h-5 w-5" />
                      <span>Submit Query</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Result Section - Only show when there's a result */}
        {result && (
          <Card className="mt-8 backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-fade-in-up relative overflow-hidden">
            {/* Success overlay */}
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 backdrop-blur-sm z-20 animate-blur-in">
                <div className="flex flex-col items-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4 animate-bounce-slight" />
                  <p className="text-xl font-bold text-green-700">Analysis Complete!</p>
                </div>
              </div>
            )}
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Results</CardTitle>
                  <CardDescription className="text-lg">AI-generated answer based on your document</CardDescription>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 flex items-center justify-center animate-pulse-ring border border-white/30">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white/20 rounded-xl p-6 whitespace-pre-wrap text-lg border border-white/20 shadow-inner animate-blur-in">
                {result}
              </div>
              
              {/* Keywords extraction */}
              <div className="mt-6">
                <p className="font-medium text-lg mb-3">Key Topics:</p>
                <div className="flex flex-wrap gap-2">
                  {["Financial Projections", "Revenue Increase", "Q2 2024", "Product Launches", "European Markets", "Supply Chain", "Currency Risks"].map((keyword, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-sm animate-fade-in-up"
                      style={{animationDelay: `${index * 100}ms`}}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4 border-t border-white/10 mt-4 pt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-white/20 border-white/30 hover:bg-white/30 transition-all"
                onClick={(e) => createRippleEffect(e)}
              >
                <Download className="h-4 w-4" />
                Export Result
              </Button>
              <Button 
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 transition-all flex items-center gap-2 relative overflow-hidden"
                onClick={(e) => createRippleEffect(e)}
              >
                <Save className="h-4 w-4" />
                Save to History
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PdfQueryPage;
