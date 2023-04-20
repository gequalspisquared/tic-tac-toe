// Board layout
//
//  0 | 1 | 2 
//  ---------
//  3 | 4 | 5
//  ---------
//  6 | 7 | 8
var clamp = function (num, min, max) {
    if (num < min)
        return min;
    if (num > max)
        return max;
    return num;
};
var random_int = function (min, max) {
    var diff = max - min;
    return Math.floor(Math.random() * diff) + min;
};
function remove_all_children(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
}
