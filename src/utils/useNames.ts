import { useState, useRef } from 'react';
import { GameHistoryType, Players } from '../types/gameTypes';
import { getRandomFromArray, randomIntFromInterval } from './helpers';
import allNames from './names.json';

export const useNames = () => {
  const [nameHistory, setNameHistory] = useState<GameHistoryType[]>([]);
  const nameHistoryRef = useRef<string[]>([]);

  const getValidNames = () => {
    if (nameHistoryRef.current.length === 0) return allNames;
    const lastNamesLastLetter = nameHistoryRef.current[nameHistoryRef.current.length - 1].slice(-1);
    return allNames
      .filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter)
      .filter((name) => !nameHistoryRef.current.includes(name.toLocaleLowerCase()));
  };

  const getInvalidNames = () => {
    if (nameHistoryRef.current.length === 0) return [];
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
    return getValidNames().includes(lowerName);
  };

  const appendNewName = (name: string, from: Players): boolean => {
    const lowerName = name.toLocaleLowerCase();
    setNameHistory((prev) => [
      ...prev,
      {
        name: lowerName,
        from,
      },
    ]);
    if (!checkValidName(lowerName)) {
      return false;
    }
    nameHistoryRef.current.push(lowerName);
    return true;
  };

  const getRandomGuessWithError = (errorPercent: number): string | null => {
    const random = randomIntFromInterval(0, 100);
    const error = random <= errorPercent;
    const invalids = getInvalidNames();
    if (error && invalids.length > 0) return getRandomFromArray(invalids);
    return getRandomFromArray(getValidNames());
  };

  return { appendNewName, nameHistory, getRandomGuessWithError };
};
