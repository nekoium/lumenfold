import { FormEvent, ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  FileText,
  FileUp,
  Folder,
  FolderOpen,
  Gauge,
  Layers3,
  Lightbulb,
  Link2,
  ListChecks,
  Menu,
  Moon,
  Plus,
  Pencil,
  Save,
  Search,
  Settings2,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import type {
  AssistantResponse,
  Note,
  Page,
  PersistedState,
  ProposalKind,
  Source,
  StudySet,
  Theme,
  WorkspaceView,
} from "./types";

const STORAGE_KEY = "lumenfold-alpha-state";

const seedSource: Source = {
  id: "source-retrieval-practice",
  title: "The practice of retrieval",
  path: "sources/the-practice-of-retrieval.md",
  kind: "article",
  createdAt: "2026-07-22T00:00:00.000Z",
  body: "Retrieval is the act of bringing knowledge to mind without looking at the answer first. It feels harder than rereading because it asks memory to do visible work, but that effort is part of why the practice strengthens later recall.\n\nA useful learning loop alternates between input and retrieval. After meeting an idea, close the source and explain it in your own words. Check the gaps, then try again later. Spacing those attempts across time makes the knowledge easier to use outside the original study session.\n\nThe best prompt is specific enough to invite an answer and open enough to reveal what you actually understand. A small question such as \"Why does this matter?\" can turn a passive paragraph into a decision, example, or connection.",
};

const initialState: PersistedState = {
  theme: "dark",
  sources: [seedSource],
  notes: [],
  studySets: [],
};

function readPersistedState(): PersistedState {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialState;
    const parsed = JSON.parse(saved) as Partial<PersistedState>;
    return {
      theme: parsed.theme === "light" ? "light" : "dark",
      sources: parsed.sources?.length ? parsed.sources : initialState.sources,
      notes: parsed.notes ?? [],
      studySets: parsed.studySets ?? [],
    };
  } catch {
    return initialState;
  }
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function readableDate(date: string): string {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(
    new Date(date),
  );
}

function getAssistantResponse(
  source: Source,
  question: string,
  proposalKind: ProposalKind,
): AssistantResponse {
  const normalized = question.trim().replace(/[?.!]+$/, "");
  const title = proposalKind === "note" ? "Retrieval as visible practice" : "Retrieval practice set";
  const noteBody = `# Retrieval as visible practice\n\nRetrieval strengthens understanding because it asks memory to produce an answer before the source supplies one. The difficulty is useful: it reveals the gap between recognition and recall.\n\nA practical loop is to read a small section, close the source, explain the idea in your own words, check the gaps, and try again later. Spacing those attempts makes the idea easier to retrieve in a new context.\n\n## A question to carry forward\n\n${normalized || "What would I be able to explain without looking?"}\n\n_Source: [[${source.id}]]_`;
  const instrumentBody = `# Retrieval practice set\n\nA small set for revisiting the ideas in [[${source.id}]].\n\n- Explain retrieval in one sentence before checking the source.\n- Describe why a little difficulty can improve later recall.\n- Choose one idea to apply in a different context.`;

  return {
    answer:
      proposalKind === "note"
        ? "Retrieval is useful because it makes understanding observable. Instead of only recognizing a familiar paragraph, you try to produce the idea first, notice the gap, and then repair it. Repeating that loop with time between attempts turns a study session into a durable path."
        : "A good first study set should stay small and ask for production, not recognition. These prompts move from definition to explanation to transfer, so the learner can see both what is remembered and where the idea travels.",
    citations: [
      {
        sourceId: source.id,
        label: "Retrieval does visible work",
        excerpt: "It feels harder than rereading because it asks memory to do visible work, but that effort is part of why the practice strengthens later recall.",
      },
      {
        sourceId: source.id,
        label: "A repeatable loop",
        excerpt: "Close the source and explain it in your own words. Check the gaps, then try again later.",
      },
    ],
    proposal: {
      kind: proposalKind,
      title,
      body: proposalKind === "note" ? noteBody : instrumentBody,
    },
  };
}

function IconButton({
  label,
  children,
  onClick,
  active = false,
  disabled = false,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`icon-button${active ? " is-active" : ""}`}
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function IntroPage({ theme, onOpenDemo, onToggleTheme }: { theme: Theme; onOpenDemo: () => void; onToggleTheme: () => void }) {
  return (
    <main className="intro-page">
      <header className="intro-nav page-frame">
        <button className="brand-lockup" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <BrandMark />
          <span>Lumenfold</span>
        </button>
        <nav className="intro-actions" aria-label="Introduction">
          <button className="text-button" type="button" onClick={() => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })}>
            Philosophy <ArrowRight size={15} />
          </button>
          <button className="primary-button small" type="button" onClick={onOpenDemo}>
            Open demo <ArrowUpRight size={15} />
          </button>
          <IconButton label={theme === "dark" ? "Use light theme" : "Use dark theme"} onClick={onToggleTheme}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </IconButton>
        </nav>
      </header>

      <section className="intro-hero page-frame">
        <div className="hero-copy">
          <p className="eyebrow">A quiet instrument for continuing learning</p>
          <h1>Keep what becomes yours.</h1>
          <p className="hero-lede">
            Lumenfold helps you move from scattered sources to understanding you can retrieve,
            connect, and carry forward.
          </p>
          <div className="hero-buttons">
            <button className="primary-button" type="button" onClick={onOpenDemo}>
              Open the working demo <ArrowUpRight size={17} />
            </button>
            <button className="quiet-button" type="button" onClick={() => document.getElementById("philosophy")?.scrollIntoView({ behavior: "smooth" })}>
              See the idea <ArrowRight size={16} />
            </button>
          </div>
          <p className="hero-caption">Collect. Distill. Revisit. Connect.</p>
        </div>

        <div className="hero-workspace" aria-label="Preview of the Lumenfold workspace">
          <div className="preview-topline">
            <span className="preview-dots"><i /><i /><i /></span>
            <span>lumenfold / demo</span>
            <span className="preview-status"><span className="status-dot" /> demo mode</span>
          </div>
          <div className="preview-body">
            <aside className="preview-rail">
              <div className="preview-brand"><BrandMark /><span>Vault</span></div>
              <div className="preview-nav-item active"><BookOpen size={12} /> Study desk</div>
              <div className="preview-nav-item"><FileText size={12} /> Notes</div>
              <div className="preview-nav-item"><Layers3 size={12} /> Instruments</div>
              <div className="preview-tree-line"><span /> source</div>
              <div className="preview-tree-line"><span /> notes</div>
              <div className="preview-tree-line"><span /> instruments</div>
            </aside>
            <div className="preview-content">
              <div className="preview-breadcrumb">Sources <ChevronRight size={12} /> The practice of retrieval</div>
              <h2>The practice of retrieval</h2>
              <p className="preview-subtitle">A source becomes useful when it changes what you can do without it.</p>
              <p>Retrieval asks memory to bring an idea forward before the answer is visible.</p>
              <p>That small effort reveals the gap and gives the next review a purpose.</p>
              <div className="preview-assistant">
                <div className="preview-assistant-heading"><Bot size={13} /> Assistant <span>2 citations</span></div>
                <strong>What should I remember here?</strong>
                <div className="preview-citation"><span /> It asks memory to do visible work.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-philosophy page-frame" id="philosophy">
        <div className="section-heading">
          <p className="eyebrow">The point is not more information</p>
          <h2>Learning compounds when the path stays visible.</h2>
        </div>
        <div className="philosophy-copy">
          <p>
            Sources are where you meet the world. Notes are what you can now explain as your own.
            Instruments give that understanding somewhere to go: a question, a review, a plan, a
            practice set.
          </p>
          <p>
            The assistant can reduce the friction between those moments. It can suggest, sort, and
            prepare. You decide what deserves to stay.
          </p>
        </div>
        <div className="philosophy-essays">
          <article className="philosophy-row">
            <div className="philosophy-index">01 / Collection</div>
            <div>
              <h3>Begin with the world as it is.</h3>
              <p>
                Learning starts with material that has a place and a history: an article, a
                conversation, a question, a problem you are trying to solve. Lumenfold keeps the
                source close instead of flattening it into a detached answer.
              </p>
              <p>
                A source is not a task to clear. It is a relationship to return to, with context
                intact when the next question arrives.
              </p>
            </div>
          </article>
          <article className="philosophy-row">
            <div className="philosophy-index">02 / Internalization</div>
            <div>
              <h3>Understanding is what you can bring back.</h3>
              <p>
                Notes are not a second inbox. They are the explanations, distinctions, examples,
                and questions that have become yours. Distilling a source asks what it means in
                your language and what it changes in the way you see a subject.
              </p>
              <p>
                Review and retrieval make that understanding available away from the original
                page, when it can actually guide a decision or a new piece of work.
              </p>
            </div>
          </article>
          <article className="philosophy-row">
            <div className="philosophy-index">03 / Continuity</div>
            <div>
              <h3>Every answer can become a better next question.</h3>
              <p>
                Lumenfold treats learning as a continuing loop: collect and organize, distill and
                understand, revisit and connect, then plan what deserves attention next. The loop
                is allowed to change shape as your interests and projects change.
              </p>
              <p>
                Instruments give the loop somewhere to go: a prompt, a study set, a review, or a
                small experiment that turns an idea into practice.
              </p>
            </div>
          </article>
          <article className="philosophy-row">
            <div className="philosophy-index">04 / Agency</div>
            <div>
              <h3>Let assistance reduce friction, not authorship.</h3>
              <p>
                The assistant can search, summarize, sort, capture references, design questions,
                and prepare reusable instruments. It can make the next step easier to see without
                deciding what should become part of your durable understanding.
              </p>
              <p>
                Every lasting change is proposed with its source and preview. You approve what
                stays, and the vault remains readable, portable, and yours.
              </p>
            </div>
          </article>
        </div>
        <div className="learning-sequence" aria-label="Lumenfold learning sequence">
          <div className="sequence-step"><span>01</span><strong>Collect</strong><p>Keep the original source and its context.</p></div>
          <div className="sequence-step"><span>02</span><strong>Distill</strong><p>Turn useful material into an explanation.</p></div>
          <div className="sequence-step"><span>03</span><strong>Revisit</strong><p>Ask memory to bring it back later.</p></div>
          <div className="sequence-step"><span>04</span><strong>Connect</strong><p>Let a new idea change what comes next.</p></div>
        </div>
      </section>

      <footer className="intro-footer page-frame">
        <div><BrandMark /><span>Lumenfold</span></div>
        <p>A portable place for understanding in progress.</p>
        <button className="text-button" type="button" onClick={onOpenDemo}>Open the demo <ArrowUpRight size={15} /></button>
      </footer>
    </main>
  );
}

