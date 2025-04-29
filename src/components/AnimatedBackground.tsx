import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let mouseMoveTimeout: number;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      originalX: number;
      originalY: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        const colors = ['#9333ea', '#c026d3', '#db2777'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Mouse interaction
        if (isMouseMoving) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (150 - distance) / 150;
            
            this.speedX -= forceDirectionX * force * 0.6;
            this.speedY -= forceDirectionY * force * 0.6;
          }
        }
        
        // Return to original position
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        
        this.speedX += dx * 0.01;
        this.speedY += dy * 0.01;
        
        // Friction
        this.speedX *= 0.92;
        this.speedY *= 0.92;
        
        // Boundary check
        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX;
        }
        
        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, (canvas.width * canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
      isMouseMoving = true;
      
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = window.setTimeout(() => {
        isMouseMoving = false;
      }, 500);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      // Draw connections
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.globalAlpha = 1 - distance / 150;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(mouseMoveTimeout);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;