# Ping Pong Game

A simple ping pong game built with vanilla JavaScript, HTML, and CSS.

## How to Play

1. Player 1 (left paddle) uses W and S keys to move up and down
2. Player 2 (right paddle) uses Arrow Up and Arrow Down keys
3. Score points when the ball passes the opponent's paddle

## Live Demo

You can play the game online :[Here](https://cyx977.github.io/genpingpong/)

## Features

- Two-player gameplay
- Real-time paddle movement
- Ball physics with collision detection
- Score tracking
- Power-ups system:
  - Split Ball: Creates two additional balls when collected
  - Speed Boost: Temporarily increases ball speed
- Responsive design
- No external libraries or dependencies

## Setup Instructions

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/YOUR-USERNAME/ping-pong-game.git
   ```

2. Open `index.html` in your browser

### GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

To set up:

1. Push this code to a GitHub repository
2. Go to your repository settings
3. Enable GitHub Pages under "Pages" section
4. Select "GitHub Actions" as the source
5. The game will be deployed automatically when you push to the main branch

## Project Structure

- `index.html` - Game structure
- `style.css` - Game styling
- `game.js` - Game logic
- `blog.md` - Blog post about the implementation
- `image.png` - Game screenshot
- `game.png` - Game interface screenshot
- `copy.png` - Code structure screenshot
- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment

## Development Process

This game was created with the assistance of an AI tool. The development process included:

1. Initial game implementation with core mechanics
2. Documentation through blog post and README
3. Setup of automated deployment with GitHub Actions

## License

This project is open source and available under the MIT License.