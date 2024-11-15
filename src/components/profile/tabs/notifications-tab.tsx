import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProfile } from '@/hooks/use-profile';
import { useToast } from '@/hooks/use-toast';

export function NotificationsTab() {
  const { settings, updateSettings } = useProfile();
  const { toast } = useToast();
  const { notifications } = settings;

  const handleToggle = (key: keyof typeof notifications) => (checked: boolean) => {
    updateSettings({
      notifications: {
        ...notifications,
        [key]: checked,
      },
    });
  };

  const handleFrequencyChange = (
    key: 'reminderFrequency' | 'summaryFrequency'
  ) => (value: string) => {
    updateSettings({
      notifications: {
        ...notifications,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    toast({
      title: 'Notifications Updated',
      description: 'Your notification preferences have been saved.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Follow-up Reminders</Label>
            <p className="text-sm text-muted-foreground">
              Get reminded about pending follow-ups
            </p>
          </div>
          <Switch
            checked={notifications.followUpReminders}
            onCheckedChange={handleToggle('followUpReminders')}
          />
        </div>

        <div className="space-y-2">
          <Label>Reminder Frequency</Label>
          <Select
            value={notifications.reminderFrequency}
            onValueChange={handleFrequencyChange('reminderFrequency')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Bid Activity Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Notifications for bid updates and deadlines
            </p>
          </div>
          <Switch
            checked={notifications.bidActivityAlerts}
            onCheckedChange={handleToggle('bidActivityAlerts')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Performance Summary</Label>
            <p className="text-sm text-muted-foreground">
              Receive periodic performance reports
            </p>
          </div>
          <Switch
            checked={notifications.performanceSummary}
            onCheckedChange={handleToggle('performanceSummary')}
          />
        </div>

        <div className="space-y-2">
          <Label>Summary Frequency</Label>
          <Select
            value={notifications.summaryFrequency}
            onValueChange={handleFrequencyChange('summaryFrequency')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Notification Preferences
      </Button>
    </div>
  );
}