import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/components/theme-provider';
import { useProfile } from '@/hooks/use-profile';
import { useToast } from '@/hooks/use-toast';

export function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings } = useProfile();
  const { toast } = useToast();
  const { preferences } = settings;

  const handleMetricToggle = (metric: keyof typeof preferences.metrics) => (
    checked: boolean
  ) => {
    updateSettings({
      preferences: {
        ...preferences,
        metrics: {
          ...preferences.metrics,
          [metric]: checked,
        },
      },
    });
  };

  const handleLandingPageChange = (value: string) => {
    updateSettings({
      preferences: {
        ...preferences,
        defaultLandingPage: value as typeof preferences.defaultLandingPage,
      },
    });
  };

  const handleSave = () => {
    toast({
      title: 'Preferences Updated',
      description: 'Your dashboard preferences have been saved.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Theme Preference</Label>
            <p className="text-sm text-muted-foreground">
              Choose your preferred theme
            </p>
          </div>
          <Select
            value={theme}
            onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Default Landing Page</Label>
          <Select
            value={preferences.defaultLandingPage}
            onValueChange={handleLandingPageChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select landing page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dashboard">Dashboard</SelectItem>
              <SelectItem value="leads">My Leads</SelectItem>
              <SelectItem value="won">Won Opportunities</SelectItem>
              <SelectItem value="bidding">Bidding</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Dashboard Metrics</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="metric-win-rate">Win Rate</Label>
              <Switch
                id="metric-win-rate"
                checked={preferences.metrics.winRate}
                onCheckedChange={handleMetricToggle('winRate')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="metric-pipeline">Pipeline Value</Label>
              <Switch
                id="metric-pipeline"
                checked={preferences.metrics.pipelineValue}
                onCheckedChange={handleMetricToggle('pipelineValue')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="metric-response">Response Time</Label>
              <Switch
                id="metric-response"
                checked={preferences.metrics.responseTime}
                onCheckedChange={handleMetricToggle('responseTime')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="metric-conversion">Conversion Rate</Label>
              <Switch
                id="metric-conversion"
                checked={preferences.metrics.conversionRate}
                onCheckedChange={handleMetricToggle('conversionRate')}
              />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full">
        Save Preferences
      </Button>
    </div>
  );
}