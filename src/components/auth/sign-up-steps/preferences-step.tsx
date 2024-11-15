import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun } from 'lucide-react';

interface PreferencesStepProps {
  data: {
    defaultPage: string;
    notifications: {
      followUp: boolean;
      bidActivity: boolean;
      performance: boolean;
    };
    theme: 'light' | 'dark';
  };
  onUpdate: (data: Partial<PreferencesStepProps['data']>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function PreferencesStep({
  data,
  onUpdate,
  onNext,
  onBack,
}: PreferencesStepProps) {
  const { setTheme } = useTheme();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setTheme(theme);
    onUpdate({ theme });
  };

  const handleNotificationChange = (key: keyof typeof data.notifications) => (
    checked: boolean
  ) => {
    onUpdate({
      notifications: {
        ...data.notifications,
        [key]: checked,
      },
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.defaultPage) newErrors.defaultPage = 'Default page is required';

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
          Platform Preferences
        </h1>
        <p className="text-sm text-muted-foreground">
          Customize your dashboard experience
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Default Landing Page</Label>
          <Select
            value={data.defaultPage}
            onValueChange={(value) => onUpdate({ defaultPage: value })}
          >
            <SelectTrigger className={errors.defaultPage ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select default page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="leads">My Leads</SelectItem>
              <SelectItem value="won">Won Opportunities</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
          {errors.defaultPage && (
            <p className="text-sm text-destructive">{errors.defaultPage}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label>Notification Preferences</Label>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Follow-Up Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get reminded about pending follow-ups
              </p>
            </div>
            <Switch
              checked={data.notifications.followUp}
              onCheckedChange={handleNotificationChange('followUp')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Bid Activity Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notifications for bid updates
              </p>
            </div>
            <Switch
              checked={data.notifications.bidActivity}
              onCheckedChange={handleNotificationChange('bidActivity')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Performance Summary</Label>
              <p className="text-sm text-muted-foreground">
                Weekly performance reports
              </p>
            </div>
            <Switch
              checked={data.notifications.performance}
              onCheckedChange={handleNotificationChange('performance')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Theme Preference</Label>
          <div className="flex gap-4">
            <Button
              variant={data.theme === 'light' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleThemeChange('light')}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={data.theme === 'dark' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => handleThemeChange('dark')}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
          </div>
        </div>
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