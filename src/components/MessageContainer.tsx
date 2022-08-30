import React from 'react';
import { useGameContext } from '../context/gameContext';
import { useScrollToBottomElement } from '../hooks/generalHooks';
import Message from './Message';

export default function MessageContainer() {
  const { gameState, nameHistory, waitingForGuess, whyNotValid } = useGameContext();
  const divRef = useScrollToBottomElement([nameHistory]);
  return (
    <div className="w-full max-w-xl bg-zinc-700 h-full p-2 flex flex-col gap-2 rounded-3xl drop-shadow-xl overflow-hidden">
      <div className="w-full flex justify-center text-2xl text-white font-secular drop-shadow-dark">İsim Geçmişi</div>
      <div className="overflow-y-auto flex flex-col gap-2 px-2 scrollbar h-full pb-4" ref={divRef}>
        {nameHistory.map((msg) => (
          <Message key={msg.name} name={msg.name} from={msg.from} />
        ))}
        {waitingForGuess && <Message from={waitingForGuess} loading />}
      </div>
      <div className="flex flex-col justify-center text-xl text-white font-secular drop-shadow-dark text-center">
        {whyNotValid && <span className="text-base font-poppins">{whyNotValid}</span>}
        {gameState}
      </div>
    </div>
  );
}
