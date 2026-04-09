import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TileLab from '../components/TileLab';
import Curator from '../components/Curator';
import VVIPPortal from '../components/VVIPPortal';
import { useData } from '../context/DataContext';

const SectionWrapper = ({ children, id }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { settings } = useData();
  return (
    <div className="bg-charcoal min-h-screen text-white">
      <Navbar />
      
      <main>
        <SectionWrapper id="hero">
          <Hero />
        </SectionWrapper>

        <SectionWrapper id="tile-lab">
          <TileLab />
        </SectionWrapper>

        <SectionWrapper id="curator">
          <Curator />
        </SectionWrapper>

        <SectionWrapper id="vvip">
          <VVIPPortal />
        </SectionWrapper>
      </main>

      <footer className="py-12 px-8 bg-charcoal text-center border-t border-white/5">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-gold font-gujarati text-2xl font-bold">વી-ટાઇલ્સ</h2>
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold font-english">
            © 2026 V-Tiles Morbi. All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4">
            <a href={settings?.socialMedia?.instagram || "#"} className="text-white/40 hover:text-gold transition-colors text-sm font-english">Instagram</a>
            <a href={settings?.socialMedia?.linkedin || "#"} className="text-white/40 hover:text-gold transition-colors text-sm font-english">LinkedIn</a>
            <a href={settings?.socialMedia?.whatsapp || "#"} className="text-white/40 hover:text-gold transition-colors text-sm font-english">WhatsApp</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
