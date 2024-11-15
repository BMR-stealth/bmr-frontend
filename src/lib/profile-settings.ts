export interface ProfileSettings {
  notifications: {
    followUpReminders: boolean;
    reminderFrequency: 'daily' | 'weekly' | 'monthly';
    bidActivityAlerts: boolean;
    performanceSummary: boolean;
    summaryFrequency: 'weekly' | 'monthly' | 'quarterly';
  };
  preferences: {
    defaultLandingPage: 'dashboard' | 'leads' | 'won' | 'bidding';
    metrics: {
      winRate: boolean;
      pipelineValue: boolean;
      responseTime: boolean;
      conversionRate: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    recentLogins: Array<{
      location: string;
      device: string;
      timestamp: Date;
    }>;
  };
}

export const defaultSettings: ProfileSettings = {
  notifications: {
    followUpReminders: true,
    reminderFrequency: 'daily',
    bidActivityAlerts: true,
    performanceSummary: true,
    summaryFrequency: 'weekly',
  },
  preferences: {
    defaultLandingPage: 'dashboard',
    metrics: {
      winRate: true,
      pipelineValue: true,
      responseTime: true,
      conversionRate: true,
    },
  },
  security: {
    twoFactorEnabled: false,
    recentLogins: [
      {
        location: 'San Francisco, CA',
        device: 'Chrome on MacOS',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        location: 'Seattle, WA',
        device: 'Safari on iPhone',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    ],
  },
};