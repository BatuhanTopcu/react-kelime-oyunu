import React from 'react';
import MessageContainer from './components/MessageContainer';
import CustomButton from './components/CustomButton';
import Timer from './components/Timer';
import { useGameContext } from './context/gameContext';
import { GameState } from './types/types';
import GAME_SETTINGS from './utils/gameSettings';
import { InfoSvg, PlaySvg, ReplaySvg } from './components/Svg';
import InfoBox from './components/InfoBox';

function App() {
  const { startGame, gameState, gameRunning, remainingTime, isOpen, closePopup, openPopup } = useGameContext();

  return (
    <div className="w-screen h-screen flex justify-between items-center bg-neutral-900 flex-col overflow-hidden gap-4 py-4 px-2 md:px-0 font-poppins">
      <h1 className="text-white font-bold text-3xl font-secular drop-shadow-dark">Kelime Oyunu</h1>
      {isOpen && <InfoBox handleClose={closePopup} />}
      <MessageContainer />
      <div className="flex gap-4">
        <CustomButton
          disabled={!gameRunning || isOpen}
          className="bg-cyan-500 hover:bg-cyan-700 disabled:bg-zinc-600"
          onClick={() => openPopup()}
        >
          {InfoSvg}
        </CustomButton>
        <CustomButton
          disabled={!gameRunning}
          className="bg-green-500 hover:bg-green-700 disabled:bg-zinc-600"
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
