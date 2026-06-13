import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/* ══════════════════════════════════════════════════════════
   DATA — DO NOT MODIFY
   ══════════════════════════════════════════════════════════ */

const programmingLanguages = {
  icon: '</>',
  title: 'Programming Languages',
  skills: ['C', 'C++', 'C#', 'LINQ', 'Python', 'Java', 'Go', 'SQL']
};

const coreSkills = {
  icon: '🌐',
  title: 'Core Skills',
  skills: ['Algorithm', 'Data Structures', 'OOP', 'Problem Solving']
};

const mobileDevelopment = {
  icon: '📱',
  title: 'Mobile Development',
  skills: ['Flutter', 'Dart', 'Firebase', 'Android', 'iOS']
};

const frontendDevelopment = {
  icon: '🌐',
  title: 'Frontend Development',
  skills: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Tailwind CSS',
           'Bootstrap', 'SASS', 'Angular', 'React', 'Next.js',
           'Framer Motion', 'Redux']
};

const backendDevelopment = {
  icon: '🛠️',
  title: 'Backend Development',
  skills: ['Node.js', 'Express.js', 'ASP.NET Core', 'Django',
           'MongoDB', 'PostgreSQL', 'MySQL', 'REST APIs']
};

const databasesTechnologies = {
  icon: '🛢️',
  title: 'Databases Technologies',
  skills: ['MySQL', 'PostgreSQL', 'MS SQL Server', 'SQLite', 'MongoDB']
};

const toolsAndIDEs = {
  icon: '⚙️',
  title: 'Tools & IDEs',
  skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'VS Code']
};

const operatingSystems = {
  icon: '🖥️',
  title: 'Operating Systems',
  skills: ['Windows', 'Linux', 'Ubuntu']
};

const softSkills = {
  icon: '👥',
  title: 'Soft Skills',
  skills: ['Communication', 'Teamwork', 'Time Management', 'Leadership',
           'Critical Thinking', 'Creativity', 'Adaptability',
           'Self-Motivation', 'Conflict Resolution', 'Empathy',
           'Active Listening', 'Negotiation']
};

const skillsData = [
  programmingLanguages,
  coreSkills,
  mobileDevelopment,
  frontendDevelopment,
  backendDevelopment,
  databasesTechnologies,
  toolsAndIDEs,
  operatingSystems,
  softSkills
];

/* ══════════════════════════════════════════════════════════
   ORBITAL LAYOUT CONFIG
   ══════════════════════════════════════════════════════════ */

const CX = 550;
const CY = 420;
const DEG = Math.PI / 180;

const ringConfigs = [
  { rx: 148, ry: 78,  speed:  0.000105 },   // inner — clockwise
  { rx: 258, ry: 140, speed: -0.000070 },   // middle — counter-clockwise
  { rx: 368, ry: 192, speed:  0.000052 },   // outer — clockwise
];

/* Ring assignments — distribute 9 categories across 3 rings:
   Inner (2):  coreSkills, operatingSystems
   Middle (3): mobileDevelopment, databasesTechnologies, toolsAndIDEs
   Outer (4):  programmingLanguages, frontendDevelopment, backendDevelopment, softSkills */
const placements = [
  { ring: 2, angle: -48  },  // 0 programmingLanguages
  { ring: 0, angle: -90  },  // 1 coreSkills
  { ring: 1, angle: 8    },  // 2 mobileDevelopment
  { ring: 2, angle: 44   },  // 3 frontendDevelopment
  { ring: 2, angle: 148  },  // 4 backendDevelopment
  { ring: 1, angle: 128  },  // 5 databasesTechnologies
  { ring: 1, angle: 248  },  // 6 toolsAndIDEs
  { ring: 0, angle: 90   },  // 7 operatingSystems
  { ring: 2, angle: 228  },  // 8 softSkills
];

