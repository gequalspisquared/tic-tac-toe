const NO_MOVE = '0';
const MOVE_P1 = '1';
const MOVE_P2 = '2';
let   PLAYER: number = 1;

class Gameboard {
    board: number[][];

    constructor() {
        this.board = [];

        for (let i = 0; i < 3; i++) {
            this.board[i] = [];
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    reset(): void {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
        }
    }

    check_win(): boolean {
        // rows
        for (let row = 0; row < 3; row++) {
            if (this.board[row][0] == 0) { break; }
            if (this.board[row][0] == this.board[row][1] && 
                this.board[row][0] == this.board[row][2]) {
                console.log("Won (row)");
                return true;
            }
        }

        // cols
        for (let col = 0; col < 3; col++) {
            if (this.board[0][col] == 0) { break; }
            if (this.board[0][col] == this.board[1][col] && 
                this.board[0][col] == this.board[2][col]) {
                console.log("Won (col)");
                return true;
            }
        }

        // diagonals
        if (this.board[1][1] != 0) {
            if (this.board[0][0] == this.board[1][1] && 
                this.board[0][0] == this.board[2][2]) {
                console.log("Won (diag)");
                return true;
            }

            if (this.board[2][0] == this.board[1][1] && 
                this.board[2][0] == this.board[0][2]) {
                console.log("Won (diag)");
                return true;
            }
        }

        return false;
    }

    check_game_over(): boolean {
        let tie = true;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (this.board[row][col] == 0) {
                    tie = false;
                    break;
                }
            }
            if (!tie) { break; }
        }
        if (tie) { console.log("Game is a tie"); }
        return this.check_win() || tie;
    }

    // true = success, false = failure
    make_move(container: HTMLDivElement, row: number, col: number, player: number): boolean {
        if (this.board[row][col] != 0) {
            console.log("A move has already been made here!");
            return false;
        }

        this.board[row][col] = player;
        container.dataset.move = player.toString();
        container.style.backgroundImage = (player == 1) ? 'url("./x.png")' : 'url("./o.png")';
        if (this.check_game_over()) {
            this.reset(); // WARNING: RESET IS NOT COUPLED TO DOM
        }
        return true;
    }
}

// class DisplayController {
//     head_container: HTMLDivElement;
// }

function update_display(head: HTMLDivElement, gameboard: Gameboard): void {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = head.querySelector(`[data-row="${row}"][data-col="${col}"]`) as HTMLDivElement;
            // cell.style.backgroundColor = 'red';
        }
    }
}

let GAMEBOARD = new Gameboard();

const index_to_rc = (index: number): number[] => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
}

const clamp = (num: number, min: number, max: number): number => {
    if (num < min) return min;
    if (num > max) return max;
    return num;
};

const random_int = (min: number, max: number): number => {
    const diff = max - min; 
    return Math.floor(Math.random() * diff) + min;
};

function remove_all_children(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild as ChildNode);
    }
}

function cell_functionality(e: Event) {
    const cell = e.target as HTMLDivElement;
    // const r = random_int(0, 255);
    // const g = random_int(0, 255);
    // const b = random_int(0, 255);
    // cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    const row = parseInt(cell.dataset.row as string);
    const col = parseInt(cell.dataset.col as string);
    GAMEBOARD.make_move(cell, row, col, PLAYER);
    PLAYER = (PLAYER == 1) ? 2 : 1;
}

function add_cell_functionality(container: HTMLDivElement, event_type: string): void {
    const cells = container.childNodes;

    cells.forEach(cell => cell.addEventListener(event_type, cell_functionality));
}
    
function create_empty_grid(container: HTMLDivElement, rows: number, cols: number = rows): void {
    console.log("Creating empty grid");
    // reset grid
    remove_all_children(container);

    // create default cell
    const cell = document.createElement('div');
    cell.dataset.move = NO_MOVE;
    cell.style.backgroundColor = 'white';
    cell.style.borderStyle = 'dotted';
    cell.style.borderWidth = '1px';
    cell.style.borderColor = 'black';
    cell.style.cursor = 'pointer';
    cell.classList.add('cell');

    // create grid of cells and append it to the original head div
    const grid: HTMLDivElement[][] = [...Array<HTMLDivElement>(rows)].map(_ => Array<HTMLDivElement>(cols));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = cell.cloneNode(true) as HTMLDivElement;
            grid[i][j].dataset.row = i.toString();
            grid[i][j].dataset.col = j.toString();
            container.appendChild(grid[i][j]);
        }
    }
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    add_cell_functionality(container, 'mouseover');
    update_display(container, GAMEBOARD);
}
