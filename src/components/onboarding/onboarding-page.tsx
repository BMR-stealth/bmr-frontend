import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { OnboardingStep } from './onboarding-step';
import { OnboardingNav } from './onboarding-nav';
import {
  WelcomeStep,
  DashboardStep,
  LeadsStep,
  BiddingStep,
  PerformanceStep,
  CompleteStep,
} from './steps';

const steps = [
  { id: 'welcome', title: 'Welcome', component: WelcomeStep },
  { id: 'dashboard', title: 'Dashboard Overview', component: DashboardStep },
  { id: 'leads', title: 'Managing Leads', component: LeadsStep },
  { id: 'bidding', title: 'Bidding Process', component: BiddingStep },
  { id: 'performance', title: 'Performance Tracking', component: PerformanceStep },
  { id: 'complete', title: 'Get Started', component: CompleteStep },
];

export function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      completeOnboarding();
      navigate('/dashboard');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <div className="p-6">
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
          </div>

          <OnboardingStep
            title={steps[currentStep].title}
            description="Learn how to use the Loan Officer Dashboard effectively"
          >
            <CurrentStepComponent />
          </OnboardingStep>

          <OnboardingNav
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
          />
        </div>
      </Card>
    </div>
  );
}