import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className='wrapped-section-head'>
      <div>
        <span className='wrapped-section-kicker'>{eyebrow}</span>
        <h2 className='wrapped-section-title'>{title}</h2>
        {description ? <p className='wrapped-section-description'>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}