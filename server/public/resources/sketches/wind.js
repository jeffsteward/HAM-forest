const wind = (sketch) => {

    let canvas;
    let seeds = [];

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        sketch.frameRate(30);

        for (let index = 0; index < 40; index++) {

            let seed = {
                position: sketch.createVector(0, sketch.random(0, sketch.windowHeight)),
                velocity: sketch.createVector(sketch.random(10, 65), 0),
                size: sketch.random(2, 8),
                color: sketch.color(sketch.random(175, 255),sketch.random(175, 255),sketch.random(175, 255), 255),
                lifeSpan: 255
            };

            seeds.push(seed);        
        }
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = () => {
        sketch.clear();

        seeds.forEach(seed => {
            seed.lifeSpan -= 2;
            seed.position.add(seed.velocity);
            seed.color.setAlpha(seed.lifeSpan);

            sketch.noStroke();
            sketch.fill(seed.color);
            sketch.rect(seed.position.x, seed.position.y, seed.size, seed.size);
        });
    }
};