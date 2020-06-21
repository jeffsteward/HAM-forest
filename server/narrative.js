/*
West of House
Your are standing in an open field west of a white house, with a boarded front door.
There is a small grafting bench here. 
> look at the bench

The bench is worn from centuries of use.
On it is a pile of seed packets and a grafting apparatus.
> look at the packets

You read the names on the packets.
    Mixed Seeds
    Seeds of Change
    Lurchers
    Levitory Anticipation
    100 Year Egg
    Forbidden Broccoli
    Small Seeds
    USDA All Purpose Seeds
    Grow at Your Own Risk
> open mixed seeds

As you tear open the packet a big gust of wind blows it from your hand.
The seeds scatter across the open field.
> open seeds of change

You pick up another packet and tear it open.
This time the seeds spill on to the bench. Upon close inspection you notice each one is unique and covered in strange markings.
> use grafting apparatus

You pick up the grafting apparatus and get to work.
*/

// sceneModel = {
//   name: ``,
//   description: ``,
//   prompt: ``,
//   destination: ``,
//   commands: [],
//   animation: {
//      name: ``,
//      startDelay: 0
//   }
//   interactive: {
//      name: ``,
//      properties: []
//   }
// }

// Animations fill the screen
// Interactives flow in as part of the narrative

const narrative = {
  info: {
    title: 'Art Forest',
    version: '1.0.7',
    description: `An adventure in growth projections and patience`,
    credits: ``
  },
  resources: {
    gameBoard: [
      'interactives/apparatus.js',
      'sketches/wind.js',
      'sketches/spill.js'
    ],
    gameWindow: [
      'sketches/forest.js',
      'sketches/tree.js'
    ]
  },
  messages: {
    CAST: `cast`
  },
  commands: {
    gameBoard: [
      'inventory',
      'instructions',
      'credits'
    ],
    gameWindow: [
      'status'
    ]
  },
  scenes: {
    gameWindow: {
      intro: {
        name: `intro`,
        description: ``,
        animation: {
          name: `forest`,
          startDelay: 0
        } 
      }
    },
    gameBoard: {
      intro: {
        name: `intro`,
        description: 
          `West of House
          You are standing in an open field west of a white house, with a boarded front door.
          There is a small grafting bench here.`,
        prompt: `look at the bench`,
        destination: `bench`,
        animation: {
          name: ``,
          startDelay: 0
        } 
      },
      bench: {
        name: `bench`,    
        description:
          `The bench is worn from centuries of use.
          On it is a pile of seed packets and a grafting apparatus.`,
        prompt:   `look at the packets`,
        destination: `packets`,
        animation: {
          name: ``,
          startDelay: 0
        } 
      },
      packets: {
        name: `packets`,
        description:
          `You read the names on the packets.

          Mixed Seeds
          Seeds of Change
          Levitory Anticipation
          100 Year Egg
          Forbidden Broccoli
          Small Seeds
          USDA All Purpose Seeds
          Grow at Your Own Risk`,
        prompt: `open mixed seeds`,
        destination: `wind`,
        animation: {
          name: ``,
          startDelay: 0
        } 
      },
      wind: {
        name: `wind`,
        description:
          `As you tear open the packet a big gust of wind blows it from your hand.
          The seeds scatter across the open field.`,
        prompt: `open seeds of change`,
        destination: `spill`,
        animation: {
          name: `wind`,
          startDelay: 1000
        } 
      },
      spill: {
        name: `spill`,
        description: 
          `You pick up another packet and tear it open. This time the seeds spill on to the bench. 
          Upon close inspection you notice each one is unique and covered in strange markings.`,
        prompt: `use grafting apparatus`,
        destination: `apparatus`,
        animation: {
          name: `spill`,
          startDelay: 500
        } 
      },
      apparatus: {
        name: `apparatus`,
        description: `You pick up the grafting apparatus and get to work.`,
        prompt: `open grow at your own risk`,
        destination: `apparatus2`,
        animation: {
          name: ``,
          startDelay: 0
        },
        interactive: {
          name: `Apparatus`,
          properties: [
            `https://www.harvardartmuseums.org/profile/jeff_steward@harvard.edu/mycollections/3818/art-forest/iiif/top`
          ]
        }
      },
      apparatus2: {
        name: `apparatus`,
        description: `You pick up the grafting apparatus and get to work on grow at your own risk.`,
        prompt: ``,
        destination: ``,
        animation: {
          name: ``,
          startDelay: 0
        },
        interactive: {
          name: `Apparatus`,
          properties: [
            `https://www.harvardartmuseums.org/profile/jeff_steward@harvard.edu/mycollections/3889/super-collager/iiif/top`
          ]
        }
      },
      instructions: {
        name: `instructions`,
        description: ``,
        prompt: ``,
        destination: ``,
        animation: {
          name: ``,
          startDelay: 0
        } 
      },
      credits: {
        name: `credits`,
        description: ``,
        prompt: ``,
        destination: ``,
        animation: {
          name: ``,
          startDelay: 0
        } 
      }
    }
  }
};

module.exports = narrative;