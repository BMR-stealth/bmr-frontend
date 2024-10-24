import React from 'react';
import { LucideProps } from 'lucide-react';
import {
  BarChart3,
  CheckSquare,
  Brain,
  Filter,
} from 'lucide-react';

export const IconLeadFilter = React.forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Filter {...props} ref={ref} />
));

export const IconDashboard = React.forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <BarChart3 {...props} ref={ref} />
));

export const IconGuaranteed = React.forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <CheckSquare {...props} ref={ref} />
));

export const IconAI = React.forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <Brain {...props} ref={ref} />
));

IconLeadFilter.displayName = 'IconLeadFilter';
IconDashboard.displayName = 'IconDashboard';
IconGuaranteed.displayName = 'IconGuaranteed';
IconAI.displayName = 'IconAI';
