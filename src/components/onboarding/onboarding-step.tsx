import { ReactNode } from 'react';

interface OnboardingStepProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function OnboardingStep({
  title,
  description,
  children,
}: OnboardingStepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="min-h-[400px]">{children}</div>
    </div>
  );
}