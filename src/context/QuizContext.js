import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rawQuestions from '../../questions.json';

export const QuizContext = createContext();

const STORAGE_KEY = '@quiz_state_v1';

export const QuizProvider = ({ children }) => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [mode, setMode] = useState('browse'); 
  const [range, setRange] = useState(null);
  const [persistedStateLoaded, setPersistedStateLoaded] = useState(false);

  useEffect(() => {
    const normalized = (rawQuestions || []).map((q, i) => ({ id: q.id ?? i + 1, ...q }));
    setAllQuestions(normalized);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(STORAGE_KEY);
        if (s) {
          const parsed = JSON.parse(s);
          if (parsed.mode) setMode(parsed.mode);
          if (parsed.range) setRange(parsed.range);
        }
      } catch (e) {
      } finally {
        setPersistedStateLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, range })).catch(() => {});
  }, [mode, range]);

  const value = { allQuestions, mode, setMode, range, setRange, persistedStateLoaded };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};