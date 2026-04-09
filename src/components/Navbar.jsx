import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Menu, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    setIsMobileMenuOpen(false);
  };

  const languages = [
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'en', name: 'English' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-transparent backdrop-blur-sm md:backdrop-blur-none border-b border-white/5 md:border-none">
        {/* Brand Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-gold font-gujarati text-xl md:text-2xl font-bold cursor-pointer"
        >
          {t('brand')}
        </motion.div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-6">
          <div className="glass-dark px-4 py-2 rounded-full flex items-center gap-3">
            <Languages size={18} className="text-gold" />
            <div className="flex gap-3 text-[10px] font-medium uppercase tracking-widest">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`transition-all duration-300 px-3 py-1 rounded-md ${
                    i18n.language === lang.code 
                    ? 'bg-gold text-charcoal shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              const element = document.getElementById('vvip');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-3 bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all duration-500 px-6 py-2.5 rounded-full group"
          >
            <MapPin size={18} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-gold font-bold text-[10px] uppercase tracking-widest">{t('warehouse_location')}</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => {
              const element = document.getElementById('vvip');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-10 h-10 flex items-center justify-center glass-dark rounded-full text-gold"
          >
            <MapPin size={20} />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center glass-dark rounded-full text-gold"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 pt-24"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-xs">
              <div className="flex flex-col items-center gap-4 w-full">
                <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Languages size={14} /> Select Language
                </p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full py-4 rounded-2xl border transition-all duration-300 font-gujarati text-xl ${
                      i18n.language === lang.code 
                      ? 'bg-gold border-gold text-charcoal font-bold shadow-[0_0_25px_rgba(212,175,55,0.2)]' 
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              <div className="w-full h-[1px] bg-white/5"></div>

              <button 
                onClick={() => {
                  const element = document.getElementById('vvip');
                  element?.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-4 py-5 bg-gold/10 border border-gold/40 text-gold rounded-2xl font-bold uppercase tracking-widest text-sm"
              >
                <MapPin size={20} />
                {t('warehouse_location')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;
