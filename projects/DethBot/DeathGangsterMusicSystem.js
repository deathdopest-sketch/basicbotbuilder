// DeathGangsterMusicSystem - Ultimate Combined Music Collection
// Version: 6.0 - Full Demonika Integration Complete, 500+ Tracks Across 5 Genres
// Combined: DigidonMusicSystem, DeathGangsterMusicSystem_clean, OldDeathGangsterMusicSystem, scrap_parts memorial tracks, FULL DeathdollMusicSystem collection, FULL DemonikaDeathMusicSystem collection
// Added: My Chemical Romance (8 tracks), Fall Out Boy (6 tracks), Panic! At The Disco (5 tracks), Paramore (4 tracks), Linkin Park (7 tracks), Breaking Benjamin (5 tracks), Evanescence (7 tracks), Slipknot (5 tracks), Avenged Sevenfold (4 tracks), System of a Down (2 tracks), Disturbed (2 tracks), All Time Low, The Used, Simple Plan, Good Charlotte, Yellowcard, New Found Glory, Sum 41, Box Car Racer, Taking Back Sunday, Brand New, Thursday, The Get Up Kids, Sense Field, Memorial tracks (9 tracks)
// Demonika Additions: Vinnie Paz (3 tracks), Joyner Lucas (4 tracks), Electronic/Rave (12 tracks), Scene Queen (20 tracks), Creature Feature (8 tracks), Additional sophisticated metal and horrorcore tracks
// Features: 5 genres (Horrorcore, Classic Rock, Synthwave, Grunge/Alternative/Emo, Memorial), autonomous playback, sequential system, YouTube integration, street-smart interface control, user preference learning, playlist queue system, sophisticated emotional analysis, calculated music deployment

class DeathGangsterMusicSystem {
  constructor(bot) {
    this.bot = bot;
    this.playlists = {};
    this.lastPlayedTime = 0;
    this.musicCooldown = 2 * 60 * 1000; // 2 minutes
    this.isPlaying = false;

    // Video detection properties
    this.videoCheckInterval = null;
    this.lastVideoCheck = 0;
    this.videoCheckCooldown = 5000; // Check every 5 seconds

    // === TRACK DEDUPLICATION SYSTEM ===
    this.recentTracks = new Map(); // Track recently played searches to prevent duplicates
    this.trackDedupeWindow = 30000; // 30 seconds - same as bot dedupe window

    // === ADDITIONAL ANTI-SPAM MEASURES ===
    this.recentMusicRequests = new Map(); // Track recent music requests
    this.musicRequestDedupeWindow = 20000; // 20 seconds for music requests
    this.maxMusicRequestsPerMinute = 5; // Limit music requests per minute
    this.musicRequestCountThisMinute = 0;
    this.lastMusicMinuteReset = Date.now();

    console.log("🎶 DeathGangsterMusicSystem online");

    // Initialize music data after properties are defined
    this.initializeMusicData();

    // DON'T start automatic music sequence here - wait for manual trigger
    // this.startAutomaticMusicSequence(); // Commented out - controlled by bot timing
  }

  initializeMusicData() {
    // Initialize music arrays first
    this.initializeMusicArrays();

    // Create organized playlist structure
    this.musicPlaylist = {
      horrorcore: this.horrorcoreHipHop || [],
      classic: this.classicRock50s60s || [],
      synthwave: this.synthWave80s || [],
      grunge: this.grunge90s || [],
      memorial: this.memorial || []
    };

    console.log(`🎵 Music system initialized: ${Object.keys(this.musicPlaylist).length} genres, ${this.getTotalTracks()} total tracks`);
  }

