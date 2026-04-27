🌿 Canopi
Grow your goals from seed to bloom
📖 Table of Contents
Overview

Tech Stack

How It Works

Getting Started

API Reference

Stretch Goals

Contributing

🌱 Overview
Canopi is a task management tool designed for people who think in layers. It helps you break overwhelming, large goals into small, actionable steps using a botanical metaphor.

text
Garden → Plot → Seed → Task
Garden: Your big life category (e.g., "Career", "Writing")

Plot: A meaningful goal within a garden (e.g., "Land a 6-Figure Job")

Seed: A short-term goal (e.g., "Strengthen LinkedIn Presence")

Task: The smallest actionable step (e.g., "Update profile headline")

When all tasks in a seed are completed, the seed blooms into a flower 🌸 — a small visual reward for progress.

🛠️ Tech Stack
Technology	Why It Was Chosen
TypeScript	Type safety across frontend and backend. Catches bugs early and makes the codebase maintainable as features grow.
React	Component-based UI. Perfect for nested structures like Garden → Plot → Seed → Task. Hooks make state management intuitive.
Vite	Blazing fast development server and build tool. Hot Module Replacement (HMR) makes UI iteration seamless.
Node.js + Express	Lightweight, event-driven backend. Handles RESTful API requests efficiently.
MongoDB + Mongoose	Flexible document-based database. Ideal for nested schemas (plots inside gardens, seeds inside plots, tasks inside seeds). No complex joins needed.
Tailwind CSS	Utility-first CSS framework. Allows rapid, consistent styling without leaving your JSX.
Lucide React	Clean, customizable icon set. Used for trash cans, plus signs, and checkmarks.
npm-run-all	Runs multiple npm scripts in parallel. Enables npm run dev to start both client and server simultaneously.
🧭 How It Works
User Flow
Create a Garden – Your big-picture category.

Add Plots – Break the garden into meaningful goals.

Plant Seeds – Short-term, achievable goals inside each plot.

Add Tasks – Tiny, actionable steps for each seed.

Complete Tasks – Check off tasks one by one.

Watch It Bloom – When all tasks in a seed are done, the seed turns into a flower! 🌸

Data Structure (MongoDB)
typescript
Garden {
  _id: ObjectId,
  name: string,
  plots: [{
    _id: ObjectId,
    name: string,
    seeds: [{
      _id: ObjectId,
      name: string,
      tasks: [{
        _id: ObjectId,
        text: string,
        completed: boolean
      }]
    }]
  }]
}
🚀 Getting Started
Prerequisites
Node.js (v18 or higher)

MongoDB (local or Atlas)

npm or yarn

Installation
bash
# Clone the repository
git clone https://github.com/yourusername/canopi.git
cd canopi

# Install root dependencies (for running both servers)
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Create a .env file in the server folder
echo "MONGO_URI=mongodb://localhost:27017/canopiDB" > .env
echo "PORT=3000" >> .env
Running the App
Development mode (both servers simultaneously):

bash
# From the root directory
npm run dev
Or run separately:

bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
Open http://localhost:5173

Building for Production
bash
# Build frontend
cd client
npm run build

# Build backend
cd ../server
npm run build

# Start production server
npm run start
📡 API Reference
Method	Endpoint	Description
GET	/api/gardens	Get all gardens
POST	/api/gardens	Create a new garden
DELETE	/api/gardens/:gardenId	Delete a garden
POST	/api/gardens/:gardenId/plots	Add a plot to a garden
DELETE	/api/gardens/:gardenId/plots/:plotId	Delete a plot
POST	/api/gardens/:gardenId/plots/:plotId/seeds	Add a seed to a plot
DELETE	/api/gardens/:gardenId/plots/:plotId/seeds/:seedId	Delete a seed
POST	/api/gardens/:gardenId/plots/:plotId/seeds/:seedId/tasks	Add a task to a seed
DELETE	/api/gardens/:gardenId/plots/:plotId/seeds/:seedId/tasks/:taskId	Delete a task
PATCH	/api/gardens/:gardenId/plots/:plotId/seeds/:seedId/tasks/:taskId/toggle	Toggle task completion
🌟 Stretch Goals
1. Edit Features
✏️ Edit Garden names

✏️ Edit Plot names

✏️ Edit Seed names

✏️ Edit Task text

📝 Inline editing (double-click to rename)

Implementation approach: Add PUT endpoints for each level, then add edit buttons or inline editing in the UI.

2. More Animations
🍃 Floating grass particles

🌸 Moving flower petals when tasks complete

🌱 Growing animation when adding a new seed

☁️ Soft cloud backgrounds that drift

Implementation approach: Use CSS keyframes + Framer Motion or React Spring for complex animations.

3. AI Brainstorming (Python Integration)
🤖 Natural language processing for goal breakdown

💡 AI suggests Plots based on Garden name

📊 Progress predictions based on completion rates vs. deadlines

🧠 "I'm feeling stuck" button that generates task ideas

Implementation approach:

Flask or FastAPI microservice in Python

Connect via REST API from Node backend

Use OpenAI API or open-source LLM

4. User Authentication (OAuth)
🔐 Sign in with Google / GitHub / Apple

👤 Personalized gardens per user

☁️ Cloud sync across devices

Implementation approach: Passport.js with OAuth strategies + JWT sessions.

5. "Fence" Feature (Visual Separation)
🪵 Wooden fence borders around each Garden

🌿 Trellis dividers between Plots

🪴 Distinct visual zones for each nesting layer

Implementation approach: Border images, CSS gradients, or SVG patterns applied to Garden and Plot cards.

Future Architecture Vision
text
Current: React + Node + MongoDB
                ↓
Phase 2: Add Python microservice for AI
                ↓
Phase 3: Add OAuth + User accounts
                ↓
Phase 4: Real-time sync with WebSockets
                ↓
Phase 5: Mobile app (React Native)
🤝 Contributing
Canopi is an open-source project. To contribute:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📄 License
MIT © Sara Iroberson

🙏 Acknowledgments
Botanical metaphor inspired by "chunking" techniques in neurodivergent productivity

Bloom animation inspired by the joy of small wins

Built with patience, caffeine, and a love for growth 🌱

Canopi — because every big goal starts as a small seed.


