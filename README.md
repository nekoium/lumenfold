# Lumenfold

Lumenfold is a learning scaffold presented as a personal knowledge management system. It brings source collection, AI-assisted study, durable knowledge storage, review, and connection into one workspace while keeping the learner in control of the process and making their work portable.

> Collect from the world. Internalize through active learning. Keep what becomes yours.

## Run the alpha

The current alpha is a local Vite/React prototype with a deterministic assistant adapter. It does not require an API key.

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`. Use **Open demo** to enter the workspace, ask the seeded source a question, and approve a note or study-set instrument. The alpha keeps its small vault in browser `localStorage`; the documented Dexie, Worker, and external credential boundaries remain the next implementation layer.

This repository begins as a time-limited hackathon prototype. Its first release tests one narrow but complete path through a much larger vision.

## Setup and demo guide

### Requirements

- A recent Node.js LTS release
- npm
- A desktop Chromium-based browser for the intended demo walkthrough

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` and choose **Open demo**. The app does not need an API key: the deterministic assistant keeps the workflow reproducible offline.

The app includes a seeded retrieval-practice source in `src/App.tsx`, so no fixture download is required.

To use your own sample, open **Import file** and choose a UTF-8 `.md`, `.markdown`, or `.txt` file. You can also use **Add source** to paste text directly.

The recommended walkthrough is:

1. Open the seeded source or import a text file.
2. Ask a question in the assistant panel.
3. Inspect the answer and its exact source excerpts.
4. Approve a proposed Markdown note or study instrument.
5. Open **Notes** to edit the Markdown note and save it locally.

The virtual vault is stored in browser `localStorage`. To reset the demo, clear site data for `localhost:5173` in the browser and reload the page.

For a production check, run:

```bash
npm run build
npm run preview
```

The build runs TypeScript checking before creating the Vite output. Cloudflare Worker deployment files are included for the planned static deployment, but the local alpha does not depend on a Worker or external provider.

## Implementation and AI collaboration

### Key decisions

- **One complete slice:** source -> question -> citations -> approved note or instrument. This kept the demo understandable and reliable under the hackathon deadline.
- **Three durable domains:** `sources/`, `notes/`, and `instruments/` have distinct responsibilities without becoming isolated silos.
- **Approval before writing:** the assistant proposes Markdown changes; the learner previews and approves them before they become durable state.
- **Deterministic fallback:** the alpha uses a typed, source-grounded demo adapter so the core interaction works without network access or credentials.
- **Portable direction:** Markdown remains the intended durable format. Browser storage is only the current prototype persistence layer; provider secrets belong in a future server-side or local credential store.

### How GPT-5.6 helped

GPT-5.6 was used for product reasoning and design exploration. It helped clarify the continuous-learning workflow and compare the introduction and workspace surfaces.

It also helped shape the source/note/instrument model and define the assistant's proposal and approval boundary.

It also helped turn feedback into explicit decisions about the Nord-inspired themes, restrained product color, local-first direction, and the MVP's deadline scope.

### Where Codex accelerated the work

Codex worked directly in the repository as the implementation partner. It inspected the existing README and design context, then edited the React and TypeScript files.

It implemented the intro and workspace views, added source import and Markdown note editing, and kept `DESIGN.md` and this README aligned with the code.

Codex also ran the production build and diff checks after the final changes. This shortened the loop from feedback to working code and made it possible to ship a coherent alpha instead of a collection of disconnected screens.

The current division is intentional: GPT-5.6 helped decide what the product should mean and how its boundaries should work; Codex translated those decisions into tested repository changes.

## Demo deadline scope

With the deadline close, the acceptance target is one reliable desktop Chromium walkthrough on a normal PC. Cross-device layout compatibility, mobile validation, repeated visual regression passes, Dexie migration, ZIP round trips, and the real provider adapter are explicitly deferred; the deterministic assistant remains the demo fallback.

## Current urgent todos

