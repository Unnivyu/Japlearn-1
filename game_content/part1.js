const scenes = [
    {
      id: 1,
      dialogues: [
        { text: "You see a town in the distance.", background: require('../assets/content/town.png') },
        { text: "Someone approaches you." },
        { text: 'Oh, hey there', characterImage: require('../assets/sprites/hello.png')},
        { text: 'You said you wanted to learn the Japanese language.', characterName: 'Duck', characterImage: require('../assets/sprites/talk.png') },
        { text: "Well, I can't help you at the moment.", characterName: 'Duck', },
        { text: "If you'll help me out with some errands, you can learn along the way.", characterName: "Duck" },
        { text: "Come on, help me open up the shop.", characterName: 'Duck' }
      ],
      choices: [
        { text: 'Proceed to get inside the shop', nextSceneId: 2 },
      ],
    
    },
    {
      id: 2,
      dialogues: [
        { text: "You settle inside and sit down.", characterImage: "none", background: "none" },
        { 
          text: 'A brief intro to the Japanese language is that it uses 3 writing systems which are Hiragana, Katakana, and Kanji.', 
          characterName: 'Duck', 
          background: require('../assets/content/office.png') 
        },
        { 
          text: 'You’ll first be introduced to Hiragana which has 46 characters the same as Katakana.', 
          characterName: 'Duck' 
        },
        { 
          text: 'To help you navigate the town, the first five hiragana will help you which are あ, い, う, え, お who’s equivalent characters in english are a, i , u, e, o in that order.', 
          characterName: 'Duck' 
        },
        { 
          text: 'To make you remember them I need you to match the correct ones through some cards I laid out.',
          characterName: 'Duck',
          startGame: true,
          game: {
            options: [
              { hiragana: 'あ', english: 'a' },
              { hiragana: 'い', english: 'i' },
              { hiragana: 'う', english: 'u' },
              { hiragana: 'え', english: 'e' },
              { hiragana: 'お', english: 'o' },
            ],
          },
        },
      ],
      nextSceneId: 3,
    },
    {
      id: 3,
      dialogues: [
        { text: 'End' },
      ],
      end: true,
    },
  ];
  
  export default scenes;
  