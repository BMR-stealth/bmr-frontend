import React from 'react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 text-slate-300 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg text-slate-100 font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}

