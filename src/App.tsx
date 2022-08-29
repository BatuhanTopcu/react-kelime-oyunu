import React from 'react';
import MessageContainer from './components/MessageContainer';
import CustomButton from './components/CustomButton';
import Timer from './components/Timer';
import { useGameContext } from './context/gameContext';
import { GameState } from './types/gameTypes';
import GAME_SETTINGS from './utils/gameSettings';
import { PlaySvg, ReplaySvg } from './components/Svg';

function App() {
  const { startGame, gameState, nameHistory, gameRunning, remainingTime } = useGameContext();
  return (
    <div className="w-screen h-screen flex justify-between items-center bg-neutral-900 flex-col overflow-hidden gap-4 py-4 px-2 md:px-0">
      <h1 className="text-white font-bold text-3xl">Kelime Oyunu</h1>
      <MessageContainer messages={nameHistory} systemMsg={gameState} />
      <div className="flex gap-4">
        <CustomButton
          disabled={!gameRunning}
          className={`${gameRunning ? 'bg-green-500 hover:bg-green-700' : 'bg-zinc-600'}`}
          onClick={() => startGame()}
        >
          {gameState === GameState.IDLE ? PlaySvg : ReplaySvg}
        </CustomButton>
        <Timer time={remainingTime} maxTime={GAME_SETTINGS.SPEAK_TIME_MS / 1000} showTime={!gameRunning} />
      </div>
    </div>
  );
}

export default App;
