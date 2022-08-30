import { useRef, useState } from 'react';
import { GameState, Players } from '../types/types';
import GAME_SETTINGS from '../utils/gameSettings';
import { useNames } from './useNames';
import Speak from '../utils/speak';
import Listen from '../utils/listen';
import { randomIntFromInterval, sleep } from '../utils/helpers';
import { checkMicAccess } from '../utils/checkMicAccess';

export const useGame = () => {
  const { getRandomGuessWithError, appendNewName, nameHistory, resetNameHistory, whyNotValid } = useNames();
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [waitingForGuess, setWaitingForGuess] = useState<Players | false>(false);
  const gameStateRef = useRef<GameState>(GameState.IDLE);

  const setBothGameState = (state: GameState) => {
    gameStateRef.current = state;
    setGameState(state);
  };

  const [remainingTime, setRemainingTime] = useState(Math.floor(GAME_SETTINGS.SPEAK_TIME_MS / 1000));
  const interval = useRef<NodeJS.Timer | null>(null);

  const computerTurn = async () => {
    setBothGameState(GameState.COMPUTER_TURN);
    setWaitingForGuess(Players.computer);
    const guess = getRandomGuessWithError(GAME_SETTINGS.COMPUTER_SELECT_WORD_ERROR_PERCENT);
    if (!guess) return false;
    const delay = randomIntFromInterval(
      0,
      GAME_SETTINGS.SPEAK_TIME_MS + (GAME_SETTINGS.COMPUTER_TIME_ERROR_PERCENT / 100) * GAME_SETTINGS.SPEAK_TIME_MS,
    );
    if (delay > GAME_SETTINGS.SPEAK_TIME_MS) {
      await sleep(GAME_SETTINGS.SPEAK_TIME_MS);
      appendNewName(null, Players.computer);
      return false;
    }
    await Speak({
      word: guess,
      delay,
      onStart: () => {
        if (interval.current) clearInterval(interval.current);
      },
    });
    setWaitingForGuess(false);
    if (!appendNewName(guess, Players.computer)) return false;
    return true;
  };

  const playerTurn = async () => {
    setBothGameState(GameState.PLAYER_TURN);
    setWaitingForGuess(Players.user);
    const guess = await Listen({
      listenTimeout: GAME_SETTINGS.SPEAK_TIME_MS,
      onSpeechStart: () => {
        if (interval.current) clearInterval(interval.current);
      },
    });
    setWaitingForGuess(false);
    if (!appendNewName(guess, Players.user)) return false;
    return true;
  };

  const finishGame = () => {
    if (gameStateRef.current === GameState.COMPUTER_TURN) {
      setBothGameState(GameState.PLAYER_WIN);
    } else {
      setBothGameState(GameState.COMPUTER_WIN);
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

    setBothGameState(
      gameStateRef.current === GameState.COMPUTER_TURN ? GameState.PLAYER_TURN : GameState.COMPUTER_TURN,
    );
    await sleep(GAME_SETTINGS.SLEEP_BETWEEN_ROUNDS_MS);
    await gameLoop();
  };

  const startGame = async () => {
    const micAccess = await checkMicAccess();
    if (micAccess !== 'granted') {
      // eslint-disable-next-line no-alert
      alert('Lütfen oyuna başlamak için mikrofon izni verin.');
      return;
    }
    if (GameState.COMPUTER_WIN || GameState.PLAYER_WIN) resetNameHistory();
    setBothGameState(GameState.COMPUTER_TURN);
    await gameLoop();
  };

  const gameRunning =
    gameState === GameState.IDLE || gameState === GameState.COMPUTER_WIN || gameState === GameState.PLAYER_WIN;

  return { startGame, gameState, nameHistory, remainingTime, whyNotValid, gameRunning, waitingForGuess };
};
