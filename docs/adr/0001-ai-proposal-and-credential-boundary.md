---
status: accepted
---

# Keep AI Writes Behind Typed Proposals and External Credentials

Lumenfold needs broad AI assistance without giving a model silent authority over learner-owned files or exposing a provider secret in a portable browser vault. The assistant therefore returns typed, reviewable proposals that the learner must approve; skills and plugin configurations are declarative instrument artifacts, while executable extension code stays outside the proposal and vault boundary. AI connection settings may identify an endpoint and protocol, but the raw credential is owned by the hosted deployment's secret configuration or a future local OS credential store, never by IndexedDB, vault exports, or client code.

## Considered Options

- Free-form agent access to the database or filesystem: rejected because writes would be difficult to audit, constrain, and undo.
- Encrypting the API key in browser storage: rejected because the browser runtime that can decrypt it can also access it.
- Treating skills and plugin configurations as unrestricted executable uploads: rejected because it would turn an assistant proposal into a code-execution boundary.

## Consequences

- Every durable AI action needs schema validation, a preview or diff, explicit approval, and revision checks for updates.
- The MVP can use a Cloudflare Worker secret and a deterministic demo adapter without changing the client contract.
- A local application will need a credential broker or OS keychain integration before it can own provider credentials safely.
