---
# Copy this file to src/content/blog/your-post-name.md and fill it in.
# The filename becomes the URL: my-first-writeup.md -> /blog/my-first-writeup/
# Use kebab-case. Do not rename a post after it is published — links break.

# Required.
title: 'Machine or challenge name — what you did'

# Required. The day you finished it, not the day the CTF started.
date: 2026-01-01

# Required. Your name or your club handle. This is your portfolio credit.
author: 'Your Name'

# Required, at least one. Lowercase. Reuse existing tags where they fit —
# check /blog/tags to see what already exists.
tags: ['web', 'sqli']

# Optional. The event this came from. Omit for standalone study notes.
ctf: 'Event Name 2026'

# Required. One of: easy | medium | hard
difficulty: easy

# Optional, defaults to 'ar'. One of: ar | en
# Arabic is the club's primary language, so an ENGLISH writeup must set
# lang: en explicitly. 'ar' renders the article right-to-left. Code blocks
# and terminal output stay left-to-right either way — do not fix those by
# hand.
lang: ar

# Optional, defaults to false. true = not published, not built, not listed.
draft: true
---

## Summary

One paragraph, written for someone who has not touched this box. What is it,
what was the way in, what did you learn. Write this last.

## Reconnaissance

Show your commands. Use fenced blocks with a language so they get highlighted:

```bash
nmap -sC -sV -oN nmap/initial 10.10.10.10
```

Trim output to the lines that mattered. Nobody reads 200 lines of nmap.

## Foothold

Explain *why* you tried the thing, not just that it worked. The reasoning is
the part that transfers to the next box.

## Privilege escalation

## Lessons learned

What you would try first if you saw this pattern again.

---

## Before you open the PR

- [ ] Screenshots redacted — no other team's flags, no personal data
- [ ] No real credentials, API tokens, or internal IPs from anywhere but the lab
- [ ] The target is a legal practice target (THM/HTB/an event you entered)
- [ ] `npm run build` passes locally
- [ ] `draft: true` removed when you are ready to publish
