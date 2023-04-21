"use strict";
class Gameboard {
    constructor() {
        this.board = [];
        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
        }
    }
    check_win() {
        // rows
        for (let row = 0; row < 3; row++) {
            if (this.board[row][0] == this.board[row][1] &&
                this.board[row][0] == this.board[row][2]) {
                return true;
            }
        }
        // cols
        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] == this.board[1][col] &&
                this.board[0][col] == this.board[2][col]) {
                return true;
            }
        }
        // diagonals
        if (this.board[0][0] == this.board[1][1] &&
            this.board[0][0] == this.board[2][2]) {
            return true;
        }
        if (this.board[2][0] == this.board[1][1] &&
            this.board[2][0] == this.board[0][2]) {
            return true;
        }
        return false;
    }
    // true = success, false = failure
    make_move(player, move) {
        if (move > 8 || move < 0) {
            return false;
        }
        const [row, col] = index_to_rc(move);
        if (this.board[row][col] != 0) {
            return false;
        }
        this.board[row][col] = player;
        return true;
    }
}
const index_to_rc = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
};
const clamp = (num, min, max) => {
    if (num < min)
        return min;
    if (num > max)
        return max;
    return num;
};
const random_int = (min, max) => {
    const diff = max - min;
    return Math.floor(Math.random() * diff) + min;
};
function remove_all_children(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}
function cell_functionality(e) {
    const cell = e.target;
    const r = random_int(0, 255);
    const g = random_int(0, 255);
    const b = random_int(0, 255);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
function add_cell_functionality(container, event_type) {
    const cells = container.childNodes;
    cells.forEach(cell => cell.addEventListener(event_type, cell_functionality));
}
function create_empty_grid(container, rows, cols = rows) {
    console.log("Creating empty grid");
    // reset grid
    remove_all_children(container);
    // create default cell
    const cell = document.createElement('div');
    cell.style.backgroundColor = 'white';
    cell.style.borderStyle = 'dotted';
    cell.style.borderWidth = '1px';
    cell.style.borderColor = 'black';
    cell.style.cursor = 'pointer';
    cell.classList.add('cell');
    // create grid of cells and append it to the original head div
    const grid = [...Array(rows)].map(_ => Array(cols));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = cell.cloneNode(true);
            container.appendChild(grid[i][j]);
        }
    }
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    add_cell_functionality(container, 'mouseover');
}
