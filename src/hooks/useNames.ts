import { useState, useRef } from 'react';
import { GameHistoryType, Players, WrongNameReasons } from '../types/gameTypes';
import { getRandomFromArray, randomIntFromInterval } from '../utils/helpers';
import allNames from '../names.json';

export const useNames = () => {
  const [nameHistory, setNameHistory] = useState<GameHistoryType[]>([]);
  const nameHistoryRef = useRef<string[]>([]);
  const [whyNotValid, setWhyNotValid] = useState<WrongNameReasons | null>(null);

  const resetNameHistory = () => {
    nameHistoryRef.current = [];
    setNameHistory([]);
  };

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
    if (!getValidNames().includes(lowerName)) {
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
    if (random > errorPercent) return getRandomFromArray(getValidNames());
    const invalids = [...allNames, ...getInvalidNames()];
    return getRandomFromArray(invalids);
  };

  return { appendNewName, nameHistory, getRandomGuessWithError, resetNameHistory, whyNotValid };
};
