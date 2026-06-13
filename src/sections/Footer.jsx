import { motion } from 'framer-motion';

/* ── StarField — 80 stars, 3 size tiers, purple in light mode, cyan/white in dark ── */
const StarField = ({ darkMode = true }) => {
    const stars = Array.from({ length: 80 }, (_, i) => {
        let size = 1.5;
        const r = Math.random();
        if (r > 0.9) size = 4;
        else if (r > 0.7) size = 3;
        return {
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size,
            duration: 2 + Math.random() * 3,
            delay: Math.random() * 3,
            color: darkMode
                ? (i % 3 === 0 ? 'rgba(34,211,238,0.8)' : 'white')
                : (i % 2 === 0 ? 'rgba(124,58,237,0.9)' : 'rgba(99,102,241,0.7)'),
        };
    });

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

export default function Footer({ darkMode }) {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
                footer { font-family: 'Fredoka', sans-serif !important; }
            `}</style>
            <footer className="py-5 text-center text-gray-500 text-base hover:text-accent transition-colors cursor-pointer relative overflow-hidden z-10">
                <StarField darkMode={darkMode} />
                <span className="relative" style={{ zIndex: 2 }}>© 2026 Ahmed ElGabbas, All rights reserved.</span>
            </footer>
        </>
    );
}
