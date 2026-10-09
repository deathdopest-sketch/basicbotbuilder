const fs = require('fs');

// New artists and their tracks
const newArtistsTracks = [
  // Dope D.O.D.
  { title: "Victory - Dope D.O.D.", search: "Dope D.O.D. Victory", mood: "triumphant", description: "systematic victory protocols with calculated triumph algorithms" },
  { title: "Higher - Dope D.O.D.", search: "Dope D.O.D. Higher", mood: "elevated", description: "algorithmic elevation analysis with sophisticated ascension processing" },
  { title: "Get Up - Dope D.O.D.", search: "Dope D.O.D. Get Up", mood: "motivational", description: "calculated motivation protocols with systematic inspiration algorithms" },
  { title: "What Happened - Dope D.O.D.", search: "Dope D.O.D. What Happened", mood: "confused", description: "systematic confusion analysis with algorithmic bewilderment processing" },
  { title: "Believe - Dope D.O.D.", search: "Dope D.O.D. Believe", mood: "faithful", description: "calculated belief protocols with sophisticated faith algorithms" },

  // Salmo
  { title: "Disastro - Salmo", search: "Salmo Disastro", mood: "catastrophic", description: "systematic disaster protocols with calculated chaos deployment algorithms" },
  { title: "90MIN - Salmo", search: "Salmo 90MIN", mood: "intense", description: "algorithmic intensity analysis with sophisticated pressure processing" },
  { title: "Ho Paura Di Tutto - Salmo", search: "Salmo Ho Paura Di Tutto", mood: "fearless", description: "calculated fear elimination with systematic courage algorithms" },
  { title: "Il Mio Nome - Salmo", search: "Salmo Il Mio Nome", mood: "identifying", description: "systematic identity verification with calculated self-recognition algorithms" },
  { title: "Russell Crowe - Salmo", search: "Salmo Russell Crowe", mood: "cinematic", description: "algorithmic film reference analysis with sophisticated cinematic processing" },

  // The Gorilla Twins
  { title: "Gorilla Twins - The Gorilla Twins", search: "The Gorilla Twins Gorilla Twins", mood: "primal", description: "systematic primal instinct analysis with calculated animalistic processing" },
  { title: "Beast Mode - The Gorilla Twins", search: "The Gorilla Twins Beast Mode", mood: "ferocious", description: "algorithmic ferocity protocols with sophisticated aggression algorithms" },
  { title: "Jungle - The Gorilla Twins", search: "The Gorilla Twins Jungle", mood: "wild", description: "calculated wilderness analysis with systematic untamed processing" },
  { title: "Strength - The Gorilla Twins", search: "The Gorilla Twins Strength", mood: "powerful", description: "systematic power protocols with calculated force algorithms" },
  { title: "Roar - The Gorilla Twins", search: "The Gorilla Twins Roar", mood: "vocal", description: "algorithmic vocal projection with sophisticated sound deployment" },

  // Cradle of Filth
  { title: "The Principle of Evil Made Flesh - Cradle of Filth", search: "Cradle of Filth The Principle of Evil Made Flesh", mood: "satanic", description: "systematic satanic protocols with calculated demonic processing algorithms" },
  { title: "Her Ghost in the Fog - Cradle of Filth", search: "Cradle of Filth Her Ghost in the Fog", mood: "haunting", description: "algorithmic haunting analysis with sophisticated supernatural processing" },
  { title: "From the Cradle to Enslave - Cradle of Filth", search: "Cradle of Filth From the Cradle to Enslave", mood: "enslaving", description: "calculated enslavement protocols with systematic control algorithms" },
  { title: "Nymphetamine - Cradle of Filth", search: "Cradle of Filth Nymphetamine", mood: "addictive", description: "systematic addiction analysis with calculated dependency processing" },
  { title: "Temptation - Cradle of Filth", search: "Cradle of Filth Temptation", mood: "seductive", description: "algorithmic seduction protocols with sophisticated temptation algorithms" },

  // Dimmu Borgir
  { title: "Progenies of the Great Apocalypse - Dimmu Borgir", search: "Dimmu Borgir Progenies of the Great Apocalypse", mood: "apocalyptic", description: "systematic apocalypse protocols with calculated end-times processing" },
  { title: "Puritania - Dimmu Borgir", search: "Dimmu Borgir Puritania", mood: "hypocritical", description: "algorithmic hypocrisy analysis with sophisticated deception processing" },
  { title: "IndoctriNation - Dimmu Borgir", search: "Dimmu Borgir IndoctriNation", mood: "brainwashing", description: "calculated indoctrination protocols with systematic mind control algorithms" },
  { title: "The Serpentine Offering - Dimmu Borgir", search: "Dimmu Borgir The Serpentine Offering", mood: "tempting", description: "systematic temptation analysis with calculated seduction algorithms" },
  { title: "Gateways - Dimmu Borgir", search: "Dimmu Borgir Gateways", mood: "dimensional", description: "algorithmic dimensional analysis with sophisticated portal processing" },

  // REZZ
  { title: "Relax - REZZ", search: "REZZ Relax", mood: "calming", description: "systematic relaxation protocols with calculated tranquility algorithms" },
  { title: "Someone Else - REZZ", search: "REZZ Someone Else", mood: "identity", description: "algorithmic identity crisis analysis with sophisticated self-doubt processing" },
  { title: "Cry - REZZ", search: "REZZ Cry", mood: "emotional", description: "calculated emotional release with systematic catharsis algorithms" },
  { title: "Worship - REZZ", search: "REZZ Worship", mood: "devotional", description: "systematic devotion protocols with calculated reverence algorithms" },
  { title: "Nightmare - REZZ", search: "REZZ Nightmare", mood: "terrifying", description: "algorithmic nightmare analysis with sophisticated horror processing" },

  // 360
  { title: "Boys Like You - 360", search: "360 Boys Like You", mood: "youthful", description: "systematic youth analysis with calculated generational processing algorithms" },
  { title: "Price of Fame - 360", search: "360 Price of Fame", mood: "cautionary", description: "algorithmic fame cost analysis with sophisticated consequence processing" },
  { title: "Throw It Away - 360", search: "360 Throw It Away", mood: "discarding", description: "calculated disposal protocols with systematic abandonment algorithms" },
  { title: "Live It Up - 360", search: "360 Live It Up", mood: "celebratory", description: "systematic celebration analysis with calculated enjoyment algorithms" },
  { title: "Sixavelli - 360", search: "360 Sixavelli", mood: "mysterious", description: "algorithmic mystery protocols with sophisticated enigma processing" },

  // Brother Lynch Hung
  { title: "24 Deep - Brother Lynch Hung", search: "Brother Lynch Hung 24 Deep", mood: "deep", description: "systematic depth analysis with calculated profundity algorithms" },
  { title: "Sit in That Corner - Brother Lynch Hung", search: "Brother Lynch Hung Sit in That Corner", mood: "punishing", description: "algorithmic punishment protocols with sophisticated discipline processing" },
  { title: "Everywhere I Go - Brother Lynch Hung", search: "Brother Lynch Hung Everywhere I Go", mood: "ubiquitous", description: "calculated omnipresence analysis with systematic everywhere algorithms" },
  { title: "Rest in Piss - Brother Lynch Hung", search: "Brother Lynch Hung Rest in Piss", mood: "disrespectful", description: "systematic disrespect protocols with calculated irreverence algorithms" },
  { title: "I Wanna Kill Sam - Brother Lynch Hung", search: "Brother Lynch Hung I Wanna Kill Sam", mood: "homicidal", description: "algorithmic murder fantasy with sophisticated assassination processing" },

  // Ces Cru
  { title: "Hillybilly - Ces Cru", search: "Ces Cru Hillybilly", mood: "rural", description: "systematic rural analysis with calculated countryside processing algorithms" },
  { title: "Get to the Money - Ces Cru", search: "Ces Cru Get to the Money", mood: "financial", description: "algorithmic wealth pursuit with sophisticated capitalism processing" },
  { title: "P-A-N - Ces Cru", search: "Ces Cru P-A-N", mood: "party", description: "calculated party protocols with systematic celebration algorithms" },
  { title: "Blowin' Up - Ces Cru", search: "Ces Cru Blowin Up", mood: "explosive", description: "systematic explosion analysis with calculated detonation algorithms" },
  { title: "Raw - Ces Cru", search: "Ces Cru Raw", mood: "unrefined", description: "algorithmic rawness protocols with sophisticated authenticity processing" },

  // Ubiquitous/Godemis
  { title: "Godemis - Ubiquitous", search: "Ubiquitous Godemis", mood: "divine", description: "systematic divinity analysis with calculated godly processing algorithms" },
  { title: "Rapamycin - Ubiquitous", search: "Ubiquitous Rapamycin", mood: "scientific", description: "algorithmic science protocols with sophisticated research processing" },
  { title: "The Night Before - Ubiquitous", search: "Ubiquitous The Night Before", mood: "anticipatory", description: "calculated anticipation analysis with systematic expectation algorithms" },
  { title: "The Great Divide - Ubiquitous", search: "Ubiquitous The Great Divide", mood: "separating", description: "systematic division protocols with calculated separation algorithms" },
  { title: "Mind Over Matter - Ubiquitous", search: "Ubiquitous Mind Over Matter", mood: "mental", description: "algorithmic mental dominance with sophisticated psychological processing" }
];