The visual shell and deterministic demo path are in place. Text/Markdown source import and manual Markdown note creation and editing are also working in local browser state. The remaining two-hour path is:

1. **Freeze the slice:** verify once that source -> question -> citations -> approve note/study set works in demo mode.
2. **Ship the static app:** run the production build and deploy the current Vite output to the Cloudflare target.
3. **Optional provider boundary:** only if deployment is already stable, add the smallest `/api/ask` Worker proxy with endpoint URL, API key, and optional OpenAI-compatible format. Keep the key in the Worker secret store; never block the demo on this.
4. **Record the walkthrough:** capture the desktop happy path and document the deterministic-mode limitation honestly.

Everything else remains post-hackathon work. PDF extraction, broad ingestion, graph views, collaboration, native packaging, and cross-device polish are not deadline blockers.

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

- local notes in Markdown;
- raw references such as PDFs, EPUBs, images, audio, and video;
- saved web snapshots or lightweight link records;
- sidecar metadata in JSON or YAML where the original format cannot carry it;
- explicit links between sources, excerpts, notes, and instruments.

The exported vault remains useful without Lumenfold. Users can back it up, place it under version control, or process it with scripts. Obsidian should be able to open the Markdown notes layer, and tools such as Open Notebook should be able to read compatible source files. Exact interoperability depends on each tool's supported formats; Lumenfold will document its layout rather than promise seamless compatibility with every feature of another product.

This portable, local-first direction makes migration straightforward and reduces adoption risk. The long-term product may add optional indexes, caches, databases, or synchronization for speed and convenience, but those should be rebuildable layers. The user's exported sources, notes, and instruments remain the durable representation.

A high-level exported layout is:

```text
Lumenfold Vault/
├── sources/          # Original external references and captures
├── notes/            # Durable learner-authored Markdown
├── instruments/      # Practice, plans, reminders, calendars, and future tools
└── .lumenfold/       # Rebuildable app metadata, indexes, and caches
```

The top-level folders describe ownership and lifecycle, not every product feature. Users may create subfolders inside them, but Lumenfold does not impose `inbox/`, `library/`, `concepts/`, `projects/`, `srs/`, or `quizzes/` as permanent taxonomies. Binary files may live beside the source or note that owns them; a separate attachments root is deferred until the product has a concrete need for one.

### Hackathon storage model

The MVP runs entirely in the browser and represents this structure as a virtual vault in IndexedDB. The interface exposes folders, subfolders, sources, notes, instruments, and file operations without requesting access to the user's operating-system filesystem.

The MVP includes explicit **Export Vault** and **Import Vault** actions. Export produces a ZIP with the documented folder structure, original source blobs where available, Markdown notes, instrument definitions, and durable instrument state. Import reconstructs the virtual vault from that archive. Browser storage is origin- and browser-profile-specific and may be removed if the user clears site data, so export is the portability and backup boundary for this prototype.

This is an implementation compromise for the hackathon, not a retreat from the open-vault philosophy. Direct folder access and optional synchronization can be evaluated after the core learning workflow is proven.

## Core workflow

The full product should support a continuing loop:

1. Capture or reference material without forcing it into Markdown.
2. Explore and question sources with traceable citations.
3. Choose a learning method appropriate to the goal.
4. Distill useful understanding into portable notes.
5. Review, retrieve, apply, and connect those notes over time.
6. Let the resulting understanding guide the next round of collection.

The hackathon demonstrates one compact version of that loop:

> Add a source, ask a grounded question, approve a distilled Markdown note, generate learning activities, complete one review and quiz, then export the portable vault.

## Expected feature set

Lumenfold's feature map follows the collection/internalization cycle. The labels below distinguish what the hackathon must demonstrate from what can wait.

### Must demonstrate

