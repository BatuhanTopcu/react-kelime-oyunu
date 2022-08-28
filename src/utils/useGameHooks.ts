import { useRef, useState } from 'react';
import { GameState } from '../types/gameTypes';
import GAME_SETTINGS from './gameSettings';
import { useNames } from './useNames';
import Speak from './speak';
import Listen from './listen';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const { getRandomGuessWithError, appendNewName, nameHistory } = useNames();
  const [remainingTime, setRemainingTime] = useState(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
  const interval = useRef<NodeJS.Timer | null>(null);

  const computerTurn = async () => {
    setGameState(GameState.COMPUTER_TURN);
    const guess = getRandomGuessWithError(GAME_SETTINGS.COMPUTER_SELECT_WORD_ERROR_PERCENT);
    if (!guess) return false;
    await Speak(guess);
    if (!appendNewName(guess)) return false;
    return true;
  };

  const playerTurn = async () => {
    setGameState(GameState.PLAYER_TURN);
    const guess = await Listen(GAME_SETTINGS.SPEAK_TIME_MS);
    if (!guess || !appendNewName(guess)) return false;
    return true;
  };

  const finishGame = () => {
    if (gameState === GameState.COMPUTER_TURN) {
      setGameState(GameState.PLAYER_WIN);
    } else {
      setGameState(GameState.COMPUTER_WIN);
    }
  };

  const gameLoop = async () => {
    setRemainingTime(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
    interval.current = setInterval(() => {
      setRemainingTime(remainingTime - 1);
      if (remainingTime === 0 && interval.current) {
        clearInterval(interval.current);
      }
    }, 1000);
    const isContinue = gameState === GameState.COMPUTER_TURN ? await computerTurn() : await playerTurn();
    if (interval.current) clearInterval(interval.current);
    if (!isContinue) {
      finishGame();
      return;
    }
    setGameState(gameState === GameState.COMPUTER_TURN ? GameState.PLAYER_TURN : GameState.COMPUTER_TURN);
  };

  const startGame = async () => {
    setGameState(GameState.COMPUTER_TURN);
    while (gameState === GameState.PLAYER_TURN || gameState === GameState.COMPUTER_TURN) {
      // eslint-disable-next-line no-await-in-loop
      await gameLoop();
    }
  };

  return { startGame, gameState, nameHistory, remainingTime };
};
