import { useEffect, useState } from "react";
import type { ItemKey } from "@/routes/alooid-builder/-data/items";

const STORAGE_KEY = "alooid-builder-presets";

export type Preset = {
  name: string;
  items: ItemKey[];
  slot: number;
  createdAt: string;
  updatedAt: string;
};

type PresetStorage = Record<string, Preset>;

function getStorage(): PresetStorage {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading presets from localStorage:", error);
    return {};
  }
}

function setStorage(presets: PresetStorage): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  } catch (error) {
    console.error("Error writing presets to localStorage:", error);
  }
}

export function usePresetStorage() {
  const [presets, setPresets] = useState<PresetStorage>({});

  // Initialize from storage on mount
  useEffect(() => {
    setPresets(getStorage());
  }, []);

  const savePreset = (name: string, items: ItemKey[], slot: number): void => {
    const now = new Date().toISOString();
    const isUpdate = name in presets;

    const newPresets = {
      ...presets,
      [name]: {
        name,
        items,
        slot,
        createdAt: isUpdate ? presets[name].createdAt : now,
        updatedAt: now,
      },
    };

    setPresets(newPresets);
    setStorage(newPresets);
  };

  const loadPreset = (name: string): Preset | undefined => {
    return presets[name];
  };

  const deletePreset = (name: string): void => {
    const newPresets = { ...presets };
    delete newPresets[name];
    setPresets(newPresets);
    setStorage(newPresets);
  };

  const listPresets = (): Preset[] => {
    return Object.values(presets).sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  };

  const getPreset = (name: string): Preset | undefined => {
    return presets[name];
  };

  return {
    savePreset,
    loadPreset,
    deletePreset,
    listPresets,
    getPreset,
  };
}
