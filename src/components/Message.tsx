import React from 'react';
import { GameHistoryType, Players } from '../types/types';
import Loading from './Loading';

type MessageProps = (GameHistoryType & { loading?: never }) | { from: Players; loading: true; name?: undefined };

export default function Message({ from, name, loading }: MessageProps) {
  return (
    <div
      className={`w-max px-4 py-1 font-semibold text-2xl rounded-xl drop-shadow-dark text-slate-100 relative ${
        from === Players.computer
          ? 'self-start rounded-bl-none bg-violet-500'
          : 'self-end rounded-br-none bg-emerald-500'
      }`}
    >
      <div
        className={`flex absolute text-sm top-10 drop-shadow-md  ${from === Players.computer ? 'left-0' : 'right-0'}`}
      >
        {from}
      </div>
      {loading ? <Loading /> : <span className="drop-shadow-dark">{name}</span>}
    </div>
  );
}
