import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function BiddingHelp() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Bidding Guide</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-primary-foreground hover:text-primary-foreground hover:no-underline">
            How does bidding work?
          </AccordionTrigger>
          <AccordionContent>
            Enter your competitive interest rate. The lower your rate, the better chance
            you have of winning the lead. You can update your bid at any time before
            the timer expires.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-primary-foreground hover:text-primary-foreground hover:no-underline">
            What happens if I win?
          </AccordionTrigger>
          <AccordionContent>
            If you have the winning bid when the timer expires, you'll receive the
            lead's contact information and can proceed with the loan process.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-primary-foreground hover:text-primary-foreground hover:no-underline">
            Can I withdraw my bid?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can withdraw your bid at any time before the timer expires.
            However, you may not be able to bid on this lead again.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}