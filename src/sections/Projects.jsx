import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal, Database, BookOpen, Layers, CheckCircle, Clock } from 'lucide-react';
import projects from '../data/projects';

// High-fidelity interactive UI mockups for when image is null
function MockupPreview({ projectId }) {
    if (projectId === 1) {
        // Upsolve it! - Competitive Programming Platform
        return (
            <div className="w-full h-full p-4 flex flex-col justify-between text-left text-xs font-mono select-none" style={{ background: 'linear-gradient(135deg, #160a2b, #05020c)' }}>
                {/* Window controls */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
                    <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/60" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <span className="w-3 h-3 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-[10px] text-purple-400/60 tracking-wider">upsolve_it_v1.0.3_cli</span>
                    <Terminal size={12} className="text-purple-500/40" />
                </div>
                
                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-3 my-auto">
                    {/* User profile card */}
                    <div className="col-span-5 bg-purple-950/20 border border-purple-500/10 rounded-lg p-2.5 flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-400/40 flex items-center justify-center font-bold text-purple-300 text-[10px]">CF</div>
                            <div>
                                <div className="text-[9px] font-bold text-white leading-tight">elgabbas</div>
                                <div className="text-[8px] text-purple-400">Expert</div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-[8px] text-slate-400">Rating</div>
                            <div className="text-xs font-bold text-purple-400 tracking-wide font-mono">1842 <span className="text-[8px] text-green-400">▲34</span></div>
                        </div>
                    </div>
                    
                    {/* Stats card */}
                    <div className="col-span-7 bg-purple-950/20 border border-purple-500/10 rounded-lg p-2.5 flex flex-col justify-between">
                        <div className="text-[9px] font-semibold text-slate-300 mb-1">Target Categories</div>
                        <div className="space-y-1.5">
                            <div>
                                <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
                                    <span>Dynamic Programming</span>
                                    <span className="text-purple-300 font-bold">84%</span>
                                </div>
                                <div className="h-1.5 w-full bg-purple-950/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '84%' }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
                                    <span>Graphs & Trees</span>
                                    <span className="text-purple-300 font-bold">65%</span>
                                </div>
                                <div className="h-1.5 w-full bg-purple-950/60 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" style={{ width: '65%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Activity Calendar Grid */}
                <div className="border-t border-purple-500/10 pt-3 flex flex-col gap-1.5">
                    <div className="text-[8px] text-slate-400">Recent Recommendation Activity</div>
                    <div className="flex gap-[3px] overflow-hidden">
                        {Array.from({ length: 22 }).map((_, i) => {
                            const opacities = [0.1, 0.2, 0.4, 0.7, 0.9];
                            const op = opacities[Math.floor(Math.sin(i) * 2.5 + 2.5)];
                            return (
                                <div 
                                    key={i} 
                                    className="w-2.5 h-2.5 rounded-[2px]" 
                                    style={{ 
                                        backgroundColor: `rgba(168, 85, 247, ${op})`,
                                        border: `1px solid rgba(168, 85, 247, ${op * 0.5})`
                                    }} 
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    
    if (projectId === 2) {
        // MetaCoder - Programming Competition Platform
        return (
            <div className="w-full h-full p-4 flex flex-col justify-between text-left text-xs font-mono select-none" style={{ background: 'linear-gradient(135deg, #160a2b, #05020c)' }}>
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] text-purple-300 font-bold tracking-wider">METACODER CONTEST PANEL</span>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[8px] text-purple-400 font-semibold animate-pulse">
                        🔴 LIVE MONITOR
                    </div>
                </div>
                
                {/* Grid content */}
                <div className="grid grid-cols-12 gap-3 my-auto">
                    {/* Active scoreboard */}
                    <div className="col-span-8 bg-purple-950/20 border border-purple-500/10 rounded-lg p-2.5">
                        <div className="text-[8px] uppercase tracking-wider text-slate-400 mb-2 font-bold flex justify-between border-b border-purple-500/5 pb-1">
                            <span>Team Leaderboard</span>
                            <span>Score</span>
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[9px]">
                                <span className="text-white flex items-center gap-1">
                                    <span className="text-yellow-400">1.</span> Team_Null_Ptr
                                </span>
                                <span className="text-purple-300 font-bold">1420 pts</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px]">
                                <span className="text-white flex items-center gap-1">
                                    <span className="text-slate-400">2.</span> Binary_Beasts
                                </span>
                                <span className="text-purple-300 font-bold">1310 pts</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px]">
                                <span className="text-white flex items-center gap-1">
                                    <span className="text-amber-600">3.</span> Code_Crusaders
                                </span>
                                <span className="text-purple-300 font-bold">1180 pts</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Running status widget */}
                    <div className="col-span-4 flex flex-col justify-between gap-2">
                        <div className="bg-purple-950/20 border border-purple-500/10 rounded-lg p-1.5 text-center">
                            <div className="text-[8px] text-slate-400 uppercase">Timer</div>
                            <div className="text-[10px] font-bold text-white tracking-wider mt-0.5">01:34:09</div>
                        </div>
                        <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-1.5 text-center flex flex-col justify-center">
                            <div className="text-[7px] text-purple-400 uppercase tracking-wider">Test Suite</div>
                            <div className="text-[8px] text-purple-300 mt-0.5 font-bold">ALL OK (24/24)</div>
                        </div>
                    </div>
                </div>
                
                {/* Footer info line */}
                <div className="border-t border-purple-500/10 pt-3 flex justify-between text-[8px] text-purple-400/60">
                    <span>Active Contestants: 412</span>
                    <span>Server: OK</span>
                </div>
            </div>
        );
    }
    
    if (projectId === 3) {
        // Study Vault - Collaborative Study Platform
        return (
            <div className="w-full h-full p-4 flex flex-col justify-between text-left text-xs font-mono select-none" style={{ background: 'linear-gradient(135deg, #160a2b, #05020c)' }}>
                {/* Search header mock */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
                    <div className="flex items-center gap-2 w-2/3 bg-purple-950/30 border border-purple-500/10 px-2 py-0.5 rounded text-[9px] text-slate-400">
                        <span>🔍 search vaults...</span>
                    </div>
                    <div className="flex -space-x-1.5 overflow-hidden">
                        <div className="w-4 h-4 rounded-full border border-purple-500 bg-purple-600 flex items-center justify-center text-[7px] font-bold text-white">AM</div>
                        <div className="w-4 h-4 rounded-full border border-purple-500 bg-pink-600 flex items-center justify-center text-[7px] font-bold text-white">SK</div>
                        <div className="w-4 h-4 rounded-full border border-purple-500 bg-indigo-600 flex items-center justify-center text-[7px] font-bold text-white">JD</div>
                        <div className="w-4 h-4 rounded-full border border-purple-500 bg-slate-800 flex items-center justify-center text-[6px] font-bold text-purple-300">+2</div>
                    </div>
                </div>
                
                {/* Main vault file view */}
                <div className="grid grid-cols-12 gap-3 my-auto">
                    <div className="col-span-12 space-y-1.5">
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <span>📁</span> Shared Vault Resources
                        </div>
                        
                        {/* File lists */}
                        <div className="grid grid-cols-2 gap-1.5">
                            <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-1 truncate">
                                    <BookOpen size={10} className="text-purple-400" />
                                    <div className="truncate">
                                        <div className="text-[9px] text-white truncate font-bold">Algorithms_Prep.pdf</div>
                                        <div className="text-[7px] text-purple-400">4.2 MB</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-1 truncate">
                                    <Terminal size={10} className="text-purple-400" />
                                    <div className="truncate">
                                        <div className="text-[9px] text-white truncate font-bold">DBMS_Guide.md</div>
                                        <div className="text-[7px] text-purple-400">12 KB</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-1 truncate">
                                    <Database size={10} className="text-purple-400" />
                                    <div className="truncate">
                                        <div className="text-[9px] text-white truncate font-bold">SQL_Queries.sql</div>
                                        <div className="text-[7px] text-purple-400">1.5 MB</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 flex items-center justify-between">
                                <div className="flex items-center gap-1 truncate">
                                    <Layers size={10} className="text-purple-400" />
                                    <div className="truncate">
                                        <div className="text-[9px] text-white truncate font-bold">Lab_Submissions</div>
                                        <div className="text-[7px] text-purple-400">8 Files</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer database size tracker */}
                <div className="border-t border-purple-500/10 pt-3 flex justify-between items-center text-[8px] text-slate-400">
                    <span>Vault Size: 64% full</span>
                    <div className="w-16 h-1 bg-purple-950 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500" style={{ width: '64%' }} />
                    </div>
                </div>
            </div>
        );
    }
    
    if (projectId === 4) {
        // College Management - Academic Management System
        return (
            <div className="w-full h-full p-4 flex flex-col justify-between text-left text-xs font-mono select-none" style={{ background: 'linear-gradient(135deg, #160a2b, #05020c)' }}>
                {/* Window header */}
                <div className="flex items-center justify-between pb-3 border-b border-purple-500/10">
                    <div className="flex items-center gap-2">
                        <span className="text-xs">🏛️</span>
                        <span className="text-[9px] text-white font-bold uppercase tracking-wider">CMS College Dashboard</span>
                    </div>
                    <span className="text-[8px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 rounded font-bold">ADMIN</span>
                </div>
                
                {/* Multi-widget list */}
                <div className="grid grid-cols-3 gap-1.5 my-auto">
                    {/* Card 1 */}
                    <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 text-center">
                        <div className="text-[7px] text-slate-400 uppercase">Students</div>
                        <div className="text-[10px] font-bold text-white mt-0.5">12,480</div>
                        <span className="text-[7px] text-green-400 font-bold">▲ 4.2%</span>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 text-center">
                        <div className="text-[7px] text-slate-400 uppercase">Courses</div>
                        <div className="text-[10px] font-bold text-white mt-0.5">48</div>
                        <span className="text-[7px] text-purple-300 font-bold">Active</span>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-purple-950/20 border border-purple-500/10 rounded p-1.5 text-center">
                        <div className="text-[7px] text-slate-400 uppercase">Faculty</div>
                        <div className="text-[10px] font-bold text-white mt-0.5">312</div>
                        <span className="text-[7px] text-slate-400 font-bold">Online</span>
                    </div>
                </div>
                
                {/* Area/Enrollment Trend Chart mockup */}
                <div className="border-t border-purple-500/10 pt-3 flex flex-col gap-1">
                    <div className="text-[8px] text-slate-400 uppercase tracking-wider">Academic Enrollment Index</div>
                    <div className="h-10 relative mt-1 flex items-end">
                        {/* SVG line overlay for authentic chart feeling */}
                        <svg className="absolute inset-0 w-full h-full text-purple-500" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path d="M 0 35 Q 25 15 50 25 T 100 5 L 100 40 L 0 40 Z" fill="rgba(168, 85, 247, 0.1)" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" />
                        </svg>
                        <div className="w-full flex justify-between text-[6px] text-purple-400/50 z-10 px-1 font-sans">
                            <span>2022</span>
                            <span>2023</span>
                            <span>2024</span>
                            <span>2025</span>
                            <span>2026</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Generic fallback if not matched
    return (
        <div className="w-full h-full flex items-center justify-center bg-purple-950/20">
            <span className="text-purple-400 font-bold font-mono">Preview not available</span>
        </div>
    );
}

export default function Projects() {
    // Spotlight coordinates state for each card to follow cursor
    const [spotlights, setSpotlights] = useState({});

    const handleMouseMove = (id, e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setSpotlights(prev => ({
            ...prev,
            [id]: { x, y }
        }));
    };

    const handleTagClick = (tag) => {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        skillsSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            const allSkillEls = skillsSection.querySelectorAll('[data-skill]');
            let matched = false;
            allSkillEls.forEach(el => {
                const skillName = el.getAttribute('data-skill')?.toLowerCase().trim();
                const tagName = tag.toLowerCase().trim();
                if (skillName === tagName || tagName.includes(skillName) || skillName.includes(tagName) ||
                    skillName.replace('.','') === tagName.replace('.','') ||
                    skillName.replace('js','') === tagName.replace('js','') ||
                    skillName.replace('js','') === tagName.replace('.js','')) {
                    matched = true;
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    el.classList.add('skill-highlight');
                    setTimeout(() => el.classList.remove('skill-highlight'), 2500);
                }
            });
            if (!matched) skillsSection.scrollIntoView({ behavior: 'smooth' });
        }, 900);
    };

    return (
        <section
            id="projects"
            className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-[#0b061c] via-[#05020a] to-[#0b061c]"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
            {/* Soft Ambient grid backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Bottom section divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(to right, transparent, rgba(168,85,247,0.2), transparent)' }} />

            <div className="container mx-auto max-w-[1100px] relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-28"
                >
                    <h2 className="text-5xl font-extrabold text-white mb-3 tracking-tight"
                        style={{ textShadow: '0 0 50px rgba(168,85,247,0.25)' }}>
                        Featured Work
                    </h2>
                    <p className="text-purple-400 text-lg uppercase tracking-[0.2em] font-semibold mb-4">Projects</p>
                    <motion.div
                        className="mx-auto rounded-full"
                        style={{
                            height: '2.5px', width: '80px',
                            background: 'linear-gradient(to right, transparent, #a855f7, transparent)',
                        }}
                        animate={{ scaleX: [0.6, 1.3, 0.6], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                {/* Projects Stack */}
                <div className="space-y-36">
                    {projects.map((p, i) => {
                        const isOdd = i % 2 === 0; // 0-indexed: 1st (0) is odd, 2nd (1) is even

                        return (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                                onMouseMove={(e) => handleMouseMove(p.id, e)}
                                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center relative group"
                            >
                                {/* Spotlight overlay tracking cursor on hover */}
                                {spotlights[p.id] && (
                                    <div
                                        className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                        style={{
                                            width: '600px',
                                            height: '600px',
                                            background: `radial-gradient(circle 300px at ${spotlights[p.id].x}px ${spotlights[p.id].y}px, rgba(168,85,247,0.045), transparent 80%)`,
                                            left: 0,
                                            top: 0,
                                            zIndex: 0,
                                        }}
                                    />
                                )}

                                {/* LEFT/RIGHT SIDE: Text Contents */}
                                <div 
                                    className={`
                                        w-full lg:col-span-7 flex flex-col z-10 mt-8 lg:mt-0
                                        ${isOdd ? 'items-start text-left lg:order-1' : 'items-start text-left lg:items-end lg:text-right lg:order-2'}
                                    `}
                                >
                                    {/* Small Featured label */}
                                    <span className="text-purple-400 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-2">
                                        Featured Project
                                    </span>

                                    {/* Large title */}
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight hover:text-purple-300 transition-colors duration-300">
                                        {p.title}
                                    </h3>

                                    {/* Large Glassmorphism Description Card */}
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        transition={{ duration: 0.3 }}
                                        className={`
                                            w-full bg-[#0c051a]/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 md:p-8 
                                            shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(168,85,247,0.03)] 
                                            hover:border-purple-500/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6),_0_0_40px_rgba(168,85,247,0.08)] 
                                            transition-all duration-300 lg:relative lg:z-20 text-left pointer-events-auto
                                            ${isOdd ? 'lg:-mr-16' : 'lg:-ml-16'}
                                        `}
                                    >
                                        <p className="text-sm md:text-base text-purple-200/90 leading-relaxed font-normal">
                                            {p.desc}
                                        </p>
                                    </motion.div>

                                    {/* Technology Tags */}
                                    <div 
                                        className={`
                                            flex flex-wrap gap-2.5 mt-6 lg:relative lg:z-20
                                            ${isOdd ? '' : 'lg:justify-end'}
                                        `}
                                    >
                                        {p.tags.map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => handleTagClick(tag)}
                                                className="px-3 py-1.5 text-xs font-semibold rounded-full border border-purple-500/30 bg-purple-950/10 text-purple-200 hover:scale-105 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.1)]"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Buttons */}
                                    <div 
                                        className={`
                                            flex flex-wrap items-center gap-4 mt-8 lg:relative lg:z-20
                                            ${isOdd ? '' : 'lg:justify-end'}
                                        `}
                                    >
                                        {/* GitHub Button */}
                                        <a
                                            href={p.githubLink || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-purple-200 border border-purple-500/30 bg-purple-950/10 hover:bg-purple-500/15 hover:border-purple-400 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-all duration-300"
                                        >
                                            <Github size={16} /> GitHub
                                        </a>

                                        {/* Live Demo Button */}
                                        <a
                                            href={p.demoLink || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300"
                                        >
                                            <ExternalLink size={16} /> Live Demo
                                        </a>

                                        {p.status === 'Completed' && (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
                                                <CheckCircle size={12} /> {p.status}
                                            </span>
                                        )}
                                        {p.status === 'In Progress' && (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                                <Clock size={12} /> {p.status}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* LEFT/RIGHT SIDE: Image Preview and Futuristic Frame */}
                                <div 
                                    className={`
                                        w-full lg:col-span-5 relative flex justify-center
                                        ${isOdd ? 'lg:justify-end lg:order-2' : 'lg:justify-start lg:order-1'}
                                    `}
                                >
                                    {/* Large radial purple glow behind the project image */}
                                    <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_65%)] blur-2xl pointer-events-none" style={{ zIndex: 0 }} />

                                    {/* Floating animation wrapper */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: i * 0.5
                                        }}
                                        className="relative group p-[2px] rounded-2xl bg-gradient-to-br from-purple-500/40 via-transparent to-pink-500/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.35)] hover:from-purple-500/60 hover:to-pink-500/60 overflow-hidden w-full max-w-[450px]"
                                        style={{ zIndex: 1 }}
                                    >
                                        {/* Corners Accent lines for futuristic theme */}
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400/80 z-20 pointer-events-none" />
                                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400/80 z-20 pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400/80 z-20 pointer-events-none" />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400/80 z-20 pointer-events-none" />

                                        {/* Light glare sweep on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10 pointer-events-none" />

                                        {/* Inner frame containing preview content */}
                                        <div className="relative rounded-[14px] overflow-hidden bg-[#070312] aspect-[16/10] flex items-center justify-center">
                                            {p.image ? (
                                                <img
                                                    src={p.image}
                                                    alt={p.title}
                                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <MockupPreview projectId={p.id} />
                                            )}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}