project-root/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── server.ts
│   │   └── database.ts
│   └── package.json
│
├── shared/ (optional but tiny)
│   └── types.ts
│
└── package.json

| FILE/FOLDER    | PURPOSE                | NOTES                     |
| -------------- | ---------------------- | ------------------------- |
| `/client`      | React frontend         | Vite + TS                 |
| `/server`      | Express + Mongoose API | fastest for your timeline |
| `package.json` | workspace + scripts    | Monorepo-compatible       |


DAY 1 (Today)
🚀 Goal: Full Backend MVP Working

Set up repo + monorepo

Create models & routes

Implement controllers:

createGarden

getGardens

addSeed

addTask

(optional) deletions

Test routes in Postman

MVP backend DONE.

DAY 2 (Tomorrow)
🚀 Goal: Full Frontend MVP Working

Build card UI (hardcode sample data first)

Integrate API calls

GardenList → GardenCard → SeedCard working

User can:

create garden

add seed

add tasks

delete tasks (flower animation optional)

MVP UI DONE.

DAY 3 (Thursday)
🚀 Goal: Polish + Presentation

Add loading + empty states

Basic CSS

Replace seed → flower when tasks complete

Add minimal tests (Vitest)

Submit Thursday night

DONE.
