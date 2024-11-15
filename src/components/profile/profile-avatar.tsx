import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProfile } from '@/hooks/use-profile';
import { useToast } from '@/hooks/use-toast';

export function ProfileAvatar() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();

  const handleAvatarUpload = (file: File) => {
    // In a real app, this would upload to a server
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ avatar: reader.result as string });
      setShowUploadDialog(false);
      toast({
        title: 'Profile Photo Updated',
        description: 'Your profile photo has been changed successfully.',
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>
            {profile.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowUploadDialog(true)}
        >
          <Camera className="mr-2 h-4 w-4" />
          Change Photo
        </Button>
      </div>

      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile Photo</DialogTitle>
            <DialogDescription>
              Choose a new photo for your profile
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAvatarUpload(file);
                }
              }}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Recommended: Square image, at least 200x200 pixels
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}