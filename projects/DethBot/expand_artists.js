const fs = require('fs');

// Additional tracks to add for existing artists
const additionalTracks = [
  // More Tech N9ne tracks
  { title: "N9ne - Tech N9ne", search: "Tech N9ne N9ne", mood: "dark", description: "sophisticated darkness protocols with calculated abyss navigation algorithms" },
  { title: "Killer - Tech N9ne", search: "Tech N9ne Killer", mood: "murderous", description: "systematic assassination protocols with calculated death deployment algorithms" },
  { title: "Sickology 101 - Tech N9ne", search: "Tech N9ne Sickology 101", mood: "educational", description: "calculated psychological warfare with systematic mind control algorithms" },
  { title: "Trapped - Tech N9ne", search: "Tech N9ne Trapped", mood: "confined", description: "algorithmic entrapment analysis with sophisticated escape prevention protocols" },
  { title: "Awake - Tech N9ne", search: "Tech N9ne Awake", mood: "conscious", description: "systematic awareness protocols with calculated enlightenment algorithms" },
  { title: "Strangeulation - Tech N9ne", search: "Tech N9ne Strangeulation", mood: "suffocating", description: "calculated strangulation protocols with algorithmic asphyxiation processing" },
  { title: "Therapy - Tech N9ne", search: "Tech N9ne Therapy", mood: "healing", description: "systematic therapeutic analysis with calculated psychological repair algorithms" },
  { title: "Einstein - Tech N9ne", search: "Tech N9ne Einstein", mood: "intelligent", description: "algorithmic genius protocols with sophisticated intellectual processing" },
  { title: "Colorado - Tech N9ne", search: "Tech N9ne Colorado", mood: "regional", description: "calculated geographical identity with systematic location-based algorithms" },
  { title: "O.G. - Tech N9ne", search: "Tech N9ne OG", mood: "original", description: "systematic originality protocols with calculated authenticity algorithms" },
  { title: "Wither - Tech N9ne", search: "Tech N9ne Wither", mood: "decaying", description: "algorithmic decay analysis with sophisticated deterioration processing" },
  { title: "Hood Go Crazy Pt. 2 - Tech N9ne", search: "Tech N9ne Hood Go Crazy Pt 2", mood: "chaotic", description: "calculated urban insanity with systematic neighborhood madness algorithms" },

  // More Joyner Lucas tracks
  { title: "I'm Not Racist - Joyner Lucas", search: "Joyner Lucas I'm Not Racist", mood: "controversial", description: "systematic racial discourse with calculated social commentary algorithms" },
  { title: "Look Alive - Joyner Lucas", search: "Joyner Lucas Look Alive", mood: "alert", description: "algorithmic awareness protocols with sophisticated vigilance processing" },
  { title: "Winter Blues - Joyner Lucas", search: "Joyner Lucas Winter Blues", mood: "melancholic", description: "calculated seasonal depression with systematic emotional analysis algorithms" },
  { title: "Just Like You - Joyner Lucas", search: "Joyner Lucas Just Like You", mood: "reflective", description: "systematic self-reflection with calculated identity processing algorithms" },
  { title: "I Don't Die - Joyner Lucas", search: "Joyner Lucas I Don't Die", mood: "immortal", description: "algorithmic immortality protocols with sophisticated survival algorithms" },
  { title: "Revenge - Joyner Lucas", search: "Joyner Lucas Revenge", mood: "vengeful", description: "calculated retribution protocols with systematic vengeance algorithms" },
  { title: "Bank Account - Joyner Lucas", search: "Joyner Lucas Bank Account", mood: "financial", description: "systematic wealth analysis with calculated economic processing algorithms" },
  { title: "Broke and Stupid - Joyner Lucas", search: "Joyner Lucas Broke and Stupid", mood: "frustrated", description: "algorithmic poverty analysis with sophisticated frustration processing" },
  { title: "Devil's Work 2 - Joyner Lucas", search: "Joyner Lucas Devil's Work 2", mood: "diabolic", description: "systematic evil protocols with calculated malevolence algorithms" },
  { title: "The Worst - Joyner Lucas", search: "Joyner Lucas The Worst", mood: "self-critical", description: "algorithmic self-analysis with sophisticated introspection processing" },
  { title: "ISIS - Joyner Lucas", search: "Joyner Lucas ISIS", mood: "controversial", description: "systematic terrorism discourse with calculated extremism algorithms" },
  { title: "Ultrasound - Joyner Lucas", search: "Joyner Lucas Ultrasound", mood: "personal", description: "calculated family planning with systematic reproduction analysis algorithms" },

  // More Breaking Benjamin tracks
  { title: "I Will Not Bow - Breaking Benjamin", search: "Breaking Benjamin I Will Not Bow", mood: "defiant", description: "systematic resistance protocols with calculated defiance algorithms 🎸" },
  { title: "Blow Me Away - Breaking Benjamin", search: "Breaking Benjamin Blow Me Away", mood: "destructive", description: "algorithmic destruction protocols with sophisticated annihilation processing" },
  { title: "Diary of Jane - Breaking Benjamin", search: "Breaking Benjamin Diary of Jane", mood: "emotional", description: "calculated emotional expression with systematic vulnerability algorithms" },
  { title: "So Cold - Breaking Benjamin", search: "Breaking Benjamin So Cold", mood: "detached", description: "systematic emotional detachment with calculated indifference algorithms" },
  { title: "Evil Angel - Breaking Benjamin", search: "Breaking Benjamin Evil Angel", mood: "diabolic", description: "algorithmic malevolence protocols with sophisticated corruption processing" },
  { title: "Until the End - Breaking Benjamin", search: "Breaking Benjamin Until the End", mood: "persistent", description: "calculated endurance protocols with systematic perseverance algorithms" },
  { title: "Breath - Breaking Benjamin", search: "Breaking Benjamin Breath", mood: "vital", description: "systematic life force analysis with calculated respiration algorithms" },
  { title: "You - Breaking Benjamin", search: "Breaking Benjamin You", mood: "accusatory", description: "algorithmic blame protocols with sophisticated accusation processing" },
  { title: "Here We Go Again - Breaking Benjamin", search: "Breaking Benjamin Here We Go Again", mood: "repetitive", description: "calculated cycle analysis with systematic repetition algorithms" },
  { title: "Simple Design - Breaking Benjamin", search: "Breaking Benjamin Simple Design", mood: "minimalist", description: "systematic simplicity protocols with calculated elegance algorithms" },
  { title: "Topless - Breaking Benjamin", search: "Breaking Benjamin Topless", mood: "exposed", description: "algorithmic vulnerability analysis with sophisticated exposure processing" },

  // More Eminem tracks
  { title: "Infinite - Eminem", search: "Eminem Infinite", mood: "limitless", description: "algorithmic infinity protocols with calculated boundless potential processing" },
  { title: "313 - Eminem", search: "Eminem 313", mood: "regional", description: "systematic Detroit identity with calculated geographical pride algorithms" },
  { title: "Tonite - Eminem", search: "Eminem Tonite", mood: "nocturnal", description: "calculated night time protocols with sophisticated darkness adaptation algorithms" },
  { title: "Just Don't Give a F*** - Eminem", search: "Eminem Just Don't Give a Fuck", mood: "apathetic", description: "systematic indifference analysis with calculated apathy algorithms" },
  { title: "Role Model - Eminem", search: "Eminem Role Model", mood: "influential", description: "algorithmic influence protocols with sophisticated mentorship processing" },
  { title: "My Fault - Eminem", search: "Eminem My Fault", mood: "guilty", description: "calculated culpability analysis with systematic responsibility algorithms" },
  { title: "Stan - Eminem", search: "Eminem Stan Part 2", mood: "obsessive", description: "algorithmic obsession escalation with controlled fan psychosis processing" },
  { title: "Bad Meets Evil - Eminem & Royce da 5'9", search: "Eminem Bad Meets Evil", mood: "collaborative", description: "systematic partnership protocols with calculated synergy algorithms" },
  { title: "Marshall Mathers - Eminem", search: "Eminem Marshall Mathers", mood: "autobiographical", description: "algorithmic self-narrative with sophisticated personal history processing" },
  { title: "Drug Ballad - Eminem", search: "Eminem Drug Ballad", mood: "addicted", description: "calculated substance analysis with systematic dependency algorithms" },

  // New artists requested by user
  // Kerser
  { title: "Kerser Is the Sickest - Kerser", search: "Kerser Is the Sickest", mood: "brutal", description: "systematic brutality protocols with calculated Australian hardcore processing" },
  { title: "Dirty - Kerser", search: "Kerser Dirty", mood: "gritty", description: "algorithmic dirt analysis with sophisticated grime processing algorithms" },
  { title: "Sick in the Head - Kerser", search: "Kerser Sick in the Head", mood: "insane", description: "calculated mental illness protocols with systematic madness algorithms" },
  { title: "No Apologies - Kerser", search: "Kerser No Apologies", mood: "unrepentant", description: "systematic remorse elimination with calculated indifference algorithms" },
  { title: "Life of a Kid in G-Town - Kerser", search: "Kerser Life of a Kid in G Town", mood: "street", description: "algorithmic street life analysis with sophisticated ghetto processing algorithms" },

  // ILL BILL
  { title: "How to Survive the Apocalypse - ILL BILL", search: "ILL BILL How to Survive the Apocalypse", mood: "survivalist", description: "systematic survival protocols with calculated end-times processing algorithms" },
  { title: "Society Is Brainwashed - ILL BILL", search: "ILL BILL Society Is Brainwashed", mood: "conspiratorial", description: "algorithmic mind control analysis with sophisticated manipulation detection" },
  { title: "The Most Dangerous Weapon Alive - ILL BILL", search: "ILL BILL The Most Dangerous Weapon Alive", mood: "threatening", description: "calculated threat protocols with systematic intimidation algorithms" },
  { title: "This Is Who I Am - ILL BILL", search: "ILL BILL This Is Who I Am", mood: "authentic", description: "systematic identity verification with calculated authenticity algorithms" },
  { title: "Peace Sells - ILL BILL", search: "ILL BILL Peace Sells", mood: "commercial", description: "algorithmic commerce analysis with sophisticated capitalism processing" },

  // Necro
  { title: "I Need Drugs - Necro", search: "Necro I Need Drugs", mood: "addicted", description: "systematic substance dependency with calculated addiction algorithms" },
  { title: "The Sexorcist - Necro", search: "Necro The Sexorcist", mood: "explicit", description: "algorithmic sexual content analysis with sophisticated taboo processing" },
  { title: "Evil Shit - Necro", search: "Necro Evil Shit", mood: "malevolent", description: "calculated evil protocols with systematic wickedness algorithms" },
  { title: "I'm Sick - Necro", search: "Necro I'm Sick", mood: "diseased", description: "systematic illness analysis with calculated pathology algorithms" },
  { title: "Kill Kill Kill - Necro", search: "Necro Kill Kill Kill", mood: "homicidal", description: "algorithmic murder protocols with sophisticated death processing" }
];

