import { addHours, subDays } from 'date-fns';

export interface PriorityLead {
  id: string;
  name: string;
  location: string;
  amount: string;
  currentRate: string;
  timeLeft: string;
  type: 'Guaranteed' | 'Competitive';
  priority: 'high' | 'medium';
  lastContacted?: Date;
  lastNote?: string;
  propertyType?: string;
  loanTerm?: string;
  expiryTime: Date;
  isHighValue?: boolean;
  creditScore?: string;
  dti?: string;
  purpose?: string;
}

export const priorityLeads: PriorityLead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    amount: '$450,000',
    currentRate: '4.5%',
    timeLeft: '2h 15m',
    type: 'Guaranteed',
    priority: 'high',
    lastContacted: subDays(new Date(), 2),
    lastNote: 'Interested in 30-year fixed rate options',
    propertyType: 'Single Family',
    loanTerm: '30-year fixed',
    expiryTime: addHours(new Date(), 2),
    isHighValue: true,
    creditScore: '720-740',
    dti: '32%',
    purpose: 'Purchase',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Seattle, WA',
    amount: '$325,000',
    currentRate: '5.2%',
    timeLeft: '45m',
    type: 'Competitive',
    priority: 'high',
    lastContacted: subDays(new Date(), 1),
    propertyType: 'Condo',
    loanTerm: '15-year fixed',
    expiryTime: addHours(new Date(), 0.75),
    creditScore: '680-700',
    dti: '36%',
    purpose: 'Refinance',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    location: 'Los Angeles, CA',
    amount: '$275,000',
    currentRate: '4.8%',
    timeLeft: '1h 30m',
    type: 'Guaranteed',
    priority: 'medium',
    lastContacted: subDays(new Date(), 3),
    lastNote: 'Following up on rate discussion',
    propertyType: 'Townhouse',
    loanTerm: '30-year fixed',
    expiryTime: addHours(new Date(), 1.5),
    creditScore: '700-720',
    dti: '28%',
    purpose: 'Purchase',
  },
];