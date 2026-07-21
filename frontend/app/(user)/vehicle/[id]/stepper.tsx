import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Vehicle details" },
  { id: 2, label: "Booking form" },
];

const Stepper = ({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (id: number) => void;
}) => {
  return (
    <ol className="flex items-center w-full">
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isLast = index === STEPS.length - 1;

        return (
          <li
            key={step.id}
            className={`flex items-center ${!isLast ? "w-full" : ""}`}
          >
            <button
              type="button"
              onClick={() => onStepClick(step.id)}
              disabled={step.id > currentStep}
              className="flex items-center gap-2.5 shrink-0 group disabled:cursor-not-allowed"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1 ring-inset transition-colors
                  ${
                    isCompleted
                      ? "bg-orange-500 text-white ring-orange-500"
                      : isActive
                        ? "bg-orange-50 text-orange-600 ring-orange-500 dark:bg-orange-500/10"
                        : "bg-gray-50 text-gray-400 ring-gray-200 dark:bg-slate-800 dark:text-slate-500 dark:ring-slate-700"
                  }`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : step.id}
              </span>
              <span
                className={`hidden sm:block text-sm font-medium ${
                  isActive
                    ? "text-gray-900 dark:text-white"
                    : isCompleted
                      ? "text-gray-700 dark:text-slate-300"
                      : "text-gray-400 dark:text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </button>

            {!isLast && (
              <div
                className={`mx-3 h-px flex-1 transition-colors ${
                  isCompleted
                    ? "bg-orange-500"
                    : "bg-gray-200 dark:bg-slate-700"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Stepper;
