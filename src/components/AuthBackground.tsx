
import React, { useEffect, useRef } from "react";

const AuthBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
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
    
    // Create particles
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
    }> = [];
    
    const createParticles = () => {
      const particleCount = Math.min(
        100,
        Math.floor((canvas.width * canvas.height) / 10000)
      );
      
      const colors = ['#4a6cf7', '#6e59a5', '#9b87f5', '#d6bcfa'];
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };
    
    createParticles();
    
    // Animation function
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      
      // Draw connections between particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(74, 108, 247, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden perspective-1000">
      {/* Canvas for particle animation */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      
      {/* Animated floating shapes in the background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <div className="absolute top-0 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70 animate-float-slow"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-70 animate-float-slow-reverse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse-subtle"></div>
        
        {/* 3D floating elements */}
        <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg transform rotate-12 animate-float-3d"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-lg transform -rotate-12 animate-float-3d-reverse"></div>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4 z-10">
        {children}
      </div>
      
      <footer className="py-4 text-center text-sm text-muted-foreground relative z-10 backdrop-blur-sm bg-background/30">
        <p>© 2025 RAG-Spring • Secure Authentication System</p>
      </footer>
    </div>
  );
};

export default AuthBackground;
