import { createFileRoute } from "@tanstack/react-router";
import { CommandPanel } from "./-components/command-panel";
import { ContentList } from "./-components/content-list";
import { PageHeader } from "./-components/page-header";
import { useAlooidBuilder } from "./-hooks/use-alooid-builder";

export const Route = createFileRoute("/alooid-builder/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
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
  } = useAlooidBuilder();

  const handleSavePreset = (name: string) => {
    presetStorage.savePreset(name, Array.from(selectedItems), slot);
    setSelectedPresetName(name);
  };

  const handleDeletePreset = (name: string) => {
    presetStorage.deletePreset(name);
    if (selectedPresetName === name) {
      setSelectedPresetName("");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <PageHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
        <ContentList
          expandedSections={expandedSections}
          selectedItems={selectedItems}
          onToggleSection={toggleSection}
          onToggleItem={toggleItem}
        />

        <CommandPanel
          command={buildCommand()}
          selectedItems={selectedItems}
          slot={slot}
          isFull={isFull}
          selectedPresetName={selectedPresetName}
          presets={presetStorage.listPresets()}
          onSlotChange={setSlot}
          onCopy={copyCommand}
          onClear={clearSelection}
          onRemoveItem={toggleItem}
          onSavePreset={handleSavePreset}
          onLoadPreset={loadPreset}
          onDeletePreset={handleDeletePreset}
          onPresetNameChange={setSelectedPresetName}
        />
      </div>
    </div>
  );
}
