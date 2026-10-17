# Remix — next milestone

- [x] Confirm planning alignment and notify the independent project monitor.
- [x] Implement Phase 7: exam queue, protected forward-only runner, timing and local history.
- [x] Verify exam rules with tests and complete a full part in the browser.
- [x] Record actual gates, hand off to the monitor and report remaining limits.
- [x] Phase 7 full fidelity: speaking prompt playback now precedes answer timing (audio-wait gate in the exam runner, honest no-audio escape).
- [x] Independent monitor verdict: "concluída" (high confidence) on the re-evaluation; all 5 recommendations addressed — roadmap mirror synced, retroactive stage-06 status written, SgdEngine onerror now ends the audio wait, mobile 390×844 check run.

## Fase 8 — Pack studie-plus (PRD §13)

- [ ] Pure modules `src/lib/plus/`: settings, words, glossary, sentences, phrases, plusAudio (field policy matrix).
- [ ] Components: PlusWordText, PlusPhraseCard, PlusSpeakButton (tap-only, portal bubble, 44px targets).
- [ ] /settings section "Studie Plus" with 3 independent toggles + decoupling copy.
- [ ] Engine integration via plusFieldPolicy (translation surfaces; audio last).
- [ ] Pipelines: scripts/plus/extract-words.mjs, extract-sentences.mjs, merge-glossary.mjs, merge-phrases.mjs.
- [ ] Data via subagent batches: glossary.json (≥95% candidates) · phrases/<tipo>.json (P1 100%, P2 ≥95%, hash h); register coverage.
- [ ] Tests: plus-settings, plus-words, plus-sentences, plus-phrases, plus-audio, plus-glossary, plus-integrity, plus-integration.
- [ ] Gates: vitest · tsgo · build · lint · Playwright 390×844 (bubble tap-only, closes on outside/✕/Esc) · pack off = zero regression.
