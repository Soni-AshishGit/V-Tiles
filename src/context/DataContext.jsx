import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tiles, setTiles] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [tilesRes, settingsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/tiles'),
        axios.get('http://localhost:5000/api/settings')
      ]);
      setTiles(tilesRes.data);
      setSettings(settingsRes.data);
    } catch (err) {
      console.error('Error fetching site data:', err);
      // Mock data for development if backend is not running
      setTiles([]);
      setSettings({
        whatsappNumber: '911234567890',
        socialMedia: { instagram: '#', linkedin: '#', whatsapp: '#' }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ tiles, settings, loading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
