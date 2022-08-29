import React from 'react';
import { GameHistoryType, Players } from '../types/gameTypes';

export default function Message({ msg }: { msg: GameHistoryType }) {
  return (
    <div
      className={`w-max px-4 py-1 font-semibold text-2xl rounded-xl drop-shadow-md text-slate-100 relative ${
        msg.from === Players.computer
          ? 'self-start rounded-bl-none bg-rose-700'
          : 'self-end rounded-br-none bg-emerald-500'
      }`}
    >
      <div
        className={`flex absolute text-sm top-10 drop-shadow-md  ${
          msg.from === Players.computer ? 'left-0' : 'right-0'
        }`}
      >
        {msg.from}
      </div>
      {msg.name}
    </div>
  );
}