/* ── Tag fan-out positioning ── */
function computeTagPositions(catX, catY, numSkills, outAngle) {
  const positions = [];

  if (numSkills <= 5) {
    const radius = 92;
    const spread = Math.min(Math.PI * 0.85, numSkills * 0.48 + 0.3);
    for (let i = 0; i < numSkills; i++) {
      const t = numSkills === 1 ? 0 : i / (numSkills - 1) - 0.5;
      const a = outAngle + t * spread;
      positions.push({ x: catX + radius * Math.cos(a), y: catY + radius * Math.sin(a) });
    }
  } else if (numSkills <= 7) {
    const innerC = Math.ceil(numSkills / 2);
    const outerC = numSkills - innerC;
    [{ count: innerC, r: 88 }, { count: outerC, r: 152 }].forEach(({ count, r }, ri) => {
      const spread = Math.min(Math.PI * 0.85, count * 0.48 + 0.3);
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1) - 0.5;
        positions.push({
          x: catX + r * Math.cos(outAngle + t * spread),
          y: catY + r * Math.sin(outAngle + t * spread),
        });
      }
    });
  } else {
    const r1 = Math.ceil(numSkills / 3);
    const r2 = Math.ceil((numSkills - r1) / 2);
    const r3 = numSkills - r1 - r2;
    [{ count: r1, r: 82 }, { count: r2, r: 132 }, { count: r3, r: 178 }].forEach(({ count, r }) => {
      const spread = Math.min(Math.PI * 0.92, count * 0.52 + 0.3);
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0 : i / (count - 1) - 0.5;
        positions.push({
          x: catX + r * Math.cos(outAngle + t * spread),
          y: catY + r * Math.sin(outAngle + t * spread),
        });
      }
    });
  }
  return positions;
}

/* ── SVG curved path helper ── */
function curvePath(x1, y1, x2, y2, bendFactor = 0.12) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const off = len * bendFactor;
  return `M ${x1} ${y1} Q ${mx + (-dy / len) * off} ${my + (dx / len) * off} ${x2} ${y2}`;
}

/* ── Particle field ── */
const particles = Array.from({ length: 45 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() > 0.82 ? 2.2 : 1.2,
  dur: 3 + Math.random() * 5,
  delay: Math.random() * 6,
  purple: i % 4 === 0,
}));

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */

