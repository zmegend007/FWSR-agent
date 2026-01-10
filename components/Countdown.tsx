
import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
}

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          d: Math.floor(difference / (1000 * 60 * 60 * 24)),
          h: Math.floor((difference / (1000 * 60 * 60)) % 24),
          m: Math.floor((difference / 1000 / 60) % 60),
          s: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {[
        { label: 'DAYS', value: timeLeft.d },
        { label: 'HOURS', value: timeLeft.h },
        { label: 'MINS', value: timeLeft.m },
        { label: 'SECS', value: timeLeft.s },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-heading font-bold tabular-nums">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-xs font-bold text-slate-500 tracking-widest mt-1">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
