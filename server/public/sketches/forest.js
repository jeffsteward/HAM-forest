const trees = [];
let socket;
let age = 500; 

function setup() {
    socket = io('/forest');
    socket.on("create-tree", createTree);
    socket.on("id", drawWelcomeMessage);

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

function drawWelcomeMessage(data) {
    window.location.hash = data.id;
    let controllerUrl = "/controller#" + data.id;
    let l = createA(controllerUrl, "There is a small grafting bench here.", "_blank");
    l.id("launchBench");
    l.position(100, height/2-50);
    l.attribute("onclick", "let e=document.getElementById('launchBench');e.remove();");
}