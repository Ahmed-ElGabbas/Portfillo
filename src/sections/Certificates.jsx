import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Calendar, ExternalLink, Eye, Tag, Award, X, ArrowUpRight } from 'lucide-react';

import ecpcPreview    from '../assets/certificates/ecpc-preview.jpg.jpeg';
import databasePreview from '../assets/certificates/database-preview.jpg.jpeg';
import itiPreview     from '../assets/certificates/iti-preview.jpg.jpeg';
import internPreview  from '../assets/certificates/intern-preview.jpg.jpeg';
import swePreview     from '../assets/certificates/swe-preview.jpg.jpeg';

/* ─── DATA ─── */
const certificatesData = [
    {
        title: "ICPC ECPC Qualifications Certificate",
        issuer: "ICPC — Helwan National University",
        date: "August 03, 2025",
        year: "2025",
        description: "Achieved 114th place in the 2025 ICPC ECPC Qualifications Collegiate Programming Contest. Demonstrated strong competitive programming skills and algorithmic problem-solving under pressure.",
        tags: ["Competitive Programming", "Algorithms", "ICPC"],
        preview: ecpcPreview,
        driveLink: "https://drive.google.com/file/d/1SsrIlGZOzcoqK9PTAFZbGQ4iSnavBn-M/view?usp=sharing"
    },
    {
        title: "Database Fundamentals Certificate",
        issuer: "Mahara-Tech — ITI Platform",
        date: "January 20, 2026",
        year: "2026",
        description: "Completed the Database Fundamentals course (2h 47min) on ITI's Mahara-Tech platform. Gained solid knowledge in database design, SQL queries, and data modeling. Verification code: 7KalJ2PlJ1.",
        tags: ["SQL", "Database Design", "Data Modeling"],
        preview: databasePreview,
        driveLink: "https://drive.google.com/file/d/1Eu7FeXwrBbWPV9jNkc7y3CvjByApJRUf/view?usp=sharing"
    },
    {
        title: "Introduction to Software Testing Certificate",
        issuer: "Mahara-Tech — ITI Platform",
        date: "January 20, 2026",
        year: "2026",
        description: "Completed the Introduction to Software Testing Concepts & Techniques course (1h 20min) on ITI's Mahara-Tech platform. Covers core testing methodologies and quality assurance practices. Verification code: EITP6DSUGq.",
        tags: ["Software Testing", "QA", "ITI"],
        preview: itiPreview,
        driveLink: "https://drive.google.com/file/d/1r3EAzN9W9pdUcjzs98eGDz7jfAKsmbXd/view?usp=sharing"
    },
    {
        title: "Software Engineer Intern Certificate",
        issuer: "HackerRank",
        date: "March 01, 2026",
        year: "2026",
        description: "Passed the HackerRank role certification test for Software Engineer Intern. Certificate of Accomplishment presented to Ahmed ElGabbas. ID: 0BA671170530.",
        tags: ["Software Engineering", "HackerRank", "Certification"],
        preview: internPreview,
        driveLink: "https://drive.google.com/file/d/1UbKf3WUNxRBsK7XPDeSIMk3tlAcK-VIy/view?usp=sharing"
    },
    {
        title: "Software Engineer Certificate",
        issuer: "HackerRank",
        date: "January 21, 2026",
        year: "2026",
        description: "Passed the HackerRank role certification test for Software Engineer. Certificate of Accomplishment presented to Ahmed ElGabbas. ID: A5E88E74A78D.",
        tags: ["Software Engineering", "HackerRank", "Certification"],
        preview: swePreview,
        driveLink: "https://drive.google.com/file/d/1PnHu_i9IHHRwQPCSB5BDSQgnxq1K6-hI/view?usp=sharing"
    }
];

