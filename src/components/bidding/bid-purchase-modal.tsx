import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Package, Sparkles, Trophy, Zap, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface BidPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => void;
  currentCredits: number;
}

const bundles = [
  {
    id: 'basic',
    name: 'Basic Bundle',
    credits: 10,
    basePrice: 99,
    description: 'Perfect for occasional bidding',
    discount: 0,
    icon: Package,
  },
  {
    id: 'pro',
    name: 'Professional Bundle',
    credits: 25,
    basePrice: 249,
    description: 'Ideal for active loan officers',
    discount: 5,
    icon: Zap,
    badge: 'Popular',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Bundle',
    credits: 50,
    basePrice: 499,
    description: 'Maximize your opportunities',
    discount: 10,
    icon: Trophy,
    badge: 'Best Value',
  },
];

const TAX_RATE = 0.0825; // 8.25% tax rate

function calculatePricing(basePrice: number, discount: number = 0) {
  const discountAmount = basePrice * (discount / 100);
  const subtotal = basePrice - discountAmount;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    basePrice,
    discountAmount,
    subtotal,
    tax,
    total,
  };
}

export function BidPurchaseModal({
  isOpen,
  onClose,
  onPurchase,
  currentCredits,
}: BidPurchaseModalProps) {
  const [selectedTab, setSelectedTab] = useState('bundles');
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const amount = selectedTab === 'bundles'
        ? bundles.find((b) => b.id === selectedBundle)?.credits || 0
        : customAmount;
      
      await onPurchase(amount);
      
      toast({
        title: 'Purchase Successful!',
        description: `You've successfully purchased ${amount} bid credits!`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: 'Purchase Failed',
        description: 'There was an error processing your purchase. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedBundlePricing = selectedBundle
    ? calculatePricing(
        bundles.find(b => b.id === selectedBundle)?.basePrice || 0,
        bundles.find(b => b.id === selectedBundle)?.discount || 0
      )
    : null;

  const customPricing = calculatePricing(customAmount * 10);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Purchase Bid Credits</DialogTitle>
          <DialogDescription>
            Choose a bundle or customize your credit purchase
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Credits */}
          <div className="space-y-2">
            <Label>Current Credits</Label>
            <div className="flex items-center gap-4">
              <Progress value={(currentCredits / 100) * 100} className="flex-1" />
              <span className="font-bold">{currentCredits} credits</span>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bundles">Pre-made Bundles</TabsTrigger>
              <TabsTrigger value="custom">Custom Amount</TabsTrigger>
            </TabsList>

            <TabsContent value="bundles" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {bundles.map((bundle) => {
                  const pricing = calculatePricing(bundle.basePrice, bundle.discount);
                  const Icon = bundle.icon;
                  return (
                    <div
                      key={bundle.id}
                      className={cn(
                        'relative rounded-lg border p-4 cursor-pointer transition-all hover:border-primary',
                        selectedBundle === bundle.id ? 'border-primary bg-primary/5' : ''
                      )}
                      onClick={() => setSelectedBundle(bundle.id)}
                    >
                      {bundle.badge && (
                        <Badge className="absolute -top-2 -right-2">
                          {bundle.badge}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">{bundle.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold">${pricing.total.toFixed(2)}</p>
                          {bundle.discount > 0 && (
                            <p className="text-sm line-through text-muted-foreground">
                              ${bundle.basePrice.toFixed(2)}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {bundle.credits} credits
                        </p>
                        {bundle.discount > 0 && (
                          <Badge variant="secondary">Save {bundle.discount}%</Badge>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {bundle.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedBundlePricing && (
                <div className="rounded-lg border p-4 space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Price Breakdown
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span>${selectedBundlePricing.basePrice.toFixed(2)}</span>
                    </div>
                    {selectedBundlePricing.discountAmount > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Discount:</span>
                        <span>-${selectedBundlePricing.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${selectedBundlePricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8.25%):</span>
                      <span>${selectedBundlePricing.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1 mt-1">
                      <span>Total:</span>
                      <span>${selectedBundlePricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="space-y-4">
                <Label>Choose Credit Amount</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[customAmount]}
                    onValueChange={(value) => setCustomAmount(value[0])}
                    min={5}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    className="w-20"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>5 credits</span>
                  <span>100 credits</span>
                </div>

                <div className="rounded-lg border p-4 space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    Price Breakdown
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price (${(10).toFixed(2)}/credit):</span>
                      <span>${customPricing.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (8.25%):</span>
                      <span>${customPricing.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold border-t pt-1 mt-1">
                      <span>Total:</span>
                      <span>${customPricing.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Rewards Section */}
          <div className="rounded-lg bg-primary/5 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Rewards</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Earn loyalty points with your purchase! Get 1 point per credit purchased.
            </p>
            <Progress value={60} className="mt-2" />
            <p className="text-xs text-muted-foreground">
              60/100 points to Silver Tier
            </p>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <Label>Payment Method</Label>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-14 rounded bg-primary/10" />
                <span>•••• 4242</span>
              </div>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handlePurchase}
            disabled={isProcessing || (selectedTab === 'bundles' && !selectedBundle)}
          >
            {isProcessing ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}