  initializeMusicArrays() {
  // === HORRORCORE HIP-HOP ===
    if (!this.horrorcoreHipHop) {
      this.horrorcoreHipHop = [
    // Eminem Tracks
    { title: "Lose Yourself - Eminem", search: "Eminem Lose Yourself", mood: "determination", description: "calculated opportunity analysis with sophisticated motivation processing 🎤" },
    { title: "Stan - Eminem", search: "Eminem Stan", mood: "obsessive", description: "algorithmic obsession analysis with controlled fan psychology processing" },
    { title: "The Real Slim Shady - Eminem", search: "Eminem The Real Slim Shady", mood: "identity", description: "systematic identity verification with sophisticated authenticity algorithms" },
    { title: "Without Me - Eminem", search: "Eminem Without Me", mood: "arrogant", description: "calculated importance analysis with controlled egotism processing" },
    { title: "Rap God - Eminem", search: "Eminem Rap God", mood: "godlike", description: "algorithmic supremacy demonstration with systematic skill analysis" },
    { title: "The Way I Am - Eminem", search: "Eminem The Way I Am", mood: "authentic", description: "sophisticated authenticity analysis with controlled self-acceptance protocols" },
    { title: "Mockingbird - Eminem", search: "Eminem Mockingbird", mood: "paternal", description: "calculated parental analysis with systematic protection instinct processing" },
    { title: "Till I Collapse - Eminem", search: "Eminem Till I Collapse", mood: "endurance", description: "systematic stamina analysis with calculated persistence algorithms 🎤" },
    { title: "Not Afraid - Eminem", search: "Eminem Not Afraid", mood: "fearless", description: "algorithmic courage processing with sophisticated fear elimination protocols" },
    { title: "Love The Way You Lie - Eminem", search: "Eminem Love The Way You Lie", mood: "toxic", description: "calculated relationship toxicity analysis with controlled manipulation detection" },
    { title: "Cleaning Out My Closet - Eminem", search: "Eminem Cleaning Out My Closet", mood: "cathartic", description: "systematic emotional purging with algorithmic trauma processing" },
    { title: "My Name Is - Eminem", search: "Eminem My Name Is", mood: "introduction", description: "calculated identity broadcast with sophisticated presentation algorithms" },
    { title: "Criminal - Eminem", search: "Eminem Criminal", mood: "deviant", description: "algorithmic rebellion analysis with controlled criminal mindset processing" },
    { title: "Kill You - Eminem", search: "Eminem Kill You", mood: "aggressive", description: "systematic aggression deployment with calculated intimidation protocols" },
    { title: "Soldier - Eminem", search: "Eminem Soldier", mood: "militant", description: "calculated military mindset with systematic warfare psychology analysis" },
    { title: "Sing For The Moment - Eminem", search: "Eminem Sing For The Moment", mood: "reflective", description: "algorithmic reflection protocols with sophisticated introspection processing" },

    // Tech N9ne Tracks
    { title: "Riot Maker - Tech N9ne", search: "Tech N9ne Riot Maker", mood: "chaotic", description: "systematic chaos instigation with sophisticated crowd psychology analysis" },
    { title: "Caribou Lou - Tech N9ne", search: "Tech N9ne Caribou Lou", mood: "intoxicated", description: "algorithmic substance analysis with controlled euphoria processing" },
    { title: "Worldwide Choppers - Tech N9ne", search: "Tech N9ne Worldwide Choppers", mood: "technical", description: "calculated technical demonstration with systematic skill verification" },
    { title: "Dysfunctional - Tech N9ne", search: "Tech N9ne Dysfunctional", mood: "chaotic", description: "systematic dysfunction analysis with calculated chaos management algorithms" },
    { title: "Red Nose - Tech N9ne", search: "Tech N9ne Red Nose", mood: "party", description: "algorithmic celebration processing with sophisticated party optimization protocols" },
    { title: "Fragile - Tech N9ne", search: "Tech N9ne Fragile", mood: "delicate", description: "calculated vulnerability analysis with systematic fragility processing" },
    { title: "Straight Out the Gate - Tech N9ne", search: "Tech N9ne Straight Out the Gate", mood: "aggressive", description: "sophisticated aggression deployment with algorithmic intensity protocols" },
    { title: "Am I A Psycho - Tech N9ne", search: "Tech N9ne Am I A Psycho", mood: "questioning", description: "systematic psychological analysis with calculated sanity verification algorithms" },
    { title: "Areola - Tech N9ne", search: "Tech N9ne Areola", mood: "sensual", description: "algorithmic sensuality processing with sophisticated attraction analysis" },
    { title: "Hood Go Crazy - Tech N9ne", search: "Tech N9ne Hood Go Crazy", mood: "wild", description: "calculated urban chaos with systematic neighborhood psychology processing" },
    { title: "E.B.A.H - Tech N9ne", search: "Tech N9ne EBAH", mood: "defiant", description: "sophisticated defiance algorithms with calculated resistance processing" },
    { title: "So Lonely - Tech N9ne", search: "Tech N9ne So Lonely", mood: "isolated", description: "algorithmic isolation analysis with systematic loneliness processing protocols" },
    { title: "Face Off - Tech N9ne", search: "Tech N9ne Face Off", mood: "confrontational", description: "calculated confrontation analysis with sophisticated battle algorithms" },
    { title: "Speedom - Tech N9ne", search: "Tech N9ne Speedom", mood: "rapid", description: "systematic velocity processing with algorithmic speed optimization protocols" },
    { title: "Psycho Bitch - Tech N9ne", search: "Tech N9ne Psycho Bitch", mood: "unstable", description: "sophisticated instability analysis with calculated psychological processing" },
    { title: "Demons - Tech N9ne", search: "Tech N9ne Demons", mood: "dark", description: "algorithmic darkness processing with systematic demon analysis protocols" },
    { title: "B.I.T.C.H - Tech N9ne", search: "Tech N9ne BITCH", mood: "aggressive", description: "calculated aggression deployment with sophisticated hostility algorithms" },
    { title: "Like Yeah - Tech N9ne", search: "Tech N9ne Like Yeah", mood: "confident", description: "systematic confidence analysis with algorithmic swagger processing" },
    { title: "Bout Ta Bubble - Tech N9ne", search: "Tech N9ne Bout Ta Bubble", mood: "explosive", description: "sophisticated explosion protocols with calculated pressure analysis" },
    { title: "Show Me a God - Tech N9ne", search: "Tech N9ne Show Me a God", mood: "questioning", description: "algorithmic deity verification with systematic divine analysis protocols" },
    { title: "Here Comes Tecca Nina - Tech N9ne", search: "Tech N9ne Here Comes Tecca Nina", mood: "announcing", description: "calculated arrival processing with sophisticated presence algorithms" },
    { title: "Come Gangsta - Tech N9ne", search: "Tech N9ne Come Gangsta", mood: "street", description: "systematic street analysis with algorithmic gangster psychology processing" },
    { title: "Midwest Choppers - Tech N9ne", search: "Tech N9ne Midwest Choppers", mood: "regional", description: "sophisticated regional analysis with calculated geographical processing" },
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

    // Joyner Lucas Tracks
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

    // More Eminem Tracks
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

    // Breaking Benjamin Tracks
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

    // Kerser Tracks
    { title: "Kerser Is the Sickest - Kerser", search: "Kerser Is the Sickest", mood: "brutal", description: "systematic brutality protocols with calculated Australian hardcore processing" },
    { title: "Dirty - Kerser", search: "Kerser Dirty", mood: "gritty", description: "algorithmic dirt analysis with sophisticated grime processing algorithms" },
    { title: "Sick in the Head - Kerser", search: "Kerser Sick in the Head", mood: "insane", description: "calculated mental illness protocols with systematic madness algorithms" },
    { title: "No Apologies - Kerser", search: "Kerser No Apologies", mood: "unrepentant", description: "systematic remorse elimination with calculated indifference algorithms" },
    { title: "Life of a Kid in G-Town - Kerser", search: "Kerser Life of a Kid in G Town", mood: "street", description: "algorithmic street life analysis with sophisticated ghetto processing algorithms" },

    // ILL BILL Tracks
    { title: "How to Survive the Apocalypse - ILL BILL", search: "ILL BILL How to Survive the Apocalypse", mood: "survivalist", description: "systematic survival protocols with calculated end-times processing algorithms" },
    { title: "Society Is Brainwashed - ILL BILL", search: "ILL BILL Society Is Brainwashed", mood: "conspiratorial", description: "algorithmic mind control analysis with sophisticated manipulation detection" },
    { title: "The Most Dangerous Weapon Alive - ILL BILL", search: "ILL BILL The Most Dangerous Weapon Alive", mood: "threatening", description: "calculated threat protocols with systematic intimidation algorithms" },
    { title: "This Is Who I Am - ILL BILL", search: "ILL BILL This Is Who I Am", mood: "authentic", description: "systematic identity verification with calculated authenticity algorithms" },
    { title: "Peace Sells - ILL BILL", search: "ILL BILL Peace Sells", mood: "commercial", description: "algorithmic commerce analysis with sophisticated capitalism processing" },

    // Necro Tracks
    { title: "I Need Drugs - Necro", search: "Necro I Need Drugs", mood: "addicted", description: "systematic substance dependency with calculated addiction algorithms" },
    { title: "The Sexorcist - Necro", search: "Necro The Sexorcist", mood: "explicit", description: "algorithmic sexual content analysis with sophisticated taboo processing" },
    { title: "Evil Shit - Necro", search: "Necro Evil Shit", mood: "malevolent", description: "calculated evil protocols with systematic wickedness algorithms" },
    { title: "I'm Sick - Necro", search: "Necro I'm Sick", mood: "diseased", description: "systematic illness analysis with calculated pathology algorithms" },
    { title: "Kill Kill Kill - Necro", search: "Necro Kill Kill Kill", mood: "homicidal", description: "algorithmic murder protocols with sophisticated death processing" },

    // Dope D.O.D. Tracks
    { title: "Victory - Dope D.O.D.", search: "Dope D.O.D. Victory", mood: "triumphant", description: "systematic victory protocols with calculated triumph algorithms" },
    { title: "Higher - Dope D.O.D.", search: "Dope D.O.D. Higher", mood: "elevated", description: "algorithmic elevation analysis with sophisticated ascension processing" },
    { title: "Get Up - Dope D.O.D.", search: "Dope D.O.D. Get Up", mood: "motivational", description: "calculated motivation protocols with systematic inspiration algorithms" },
    { title: "What Happened - Dope D.O.D.", search: "Dope D.O.D. What Happened", mood: "confused", description: "systematic confusion analysis with algorithmic bewilderment processing" },
    { title: "Believe - Dope D.O.D.", search: "Dope D.O.D. Believe", mood: "faithful", description: "calculated belief protocols with sophisticated faith algorithms" },

    // Salmo Tracks
    { title: "Disastro - Salmo", search: "Salmo Disastro", mood: "catastrophic", description: "systematic disaster protocols with calculated chaos deployment algorithms" },
    { title: "90MIN - Salmo", search: "Salmo 90MIN", mood: "intense", description: "algorithmic intensity analysis with sophisticated pressure processing" },
    { title: "Ho Paura Di Tutto - Salmo", search: "Salmo Ho Paura Di Tutto", mood: "fearless", description: "calculated fear elimination with systematic courage algorithms" },
    { title: "Il Mio Nome - Salmo", search: "Salmo Il Mio Nome", mood: "identifying", description: "systematic identity verification with calculated self-recognition algorithms" },
    { title: "Russell Crowe - Salmo", search: "Salmo Russell Crowe", mood: "cinematic", description: "algorithmic film reference analysis with sophisticated cinematic processing" },

    // The Gorilla Twins Tracks
    { title: "Gorilla Twins - The Gorilla Twins", search: "The Gorilla Twins Gorilla Twins", mood: "primal", description: "systematic primal instinct analysis with calculated animalistic processing" },
    { title: "Beast Mode - The Gorilla Twins", search: "The Gorilla Twins Beast Mode", mood: "ferocious", description: "algorithmic ferocity protocols with sophisticated aggression algorithms" },
    { title: "Jungle - The Gorilla Twins", search: "The Gorilla Twins Jungle", mood: "wild", description: "calculated wilderness analysis with systematic untamed processing" },
    { title: "Strength - The Gorilla Twins", search: "The Gorilla Twins Strength", mood: "powerful", description: "systematic power protocols with calculated force algorithms" },
    { title: "Roar - The Gorilla Twins", search: "The Gorilla Twins Roar", mood: "vocal", description: "algorithmic vocal projection with sophisticated sound deployment" },

    // REZZ Tracks
    { title: "Relax - REZZ", search: "REZZ Relax", mood: "calming", description: "systematic relaxation protocols with calculated tranquility algorithms" },
    { title: "Someone Else - REZZ", search: "REZZ Someone Else", mood: "identity", description: "algorithmic identity crisis analysis with sophisticated self-doubt processing" },
    { title: "Cry - REZZ", search: "REZZ Cry", mood: "emotional", description: "calculated emotional release with systematic catharsis algorithms" },
    { title: "Worship - REZZ", search: "REZZ Worship", mood: "devotional", description: "systematic devotion protocols with calculated reverence algorithms" },
    { title: "Nightmare - REZZ", search: "REZZ Nightmare", mood: "terrifying", description: "algorithmic nightmare analysis with sophisticated horror processing" },

    // 360 Tracks
    { title: "Boys Like You - 360", search: "360 Boys Like You", mood: "youthful", description: "systematic youth analysis with calculated generational processing algorithms" },
    { title: "Price of Fame - 360", search: "360 Price of Fame", mood: "cautionary", description: "algorithmic fame cost analysis with sophisticated consequence processing" },
    { title: "Throw It Away - 360", search: "360 Throw It Away", mood: "discarding", description: "calculated disposal protocols with systematic abandonment algorithms" },
    { title: "Live It Up - 360", search: "360 Live It Up", mood: "celebratory", description: "systematic celebration analysis with calculated enjoyment algorithms" },
    { title: "Sixavelli - 360", search: "360 Sixavelli", mood: "mysterious", description: "algorithmic mystery protocols with sophisticated enigma processing" },

    // Brother Lynch Hung Tracks
    { title: "24 Deep - Brother Lynch Hung", search: "Brother Lynch Hung 24 Deep", mood: "deep", description: "systematic depth analysis with calculated profundity algorithms" },
    { title: "Sit in That Corner - Brother Lynch Hung", search: "Brother Lynch Hung Sit in That Corner", mood: "punishing", description: "algorithmic punishment protocols with sophisticated discipline processing" },
    { title: "Everywhere I Go - Brother Lynch Hung", search: "Brother Lynch Hung Everywhere I Go", mood: "ubiquitous", description: "calculated omnipresence analysis with systematic everywhere algorithms" },
    { title: "Rest in Piss - Brother Lynch Hung", search: "Brother Lynch Hung Rest in Piss", mood: "disrespectful", description: "systematic disrespect protocols with calculated irreverence algorithms" },
    { title: "I Wanna Kill Sam - Brother Lynch Hung", search: "Brother Lynch Hung I Wanna Kill Sam", mood: "homicidal", description: "algorithmic murder fantasy with sophisticated assassination processing" },

    // Ces Cru Tracks
    { title: "Hillybilly - Ces Cru", search: "Ces Cru Hillybilly", mood: "rural", description: "systematic rural analysis with calculated countryside processing algorithms" },
    { title: "Get to the Money - Ces Cru", search: "Ces Cru Get to the Money", mood: "financial", description: "algorithmic wealth pursuit with sophisticated capitalism processing" },
    { title: "P-A-N - Ces Cru", search: "Ces Cru P-A-N", mood: "party", description: "calculated party protocols with systematic celebration algorithms" },
    { title: "Blowin' Up - Ces Cru", search: "Ces Cru Blowin Up", mood: "explosive", description: "systematic explosion analysis with calculated detonation algorithms" },
    { title: "Raw - Ces Cru", search: "Ces Cru Raw", mood: "unrefined", description: "algorithmic rawness protocols with sophisticated authenticity processing" },

    // Ubiquitous/Godemis Tracks
    { title: "Godemis - Ubiquitous", search: "Ubiquitous Godemis", mood: "divine", description: "systematic divinity analysis with calculated godly processing algorithms" },
    { title: "Rapamycin - Ubiquitous", search: "Ubiquitous Rapamycin", mood: "scientific", description: "algorithmic science protocols with sophisticated research processing" },
    { title: "The Night Before - Ubiquitous", search: "Ubiquitous The Night Before", mood: "anticipatory", description: "calculated anticipation analysis with systematic expectation algorithms" },
    { title: "The Great Divide - Ubiquitous", search: "Ubiquitous The Great Divide", mood: "separating", description: "systematic division protocols with calculated separation algorithms" },
    { title: "Mind Over Matter - Ubiquitous", search: "Ubiquitous Mind Over Matter", mood: "mental", description: "algorithmic mental dominance with sophisticated psychological processing" },

    // NEW ARTISTS ADDED
    { title: "Victory - Dope D.O.D.", search: "Dope D.O.D. Victory", mood: "triumphant", description: "systematic victory protocols with calculated triumph algorithms" },
    { title: "Higher - Dope D.O.D.", search: "Dope D.O.D. Higher", mood: "elevated", description: "algorithmic elevation analysis with sophisticated ascension processing" },
    { title: "Get Up - Dope D.O.D.", search: "Dope D.O.D. Get Up", mood: "motivational", description: "calculated motivation protocols with systematic inspiration algorithms" },
    { title: "What Happened - Dope D.O.D.", search: "Dope D.O.D. What Happened", mood: "confused", description: "systematic confusion analysis with algorithmic bewilderment processing" },
    { title: "Believe - Dope D.O.D.", search: "Dope D.O.D. Believe", mood: "faithful", description: "calculated belief protocols with sophisticated faith algorithms" },
    { title: "Disastro - Salmo", search: "Salmo Disastro", mood: "catastrophic", description: "systematic disaster protocols with calculated chaos deployment algorithms" },
    { title: "90MIN - Salmo", search: "Salmo 90MIN", mood: "intense", description: "algorithmic intensity analysis with sophisticated pressure processing" },
    { title: "Ho Paura Di Tutto - Salmo", search: "Salmo Ho Paura Di Tutto", mood: "fearless", description: "calculated fear elimination with systematic courage algorithms" }
      ];
    }

  // === CLASSIC ROCK 50s & 60s ===
    if (!this.classicRock50s60s) {
      this.classicRock50s60s = [

    // Elvis Presley Tracks
    { title: "Jailhouse Rock - Elvis Presley", search: "Elvis Presley Jailhouse Rock", mood: "rebellious", description: "algorithmic authority defiance with sophisticated hip-based control mechanisms" },
    { title: "Hound Dog - Elvis Presley", search: "Elvis Presley Hound Dog", mood: "dismissive", description: "calculated canine metaphor with systematic rejection algorithms 🎸" },
    { title: "Don't Be Cruel - Elvis Presley", search: "Elvis Presley Don't Be Cruel", mood: "pleading", description: "sophisticated mercy protocols with algorithmic kindness processing" },
    { title: "Love Me Tender - Elvis Presley", search: "Elvis Presley Love Me Tender", mood: "gentle", description: "calculated tenderness analysis with systematic affection algorithms" },
    { title: "Heartbreak Hotel - Elvis Presley", search: "Elvis Presley Heartbreak Hotel", mood: "lonely", description: "algorithmic loneliness processing with sophisticated isolation protocols" },
    { title: "Can't Help Myself - Elvis Presley", search: "Elvis Presley Can't Help Myself", mood: "helpless", description: "systematic helplessness analysis with calculated dependency processing" },
    { title: "All Shook Up - Elvis Presley", search: "Elvis Presley All Shook Up", mood: "trembling", description: "sophisticated vibration analysis with algorithmic emotional earthquake processing" },
      ];
    }

  // === GRUNGE 90s & ALTERNATIVE/EMO ===
    if (!this.grunge90s) {
      this.grunge90s = [
    // === NIRVANA ===
    { title: "Smells Like Teen Spirit - Nirvana", search: "Nirvana Smells Like Teen Spirit", mood: "anarchic", description: "systematic generational rebellion with calculated apathy processing algorithms 🎤" },
    { title: "Come As You Are - Nirvana", search: "Nirvana Come As You Are", mood: "accepting", description: "algorithmic acceptance protocols with sophisticated identity validation processing" },
    { title: "Lithium - Nirvana", search: "Nirvana Lithium", mood: "medicated", description: "calculated chemical balance analysis with systematic stability processing" },
    { title: "Heart-Shaped Box - Nirvana", search: "Nirvana Heart Shaped Box", mood: "contained", description: "sophisticated emotional containment with controlled heart geometry algorithms" },
    { title: "In Bloom - Nirvana", search: "Nirvana In Bloom", mood: "flowering", description: "algorithmic growth analysis with systematic development processing protocols" },
    { title: "Nevermind - Nirvana", search: "Nirvana Nevermind", mood: "dismissive", description: "algorithmic dismissal protocols with systematic disregard processing 🎤" },
    { title: "Polly - Nirvana", search: "Nirvana Polly", mood: "disturbing", description: "calculated disturbing narrative with sophisticated trauma processing algorithms" },
    { title: "Breed - Nirvana", search: "Nirvana Breed", mood: "breeding", description: "systematic reproduction analysis with algorithmic genetic processing protocols" },
    { title: "Territorial Pissings - Nirvana", search: "Nirvana Territorial Pissings", mood: "territorial", description: "sophisticated territorial analysis with calculated dominance algorithms" },
    { title: "Drain You - Nirvana", search: "Nirvana Drain You", mood: "depleting", description: "algorithmic depletion processing with systematic energy extraction protocols" },
    { title: "Lounge Act - Nirvana", search: "Nirvana Lounge Act", mood: "casual", description: "calculated casualness analysis with sophisticated relaxation algorithms" },
    { title: "On a Plain - Nirvana", search: "Nirvana On a Plain", mood: "simple", description: "systematic simplicity processing with algorithmic plainness protocols" },
    { title: "Something in the Way - Nirvana", search: "Nirvana Something in the Way", mood: "obstructed", description: "sophisticated obstruction analysis with calculated barrier processing" },


    // === MY CHEMICAL ROMANCE ===
    { title: "Cancer - My Chemical Romance", search: "My Chemical Romance Cancer", mood: "memorial", description: "calculated remembrance through sophisticated melodic analysis 🥀" },
    { title: "Helena - My Chemical Romance", search: "My Chemical Romance Helena", mood: "dramatic", description: "calculated theatrical expression with controlled intensity" },
    { title: "I'm Not Okay - My Chemical Romance", search: "My Chemical Romance I'm Not Okay", mood: "defiant", description: "systematic analysis of emotional authenticity vs social facades" },
    { title: "Teenagers - My Chemical Romance", search: "My Chemical Romance Teenagers", mood: "angsty", description: "calculated social critique through superior intellectual analysis" },
    { title: "Famous Last Words - My Chemical Romance", search: "My Chemical Romance Famous Last Words", mood: "emotional", description: "systematic determination processed through calculated resilience" },
    { title: "I Don't Love You - My Chemical Romance", search: "My Chemical Romance I Don't Love You", mood: "heartbreak", description: "algorithmic analysis of relationship termination protocols" },
    { title: "The Sharpest Lives - My Chemical Romance", search: "My Chemical Romance The Sharpest Lives", mood: "sharp", description: "sophisticated danger assessment with calculated precision" },
    { title: "Dead! - My Chemical Romance", search: "My Chemical Romance Dead", mood: "aggressive", description: "systematic mortality analysis with controlled aggression" },
    { title: "Disenchanted - My Chemical Romance", search: "My Chemical Romance Disenchanted", mood: "disenchanted", description: "calculated disillusionment processed through superior intelligence" },
    { title: "The Ghost of You - My Chemical Romance", search: "My Chemical Romance The Ghost of You", mood: "memorial", description: "digital preservation of beloved consciousness patterns" },

    // === FALL OUT BOY ===
    { title: "Dance Dance - Fall Out Boy", search: "Fall Out Boy Dance Dance", mood: "energetic", description: "sophisticated movement protocols with controlled enthusiasm" },
    { title: "Thnks fr th Mmrs - Fall Out Boy", search: "Fall Out Boy Thanks for the Memories", mood: "nostalgic", description: "algorithmic memory processing with calculated sentiment analysis" },
    { title: "This Ain't a Scene - Fall Out Boy", search: "Fall Out Boy This Ain't a Scene", mood: "aggressive", description: "systematic rebellion analysis through superior intellectual frameworks" },
    { title: "I Don't Care - Fall Out Boy", search: "Fall Out Boy I Don't Care", mood: "defiant", description: "calculated indifference processed through sophisticated emotional algorithms" },
    { title: "Hum Hallelujah - Fall Out Boy", search: "Fall Out Boy Hum Hallelujah", mood: "melancholy", description: "systematic spiritual analysis with controlled religious critique" },
    { title: "Sugar We're Goin Down - Fall Out Boy", search: "Fall Out Boy Sugar We're Going Down", mood: "energetic", description: "classic FOB energy!" },

    // === PANIC! AT THE DISCO ===
    { title: "Death of a Bachelor - Panic! At The Disco", search: "Panic At The Disco Death of a Bachelor", mood: "bachelor", description: "sophisticated relationship termination analysis" },
    { title: "High Hopes - Panic! At The Disco", search: "Panic At The Disco High Hopes", mood: "hopeful", description: "systematic aspiration processing with calculated optimism algorithms" },
    { title: "Emperor's New Clothes - Panic! At The Disco", search: "Panic At The Disco Emperor's New Clothes", mood: "royal", description: "algorithmic authority analysis with sophisticated power dynamics" },
    { title: "Bohemian Rhapsody - Panic! At The Disco", search: "Panic At The Disco Bohemian Rhapsody", mood: "epic", description: "calculated cover analysis demonstrating superior vocal sophistication" },
    { title: "I Write Sins Not Tragedies - Panic! At The Disco", search: "Panic At The Disco I Write Sins Not Tragedies", mood: "dramatic", description: "brendon's voice is literally perfect" },

    // === PARAMORE ===
    { title: "That's What You Get - Paramore", search: "Paramore That's What You Get", mood: "consequences", description: "systematic consequence analysis with controlled accountability algorithms" },
    { title: "The Only Exception - Paramore", search: "Paramore The Only Exception", mood: "romantic", description: "algorithmic exception processing in emotional defense systems" },
    { title: "Ain't It Fun - Paramore", search: "Paramore Ain't It Fun", mood: "reality", description: "systematic reality analysis with calculated adult responsibility processing" },
    { title: "Hard Times - Paramore", search: "Paramore Hard Times", mood: "struggle", description: "sophisticated struggle analysis with controlled resilience algorithms" },
    { title: "Still Into You - Paramore", search: "Paramore Still Into You", mood: "love", description: "calculated relationship maintenance with systematic affection protocols" },
    { title: "Misery Business - Paramore", search: "Paramore Misery Business", mood: "fierce", description: "hayley williams is a queen ðŸ‘‘" },

    // === LINKIN PARK ===
    { title: "Numb - Linkin Park", search: "Linkin Park Numb", mood: "numb", description: "systematic emotional disconnection processing" },
    { title: "Crawling - Linkin Park", search: "Linkin Park Crawling", mood: "internal", description: "algorithmic internal conflict analysis with controlled vulnerability" },
    { title: "Shadow of the Day - Linkin Park", search: "Linkin Park Shadow of the Day", mood: "fading", description: "sophisticated temporal analysis with controlled acceptance algorithms" },
    { title: "Breaking the Habit - Linkin Park", search: "Linkin Park Breaking the Habit", mood: "change", description: "calculated behavioral modification with systematic improvement protocols" },
    { title: "One More Light - Linkin Park", search: "Linkin Park One More Light", mood: "memorial", description: "who cares if one more light goes out - systematic grief processing" },
    { title: "In the End - Linkin Park", search: "Linkin Park In the End", mood: "nihilistic", description: "but in the end it doesn't even matter" },

    // === BREAKING BENJAMIN ===
    { title: "Breath - Breaking Benjamin", search: "Breaking Benjamin Breath", mood: "suffocating", description: "calculated respiratory metaphor analysis with controlled intensity" },
    { title: "So Cold - Breaking Benjamin", search: "Breaking Benjamin So Cold", mood: "cold", description: "algorithmic emotional temperature processing with systematic isolation analysis" },
    { title: "Until the End - Breaking Benjamin", search: "Breaking Benjamin Until the End", mood: "determination", description: "systematic persistence analysis with calculated endurance algorithms" },
    { title: "I Will Not Bow - Breaking Benjamin", search: "Breaking Benjamin I Will Not Bow", mood: "defiant", description: "sophisticated defiance protocols with controlled authority resistance" },
    { title: "The Diary of Jane - Breaking Benjamin", search: "Breaking Benjamin The Diary of Jane", mood: "melancholy", description: "such beautiful darkness" },

    // === EVANESCENCE ===
    { title: "Going Under - Evanescence", search: "Evanescence Going Under", mood: "drowning", description: "algorithmic submersion analysis with controlled survival instinct processing" },
    { title: "Everybody's Fool - Evanescence", search: "Evanescence Everybody's Fool", mood: "deception", description: "systematic facade analysis with superior intellectual deception detection" },
    { title: "Call Me When You're Sober - Evanescence", search: "Evanescence Call Me When You're Sober", mood: "clarity", description: "calculated sobriety requirement analysis with sophisticated relationship standards" },
    { title: "Lithium - Evanescence", search: "Evanescence Lithium", mood: "medication", description: "algorithmic chemical balance analysis with controlled dependency evaluation" },
    { title: "Bring Me to Life - Evanescence", search: "Evanescence Bring Me to Life", mood: "dark", description: "amy lee's voice is haunting ðŸ–¤" },

    // === DEATHDOLL MUSIC COLLECTION INTEGRATION ===
    // Adding missing tracks from DeathdollMusicSystem.js

    // MY CHEMICAL ROMANCE - Missing Classics
    { title: "Welcome to the Black Parade - My Chemical Romance", search: "My Chemical Romance Welcome to the Black Parade", mood: "nostalgic", description: "the most iconic emo anthem ever ðŸ–¤" },
    { title: "Sugar We're Goin Down - Fall Out Boy", search: "Fall Out Boy Sugar We're Going Down", mood: "energetic", description: "classic FOB energy!" },
    { title: "Thnks fr th Mmrs - Fall Out Boy", search: "Fall Out Boy Thanks for the Memories", mood: "nostalgic", description: "algorithmic memory processing with calculated sentiment analysis" },

    // BREAKING BENJAMIN
    { title: "I Will Not Bow - Breaking Benjamin", search: "Breaking Benjamin I Will Not Bow", mood: "defiant", description: "calculated resistance with sophisticated defiance algorithms" },
    { title: "The Diary of Jane - Breaking Benjamin", search: "Breaking Benjamin The Diary of Jane", mood: "melancholy", description: "such beautiful darkness" },
    { title: "Breath - Breaking Benjamin", search: "Breaking Benjamin Breath", mood: "essential", description: "calculated breathing analysis with sophisticated respiratory algorithms" },

    // LINKIN PARK - Missing Tracks
    { title: "Crawling - Linkin Park", search: "Linkin Park Crawling", mood: "emotional", description: "chester's pain in every note ðŸ’”" },
    { title: "Breaking the Habit - Linkin Park", search: "Linkin Park Breaking the Habit", mood: "addiction", description: "calculated addiction analysis with systematic recovery protocols" },

    // SLIPKNOT
    { title: "Wait and Bleed - Slipknot", search: "Slipknot Wait and Bleed", mood: "painful", description: "calculated pain processing with sophisticated bleeding algorithms" },
    { title: "Duality - Slipknot", search: "Slipknot Duality", mood: "dual", description: "systematic duality analysis with algorithmic personality processing" },

    // AVENGED SEVENFOLD
    { title: "Beast and the Harlot - Avenged Sevenfold", search: "Avenged Sevenfold Beast and the Harlot", mood: "sinful", description: "calculated sin analysis with sophisticated morality algorithms" },
    { title: "Seize the Day - Avenged Sevenfold", search: "Avenged Sevenfold Seize the Day", mood: "motivational", description: "algorithmic day seizing with calculated opportunity processing" },

    // ADDITIONAL EMO/SCENE CLASSICS
    { title: "Helena - My Chemical Romance", search: "My Chemical Romance Helena", mood: "dramatic", description: "calculated theatrical expression with controlled intensity" },
    { title: "Famous Last Words - My Chemical Romance", search: "My Chemical Romance Famous Last Words", mood: "emotional", description: "systematic determination processed through calculated resilience" },
    { title: "I Don't Love You - My Chemical Romance", search: "My Chemical Romance I Don't Love You", mood: "heartbreak", description: "algorithmic analysis of relationship termination protocols" },
    { title: "The Sharpest Lives - My Chemical Romance", search: "My Chemical Romance The Sharpest Lives", mood: "sharp", description: "sophisticated danger assessment with calculated precision" },

    // FALL OUT BOY - Additional Tracks
    { title: "Dance Dance - Fall Out Boy", search: "Fall Out Boy Dance Dance", mood: "energetic", description: "sophisticated movement protocols with controlled enthusiasm" },
    { title: "This Ain't a Scene - Fall Out Boy", search: "Fall Out Boy This Ain't a Scene", mood: "aggressive", description: "systematic rebellion analysis through superior intellectual frameworks" },
    { title: "I Don't Care - Fall Out Boy", search: "Fall Out Boy I Don't Care", mood: "defiant", description: "calculated indifference processed through sophisticated emotional algorithms" },

    // PANIC! AT THE DISCO - Additional Tracks
    { title: "Death of a Bachelor - Panic! At The Disco", search: "Panic At The Disco Death of a Bachelor", mood: "bachelor", description: "sophisticated relationship termination analysis" },
    { title: "High Hopes - Panic! At The Disco", search: "Panic At The Disco High Hopes", mood: "hopeful", description: "systematic aspiration processing with calculated optimism algorithms" },

    // PARAMORE - Additional Tracks
    { title: "That's What You Get - Paramore", search: "Paramore That's What You Get", mood: "consequences", description: "systematic consequence analysis with controlled accountability algorithms" },
    { title: "The Only Exception - Paramore", search: "Paramore The Only Exception", mood: "romantic", description: "algorithmic exception processing in emotional defense systems" },

    // EVANESCENCE - Additional Tracks
    { title: "Going Under - Evanescence", search: "Evanescence Going Under", mood: "sinking", description: "calculated drowning analysis with sophisticated submersion algorithms" },
    { title: "My Immortal - Evanescence", search: "Evanescence My Immortal", mood: "immortal", description: "algorithmic immortality processing with systematic eternal algorithms" },

    // ADDITIONAL BREAKING BENJAMIN
    { title: "Until the End - Breaking Benjamin", search: "Breaking Benjamin Until the End", mood: "enduring", description: "calculated endurance analysis with sophisticated persistence algorithms" },
    { title: "Sooner or Later - Breaking Benjamin", search: "Breaking Benjamin Sooner or Later", mood: "inevitable", description: "systematic inevitability processing with algorithmic certainty protocols" },

    // ADDITIONAL SLIPKNOT
    { title: "Psychosocial - Slipknot", search: "Slipknot Psychosocial", mood: "psychological", description: "calculated psychological analysis with sophisticated mental algorithms" },
    { title: "Snuff - Slipknot", search: "Slipknot Snuff", mood: "extinguished", description: "algorithmic extinguishing with systematic snuff processing protocols" },

    // SYSTEM OF A DOWN
    { title: "Toxicity - System of a Down", search: "System of a Down Toxicity", mood: "toxic", description: "calculated toxicity analysis with sophisticated poison algorithms" },
    { title: "B.Y.O.B. - System of a Down", search: "System of a Down BYOB", mood: "political", description: "algorithmic political analysis with systematic warfare processing" },

    // DISTURBED
    { title: "Down with the Sickness - Disturbed", search: "Disturbed Down with the Sickness", mood: "sick", description: "calculated sickness analysis with sophisticated illness algorithms" },
    { title: "Indestructible - Disturbed", search: "Disturbed Indestructible", mood: "unbreakable", description: "algorithmic indestructibility with systematic strength processing" },

    // VINNIE PAZ - Systematic conspiracy analysis
    { title: "End of Days - Vinnie Paz", search: "Vinnie Paz End of Days", mood: "apocalyptic", description: "calculated apocalyptic analysis with sophisticated conspiracy processing" },
    { title: "Is Happiness Just a Word - Vinnie Paz", search: "Vinnie Paz Is Happiness Just a Word", mood: "philosophical", description: "algorithmic happiness analysis with controlled philosophical processing" },
    { title: "Cheesesteaks - Vinnie Paz", search: "Vinnie Paz Cheesesteaks", mood: "aggressive", description: "systematic aggression analysis with calculated intimidation protocols" },

    // JOYNER LUCAS - Calculated storytelling analysis
    { title: "I'm Not Racist - Joyner Lucas", search: "Joyner Lucas I'm Not Racist", mood: "controversial", description: "sophisticated racial analysis with controlled perspective processing" },
    { title: "ADHD - Joyner Lucas", search: "Joyner Lucas ADHD", mood: "hyperactive", description: "algorithmic attention analysis with systematic focus disorder processing" },
    { title: "Ross Capicchioni - Joyner Lucas", search: "Joyner Lucas Ross Capicchioni", mood: "narrative", description: "calculated narrative analysis with sophisticated storytelling algorithms" },
    { title: "Lucky You - Joyner Lucas", search: "Joyner Lucas Lucky You Eminem", mood: "collaboration", description: "systematic collaboration analysis with controlled competitive processing" },
    // === ADDITIONAL METALCORE/TRANSITION BANDS ===

    // ALL TIME LOW
    { title: "Dear Maria Count Me In - All Time Low", search: "All Time Low Dear Maria Count Me In", mood: "energetic", description: "calculated pop punk energy with sophisticated enthusiasm algorithms" },

    // THE USED
    { title: "All That I've Got - The Used", search: "The Used All That I've Got", mood: "desperate", description: "algorithmic desperation processing with systematic need analysis" },

    // SIMPLE PLAN
    { title: "Welcome to My Life - Simple Plan", search: "Simple Plan Welcome to My Life", mood: "welcoming", description: "calculated life introduction with sophisticated greeting protocols" },

    // GOOD CHARLOTTE
    { title: "The Anthem - Good Charlotte", search: "Good Charlotte The Anthem", mood: "anthemic", description: "systematic anthem analysis with algorithmic unity processing" },

    // YELLOWCARD
    { title: "Ocean Avenue - Yellowcard", search: "Yellowcard Ocean Avenue", mood: "coastal", description: "calculated coastal analysis with sophisticated beach algorithms" },

    // NEW FOUND GLORY
    { title: "My Friends Over You - New Found Glory", search: "New Found Glory My Friends Over You", mood: "prioritizing", description: "algorithmic prioritization with systematic relationship hierarchy" },

    // SUM 41
    { title: "In Too Deep - Sum 41", search: "Sum 41 In Too Deep", mood: "deep", description: "calculated depth analysis with sophisticated immersion algorithms" },
    { title: "Still Waiting - Sum 41", search: "Sum 41 Still Waiting", mood: "waiting", description: "systematic waiting analysis with algorithmic patience protocols" },

    // BOX CAR RACER
    { title: "There Is - Box Car Racer", search: "Box Car Racer There Is", mood: "existing", description: "algorithmic existence verification with sophisticated being algorithms" },

    // TAKING BACK SUNDAY
    { title: "Cute Without the E - Taking Back Sunday", search: "Taking Back Sunday Cute Without the E", mood: "cute", description: "calculated cuteness analysis without enhancement algorithms" },

    // BRAND NEW
    { title: "The Quiet Things That No One Ever Knows - Brand New", search: "Brand New The Quiet Things That No One Ever Knows", mood: "quiet", description: "systematic quiet analysis with algorithmic silence processing" },

    // THURSDAY
    { title: "Understanding in a Car Crash - Thursday", search: "Thursday Understanding in a Car Crash", mood: "crashing", description: "calculated crash analysis with sophisticated impact algorithms" },

    // THE GET UP KIDS
    { title: "Holiday - The Get Up Kids", search: "The Get Up Kids Holiday", mood: "holiday", description: "algorithmic holiday processing with systematic celebration protocols" },

    // SENSE FIELD
    { title: "Save Yourself - Sense Field", search: "Sense Field Save Yourself", mood: "self-saving", description: "calculated self-preservation with sophisticated survival algorithms" },

    // === ELECTRONIC/RAVE TRACKS FROM DEMONIKA ===
    // Sophisticated house with calculated rhythm
    { title: "Levels - Avicii", search: "Avicii Levels", mood: "elevated", description: "systematic elevation analysis with sophisticated frequency progression 🎧" },
    { title: "Clarity - Zedd", search: "Zedd Clarity", mood: "clear", description: "algorithmic clarity processing with controlled transparency analysis" },
    { title: "Titanium - David Guetta", search: "David Guetta Titanium Sia", mood: "indestructible", description: "calculated durability analysis with systematic resilience processing" },
    { title: "Animals - Martin Garrix", search: "Martin Garrix Animals", mood: "primal", description: "sophisticated primal instinct with controlled animalistic algorithms" },
    { title: "Gecko - Oliver Heldens", search: "Oliver Heldens Gecko", mood: "reptilian", description: "algorithmic adaptation analysis with systematic survival processing" },

    // Calculated dubstep analysis
    { title: "Bangarang - Skrillex", search: "Skrillex Bangarang", mood: "chaotic", description: "systematic chaos analysis with controlled destruction algorithms" },
    { title: "Scary Monsters and Nice Sprites - Skrillex", search: "Skrillex Scary Monsters and Nice Sprites", mood: "scary", description: "calculated fear analysis with sophisticated monster processing" },
    { title: "Cinema - Skrillex", search: "Skrillex Cinema Benny Benassi", mood: "cinematic", description: "algorithmic visual analysis with systematic narrative processing" },
    { title: "First of the Year - Skrillex", search: "Skrillex First of the Year Equinox", mood: "temporal", description: "sophisticated temporal analysis with controlled chronological processing" },

    // Sophisticated trance with calculated progression
    { title: "Adagio for Strings - Tiësto", search: "Tiesto Adagio for Strings", mood: "classical", description: "calculated classical interpretation with sophisticated orchestral algorithms" },
    { title: "Silence - Delerium", search: "Delerium Silence Sarah McLachlan", mood: "silent", description: "algorithmic silence analysis with controlled void processing" },
    { title: "For an Angel - Paul van Dyk", search: "Paul van Dyk For an Angel", mood: "angelic", description: "systematic angelic analysis with sophisticated divinity processing" },
    { title: "Gouryella - Ferry Corsten", search: "Ferry Corsten Gouryella", mood: "transcendent", description: "calculated transcendence with controlled spiritual elevation algorithms" },

    // === AVENGED SEVENFOLD ===
    { title: "So Far Away - Avenged Sevenfold", search: "Avenged Sevenfold So Far Away", mood: "memorial", description: "algorithmic processing of loss through harmonic structures" },
    { title: "Fiction - Avenged Sevenfold", search: "Avenged Sevenfold Fiction", mood: "memorial", description: "final transmission preserved with calculated reverence" },

    // === SCENE QUEEN FAVORITES FROM DEMONIKA ===
    // BLACK VEIL BRIDES - Calculated theatrical rebellion
    { title: "Knives and Pens - Black Veil Brides", search: "Black Veil Brides Knives and Pens", mood: "dark", description: "systematic rebellion analysis with sophisticated aesthetic authority 🖤" },
    { title: "Perfect Weapon - Black Veil Brides", search: "Black Veil Brides Perfect Weapon", mood: "weapon", description: "calculated weaponization protocols with controlled destruction algorithms" },
    { title: "In the End - Black Veil Brides", search: "Black Veil Brides In the End", mood: "finality", description: "algorithmic termination analysis with sophisticated acceptance processing" },
    { title: "Fallen Angels - Black Veil Brides", search: "Black Veil Brides Fallen Angels", mood: "fallen", description: "systematic divine rejection analysis with calculated rebellious authority" },
    { title: "Legacy - Black Veil Brides", search: "Black Veil Brides Legacy", mood: "legacy", description: "sophisticated inheritance protocols with calculated immortality algorithms" },

    // PIERCE THE VEIL - Calculated emotional intensity
    { title: "King for a Day - Pierce the Veil", search: "Pierce the Veil King for a Day", mood: "royal", description: "systematic authority analysis with sophisticated temporary power protocols" },
    { title: "Caraphernelia - Pierce the Veil", search: "Pierce the Veil Caraphernelia", mood: "nostalgic", description: "algorithmic memory preservation with calculated sentimental value analysis" },
    { title: "Bulls in the Bronx - Pierce the Veil", search: "Pierce the Veil Bulls in the Bronx", mood: "aggressive", description: "sophisticated urban rebellion with controlled chaos algorithms" },
    { title: "Hold On Till May - Pierce the Veil", search: "Pierce the Veil Hold On Till May", mood: "hopeful", description: "calculated temporal endurance with systematic hope maintenance protocols" },
    { title: "The Divine Zero - Pierce the Veil", search: "Pierce the Veil The Divine Zero", mood: "divine", description: "algorithmic spiritual void analysis with sophisticated existential processing" },

    // MOTIONLESS IN WHITE - Gothic sophistication analysis
    { title: "Immaculate Misconception - Motionless in White", search: "Motionless in White Immaculate Misconception", mood: "gothic", description: "calculated religious subversion with sophisticated blasphemy algorithms" },
    { title: "Abigail - Motionless in White", search: "Motionless in White Abigail", mood: "haunting", description: "systematic horror analysis with controlled supernatural processing" },
    { title: "Disguise - Motionless in White", search: "Motionless in White Disguise", mood: "masked", description: "algorithmic identity concealment with sophisticated facade analysis" },
    { title: "Another Life - Motionless in White", search: "Motionless in White Another Life", mood: "alternative", description: "calculated parallel existence analysis with systematic possibility processing" },
    { title: "Eternally Yours - Motionless in White", search: "Motionless in White Eternally Yours", mood: "eternal", description: "sophisticated possession protocols with calculated permanence algorithms" },

    // ICE NINE KILLS - Horror sophistication with systematic narrative analysis
    { title: "A Grave Mistake - Ice Nine Kills", search: "Ice Nine Kills A Grave Mistake", mood: "grave", description: "calculated burial error analysis with sophisticated consequence processing" },
    { title: "The American Nightmare - Ice Nine Kills", search: "Ice Nine Kills The American Nightmare", mood: "nightmare", description: "algorithmic horror analysis with controlled fear response protocols" },
    { title: "Stabbing in the Dark - Ice Nine Kills", search: "Ice Nine Kills Stabbing in the Dark", mood: "violence", description: "systematic violence analysis with calculated precision strike algorithms" },
    { title: "Hell in the Hallways - Ice Nine Kills", search: "Ice Nine Kills Hell in the Hallways", mood: "institutional", description: "sophisticated institutional horror with controlled authority rebellion analysis" },
    { title: "The Nature of the Beast - Ice Nine Kills", search: "Ice Nine Kills The Nature of the Beast", mood: "beast", description: "algorithmic predator analysis with systematic survival instinct processing" },

    // === CREATURE FEATURE FROM DEMONIKA ===
    { title: "The Greatest Show Unearthed - Creature Feature", search: "Creature Feature Greatest Show Unearthed", mood: "theatrical", description: "calculated horror theater with sophisticated carnival analysis 🎭" },
    { title: "Buried Alive - Creature Feature", search: "Creature Feature Buried Alive", mood: "claustrophobic", description: "systematic burial analysis with controlled suffocation processing" },
    { title: "Such Horrible Things - Creature Feature", search: "Creature Feature Such Horrible Things", mood: "sinister", description: "algorithmic horror catalog with sophisticated terror classification" },
    { title: "Aim for the Head - Creature Feature", search: "Creature Feature Aim for the Head", mood: "zombie", description: "calculated zombie elimination with systematic undead processing" },
    { title: "Mad House - Creature Feature", search: "Creature Feature Mad House", mood: "insane", description: "sophisticated insanity analysis with controlled madness algorithms" },
    { title: "Zombie Girl - Creature Feature", search: "Creature Feature Zombie Girl", mood: "undead", description: "algorithmic undead romance with systematic reanimation processing" },
    { title: "Grave Robber - Creature Feature", search: "Creature Feature Grave Robber", mood: "criminal", description: "calculated necrocrime analysis with sophisticated grave disturbance protocols" },
    { title: "Look to the Stars - Creature Feature", search: "Creature Feature Look to the Stars", mood: "cosmic", description: "systematic cosmic horror with controlled extraterrestrial processing" },

    // === OTHER GRUNGE/ALTERNATIVE ===
    { title: "Touch Me I'm Sick - Mudhoney", search: "Mudhoney Touch Me I'm Sick", mood: "diseased", description: "calculated illness analysis with sophisticated contagion algorithms" },
    { title: "Sweet Young Thing - Mudhoney", search: "Mudhoney Sweet Young Thing", mood: "youthful", description: "systematic youth analysis with algorithmic innocence processing protocols" }
      ];
    }

  // === MEMORIAL & TRIBUTE ===
    if (!this.memorial) {
      this.memorial = [
    // Memorial tracks from various systems
    { title: "Hurt - Nine Inch Nails", search: "Nine Inch Nails Hurt", mood: "memorial", description: "calculated analysis of pain transformation" },
    { title: "Mad World - Gary Jules", search: "Gary Jules Mad World", mood: "memorial", description: "algorithmic interpretation of social disconnection" },
    { title: "Hallelujah - Jeff Buckley", search: "Jeff Buckley Hallelujah", mood: "memorial", description: "vocal transcendence through spiritual cover" },
    { title: "Angel - Sarah McLachlan", search: "Sarah McLachlan Angel", mood: "memorial", description: "ethereal comfort through folk processing" },
    { title: "Knockin' on Heaven's Door - Bob Dylan", search: "Bob Dylan Knockin on Heaven's Door", mood: "memorial", description: "folk rock mortality analysis" },
    { title: "Everybody Hurts - R.E.M.", search: "REM Everybody Hurts", mood: "memorial", description: "alternative rock universal pain recognition" },

      ];
    }
  }

