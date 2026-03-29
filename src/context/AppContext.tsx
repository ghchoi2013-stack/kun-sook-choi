import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminResource, SiteConfig } from '../types';
import { INITIAL_SITE_CONFIG, INITIAL_RESOURCES } from '../constants';

interface AppContextType {
  config: SiteConfig;
  resources: AdminResource[];
  updateConfig: (newConfig: Partial<SiteConfig>) => void;
  addResource: (item: AdminResource) => void;
  updateResource: (item: AdminResource) => void;
  deleteResource: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [resources, setResources] = useState<AdminResource[]>(INITIAL_RESOURCES);

  const updateConfig = (newConfig: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addResource = (item: AdminResource) => {
    setResources(prev => [item, ...prev]);
  };

  const updateResource = (item: AdminResource) => {
    setResources(prev => prev.map(p => p.id === item.id ? item : p));
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      config, 
      resources, 
      updateConfig, 
      addResource, 
      updateResource, 
      deleteResource 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
