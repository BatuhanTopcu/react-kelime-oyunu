import { useState, useRef } from 'react';
import { getRandomFromArray, randomIntFromInterval } from './helpers';
import allNames from './names.json';

export const useNames = () => {
  const [nameHistory, setNameHistory] = useState<string[]>([]);
  const nameHistoryRef = useRef<string[]>([]);

  const validNames = () => {
    if (nameHistory.length === 0) return allNames;
    const lastNamesLastLetter = nameHistoryRef.current[nameHistoryRef.current.length - 1].slice(-1);
    return allNames
      .filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter)
      .filter((name) => !nameHistoryRef.current.includes(name.toLocaleLowerCase()));
  };

  const invalidNames = () => {
    if (nameHistory.length === 0) return [];
    const lastNamesLastLetter = nameHistoryRef.current[nameHistoryRef.current.length - 1].slice(-1);
    return [
      ...allNames.filter((name) => !(name.toLocaleLowerCase()[0] === lastNamesLastLetter)),
      ...nameHistoryRef.current.filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter),
    ];
  };

  const checkValidName = (name: string) => {
    if (nameHistoryRef.current.includes(name)) return false;
    const lowerName = name.toLocaleLowerCase();
    const lastWord = nameHistoryRef.current[nameHistoryRef.current.length - 1];
    if (lastWord && lowerName[0] !== lastWord[lastWord.length - 1]) return false;
    return validNames().includes(lowerName);
  };

  const appendNewName = (name: string): boolean => {
    const lowerName = name.toLocaleLowerCase();
    if (!checkValidName(lowerName)) return false;
    setNameHistory((prev) => [...prev, lowerName]);
    nameHistoryRef.current.push(lowerName);
    return true;
  };

  const getRandomGuessWithError = (errorPercent: number): string | null => {
    const error = randomIntFromInterval(0, 100) <= errorPercent;
    if (error && invalidNames.length > 0) return getRandomFromArray(invalidNames());
    return getRandomFromArray(validNames());
  };

  return { appendNewName, nameHistory, getRandomGuessWithError };
};
