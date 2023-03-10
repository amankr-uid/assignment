import React from 'react';
import '../assets/Square.css';

function Square({ width, height, colors }) {
  // Create an array of cells based on the width and height
  const cells = [];
  for (let i = 0; i < width * height; i++) {
    cells.push(<div key={i} className="cell" />);
  }

  // Generate an array of unique color classes based on the number of colors requested
  const colorClasses = [];
  for (let i = 0; i < colors; i++) {
    colorClasses.push(`color-${i}`);
  }

  return (
    <div className="square">
      {cells.map((cell, index) => {
        // Assign a random color class to each cell
        const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)];
        return React.cloneElement(cell, { key: index, className: `${cell.props.className} ${randomColorClass}` });
      })}
    </div>
  );
}

export default Square;
