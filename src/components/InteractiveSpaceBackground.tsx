'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    color: string;
    speed: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    active: boolean;
}

interface Meteoroid {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    active: boolean;
    angle: number;
}

export const InteractiveSpaceBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        const starCount = 300;
        const stars: Star[] = [];
        const colors = ['#fff', '#ffd700', '#add8e6', '#ffb6c1'];

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * dimensions.width,
                y: Math.random() * dimensions.height,
                z: Math.random() * 1000,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 0.2 + 0.05,
            });
        }

        const shootingStars: ShootingStar[] = [];
        const meteoroids: Meteoroid[] = [];

        const createShootingStar = () => {
            if (Math.random() > 0.99) {
                shootingStars.push({
                    x: Math.random() * dimensions.width,
                    y: Math.random() * (dimensions.height / 2),
                    length: Math.random() * 80 + 20,
                    speed: Math.random() * 10 + 5,
                    opacity: 1,
                    active: true,
                });
            }
        };

        const createMeteoroid = () => {
            if (Math.random() > 0.997) {
                meteoroids.push({
                    x: -100,
                    y: Math.random() * dimensions.height,
                    size: Math.random() * 40 + 20,
                    speed: Math.random() * 1 + 0.5,
                    opacity: 0.6,
                    active: true,
                    angle: (Math.random() - 0.5) * 0.2, // slight angle
                });
            }
        };

        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and update stars
            stars.forEach((star) => {
                // Automatic movement (drift)
                star.x += star.speed;
                if (star.x > dimensions.width) star.x = 0;

                // Twinkle effect
                star.opacity += Math.random() * 0.04 - 0.02;
                if (star.opacity < 0.1) star.opacity = 0.1;
                if (star.opacity > 0.8) star.opacity = 0.8;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.opacity;
                ctx.fill();

                if (star.size > 1.5) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = star.color;
                } else {
                    ctx.shadowBlur = 0;
                }
            });

            // Shooting stars
            createShootingStar();
            shootingStars.forEach((s, index) => {
                if (!s.active) return;

                s.x += s.speed;
                s.y += s.speed * 0.5;
                s.opacity -= 0.01;

                if (s.opacity <= 0 || s.x > dimensions.width || s.y > dimensions.height) {
                    s.active = false;
                    return;
                }

                ctx.beginPath();
                const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y - s.length * 0.5);
                grad.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
                ctx.strokeStyle = grad;
                ctx.lineWidth = 2;
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.length, s.y - s.length * 0.5);
                ctx.stroke();
            });

            // Meteoroids
            createMeteoroid();
            meteoroids.forEach((m) => {
                if (!m.active) return;

                m.x += m.speed;
                m.y += m.speed * m.angle;

                if (m.x > dimensions.width + 100) {
                    m.active = false;
                    return;
                }

                ctx.save();
                ctx.translate(m.x, m.y);
                ctx.rotate(m.angle);

                // Draw meteoroid body
                const mGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, m.size);
                mGrad.addColorStop(0, `rgba(100, 100, 120, ${m.opacity})`);
                mGrad.addColorStop(0.8, `rgba(50, 50, 60, ${m.opacity * 0.8})`);
                mGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = mGrad;
                ctx.beginPath();
                ctx.ellipse(0, 0, m.size, m.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();

                // Add subtle glow
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(100, 100, 255, 0.2)';
                ctx.stroke();

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [dimensions]);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020205]">
            {/* Deep Space Base Background */}
            <div className="absolute inset-0 opacity-40">
                <Image
                    src="/images/space-bg.png"
                    alt="Space Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Interactive Stars Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />

            {/* Moon Visualization - Naturalized */}
            <div className="absolute top-[10%] left-[5%] w-24 h-24 md:w-40 md:h-40 opacity-80 animate-float pointer-events-none">
                <div className="relative w-full h-full">
                    {/* Subtle backglow */}
                    <div className="absolute inset-0 rounded-full bg-blue-400/5 blur-3xl" />

                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)] border border-white/5" />

                    {/* Moon craters effect via css - more subtle */}
                    <div className="absolute top-[20%] left-[30%] w-6 h-6 rounded-full bg-black/5 blur-[1px]" />
                    <div className="absolute bottom-[25%] right-[20%] w-8 h-8 rounded-full bg-black/5 blur-[2px]" />
                    <div className="absolute top-[50%] left-[15%] w-4 h-4 rounded-full bg-black/10 blur-[1px]" />
                </div>
            </div>

            {/* Ambient Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(15px, -25px) rotate(3deg); }
        }
        .animate-float {
          animation: float 25s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};
