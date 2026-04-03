---
title: Turning a discovery production into something an LLM can actually query
summary: A practical field report on taking a Relativity-style discovery export, extracting and normalizing the text, indexing it locally, and letting a model answer from retrieval instead of bluffing.
date: 2026-04-03
published: true
image: /images/posts/discovery-llm-header.png
tags:
  - discovery
  - llm
  - semantic-search
  - local-first
---

Most discovery is technically searchable. That does not mean it is easy to ask useful questions of it.

Anyone who has spent time in large productions knows the gap. You can have extracted text, load files, metadata, natives, images, and thousands of documents sitting in a structure that a review platform understands just fine. The moment you want to move outside that hosted review environment, though, the question changes.

How do you turn that pile into something an attorney can actually interrogate?

The answer is not “dump it into an LLM.”

The more useful pattern is to build a semantic retrieval layer over the production, then let the model query that layer as a tool. The model is not the source of truth. The documents are. The model’s job is to search, retrieve, synthesize, and cite.

## The format matters more than people admit

Discovery can arrive in a lot of shapes. Sometimes it is a loose directory tree with PDFs and spreadsheets. Sometimes it is a mixed bag of images, text, and half-structured exports. Sometimes it comes out of a hosted review system with a layout that at least pretends to be predictable.

The workflow I used here started from a **Relativity-style export**. That detail matters because ingestion logic depends heavily on the structure of the production.

A typical export like that includes a few separate pieces:

- a **load file**, usually a `.dat`, that acts as the map
- a **text folder** with extracted text
- a **natives folder** with original files like PDFs, Word documents, spreadsheets, and email containers
- an **images folder**, often TIFFs, for documents that were reviewed as images

The `.dat` file is not the evidence. It is the index. It tells you what exists, how documents are identified, and which metadata belongs to which file. If you want a search layer that is actually trustworthy, that is where the work starts.

## The real job is retrieval, not vibes

What you want is not just full-text search.

You want to ask a question in plain English and get back the material that matters, even when the exact wording does not line up cleanly. You want semantic retrieval tied back to document metadata and citations.

That means solving a few separate problems in order:

1. parse the production correctly
2. extract usable text from mixed file types
3. chunk the text into retrieval-sized pieces
4. embed those chunks into vectors
5. store them with enough metadata to make the result intelligible
6. give the model a retrieval tool instead of asking it to freewheel

That is the actual pipeline.

## Parsing the production is the quiet backbone

Relativity-style exports are structured, but they are not friendly. Load files can use odd delimiters, odd quoting, and field names that shift from one production to the next.

The parser has to answer basic questions reliably:

- what is this document’s Bates range?
- which extracted text file belongs to it?
- is there a native file?
- what metadata should travel with it?
- if the extracted text is missing or garbage, what is the next fallback?

If that mapping layer is wrong, everything downstream gets shaky. Semantic search does not rescue bad ingestion.

## Text extraction is a fallback chain

One easy mistake is talking as if documents just “become text.” They do not. They become text through a sequence of decisions.

The practical order looks more like this:

### 1. Use extracted text when it is already there and actually usable

If the production already includes good text files, that is usually the best and fastest path.

### 2. Fall back to the native file

If the extracted text is missing, empty, or clearly bad, process the original file instead. That might be a PDF, Word document, spreadsheet, PowerPoint, or something equally annoying.

### 3. Fall back to OCR

If there is no usable text and no clean native path, OCR is the last resort.

That fallback logic matters because discovery is messy. Some documents are born digital. Some are image-only. Some are scanned badly. Some technically have extracted text, but it is useless in practice. A serious ingestion pipeline has to handle that reality without pretending every document is the same.

## Docling makes the ugly middle part less ugly

For the conversion layer, I have been using **Docling**. It helps because it can take mixed document types and turn them into cleaner structured text than you usually get from one-off parsing hacks.

That includes:

- PDFs
- Word documents
- Excel files
- PowerPoints
- images that need OCR

