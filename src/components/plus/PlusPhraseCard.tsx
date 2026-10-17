// Pack studie-plus — card de tradução por frase (PRD §13.1/§13.2).
// A linha em inglês expande SOMENTE por toque; 🔊 fica na linha da frase em
// inglês, fora da expansão, e fala o inglês original. Sem tradução carregada
// (ou origem mudada) → estado vazio honesto, nunca tradução errada.

import { useEffect, useState } from "react";

import { PlusSpeakButton } from "./PlusSpeakButton";
import { PlusWordText } from "./PlusWordText";
import { loadPhrases } from "@/lib/plus/data";
import { plusFieldPolicy, type PlusPhase } from "@/lib/plus/plusAudio";
import { lookupPhrase } from "@/lib/plus/phrases";
import { useAppState } from "@/lib/useAppState";
import type { TaskType } from "@/lib/pte/types";

export function PlusPhraseCard({
  sentence,
  index,
  type,
  field,
  phase,
  wordBubbles = true,
}: {
  sentence: string;
  index: number;
  type: TaskType;
  field: string;
  phase: PlusPhase;
  /** bolhas de palavra dentro da linha (toque na palavra tem prioridade) */
  wordBubbles?: boolean | undefined;
}) {
  const { settings } = useAppState();
  const policy = plusFieldPolicy(type, field, phase);
  const [expanded, setExpanded] = useState(false);
  const [lookup, setLookup] = useState<{ literal: string; contextual: string } | null | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!policy.phraseTranslation || !expanded) return;
    let cancelled = false;
    setLookup(undefined);
    loadPhrases(type).then((file) => {
      if (cancelled) return;
      setLookup(lookupPhrase(file, questionIdOf(type), field, index, sentence));
    });
    return () => {
      cancelled = true;
    };
  }, [policy.phraseTranslation, expanded, type, field, index, sentence]);

  // nenhum recurso de frase ativo → só as bolhas de palavra / texto simples
  if (!policy.phraseTranslation && !policy.phraseAudio) {
    return wordBubbles ? (
      <PlusWordText text={sentence} type={type} field={field} phase={phase} />
    ) : (
      <span>{sentence}</span>
    );
  }

  return (
    <span className="block">
      <span className="flex items-start justify-between gap-2">
        <button
          type="button"
          data-plus-phrase
          className="flex-1 rounded text-left underline decoration-dotted decoration-muted-foreground/60 underline-offset-4"
          aria-expanded={expanded}
          onClick={(event) => {
            event.stopPropagation();
            if (policy.phraseTranslation) setExpanded((v) => !v);
          }}
        >
          {wordBubbles ? (
            <PlusWordText text={sentence} type={type} field={field} phase={phase} />
          ) : (
            sentence
          )}
        </button>
        {policy.phraseAudio ? (
          <PlusSpeakButton text={sentence} label={`Pronunciar a frase em inglês`} />
        ) : null}
      </span>
      {expanded && policy.phraseTranslation ? (
        <span
          data-plus-phrase-card
          className="mt-1 block rounded-lg border border-border bg-muted/60 p-3 text-sm"
        >
          {lookup === undefined ? (
            <span className="text-xs text-muted-foreground">Carregando…</span>
          ) : lookup === null ? (
            <span className="text-xs text-muted-foreground">Tradução não disponível</span>
          ) : (
            <>
              <span className="block text-foreground">{lookup.literal}</span>
              {lookup.contextual ? (
                <span className="mt-1 block text-xs text-muted-foreground">{lookup.contextual}</span>
              ) : null}
            </>
          )}
        </span>
      ) : null}
    </span>
  );
}

// o qid vem da questão renderizada; o componente recebe via contexto para não
// duplicar props nos motores — implementado em PlusText, que injeta o qid aqui.
import { createContext, useContext } from "react";

const PlusQuestionContext = createContext<string | null>(null);

export function PlusQuestionProvider({
  qid,
  children,
}: {
  qid: string;
  children: React.ReactNode;
}) {
  return <PlusQuestionContext.Provider value={qid}>{children}</PlusQuestionContext.Provider>;
}

function questionIdOf(_type: TaskType): string {
  return useContext(PlusQuestionContext) ?? "";
}
