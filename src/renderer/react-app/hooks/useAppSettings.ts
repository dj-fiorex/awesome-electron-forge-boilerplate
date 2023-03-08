// This hook is called to get settings from the main thread.

import { useEffect, useState } from "react";
import { StoreType } from "../../../store/settings.store";

// Path: src\app\hooks\useAppSettings.ts

export const useAppSettings = () => {
  const [settings, setLocalState] = useState<StoreType>();

  useEffect(() => {
    window.settings.getAll().then(setLocalState);
  }, []);

  const updateSettings = (store: StoreType) => {
    window.settings.setStore(store).then(() => {
      setLocalState(store);
    });
  };

  const updateKey = (key: keyof StoreType, value: any) => {
    window.settings.setKey(key, value).then(() => {
      setLocalState((prev) => {
        if (prev) {
          return { ...prev, [key]: value };
        }
        return prev;
      });
    });
  };

  return [settings, setLocalState, updateKey, updateSettings] as const;
};
