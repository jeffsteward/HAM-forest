/**
 * Recursive Tree
 * by Daniel Shiffman.  
 * 
 * Renders a simple tree-like structure via recursion. 
 * The branching angle is calculated as a function of 
 * the horizontal mouse location. Move the mouse left
 * and right to change the angle.
 */
 
PImage[] leafs = new PImage[2];
PImage[] branchs = new PImage[2];
Tree[] trees = new Tree[4];

void setup() {
  //size(640, 360);
  fullScreen(SPAN);
  
  leafs[0] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/445,946,105,66/full/0/default.jpg");
  leafs[1] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/1090,2302,112,191/full/0/default.jpg");
  
  branchs[0] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/802,2165,46,254/full/0/default.jpg");
  branchs[1] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/1261,315,59,486/full/0/default.jpg");
  
  trees[0] = new Tree(new PVector(width/4,height), 320, leafs[0], branchs[0]);
  trees[1] = new Tree(new PVector(width*.75,height), 220, leafs[1], branchs[1]);
  trees[2] = new Tree(new PVector(width/2,height), 420, leafs[1], branchs[0]);
  trees[3] = new Tree(new PVector(width*.70,height), 75, leafs[0], branchs[1]);
}

void draw() {
  background(0);
  frameRate(30);
  stroke(255);
  
  // Draw the trees
  for (int i=0; i<trees.length; i++) {
    trees[i].render();
  }
}