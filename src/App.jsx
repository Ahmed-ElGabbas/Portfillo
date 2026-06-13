import { useState } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certificates from './sections/Certificates';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={`min-h-screen transition-colors duration-300 selection:bg-accent selection:text-primary ${darkMode ? 'dark bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900'}`}>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <main>
                <Hero darkMode={darkMode} />
                <About darkMode={darkMode} />
                <Skills darkMode={darkMode} />
                <Projects darkMode={darkMode} />
                <Certificates darkMode={darkMode} />
                <Contact darkMode={darkMode} />
            </main>
            <Footer darkMode={darkMode} />
        </div>
    );
}
