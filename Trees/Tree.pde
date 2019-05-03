class Tree {
  PVector location;
  int size; 
  float thickness;
  PImage leaf;
  PImage branch;
  float theta;             // The angle of each branch
  float rotationFactor;    // Controls how far the branches spread apart [0..90]
  float lean;              // Controls the direction of lean [0.0..10.0]
  
  //Tree(PVector location_, int size_, PImage leaf_, PImage branch_) {
  Tree(PVector location_, int size_, String leafImageURL_, String branchImageURL_) {
    location = location_;
    size = size_;
    thickness = size/10;
    //leaf = leaf_;
    //branch = branch_;
    lean = random(0.30, 7.0);
    
    rotationFactor = random(20.0, 65.0); // How much should the branches move when the mouse moves
    
    leaf = requestImage(leafImageURL_);
    branch = requestImage(branchImageURL_);    
  }
  

  void branch(float h, float t) {
    // Each branch will be 2/3rds the size of the previous one
    h *= 0.66;  // Height
    t *= 0.66;  // Thickness
    
    // All recursive functions must have an exit condition!!!!
    // Here, ours is when the length of the branch is 10 pixels or less
    if (h > 10) {
      pushMatrix();    // Save the current state of transformation (i.e. where are we now)
      rotate(theta);   // Rotate by theta      
      image(branch, 0, 0, t, -h);
      translate(0, -h); // Move to the end of the branch
      branch(h, t);       // Ok, now call myself to draw two new branches!!
      popMatrix();     // Whenever we get back here, we "pop" in order to restore the previous matrix state
      
      pushMatrix();
      rotate(theta);
      translate(0, -h);
      image(leaf, 0, 0, 20, 20);
      popMatrix();
      
      
      // Repeat the same thing, only branch off to the "left" this time!
      pushMatrix();
      rotate(-theta/lean);
      image(branch, 0, 0, t, -h);
      translate(0, -h);
      branch(h, t);
      popMatrix();      
      
      pushMatrix();
      rotate(-theta/lean);
      translate(0, -h);
      image(leaf, 0,0,20, 20);
      popMatrix();
    }
  }  
  
  void render() {
    if (leaf.width == 0 && branch.width == 0) {
    } else {
    
      // Let's pick an angle 0 to 90 degrees based on the mouse position
      float a = (mouseX / (float) width) * rotationFactor;
      // Convert it to radians
      theta = radians(a);    
      
      resetMatrix();    
      translate(location.x,location.y);
      
      // Draw a line 120 pixels
      image(branch, 0, 0, thickness, -size);
      // Move to the end of that line
      translate(0,-size);
      // Start the recursive branching!
      branch(size, thickness);
    }
  }
}