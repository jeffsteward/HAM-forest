const spill = (sketch) => {

    let canvas;
    let seeds = [];
    let delay = 30;

    let images = [
        'https://ids.lib.harvard.edu/ids/iiif/429034324',
        'https://ids.lib.harvard.edu/ids/iiif/43182690',
        'https://ids.lib.harvard.edu/ids/iiif/17825737',
        'https://ids.lib.harvard.edu/ids/iiif/423290977',
        'https://ids.lib.harvard.edu/ids/iiif/10834146',
        'https://ids.lib.harvard.edu/ids/iiif/18712299',
        'https://ids.lib.harvard.edu/ids/iiif/18721341',
        'https://ids.lib.harvard.edu/ids/iiif/47613538',
        'https://ids.lib.harvard.edu/ids/iiif/20027911',
        'https://ids.lib.harvard.edu/ids/iiif/18742693',
        'https://ids.lib.harvard.edu/ids/iiif/47662717',
        'https://ids.lib.harvard.edu/ids/iiif/18481928',
        'https://ids.lib.harvard.edu/ids/iiif/20409466',
        'https://ids.lib.harvard.edu/ids/iiif/20224469',
        'https://ids.lib.harvard.edu/ids/iiif/17804325',
        'https://ids.lib.harvard.edu/ids/iiif/43182306',
        'https://ids.lib.harvard.edu/ids/iiif/444158505',
        'https://ids.lib.harvard.edu/ids/iiif/445832293',
        'https://ids.lib.harvard.edu/ids/iiif/43315352',
        'https://ids.lib.harvard.edu/ids/iiif/18204668',
        'https://ids.lib.harvard.edu/ids/iiif/43534078',
        'https://ids.lib.harvard.edu/ids/iiif/18722661',
        'https://ids.lib.harvard.edu/ids/iiif/18731184',
        'https://ids.lib.harvard.edu/ids/iiif/43183951',

    ]

    sketch.setup = () => {
        canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '-1');

        sketch.frameRate(30);

        for (let index = 0; index < images.length; index++) {
            let size = sketch.round(sketch.random(5,35));
            url = images[index] + '/full/!' + sketch.str(size) + ',' + sketch.str(size) + '/0/default.jpg'
            sketch.loadImage(url, img => {
                sketch.image(img, sketch.random(0, sketch.windowWidth), sketch.random(0, sketch.windowHeight));
            })     
        }

        sketch.noLoop();
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
    }

    sketch.draw = () => {
    }

};