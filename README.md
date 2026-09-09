# Bali Zero — website (R19 preview, review copy)

Review snapshot of the redesigned Bali Zero public website (`apps/website`, Next.js 16 / React 19). Shared for design and code review. Not the production deployment; the preview is `noindex` by design.

## Layout

| Path | Content |
| --- | --- |
| `apps/website/` | The website app: `src/app` routes, `src/components`, `src/content`, `src/features`, `docs/design-system`, `docs/qa`, `proofs/`, tests |
| `apps/website/data/` | KBLI datasets read at runtime (`process.cwd()/data/*.json`) |
| `apps/mouth/src/lib/` | KBLI engine modules the website imports from the sibling app (vendored unchanged) |
| `apps/mouth/src/content/homepage-layout.json` | Editorial placement used by the homepage |
| `apps/mouth/src/content/articles/` | Authored editorial archive (MDX, English plus `.id/.it/.ru/.fr` translations) served by the journal and article routes |
| `apps/mouth/public/llms*.txt`, `sitemap-ai.xml` | Published LLM discovery files, copied verbatim for `discovery-files.test.ts` |
| `apps/bali-zero-magazine/lib/` | Magazine publication contracts and transport helpers the website imports (vendored unchanged) |
| `data/kbli-filiera/` | Editorial certification record imported by `kbli-editorial-certification.ts` |

## Run locally

```bash
cd apps/website
npm ci
npm run dev        # http://127.0.0.1:3000
npm run typecheck
npm test
```

Editorial articles and the journal index are served from the local MDX archive (`apps/mouth/src/content/articles`, included in this snapshot); the public `balizero.com` API is only the fallback for a slug that is not authored locally. `robots.txt` disallows everything unless `WEBSITE_PUBLIC_ORIGIN` is set; `sitemap.xml` lists the indexable routes at that origin (default `https://balizero.com`). Not included: the Visa Oracle engine contract corpus (`proofs/visa-oracle`) and the four unit tests that read it (`e4-tier-fence`, `engine-adapter`, `fact-mapper`, `walk-corpus-determinism`); those belong to the backend engine, not to the website.

## Review

Open an issue or a pull request on this repository. Keep review notes free of client data.

© Bali Zero. Shared for review; all rights reserved.