function WorkspacePage({
  state,
  setState,
  view,
  setView,
  selectedSourceId,
  setSelectedSourceId,
  selectedNoteId,
  setSelectedNoteId,
  selectedSetId,
  setSelectedSetId,
  onBack,
}: {
  state: PersistedState;
  setState: React.Dispatch<React.SetStateAction<PersistedState>>;
  view: WorkspaceView;
  setView: (view: WorkspaceView) => void;
  selectedSourceId: string;
  setSelectedSourceId: (id: string) => void;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  selectedSetId: string | null;
  setSelectedSetId: (id: string | null) => void;
  onBack: () => void;
}) {
  const [question, setQuestion] = useState("");
  const [proposalKind, setProposalKind] = useState<ProposalKind>("note");
  const [response, setResponse] = useState<AssistantResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [showAddSource, setShowAddSource] = useState(false);
  const [newSourceTitle, setNewSourceTitle] = useState("");
  const [newSourceBody, setNewSourceBody] = useState("");
  const importSourceRef = useRef<HTMLInputElement>(null);

  const selectedSource = useMemo(
    () => state.sources.find((source) => source.id === selectedSourceId) ?? state.sources[0],
    [selectedSourceId, state.sources],
  );
  const selectedNote = state.notes.find((note) => note.id === selectedNoteId);
  const selectedSet = state.studySets.find((studySet) => studySet.id === selectedSetId);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 3600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function chooseSource(id: string) {
    setSelectedSourceId(id);
    setView("source");
    setResponse(null);
  }

  function askAssistant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSource || !question.trim() || isThinking) return;
    setIsThinking(true);
    window.setTimeout(() => {
      setResponse(getAssistantResponse(selectedSource, question, proposalKind));
      setIsThinking(false);
    }, 420);
  }

  function approveProposal() {
    if (!response || !selectedSource) return;
    if (response.proposal.kind === "note") {
      const note: Note = {
        id: makeId("note"),
        title: response.proposal.title,
        body: response.proposal.body,
        sourceIds: [selectedSource.id],
        createdAt: new Date().toISOString(),
      };
      setState((current) => ({ ...current, notes: [note, ...current.notes] }));
      setSelectedNoteId(note.id);
      setView("notes");
      setNotice("Note approved and added to your vault.");
    } else {
      const studySet: StudySet = {
        id: makeId("instrument"),
        title: response.proposal.title,
        sourceIds: [selectedSource.id],
        cards: [
          { prompt: "What does retrieval ask memory to do?", answer: "Bring an idea forward before the answer is visible." },
          { prompt: "Why can a little difficulty be useful?", answer: "It reveals the gap between recognition and recall." },
          { prompt: "What makes a review practice durable?", answer: "Returning to the idea with time between attempts." },
        ],
        questions: [
          {
            prompt: "Which action best describes retrieval practice?",
            options: ["Rereading the paragraph twice", "Producing an answer before checking", "Highlighting every key phrase"],
            answer: 1,
          },
        ],
        createdAt: new Date().toISOString(),
      };
      setState((current) => ({ ...current, studySets: [studySet, ...current.studySets] }));
      setSelectedSetId(studySet.id);
      setView("instruments");
      setNotice("Study set approved and added to your instruments.");
    }
    setResponse(null);
  }

  function addSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newSourceTitle.trim() || !newSourceBody.trim()) return;
    const source: Source = {
      id: makeId("source"),
      title: newSourceTitle.trim(),
      path: `sources/${newSourceTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`,
      kind: "text",
      body: newSourceBody.trim(),
      createdAt: new Date().toISOString(),
    };
    setState((current) => ({ ...current, sources: [source, ...current.sources] }));
    setSelectedSourceId(source.id);
    setView("source");
    setShowAddSource(false);
    setNewSourceTitle("");
    setNewSourceBody("");
    setNotice("Source added to your vault.");
  }

  async function importSourceFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !["md", "markdown", "txt"].includes(extension)) {
      setNotice("Import Markdown or plain-text files only.");
      return;
    }
    const body = (await file.text()).trim();
    if (!body) {
      setNotice("That file does not contain any text to import.");
      return;
    }
    const title = file.name.replace(/\.(md|markdown|txt)$/i, "") || "Imported source";
    const safeName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "imported-source";
    const source: Source = {
      id: makeId("source"),
      title,
      path: `sources/${safeName}.md`,
      kind: "text",
      body,
      createdAt: new Date().toISOString(),
    };
    setState((current) => ({ ...current, sources: [source, ...current.sources] }));
    setSelectedSourceId(source.id);
    setView("source");
    setNotice(`Imported ${file.name} as a source.`);
  }

  function createNote() {
    const now = new Date().toISOString();
    const note: Note = {
      id: makeId("note"),
      title: "Untitled note",
      body: "# Untitled note\n\n",
      sourceIds: selectedSource ? [selectedSource.id] : [],
      createdAt: now,
      updatedAt: now,
    };
    setState((current) => ({ ...current, notes: [note, ...current.notes] }));
    setSelectedNoteId(note.id);
    setView("notes");
    setNotice("New Markdown note created.");
  }

  function saveNote(id: string, title: string, body: string): boolean {
    const nextTitle = title.trim();
    const nextBody = body.trim();
    if (!nextTitle || !nextBody) {
      setNotice("A note needs a title and Markdown content.");
      return false;
    }
    setState((current) => ({
      ...current,
      notes: current.notes.map((note) => note.id === id ? { ...note, title: nextTitle, body: nextBody, updatedAt: new Date().toISOString() } : note),
    }));
    setNotice("Markdown note saved locally.");
    return true;
  }

  return (
    <main className="workspace-page">
      <header className="workspace-topbar">
        <div className="workspace-topbar-left">
          <IconButton label="Back to introduction" onClick={onBack}><ArrowLeft size={17} /></IconButton>
          <span className="topbar-divider" />
          <div className="breadcrumb"><span>Lumenfold</span><ChevronRight size={13} /><strong>Demo workspace</strong></div>
        </div>
        <div className="workspace-topbar-right">
          <span className="connection-chip"><span className="status-dot" /> Demo mode</span>
          <IconButton label="Search vault" onClick={() => setNotice("Search is scoped to the selected source in this alpha.")}><Search size={17} /></IconButton>
          <IconButton label={state.theme === "dark" ? "Use light theme" : "Use dark theme"} onClick={() => setState((current) => ({ ...current, theme: current.theme === "dark" ? "light" : "dark" }))}>
            {state.theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </IconButton>
          <IconButton label="Workspace settings" onClick={() => setNotice("Provider settings will arrive with the real connection adapter.")}><Settings2 size={17} /></IconButton>
        </div>
      </header>

      <nav className="mobile-view-switcher" aria-label="Workspace views">
        <button className={view === "source" ? "is-active" : ""} type="button" onClick={() => setView("source")}><BookOpen size={15} /> Study desk</button>
        <button className={view === "notes" ? "is-active" : ""} type="button" onClick={() => setView("notes")}><FileText size={15} /> Notes <span>{state.notes.length || ""}</span></button>
        <button className={view === "instruments" ? "is-active" : ""} type="button" onClick={() => setView("instruments")}><Layers3 size={15} /> Instruments <span>{state.studySets.length || ""}</span></button>
      </nav>

      <div className="workspace-grid">
        <aside className="vault-rail">
          <div className="rail-heading"><div className="workspace-brand"><BrandMark /><span>Vault</span></div><IconButton label="Collapse vault rail" disabled><Menu size={16} /></IconButton></div>
          <nav className="rail-nav" aria-label="Vault navigation">
            <button className={`rail-nav-item${view === "source" ? " is-active" : ""}`} type="button" onClick={() => setView("source")}><BookOpen size={16} /> Study desk</button>
            <button className={`rail-nav-item${view === "notes" ? " is-active" : ""}`} type="button" onClick={() => setView("notes")}><FileText size={16} /> Notes <span>{state.notes.length || ""}</span></button>
            <button className={`rail-nav-item${view === "instruments" ? " is-active" : ""}`} type="button" onClick={() => setView("instruments")}><Layers3 size={16} /> Instruments <span>{state.studySets.length || ""}</span></button>
          </nav>

          <div className="tree-label">Vault</div>
          <div className="tree">
            <div className="tree-root"><FolderOpen size={15} /><span>sources</span><span className="tree-count">{state.sources.length}</span></div>
            {state.sources.map((source) => (
              <button className={`tree-file${source.id === selectedSourceId ? " is-selected" : ""}`} type="button" key={source.id} onClick={() => chooseSource(source.id)}>
                <FileText size={14} /><span>{source.title}</span>
              </button>
            ))}
            <div className="tree-root"><Folder size={15} /><span>notes</span><span className="tree-count">{state.notes.length}</span></div>
            <div className="tree-root"><Folder size={15} /><span>instruments</span><span className="tree-count">{state.studySets.length}</span></div>
          </div>

          <div className="rail-bottom">
            <div className="storage-note"><span className="status-dot" /><span>Saved locally in this browser</span></div>
            <button className="rail-nav-item subtle" type="button" onClick={() => setNotice("Export arrives after the alpha data model is connected to a vault archive.")}><ArrowUpRight size={15} /> Export vault</button>
          </div>
        </aside>

        <section className="workspace-main">
          {view === "source" && selectedSource ? (
            <>
              <div className="document-toolbar">
                <div><p className="eyebrow">Source</p><h1>{selectedSource.title}</h1><span className="document-path">{selectedSource.path}</span></div>
                <div className="document-toolbar-actions">
                  <input ref={importSourceRef} className="visually-hidden" type="file" accept=".md,.markdown,.txt,text/markdown,text/plain" onChange={importSourceFile} />
                  <button className="quiet-button" type="button" onClick={() => importSourceRef.current?.click()}><FileUp size={16} /> Import file</button>
                  <button className="quiet-button" type="button" onClick={() => setShowAddSource((current) => !current)}><Plus size={16} /> Add source</button>
                </div>
              </div>
              {showAddSource && (
                <form className="add-source-form" onSubmit={addSource}>
                  <div className="form-heading"><span><Plus size={15} /> Add a source</span><IconButton label="Close add source form" onClick={() => setShowAddSource(false)}><X size={16} /></IconButton></div>
                  <label>Title<input value={newSourceTitle} onChange={(event) => setNewSourceTitle(event.target.value)} placeholder="A source worth returning to" /></label>
                  <label>Text<textarea value={newSourceBody} onChange={(event) => setNewSourceBody(event.target.value)} placeholder="Paste a short article, idea, or excerpt" rows={4} /></label>
                  <button className="primary-button small" type="submit">Add to sources <ArrowRight size={15} /></button>
                </form>
              )}
              <article className="reading-surface">
                <div className="source-meta"><span className="kind-label">{selectedSource.kind}</span><span>Captured {readableDate(selectedSource.createdAt)}</span><span className="source-link"><Link2 size={13} /> linked source</span></div>
                {selectedSource.body.split("\n\n").map((paragraph, index) => index === 0 ? <p className="reading-lede" key={paragraph}>{paragraph}</p> : <p key={paragraph}>{paragraph}</p>)}
              </article>
              <AssistantPanel
                question={question}
                setQuestion={setQuestion}
                proposalKind={proposalKind}
                setProposalKind={setProposalKind}
                response={response}
                isThinking={isThinking}
                onAsk={askAssistant}
                onApprove={approveProposal}
                onDismiss={() => setResponse(null)}
                source={selectedSource}
              />
            </>
          ) : view === "notes" ? (
            <NotesView notes={state.notes} selectedNote={selectedNote} onSelect={setSelectedNoteId} onCreate={createNote} onSave={saveNote} onBackToSource={() => setView("source")} />
          ) : (
            <InstrumentsView studySets={state.studySets} selectedSet={selectedSet} onSelect={setSelectedSetId} onBackToSource={() => setView("source")} />
          )}
        </section>

        <aside className="insight-rail">
          <div className="insight-heading"><div><p className="eyebrow">Your vault</p><h2>In progress</h2></div><Gauge size={18} /></div>
          <div className="vault-stats"><div><strong>{state.sources.length}</strong><span>sources</span></div><div><strong>{state.notes.length}</strong><span>notes</span></div><div><strong>{state.studySets.length}</strong><span>instruments</span></div></div>
          <div className="rail-section"><div className="rail-section-heading"><span>Recent notes</span><button type="button" onClick={() => setView("notes")}>View all</button></div>{state.notes.length ? state.notes.slice(0, 3).map((note) => <button className="insight-item" type="button" key={note.id} onClick={() => { setSelectedNoteId(note.id); setView("notes"); }}><FileText size={15} /><span><strong>{note.title}</strong><small>{readableDate(note.createdAt)}</small></span></button>) : <div className="empty-rail"><Lightbulb size={16} /><p>Approved notes will settle here.</p></div>}</div>
          <div className="rail-section"><div className="rail-section-heading"><span>Connection</span><Settings2 size={14} /></div><div className="connection-panel"><div className="connection-title"><span className="status-dot" /> Demo adapter</div><p>Local answers and proposals use the same approval boundary as a real provider.</p></div></div>
          <div className="rail-section assistant-principle"><div className="principle-icon"><Sparkles size={16} /></div><p><strong>The assistant suggests.</strong> You decide what becomes durable.</p></div>
        </aside>
      </div>
      {notice && <div className="toast" role="status"><Check size={15} /> {notice}</div>}
    </main>
  );
}

