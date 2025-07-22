// components/locale-switcher.tsx
"use client"

import * as React from "react"
import { Check, ChevronDown, Globe, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { basins, chapters as locales } from "@/lib/mock-data"

interface LocaleSwitcherProps {
  onLocaleChange: (localeId: string) => void
  selectedLocale: string;
}

export function LocaleSwitcher({ onLocaleChange, selectedLocale }: LocaleSwitcherProps) {
  const [open, setOpen] = React.useState(false)

  const localesByBasin = locales.reduce((acc, locale) => {
    const basinId = locale.basinId;
    if (!acc[basinId]) {
      const basin = basins.find(b => b.id === basinId);
      acc[basinId] = { basinName: basin?.name || 'Unknown Basin', locales: [] };
    }
    acc[basinId].locales.push(locale);
    return acc;
  }, {} as Record<string, { basinName: string; locales: typeof locales }>);

  const selectedLocaleObj = locales.find(l => l.id === selectedLocale) || { name: 'All Locales' };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" role="combobox" aria-expanded={open} className="flex items-center gap-1 px-2 font-normal text-[#ddaa46]">
          <span className="text-xl font-semibold">{selectedLocaleObj.name}</span>
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search locales..." />
          <CommandList>
            <CommandEmpty>No locale found.</CommandEmpty>
            <CommandGroup>
              <CommandItem key="all" onSelect={() => { setOpen(false); onLocaleChange("all"); }}>
                <Check className={cn("mr-2 h-4 w-4", selectedLocale === "all" ? "opacity-100" : "opacity-0")} />
                All Locales
              </CommandItem>
            </CommandGroup>
            {Object.entries(localesByBasin).map(([basinId, { basinName, locales }]) => (
              <CommandGroup key={basinId} heading={basinName}>
                {locales.map((locale) => (
                  <CommandItem key={locale.id} onSelect={() => { setOpen(false); onLocaleChange(locale.id); }}>
                    <Check className={cn("mr-2 h-4 w-4", selectedLocale === locale.id ? "opacity-100" : "opacity-0")} />
                    {locale.name}
                    {locale.isCommons && <Star className="ml-2 h-3 w-3 text-yellow-500 fill-yellow-500" />}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
