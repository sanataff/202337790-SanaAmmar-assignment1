# AI Usage Report

**Student:** Sana Ammar  
**Student ID:** 202337790  
**Assignment:** SWE363 — Assignment 2 (Interactive Features)

## How I used AI

I used the OpenCode AI coding agent (DeepSeek V4.1 Flash) as a helper while
building this project. I asked it to help move my original portfolio from plain
HTML, CSS and JavaScript to React, Vite and TypeScript. It also helped me draft
components, styles, custom hooks and this documentation.

I reviewed the suggestions as I worked. I changed or removed parts that did
not fit the project, and checked the finished work with the 
production build.

## What AI helped me with

AI helped me plan how to split the site into components such as `Header`,
`About`, `Projects`, `Repositories` and `Contact`. It also helped draft the
project search, filters and sorting, expandable cards, theme toggle, contact
form validation, and the hooks used for saved settings and scroll animations.

I also used it to work through TypeScript  errors and to create the
light and dark colour styles, responsive layouts and animations.

Some examples of the prompts I used:

- “Move my portfolio to React and TypeScript while keeping its content and
  simple design.”
- “Let visitors search, filter and sort projects, and expand a card to read
  more.”
- “Help me understand and fix this TypeScript build error.”

## Benefits and challenges

AI helped me get a first version of the site in place faster and gave me a
useful way to think through how to organise the components. It was also helpful
when I needed an explanation for an error or wanted to compare possible
solutions.
It helped me create sophisticated components, like the "jump to top" component. 
It helped me integrate the ui component "darawbly"
It helped me experiment with different layouts and color combinations quickly 

The suggestions were not always right. For example, some names did not match
between files, and an early version updated state inside an effect in a way
that ESLint flagged. I had to check the code, understand the issues and decide
what to change. AI also missed details that mattered to this project, such as
making it clear that the contact form does not actually send a message.

## Changes I made

I made the naming consistent across components and hooks. I removed an unused implementation and a
broken GitHub icon. I also changed the form confirmation so it does not imply
that a message was sent.

## How I checked the work

I ran `npm run build` and the linter. I also checked how the interactive
features should behave, including project search and filters, theme
preferences, form validation and repository loading states. Finally, I
reviewed the layout at desktop and mobile widths.

AI suggestions were a starting point, not a substitute for my own decisions.
I reviewed the code I kept and can explain how the features work and how they
meet the assignment requirements.