| Area | Expected behavior | MVP implementation |
| --- | --- | --- |
| Virtual vault | Browse folders, subfolders, sources, notes, and instruments | IndexedDB/Dexie tree with create, rename, move, and delete actions |
| Source capture | Paste text and import `.txt` or `.md` files | Store the original text plus metadata under `sources/` |
| Source viewer | Read imported text and Markdown inside Lumenfold | Built-in text/Markdown preview |
| Grounded AI chat | Ask about the selected source or the small current vault and receive cited answers | Send selected extracted text to `/api/ask`; whole-vault mode concatenates a strictly capped set of text documents |
| AI note distillation | Ask AI to create a durable Markdown note from the conversation and sources | AI proposes a typed `create_note` operation with citations; the learner previews and confirms it |
| Markdown notes | Read generated notes, edit their Markdown, and link them back to sources | Plain Markdown content under `notes/` with source IDs in frontmatter |
| Study-set instrument | Generate a small deck and quiz from a source or note | AI proposes one study-set instrument; confirmed content becomes a readable Markdown instrument under `instruments/` |
| Instrument review | Review due cards, reveal answers, and grade recall | A minimal SM-2-style scheduler stores mutable state beside the study-set instrument |
| Quiz session | Answer questions and receive a score with explanations | Local UI evaluates answers; no second AI request is required |
| Persistence and portability | Refresh without data loss and move the vault out of the browser | IndexedDB persistence plus ZIP export/import |
| Reliable demo mode | Complete the workflow when the provider is unavailable | Deterministic sample answer, note, study-set instrument, and quiz content using the same schemas as real mode |

### Stretch features

- Import and extract text from ordinary text-based PDFs with PDF.js.
- Preview images, PDFs, audio, and video stored as browser `Blob`s.
- Import `.docx` with Mammoth and `.epub` with an EPUB parser.
- Add backlinks and simple `[[wikilink]]` navigation between Markdown notes.
- Add assistant source search and capture proposals.
- Let AI propose `update_note`, `update_instrument`, `rename_node`, and `move_node` operations.
- Let AI draft reusable skills and plugin configurations for learner approval.
- Add source search and a small note relationship view.

### Future features

- Web-page capture with sanitized snapshots and link metadata.
- OCR for scanned PDFs and images.
- Audio/video transcription, chaptering, and multimodal question answering.
- Retrieval and chunking for large vaults.
- Mature spaced-repetition algorithms, leech handling, statistics, and scheduling controls.
- A full Markdown editor, graph view, plugin system, synchronization, and direct local-folder access.

### Format support means several different things

Lumenfold should not claim that every stored file is immediately understandable by AI. Each format can have four separate capability levels:

1. **Store:** preserve the original file in the vault.
2. **Preview:** display or play it in the browser.
3. **Extract:** derive text or metadata from it.
4. **Study:** include the extracted representation in grounded chat, note generation, cards, and quizzes.

| Format | Store | Preview | Extract/study in the hackathon |
| --- | --- | --- | --- |
| Plain text / Markdown | Must | Must | Must |
| Text-based PDF | Stretch | Stretch | Stretch |
| Image | Stretch | Stretch | Future OCR/multimodal |
| Audio / video | Stretch | Stretch with native browser players | Future transcription/multimodal |
| Word `.docx` | Stretch | Extracted-text preview only | Stretch with Mammoth |
| EPUB | Stretch | Basic reader only if time remains | Stretch with an EPUB parser |
| Web page / URL | Save link as stretch | Open original link | Future capture service |

The recorded MVP should use text or Markdown. A text-based PDF may be included only after that path is stable.

## AI actions and learner control

The assistant should help the learner answer questions, summarize and explain material, organize and search the vault, capture sources, design quizzes and other instruments, and draft reusable skills or plugin configurations. It may propose modifications to durable files, but the model must not receive unrestricted database or filesystem access. The Worker returns normal assistant content plus a list of typed proposals:

