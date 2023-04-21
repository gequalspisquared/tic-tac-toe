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

    check_win(): boolean {
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
    make_move(player: number, move: number): boolean {
        if (move > 8 || move < 0) { return false; }

        const [row, col] = index_to_rc(move);

        if (this.board[row][col] != 0) { return false; }

        this.board[row][col] = player;
        return true;
    }
}

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
    const r = random_int(0, 255);
    const g = random_int(0, 255);
    const b = random_int(0, 255);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
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
            container.appendChild(grid[i][j]);
        }
    }
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`;
    add_cell_functionality(container, 'mouseover');
}
