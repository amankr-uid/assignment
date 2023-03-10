import React from 'react';
import Square from './components/Square';

function App() {
  const { size, color } = findBiggestArea(10, 10, 4);
  return (
    <div>
      <Square width={10} height={10} colors={4} />
      <p>Size of biggest area: {size}</p>
      <p>Color of biggest area: {color}</p>
    </div>
  );
}
function findBiggestArea(width, height, colors) {
  // Generate the initial grid with random colors
  const grid = generateGrid(width, height, colors);

  let maxArea = 0;
  let maxColor = '';

  // Iterate through each cell in the grid
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const color = grid[i][j];

      // Skip cells that have already been counted
      if (color === null) {
        continue;
      }

      // Use flood fill to count the size of the area with the same color
      const area = floodFill(grid, i, j, color);

      // Update the max area and max color if a larger area is found
      if (area > maxArea) {
        maxArea = area;
        maxColor = color;
      }
    }
  }

  return { size: maxArea, color: maxColor };
}

function generateGrid(width, height, colors) {
  const grid = [];

  for (let i = 0; i < width; i++) {
    const row = [];
    for (let j = 0; j < height; j++) {
      const randomColor = Math.floor(Math.random() * colors);
      row.push(`color-${randomColor}`);
    }
    grid.push(row);
  }

  return grid;
}

function floodFill(grid, x, y, color) {
  // If the cell is out of bounds or has a different color, stop the flood fill
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== color) {
    return 0;
  }

  // Mark the current cell as counted
  grid[x][y] = null;

  // Recursively flood fill neighboring cells
  return (
    1 +
    floodFill(grid, x + 1, y, color) +
    floodFill(grid, x - 1, y, color) +
    floodFill(grid, x, y + 1, color) +
    floodFill(grid, x, y - 1, color)
  );
}


export default App;
