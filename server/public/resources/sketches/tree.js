class Tree {
    constructor(sketch, x, y, size, data) {
        this._sketch = sketch;

        this.ready = false;

        this.position = sketch.createVector(x, y);
        this.size = 0;
        this.fullSize = size;
        this.thickness = size/10;
        this.leafImageURL = data.leaf;
        this.branchImageURL = data.branch;
        this.lean = sketch.random(0.30, 7.0);
        this.rotationFactor = sketch.random(30.0, 65.0);
        this.theta = 0.0;
        this.angleOfMovement = 0.0;
        this.lifeSpan = 0;
        this.maximumAge = 0;
        this.isAlive = false;

        sketch.loadImage(this.leafImageURL, img => {
            this.leaf = img;

            sketch.loadImage(this.branchImageURL, img => {
                this.branch = img;

                sketch.loadJSON('/data/object/' + data.objectID, (objectData) => {
                    if (objectData.totalpageviews < 250) {
                        this.maximumAge = objectData.totalpageviews*50;
                    } else if (objectData.totalpageviews < 500) {
                        this.maximumAge = objectData.totalpageviews*20;
                    } else if (objectData.totalpageviews < 1000) {
                        this.maximumAge = objectData.totalpageviews*10;
                    } else {
                        this.maximumAge = objectData.totalpageviews;
                    }
                    this.ready = true;
                });
            });
        });
    }

    createBranch(h, t) {
        // Each branch will be 2/3rds the size of the previous one
        h *= 0.66;  // Height
        t *= 0.66;  // Thickness
        
        // All recursive functions must have an exit condition!!!!
        // Here, ours is when the length of the branch is 10 pixels or less
        if (h > 10) {
          this._sketch.push();    // Save the current state of transformation (i.e. where are we now)
          this._sketch.rotate(this.theta);   // Rotate by theta      
          this._sketch.image(this.branch, 0, 0, t, -h);
          this._sketch.translate(0, -h); // Move to the end of the branch
          this.createBranch(h, t);       // Ok, now call myself to draw two new branches!!
          this._sketch.pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
          
          if (h < (this.size*0.66)*0.66) {
            this._sketch.push();
            this._sketch.rotate(this.theta);
            this._sketch.translate(0, -h);
            this._sketch.image(this.leaf, 0, 0, 2*this.thickness, 2*this.thickness);
            this._sketch.pop();
          }          
          
          // Repeat the same thing, only branch off to the "left" this time!
          this._sketch.push();
          this._sketch.rotate(-this.theta/this.lean);
          this._sketch.image(this.branch, 0, 0, t, -h);
          this._sketch.translate(0, -h);
          this.createBranch(h, t);
          this._sketch.pop();      
          
          if (h < (this.size*0.66)*0.66) {
            this._sketch.push();
            this._sketch.rotate(-this.theta/this.lean);
            this._sketch.translate(0, -h);
            this._sketch.image(this.leaf, 0, 0, 1.25*this.thickness, 1.25*this.thickness);
            this._sketch.pop();
          }
        }
    }  

    update() {
        this.lifeSpan +=0.5;
        
        // This controls the pace of spread
        this.angleOfMovement = (this._sketch.map(this.lifeSpan,0,this._sketch.windowWidth,400.0,600.0) / this._sketch.windowWidth) * 90.0;
 
        if (this.lifeSpan > this.maximumAge) {
            this.size -=0.85;
            this.thickness = this.size/10;
        } else {
            if (this.size < this.fullSize) {
                this.size +=0.85;
                this.thickness = this.size/10;
            }
        }

        this.isAlive = (this.size > 1);
    }

    render() {
        if (this.ready) {
            this.isAlive = true; 
            
            // Let's pick an angle 0 to 90 degrees based on the mouse position
            // let a = (map(mouseX,0,width,500.0,600.0) / width) * 90.0;
            // Convert it to radians
            this.theta = this._sketch.radians(this.angleOfMovement);    
            
            this._sketch.resetMatrix();    
            this._sketch.translate(this.position.x,this.position.y);
            
            this._drawInfoBox();

            // Draw a line 120 pixels
            this._sketch.image(this.branch, 0, 0, this.thickness, -this.size);
            // Move to the end of that line
            this._sketch.translate(0,-this.size);
            // Start the recursive branching!
            this.createBranch(this.size, this.thickness);
        }
    }

    _drawInfoBox() {
        const buffer = 10;
        this._sketch.fill(122);
        this._sketch.text("Max Age: " + this.maximumAge, this.thickness + buffer, -buffer*3);
        this._sketch.text("Current Age: " + this.lifeSpan, this.thickness + buffer, -buffer);
    }

}