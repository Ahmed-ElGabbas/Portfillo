import { motion } from 'framer-motion';
import { Github, Linkedin, Facebook, Twitter, Mail, Download, Code2, Star, Palette } from 'lucide-react';
import profileImg from '../assets/hero-profile.jpg';
import { useState, useEffect } from 'react';

const TypewriterText = ({ words = ['React Developer', 'UI Designer', 'Problem Solver'] }) => {
    const [displayText, setDisplayText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        const typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentWord.length) {
                    setDisplayText(currentWord.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentWord.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setWordIndex((wordIndex + 1) % words.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayText, wordIndex, isDeleting, words]);

    return <span className="text-cyan-400">{displayText}</span>;
};

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

const PDF_B64 = "YOUR_PDF_B64_HERE";

export default function Hero({ darkMode }) {
    const roles = ['Full Stack Developer', 'Mobile Application Developer', 'Competitive Programmer'];

    const orbitingIcons = [
        { id: 1, Icon: Code2, angle: 0, label: 'Developer' },
        { id: 2, Icon: Star, angle: 120, label: 'Star' },
        { id: 3, Icon: Palette, angle: 240, label: 'Design' },
    ];

    useEffect(() => {
        const preconnect1Id = 'fredoka-preconnect-1';
        const preconnect2Id = 'fredoka-preconnect-2';
        const fontId = 'fredoka-font-link';

        if (!document.getElementById(preconnect1Id)) {
            const preconnect1 = document.createElement('link');
            preconnect1.id = preconnect1Id;
            preconnect1.rel = 'preconnect';
            preconnect1.href = 'https://fonts.googleapis.com';
            document.head.appendChild(preconnect1);
        }

        if (!document.getElementById(preconnect2Id)) {
            const preconnect2 = document.createElement('link');
            preconnect2.id = preconnect2Id;
            preconnect2.rel = 'preconnect';
            preconnect2.href = 'https://fonts.gstatic.com';
            preconnect2.crossOrigin = 'anonymous';
            document.head.appendChild(preconnect2);
        }

        if (!document.getElementById(fontId)) {
            const fontLink = document.createElement('link');
            fontLink.id = fontId;
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&display=swap';
            document.head.appendChild(fontLink);
        }
    }, []);

    const fredokaFont = { fontFamily: '"Fredoka", sans-serif' };

    const handleGetInTouch = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    };

    const handleScroll = () => {
        const nextSection = document.getElementById('about');
        if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDownloadCV = () => {
        const byteChars = atob(PDF_B64);
        const byteNumbers = new Array(byteChars.length);
        for (let i = 0; i < byteChars.length; i++) {
            byteNumbers[i] = byteChars.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Ahmed-Elgabbas-CV.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    const dots = Array.from({ length: 8 }, (_, i) => ({
        idx: i,
        startAngle: (i * 360) / 8,
        duration: 12,
        size: i % 2 === 0 ? 'w-3 h-3' : 'w-2 h-2',
        opacity: i % 3 === 0 ? 'opacity-100' : 'opacity-60',
    }));

    return (
        <section id="home" className="min-h-screen flex items-center px-6 pt-20 relative overflow-hidden dark:bg-slate-900 bg-white" style={fredokaFont}>
            <StarField darkMode={darkMode} />
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

            <div className="container mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* LEFT SIDE */}
                <div className="order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8 inline-block"
                    >
                        <div className="flex items-center gap-2 dark:bg-slate-800/50 bg-slate-100/50 border dark:border-slate-700 border-slate-200 rounded-full px-4 py-2 backdrop-blur-sm">
                            <span className="text-lg">👋</span>
                            <span className="text-cyan-400 text-sm" style={fredokaFont}>Hello, I'm Gabbas</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-5xl font-bold mb-6 tracking-tight dark:text-white text-slate-900"
                        style={fredokaFont}
                    >
                        Ahmed Mahmoud ElGabbas
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-4xl font-bold mb-2 dark:text-gray-300 text-slate-700 whitespace-nowrap"
                        style={fredokaFont}
                    >
                        I'm a <TypewriterText words={roles} />
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="text-cyan-400 ml-1"
                        >
                            |
                        </motion.span>
                    </motion.h2>

                    {/* Animated underline under role text */}
                    <motion.div
                        className="mt-2 mb-6 rounded-full"
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

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="dark:text-gray-400 text-slate-600 max-w-xl mb-8 leading-relaxed text-lg"
                        style={fredokaFont}
                    >
                        I'm a passionate full-stack engineer specializing in building exceptional digital experiences across web and mobile platforms. Experienced in competitive programming and crafting human-centered, accessible products at the intersection of design and code.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-4 mb-12"
                    >
                        <motion.button
                            onClick={handleGetInTouch}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-600 transition-colors cursor-pointer"
                            style={fredokaFont}
                        >
                            <Mail size={20} />
                            Get In Touch
                        </motion.button>

                        <motion.button
                            onClick={handleDownloadCV}
                            whileHover={{ scale: 1.05, borderColor: '#22d3ee' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-full font-semibold hover:bg-cyan-400/10 transition-colors cursor-pointer"
                            style={fredokaFont}
                        >
                            <Download size={20} />
                            Download CV
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="flex gap-6"
                    >
                        {[
                            { Icon: Github, label: 'GitHub', color: 'hover:text-gray-300', link: 'https://github.com/Elagbbas' },
                            { Icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-400', link: 'https://www.linkedin.com/in/ahmed-elgabbas-33a186344' },
                            { Icon: Facebook, label: 'Facebook', color: 'hover:text-blue-500', link: 'https://www.facebook.com/share/17dLWSBhAa/' },
                            { Icon: Twitter, label: 'Twitter', color: 'hover:text-cyan-400', link: 'https://x.com/A7med_ElGabbas' },
                        ].map(({ Icon, label, color, link }) => (
                            <motion.a
                                key={label}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className={`p-3 rounded-full dark:bg-slate-800 bg-slate-100 border dark:border-slate-700 border-slate-200 dark:text-gray-400 text-slate-600 transition-colors ${color}`}
                                aria-label={label}
                            >
                                <Icon size={24} />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT SIDE - Image Circle */}
                <motion.div
                    className="order-1 lg:order-2 flex justify-center items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="relative" style={{ width: '480px', height: '480px' }}>
                                {/* Outer rotating ring border */}
                                <motion.div
                                    className="absolute rounded-full border-8 border-cyan-400/40"
                                    style={{
                                        inset: '-10px',
                                        boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 40px rgba(34, 211, 238, 0.1)'
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                />

                                {/* Main Photo Circle */}
                                <div
                                    className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-slate-900/40 group"
                                    style={{ padding: '0px' }}
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                    <img
                                        src={profileImg}
                                        alt="Ahmed Elgabbas"
                                        className="w-full h-full object-cover rounded-full"
                                        style={{ objectPosition: 'center top' }}
                                    />
                                </div>
                                {/* Fixed Icons on the outer border */}
                                {orbitingIcons.map((item) => {
                                    const radius = 268;
                                    const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                                    const y = Math.sin((item.angle * Math.PI) / 180) * radius;

                                    return (
                                        <motion.a
                                            key={item.id}
                                            href={item.link || '#'}
                                            target={item.link ? '_blank' : '_self'}
                                            rel={item.link ? 'noopener noreferrer' : ''}
                                            className="absolute w-9 h-9 rounded-full dark:bg-slate-800/90 bg-slate-100/90 border border-cyan-400/60 flex items-center justify-center cursor-pointer z-20"
                                            style={{
                                                left: `calc(50% + ${x}px)`,
                                                top: `calc(50% + ${y}px)`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                            whileHover={{
                                                boxShadow: '0 0 16px rgba(34, 211, 238, 0.8)'
                                            }}
                                            whileTap={{ scale: 1 }}
                                        >
                                            <item.Icon size={16} className="text-cyan-400" />
                                        </motion.a>
                                    );
                                })}

                                {/* Floating Dots - continuous loop animation */}
                                {dots.map(({ idx, startAngle, duration, size, opacity }) => (
                                    <motion.div
                                        key={`dot-${idx}`}
                                        className={`absolute ${size} ${opacity} rounded-full bg-cyan-400`}
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            marginLeft: '-6px',
                                            marginTop: '-6px',
                                            transformOrigin: '6px 6px',
                                        }}
                                        animate={{
                                            rotate: [startAngle, startAngle + 360],
                                            x: [
                                                Math.cos((startAngle * Math.PI) / 180) * 250,
                                                Math.cos(((startAngle + 90) * Math.PI) / 180) * 250,
                                                Math.cos(((startAngle + 180) * Math.PI) / 180) * 250,
                                                Math.cos(((startAngle + 270) * Math.PI) / 180) * 250,
                                                Math.cos((startAngle * Math.PI) / 180) * 250,
                                            ],
                                            y: [
                                                Math.sin((startAngle * Math.PI) / 180) * 250,
                                                Math.sin(((startAngle + 90) * Math.PI) / 180) * 250,
                                                Math.sin(((startAngle + 180) * Math.PI) / 180) * 250,
                                                Math.sin(((startAngle + 270) * Math.PI) / 180) * 250,
                                                Math.sin((startAngle * Math.PI) / 180) * 250,
                                            ],
                                        }}
                                        transition={{
                                            duration: duration,
                                            repeat: Infinity,
                                            ease: 'linear',
                                            repeatType: 'loop',
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Fixed button under the frame */}
                        <motion.div
                            className="mt-12 flex items-center gap-2 dark:bg-slate-800/80 bg-slate-100/80 border border-cyan-400/30 rounded-full px-5 py-2.5 backdrop-blur-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.6 }}
                            style={fredokaFont}
                        >
                            <motion.span
                                className="w-3 h-3 rounded-full bg-cyan-400 block"
                                animate={{
                                    scale: [1, 1.8, 1],
                                    opacity: [1, 0.4, 1],
                                    boxShadow: [
                                        '0 0 0 0 rgba(34,211,238,0.7)',
                                        '0 0 0 8px rgba(34,211,238,0)',
                                        '0 0 0 0 rgba(34,211,238,0)'
                                    ]
                                }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                style={{ flexShrink: 0 }}
                            />
                            <span className="text-cyan-400 text-sm font-medium" style={fredokaFont}>
                                Open to new opportunities
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                onClick={handleScroll}
            >
                <p className="dark:text-gray-400 text-slate-600 text-sm mb-2" style={fredokaFont}>Scroll to explore</p>
                <svg className="w-6 h-6 text-cyan-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </motion.div>
        </section>
    );
}