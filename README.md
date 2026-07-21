# Lumenfold

Lumenfold is a learning scaffold presented as a personal knowledge management system. It brings source collection, AI-assisted study, durable knowledge storage, review, and connection into one workspace while keeping the learner in control of the process and making their work portable.

> Collect from the world. Internalize through active learning. Keep what becomes yours.

This repository begins as a time-limited hackathon prototype. Its first release tests one narrow but complete path through a much larger vision.

## Vision

Learning is more than collecting information, and a knowledge base is more than a place to keep notes. Lumenfold treats learning and skill acquisition as a cycle with two broad stages:

1. **Collection:** selecting information and experience from the environment, interpreting it, and translating it into personal knowledge.
2. **Internalization:** making that knowledge easier to retrieve in relevant contexts and connecting it with other knowledge so that it can support transfer, judgment, and new insight.

The stages feed each other. What a learner already knows shapes what they notice next; new material can reorganize old understanding and expose new questions.

Many tools support only part of this cycle. NotebookLM and Open Notebook are strong references for the collection side: they organize sources and help people question, summarize, transform, and test themselves against source material. Their center of gravity, however, is the source workspace rather than a permanent, interconnected home for the learner's distilled knowledge.

Obsidian approaches the cycle from the other direction. It provides a durable, human-readable system for writing, linking, reviewing, and connecting knowledge across subjects and over time. Its Markdown-first model is excellent for knowledge that has already been expressed as notes, but it does not treat a mixed-media reference library as a first-class learning environment.

Lumenfold is designed around the missing bridge. A learner should be able to keep original references, study them with appropriate scaffolds, turn selected ideas into personal knowledge, revisit that knowledge through active methods, and connect it across projects and domains without moving between incompatible systems.

These comparisons describe design influences, not affiliation, endorsement, or feature parity. Lumenfold is not an official integration of NotebookLM, Open Notebook, or Obsidian.

## Learning philosophy

Lumenfold starts from the premise that there is no single best learning workflow for every person, subject, and situation. It should help learners explore methods, see what those methods demand, and choose or adapt a scaffold that fits their goals.

The product favors active learning over the passive accumulation of attractive notes. Research reviews have found meaningful differences between common study techniques. Practice testing and distributed practice received high utility assessments in Dunlosky et al.'s review, while rereading and highlighting were rated lower; later reviews also support spacing and retrieval practice as robust ways to improve long-term learning.[^dunlosky][^carpenter] That does not make all note-taking useless. It means the value of a note depends on what the learner does while creating it and how the note supports later retrieval, explanation, application, or connection.

Lumenfold therefore aims to support several paths from a source rather than prescribing one ritual. Depending on the material and the learner's intent, that may include grounded questioning, self-explanation, retrieval prompts, spaced review, incremental reading, concept mapping, creation, or deliberate practice. AI can reduce setup friction and propose transformations, but the learner should decide what deserves attention and what becomes part of their knowledge.

Lumenfold's practical commitment is to preserve agency, make goals and methods negotiable, remove avoidable barriers, and support learning that is exploratory rather than merely compliant. It seeks a more human-centered and, where possible, non-hierarchical relationship between learner, teacher, tool, and knowledge. This direction is consistent with evidence that active learning can improve performance over traditional lecturing in undergraduate STEM courses, and with research connecting more autonomous forms of student motivation with persistence, well-being, and achievement.[^freeman][^howard] It is also compatible with self-determination theory's emphasis on autonomy, competence, and relatedness, and with Universal Design for Learning's focus on learner variability, choice, and multiple means of engagement.[^sdt][^udl]

## Who Lumenfold is for

Lumenfold is especially intended for lifelong learners, independent learners, and neurodivergent people who may benefit from flexible pacing, multiple representations, external scaffolds, and control over how they engage with material. It does not assume that neurodivergent learners form one homogeneous group or that a software tool can replace individualized support.

