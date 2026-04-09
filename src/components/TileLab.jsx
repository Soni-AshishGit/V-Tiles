import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Environment, ContactShadows } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, ShieldCheck, Waves, Sparkles, Droplets, Layers, MousePointer2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import ErrorBoundary from './ErrorBoundary';
import * as THREE from 'three';

const TileModel = ({ materialType, isMixing, glossLevel, imageUrl }) => {
  const meshRef = useRef();
  const texture = imageUrl ? new THREE.TextureLoader().load(imageUrl) : null;
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t / 4) / 4;
      meshRef.current.rotation.z = Math.cos(t / 4) / 10;
    }
  });

  const getMaterialProps = () => {
    const base = {
      roughness: 0.02,
      metalness: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.01,
      reflectivity: 1,
      transmission: 0,
      thickness: 0.5,
    };

    switch (materialType) {
      case 'basaltic':
        return { ...base, color: "#1A1A1A", roughness: 0.1, metalness: 0.4 };
      case 'gold':
        return { ...base, color: "#D4AF37", metalness: 0.9, roughness: 0.05 };
      case 'emerald':
        return { ...base, color: "#042F2E", roughness: 0.03, metalness: 0.6, emissive: "#021a19", emissiveIntensity: 0.2 };
      case 'obsidian':
        return { ...base, color: "#050505", roughness: 0.01, metalness: 0.9, clearcoat: 1 };
      case 'royal_gold':
        return { ...base, color: "#FFD700", metalness: 1, roughness: 0, clearcoat: 1 };
      case 'carrara':
        return { ...base, color: "#F5F5F5", roughness: 0.05, metalness: 0.1, clearcoat: 1, transmission: 0.1 };
      case 'onyx':
        return { ...base, color: "#0a2a22", roughness: 0, metalness: 0.2, transmission: 0.4, thickness: 2, ior: 1.5 };
      case 'portoro':
        return { ...base, color: "#080808", roughness: 0.02, metalness: 0.3, emissive: "#D4AF37", emissiveIntensity: 0.1 };
      default:
        return base;
    }
  };

  const materialProps = getMaterialProps();
  // Apply the user-selected gloss level
  materialProps.clearcoat = glossLevel / 100;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} castShadow receiveShadow scale={isMixing ? 0.95 : 1}>
        <boxGeometry args={[2.5, 2.5, 0.12]} />
        <meshPhysicalMaterial {...materialProps} map={texture} />
      </mesh>
      {/* Glossy Edge Highlight */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.45, 2.5]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.1} 
          color="white" 
          roughness={0} 
          clearcoat={1} 
        />
      </mesh>
    </Float>
  );
};

