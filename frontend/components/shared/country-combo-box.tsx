"use client";

import * as React from "react";
import { Check, ChevronDownIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Country } from "@/data/models";

interface Props {
  countries: Country[];
  value?: string;
  onChange: (value: string) => void;
}

const CountryCombobox = ({ countries, value, onChange }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const popularCountryCodes = new Set(["PH", "US", "CA", "AU", "JP"]);

  const filteredCountries = React.useMemo(() => {
    if (!search.trim()) {
      return countries.filter((country) =>
        popularCountryCodes.has(country.alpha2Code),
      );
    }

    return countries
      .filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 5);
  }, [countries, search]);

  const selectedCountry = countries.find(
    (country) => country.alpha2Code === value,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="w-full justify-between">
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <img
                  src={selectedCountry.flags.svg}
                  alt={`${selectedCountry.name} flag`}
                  className="h-4 w-6 rounded-sm object-cover"
                />
                <span>{selectedCountry.name}</span>
              </span>
            ) : (
              "Select country"
            )}

            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />

      <PopoverContent
        className="w-(--radix-popover-trigger-width)  p-0 bg-[#f7c59f]!  dark:bg-[#111729]! dark:text-gray-400"
        align="start"
        side="bottom"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search country..."
            value={search}
            onValueChange={setSearch}
          />

          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>

            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country.alpha2Code}
                  value={country.name}
                  onSelect={() => {
                    onChange(country.alpha2Code);
                    setSearch("");
                    setOpen(false);
                  }}
                >
                  <img
                    src={country.flags.svg}
                    alt={`${country.name} flag`}
                    className="mr-2 h-4 w-6 rounded-sm object-cover"
                  />

                  <span className="flex-1">{country.name}</span>

                  <Check
                    className={cn(
                      "h-4 w-4",
                      value === country.alpha2Code
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountryCombobox;
