import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SlotSelectorProps {
  value: number;
  onChange: (slot: number) => void;
}

export function SlotSelector({ value, onChange }: SlotSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const slots = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div
      className={cn("relative space-y-2", isOpen && "z-50")}
      ref={containerRef}
    >
      <Label className="text-muted-foreground text-xs">Slot</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-border bg-background px-3 text-sm transition-all hover:bg-muted/50 focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring",
            isOpen && "border-ring ring-1 ring-ring",
          )}
        >
          <span>Slot {value}</span>
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="fade-in-0 zoom-in-95 absolute top-full left-0 z-100 mt-1 w-full animate-in overflow-hidden rounded-md border border-border bg-popover shadow-md outline-none">
            <div className="custom-scrollbar max-h-[216px] overflow-y-auto p-1 py-1">
              {slots.map((slotNumber) => (
                <button
                  key={slotNumber}
                  type="button"
                  onClick={() => {
                    onChange(slotNumber);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
                    value === slotNumber &&
                      "bg-accent/50 text-accent-foreground",
                  )}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {value === slotNumber && <Check className="size-4" />}
                  </span>
                  <span>Slot {slotNumber}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
