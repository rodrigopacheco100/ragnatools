import { ChevronDown, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { type ItemKey, items } from "@/routes/alooid-builder/-data/items";

interface ContentSectionProps {
  name: string;
  itemIds: readonly ItemKey[];
  isExpanded: boolean;
  selectedItems: Set<ItemKey>;
  onToggleSection: () => void;
  onToggleItem: (itemId: ItemKey) => void;
}

export function ContentSection({
  name,
  itemIds,
  isExpanded,
  selectedItems,
  onToggleSection,
  onToggleItem,
}: ContentSectionProps) {
  const sectionItemCount = itemIds.length;
  const selectedInSection = itemIds.filter((itemId) =>
    selectedItems.has(itemId),
  ).length;

  return (
    <Card>
      <CardHeader
        className="cursor-pointer transition-colors hover:bg-muted/50"
        onClick={onToggleSection}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
            <CardTitle>{name}</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span>
              {selectedInSection}/{sectionItemCount} selecionados
            </span>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {itemIds
              .toSorted((a, b) => Number(a) - Number(b))
              .map((itemId) => {
                const item = items[itemId];
                const isSelected = selectedItems.has(itemId);

                return (
                  <button
                    type="button"
                    key={itemId}
                    className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                    onClick={() => onToggleItem(itemId)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onToggleItem(itemId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <img
                      src={item.img}
                      alt={item.name}
                      className="size-8 object-contain"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">
                        {item.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        ID: {itemId}
                      </p>
                    </div>
                  </button>
                );
              })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
