import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type ItemKey, items } from "@/routes/alooid-builder/-data/items";
import type { Preset } from "../-hooks/use-preset-storage";
import { PresetManager } from "./preset-manager";
import { SlotSelector } from "./slot-selector";

interface CommandPanelProps {
  command: string;
  selectedItems: Set<ItemKey>;
  slot: number;
  isFull: boolean;
  selectedPresetName: string;
  presets: Preset[];
  onSlotChange: (slot: number) => void;
  onCopy: () => void;
  onClear: () => void;
  onRemoveItem: (itemId: ItemKey) => void;
  onSavePreset: (name: string) => void;
  onLoadPreset: (name: string) => void;
  onDeletePreset: (name: string) => void;
  onPresetNameChange: (name: string) => void;
}

export function CommandPanel({
  command,
  selectedItems,
  slot,
  isFull,
  selectedPresetName,
  presets,
  onSlotChange,
  onCopy,
  onClear,
  onRemoveItem,
  onSavePreset,
  onLoadPreset,
  onDeletePreset,
  onPresetNameChange,
}: CommandPanelProps) {
  const handleSavePreset = (name: string) => {
    const existingPreset = presets.find((p) => p.name === name);
    onSavePreset(name);
    if (existingPreset) {
      toast.success(`Preset "${name}" atualizado`);
    } else {
      toast.success(`Preset "${name}" salvo`);
    }
  };

  const handleDeletePreset = (name: string) => {
    onDeletePreset(name);
    toast.success(`Preset "${name}" deletado`);
  };

  return (
    <div className="h-fit lg:sticky lg:top-6">
      <Card
        className={cn(
          isFull ? "ring-2 ring-destructive" : "",
          "overflow-visible",
        )}
      >
        <CardHeader>
          <CardTitle>Comando Gerado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SlotSelector value={slot} onChange={onSlotChange} />

          <div className="min-h-[100px] break-all rounded-md bg-muted p-4 font-mono text-sm">
            {command || (
              <span className="text-muted-foreground italic">
                Selecione itens para gerar o comando...
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onCopy}
              disabled={selectedItems.size === 0}
              className="flex-1"
            >
              <Copy className="size-4" />
              Copiar
            </Button>
            <Button
              onClick={onClear}
              disabled={selectedItems.size === 0}
              variant="destructive"
            >
              <Trash2 className="size-4" />
              Limpar
            </Button>
          </div>

          {selectedItems.size > 0 && (
            <div className="border-t pt-4">
              <p className="mb-3 text-muted-foreground text-xs">
                Itens selecionados ({selectedItems.size}):
              </p>
              <div className="max-h-[200px] space-y-2 overflow-y-auto">
                {Array.from(selectedItems)
                  .sort((a, b) => Number(a) - Number(b))
                  .map((itemId) => {
                    const item = items[itemId];
                    return (
                      <div
                        key={itemId}
                        className="flex items-center gap-2 rounded-md bg-muted/50 p-2"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="size-6 object-contain"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-xs">
                            {item.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {itemId}
                          </p>
                        </div>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          onClick={() => onRemoveItem(itemId)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          <PresetManager
            selectedItems={selectedItems}
            selectedPresetName={selectedPresetName}
            presets={presets}
            onSave={handleSavePreset}
            onLoad={onLoadPreset}
            onDelete={handleDeletePreset}
            onPresetNameChange={onPresetNameChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}
