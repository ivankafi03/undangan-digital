"use client";

import { CheckCircle2, Zap, Lock, Globe, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Desain Premium",
        desc: "Koleksi tema elegan eksklusif untuk momen paling istimewa Anda.",
        icon: <Sparkles className="w-6 h-6 text-sky-500" />
    },
    {
        title: "Proses Instan",
        desc: "Undangan siap disebarkan dalam hitungan jam tanpa proses yang rumit.",
        icon: <Zap className="w-6 h-6 text-yellow-500" />
    },
    {
        title: "Custom Musik",
        desc: "Hadirkan suasana romantis dengan lagu pilihan sebagai backsound.",
        icon: <CheckCircle2 className="w-6 h-6 text-green-500" />
    },
    {
        title: "Akses Selamanya",
        desc: "Link undangan pernikahan tetap aktif dan dapat dikenang kapan saja.",
        icon: <Clock className="w-6 h-6 text-blue-500" />
    },
    {
        title: "Keamanan Privasi",
        desc: "Informasi tamu dan detail acara dijaga kerahasiaannya sepenuhnya.",
        icon: <Lock className="w-6 h-6 text-rose-500" />
    },
    {
        title: "Mudah Dibagikan",
        desc: "Cukup satu tautan elegan untuk disebar via WhatsApp & Sosial Media.",
        icon: <Globe className="w-6 h-6 text-indigo-500" />
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
};

export default function Features() {
    return (
        <section id="fitur" className="py-10 md:py-16 px-5 bg-white overflow-hidden relative">
            <div className="max-w-6xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-16"
                >
                    <h2 className="text-3xl md:text-6xl font-extrabold text-[#111111] tracking-tight">
                        Lebih dari sekadar <br/>
                        <span className="text-sky-500 font-serif italic font-medium">undangan digital.</span>
                    </h2>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((f, i) => (
                        <motion.div 
                            key={i} 
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="group relative bg-[#FAFAFA] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-100 hover:shadow-xl hover:border-sky-100 transition-all duration-300"
                        >
                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-3 sm:mb-6 group-hover:scale-110 transition-transform [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                                {f.icon}
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-3">{f.title}</h3>
                            <p className="text-gray-500 text-[12px] sm:text-sm leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