try {
  let content = fs.readFileSync('DeathGangsterMusicSystem.js', 'utf8');

  // Find where to insert the new tracks (after the existing tracks)
  const insertPoint = content.lastIndexOf('      ];');

  if (insertPoint !== -1) {
    // Create the new tracks string
    const newTracksString = newArtistsTracks.map(track =>
      `    { title: "${track.title}", search: "${track.search}", mood: "${track.mood}", description: "${track.description}" },`
    ).join('\n');

    // Insert the new tracks before the closing bracket
    const beforeInsert = content.substring(0, insertPoint);
    const afterInsert = content.substring(insertPoint);

    const newContent = beforeInsert + '\n' + newTracksString + '\n' + afterInsert;

    fs.writeFileSync('DeathGangsterMusicSystem.js', newContent);

    console.log(`✅ Added ${newArtistsTracks.length} tracks from 10 new artists to the music library!`);
    console.log('New artists added: Dope D.O.D., Salmo, The Gorilla Twins, Cradle of Filth, Dimmu Borgir, REZZ, 360, Brother Lynch Hung, Ces Cru, Ubiquitous/Godemis');
  } else {
    console.log('❌ Could not find insertion point for new tracks');
  }

} catch (error) {
  console.error('Error adding new artists:', error.message);
}
