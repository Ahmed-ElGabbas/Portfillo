import { motion } from 'framer-motion';

// 🎨 عدّل الـ sizes من هنا بسهولة
const FONT_SIZES = {
    title: '3.5rem',      // About Me
    subtitle: '1.60rem',   // My introduction
    paragraph: '1.275rem', // الفقرات
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

export default function About({ darkMode }) {
    return (
        <>
            {/* Fredoka Font Import */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap');
                #about * {
                    font-family: 'Fredoka', sans-serif !important;
                }
            `}</style>

            <section id="about" className="py-24 px-6 relative overflow-hidden">
                <StarField darkMode={darkMode} />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto max-w-4xl relative"
                    style={{ zIndex: 2 }}
                >
                    {/* Header - Centered with underline */}
                    <div className="flex flex-col items-center mb-12">
                        <h2
                            className="font-bold dark:text-white text-slate-900 mb-3"
                            style={{ fontSize: FONT_SIZES.title }}
                        >
                            About Me
                        </h2>
                        <span
                            className="font-medium mb-2"
                            style={{ color: '#0d7377', fontSize: FONT_SIZES.subtitle }}
                        >
                            My introduction
                        </span>
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
                    </div>

                    {/* Paragraphs */}
                    <div className="dark:text-gray-300 text-slate-700 space-y-6">
                        <p style={{ lineHeight: '1.9', fontSize: FONT_SIZES.paragraph }}>
                            Hi, I'm Ahmed Mahmoud Ahmed Elgabbas, a Computer Science and Artificial Intelligence student at Helwan National University specializing in Robotics Software Engineering. I am a passionate Software and Mobile Application Developer with a strong foundation in programming, problem-solving, and software architecture.
                        </p>
                        <p style={{ lineHeight: '1.9', fontSize: FONT_SIZES.paragraph }}>
                            I have hands-on experience in C, C++, Python, and Java, along with front-end web development using HTML, CSS, and JavaScript. I also specialize in mobile application development using Flutter, where I build cross-platform applications with responsive user interfaces, clean architecture, and scalable solutions.
                        </p>
                        <p style={{ lineHeight: '1.9', fontSize: FONT_SIZES.paragraph }}>
                            Beyond technical expertise, I Member of HR Committee at HNU-FCSIT ICPC Community and Head of Sports Committee at HNU-FCSIT Student Union. These leadership roles have strengthened my abilities in team management, event organization, and fostering collaborative environments. I am passionate about continuous learning, problem-solving, and delivering impactful solutions.
                        </p>
                    </div>

                    {/* View CV Button */}
                    <div className="flex justify-center mt-12">
                        <a
                            href="/Ahmed-Mahmoud-Ahmed-Elgabbas-FlowCV-Resume-20241202.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-[#0d7377] dark:text-white text-[#0d7377] hover:bg-[#0d7377] hover:text-white transition-all duration-300 cursor-pointer text-base font-medium hover:shadow-[0_0_20px_rgba(13,115,119,0.6)]"
                            style={{
                                fontFamily: 'Fredoka, sans-serif',
                                textDecoration: 'none',
                            }}
                        >
                            View CV
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </a>
                    </div>
                </motion.div>
            </section>
        </>
    );
}