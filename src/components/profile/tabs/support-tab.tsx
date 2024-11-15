import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  HelpCircle,
  MessageCircle,
  PlayCircle,
  Book,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SupportTab() {
  const { toast } = useToast();

  const handleLiveChatClick = () => {
    toast({
      title: 'Live Chat',
      description: 'Connecting you to a support representative...',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Help Center</CardTitle>
          <CardDescription>
            Find answers to common questions and learn more about our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open('/help/faq', '_blank')}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            Browse FAQ
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open('/docs', '_blank')}
          >
            <Book className="mr-2 h-4 w-4" />
            Documentation
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open('/tutorials', '_blank')}
          >
            <PlayCircle className="mr-2 h-4 w-4" />
            Video Tutorials
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Get help from our dedicated support team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="default"
            className="w-full"
            onClick={handleLiveChatClick}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Live Chat
          </Button>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="text-center">
              Available Monday to Friday, 9AM to 5PM PST
            </p>
            <p className="text-center">
              Email support:{' '}
              <a
                href="mailto:support@example.com"
                className="text-primary hover:underline"
              >
                support@example.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Platform Updates</CardTitle>
          <CardDescription>
            Latest features and improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: 'Enhanced Bidding Analytics',
                date: 'March 15, 2024',
                description:
                  'New insights and performance metrics for competitive bidding.',
              },
              {
                title: 'Mobile App Launch',
                date: 'March 1, 2024',
                description:
                  'Access your dashboard on the go with our new mobile app.',
              },
              {
                title: 'Automated Follow-ups',
                date: 'February 15, 2024',
                description:
                  'Set up automated follow-up reminders for your leads.',
              },
            ].map((update, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between">
                  <p className="font-medium">{update.title}</p>
                  <span className="text-sm text-muted-foreground">
                    {update.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}