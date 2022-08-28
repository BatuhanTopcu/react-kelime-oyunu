import { useRef, useState } from 'react';
import { GameState } from '../types/gameTypes';
import GAME_SETTINGS from './gameSettings';
import { useNames } from './useNames';
import Speak from './speak';
import Listen from './listen';
import { sleep } from './helpers';

export const useGame = () => {
  const gameState = useRef<GameState>(GameState.IDLE);
  const { getRandomGuessWithError, appendNewName, nameHistory } = useNames();
  const [remainingTime, setRemainingTime] = useState(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
  const interval = useRef<NodeJS.Timer | null>(null);

  const computerTurn = async () => {
    gameState.current = GameState.COMPUTER_TURN;
    const guess = getRandomGuessWithError(GAME_SETTINGS.COMPUTER_SELECT_WORD_ERROR_PERCENT);
    if (!guess) return false;
    await Speak(guess);
    if (!appendNewName(guess)) return false;
    return true;
  };

  const playerTurn = async () => {
    gameState.current = GameState.PLAYER_TURN;
    const guess = await Listen(GAME_SETTINGS.SPEAK_TIME_MS);
    if (!guess || !appendNewName(guess)) return false;
    return true;
  };

  const finishGame = () => {
    if (gameState.current === GameState.COMPUTER_TURN) {
      gameState.current = GameState.PLAYER_WIN;
    } else {
      gameState.current = GameState.COMPUTER_WIN;
    }
  };

  const gameLoop = async () => {
    if (!(gameState.current === GameState.COMPUTER_TURN || gameState.current === GameState.PLAYER_TURN)) {
      return;
    }
    setRemainingTime(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
    interval.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    const isContinue = gameState.current === GameState.COMPUTER_TURN ? await computerTurn() : await playerTurn();
    if (interval.current) clearInterval(interval.current);
    if (!isContinue) {
      finishGame();
      return;
    }
    gameState.current = gameState.current === GameState.COMPUTER_TURN ? GameState.PLAYER_TURN : GameState.COMPUTER_TURN;
    await sleep(1500);
    await gameLoop();
  };

  const startGame = async () => {
    gameState.current = GameState.COMPUTER_TURN;
    await gameLoop();
  };

  return { startGame, gameState, nameHistory, remainingTime };
};
