import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ProfileTab } from './tabs/profile-tab';
import { NotificationsTab } from './tabs/notifications-tab';
import { PreferencesTab } from './tabs/preferences-tab';
import { SecurityTab } from './tabs/security-tab';
import { SubscriptionTab } from './tabs/subscription-tab';
import { SupportTab } from './tabs/support-tab';
import { LogoutTab } from './tabs/logout-tab';
import {
  User2,
  Bell,
  Settings,
  Shield,
  CreditCard,
  HelpCircle,
} from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User2, component: ProfileTab },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    component: NotificationsTab,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: Settings,
    component: PreferencesTab,
  },
  { id: 'security', label: 'Security', icon: Shield, component: SecurityTab },
  {
    id: 'subscription',
    label: 'Subscription',
    icon: CreditCard,
    component: SubscriptionTab,
  },
  { id: 'support', label: 'Support', icon: HelpCircle, component: SupportTab },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || ProfileTab;

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    activeTab === tab.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <LogoutTab />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h1>
            <p className="text-muted-foreground">
              Manage your {activeTab} settings and preferences
            </p>
          </div>

          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}