Running it as a local service makes the whole setup much more practical. Instead of building and maintaining a different parser for every file type, the ingestion script can send a file through a conversion service and get back normalized text or markdown that is easier to chunk and index.

That is not magic. It is just a better place to put the pain.

## Chunking is where the system starts getting useful

Even after you have usable text, you still do not want to embed a 200-page document as one giant object. That is too broad, too noisy, and too likely to bury the relevant part.

So the text gets broken into chunks, usually a few hundred words at a time with some overlap. The exact numbers are adjustable, but the principle is simple:

- large enough to preserve context
- small enough to retrieve something precise
- always linked back to the source document and Bates information

That is where the system stops feeling theoretical. You are no longer retrieving a whole document because it happens to contain a word. You are retrieving the part that matters.

## Embeddings and the vector layer

Once the text is chunked, each chunk gets embedded into a vector using an embedding model. In my current setup, that means a local embedding model running through **Ollama**.

Those vectors go into **Qdrant**, along with the metadata that makes each chunk meaningful later:

- Bates number or range
- document identifier
- custodian
- document type
- production name
- dates
- any other fields worth preserving from the load file

That is the layer that makes semantic search worth doing. Keyword search can only take you so far when the wording varies or the relevant concept is buried indirectly. A vector index gives you a way to retrieve by meaning instead of exact phrasing.

## The model is not the database

This is the part that matters most.

The model should not be treated as if it contains the discovery. It does not. Even a giant context window is not the same thing as a queryable system.

The saner pattern looks like this:

- the documents live in the retrieval layer
- the model gets a tool
- the model uses that tool to search the indexed production
- the answer is built from retrieved material with citations attached

In practice, that means wiring retrieval functions into the chat layer. In this setup, the tool sits inside **Open WebUI** and exposes things like:

- semantic search across the indexed production
- fetch by Bates number
- find similar documents
- inspect what has been indexed

The tool embeds the user’s question, queries Qdrant, retrieves the relevant chunks, and returns them with metadata. The model answers from that material instead of improvising from training data.

That is a much better contract.

## What the user experience should feel like

The end user should not have to think about vectors, chunk sizes, embeddings, or load files.

They ask a question in plain English. The system searches the production. The model returns an answer grounded in retrieved material, with citations pointing back to the underlying documents.

That is the point.

Not “AI” in the abstract. Not a staged demo. A working path from a discovery production to a queryable internal system that helps someone find the right material faster.

## Why I keep this local

For this kind of work, local infrastructure is not a bonus feature. It is part of the design.

The stack I have been using is internal:

- **Qdrant** for the vector store
- **Ollama** for local embeddings
- **Docling** for document conversion and OCR
- **Open WebUI** for the model interface and retrieval tools

That keeps the production on infrastructure you control. No cloud handoff is required to make the system useful.

It also gives you room to tune the ingestion pipeline, retrieval behavior, prompt rules, and metadata model around the actual work instead of forcing everything through somebody else’s generic platform assumptions.

## The hard part is the boring part

Getting a model to answer a question is the easy part.

The harder parts are all the unglamorous ones that determine whether the answer can be trusted at all:

- parsing ugly load files correctly
- handling inconsistent export structures
- deciding when extracted text is good enough and when to fall back
- dealing with OCR failures and bad source material
- preserving metadata cleanly
- forcing retrieval before answer generation
- requiring citations instead of letting the model bluff

That is the difference between “AI on discovery” as a slogan and a system people can actually use.

## The pattern that seems worth keeping

The broader pattern is simple:

1. take a structured discovery production
2. parse it like a real data source, not just a pile of files
3. extract the text carefully
4. embed and index it locally
5. give the model retrieval tools instead of fake omniscience
6. make citations part of the contract

Once you do that, the model gets much more useful. Not because it magically understands anything, but because it can move through indexed material quickly and return grounded answers from the underlying documents.

That is the real shift.

The point is not to replace document review with chatbot theater. The point is to turn a production into something queryable, inspectable, and fast enough to matter.
