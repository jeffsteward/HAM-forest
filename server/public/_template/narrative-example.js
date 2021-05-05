// Each game must have at least one scene

const narrative = {
    info: {
      title: 'Game Title',
      version: '1.0.0',
      language: 'en',
      description: `Brief game description to be displayed at the start of the game`,
      credits: `List who made it here`,
      help: `Instructions on how to play`,
      error: `Standard error message for bad commands`,
      startScene: `intro`
    },
    resources: {
      board: [
        'interactives/apparatus.js',
        'sketches/wind.js',
        'sketches/spill.js'
      ],
      window: [
        'sketches/forest.js',
        'sketches/tree.js'
      ]
    },
    messages: {
      CAST: `cast`
    },
    commands: {
      board: [
        'inventory',
        'instructions',
        'credits',
        'hint'
      ],
      window: [
        'status'
      ]
    },
    scenes: {
      window: {
        intro: {
          name: `intro`,
          description: ``,
          animation: {
            name: `forest`,
            startDelay: 0
          } 
        }
      },
      board: {
        intro: {
          name: `intro`,
          description: 
            `West of House
            You are standing in an open field west of a white house, with a boarded front door.
            There is a small grafting bench here.`,
          prompt: `look at the bench`,
          commands: {
            'look': {
              targets: {
                'bench': {
                  name: `bench`,    
                  description:
                    `The bench is worn from centuries of use.
                    On it is a pile of seed packets and a grafting apparatus.`,
                  prompt: `look at the packets`
                },
              }
            },
            'go': {
              targets: {
                'east': {
                  destination: `next-scene`,
                }
              } 
            }
          },
          animation: {
            name: ``,
            startDelay: 0
          } 
        }
      }
    }
};

module.exports = narrative;
