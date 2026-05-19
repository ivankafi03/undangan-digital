"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorEffect() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Lighter spring settings
    const springConfig = { damping: 40, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Optimized Primary Cursor */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 border-2 border-purple-600 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -12,
                    top: -12,
                }}
            />

            {/* Subtle Glow (Simplified) */}
            <motion.div
                className="fixed top-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none z-[9998] hidden md:block"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    left: -64,
                    top: -64,
                }}
            />
        </>
    );
}
