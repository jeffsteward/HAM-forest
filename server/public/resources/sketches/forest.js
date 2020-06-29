const forest = (sketch) => {

    let canvas;
    let soundOn = false;
    let ambientSound;
    const trees = [];

    sketch.preload = () => {
        ambientSound = sketch.loadSound('/resources/audio/forest-ambient.mp3');
        ambientSound.setLoop(true);
    }

    sketch.setup = () => {
        socket.on("cast", sketch.createTree);
        socket.on("play-audio", sketch.playAudio);
        socket.on("mute-audio", sketch.muteAudio);

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

        if (soundOn) {
            sketch.fill(122);
            sketch.text('Sound on', 10, 20);
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

    sketch.playAudio = (data) => {
        soundOn = true;

        ambientSound.play();
        ambientSound.setVolume(1.0, 2.0);

        console.log('play-audio');
    }

    sketch.muteAudio = (data) => {
        soundOn = false;

        ambientSound.setVolume(0.0, 2.0);
        ambientSound.pause(2.0);

        console.log('mute-audio');
    }

    sketch.keyTyped = () => {
        if (sketch.key === 's') {
            trees.length = 0;
        }
        // prevent any default browser behavior
        return false;
    }
};