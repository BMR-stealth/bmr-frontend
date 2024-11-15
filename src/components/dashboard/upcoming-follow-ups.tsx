import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

const followUps = [
  {
    id: 1,
    name: 'Sarah Johnson',
    date: new Date(2024, 2, 20),
    time: '10:00 AM',
    type: 'Call',
  },
  {
    id: 2,
    name: 'Michael Chen',
    date: new Date(2024, 2, 21),
    time: '2:30 PM',
    type: 'Meeting',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    date: new Date(2024, 2, 22),
    time: '11:15 AM',
    type: 'Call',
  },
];

export function UpcomingFollowUps() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upcoming Follow-ups</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {followUps.map((followUp) => (
            <div
              key={followUp.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="space-y-1">
                <p className="font-medium">{followUp.name}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {format(followUp.date, 'MMM d')}
                  <Clock className="h-3 w-3 ml-1" />
                  {followUp.time}
                </div>
              </div>
              <Button variant="outline" size="sm">
                {followUp.type}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}