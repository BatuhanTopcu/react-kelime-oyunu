import { useState, useMemo, useEffect } from 'react';
import { getRandomFromArray, randomIntFromInterval } from './helpers';

const fetchNames = async (): Promise<string[]> => {
  const response = await fetch('../../names.json');
  const json = await response.json();
  return json;
};

export const useNames = () => {
  const [names, setNames] = useState<string[]>([]);
  const [nameHistory, setNameHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const validNames = useMemo(() => {
    if (nameHistory.length === 0) return names;
    const lastNamesLastLetter = nameHistory[nameHistory.length - 1].slice(-1);
    return names
      .filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter)
      .filter((name) => !nameHistory.includes(name.toLocaleLowerCase()));
  }, [nameHistory, names]);

  const invalidNames = useMemo(() => {
    if (nameHistory.length === 0) return [];
    const lastNamesLastLetter = nameHistory[nameHistory.length - 1].slice(-1);
    return [
      ...names.filter((name) => !(name.toLocaleLowerCase()[0] === lastNamesLastLetter)),
      ...nameHistory.filter((name) => name.toLocaleLowerCase()[0] === lastNamesLastLetter),
    ];
  }, [nameHistory, names]);

  useEffect(() => {
    if (names.length !== 0) return;
    setIsLoading(true);
    fetchNames()
      .then((res) => {
        setNames(res);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [names.length]);

  const checkValidName = (name: string) => {
    if (nameHistory.includes(name)) return false;
    const lowerName = name.toLocaleLowerCase();
    const lastWord = nameHistory[nameHistory.length - 1];
    if (lowerName[0] !== lastWord[lastWord.length - 1]) return false;
    return validNames.includes(lowerName);
  };

  const appendNewName = (name: string): boolean => {
    const lowerName = name.toLocaleLowerCase();
    if (!checkValidName(lowerName)) return false;
    setNameHistory([...nameHistory, lowerName]);
    return true;
  };

  const getRandomGuessWithError = (errorPercent: number): string | null => {
    const error = randomIntFromInterval(0, 100) <= errorPercent;
    if (error && invalidNames.length > 0) return getRandomFromArray(invalidNames);
    return getRandomFromArray(validNames);
  };

  return { names, appendNewName, isLoading, nameHistory, getRandomGuessWithError };
};
