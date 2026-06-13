import { motion } from 'framer-motion';

export default function SkillBar({ name, bg, delay = 0, darkMode = true }) {
    return (
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }}>
            <div className="flex justify-between mb-2">
                <span className="font-medium font-mono text-sm dark:text-white text-slate-800">{name}</span>
                <span className="text-accent font-mono text-sm">{bg}</span>
            </div>
            <div className="h-2 dark:bg-slate-700 bg-slate-200 rounded-full overflow-hidden border dark:border-white/5 border-slate-200">
                <motion.div initial={{ width: 0 }} whileInView={{ width: bg }} viewport={{ once: true }} transition={{ duration: 1, delay: delay + 0.2 }} className="h-full bg-accent shadow-[0_0_10px_rgba(56,189,248,0.5)] rounded-full"></motion.div>
            </div>
        </motion.div>
    );
}
