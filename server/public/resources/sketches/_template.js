const template = (sketch) => {

    let canvas;

    sketch.preload = () => {
        // preload data and assets here
    }

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        sketch.frameRate(30);
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = () => {
        sketch.clear();

        // draw the animation here
    }

    sketch.end = () => {
        sketch.remove();
    }    
}