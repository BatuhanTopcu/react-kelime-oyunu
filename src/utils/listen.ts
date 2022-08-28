enum ListenState {
  IDLE,
  LISTEN,
  SPEECH_START,
  PROCESSING,
}

const Listen = (listenTimeout: number) =>
  new Promise<string | null>((resolve) => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window))
      throw new Error('Speech synthesis is not supported in this browser');
    let recState: ListenState = ListenState.IDLE;
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'tr-TR';

    let timeout: NodeJS.Timeout | null = null;

    recognition.onstart = () => {
      recState = ListenState.LISTEN;
    };

    recognition.onspeechstart = () => {
      recState = ListenState.SPEECH_START;
      if (timeout) clearTimeout(timeout);
    };

    recognition.onresult = (event) => {
      if (timeout) clearTimeout(timeout);
      recState = ListenState.PROCESSING;
      resolve(event.results[0][0].transcript.toLocaleLowerCase());
    };

    recognition.onend = () => {
      if (recState === ListenState.SPEECH_START) resolve(null);
      recState = ListenState.IDLE;
    };

    recognition.start();
    timeout = setTimeout(() => {
      recognition.stop();
      resolve(null);
    }, listenTimeout);
  });

export default Listen;
