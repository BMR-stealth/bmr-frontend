import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

interface CompleteStepProps {
  data: {
    name: string;
  };
}

export function CompleteStep({ data }: CompleteStepProps) {
  const { signIn, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const handleStartTour = async () => {
    // Sign in the user first (since we need to be authenticated for onboarding)
    await signIn('demo@example.com', 'password');
    navigate('/onboarding');
  };

  const handleSkipTour = async () => {
    // Sign in and mark onboarding as completed
    await signIn('demo@example.com', 'password');
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
          <Check className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome aboard, {data.name}!
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Your account has been successfully created
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="font-medium">Quick Start Checklist:</h2>
        <div className="space-y-2">
          {[
            'Complete your profile',
            'Review available leads',
            'Set up notifications',
            'Place your first bid',
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                {index + 1}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={handleStartTour} className="w-full">
          Start Platform Tour
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          onClick={handleSkipTour}
          className="w-full"
        >
          Skip Tour & Go to Dashboard
        </Button>
      </div>
    </div>
  );
}