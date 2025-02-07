'use client';
import React, { useEffect, useRef } from 'react';

const RadarBackground = () => {
  const radarRef = useRef(null);

  useEffect(() => {
    const canvas = radarRef.current;
    const ctx = canvas.getContext('2d');
    const radarRadius = canvas.width / 2;
    let angle = 0;
    const blinkDots = [
      { x: radarRadius * 0.6, y: radarRadius * 0.4, blink: true },
      { x: radarRadius * 1.2, y: radarRadius * 1.4, blink: false },
    ];

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar grid
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(radarRadius, radarRadius, radarRadius, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(radarRadius, radarRadius, (radarRadius * i) / 4, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let i = 0; i < 360; i += 45) {
        const rad = (i * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(radarRadius, radarRadius);
        ctx.lineTo(
          radarRadius + radarRadius * Math.cos(rad),
          radarRadius + radarRadius * Math.sin(rad)
        );
        ctx.stroke();
      }

      // Draw sweeping radar line with gradient (thin in center, thick at edge)
      const gradient = ctx.createLinearGradient(radarRadius, radarRadius, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0.9)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1; // Start thin at center

      ctx.beginPath();
      ctx.moveTo(radarRadius, radarRadius);
      ctx.lineTo(
        radarRadius + radarRadius * Math.cos(angle),
        radarRadius + radarRadius * Math.sin(angle)
      );
      ctx.lineWidth = 10; // Thicker at outer edge
      ctx.stroke();

      // Radar sweeping effect (filled arc)
      ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      ctx.beginPath();
      ctx.moveTo(radarRadius, radarRadius);
      ctx.arc(radarRadius, radarRadius, radarRadius, angle, angle + 0.15);
      ctx.closePath();
      ctx.fill();

      // Draw blinking dots
      blinkDots.forEach(dot => {
        if (dot.blink) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 0, 1)';
          ctx.fill();
        }
        dot.blink = !dot.blink; // Toggle blinking
      });

      angle += 0.02; // Speed of radar sweep
      requestAnimationFrame(drawRadar);
    };

    drawRadar();
  }, []);

  return (  
    <canvas
      ref={radarRef}
      width={400}
      height={400}
      className="mx-auto w-full max-w-3xl h-full opacity-25 z-0 pointer-events-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
    />
  );
};

export default RadarBackground;
