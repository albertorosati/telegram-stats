'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  className?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ value, className, decimals = 0, prefix = '', suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -120px 0px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    const controls = animate(0, value, {
      duration: 1.05,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplayValue(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [isInView, value]);

  return (
    <span className={className} ref={ref}>
      {prefix}
      {displayValue.toLocaleString('it-IT', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}