/* ─── STAR FIELD ─── */
const StarField = () => {
    const stars = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() > 0.9 ? 3 : Math.random() > 0.7 ? 2 : 1.5,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        color: i % 3 === 0 ? 'rgba(34,211,238,0.9)' : 'rgba(255,255,255,0.75)',
    }));
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {stars.map(s => (
                <motion.div key={s.id} className="absolute rounded-full"
                    style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, background: s.color }}
                    animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.8, 1] }}
                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
};


function CardParticles({ active }) {
    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 8,
        distance: 40 + Math.random() * 30,
    }));
    return (
        <AnimatePresence>
            {active && particles.map(p => {
                const x = Math.cos((p.angle * Math.PI) / 180) * p.distance;
                const y = Math.sin((p.angle * Math.PI) / 180) * p.distance;
                return (
                    <motion.div key={p.id}
                        className="absolute rounded-full pointer-events-none"
                        style={{ width: 3, height: 3, background: '#22d3ee', top: '50%', left: '50%', zIndex: 30 }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x, y, opacity: 0, scale: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                );
            })}
        </AnimatePresence>
    );
}

/* ─── TIMELINE CARD ─── */
function TimelineCard({ cert, index, onClick }) {
    const isLeft = index % 2 === 0;
    const [cardHovered, setCardHovered] = useState(false);
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });
    const glowX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glowY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <div className="relative flex items-start w-full mb-20">

            {/* ── LEFT CARD ── */}
            {isLeft && (
                <>
                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setCardHovered(true)}
                        onMouseLeave={() => { handleMouseLeave(); setCardHovered(false); }}
                        onClick={() => onClick(cert)}
                        initial={{ opacity: 0, x: -70, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        animate={{ y: [0, -14, 0], rotate: [0, 0.4, 0] }}
                        whileHover={{ x: -16, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                            y: { duration: 5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                            rotate: { duration: 5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                            default: { duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                        }}
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
                        className="w-[calc(50%-52px)] mr-auto cursor-pointer group relative"
                    >
                        <CardParticles active={cardHovered} />
                        {/* Mouse glow */}
                        <motion.div
                            className="absolute pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                inset: '-1px', zIndex: 0,
                                background: useTransform([glowX, glowY], ([x, y]) =>
                                    `radial-gradient(circle at ${x}% ${y}%, rgba(34,211,238,0.15), transparent 60%)`),
                            }}
                        />

                        {/* Card */}
                        <div
                            className="relative rounded-2xl overflow-hidden flex flex-col"
                            style={{
                                background: 'linear-gradient(145deg, rgba(13,20,40,0.97), rgba(5,12,25,0.99))',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                                transition: 'border 0.3s, box-shadow 0.3s',
                                zIndex: 1,
                                backdropFilter: 'blur(20px)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.4)';
                                e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.12), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(34,211,238,0.08)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)';
                            }}
                        >
                            {/* Animated corner accents */}
                            <motion.div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderTop: '1.5px solid rgba(34,211,238,0.5)', borderLeft: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '4px 0 0 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                            />
                            <motion.div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderTop: '1.5px solid rgba(34,211,238,0.5)', borderRight: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 4px 0 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 0.6 }}
                            />
                            <motion.div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderBottom: '1.5px solid rgba(34,211,238,0.5)', borderLeft: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 0 0 4px' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 1.2 }}
                            />
                            <motion.div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderBottom: '1.5px solid rgba(34,211,238,0.5)', borderRight: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 0 4px 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 1.8 }}
                            />
                            {/* Top shimmer */}
                            <div className="absolute top-0 left-6 right-6 h-px z-10"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.4), transparent)' }} />

                            {/* IMAGE */}
                            <div className="relative w-full overflow-hidden" style={{ height: '170px', background: 'rgba(5,12,25,1)' }}>
                                {cert.preview ? (
                                    <img src={cert.preview} alt={cert.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Award size={40} className="text-cyan-400 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(5,12,25,0.95))' }} />

                                {/* Number badge */}
                                <motion.div
                                    className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10"
                                    style={{
                                        background: 'rgba(34,211,238,0.15)',
                                        border: '1px solid rgba(34,211,238,0.4)',
                                        color: '#22d3ee',
                                        backdropFilter: 'blur(8px)',
                                    }}
                                    animate={{
                                        boxShadow: ['0 0 8px rgba(34,211,238,0.4)', '0 0 20px rgba(34,211,238,0.8)', '0 0 8px rgba(34,211,238,0.4)'],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </motion.div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'rgba(34,211,238,0.07)' }}>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                                        style={{ background: 'rgba(34,211,238,0.25)', border: '1px solid rgba(34,211,238,0.4)', backdropFilter: 'blur(8px)' }}>
                                        <Eye size={14} /> View Certificate
                                    </div>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-5">
                                {/* Issuer + Date */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Building2 size={11} className="text-cyan-400 flex-shrink-0" />
                                        <span className="text-cyan-400 text-xs font-medium truncate">{cert.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                        <Calendar size={10} className="text-slate-500" />
                                        <span className="text-slate-500 text-xs">{cert.date}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug mb-2"
                                    style={{ fontFamily: '"Fredoka", sans-serif' }}>
                                    {cert.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs leading-relaxed mb-4"
                                    style={{ color: 'rgba(148,163,184,0.75)', fontFamily: '"Fredoka", sans-serif' }}>
                                    {cert.description.slice(0, 100)}...
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 pt-3"
                                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {cert.tags.map(t => (
                                        <span key={t}
                                            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
                                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.45)';
                                                e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.2)';
                                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'rgba(34,211,238,0.06)';
                                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.15)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                            }}
                                            style={{
                                                background: 'rgba(34,211,238,0.06)',
                                                border: '1px solid rgba(34,211,238,0.15)',
                                                color: 'rgba(34,211,238,0.85)',
                                                fontFamily: '"Fredoka", sans-serif',
                                                transition: 'all 0.2s ease',
                                                cursor: 'default',
                                            }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 transition-all duration-200"
                                                style={{ boxShadow: '0 0 4px rgba(34,211,238,0.9)' }} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Scan line */}
                            <motion.div
                                className="absolute left-0 right-0 pointer-events-none"
                                style={{
                                    height: '2px',
                                    background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.8), rgba(255,255,255,0.3), rgba(34,211,238,0.8), transparent)',
                                    boxShadow: '0 0 8px rgba(34,211,238,0.6)',
                                    zIndex: 5,
                                }}
                                animate={{ top: ['-2px', '102%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.6 }}
                            />
                        </div>

                        {/* Connector line → dot */}
                        <div className="absolute top-10 right-0 h-px w-12"
                            style={{ background: 'linear-gradient(to right, rgba(34,211,238,0.5), transparent)' }} />


                    </motion.div>

                    {/* DOT */}
                    <TimelineDot index={index} cert={cert} />
                </>
            )}

            {/* ── RIGHT CARD ── */}
            {!isLeft && (
                <>
                    {/* DOT */}
                    <TimelineDot index={index} cert={cert} />

                    <motion.div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setCardHovered(true)}
                        onMouseLeave={() => { handleMouseLeave(); setCardHovered(false); }}
                        onClick={() => onClick(cert)}
                        initial={{ opacity: 0, x: 70, filter: 'blur(8px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        animate={{ y: [0, 14, 0], rotate: [0, -0.4, 0] }}
                        whileHover={{ x: 16, scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                            y: { duration: 5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                            rotate: { duration: 5 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                            default: { duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
                        }}
                        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
                        className="w-[calc(50%-52px)] ml-auto cursor-pointer group relative"
                    >
                        <CardParticles active={cardHovered} />
                        {/* Mouse glow */}
                        <motion.div
                            className="absolute pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                                inset: '-1px', zIndex: 0,
                                background: useTransform([glowX, glowY], ([x, y]) =>
                                    `radial-gradient(circle at ${x}% ${y}%, rgba(34,211,238,0.15), transparent 60%)`),
                            }}
                        />

                        {/* Card */}
                        <div
                            className="relative rounded-2xl overflow-hidden flex flex-col"
                            style={{
                                background: 'linear-gradient(145deg, rgba(13,20,40,0.97), rgba(5,12,25,0.99))',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                                transition: 'border 0.3s, box-shadow 0.3s',
                                zIndex: 1,
                                backdropFilter: 'blur(20px)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.4)';
                                e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.12), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(34,211,238,0.08)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                                e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)';
                            }}
                        >
                            {/* Animated corner accents */}
                            <motion.div className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderTop: '1.5px solid rgba(34,211,238,0.5)', borderLeft: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '4px 0 0 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
                            />
                            <motion.div className="absolute top-0 right-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderTop: '1.5px solid rgba(34,211,238,0.5)', borderRight: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 4px 0 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 0.6 }}
                            />
                            <motion.div className="absolute bottom-0 left-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderBottom: '1.5px solid rgba(34,211,238,0.5)', borderLeft: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 0 0 4px' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 1.2 }}
                            />
                            <motion.div className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none z-10"
                                style={{ borderBottom: '1.5px solid rgba(34,211,238,0.5)', borderRight: '1.5px solid rgba(34,211,238,0.5)', borderRadius: '0 0 4px 0' }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 + 1.8 }}
                            />
                            {/* Top shimmer */}
                            <div className="absolute top-0 left-6 right-6 h-px z-10"
                                style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.4), transparent)' }} />

                            {/* IMAGE */}
                            <div className="relative w-full overflow-hidden" style={{ height: '170px', background: 'rgba(5,12,25,1)' }}>
                                {cert.preview ? (
                                    <img src={cert.preview} alt={cert.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Award size={40} className="text-cyan-400 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(5,12,25,0.95))' }} />

                                <motion.div
                                    className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10"
                                    style={{
                                        background: 'rgba(34,211,238,0.15)',
                                        border: '1px solid rgba(34,211,238,0.4)',
                                        color: '#22d3ee',
                                        backdropFilter: 'blur(8px)',
                                    }}
                                    animate={{
                                        boxShadow: ['0 0 8px rgba(34,211,238,0.4)', '0 0 20px rgba(34,211,238,0.8)', '0 0 8px rgba(34,211,238,0.4)'],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                                >
                                    {String(index + 1).padStart(2, '0')}
                                </motion.div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'rgba(34,211,238,0.07)' }}>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                                        style={{ background: 'rgba(34,211,238,0.25)', border: '1px solid rgba(34,211,238,0.4)', backdropFilter: 'blur(8px)' }}>
                                        <Eye size={14} /> View Certificate
                                    </div>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <Building2 size={11} className="text-cyan-400 flex-shrink-0" />
                                        <span className="text-cyan-400 text-xs font-medium truncate">{cert.issuer}</span>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                        <Calendar size={10} className="text-slate-500" />
                                        <span className="text-slate-500 text-xs">{cert.date}</span>
                                    </div>
                                </div>

                                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors duration-300 leading-snug mb-2"
                                    style={{ fontFamily: '"Fredoka", sans-serif' }}>
                                    {cert.title}
                                </h3>

                                <p className="text-xs leading-relaxed mb-4"
                                    style={{ color: 'rgba(148,163,184,0.75)', fontFamily: '"Fredoka", sans-serif' }}>
                                    {cert.description.slice(0, 100)}...
                                </p>

                                <div className="flex flex-wrap gap-1.5 pt-3"
                                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                    {cert.tags.map(t => (
                                        <span key={t}
                                            className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-md"
                                            onMouseEnter={e => {
                                                e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
                                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.45)';
                                                e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.2)';
                                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.background = 'rgba(34,211,238,0.06)';
                                                e.currentTarget.style.border = '1px solid rgba(34,211,238,0.15)';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                            }}
                                            style={{
                                                background: 'rgba(34,211,238,0.06)',
                                                border: '1px solid rgba(34,211,238,0.15)',
                                                color: 'rgba(34,211,238,0.85)',
                                                fontFamily: '"Fredoka", sans-serif',
                                                transition: 'all 0.2s ease',
                                                cursor: 'default',
                                            }}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 transition-all duration-200"
                                                style={{ boxShadow: '0 0 4px rgba(34,211,238,0.9)' }} />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Scan line */}
                            <motion.div
                                className="absolute left-0 right-0 pointer-events-none"
                                style={{
                                    height: '2px',
                                    background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.8), rgba(255,255,255,0.3), rgba(34,211,238,0.8), transparent)',
                                    boxShadow: '0 0 8px rgba(34,211,238,0.6)',
                                    zIndex: 5,
                                }}
                                animate={{ top: ['-2px', '102%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.6 }}
                            />
                        </div>

                        {/* Connector line ← dot */}
                        <div className="absolute top-10 left-0 h-px w-12"
                            style={{ background: 'linear-gradient(to left, rgba(34,211,238,0.5), transparent)' }} />


                    </motion.div>
                </>
            )}
        </div>
    );
}

/* ─── TIMELINE DOT ─── */
function TimelineDot({ index, cert }) {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center" style={{ top: '16px' }}>
            {/* Year badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className="mb-2 text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                    background: 'rgba(34,211,238,0.08)',
                    border: '1px solid rgba(34,211,238,0.25)',
                    color: '#22d3ee',
                    backdropFilter: 'blur(8px)',
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                }}
            >
                {cert.year}
            </motion.div>

            {/* Dot with ripple rings */}
            <motion.div
                className="relative flex items-center justify-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200 }}
            >
                {/* Rotating ring */}
                <motion.div
                    className="absolute rounded-full border"
                    style={{ width: 28, height: 28, borderColor: 'rgba(34,211,238,0.4)', borderStyle: 'dashed' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                {/* Ripple 1 */}
                <motion.div className="absolute rounded-full"
                    style={{ width: 36, height: 36, border: '1px solid rgba(34,211,238,0.35)' }}
                    animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0, 0.35] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.25 }}
                />
                {/* Ripple 2 */}
                <motion.div className="absolute rounded-full"
                    style={{ width: 52, height: 52, border: '1px solid rgba(34,211,238,0.18)' }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.18, 0, 0.18] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: index * 0.25 + 0.35 }}
                />
                {/* Core */}
                <div className="w-5 h-5 rounded-full relative z-10"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #a5f3fc, #06b6d4)',
                        boxShadow: '0 0 20px rgba(34,211,238,1), 0 0 40px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.3)',
                    }}
                />
            </motion.div>
        </div>
    );
}

