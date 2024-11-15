import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/use-profile';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function SecurityTab() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showMfaDialog, setShowMfaDialog] = useState(false);
  const { settings, updateSettings } = useProfile();
  const { toast } = useToast();

  const handlePasswordChange = () => {
    toast({
      title: 'Password Updated',
      description: 'Your password has been changed successfully.',
    });
    setShowPasswordForm(false);
  };

  const handleMfaToggle = (enabled: boolean) => {
    if (enabled && !settings.security.twoFactorEnabled) {
      setShowMfaDialog(true);
    } else {
      updateSettings({
        security: {
          ...settings.security,
          twoFactorEnabled: enabled,
        },
      });
      toast({
        title: `2FA ${enabled ? 'Enabled' : 'Disabled'}`,
        description: `Two-factor authentication has been ${
          enabled ? 'enabled' : 'disabled'
        }.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={settings.security.twoFactorEnabled}
            onCheckedChange={handleMfaToggle}
          />
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          Change Password
        </Button>

        {showPasswordForm && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your new password"
                  />
                </div>
                <Button
                  onClick={handlePasswordChange}
                  className="w-full"
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Recent Login Activity</CardTitle>
            <CardDescription>
              Review your recent account access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.security.recentLogins.map((login, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-medium">{login.location}</p>
                    <p className="text-muted-foreground">{login.device}</p>
                  </div>
                  <span className="text-muted-foreground">
                    {format(login.timestamp, 'MMM d, h:mm a')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showMfaDialog} onOpenChange={setShowMfaDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable Two-Factor Authentication</AlertDialogTitle>
            <AlertDialogDescription>
              Two-factor authentication adds an extra layer of security to your
              account. You'll need to enter a code from your authenticator app
              when signing in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateSettings({
                  security: {
                    ...settings.security,
                    twoFactorEnabled: true,
                  },
                });
                setShowMfaDialog(false);
                toast({
                  title: '2FA Enabled',
                  description:
                    'Two-factor authentication has been enabled for your account.',
                });
              }}
            >
              Enable 2FA
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}