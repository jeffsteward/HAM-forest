const forest = (sketch) => {

    let canvas;
    const trees = [];

    sketch.setup = () => {
        socket.on("cast", sketch.createTree);

        sketch.textSize(20);

        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = () => {
        sketch.clear();

        for (let tree of trees) {
            tree.update();
            if (tree.isAlive) {
                tree.render();
            }
        }
    }

    sketch.drawTree = (data) => {
        trees.push(new Tree(sketch, sketch.random(0,sketch.windowWidth), sketch.windowHeight, sketch.random(100, sketch.windowHeight/2.10), data));
    }

    sketch.createTree = (data) => {
        // incoming data looks like
        //   {leaf: "IMAGE_URL", branch: "IMAGE_URL", objectID: 000000}
        sketch.drawTree({leaf: data.annotations[0].imageUrl, branch: data.annotations[1].imageUrl, objectID: data.objectID});
    }

    sketch.keyTyped = () => {
        if (sketch.key === 's') {
            trees.length = 0;
        }
        // prevent any default browser behavior
        return false;
    }
};