import { motion } from 'framer-motion';
import { useState } from 'react';

/* ── StarField — 80 stars, 3 size tiers, purple in light mode, cyan/white in dark ── */
const StarField = ({ darkMode = true }) => {
    const stars = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.9 ? 4 : Math.random() > 0.7 ? 2.5 : 1.5,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 3,
        color: darkMode
            ? (i % 3 === 0 ? 'rgba(34,211,238,0.8)' : 'white')
            : (i % 2 === 0 ? 'rgba(124,58,237,0.9)' : 'rgba(99,102,241,0.7)'),
    }));

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {stars.map(star => (
                <motion.div
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        background: star.color,
                    }}
                    animate={{ opacity: [0.15, 1, 0.15], scale: [1, 1.5, 1] }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};

export default function Contact({ darkMode }) {
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        setStatus("Sending...");

        try {
            const formData = new FormData(form);
            const response = await fetch("https://formspree.io/f/xojyjlbb", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("Your message has been sent! I'll get back to you soon.");
                form.reset();
                setTimeout(() => setStatus(""), 5000);
            } else {
                setStatus("Failed to send message. Please try again.");
                setTimeout(() => setStatus(""), 5000);
            }
        } catch (error) {
            setStatus("An error occurred. Please try again.");
            setTimeout(() => setStatus(""), 5000);
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
                #contact * { font-family: 'Fredoka', sans-serif !important; }
            `}</style>

            <section id="contact" className="py-24 px-6 dark:bg-[#0f172a] bg-slate-50 relative overflow-hidden">
                <StarField darkMode={darkMode} />

                {/* Glow from top - above header */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/30 blur-[80px] rounded-full pointer-events-none -translate-y-1/2" />

                <div className="container mx-auto max-w-[1100px] relative z-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-5xl font-bold dark:text-white text-slate-900 mb-2">Contact</h2>
                        <p className="dark:text-gray-400 text-slate-600 text-lg mb-2">Get in touch</p>
                        <motion.div
                            className="mx-auto mt-2 rounded-full"
                            style={{
                                height: '2px',
                                width: '60px',
                                background: 'linear-gradient(to right, transparent, #22d3ee, transparent)',
                            }}
                            animate={{
                                scaleX: [0.6, 1.3, 0.6],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                    </motion.div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6">

                        {/* Left - Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="dark:bg-[#111827] bg-white border dark:border-none border-slate-200/80 rounded-2xl p-9 flex flex-col gap-4 shadow-sm"
                        >
                            <h3 className="text-2xl font-bold dark:text-white text-slate-900 mb-2">Contact Information</h3>

                            {[
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    ),
                                    label: 'Email',
                                    value: 'ahmed.mahmoud.elgabbas@gmail.com',
                                },
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.35 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                    ),
                                    label: 'Phone',
                                    value: '+20 111 702 4500',
                                },
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                        </svg>
                                    ),
                                    label: 'Location',
                                    value: 'Giza, Egypt',
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="dark:bg-[#1a2235] bg-slate-50 border dark:border-none border-slate-200/60 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 dark:hover:bg-[#1e2d45] hover:bg-slate-100 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.08)] cursor-pointer"
                                >
                                    <div className="dark:bg-[#1e2d45] bg-slate-200 dark:text-white text-slate-700 rounded-xl w-11 h-11 flex items-center justify-center flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="dark:text-white text-slate-800 font-semibold text-base">{item.label}</div>
                                        <div className="dark:text-gray-400 text-slate-600 text-sm mt-0.5">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Right - Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="dark:bg-[#111827] bg-white border dark:border-none border-slate-200/80 rounded-2xl p-9 flex flex-col gap-4 shadow-sm"
                        >
                            <h3 className="text-2xl font-semibold dark:text-white text-slate-900 mb-2">Send me a message</h3>

                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                onInvalid={(e) => e.target.setCustomValidity('Please complete this required field.')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                className="dark:bg-[#1a2235] bg-slate-50 border dark:border-none border-slate-200 dark:text-gray-400 text-slate-700 dark:placeholder-gray-600 placeholder-slate-400 outline-none w-full text-base focus:border-cyan-400 transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your Email"
                                onInvalid={(e) => e.target.setCustomValidity('Please complete this required field.')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                className="dark:bg-[#1a2235] bg-slate-50 border dark:border-none border-slate-200 dark:text-gray-400 text-slate-700 dark:placeholder-gray-600 placeholder-slate-400 outline-none w-full text-base"
                            />
                            <input
                                type="text"
                                name="subject"
                                required
                                placeholder="Subject"
                                onInvalid={(e) => e.target.setCustomValidity('Please complete this required field.')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                className="dark:bg-[#1a2235] bg-slate-50 border dark:border-none border-slate-200 dark:text-gray-400 text-slate-700 dark:placeholder-gray-600 placeholder-slate-400 outline-none w-full text-base"
                            />
                            <textarea
                                name="message"
                                required
                                placeholder="Your Message"
                                onInvalid={(e) => e.target.setCustomValidity('Please complete this required field.')}
                                onInput={(e) => e.target.setCustomValidity('')}
                                rows={5}
                                className="dark:bg-[#1a2235] bg-slate-50 border dark:border-none border-slate-200 dark:text-gray-400 text-slate-700 dark:placeholder-gray-600 placeholder-slate-400 outline-none w-full text-base resize-none focus:border-cyan-400 transition-colors"
                            />
                             <button 
                                type="submit"
                                disabled={status === "Sending..."}
                                className="w-full dark:bg-[#1a2235] bg-slate-100 border dark:border-[#2a3a55] border-slate-200 dark:text-white text-slate-800 font-bold text-lg py-4 rounded-xl hover:bg-slate-200 dark:hover:bg-[#1e2d45] hover:border-[#0d7377] dark:hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(13,115,119,0.2)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "Sending..." ? "Sending..." : "Send Message ➤"}
                            </button>

                            {status && status !== "Sending..." && (
                                <div className={`text-center font-medium mt-2 ${status.includes("sent") ? "text-green-400" : "text-red-400"}`}>
                                    {status}
                                </div>
                            )}
                        </motion.form>

                    </div>
                </div>
            </section>
        </>
    );
}