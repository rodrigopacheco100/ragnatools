import { useState } from "react";
import { toast } from "sonner";
import type { ItemKey } from "@/routes/alooid-builder/-data/items";
import { usePresetStorage } from "./use-preset-storage";

export function useAlooidBuilder() {
  const [selectedItems, setSelectedItems] = useState<Set<ItemKey>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const [slot, setSlot] = useState<number>(1);
  const [selectedPresetName, setSelectedPresetName] = useState<string>("");

  const presetStorage = usePresetStorage();

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionName)) {
        next.delete(sectionName);
      } else {
        next.add(sectionName);
      }
      return next;
    });
  };

  const toggleItem = (itemId: ItemKey) => {
    setSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        // Remove item
        next.delete(itemId);
      } else {
        // Check if we've reached the limit
        if (next.size >= 10) {
          toast.error("Máximo de 10 itens selecionados!");
          return prev; // Don't add, return previous state
        }
        // Add item
        next.add(itemId);
      }
      return next;
    });
    // Clear selected preset when manually changing items
    setSelectedPresetName("");
  };

  const buildCommand = () => {
    if (selectedItems.size === 0) return "";
    return `@alootid2 save ${slot} ${Array.from(selectedItems)
      .sort((a, b) => Number(a) - Number(b))
      .join(" ")}`;
  };

  const copyCommand = async () => {
    const command = buildCommand();
    if (!command) {
      toast.error("Nenhum item selecionado");
      return;
    }
    await navigator.clipboard.writeText(command);
    toast.success("Comando copiado!");
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
    setSelectedPresetName("");
    toast.info("Seleção limpa");
  };

  const loadPreset = (name: string) => {
    const preset = presetStorage.loadPreset(name);
    if (!preset) {
      toast.error("Preset não encontrado");
      return;
    }
    setSelectedItems(new Set(preset.items));
    setSlot(preset.slot);
    setSelectedPresetName(name);
    toast.success(`Preset "${name}" carregado`);
  };

  const isFull = selectedItems.size >= 10;

  return {
    selectedItems,
    expandedSections,
    slot,
    setSlot,
    isFull,
    selectedPresetName,
    setSelectedPresetName,
    toggleSection,
    toggleItem,
    buildCommand,
    copyCommand,
    clearSelection,
    loadPreset,
    presetStorage,
  };
}
