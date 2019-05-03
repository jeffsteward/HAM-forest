/**
 * Recursive Tree
 * by Daniel Shiffman.  
 * 
 * Renders a simple tree-like structure via recursion. 
 * The branching angle is calculated as a function of 
 * the horizontal mouse location. Move the mouse left
 * and right to change the angle.
 */
 
PImage[] leafs = new PImage[3];
PImage[] branchs = new PImage[3];

ArrayList<Tree> trees = new ArrayList<Tree>();

void setup() {
  //size(640, 360);
  fullScreen(2);
  
  leafs[0] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/445,946,105,66/full/0/default.jpg");
  leafs[1] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/1090,2302,112,191/full/0/default.jpg");
  leafs[2] = loadImage("https://ids.lib.harvard.edu/ids/iiif/43182690/476,668,162,141/full/0/default.jpg");
  
  branchs[0] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/802,2165,46,254/full/0/default.jpg");
  branchs[1] = loadImage("https://ids.lib.harvard.edu/ids/iiif/423290977/1261,315,59,486/full/0/default.jpg");
  branchs[2] = loadImage("https://ids.lib.harvard.edu/ids/iiif/43182690/433,1487,46,243/full/0/default.jpg");

  trees.add(new Tree(new PVector(width/4,height), 320, leafs[0], branchs[0]));
  trees.add(new Tree(new PVector(width*.75,height), 220, leafs[1], branchs[1]));
  trees.add(new Tree(new PVector(width/2,height), 420, leafs[1], branchs[0]));
  trees.add(new Tree(new PVector(width*.70,height), 75, leafs[0], branchs[1]));
  trees.add(new Tree(new PVector(width/6,height), 140, leafs[2], branchs[2]));
  trees.add(new Tree(new PVector(width*.8,height), 100, leafs[2], branchs[1]));
}

void draw() {
  background(0);
  frameRate(30);
  stroke(255);
  
  // Draw the trees
  for (Tree tree: trees) {
    tree.render();
  }
}