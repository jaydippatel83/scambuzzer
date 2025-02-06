"use client"; 
import { useEffect } from 'react';
 
const MatrixBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        const x = index * fontSize;
        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        drops[index]++;
      });
    };

    const interval = setInterval(draw, 33);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      id="matrixCanvas"
      className="fixed top-0 left-0 w-full h-full opacity-10 z-0 pointer-events-none"
    />
  );
};

export default MatrixBackground;
 