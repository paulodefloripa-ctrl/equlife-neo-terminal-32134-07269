import { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const SpaceAnimation = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reduce stars on mobile
      const starCount = window.innerWidth < 768 ? 75 : 150;
      
      // Initialize stars
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // 0.5-2px
        speed: Math.random() * 0.15 + 0.05, // 0.05-0.2 px/frame
        opacity: Math.random() * 0.5 + 0.3 // 0.3-0.8
      }));
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = theme === 'cyberpunk';
      const starColor = isDark ? '255, 255, 255' : '50, 50, 50';

      starsRef.current.forEach(star => {
        if (!prefersReducedMotion) {
          star.y += star.speed;
          if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
          }
        }

        ctx.fillStyle = `rgba(${starColor}, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};

export default SpaceAnimation;
