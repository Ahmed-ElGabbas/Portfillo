import { motion } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar({ darkMode, setDarkMode }) {
    const dark = darkMode;
    const setDark = setDarkMode;
    const [activeSection, setActiveSection] = useState('home');

    const fredokaFont = { fontFamily: "'Fredoka', sans-serif" };

    useEffect(() => {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap';
        document.head.appendChild(fontLink);
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [dark]);

    useEffect(() => {
        const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
        const observers = sections.map((id) => {
            const el = document.getElementById(id);
            if (!el) return null;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0.5 }
            );
            observer.observe(el);
            return observer;
        });
        return () => observers.forEach((o) => o && o.disconnect());
    }, []);

    const links = ['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed w-full z-50 flex justify-center mt-5"
        >
            <div
                className="w-[97%] lg:w-[85%] bg-white/10 dark:bg-black/40 backdrop-blur-md text-black dark:text-white px-8 py-3 rounded-full shadow-xl flex items-center justify-between"
                style={fredokaFont}
            >
                {/* Logo + Name */}
                <a href="#" className="flex items-center gap-1 font-semibold text-3xl">
                    <img
                        src="https://d3moma7wl9.ufs.sh/f/xRZhVxWEJbFMg3pK8b5YV8UEhCTJjONdpB3zebFWKvI2ywxi"
                        alt="Logo Icon"
                        className="w-10 h-10 object-contain"
                    />
                    <span className="dark:text-white text-slate-900">Ahmed ElGabbas</span>
                </a>

                {/* Links */}
                <nav className="hidden md:flex gap-12 text-l font-medium">
                    {links.map((l) => {
                        const isActive = activeSection === l.toLowerCase();
                        return (
                            <a
                                key={l}
                                href={'#' + l.toLowerCase()}
                                className="relative hover:text-cyan-400 transition-colors duration-200 pb-1 group"
                            >
                                {l}
                        {
                            isActive && (
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full"
                                />
                            )
                        }
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                            </a>
                );
                    })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setDark(!dark)}
                    className="bg-white/20 dark:bg-white/10 p-2.5 rounded-lg hover:scale-105 transition"
                >
                    {dark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <Menu className="md:hidden cursor-pointer" />
            </div>
        </div>
        </motion.header >
    );
}