import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

export type SelectOption = {
  value: string;
  label: string;
  /** Any extra data you want available for display, e.g. price */
  [key: string]: unknown;
};

type FieldSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  options: SelectOption[];
  /** Customize how the trigger displays the selected option. Defaults to option.label */
  renderTrigger?: (option: SelectOption) => React.ReactNode;
  /** Customize how each dropdown item displays. Defaults to option.label */
  renderItem?: (option: SelectOption) => React.ReactNode;
  labelClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function FieldSelectItem<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select an option",
  options,
  renderTrigger,
  renderItem,
  labelClassName,
  triggerClassName = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white",
  contentClassName = "rounded-lg border border-orange-200 bg-white text-gray-900 shadow-lg dark:border-slate-600 dark:bg-slate-700 dark:text-white",
}: FieldSelectProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selected = options.find((o) => o.value === field.value);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel className={labelClassName}>{label}</FieldLabel>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger className={triggerClassName}>
                <SelectValue placeholder={placeholder}>
                  {selected
                    ? renderTrigger
                      ? renderTrigger(selected)
                      : selected.label
                    : undefined}
                </SelectValue>
              </SelectTrigger>
              <SelectContent
                alignItemWithTrigger={false}
                className={contentClassName}
              >
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {renderItem ? renderItem(option) : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && (
              <FieldError
                errors={[fieldState.error]}
                className="text-red-500!"
              />
            )}
          </Field>
        );
      }}
    />
  );
}
