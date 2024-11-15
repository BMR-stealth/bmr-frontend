import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BasicInfoStep } from './sign-up-steps/basic-info-step';
import { ProfessionalInfoStep } from './sign-up-steps/professional-info-step';
import { PreferencesStep } from './sign-up-steps/preferences-step';
import { VerificationStep } from './sign-up-steps/verification-step';
import { CompleteStep } from './sign-up-steps/complete-step';

const steps = [
  'basic-info',
  'professional-info',
  'preferences',
  'verification',
  'complete',
] as const;

type Step = typeof steps[number];

interface SignUpData {
  // Basic Info
  name: string;
  email: string;
  password: string;
  confirmPassword: string;

  // Professional Info
  title: string;
  company: string;
  experience: string;
  licenseNumber: string;
  region: string;

  // Preferences
  defaultPage: string;
  notifications: {
    followUp: boolean;
    bidActivity: boolean;
    performance: boolean;
  };
  theme: 'light' | 'dark';

  // Verification
  mfaEnabled: boolean;
}

const initialData: SignUpData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  title: 'Loan Officer',
  company: '',
  experience: '',
  licenseNumber: '',
  region: '',
  defaultPage: 'leads',
  notifications: {
    followUp: true,
    bidActivity: true,
    performance: true,
  },
  theme: 'light',
  mfaEnabled: false,
};

export function SignUpPage() {
  const [currentStep, setCurrentStep] = useState<Step>('basic-info');
  const [data, setData] = useState<SignUpData>(initialData);

  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateData = (stepData: Partial<SignUpData>) => {
    setData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'basic-info':
        return (
          <BasicInfoStep
            data={data}
            onUpdate={updateData}
            onNext={handleNext}
          />
        );
      case 'professional-info':
        return (
          <ProfessionalInfoStep
            data={data}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'preferences':
        return (
          <PreferencesStep
            data={data}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'verification':
        return (
          <VerificationStep
            data={data}
            onUpdate={updateData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 'complete':
        return <CompleteStep data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <Progress value={progress} className="h-2" />
        {renderStep()}
      </Card>
    </div>
  );
}