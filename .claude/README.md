# Claude Code Configuration

This folder contains shared Claude Code configurations for documentation review.

## Setup

1. Install Claude Code and the VS Code extension
2. Use `/output-style` `hardhat3`

## Folder Structure

- `output-styles/` - Shared editorial styles

## Workflow

- Open Claude Code, either in the VS Code extension or in the command line
- Login if necessary
- Run the custom command `/review @<markdown file>`
- You can auto-accept the changes to that file, and to `.claude/session/`
- Open the document in VS Code
- Any proposed changed will be shown as a merge conflict (current changes is the previous version)
- The top line of the merge conflict will show what Claude considers to be wrong
- The bottom line of the merge conflict will show what Claude proposes as a fix
- Click Compare Changes in a merge conflict to see a better diff (tip: Change the setting `"merge-conflict.diffViewPosition": "Below"`)
- Read the diff and decide if you want to accept the changes, by clicking Accept Current Change or Accept Incoming Change

LIMITATIONS: The diff viewer doesn't get updated/closed when you accept the changes, but you can scroll to the next change.

### From time to time you should delete the `.claude/session/_.md_" files, to reset the history of reviews.
