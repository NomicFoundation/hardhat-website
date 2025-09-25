# Claude Code Configuration

This folder contains shared Claude Code configurations for documentation review.

## Setup

1. Install Claude Code
2. Use `/output-style` to set it to `markdown-doc-reviewer`

## Folder Structure

- `output-styles/` - Shared editorial styles

## Workflow

1. Start a session with `claude`
2. Login if needed
3. Use the prompt `Review and add suggestions to <filepath>`
4. Accept all edits in the CLI
5. Review the file in vscode
