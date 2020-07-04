const flash = (sketch) => {

    let canvas;
    let duration = 1000;
    let backgroundColor = sketch.color(255, 255, 255);

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '100');

        sketch.frameRate(30);
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = () => {
        sketch.clear();
        
        sketch.background(backgroundColor);

        backgroundColor.setAlpha(128 + 128 * -sketch.sin(sketch.millis() / 1000));
        
        if (sketch.millis()>= duration) {
            sketch.end();
        }
    }

    sketch.end = () => {
        sketch.remove();
    }
}