```ts
type VaultProposal =
  | { type: "create_note"; path: string; markdown: string; sourceIds: string[] }
  | { type: "create_instrument"; path: string; instrument: InstrumentDraft; sourceIds: string[]; noteIds: string[] }
  | { type: "update_note"; id: string; markdown: string; expectedRevision: string }
  | { type: "update_instrument"; id: string; markdown: string; expectedRevision: string }
  | { type: "create_source"; path: string; content: string; mimeType: string; metadata: Record<string, string> }
  | { type: "rename_node"; id: string; name: string }
  | { type: "move_node"; id: string; parentId: string | null }
  | { type: "create_skill"; path: string; markdown: string; sourceIds: string[]; noteIds: string[] }
  | { type: "create_plugin_config"; path: string; markdown: string; instrumentType: string };

type InstrumentDraft = {
  type: "study_set" | "calendar" | "reminder" | "skill" | "plugin_config";
  title: string;
  markdown: string;
};
```

Lumenfold validates proposals with Zod, rejects unsafe or malformed paths, checks source and note references, shows a human-readable preview or diff, and writes only after the learner confirms. The MVP supports `create_note` and `create_instrument`; source capture, search-assisted organization, updates, moves, renames, reusable skills, and plugin configurations are follow-on assistant capabilities. The MVP should not let the model delete files or silently overwrite existing work. Destructive operations require a separate explicit confirmation and a revision check.

This design is easier to test than a free-form agent: each operation has a fixed schema, a predictable UI state, and a clear audit boundary.

`create_skill` and `create_plugin_config` remain distinct proposal operations because they have different review questions and ownership boundaries. Both produce declarative, human-readable instrument artifacts after approval; neither proposal may install executable code or grant unrestricted access. A future plugin system can consume an approved configuration without changing the proposal boundary.

## Vault structure

Use one portable Lumenfold vault with three connected top-level domains, rather than unrelated feature vaults:

```text
Lumenfold Vault/
├── sources/                    # Material that came from outside the learner
├── notes/                      # Durable learner-authored understanding
├── instruments/                # Tools and scaffolds that work on sources and notes
│   ├── study-set.md            # Cards and quiz questions in one portable instrument
│   └── study-set.state.json    # Mutable scheduling state for that instrument
└── .lumenfold/                 # Rebuildable indexes, schema version, and app cache
```

This separation keeps `notes/` clean enough to open as an Obsidian-style Markdown vault while allowing sources and instruments to remain first-class parts of Lumenfold. One root archive preserves links, export/import, and atomic backup better than separate independent vaults. A study set is one instrument rather than one file per card, which keeps the exported vault readable and avoids filesystem noise.

The boundaries are semantic:

- `sources/` contains what came from outside the learner;
- `notes/` contains what the learner has accepted or authored as durable understanding;
- `instruments/` contains portable tools and scaffolds such as study sets, reminders, calendars, plans, and future plugin-owned user data;
- `.lumenfold/` contains rebuildable implementation data and must never be the only copy of user-authored content.

All three domains are interconnected. Every durable artifact has a stable ID and explicit outbound links; managed rename and move operations update Markdown wikilinks and frontmatter references, while backlinks are derived from the graph. Instruments reference sources and notes instead of copying them. A study-set instrument keeps its prompts, answers, quiz questions, and source/note links together in Markdown; mutable review state sits beside it in documented JSON. Unapproved AI proposals remain transient.

## Hackathon goal

Deliver a small product that can be demonstrated end to end in a short video:

1. Open the application in a browser.
2. Add or paste a source.
3. See the source inside a folder in the virtual vault.
4. Ask a question about the source.
5. Receive a grounded answer with source references.
6. Approve an AI-proposed Markdown note.
7. Generate and approve a small SRS deck and quiz.
8. Review one card and complete the quiz.
9. Navigate the virtual vault and show the separate source, note, and instrument files.
10. Refresh the page and reopen the saved work.
11. Export the vault as a portable archive.

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
- Preview-and-confirm AI proposals for a Markdown note and a study-set instrument containing SRS cards and quiz questions.
- A Markdown note viewer and basic editor.
- A minimal SRS review session with four recall grades.
- A minimal multiple-choice quiz session with local scoring.
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

## Implementation difficulty and risk

