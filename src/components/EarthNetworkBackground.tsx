'use client';

import React, { useEffect, useRef } from 'react';

export const EarthNetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);
        resize();

        // --- Config ---
        const EARTH_RADIUS = 100;
        const SATELLITE_COUNT = 8;
        const STAR_COUNT = 150;
        const METEOR_CHANCE = 0.005;

        // --- State ---
        let time = 0;

        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
        }

        interface Satellite {
            angle: number;
            orbitRadius: number;
            speed: number;
            size: number;
        }

        interface Meteor {
            x: number;
            y: number;
            length: number;
            speed: number;
            angle: number;
            opacity: number;
        }

        // Initialize Stars
        const stars: Star[] = Array.from({ length: STAR_COUNT }).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random(),
            speed: Math.random() * 0.02 + 0.005
        }));

        // Initialize Satellites
        const satellites: Satellite[] = Array.from({ length: SATELLITE_COUNT }).map((_, i) => ({
            angle: (i * (360 / SATELLITE_COUNT)) * (Math.PI / 180),
            orbitRadius: EARTH_RADIUS + 60 + Math.random() * 100,
            speed: (Math.random() * 0.002 + 0.001) * (i % 2 === 0 ? 1 : -1),
            size: 3
        }));

        let meteors: Meteor[] = [];

        // --- Animation Loop ---
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            // 1. Draw Stars
            stars.forEach(star => {
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0.2) star.speed *= -1; // Twinkle

                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // 2. Draw Connections (Yellow Lines)
            ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)'; // Yellow-300 with opacity
            ctx.lineWidth = 1;
            ctx.beginPath();
            satellites.forEach(sat => {
                const satX = centerX + Math.cos(sat.angle) * sat.orbitRadius;
                const satY = centerY + Math.sin(sat.angle) * sat.orbitRadius * 0.4; // Flatten y for 3D effect

                // Only draw line if satellite is "behind" or "close" to provide depth? 
                // Actually, just drawing lines to center for now.
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(satX, satY);
            });
            ctx.stroke();

            // 3. Draw Earth
            // Create gradient for Earth
            const earthGradient = ctx.createRadialGradient(centerX - 20, centerY - 20, 10, centerX, centerY, EARTH_RADIUS);
            earthGradient.addColorStop(0, '#3b82f6'); // Blue-500
            earthGradient.addColorStop(0.8, '#1d4ed8'); // Blue-700
            earthGradient.addColorStop(1, '#1e1b4b'); // Dark Blue

            // Glow
            ctx.shadowBlur = 50;
            ctx.shadowColor = '#3b82f6';

            ctx.fillStyle = earthGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, EARTH_RADIUS, 0, Math.PI * 2);
            ctx.fill();

            // Reset shadow
            ctx.shadowBlur = 0;

            // Optional: Draw some "continents" or texture hint (simple strokes)
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.strokeStyle = '#60a5fa'; // lighter blue
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, EARTH_RADIUS - 10, 0.2 + time * 0.05, 1.5 + time * 0.05);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(centerX, centerY, EARTH_RADIUS - 25, 2.5 + time * 0.03, 4 + time * 0.03);
            ctx.stroke();
            ctx.restore();


            // 4. Draw Moon
            const moonOrbitRadius = EARTH_RADIUS + 180;
            const moonAngle = time * 0.2;
            const moonX = centerX + Math.cos(moonAngle) * moonOrbitRadius;
            const moonY = centerY + Math.sin(moonAngle) * moonOrbitRadius * 0.4; // Elliptical orbit

            // Determine if moon is behind earth (simple z-index simulation)
            const isMoonBehind = Math.sin(moonAngle) < 0;

            if (isMoonBehind) {
                // Draw moon before satellites if behind
                drawMoon(ctx, moonX, moonY);
            }

            // 5. Draw Satellites
            satellites.forEach(sat => {
                // Move satellite
                sat.angle += sat.speed;

                const satX = centerX + Math.cos(sat.angle) * sat.orbitRadius;
                const satY = centerY + Math.sin(sat.angle) * sat.orbitRadius * 0.4;

                // Draw Satellite
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#ffffff';
                ctx.beginPath();
                ctx.arc(satX, satY, sat.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            if (!isMoonBehind) {
                drawMoon(ctx, moonX, moonY);
            }

            // 6. Draw Meteors
            // Spawn new meteor
            if (Math.random() < METEOR_CHANCE) {
                meteors.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.5, // Start mostly in top half
                    length: Math.random() * 50 + 50,
                    speed: Math.random() * 10 + 5,
                    angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1), // Mostly diagonal down-right
                    opacity: 1
                });
            }

            // Update and draw meteors
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 2;

            meteors.forEach((meteor, index) => {
                meteor.x += Math.cos(meteor.angle) * meteor.speed;
                meteor.y += Math.sin(meteor.angle) * meteor.speed;
                meteor.opacity -= 0.02;

                if (meteor.opacity <= 0) {
                    meteors.splice(index, 1);
                    return;
                }

                const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
                const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

                // Gradient tail
                const grad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
                grad.addColorStop(0, `rgba(255,255,255,${meteor.opacity})`);
                grad.addColorStop(1, 'rgba(255,255,255,0)');

                ctx.strokeStyle = grad;
                ctx.beginPath();
                ctx.moveTo(meteor.x, meteor.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
            });


            time += 0.01;
            requestAnimationFrame(animate);
        };

        const drawMoon = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
            ctx.fillStyle = '#d1d5db'; // Gray-300
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#d1d5db';
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2); // Moon size
            ctx.fill();

            // Craters
            ctx.fillStyle = '#9ca3af';
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(x - 3, y - 2, 3, 0, Math.PI * 2);
            ctx.arc(x + 2, y + 4, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animId);
        };

    }, []);

    return (
        <div className="fixed inset-0 z-[-1] bg-[#050510]">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
};
