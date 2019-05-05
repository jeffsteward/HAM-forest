const trees = [];
let socket;

function setup() {
    socket = io('/forest');
    socket.on("create-tree", createTree);

    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    for (let tree of trees) {
        tree.render();
    }
}

function drawTree(leaf, branch) {
    trees.push(new Tree(random(0,width), height, random(100, height/1.5), leaf, branch));
}

function createTree(data) {
    console.log(data);
    drawTree(data.leaf, data.branch);
}