| Capability | Difficulty for this MVP | Main risk | Proposed control |
| --- | --- | --- | --- |
| Text/Markdown import and viewing | Low | Encoding and duplicate names | UTF-8 first, generated IDs, visible filenames |
| Virtual folders and files | Medium | Recursive move/delete bugs | Parent-ID tree, transaction tests, confirmation before recursive delete |
| Markdown editing and rendering | Low-medium | Unsafe HTML and unsaved edits | Disable raw HTML, sanitize links, explicit save state |
| AI chat over one source | Medium | Invalid JSON, hallucinated citations, provider timeout | Zod validation, exact-excerpt verification, timeout, demo fallback |
| Chat over the whole vault | Medium-high | Prompt size and irrelevant context | Limit the MVP to a small text vault, show included files, cap characters; add retrieval later |
| AI-created notes/instruments | Medium | Malformed writes or unwanted changes | Typed proposals, path validation, preview, explicit confirmation, no overwrite/delete in MVP |
| SRS review | Low-medium | Scheduler edge cases | Small pure scheduling function with fixed clock tests; advertise it as a minimal scheduler |
| Quiz session | Low | Answer leakage or inconsistent schema | Generate once, store answer key separately in the object, score locally |
| ZIP export/import | Medium | Path traversal, schema mismatch, lost blobs | Sanitize archive paths, version the manifest, round-trip test a seeded vault |
| PDF text extraction | Medium-high | Scans, columns, tables, and huge files | Stretch only; support ordinary text PDFs and reject unsupported cases clearly |
| Word/EPUB extraction | Medium-high | Parser and format edge cases | Stretch only; one library per format and no layout-fidelity promise |
| Image understanding | High | OCR or multimodal API work | Store/preview only; defer understanding |
| Audio/video understanding | Very high | Upload size, codecs, transcription cost and latency | Native preview only; defer transcription and multimodal chat |
| Web capture | High | CORS, dynamic pages, sanitization, copyright and server-side fetching | Save a URL only as stretch; defer snapshots |

The breadth is still aggressive for one and a half days. If time slips, cut in this order: PDF support, advanced file operations, whole-vault chat, ZIP import, and note editing. Do not cut the visible collection-to-internalization loop: one text source, one grounded answer, one approved note, a few cards, one quiz, persistence, and ZIP export.

## Exact MVP tech stack

The MVP uses one TypeScript codebase deployed as a React single-page application plus a small Cloudflare Worker API.

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19 + TypeScript | Fast component iteration, strong ecosystem, and shared types across UI and Worker |
| Build and local development | Vite + `@cloudflare/vite-plugin` | Fast HMR and local execution close to the production Workers runtime |
| Styling | Plain CSS with CSS custom properties | Full visual control without a component-library setup cost |
| Virtual vault | IndexedDB via Dexie.js | Structured records and source `Blob`s, transactions, schema migrations, and reactive React queries without raw IndexedDB boilerplate |
| Portable vault | JSZip | Import/export of a folder-shaped ZIP containing source files, Markdown, and JSON metadata |
| Markdown | `react-markdown` + `remark-gfm` | Safe Markdown rendering with common GitHub-style syntax |
| Optional PDF stretch | PDF.js, text-based PDFs only | Adds one common source type if the complete text/Markdown workflow is already stable |
| Runtime validation | Zod | Validates untrusted API and model output before it reaches the UI |
| Backend | Cloudflare Worker using the Web `fetch` API | Same deployment as the SPA, secret-holding `/api/ask`, and no separate server to operate |
| Unit/component tests | Vitest + React Testing Library | Native fit with Vite and quick tests for storage and UI behavior |
| End-to-end smoke test | Playwright, Chromium only | Verifies the recorded happy path in the same browser family used for the demo |
| Package manager | npm | Universally documented and sufficient for a single-package prototype |

Do not add Redux, a UI component framework, a router, Hono, a vector database, an ORM, or a cloud database unless a concrete MVP behavior requires one. React state plus Dexie live queries are enough for this slice.

