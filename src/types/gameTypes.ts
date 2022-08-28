export enum GameState {
  IDLE,
  COMPUTER_TURN,
  PLAYER_TURN,
  PLAYER_WIN,
  COMPUTER_WIN,
}

export type GameContextType = {
  startGame: () => void;
  gameState: React.MutableRefObject<GameState>;
  remainingTime: number;
  nameHistory: string[];
};
