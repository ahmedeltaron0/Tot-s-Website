import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "romantic-journey-state";

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Failed to load saved state:", e);
  }
  return {
    hasClickedYes: false,
    currentPage: 0, // 0 = landing, 1-6 = journey, 7 = final
    responses: {}, // { [pageId]: string }
    submitted: {}, // { [pageId]: boolean }
  };
};

export function useJourneyState() {
  const [state, setState] = useState(getInitialState);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save state:", e);
    }
  }, [state]);

  const clickYes = useCallback(() => {
    setState((prev) => ({ ...prev, hasClickedYes: true, currentPage: 1 }));
  }, []);

  const setCurrentPage = useCallback((page) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const updateResponse = useCallback((pageId, text) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, [pageId]: text },
    }));
  }, []);

  const submitResponse = useCallback((pageId) => {
    setState((prev) => ({
      ...prev,
      submitted: { ...prev.submitted, [pageId]: true },
    }));
  }, []);

  const goNext = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, 7),
    }));
  }, []);

  const goPrev = useCallback(() => {
    setState((prev) => {
      if (prev.currentPage <= 1) {
        return {
          ...prev,
          currentPage: 0,
          hasClickedYes: false,
        };
      }
      return {
        ...prev,
        currentPage: prev.currentPage - 1,
      };
    });
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      hasClickedYes: false,
      currentPage: 0,
      responses: {},
      submitted: {},
    });
  }, []);

  return {
    ...state,
    clickYes,
    setCurrentPage,
    updateResponse,
    submitResponse,
    goNext,
    goPrev,
    restart,
  };
}
