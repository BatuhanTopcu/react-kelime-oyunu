import React from 'react';

type TimerProps = { time: number; maxTime: number; showTime: boolean };

const getTimerColor = (time: number, maxTime: number) => {
  const timePercent = time / maxTime;
  if (timePercent < 0.3) return 'bg-red-500';
  if (timePercent < 0.7) return 'bg-orange-500';
  return 'bg-green-500';
};

export default function Timer({ time, maxTime, showTime }: TimerProps) {
  const color = getTimerColor(time, maxTime);
  return (
    <div className={`${color} ${showTime ? 'scale-100' : 'scale-0'} action-button tra-300`}>{showTime && time}</div>
  );
}
