import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProfessionalInfoStepProps {
  data: {
    title: string;
    company: string;
    experience: string;
    licenseNumber: string;
    region: string;
  };
  onUpdate: (data: Partial<ProfessionalInfoStepProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ProfessionalInfoStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: ProfessionalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.experience) newErrors.experience = 'Experience is required';
    if (!data.region) newErrors.region = 'Region is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Professional Information
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us about your professional background
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            placeholder="Loan Officer"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="Company Name"
            value={data.company}
            onChange={(e) => onUpdate({ company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select
            value={data.experience}
            onValueChange={(value) => onUpdate({ experience: value })}
          >
            <SelectTrigger
              id="experience"
              className={errors.experience ? 'border-destructive' : ''}
              aria-invalid={!!errors.experience}
            >
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0-1 years</SelectItem>
              <SelectItem value="1-3">1-3 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
          {errors.experience && (
            <p className="text-sm text-destructive">{errors.experience}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License Number (Optional)</Label>
          <Input
            id="licenseNumber"
            placeholder="License Number"
            value={data.licenseNumber}
            onChange={(e) => onUpdate({ licenseNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region of Operation</Label>
          <Select
            value={data.region}
            onValueChange={(value) => onUpdate({ region: value })}
          >
            <SelectTrigger
              id="region"
              className={errors.region ? 'border-destructive' : ''}
              aria-invalid={!!errors.region}
            >
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="west">West Coast</SelectItem>
              <SelectItem value="east">East Coast</SelectItem>
              <SelectItem value="midwest">Midwest</SelectItem>
              <SelectItem value="south">South</SelectItem>
            </SelectContent>
          </Select>
          {errors.region && (
            <p className="text-sm text-destructive">{errors.region}</p>
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