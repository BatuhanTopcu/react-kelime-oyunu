# Kelime Oyunu

Projeyi çalıştırmak için:

    npm run install
    npm run start

Oyun ayarlarını değiştirmek için:
**./src/utils/gameSettings.ts** dosyasını değiştirebilirsiniz.

    const  GAME_SETTINGS  = {
    // konuşma süresi (ms cinsinden)
    SPEAK_TIME_MS:  8000,
    // turlar arası bekleme süresi (ms cinsinden)
    SLEEP_BETWEEN_ROUNDS_MS:  500,
    // bilgisayarın zamanında cevap verememe şansı (yüzdelik olarak 1-99 arası)
    COMPUTER_TIME_ERROR_PERCENT:  5,
    // bilgisayarın yanlış kelime seçme şansı (yüzdelik olarak 1-99 arası)
    COMPUTER_SELECT_WORD_ERROR_PERCENT:  5,
    } as  const;

    export  default  GAME_SETTINGS;
