import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, CreditCard } from 'lucide-react';

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

export function SubscriptionTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.current ? 'border-primary' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{plan.price}</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4"
                variant={plan.current ? 'outline' : 'default'}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>
            Manage your payment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              <span>•••• •••• •••• 4242</span>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}