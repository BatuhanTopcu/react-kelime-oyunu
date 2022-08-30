# Kelime Oyunu - Atölye15 Case

Selamlar,
Tarayıcının **Speech Recognition** ve **Speech Synthesis Utterance** özelliklerini kullanarak projeyi tamamladım. Projeyi **[Create React App](https://create-react-app.dev/)** ile oluşturdum. Tasarımı **[TailwindCSS](https://tailwindcss.com/)** kullanarak oluşturdum. **ESLint** kurallarını sıfırdan oluşturmamak için **[eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)** kullandım. Proje basit bir oyun olduğu için route yapısı kurma gereği duymadım.

Projeyi çalıştırmak için:

    npm run install
    npm run start

Lint kontrolü yapmak için:

    npm run install
    npm run lint

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

Vakit ayırdığınız için teşekkürler,
[Batuhan Topçu](mailto:batuhantopcu17@gmail.com)
