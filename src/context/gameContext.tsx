import React, { createContext, useContext, useMemo } from 'react';
import { GameContextType } from '../types/gameTypes';
import { useGame } from '../hooks/useGame';

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { startGame, gameState, nameHistory, remainingTime, whyNotValid, canStart } = useGame();

  const values = useMemo(
    () => ({
      startGame,
      gameState,
      nameHistory,
      remainingTime,
      whyNotValid,
      canStart,
    }),
    [startGame, gameState, nameHistory, remainingTime, whyNotValid, canStart],
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('GameContext is not defined');
  return ctx;
};
