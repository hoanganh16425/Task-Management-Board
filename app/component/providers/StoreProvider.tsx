'use client';

import React from 'react';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default StoreProvider;