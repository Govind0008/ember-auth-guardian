
import React, { ReactNode, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AuthBackgroundProps {
  children: ReactNode;
}

const AuthBackground: React.FC<AuthBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 400;

    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const purpleColor = new THREE.Color(0x9333ea);
    const fuchsiaColor = new THREE.Color(0xc026d3);
    const blueColor = new THREE.Color(0x6366f1);

    const colorPalette = [purpleColor, fuchsiaColor, blueColor];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position particles in a spherical area
      const radius = 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi) * Math.random();
      
      // Apply random colors from the palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      color.toArray(colors, i);
      
      // Randomize particle sizes
      sizes[i / 3] = Math.random() * 1.5 + 0.2;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    // Create particle system
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create central sphere
    const centralSphereGeometry = new THREE.SphereGeometry(5, 32, 32);
    const centralSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const centralSphere = new THREE.Mesh(centralSphereGeometry, centralSphereMaterial);
    scene.add(centralSphere);

    // Create orbiting rings
    const createRing = (radius: number, color: number) => {
      const ringGeometry = new THREE.TorusGeometry(radius, 0.15, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      return ring;
    };

    const ring1 = createRing(10, 0x9333ea); // Violet
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = createRing(14, 0xc026d3); // Fuchsia
    ring2.rotation.x = Math.PI / 2.5;
    ring2.rotation.y = Math.PI / 4;
    scene.add(ring2);

    const ring3 = createRing(18, 0x6366f1); // Indigo
    ring3.rotation.x = Math.PI / 2;
    ring3.rotation.z = Math.PI / 5;
    scene.add(ring3);

    // Handle mouse movement for interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle window resize
    const handleWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update rotation targets based on mouse position
      targetRotationX += (mouseY * 0.05 - targetRotationX) * 0.02;
      targetRotationY += (mouseX * 0.05 - targetRotationY) * 0.02;

      // Rotate central sphere
      centralSphere.rotation.x += 0.003;
      centralSphere.rotation.y += 0.002;

      // Rotate the particle system slightly
      particles.rotation.x = targetRotationX;
      particles.rotation.y = targetRotationY;

      // Rotate rings
      ring1.rotation.z += 0.002;
      ring2.rotation.z -= 0.001;
      ring3.rotation.z += 0.0015;

      // Pulsate central sphere
      const pulseFactor = Math.sin(performance.now() * 0.001) * 0.1 + 1;
      centralSphere.scale.set(pulseFactor, pulseFactor, pulseFactor);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleWindowResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      centralSphereGeometry.dispose();
      centralSphereMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center auth-layout-pattern">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'transparent' }}
      />
      <div className="relative z-10 px-4 py-10">{children}</div>
    </div>
  );
};

export default AuthBackground;
