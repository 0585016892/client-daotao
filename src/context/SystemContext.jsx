import React, { createContext, useContext, useState, useEffect } from "react";
import { getSettings } from "../api/settingApi";

const SystemContext = createContext();

export const SystemProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    site_name: "DUC THANG MEDIA",
    maintenance_mode: "false",
    admin_email: ""
  });
  const [loading, setLoading] = useState(true);

  const refreshSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
            // Nếu API sập, mặc định coi như hệ thống đang bảo trì hoặc lỗi nặng
            setSettings(prev => ({ 
            ...prev, 
            maintenance_mode: "true",
            maintenance_msg: "Máy chủ đang tạm nghỉ ngơi, bạn quay lại sau nhé!" 
            }));
        } finally {
            setLoading(false);
        }
  };

  useEffect(() => {
    refreshSettings();
  }, []);

  return (
    <SystemContext.Provider value={{ settings, refreshSettings, loading }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);