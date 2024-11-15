import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Mail, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface VerificationStepProps {
  data: {
    email: string;
    mfaEnabled: boolean;
  };
  onUpdate: (data: Partial<VerificationStepProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function VerificationStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: VerificationStepProps) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    // Simulate sending verification code
    toast({
      title: 'Verification Code Sent',
      description: `A verification code has been sent to ${data.email}`,
    });
  }, []);

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      setErrors({ code: 'Please enter a valid 6-digit code' });
      return;
    }

    // Simulate verification
    setIsVerified(true);
    toast({
      title: 'Email Verified',
      description: 'Your email has been successfully verified.',
    });
  };

  const handleMfaToggle = (enabled: boolean) => {
    onUpdate({ mfaEnabled: enabled });
    if (enabled) {
      toast({
        title: 'MFA Setup Required',
        description: 'Please scan the QR code with your authenticator app.',
      });
    }
  };

  const handleSubmit = () => {
    if (!isVerified) {
      setErrors({ verification: 'Please verify your email first' });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify Your Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Complete verification to secure your account
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              A verification code has been sent to {data.email}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="code">Verification Code</Label>
            <div className="flex gap-2">
              <Input
                id="code"
                placeholder="Enter 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
              <Button
                onClick={handleVerifyCode}
                disabled={isVerified}
              >
                {isVerified ? 'Verified' : 'Verify'}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={data.mfaEnabled}
              onCheckedChange={handleMfaToggle}
              disabled={!isVerified}
            />
          </div>

          {data.mfaEnabled && (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Scan this QR code with your authenticator app to enable 2FA
              </AlertDescription>
            </Alert>
          )}
        </div>

        {errors.verification && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.verification}</AlertDescription>
          </Alert>
        )}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}