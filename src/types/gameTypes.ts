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
  replayGame: () => void;
  whyNotValid: WrongNameReasons | null;
};

export type Players = 'computer' | 'player';

export type GameHistoryType = {
  name: string;
  from: Players;
};

export enum WrongNameReasons {
  TIMEOUT = 'Zamanında cevap verilmedi',
  IN_NAME_HISTORY = 'İsim zaten var',
  NOT_IN_NAME_LIST = 'İsim listesinde yok',
  NOT_LAST_WORDS_FIRST = 'İsim son kelimenin son harfi ile başlamalı',
}
