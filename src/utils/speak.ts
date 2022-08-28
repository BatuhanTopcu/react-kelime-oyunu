const Speak = async (word: string, delay = 0): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    if (!('speechSynthesis' in window)) throw new Error('Speech synthesis is not supported in this browser');
    const synth = new window.SpeechSynthesisUtterance();
    synth.lang = 'tr-TR';
    synth.text = word;
    setTimeout(() => {
      window.speechSynthesis.speak(synth);
      window.speechSynthesis.resume();
    }, delay);
    synth.onend = () => {
      resolve();
    };
    synth.onerror = (err) => {
      reject(err);
    };
  });

export default Speak;
