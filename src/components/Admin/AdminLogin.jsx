import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Development Mock
    if (email === 'admin@vijay.com') {
      setTimeout(() => {
        setStep(2);
        setLoading(false);
        console.log('Mock OTP: 123456');
      }, 1000);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/request-otp', { email });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Development Mock
    if (email === 'admin@vijay.com' && otp === '123456') {
      localStorage.setItem('adminToken', 'dummy-token-for-dev');
      localStorage.setItem('adminData', JSON.stringify({ id: 'dummy', username: 'Vijay Sir', email: 'admin@vijay.com' }));
      navigate('/admin/dashboard');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminData', JSON.stringify(res.data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-dark/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark w-full max-w-md p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {step === 1 ? <Mail className="text-gold" size={32} /> : <ShieldCheck className="text-gold" size={32} />}
          </motion.div>
          <h1 className="text-gold font-gujarati text-3xl font-bold mb-2">
            {step === 1 ? 'એડમિન પોર્ટલ' : 'OTP વેરીફીકેશન'}
          </h1>
          <p className="text-white/40 text-xs uppercase tracking-widest font-bold font-english">
            {step === 1 ? "Secure Personal Access Only" : `Enter the code sent to ${email}`}
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm mb-6 flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRequestOtp} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest ml-1">Vijay Sir's Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-white/30 group-focus-within:text-gold transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20 font-english"
                    placeholder="Enter registered email"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-4 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 disabled:opacity-70"
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <>Send Verification Code <ArrowRight size={18} /></>}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerifyOtp} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-white/60 text-xs font-bold uppercase tracking-widest ml-1">6-Digit Code</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-white/30 group-focus-within:text-gold transition-colors" />
                  </div>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20 font-english text-center tracking-[0.5em] text-xl"
                    placeholder="000000"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-4 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.4)] hover:-translate-y-1 disabled:opacity-70"
                >
                  {loading ? <RefreshCw className="animate-spin" size={20} /> : <>Verify & Access <ArrowRight size={18} /></>}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gold/60 hover:text-gold text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Change Email Address
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.2em] font-bold">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