The same design can support school contexts. Lumenfold can give students more ownership of inquiry and give teachers adaptable scaffolds for source-based learning, reflection, retrieval, and connection. It is meant to assist humane teaching and experiments in educational reform, not to replace teachers or make universal claims against schooling.

## A portable vault

Adopting a learning system should not require surrendering years of work to an opaque proprietary format. The long-term Lumenfold vault is an ordinary local folder built from documented, broadly readable formats.

The intended vault can contain:

- local knowledge files in Markdown;
- raw references such as PDFs, EPUBs, images, audio, and video;
- saved web snapshots or lightweight link records;
- sidecar metadata in JSON or YAML where the original format cannot carry it;
- explicit links between sources, excerpts, prompts, learning activities, and notes.

The exported vault remains useful without Lumenfold. Users can back it up, place it under version control, or process it with scripts. Obsidian should be able to open the Markdown knowledge layer, and tools such as Open Notebook should be able to read compatible source files. Exact interoperability depends on each tool's supported formats; Lumenfold will document its layout rather than promise seamless compatibility with every feature of another product.

This portable, local-first direction makes migration straightforward and reduces adoption risk. The long-term product may add optional indexes, caches, databases, or synchronization for speed and convenience, but those should be rebuildable layers. The user's exported sources and knowledge files remain the durable representation.

A provisional exported layout is:

```text
Lumenfold Vault/
├── sources/          # Original references and web captures
├── notes/            # Portable Markdown knowledge files
├── learning/         # Reviews, prompts, and learning-state metadata
├── attachments/      # Images and other note attachments
└── .lumenfold/       # Rebuildable app metadata and indexes
```

### Hackathon storage model

The MVP runs entirely in the browser and represents this structure as a virtual vault in IndexedDB. The interface exposes folders, subfolders, sources, notes, and file operations without requesting access to the user's operating-system filesystem.

The MVP includes explicit **Export Vault** and **Import Vault** actions. Export produces a ZIP with the documented folder structure, original source blobs where available, Markdown notes, and JSON metadata. Import reconstructs the virtual vault from that archive. Browser storage is origin- and browser-profile-specific and may be removed if the user clears site data, so export is the portability and backup boundary for this prototype.

This is an implementation compromise for the hackathon, not a retreat from the open-vault philosophy. Direct folder access and optional synchronization can be evaluated after the core learning workflow is proven.

## Core workflow

The full product should support a continuing loop:

1. Capture or reference material without forcing it into Markdown.
2. Explore and question sources with traceable citations.
3. Choose a learning method appropriate to the goal.
4. Distill useful understanding into portable knowledge files.
5. Review, retrieve, apply, and connect that knowledge over time.
6. Let the resulting understanding guide the next round of collection.

The hackathon demonstrates the smallest credible version of that loop:

> Add a source, ask a grounded question, inspect the answer and citations, save the useful result as Markdown in the virtual vault, and export the vault in portable formats.

## Hackathon goal

Deliver a small product that can be demonstrated end to end in a short video:

1. Open the application in a browser.
2. Add or paste a source.
3. See the source inside a folder in the virtual vault.
4. Ask a question about the source.
5. Receive a grounded answer with source references.
6. Save the answer as a Markdown note.
7. Navigate the virtual vault and show its folders and files.
8. Refresh the page and reopen the saved note.
9. Export the vault as a portable archive.

The demo should make the product's identity obvious within the first minute: Lumenfold helps a person move from collected information to reusable understanding.

## Scope and constraints

Available implementation time: approximately one and a half days.

The project therefore follows these rules:

- Build one complete workflow before adding secondary features.
- Prefer boring, well-supported browser technologies.
- Avoid authentication, collaboration, complex permissions, payments, browser extensions, and production-scale infrastructure.
- Keep the data model small enough to understand and debug during the hackathon.
- Make AI provider access replaceable and provide a deterministic local fallback.
- Treat the recorded demo as a product requirement, not an afterthought.

