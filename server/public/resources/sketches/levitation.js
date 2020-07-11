const levitation = (sketch) => {

    let canvas;
    let seeds = [];

    sketch.preload = () => {
        // preload data and assets here
    }

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        sketch.frameRate(30);

        for (let index = 0; index < 40; index++) {

            let seed = {
                position: sketch.createVector(sketch.random(0, sketch.windowWidth), sketch.windowHeight),
                velocity: sketch.createVector(0, -sketch.random(5, 10)),
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
            
            if (sketch.frameCount < 20) {
                seed.position.add(p5.Vector.div(seed.velocity, 10));                
            } else if (sketch.frameCount > 30 && sketch.frameCount < 75) {
                seed.position.add(p5.Vector.random2D());
            } else {
                seed.position.add(seed.velocity);
                seed.color.setAlpha(seed.lifeSpan);
            }

            sketch.noStroke();
            sketch.fill(seed.color);
            sketch.rect(seed.position.x, seed.position.y, seed.size, seed.size);
        });    
    }

    sketch.end = () => {
        sketch.remove();
    }    
}