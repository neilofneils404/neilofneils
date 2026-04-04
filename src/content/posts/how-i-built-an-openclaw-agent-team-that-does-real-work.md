---
title: How I Built an OpenClaw Agent Team That Does Real Work
summary: Why I stopped treating OpenClaw like one giant assistant and started using it as a small routed system for research, execution, critique, continuity, and systems work.
date: 2026-04-03T12:00:00-04:00
published: true
tags:
  - openclaw
  - agents
  - workflows
  - automation
  - ai
image: ../../assets/posts/openclaw-team-post-header.jpg
---

I did not end up using OpenClaw as one all-purpose assistant.

Pretty quickly, it turned into something more useful: a small, specialized agent team with one front-facing operator and a set of internal lanes for research, execution, critique, continuity, and systems work.

That distinction matters. A lot of writing about “multi-agent systems” dissolves into roleplay, hype, or vague claims about the future of work. That is not what I’m interested in. What I wanted was a way to structure real ongoing work so that different kinds of tasks could be routed, executed, reviewed, and tracked without turning every thread into one giant prompt.

OpenClaw is what made that practical.

## Why I stopped thinking in terms of one assistant

A single general AI is fine for quick questions, drafting, and occasional bursts of help. But once the work gets longer, messier, or more varied, one context starts to do too much at once.

The problems show up fast:

- research gets mixed with implementation
- critique gets softened by the same context that produced the draft
- recurring maintenance disappears when nobody is actively chatting
- long threads become bloated and unfocused
- everything starts sounding like the same voice doing every job

I wanted something more operational than that.

The answer was not “make the prompt bigger.” The answer was specialization.

## The setup

At the top is **Cass**, the front-facing operator. That is the layer I actually work with. Cass handles the conversation, makes routing decisions, tracks thread state, and owns the judgment about when to stay inline, when to delegate, and when to stop and ask for approval.

Under that, there are specialized lanes:

- **Zero Cool** for implementation and build work
- **Acid Burn** for research and context
- **Phantom Phreak** for drafting, summaries, and packaging
- **Cereal Killer** for systems and operational debugging
- **Lord Nikon** for second-pass critique
- **Blade** for continuity and accountability
- **Razor** for stuck-thread recovery and blocker extraction

Those names are shorthand. The useful part is not the names. The useful part is that each lane has a job.

That means work can be routed with a reason:

- unclear facts go to research
- code changes go to implementation
- drafts get reviewed by critique
- recurring state gets tracked by continuity
- system weirdness goes to ops

That separation turns out to matter more than people think.

## What makes this OpenClaw-specific

This would be much less interesting if it were just “I have a prompt for each role.”

What makes it work is that OpenClaw gives the system actual operating structure:

- spawned subagents with separate sessions
- shared workspace files
- memory and continuity across threads
- cron-based recurring work
- tools that can act in the local environment
- a real distinction between the front-facing session and delegated runs
- explicit approval boundaries for consequential actions

That changes the character of the whole thing.

This is not a single chatbot improvising a cast of personalities. It is a routed system running on persistent files, background tasks, and separate working contexts. The team framing is useful because the work is actually divided.

## How I actually built it

The setup itself is not especially mystical. The basic move was to stop treating the system like one general-purpose assistant and start treating it like a routed operating model.

I began with one front-facing operator: Cass. That is the layer that handles the live conversation, decides what kind of work is actually being asked for, and routes it when the task would benefit from specialization.

From there, I broke the work into a small set of functional lanes:

- research and context gathering
- implementation and build work
- drafting and packaging
- critique and second-pass review
- systems and operational debugging
- continuity and accountability

The important part was not inventing a lot of personality. The important part was giving each lane a narrow job and a clear kind of return artifact.

That means delegated work is expected to come back as something bounded:

- a memo
- a recommendation
- a patch
- a summary
- a critique
- a concrete next step

That one change matters a lot. It keeps delegation from turning into parallel mush.

The other big change was learning to route by bottleneck instead of by topic. If the real problem is uncertainty, I route to research. If the real problem is implementation, I route to build. If the work is likely to benefit from pressure-testing, I route to critique. That sounds obvious, but it took a while to get right.

The current system is primarily running on **OpenAI Codex over OAuth, using GPT-5.4**, but the model is only part of what makes the setup useful. What made the setup useful was giving the model an operating structure: one front-facing agent, specialized lanes underneath, persistent files and memory, recurring jobs where needed, and explicit boundaries around planning, review, and approval.