## MVP boundary

### In scope

- A single-user browser workspace.
- A browser-side virtual vault with folders, subfolders, and files.
- A small source library containing pasted text or imported text/Markdown files.
- Source selection.
- A question-and-answer panel.
- AI answers grounded in the selected source.
- Lightweight citations using exact source excerpts.
- Saving an answer as a Markdown note in the virtual vault.
- A note list or simple connected workspace view.
- Persistent storage in IndexedDB.
- Vault export/import using a documented ZIP layout.
- A visible demo/mock mode that works without an external API.

### Out of scope for this submission

- User accounts and multi-user collaboration.
- Full web crawling, PDF OCR, EPUB extraction, YouTube ingestion, and automatic source discovery.
- Vector databases and sophisticated semantic search.
- Autonomous agents or background research.
- A complete graph database.
- Mobile-native applications.
- Production billing, analytics, and deployment automation.
- Perfect citation correctness across arbitrary documents.

These are possible future directions, not requirements for the hackathon proof of concept.

## Exact MVP tech stack

The MVP uses one TypeScript codebase deployed as a React single-page application plus a small Cloudflare Worker API.

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript | Fast component iteration, strong ecosystem, and shared types across UI and Worker |
| Build and local development | Vite + `@cloudflare/vite-plugin` | Fast HMR and local execution close to the production Workers runtime |
| Styling | Plain CSS with CSS custom properties | Full visual control without a component-library setup cost |
| Virtual vault | IndexedDB via Dexie.js | Structured records and source `Blob`s, transactions, schema migrations, and reactive React queries without raw IndexedDB boilerplate |
| Portable vault | JSZip | Import/export of a folder-shaped ZIP containing source files, Markdown, and JSON metadata |
| Optional PDF stretch | PDF.js, text-based PDFs only | Adds one common source type if the complete text/Markdown workflow is already stable |
| Runtime validation | Zod | Validates untrusted API and model output before it reaches the UI |
| Backend | Cloudflare Worker using the Web `fetch` API | Same deployment as the SPA, secret-holding `/api/ask`, and no separate server to operate |
| Unit/component tests | Vitest + React Testing Library | Native fit with Vite and quick tests for storage and UI behavior |
| End-to-end smoke test | Playwright, Chromium only | Verifies the recorded happy path in the same browser family used for the demo |
| Package manager | npm | Universally documented and sufficient for a single-package prototype |

Do not add Redux, a UI component framework, a router, Hono, a vector database, an ORM, or a cloud database unless a concrete MVP behavior requires one. React state plus Dexie live queries are enough for this slice.

### AI connection

Use a small provider adapter rather than coupling the UI directly to one vendor:

```text
Chat UI
  -> application AI interface
      -> real provider adapter through a Cloudflare Worker endpoint
      -> deterministic local demo adapter
```

The real provider path is a minimal `POST /api/ask` endpoint. It receives the selected source and question, calls one OpenAI-compatible Responses endpoint, and returns:

```ts
{
  answer: string;
  citations: Array<{
    sourceId: string;
    label: string;
    excerpt: string;
  }>;
}
```

Do not put an API key in browser JavaScript. `worker/index.ts` reads the provider URL, model, and API key from Cloudflare Worker configuration and secrets. Local development uses an ignored `.dev.vars` file; deployment uses `wrangler secret put AI_API_KEY`.

### Virtual-vault implementation

Use four small Dexie tables:

- `nodes`: folders and file metadata (`id`, `parentId`, `name`, `kind`, timestamps);
- `sources`: source metadata, extracted text, MIME type, and original `Blob`;
- `notes`: Markdown body and links to source IDs;
- `settings`: schema version and small UI preferences.

Folder paths are derived from `parentId`; do not duplicate the full path in every record. For the MVP, implement create folder, rename, move, delete, and breadcrumb navigation only if needed for the demo. Do not build a general desktop-style file manager.

