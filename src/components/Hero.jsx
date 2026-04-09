import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero = () => {
  const { t } = useTranslation();
  const { settings } = useData();

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-charcoal pt-20">
      {/* Marble Textured Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
      
      {/* Decorative Gold & Emerald Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full -mr-40 -mt-40 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-dark/10 blur-[150px] rounded-full -ml-40 -mb-40 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
        
        {/* Left Content: Brand & Tagline */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Animated Brand Name */}
            <div className="mb-6 overflow-hidden w-full">
              <svg 
                viewBox="0 0 400 120" 
                className="w-full h-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] max-w-lg mx-auto md:mx-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <motion.text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-4xl md:text-6xl font-gujarati fill-transparent stroke-gold stroke-2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                  {t('brand')}
                </motion.text>
              </svg>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-2xl lg:text-3xl font-gujarati text-white/90 mb-8 leading-tight px-4 md:px-0"
            >
              {t('tagline')}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="flex items-center justify-center md:justify-start gap-4 group mt-4"
            >
              <div className="hidden sm:block w-16 h-[1px] bg-gold/40 group-hover:w-24 transition-all duration-500"></div>
              <p className="font-signature text-gold text-2xl sm:text-3xl md:text-4xl whitespace-nowrap">
                Curated by Vijay Soni
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Content: Avatar / Signature Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex-shrink-0 relative group"
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-gold/20 scale-110 group-hover:scale-125 transition-transform duration-700 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full border border-emerald-dark/40 scale-125 group-hover:scale-150 transition-transform duration-1000 pointer-events-none"></div>
          
          {/* Avatar Container */}
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-gold/30 shadow-[0_0_60px_rgba(212,175,55,0.2)] bg-gradient-to-br from-charcoal to-black flex items-center justify-center transition-all duration-700">
            {/* Using a dynamic image or Lucide Icon as a placeholder for the avatar */}
            <div className="text-gold/20 absolute inset-0 flex items-center justify-center p-8">
               {settings?.avatarUrl ? (
                 <img src={settings.avatarUrl} alt="Vijay Soni" className="w-full h-full object-cover" />
               ) : (
                 <User className="w-full h-full opacity-50" strokeWidth={0.5} />
               )}
            </div>
            
            {/* Optional: Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-60"></div>
            
            {/* Animated Glow on Hover */}
            <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="absolute bottom-0 right-0 sm:-bottom-6 sm:-right-6 glass-dark px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl border border-gold/40 shadow-xl"
          >
            <p className="text-gold font-bold text-sm tracking-widest uppercase">Vijay Soni</p>
            <p className="text-white/40 text-[10px] uppercase font-bold text-center">Since 2019</p>
          </motion.div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Explore Craft</p>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
