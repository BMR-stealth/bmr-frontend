import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout';
import { PerformancePage } from './components/performance/performance-page';
import { LeadsPage } from './components/leads/leads-page';
import { LeadsHistoryPage } from './components/leads-history/leads-history-page';
import { WonBidsPage } from './components/won-bids/won-bids-page';
import { DashboardPage } from './components/dashboard/dashboard-page';
import { OnboardingPage } from './components/onboarding/onboarding-page';
import { SignUpPage } from './components/auth/sign-up-page';
import { SignInPage } from './components/auth/sign-in-page';
import { SettingsPage } from './components/profile/settings-page';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { useAuth } from '@/hooks/use-auth';

export default function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {isAuthenticated ? (
          user?.onboardingCompleted ? (
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/leads" element={<LeadsPage />} />
                <Route path="/won" element={<WonBidsPage />} />
                <Route path="/history" element={<LeadsHistoryPage />} />
                <Route path="/performance" element={<PerformancePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="*" element={<Navigate to="/onboarding" replace />} />
            </Routes>
          )
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
          </Routes>
        )}
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}