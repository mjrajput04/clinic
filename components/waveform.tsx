'use client';

import { useEffect, useRef } from 'react';

interface WaveformProps {
  isRecording?: boolean;
  animated?: boolean;
}

export function Waveform({ isRecording = false, animated = true }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const drawWaveform = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)');
      gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw waveform
      ctx.strokeStyle = 'rgb(6, 182, 212)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      const centerY = canvas.height / 2;
      const frequency = 0.02;
      const amplitude = isRecording ? 40 : 25;

      for (let x = 0; x < canvas.width; x++) {
        const baseWave = Math.sin((x * frequency + time * 0.05) * Math.PI) * amplitude;
        const noise = isRecording
          ? (Math.random() - 0.5) * 20
          : 0;
        const y = centerY + baseWave + noise;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw secondary wave for depth
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const baseWave = Math.sin((x * frequency + time * 0.03 + Math.PI / 4) * Math.PI) * amplitude * 0.6;
        const y = centerY + baseWave;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1;

      if (animated) {
        time++;
        animationId = requestAnimationFrame(drawWaveform);
      }
    };

    drawWaveform();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isRecording, animated]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={120}
      className="w-full h-full"
    />
  );
}
