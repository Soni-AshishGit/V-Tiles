import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Mail, Github, LogIn } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass-dark rounded-3xl border border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            {/* Header Decoration */}
            <div className="h-2 w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-10">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                  <Lock className="text-gold" size={32} />
                </div>
                <h2 className="text-2xl font-gujarati text-gold mb-2">વી-ટાઇલ્સ પ્રીમિયમ</h2>
                <p className="text-white/40 text-xs font-english uppercase tracking-widest">Premium Services Login</p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Social Logins */}
                <button className="flex items-center justify-center gap-4 w-full py-4 glass rounded-xl border-white/5 hover:border-gold/30 transition-all duration-300 group">
                  <Github size={18} className="text-white group-hover:text-gold" />
                  <span className="text-white font-medium text-sm">Continue with GitHub</span>
                </button>
                
                <button className="flex items-center justify-center gap-4 w-full py-4 glass rounded-xl border-white/5 hover:border-gold/30 transition-all duration-300 group">
                  <Mail size={18} className="text-white group-hover:text-gold" />
                  <span className="text-white font-medium text-sm">Continue with Email</span>
                </button>

                <div className="relative my-6 flex items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-white/20 text-xs uppercase tracking-widest font-bold">OR</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Corporate Login */}
                <button className="w-full py-4 bg-gold text-charcoal font-bold rounded-xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 group">
                  <LogIn size={20} />
                  <span>Corporate Login</span>
                </button>
              </div>

              <p className="mt-10 text-center text-white/30 text-[10px] uppercase tracking-widest font-bold leading-relaxed">
                By accessing the VVIP portal, you agree to our<br />
                <span className="text-gold/50 cursor-pointer hover:text-gold transition-colors">Exclusive Terms of Service</span>
              </p>
            </div>
            
            {/* Footer Decoration */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
