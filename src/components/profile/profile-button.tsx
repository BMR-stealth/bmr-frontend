import { User2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfileSettings } from './use-profile-settings';
import { useProfile } from '@/hooks/use-profile';
import { cn } from '@/lib/utils';

interface ProfileButtonProps {
  collapsed?: boolean;
}

export function ProfileButton({ collapsed }: ProfileButtonProps) {
  const { openProfileSettings } = useProfileSettings();
  const { profile } = useProfile();

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={openProfileSettings}
    >
      <User2 className="h-8 w-8 rounded-full bg-accent p-1" />
      <div
        className={cn(
          'ml-3 text-left transition-all duration-300 origin-left',
          collapsed ? 'scale-0 w-0' : 'scale-100 w-auto'
        )}
      >
        <p className="text-sm font-medium">{profile.name}</p>
        <p className="text-xs text-muted-foreground">{profile.title}</p>
      </div>
    </Button>
  );
}