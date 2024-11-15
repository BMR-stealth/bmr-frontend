import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validatePassword } from '@/lib/auth';
import { useAuth } from '@/hooks/use-auth';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '@/hooks/use-toast';

interface BasicInfoStepProps {
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onUpdate: (data: Partial<BasicInfoStepProps['data']>) => void;
  onNext: () => void;
}

export function BasicInfoStep({ data, onUpdate, onNext }: BasicInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePasswordChange = (value: string) => {
    onUpdate({ password: value });
    const strength = validatePassword(value);
    setPasswordStrength(strength);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.password) newErrors.password = 'Password is required';
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      // Only show error if it's not a popup-blocked error
      if (error.code !== 'auth/popup-blocked') {
        toast({
          title: 'Error',
          description: 'Failed to sign in with Google. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your information to get started
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => handlePasswordChange(e.target.value)}
          />
          <Progress value={passwordStrength} className="h-1" />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">{errors.confirmPassword}</p>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors above to continue
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="space-y-4">
        <Button onClick={handleSubmit} className="w-full">
          Continue
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0" onClick={() => navigate('/signin')}>
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}