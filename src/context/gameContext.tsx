import React, { createContext, useContext, useMemo } from 'react';
import { GameContextType } from '../types/gameTypes';
import { useGame } from '../hooks/useGame';

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameContextProvider({ children }: { children: React.ReactNode }) {
  const { startGame, gameState, nameHistory, remainingTime, replayGame, whyNotValid } = useGame();

  const values = useMemo(
    () => ({
      startGame,
      replayGame,
      gameState,
      nameHistory,
      remainingTime,
      whyNotValid,
    }),
    [startGame, replayGame, gameState, nameHistory, remainingTime, whyNotValid],
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('GameContext is not defined');
  return ctx;
};