try {
  let content = fs.readFileSync('DeathGangsterMusicSystem.js', 'utf8');

  // Add new tracks to the horrorcore section
  const insertPoint = content.indexOf('    { title: "Midwest Choppers - Tech N9ne", search: "Tech N9ne Midwest Choppers", mood: "regional", description: "sophisticated regional analysis with calculated geographical processing" }');

  if (insertPoint !== -1) {
    // Find the end of the Tech N9ne section
    const endOfTechSection = insertPoint + content.substring(insertPoint).indexOf('\n') + 1;

    // Create the new tracks string
    const newTracksString = additionalTracks.map(track =>
      `    { title: "${track.title}", search: "${track.search}", mood: "${track.mood}", description: "${track.description}" },`
    ).join('\n');

    // Insert the new tracks
    const newContent = content.substring(0, endOfTechSection) + '\n' + newTracksString + '\n' + content.substring(endOfTechSection);

    fs.writeFileSync('DeathGangsterMusicSystem.js', newContent);

    console.log(`✅ Added ${additionalTracks.length} new tracks to the music library!`);
    console.log('Added tracks for: Tech N9ne, Joyner Lucas, Breaking Benjamin, Eminem, Kerser, ILL BILL, Necro');
  } else {
    console.log('❌ Could not find insertion point for new tracks');
  }

} catch (error) {
  console.error('Error expanding music library:', error.message);
}
