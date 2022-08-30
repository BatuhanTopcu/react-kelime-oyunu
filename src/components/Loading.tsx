import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center h-8 gap-2 px-2">
      <div className="jumping-ball bg-pink-300" />
      <div className="jumping-ball animation-delay-75 bg-pink-400" />
      <div className="jumping-ball animation-delay-150 bg-pink-500" />
    </div>
  );
}
