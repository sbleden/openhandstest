# Snake Game

A simple Snake game implementation using Angular and HTML Canvas.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd snake-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## How to Play

- Use the arrow keys to control the snake's direction
- Collect the red food squares to grow the snake and increase your score
- Avoid hitting the walls or the snake's own body
- The game automatically restarts when you lose

## Game Features

- Responsive canvas-based rendering
- Score tracking
- Collision detection
- Automatic game restart on collision
- Smooth snake movement

## Development

To make changes to the project:

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Run the development server to test:
```bash
ng serve
```

4. Commit and push your changes:
```bash
git add .
git commit -m "Your commit message"
git push origin feature/your-feature-name
```

## Project Structure

- `src/app/app.component.ts` - Main game logic and rendering
- `src/app/app.module.ts` - Angular module configuration
- `src/styles.css` - Global styles
- `src/index.html` - HTML entry point