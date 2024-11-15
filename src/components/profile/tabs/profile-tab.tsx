import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProfile } from '@/hooks/use-profile';
import { useToast } from '@/hooks/use-toast';
import { ProfileAvatar } from '../profile-avatar';

export function ProfileTab() {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState(profile);
  const { toast } = useToast();

  const handleSave = () => {
    updateProfile(formData);
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <ProfileAvatar />

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={handleChange('name')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange('title')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        className="w-full"
        disabled={JSON.stringify(formData) === JSON.stringify(profile)}
      >
        Save Changes
      </Button>
    </div>
  );
}