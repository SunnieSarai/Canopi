│
├── client/
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── GardenList.tsx
│   │   │   ├── GardenCard.tsx
│   │   │   ├── SeedCard.tsx
│   │   │   ├── TaskItem.tsx
│   │   └── api/
│   │       └── api.ts
│   └── vite.config.ts
│
├── server/
│   ├── server.ts
│   ├── db/
│   │   └── connect.ts
│   ├── models/
│   │   └── Garden.ts
│   ├── controllers/
│   │   └── gardenController.ts
│   └── routes/
│       └── gardenRoutes.ts
│
└── package.json
| FILE/FOLDER    | PURPOSE                | NOTES                     |
| -------------- | ---------------------- | ------------------------- |
| `/client`      | React frontend         | Vite + TS                 |
| `/server`      | Express + Mongoose API | fastest for your timeline |
| `package.json` | workspace + scripts    | Monorepo-compatible       |


Day 1: Server scaffold + core endpoints

server.ts → start Express

connect.ts → MongoDB connection

models → Garden with nested Seeds and Tasks

controllers → stub functions for createGarden, getGardens, addSeed, addTask, deleteTask

routes → wire endpoints to stubs

Goal by end of Day 1: Running server, endpoints respond (even if just stubs)


server/
├── package.json
├── tsconfig.json
├── .env                     # store MONGO_URI and other secrets
├── src/
│   ├── server.ts            # entry point: sets up Express, middleware, routes
│   ├── db/
│   │   └── connect.ts       # establishes MongoDB connection
│   ├── models/
│   │   └── Garden.ts        # Mongoose schema for Garden → Seeds → Tasks
│   ├── controllers/
│   │   └── gardenController.ts  # functions handling CRUD operations
│   └── routes/
│       └── gardenRoutes.ts  # Express routes that call controller functions
└── dist/                     # compiled JS after tsc
