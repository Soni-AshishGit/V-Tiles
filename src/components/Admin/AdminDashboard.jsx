import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Layers, 
  Settings, 
  User, 
  LogOut, 
  Plus, 
  Trash2, 
  Upload, 
  Globe, 
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tiles');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'tiles', label: 'Manage Tiles', icon: <Layers size={20} />, path: '' },
    { id: 'settings', label: 'Global Settings', icon: <Settings size={20} />, path: 'settings' },
    { id: 'profile', label: 'Vijay Sir Avatar', icon: <User size={20} />, path: 'profile' },
  ];

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path === 'dashboard') setActiveTab('tiles');
    else if (path === 'settings') setActiveTab('settings');
    else if (path === 'profile') setActiveTab('profile');
  }, [location]);

  return (
    <div className="min-h-screen bg-charcoal flex text-white overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="glass-dark border-r border-white/5 relative z-30 transition-all duration-500 hidden md:flex flex-col"
      >
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-gold font-gujarati text-2xl font-bold"
              >
                વી-ટાઇલ્સ
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={`/admin/dashboard/${item.path}`}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-gold/10 text-gold border border-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`${activeTab === item.id ? 'text-gold' : 'text-white/30 group-hover:text-white'} transition-colors`}>
                {item.icon}
              </div>
              {isSidebarOpen && (
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 p-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 transition-all duration-300 group"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="font-bold text-xs uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative h-screen custom-scrollbar">
        {/* Header */}
        <header className="sticky top-0 z-20 glass-dark border-b border-white/5 px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-english uppercase tracking-[0.2em] text-white/90">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h2>
            <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mt-1">
              Admin / {activeTab}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/" target="_blank" className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors group">
              <Globe size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest group-hover:underline">View Website</span>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold">
              VS
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <Routes>
            <Route index element={<TilesManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="profile" element={<ProfileManager />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// --- Tiles Manager Sub-component ---
const TilesManager = () => {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', materialType: 'basaltic' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchTiles = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tiles');
      setTiles(res.data);
    } catch (err) {
      console.error('Error fetching tiles:', err);
      // Mock tiles for dev if backend is down
      setTiles([
        { _id: '1', name: 'Sample Marble', materialType: 'basaltic', imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=2070&auto=format&fit=crop', description: 'Development sample' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiles();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleAddTile = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const data = new FormData();
    data.append('tile', selectedFile);
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('materialType', formData.materialType);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/tiles', data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStatusMsg({ type: 'success', text: 'Tile uploaded successfully!' });
      setShowAddModal(false);
      setFormData({ name: '', description: '', materialType: 'basaltic' });
      setSelectedFile(null);
      fetchTiles();
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Upload failed. Check console.' });
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatusMsg({ type: '', text: '' }), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tile?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/tiles/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchTiles();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-8">
      {statusMsg.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
          statusMsg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold uppercase tracking-widest">{statusMsg.text}</span>
        </div>
      )}

      <div className="flex justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/5">
        <div>
          <h3 className="text-2xl font-bold font-gujarati text-gold">ટાઇલ કલેક્શન</h3>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Manage Rotating Tile Inventory</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gold hover:bg-gold-light text-charcoal px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-500 shadow-lg"
        >
          <Plus size={18} /> Add New Tile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Loading Collection...</p>
          </div>
        ) : tiles.length === 0 ? (
          <div className="col-span-full py-20 text-center glass-dark rounded-3xl border border-dashed border-white/10">
            <Layers size={48} className="text-white/10 mx-auto mb-4" />
            <p className="text-white/40 font-bold uppercase tracking-widest">No tiles added yet</p>
          </div>
        ) : (
          tiles.map((tile) => (
            <motion.div
              layout
              key={tile._id}
              className="glass-dark rounded-3xl border border-white/5 overflow-hidden group hover:border-gold/30 transition-all duration-500"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={tile.imageUrl} alt={tile.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <button 
                    onClick={() => handleDelete(tile._id)}
                    className="w-12 h-12 bg-red-500/20 hover:bg-red-500 backdrop-blur-md border border-red-500/30 rounded-xl flex items-center justify-center text-red-500 hover:text-white transition-all duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg font-english">{tile.name}</h4>
                  <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-gold/20">
                    {tile.materialType}
                  </span>
                </div>
                <p className="text-white/40 text-xs line-clamp-2">{tile.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-dark w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl relative z-10 p-10"
            >
              <h3 className="text-2xl font-bold font-gujarati text-gold mb-8">નવી ટાઇલ ઉમેરો</h3>
              <form onSubmit={handleAddTile} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">Tile Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-gold/50 transition-all font-english"
                      placeholder="e.g. Carrara White"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">Material Type</label>
                    <select
                      value={formData.materialType}
                      onChange={(e) => setFormData({...formData, materialType: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-gold/50 transition-all appearance-none cursor-pointer font-english"
                    >
                      <option value="basaltic" className="bg-charcoal">Basaltic</option>
                      <option value="gold" className="bg-charcoal">Gold</option>
                      <option value="emerald" className="bg-charcoal">Emerald</option>
                      <option value="obsidian" className="bg-charcoal">Obsidian</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">Description</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-gold/50 transition-all font-english resize-none"
                    placeholder="Short description of the tile quality..."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">Upload Image</label>
                  <div className="relative group">
                    <input
                      type="file"
                      required
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      accept="image/*"
                    />
                    <div className="w-full bg-white/5 border-2 border-dashed border-white/10 group-hover:border-gold/30 rounded-2xl py-10 flex flex-col items-center justify-center transition-all duration-300">
                      <Upload className="text-white/20 group-hover:text-gold mb-3 transition-colors" size={32} />
                      <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                        {selectedFile ? selectedFile.name : 'Click to select tile image'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 border border-white/10 hover:bg-white/5 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 bg-gold hover:bg-gold-light text-charcoal py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg"
                  >
                    {isUploading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></div> : 'Start Upload'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Settings Manager Sub-component ---
const SettingsManager = () => {
  const { refreshData } = useData();
  const [settings, setSettings] = useState({ 
    whatsappNumber: '', 
    bio: '',
    socialMedia: { instagram: '', linkedin: '', whatsapp: '' } 
  });
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings');
        setSettings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/settings', settings, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setStatus({ type: 'success', text: 'Settings updated instantly!' });
      refreshData();
    } catch (err) {
      setStatus({ type: 'error', text: 'Update failed' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
        <h3 className="text-2xl font-bold font-gujarati text-gold">કોન્ટેક્ટ સેટિંગ્સ</h3>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Update Social, WhatsApp & Bio</p>
      </div>

      {status.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 border ${
          status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold uppercase tracking-widest">{status.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-dark p-8 rounded-3xl border border-white/5 space-y-8">
          <div className="space-y-2">
            <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">Curator Bio</label>
            <textarea
              value={settings.bio}
              onChange={(e) => setSettings({...settings, bio: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-gold/50 transition-all font-english resize-none min-h-[120px]"
              placeholder="Enter curator biography..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">WhatsApp Number (with country code)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Smartphone size={18} className="text-white/20 group-focus-within:text-gold transition-colors" />
              </div>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:border-gold/50 transition-all font-english"
                placeholder="e.g. 919876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {['instagram', 'linkedin', 'whatsapp'].map((platform) => (
               <div key={platform} className="space-y-2">
                 <label className="text-white/60 text-[10px] font-bold uppercase tracking-widest ml-1">{platform} Link</label>
                 <input
                   type="text"
                   value={settings.socialMedia[platform]}
                   onChange={(e) => setSettings({
                     ...settings, 
                     socialMedia: { ...settings.socialMedia, [platform]: e.target.value }
                   })}
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white focus:border-gold/50 transition-all font-english"
                   placeholder={`Enter your ${platform} URL`}
                 />
               </div>
             ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-lg disabled:opacity-70"
        >
          {isSaving ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></div> : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

// --- Profile Manager Sub-component ---
const ProfileManager = () => {
  const { refreshData } = useData();
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/settings');
        setCurrentAvatar(res.data.avatarUrl);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setIsUploading(true);
    const data = new FormData();
    data.append('avatar', selectedFile);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://localhost:5000/api/settings/avatar', data, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCurrentAvatar(res.data.avatarUrl);
      setStatus({ type: 'success', text: 'Avatar updated!' });
      setSelectedFile(null);
      refreshData(); // Refresh global site data
    } catch (err) {
      setStatus({ type: 'error', text: 'Upload failed' });
    } finally {
      setIsUploading(false);
      setTimeout(() => setStatus({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
        <h3 className="text-2xl font-bold font-gujarati text-gold">પ્રોફાઇલ ફોટો</h3>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">Upload Vijay Sir's New Avatar</p>
      </div>

      <div className="glass-dark p-12 rounded-3xl border border-white/5 flex flex-col items-center">
        {status.text && (
          <div className={`w-full mb-8 p-4 rounded-2xl flex items-center gap-3 border ${
            status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold uppercase tracking-widest">{status.text}</span>
          </div>
        )}
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold to-emerald-dark rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-48 h-48 rounded-full border-4 border-gold/30 overflow-hidden bg-charcoal flex items-center justify-center">
            {currentAvatar ? (
              <img src={currentAvatar} alt="Vijay Sir" className="w-full h-full object-cover" />
            ) : (
              <img 
                src="/assets/profile/profile.jpg" 
                alt="Vijay Sir" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
            )}
            <User size={80} className="text-white/10 hidden" />
          </div>
        </div>

        <form onSubmit={handleUpload} className="w-full space-y-6">
          <div className="relative group">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              accept="image/*"
            />
            <div className="w-full bg-white/5 border-2 border-dashed border-white/10 group-hover:border-gold/30 rounded-2xl py-12 flex flex-col items-center justify-center transition-all duration-300">
              <Upload className="text-white/20 group-hover:text-gold mb-3 transition-colors" size={32} />
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                {selectedFile ? selectedFile.name : 'Select new profile picture'}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-5 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
          >
            {isUploading ? <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin"></div> : 'Update Avatar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