const TileLab = () => {
  const { t } = useTranslation();
  const { tiles } = useData();
  const [selectedMaterial, setSelectedMaterial] = useState('basaltic');
  const [isMixing, setIsMixing] = useState(false);
  const [glossLevel, setGlossLevel] = useState(98);

  useEffect(() => {
    setIsMixing(true);
    const timer = setTimeout(() => setIsMixing(false), 800);
    return () => clearTimeout(timer);
  }, [selectedMaterial]);

  const staticMaterials = [
    { 
      id: 'basaltic', 
      name: t('basaltic_clay'), 
      color: 'bg-[#1A1A1A]', 
      icon: <Layers size={14} />,
      desc: "Deep earth minerals from Morbi's core." 
    },
    { 
      id: 'gold', 
      name: t('gold_mineral'), 
      color: 'bg-[#D4AF37]', 
      icon: <Sparkles size={14} />,
      desc: "Metallic infusions for royal spaces." 
    },
    { 
      id: 'emerald', 
      name: t('emerald_glaze'), 
      color: 'bg-[#042F2E]', 
      icon: <Droplets size={14} />,
      desc: "Vibrant ocean-inspired ceramic finish." 
    }
  ];

  const dynamicMaterials = tiles.map(tile => ({
    id: tile._id,
    name: tile.name,
    imageUrl: tile.imageUrl,
    materialType: tile.materialType,
    desc: tile.description,
    icon: <Layers size={14} />,
    isDynamic: true
  }));

  const materials = [...staticMaterials, ...dynamicMaterials];

  const selectedMaterialData = materials.find(m => m.id === selectedMaterial);

  return (
    <section className="relative min-h-screen w-full bg-charcoal flex flex-col lg:flex-row overflow-hidden border-y border-white/5 pt-16 md:pt-0">
      
      {/* Header for Mobile */}
      <div className="lg:hidden px-6 pt-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-gujarati text-gold mb-2">{t('tile_lab')}</h2>
        <p className="text-white/40 text-xs sm:text-sm font-english px-4">{t('tagline')}</p>
      </div>

      {/* Left: Interactive 3D Canvas */}
      <div className="relative lg:w-[40%] h-[50vh] lg:h-screen cursor-grab active:cursor-grabbing border-r border-white/5">
        <ErrorBoundary>
          <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#D4AF37" />
            
            <Suspense fallback={null}>
              <TileModel 
                materialType={selectedMaterialData?.materialType || selectedMaterial} 
                isMixing={isMixing} 
                glossLevel={glossLevel}
                imageUrl={selectedMaterialData?.imageUrl}
              />
              <Environment preset="city" />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
              <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Suspense>
          </Canvas>
        </ErrorBoundary>

        {/* Interaction Hint */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <MousePointer2 size={12} /> Rotate to inspect finish
        </div>

        {/* Floating Nano Overlay */}
        <AnimatePresence>
          {isMixing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-gold flex flex-col items-center gap-4">
                <Sparkles size={48} className="animate-spin-slow" />
                <span className="text-xs uppercase tracking-[0.4em] font-bold">Nano-Mixing...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: UI Controls */}
      <div className="lg:w-[60%] flex flex-col justify-center px-8 md:px-16 py-12 lg:py-0 z-10 bg-gradient-to-t lg:bg-gradient-to-l from-black/60 via-charcoal to-transparent overflow-y-auto">
        <div className="max-w-xl py-12 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="hidden lg:block mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-gujarati text-gold mb-6 leading-tight">
              {t('material_lab')}
            </h2>
            <p className="text-white/60 text-base leading-relaxed font-english">
              Explore the alchemy of Morbi's finest tiles. Select a base material to witness the transformation into a <span className="text-gold">High-Gloss Nano Masterpiece</span>.
            </p>
          </motion.div>

          {/* Mixing Parameters */}
          <div className="mb-12 glass-dark p-6 rounded-2xl border border-white/5">
            <h3 className="text-white/40 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2 mb-6">
              <Sparkles size={12} /> Mixing Parameters
            </h3>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-white text-xs font-bold uppercase tracking-widest">Gloss Finish (GU)</label>
                  <span className="text-gold font-english text-sm font-bold">{glossLevel} GU</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={glossLevel} 
                  onChange={(e) => setGlossLevel(parseInt(e.target.value))}
                  className="w-full accent-gold h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Material Selection Grid */}
          <div className="flex flex-col gap-6 mb-12">
            <h3 className="text-white/40 uppercase tracking-widest text-[10px] font-bold flex items-center gap-2">
              <Layers size={12} /> {t('materials')}
            </h3>
            
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${materials.length > 4 ? 'max-h-[300px] overflow-y-auto pr-2 custom-scrollbar' : ''}`}>
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  onClick={() => setSelectedMaterial(mat.id)}
                  className={`group relative flex flex-col gap-2 p-3 rounded-xl border transition-all duration-500 ${
                    selectedMaterial === mat.id 
                    ? 'bg-white/5 border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                    : 'bg-transparent border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-full h-10 rounded-lg border ${mat.color || 'bg-gold/20'} border-white/10 overflow-hidden relative`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex flex-col text-left">
                    <span className={`text-[10px] font-gujarati leading-tight transition-colors ${selectedMaterial === mat.id ? 'text-gold font-bold' : 'text-white/70'}`}>
                      {mat.name}
                    </span>
                    {mat.isDynamic && (
                      <span className="text-[8px] text-white/30 font-bold uppercase tracking-widest mt-0.5">Custom Upload</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Technical Stats */}
          <motion.div
            key={selectedMaterial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark p-8 rounded-3xl border-gold/20 shadow-2xl relative overflow-hidden"
          >
            {/* Background Texture */}
            <div className="absolute top-0 right-0 p-4 text-gold/5 pointer-events-none">
              <Sparkles size={120} />
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20">
                <ShieldCheck className="text-gold" size={24} />
              </div>
              <div>
                <h4 className="text-gold font-gujarati text-xl font-bold uppercase tracking-wider">
                  {t('technical_grade')}
                </h4>
                <p className="text-white/20 text-[9px] uppercase font-bold tracking-widest">Morbi Industrial Standard</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
                  <Waves size={10} className="text-gold/50" />
                  {t('water_absorption')}
                </div>
                <div className="text-white font-english text-2xl font-light">&lt; 0.05%</div>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
                  <Zap size={10} className="text-gold/50" />
                  {t('mohs_hardness')}
                </div>
                <div className="text-white font-english text-2xl font-light">8.5+</div>
              </div>

              <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 text-white/40 text-[9px] uppercase font-bold tracking-[0.2em]">
                  <Sparkles size={10} className="text-gold/50" />
                  Gloss Level
                </div>
                <div className="text-white font-english text-2xl font-light">{glossLevel} GU</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-dark/10 blur-[180px] rounded-full -ml-80 pointer-events-none"></div>
    </section>
  );
};

export default TileLab;