/* ─── MODAL ─── */
function CertModal({ cert, onClose }) {
    if (!cert) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
                onClick={e => { if (e.target === e.currentTarget) onClose(); }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 24 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 24 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    className="relative w-full overflow-y-auto rounded-2xl"
                    style={{
                        maxWidth: '820px', maxHeight: '90vh',
                        background: 'linear-gradient(145deg, rgba(13,20,40,0.99), rgba(5,12,25,1))',
                        border: '1px solid rgba(34,211,238,0.2)',
                        boxShadow: '0 0 80px rgba(34,211,238,0.1), 0 40px 100px rgba(0,0,0,0.8)',
                    }}
                >
                    {/* Top shimmer */}
                    <div className="absolute top-0 left-12 right-12 h-px z-10"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.5), transparent)' }} />

                    {/* Close */}
                    <button onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.2)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(34,211,238,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <X size={16} />
                    </button>

                    {/* Image */}
                    <div className="w-full rounded-t-2xl overflow-hidden" style={{ height: '420px', background: 'rgba(5,12,25,1)' }}>
                        {cert.preview ? (
                            <img src={cert.preview} alt={cert.title} className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Award size={64} className="text-cyan-400 opacity-20" />
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-7">
                        <div className="flex items-center gap-2 mb-3">
                            <Building2 size={13} className="text-cyan-400" />
                            <span className="text-cyan-400 font-medium text-sm">{cert.issuer}</span>
                            <span className="text-slate-700 mx-1">·</span>
                            <Calendar size={12} className="text-slate-500" />
                            <span className="text-slate-500 text-sm">{cert.date}</span>
                        </div>

                        <h3 className="text-white text-2xl font-bold mb-4 leading-snug"
                            style={{ fontFamily: '"Fredoka", sans-serif', textShadow: '0 0 30px rgba(34,211,238,0.15)' }}>
                            {cert.title}
                        </h3>

                        <p className="leading-relaxed mb-6"
                            style={{ color: 'rgba(148,163,184,0.85)', fontFamily: '"Fredoka", sans-serif' }}>
                            {cert.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-7">
                            {cert.tags.map(t => (
                                <span key={t}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(34,211,238,0.12)';
                                        e.currentTarget.style.border = '1px solid rgba(34,211,238,0.45)';
                                        e.currentTarget.style.boxShadow = '0 0 12px rgba(34,211,238,0.2)';
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(34,211,238,0.06)';
                                        e.currentTarget.style.border = '1px solid rgba(34,211,238,0.2)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    }}
                                    style={{
                                        background: 'rgba(34,211,238,0.06)',
                                        border: '1px solid rgba(34,211,238,0.2)',
                                        color: 'rgba(34,211,238,0.9)',
                                        fontFamily: '"Fredoka", sans-serif',
                                        transition: 'all 0.2s ease',
                                    }}>
                                    <Tag size={10} /> {t}
                                </span>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <a href={cert.driveLink} target="_blank" rel="noopener noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200"
                                style={{ background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.35)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.22)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(34,211,238,0.25)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(34,211,238,0.12)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                <ExternalLink size={14} /> Open Full Certificate
                            </a>
                            <button onClick={onClose}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                                style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}>
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

/* ─── MAIN SECTION ─── */
export default function Certificates() {
    const [selected, setSelected] = useState(null);

    return (
        <section
            id="certificates"
            className="py-24 px-6 relative overflow-hidden bg-[#0f172a]"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
            <StarField />

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                    width: '700px', height: '350px',
                    background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
                    filter: 'blur(40px)', zIndex: 0,
                }} />

            {/* Bottom divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(34,211,238,0.2), transparent)' }} />

            <div className="container mx-auto max-w-[1100px] relative" style={{ zIndex: 2 }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold text-white mb-2"
                        style={{ textShadow: '0 0 40px rgba(34,211,238,0.15)' }}>
                        Certificates
                    </h2>
                    <p className="text-cyan-400 text-lg mb-3">Professional Certifications</p>
                    <motion.div
                        className="mx-auto rounded-full"
                        style={{ height: '2px', width: '60px', background: 'linear-gradient(to right, transparent, #22d3ee, transparent)' }}
                        animate={{ scaleX: [0.6, 1.3, 0.6], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* TIMELINE */}
                <div className="relative">
                    {/* Center line */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2" style={{ width: '2px', zIndex: 1 }}>
                        {/* Base */}
                        <div className="absolute inset-0"
                            style={{ background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.12) 8%, rgba(34,211,238,0.12) 92%, transparent)' }} />
                        {/* Fast glow */}
                        <motion.div className="absolute left-0 right-0"
                            style={{ height: '100px', background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.9), rgba(34,211,238,0.4), transparent)', filter: 'blur(1px)' }}
                            animate={{ top: ['-15%', '115%'] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
                        />
                        {/* Slow glow */}
                        <motion.div className="absolute left-0 right-0"
                            style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, rgba(34,211,238,0.2), transparent)' }}
                            animate={{ top: ['-20%', '120%'] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear', repeatDelay: 1, delay: 2 }}
                        />
                    </div>

                    {/* Cards */}
                    {certificatesData.map((cert, i) => (
                        <TimelineCard key={i} cert={cert} index={i} onClick={setSelected} />
                    ))}
                </div>
            </div>

            {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}