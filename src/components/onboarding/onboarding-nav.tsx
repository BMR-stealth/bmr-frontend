import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingNavProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function OnboardingNav({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}: OnboardingNavProps) {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between items-center mt-8 pt-4 border-t">
      <div>
        {!isFirstStep && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {!isLastStep && (
          <Button variant="ghost" onClick={onSkip}>
            Skip
          </Button>
        )}
        <Button onClick={onNext} className="gap-2">
          {isLastStep ? (
            'Get Started'
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}