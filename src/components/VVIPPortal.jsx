import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Calculator, MessageSquare, ChevronRight, MapPin, Navigation } from 'lucide-react';
import { useData } from '../context/DataContext';

const VVIPPortal = () => {
  const { t } = useTranslation();
  const { settings } = useData();
  const [dimensions, setDimensions] = useState({ length: '', width: '' });
  const [estimate, setEstimate] = useState(null);
  const [activeTab, setActiveTab] = useState('estimator'); // 'estimator' or 'contact'

  const calculateEstimate = () => {
    const area = parseFloat(dimensions.length) * parseFloat(dimensions.width);
    if (!isNaN(area)) {
      setEstimate(area * 500);
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = settings?.whatsappNumber || "911234567890";
    const message = t('whatsapp_msg');
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative min-h-screen py-24 px-8 md:px-16 bg-emerald-dark flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] pointer-events-none"></div>
      
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Map & Location Info */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <h2 className="text-gold font-gujarati text-2xl sm:text-3xl md:text-4xl mb-6 uppercase tracking-widest text-center md:text-left">
              {t('warehouse_location')}
            </h2>
            <p className="text-white/60 font-english text-base mb-8 text-center md:text-left">
              {t('visit_us_desc')}
            </p>

            {/* Warehouse Map Interface */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-emerald-dark/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass-dark rounded-3xl border border-white/10 overflow-hidden h-80 shadow-2xl">
                <iframe
                  title="Morbi Warehouse Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117911.373268804!2d70.806666!3d22.816666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c11397855b3d%3A0x6d90d3023e986f7c!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlay Address */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[2px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                      <MapPin className="text-gold" size={18} />
                    </div>
                    <div>
                      <p className="text-white font-gujarati text-sm font-bold leading-tight">{t('morbi_address')}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Main Warehouse Hub</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <button 
                onClick={() => window.open('https://maps.app.goo.gl/r6Wp5m8W8W8W8W8W8', '_blank')}
                className="absolute top-4 right-4 p-3 bg-gold/10 hover:bg-gold/20 backdrop-blur-md rounded-xl border border-gold/30 text-gold transition-all group-hover:scale-110"
              >
                <Navigation size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Interactive Tools (Estimator & Contact) */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-dark p-8 md:p-12 rounded-3xl border-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Tabs */}
            <div className="flex gap-8 mb-12 border-b border-white/5 pb-4">
              <button
                onClick={() => setActiveTab('estimator')}
                className={`flex items-center gap-2 font-gujarati text-base transition-all duration-300 relative ${
                  activeTab === 'estimator' ? 'text-gold' : 'text-white/40'
                }`}
              >
                <Calculator size={18} />
                {t('project_estimator')}
                {activeTab === 'estimator' && (
                  <motion.div layoutId="tab-active" className="absolute -bottom-5 left-0 w-full h-1 bg-gold"></motion.div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex items-center gap-2 font-gujarati text-base transition-all duration-300 relative ${
                  activeTab === 'contact' ? 'text-gold' : 'text-white/40'
                }`}
              >
                <MessageSquare size={18} />
                {t('contact_us')}
                {activeTab === 'contact' && (
                  <motion.div layoutId="tab-active" className="absolute -bottom-5 left-0 w-full h-1 bg-gold"></motion.div>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'estimator' ? (
                <motion.div
                  key="estimator"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-white/40 text-xs font-bold uppercase tracking-widest">{t('dimensions')} - L</label>
                      <input
                        type="number"
                        placeholder="Length (ft)"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        className="w-full py-4 px-6 glass rounded-xl border-white/5 text-white focus:border-gold/50 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-white/40 text-xs font-bold uppercase tracking-widest">{t('dimensions')} - W</label>
                      <input
                        type="number"
                        placeholder="Width (ft)"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        className="w-full py-4 px-6 glass rounded-xl border-white/5 text-white focus:border-gold/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <button
                    onClick={calculateEstimate}
                    className="w-full py-5 bg-gold text-charcoal font-bold font-gujarati text-lg rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    {t('estimate')}
                    <ChevronRight size={20} />
                  </button>

                  {estimate && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-black/40 rounded-2xl border-gold/30 flex flex-col items-center justify-center text-center"
                    >
                      <div className="text-white/40 text-sm uppercase tracking-widest mb-2">Estimated Cost Range</div>
                      <div className="text-gold font-bold text-2xl md:text-3xl font-english mb-2">
                        ₹{estimate.toLocaleString()} - ₹{(estimate * 1.5).toLocaleString()}
                      </div>
                      <div className="text-white/20 text-[10px]">*Subject to selection and transportation</div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-8"
                >
                  <form onSubmit={handleWhatsApp} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                      <label className="text-white/40 text-xs font-bold uppercase tracking-widest">Inquiry Message (Gujarati)</label>
                      <textarea
                        rows="4"
                        readOnly
                        value={t('whatsapp_msg')}
                        className="w-full py-4 px-6 glass rounded-xl border-white/5 text-white/70 font-gujarati text-lg"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-5 bg-[#25D366] text-white font-bold font-gujarati text-xl rounded-xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <Send size={20} />
                      WhatsApp પર સંપર્ક કરો
                    </button>
                    
                    <div className="text-center text-white/30 text-xs">
                      Vijay Soni usually responds within 2 hours.
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-charcoal/40 blur-[150px] rounded-full -ml-64 -mb-64 pointer-events-none"></div>
    </section>
  );
};

export default VVIPPortal;
