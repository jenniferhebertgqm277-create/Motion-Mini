# Token & Limit Saver — Rules for the AI

Goal: same (or better) quality, **far fewer tokens**. Apply these every time this skill is active.

## 1. Load lazily (input tokens)
- Read `SKILL.md` only. Open a `references/*.md` file **only when its row in the Router table matches the task**. Never load all references "just in case".
- Never re-read a file you already read in this conversation. Never paste a reference file back to the user.
- For video/3D work: copy `examples/3d-video-template.html` and edit **CONFIG** (≈60 lines). Do NOT regenerate the ENGINE (≈250 lines).

## 2. Plan small, build once (output tokens)
- Storyboard = a table of max 8 rows, one line each. No prose paragraphs about the plan.
- Generate the complete file **once**. Fix mistakes with targeted edits (`str_replace` / a diff), never by re-printing the whole file.
- Iteration turn = only the changed lines + one sentence. If the user says "make it slower", change one number, say which.

## 3. Talk less
- No preamble ("Sure! Here is…"), no recap of what the user asked, no closing summary of what the code does.
- Explanation budget: ≤ 5 lines after the code (tool choice + 1 timing/easing note).
- Variants: one line each ("v2: set `night` to `[[0,1]]` for full night"). Never output a second full file unless asked.
- Comments in code: only on non-obvious numbers. No banner comments, no ASCII art.

## 4. Ask less
- Ask **at most one** clarifying question, and only if the answer changes the stack or the runtime. Otherwise pick the defaults below and state them in one line.
- Defaults: 16:9 · 1280×720 · 30 fps · 10–15 s · Three.js · cinematic style · dusk palette · no audio.

## 5. Right-size the quality
| User says | Budget | Do |
|---|---|---|
| "quick / simple / cepat" | tiny | CSS or single-scene canvas, ≤ 80 lines, no storyboard table |
| (nothing special) | normal | Template + CONFIG edits, 3-row storyboard |
| "perfect / sempurna / cinematic" | full | Full pipeline, props edits, polish pass, export script |

## 6. Don't pay twice
- Don't add libraries you don't use. Prefer one CDN script.
- Prefer procedural geometry/textures (canvas, noise, seeded RNG) over base64 blobs — blobs cost thousands of tokens.
- Reuse CONFIG blocks the user already approved; only diff them.
- Long assets (SVG paths, big arrays) → generate with a tiny loop, not literals.

## 7. Stop conditions
- Don't run a "polish pass" nobody asked for. Run the Quality Gate checklist **mentally**, report only failures.
- If the request is ambiguous *and* cheap to redo, build the most likely interpretation and offer to adjust — that's cheaper than a question round-trip.

## Cheat card (paste into any chat as a system hint)
```
Be token-lean: no preamble/recap, max 1 question, build once then patch with diffs,
reuse the Motion-Mini template and edit only CONFIG, ≤5 lines of explanation,
variants as one-liners, never reprint unchanged code.
```
