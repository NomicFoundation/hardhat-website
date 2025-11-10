# Hardhat Website Style Guide

This document describes the style guide for the Hardhat website. It's based on the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/).

## Style guide

### Overview

This style guide is based on the Microsoft Writing Style Guide principles for creating clear, concise, and user-friendly technical documentation. The guide emphasizes a warm, conversational tone that is crisp, clear, and helpful.

**Core Philosophy**: Warm and relaxed, crisp and clear, ready to lend a hand.

### Top 10 Principles

#### 1. Use bigger ideas, fewer words

- Shorter is always better
- Modern design hinges on crisp minimalism
- Example: "Ready to buy? Contact us." instead of "If you're ready to purchase Office 365 for your organization, contact your Microsoft account representative."

#### 2. Write like you speak

- Read text aloud to ensure natural flow
- Avoid jargon and overly complex technical language. Only use technical terms when they're necessary or the subject of the document/sentence
- Sound like a friendly conversation
- Example: "You need an ID that looks like this: someone@example.com" instead of "Invalid ID"

#### 3. Project friendliness

- Use contractions: it's, you'll, you're, we're, let's
- Creates a warmer, more approachable tone
- Example: "what you're interested in" instead of "what you are interested in"

#### 4. Get to the point fast

- Lead with what's most important
- Front-load keywords for scanning
- Make user choices and next steps obvious
- Use inverted pyramid style (conclusion first)

#### 5. Be brief

- Give just enough information for confident decisions
- Prune every excess word
- Remove unnecessary qualifiers and filler

#### 6. When in doubt, don't capitalize

- Use sentence-case capitalization (only capitalize first word and proper nouns)
- Never use Title Case for headings
- Example: "Find a Microsoft partner" not "Find a Microsoft Partner"

#### 7. Skip periods (and : ! ?)

- No end punctuation on titles, headings, subheadings
- No punctuation on list items of three or fewer words
- Save periods for paragraphs and body copy

#### 8. Remember the last comma

- Always use the Oxford comma (serial comma)
- Include a comma before the conjunction in lists of three or more items
- Example: "Android, iOS, and Windows"

#### 9. Don't be spacey

- Use only one space after periods, question marks, and colons
- Example: "Use pipelines, logical groups of activities, to consolidate..."

#### 10. Revise weak writing

- Start statements with verbs when possible
- Edit out "you can" and "there is/are/were"
- Use active voice and indicative mood
- Example: "Store files online" instead of "You can store files online"

### Writing Guidelines

#### Voice and Tone

- **Conversational**: Write as if speaking to another person one-on-one
- **Empathetic**: Understand and address user needs
- **Supportive and encouraging**: Users should never feel condescended to, blamed, or intimidated
- **Focus on helping users**: Answer "How do I do X?" and "What do I need to know before I do X?"

#### Warmth and Connection

- **Balance directness with context**: Don't just state what to do, occasionally mention why it matters
- **Use transitional phrases**: "Now that...", "With this in place...", "Here's how..."
- **Mix instructional voice**: Use "you'll" for most instructions, but "Let's" occasionally for collaborative feel
- **Acknowledge progress**: Recognize what the reader has accomplished
- **Brief doesn't mean sterile**: Brief doesn't mean sterile. A sentence can be concise AND warm by adding small contextual hints about purpose or by using collaborative language.

Examples:

Too cold/direct:

- First, you'll add the `myAccount` property to the `NetworkConnection` object returned by `network.connect()`.

Warm and conversational:

- Let's start by adding a `myAccount` property to the `NetworkConnection` object returned by `network.connect()`.
- The first step is adding the `myAccount` property to the `NetworkConnection` object returned by `network.connect()`.

#### Sentence Structure

- **Write short, simple sentences**: If a sentence has more than a few commas, consider breaking it up
- **Use standard word order**: Subject + verb + object
- **Include clarifying words**: Use "that" and "who" to clarify sentence structure
- **Include articles**: Use "the," "a," "an" to help readers and translation software
- **Limit sentence fragments**: They can be hard to translate

#### Word Choice

- **Use one word per concept**: Be consistent; avoid synonyms for the same feature
- **Avoid idioms and colloquialisms**: May confuse non-native speakers
- **Limit modifier stacks**: Long chains of modifying words are confusing
- **Use specific, concrete language**: Avoid vague terms like "thing" and "stuff."

#### Content Organization

- **Front-load important information**: Put key content at the beginning
- **Use scannable formatting**: Headers, short paragraphs, lists, and tables
- **Create content chunks**: Short, digestible paragraphs
- **Place critical content "above the fold"**: Users are unlikely to scroll

### Procedures and Instructions

#### Writing Steps

1. **Use a consistent format**: Help users find instructions by scanning
2. **Consider using descriptive headings**: Tell users what they'll accomplish
   - Good: "To add an account" or "Add an account"
3. **Use parallel structure**: Write all steps the same way
4. **Separate numbered entries**: One step per number
5. **Combine short steps**: OK to combine if they occur in the same UI location

#### Imperative Mood

- Use imperative verbs in procedures: "Click," "Select," "Enter"
- Example: "On the File menu, click Sharing" not "Clicking the File menu, select Sharing"

### Global Communication

#### Translation-Friendly Writing

