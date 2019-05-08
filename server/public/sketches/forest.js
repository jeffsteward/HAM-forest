const trees = [];
let socket;
let age = 500; 

function setup() {
    socket = io('/forest');
    socket.on("create-tree", createTree);

    if (getUrlVar("age") > 0) {age = getUrlVar("age");}

    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    for (let tree of trees) {
        tree.update();
        if (tree.isAlive) {
            tree.render();
        }
    }
}

function drawTree(leaf, branch) {
    trees.push(new Tree(random(0,width), height, random(100, height/1.70), leaf, branch, age));
}

function createTree(data) {
    console.log(data);
    drawTree(data.leaf, data.branch);
}