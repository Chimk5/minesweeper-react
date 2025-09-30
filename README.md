# Minesweeper React

A classic Minesweeper game built with React.js, featuring the traditional Windows Minesweeper look and feel.

## Features

- **Classic Gameplay**: Traditional minesweeper rules with left-click to reveal and right-click to flag
- **Mine Counter**: Shows remaining mines (total mines minus flagged cells)
- **Timer**: Tracks elapsed time during gameplay
- **Game States**: Visual feedback for winning, losing, and playing states
- **Auto-reveal**: Automatically reveals adjacent cells when clicking on empty cells
- **Responsive Design**: Works on different screen sizes
- **Classic Windows Style**: Authentic retro Windows Minesweeper appearance

## How to Play

1. **Objective**: Reveal all cells that don't contain mines
2. **Left Click**: Reveal a cell
3. **Right Click**: Flag/unflag a cell (prevents accidental clicks)
4. **Numbers**: Show how many mines are adjacent to that cell
5. **First Click**: Never contains a mine (game generates mines after first click)
6. **Win Condition**: Reveal all non-mine cells
7. **Lose Condition**: Click on a mine

## Game Settings

- **Board Size**: 9x9 grid
- **Mine Count**: 10 mines
- **Difficulty**: Beginner level (can be easily modified in the code)

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Chimk5/minesweeper-react.git
   cd minesweeper-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you eject, you can't go back!**

## Project Structure

```
src/
├── components/
│   ├── Minesweeper.js    # Main game logic component
│   ├── Minesweeper.css   # Game styling
│   ├── Board.js          # Game board component
│   ├── Board.css         # Board styling
│   ├── Cell.js           # Individual cell component
│   └── Cell.css          # Cell styling
├── App.js                # Main app component
├── App.css               # App styling
├── index.js              # App entry point
└── index.css             # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **CSS3**: Classic Windows Minesweeper styling
- **JavaScript ES6+**: Modern JavaScript features

## Game Logic

The game implements the following core features:

- **Random Mine Placement**: Mines are placed randomly after the first click
- **Recursive Reveal**: Empty cells automatically reveal adjacent cells
- **Mine Detection**: Numbers show adjacent mine counts
- **Flag System**: Right-click to flag potential mines
- **Win/Loss Detection**: Game state management
- **Timer**: Elapsed time tracking

## Customization

You can easily modify the game settings in `src/components/Minesweeper.js`:

```javascript
// Game settings
const ROWS = 9;        // Board height
const COLS = 9;        // Board width  
const MINES = 10;      // Number of mines
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic Windows Minesweeper game
- Built with modern React practices and hooks
- Styled to match the nostalgic Windows 95/98 Minesweeper appearance