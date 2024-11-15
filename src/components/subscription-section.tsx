import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$99',
    description: 'Essential features for getting started',
    features: [
      '10 Guaranteed Leads/month',
      'Basic Bidding Access',
      'Standard Support',
      'Basic Analytics',
    ],
    current: false,
  },
  {
    name: 'Professional',
    price: '$199',
    description: 'Perfect for growing loan officers',
    features: [
      '25 Guaranteed Leads/month',
      'Priority Bidding Access',
      'Priority Support',
      'Advanced Analytics',
      'Custom Reports',
    ],
    current: true,
  },
  {
    name: 'Enterprise',
    price: '$399',
    description: 'For high-volume loan officers',
    features: [
      '50 Guaranteed Leads/month',
      'Premium Bidding Access',
      '24/7 Priority Support',
      'Advanced Analytics',
      'Custom Reports',
      'API Access',
    ],
    current: false,
  },
];

export function SubscriptionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>
          Manage your subscription and billing details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.current ? 'border-primary' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.current && (
                    <Badge variant="secondary">Current Plan</Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-6 w-full"
                  variant={plan.current ? 'outline' : 'default'}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}