Call `navigator.storage.persist()` after the learner creates the first vault and show whether persistent storage was granted. This reduces eviction risk but does not replace export. Never imply that browser storage is as durable as a normal local folder.

### Why a browser application

A browser-first application is the fastest route to a convincing demo:

- no installer or operating-system filesystem permissions;
- fast hot reload;
- easy screen recording;
- easy public access through a URL;
- runs comfortably on ordinary development hardware because model inference happens through a remote provider;
- lets the same build run locally and in production.

A desktop app, native mobile app, direct local-folder access, or GPU-heavy local model would add setup and compatibility failure modes without improving the core proof of concept.

## Hosting and deployment

### Primary target: Cloudflare Workers with static assets

Deploy the React SPA and `worker/index.ts` together using Cloudflare's official Vite plugin. The public build can use a free `*.workers.dev` URL; a custom domain can be attached later.

Cloudflare is the preferred host because:

- one deployment serves both static assets and `/api/ask`;
- static asset requests are free and unlimited under the current plan documentation;
- the Workers Free plan includes 100,000 Worker requests per day, which is ample for a hackathon demo;
- Worker secrets keep the model credential out of the repository and browser bundle;
- the edge runtime can call an OpenAI-compatible provider through standard `fetch`;
- the official Vite plugin makes local and deployed runtimes similar;
- deployment is one command: `npm run deploy`.

The external model provider may still incur usage costs. Cloudflare's free tier covers hosting and the proxy, not third-party inference.

Because the public endpoint spends the project owner's AI quota, use a dedicated provider key with the lowest practical budget or quota. Add strict request/body limits, a short timeout, and a small per-client request throttle before publishing. Keep deterministic demo mode available if the AI budget or provider fails. If the app remains public after judging, either add Cloudflare Turnstile and stronger rate limiting or disable real mode while leaving the rest of the application accessible. Turnstile is not required for the first recording.

### Why not the alternatives

- **GitHub Pages:** excellent for static documentation and a frontend-only demo, but it cannot securely hold the AI credential or run `/api/ask`. It would require a second backend and CORS configuration.
- **Vercel:** technically suitable and easy to deploy, but its Hobby plan is restricted to non-commercial personal use. Cloudflare is a cleaner default if this prototype may become a real product.
- **Netlify:** technically suitable, but its credit-based free plan adds another quota model to monitor without giving this MVP a clear advantage.

GitHub remains the source host. Cloudflare is the application host.

## AI strategy under severe time pressure

The hard part is not rendering an AI chat box. It is making the answer visibly grounded and keeping the demo reliable.

### Use two modes

#### Real mode

When the provider is configured, send the selected source text and question to the server-side adapter. Ask for a strict JSON response containing an answer and citations. Validate the response before displaying it.

For this prototype, source-grounded prompting can be simple:

```text
You answer questions only from the supplied source.
If the source does not contain enough information, say so.
Return JSON with `answer` and `citations`.
Each citation must quote a short exact excerpt from the source.

SOURCE:
{source}

QUESTION:
{question}
```

Do not attempt a full retrieval-augmented generation pipeline in the first day. For a small source, passing the selected text directly is enough to demonstrate the concept.

#### Demo mode

If the provider request fails, the user chooses demo mode, or the app is built without a key, return a deterministic answer based on the source text and question. The demo adapter should:

- identify a few matching sentences or keywords;
- return a clearly labelled simulated answer;
- include excerpts from the selected source;
- use the same response shape as the real adapter.

This is not a substitute for the real AI feature. It is a reliability layer that keeps the user interface, source workflow, citation display, and note-saving behavior demonstrable.

### Provider recommendation

Configure one OpenAI-compatible provider for the real path. Keep its base URL, model name, and credential in Worker configuration so the UI and public repository remain provider-neutral.

