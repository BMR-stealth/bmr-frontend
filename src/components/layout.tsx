import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Briefcase,
  Trophy,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  BellDot,
  Moon,
  Sun,
  Menu,
} from 'lucide-react';
import { useTheme } from './theme-provider';
import { useProfile } from '@/hooks/use-profile';
import { BidCreditsIndicator } from './bidding/bid-credits-indicator';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview of your performance'
  },
  { 
    name: 'My Leads', 
    href: '/leads', 
    icon: Briefcase,
    description: 'Manage active opportunities',
    badge: '3 New'
  },
  { 
    name: 'Won Opportunities', 
    href: '/won', 
    icon: Trophy,
    description: 'Track successful bids'
  },
  { 
    name: 'Leads History', 
    href: '/history', 
    icon: History,
    description: 'Review past interactions'
  },
  { 
    name: 'Performance', 
    href: '/performance', 
    icon: BarChart3,
    description: 'Analyze your metrics'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    description: 'Manage your preferences'
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [bidCredits, setBidCredits] = useState(25);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { profile } = useProfile();
  const { toast } = useToast();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on wider screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePurchaseCredits = async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setBidCredits((prev) => prev + amount);
    toast({
      title: 'Credits Purchased',
      description: `Successfully added ${amount} bid credits to your account.`,
    });
  };

  const NavLink = ({ item }: { item: typeof navigation[0] }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.href;

    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Link
              to={item.href}
              className={cn(
                'flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-100',
                'hover:bg-accent hover:text-accent-foreground relative group',
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className={cn(
                "w-5 h-5 flex items-center justify-center transition-transform duration-100",
                !collapsed && "group-hover:scale-110"
              )}>
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <span
                className={cn(
                  'transition-all duration-100 origin-left',
                  collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                )}
              >
                {item.name}
              </span>
              {item.badge && !collapsed && (
                <Badge 
                  variant="secondary" 
                  className="ml-auto"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          </TooltipTrigger>
          {(collapsed || item.badge) && (
            <TooltipContent side="right" className="flex flex-col gap-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              {item.badge && (
                <Badge variant="secondary">{item.badge}</Badge>
              )}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <div className="flex h-14 items-center justify-between px-4 border-b border-border">
        <h1
          className={cn(
            'text-sm font-semibold transition-all duration-100 origin-left text-primary',
            !isMobile && collapsed ? 'scale-0' : 'scale-100'
          )}
        >
          BMR Platform
        </h1>
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              'transition-all duration-100',
              collapsed ? '-mr-8 hover:mr-0' : 'mr-0'
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        {(!isMobile && !collapsed) && (
          <div className="px-2 pb-2">
            <BidCreditsIndicator
              credits={bidCredits}
              onPurchase={handlePurchaseCredits}
            />
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => navigate('/settings')}
        >
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <span className="text-sm font-medium">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div
            className={cn(
              'ml-3 text-left transition-all duration-100 origin-left',
              !isMobile && collapsed ? 'scale-0 w-0' : 'scale-100 w-auto'
            )}
          >
            <p className="text-sm font-medium">{profile.name}</p>
            <p className="text-xs text-muted-foreground">{profile.title}</p>
          </div>
        </Button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          'relative hidden md:flex flex-col border-r border-border bg-card transition-all duration-100',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="animate-in slide-in-from-top-1 duration-100"
                  >
                    {theme === "light" ? (
                      <Moon className="h-5 w-5 rotate-90 transition-transform duration-100 dark:rotate-0" />
                    ) : (
                      <Sun className="h-5 w-5 rotate-0 transition-transform duration-100 dark:rotate-90" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <BellDot className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}