# Lumenfold Domain Language

This glossary defines the durable objects in a Lumenfold vault and the relationships between them. Directory names describe ownership and lifecycle; links describe how the objects work together.

## Vault

**Source**:
Material that came from outside the learner and is preserved as a reference for study. A source keeps its original provenance even when notes or instruments are derived from it.
_Avoid_: Note, knowledge file

**Note**:
A durable Markdown artifact the learner authored or explicitly accepted as their own understanding. A note may contain concepts, explanations, reflections, decisions, or project context and can link to any source or other note.
_Avoid_: Knowledge file, learning file

**Instrument**:
A portable learner-facing tool or scaffold that operates on sources and notes. Practice sets, reminders, calendars, plans, and future plugin-owned user data are instruments; their executable plugin code is not.
_Avoid_: Utility, feature, plugin

**Study set**:
An instrument containing related retrieval prompts, answers, and optional quiz questions. It is exported as one readable instrument rather than one file per card.
_Avoid_: SRS folder, card collection

**Understanding**:
The learner's interpreted and reusable grasp of material. Understanding is represented by notes; it is an outcome and domain concept, not a top-level vault directory.
_Avoid_: Understanding folder

**Assistant**:
The Lumenfold capability that helps a learner question, summarize, organize, retrieve, and transform material across the vault. The assistant can prepare a proposed answer or artifact, but it does not decide what becomes part of the learner's durable work.
_Avoid_: Autonomous agent, replacement teacher

**Proposal**:
A reviewable suggestion for an answer, source, note, instrument, or change to an existing vault object. A proposal is not durable until the learner accepts it; acceptance makes the learner, rather than the assistant, the author of the resulting artifact.
_Avoid_: Automatic write, command

**Reusable skill**:
A portable, human-readable procedure or learning scaffold that can be applied repeatedly to a goal or workflow. A skill describes actions and constraints; it is not unrestricted executable code.
_Avoid_: Prompt snippet, plugin code

**Plugin**:
An optional extension or integration that adds a capability to Lumenfold. A plugin may own instruments or configuration artifacts, while executable plugin code remains an extension concern rather than learner content in the vault.
_Avoid_: Instrument, arbitrary script

**AI connection**:
The configured relationship between Lumenfold and an external model service used by the assistant. It identifies where and in what protocol the service can be reached; the provider credential belongs to a secret store outside the portable vault.
_Avoid_: Model, API key

## Relationships

**Vault link**:
An explicit reference between durable objects, identified by a stable ID and represented in Markdown through managed wikilinks or frontmatter. Renaming or moving an object updates its managed references; backlinks are derived from outbound links.
_Avoid_: Copied content, duplicated artifact
