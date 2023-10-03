/**
 * Created by tristan on 17-8-17.
 */
module.exports = {
  wiki: 'https://raw.githubusercontent.com/ScoutingIJsselgroep/JotihuntWiki/master/README.md',
  telegram: {
    authToken: process.env.TELEGRAM_TOKEN,
    chats: {
      Alpha: -1001643199804,
      Bravo: -1001643199804,
      Charlie: -1001643199804,
      Delta: -1001643199804,
      Echo: -1001643199804,
      Foxtrot: -1001643199804,
      "Alpha 2": -1001643199804,
      "Bravo 2": -1001643199804,
      "Charlie 2": -1001643199804,
      "Delta 2": -1001643199804,
      "Echo 2": -1001643199804,
      "Foxtrot 2": -1001643199804,
      Opdracht: -1001643199804,
      Nieuws: -1001643199804,
      Debug: -826483422,
    },
    status: {
      red: '\ud83c\ude34',
      orange: '\ud83c\ude36',
      green: '\ud83c\ude2f',
    },
  },
  map: {
    filename: process.env.KML_FILENAME,
    // The amount of hours to keep in history on the MassiveMap
    historyTime: 10,
    // The walking speed (sky wide) in km/h by a average human
    walkingSpeed: 3.6,
  },
  google: {
    googleClientAuthToken: process.env.GOOGLE_CLIENT_AUTH_TOKEN,
    googleServerAuthToken: process.env.GOOGLE_SERVER_AUTH_TOKEN,
  },
  poller: {
    timeout: process.env.POLLER_INTERVAL_SECONDS * 1000,
  },
  clairvoyance: {
    ip: 'clairvoyance',
    port: 1337,
  },
  divinity: {
    ip: 'divinity',
    port: 31337,
  },
  dbMappings: {
    nArea: ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Nieuws', 'Alpha 2', 'Bravo 2', 'Charlie 2', 'Delta 2', 'Echo 2', 'Foxtrot 2'],
    area: {
      Alpha: 1,
      Bravo: 2,
      Charlie: 3,
      Delta: 4,
      Echo: 5,
      Foxtrot: 6,
      "Onbekend": 7,
      "Alpha 2": 8,
      "Bravo 2": 9,
      "Charlie 2": 10,
      "Delta 2": 11,
      "Echo 2": 12,
      "Foxtrot 2": 13,
    },
    hintType: {
      hint: 1,
      hunt: 2,
      message: 3,
    },
    status: {
      green: {
        translation: "groen",
        id: 1
      },
      orange: {
        translation: "oranje",
        id: 2
      },
      red: {
        translation: "rood",
        id: 3
      },
    },
    type: {
      Opdracht: 1,
      Hint: 2,
      Nieuws: 3,
    },
  },
};