### AI connection

Use one provider adapter and one structured response contract rather than coupling the UI directly to a vendor:

```text
Chat UI
  -> POST /api/ask
      -> real OpenAI-compatible provider
      -> deterministic demo adapter
  <- answer + citations + typed vault proposals
```

The endpoint receives the selected source or a strictly capped set of extracted vault documents, the recent conversation, and the requested action. It returns:

```ts
{
  answer: string;
  citations: Array<{
    sourceId: string;
    label: string;
    excerpt: string;
  }>;
  proposals: VaultProposal[];
}
```

Use the same call and schema for note and study-set instrument generation. Cards and quiz questions are fields inside a study-set instrument, not separate vault operations. Do not build separate agent services. The client validates citations against the submitted source text and validates every proposal before showing it for approval.

Do not put an API key in browser JavaScript. `worker/index.ts` reads the endpoint, deployment-owned model default, and API key from Cloudflare Worker configuration and secrets. Local development uses an ignored `.dev.vars` file; deployment uses `wrangler secret put AI_API_KEY`. Model selection is not a learner-facing connection field for the MVP.

### Virtual-vault implementation

Use six small Dexie tables:

- `nodes`: folders and file metadata (`id`, `parentId`, `name`, `kind`, timestamps);
- `sources`: source metadata, extracted text, MIME type, and original `Blob`;
- `notes`: durable Markdown notes and links to source IDs;
- `instruments`: portable instrument definitions, including study sets, cards, quiz questions, reminders, and calendars;
- `reviews`: mutable review schedules and history for instrument activities;
- `settings`: schema version and small UI preferences.

The normalized tables make review queries and instrument rendering easy; ZIP export translates them into the documented Markdown/JSON vault layout. IndexedDB is an implementation index, not the public interchange format.

Folder paths are derived from `parentId`; do not duplicate the full path in every record. Implement create folder, rename, move, delete, and breadcrumb navigation only where the demo uses them. Do not build a general desktop-style file manager.

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

If the provider request fails, the user chooses demo mode, or the app is built without a key, return a deterministic answer and typed note/instrument proposals based on the source text and question. The demo adapter should:

- identify a few matching sentences or keywords;
- return a clearly labelled simulated answer;
- include excerpts from the selected source;
- propose a deterministic note or study-set instrument using the same `VaultProposal` schema as real mode;
- use the same response shape as the real adapter.

This is not a substitute for the real AI feature. It is a reliability layer that keeps the user interface, source workflow, citation display, and note-saving behavior demonstrable.

### Provider recommendation

Configure one OpenAI-compatible provider for the real path. Keep its endpoint, deployment-owned model default, and credential in Worker configuration so the UI and public repository remain provider-neutral. The learner-facing connection only needs an endpoint URL, an optional format (OpenAI-compatible by default), and a reference to an externally held credential.

The first implementation should support one provider and one model only. A provider picker and fallback chain are not MVP requirements. If the configured endpoint is unavailable, switch to demo mode and continue recording the product workflow.

### AI connection scope and credential boundary

The connection contract is intentionally small:

```ts
type AIConnectionSettings = {
  endpointUrl: string;
  format?: "openai_compatible" | "custom";
  apiKeyRef?: string;
};
```

The default format is OpenAI-compatible. The endpoint URL and format may be selected by the user or deployment operator; the raw API key is never stored in IndexedDB, exported into the vault, or committed to the repository. `apiKeyRef` identifies a secret held outside the vault.

For the hosted MVP, the Cloudflare Worker owns the provider secret through Worker configuration, while the browser receives only the assistant response. For the future locally installed application, the secret should live in the operating system keychain or an external local credential broker. Browser-side encryption alone is not a sufficient boundary: if the browser can decrypt the key, the application runtime can access it too.

Lumenfold should not silently discover, rotate, or export provider credentials. A user may configure a connection, test it, and revoke it, but credential storage remains the responsibility of the deployment or local secret store.

