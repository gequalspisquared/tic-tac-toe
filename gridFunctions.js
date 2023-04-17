// clamp number 
// const clamp = (num, min, max) => {
//     if (num < min) return min;
//     if (num > max) return max;
//     return num;
// };

// random number in a range
const randomInt = (min, max) => {
    const diff = max - min;
    return Math.floor(Math.random()*diff) + min;
}

// remove all children elements from parent element
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}

// what the cell should do
function cellFunctionality(e) {
    const cell = e.target;
    const r = randomInt(0, 255);
    const g = randomInt(0, 255);
    const b = randomInt(0, 255);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// adds event listeners to each cell
function addCellFunctionality(eventType) {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => cell.addEventListener(eventType, 
        cellFunctionality));
}

// remove all children from container and append a new grid
function createEmptyGrid(rows, cols = rows) {
    // reset the grid
    removeAllChildren(container);

    // create default cell
    const cell = document.createElement('div');
    cell.style.backgroundColor = 'white';
    cell.style.borderStyle = 'dotted';
    cell.style.borderWidth = '1px';
    cell.style.borderColor = 'black';
    cell.style.cursor = 'pointer';

    // create grid of cells and append it to the container
    const grid = [...Array(rows)].map(_ => Array(cols).fill(null)); // matrix
    for (let i = 0; i < rows; i++)       // rows
        for (let j = 0; j < cols; j++) { // cols
            grid[i][j] = cell.cloneNode(true);
            grid[i][j].classList.add('cell');
            container.appendChild(grid[i][j]);
        }
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    addCellFunctionality('mouseover');
}

function resetGrid(min, max) {
    let newSize = NaN;
    while (isNaN(newSize)) {
        newSize = parseInt(prompt("Enter new grid size:", 16));
    }
    newSize = clamp(newSize, min, max);

    createEmptyGrid(newSize);
}
