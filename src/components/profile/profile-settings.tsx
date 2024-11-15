import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfileSettings } from './use-profile-settings';
import { ProfileTab } from './tabs/profile-tab';
import { NotificationsTab } from './tabs/notifications-tab';
import { PreferencesTab } from './tabs/preferences-tab';
import { SecurityTab } from './tabs/security-tab';
import { SubscriptionTab } from './tabs/subscription-tab';
import { SupportTab } from './tabs/support-tab';
import { LogoutTab } from './tabs/logout-tab';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ProfileSettings() {
  const { isOpen, closeProfileSettings, activeTab, setActiveTab } = useProfileSettings();

  return (
    <Sheet open={isOpen} onOpenChange={closeProfileSettings}>
      <SheetContent className="w-full sm:max-w-[600px] p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle>Profile & Settings</SheetTitle>
        </SheetHeader>
        
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-[calc(100vh-8rem)]"
        >
          <TabsList className="px-6 py-4 justify-start space-x-4 border-b">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 h-[calc(100vh-16rem)]">
            <div className="px-6 py-4">
              <TabsContent value="profile" className="mt-0">
                <ProfileTab />
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <NotificationsTab />
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-0">
                <PreferencesTab />
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <SecurityTab />
              </TabsContent>
              
              <TabsContent value="subscription" className="mt-0">
                <SubscriptionTab />
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <SupportTab />
              </TabsContent>
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t">
            <LogoutTab />
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}