## Core data model

Keep the domain model small and mirror it in the Dexie schema:

```ts
type VaultNode = {
  id: string;
  parentId: string | null;
  name: string;
  kind: "folder" | "source" | "note" | "instrument";
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

type Instrument = {
  id: string;
  nodeId: string;
  type: "study_set" | "calendar" | "reminder" | "skill" | "plugin_config" | "plugin_data";
  title: string;
  body: string;
  sourceIds: string[];
  noteIds: string[];
  createdAt: string;
  updatedAt: string;
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

type ReviewState = {
  instrumentId: string;
  cardId: string;
  dueAt: string;
  intervalDays: number;
  ease: number;
  repetitions: number;
};

```

Persist nodes, sources, notes, instruments, reviews, and settings in IndexedDB. Keep the current question, selected source, current answer, and quiz session as transient UI state.

## Interface outline

The first screen should be the usable workspace, not a marketing landing page.

### Left rail: Virtual vault

- Lumenfold wordmark.
- Folder tree and breadcrumb navigation.
- Add source and create-folder actions.
- Source, note, and instrument files with selected state.

### Center: Source and question workspace

- Source title and readable source text.
- Question input.
- Ask button with loading and error states.
- Demo/real mode indicator.
- Answer area with citations.
- Preview and confirm a proposed note and study-set instrument.

### Right rail: Notes and instruments

- Saved note list.
- Relevant instrument list.
- Note preview.
- Source references.
- Export/import vault actions.
- Empty state when no notes exist.

### Instrument mode

- Due-card count and one-card review view.
- Reveal-answer action and four recall grades: Again, Hard, Good, Easy.
- Multiple-choice quiz view with local scoring and explanations.

The layout can collapse into a single-column view for smaller screens, but desktop should be the primary demo viewport because it communicates the relationship between sources, notes, and instruments.

## One-and-a-half-day execution plan

### First 60 minutes: establish the slice

- Scaffold the Cloudflare React/Vite/TypeScript project.
- Add the workspace shell with vault, study, notes, and instrument views.
- Seed one sample source, note, study-set instrument, and quiz content.
- Define and validate the shared data and proposal schemas.

**Checkpoint:** every part of the final walkthrough is visible with seeded data.

### Hours 1-3: virtual vault and Markdown notes

- Add the six-table Dexie schema.
- Seed `sources/`, `notes/`, and `instruments/` roots.
- Add folder navigation, folder creation, source import, and selection.
- Add text/Markdown preview and a basic Markdown note editor.
- Persist everything through refresh.

**Checkpoint:** source and note files can be created, viewed, edited, and reopened without the network.

### Hours 3-5: AI chat and controlled writing

- Add the provider adapter and Cloudflare Worker `/api/ask` endpoint.
- Return cited answers and typed note/instrument proposals in one response schema.
- Validate output with Zod and verify quoted citations against submitted text.
- Add proposal preview, confirm, and cancel states.
- Add input/output limits, timeout handling, and deterministic fallback.

**Checkpoint:** chat can answer from one source and create approved vault artifacts without unrestricted write access.

### Hours 5-7: internalization loop

- Add one-card SRS review with Again, Hard, Good, and Easy ratings.
- Add a small SM-2-style scheduling function and review-state persistence.
- Add multiple-choice quiz rendering and local scoring.
- Export/import sources, Markdown notes, instrument Markdown, and review-state JSON with JSZip.

**Checkpoint:** a learner can distill, review, test, refresh, export, and import one coherent learning unit.

### Hours 7-9: presentation, tests, and candidate deployment

- Refine typography, hierarchy, loading, empty, error, approval, and saved states.
- Run focused tests for proposal validation, SRS scheduling, quiz scoring, and ZIP round-trip.
- Run a clean production build and Chromium happy-path smoke test.
- Deploy a candidate build to Cloudflare.
- Record a rough video and remove confusing or unfinished interactions.

### Final hours: stabilize and record

