import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ItemKey } from "@/routes/alooid-builder/-data/items";
import type { Preset } from "../-hooks/use-preset-storage";

const presetFormSchema = z.object({
  name: z.string().min(1, "Nome do preset é obrigatório"),
});

type PresetFormData = z.infer<typeof presetFormSchema>;

interface PresetManagerProps {
  selectedItems: Set<ItemKey>;
  selectedPresetName: string;
  presets: Preset[];
  onSave: (name: string) => void;
  onLoad: (name: string) => void;
  onDelete: (name: string) => void;
  onPresetNameChange: (name: string) => void;
}

export function PresetManager({
  selectedItems,
  selectedPresetName,
  presets,
  onSave,
  onLoad,
  onDelete,
  onPresetNameChange,
}: PresetManagerProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PresetFormData>({
    resolver: zodResolver(presetFormSchema),
    defaultValues: {
      name: selectedPresetName,
    },
  });

  const onSubmit = (data: PresetFormData) => {
    if (selectedItems.size === 0) {
      toast.error("Selecione pelo menos um item");
      return;
    }
    onSave(data.name);
  };

  const handlePresetClick = (preset: Preset) => {
    onLoad(preset.name);
    setValue("name", preset.name);
    onPresetNameChange(preset.name);
  };

  const handleDelete = (e: React.MouseEvent, presetName: string) => {
    e.stopPropagation();
    onDelete(presetName);
    if (selectedPresetName === presetName) {
      setValue("name", "");
      onPresetNameChange("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div>
        <h3 className="mb-3 font-semibold text-sm">Gerenciar Presets</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="preset-name" className="text-xs">
              Nome do Preset
            </Label>
            <Input
              id="preset-name"
              {...register("name")}
              placeholder="Ex: Farm de Drops"
              className="h-9"
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            size="sm"
            disabled={selectedItems.size === 0}
          >
            <Save className="size-4" />
            Salvar Preset
          </Button>
        </form>
      </div>

      {presets.length > 0 && (
        <div>
          <p className="mb-2 text-muted-foreground text-xs">
            Presets salvos ({presets.length}):
          </p>
          <div className="max-h-[300px] space-y-2 overflow-y-auto">
            {presets.map((preset) => (
              <button
                type="button"
                key={preset.name}
                onClick={() => handlePresetClick(preset)}
                className={cn(
                  "cursor-pointer rounded-md border bg-muted/30 p-3 transition-all hover:bg-muted/50",
                  selectedPresetName === preset.name &&
                    "border-primary ring-1 ring-primary",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">
                      {preset.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {preset.items.length}{" "}
                      {preset.items.length === 1 ? "item" : "itens"} • Slot{" "}
                      {preset.slot}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatDate(preset.updatedAt)}
                    </p>
                  </div>
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={(e) => handleDelete(e, preset.name)}
                    className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
