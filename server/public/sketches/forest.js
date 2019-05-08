const trees = [];
let socket;
let age = 500; 

function setup() {
    socket = io('/forest');
    socket.on("create-tree", createTree);

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

function drawTree(data) {
    trees.push(new Tree(random(0,width), height, random(100, height/1.70), data));
}

function createTree(data) {
    // incoming data looks like
    //   {leaf: "IMAGE_URL", branch: "IMAGE_URL", objectID: 000000}
    drawTree(data);
}