The first implementation should support one provider and one model only. A provider picker and fallback chain are not MVP requirements. If the configured endpoint is unavailable, switch to demo mode and continue recording the product workflow.

## Core data model

Keep the domain model small and mirror it in the Dexie schema:

```ts
type VaultNode = {
  id: string;
  parentId: string | null;
  name: string;
  kind: "folder" | "source" | "note";
  createdAt: string;
  updatedAt: string;
};

type Source = {
  id: string;
  nodeId: string;
  title: string;
  mimeType: string;
  content: string;
  original?: Blob;
  createdAt: string;
};

type Note = {
  id: string;
  nodeId: string;
  title: string;
  body: string;
  sourceIds: string[];
  createdAt: string;
};

type Answer = {
  question: string;
  answer: string;
  citations: Array<{
    sourceId: string;
    label: string;
    excerpt: string;
  }>;
  mode: "real" | "demo";
};
```

Persist nodes, sources, notes, and settings in IndexedDB. Keep the current question, selected source, and current answer as transient UI state.

## Interface outline

The first screen should be the usable workspace, not a marketing landing page.

### Left rail: Virtual vault

- Lumenfold wordmark.
- Folder tree and breadcrumb navigation.
- Add source and create-folder actions.
- Source and note files with selected state.

### Center: Source and question workspace

- Source title and readable source text.
- Question input.
- Ask button with loading and error states.
- Demo/real mode indicator.
- Answer area with citations.
- Save as note action.

### Right rail: Notes

- Saved note list.
- Note preview.
- Source references.
- Export/import vault actions.
- Empty state when no notes exist.

The layout can collapse into a single-column view for smaller screens, but desktop should be the primary demo viewport because it communicates the relationship between sources, understanding, and notes.

## One-and-a-half-day execution plan

### First 60 minutes: establish the slice

- Scaffold the Cloudflare React/Vite/TypeScript project.
- Add the three-column workspace layout.
- Add one hard-coded sample source.
- Add the basic vault/source/question/answer/note types.

**Checkpoint:** the browser shows the complete workflow, even before persistence or the real AI call exists.

### Hours 1-3: make the workflow real locally

- Add the Dexie schema and seed a virtual vault.
- Add folder navigation, folder creation, source import, and selection.
- Add the question form.
- Add deterministic demo-mode answers and exact source excerpts.
- Save generated Markdown notes in IndexedDB.

**Checkpoint:** the full learning loop persists through a browser refresh without a network connection.

### Hours 3-5: add the real AI path

- Add the provider adapter interface.
- Add the Cloudflare Worker `/api/ask` endpoint.
- Read provider URL and model from Worker configuration and the key from a Worker secret.
- Validate the returned JSON with Zod.
- Add input/output limits, a timeout, and failure handling.
- Fall back to demo mode when the request fails.

**Checkpoint:** one real question works, and a failed request does not destroy the demo.

### Hours 5-7: portability and product clarity

- Add ZIP export/import with Markdown notes, source files, and JSON metadata.
- Refine typography, spacing, colors, and source/answer/note hierarchy.
- Add loading, empty, error, and saved states.
- Make citations, vault location, and save actions obvious.
- Add a short sample source tailored to the final demo story.

**Checkpoint:** a first-time viewer can understand the workflow without narration and recover the vault outside browser storage.

### Hours 7-9: test and deploy a candidate

- Run unit tests and a clean production build.
- Test the full workflow from fresh browser storage.
- Test real mode, demo mode, and an unanswerable question.
- Export the vault, clear browser storage, and import it again.
- Deploy a candidate build to Cloudflare.
- Record a rough video and identify confusing moments.

### Final hours: stabilize, document, and record

- Fix only issues that affect the demo path.
- Remove unfinished controls and dead UI.
- Confirm no API keys are committed or sent to the browser.
- Confirm the Worker rejects oversized requests and handles provider timeouts.
- Update this README with final run and deployment instructions.
- Record and upload the final YouTube video.
- Capture the Codex session ID and repository state required by the hackathon.