### What the file layer actually looks like

One thing I wish more people explained is that systems like this do not become real because you named a few subagents. They become real because you create a file-backed operating layer around them.

In my case, that includes things like:

- an **identity/behavior file** for the front-facing operator
- an **agent governance file** that defines gates, routing discipline, and hard boundaries
- a **team roster file** that defines what each lane is actually for
- a **bootstrap/startup file** that tells the system what to load first and what context matters before acting
- a **memory layer** that stores factual continuity and past decisions
- an **ops layer** with open loops, delegation records, work ledgers, handoff templates, and review packets
- a **scheduler map** so recurring jobs have one clear source of truth

If you are building this yourself, the exact filenames do not matter. The categories do.

For example, in an OpenClaw-style setup, you probably want equivalents of:

- `AGENTS.md` for routing/governance rules
- `TEAM.md` for role definitions and lane ownership
- `BOOTSTRAP.md` for session startup discipline
- a `MEMORY.md` plus dated memory files for durable continuity
- `ops/open-loops.md`, `ops/work-ledger.md`, and `ops/delegations.md` for actual operational truth
- `ops/reviews/` for weekly/bi-weekly review artifacts
- a scheduler reference file so cron jobs and recurring work are inspectable later

The point is not to copy my files. The point is to understand the scope of the work. If all of the coordination only lives in prompts, it will drift.

Also important: I am not publishing my private configs, settings, auth setup, or internal runtime details here. People do not need someone else’s secrets to understand the shape of the architecture.

If someone wanted to build something similar in their own setup, my advice would be:

1. start with one operator  
2. define a few narrow functional lanes  
3. route by bottleneck, not by vibes  
4. require bounded outputs  
5. keep human approval for consequential actions  
6. build a real file-backed operating layer  
7. let the system earn more autonomy over time instead of pretending it has it on day one  

That is a much more reliable path than trying to prompt one giant assistant into acting like a whole organization.

## How the work flows

In practice, the system is pretty simple.

A task comes in. Cass decides whether it should stay in the main thread or get routed. If it gets routed, it goes to the lane that matches the actual bottleneck.

That matters because the right route is not always the most obvious surface category.

Sometimes the bottleneck is:

- missing information
- implementation complexity
- review risk
- continuity
- packaging
- systems friction

The team works best when routing is based on that bottleneck rather than vague vibes.

For bigger or riskier work, there is also planning and approval discipline. The point is not to create bureaucracy for its own sake. The point is to keep the system from becoming a mess once it becomes capable enough to do real things.

That governance layer matters more than the personalities do.

## What the team is actually useful for

The clearest value so far has been in a handful of recurring categories.

### Research and synthesis

Some threads start with uncertainty. The facts are incomplete, the options are fuzzy, or the actual problem has not been cleanly named yet.

That is where a dedicated research lane helps. Instead of trying to think, search, summarize, and decide in one breath, the system can split that work off and return something bounded: a memo, a comparison, a framing, a recommendation.

That makes the main thread less noisy and the final decision more grounded.

### Implementation work

When something needs to be built, changed, migrated, or cleaned up, it helps to hand that to a lane built for execution rather than making the main conversation try to do research, design, coding, and review all at once.

The useful output here is not “an AI thinks this is possible.” It is a patch, a commit, a changed file, a working build, or a deploy-ready artifact.

### Drafting and packaging

Once something has been figured out, there is often still a separate job of turning it into:

- a post
- a summary
- a handoff
- a user-facing explanation
- a cleaner artifact

That is different work from either research or implementation. Treating it as its own lane helps keep writing from turning into a side effect of whatever the system was already doing.

### Critique

One of the most useful roles is a separate critique pass. A second lane looking for failure modes, weak assumptions, UX drift, or missing caveats is often more valuable than one assistant trying to self-correct in the same context that produced the first answer.

This is especially useful for anything that touches:
- design
- product judgment
- public writing
- system changes
- risky decisions

### Continuity and background operations

This is where OpenClaw starts to feel genuinely different from a normal assistant. Because the system has file-backed memory, scheduled jobs, and background task support, some work can continue between chats:

- recurring checks
- review loops
- maintenance
- reminders
- lightweight monitoring
- periodic cleanup or freshness work

That pushes it beyond “assistant waiting for prompts” into something closer to an operating layer.

