"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, CreditCard, Send, Heart, CheckCircle2, Crown, LayoutTemplate } from "lucide-react";

export default function AnimatedIllustration({ step = 1 }: { step?: number }) {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-video flex items-center justify-center overflow-hidden">
            {/* Background dynamic blob based on step */}
            <motion.div 
                key={`blob-${step}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full blur-3xl ${
                    step === 1 ? "bg-sky-100/50" :
                    step === 2 ? "bg-purple-100/50" :
                    step === 3 ? "bg-green-100/50" :
                    "bg-rose-100/50"
                }`}
            />

            <AnimatePresence mode="wait">
                {step === 1 && <Scene1 key="s1" />}
                {step === 2 && <Scene2 key="s2" />}
                {step === 3 && <Scene3 key="s3" />}
                {step === 4 && <Scene4 key="s4" />}
            </AnimatePresence>
        </div>
    );
}

// SCENE 1: Pilih Tema (Grid of themes & cursor)
function Scene1() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="w-64 h-44 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="h-8 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                    <LayoutTemplate className="w-4 h-4 text-sky-500" />
                    <div className="w-20 h-2 bg-gray-200 rounded-full" />
                </div>
                {/* Grid */}
                <div className="flex-1 p-4 grid grid-cols-2 gap-3">
                    <motion.div className="bg-gray-100 rounded-lg" />
                    <motion.div 
                        animate={{ 
                            boxShadow: ["0px 0px 0px rgba(14,165,233,0)", "0px 0px 15px rgba(14,165,233,0.5)", "0px 0px 0px rgba(14,165,233,0)"],
                            borderColor: ["#f3f4f6", "#0ea5e9", "#f3f4f6"]
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        className="bg-sky-50 rounded-lg border-2" 
                    />
                    <motion.div className="bg-gray-100 rounded-lg" />
                    <motion.div className="bg-gray-100 rounded-lg" />
                </div>

                {/* Animated Cursor */}
                <motion.div 
                    initial={{ x: 0, y: 100 }}
                    animate={{ x: 50, y: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/4"
                >
                    <svg className="w-8 h-8 text-gray-900 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.25.9-3.2-7.4-4.4 5z"/>
                    </svg>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-sky-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Search className="w-5 h-5" />
                </motion.div>
            </div>
        </motion.div>
    );
}

// SCENE 2: Pilih Paket (3 Pricing boxes)
function Scene2() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full h-full flex items-end justify-center gap-4 pb-4"
        >
            {/* Box 1 */}
            <motion.div initial={{ height: 0 }} animate={{ height: 80 }} className="w-16 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-end p-2 relative">
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2" />
            </motion.div>
            
            {/* Box 2 (Selected) */}
            <motion.div 
                initial={{ height: 0 }} 
                animate={{ height: 130 }} 
                className="w-20 bg-gradient-to-t from-purple-500 to-indigo-500 rounded-xl shadow-xl flex flex-col justify-end p-3 relative z-10"
            >
                <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-yellow-500"
                >
                    <Crown className="w-6 h-6" />
                </motion.div>
                <div className="w-full h-2 bg-white/50 rounded-full mb-2" />
                <div className="w-2/3 h-2 bg-white/30 rounded-full mb-2" />
            </motion.div>

            {/* Box 3 */}
            <motion.div initial={{ height: 0 }} animate={{ height: 100 }} className="w-16 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col justify-end p-2 relative">
                <div className="w-full h-2 bg-gray-200 rounded-full mb-2" />
            </motion.div>
        </motion.div>
    );
}

// SCENE 3: Konfirmasi & Bayar (Phone with Checkmark & Card)
function Scene3() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            <div className="relative">
                {/* Phone */}
                <div className="w-36 h-56 bg-white rounded-3xl shadow-xl border-8 border-gray-900 flex flex-col items-center pt-8 px-4">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4"
                    >
                        <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    <div className="w-full h-3 bg-gray-200 rounded-full mb-3" />
                    <div className="w-2/3 h-3 bg-gray-100 rounded-full" />
                </div>

                {/* Floating Credit Card */}
                <motion.div 
                    initial={{ x: -50, opacity: 0, rotate: -20 }}
                    animate={{ x: 0, opacity: 1, rotate: -10, y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-1/4 -left-12 w-24 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl shadow-lg border border-white/20 p-2"
                >
                    <CreditCard className="w-5 h-5 text-white/80" />
                </motion.div>

                {/* Floating Bill/Receipt */}
                <motion.div 
                    initial={{ x: 50, opacity: 0, rotate: 20 }}
                    animate={{ x: 0, opacity: 1, rotate: 10, y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-1/4 -right-8 w-20 h-24 bg-white rounded-lg shadow-lg border border-gray-100 p-2 flex flex-col gap-1.5"
                >
                    <div className="w-full h-2 bg-gray-200 rounded-full" />
                    <div className="w-3/4 h-2 bg-gray-200 rounded-full" />
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-2" />
                </motion.div>
            </div>
        </motion.div>
    );
}

// SCENE 4: Terima Undangan (Envelope & Paper Plane)
function Scene4() {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative w-full h-full flex items-center justify-center"
        >
            {/* Envelope Base */}
            <div className="w-48 h-32 bg-rose-100 rounded-xl shadow-md relative flex items-center justify-center">
                {/* Flying Paper Plane */}
                <motion.div 
                    initial={{ x: -20, y: 20, scale: 0.5, opacity: 0 }}
                    animate={{ x: [0, 50, 100], y: [0, -50, -100], scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    className="absolute z-20 text-rose-500"
                >
                    <Send className="w-12 h-12 fill-rose-500" />
                </motion.div>

                {/* Floating Hearts */}
                <motion.div animate={{ y: -60, opacity: [0, 1, 0], x: -20 }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute z-10 text-rose-400">
                    <Heart className="w-6 h-6 fill-rose-400" />
                </motion.div>
                <motion.div animate={{ y: -80, opacity: [0, 1, 0], x: 30 }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="absolute z-10 text-rose-300">
                    <Heart className="w-8 h-8 fill-rose-300" />
                </motion.div>

                {/* Envelope Front Flap */}
                <div className="absolute inset-0 z-10">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-rose-200">
                        <path d="M0,100 L50,40 L100,100 Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </motion.div>
    );
}
