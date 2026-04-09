import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Star, History, MapPin } from 'lucide-react';

const Curator = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: <History size={20} />, value: "20+", label: "Years Experience" },
    { icon: <MapPin size={20} />, value: "Morbi", label: "Heritage Hub" },
    { icon: <Award size={20} />, value: "Premium", label: "Curation" },
    { icon: <Star size={20} />, value: "100+", label: "Projects" },
  ];

  return (
    <section className="relative py-24 px-8 md:px-16 bg-charcoal flex flex-col items-center justify-center overflow-hidden border-b border-white/5">
      {/* Decorative Signature Background */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.03]">
        <h1 className="text-[20vw] font-signature text-gold whitespace-nowrap rotate-[-5deg]">
          Vijay Soni
        </h1>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gold font-gujarati text-2xl sm:text-3xl md:text-4xl mb-8 md:mb-12 uppercase tracking-widest"
        >
          {t('curator_title')}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 font-english text-base md:text-lg leading-relaxed mb-16 text-center max-w-2xl mx-auto"
        >
          Vijay Soni is a visionary curator of architectural elegance, specializing in the finest ceramic and porcelain tiles from Morbi, India's tile capital. With over two decades of expertise, he bridges the gap between raw craftsmanship and industrial luxury.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center gap-2 p-6 glass rounded-2xl border-white/5 group hover:border-gold/30 transition-all duration-300"
            >
              <div className="text-gold/60 group-hover:text-gold transition-colors">
                {stat.icon}
              </div>
              <div className="text-white font-bold text-xl font-english">
                {stat.value}
              </div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          <p className="font-signature text-gold text-3xl">
            Vijay Soni
          </p>
        </motion.div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-dark/10 blur-[100px] rounded-full -mr-32 -mb-32"></div>
    </section>
  );
};

export default Curator;