## Why multiple agents are better than one big prompt

The strongest reason is not that it feels cooler. It is that role separation reduces drift.

A research lane can stay in research mode.  
An implementation lane can stay in build mode.  
A critique lane can be narrower and sharper because it does not have to also be helpful, generative, and agreeable in the same moment.

That leads to better outputs because each run has:
- a clearer purpose
- a narrower context
- a more legible return artifact
- and a better chance of being reviewed cleanly

One giant prompt can imitate a lot of this, but it usually blurs under pressure.

## What surprised me

A few things became clear faster than I expected.

### Specialization helps more than bigger prompts

The biggest gain was not “better personality.” It was separation of concerns. Once research, implementation, critique, and packaging had distinct lanes, the work got cleaner.

### Orchestration matters as much as model quality

A stronger model in one giant context is not the same thing as a system that can route work, preserve artifacts, and come back with bounded outputs.

### The useful magic is mundane

The parts that matter most are not mystical:

- routing
- memory
- continuity
- file discipline
- review structure
- recurring work
- clear handoffs

That is less exciting than AI mythology, but much more useful.

## What still breaks

This is useful, not frictionless.

Things still go wrong:

- context can drift
- subagents can overbuild
- critique can come too late
- background work can create noise if it is not governed carefully
- tool friction still matters
- taste still requires human judgment
- some tasks look separable until they are not

And after running this longer, a few more failure modes became obvious.

### Under-delegation is real

One of the easiest mistakes in a system like this is leaving too much work with the front-facing operator.

That sounds backwards at first. If the operator is capable, why not just let it handle the thread?

Because “can do it” is not the same thing as “should do it inline.” In practice, I found that config changes, runtime questions, deploy-path work, governance changes, and other system-touching threads were too easy to keep in the main lane for too long.

That created a predictable problem: the team was strongest when routed work happened early, but heavier technical threads were still sometimes being handled like solo work with optional help later.

So I ended up hardening the routing doctrine.

For consequential domains like:

- config
- runtime / services / scheduler state
- deploy / release path
- governance or protocol changes
- other hard-to-reverse operational surfaces

…the system now treats those as **default-routed work**, not “delegate if it seems useful.”

In practical terms, that means:

- ops/system truth gets involved earlier
- research/scoping gets involved earlier when there is real uncertainty
- critique gets involved before meaningful governance or protected-core changes land

That was a real correction, not a theoretical improvement.

### Review cannot be optional

Another thing I underestimated was how much the team needed its own review structure.

It was not enough to say “these roles seem useful.” I eventually needed:

- weekly self-reviews for each named lane
- a bi-weekly orchestrator review
- a running scoreboard of recent grades and trend notes
- improvement items when a lane underperformed
- a way to tighten or merge weak lanes instead of letting them become decorative

That turned the system from a loose cast of recurring helpers into something closer to an accountable operating layer.

### Scheduling needs a real source of truth

If recurring review work matters, the schedule itself needs to be inspectable and real.

The lesson there was simple: use one canonical runtime scheduler, document it, and make recurring artifacts visible. A shell script by itself is not a scheduler. An implicit habit is definitely not a scheduler.

And none of this removes the need for human signoff on consequential actions.

That is important enough to say plainly: the system works best when it is governed. Planning, review, approval, cleanup, and recurring inspection are not incidental details. They are the difference between “interesting” and “actually usable.”

## Why I think this matters

The thing I find most interesting is not the fantasy of a single super-assistant that does everything.

It is the possibility of small, task-shaped, opinionated agent systems that can actually operate inside a real environment:

- with files
- with memory
- with schedules
- with tooling
- with boundaries
- with recurring work
- with a human still making the consequential calls

That feels much more believable than the usual AI pitch.

Less omniscient oracle, more working crew.

## If you’re building your own

My advice is simple:

- start with roles, not personalities
- route by bottleneck, not by surface topic
- keep real artifacts
- build review into the system
- use memory and files, not vibes
- give recurring work a real scheduler and visible outputs
- harden routing rules when you discover under-delegation
- make the system earn more autonomy over time
- don’t confuse a fun prompt setup with an operating model

And above all: judge it by whether it makes real work cleaner.

If it cannot help produce better drafts, tighter research, cleaner execution, more reliable review, or useful recurring maintenance, then it is not a team. It is just a story you are telling yourself about your tools.

That story can be fun. It is not the same thing as real work.
