"use client";

import * as React from "react";
import { format, isToday, isValid, parseISO, startOfDay } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DateTimePickerFieldProps {
  dateLabel: string;
  timeLabel: string;
  id: string;
  /** ISO datetime string, e.g. RHF's field.value. "" when empty. */
  value: string;
  /** Called with an ISO datetime string — wire directly to RHF's field.onChange */
  onChange: (value: string) => void;
  onBlur?: () => void;
  disablePast?: boolean;
  invalid?: boolean;
  className?: string;
  invalidMessage?: string;
}

function combine(date: Date | undefined, time: string): string {
  if (!date) return "";
  const [h = "00", m = "00", s = "00"] = time.split(":");
  const combined = new Date(date);
  combined.setHours(Number(h), Number(m), Number(s), 0);
  return combined.toISOString();
}

export function DateTimePickerField({
  dateLabel,
  timeLabel,
  id,
  value,
  onChange,
  onBlur,
  disablePast = false,
  invalid,
  className,
  invalidMessage,
}: DateTimePickerFieldProps) {
  const [open, setOpen] = React.useState(false);

  const parsed = value ? parseISO(value) : undefined;
  const date = parsed && isValid(parsed) ? parsed : undefined;
  const time = date ? format(date, "HH:mm:ss") : "10:30:00";

  const now = new Date();
  const minTime =
    disablePast && date && isToday(date) ? format(now, "HH:mm:ss") : undefined;

  const handleDateChange = (d: Date | undefined) => {
    onChange(combine(d, time));
    setOpen(false);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    if (minTime && newTime < minTime) return;
    onChange(combine(date, newTime));
  };

  return (
    // Outer wrapper stacks vertically: the date/time row on top, error below it
    <FieldGroup className={className}>
      <FieldGroup className="flex-row">
        <Field data-invalid={invalid}>
          <FieldLabel htmlFor={`${id}-date`}>{dateLabel}</FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  id={`${id}-date`}
                  onBlur={onBlur}
                  aria-invalid={invalid}
                  className="w-32 justify-between font-normal"
                >
                  {date ? format(date, "PPP") : "Select date"}
                  <ChevronDownIcon data-icon="inline-end" />
                </Button>
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                defaultMonth={date}
                disabled={disablePast ? { before: startOfDay(now) } : undefined}
                onSelect={handleDateChange}
                className="bg-[#f7c59f]!  dark:bg-[#111729]! dark:text-gray-400"
              />
            </PopoverContent>
          </Popover>
        </Field>

        <Field className="w-32" data-invalid={invalid}>
          <FieldLabel htmlFor={`${id}-time`}>{timeLabel}</FieldLabel>
          <Input
            type="time"
            id={`${id}-time`}
            step="1"
            value={time}
            min={minTime}
            aria-invalid={invalid}
            onChange={handleTimeChange}
            onBlur={onBlur}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none border-gray-300 dark:border-slate-600  dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </Field>
      </FieldGroup>

      {invalid && (
        <FieldError
          errors={[{ message: invalidMessage }]}
          className="text-red-500!"
        />
      )}
    </FieldGroup>
  );
}
