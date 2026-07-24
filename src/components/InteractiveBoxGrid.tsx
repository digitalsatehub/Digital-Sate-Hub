import React, { useEffect, useRef } from 'react';

interface InteractiveBoxGridProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const InteractiveBoxGrid: React.FC<InteractiveBoxGridProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    const cellSize = 46; // Size of each box shape in pixels
    const gap = 3; // Space between boxes
    let gridEnergy: Float32Array = new Float32Array(0);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / (cellSize + gap)) + 1;
      rows = Math.ceil(height / (cellSize + gap)) + 1;

      gridEnergy = new Float32Array(cols * rows);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Mouse tracking relative to container
    let mouseX = -1000;
    let mouseY = -1000;
    let isHovered = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        isHovered = true;
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Energize grid cells near cursor
      if (isHovered && cols > 0 && rows > 0) {
        const hoverCol = Math.floor(mouseX / (cellSize + gap));
        const hoverRow = Math.floor(mouseY / (cellSize + gap));
        const radius = 3; // Energize boxes within 3-box radius

        for (let r = hoverRow - radius; r <= hoverRow + radius; r++) {
          for (let c = hoverCol - radius; c <= hoverCol + radius; c++) {
            if (c >= 0 && c < cols && r >= 0 && r < rows) {
              const boxCenterX = c * (cellSize + gap) + cellSize / 2;
              const boxCenterY = r * (cellSize + gap) + cellSize / 2;
              const dist = Math.hypot(mouseX - boxCenterX, mouseY - boxCenterY);
              const maxDist = radius * (cellSize + gap);

              if (dist < maxDist) {
                const idx = r * cols + c;
                // Intensity drops off with distance from cursor
                const targetEnergy = Math.pow(1 - dist / maxDist, 1.5);
                gridEnergy[idx] = Math.max(gridEnergy[idx], targetEnergy);
              }
            }
          }
        }
      }

      // Draw all grid boxes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const energy = gridEnergy[idx];
          const x = c * (cellSize + gap);
          const y = r * (cellSize + gap);
          const radius = 6; // Rounded corner for boxes

          // Base box background and border
          if (energy > 0.005) {
            // Active box highlighted in light blue (#38BDF8 / #60A5FA)
            ctx.fillStyle = `rgba(56, 189, 248, ${energy * 0.35})`;
            ctx.strokeStyle = `rgba(147, 197, 253, ${Math.min(1, energy * 0.95)})`;
            ctx.lineWidth = 1.5;

            // Optional glow effect for high energy box
            if (energy > 0.5) {
              ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
              ctx.shadowBlur = 12 * energy;
            } else {
              ctx.shadowBlur = 0;
            }
          } else {
            // Default ambient dark box shape outline
            ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.12)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          }

          // Draw rounded rectangle box shape
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, radius);
          ctx.fill();
          ctx.stroke();

          // Decay energy gradually so it fades away as mouse moves elsewhere
          if (energy > 0) {
            gridEnergy[idx] = energy * 0.92 - 0.005;
            if (gridEnergy[idx] < 0) gridEnergy[idx] = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