## Todo checklist

### Must finish

- [ ] Scaffold React + TypeScript + Vite with the Cloudflare Vite plugin.
- [ ] Build the three-part vault, workspace, and notes layout.
- [ ] Add a sample source that can be used immediately.
- [ ] Create the Dexie schema and seed the virtual vault.
- [ ] Add folder/subfolder navigation and basic create/rename/delete actions.
- [ ] Add source import and selection.
- [ ] Add question submission.
- [ ] Implement deterministic demo mode.
- [ ] Display answer citations as exact source excerpts.
- [ ] Save answers as Markdown notes in the virtual vault.
- [ ] Persist nodes, sources, notes, and settings in IndexedDB.
- [ ] Add ZIP export/import for the portable vault.
- [ ] Add the Cloudflare Worker real AI endpoint.
- [ ] Keep API credentials out of client code and version control.
- [ ] Add Worker request limits, timeout handling, and basic abuse protection.
- [ ] Add real-mode failure fallback to demo mode.
- [ ] Add loading, empty, failure, and saved states.
- [ ] Run tests and a production build successfully.
- [ ] Deploy the public build to Cloudflare Workers.
- [ ] Test the clean demo path from start to finish.
- [ ] Record and upload the YouTube demonstration.
- [ ] Record the Codex session ID and final repository link or commit required by the hackathon.

### Only if the must-finish list is complete

- [ ] Add PDF.js extraction for text-based PDFs.
- [ ] Add a small source search/filter.
- [ ] Add note editing.
- [ ] Add a minimal relationship indicator between notes and sources.
- [ ] Add a shareable read-only demo state.
- [ ] Add a second provider configuration.

### Explicitly defer

- [ ] Authentication.
- [ ] Multi-user collaboration.
- [ ] Full web and YouTube ingestion.
- [ ] PDF OCR and complex-layout extraction.
- [ ] Embeddings and vector search.
- [ ] Background agents.
- [ ] Native mobile or desktop packaging.
- [ ] Direct operating-system folder access.
- [ ] Production database and synchronization infrastructure.

## Prototyping, testing, and iteration workflow

Use short loops with a working artifact at every checkpoint.

1. **Define one user-visible behavior.** Example: “A user can ask about the selected source and see two quoted citations.”
2. **Implement the smallest path.** Avoid abstractions until the behavior is visible.
3. **Exercise it immediately in the browser.** Check the actual loading, empty, error, and success states.
4. **Keep the demo mode working.** Never let external AI development block UI progress.
5. **Use one realistic source.** A concise article, project brief, or research excerpt is better than random placeholder text.
6. **Test the failure path deliberately.** Disable the API or use an invalid key and confirm the interface switches to demo mode.
7. **Record a rough walkthrough early.** Video exposes confusing interactions faster than code inspection.
8. **Remove anything that does not improve the final walkthrough.** A smaller finished product is stronger than a larger incomplete one.

### Acceptance test for the MVP

A fresh user must be able to complete this sequence without developer intervention:

- open the app;
- select the sample source;
- ask a question;
- see an answer and at least one citation;
- save the answer as a note;
- find the note in the virtual-vault tree;
- reopen the note after refreshing the page;
- export the vault as a ZIP containing readable Markdown;
- understand whether the answer came from real or demo mode.

## Video demonstration plan

Target a 2-4 minute screen recording at 1080p.

Suggested sequence:

1. Introduce Lumenfold in one sentence.
2. Show the source already available in the workspace.
3. Add or select a source.
4. Ask a concrete question.
5. Point out the grounded answer and citation excerpts.
6. Save the result as a Markdown note.
7. Navigate to the note in the virtual-vault tree.
8. Refresh the browser and reopen the note to show persistence.
9. Export the vault and briefly show the folder-shaped ZIP and readable Markdown file.
10. Briefly explain that the architecture supports a real provider and a deterministic demo fallback.
11. End with the public URL, repository, and hackathon-relevant implementation details.

