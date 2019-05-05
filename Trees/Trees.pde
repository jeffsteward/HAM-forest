import websockets.*;

/**
 * Art Forest
 *
 * Based on:
 * Recursive Tree
 * by Daniel Shiffman.  
 * 
 * Renders a simple tree-like structure via recursion. 
 * The branching angle is calculated as a function of 
 * the horizontal mouse location. Move the mouse left
 * and right to change the angle.
 */
 
String[] leafs = {"https://ids.lib.harvard.edu/ids/iiif/423290977/445,946,105,66/full/0/default.jpg",
                  "https://ids.lib.harvard.edu/ids/iiif/423290977/1090,2302,112,191/full/0/default.jpg",
                  "https://ids.lib.harvard.edu/ids/iiif/43182690/476,668,162,141/full/0/default.jpg"};
String[] branches = {"https://ids.lib.harvard.edu/ids/iiif/423290977/802,2165,46,254/full/0/default.jpg",
                      "https://ids.lib.harvard.edu/ids/iiif/423290977/1261,315,59,486/full/0/default.jpg",
                      "https://ids.lib.harvard.edu/ids/iiif/43182690/433,1487,46,243/full/0/default.jpg"};
ArrayList<Tree> trees = new ArrayList<Tree>();

WebsocketClient wsc;

void setup() {
  //size(640, 360);
  fullScreen(2);
  
  wsc = new WebsocketClient(this, "ws://localhost:3000/socket.io/?EIO=3&transport=websocket");
  
  trees.add(new Tree(new PVector(width/4,height), 320, leafs[0], branches[0]));
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

void createTree() {
  trees.add(new Tree(new PVector(mouseX,height), mouseY, leafs[int(random(0,leafs.length))], branches[int(random(0,branches.length))]));
  println(trees.size());
  wsc.sendMessage("42[\"message\",{\"x\":" + mouseX + ",\"y\":" + mouseY + "}]");  
}

void clearTheForest() {
}

void mouseClicked() {
  createTree();
}

void keyPressed() {
  // reset = cut down the forest
  if (key == 'r') {
    trees.clear();
  } else if (key == 'c') {
    createTree();
  }
}

void webSocketEvent(String msg){
 println(msg);
}
    
