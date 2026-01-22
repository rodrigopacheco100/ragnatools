import { contents } from "@/routes/alooid-builder/-data/contents";
import type { ItemKey } from "@/routes/alooid-builder/-data/items";
import { ContentSection } from "./content-section";

interface ContentListProps {
  expandedSections: Set<string>;
  selectedItems: Set<ItemKey>;
  onToggleSection: (sectionName: string) => void;
  onToggleItem: (itemId: ItemKey) => void;
}

export function ContentList({
  expandedSections,
  selectedItems,
  onToggleSection,
  onToggleItem,
}: ContentListProps) {
  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <ContentSection
          key={content.name}
          name={content.name}
          itemIds={content.items}
          isExpanded={expandedSections.has(content.name)}
          selectedItems={selectedItems}
          onToggleSection={() => onToggleSection(content.name)}
          onToggleItem={onToggleItem}
        />
      ))}
    </div>
  );
}