Record the happy path with demo mode available as a safety net. Do not expose API keys, terminal secrets, or unrelated desktop notifications. Use the browser at a stable desktop resolution and close unrelated applications before recording.

This approach is suitable for modest development hardware because the application is browser-based and model inference occurs through the configured provider. Avoid local model inference, video processing during the demo, or GPU-dependent tooling unless there is already a tested setup.

## Describing related products

It is acceptable to mention related products when the comparison is accurate and clearly framed as inspiration, not affiliation. A suitable description is:

> Lumenfold is a portable, browser-first learning scaffold inspired by the source-grounded research workflow of NotebookLM and Open Notebook and the user-owned, durable knowledge workflow of Obsidian.

The phrase “combining the philosophies of NotebookLM and Obsidian” is understandable, but “inspired by” is more precise and avoids implying that Lumenfold is an official combination, integration, or endorsed product.

Do not claim feature parity. Describe what Lumenfold actually implements in the demo.

## Definition of done

The MVP is done when:

- the application starts with one documented command;
- the source-to-question-to-citation-to-note workflow works end to end;
- the workflow works in deterministic demo mode without external credentials;
- the real provider path works when configured;
- provider failures produce a recoverable fallback instead of a blank screen;
- saved notes persist in the browser-side virtual vault;
- notes can be reopened after a page refresh;
- the virtual vault exports to a documented archive containing readable Markdown and source files;
- an exported vault can be imported again;
- the repository contains no secrets;
- a clean build passes;
- the application is available at a public Cloudflare URL;
- the YouTube video demonstrates the real product behavior;
- the README explains the architecture, limitations, and next steps honestly.

## Future direction

After the hackathon, Lumenfold could grow toward:

- source ingestion from URLs, PDFs, and YouTube transcripts;
- chunking and retrieval for larger source libraries;
- stronger citation verification;
- direct local-folder access and optional synchronization;
- a visual knowledge graph;
- learner-selectable scaffolds such as retrieval prompts, spaced review, self-explanation, and project-based application;
- spaced review and resurfacing of old notes;
- user-controlled model and provider settings;
- collaboration and sharing.

Those features should be added only after the core transition from source to understanding to durable note is reliable.

## References

[^dunlosky]: Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). [Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology](https://doi.org/10.1177/1529100612453266). *Psychological Science in the Public Interest, 14*(1), 4-58.

[^carpenter]: Carpenter, S. K., Pan, S. C., & Butler, A. C. (2022). [The science of effective learning with spacing and retrieval practice](https://doi.org/10.1038/s44159-022-00089-1). *Nature Reviews Psychology, 1*, 496-511.

[^freeman]: Freeman, S., Eddy, S. L., McDonough, M., Smith, M. K., Okoroafor, N., Jordt, H., & Wenderoth, M. P. (2014). [Active learning increases student performance in science, engineering, and mathematics](https://doi.org/10.1073/pnas.1319030111). *Proceedings of the National Academy of Sciences, 111*(23), 8410-8415. This meta-analysis covered 225 studies in undergraduate STEM courses; its results should not be generalized to every subject or educational setting.

[^howard]: Howard, J. L., Bureau, J. S., Guay, F., Chong, J. X. Y., & Ryan, R. M. (2021). [Student Motivation and Associated Outcomes: A Meta-Analysis From Self-Determination Theory](https://doi.org/10.1177/1745691620966789). *Perspectives on Psychological Science, 16*(6), 1300-1323. The analysis included 344 samples and 223,209 participants.

[^sdt]: Ryan, R. M., & Deci, E. L. (2000). [Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being](https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf). *American Psychologist, 55*(1), 68-78.

[^udl]: CAST. [Universal Design for Learning Guidelines](https://udlguidelines.cast.org/). Accessed July 2026.
