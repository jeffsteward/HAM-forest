const forest = (sketch) => {

    let canvas;
    let soundOn = false;
    let ambientSound;
    let ambientSoundMaxVolume = 0.3;
    let snapshotFilename = 'forest-snapshot';
    const trees = [];

    sketch.preload = () => {
        ambientSound = sketch.loadSound('/resources/audio/forest-ambient.mp3');
        ambientSound.setVolume(ambientSoundMaxVolume);
        ambientSound.setLoop(true);
    }

    sketch.setup = () => {
        socket.on("cast", sketch.createTree);
        socket.on("play-audio", sketch.playAudio);
        socket.on("mute-audio", sketch.muteAudio);
        socket.on("clear", sketch.clearForest);
        socket.on("snapshot", sketch.saveSnapshot);

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
        xPos = sketch.random(0,sketch.windowWidth);
        yPos = sketch.random(sketch.windowHeight/2, sketch.windowHeight);
        trees.push(new Tree(sketch, xPos, yPos, sketch.random(100, sketch.windowHeight/2.10), soundOn, data));
    }

    sketch.createTree = (data) => {
        // incoming data looks like
        //   {leaf: "IMAGE_URL", branch: "IMAGE_URL", objectID: 000000}
        sketch.drawTree({leaf: data.annotations[0].imageUrl, branch: data.annotations[1].imageUrl, objectID: data.objectID});
    }

    sketch.playAudio = (data) => {
        soundOn = true;

        ambientSound.play();
        ambientSound.setVolume(ambientSoundMaxVolume, 2.0);

        for (let tree of trees) {
            if (tree.isAlive) {
                tree.setAudio(true);
            }
        }
    }

    sketch.muteAudio = (data) => {
        soundOn = false;

        ambientSound.setVolume(0.0, 2.0);
        ambientSound.pause(2.0);

        for (let tree of trees) {
            tree.setAudio(false);
        }
    }

    sketch.clearForest = () => {
        trees.length = 0;
    }

    sketch.saveSnapshot = () => {
        sketch.saveCanvas(canvas, snapshotFilename, 'png');
    }

    sketch.keyTyped = () => {
        if (sketch.key === 's') {
        }
        // prevent any default browser behavior
        return false;
    }
};