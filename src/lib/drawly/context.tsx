"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { CUSTOM_PRIZES_DEFAULT } from "./prizes";
import type { Action, DrawlyState } from "./types";

const STORAGE_KEY = "drawly-state-v1";

export const initialState: DrawlyState = {
  participants: [],
  mode: "standard",
  modeConfig: {},
  prizeTemplate: "classic",
  customPrizes: CUSTOM_PRIZES_DEFAULT,
  prizePool: "",
  eventTitle: "World Cup 2026 Sweepstake",
  assignments: [],
  generatedAt: null,
};

function reducer(state: DrawlyState, action: Action): DrawlyState {
  switch (action.type) {
    case "SET_PARTICIPANTS":
      return { ...state, participants: action.payload };
    case "SET_MODE":
      return {
        ...state,
        mode: action.payload.mode,
        modeConfig: action.payload.config ?? state.modeConfig,
      };
    case "SET_PRIZE_TEMPLATE":
      return { ...state, prizeTemplate: action.payload };
    case "SET_CUSTOM_PRIZES":
      return { ...state, customPrizes: action.payload };
    case "SET_PRIZE_POOL":
      return { ...state, prizePool: action.payload };
    case "SET_EVENT_TITLE":
      return { ...state, eventTitle: action.payload };
    case "SET_ASSIGNMENTS":
      return {
        ...state,
        assignments: action.payload,
        generatedAt: Date.now(),
      };
    case "RESET":
      return {
        ...initialState,
        // keep event title as it's a preference
        eventTitle: state.eventTitle,
      };
    case "HYDRATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

interface DrawlyContextValue {
  state: DrawlyState;
  dispatch: Dispatch<Action>;
}

const DrawlyContext = createContext<DrawlyContextValue | null>(null);

function loadFromStorage(): Partial<DrawlyState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // 不还原 assignments（这些是临时结果，不应持久化）
    const { assignments: _a, generatedAt: _t, ...rest } = data;
    return rest as Partial<DrawlyState>;
  } catch {
    return null;
  }
}

function saveToStorage(state: DrawlyState) {
  if (typeof window === "undefined") return;
  try {
    const { assignments: _a, generatedAt: _t, ...rest } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch {
    /* quota exceeded - ignore */
  }
}

export function DrawlyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      dispatch({ type: "HYDRATE", payload: stored });
    }
  }, []);

  // Auto-save on state change
  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  return (
    <DrawlyContext.Provider value={{ state, dispatch }}>
      {children}
    </DrawlyContext.Provider>
  );
}

export function useDrawly() {
  const ctx = useContext(DrawlyContext);
  if (!ctx) {
    throw new Error("useDrawly must be used within DrawlyProvider");
  }
  return ctx;
}