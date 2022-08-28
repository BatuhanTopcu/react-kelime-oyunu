export enum GameState {
  IDLE = 'Bekleniyor',
  COMPUTER_TURN = 'Bilgisayarın sırası',
  PLAYER_TURN = 'Kullanıcının sırası',
  PLAYER_WIN = 'Kullanıcı kazandı',
  COMPUTER_WIN = 'Bilgisayar kazandı',
}

export type GameContextType = {
  startGame: () => void;
  gameState: GameState;
  remainingTime: number;
  nameHistory: GameHistoryType[];
};

export type Players = 'computer' | 'player';

export type GameHistoryType = {
  name: string;
  from: Players;
};
