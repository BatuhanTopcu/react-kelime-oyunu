import React, { createContext, useContext, useMemo } from 'react';
import { GameContextType } from '../types/gameTypes';
import { useGame } from '../utils/useGameHooks';

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { startGame, gameState, nameHistory, remainingTime } = useGame();

  const values = useMemo(
    () => ({
      startGame,
      gameState,
      nameHistory,
      remainingTime,
    }),
    [startGame, gameState, nameHistory, remainingTime],
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('GameContext is not defined');
  }
  return ctx;
};