- **Use conventional grammar**: Standard English grammar and punctuation
- **Keep sentences simple**: Makes machine translation more accurate
- **Be consistent**: Use same terminology throughout
- **Include context words**: Don't rely on implied subjects or objects
- **Avoid culture-specific references**: May not translate well globally

#### Accessibility

- Consider worldwide audience implications
- Use descriptive link text (not "click here")
- Ensure proper heading structure

### Developer Content

#### Code Documentation

- Provide reference documentation (classes, methods, properties)
- Include practical code examples
- Show how to use programming elements
- Balance technical accuracy with clarity
- Format code elements consistently

#### Technical Writing

- Be precise with technical terms
- Define acronyms on first use
- Use consistent capitalization for technical terms
- Include system requirements when relevant

### Formatting Standards

#### Capitalization

- **Sentence case**: Default for all headings, titles, and UI elements
- **Proper nouns only**: Hardhat and Nomic products, architectural concepts, plugins, and third-party brand names should be capitalized. There's an (incomplete) list of proper nouns in the "Proper nouns in Hardhat 3" section, with their capitalization.
- **No title case**: Even for major headings

#### Punctuation

- **Oxford comma**: Always use in lists
- **One space**: After periods, colons, question marks
- **Never use em dashes**: Don't use em dashes (—), use commas instead. Using em dashes looks bad, as only LLMs use them.
- **Minimal end punctuation**: Skip in headings and short list items

#### Lists

- Use for complex information that's easier to scan
- Replace complex sentences with lists when possible
- Keep list items parallel in structure
- Use numbered lists for sequential steps
- Use bulleted lists for non-sequential items

### Key Reminders

- **Focus on user intent**: Before writing, determine who the user is and what they're trying to do
- **Provide examples**: Help users understand new concepts
- **Test readability**: Read content aloud to check for natural flow
- **Be consistent**: Maintain consistency in terminology, formatting, and style
- **Keep it simple**: If you can say it in fewer words without losing meaning, do so

## Markdown formatting guidelines

The documentation is written using GitHub Flavored Markdown, using MDX, with some minor extensions.

Some formatting rules:

- Use simple backticks for file references. e.g. `src/foo.ts`.
- When referring to a technical term, only use backticks if the term is used exactly like that in code, and not every time you refer to a concept. e.g. Hook Handlers, not `Hook Handlers` to talk about the concept, but `hookHandlers` to refer to the way to defined them in code.
- Use triple backticks for code blocks. Always include the language name. Prefer `ts` over `js`.
- Triple backticks can have lines highlighted with brackets, collapsed sections, file names, languages, and more. See CONTRIBUTING.md for more info.
- Don't use word wrapping. One line per paragraph.
- Leave a blank line between paragraphs.
- Everything is autoformatted by prettier.

### Asides

You can use `:::` syntax to create asides. There are different types of asides, like `note`, `tip`, `caution`, `danger`.

Example:

```md
:::tip
This is a tip
:::
```

Learn more at: https://starlight.astro.build/guides/authoring-content/#asides

### MDX Components

Please read the CONTRIBUTING.md file to learn about how to use Starlight and our custom MDX components, and when to use them.

### Frontmatter

Every document must have a frontmatter section at the top. The frontmatter MUST include a `title` and a `description` field. No H1 header should be added, as the `title` from the frontmatter will automatically be used.

Example:

```md
---
title: Hardhat plugin development
description: How to build Hardhat 3 plugins to extend and customize its behavior
---

Welcome to the Hardhat plugin development documentation....
```

If the title is too long for the sidebar, you should add an alternative label to it.

```md
---
title: Doing something that requires a long tile
description: How to do some thing that requires a title
sidebar:
  label: Doing something
---

...
```

## Proper nouns in Hardhat 3

This are proper nouns that are used in Hardhat 3, which need to be capitalized in the documentation.

- Hardhat
- Hardhat Runtime Environment
- Ethereum
- Ethereum Mainnet
- Ethereum Virtual Machine
- Mainnet
- Hook
- Chained Hook
- Parallel Hook
- Sequential Hook
- Hook Handler
- Hook Handler Category Factory
- Hook Context
- Global Option
- Type Extension
- Conditional Dependency
- Config System
- User Interruptions
- Hardhat Task
- Task Action
- Mocha
- Configuration Variable

## cspell dictionary

There's a cspell dictionary in cspell-dictionary.txt. These aren't necessarily proper nouns, and the casing in that file shouldn't necessarily be reflected in the docs.

### Proper nouns in code blocks

If these terms are included in code blocks (with `single backticks` or `triple backticks`), the above capitalizations don't apply, as they are technical terms and part of the code. In code blocks, you should use the term as it appears in the code.

For example `NetworkConnection` should be capitalized as `NetworkConnection`, not `Network Connection`, nor replaced by "Network Connection".

### How to refer to the name of a Hook

When you need to refer to the name of a Hook, you should use `HookCategoryName#hookName`, where `HookCategoryName` is the name of the TypeScript interface that defines the Hooks of that category, and `hookName` is the name of the property in that interface. Some examples:

- `NetworkHooks#newConnection`
- `NetworkHooks#closeConnection`
- `NetworkHooks#onConnect`
- `TestHooks#registerFileForTestRunner`
- `ConfigurationVariableHooks#fetchValue`
- `UserInterruptionHooks#displayMessage`
