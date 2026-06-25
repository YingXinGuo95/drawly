"use client";

import { useEffect, useRef } from "react";
import { Users, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDrawly } from "@/lib/drawly/context";
import { parseParticipants } from "@/lib/drawly/shuffle";

const EXAMPLE = `Alice
Bob
Charlie
Daisy
Ethan
Fiona
George
Hannah
Ivan
Julia`;

export function ParticipantInput() {
  const { state, dispatch } = useDrawly();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const text = state.participants.join("\n");
  const count = state.participants.length;

  // Sync textarea when state changes (e.g. via example button)
  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== text) {
      textareaRef.current.value = text;
    }
  }, [text]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "SET_PARTICIPANTS",
      payload: parseParticipants(e.target.value),
    });
  };

  const loadExample = () => {
    dispatch({ type: "SET_PARTICIPANTS", payload: parseParticipants(EXAMPLE) });
  };

  const clearAll = () => {
    dispatch({ type: "SET_PARTICIPANTS", payload: [] });
  };

  return (
    <section className="glass p-6">
      <header className="mb-5 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 ring-1 ring-white/10">
          <Users className="h-5 w-5 text-blue-300" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Step 1 · Enter participants
          </h2>
          <p className="text-xs text-white/50">
            One name per line. Duplicates are removed automatically.
          </p>
        </div>
      </header>

      <textarea
        ref={textareaRef}
        defaultValue={text}
        onChange={handleInput}
        placeholder={"Alice\nBob\nCharlie\n…"}
        rows={8}
        className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/40 p-4 font-mono text-sm text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
        aria-label="Participants list"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={loadExample}
            className="text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Load example
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearAll}
            disabled={count === 0}
            className="text-white/70 hover:bg-white/10 hover:text-white disabled:opacity-40"
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Clear all
          </Button>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
          <Users className="h-3.5 w-3.5 text-blue-300" />
          <span className="font-medium text-white">
            {count}
          </span>
          <span className="text-white/60">
            {count === 1 ? "participant" : "participants"}
          </span>
        </div>
      </div>
    </section>
  );
}