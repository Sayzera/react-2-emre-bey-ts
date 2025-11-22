import { CheckCircle2 } from "lucide-react";
import { config } from "../constants";

type StepIndicatorProps = {
  currentStep: number;
  completedSteps: number[];
  stepTitles: string[];
};

const StepIndicator = ({
  currentStep,
  completedSteps,
  stepTitles = [],
}: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {stepTitles.map((stepTitle, index) => {
        const stepNumber = index + 1;
        const isCompleted = completedSteps.includes(stepNumber);
        const isCurrent = currentStep === stepNumber;
        const isAccessible =
          stepNumber < currentStep ||
          completedSteps.includes(stepNumber - 1) ||
          stepNumber === currentStep;

        return (
          <div className="flex items-center flex-1" key={stepNumber}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-primary text-primary-foreground scale-110"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                } ${isAccessible ? "hover:scale-105" : "cursor-not-allowed"}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`mt-2 text-xs text-center ${
                  isAccessible
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {stepTitle}
              </span>
            </div>
            {stepNumber < config.TOTAL_STEPS && (
              <div
                className={`h-1 flex-1 mx-2 transition-colors ${
                  isCompleted ? "bg-green-500" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export { StepIndicator };
