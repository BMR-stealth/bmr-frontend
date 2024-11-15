import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { useAuth } from '@/hooks/use-auth';
import { LogOut } from 'lucide-react';

interface LogoutTabProps {
  className?: string;
}

export function LogoutTab({ className }: LogoutTabProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    setShowConfirmation(false);
  };

  return (
    <div className={className}>
      <Button
        variant="destructive"
        className="w-full"
        onClick={() => setShowConfirmation(true)}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
            <AlertDialogDescription>
              You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}