function AssistantPanel({
  question,
  setQuestion,
  proposalKind,
  setProposalKind,
  response,
  isThinking,
  onAsk,
  onApprove,
  onDismiss,
  source,
}: {
  question: string;
  setQuestion: (value: string) => void;
  proposalKind: ProposalKind;
  setProposalKind: (value: ProposalKind) => void;
  response: AssistantResponse | null;
  isThinking: boolean;
  onAsk: (event: FormEvent<HTMLFormElement>) => void;
  onApprove: () => void;
  onDismiss: () => void;
  source: Source;
}) {
  return (
    <section className="assistant-panel" aria-label="Assistant">
      <div className="assistant-heading"><div className="assistant-title"><span className="assistant-icon"><Bot size={16} /></span><div><p className="eyebrow">Assistant</p><h2>Ask this source</h2></div></div><span className="mode-badge"><span className="status-dot" /> Demo mode</span></div>
      {!response && !isThinking && <div className="assistant-empty"><p>Ask for an explanation, a summary, or a useful next step. The answer will stay grounded in <strong>{source.title}</strong>.</p><div className="suggestion-row"><button type="button" onClick={() => setQuestion("What should I remember here?")}>What should I remember?</button><button type="button" onClick={() => setQuestion("How could I practise this idea?")}>How could I practise it?</button></div></div>}
      {isThinking && <div className="assistant-thinking"><span className="thinking-line" /><span className="thinking-line short" /><span className="thinking-line" /><p>Reading the selected source...</p></div>}
      {response && <div className="assistant-result"><div className="answer-label">Answer</div><p className="answer-copy">{response.answer}</p><div className="citation-list"><div className="citation-heading"><span>Grounded in source</span><span>{response.citations.length} citations</span></div>{response.citations.map((citation) => <div className="citation" key={citation.label}><span className="citation-marker" /><div><strong>{citation.label}</strong><p>&quot;{citation.excerpt}&quot;</p></div></div>)}</div><div className="proposal-preview"><div className="proposal-heading"><div><span className="proposal-label"><Sparkles size={13} /> Proposed {response.proposal.kind === "note" ? "note" : "study set"}</span><strong>{response.proposal.title}</strong></div><span className="review-label">Review before saving</span></div><pre>{response.proposal.body}</pre><div className="proposal-actions"><button className="quiet-button" type="button" onClick={onDismiss}>Dismiss</button><button className="primary-button small" type="button" onClick={onApprove}><Check size={15} /> Approve {response.proposal.kind === "note" ? "note" : "instrument"}</button></div></div></div>}
      <form className="assistant-form" onSubmit={onAsk}><div className="proposal-switch" role="group" aria-label="Proposed result type"><button className={proposalKind === "note" ? "is-active" : ""} type="button" onClick={() => setProposalKind("note")}><FileText size={14} /> Note</button><button className={proposalKind === "study_set" ? "is-active" : ""} type="button" onClick={() => setProposalKind("study_set")}><ListChecks size={14} /> Study set</button></div><div className="ask-row"><textarea value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about this source..." rows={2} /><button className="ask-button" type="submit" aria-label="Ask assistant" title="Ask assistant" disabled={isThinking || !question.trim()}><ArrowUpRight size={17} /></button></div><div className="assistant-form-footer"><span>Answers are local and deterministic in this alpha.</span><span>Enter to ask</span></div></form>
    </section>
  );
}

