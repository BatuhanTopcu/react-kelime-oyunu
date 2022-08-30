export type GameContextType = {
  startGame: () => void;
  gameState: GameState;
  remainingTime: number;
  nameHistory: GameHistoryType[];
  whyNotValid: WrongNameReasons | null;
  gameRunning: boolean;
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  waitingForGuess: Players | false;
};

export type GameHistoryType = {
  name: string;
  from: Players;
};

export enum GameState {
  IDLE = 'Bekleniyor',
  COMPUTER_TURN = 'Bilgisayarın sırası',
  PLAYER_TURN = 'Kullanıcının sırası',
  PLAYER_WIN = 'Kullanıcı kazandı',
  COMPUTER_WIN = 'Bilgisayar kazandı',
}

export enum WrongNameReasons {
  TIMEOUT = 'Zamanında isim söylenmedi',
  IN_NAME_HISTORY = 'Söylenen isim daha önce kullanıldı',
  NOT_IN_NAME_LIST = 'Söylenen isim isim listede yok',
  NOT_LAST_WORDS_FIRST = 'İsim son söylenen kelimenin son harfi ile başlamalı',
}

export enum Players {
  computer = 'Bilgisayar',
  user = 'Kullanıcı',
}