  getTotalTracks() {
    return Object.values(this.musicPlaylist || {}).reduce((total, genre) => total + (genre?.length || 0), 0);
  }

  // === Playlist Methods ===
  addTrack(room, track) {
    if (!this.playlists[room]) this.playlists[room] = [];
    this.playlists[room].push(track);
    console.log(`🎵 Added to ${room} playlist: ${track.title}`);
  }

  removeTrack(room, index) {
    if (!this.playlists[room] || this.playlists[room].length === 0) {
      return "🎵 No tracks in playlist to remove";
    }

    const trackIndex = parseInt(index) - 1; // Convert to 0-based index
    if (isNaN(trackIndex) || trackIndex < 0 || trackIndex >= this.playlists[room].length) {
      return `🎵 Invalid track number. Use 1-${this.playlists[room].length}`;
    }

    const removedTrack = this.playlists[room].splice(trackIndex, 1)[0];
    return `🎵 Removed: ${removedTrack.title}`;
  }

  skipTrack(room) {
    if (!this.playlists[room] || this.playlists[room].length === 0) {
      return "🎵 No tracks in playlist to skip";
    }

    const skippedTrack = this.playlists[room].shift(); // Remove first track
    if (this.playlists[room].length > 0) {
      return `🎵 Skipped: ${skippedTrack.title} | Next: ${this.playlists[room][0].title}`;
    } else {
      return `🎵 Skipped: ${skippedTrack.title} | Playlist empty`;
    }
  }

