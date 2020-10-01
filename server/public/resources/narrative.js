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
//  sceneName: {
//   name: `INTERNAL_NAME`,
//   description: `TEXT_TO_DISPLAY_ON_THE_GAME_BOARD`,
//   prompt: ``,
//   destination: `NAME_OF_SCENE`,
//   commands: {
//      `COMMANDNAME`: {
//          targets: {
//            `TARGETNAME`: {
//                [ONE_OR_MORE_SUB_SCENES]
//            }
//          }
//      }
//   },
//   animation: {
//      name: ``,
//      startDelay: 0
//   },
//   interactive: {
//      name: ``,
//      properties: []
//   },
//   trigger: {
//      name: ``,
//      startDelay: 0,
//      action: ``,
//      on: '',
//      packet: {},
//   }
//  }
// }

// Animations fill the screen
// Interactives flow in as part of the narrative

const narrative = {
    info: {
      title: 'Art Forest',
      version: '1.0.7',
      description: `An adventure in growth projections and patience`,
      credits: 
        `Game design and programming by Jeff Steward
        
        Sound and music by Hayley Murks-Abdikadirova
        
        Art images courtesy of <a href="https://www.harvardartmuseums.org" target="_blank">Harvard Art Museums</a>
        
        Art Forest is a work in progress. It started in May 2019 and continues to grow.`,
      help: 
        `You are playing a "game" that is a mix of classic <a href="https://en.wikipedia.org/wiki/Interactive_fiction" target="_blank">text adventure</a>, <a href="https://en.wikipedia.org/wiki/Adventure_game#Point-and-click_adventure_games" target="_blank">point-and-click adventure</a>, and <a href="https://en.wikipedia.org/wiki/Adventure_game#Walking_simulators" target="_blank">walking simulator</a>. This game is deliberately slow.
      
        Most of the interaction is carried out by entering commands in the prompt box. The prompt box is the > and blinking cursor near the bottom of the scene. If you got this far you figured out you could at least type help in to the box. 
      
        Some commands trigger interactive graphics to appear in the game board. At those momemts, grab your mouse and click around. You never know what might happen.

        Occassionaly animations will play as a result of a command. Enjoy! There's nothing for you to do except take them in while they play out. Hopefully they make your time here a bit more enjoyable.

        Most commands take the form VERB NOUN (i.e. ACTION TARGET). For example, 'look at the bench'. Or, 'listen at the forest'. Here are some verbs you might consider expermienting with:

        open
        look
        listen
        quiet
        photograph`,
      error: `I'm afraid I don't understand what you're asking me.`,
      startScene: `intro`
    },
    resources: {
      board: [
        'interactives/apparatus.js',
        'sketches/wind.js',
        'sketches/spill.js',
        'sketches/flash.js',
        'sketches/levitation.js',
      ],
      window: [
        'sketches/forest.js',
        'sketches/tree.js'
      ]
    },
    messages: {
      CAST: `cast`,
      PLAYAUDIO: `play-audio`,
      MUTEAUDIO: `mute-audio`,
      CLEAR: `clear`,
      SHAPSHOT: `snapshot`
    },
    commands: {
      board: [
        'help',
        'credits'
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
                  'packets': {
                      name: `packets`,
                      description:
                        `You read the names on the packets.
                        
                        Fuji Foliage
                        Mixed Seeds
                        Seeds of Change
                        Levitory Anticipation
                        100 Year Egg
                        Forbidden Broccoli
                        Small Seeds
                        USDA All Purpose Seeds
                        Grow at Your Own Risk`,
                      prompt: `open fuji foliage`
                  },
                  'forest': {
                    name: 'forest',
                    description: `Isn't it beautiful?`,
                    trigger: {
                      name: 'fade-out-and-in',
                      startDelay: 2000,
                      action: 'fade-out-and-in',
                      on: 'board',
                      packet: {}
                    }
                  }
              } 
            },

            'open': {
              targets: {
                'mixed seeds': {
                    name: `wind`,
                    description:
                      `As you tear open the packet a big gust of wind blows it from your hand.
                      The seeds scatter across the open field.`,
                    prompt: ``,
                    animation: {
                      name: `wind`,
                      startDelay: 1000
                    } 
                },
                'seeds of change': {
                    name: `spill`,
                    description: 
                      `You pick up another packet and tear it open. This time the seeds spill on to the bench. 
                      Upon close inspection you notice each one is unique and covered in strange markings.`,
                    prompt: ``,
                    animation: {
                      name: `spill`,
                      startDelay: 500
                    } 
                }, 
                'fuji foliage': {
                    name: `fuji foliage`,
                    description: `You pick up the grafting apparatus and get to work on fuji foliage.`,
                    interactive: {
                      name: `Apparatus`,
                      properties: [
                        `https://www.harvardartmuseums.org/profile/hayley_murks@harvard.edu/mycollections/5196/fuji-foliage/iiif/top`
                      ]
                    }
                },
                'grow at your own risk': {
                    name: `apparatus2`,
                    description: `You pick up the grafting apparatus and get to work on grow at your own risk.`,
                    interactive: {
                      name: `Apparatus`,
                      properties: [
                        `https://www.harvardartmuseums.org/profile/jeff_steward@harvard.edu/mycollections/3889/super-collager/iiif/top`
                      ]
                    }
                },
                'small seeds': {
                  name: `small seeds`,
                  description: `Geez, these really are small. You pick up the grafting apparatus and get to work.`,
                  interactive: {
                    name: `Apparatus`,
                    properties: [
                      `https://www.harvardartmuseums.org/profile/jeff_steward@harvard.edu/mycollections/4505/art-forest-the-feinberg-collection/iiif/top`
                    ]
                  }
                },
                'forbidden broccoli': {
                  name: `forbidden broccoli`,
                  description: 
                    `A cloud of greenish dust emerges from the packet. The broccoli must have gone bad. 
                    Perhaps a different packet will yield better results.`,
                },
                'levitory anticipation': {
                  name: `levitory anticipation`,
                  description: 
                    `You tip the packet and watch as the seeds hover just above the bench top. Then, motivated by the sheer joy of freedom, the seeds float up and away.`,
                  animation: {
                    name: `levitation`,
                    startDelay: 500
                  } 
                },
                'usda all purpose seeds': {
                  name: `usda all purpose seeds`,
                  description: 
                    `You stare at the packet for a long time. Then decide it's best not to tempt fate.`,
                },
                '100 year egg': {
                  name: `100 year egg`,
                  description: 
                    `This can't be right. You can't grow eggs. Or can you...

                    Before you can decide, a bird swoops down and relieves you of the packet.`,
                }
              }
            },
            
            'use': {
              targets: {
                'grafting apparatus': {
                    name: `apparatus`,
                    description: `You pick up the grafting apparatus and get to work.`,
                    prompt: ``,
                    commands: {}, 
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
                }
              }
            },          

            'listen': {
              targets: {
                '*': {
                    name: 'listen to the forest',
                    description: 'You tilt the side of your head towards the field and let the vibrations tap gently on your eardrum.',
                    prompt: '',
                    trigger: {
                        name: 'play-audio',
                        startDelay: 0,
                        action: 'play-audio',
                        on: 'window',
                        packet: {}
                    }
                }
              }
            },
            
            'quiet': {
              targets: {
                '*': {
                    name: 'quiet the forest',
                    description: 'You turn away from the field and an eerie silence wraps around you.',
                    prompt: '',
                    trigger: {
                        name: 'mute-audio',
                        startDelay: 0,
                        action: 'mute-audio',
                        on: 'window',
                        packet: {}
                    }
                    }
              }
            },
            
            'clear': {
              targets: {
                '*': {
                    name: 'clear the forest',
                    description: `This world is yours to do as you wish. 
                    The ground starts to shake. Then, in an instant, the trees vanish.`,
                    prompt: '',
                    trigger: {
                        name: 'clear',
                        startDelay: 0,
                        action: 'clear',
                        on: 'window',
                        packet: {}
                    }
                }
              }
            },

            'photograph': {
              targets: {
                '*': {
                    name: 'photograph the forest',
                    description: `You create a rectangular frame with your index fingers and thumbs. Raise it to your eyes. Then you speak the word click. (And whisper to yourself, I am Cam Jansen).`,
                    prompt: '',
                    animation: {
                      name: `flash`,
                      startDelay: 750
                    },
                    trigger: {
                        name: 'snapshot',
                        startDelay: 1000,
                        action: 'snapshot',
                        on: 'window',
                        packet: {}
                    }
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