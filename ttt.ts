// Board layout
//
//  0 | 1 | 2 
//  ---------
//  3 | 4 | 5
//  ---------
//  6 | 7 | 8

class Gameboard {
    board: number[][];

    constructor() {
        for (let i = 0; i < 3; i++) {
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

    make_move(player: number, move: number): void {
        if (move > 8 || move < 0) { return; }

        const [row, col] = index_to_rc(move);

        if (this.board[row][col] != 0) { return; }

        this.board[row][col] = player;
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

function remove_all_children(parent: Node) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild as ChildNode);
    }
}
