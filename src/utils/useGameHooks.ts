import { useRef, useState } from 'react';
import { GameState } from '../types/gameTypes';
import GAME_SETTINGS from './gameSettings';
import { useNames } from './useNames';
import Speak from './speak';
import Listen from './listen';
import { randomIntFromInterval, sleep } from './helpers';

export const useGame = () => {
  const { getRandomGuessWithError, appendNewName, nameHistory } = useNames();
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const gameStateRef = useRef<GameState>(GameState.IDLE);

  const [remainingTime, setRemainingTime] = useState(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
  const interval = useRef<NodeJS.Timer | null>(null);

  const computerTurn = async () => {
    gameStateRef.current = GameState.COMPUTER_TURN;
    setGameState(GameState.COMPUTER_TURN);
    const guess = getRandomGuessWithError(GAME_SETTINGS.COMPUTER_SELECT_WORD_ERROR_PERCENT);
    if (!guess) return false;
    const delay = randomIntFromInterval(
      0,
      GAME_SETTINGS.SPEAK_TIME_MS + (GAME_SETTINGS.COMPUTER_TIME_ERROR_PERCENT / 100) * GAME_SETTINGS.SPEAK_TIME_MS,
    );
    if (delay > GAME_SETTINGS.SPEAK_TIME_MS) {
      await sleep(GAME_SETTINGS.SPEAK_TIME_MS);
      return false;
    }
    await Speak({
      word: guess,
      delay,
      onStart: () => {
        if (interval.current) clearInterval(interval.current);
      },
    });
    if (!appendNewName(guess, 'computer')) return false;
    return true;
  };

  const playerTurn = async () => {
    gameStateRef.current = GameState.PLAYER_TURN;
    setGameState(GameState.PLAYER_TURN);
    const guess = await Listen({
      listenTimeout: GAME_SETTINGS.SPEAK_TIME_MS,
      onSpeechStart: () => {
        if (interval.current) clearInterval(interval.current);
      },
    });
    if (!guess || !appendNewName(guess, 'player')) return false;
    return true;
  };

  const finishGame = () => {
    if (gameStateRef.current === GameState.COMPUTER_TURN) {
      gameStateRef.current = GameState.PLAYER_WIN;
      setGameState(GameState.PLAYER_WIN);
    } else {
      gameStateRef.current = GameState.COMPUTER_WIN;
      setGameState(GameState.COMPUTER_WIN);
    }
  };

  const gameLoop = async () => {
    if (!(gameStateRef.current === GameState.COMPUTER_TURN || gameStateRef.current === GameState.PLAYER_TURN)) {
      return;
    }
    setRemainingTime(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
    interval.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    const isContinue = gameStateRef.current === GameState.COMPUTER_TURN ? await computerTurn() : await playerTurn();
    if (interval.current) clearInterval(interval.current);
    if (!isContinue) {
      finishGame();
      return;
    }
    gameStateRef.current =
      gameStateRef.current === GameState.COMPUTER_TURN ? GameState.PLAYER_TURN : GameState.COMPUTER_TURN;
    setGameState(gameStateRef.current === GameState.COMPUTER_TURN ? GameState.PLAYER_TURN : GameState.COMPUTER_TURN);
    await sleep(GAME_SETTINGS.SLEEP_BETWEEN_ROUNDS_MS);
    await gameLoop();
  };

  const startGame = async () => {
    gameStateRef.current = GameState.COMPUTER_TURN;
    setGameState(GameState.COMPUTER_TURN);
    await gameLoop();
  };

  return { startGame, gameState, nameHistory, remainingTime };
};
