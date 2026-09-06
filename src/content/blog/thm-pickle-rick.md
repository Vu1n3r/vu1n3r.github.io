---
title: 'Pickle Rick — from a page source comment to root'
date: 2026-02-11
author: 'Example Member'
tags: ['web', 'thm', 'enumeration', 'sudo']
ctf: 'TryHackMe'
difficulty: easy
---

## Summary

Pickle Rick is a beginner TryHackMe box built around a single idea: read
everything the server hands you. Credentials sit in an HTML comment and in
`robots.txt`, the "portal" behind them runs arbitrary commands, and the final
step is a `sudo -l` that returns `ALL`. No exploit code needed — the whole box
is enumeration discipline.

## Reconnaissance

Two open ports, nothing exotic:

```bash
nmap -sC -sV -oN nmap/initial 10.10.10.10
```

```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.2p2 Ubuntu
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
```

The landing page is a single static page. The interesting part is not rendered:

```html
<!-- Note to self, remember username! Username: R1ckRul3s -->
```

Half a credential pair. The other half needs a directory sweep:

```bash
gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt -x php,txt
```

`/robots.txt` holds one line — `Wubbalubbadubdub` — which reads like a joke
and is in fact the password. `/login.php` accepts both.

## Foothold

The portal exposes a command box. It is not a shell; it is `system()` with a
blocklist, and `cat` is on it. That blocklist only covers literal strings, so
anything that reads a file by another name works:

```bash
less Sup3rS3cretPickl3Ingred.txt
```

The reasoning that matters here: when a filter blocks a *command name*, look
for a different binary with the same capability rather than trying to escape
the filter. `less`, `more`, `head`, `tail`, `nl`, `strings` all read files.

Second ingredient is in `/home/rick`:

```bash
ls -la /home/rick && less '/home/rick/second ingredients'
```

## Privilege escalation

Anticlimactic, and worth internalising anyway — always run this first:

```bash
sudo -l
```

```
(ALL) NOPASSWD: ALL
```

```bash
sudo less /root/3rd.txt
```

## Lessons learned

- View source and `robots.txt` before any tooling. Both were faster than
  gobuster here and both held a credential.
- A command blocklist filters names, not capabilities. Enumerate the binaries
  that do the same job.
- `sudo -l` costs one second. Run it the moment you land.
