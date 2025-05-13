
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as THREE from "three";

const NotFound = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cubesRef = useRef<THREE.Mesh[]>([]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create text cubes that form "404"
    const createCubes = () => {
      const material = new THREE.MeshBasicMaterial({
        color: 0x4a6cf7,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });

      // Clear existing cubes
      if (cubesRef.current.length) {
        cubesRef.current.forEach(cube => scene.remove(cube));
        cubesRef.current = [];
      }

      // Create cubes in a grid pattern to form "404"
      const numberOfCubes = 80;
      for (let i = 0; i < numberOfCubes; i++) {
        const size = Math.random() * 0.3 + 0.1;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cubes in a pattern resembling "404"
        const spreadX = 8;
        const spreadY = 3;
        
        cube.position.x = (Math.random() - 0.5) * spreadX;
        cube.position.y = (Math.random() - 0.5) * spreadY;
        cube.position.z = (Math.random() - 0.5) * 2;
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        
        scene.add(cube);
        cubesRef.current.push(cube);
      }
    };

    createCubes();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate cubes
      cubesRef.current.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });
      
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
      <div className="relative z-10 flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center backdrop-blur-lg bg-card/20 border border-primary/20 shadow-lg rounded-xl p-8 animate-float">
          <h1 className="text-9xl font-bold text-primary mb-4 text-shadow-glow animate-pulse-glow">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="animate-shimmer bg-gradient-to-r from-primary/80 via-primary to-primary/80 bg-[length:200%_100%]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
