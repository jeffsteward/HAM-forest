class Tree {
    constructor(x, y, size, leafImageURL, branchImageURL) {
        this.ready = false;

        this.position = createVector(x, y);
        this.size = size;
        this.thickness = size/10;
        this.leafImageURL = leafImageURL;
        this.branchImageURL = branchImageURL;
        this.lean = random(0.30, 7.0);
        this.rotationFactor = random(30.0, 65.0);
        this.theta = 0.0;

        loadImage(this.leafImageURL, img => {
            this.leaf = img;

            loadImage(this.branchImageURL, img => {
                this.branch = img;

                this.ready = true;
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
          push();    // Save the current state of transformation (i.e. where are we now)
          rotate(this.theta);   // Rotate by theta      
          image(this.branch, 0, 0, t, -h);
          translate(0, -h); // Move to the end of the branch
          this.createBranch(h, t);       // Ok, now call myself to draw two new branches!!
          pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
          
          push();
          rotate(this.theta);
          translate(0, -h);
          image(this.leaf, 0, 0, 20, 20);
          pop();
          
          
          // Repeat the same thing, only branch off to the "left" this time!
          push();
          rotate(-this.theta/this.lean);
          image(this.branch, 0, 0, t, -h);
          translate(0, -h);
          this.createBranch(h, t);
          pop();      
          
          push();
          rotate(-this.theta/this.lean);
          translate(0, -h);
          image(this.leaf, 0,0,20, 20);
          pop();
        }
    }  

    render() {
        if (this.ready) {
            // Let's pick an angle 0 to 90 degrees based on the mouse position
            let a = (map(mouseX,0,width,500.0,600.0) / width) * 90.0;
            // Convert it to radians
            this.theta = radians(a);    
            
            resetMatrix();    
            translate(this.position.x,this.position.y);
            
            // Draw a line 120 pixels
            image(this.branch, 0, 0, this.thickness, -this.size);
            // Move to the end of that line
            translate(0,-this.size);
            // Start the recursive branching!
            this.createBranch(this.size, this.thickness);
        }
    }

}