function NotesView({ notes, selectedNote, onSelect, onCreate, onSave, onBackToSource }: { notes: Note[]; selectedNote?: Note; onSelect: (id: string) => void; onCreate: () => void; onSave: (id: string, title: string, body: string) => boolean; onBackToSource: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(selectedNote?.title ?? "");
  const [draftBody, setDraftBody] = useState(selectedNote?.body ?? "");

  useEffect(() => {
    setDraftTitle(selectedNote?.title ?? "");
    setDraftBody(selectedNote?.body ?? "");
    setIsEditing(false);
  }, [selectedNote?.id]);

  const noteBlocks = selectedNote?.body.split("\n\n").slice(1).filter((block) => !block.startsWith("_Source:")) ?? [];

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedNote) return;
    if (onSave(selectedNote.id, draftTitle, draftBody)) setIsEditing(false);
  }

  return <div className="collection-view"><div className="document-toolbar"><div><p className="eyebrow">Notes</p><h1>What has become yours</h1><span className="document-path">Durable Markdown understanding</span></div><div className="document-toolbar-actions"><button className="quiet-button" type="button" onClick={onBackToSource}><ArrowLeft size={16} /> Back to source</button><button className="primary-button small" type="button" onClick={onCreate}><Plus size={15} /> New note</button></div></div>{selectedNote ? isEditing ? <form className="note-editor" onSubmit={saveDraft}><div className="form-heading"><span><Pencil size={15} /> Edit Markdown note</span><span className="review-label">Saved locally in this browser</span></div><label>Title<input value={draftTitle} onChange={(event) => setDraftTitle(event.target.value)} /></label><label>Markdown<textarea value={draftBody} onChange={(event) => setDraftBody(event.target.value)} rows={16} /></label><div className="note-editor-actions"><button className="quiet-button" type="button" onClick={() => setIsEditing(false)}>Cancel</button><button className="primary-button small" type="submit"><Save size={15} /> Save note</button></div></form> : <article className="note-reading"><div className="note-header"><span className="kind-label">Markdown note</span><span>Updated {readableDate(selectedNote.updatedAt ?? selectedNote.createdAt)}</span><button className="quiet-button" type="button" onClick={() => setIsEditing(true)}><Pencil size={15} /> Edit</button></div><h2>{selectedNote.title}</h2>{noteBlocks.map((block) => block.startsWith("#") ? <h3 key={block}>{block.replace(/^#+\s*/, "")}</h3> : <p key={block}>{block}</p>)}<div className="reference-line"><Link2 size={14} /> {selectedNote.sourceIds.length ? "Source reference attached" : "Personal note"}</div></article> : notes.length ? <div className="collection-list">{notes.map((note) => <button className="collection-item" type="button" key={note.id} onClick={() => onSelect(note.id)}><span className="collection-item-icon"><FileText size={17} /></span><span><strong>{note.title}</strong><small>Updated {readableDate(note.updatedAt ?? note.createdAt)}</small></span><ChevronRight size={16} /></button>)}</div> : <EmptyView icon={<Lightbulb size={20} />} title="Your first note is close" copy="Create a note here, or ask the assistant about the selected source and approve a draft." onAction={onCreate} action="Create a note" />}</div>;
}

function InstrumentsView({ studySets, selectedSet, onSelect, onBackToSource }: { studySets: StudySet[]; selectedSet?: StudySet; onSelect: (id: string) => void; onBackToSource: () => void }) {
  const [revealedCard, setRevealedCard] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setRevealedCard(null);
    setSelectedAnswer(null);
  }, [selectedSet?.id]);

  const question = selectedSet?.questions[0];

  return <div className="collection-view"><div className="document-toolbar"><div><p className="eyebrow">Instruments</p><h1>Ways to keep going</h1><span className="document-path">Reviews, prompts, and practice scaffolds</span></div><button className="quiet-button" type="button" onClick={onBackToSource}><ArrowLeft size={16} /> Back to source</button></div>{selectedSet ? <article className="instrument-reading"><div className="note-header"><span className="kind-label">Study set</span><span>{selectedSet.cards.length} retrieval cards</span></div><h2>{selectedSet.title}</h2><p className="reading-lede">Try to answer each prompt before revealing the back. The effort is the practice.</p><div className="card-list">{selectedSet.cards.map((card, index) => <button className={`practice-card${revealedCard === index ? " is-revealed" : ""}`} type="button" key={card.prompt} onClick={() => setRevealedCard(revealedCard === index ? null : index)} aria-expanded={revealedCard === index}><span>0{index + 1}</span><span className="practice-card-copy"><strong>{card.prompt}</strong>{revealedCard === index ? <span className="practice-answer">{card.answer}</span> : <span className="practice-hint">Reveal answer</span>}</span><ChevronRight size={15} /></button>)}</div>{question ? <div className="quiz-preview"><div><ListChecks size={16} /><strong>Quick check</strong></div><p>{question.prompt}</p><div className="quiz-options" role="radiogroup" aria-label="Quiz answers">{question.options.map((option, index) => <button className={`quiz-option${selectedAnswer === index ? (index === question.answer ? " is-correct" : " is-incorrect") : ""}`} type="button" role="radio" aria-checked={selectedAnswer === index} key={option} onClick={() => setSelectedAnswer(index)}>{option}</button>)}</div>{selectedAnswer !== null ? <p className={`quiz-feedback${selectedAnswer === question.answer ? " is-correct" : " is-incorrect"}`}>{selectedAnswer === question.answer ? "Correct. You produced the idea before checking." : `Not quite. The answer is: ${question.options[question.answer]}`}</p> : <span className="quiz-hint">Choose an answer to see the explanation.</span>}</div> : null}</article> : studySets.length ? <div className="collection-list">{studySets.map((studySet) => <button className="collection-item" type="button" key={studySet.id} onClick={() => onSelect(studySet.id)}><span className="collection-item-icon instrument"><ListChecks size={17} /></span><span><strong>{studySet.title}</strong><small>{studySet.cards.length} cards - {readableDate(studySet.createdAt)}</small></span><ChevronRight size={16} /></button>)}</div> : <EmptyView icon={<ListChecks size={20} />} title="Practice will live here" copy="Ask for a study set from any source and approve the prompts you want to revisit." onAction={onBackToSource} action="Return to the source" />}</div>;
}

function EmptyView({ icon, title, copy, onAction, action }: { icon: ReactNode; title: string; copy: string; onAction: () => void; action: string }) {
  return <div className="empty-view"><div className="empty-icon">{icon}</div><h2>{title}</h2><p>{copy}</p><button className="quiet-button" type="button" onClick={onAction}>{action} <ArrowRight size={15} /></button></div>;
}

export default function App() {
  const [state, setState] = useState<PersistedState>(() => readPersistedState());
  const [page, setPage] = useState<Page>("intro");
  const [view, setView] = useState<WorkspaceView>("source");
  const [selectedSourceId, setSelectedSourceId] = useState(state.sources[0]?.id ?? "");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = state.theme;
  }, [state.theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  function openDemo() {
    setPage("workspace");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return page === "intro" ? <IntroPage theme={state.theme} onOpenDemo={openDemo} onToggleTheme={() => setState((current) => ({ ...current, theme: current.theme === "dark" ? "light" : "dark" }))} /> : <WorkspacePage state={state} setState={setState} view={view} setView={setView} selectedSourceId={selectedSourceId} setSelectedSourceId={setSelectedSourceId} selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId} selectedSetId={selectedSetId} setSelectedSetId={setSelectedSetId} onBack={() => setPage("intro")} />;
}
