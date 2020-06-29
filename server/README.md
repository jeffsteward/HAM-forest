# Art Forest Game Server

## Requirements

* NodeJS    
* [Harvard Art Museums API key](http://www.harvardartmuseums.org/collections/api)  

## Setup

1. Run `npm install` to install the required packages 

2. Set environment variables  

    + Production: Create a system environment variable named `HAM_APIKEY` and set it to your Harvard Art Museums API key  
    + Development: Clone the .env-sample file into a new .env file and set `HAM_APIKEY` to your Harvard Art Museums API key

3. Run `npm start`

4. View http://localhost:3000 in your browser  


----


## Game Components

Libraries included in the global scope
* [Socket.io](https://socket.io/)
* [p5.js](https://p5js.org/) (plus p5.sound)
* [D3.js](https://d3js.org/)
* [Manifesto](https://github.com/IIIF-Commons/manifesto)

### Game Boards and Windows

Each game has two viewers: a game board and a game window. 
- All games start on the game board. 
- The majority of player interactions take place on the game board. 
- Actions on the game board can trigger animations on the game window.

**Components of the Game Board**  

Board  
--> narrative box  
-------> story text    
-------> command history    
-------> interactives  
--> prompt box  
--> animations  

Narrative box: contains a running history of the game story, commands, and interactions  
Prompt box: is where the player enters commands in the format of short, imperative statements

**Components of the Game Window**  

Window  
--> animation/interactive hybrid

### Narratives

Narratives are a series of connected scenes. 


### Interactives

Interatives are custom javascript classes injected in to the narrative box.

The class constructor must take a container element as the first parameter.

```javascript
class ExampleInteractive {
    constructor(containerElement) {
        this._containerElement = containerElement;
    }
}
```

### Animations

Animations are p5 sketches that run in [instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode).

### Triggers

Triggers are a component of a command that alters the behaviour of the board and window.  

### Sockets

A socket connection is created automtically when the game board client and game window client start up.

JOIN-GAME

```json 
let data = {
    gameID: gameID
}

socket.emit('join-game', data);
```

TAKE-ACTION

Socket message data structure for broadcasting actions. Action messages are sent to all sockets in the game except for the sender. The packet structure is dependent on the game and specific action within the game.

This example is for the `cast` action in the Art Forest game.

```json
let data = {
    gameID: 000000,
    action: 'cast',
    packet: {
        objectID: this.objectID,
        annotations: this.annotations
    }
};

// send the message
socket.emit('take-action', data);
```