export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [time, setTime] = useState(0);
  const rafRef = useRef(null);
  const prevRef = useRef(null);

  /* ── Animation loop ── */
  const tick = useCallback((ts) => {
    if (prevRef.current === null) prevRef.current = ts;
    const dt = ts - prevRef.current;
    prevRef.current = ts;
    setTime((t) => t + dt);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [tick]);

  /* ── Compute live category positions ── */
  const catPositions = placements.map((p) => {
    const rc = ringConfigs[p.ring];
    const angle = p.angle * DEG + rc.speed * time;
    return {
      x: CX + rc.rx * Math.cos(angle),
      y: CY + rc.ry * Math.sin(angle),
    };
  });

  /* ── Active category tags ── */
  const ap = catPositions[activeIdx];
  const ac = skillsData[activeIdx];
  const outAngle = Math.atan2(ap.y - CY, ap.x - CX);
  const tagPos = computeTagPositions(ap.x, ap.y, ac.skills.length, outAngle);

  return (
    <section
      id="skills"
      className="relative"
      style={{
        background: '#09091a',
        padding: '80px 0 100px',
        fontFamily: "'Fredoka', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* ── CSS Keyframes ── */}
      <style>{`
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.12; }
          50%      { opacity: 0.75; }
        }
        @keyframes dashFlow {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -20; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes tagFadeIn {
          from { opacity: 0; transform: scale(0.55); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
      `}</style>

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
        style={{ marginBottom: '40px' }}
      >
        <h2 className="text-white font-bold" style={{ fontSize: '36px', margin: 0 }}>
          My Skills
        </h2>
        <p style={{ fontSize: '16px', color: '#7c3aed', marginTop: '6px' }}>
          Technical Proficiencies
        </p>
        <div style={{
          width: '40px', height: '2.5px', background: '#7c3aed',
          borderRadius: '2px', margin: '8px auto 0',
        }} />
      </motion.div>

      {/* ── Orbital Canvas ── */}
      <div style={{
        position: 'relative', width: '1100px', height: '860px',
        margin: '0 auto', overflow: 'visible',
      }}>

        {/* ── Ambient bloom ── */}
        <div style={{
          position: 'absolute', left: CX, top: CY,
          transform: 'translate(-50%, -50%)',
          width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── Particles ── */}
        {particles.map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: p.purple ? 'rgba(124,58,237,0.65)' : 'rgba(255,255,255,0.45)',
            animation: `twinkle ${p.dur}s ease-in-out ${p.delay}s infinite`,
            pointerEvents: 'none', zIndex: 0,
          }} />
        ))}

        {/* ── SVG: Rings + Connections ── */}
        <svg
          width="1100" height="860"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
        >
          {/* Glow filter */}
          <defs>
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Decorative ring ellipses */}
          {ringConfigs.map((rc, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={rc.rx} ry={rc.ry}
              fill="none" stroke="#7c3aed" strokeOpacity="0.18"
              strokeDasharray="5 7" strokeWidth="0.8"
              style={{
                transformOrigin: `${CX}px ${CY}px`,
                animation: `spin ${[45, 65, 90][i]}s linear infinite ${i === 1 ? 'reverse' : 'normal'}`,
              }}
            />
          ))}

          {/* Center → category curves */}
          {catPositions.map((cp, i) => (
            <path key={i}
              d={curvePath(CX, CY, cp.x, cp.y, 0.10)}
              fill="none" stroke="#7c3aed"
              strokeWidth={i === activeIdx ? '1' : '0.6'}
              strokeOpacity={i === activeIdx ? '0.55' : '0.12'}
              strokeDasharray="4 6"
              filter="url(#lineGlow)"
              style={{ animation: 'dashFlow 2.5s linear infinite', transition: 'stroke-opacity 0.4s' }}
            />
          ))}

          {/* Active category → tag lines */}
          {tagPos.map((tp, i) => (
            <path key={`t-${activeIdx}-${i}`}
              d={curvePath(ap.x, ap.y, tp.x, tp.y, 0.08)}
              fill="none" stroke="#7c3aed"
              strokeWidth="0.7" strokeOpacity="0.38"
              strokeDasharray="3 5"
              filter="url(#lineGlow)"
              style={{ animation: 'dashFlow 1.8s linear infinite' }}
            />
          ))}
        </svg>

        {/* ── Center Orb ── */}
        <div style={{
          position: 'absolute',
          left: CX - 60, top: CY - 60,
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 38%, #9b59f5, #4c1d95 55%, #2e0d6e)',
          boxShadow: `
            0 0 30px rgba(124,58,237,0.6),
            0 0 60px rgba(124,58,237,0.35),
            0 0 110px rgba(124,58,237,0.18),
            inset 0 0 30px rgba(167,139,250,0.15)
          `,
          animation: 'orbPulse 3s ease-in-out infinite',
          zIndex: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            color: '#fff', fontSize: 16, fontWeight: 700,
            textAlign: 'center', lineHeight: 1.25,
            textShadow: '0 0 14px rgba(255,255,255,0.35)',
            userSelect: 'none',
          }}>
            My<br />Skills
          </span>
        </div>

        {/* ── Category Nodes ── */}
        {catPositions.map((cp, i) => {
          const isActive = i === activeIdx;
          return (
            <div key={skillsData[i].title}
              style={{
                position: 'absolute', left: cp.x, top: cp.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 15,
              }}
            >
              <div
                onMouseEnter={() => setActiveIdx(i)}
                style={{
                  padding: '8px 20px', borderRadius: 999,
                  border: `1.5px solid ${isActive ? '#7c3aed' : '#2d2d50'}`,
                  background: isActive
                    ? 'rgba(124,58,237,0.12)'
                    : 'rgba(13,13,30,0.85)',
                  backdropFilter: 'blur(8px)',
                  fontSize: 13, fontWeight: 600,
                  color: isActive ? '#e0d4ff' : '#b0b0c8',
                  whiteSpace: 'nowrap', cursor: 'pointer', userSelect: 'none',
                  boxShadow: isActive
                    ? '0 0 22px rgba(124,58,237,0.55), 0 0 50px rgba(124,58,237,0.2)'
                    : '0 0 0 transparent',
                  transition: 'border-color 0.25s, color 0.25s, box-shadow 0.35s, background 0.25s',
                  animation: `floatY ${4.2 + (i % 4) * 0.6}s ease-in-out ${i * 0.45}s infinite`,
                }}
              >
                {skillsData[i].title}
              </div>
            </div>
          );
        })}

        {/* ── Skill Tags (active category only) ── */}
        {tagPos.map((tp, i) => (
          <SkillTag
            key={`${activeIdx}-${ac.skills[i]}`}
            skill={ac.skills[i]}
            x={tp.x}
            y={tp.y}
            delay={i * 40}
          />
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SKILL TAG SUB-COMPONENT
   ══════════════════════════════════════════════════════════ */

function SkillTag({ skill, x, y, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: 'translate(-50%, -50%)',
      zIndex: 22, pointerEvents: 'auto',
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '5px 14px',
          borderRadius: 8,
          border: `1px solid ${hovered ? '#7c3aed' : '#252545'}`,
          background: hovered
            ? 'rgba(124,58,237,0.10)'
            : 'rgba(10,10,28,0.92)',
          backdropFilter: 'blur(6px)',
          fontSize: 12, fontWeight: 500,
          color: hovered ? '#e0d4ff' : '#8888aa',
          whiteSpace: 'nowrap', cursor: 'default', userSelect: 'none',
          boxShadow: hovered ? '0 0 14px rgba(124,58,237,0.45)' : 'none',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          animation: `tagFadeIn 0.32s ${delay}ms ease both`,
          transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s, transform 0.2s, background 0.2s',
        }}
      >
        {skill}
      </div>
    </div>
  );
}