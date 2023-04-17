// grab container to place cells in
const container = document.querySelector('.grid-container');

// create grid of cells with default size
createEmptyGrid(16);
const resizeButton = document.querySelector('.resize-button');
resizeButton.addEventListener('click', () => resetGrid(2, 100));