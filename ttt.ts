type Gameboard = {
    board: number[];
};

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


