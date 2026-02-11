import { useEffect, useRef } from 'react';
import { 
  FileText, 
  Image, 
  Calculator, 
  Wrench, 
  Scissors, 
  Palette,
  FileCode,
  Lock,
  Zap,
  Settings
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  icon: typeof FileText;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const icons = [FileText, Image, Calculator, Wrench, Scissors, Palette, FileCode, Lock, Zap, Settings];

export default function ToolIconParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);
  const isMobile = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    // Check if mobile
    isMobile.current = window.innerWidth < 768;

    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener('change', handleChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      isMobile.current = window.innerWidth < 768;
      initParticles();
    };

    const initParticles = () => {
      // Reduce particles on mobile for performance
      const particleCount = isMobile.current ? 8 : 25;
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          icon: icons[Math.floor(Math.random() * icons.length)],
          size: Math.random() * 20 + 20,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01
        });
      }
    };

    const drawIcon = (particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = particle.opacity;
      
      // Draw icon as a simple shape (approximation)
      ctx.strokeStyle = 'oklch(0.62 0.24 345)'; // Theme color #eb347d in OKLCH
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const size = particle.size;
      // Simple geometric representation
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.stroke();
      
      // Add inner detail
      ctx.beginPath();
      ctx.moveTo(-size / 4, 0);
      ctx.lineTo(size / 4, 0);
      ctx.moveTo(0, -size / 4);
      ctx.lineTo(0, size / 4);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        // Update position - disable on mobile or reduced motion
        if (!prefersReducedMotion.current && !isMobile.current) {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.rotation += particle.rotationSpeed;
        }

        // Wrap around edges
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        drawIcon(particle);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      mediaQuery.removeEventListener('change', handleChange);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
