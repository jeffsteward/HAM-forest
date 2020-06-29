// Each game must have an intro scene

const narrative = {
    info: {
      title: 'Art Forest',
      version: '1.0.7',
      description: `An adventure in growth projections and patience`,
      credits: ``
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
            'look at the bench': {
              destination: `bench`,
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
