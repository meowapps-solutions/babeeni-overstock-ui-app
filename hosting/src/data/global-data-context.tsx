import { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../hooks/http-client';
import { useAppBridge } from '@shopify/app-bridge-react';
import { ShippingZone } from '../../../functions/src/api/app/types';

type TContext = {
  loading: boolean;
  shippingZones: ShippingZone[];
  isSyncing: boolean;
  updateShippingZone: (shippingZone: ShippingZone) => Promise<void>;
  removeShippingZone: (id: string) => Promise<void>;
}

const GlobalDataContext = createContext<TContext | undefined>(undefined);

export const GlobalDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const fetch = useFetch();
  const shopify = useAppBridge();

  const loadShippingZones = () => {
    return fetch(`/api/app/shipping-zone?shop=${shopify.config.shop}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setShippingZones(data);
        return data;
      });
  };

  const updateShippingZone = async (shippingZone: ShippingZone) => {
    setShippingZones((prev) => {
      const existingZoneIndex = prev.findIndex((zone) => zone.id === shippingZone.id);
      if (existingZoneIndex !== -1) {
        const updatedZones = [...prev];
        updatedZones[existingZoneIndex] = shippingZone;
        return updatedZones;
      }
      return [...prev, shippingZone];
    });

    setIsSyncing(true);
    await fetch(`/api/app/shipping-zone?shop=${shippingZone.shop}`, {
      method: 'POST',
      body: JSON.stringify(shippingZone),
      headers: { 'Content-Type': 'application/json' },
    });
    setIsSyncing(false);
  };

  const removeShippingZone = async (id: string) => {
    setShippingZones((prev) => prev.filter((zone) => zone.id !== id));
    setIsSyncing(true);
    await fetch(`/api/app/shipping-zone/${id}`, { method: 'DELETE' });
    setIsSyncing(false);
  };

  const carrierServiceSync = async () => {
    setIsSyncing(true);
    await fetch('/api/app/graphiql/carrier-service-sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    setIsSyncing(false);
  };

  useEffect(() => {
    setLoading(true);
    loadShippingZones().then(() => { setLoading(false); });
    carrierServiceSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalDataContext.Provider value={{ loading, shippingZones, isSyncing, updateShippingZone, removeShippingZone }} >
      {children}
    </GlobalDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);

  if (context === undefined) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }

  return context;
};