class Tree {
  PVector location;
  int size; 
  float thickness;
  PImage leaf;
  PImage branch;
  float theta;   
  
  Tree(PVector location_, int size_, PImage leaf_, PImage branch_) {
    location = location_;
    size = size_;
    thickness = size/10;
    leaf = leaf_;
    branch = branch_;
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
      rotate(-theta);
      image(branch, 0, 0, t, -h);
      translate(0, -h);
      branch(h, t);
      popMatrix();
      
      
      pushMatrix();
      rotate(-theta);
      translate(0, -h);
      image(leaf, 0,0,20, 20);
      popMatrix();
    }
  }  
  
  void render() {

    // Let's pick an angle 0 to 90 degrees based on the mouse position
    float a = (mouseX / (float) width) * 90f;
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