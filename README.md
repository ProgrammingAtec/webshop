# Webshop demo
## Project Goals
- [X] Recovering after work burnout. Get rainforced as project builder
- [X] Try New code style (non BEM-Yandex based) - SCSS nested blocks, css combinators over assigning unused classes
- [X] Try new architecture approach. Determine new component as universal only if it is used over 1 time and there is no vertical growth (class increse).
Not to just simplify template
- [X] Rainforce mobile layout
- [X] Correct HTML5 markup according to https://html.spec.whatwg.org/ (May 21 2021) for Screen Readers and Searching Robots
- [X] Learn designing (Figma)
- [X] Dig deeper into angular internals

## Device order (by priority): mobile, desktop, tablet

## Code style
- See Martin Fowler Clean Code, Refactoring
- Keep templates as small as possible (no unused classes, no unnecessary nested tags)
- Keep SCSS in nested blocks (readability, no collisiions)

### Credits
Project belongs to me and my friend Alexander Duvanov. We decided to practice together. I responsible for Angular Frontend.
Alexander is responsible for ASP.NET Backend. Current repo was forked into two. Basically they are always in synk. We did it because of CV purposes

### Run frontend
There are two ways
- frontend only (there is no backend depending yet)
    - copy repo
    - change current directory on ```Webshop/frontend```
    - run ```npm install```
    - run ```npm start``` or ```ng serve```
    - check ```localhost:4200/```
- docker
    - login DockerHub (https://hub.docker.com/)
    - find my repo ```RepoName``` (link)
