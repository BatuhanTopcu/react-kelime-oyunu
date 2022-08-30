import React, { createContext, useContext, useMemo } from 'react';
import { GameContextType } from '../types/types';
import { useGame } from '../hooks/useGame';
import { usePopup } from '../hooks/usePopup';

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { startGame, gameState, nameHistory, remainingTime, whyNotValid, gameRunning, waitingForGuess } = useGame();
  const { isOpen, closePopup, openPopup } = usePopup();

  const values = useMemo(
    () => ({
      startGame,
      gameState,
      nameHistory,
      remainingTime,
      whyNotValid,
      gameRunning,
      isOpen,
      closePopup,
      openPopup,
      waitingForGuess,
    }),
    [
      startGame,
      gameState,
      nameHistory,
      remainingTime,
      whyNotValid,
      gameRunning,
      isOpen,
      closePopup,
      openPopup,
      waitingForGuess,
    ],
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('GameContext is not defined');
  return ctx;
};
