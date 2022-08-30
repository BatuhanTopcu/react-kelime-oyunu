import { useState, useRef } from 'react';
import { GameHistoryType, Players, WrongNameReasons } from '../types/types';
import { getRandomFromArray, randomIntFromInterval } from '../utils/helpers';
import allNames from '../names.json';

const getValidNames = (names: string[], history: string[]): string[] => {
  if (history.length === 0) return names;
  const lastNamesLastLetter = history[history.length - 1].slice(-1);
  return names
    .filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter)
    .filter((name) => !history.includes(name.toLocaleLowerCase()));
};

const getInvalidNames = (names: string[], history: string[]): string[] => {
  if (history.length === 0) return [];
  const lastNamesLastLetter = history[history.length - 1].slice(-1);
  return [
    ...names.filter((name) => !(name.toLocaleLowerCase()[0] === lastNamesLastLetter)),
    ...history.filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter),
  ];
};

export const useNames = () => {
  const [nameHistory, setNameHistory] = useState<GameHistoryType[]>([]);
  const nameHistoryRef = useRef<string[]>([]);
  const [whyNotValid, setWhyNotValid] = useState<WrongNameReasons | null>(null);

  const resetNameHistory = () => {
    nameHistoryRef.current = [];
    setNameHistory([]);
    setWhyNotValid(null);
  };

  const checkValidName = (name: string) => {
    if (nameHistoryRef.current.includes(name)) {
      setWhyNotValid(WrongNameReasons.IN_NAME_HISTORY);
      return false;
    }
    const lowerName = name.toLocaleLowerCase();
    const lastWord = nameHistoryRef.current[nameHistoryRef.current.length - 1];
    if (lastWord && lowerName[0] !== lastWord[lastWord.length - 1]) {
      setWhyNotValid(WrongNameReasons.NOT_LAST_WORDS_FIRST);
      return false;
    }
    if (!getValidNames(allNames, nameHistoryRef.current).includes(lowerName)) {
      setWhyNotValid(WrongNameReasons.NOT_IN_NAME_LIST);
      return false;
    }
    return true;
  };

  const appendNewName = (name: string | null, from: Players): boolean => {
    if (!name) {
      setWhyNotValid(WrongNameReasons.TIMEOUT);
      return false;
    }
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
    if (random > errorPercent) return getRandomFromArray(getValidNames(allNames, nameHistoryRef.current));
    const invalids = [...allNames, ...getInvalidNames(allNames, nameHistoryRef.current)];
    return getRandomFromArray(invalids);
  };

  return { appendNewName, nameHistory, getRandomGuessWithError, resetNameHistory, whyNotValid };
};
