import React from 'react';
import MessageContainer from './components/MessageContainer';
import PlayButton from './components/PlayButton';
import { useGameContext } from './context/gameContext';
import { GameState } from './types/gameTypes';

function App() {
  const { startGame, gameState, nameHistory, canStart } = useGameContext();
  return (
    <div className="w-screen h-screen flex justify-between items-center bg-neutral-900 flex-col overflow-hidden gap-4 py-4 px-2 md:px-0">
      <h1 className="text-white font-bold text-3xl">Kelime Oyunu</h1>
      <MessageContainer messages={nameHistory} systemMsg={gameState} />
      <PlayButton
        disabled={!canStart}
        type={gameState === GameState.IDLE ? 'start' : 'replay'}
        onClick={() => startGame()}
      />
    </div>
  );
}

export default App;