- Fix only issues that affect the recorded path.
- Confirm no API keys are committed or sent to the browser.
- Confirm the Worker rejects oversized requests and handles provider timeouts.
- Verify the exported ZIP contains readable, correctly separated files.
- Update run and deployment instructions.
- Record and upload the final YouTube video.
- Capture the Codex session ID and final repository state.

## Todo checklist

### Must finish

- [ ] Scaffold React + TypeScript + Vite with the Cloudflare Vite plugin.
- [x] Build the vault, study, notes, and instruments views.
- [ ] Define Zod schemas for AI answers, citations, note proposals, and instrument proposals.
- [ ] Create the six-table Dexie schema and seed `sources/`, `notes/`, and `instruments/`.
- [ ] Add folder/subfolder navigation and the create, rename, move, and delete actions used in the demo.
- [x] Add pasted-text and `.txt`/`.md` source import.
- [x] Add source preview and a basic Markdown note editor/renderer.
- [ ] Add selected-source and capped whole-vault AI chat.
- [ ] Display grounded answers with exact source excerpts.
- [x] Add preview, confirm, and cancel for AI-proposed notes and instruments.
- [ ] Persist nodes, sources, notes, instruments, reviews, and settings in IndexedDB.
- [ ] Add one-card SRS review with a minimal SM-2-style scheduler.
- [x] Add a local quick-check with scoring and explanation.
- [ ] Add ZIP export/import with separate `sources/`, `notes/`, and `instruments/` content.
- [x] Implement deterministic demo answers and proposals with the shared response shape.
- [ ] Add the Cloudflare Worker `/api/ask` endpoint.
- [ ] Keep API credentials out of client code and version control.
- [ ] Add request limits, timeout handling, basic abuse protection, and provider-failure fallback.
- [ ] Test proposal validation, scheduling, quiz scoring, persistence, and ZIP round-trip.
- [x] Run a production build and Chromium smoke test.
- [ ] Deploy the public build to Cloudflare Workers.
- [ ] Record and upload the YouTube demonstration.
- [ ] Record the Codex session ID and final repository link or commit required by the hackathon.

### Only if the must-finish list is complete

- [ ] Add PDF.js extraction for text-based PDFs.
- [ ] Add a small source search/filter.
- [x] Add note editing.
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
- preview and approve a Markdown note;
- generate and approve a study-set instrument;
- review one card and grade recall;
- complete the quiz and see a score;
- find the source, note, and study-set instrument in their separate virtual-vault domains;
- reopen them after refreshing the page;
- export the vault as a ZIP containing readable Markdown and documented JSON state;
- understand whether the answer came from real or demo mode.

## Video demonstration plan

Target a 2-4 minute screen recording at 1080p.

Suggested sequence:

1. Introduce Lumenfold in one sentence.
2. Show the source already available in the workspace.
3. Add or select a source.
4. Ask a concrete question.
5. Point out the grounded answer and citation excerpts.
6. Preview and approve the proposed Markdown note.
7. Generate and approve a study-set instrument containing a few SRS cards and a short quiz.
8. Review one card and answer the quiz.
9. Show `sources/`, `notes/`, and `instruments/` in the virtual-vault tree.
10. Refresh the browser and reopen the saved work.
11. Export the vault and briefly show its readable Markdown and JSON files.
12. Briefly explain the real provider and deterministic demo fallback.
13. End with the public URL, repository, and hackathon-relevant implementation details.

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
- the source-to-question-to-citation-to-approved-note workflow works end to end;
- AI-generated study-set instruments can be previewed, approved, and stored as portable files;
- one SRS review and one quiz session work without another AI call;
- the workflow works in deterministic demo mode without external credentials;
- the real provider path works when configured;
- provider failures produce a recoverable fallback instead of a blank screen;
- source, note, and instrument content remain separate in the virtual vault;
- saved work can be reopened after a page refresh;
- the virtual vault exports to a documented archive containing readable Markdown, source files, and review-state JSON;
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
