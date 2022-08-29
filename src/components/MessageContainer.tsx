import React from 'react';
import { useScrollToBottomElement } from '../hooks/generalHooks';
import { GameHistoryType, GameState } from '../types/gameTypes';
import Message from './Message';

type MessageContainerProps = {
  messages: GameHistoryType[];
  systemMsg: GameState;
};

export default function MessageContainer({ messages, systemMsg }: MessageContainerProps) {
  const divRef = useScrollToBottomElement([messages]);
  return (
    <div className="w-full max-w-xl bg-slate-600 h-full px-2 py-2 flex flex-col gap-2 rounded-3xl drop-shadow-xl overflow-y-auto">
      <div className="w-full flex justify-center text-2xl text-white">İsim Geçmişi</div>
      <div className="overflow-y-auto flex flex-col gap-2 px-2 scrollbar h-full pb-4" ref={divRef}>
        {messages.map((msg) => (
          <Message key={msg.name} msg={msg} />
        ))}
      </div>
      <div className="flex justify-center text-xl">{systemMsg}</div>
    </div>
  );
}
