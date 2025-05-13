
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera with perspective
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;

    // Create renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating particles/spheres
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 50;
      particlePositions[i + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i + 2] = (Math.random() - 0.5) * 50;
      particleSizes[i / 3] = Math.random() * 0.5 + 0.1;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
    
    // Create shader material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4a6cf7,
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create a central sphere representing security
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a6cf7,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    
    // Create orbiting rings
    const createRing = (radius: number, tubeRadius: number, color: number) => {
      const ringGeometry = new THREE.TorusGeometry(radius, tubeRadius, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.5
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 3;
      return ring;
    };
    
    const ring1 = createRing(5, 0.1, 0x6e59a5);
    const ring2 = createRing(7, 0.1, 0x9b87f5);
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.y = Math.PI / 4;
    
    scene.add(ring1);
    scene.add(ring2);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles system slightly
      particles.rotation.y += 0.001;
      
      // Rotate sphere
      sphere.rotation.y += 0.005;
      
      // Rotate rings
      ring1.rotation.z += 0.003;
      ring2.rotation.z -= 0.002;
      
      // Mouse interaction
      const mouseX = 0; // Replace with mouse position for interactivity
      const mouseY = 0;
      
      camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.01;
      camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.01;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 bg-primary/10 backdrop-blur-md rounded-full px-6 py-2 text-sm font-medium text-primary animate-fade-in-up border border-primary/20 shadow-glow">
            Secure Authentication System
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up [animation-delay:100ms] text-gradient">
            RAG-Spring: Advanced Passwordless Authentication
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 animate-fade-in-up [animation-delay:200ms] max-w-2xl mx-auto backdrop-blur-sm bg-background/20 p-4 rounded-lg">
            Experience secure, passwordless authentication with email OTP verification and JWT-based session management.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up [animation-delay:300ms]">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")} 
              className="animate-shimmer bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-[length:200%_100%] shadow-glow hover:shadow-glow-intense transition-all"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="backdrop-blur-md bg-background/30 border-primary/20 hover:bg-primary/10 transition-all"
            >
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
              className={`group backdrop-blur-md bg-card/30 p-6 rounded-xl border border-primary/10 hover:border-primary/30 transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up [animation-delay:${feature.delay}] hover:shadow-glow`}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <div className="h-6 w-6 bg-primary rounded-md transform rotate-45 group-hover:scale-110 transition-all" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="py-6 border-t backdrop-blur-sm bg-background/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 RAG-Spring • Secure Authentication System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