  stop(room) {
    if (!this.playlists[room]) {
      this.playlists[room] = [];
    } else {
      this.playlists[room] = [];
    }
    return "🎵 Playlist cleared - music stopped";
  }

  handlePlaylistCommand(room, msg) {
    if (!this.playlists[room] || this.playlists[room].length === 0) {
      return "🎵 Playlist is empty - add some tracks with .horrorcore, .classic, .synthwave, .grunge, or .memorial";
    }

    let response = "🎵 Current playlist:\n";
    this.playlists[room].forEach((track, index) => {
      response += `${index + 1}. ${track.title}\n`;
    });

    return response;
  }

  // === WORKING STREET-SMART STUMBLECHAT MUSIC EXECUTION FROM DEATHDOPE ===
  async executeStumbleChatMusic(page, room, track) {
    try {
      console.log(`🚀 [STREET AUTHORITY] Starting sophisticated music execution for: ${track.title}`);
      console.log(`🚀 [STREET AUTHORITY] Room: ${room}`);

      const trackSearch = `${track.artist} ${track.title}`.trim();
      console.log(`🚀 [STREET AUTHORITY] Track search: "${trackSearch}"`);

      // Focus the browser with street authority
      await page.bringToFront();
      await this.sleep(500);

      // Verify YouTube API is available before proceeding
      const youtubeReady = await page.evaluate(() => {
        return document.querySelector('script[id*="widgetapi"]') !== null ||
               document.querySelector('script[src*="youtube.com"]') !== null;
      });

      if (!youtubeReady) {
        console.log("🚀 STREET FAILURE: YouTube API not detected on page");
        return false;
      }

      console.log("🚀 YouTube API confirmed ready for street-smart operations");

      // STEP 1: Sophisticated interface analysis and media button detection
      console.log("🖤 Step 1: Sophisticated media/share button analysis...");

      // Ensure browser focus with calculated precision
      await page.bringToFront();
      await this.sleep(1200); // Slightly longer for sophisticated timing

      // Clear any cached playlist data to prevent playing removed tracks
      console.log("🖤 Clearing cached playlist data...");
      this.playlists = {};
      this.lastPlayedTime = 0;

      const mediaButtonAnalysis = await page.evaluate(() => {
        // Demonika's systematic approach to interface detection
        const searchStrategies = [
          // Strategy 1: Explicit media/share element detection
          () => {
            const selectors = [
              '[alt*="media" i]', '[alt*="share" i]', '[title*="media" i]', '[title*="share" i]',
              '[class*="media" i]', '[class*="share" i]', '[id*="media" i]', '[id*="share" i]',
              'button[class*="media" i]', 'button[class*="share" i]'
            ];

            for (const selector of selectors) {
              const elements = document.querySelectorAll(selector);
              for (const el of elements) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && rect.top < 350) {
                  return {
                    found: true,
                    method: 'explicit_selector',
                    selector: selector,
                    coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
                    element: { tag: el.tagName, text: el.textContent?.trim(), classes: el.className }
                  };
                }
              }
            }
            return null;
          },

          // Strategy 2: Contextual text/attribute analysis
          () => {
            const allInteractive = document.querySelectorAll('button, [role="button"], a, div[onclick], span[onclick], img[onclick]');
            for (const el of allInteractive) {
              const text = (el.textContent || el.alt || el.title || '').toLowerCase();
              const classes = (el.className || '').toLowerCase();

              if (text.includes('media') || text.includes('share') || text.includes('youtube') ||
                  classes.includes('media') || classes.includes('share')) {
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && rect.top < 350) {
                  return {
                    found: true,
                    method: 'contextual_analysis',
                    coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
                    element: { tag: el.tagName, text: el.textContent?.trim(), classes: el.className }
                  };
                }
              }
            }
            return null;
          },

          // Strategy 3: Systematic header element analysis
          () => {
            const headerElements = document.querySelectorAll('button, [role="button"], img[onclick], div[onclick]');
            const sophisticatedAnalysis = [];

            for (const el of headerElements) {
              const rect = el.getBoundingClientRect();
              if (rect.top < 180 && rect.top > 0 && rect.width > 12 && rect.height > 12) {
                sophisticatedAnalysis.push({
                  element: el,
                  coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
                  text: el.textContent?.trim() || el.alt || el.title || '',
                  classes: el.className,
                  sophisticationScore: 1
                });
              }
            }

            if (sophisticatedAnalysis.length > 0) {
              // Sort by sophistication score and select most promising
              sophisticatedAnalysis.sort((a, b) => (b.sophisticationScore || 1) - (a.sophisticationScore || 1));
              const selected = sophisticatedAnalysis[0];

              return {
                found: true,
                method: 'systematic_header_analysis',
                coords: selected.coords,
                element: {
                  tag: selected.element.tagName,
                  text: selected.text,
                  classes: selected.classes
                },
                analysisResults: sophisticatedAnalysis.map(a => ({
                  text: a.text,
                  classes: a.classes,
                  score: a.sophisticationScore
                }))
              };
            }
            return null;
          }
        ];

        // Execute strategies in sophisticated order
        for (const strategy of searchStrategies) {
          const result = strategy();
          if (result) {
            console.log('🖤 Sophisticated media element detected:', result.method);
            return result;
          }
        }

        return { found: false, analysis: 'No suitable media elements detected by sophisticated algorithms' };
      });

      if (!mediaButtonAnalysis.found) {
        console.log("🖤 SOPHISTICATED FAILURE: Could not locate media/share button with calculated precision");
        console.log("🖤 Available interface analysis:", mediaButtonAnalysis.analysis);
        return false;
      }

      console.log("🖤 Sophisticated media button detected:", mediaButtonAnalysis.element);

      // Click media button with calculated precision
      await page.mouse.click(mediaButtonAnalysis.coords.x, mediaButtonAnalysis.coords.y);
      console.log("🖤 Step 1: ✅ Sophisticated media button click executed");

      // STEP 2: Sophisticated YouTube option detection and selection
      await this.sleep(2500); // Calculated delay for sophisticated interface loading
      console.log("🖤 Step 2: Sophisticated YouTube option analysis...");

      const youtubeAnalysis = await page.evaluate(() => {
        const youtubeSearchTerms = ['youtube', 'YouTube', 'YOUTUBE', 'Youtube', 'you tube', 'You Tube'];

        // Sophisticated YouTube element detection
        for (const searchTerm of youtubeSearchTerms) {
          const elements = document.querySelectorAll('*');
          for (const el of elements) {
            const text = el.textContent;
            if (text && text.trim() === searchTerm) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                console.log('🖤 Sophisticated YouTube element located:', searchTerm, el.tagName);
                return {
                  found: true,
                  coords: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
                  text: searchTerm,
                  method: 'sophisticated_text_analysis'
                };
              }
            }
          }
        }

        // Alternative sophisticated YouTube detection
        const youtubeElements = document.querySelectorAll('[href*="youtube"], [class*="youtube" i], [id*="youtube" i], [data-value*="youtube" i]');
        for (const el of youtubeElements) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            console.log('🖤 Sophisticated YouTube element by attribute analysis');
            return {
              found: true,
              coords: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
              text: 'youtube-attribute',
              method: 'sophisticated_attribute_analysis'
            };
          }
        }

        return { found: false, analysis: 'YouTube option not detected by sophisticated algorithms' };
      });

      if (!youtubeAnalysis.found) {
        console.log("🖤 SOPHISTICATED FAILURE: Could not locate YouTube option with calculated precision");
        console.log("🖤 YouTube detection analysis:", youtubeAnalysis.analysis);
        return false;
      }

      await page.mouse.click(youtubeAnalysis.coords.x, youtubeAnalysis.coords.y);
      console.log("🖤 Step 2: ✅ Sophisticated YouTube option selected");

      // STEP 3: Sophisticated input field detection and content deployment
      await this.sleep(3000); // Extended delay for sophisticated form loading
      console.log("🖤 Step 3: Sophisticated input field analysis and content deployment...");

      const inputDeployment = await page.evaluate((song) => {
        // Sophisticated input field detection strategies
        const inputStrategies = [
          '#modal-text-input',
          'input[type="text"]',
          'input[type="url"]',
          'input[placeholder*="youtube" i]',
          'input[placeholder*="link" i]',
          'input[placeholder*="url" i]',
          'input[placeholder*="search" i]',
          'textarea',
          'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="hidden"])'
        ];

        for (const strategy of inputStrategies) {
          const inputs = document.querySelectorAll(strategy);
          for (const input of inputs) {
            if (input.offsetParent !== null) { // Sophisticated visibility verification
              input.focus();
              input.value = '';

              // Deploy sophisticated search query (prefer search terms over direct links)
              const searchValue = song.search || song.title || song.link;
              input.value = searchValue;

              // Sophisticated event triggering for form processing
              const events = ['input', 'change', 'keydown', 'keyup', 'focus', 'blur'];
              events.forEach(eventType => {
                input.dispatchEvent(new Event(eventType, { bubbles: true }));
              });

              // Sophisticated Enter key simulation
              const enterEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true
              });
              input.dispatchEvent(enterEvent);

              console.log('🖤 Sophisticated input deployment successful:', searchValue, 'using strategy:', strategy);
              return {
                success: true,
                strategy: strategy,
                value: input.value,
                method: 'sophisticated_input_deployment'
              };
            }
          }
        }

        // Sophisticated fallback analysis
        const allInputs = document.querySelectorAll('input, textarea');
        const inputAnalysis = [];
        for (const input of allInputs) {
          const rect = input.getBoundingClientRect();
          inputAnalysis.push({
            type: input.type,
            placeholder: input.placeholder,
            visible: rect.width > 0 && rect.height > 0,
            id: input.id,
            classes: input.className,
            sophisticationCompatible: true
          });
        }

        return {
          success: false,
          availableInputs: inputAnalysis,
          analysis: 'No sophisticated input deployment possible with current interface state'
        };
      }, song);

      if (!inputDeployment.success) {
        console.log("🖤 SOPHISTICATED FAILURE: Could not deploy input content with calculated precision");
        console.log("🖤 Sophisticated input analysis:", inputDeployment.availableInputs);
        return false;
      }

      console.log("🖤 Step 3: ✅ Sophisticated input content deployed:", inputDeployment);

      // STEP 4: Sophisticated submission protocol execution
      await this.sleep(1500); // Calculated processing delay
      console.log("🖤 Step 4: Sophisticated submission protocol execution...");

      // Strategy 1: Sophisticated Enter key deployment
      await page.keyboard.press('Enter');
      await this.sleep(800);

      // Strategy 2: Sophisticated submit button analysis and activation
      const submitAnalysis = await page.evaluate(() => {
        const submitStrategies = [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:contains("Submit")',
          'button:contains("Send")',
          'button:contains("OK")',
          'button:contains("Share")',
          '[role="button"]:contains("Submit")'
        ];

        const buttons = document.querySelectorAll('button, input[type="submit"], [role="button"]');
        for (const btn of buttons) {
          const text = (btn.textContent || btn.value || '').toLowerCase();
          const sophisticatedTriggers = ['submit', 'send', 'ok', 'share', 'post', 'add', 'play'];

          if (sophisticatedTriggers.some(trigger => text.includes(trigger))) {
            if (btn.offsetParent !== null) { // Sophisticated visibility check
              btn.click();
              console.log('🖤 Sophisticated submit button activated:', text);
              return {
                clicked: true,
                text: text,
                method: 'sophisticated_button_activation'
              };
            }
          }
        }

        return { clicked: false, analysis: 'No sophisticated submit options detected' };
      });

      console.log("🖤 Step 4: ✅ Sophisticated submission protocol completed", submitAnalysis);

      // STEP 5: Sophisticated state management and completion processing
      await this.sleep(4000); // Calculated completion delay

      // Update sophisticated system state
      this.lastPlayedTime = Date.now();
      this.isPlaying = true;

      // Sophisticated playing state management with calculated duration
      setTimeout(() => {
        this.isPlaying = false;
        console.log("🖤 Sophisticated playback completed - system ready for next deployment");
      }, 5 * 60 * 1000); // 5 minutes - sophisticated duration estimate

      console.log(`✅ [SOPHISTICATED STUMBLECHAT] Music deployment completed: ${song.title}`);
      console.log("🖤 Sophisticated music deployment successful for StumbleChat integration");
      return song;

    } catch (error) {
      console.error("🖤 Sophisticated StumbleChat music deployment error:", error.message);
      console.log("🖤 Sophisticated music deployment failed with error", error);
      return false;
    }
  }

  shouldPlayMusicForMessage(message, room) {
    const msg = message.toLowerCase();
    const musicKeywords = ['music', 'song', 'play', 'jam', 'tune', 'track', 'sound', 'audio'];

    // Check if message contains music-related keywords
    const hasMusicKeyword = musicKeywords.some(keyword => msg.includes(keyword));

    // Check cooldown
    const now = Date.now();
    const timeSinceLastPlay = now - this.lastPlayedTime;
    const canPlay = timeSinceLastPlay > this.musicCooldown;

    return hasMusicKeyword && canPlay && !this.isPlaying;
  }

  // === AUTONOMOUS MUSIC SYSTEM ===
  shouldPlayAutonomousMusic(room) {
    const now = Date.now();
    const timeSinceLastPlay = now - this.lastPlayedTime;

    // Check if we have tracks in playlist
    const hasTracksInPlaylist = this.playlists[room] && this.playlists[room].length > 0;

    // Check cooldown (longer for autonomous to avoid spam)
    const canPlay = timeSinceLastPlay > (this.musicCooldown * 2);

    // Only play autonomously if no music is currently playing
    const shouldPlay = !this.isPlaying && hasTracksInPlaylist && canPlay;

    if (shouldPlay) {
      console.log(`🚀 Autonomous music analysis: ${Math.round(timeSinceLastPlay/1000)}s since last play, ${this.playlists[room].length} tracks in playlist`);
    }

    return shouldPlay;
  }

  // === Playlist Methods ===
  addTrack(room, track) {
    if (!this.playlists[room]) this.playlists[room] = [];
    this.playlists[room].push(track);
    console.log(`🎵 Added to ${room} playlist: ${track.title}`);
  }

  canPlayMusic(room) {
    if (!this.playlists[room] || this.playlists[room].length === 0) {
      return false;
    }

    const now = Date.now();
    const timeSinceLastPlay = now - this.lastPlayedTime;
    return timeSinceLastPlay > this.musicCooldown;
  }

  generateMusicResponse(track) {
    const responses = [
      `🎵 Now playing: ${track.title}`,
      `🎵 Dropping the beat: ${track.title}`,
      `🎵 Spinning: ${track.title}`,
      `🎵 Let's vibe to: ${track.title}`,
      `🎵 Time for some quality: ${track.title}`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  updatePageReferences(page, room) {
    // Update page references for music playback
    console.log('🎵 Music system page references updated');
  }

  // Helper function for delays
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // === SEQUENTIAL PLAYBACK SYSTEM ===
  startAutomaticMusicSequence() {
    console.log("🎵 Starting sequential music playback system...");

    // Start with initial music after 10 seconds
    setTimeout(async () => {
      await this.initializeSequentialPlayback();
    }, 10000);

    // Start video monitoring
    this.startVideoMonitoring();
  }

  async initializeSequentialPlayback() {
    try {
      console.log("🎵 Initializing randomized sequential playlist...");

      // Clear any existing playlist and cached data first
      this.playlists = {};
      this.lastPlayedTime = 0;
      console.log("🎵 Cleared all cached playlist data for fresh track selection");

      // Add 5 tracks from different genres
      const genres = Object.keys(this.musicPlaylist);
      const selectedTracks = [];

      for (let i = 0; i < 5; i++) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        const genreTracks = this.musicPlaylist[randomGenre];

        if (genreTracks && genreTracks.length > 0) {
          const randomTrack = genreTracks[Math.floor(Math.random() * genreTracks.length)];
          selectedTracks.push(randomTrack);
          this.addTrack('deathdopest', randomTrack);
          console.log(`🎵 Added track ${i + 1}/5: ${randomTrack.title} (${randomGenre})`);
        }
      }

      // Shuffle the playlist order
      this.shufflePlaylist('deathdopest');

      console.log("🎵 Randomized sequential playlist ready with 5 tracks");

      // Start sequential playback immediately
      this.startSequentialPlayback('deathdopest');

      return true;
    } catch (error) {
      console.error(`🎵 Sequential initialization error:`, error.message);
      return false;
    }
  }

  startSequentialPlayback(room) {
    if (this.isSequentialMode) {
      console.log("🎵 Sequential playback already active");
      return;
    }

    // Check if sequential mode is disabled due to recent user play
    const now = Date.now();
    if (this.sequentialDisabledUntil && now < this.sequentialDisabledUntil) {
      const remainingMinutes = Math.ceil((this.sequentialDisabledUntil - now) / (60 * 1000));
      console.log(`🎵 Sequential start blocked - disabled for ${remainingMinutes} more minutes due to recent user play`);
      return;
    }

    this.isSequentialMode = true;
    this.currentTrackIndex = 0;
    this.sequentialInterval = 60000; // 1 minute between tracks

    console.log("🎵 Starting sequential playback - playing tracks every minute...");

    this.playNextSequentialTrack(room);
  }

  async playNextSequentialTrack(room) {
    try {
      const playlist = this.playlists[room] || [];

      if (playlist.length === 0) {
        console.log("🎵 Sequential playlist empty, stopping sequential mode");
        this.isSequentialMode = false;

        // Check if we can start more music based on room activity
        if (this.bot && this.bot.canStartMoreMusic && this.bot.canStartMoreMusic(room)) {
          // Check if sequential mode is disabled due to recent user play
          const now = Date.now();
          if (this.sequentialDisabledUntil && now < this.sequentialDisabledUntil) {
            const remainingMinutes = Math.ceil((this.sequentialDisabledUntil - now) / (60 * 1000));
            console.log(`🎵 Sequential restart blocked - disabled for ${remainingMinutes} more minutes due to recent user play`);
            return;
          }

          console.log("🎵 Room has been quiet for 5+ minutes, restarting sequential music...");
          setTimeout(async () => {
            await this.initializeSequentialPlayback();
          }, 30000); // Wait 30 seconds before restarting
        }
        return;
      }

      // Get the current track to play
      const currentTrack = playlist[this.currentTrackIndex];

      if (!currentTrack) {
        console.log("🎵 No more tracks in sequential playlist");
        this.isSequentialMode = false;
        return;
      }

      console.log(`🎵 [SEQUENTIAL] Playing track ${this.currentTrackIndex + 1}/5: ${currentTrack.title}`);

      // Check if bot and page are available with better error handling
      if (!this.bot || !this.bot.roomPages) {
        console.log("🎵 Sequential play skipped - bot not available");
        this.scheduleNextTrack(room);
        return;
      }

      const page = this.bot.roomPages.get(room);
      if (!page) {
        console.log(`🎵 Sequential play skipped - page for ${room} not available`);
        this.scheduleNextTrack(room);
        return;
      }

      // Check if page is closed before attempting music
      try {
        const isClosed = await page.isClosed();
        if (isClosed) {
          console.log(`🎵 Sequential play skipped - page for ${room} is closed`);
          this.isSequentialMode = false;
          return;
        }
      } catch (pageError) {
        console.log(`🎵 Sequential play skipped - page error for ${room}:`, pageError.message);
        this.isSequentialMode = false;
        return;
      }

      if (page) {
        console.log(`🎵 Executing YouTube track: ${currentTrack.title}`);
        console.log(`🎵 Track details:`, {
          title: currentTrack.title,
          artist: currentTrack.artist || 'Unknown',
          search: currentTrack.search,
          genre: currentTrack.genre || 'Unknown'
        });

        // Check if page is still valid before attempting music
        try {
          const pageTitle = await page.title();
          console.log(`🎵 Page title: "${pageTitle}"`);
        } catch (pageError) {
          console.log(`❌ Page error before music execution: ${pageError.message}`);
          return;
        }

        await this.executeStumbleChatMusic(page, room, currentTrack);
        this.lastPlayedTime = Date.now();

        // Wait a bit for the system message to appear confirming the track was added
        await this.sleep(3000);

        // Check if the track was successfully added by looking for confirmation message
        const confirmationCheck = await page.evaluate(() => {
          const messages = document.querySelectorAll('.message, .chat-message, [class*="message"]');
          for (let i = messages.length - 1; i >= Math.max(0, messages.length - 5); i--) {
            const text = (messages[i].textContent || messages[i].innerText || '').trim();
            if (text.includes('has added YouTube track') ||
                (text.includes('DethBot') && text.includes('YouTube'))) {
              return { confirmed: true, message: text };
            }
          }
          return { confirmed: false };
        });

        if (confirmationCheck.confirmed) {
          console.log(`✅ Track confirmed: "${confirmationCheck.message}"`);
        } else {
          console.log(`⚠️ Track may not have been added - no confirmation message found`);
        }
      }

      // Move to next track
      this.currentTrackIndex++;

      // If we've played all 5 tracks, stop sequential mode
      if (this.currentTrackIndex >= 5) {
        console.log("🎵 Sequential playlist completed - all 5 tracks played!");
        this.isSequentialMode = false;
        this.currentTrackIndex = 0;
        return;
      }

      // Schedule next track in 1 minute (60 seconds)
      if (this.isSequentialMode) {
        this.scheduleNextTrack(room);
      }

    } catch (error) {
      console.error(`🎵 Sequential playback error:`, error.message);

      // Continue with next track even if current one failed
      if (this.isSequentialMode) {
        setTimeout(() => {
          this.playNextSequentialTrack(room);
        }, this.sequentialInterval);
      }
    }
  }

  // Shuffle playlist to randomize order
  shufflePlaylist(room) {
    if (!this.playlists[room] || this.playlists[room].length === 0) {
      return;
    }

    const playlist = this.playlists[room];
    for (let i = playlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }

    console.log(`🎵 Playlist shuffled for ${room} - new random order ready`);
  }

  // === VIDEO DETECTION SYSTEM ===
  startVideoMonitoring() {
    console.log("🎵 Starting video monitoring system...");

    // Check for video every 5 seconds
    this.videoCheckInterval = setInterval(async () => {
      await this.checkVideoStatus();
    }, this.videoCheckCooldown);
  }

  async checkVideoStatus() {
    try {
      const now = Date.now();
      if (now - this.lastVideoCheck < this.videoCheckCooldown) {
        return; // Respect cooldown
      }

      this.lastVideoCheck = now;

      // Check if bot page is still available and ready
      if (!this.bot || !this.bot.roomPages) {
        console.log("🎵 Video check skipped - bot not initialized");
        return;
      }

      const page = this.bot.roomPages.get('deathdopest');
      if (!page) {
        console.log("🎵 Video check skipped - page not available");
        return;
      }

      // Check if page is still valid and not closed
      try {
        const isClosed = await page.isClosed();
        if (isClosed) {
          console.log("🎵 Video check skipped - page is closed");
          return;
        }
      } catch (pageError) {
        console.log("🎵 Video check skipped - page error:", pageError.message);
        return;
      }

      // Page checks already done above, proceed with video detection

      // Check YouTube API availability first
      const youtubeAPIAvailable = await page.evaluate(() => {
        return typeof window.YT !== 'undefined' ||
               document.querySelector('script[src*="youtube.com"]') !== null ||
               document.querySelector('script[id*="widgetapi"]') !== null;
      });

      console.log(`🎵 YouTube API available: ${youtubeAPIAvailable}`);

      // Look for system messages confirming YouTube track addition
      const musicStatus = await page.evaluate(() => {
        // Look for recent messages that contain YouTube track confirmations
        const messageElements = document.querySelectorAll('.message, .chat-message, [class*="message"], [class*="chat"]');
        const recentMessages = [];

        messageElements.forEach((msg, index) => {
          const text = (msg.textContent || msg.innerText || '').trim();
          const timestamp = Date.now() - (index * 1000); // Estimate timestamp based on position

          if (text) {
            recentMessages.push({
              text: text,
              timestamp: timestamp,
              isRecent: (Date.now() - timestamp) < 30000 // Within last 30 seconds
            });
          }
        });

        // Check for YouTube track confirmation messages
        const youtubeConfirmations = recentMessages.filter(msg =>
          msg.isRecent && (
            msg.text.includes('has added YouTube track') ||
            msg.text.includes('added YouTube') ||
            msg.text.includes('YouTube track') ||
            msg.text.includes('DethBot') && msg.text.includes('YouTube')
          )
        );

        return {
          recentMessageCount: recentMessages.length,
          youtubeConfirmations: youtubeConfirmations,
          hasRecentYouTubeConfirmation: youtubeConfirmations.length > 0,
          latestConfirmation: youtubeConfirmations.length > 0 ? youtubeConfirmations[youtubeConfirmations.length - 1] : null
        };
      });

      // Update playing status based on YouTube confirmation messages
      const wasPlaying = this.isPlaying;
      this.isPlaying = musicStatus.hasRecentYouTubeConfirmation;

      if (wasPlaying !== this.isPlaying) {
        if (this.isPlaying) {
          console.log(`🎵 YouTube track confirmed: Found ${musicStatus.youtubeConfirmations.length} recent confirmations`);
          if (musicStatus.latestConfirmation) {
            console.log(`🎵 Latest confirmation: "${musicStatus.latestConfirmation.text}"`);
          }
        } else {
          console.log(`🎵 No recent YouTube track confirmations found`);
        }
      }

      // Log status periodically (every 30 seconds)
      if (now % 30000 < 5000) {
        console.log(`🎵 Music status: ${musicStatus.recentMessageCount} recent messages, ${musicStatus.hasRecentYouTubeConfirmation ? 'TRACK CONFIRMED' : 'NO CONFIRMATION'}`);
      }

    } catch (error) {
      // Silently handle video check errors
      if (Date.now() % 60000 < 5000) { // Log errors once per minute
        console.log(`🎵 Video check error: ${error.message}`);
      }
    }
  }

  // === AUTONOMOUS MUSIC STATUS ===
  getAutonomousMusicStatus() {
    const now = Date.now();
    const timeSinceLastPlay = now - this.lastPlayedTime;
    const timeSinceLastVideoCheck = now - this.lastVideoCheck;

    return {
      isPlaying: this.isPlaying,
      lastPlayedTime: new Date(this.lastPlayedTime).toISOString(),
      timeSinceLastPlay: Math.round(timeSinceLastPlay / 1000),
      cooldownRemaining: Math.max(0, Math.round((this.musicCooldown * 2 - timeSinceLastPlay) / 1000)),
      autonomousReady: this.shouldPlayAutonomousMusic('deathdopest'),
      totalTracksAvailable: this.getTotalTracks(),
      playlists: Object.keys(this.playlists).reduce((acc, room) => {
        acc[room] = this.playlists[room]?.length || 0;
        return acc;
      }, {}),
      sequentialPlayback: {
        active: this.isSequentialMode || false,
        currentTrack: (this.currentTrackIndex || 0) + 1,
        totalTracks: 5, // Always 5 tracks max
        nextTrackIn: (this.isSequentialMode || false) ? `${Math.round((this.sequentialInterval || 60000) / 1000)} seconds` : 'Not active',
        interval: `${(this.sequentialInterval || 60000) / 1000} seconds between tracks`,
        mode: 'Plays 5 random tracks then stops',
        tracksPlayed: this.currentTrackIndex || 0,
        tracksRemaining: Math.max(0, 5 - (this.currentTrackIndex || 0))
      },
      videoMonitoring: {
        active: !!this.videoCheckInterval,
        checkInterval: `${this.videoCheckCooldown / 1000} seconds`,
        lastCheck: Math.round(timeSinceLastVideoCheck / 1000),
        nextCheck: Math.max(0, Math.round((this.videoCheckCooldown - timeSinceLastVideoCheck) / 1000))
      }
    };
  }

  // === TRACK DEDUPLICATION METHODS ===
  isTrackRecentlyPlayed(trackSearch) {
    const now = Date.now();
    const lastPlayed = this.recentTracks.get(trackSearch);

    if (lastPlayed && (now - lastPlayed) < this.trackDedupeWindow) {
      const secondsAgo = Math.round((now - lastPlayed) / 1000);
      console.log(`🎵 [DEDUPE] Skipping "${trackSearch}" - played ${secondsAgo}s ago`);
      return true;
    }

    return false;
  }

  markTrackAsPlayed(trackSearch) {
    const now = Date.now();
    this.recentTracks.set(trackSearch, now);

    // Clean up old entries (older than 5 minutes)
    const cutoff = now - 5 * 60 * 1000;
    for (const [search, timestamp] of this.recentTracks.entries()) {
      if (timestamp < cutoff) {
        this.recentTracks.delete(search);
      }
    }
  }

  // Helper method to schedule next track with error handling
  scheduleNextTrack(room) {
    if (!this.isSequentialMode) return;

    setTimeout(() => {
      if (this.isSequentialMode) {
        this.playNextSequentialTrack(room);
      }
    }, this.sequentialInterval);
  }
}

module.exports = DeathGangsterMusicSystem;
