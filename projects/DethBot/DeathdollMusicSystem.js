// ============================================================================
// Deathdoll's Enhanced Autonomous Music System - STUMBLECHAT MEMORIAL EDITION
// ============================================================================
// For Chelsea - Music was her second love, and through this system,
// her spirit keeps the party going, just like she always did.
// Every song played is a celebration of her beautiful soul.
// Rest in peace, but rock on forever. 🖤🎵
// ============================================================================

class DeathdollMusicSystem {
  constructor(bot) {
    this.bot = bot;
    this.lastPlayedTime = 0;
    this.musicCooldown = 1 * 60 * 1000; // 1 minute between songs
    this.isPlaying = false;
    this.autonomousMusicEnabled = true;
    this.idleMusicTimer = 10 * 60 * 1000; // 10 minutes of silence triggers auto music
    this.lastActivityTime = Date.now();
    this.debugMode = true;
    
    // User preference learning system
    this.userPreferences = new Map();
    this.songHistory = [];
    this.playlistQueue = [];
    this.isPlaylistMode = false;
    
    // Page references for different rooms
    this.currentPage = null;
    this.currentRoom = null;
    this.roomPages = new Map();
    this.hellPage = null;
    this.defaultPage = null;
    
    // === SMART MUSIC DETECTION SYSTEM ===
    this.musicIndex = new Map(); // artist/song -> song objects
    this.artistAliases = new Map(); // abbreviations -> full names
    this.lastMusicDetection = 0;
    this.detectionCooldown = 30 * 1000; // 30 seconds between auto-detections
    
    // Start the idle music checker
    this.startIdleMusicChecker();
    
    // COMPLETE 800+ SONG COLLECTION - All encoding fixed, memorial songs expanded
     {
    emoClassics: [
      { title: "Welcome to the Black Parade - My Chemical Romance", search: "My Chemical Romance Welcome to the Black Parade", mood: "nostalgic", description: "the most iconic emo anthem ever 🖤" },
      { title: "Sugar We're Goin Down - Fall Out Boy", search: "Fall Out Boy Sugar We're Going Down", mood: "energetic", description: "classic FOB energy!" },
      { title: "I Write Sins Not Tragedies - Panic! At The Disco", search: "Panic At The Disco I Write Sins Not Tragedies", mood: "dramatic", description: "brendon's voice is literally perfect" },
      { title: "Misery Business - Paramore", search: "Paramore Misery Business", mood: "fierce", description: "hayley williams is a queen 👑" },
      { title: "Bring Me to Life - Evanescence", search: "Evanescence Bring Me to Life", mood: "dark", description: "amy lee's voice is haunting 🖤" },
      { title: "Teenagers - My Chemical Romance", search: "My Chemical Romance Teenagers", mood: "angsty", description: "mcr calling out society perfectly" },
      { title: "The Diary of Jane - Breaking Benjamin", search: "Breaking Benjamin The Diary of Jane", mood: "melancholy", description: "such beautiful darkness" },
      { title: "Crawling - Linkin Park", search: "Linkin Park Crawling", mood: "emotional", description: "chester's pain in every note 💔" },
      { title: "One Step Closer - Linkin Park", search: "Linkin Park One Step Closer", mood: "aggressive", description: "shut up when i'm talking to you!" },
      { title: "In the End - Linkin Park", search: "Linkin Park In the End", mood: "nihilistic", description: "but in the end it doesn't even matter" },
      { title: "Papercut - Linkin Park", search: "Linkin Park Papercut", mood: "paranoid", description: "why does it feel like night today" },
      { title: "Points of Authority - Linkin Park", search: "Linkin Park Points of Authority", mood: "defiant", description: "hybrid theory perfection" },
      { title: "Runaway - Linkin Park", search: "Linkin Park Runaway", mood: "escape", description: "i wanna run away and never say goodbye" },
      { title: "Somewhere I Belong - Linkin Park", search: "Linkin Park Somewhere I Belong", mood: "searching", description: "meteora era anthem" },
      { title: "Faint - Linkin Park", search: "Linkin Park Faint", mood: "numb", description: "i won't be ignored" },
      { title: "Numb - Linkin Park", search: "Linkin Park Numb", mood: "numb", description: "chester's most vulnerable moment" },
      { title: "Breaking the Habit - Linkin Park", search: "Linkin Park Breaking the Habit", mood: "change", description: "tonight i stop it all" },
      { title: "From the Inside - Linkin Park", search: "Linkin Park From the Inside", mood: "internal", description: "meteora deep cut perfection" },
      { title: "What I've Done - Linkin Park", search: "Linkin Park What I've Done", mood: "redemption", description: "minutes to midnight transformation" },
      { title: "Shadow of the Day - Linkin Park", search: "Linkin Park Shadow of the Day", mood: "fading", description: "the sun will set for you" },
      { title: "Bleed It Out - Linkin Park", search: "Linkin Park Bleed It Out", mood: "release", description: "dig it deeper just to throw it away" },
      { title: "New Divide - Linkin Park", search: "Linkin Park New Divide", mood: "divided", description: "transformers soundtrack epic" },
      { title: "The Catalyst - Linkin Park", search: "Linkin Park The Catalyst", mood: "apocalyptic", description: "a thousand suns electronic evolution" },
      { title: "Burning in the Skies - Linkin Park", search: "Linkin Park Burning in the Skies", mood: "burning", description: "swimming through a sea of souls" },
      { title: "Castle of Glass - Linkin Park", search: "Linkin Park Castle of Glass", mood: "fragile", description: "living things vulnerability" },
      { title: "Lost in the Echo - Linkin Park", search: "Linkin Park Lost in the Echo", mood: "echo", description: "test my will test my heart" },
      { title: "Heavy - Linkin Park", search: "Linkin Park Heavy Kiiara", mood: "heavy", description: "chester's final album emotion" },
      { title: "One More Light - Linkin Park", search: "Linkin Park One More Light", mood: "memorial", description: "who cares if one more light goes out 💔" },
      { title: "Polyamorous - Breaking Benjamin", search: "Breaking Benjamin Polyamorous", mood: "complex", description: "saturate era rawness" },
      { title: "Skin - Breaking Benjamin", search: "Breaking Benjamin Skin", mood: "vulnerable", description: "well i never want to be here again" },
      { title: "Medicate - Breaking Benjamin", search: "Breaking Benjamin Medicate", mood: "numb", description: "ben burnley's pain" },
      { title: "Natural Life - Breaking Benjamin", search: "Breaking Benjamin Natural Life", mood: "existential", description: "saturate album deep cut" },
      { title: "So Cold - Breaking Benjamin", search: "Breaking Benjamin So Cold", mood: "cold", description: "we are not alone era classic" },
      { title: "Simple Design - Breaking Benjamin", search: "Breaking Benjamin Simple Design", mood: "design", description: "i live a simple life unforgotten" },
      { title: "Break My Fall - Breaking Benjamin", search: "Breaking Benjamin Break My Fall", mood: "falling", description: "would you break my fall" },
      { title: "Lady Bug - Breaking Benjamin", search: "Breaking Benjamin Lady Bug", mood: "bug", description: "what did you say to me" },
      { title: "Rain - Breaking Benjamin", search: "Breaking Benjamin Rain", mood: "rain", description: "atmospheric breaking benjamin" },
      { title: "Breath - Breaking Benjamin", search: "Breaking Benjamin Breath", mood: "breathless", description: "phobia album masterpiece" },
      { title: "Until the End - Breaking Benjamin", search: "Breaking Benjamin Until the End", mood: "eternal", description: "so clever whatever i'm done" },
      { title: "Dance with the Devil - Breaking Benjamin", search: "Breaking Benjamin Dance with the Devil", mood: "devilish", description: "say goodbye as we dance" },
      { title: "Had Enough - Breaking Benjamin", search: "Breaking Benjamin Had Enough", mood: "fed up", description: "milk it for all it's worth" },
      { title: "Give Me a Sign - Breaking Benjamin", search: "Breaking Benjamin Give Me a Sign", mood: "searching", description: "dear agony era emotion" },
      { title: "I Will Not Bow - Breaking Benjamin", search: "Breaking Benjamin I Will Not Bow", mood: "defiant", description: "fall back down never surrender" },
      { title: "Lights Out - Breaking Benjamin", search: "Breaking Benjamin Lights Out", mood: "darkness", description: "i am done with you" },
      { title: "Anthem of the Angels - Breaking Benjamin", search: "Breaking Benjamin Anthem of the Angels", mood: "angelic", description: "days go on forever" },
      { title: "Failure - Breaking Benjamin", search: "Breaking Benjamin Failure", mood: "failure", description: "dark before dawn comeback" },
      { title: "Angels Fall - Breaking Benjamin", search: "Breaking Benjamin Angels Fall", mood: "falling", description: "when angels fall with broken wings" },
      { title: "Ashes of Eden - Breaking Benjamin", search: "Breaking Benjamin Ashes of Eden", mood: "eden", description: "will the light guide me home" },
      { title: "Red Cold River - Breaking Benjamin", search: "Breaking Benjamin Red Cold River", mood: "river", description: "ember album aggression" },
      { title: "Torn in Two - Breaking Benjamin", search: "Breaking Benjamin Torn in Two", mood: "torn", description: "is this the way it's gotta be" },
      { title: "Going Under - Evanescence", search: "Evanescence Going Under", mood: "drowning", description: "fallen album perfection" },
      { title: "Everybody's Fool - Evanescence", search: "Evanescence Everybody's Fool", mood: "fake", description: "amy lee calling out fake people" },
      { title: "My Immortal - Evanescence", search: "Evanescence My Immortal", mood: "immortal", description: "hauntingly beautiful ballad" },
      { title: "Haunted - Evanescence", search: "Evanescence Haunted", mood: "haunted", description: "long lost words whisper slowly" },
      { title: "Tourniquet - Evanescence", search: "Evanescence Tourniquet", mood: "bleeding", description: "fallen deep cut beauty" },
      { title: "Imaginary - Evanescence", search: "Evanescence Imaginary", mood: "imaginary", description: "in my field of paper flowers" },
      { title: "Taking Over Me - Evanescence", search: "Evanescence Taking Over Me", mood: "obsession", description: "you don't remember me" },
      { title: "Hello - Evanescence", search: "Evanescence Hello", mood: "greeting", description: "playground school bell rings" },
      { title: "My Last Breath - Evanescence", search: "Evanescence My Last Breath", mood: "dying", description: "hold on to me love" },
      { title: "Whisper - Evanescence", search: "Evanescence Whisper", mood: "whisper", description: "catch me as i fall" },
      { title: "Call Me When You're Sober - Evanescence", search: "Evanescence Call Me When You're Sober", mood: "sober", description: "the open door era" },
      { title: "Lithium - Evanescence", search: "Evanescence Lithium", mood: "medicated", description: "lithium don't want to lock me up" },
      { title: "Sweet Sacrifice - Evanescence", search: "Evanescence Sweet Sacrifice", mood: "sacrifice", description: "it's true we're all insane" },
      { title: "Weight of the World - Evanescence", search: "Evanescence Weight of the World", mood: "heavy", description: "open door album depth" },
      { title: "Cloud Nine - Evanescence", search: "Evanescence Cloud Nine", mood: "high", description: "if you want to live let live" },
      { title: "Snow White Queen - Evanescence", search: "Evanescence Snow White Queen", mood: "fairytale", description: "stoplight lock the door" },
      { title: "Lacrymosa - Evanescence", search: "Evanescence Lacrymosa", mood: "tears", description: "mozart meets metal" },
      { title: "Like You - Evanescence", search: "Evanescence Like You", mood: "similarity", description: "stay low soft dark and dreamless" },
      { title: "Lose Control - Evanescence", search: "Evanescence Lose Control", mood: "control", description: "you don't remember my name" },
      { title: "The Only One - Evanescence", search: "Evanescence The Only One", mood: "only", description: "when i see your face" },
      { title: "Your Star - Evanescence", search: "Evanescence Your Star", mood: "star", description: "so i can't see your star" },
      { title: "All That I'm Living For - Evanescence", search: "Evanescence All That I'm Living For", mood: "living", description: "lock the last open door" },
      { title: "Good Enough - Evanescence", search: "Evanescence Good Enough", mood: "worthy", description: "under your waves what can i do" },
      { title: "What You Want - Evanescence", search: "Evanescence What You Want", mood: "wanting", description: "self-titled album return" },
      { title: "Made of Stone - Evanescence", search: "Evanescence Made of Stone", mood: "stone", description: "speak your mind like i'm made of stone" },
      { title: "The Change - Evanescence", search: "Evanescence The Change", mood: "change", description: "thought that i was strong" },
      { title: "My Heart Is Broken - Evanescence", search: "Evanescence My Heart Is Broken", mood: "heartbroken", description: "this world will never be" },
      { title: "Lost in Paradise - Evanescence", search: "Evanescence Lost in Paradise", mood: "paradise", description: "i've been believing in something so distant" },
      { title: "Sick - Evanescence", search: "Evanescence Sick", mood: "sick", description: "embrace the silence" },
      { title: "End of the Dream - Evanescence", search: "Evanescence End of the Dream", mood: "dream", description: "i found a grave" },
      { title: "Oceans - Evanescence", search: "Evanescence Oceans", mood: "ocean", description: "don't want to be the one" },
      { title: "Never Go Back - Evanescence", search: "Evanescence Never Go Back", mood: "forward", description: "everything is so broken" },
      { title: "Swimming Home - Evanescence", search: "Evanescence Swimming Home", mood: "swimming", description: "self-titled album closer" },
      { title: "Imperfection - Evanescence", search: "Evanescence Imperfection", mood: "imperfect", description: "synthesis album lead single" },
      { title: "Hi-Lo - Evanescence", search: "Evanescence Hi-Lo", mood: "highs and lows", description: "i don't know your thoughts" },
      { title: "Wasted on You - Evanescence", search: "Evanescence Wasted on You", mood: "wasted", description: "the bitter truth era" },
      { title: "The Game Is Over - Evanescence", search: "Evanescence The Game Is Over", mood: "game over", description: "had enough of your illusion" },
      { title: "Yeah Right - Evanescence", search: "Evanescence Yeah Right", mood: "sarcastic", description: "the bitter truth attitude" },
      { title: "Better Without You - Evanescence", search: "Evanescence Better Without You", mood: "better", description: "as the ashes fall" },
      { title: "Use My Voice - Evanescence", search: "Evanescence Use My Voice", mood: "voice", description: "i'll use my voice for the tortured" },
      { title: "Helena - My Chemical Romance", search: "My Chemical Romance Helena", mood: "dramatic", description: "so long and goodnight 🥀" },
      { title: "I'm Not Okay - My Chemical Romance", search: "My Chemical Romance I'm Not Okay", mood: "defiant", description: "the emo anthem of defiance" },
      { title: "The Ghost of You - My Chemical Romance", search: "My Chemical Romance The Ghost of You", mood: "haunting", description: "war and love and loss" },
      { title: "Cemetery Drive - My Chemical Romance", search: "My Chemical Romance Cemetery Drive", mood: "dark", description: "three cheers era perfection" },
      { title: "Thank You for the Venom - My Chemical Romance", search: "My Chemical Romance Thank You for the Venom", mood: "venomous", description: "sister i'm not much a poet" },
      { title: "To the End - My Chemical Romance", search: "My Chemical Romance To the End", mood: "devotion", description: "he calls the mansion not a house" },
      { title: "You Know What They Do to Guys Like Us in Prison - My Chemical Romance", search: "My Chemical Romance You Know What They Do to Guys Like Us in Prison", mood: "imprisoned", description: "longest song title ever" },
      { title: "It's Not a Fashion Statement - My Chemical Romance", search: "My Chemical Romance It's Not a Fashion Statement It's a Deathwish", mood: "statement", description: "for what you did to me" },
      { title: "The Jetset Life Is Gonna Kill You - My Chemical Romance", search: "My Chemical Romance The Jetset Life Is Gonna Kill You", mood: "glamorous", description: "gaze into her killing jar" },
      { title: "Interlude - My Chemical Romance", search: "My Chemical Romance Interlude", mood: "interlude", description: "in the middle of a gunfight" },
      { title: "Give 'Em Hell Kid - My Chemical Romance", search: "My Chemical Romance Give Em Hell Kid", mood: "rebellious", description: "oh baby here comes the sound" },
      { title: "The End - My Chemical Romance", search: "My Chemical Romance The End", mood: "ending", description: "now come one come all" },
      { title: "Dead! - My Chemical Romance", search: "My Chemical Romance Dead", mood: "aggressive", description: "and if your heart stops beating" },
      { title: "This Is How I Disappear - My Chemical Romance", search: "My Chemical Romance This Is How I Disappear", mood: "disappearing", description: "and without you is how i disappear" },
      { title: "The Sharpest Lives - My Chemical Romance", search: "My Chemical Romance The Sharpest Lives", mood: "sharp", description: "a light to burn all the empires" },
      { title: "I Don't Love You - My Chemical Romance", search: "My Chemical Romance I Don't Love You", mood: "heartbreak", description: "when you go would you even turn" },
      { title: "House of Wolves - My Chemical Romance", search: "My Chemical Romance House of Wolves", mood: "wolves", description: "tell me i'm a bad bad bad bad man" },
      { title: "Cancer - My Chemical Romance", search: "My Chemical Romance Cancer", mood: "illness", description: "turn away cause i'm awful just to see" },
      { title: "Mama - My Chemical Romance", search: "My Chemical Romance Mama", mood: "maternal", description: "mama we all go to hell" },
      { title: "Sleep - My Chemical Romance", search: "My Chemical Romance Sleep", mood: "sleepy", description: "some say now suffer all the children" },
      { title: "Disenchanted - My Chemical Romance", search: "My Chemical Romance Disenchanted", mood: "disenchanted", description: "well i was there on the day" },
      { title: "Famous Last Words - My Chemical Romance", search: "My Chemical Romance Famous Last Words", mood: "emotional", description: "i am not afraid to keep on living" },
      { title: "Blood - My Chemical Romance", search: "My Chemical Romance Blood", mood: "blood", description: "hidden black parade track" },
      { title: "Early Sunsets Over Monroeville - My Chemical Romance", search: "My Chemical Romance Early Sunsets Over Monroeville", mood: "apocalyptic", description: "bullets era deep cut" },
      { title: "Vampires Will Never Hurt You - My Chemical Romance", search: "My Chemical Romance Vampires Will Never Hurt You", mood: "vampires", description: "and if they get me and the sun" },
      { title: "Honey This Mirror - My Chemical Romance", search: "My Chemical Romance Honey This Mirror Isn't Big Enough", mood: "mirror", description: "the amount of pills i'm taking" },
      { title: "Skylines and Turnstiles - My Chemical Romance", search: "My Chemical Romance Skylines and Turnstiles", mood: "9/11", description: "you're not in this alone" },
      { title: "Our Lady of Sorrows - My Chemical Romance", search: "My Chemical Romance Our Lady of Sorrows", mood: "sorrows", description: "we could be perfect one last night" },
      { title: "Headfirst for Halos - My Chemical Romance", search: "My Chemical Romance Headfirst for Halos", mood: "halos", description: "well let's go back to the middle" },
      { title: "Drowning Lessons - My Chemical Romance", search: "My Chemical Romance Drowning Lessons", mood: "drowning", description: "without a sound i took her down" },
      { title: "Sorrows - My Chemical Romance", search: "My Chemical Romance Sorrows", mood: "sorrow", description: "demo rarity" },
      { title: "Demolition Lovers - My Chemical Romance", search: "My Chemical Romance Demolition Lovers", mood: "demolition", description: "all we are is bullets i mean this" },
      { title: "Na Na Na - My Chemical Romance", search: "My Chemical Romance Na Na Na", mood: "chaotic", description: "danger days killjoy anthem" },
      { title: "Bulletproof Heart - My Chemical Romance", search: "My Chemical Romance Bulletproof Heart", mood: "bulletproof", description: "gravity don't mean too much" },
      { title: "SING - My Chemical Romance", search: "My Chemical Romance SING", mood: "sing", description: "sing it for the boys" },
      { title: "Planetary (GO!) - My Chemical Romance", search: "My Chemical Romance Planetary GO", mood: "planetary", description: "and i got the poison" },
      { title: "The Only Hope for Me Is You - My Chemical Romance", search: "My Chemical Romance The Only Hope for Me Is You", mood: "hope", description: "the only hope for me is you" },
      { title: "Party Poison - My Chemical Romance", search: "My Chemical Romance Party Poison", mood: "poison", description: "dr death defying" },
      { title: "Save Yourself I'll Hold Them Back - My Chemical Romance", search: "My Chemical Romance Save Yourself I'll Hold Them Back", mood: "sacrifice", description: "we can live forever" },
      { title: "S/C/A/R/E/C/R/O/W - My Chemical Romance", search: "My Chemical Romance SCARECROW", mood: "scarecrow", description: "move your body when the sunlight dies" },
      { title: "Summertime - My Chemical Romance", search: "My Chemical Romance Summertime", mood: "summer", description: "when the lights go out" },
      { title: "Destroya - My Chemical Romance", search: "My Chemical Romance Destroya", mood: "destroyer", description: "you don't believe in god" },
      { title: "Kids from Yesterday - My Chemical Romance", search: "My Chemical Romance The Kids from Yesterday", mood: "yesterday", description: "and you only live forever" },
      { title: "Vampire Money - My Chemical Romance", search: "My Chemical Romance Vampire Money", mood: "vampire", description: "3-2-1 we came to suck" },
      { title: "We Don't Need Another Song - My Chemical Romance", search: "My Chemical Romance We Don't Need Another Song About California", mood: "california", description: "conventional weapons rarity" },
      { title: "Gun. - My Chemical Romance", search: "My Chemical Romance Gun", mood: "gun", description: "conventional weapons track" },
      { title: "The World Is Ugly - My Chemical Romance", search: "My Chemical Romance The World Is Ugly", mood: "ugly", description: "conventional weapons beauty" },
      { title: "The Light Behind Your Eyes - My Chemical Romance", search: "My Chemical Romance The Light Behind Your Eyes", mood: "light", description: "so long to all my friends" },
      { title: "Kiss the Ring - My Chemical Romance", search: "My Chemical Romance Kiss the Ring", mood: "ring", description: "conventional weapons aggression" },
      { title: "Make Room!!!! - My Chemical Romance", search: "My Chemical Romance Make Room", mood: "room", description: "conventional weapons energy" },
      { title: "Surrender the Night - My Chemical Romance", search: "My Chemical Romance Surrender the Night", mood: "surrender", description: "conventional weapons emotion" },
      { title: "Burn Bright - My Chemical Romance", search: "My Chemical Romance Burn Bright", mood: "burning", description: "conventional weapons finale" },
      { title: "Ambulance - My Chemical Romance", search: "My Chemical Romance Ambulance", mood: "ambulance", description: "conventional weapons bonus" },
      { title: "BURY ME IN BLACK - My Chemical Romance", search: "My Chemical Romance Bury Me in Black", mood: "burial", description: "unreleased demo gold" },
      { title: "Desert Song - My Chemical Romance", search: "My Chemical Romance Desert Song", mood: "desert", description: "life on the murder scene exclusive" },
      { title: "The Foundations of Decay - My Chemical Romance", search: "My Chemical Romance The Foundations of Decay", mood: "decay", description: "2022 comeback single epic" },
      { title: "Tell That Mick - Fall Out Boy", search: "Fall Out Boy Tell That Mick He Just Made My List", mood: "aggressive", description: "longest title in emo history" },
      { title: "Dead on Arrival - Fall Out Boy", search: "Fall Out Boy Dead on Arrival", mood: "dead", description: "take this to your grave rawness" },
      { title: "Grand Theft Autumn - Fall Out Boy", search: "Fall Out Boy Grand Theft Autumn", mood: "melancholy", description: "where is your boy tonight?" },
      { title: "Saturday - Fall Out Boy", search: "Fall Out Boy Saturday", mood: "angsty", description: "pete wentz bass lines hit different" },
      { title: "Homesick at Space Camp - Fall Out Boy", search: "Fall Out Boy Homesick at Space Camp", mood: "homesick", description: "i'm coming apart at the seams" },
      { title: "Sending Postcards - Fall Out Boy", search: "Fall Out Boy Sending Postcards from a Plane Crash", mood: "crash", description: "wish you were here" },
      { title: "Chicago Is So Two Years Ago - Fall Out Boy", search: "Fall Out Boy Chicago Is So Two Years Ago", mood: "nostalgic", description: "my heart is on my sleeve" },
      { title: "The Pros and Cons - Fall Out Boy", search: "Fall Out Boy The Pros and Cons of Breathing", mood: "breathing", description: "i want to hate you half as much" },
      { title: "Grenade Jumper - Fall Out Boy", search: "Fall Out Boy Grenade Jumper", mood: "explosive", description: "my heart ticks in beat" },
      { title: "Calm Before the Storm - Fall Out Boy", search: "Fall Out Boy Calm Before the Storm", mood: "calm", description: "i am an arms dealer" },
      { title: "Reinventing the Wheel - Fall Out Boy", search: "Fall Out Boy Reinventing the Wheel to Run Myself Over", mood: "self-destructive", description: "i can't wake up" },
      { title: "The Patron Saint of Liars - Fall Out Boy", search: "Fall Out Boy The Patron Saint of Liars and Fakes", mood: "fake", description: "i'm holding out" },
      { title: "Our Lawyer Made Us - Fall Out Boy", search: "Fall Out Boy Our Lawyer Made Us Change the Name", mood: "legal", description: "so we wouldn't get sued" },
      { title: "Of All the Gin Joints - Fall Out Boy", search: "Fall Out Boy Of All the Gin Joints", mood: "gin", description: "i'm the new cancer" },
      { title: "Dance Dance - Fall Out Boy", search: "Fall Out Boy Dance Dance", mood: "energetic", description: "this is the way they'd love" },
      { title: "Nobody Puts Baby - Fall Out Boy", search: "Fall Out Boy Nobody Puts Baby in the Corner", mood: "defiant", description: "i keep my jealousy close" },
      { title: "I've Got a Dark Alley - Fall Out Boy", search: "Fall Out Boy I've Got a Dark Alley", mood: "dark", description: "joke me something awful" },
      { title: "7 Minutes in Heaven - Fall Out Boy", search: "Fall Out Boy 7 Minutes in Heaven", mood: "attic", description: "i'm in the details with the devil" },
      { title: "Sophomore Slump - Fall Out Boy", search: "Fall Out Boy Sophomore Slump or Comeback", mood: "comeback", description: "are we growing up or just going down" },
      { title: "Champagne for My Real Friends - Fall Out Boy", search: "Fall Out Boy Champagne for My Real Friends", mood: "champagne", description: "you are a getaway car" },
      { title: "I Slept with Someone - Fall Out Boy", search: "Fall Out Boy I Slept with Someone in Fall Out Boy", mood: "scandal", description: "and all i got was this stupid song" },
      { title: "A Little Less Sixteen Candles - Fall Out Boy", search: "Fall Out Boy A Little Less Sixteen Candles", mood: "touch", description: "i confess i messed up" },
      { title: "Get Busy Living - Fall Out Boy", search: "Fall Out Boy Get Busy Living or Get Busy Dying", mood: "choice", description: "do you know who you are" },
      { title: "XO - Fall Out Boy", search: "Fall Out Boy XO", mood: "xo", description: "to the end of everything" },
      { title: "Snitches and Talkers - Fall Out Boy", search: "Fall Out Boy Snitches and Talkers Get Stitches", mood: "snitches", description: "show me how you move" },
      { title: "The Music or the Misery - Fall Out Boy", search: "Fall Out Boy The Music or the Misery", mood: "misery", description: "i got your love letters" },
      { title: "Thriller - Fall Out Boy", search: "Fall Out Boy Thriller", mood: "thriller", description: "last summer we took threes" },
      { title: "The Take Over - Fall Out Boy", search: "Fall Out Boy The Take Over the Breaks Over", mood: "takeover", description: "baby seasons change" },
      { title: "This Ain't a Scene - Fall Out Boy", search: "Fall Out Boy This Ain't a Scene", mood: "aggressive", description: "it's a goddamn arms race!" },
      { title: "I'm Like a Lawyer - Fall Out Boy", search: "Fall Out Boy I'm Like a Lawyer", mood: "lawyer", description: "me and you" },
      { title: "Hum Hallelujah - Fall Out Boy", search: "Fall Out Boy Hum Hallelujah", mood: "hallelujah", description: "i could write it better" },
      { title: "Golden - Fall Out Boy", search: "Fall Out Boy Golden", mood: "golden", description: "how cruel is the golden rule" },
      { title: "Thnks fr th Mmrs - Fall Out Boy", search: "Fall Out Boy Thanks for the Memories", mood: "nostalgic", description: "one night and one more time" },
      { title: "Don't You Know Who I Think I Am - Fall Out Boy", search: "Fall Out Boy Don't You Know Who I Think I Am", mood: "identity", description: "they say quitters never win" },
      { title: "The After Life of the Party - Fall Out Boy", search: "Fall Out Boy The After Life of the Party", mood: "afterlife", description: "i'm a stitch away" },
      { title: "Carpal Tunnel of Love - Fall Out Boy", search: "Fall Out Boy Carpal Tunnel of Love", mood: "tunnel", description: "we're the things that love destroys" },
      { title: "Bang the Doldrums - Fall Out Boy", search: "Fall Out Boy Bang the Doldrums", mood: "doldrums", description: "best friends ex friends" },
      { title: "Fame < Infamy - Fall Out Boy", search: "Fall Out Boy Fame Less Than Infamy", mood: "fame", description: "i'm alright in bed" },
      { title: "You're Crashing - Fall Out Boy", search: "Fall Out Boy You're Crashing But You're No Wave", mood: "crashing", description: "i got troubled thoughts" },
      { title: "I've Got All This Ringing - Fall Out Boy", search: "Fall Out Boy I've Got All This Ringing", mood: "ringing", description: "and none on my fingers" },
      { title: "G.I.N.A.S.F.S. - Fall Out Boy", search: "Fall Out Boy GINASFS", mood: "acronym", description: "g.i.n.a.s.f.s." },
      { title: "It's Hard to Say - Fall Out Boy", search: "Fall Out Boy It's Hard to Say I Do", mood: "wedding", description: "when i don't" },
      { title: "Introduction - Panic! At The Disco", search: "Panic At The Disco Introduction", mood: "introduction", description: "ladies and gentlemen" },
      { title: "The Only Difference - Panic! At The Disco", search: "Panic At The Disco The Only Difference", mood: "martyr", description: "swear to shake it up" },
      { title: "London Beckoned - Panic! At The Disco", search: "Panic At The Disco London Beckoned", mood: "london", description: "stop stalling make a name" },
      { title: "Nails for Breakfast - Panic! At The Disco", search: "Panic At The Disco Nails for Breakfast", mood: "breakfast", description: "watch your mouth" },
      { title: "Camisado - Panic! At The Disco", search: "Panic At The Disco Camisado", mood: "hospital", description: "the IV and your hospital bed" },
      { title: "Time to Dance - Panic! At The Disco", search: "Panic At The Disco Time to Dance", mood: "energetic", description: "give me envy give me malice" },
      { title: "Lying Is the Most Fun - Panic! At The Disco", search: "Panic At The Disco Lying Is the Most Fun", mood: "seductive", description: "brendon's range is insane" },
      { title: "Intermission - Panic! At The Disco", search: "Panic At The Disco Intermission", mood: "intermission", description: "ladies and gentlemen" },
      { title: "But It's Better If You Do - Panic! At The Disco", search: "Panic At The Disco But It's Better If You Do", mood: "theatrical", description: "circus vibes" },
      { title: "There's a Good Reason - Panic! At The Disco", search: "Panic At The Disco There's a Good Reason", mood: "tables", description: "haven't you heard" },
      { title: "Build God Then We'll Talk - Panic! At The Disco", search: "Panic At The Disco Build God Then We'll Talk", mood: "dramatic", description: "fever era storytelling" },
      { title: "We're So Starving - Panic! At The Disco", search: "Panic At The Disco We're So Starving", mood: "starving", description: "oh how it's been so long" },
      { title: "Nine in the Afternoon - Panic! At The Disco", search: "Panic At The Disco Nine in the Afternoon", mood: "afternoon", description: "your eyes are the size of the moon" },
      { title: "She's a Handsome Woman - Panic! At The Disco", search: "Panic At The Disco She's a Handsome Woman", mood: "handsome", description: "innocence sunk the glow" },
      { title: "Do You Know What I'm Seeing - Panic! At The Disco", search: "Panic At The Disco Do You Know What I'm Seeing", mood: "seeing", description: "clouds are marching along" },
      { title: "That Green Gentleman - Panic! At The Disco", search: "Panic At The Disco That Green Gentleman", mood: "green", description: "things have changed for me" },
      { title: "I Have Friends in Holy Spaces - Panic! At The Disco", search: "Panic At The Disco I Have Friends in Holy Spaces", mood: "holy", description: "you remind me of a few" },
      { title: "Northern Downpour - Panic! At The Disco", search: "Panic At The Disco Northern Downpour", mood: "rain", description: "i know the world's a broken bone" },
      { title: "When the Day Met the Night - Panic! At The Disco", search: "Panic At The Disco When the Day Met the Night", mood: "romantic", description: "when the moon fell in love" },
      { title: "Pas de Cheval - Panic! At The Disco", search: "Panic At The Disco Pas de Cheval", mood: "french", description: "oh little did she know" },
      { title: "The Piano Knows Something - Panic! At The Disco", search: "Panic At The Disco The Piano Knows Something", mood: "piano", description: "i won't cut my beard" },
      { title: "Behind the Sea - Panic! At The Disco", search: "Panic At The Disco Behind the Sea", mood: "sea", description: "a daydream spills" },
      { title: "Folkin' Around - Panic! At The Disco", search: "Panic At The Disco Folkin Around", mood: "folk", description: "allow me to exaggerate" },
      { title: "She Had the World - Panic! At The Disco", search: "Panic At The Disco She Had the World", mood: "world", description: "she had the world" },
      { title: "From a Mountain - Panic! At The Disco", search: "Panic At The Disco From a Mountain", mood: "mountain", description: "lying there with a halo" },
      { title: "Mad as Rabbits - Panic! At The Disco", search: "Panic At The Disco Mad as Rabbits", mood: "mad", description: "come save me from walking off" },
      { title: "The Ballad of Mona Lisa - Panic! At The Disco", search: "Panic At The Disco The Ballad of Mona Lisa", mood: "ballad", description: "say what you mean" },
      { title: "Let's Kill Tonight - Panic! At The Disco", search: "Panic At The Disco Let's Kill Tonight", mood: "killing", description: "may your feet serve you well" },
      { title: "Hurricane - Panic! At The Disco", search: "Panic At The Disco Hurricane", mood: "hurricane", description: "are you worth your weight in gold" },
      { title: "Memories - Panic! At The Disco", search: "Panic At The Disco Memories", mood: "memory", description: "he was the congregation's vagrant" },
      { title: "Trade Mistakes - Panic! At The Disco", search: "Panic At The Disco Trade Mistakes", mood: "mistakes", description: "placing a smile at the perfect event" },
      { title: "Ready to Go - Panic! At The Disco", search: "Panic At The Disco Ready to Go", mood: "ready", description: "you've got these little things" },
      { title: "Always - Panic! At The Disco", search: "Panic At The Disco Always", mood: "always", description: "when the world gets too heavy" },
      { title: "The Calendar - Panic! At The Disco", search: "Panic At The Disco The Calendar", mood: "calendar", description: "they said if you don't let it out" },
      { title: "Sarah Smiles - Panic! At The Disco", search: "Panic At The Disco Sarah Smiles", mood: "smiling", description: "sarah smiles like sarah doesn't care" },
      { title: "Nearly Witches - Panic! At The Disco", search: "Panic At The Disco Nearly Witches", mood: "witches", description: "drifting through the wind" },
      { title: "Stall Me - Panic! At The Disco", search: "Panic At The Disco Stall Me", mood: "stalling", description: "fall to your knees" },
      { title: "Oh Glory - Panic! At The Disco", search: "Panic At The Disco Oh Glory", mood: "glory", description: "i can only hope it's true" },
      { title: "I Wanna Be Free - Panic! At The Disco", search: "Panic At The Disco I Wanna Be Free", mood: "freedom", description: "everything seems to be estranged" },
      { title: "Turn Off the Lights - Panic! At The Disco", search: "Panic At The Disco Turn Off the Lights", mood: "lights", description: "turn off the lights" },
      { title: "Vegas Lights - Panic! At The Disco", search: "Panic At The Disco Vegas Lights", mood: "vegas", description: "oh if you only knew" },
      { title: "Girl That You Love - Panic! At The Disco", search: "Panic At The Disco Girl That You Love", mood: "love", description: "drop every pretense" },
      { title: "Nicotine - Panic! At The Disco", search: "Panic At The Disco Nicotine", mood: "addiction", description: "cross my heart and hope to die" },
      { title: "Miss Jackson - Panic! At The Disco", search: "Panic At The Disco Miss Jackson", mood: "jackson", description: "climbing out the back door" },
      { title: "This Is Gospel - Panic! At The Disco", search: "Panic At The Disco This Is Gospel", mood: "gospel", description: "if you love me let me go" },
      { title: "Casual Affair - Panic! At The Disco", search: "Panic At The Disco Casual Affair", mood: "casual", description: "hey a casual affair" },
      { title: "Far Too Young to Die - Panic! At The Disco", search: "Panic At The Disco Far Too Young to Die", mood: "young", description: "i've never so adored you" },
      { title: "Collar Full - Panic! At The Disco", search: "Panic At The Disco Collar Full", mood: "collar", description: "we've waited so damn long" },
      { title: "The End of All Things - Panic! At The Disco", search: "Panic At The Disco The End of All Things", mood: "ending", description: "whether near or far" },
      { title: "Victorious - Panic! At The Disco", search: "Panic At The Disco Victorious", mood: "victory", description: "tonight we are victorious" },
      { title: "Don't Threaten Me - Panic! At The Disco", search: "Panic At The Disco Don't Threaten Me with a Good Time", mood: "threatening", description: "champagne cocaine gasoline" },
      { title: "Hallelujah - Panic! At The Disco", search: "Panic At The Disco Hallelujah", mood: "hallelujah", description: "a moment you'll never remember" },
      { title: "Emperor's New Clothes - Panic! At The Disco", search: "Panic At The Disco Emperor's New Clothes", mood: "emperor", description: "welcome to the end of eras" },
      { title: "Death of a Bachelor - Panic! At The Disco", search: "Panic At The Disco Death of a Bachelor", mood: "bachelor", description: "do i look lonely" },
      { title: "Crazy=Genius - Panic! At The Disco", search: "Panic At The Disco Crazy Equals Genius", mood: "crazy", description: "you can set yourself on fire" },
      { title: "LA Devotee - Panic! At The Disco", search: "Panic At The Disco LA Devotee", mood: "devotee", description: "you got two black eyes" },
      { title: "Golden Days - Panic! At The Disco", search: "Panic At The Disco Golden Days", mood: "golden", description: "i found a pile of polaroids" },
      { title: "House of Memories - Panic! At The Disco", search: "Panic At The Disco House of Memories", mood: "memories", description: "if you're a lover" },
      { title: "Impossible Year - Panic! At The Disco", search: "Panic At The Disco Impossible Year", mood: "impossible", description: "there's no sunshine" },
      { title: "(Fuck A) Silver Lining - Panic! At The Disco", search: "Panic At The Disco Silver Lining", mood: "silver", description: "fuck a silver lining" },
      { title: "Say Amen - Panic! At The Disco", search: "Panic At The Disco Say Amen Saturday Night", mood: "amen", description: "been traveling in packs" },
      { title: "Hey Look Ma - Panic! At The Disco", search: "Panic At The Disco Hey Look Ma I Made It", mood: "made it", description: "hey look ma i made it" },
      { title: "High Hopes - Panic! At The Disco", search: "Panic At The Disco High Hopes", mood: "hopes", description: "had to have high high hopes" },
      { title: "Roaring 20s - Panic! At The Disco", search: "Panic At The Disco Roaring 20s", mood: "roaring", description: "broadway is dark tonight" },
      { title: "Dancing's Not a Crime - Panic! At The Disco", search: "Panic At The Disco Dancing's Not a Crime", mood: "dancing", description: "i'm still uninvited" },
      { title: "One of the Drunks - Panic! At The Disco", search: "Panic At The Disco One of the Drunks", mood: "drunk", description: "welcome to the club" },
      { title: "The Overpass - Panic! At The Disco", search: "Panic At The Disco The Overpass", mood: "overpass", description: "let me hear you say" },
      { title: "King of the Clouds - Panic! At The Disco", search: "Panic At The Disco King of the Clouds", mood: "clouds", description: "some days are dark" },
      { title: "Old Fashioned - Panic! At The Disco", search: "Panic At The Disco Old Fashioned", mood: "fashioned", description: "once upon a thrill" },
      { title: "Dying in LA - Panic! At The Disco", search: "Panic At The Disco Dying in LA", mood: "dying", description: "the moment you arrived" },
      { title: "Viva Las Vengeance - Panic! At The Disco", search: "Panic At The Disco Viva Las Vengeance", mood: "vengeance", description: "shut up and go to bed" },
      { title: "Middle of a Breakup - Panic! At The Disco", search: "Panic At The Disco Middle of a Breakup", mood: "breakup", description: "you're a Mona Lisa" },
      { title: "Don't Let the Light Go Out - Panic! At The Disco", search: "Panic At The Disco Don't Let the Light Go Out", mood: "light", description: "who was i to say" },
      { title: "Local God - Panic! At The Disco", search: "Panic At The Disco Local God", mood: "god", description: "in the desert of my mind" },
      { title: "Star Spangled Banger - Panic! At The Disco", search: "Panic At The Disco Star Spangled Banger", mood: "banger", description: "the people versus" },
      { title: "God Killed Rock and Roll - Panic! At The Disco", search: "Panic At The Disco God Killed Rock and Roll", mood: "killed", description: "glitter's getting everywhere" },
      { title: "Say It Louder - Panic! At The Disco", search: "Panic At The Disco Say It Louder", mood: "louder", description: "everybody hates you now" },
      { title: "Sugar Soaker - Panic! At The Disco", search: "Panic At The Disco Sugar Soaker", mood: "sugar", description: "put your money where your mouth is" },
      { title: "Something About Maggie - Panic! At The Disco", search: "Panic At The Disco Something About Maggie", mood: "maggie", description: "there's something about you" },
      { title: "Sad Clown - Panic! At The Disco", search: "Panic At The Disco Sad Clown", mood: "clown", description: "i'm a sad clown" },
      { title: "All By Yourself - Panic! At The Disco", search: "Panic At The Disco All By Yourself", mood: "alone", description: "you can feel the heat" },
      { title: "Do It to Death - Panic! At The Disco", search: "Panic At The Disco Do It to Death", mood: "death", description: "take me to the limit" },
      { title: "All We Know - Paramore", search: "Paramore All We Know", mood: "falling", description: "don't go crying to your mama" },
      { title: "Pressure - Paramore", search: "Paramore Pressure", mood: "defiant", description: "tell me where our time went" },
      { title: "Emergency - Paramore", search: "Paramore Emergency", mood: "intense", description: "early paramore rawness" },
      { title: "Brighter - Paramore", search: "Paramore Brighter", mood: "bright", description: "so this is how it goes" },
      { title: "Here We Go Again - Paramore", search: "Paramore Here We Go Again", mood: "repetitive", description: "and here we go again" },
      { title: "Never Let This Go - Paramore", search: "Paramore Never Let This Go", mood: "holding", description: "maybe if my heart stops" },
      { title: "Whoa - Paramore", search: "Paramore Whoa", mood: "whoa", description: "i've hoped for change" },
      { title: "Conspiracy - Paramore", search: "Paramore Conspiracy", mood: "conspiracy", description: "please speak softly" },
      { title: "Franklin - Paramore", search: "Paramore Franklin", mood: "franklin", description: "and when we get home" },
      { title: "My Heart - Paramore", search: "Paramore My Heart", mood: "heart", description: "i am finding out" },
      { title: "For a Pessimist - Paramore", search: "Paramore For a Pessimist I'm Pretty Optimistic", mood: "optimistic", description: "just talk yourself up" },
      { title: "That's What You Get - Paramore", search: "Paramore That's What You Get", mood: "consequences", description: "that's what you get" },
      { title: "Hallelujah - Paramore", search: "Paramore Hallelujah", mood: "hallelujah", description: "somehow everything's gonna fall" },
      { title: "When It Rains - Paramore", search: "Paramore When It Rains", mood: "rain", description: "and when it rains" },
      { title: "Let the Flames Begin - Paramore", search: "Paramore Let the Flames Begin", mood: "flames", description: "what a shame we all became" },
      { title: "Miracle - Paramore", search: "Paramore Miracle", mood: "miracle", description: "i'm not a miracle" },
      { title: "Crushcrushcrush - Paramore", search: "Paramore Crushcrushcrush", mood: "aggressive", description: "hayley's energy is unmatched" },
      { title: "We Are Broken - Paramore", search: "Paramore We Are Broken", mood: "broken", description: "i am outside" },
      { title: "Fences - Paramore", search: "Paramore Fences", mood: "fences", description: "i'm sitting in a room" },
      { title: "Born for This - Paramore", search: "Paramore Born for This", mood: "destiny", description: "we were born for this" },
      { title: "Careful - Paramore", search: "Paramore Careful", mood: "careful", description: "truth never set me free" },
      { title: "Ignorance - Paramore", search: "Paramore Ignorance", mood: "ignorance", description: "ignorance is your new best friend" },
      { title: "Playing God - Paramore", search: "Paramore Playing God", mood: "god", description: "you don't have to believe me" },
      { title: "Brick by Boring Brick - Paramore", search: "Paramore Brick by Boring Brick", mood: "boring", description: "she lives in a fairy tale" },
      { title: "Turn It Off - Paramore", search: "Paramore Turn It Off", mood: "off", description: "i scraped my knees" },
      { title: "The Only Exception - Paramore", search: "Paramore The Only Exception", mood: "exception", description: "and you are the only exception" },
      { title: "Feeling Sorry - Paramore", search: "Paramore Feeling Sorry", mood: "sorry", description: "we still live in the same town" },
      { title: "Looking Up - Paramore", search: "Paramore Looking Up", mood: "up", description: "things are looking up" },
      { title: "Where the Lines Overlap - Paramore", search: "Paramore Where the Lines Overlap", mood: "overlap", description: "no one knows the weight" },
      { title: "Misguided Ghosts - Paramore", search: "Paramore Misguided Ghosts", mood: "ghosts", description: "i'm going away for a while" },
      { title: "All I Wanted - Paramore", search: "Paramore All I Wanted", mood: "wanted", description: "all i wanted was you" },
      { title: "Decode - Paramore", search: "Paramore Decode", mood: "dark", description: "twilight soundtrack perfection" },
      { title: "I Caught Myself - Paramore", search: "Paramore I Caught Myself", mood: "caught", description: "twilight soundtrack deep cut" },
      { title: "Fast in My Car - Paramore", search: "Paramore Fast in My Car", mood: "fast", description: "we're driving fast in my car" },
      { title: "Now - Paramore", search: "Paramore Now", mood: "now", description: "don't try to take this from me" },
      { title: "Grow Up - Paramore", search: "Paramore Grow Up", mood: "growing", description: "i told them all where to stick it" },
      { title: "Daydreaming - Paramore", search: "Paramore Daydreaming", mood: "dreaming", description: "living in a world of rear view mirrors" },
      { title: "Interlude: Moving On - Paramore", search: "Paramore Interlude Moving On", mood: "moving", description: "let 'em have their time" },
      { title: "Ain't It Fun - Paramore", search: "Paramore Ain't It Fun", mood: "fun", description: "ain't it fun living in the real world" },
      { title: "Part II - Paramore", search: "Paramore Part II", mood: "part two", description: "what a shame what a shame" },
      { title: "Last Hope - Paramore", search: "Paramore Last Hope", mood: "hope", description: "it's just a spark" },
      { title: "Still Into You - Paramore", search: "Paramore Still Into You", mood: "love", description: "i should be over all the butterflies" },
      { title: "Anklebiters - Paramore", search: "Paramore Anklebiters", mood: "biters", description: "fall in love with yourself" },
      { title: "Interlude: Holiday - Paramore", search: "Paramore Interlude Holiday", mood: "holiday", description: "now i can move on" },
      { title: "Proof - Paramore", search: "Paramore Proof", mood: "proof", description: "so here's your proof" },
      { title: "Hate to See Your Heart Break - Paramore", search: "Paramore Hate to See Your Heart Break", mood: "heartbreak", description: "hate to see your heart break" },
      { title: "(One of Those) Crazy Girls - Paramore", search: "Paramore One of Those Crazy Girls", mood: "crazy", description: "i'm gonna be" },
      { title: "Interlude: I'm Not Angry Anymore - Paramore", search: "Paramore Interlude I'm Not Angry Anymore", mood: "anger", description: "i'm not angry anymore" },
      { title: "Be Alone - Paramore", search: "Paramore Be Alone", mood: "alone", description: "i don't wanna be alone" },
      { title: "Future - Paramore", search: "Paramore Future", mood: "future", description: "we're gonna live" },
      { title: "Escape Route - Paramore", search: "Paramore Escape Route", mood: "escape", description: "i've got an escape route" },
      { title: "Native Tongue - Paramore", search: "Paramore Native Tongue", mood: "tongue", description: "how can they say" },
      { title: "Tell Me It's Okay - Paramore", search: "Paramore Tell Me It's Okay", mood: "okay", description: "maybe it's okay" },
      { title: "Hard Times - Paramore", search: "Paramore Hard Times", mood: "hard", description: "all that i want is to wake up fine" },
      { title: "Rose-Colored Boy - Paramore", search: "Paramore Rose-Colored Boy", mood: "rose", description: "i want you to stop insisting" },
      { title: "Told You So - Paramore", search: "Paramore Told You So", mood: "told", description: "for all i know" },
      { title: "Forgiveness - Paramore", search: "Paramore Forgiveness", mood: "forgive", description: "don't you go and get it twisted" },
      { title: "Fake Happy - Paramore", search: "Paramore Fake Happy", mood: "fake", description: "i love making you believe" },
      { title: "26 - Paramore", search: "Paramore 26", mood: "age", description: "hold onto hope if you got it" },
      { title: "Pool - Paramore", search: "Paramore Pool", mood: "pool", description: "i'm underwater" },
      { title: "Grudges - Paramore", search: "Paramore Grudges", mood: "grudges", description: "strange how we found ourselves" },
      { title: "Caught in the Middle - Paramore", search: "Paramore Caught in the Middle", mood: "middle", description: "i can't think of getting old" },
      { title: "Idle Worship - Paramore", search: "Paramore Idle Worship", mood: "worship", description: "standing here like i'm supposed to say something" },
      { title: "No Friend - Paramore", search: "Paramore No Friend", mood: "friend", description: "another brick-red room" },
      { title: "Tell Me How - Paramore", search: "Paramore Tell Me How", mood: "how", description: "i can't call you a stranger" },
      { title: "This Is Why - Paramore", search: "Paramore This Is Why", mood: "why", description: "this is why i don't leave the house" },
      { title: "The News - Paramore", search: "Paramore The News", mood: "news", description: "a war a war on the far side" },
      { title: "Running Out of Time - Paramore", search: "Paramore Running Out of Time", mood: "time", description: "said i was gonna take some flowers" },
      { title: "C'est Comme Ca - Paramore", search: "Paramore C'est Comme Ca", mood: "french", description: "c'est comme ca" },
      { title: "Big Man Little Dignity - Paramore", search: "Paramore Big Man Little Dignity", mood: "dignity", description: "big man little dignity" },
      { title: "You First - Paramore", search: "Paramore You First", mood: "first", description: "turns out i'm living in a horror film" },
      { title: "Figure 8 - Paramore", search: "Paramore Figure 8", mood: "eight", description: "all for your sake" },
      { title: "Liar - Paramore", search: "Paramore Liar", mood: "liar", description: "what was the moment" },
      { title: "Crave - Paramore", search: "Paramore Crave", mood: "crave", description: "i can't wait" },
      { title: "Thick Skull - Paramore", search: "Paramore Thick Skull", mood: "skull", description: "i am a magnet for broken pieces" },
      { title: "Hands Down - Dashboard Confessional", search: "Dashboard Confessional Hands Down", mood: "emotional", description: "breathe in for luck" },
      { title: "Screaming Infidelities - Dashboard Confessional", search: "Dashboard Confessional Screaming Infidelities", mood: "heartbreak", description: "chris carrabba's vulnerability" },
      { title: "Vindicated - Dashboard Confessional", search: "Dashboard Confessional Vindicated", mood: "triumphant", description: "spider-man 2 soundtrack classic" },
      { title: "The Places You Have Come to Fear - Dashboard Confessional", search: "Dashboard Confessional Places You Have Come to Fear", mood: "melancholy", description: "most honest lyrics ever written" },
      { title: "Saints and Sailors - Dashboard Confessional", search: "Dashboard Confessional Saints and Sailors", mood: "sailing", description: "this is where i say i've had enough" },
      { title: "The Best Deceptions - Dashboard Confessional", search: "Dashboard Confessional The Best Deceptions", mood: "deception", description: "i heard about your regrets" },
      { title: "Remember to Breathe - Dashboard Confessional", search: "Dashboard Confessional Remember to Breathe", mood: "breathe", description: "she fixes her lips" },
      { title: "The Good Fight - Dashboard Confessional", search: "Dashboard Confessional The Good Fight", mood: "fighting", description: "consider the odds" },
      { title: "Ohio Is For Lovers - Hawthorne Heights", search: "Hawthorne Heights Ohio Is For Lovers", mood: "melancholy", description: "so cut my wrists and black my eyes" },
      { title: "Niki FM - Hawthorne Heights", search: "Hawthorne Heights Niki FM", mood: "longing", description: "let's go back to the start" },
      { title: "Silver Bullet - Hawthorne Heights", search: "Hawthorne Heights Silver Bullet", mood: "dark", description: "tonight we'll fly away so high" },
      { title: "Saying Sorry - Hawthorne Heights", search: "Hawthorne Heights Saying Sorry", mood: "regret", description: "these colors will not change" },
      { title: "Decembers - Hawthorne Heights", search: "Hawthorne Heights Decembers", mood: "december", description: "let's try to remember" },
      { title: "Rescue Me - Hawthorne Heights", search: "Hawthorne Heights Rescue Me", mood: "rescue", description: "i'm just waiting for you" },
      { title: "Pens and Needles - Hawthorne Heights", search: "Hawthorne Heights Pens and Needles", mood: "pain", description: "i miss you most when" },
      { title: "The Taste of Ink - The Used", search: "The Used The Taste of Ink", mood: "angsty", description: "is it worth it can you even hear me" },
      { title: "Blue and Yellow - The Used", search: "The Used Blue and Yellow", mood: "emotional", description: "and it's all in how you mix the two" },
      { title: "I Caught Fire - The Used", search: "The Used I Caught Fire", mood: "passionate", description: "in your eyes i lost my place" },
      { title: "All That I've Got - The Used", search: "The Used All That I've Got", mood: "desperate", description: "so deep that it didn't even bleed" },
      { title: "Buried Myself Alive - The Used", search: "The Used Buried Myself Alive", mood: "buried", description: "i buried myself alive on the inside" },
      { title: "A Box Full of Sharp Objects - The Used", search: "The Used A Box Full of Sharp Objects", mood: "sharp", description: "it's our time to shine" },
      { title: "Pretty Handsome Awkward - The Used", search: "The Used Pretty Handsome Awkward", mood: "awkward", description: "your dream vacation" },
      { title: "The Bird and the Worm - The Used", search: "The Used The Bird and the Worm", mood: "worm", description: "he wears his heart safety pinned" },
      { title: "Listening - The Used", search: "The Used Listening", mood: "listening", description: "your skin attached is a fragile cliche" },
      { title: "Take It Away - The Used", search: "The Used Take It Away", mood: "taking", description: "life's greatest questions" },
      { title: "Cute Without the E - Taking Back Sunday", search: "Taking Back Sunday Cute Without the E", mood: "angsty", description: "the truth is you could slit my throat" },
      { title: "You Know How I Do - Taking Back Sunday", search: "Taking Back Sunday You Know How I Do", mood: "confident", description: "so sick so sick of being tired" },
      { title: "MakeDamnSure - Taking Back Sunday", search: "Taking Back Sunday MakeDamnSure", mood: "determined", description: "you've got this new head filled up with smoke" },
      { title: "Liar - Taking Back Sunday", search: "Taking Back Sunday Liar", mood: "betrayal", description: "it takes one to know one" },
      { title: "A Decade Under the Influence - Taking Back Sunday", search: "Taking Back Sunday A Decade Under the Influence", mood: "influence", description: "i've got a bad feeling about this" },
      { title: "You're So Last Summer - Taking Back Sunday", search: "Taking Back Sunday You're So Last Summer", mood: "summer", description: "if i'm just bad news" },
      { title: "Set Phasers to Stun - Taking Back Sunday", search: "Taking Back Sunday Set Phasers to Stun", mood: "stunning", description: "say yes say yes" },
      { title: "What's It Feel Like to Be a Ghost - Taking Back Sunday", search: "Taking Back Sunday What's It Feel Like to Be a Ghost", mood: "ghostly", description: "what's it feel like to be a ghost" },
      { title: "Spin - Taking Back Sunday", search: "Taking Back Sunday Spin", mood: "spinning", description: "that look was priceless" },
      { title: "Liar (It Takes One to Know One) - Taking Back Sunday", search: "Taking Back Sunday Liar It Takes One to Know One", mood: "liar", description: "is that what you call tact" },
      { title: "Understanding in a Car Crash - Thursday", search: "Thursday Understanding in a Car Crash", mood: "intense", description: "splintered piece of glass" },
      { title: "War All the Time - Thursday", search: "Thursday War All the Time", mood: "aggressive", description: "standing on the edge of the palisades" },
      { title: "Cross Out the Eyes - Thursday", search: "Thursday Cross Out the Eyes", mood: "crossing", description: "let's call this the quiet city" },
      { title: "Signals Over the Air - Thursday", search: "Thursday Signals Over the Air", mood: "signals", description: "this is what you see" },
      { title: "Division St. - Thursday", search: "Thursday Division St", mood: "division", description: "lights out on division street" },
      { title: "Autobiography of a Nation - Thursday", search: "Thursday Autobiography of a Nation", mood: "nation", description: "write these words back down" },
      { title: "Steps Ascending - Thursday", search: "Thursday Steps Ascending", mood: "ascending", description: "steps ascend to a loaded gun" },
      { title: "This Song Brought to You - Thursday", search: "Thursday This Song Brought to You by a Falling Bomb", mood: "bomb", description: "do you hear the jet plane" },
      { title: "Jet Black New Year - Thursday", search: "Thursday Jet Black New Year", mood: "new year", description: "jet black new year" },
      { title: "I Am the Killer - Thursday", search: "Thursday I Am the Killer", mood: "killer", description: "tuesday wakes up" },
      { title: "Smashed into Pieces - Silverstein", search: "Silverstein Smashed into Pieces", mood: "broken", description: "never again" },
      { title: "My Heroine - Silverstein", search: "Silverstein My Heroine", mood: "addictive", description: "the drugs begin to peak" },
      { title: "Smile in Your Sleep - Silverstein", search: "Silverstein Smile in Your Sleep", mood: "sleeping", description: "when i'm lying in your bed" },
      { title: "Discovering the Waterfront - Silverstein", search: "Silverstein Discovering the Waterfront", mood: "discovery", description: "i will promise myself" },
      { title: "Your Sword Versus My Dagger - Silverstein", search: "Silverstein Your Sword Versus My Dagger", mood: "battle", description: "i'm cutting through" },
      { title: "Giving Up - Silverstein", search: "Silverstein Giving Up", mood: "giving up", description: "i used to make you smile" },
      { title: "Call It Karma - Silverstein", search: "Silverstein Call It Karma", mood: "karma", description: "blame it on the weather" },
      { title: "The Ides of March - Silverstein", search: "Silverstein The Ides of March", mood: "march", description: "a hole in the roof" },
      { title: "If You Could See Into My Soul - Silverstein", search: "Silverstein If You Could See Into My Soul", mood: "soul", description: "if you could see into my soul" },
      { title: "Vices - Silverstein", search: "Silverstein Vices", mood: "vices", description: "i've been living in the shadows" },
      { title: "Until the Day I Die - Story of the Year", search: "Story of the Year Until the Day I Die", mood: "defiant", description: "until the day i die" },
      { title: "Anthem of Our Dying Day - Story of the Year", search: "Story of the Year Anthem of Our Dying Day", mood: "rebellious", description: "the stars will cry" },
      { title: "The Antidote - Story of the Year", search: "Story of the Year The Antidote", mood: "cure", description: "please just tell me everything" },
      { title: "In the Shadows - Story of the Year", search: "Story of the Year In the Shadows", mood: "shadows", description: "ready or not at all" },
      { title: "Dive Right In - Story of the Year", search: "Story of the Year Dive Right In", mood: "diving", description: "tonight i'm on display" },
      { title: "Sidewalks - Story of the Year", search: "Story of the Year Sidewalks", mood: "walking", description: "the bridge is all crumbled" },
      { title: "Page Avenue - Story of the Year", search: "Story of the Year Page Avenue", mood: "avenue", description: "tonight i've made my bed" },
      { title: "Swallow the Knife - Story of the Year", search: "Story of the Year Swallow the Knife", mood: "knife", description: "so take back the things" },
      { title: "Razorblades - Story of the Year", search: "Story of the Year Razorblades", mood: "razor", description: "walking on razorblades" },
      { title: "Falling Down - Story of the Year", search: "Story of the Year Falling Down", mood: "falling", description: "i'm falling down" },
      { title: "Cute When You Scream - Senses Fail", search: "Senses Fail Cute When You Scream", mood: "aggressive", description: "fuck with my heart" },
      { title: "Buried a Lie - Senses Fail", search: "Senses Fail Buried a Lie", mood: "guilt", description: "rest in peace girl" },
      { title: "Can't Be Saved - Senses Fail", search: "Senses Fail Can't Be Saved", mood: "hopeless", description: "follow your bliss" },
      { title: "Calling All Cars - Senses Fail", search: "Senses Fail Calling All Cars", mood: "emergency", description: "calling all cars" },
      { title: "The Priest and the Matador - Senses Fail", search: "Senses Fail The Priest and the Matador", mood: "epic", description: "here we are" },
      { title: "Bite to Break Skin - Senses Fail", search: "Senses Fail Bite to Break Skin", mood: "biting", description: "so i'm looking for a girl" },
      { title: "Rum Is for Drinking - Senses Fail", search: "Senses Fail Rum Is for Drinking Not for Burning", mood: "drinking", description: "this captain goes down" },
      { title: "Slow Dance - Senses Fail", search: "Senses Fail Slow Dance", mood: "dancing", description: "if you pull too hard" },
      { title: "Choke on This - Senses Fail", search: "Senses Fail Choke on This", mood: "choking", description: "this is the way i pray" },
      { title: "NJ Falls into the Atlantic - Senses Fail", search: "Senses Fail NJ Falls into the Atlantic", mood: "drowning", description: "never thought this day would end" },
      { title: "Reinventing Your Exit - Underoath", search: "Underoath Reinventing Your Exit", mood: "heavy", description: "let's redefine" },
      { title: "Writing on the Walls - Underoath", search: "Underoath Writing on the Walls", mood: "apocalyptic", description: "maybe you'll find out" },
      { title: "A Boy Brushed Red - Underoath", search: "Underoath A Boy Brushed Red Living in Black and White", mood: "colorful", description: "can you feel your heartbeat" },
      { title: "It's Dangerous Business - Underoath", search: "Underoath It's Dangerous Business Walking Out Your Front Door", mood: "dangerous", description: "drowning in my sleep" },
      { title: "When the Sun Sleeps - Underoath", search: "Underoath When the Sun Sleeps", mood: "sleeping", description: "i thought you'd come back" },
      { title: "Young and Aspiring - Underoath", search: "Underoath Young and Aspiring", mood: "aspiring", description: "so let's not even try" },
      { title: "Some Will Seek Forgiveness - Underoath", search: "Underoath Some Will Seek Forgiveness Others Escape", mood: "forgiveness", description: "hey unfaithful" },
      { title: "The Impact of Reason - Underoath", search: "Underoath The Impact of Reason", mood: "reason", description: "prop open the door" },
      { title: "In Regards to Myself - Underoath", search: "Underoath In Regards to Myself", mood: "introspection", description: "wake up wake up" },
      { title: "You're Ever So Inviting - Underoath", search: "Underoath You're Ever So Inviting", mood: "inviting", description: "the time has come for you" },
      { title: "Note to Self - From First to Last", search: "From First to Last Note to Self", mood: "reminder", description: "i never said this would be easy" },
      { title: "The One Armed Boxer - From First to Last", search: "From First to Last The One Armed Boxer vs The Flying Guillotine", mood: "fighting", description: "kill the lights" },
      { title: "Ride the Wings of Pestilence - From First to Last", search: "From First to Last Ride the Wings of Pestilence", mood: "pestilence", description: "hiding behind the shadows" },
      { title: "The Latest Plague - From First to Last", search: "From First to Last The Latest Plague", mood: "plague", description: "i've been dreaming" },
      { title: "Emily - From First to Last", search: "From First to Last Emily", mood: "emily", description: "smiles and her laughter" },
      { title: "Secrets Don't Make Friends - From First to Last", search: "From First to Last Secrets Don't Make Friends", mood: "secrets", description: "you should have been aborted" },
      { title: "Populace in Two - From First to Last", search: "From First to Last Populace in Two", mood: "divided", description: "your memories will always haunt me" },
      { title: "Kiss Me I'm Contagious - From First to Last", search: "From First to Last Kiss Me I'm Contagious", mood: "contagious", description: "don't speak my name" },
      { title: "Minuet - From First to Last", search: "From First to Last Minuet", mood: "dance", description: "so let's dance" },
      { title: "Failure's Not Flattering - From First to Last", search: "From First to Last Failure's Not Flattering", mood: "failure", description: "what do you see" },
      { title: "What It Is to Burn - Finch", search: "Finch What It Is to Burn", mood: "fiery", description: "she burns" },
      { title: "Letters to You - Finch", search: "Finch Letters to You", mood: "personal", description: "can't you see" },
      { title: "Post Script - Finch", search: "Finch Post Script", mood: "postscript", description: "i want to hate you" },
      { title: "Grey Matter - Finch", search: "Finch Grey Matter", mood: "grey", description: "bite your tongue" },
      { title: "Perfection Through Silence - Finch", search: "Finch Perfection Through Silence", mood: "silence", description: "lacerations from my razor" },
      { title: "Three Simple Words - Finch", search: "Finch Three Simple Words", mood: "simple", description: "eight months it's been over" },
      { title: "Ender - Finch", search: "Finch Ender", mood: "ending", description: "here i am beside myself" },
      { title: "Without You Here - Finch", search: "Finch Without You Here", mood: "without", description: "without you here" },
      { title: "Stay with Me - Finch", search: "Finch Stay with Me", mood: "staying", description: "stay with me" },
      { title: "Project Mayhem - Finch", search: "Finch Project Mayhem", mood: "mayhem", description: "she shouts" },
      { title: "Dream to Make Believe - Armor for Sleep", search: "Armor for Sleep Dream to Make Believe", mood: "dreamy", description: "it's funny how things work out" },
      { title: "Car Underwater - Armor for Sleep", search: "Armor for Sleep Car Underwater", mood: "suffocating", description: "believe the news" },
      { title: "The Truth About Heaven - Armor for Sleep", search: "Armor for Sleep The Truth About Heaven", mood: "heaven", description: "the truth about heaven" },
      { title: "Remember to Feel Real - Armor for Sleep", search: "Armor for Sleep Remember to Feel Real", mood: "real", description: "i'm sick and tired of this" },
      { title: "Awkward Last Words - Armor for Sleep", search: "Armor for Sleep Awkward Last Words", mood: "awkward", description: "last year tonight" },
      { title: "Stay on the Ground - Armor for Sleep", search: "Armor for Sleep Stay on the Ground", mood: "grounded", description: "i started looking out for myself today" },
      { title: "All Warm - Armor for Sleep", search: "Armor for Sleep All Warm", mood: "warm", description: "who would have thought" },
      { title: "Walking at Night Alone - Armor for Sleep", search: "Armor for Sleep Walking at Night Alone", mood: "walking", description: "feeling like i'm falling behind" },
      { title: "Being Your Walls - Armor for Sleep", search: "Armor for Sleep Being Your Walls", mood: "walls", description: "call your bluff" },
      { title: "The Way Out Is Broken - Armor for Sleep", search: "Armor for Sleep The Way Out Is Broken", mood: "broken", description: "the way out is broken" },
      { title: "The Artist in the Ambulance - Thrice", search: "Thrice The Artist in the Ambulance", mood: "urgent", description: "late night double feature" },
      { title: "Stare at the Sun - Thrice", search: "Thrice Stare at the Sun", mood: "blinding", description: "i sit here clutching useless lists" },
      { title: "Paper Tigers - Thrice", search: "Thrice Paper Tigers", mood: "philosophical", description: "paper tigers" },
      { title: "Deadbolt - Thrice", search: "Thrice Deadbolt", mood: "locked", description: "when deadbolts awake" },
      { title: "All That's Left - Thrice", search: "Thrice All That's Left", mood: "left", description: "one day the dreamers died" },
      { title: "Silhouette - Thrice", search: "Thrice Silhouette", mood: "shadow", description: "we're losing daylight" },
      { title: "Blood Clots and Black Holes - Thrice", search: "Thrice Blood Clots and Black Holes", mood: "cosmic", description: "here's your new drug" },
      { title: "Under a Killing Moon - Thrice", search: "Thrice Under a Killing Moon", mood: "moon", description: "the air burns" },
      { title: "Cold Cash and Colder Hearts - Thrice", search: "Thrice Cold Cash and Colder Hearts", mood: "cold", description: "they are sick" },
      { title: "The Abolition of Man - Thrice", search: "Thrice The Abolition of Man", mood: "abolition", description: "wake up everyone" },
      { title: "The Moon Is Down - Further Seems Forever", search: "Further Seems Forever The Moon Is Down", mood: "moon", description: "the moon is down" },
      { title: "New Year's Project - Further Seems Forever", search: "Further Seems Forever New Year's Project", mood: "new year", description: "i'm the reason you're leaving" },
      { title: "Snowbirds and Townies - Further Seems Forever", search: "Further Seems Forever Snowbirds and Townies", mood: "snowbirds", description: "fountains and fluorescent lights" },
      { title: "Insincerity as an Artform - Further Seems Forever", search: "Further Seems Forever Insincerity as an Artform", mood: "insincere", description: "it's not the end of the world" },
      { title: "The Bradley - Further Seems Forever", search: "Further Seems Forever The Bradley", mood: "bradley", description: "false pretense" },
      { title: "Wearing Thin - Further Seems Forever", search: "Further Seems Forever Wearing Thin", mood: "thin", description: "since you've been gone" },
      { title: "Pride War - Further Seems Forever", search: "Further Seems Forever Pride War", mood: "pride", description: "you'd trade our starlight" },
      { title: "Light Up Ahead - Further Seems Forever", search: "Further Seems Forever Light Up Ahead", mood: "light", description: "take this heart" },
      { title: "Pictures of Shorelines - Further Seems Forever", search: "Further Seems Forever Pictures of Shorelines", mood: "shorelines", description: "if you insist" },
      { title: "A New Desert Life - Further Seems Forever", search: "Further Seems Forever A New Desert Life", mood: "desert", description: "this is where the water becomes shallow" },
      { title: "Our Lawyer Made Us Change the Name - Fall Out Boy", search: "Fall Out Boy Our Lawyer Made Us Change the Name of This Song", mood: "legal", description: "so we wouldn't get sued" },
      { title: "Nobody Puts Baby in the Corner - Fall Out Boy", search: "Fall Out Boy Nobody Puts Baby in the Corner", mood: "defiant", description: "i keep my jealousy close" },
      { title: "The Take Over the Breaks Over - Fall Out Boy", search: "Fall Out Boy The Take Over the Breaks Over", mood: "takeover", description: "baby seasons change but people don't" },
      { title: "Don't You Know - Fall Out Boy", search: "Fall Out Boy Don't You Know Who I Think I Am", mood: "identity", description: "they say quitters never win" },
      { title: "I Constantly Thank God - Panic! At The Disco", search: "Panic At The Disco I Constantly Thank God for Esteban", mood: "thankful", description: "give us this day our daily dose of faux affliction" },
      { title: "For a Pessimist I'm Pretty Optimistic - Paramore", search: "Paramore For a Pessimist I'm Pretty Optimistic", mood: "optimistic", description: "just talk yourself up and tear yourself down" },
      { title: "Sic Transit Gloria - Brand New", search: "Brand New Sic Transit Gloria", mood: "intense", description: "die young and save yourself" },
      { title: "The Quiet Things - Brand New", search: "Brand New The Quiet Things That No One Ever Knows", mood: "haunting", description: "we saw the western coast" },
      { title: "Jesus Christ - Brand New", search: "Brand New Jesus Christ", mood: "spiritual", description: "jesse lacey's confession" },
      { title: "Degausser - Brand New", search: "Brand New Degausser", mood: "aggressive", description: "goodbye to sleep" },
      { title: "Taste of Ink - The Used", search: "The Used Taste of Ink", mood: "angsty", description: "is it worth it can you even hear me" },
      { title: "Miss Murder - AFI", search: "AFI Miss Murder", mood: "dark", description: "davey havok's gothic perfection" },
      { title: "Love Like Winter - AFI", search: "AFI Love Like Winter", mood: "cold", description: "december underground vibes" },
      { title: "Girl's Not Grey - AFI", search: "AFI Girl's Not Grey", mood: "melancholy", description: "sing the sorrow classic" },
      { title: "Silver and Cold - AFI", search: "AFI Silver and Cold", mood: "haunting", description: "I came here by day but i left here in darkness" },
      { title: "Cosmopolitan Bloodloss - Glassjaw", search: "Glassjaw Cosmopolitan Bloodloss", mood: "chaotic", description: "daryl palumbo's intensity" },
      { title: "Your Guardian Angel - Red Jumpsuit Apparatus", search: "Red Jumpsuit Apparatus Your Guardian Angel", mood: "protective", description: "acoustic emo ballad perfection" },
      { title: "Ocean Avenue - Yellowcard", search: "Yellowcard Ocean Avenue", mood: "nostalgic", description: "violin in emo perfection" },
      { title: "Only One - Yellowcard", search: "Yellowcard Only One", mood: "emotional", description: "broken this fragile thing now" },
      { title: "Way Away - Yellowcard", search: "Yellowcard Way Away", mood: "energetic", description: "early 2000s nostalgia" },
      { title: "The Middle - Jimmy Eat World", search: "Jimmy Eat World The Middle", mood: "uplifting", description: "it just takes some time" },
      { title: "Sweetness - Jimmy Eat World", search: "Jimmy Eat World Sweetness", mood: "nostalgic", description: "bleed american era gold" },
      { title: "Pain - Jimmy Eat World", search: "Jimmy Eat World Pain", mood: "emotional", description: "i don't feel the way i've ever felt" },
      { title: "Holiday - Get Up Kids", search: "Get Up Kids Holiday", mood: "melancholy", description: "midwest emo perfection" },
      { title: "Action & Action - Get Up Kids", search: "Get Up Kids Action and Action", mood: "energetic", description: "something to write home about" },
      { title: "Stop Playing Guitar - Promise Ring", search: "Promise Ring Stop Playing Guitar", mood: "meta", description: "30 degrees everywhere" },
      { title: "At Your Funeral - Saves the Day", search: "Saves the Day At Your Funeral", mood: "morbid", description: "chris conley's darkness" },
      { title: "Freakish - Saves the Day", search: "Saves the Day Freakish", mood: "anxious", description: "through being cool era" },
      { title: "Stupid Kid - Alkaline Trio", search: "Alkaline Trio Stupid Kid", mood: "self-deprecating", description: "matt skiba's honesty" },
      { title: "Radio - Alkaline Trio", search: "Alkaline Trio Radio", mood: "dark", description: "shaking like a dog shitting razorblades" },
      { title: "Time to Waste - Alkaline Trio", search: "Alkaline Trio Time to Waste", mood: "nihilistic", description: "what good is love and peace on earth" },
      { title: "Never Meant - American Football", search: "American Football Never Meant", mood: "wistful", description: "the emo revival starter pack" },
      { title: "The Summer Ends - American Football", search: "American Football The Summer Ends", mood: "seasonal", description: "math rock emo perfection" },
      { title: "Washington Square Park - The Wonder Years", search: "Wonder Years Washington Square Park", mood: "nostalgic", description: "pop punk emo crossover" },
      { title: "Seventy Times 7 - Brand New", search: "Brand New Seventy Times 7", mood: "vengeful", description: "is that what you call a getaway" },
      { title: "Jude Law and a Semester Abroad - Brand New", search: "Brand New Jude Law and a Semester Abroad", mood: "bitter", description: "your favorite weapon era" },
      { title: "Okay I Believe You - Brand New", search: "Brand New Okay I Believe You But My Tommy Gun Don't", mood: "aggressive", description: "deja entendu perfection" },
      { title: "Short Stories - From Autumn to Ashes", search: "From Autumn to Ashes Short Stories", mood: "narrative", description: "dual vocals perfection" },
      { title: "Walls - Emery", search: "Emery Walls", mood: "emotional", description: "the weak's end era beauty" },
      { title: "This Could Be Anywhere - Alexisonfire", search: "Alexisonfire This Could Be Anywhere in the World", mood: "chaotic", description: "canadian post-hardcore" },
      { title: "Devotion and Desire - Bayside", search: "Bayside Devotion and Desire", mood: "passionate", description: "anthony raneri's honesty" },
      { title: "Masterpiece - Bayside", search: "Bayside Masterpiece", mood: "artistic", description: "the walking wounded" },
      { title: "A Favor House Atlantic - Coheed and Cambria", search: "Coheed and Cambria A Favor House Atlantic", mood: "epic", description: "claudio sanchez's concept genius" },
      { title: "Welcome Home - Coheed and Cambria", search: "Coheed and Cambria Welcome Home", mood: "dramatic", description: "one among the fence" },
      { title: "Blood Red Summer - Coheed and Cambria", search: "Coheed and Cambria Blood Red Summer", mood: "intense", description: "in keeping secrets of silent earth 3" },
      { title: "Anatomy of a Ghost - Anatomy of a Ghost", search: "Anatomy of a Ghost Armor for the Broken", mood: "ethereal", description: "sadly forgotten emo gem" },
      { title: "Artist in the Ambulance - Thrice", search: "Thrice Artist in the Ambulance", mood: "urgent", description: "late night double feature" },
      { title: "I Don't Care - Fall Out Boy", search: "Fall Out Boy I Don't Care", mood: "defiant", description: "calculated indifference processed through sophisticated emotional algorithms" },
      { title: "Bohemian Rhapsody - Panic! At The Disco", search: "Panic At The Disco Bohemian Rhapsody", mood: "epic", description: "calculated cover analysis demonstrating superior vocal sophistication" }
    ],
    sceneQueenFavorites: [
      { title: "Knives and Pens - Black Veil Brides", search: "Black Veil Brides Knives and Pens", mood: "dark", description: "andy biersack is goals 🖤" },
      { title: "Perfect Weapon - Black Veil Brides", search: "Black Veil Brides Perfect Weapon", mood: "aggressive", description: "set the world on fire era" },
      { title: "In the End - Black Veil Brides", search: "Black Veil Brides In the End", mood: "defiant", description: "we stitch these wounds" },
      { title: "Fallen Angels - Black Veil Brides", search: "Black Veil Brides Fallen Angels", mood: "rebellious", description: "wretched and divine perfection" },
      { title: "Legacy - Black Veil Brides", search: "Black Veil Brides Legacy", mood: "epic", description: "leave behind a legacy" },
      { title: "Rebel Love Song - Black Veil Brides", search: "Black Veil Brides Rebel Love Song", mood: "romantic", description: "i cannot hide what's on my mind" },
      { title: "The Mortician's Daughter - Black Veil Brides", search: "Black Veil Brides The Mortician's Daughter", mood: "emotional", description: "andy's acoustic perfection" },
      { title: "Coffin - Black Veil Brides", search: "Black Veil Brides Coffin", mood: "coffin", description: "take your crosses" },
      { title: "Sweet Blasphemy - Black Veil Brides", search: "Black Veil Brides Sweet Blasphemy", mood: "blasphemy", description: "through sadness you have taught us" },
      { title: "Saviour - Black Veil Brides", search: "Black Veil Brides Saviour", mood: "saviour", description: "i never meant to be the one" },
      { title: "Youth and Whisky - Black Veil Brides", search: "Black Veil Brides Youth and Whisky", mood: "youth", description: "youth and whisky" },
      { title: "Set the World on Fire - Black Veil Brides", search: "Black Veil Brides Set the World on Fire", mood: "fire", description: "saints born together to fight" },
      { title: "New Religion - Black Veil Brides", search: "Black Veil Brides New Religion", mood: "religion", description: "someone save me" },
      { title: "Ritual - Black Veil Brides", search: "Black Veil Brides Ritual", mood: "ritual", description: "our evil dreams are vacant" },
      { title: "Devil's Choir - Black Veil Brides", search: "Black Veil Brides Devil's Choir", mood: "devil", description: "you've been caught in the devil's choir" },
      { title: "Resurrect the Sun - Black Veil Brides", search: "Black Veil Brides Resurrect the Sun", mood: "resurrection", description: "here we are" },
      { title: "Goodbye Agony - Black Veil Brides", search: "Black Veil Brides Goodbye Agony", mood: "goodbye", description: "goodbye agony" },
      { title: "World of Sacrifice - Black Veil Brides", search: "Black Veil Brides World of Sacrifice", mood: "sacrifice", description: "walls are closing in" },
      { title: "Last Rites - Black Veil Brides", search: "Black Veil Brides Last Rites", mood: "rites", description: "waiting for the bitter end" },
      { title: "Stolen Omen - Black Veil Brides", search: "Black Veil Brides Stolen Omen", mood: "omen", description: "in the end" },
      { title: "Lost It All - Black Veil Brides", search: "Black Veil Brides Lost It All", mood: "loss", description: "i ruled the world" },
      { title: "Crown of Thorns - Black Veil Brides", search: "Black Veil Brides Crown of Thorns", mood: "thorns", description: "run away from the crown" },
      { title: "Faithless - Black Veil Brides", search: "Black Veil Brides Faithless", mood: "faithless", description: "even when i'm falling" },
      { title: "Devil in the Mirror - Black Veil Brides", search: "Black Veil Brides Devil in the Mirror", mood: "mirror", description: "fear the fire" },
      { title: "Drag Me to the Grave - Black Veil Brides", search: "Black Veil Brides Drag Me to the Grave", mood: "grave", description: "drag me to the grave" },
      { title: "The Shattered God - Black Veil Brides", search: "Black Veil Brides The Shattered God", mood: "god", description: "shattered divine presence" },
      { title: "Shadows Die - Black Veil Brides", search: "Black Veil Brides Shadows Die", mood: "shadows", description: "when shadows die we live forever" },
      { title: "Vale - Black Veil Brides", search: "Black Veil Brides Vale", mood: "vale", description: "farewell to the vale" },
      { title: "When They Call My Name - Black Veil Brides", search: "Black Veil Brides When They Call My Name", mood: "calling", description: "answering the call of destiny" },
      { title: "Torch - Black Veil Brides", search: "Black Veil Brides Torch", mood: "torch", description: "carry the torch forward" },
      { title: "Our Destiny - Black Veil Brides", search: "Black Veil Brides Our Destiny", mood: "destiny", description: "this is our destiny" },
      { title: "The King - Black Veil Brides", search: "Black Veil Brides The King", mood: "royal", description: "long live the king" },
      { title: "Blood, Tears, Dust - Black Veil Brides", search: "Black Veil Brides Blood Tears Dust", mood: "dust", description: "blood tears and dust" },
      { title: "King for a Day - Pierce the Veil", search: "Pierce the Veil King for a Day", mood: "royal", description: "vic fuentes hits different ❤️" },
      { title: "Caraphernelia - Pierce the Veil", search: "Pierce the Veil Caraphernelia", mood: "nostalgic", description: "jeremy mckinnon collab perfection" },
      { title: "Bulls in the Bronx - Pierce the Veil", search: "Pierce the Veil Bulls in the Bronx", mood: "energetic", description: "pierce the veil energy unmatched" },
      { title: "Hold On Till May - Pierce the Veil", search: "Pierce the Veil Hold On Till May", mood: "hopeful", description: "lindsey stamey vocals beautiful" },
      { title: "The Divine Zero - Pierce the Veil", search: "Pierce the Veil The Divine Zero", mood: "divine", description: "misadventures era perfection" },
      { title: "Circles - Pierce the Veil", search: "Pierce the Veil Circles", mood: "circular", description: "going in circles with you" },
      { title: "A Match into Water - Pierce the Veil", search: "Pierce the Veil A Match into Water", mood: "drowning", description: "selfish machines classic" },
      { title: "Besitos - Pierce the Veil", search: "Pierce the Veil Besitos", mood: "romantic", description: "spanish pierce the veil beauty" },
      { title: "Bulletproof Love - Pierce the Veil", search: "Pierce the Veil Bulletproof Love", mood: "love", description: "bulletproof love ballad" },
      { title: "Stay Away from My Friends - Pierce the Veil", search: "Pierce the Veil Stay Away from My Friends", mood: "protective", description: "stay away from my friends" },
      { title: "I'm Low on Gas and You Need a Jacket - Pierce the Veil", search: "Pierce the Veil I'm Low on Gas and You Need a Jacket", mood: "caring", description: "longest title cutest meaning" },
      { title: "The Boy Who Could Fly - Pierce the Veil", search: "Pierce the Veil The Boy Who Could Fly", mood: "flying", description: "soaring pierce the veil vocals" },
      { title: "Props & Mayhem - Pierce the Veil", search: "Pierce the Veil Props and Mayhem", mood: "mayhem", description: "early pierce the veil chaos" },
      { title: "Chemical Kids and Mechanical Brides - Pierce the Veil", search: "Pierce the Veil Chemical Kids and Mechanical Brides", mood: "chemical", description: "chemical romance pierce style" },
      { title: "Postcards from Chicago - Pierce the Veil", search: "Pierce the Veil Postcards from Chicago", mood: "postcard", description: "chicago memories pierce style" },
      { title: "The New National Anthem - Pierce the Veil", search: "Pierce the Veil The New National Anthem", mood: "anthem", description: "new national anthem rebellion" },
      { title: "Yeah Boy and Doll Face - Pierce the Veil", search: "Pierce the Veil Yeah Boy and Doll Face", mood: "doll", description: "yeah boy and doll face" },
      { title: "She Sings in the Morning - Pierce the Veil", search: "Pierce the Veil She Sings in the Morning", mood: "morning", description: "morning serenade pierce style" },
      { title: "The Cheap Bouquet - Pierce the Veil", search: "Pierce the Veil The Cheap Bouquet", mood: "bouquet", description: "cheap bouquet romance" },
      { title: "Disasterology - Pierce the Veil", search: "Pierce the Veil Disasterology", mood: "disaster", description: "disasterology study of disasters" },
      { title: "Southern Constellations - Pierce the Veil", search: "Pierce the Veil Southern Constellations", mood: "stars", description: "southern constellations guide" },
      { title: "The Sky Under the Sea - Pierce the Veil", search: "Pierce the Veil The Sky Under the Sea", mood: "underwater", description: "sky under the sea paradox" },
      { title: "One Hundred Sleepless Nights - Pierce the Veil", search: "Pierce the Veil One Hundred Sleepless Nights", mood: "sleepless", description: "one hundred sleepless nights" },
      { title: "Hell Above - Pierce the Veil", search: "Pierce the Veil Hell Above", mood: "hell", description: "hell above heaven below" },
      { title: "Tangled in the Great Escape - Pierce the Veil", search: "Pierce the Veil Tangled in the Great Escape", mood: "tangled", description: "tangled in escape plans" },
      { title: "I Don't Care If You're Contagious - Pierce the Veil", search: "Pierce the Veil I Don't Care If You're Contagious", mood: "contagious", description: "love is contagious pierce style" },
      { title: "Fast Times at Clairemont High - Pierce the Veil", search: "Pierce the Veil Fast Times at Clairemont High", mood: "school", description: "high school pierce the veil" },
      { title: "Texas Is Forever - Pierce the Veil", search: "Pierce the Veil Texas Is Forever", mood: "texas", description: "texas is forever home" },
      { title: "Floral & Fading - Pierce the Veil", search: "Pierce the Veil Floral and Fading", mood: "floral", description: "floral and fading beauty" },
      { title: "Phantom Power and Ludicrous Speed - Pierce the Veil", search: "Pierce the Veil Phantom Power and Ludicrous Speed", mood: "phantom", description: "phantom power ludicrous speed" },
      { title: "Song for Isabelle - Pierce the Veil", search: "Pierce the Veil Song for Isabelle", mood: "isabelle", description: "dedicated to isabelle" },
      { title: "Dive In - Pierce the Veil", search: "Pierce the Veil Dive In", mood: "diving", description: "dive in pierce the veil" },
      { title: "Today I Saw the Whole World - Pierce the Veil", search: "Pierce the Veil Today I Saw the Whole World", mood: "world", description: "seeing the whole world" },
      { title: "Sambuka - Pierce the Veil", search: "Pierce the Veil Sambuka", mood: "sambuka", description: "sambuka pierce the veil energy" },
      { title: "Pass the Nirvana - Pierce the Veil", search: "Pierce the Veil Pass the Nirvana", mood: "nirvana", description: "pass the nirvana peace" },
      { title: "Emergency Contact - Pierce the Veil", search: "Pierce the Veil Emergency Contact", mood: "emergency", description: "you're my emergency contact" },
      { title: "So Far So Fake - Pierce the Veil", search: "Pierce the Veil So Far So Fake", mood: "fake", description: "so far so fake pierce honesty" },
      { title: "Situations - Escape the Fate", search: "Escape the Fate Situations", mood: "chaotic", description: "ronnie radke era classic" },
      { title: "Not Good Enough for Truth - Escape the Fate", search: "Escape the Fate Not Good Enough for Truth in Cliche", mood: "raw", description: "dying is your latest fashion" },
      { title: "The Flood - Escape the Fate", search: "Escape the Fate The Flood", mood: "flooding", description: "craig mabbitt era begins" },
      { title: "Hard to Love - Escape the Fate", search: "Escape the Fate Hard to Love", mood: "difficult", description: "hard to love escape the fate" },
      { title: "Picture Perfect - Escape the Fate", search: "Escape the Fate Picture Perfect", mood: "perfect", description: "picture perfect moments" },
      { title: "Issues - Escape the Fate", search: "Escape the Fate Issues", mood: "troubled", description: "we all have issues" },
      { title: "Something - Escape the Fate", search: "Escape the Fate Something", mood: "something", description: "something escape the fate" },
      { title: "As You're Falling Down - Escape the Fate", search: "Escape the Fate As You're Falling Down", mood: "falling", description: "as you're falling down" },
      { title: "The Day I Left the Womb - Escape the Fate", search: "Escape the Fate The Day I Left the Womb", mood: "birth", description: "day i left the womb" },
      { title: "Reverse This Curse - Escape the Fate", search: "Escape the Fate Reverse This Curse", mood: "cursed", description: "reverse this curse please" },
      { title: "Friends and Alibis - Escape the Fate", search: "Escape the Fate Friends and Alibis", mood: "friends", description: "friends and alibis escape" },
      { title: "When I Go Out - Escape the Fate", search: "Escape the Fate When I Go Out", mood: "going out", description: "when i go out tonight" },
      { title: "Live Fast Die Beautiful - Escape the Fate", search: "Escape the Fate Live Fast Die Beautiful", mood: "beautiful", description: "live fast die beautiful" },
      { title: "World Around Me - Escape the Fate", search: "Escape the Fate World Around Me", mood: "world", description: "world around me escape" },
      { title: "Popular Monster - Falling in Reverse", search: "Falling in Reverse Popular Monster", mood: "monster", description: "ronnie's redemption arc" },
      { title: "The Drug in Me Is You - Falling in Reverse", search: "Falling in Reverse The Drug in Me Is You", mood: "addictive", description: "the drug in me is reimagined" },
      { title: "I'm Not a Vampire - Falling in Reverse", search: "Falling in Reverse I'm Not a Vampire", mood: "vampire", description: "i'm not a vampire honest" },
      { title: "Raised by Wolves - Falling in Reverse", search: "Falling in Reverse Raised by Wolves", mood: "wolves", description: "raised by wolves wild" },
      { title: "Losing My Mind - Falling in Reverse", search: "Falling in Reverse Losing My Mind", mood: "losing", description: "losing my mind falling" },
      { title: "Chemical Prisoner - Falling in Reverse", search: "Falling in Reverse Chemical Prisoner", mood: "prisoner", description: "chemical prisoner addiction" },
      { title: "Losing My Life - Falling in Reverse", search: "Falling in Reverse Losing My Life", mood: "life", description: "losing my life falling" },
      { title: "Broken - Falling in Reverse", search: "Falling in Reverse Broken", mood: "broken", description: "broken falling in reverse" },
      { title: "Coming Home - Falling in Reverse", search: "Falling in Reverse Coming Home", mood: "home", description: "coming home falling reverse" },
      { title: "Zombified - Falling in Reverse", search: "Falling in Reverse Zombified", mood: "zombie", description: "zombified falling in reverse" },
      { title: "Voices in My Head - Falling in Reverse", search: "Falling in Reverse Voices in My Head", mood: "voices", description: "voices in my head falling" },
      { title: "Watch the World Burn - Falling in Reverse", search: "Falling in Reverse Watch the World Burn", mood: "burning", description: "watch the world burn down" },
      { title: "Final Episode - Asking Alexandria", search: "Asking Alexandria Final Episode", mood: "breakdown", description: "danny worsnop's screams" },
      { title: "A Prophecy - Asking Alexandria", search: "Asking Alexandria A Prophecy", mood: "prophetic", description: "stand up and scream era" },
      { title: "Not the American Average - Asking Alexandria", search: "Asking Alexandria Not the American Average", mood: "rebellious", description: "reckless and relentless" },
      { title: "Closure - Asking Alexandria", search: "Asking Alexandria Closure", mood: "closure", description: "seeking closure asking alexandria" },
      { title: "Alerion - Asking Alexandria", search: "Asking Alexandria Alerion", mood: "alerion", description: "alerion instrumental beauty" },
      { title: "Dear Insanity - Asking Alexandria", search: "Asking Alexandria Dear Insanity", mood: "insane", description: "dear insanity friend" },
      { title: "If You Can't Ride Two Horses - Asking Alexandria", search: "Asking Alexandria If You Can't Ride Two Horses", mood: "circus", description: "circus asking alexandria style" },
      { title: "Reckless and Relentless - Asking Alexandria", search: "Asking Alexandria Reckless and Relentless", mood: "reckless", description: "reckless and relentless energy" },
      { title: "To the Stage - Asking Alexandria", search: "Asking Alexandria To the Stage", mood: "stage", description: "to the stage asking alexandria" },
      { title: "Dedication - Asking Alexandria", search: "Asking Alexandria Dedication", mood: "dedicated", description: "dedication asking alexandria" },
      { title: "Someone Somewhere - Asking Alexandria", search: "Asking Alexandria Someone Somewhere", mood: "somewhere", description: "someone somewhere asking" },
      { title: "Breathless - Asking Alexandria", search: "Asking Alexandria Breathless", mood: "breathless", description: "breathless asking alexandria" },
      { title: "A Lesson Never Learned - Asking Alexandria", search: "Asking Alexandria A Lesson Never Learned", mood: "lesson", description: "lesson never learned asking" },
      { title: "Moving On - Asking Alexandria", search: "Asking Alexandria Moving On", mood: "moving", description: "moving on asking alexandria" },
      { title: "Run Free - Asking Alexandria", search: "Asking Alexandria Run Free", mood: "free", description: "run free asking alexandria" },
      { title: "The Black - Asking Alexandria", search: "Asking Alexandria The Black", mood: "black", description: "the black asking alexandria" },
      { title: "I Won't Give In - Asking Alexandria", search: "Asking Alexandria I Won't Give In", mood: "defiant", description: "i won't give in asking" },
      { title: "Sometimes It Ends - Asking Alexandria", search: "Asking Alexandria Sometimes It Ends", mood: "ending", description: "sometimes it ends asking" },
      { title: "Here I Am - Asking Alexandria", search: "Asking Alexandria Here I Am", mood: "present", description: "here i am asking alexandria" },
      { title: "Alone in a Room - Asking Alexandria", search: "Asking Alexandria Alone in a Room", mood: "alone", description: "alone in a room asking" },
      { title: "Into the Fire - Asking Alexandria", search: "Asking Alexandria Into the Fire", mood: "fire", description: "into the fire asking alexandria" },
      { title: "Hopelessly Hopeful - Asking Alexandria", search: "Asking Alexandria Hopelessly Hopeful", mood: "hopeful", description: "hopelessly hopeful asking" },
      { title: "Where Did It Go - Asking Alexandria", search: "Asking Alexandria Where Did It Go", mood: "lost", description: "where did it go asking" },
      { title: "Empire - Asking Alexandria", search: "Asking Alexandria Empire", mood: "empire", description: "empire asking alexandria" },
      { title: "Room 138 - Asking Alexandria", search: "Asking Alexandria Room 138", mood: "room", description: "room 138 asking alexandria" },
      { title: "Anti-Socialists - Asking Alexandria", search: "Asking Alexandria Anti-Socialists", mood: "anti", description: "anti-socialists asking alexandria" },
      { title: "They Don't Want What We Want - Asking Alexandria", search: "Asking Alexandria They Don't Want What We Want", mood: "want", description: "they don't want asking" },
      { title: "Bless the Fall - Hey Baby Here's That Song", search: "Bless the Fall Hey Baby Here's That Song You Wanted", mood: "sarcastic", description: "craig mabbitt before escape the fate" },
      { title: "A Day to Remember - Downfall of Us All", search: "A Day to Remember Downfall of Us All", mood: "energetic", description: "jeremy mckinnon's range" },
      { title: "We Came as Romans - To Plant a Seed", search: "We Came as Romans To Plant a Seed", mood: "hopeful", description: "dual vocals perfection" },
      { title: "Attack Attack! - Stick Stickly", search: "Attack Attack Stick Stickly", mood: "crabcore", description: "crabcore pioneers lol" },
      { title: "Of Mice & Men - Second & Sebring", search: "Of Mice and Men Second and Sebring", mood: "heavy", description: "austin carlile's passion" },
      { title: "The Word Alive - 2012", search: "The Word Alive 2012", mood: "apocalyptic", description: "telle smith's vocals" },
      { title: "Bring Me The Horizon - Chelsea Smile", search: "Bring Me The Horizon Chelsea Smile", mood: "brutal", description: "count your blessings era" },
      { title: "Bring Me The Horizon - Pray for Plagues", search: "Bring Me The Horizon Pray for Plagues", mood: "heavy", description: "oli sykes' evolution" },
      { title: "Bring Me The Horizon - Sleepwalking", search: "Bring Me The Horizon Sleepwalking", mood: "dark", description: "bmth evolution is beautiful" },
      { title: "Memphis May Fire - Miles Away", search: "Memphis May Fire Miles Away", mood: "distance", description: "matty mullins cleans" },
      { title: "The Amity Affliction - Pittsburgh", search: "The Amity Affliction Pittsburgh", mood: "depressive", description: "joel birch's pain" },
      { title: "Parkway Drive - Carrion", search: "Parkway Drive Carrion", mood: "crushing", description: "australian metalcore" },
      { title: "Whitechapel - This Is Exile", search: "Whitechapel This Is Exile", mood: "exile", description: "phil bozeman's lows" },
      { title: "Suicide Silence - Unanswered", search: "Suicide Silence Unanswered", mood: "questioning", description: "mitch lucker tribute" },
      { title: "The Devil Wears Prada - Hey John What's Your Name Again", search: "The Devil Wears Prada Hey John What's Your Name Again", mood: "aggressive", description: "mike hranica's screams" },
      { title: "Immaculate Misconception - Motionless in White", search: "Motionless in White Immaculate Misconception", mood: "gothic", description: "chris motionless vibes 🖤" },
      { title: "Abigail - Motionless in White", search: "Motionless in White Abigail", mood: "haunting", description: "creatures era perfection" },
      { title: "Ghost in the Mirror - Motionless in White", search: "Motionless in White Ghost in the Mirror", mood: "reflective", description: "industrial horror punk" },
      { title: "Disguise - Motionless in White", search: "Motionless in White Disguise", mood: "disguised", description: "disguise album title track" },
      { title: "Brand New Numb - Motionless in White", search: "Motionless in White Brand New Numb", mood: "numb", description: "brand new numb feeling" },
      { title: "Eternally Yours - Motionless in White", search: "Motionless in White Eternally Yours", mood: "eternal", description: "eternally yours motionless" },
      { title: "Another Life - Motionless in White", search: "Motionless in White Another Life", mood: "life", description: "another life motionless" },
      { title: "Legacy - Motionless in White", search: "Motionless in White Legacy", mood: "legacy", description: "legacy motionless in white" },
      { title: "Undead Ahead 2 - Motionless in White", search: "Motionless in White Undead Ahead 2", mood: "undead", description: "undead ahead sequel" },
      { title: "Loud - Motionless in White", search: "Motionless in White Loud", mood: "loud", description: "loud motionless in white" },
      { title: "Voices - Motionless in White", search: "Motionless in White Voices", mood: "voices", description: "voices motionless in white" },
      { title: "Devil's Night - Motionless in White", search: "Motionless in White Devil's Night", mood: "devil", description: "devil's night motionless" },
      { title: "Rats - Motionless in White", search: "Motionless in White Rats", mood: "rats", description: "rats motionless in white" },
      { title: "Queen for Queen - Motionless in White", search: "Motionless in White Queen for Queen", mood: "queen", description: "queen for queen motionless" },
      { title: "Necessary Evil - Motionless in White", search: "Motionless in White Necessary Evil", mood: "evil", description: "necessary evil motionless" },
      { title: "Soft - Motionless in White", search: "Motionless in White Soft", mood: "soft", description: "soft motionless in white" },
      { title: "Death March - Motionless in White", search: "Motionless in White Death March", mood: "march", description: "death march motionless" },
      { title: "570 - Motionless in White", search: "Motionless in White 570", mood: "570", description: "570 motionless in white" },
      { title: "Contemptress - Motionless in White", search: "Motionless in White Contemptress", mood: "contempt", description: "contemptress motionless" },
      { title: "Break the Cycle - Motionless in White", search: "Motionless in White Break the Cycle", mood: "cycle", description: "break the cycle motionless" },
      { title: "Scoring the End of the World - Motionless in White", search: "Motionless in White Scoring the End of the World", mood: "apocalyptic", description: "scoring the end motionless" },
      { title: "Sign of Life - Motionless in White", search: "Motionless in White Sign of Life", mood: "life", description: "sign of life motionless" },
      { title: "Werewolf - Motionless in White", search: "Motionless in White Werewolf", mood: "werewolf", description: "werewolf motionless in white" },
      { title: "Porcelain - Motionless in White", search: "Motionless in White Porcelain", mood: "porcelain", description: "porcelain motionless in white" },
      { title: "Cause of Death - Motionless in White", search: "Motionless in White Cause of Death", mood: "death", description: "cause of death motionless" },
      { title: "Red White & Boom - Motionless in White", search: "Motionless in White Red White Boom", mood: "boom", description: "red white boom motionless" },
      { title: "Slaughterhouse - Motionless in White", search: "Motionless in White Slaughterhouse", mood: "slaughter", description: "slaughterhouse motionless" },
      { title: "Masterpiece - Motionless in White", search: "Motionless in White Masterpiece", mood: "masterpiece", description: "masterpiece motionless" },
      { title: "Meltdown - Motionless in White", search: "Motionless in White Meltdown", mood: "meltdown", description: "meltdown motionless in white" },
      { title: "Burned at Both Ends II - Motionless in White", search: "Motionless in White Burned at Both Ends II", mood: "burned", description: "burned both ends sequel" },
      { title: "The Fastest Way to a Girl's Heart - Ice Nine Kills", search: "Ice Nine Kills The Fastest Way to a Girl's Heart is Through Her Ribcage", mood: "violent", description: "horror punk perfection" },
      { title: "Me Myself & Hyde - Ice Nine Kills", search: "Ice Nine Kills Me Myself and Hyde", mood: "split", description: "spencer charnas storytelling" },
      { title: "A Grave Mistake - Ice Nine Kills", search: "Ice Nine Kills A Grave Mistake", mood: "grave", description: "grave mistake horror" },
      { title: "Hell in the Hallways - Ice Nine Kills", search: "Ice Nine Kills Hell in the Hallways", mood: "school", description: "school horror ice nine" },
      { title: "The American Nightmare - Ice Nine Kills", search: "Ice Nine Kills The American Nightmare", mood: "nightmare", description: "american nightmare horror" },
      { title: "Thank God It's Friday - Ice Nine Kills", search: "Ice Nine Kills Thank God It's Friday", mood: "friday", description: "friday the 13th horror" },
      { title: "Stabbing in the Dark - Ice Nine Kills", search: "Ice Nine Kills Stabbing in the Dark", mood: "stabbing", description: "stabbing in darkness" },
      { title: "Savages - Ice Nine Kills", search: "Ice Nine Kills Savages", mood: "savage", description: "savages ice nine kills" },
      { title: "A Rash Decision - Ice Nine Kills", search: "Ice Nine Kills A Rash Decision", mood: "rash", description: "rash decision ice nine" },
      { title: "Communion of the Cursed - Ice Nine Kills", search: "Ice Nine Kills Communion of the Cursed", mood: "cursed", description: "communion cursed ice nine" },
      { title: "Bloodbath & Beyond - Ice Nine Kills", search: "Ice Nine Kills Bloodbath and Beyond", mood: "bloodbath", description: "bloodbath beyond ice nine" },
      { title: "The Nature of the Beast - Ice Nine Kills", search: "Ice Nine Kills The Nature of the Beast", mood: "beast", description: "nature beast ice nine" },
      { title: "The Predator Becomes the Prey - Ice Nine Kills", search: "Ice Nine Kills The Predator Becomes the Prey", mood: "predator", description: "predator prey ice nine" },
      { title: "Star-Crossed Enemies - Ice Nine Kills", search: "Ice Nine Kills Star-Crossed Enemies", mood: "enemies", description: "star crossed enemies" },
      { title: "Merry Axe-mas - Ice Nine Kills", search: "Ice Nine Kills Merry Axe-mas", mood: "christmas", description: "merry axe-mas horror" },
      { title: "Love Bites - Ice Nine Kills", search: "Ice Nine Kills Love Bites", mood: "bites", description: "love bites ice nine" },
      { title: "Freak Flag - Ice Nine Kills", search: "Ice Nine Kills Freak Flag", mood: "freak", description: "freak flag ice nine" },
      { title: "The World in My Hands - Ice Nine Kills", search: "Ice Nine Kills The World in My Hands", mood: "world", description: "world in hands ice nine" },
      { title: "What I Never Learned in Study Hall - Ice Nine Kills", search: "Ice Nine Kills What I Never Learned in Study Hall", mood: "study", description: "study hall ice nine" },
      { title: "Someone Like You - Ice Nine Kills", search: "Ice Nine Kills Someone Like You", mood: "someone", description: "someone like you ice nine" },
      { title: "Connect the Cuts - Ice Nine Kills", search: "Ice Nine Kills Connect the Cuts", mood: "cuts", description: "connect cuts ice nine" },
      { title: "Let's Bury the Hatchet... in Your Head - Ice Nine Kills", search: "Ice Nine Kills Let's Bury the Hatchet in Your Head", mood: "hatchet", description: "bury hatchet head" },
      { title: "Proximity Mines in the Complex - Ice Nine Kills", search: "Ice Nine Kills Proximity Mines in the Complex", mood: "mines", description: "proximity mines complex" },
      { title: "INCINERATE - Ice Nine Kills", search: "Ice Nine Kills INCINERATE", mood: "incinerate", description: "incinerate ice nine kills" },
      { title: "Funeral Derangements - Ice Nine Kills", search: "Ice Nine Kills Funeral Derangements", mood: "funeral", description: "funeral derangements" },
      { title: "Rainy Day - Ice Nine Kills", search: "Ice Nine Kills Rainy Day", mood: "rainy", description: "rainy day ice nine" },
      { title: "Wurst Vacation - Ice Nine Kills", search: "Ice Nine Kills Wurst Vacation", mood: "vacation", description: "wurst vacation horror" },
      { title: "Ex-Mørtis - Ice Nine Kills", search: "Ice Nine Kills Ex-Mortis", mood: "mortis", description: "ex mortis ice nine" },
      { title: "IT Is the End - Ice Nine Kills", search: "Ice Nine Kills IT Is the End", mood: "it", description: "it is the end horror" },
      { title: "Face Down - The Red Jumpsuit Apparatus", search: "Red Jumpsuit Apparatus Face Down", mood: "powerful", description: "such an important message" },
      { title: "Ohio Is For Lovers - Hawthorne Heights", search: "Hawthorne Heights Ohio Is For Lovers", mood: "melancholy", description: "classic midwest emo vibes" },
      { title: "Cute Without The E - Taking Back Sunday", search: "Taking Back Sunday Cute Without The E", mood: "angsty", description: "the screaming parts are everything" },
      { title: "Hear Me Now - Hollywood Undead", search: "Hollywood Undead Hear Me Now", mood: "aggressive", description: "perfect mix of emo and rap" },
      { title: "Sleepwalking - Bring Me The Horizon", search: "Bring Me The Horizon Sleepwalking", mood: "dark", description: "bmth evolution is beautiful" },
      { title: "Chelsea Smile - Bring Me The Horizon", search: "Bring Me The Horizon Chelsea Smile", mood: "brutal", description: "count your blessings era" },
      { title: "Pray for Plagues - Bring Me The Horizon", search: "Bring Me The Horizon Pray for Plagues", mood: "heavy", description: "oli sykes' evolution" }
    ],
    creatureFeature: [
      { title: "The Greatest Show Unearthed - Creature Feature", search: "Creature Feature Greatest Show Unearthed", mood: "theatrical", description: "horror punk perfection 🎭" },
      { title: "Buried Alive - Creature Feature", search: "Creature Feature Buried Alive", mood: "claustrophobic", description: "such dark carnival vibes" },
      { title: "The House of Wonders - Creature Feature", search: "Creature Feature House of Wonders", mood: "mysterious", description: "welcome to the freak show" },
      { title: "Aim for the Head - Creature Feature", search: "Creature Feature Aim for the Head", mood: "zombie", description: "zombie apocalypse anthem" },
      { title: "Such Horrible Things - Creature Feature", search: "Creature Feature Such Horrible Things", mood: "sinister", description: "curtis rx's vocals are perfect" },
      { title: "Bound and Gagged - Creature Feature", search: "Creature Feature Bound and Gagged", mood: "trapped", description: "horror punk storytelling" },
      { title: "Shallow Grave - Creature Feature", search: "Creature Feature Shallow Grave", mood: "burial", description: "six feet under vibes" },
      { title: "Mad House - Creature Feature", search: "Creature Feature Mad House", mood: "insane", description: "asylum horror perfection" },
      { title: "Zombie Girl - Creature Feature", search: "Creature Feature Zombie Girl", mood: "undead", description: "horror romance gothic" },
      { title: "Look to the Stars - Creature Feature", search: "Creature Feature Look to the Stars", mood: "cosmic", description: "lovecraftian horror vibes" },
      { title: "A Corpse in My Bed - Creature Feature", search: "Creature Feature A Corpse in My Bed", mood: "necrophilia", description: "dark humor horror punk" },
      { title: "Grave Robber - Creature Feature", search: "Creature Feature Grave Robber", mood: "criminal", description: "digging up the dead" },
      { title: "Creep Show - Creature Feature", search: "Creature Feature Creep Show", mood: "anthology", description: "tales from the crypt vibes" },
      { title: "Headless Horseman - Creature Feature", search: "Creature Feature Headless Horseman", mood: "legend", description: "sleepy hollow horror" },
      { title: "Devil's Night - Creature Feature", search: "Creature Feature Devil's Night", mood: "halloween", description: "october 30th mischief" },
      { title: "The Meek Shall Inherit the Earth - Creature Feature", search: "Creature Feature The Meek Shall Inherit the Earth", mood: "meek", description: "biblical horror twist" },
      { title: "Remains of a Man - Creature Feature", search: "Creature Feature Remains of a Man", mood: "remains", description: "what remains of humanity" },
      { title: "Go to Hell - Creature Feature", search: "Creature Feature Go to Hell", mood: "hell", description: "go to hell creature feature" },
      { title: "The Night Watchman - Creature Feature", search: "Creature Feature The Night Watchman", mood: "watchman", description: "night watchman horror" },
      { title: "Left for Dead - Creature Feature", search: "Creature Feature Left for Dead", mood: "abandoned", description: "left for dead survival" },
      { title: "Aim for the Head (Pt. 2) - Creature Feature", search: "Creature Feature Aim for the Head Part 2", mood: "zombie", description: "zombie sequel perfection" },
      { title: "Such Horrible Things (Demo) - Creature Feature", search: "Creature Feature Such Horrible Things Demo", mood: "demo", description: "original demo version" },
      { title: "Bound and Gagged (Acoustic) - Creature Feature", search: "Creature Feature Bound and Gagged Acoustic", mood: "acoustic", description: "acoustic horror beauty" },
      { title: "The Creepshow - Creature Feature", search: "Creature Feature The Creepshow", mood: "creep", description: "the creepshow horror" },
      { title: "Frankie's Girl - Creature Feature", search: "Creature Feature Frankie's Girl", mood: "frankenstein", description: "frankenstein's creation" },
      { title: "Attack of the B-Movies - Creature Feature", search: "Creature Feature Attack of the B-Movies", mood: "b-movie", description: "b-movie horror tribute" },
      { title: "Horribly Twisted - Creature Feature", search: "Creature Feature Horribly Twisted", mood: "twisted", description: "horribly twisted minds" },
      { title: "The Unwelcome Guest - Creature Feature", search: "Creature Feature The Unwelcome Guest", mood: "unwelcome", description: "unwelcome guest horror" },
      { title: "Spook Show Spectacular - Creature Feature", search: "Creature Feature Spook Show Spectacular", mood: "spook", description: "spook show spectacular" },
      { title: "Horror Movie Heroes - Creature Feature", search: "Creature Feature Horror Movie Heroes", mood: "heroes", description: "horror movie heroes" }
    ],
    metal: [
      { title: "Master of Puppets - Metallica", search: "Metallica Master of Puppets", mood: "controlling", description: "thrash metal perfection 🤘" },
      { title: "One - Metallica", search: "Metallica One", mood: "war", description: "anti-war metal masterpiece" },
      { title: "Enter Sandman - Metallica", search: "Metallica Enter Sandman", mood: "nightmare", description: "black album classic" },
      { title: "For Whom the Bell Tolls - Metallica", search: "Metallica For Whom the Bell Tolls", mood: "death", description: "ride the lightning era" },
      { title: "Battery - Metallica", search: "Metallica Battery", mood: "energetic", description: "master of puppets album opener perfection" },
      { title: "Welcome Home (Sanitarium) - Metallica", search: "Metallica Welcome Home Sanitarium", mood: "insane", description: "sanitarium mental hospital horror" },
      { title: "Disposable Heroes - Metallica", search: "Metallica Disposable Heroes", mood: "war", description: "soldiers as disposable tools" },
      { title: "Leper Messiah - Metallica", search: "Metallica Leper Messiah", mood: "religious", description: "corrupt religious leaders theme" },
      { title: "Orion - Metallica", search: "Metallica Orion", mood: "instrumental", description: "cliff burton bass masterpiece instrumental" },
      { title: "Damage Inc. - Metallica", search: "Metallica Damage Inc", mood: "destructive", description: "damage incorporated thrash finale" },
      { title: "Blackened - Metallica", search: "Metallica Blackened", mood: "apocalyptic", description: "justice album environmental apocalypse opener" },
      { title: "...And Justice for All - Metallica", search: "Metallica And Justice for All", mood: "justice", description: "justice system corruption epic" },
      { title: "Eye of the Beholder - Metallica", search: "Metallica Eye of the Beholder", mood: "perception", description: "perspective and media control" },
      { title: "The Shortest Straw - Metallica", search: "Metallica The Shortest Straw", mood: "unlucky", description: "drawing the shortest straw" },
      { title: "Harvester of Sorrow - Metallica", search: "Metallica Harvester of Sorrow", mood: "sorrow", description: "harvesting pain and despair" },
      { title: "The Frayed Ends of Sanity - Metallica", search: "Metallica The Frayed Ends of Sanity", mood: "insanity", description: "mental breakdown progressive" },
      { title: "To Live Is to Die - Metallica", search: "Metallica To Live Is to Die", mood: "existential", description: "cliff burton tribute instrumental" },
      { title: "Dyers Eve - Metallica", search: "Metallica Dyers Eve", mood: "rebellion", description: "parental rebellion finale" },
      { title: "Sad But True - Metallica", search: "Metallica Sad But True", mood: "heavy", description: "heavy groove black album perfection" },
      { title: "The Unforgiven - Metallica", search: "Metallica The Unforgiven", mood: "forgiveness", description: "unforgiven ballad trilogy starter" },
      { title: "Wherever I May Roam - Metallica", search: "Metallica Wherever I May Roam", mood: "wandering", description: "nomadic wanderer anthem" },
      { title: "Don't Tread on Me - Metallica", search: "Metallica Don't Tread on Me", mood: "patriotic", description: "american patriotic metal" },
      { title: "Through the Never - Metallica", search: "Metallica Through the Never", mood: "mysterious", description: "mystical journey through darkness" },
      { title: "Nothing Else Matters - Metallica", search: "Metallica Nothing Else Matters", mood: "romantic", description: "metal ballad perfection orchestral" },
      { title: "Of Wolf and Man - Metallica", search: "Metallica Of Wolf and Man", mood: "primal", description: "primal wolf instincts" },
      { title: "The God That Failed - Metallica", search: "Metallica The God That Failed", mood: "religious", description: "religious disillusionment" },
      { title: "My Friend of Misery - Metallica", search: "Metallica My Friend of Misery", mood: "misery", description: "friendship with suffering" },
      { title: "The Struggle Within - Metallica", search: "Metallica The Struggle Within", mood: "internal", description: "internal psychological struggle" },
      { title: "Ain't My Bitch - Metallica", search: "Metallica Ain't My Bitch", mood: "defiant", description: "load era attitude opener" },
      { title: "2 X 4 - Metallica", search: "Metallica 2 X 4", mood: "heavy", description: "two by four construction metaphor" },
      { title: "Until It Sleeps - Metallica", search: "Metallica Until It Sleeps", mood: "pain", description: "cancer metaphor emotional" },
      { title: "King Nothing - Metallica", search: "Metallica King Nothing", mood: "emptiness", description: "king of nothing loneliness" },
      { title: "Hero of the Day - Metallica", search: "Metallica Hero of the Day", mood: "heroic", description: "everyday hero appreciation" },
      { title: "Bleeding Me - Metallica", search: "Metallica Bleeding Me", mood: "bleeding", description: "emotional bleeding vulnerability" },
      { title: "Cure - Metallica", search: "Metallica Cure", mood: "healing", description: "seeking cure for pain" },
      { title: "Poor Twisted Me - Metallica", search: "Metallica Poor Twisted Me", mood: "twisted", description: "self-deprecating dark humor" },
      { title: "Wasting My Hate - Metallica", search: "Metallica Wasting My Hate", mood: "hate", description: "hatred is wasteful energy" },
      { title: "Mama Said - Metallica", search: "Metallica Mama Said", mood: "maternal", description: "country influenced mama advice" },
      { title: "Thorn Within - Metallica", search: "Metallica Thorn Within", mood: "thorny", description: "internal thorn irritation" },
      { title: "Ronnie - Metallica", search: "Metallica Ronnie", mood: "character", description: "character study ronnie" },
      { title: "The Outlaw Torn - Metallica", search: "Metallica The Outlaw Torn", mood: "outlaw", description: "torn outlaw epic finale" },
      { title: "Down with the Sickness - Disturbed", search: "Disturbed Down with the Sickness", mood: "sick", description: "david draiman's voice" },
      { title: "The Sound of Silence - Disturbed", search: "Disturbed Sound of Silence", mood: "silent", description: "cover that outdid original" },
      { title: "Stupify - Disturbed", search: "Disturbed Stupify", mood: "stupid", description: "the sickness era classic" },
      { title: "Voices - Disturbed", search: "Disturbed Voices", mood: "voices", description: "the sickness album opener voices in head" },
      { title: "The Game - Disturbed", search: "Disturbed The Game", mood: "game", description: "life is just a game" },
      { title: "Fear - Disturbed", search: "Disturbed Fear", mood: "fear", description: "confronting deepest fears" },
      { title: "Numb - Disturbed", search: "Disturbed Numb", mood: "numb", description: "emotional numbness theme" },
      { title: "Want - Disturbed", search: "Disturbed Want", mood: "want", description: "desire and wanting more" },
      { title: "Conflict - Disturbed", search: "Disturbed Conflict", mood: "conflict", description: "internal external conflict" },
      { title: "Shout 2000 - Disturbed", search: "Disturbed Shout 2000", mood: "shout", description: "tears for fears cover disturbed style" },
      { title: "Droppin' Plates - Disturbed", search: "Disturbed Droppin Plates", mood: "dropping", description: "dropping plates chaos" },
      { title: "Meaning of Life - Disturbed", search: "Disturbed Meaning of Life", mood: "meaning", description: "searching for life's meaning" },
      { title: "Prayer - Disturbed", search: "Disturbed Prayer", mood: "prayer", description: "believe album prayer opener" },
      { title: "Liberate - Disturbed", search: "Disturbed Liberate", mood: "liberation", description: "liberate yourself from chains" },
      { title: "Awaken - Disturbed", search: "Disturbed Awaken", mood: "awakening", description: "awakening from slumber" },
      { title: "Believe - Disturbed", search: "Disturbed Believe", mood: "belief", description: "believe in yourself power" },
      { title: "Remember - Disturbed", search: "Disturbed Remember", mood: "memory", description: "remember who you are" },
      { title: "Intoxication - Disturbed", search: "Disturbed Intoxication", mood: "intoxicated", description: "intoxication with power" },
      { title: "Rise - Disturbed", search: "Disturbed Rise", mood: "rising", description: "rise above adversity" },
      { title: "Mistress - Disturbed", search: "Disturbed Mistress", mood: "mistress", description: "dangerous mistress relationship" },
      { title: "Breathe - Disturbed", search: "Disturbed Breathe", mood: "breathe", description: "just breathe and survive" },
      { title: "Bound - Disturbed", search: "Disturbed Bound", mood: "bound", description: "bound by circumstances" },
      { title: "Devour - Disturbed", search: "Disturbed Devour", mood: "devour", description: "devour your enemies" },
      { title: "Darkness - Disturbed", search: "Disturbed Darkness", mood: "darkness", description: "embrace the darkness within" },
      { title: "Ten Thousand Fists - Disturbed", search: "Disturbed Ten Thousand Fists", mood: "uprising", description: "ten thousand fists in the air" },
      { title: "Just Stop - Disturbed", search: "Disturbed Just Stop", mood: "stop", description: "just stop the madness" },
      { title: "Guarded - Disturbed", search: "Disturbed Guarded", mood: "guarded", description: "guarded heart protection" },
      { title: "Deify - Disturbed", search: "Disturbed Deify", mood: "deify", description: "deify false idols" },
      { title: "Stricken - Disturbed", search: "Disturbed Stricken", mood: "stricken", description: "stricken with grief" },
      { title: "I'm Alive - Disturbed", search: "Disturbed I'm Alive", mood: "alive", description: "feeling alive and powerful" },
      { title: "Sons of Plunder - Disturbed", search: "Disturbed Sons of Plunder", mood: "plunder", description: "sons of plunder pirates" },
      { title: "Overburdened - Disturbed", search: "Disturbed Overburdened", mood: "burden", description: "overburdened with responsibility" },
      { title: "Decadence - Disturbed", search: "Disturbed Decadence", mood: "decadent", description: "decadence of society" },
      { title: "Forgiven - Disturbed", search: "Disturbed Forgiven", mood: "forgiveness", description: "seeking forgiveness" },
      { title: "Land of Confusion - Disturbed", search: "Disturbed Land of Confusion", mood: "confusion", description: "genesis cover confusion" },
      { title: "Sacred Lie - Disturbed", search: "Disturbed Sacred Lie", mood: "lies", description: "sacred lies we tell" },
      { title: "Pain Redefined - Disturbed", search: "Disturbed Pain Redefined", mood: "pain", description: "redefining what pain means" },
      { title: "Avarice - Disturbed", search: "Disturbed Avarice", mood: "greed", description: "avarice and greed" },
      { title: "Indestructible - Disturbed", search: "Disturbed Indestructible", mood: "indestructible", description: "indestructible force of will" },
      { title: "Inside the Fire - Disturbed", search: "Disturbed Inside the Fire", mood: "fire", description: "inside the fire burning" },
      { title: "Deceiver - Disturbed", search: "Disturbed Deceiver", mood: "deception", description: "deceiver of the masses" },
      { title: "The Night - Disturbed", search: "Disturbed The Night", mood: "night", description: "creatures of the night" },
      { title: "Perfect Insanity - Disturbed", search: "Disturbed Perfect Insanity", mood: "insanity", description: "perfect insanity balance" },
      { title: "Haunted - Disturbed", search: "Disturbed Haunted", mood: "haunted", description: "haunted by the past" },
      { title: "Enough - Disturbed", search: "Disturbed Enough", mood: "enough", description: "enough is enough" },
      { title: "The Curse - Disturbed", search: "Disturbed The Curse", mood: "cursed", description: "living under a curse" },
      { title: "Torn - Disturbed", search: "Disturbed Torn", mood: "torn", description: "torn between choices" },
      { title: "Criminal - Disturbed", search: "Disturbed Criminal", mood: "criminal", description: "criminal mind mentality" },
      { title: "Divide - Disturbed", search: "Disturbed Divide", mood: "divide", description: "divide and conquer" },
      { title: "Facade - Disturbed", search: "Disturbed Facade", mood: "facade", description: "facade hiding truth" },
      { title: "Remnants - Disturbed", search: "Disturbed Remnants", mood: "remnants", description: "asylum album remnants opener" },
      { title: "Asylum - Disturbed", search: "Disturbed Asylum", mood: "asylum", description: "asylum mental institution" },
      { title: "The Infection - Disturbed", search: "Disturbed The Infection", mood: "infection", description: "spreading infection disease" },
      { title: "Warrior - Disturbed", search: "Disturbed Warrior", mood: "warrior", description: "warrior spirit battle" },
      { title: "Another Way to Die - Disturbed", search: "Disturbed Another Way to Die", mood: "death", description: "another way to die" },
      { title: "Never Again - Disturbed", search: "Disturbed Never Again", mood: "never", description: "never again will this happen" },
      { title: "The Animal - Disturbed", search: "Disturbed The Animal", mood: "animal", description: "animal instincts unleashed" },
      { title: "Crucified - Disturbed", search: "Disturbed Crucified", mood: "crucified", description: "crucified for beliefs" },
      { title: "Serpentine - Disturbed", search: "Disturbed Serpentine", mood: "serpent", description: "serpentine deception" },
      { title: "My Child - Disturbed", search: "Disturbed My Child", mood: "child", description: "protective parent theme" },
      { title: "Sacrifice - Disturbed", search: "Disturbed Sacrifice", mood: "sacrifice", description: "ultimate sacrifice made" },
      { title: "Innocence - Disturbed", search: "Disturbed Innocence", mood: "innocence", description: "lost innocence theme" },
      { title: "The Eye of the Storm - Disturbed", search: "Disturbed The Eye of the Storm", mood: "storm", description: "immortalized album storm opener" },
      { title: "Immortalized - Disturbed", search: "Disturbed Immortalized", mood: "immortal", description: "immortalized in legend" },
      { title: "The Vengeful One - Disturbed", search: "Disturbed The Vengeful One", mood: "vengeance", description: "the vengeful one returns" },
      { title: "Open Your Eyes - Disturbed", search: "Disturbed Open Your Eyes", mood: "awakening", description: "open your eyes see truth" },
      { title: "The Light - Disturbed", search: "Disturbed The Light", mood: "light", description: "finding light in darkness" },
      { title: "What Are You Waiting For - Disturbed", search: "Disturbed What Are You Waiting For", mood: "waiting", description: "what are you waiting for" },
      { title: "You're Mine - Disturbed", search: "Disturbed You're Mine", mood: "possession", description: "you belong to me" },
      { title: "Who Taught You How to Hate - Disturbed", search: "Disturbed Who Taught You How to Hate", mood: "hate", description: "learning hatred from others" },
      { title: "Save Our Last Goodbye - Disturbed", search: "Disturbed Save Our Last Goodbye", mood: "goodbye", description: "final farewell moment" },
      { title: "Fire It Up - Disturbed", search: "Disturbed Fire It Up", mood: "fire", description: "fire up the engines" },
      { title: "Legion of Monsters - Disturbed", search: "Disturbed Legion of Monsters", mood: "monsters", description: "legion of monsters army" },
      { title: "Who - Disturbed", search: "Disturbed Who", mood: "identity", description: "who am i really" },
      { title: "The Beautiful People - Marilyn Manson", search: "Marilyn Manson Beautiful People", mood: "ugly", description: "antichrist superstar" },
      { title: "Sweet Dreams - Marilyn Manson", search: "Marilyn Manson Sweet Dreams", mood: "nightmare", description: "eurythmics cover perfection" },
      { title: "Tainted Love - Marilyn Manson", search: "Marilyn Manson Tainted Love", mood: "corrupted", description: "industrial cover gold" },
      { title: "Prelude (The Family Trip) - Marilyn Manson", search: "Marilyn Manson Prelude The Family Trip", mood: "family", description: "portrait album family trip opener" },
      { title: "Cake and Sodomy - Marilyn Manson", search: "Marilyn Manson Cake and Sodomy", mood: "corruption", description: "childhood innocence corruption" },
      { title: "Lunchbox - Marilyn Manson", search: "Marilyn Manson Lunchbox", mood: "school", description: "lunchbox school violence metaphor" },
      { title: "Organ Grinder - Marilyn Manson", search: "Marilyn Manson Organ Grinder", mood: "grinding", description: "organ grinder monkey dance" },
      { title: "Cyclops - Marilyn Manson", search: "Marilyn Manson Cyclops", mood: "cyclops", description: "one eyed monster vision" },
      { title: "Dope Hat - Marilyn Manson", search: "Marilyn Manson Dope Hat", mood: "drugs", description: "dope hat drug culture" },
      { title: "Get Your Gunn - Marilyn Manson", search: "Marilyn Manson Get Your Gunn", mood: "violence", description: "get your gun violence" },
      { title: "Wrapped in Plastic - Marilyn Manson", search: "Marilyn Manson Wrapped in Plastic", mood: "plastic", description: "wrapped in plastic suffocation" },
      { title: "Dogma - Marilyn Manson", search: "Marilyn Manson Dogma", mood: "dogma", description: "religious dogma criticism" },
      { title: "Sweet Tooth - Marilyn Manson", search: "Marilyn Manson Sweet Tooth", mood: "sweet", description: "sweet tooth sugar addiction" },
      { title: "Snake Eyes and Sissies - Marilyn Manson", search: "Marilyn Manson Snake Eyes and Sissies", mood: "gambling", description: "snake eyes gambling metaphor" },
      { title: "My Monkey - Marilyn Manson", search: "Marilyn Manson My Monkey", mood: "monkey", description: "my monkey addiction metaphor" },
      { title: "Misery Machine - Marilyn Manson", search: "Marilyn Manson Misery Machine", mood: "misery", description: "misery machine production line" },
      { title: "Irresponsible Hate Anthem - Marilyn Manson", search: "Marilyn Manson Irresponsible Hate Anthem", mood: "hate", description: "antichrist superstar hate opener" },
      { title: "Dried Up Tied and Dead to the World - Marilyn Manson", search: "Marilyn Manson Dried Up Tied and Dead to the World", mood: "dead", description: "dried up and dead" },
      { title: "Tourniquet - Marilyn Manson", search: "Marilyn Manson Tourniquet", mood: "medical", description: "tourniquet stop the bleeding" },
      { title: "Little Horn - Marilyn Manson", search: "Marilyn Manson Little Horn", mood: "horn", description: "little horn apocalyptic" },
      { title: "Cryptorchid - Marilyn Manson", search: "Marilyn Manson Cryptorchid", mood: "hidden", description: "cryptorchid hidden testicle" },
      { title: "Deformography - Marilyn Manson", search: "Marilyn Manson Deformography", mood: "deformed", description: "deformography twisted imagery" },
      { title: "Wormboy - Marilyn Manson", search: "Marilyn Manson Wormboy", mood: "worm", description: "wormboy transformation" },
      { title: "Mister Superstar - Marilyn Manson", search: "Marilyn Manson Mister Superstar", mood: "superstar", description: "mister superstar fame" },
      { title: "Angel with the Scabbed Wings - Marilyn Manson", search: "Marilyn Manson Angel with the Scabbed Wings", mood: "angel", description: "scabbed wings broken angel" },
      { title: "Kinderfeld - Marilyn Manson", search: "Marilyn Manson Kinderfeld", mood: "children", description: "kinderfeld children's field" },
      { title: "Antichrist Superstar - Marilyn Manson", search: "Marilyn Manson Antichrist Superstar", mood: "antichrist", description: "antichrist superstar title track" },
      { title: "1996 - Marilyn Manson", search: "Marilyn Manson 1996", mood: "year", description: "1996 apocalyptic year" },
      { title: "The Minute of Decay - Marilyn Manson", search: "Marilyn Manson The Minute of Decay", mood: "decay", description: "minute of decay time" },
      { title: "The Reflecting God - Marilyn Manson", search: "Marilyn Manson The Reflecting God", mood: "god", description: "reflecting god mirror" },
      { title: "Man That You Fear - Marilyn Manson", search: "Marilyn Manson Man That You Fear", mood: "fear", description: "man that you fear" },
      { title: "Great Big White World - Marilyn Manson", search: "Marilyn Manson Great Big White World", mood: "white", description: "mechanical animals white world opener" },
      { title: "The Dope Show - Marilyn Manson", search: "Marilyn Manson The Dope Show", mood: "show", description: "the dope show entertainment" },
      { title: "Mechanical Animals - Marilyn Manson", search: "Marilyn Manson Mechanical Animals", mood: "mechanical", description: "mechanical animals title track" },
      { title: "Rock Is Dead - Marilyn Manson", search: "Marilyn Manson Rock Is Dead", mood: "dead", description: "rock is dead matrix soundtrack" },
      { title: "Disassociative - Marilyn Manson", search: "Marilyn Manson Disassociative", mood: "dissociation", description: "disassociative mental state" },
      { title: "The Speed of Pain - Marilyn Manson", search: "Marilyn Manson The Speed of Pain", mood: "pain", description: "speed of pain velocity" },
      { title: "Posthuman - Marilyn Manson", search: "Marilyn Manson Posthuman", mood: "posthuman", description: "posthuman evolution" },
      { title: "I Want to Disappear - Marilyn Manson", search: "Marilyn Manson I Want to Disappear", mood: "disappear", description: "wanting to disappear" },
      { title: "I Don't Like the Drugs - Marilyn Manson", search: "Marilyn Manson I Don't Like the Drugs", mood: "drugs", description: "drugs but drugs like me" },
      { title: "New Model No. 15 - Marilyn Manson", search: "Marilyn Manson New Model No 15", mood: "model", description: "new model number 15" },
      { title: "User Friendly - Marilyn Manson", search: "Marilyn Manson User Friendly", mood: "user", description: "user friendly interface" },
      { title: "Fundamentally Loathsome - Marilyn Manson", search: "Marilyn Manson Fundamentally Loathsome", mood: "loathe", description: "fundamentally loathsome nature" },
      { title: "The Last Day on Earth - Marilyn Manson", search: "Marilyn Manson The Last Day on Earth", mood: "last", description: "last day on earth apocalypse" },
      { title: "Coma White - Marilyn Manson", search: "Marilyn Manson Coma White", mood: "coma", description: "coma white unconscious state" },
      { title: "GodEatGod - Marilyn Manson", search: "Marilyn Manson GodEatGod", mood: "cannibalistic", description: "holy wood god eat god opener" },
      { title: "The Love Song - Marilyn Manson", search: "Marilyn Manson The Love Song", mood: "love", description: "twisted love song" },
      { title: "The Fight Song - Marilyn Manson", search: "Marilyn Manson The Fight Song", mood: "fight", description: "the fight song rebellion" },
      { title: "Disposable Teens - Marilyn Manson", search: "Marilyn Manson Disposable Teens", mood: "disposable", description: "disposable teens society" },
      { title: "Target Audience - Marilyn Manson", search: "Marilyn Manson Target Audience", mood: "target", description: "target audience marketing" },
      { title: "President Dead - Marilyn Manson", search: "Marilyn Manson President Dead", mood: "political", description: "president dead political" },
      { title: "In the Shadow of the Valley of Death - Marilyn Manson", search: "Marilyn Manson In the Shadow of the Valley of Death", mood: "death", description: "valley of death shadow" },
      { title: "Cruci-Fiction in Space - Marilyn Manson", search: "Marilyn Manson Cruci-Fiction in Space", mood: "crucifixion", description: "crucifiction in space" },
      { title: "A Place in the Dirt - Marilyn Manson", search: "Marilyn Manson A Place in the Dirt", mood: "dirt", description: "place in the dirt burial" },
      { title: "The Nobodies - Marilyn Manson", search: "Marilyn Manson The Nobodies", mood: "nobody", description: "the nobodies invisible people" },
      { title: "The Death Song - Marilyn Manson", search: "Marilyn Manson The Death Song", mood: "death", description: "death song finale" },
      { title: "Lamb of God - Marilyn Manson", search: "Marilyn Manson Lamb of God", mood: "lamb", description: "lamb of god sacrifice" },
      { title: "Born Again - Marilyn Manson", search: "Marilyn Manson Born Again", mood: "rebirth", description: "born again christian parody" },
      { title: "Burning Flag - Marilyn Manson", search: "Marilyn Manson Burning Flag", mood: "burning", description: "burning flag patriotism" },
      { title: "Coma Black - Marilyn Manson", search: "Marilyn Manson Coma Black", mood: "coma", description: "coma black unconscious" },
      { title: "Valentine's Day - Marilyn Manson", search: "Marilyn Manson Valentine's Day", mood: "valentine", description: "valentine's day massacre" },
      { title: "The Fall of Adam - Marilyn Manson", search: "Marilyn Manson The Fall of Adam", mood: "fall", description: "fall of adam biblical" },
      { title: "King Kill 33° - Marilyn Manson", search: "Marilyn Manson King Kill 33", mood: "conspiracy", description: "king kill 33 degrees conspiracy" },
      { title: "Count to Six and Die - Marilyn Manson", search: "Marilyn Manson Count to Six and Die", mood: "counting", description: "count to six and die" },
      { title: "Psychosocial - Slipknot", search: "Slipknot Psychosocial", mood: "chaotic", description: "corey taylor's range" },
      { title: "Duality - Slipknot", search: "Slipknot Duality", mood: "split", description: "i push my fingers into my eyes" },
      { title: "Before I Forget - Slipknot", search: "Slipknot Before I Forget", mood: "memory", description: "vol 3 perfection" },
      { title: "Wait and Bleed - Slipknot", search: "Slipknot Wait and Bleed", mood: "bleeding", description: "iowa era brutality" },
      { title: "Snuff - Slipknot", search: "Slipknot Snuff", mood: "memorial", description: "corey's most vulnerable moment 💔" },
      { title: "Spit It Out - Slipknot", search: "Slipknot Spit It Out", mood: "aggressive", description: "self-titled album classic" },
      { title: "Surfacing - Slipknot", search: "Slipknot Surfacing", mood: "surfacing", description: "coming to the surface" },
      { title: "Eyeless - Slipknot", search: "Slipknot Eyeless", mood: "eyeless", description: "can't see the truth" },
      { title: "Liberate - Slipknot", search: "Slipknot Liberate", mood: "liberation", description: "liberate yourself from conformity" },
      { title: "Prosthetics - Slipknot", search: "Slipknot Prosthetics", mood: "artificial", description: "fake body parts metaphor" },
      { title: "No Life - Slipknot", search: "Slipknot No Life", mood: "lifeless", description: "existence without purpose" },
      { title: "Diluted - Slipknot", search: "Slipknot Diluted", mood: "diluted", description: "watered down existence" },
      { title: "People = Shit - Slipknot", search: "Slipknot People Equal Shit", mood: "misanthropic", description: "iowa album misanthropy" },
      { title: "Disasterpiece - Slipknot", search: "Slipknot Disasterpiece", mood: "disaster", description: "complete disaster artwork" },
      { title: "My Plague - Slipknot", search: "Slipknot My Plague", mood: "plague", description: "infectious negativity" },
      { title: "Everything Ends - Slipknot", search: "Slipknot Everything Ends", mood: "ending", description: "all things must end" },
      { title: "The Heretic Anthem - Slipknot", search: "Slipknot The Heretic Anthem", mood: "heretical", description: "if you're 555 then i'm 666" },
      { title: "Iowa - Slipknot", search: "Slipknot Iowa", mood: "iowa", description: "15 minute descent into madness" },
      { title: "Left Behind - Slipknot", search: "Slipknot Left Behind", mood: "abandoned", description: "being left behind" },
      { title: "Vermilion - Slipknot", search: "Slipknot Vermilion", mood: "vermilion", description: "red color obsession" },
      { title: "Three Nil - Slipknot", search: "Slipknot Three Nil", mood: "losing", description: "losing by three points" },
      { title: "The Blister Exists - Slipknot", search: "Slipknot The Blister Exists", mood: "painful", description: "painful skin condition metaphor" },
      { title: "Dead Memories - Slipknot", search: "Slipknot Dead Memories", mood: "memories", description: "memories that died" },
      { title: "Sulfur - Slipknot", search: "Slipknot Sulfur", mood: "sulfur", description: "chemical element aggression" },
      { title: "The Devil in I - Slipknot", search: "Slipknot The Devil in I", mood: "devil", description: "the gray chapter era" },
      { title: "Custer - Slipknot", search: "Slipknot Custer", mood: "battle", description: "last stand mentality" },
      { title: "Killpop - Slipknot", search: "Slipknot Killpop", mood: "killing", description: "killing popular culture" },
      { title: "Unsainted - Slipknot", search: "Slipknot Unsainted", mood: "unsainted", description: "we are not your kind era" },
      { title: "Solway Firth - Slipknot", search: "Slipknot Solway Firth", mood: "drowning", description: "drowning in solway firth" },
      { title: "Chop Suey - System of a Down", search: "System of a Down Chop Suey", mood: "chaotic", description: "serj tankian's voice" },
      { title: "Toxicity - System of a Down", search: "System of a Down Toxicity", mood: "poisonous", description: "disorder disorder disorder" },
      { title: "Prison Song - System of a Down", search: "System of a Down Prison Song", mood: "imprisoned", description: "political metal at its best" },
      { title: "Aerials - System of a Down", search: "System of a Down Aerials", mood: "flying", description: "beautiful metal ballad" },
      { title: "B.Y.O.B. - System of a Down", search: "System of a Down BYOB", mood: "party", description: "bring your own bombs" },
      { title: "Sugar - System of a Down", search: "System of a Down Sugar", mood: "sweet", description: "self-titled album classic" },
      { title: "Spiders - System of a Down", search: "System of a Down Spiders", mood: "spiders", description: "arachnid metaphor madness" },
      { title: "War? - System of a Down", search: "System of a Down War", mood: "war", description: "questioning warfare" },
      { title: "Suite-Pee - System of a Down", search: "System of a Down Suite-Pee", mood: "bathroom", description: "toilet humor meets metal" },
      { title: "Know - System of a Down", search: "System of a Down Know", mood: "knowledge", description: "what do you know" },
      { title: "Peephole - System of a Down", search: "System of a Down Peephole", mood: "voyeuristic", description: "looking through peepholes" },
      { title: "CUBErt - System of a Down", search: "System of a Down CUBErt", mood: "geometric", description: "cubic mathematical metal" },
      { title: "Darts - System of a Down", search: "System of a Down Darts", mood: "throwing", description: "throwing darts at targets" },
      { title: "Psycho - System of a Down", search: "System of a Down Psycho", mood: "psychotic", description: "toxicity album deep cut" },
      { title: "Needles - System of a Down", search: "System of a Down Needles", mood: "needles", description: "sharp object obsession" },
      { title: "Forest - System of a Down", search: "System of a Down Forest", mood: "forest", description: "walk through the forest" },
      { title: "Highway Song - System of a Down", search: "System of a Down Highway Song", mood: "highway", description: "road trip metal" },
      { title: "Question! - System of a Down", search: "System of a Down Question", mood: "questioning", description: "mezmerize era questioning" },
      { title: "Cigaro - System of a Down", search: "System of a Down Cigaro", mood: "smoking", description: "cigar smoking references" },
      { title: "Radio/Video - System of a Down", search: "System of a Down Radio Video", mood: "media", description: "media manipulation themes" },
      { title: "This Cocaine - System of a Down", search: "System of a Down This Cocaine", mood: "cocaine", description: "drug reference track" },
      { title: "Violent Pornography - System of a Down", search: "System of a Down Violent Pornography", mood: "violent", description: "media violence critique" },
      { title: "Revenga - System of a Down", search: "System of a Down Revenga", mood: "revenge", description: "hypnotize album opener" },
      { title: "Hypnotize - System of a Down", search: "System of a Down Hypnotize", mood: "hypnotic", description: "hypnotic trance state" },
      { title: "Stealing Society - System of a Down", search: "System of a Down Stealing Society", mood: "theft", description: "society theft metaphor" },
      { title: "Tentative - System of a Down", search: "System of a Down Tentative", mood: "tentative", description: "uncertain about decisions" },
      { title: "U-Fig - System of a Down", search: "System of a Down U-Fig", mood: "figuring", description: "you figure it out" },
      { title: "Holy Mountains - System of a Down", search: "System of a Down Holy Mountains", mood: "holy", description: "armenian genocide reference" },
      { title: "Lonely Day - System of a Down", search: "System of a Down Lonely Day", mood: "lonely", description: "most successful ballad" },
      { title: "Nightmare - Avenged Sevenfold", search: "Avenged Sevenfold Nightmare", mood: "nightmare", description: "tribute to the rev" },
      { title: "Hail to the King - Avenged Sevenfold", search: "Avenged Sevenfold Hail to the King", mood: "royal", description: "m shadows perfection" },
      { title: "So Far Away - Avenged Sevenfold", search: "Avenged Sevenfold So Far Away", mood: "memorial", description: "for jimmy the rev sullivan ❤" },
      { title: "Afterlife - Avenged Sevenfold", search: "Avenged Sevenfold Afterlife", mood: "afterlife", description: "synyster gates solo" },
      { title: "Beast and the Harlot - Avenged Sevenfold", search: "Avenged Sevenfold Beast and the Harlot", mood: "biblical", description: "city of evil era" },
      { title: "Bat Country - Avenged Sevenfold", search: "Avenged Sevenfold Bat Country", mood: "country", description: "fear and loathing reference" },
      { title: "Seize the Day - Avenged Sevenfold", search: "Avenged Sevenfold Seize the Day", mood: "seizing", description: "carpe diem metal anthem" },
      { title: "Burn It Down - Avenged Sevenfold", search: "Avenged Sevenfold Burn It Down", mood: "burning", description: "city of evil burning" },
      { title: "Blinded in Chains - Avenged Sevenfold", search: "Avenged Sevenfold Blinded in Chains", mood: "blinded", description: "chained and blinded" },
      { title: "Trashed and Scattered - Avenged Sevenfold", search: "Avenged Sevenfold Trashed and Scattered", mood: "scattered", description: "broken and scattered" },
      { title: "Strength of the World - Avenged Sevenfold", search: "Avenged Sevenfold Strength of the World", mood: "strength", description: "world's collective strength" },
      { title: "Betrayed - Avenged Sevenfold", search: "Avenged Sevenfold Betrayed", mood: "betrayed", description: "feeling of betrayal" },
      { title: "MIA - Avenged Sevenfold", search: "Avenged Sevenfold MIA", mood: "missing", description: "missing in action" },
      { title: "Critical Acclaim - Avenged Sevenfold", search: "Avenged Sevenfold Critical Acclaim", mood: "critical", description: "self-titled album opener" },
      { title: "Almost Easy - Avenged Sevenfold", search: "Avenged Sevenfold Almost Easy", mood: "easy", description: "almost easy to understand" },
      { title: "Scream - Avenged Sevenfold", search: "Avenged Sevenfold Scream", mood: "screaming", description: "primal scream therapy" },
      { title: "Brompton Cocktail - Avenged Sevenfold", search: "Avenged Sevenfold Brompton Cocktail", mood: "cocktail", description: "medicinal cocktail reference" },
      { title: "Gunslinger - Avenged Sevenfold", search: "Avenged Sevenfold Gunslinger", mood: "gunslinger", description: "western gunslinger ballad" },
      { title: "Unbound - Avenged Sevenfold", search: "Avenged Sevenfold Unbound", mood: "unbound", description: "breaking free from constraints" },
      { title: "Buried Alive - Avenged Sevenfold", search: "Avenged Sevenfold Buried Alive", mood: "buried", description: "nightmare album epic" },
      { title: "Natural Born Killer - Avenged Sevenfold", search: "Avenged Sevenfold Natural Born Killer", mood: "killer", description: "born to kill instinct" },
      { title: "Danger Line - Avenged Sevenfold", search: "Avenged Sevenfold Danger Line", mood: "danger", description: "crossing the danger line" },
      { title: "God Only Knows - Avenged Sevenfold", search: "Avenged Sevenfold God Only Knows", mood: "god", description: "only god knows the truth" },
      { title: "Victim - Avenged Sevenfold", search: "Avenged Sevenfold Victim", mood: "victim", description: "victim of circumstance" },
      { title: "Tonight the World Dies - Avenged Sevenfold", search: "Avenged Sevenfold Tonight the World Dies", mood: "apocalyptic", description: "world ending tonight" },
      { title: "Fiction - Avenged Sevenfold", search: "Avenged Sevenfold Fiction", mood: "fiction", description: "the rev's final song" },
      { title: "Save Me - Avenged Sevenfold", search: "Avenged Sevenfold Save Me", mood: "saving", description: "save me from myself" },
      { title: "Shepherd of Fire - Avenged Sevenfold", search: "Avenged Sevenfold Shepherd of Fire", mood: "fire", description: "hail to the king opener" },
      { title: "Coming Home - Avenged Sevenfold", search: "Avenged Sevenfold Coming Home", mood: "home", description: "returning home theme" },
      { title: "This Means War - Avenged Sevenfold", search: "Avenged Sevenfold This Means War", mood: "war", description: "declaration of war" },
      { title: "Wrong Side of Heaven - Five Finger Death Punch", search: "Five Finger Death Punch Wrong Side of Heaven", mood: "fallen", description: "ivan moody's pain" },
      { title: "Jekyll and Hyde - Five Finger Death Punch", search: "Five Finger Death Punch Jekyll and Hyde", mood: "split", description: "duality of man" },
      { title: "Bad Company - Five Finger Death Punch", search: "Five Finger Death Punch Bad Company", mood: "cover", description: "cover done right" },
      { title: "Freak on a Leash - Korn", search: "Korn Freak on a Leash", mood: "freaky", description: "jonathan davis innovation" },
      { title: "Falling Away from Me - Korn", search: "Korn Falling Away from Me", mood: "falling", description: "issues era perfection" },
      { title: "Blind - Korn", search: "Korn Blind", mood: "blind", description: "nu metal pioneers" },
      { title: "Dragula - Rob Zombie", search: "Rob Zombie Dragula", mood: "monster", description: "horror metal king 👹" },
      { title: "Living Dead Girl - Rob Zombie", search: "Rob Zombie Living Dead Girl", mood: "undead", description: "hellbilly deluxe era" },
      { title: "More Human Than Human - White Zombie", search: "White Zombie More Human Than Human", mood: "inhuman", description: "astro creep 2000" },
      { title: "King Kill 33Â° - Marilyn Manson", search: "Marilyn Manson King Kill 33", mood: "conspiracy", description: "king kill 33 degrees conspiracy" },
      { title: "Du Hast - Rammstein", search: "Rammstein Du Hast", mood: "german", description: "industrial metal perfection" },
      { title: "Feuer Frei - Rammstein", search: "Rammstein Feuer Frei", mood: "fire", description: "till lindemann's power" },
      { title: "Amerika - Rammstein", search: "Rammstein Amerika", mood: "american", description: "wir leben alle unter dem amerikanischen traum" },
      { title: "Wollt Ihr Das Bett in Flammen Sehen - Rammstein", search: "Rammstein Wollt Ihr Das Bett in Flammen Sehen", mood: "flames", description: "herzeleid era industrial power" },
      { title: "Der Meister - Rammstein", search: "Rammstein Der Meister", mood: "master", description: "the master of industrial metal" },
      { title: "Weisses Fleisch - Rammstein", search: "Rammstein Weisses Fleisch", mood: "flesh", description: "white flesh and dark themes" },
      { title: "Asche zu Asche - Rammstein", search: "Rammstein Asche zu Asche", mood: "ashes", description: "ashes to ashes industrial style" },
      { title: "Seemann - Rammstein", search: "Rammstein Seemann", mood: "sailor", description: "sailor's lament in german" },
      { title: "Du Riechst So Gut - Rammstein", search: "Rammstein Du Riechst So Gut", mood: "scent", description: "you smell so good dark romance" },
      { title: "Das Alte Leid - Rammstein", search: "Rammstein Das Alte Leid", mood: "suffering", description: "the old suffering theme" },
      { title: "Heirate Mich - Rammstein", search: "Rammstein Heirate Mich", mood: "marriage", description: "marry me says till lindemann" },
      { title: "Herzeleid - Rammstein", search: "Rammstein Herzeleid", mood: "heartbreak", description: "heartbreak in industrial german" },
      { title: "Laichzeit - Rammstein", search: "Rammstein Laichzeit", mood: "spawning", description: "spawning time primal energy" },
      { title: "Rammstein - Rammstein", search: "Rammstein Rammstein", mood: "ramming", description: "the song that named the band" },
      { title: "Sehnsucht - Rammstein", search: "Rammstein Sehnsucht", mood: "longing", description: "sehnsucht album title track perfection" },
      { title: "Engel - Rammstein", search: "Rammstein Engel", mood: "angel", description: "angel with industrial wings" },
      { title: "Tier - Rammstein", search: "Rammstein Tier", mood: "animal", description: "animal instincts unleashed" },
      { title: "Bestrafe Mich - Rammstein", search: "Rammstein Bestrafe Mich", mood: "punishment", description: "punish me industrial style" },
      { title: "BÃ¼ck Dich - Rammstein", search: "Rammstein Buck Dich", mood: "provocative", description: "controversial rammstein at its peak" },
      { title: "Spiel Mit Mir - Rammstein", search: "Rammstein Spiel Mit Mir", mood: "games", description: "play with me dark invitation" },
      { title: "Klavier - Rammstein", search: "Rammstein Klavier", mood: "piano", description: "piano meets industrial metal" },
      { title: "Alter Mann - Rammstein", search: "Rammstein Alter Mann", mood: "old", description: "old man wisdom and experience" },
      { title: "Eifersucht - Rammstein", search: "Rammstein Eifersucht", mood: "jealousy", description: "jealousy burns like fire" },
      { title: "KÃ¼ss Mich - Rammstein", search: "Rammstein Kuss Mich", mood: "kiss", description: "kiss me says the german giant" },
      { title: "Mein Herz Brennt - Rammstein", search: "Rammstein Mein Herz Brennt", mood: "burning", description: "my heart burns mutter opener" },
      { title: "Links 2 3 4 - Rammstein", search: "Rammstein Links 2 3 4", mood: "marching", description: "left 2 3 4 marching anthem" },
      { title: "Sonne - Rammstein", search: "Rammstein Sonne", mood: "sun", description: "sun industrial metal perfection ðŸŒž" },
      { title: "Ich Will - Rammstein", search: "Rammstein Ich Will", mood: "wanting", description: "i want everything rammstein desires" },
      { title: "Mutter - Rammstein", search: "Rammstein Mutter", mood: "mother", description: "mother album title track beauty" },
      { title: "Spieluhr - Rammstein", search: "Rammstein Spieluhr", mood: "music box", description: "music box mechanical precision" },
      { title: "Zwitter - Rammstein", search: "Rammstein Zwitter", mood: "hermaphrodite", description: "hermaphrodite controversial themes" },
      { title: "Rein Raus - Rammstein", search: "Rammstein Rein Raus", mood: "in out", description: "in out mechanical rhythm" },
      { title: "Adios - Rammstein", search: "Rammstein Adios", mood: "goodbye", description: "goodbye in spanish rammstein style" },
      { title: "Nebel - Rammstein", search: "Rammstein Nebel", mood: "fog", description: "fog atmospheric mutter finale" },
      { title: "Reise Reise - Rammstein", search: "Rammstein Reise Reise", mood: "journey", description: "journey journey travel anthem" },
      { title: "Mein Teil - Rammstein", search: "Rammstein Mein Teil", mood: "cannibal", description: "my part cannibal controversy" },
      { title: "Dalai Lama - Rammstein", search: "Rammstein Dalai Lama", mood: "spiritual", description: "dalai lama spiritual industrial" },
      { title: "Keine Lust - Rammstein", search: "Rammstein Keine Lust", mood: "no desire", description: "no desire depression anthem" },
      { title: "Los - Rammstein", search: "Rammstein Los", mood: "go", description: "go explosive german command" },
      { title: "Moskau - Rammstein", search: "Rammstein Moskau", mood: "moscow", description: "moscow russian industrial adventure" },
      { title: "Morgenstern - Rammstein", search: "Rammstein Morgenstern", mood: "morning star", description: "morning star weapon of choice" },
      { title: "Stein um Stein - Rammstein", search: "Rammstein Stein um Stein", mood: "stone", description: "stone by stone building walls" },
      { title: "Ohne Dich - Rammstein", search: "Rammstein Ohne Dich", mood: "without", description: "without you ballad vulnerability" },
      { title: "Amour - Rammstein", search: "Rammstein Amour", mood: "love", description: "love in french rammstein style" },
      { title: "Benzin - Rammstein", search: "Rammstein Benzin", mood: "gasoline", description: "gasoline explosive rosenrot opener" },
      { title: "Mann Gegen Mann - Rammstein", search: "Rammstein Mann Gegen Mann", mood: "man vs man", description: "man against man primal conflict" },
      { title: "Rosenrot - Rammstein", search: "Rammstein Rosenrot", mood: "red rose", description: "red rose romantic darkness" },
      { title: "Spring - Rammstein", search: "Rammstein Spring", mood: "jump", description: "jump leap of faith anthem" },
      { title: "Wo Bist Du - Rammstein", search: "Rammstein Wo Bist Du", mood: "where", description: "where are you longing ballad" },
      { title: "Stirb Nicht Vor Mir - Rammstein", search: "Rammstein Stirb Nicht Vor Mir", mood: "death", description: "don't die before me plea" },
      { title: "ZerstÃ¶ren - Rammstein", search: "Rammstein Zerstoren", mood: "destroy", description: "destroy everything industrial rage" },
      { title: "Hilf Mir - Rammstein", search: "Rammstein Hilf Mir", mood: "help", description: "help me desperate cry" },
      { title: "Te Quiero Puta - Rammstein", search: "Rammstein Te Quiero Puta", mood: "spanish", description: "spanish curse words rammstein" },
      { title: "Feuer und Wasser - Rammstein", search: "Rammstein Feuer und Wasser", mood: "elements", description: "fire and water elemental power" },
      { title: "Ein Lied - Rammstein", search: "Rammstein Ein Lied", mood: "song", description: "a song about making songs" },
      { title: "Rammlied - Rammstein", search: "Rammstein Rammlied", mood: "ram song", description: "ram song liebe ist opener" },
      { title: "Ich Tu Dir Weh - Rammstein", search: "Rammstein Ich Tu Dir Weh", mood: "hurt", description: "i hurt you pain anthem" },
      { title: "Waidmanns Heil - Rammstein", search: "Rammstein Waidmanns Heil", mood: "hunter", description: "hunter's salvation hunting theme" },
      { title: "Haifisch - Rammstein", search: "Rammstein Haifisch", mood: "shark", description: "shark predator in the water" },
      { title: "B******** - Rammstein", search: "Rammstein Buckstabu", mood: "explicit", description: "controversial explicit rammstein" },
      { title: "Wiener Blut - Rammstein", search: "Rammstein Wiener Blut", mood: "vienna", description: "vienna blood austrian darkness" },
      { title: "Pussy - Rammstein", search: "Rammstein Pussy", mood: "provocative", description: "pussy controversial multilingual" },
      { title: "Liebe Ist FÃ¼r Alle Da - Rammstein", search: "Rammstein Liebe Ist Fur Alle Da", mood: "love", description: "love is there for everyone" },
      { title: "Mehr - Rammstein", search: "Rammstein Mehr", mood: "more", description: "more always wanting more" },
      { title: "Roter Sand - Rammstein", search: "Rammstein Roter Sand", mood: "red sand", description: "red sand desert imagery" },
      { title: "FÃ¼hre Mich - Rammstein", search: "Rammstein Fuhre Mich", mood: "lead", description: "lead me guidance request" },
      { title: "Deutschland - Rammstein", search: "Rammstein Deutschland", mood: "germany", description: "deutschland controversial masterpiece ðŸ‡©ðŸ‡ª" },
      { title: "Radio - Rammstein", search: "Rammstein Radio", mood: "radio", description: "radio waves and nostalgia" },
      { title: "Zeig Dich - Rammstein", search: "Rammstein Zeig Dich", mood: "show", description: "show yourself revelation theme" },
      { title: "AuslÃ¤nder - Rammstein", search: "Rammstein Auslander", mood: "foreigner", description: "foreigner multilingual anthem" },
      { title: "Sex - Rammstein", search: "Rammstein Sex", mood: "sex", description: "sex simple and direct" },
      { title: "Puppe - Rammstein", search: "Rammstein Puppe", mood: "doll", description: "doll creepy childhood trauma" },
      { title: "Was Ich Liebe - Rammstein", search: "Rammstein Was Ich Liebe", mood: "love", description: "what i love destruction theme" },
      { title: "Diamant - Rammstein", search: "Rammstein Diamant", mood: "diamond", description: "diamond precious and hard" },
      { title: "Weit Weg - Rammstein", search: "Rammstein Weit Weg", mood: "far away", description: "far away distance and longing" },
      { title: "Tattoo - Rammstein", search: "Rammstein Tattoo", mood: "tattoo", description: "tattoo permanent marks" },
      { title: "Hallomann - Rammstein", search: "Rammstein Hallomann", mood: "hello man", description: "hello man strange greeting" },
      { title: "Armee der Tristen - Rammstein", search: "Rammstein Armee der Tristen", mood: "sad army", description: "army of the sad zeit opener" },
      { title: "Zeit - Rammstein", search: "Rammstein Zeit", mood: "time", description: "time title track about mortality" },
      { title: "Schwarz - Rammstein", search: "Rammstein Schwarz", mood: "black", description: "black darkness overwhelming" },
      { title: "Giftig - Rammstein", search: "Rammstein Giftig", mood: "toxic", description: "toxic poisonous relationships" },
      { title: "Zick Zack - Rammstein", search: "Rammstein Zick Zack", mood: "zigzag", description: "zick zack plastic surgery theme" },
      { title: "OK - Rammstein", search: "Rammstein OK", mood: "ok", description: "ok simple acceptance" },
      { title: "Meine TrÃ¤nen - Rammstein", search: "Rammstein Meine Tranen", mood: "tears", description: "my tears emotional vulnerability" },
      { title: "Angst - Rammstein", search: "Rammstein Angst", mood: "fear", description: "fear anxiety industrial style" },
      { title: "Dicke Titten - Rammstein", search: "Rammstein Dicke Titten", mood: "provocative", description: "provocative rammstein humor" },
      { title: "LÃ¼gen - Rammstein", search: "Rammstein Lugen", mood: "lies", description: "lies deception and truth" },
      { title: "Adieu - Rammstein", search: "Rammstein Adieu", mood: "farewell", description: "farewell zeit album finale" },
      { title: "Blitzkrieg - Deathstars", search: "Deathstars Blitzkrieg", mood: "war", description: "swedish industrial metal perfection ðŸ‡¸ðŸ‡ª" },
      { title: "Synthetic Generation - Deathstars", search: "Deathstars Synthetic Generation", mood: "synthetic", description: "synthetic generation cyberpunk vibes" },
      { title: "Semiconductor - Deathstars", search: "Deathstars Semiconductor", mood: "electronic", description: "semiconductor industrial electronics" },
      { title: "Trinity Fields - Deathstars", search: "Deathstars Trinity Fields", mood: "trinity", description: "trinity fields apocalyptic landscape" },
      { title: "Motherzone - Deathstars", search: "Deathstars Motherzone", mood: "mother", description: "motherzone protective industrial" },
      { title: "Asphalt - Deathstars", search: "Deathstars Asphalt", mood: "urban", description: "asphalt city street industrial" },
      { title: "Greatest Fight on Earth - Deathstars", search: "Deathstars Greatest Fight on Earth", mood: "fight", description: "greatest fight circus of violence" },
      { title: "The Last Ammunition - Deathstars", search: "Deathstars The Last Ammunition", mood: "ammunition", description: "last ammunition final bullet" },
      { title: "Virtue to Vice - Deathstars", search: "Deathstars Virtue to Vice", mood: "virtue", description: "virtue to vice moral decline" },
      { title: "Termination Bliss - Deathstars", search: "Deathstars Termination Bliss", mood: "termination", description: "termination bliss album title track" },
      { title: "New Dead Nation - Deathstars", search: "Deathstars New Dead Nation", mood: "nation", description: "new dead nation dystopian anthem" },
      { title: "Modern Death - Deathstars", search: "Deathstars Modern Death", mood: "modern", description: "modern death contemporary decay" },
      { title: "The Revolution Exodus - Deathstars", search: "Deathstars The Revolution Exodus", mood: "revolution", description: "revolution exodus uprising theme" },
      { title: "Little Angel - Deathstars", search: "Deathstars Little Angel", mood: "angel", description: "little angel corrupted innocence" },
      { title: "Explode - Deathstars", search: "Deathstars Explode", mood: "explode", description: "explode demolition energy" },
      { title: "Cyanide - Deathstars", search: "Deathstars Cyanide", mood: "poison", description: "cyanide lethal chemical romance" },
      { title: "Death Dies Hard - Deathstars", search: "Deathstars Death Dies Hard", mood: "death", description: "death dies hard immortal concept" },
      { title: "White Wedding - Deathstars", search: "Deathstars White Wedding", mood: "wedding", description: "white wedding billy idol cover" },
      { title: "Opium - Deathstars", search: "Deathstars Opium", mood: "opium", description: "opium narcotic industrial haze" },
      { title: "Blood Stains Blondes - Deathstars", search: "Deathstars Blood Stains Blondes", mood: "blood", description: "blood stains blondes violent beauty" },
      { title: "Play God - Deathstars", search: "Deathstars Play God", mood: "god", description: "play god divine manipulation" },
      { title: "Babylon - Deathstars", search: "Deathstars Babylon", mood: "babylon", description: "babylon ancient evil empire" },
      { title: "Tongues - Deathstars", search: "Deathstars Tongues", mood: "tongues", description: "tongues speaking in darkness" },
      { title: "Via the End - Deathstars", search: "Deathstars Via the End", mood: "end", description: "via the end journey to oblivion" },
      { title: "Razor - Deathstars", search: "Deathstars Razor", mood: "razor", description: "razor sharp cutting edge" },
      { title: "Metal - Deathstars", search: "Deathstars Metal", mood: "metal", description: "metal industrial anthem perfection" },
      { title: "Mark of the Gun - Deathstars", search: "Deathstars Mark of the Gun", mood: "gun", description: "mark of the gun weapon stigma" },
      { title: "Night Electric Night - Deathstars", search: "Deathstars Night Electric Night", mood: "electric", description: "night electric night cyberpunk energy" },
      { title: "All the Devil's Toys - Deathstars", search: "Deathstars All the Devil's Toys", mood: "devil", description: "all the devil's toys playthings" },
      { title: "Death in Vogue - Deathstars", search: "Deathstars Death in Vogue", mood: "vogue", description: "death in vogue fashionable demise" },
      { title: "Temple of the Insects - Deathstars", search: "Deathstars Temple of the Insects", mood: "insects", description: "temple of insects swarm worship" },
      { title: "Gamma Ray - Deathstars", search: "Deathstars Gamma Ray", mood: "radiation", description: "gamma ray radioactive energy" },
      { title: "Bodies - Deathstars", search: "Deathstars Bodies", mood: "bodies", description: "bodies corpses everywhere" },
      { title: "Ghost Reviver - Deathstars", search: "Deathstars Ghost Reviver", mood: "ghost", description: "ghost reviver resurrection theme" },
      { title: "The Fuel Ignites - Deathstars", search: "Deathstars The Fuel Ignites", mood: "fuel", description: "the fuel ignites combustion point" },
      { title: "Noise Cuts - Deathstars", search: "Deathstars Noise Cuts", mood: "noise", description: "noise cuts sonic violence" },
      { title: "Perfect Defect - Deathstars", search: "Deathstars Perfect Defect", mood: "defect", description: "perfect defect beautiful flaw" },
      { title: "This Machine - Deathstars", search: "Deathstars This Machine", mood: "machine", description: "this machine industrial precision" },
      { title: "Fire Galore - Deathstars", search: "Deathstars Fire Galore", mood: "fire", description: "fire galore abundance of flames" },
      { title: "Midnight Party - Deathstars", search: "Deathstars Midnight Party", mood: "party", description: "midnight party dark celebration" }
    ],
    horrorcoreHipHop: [
      { title: "Great Milenko - Insane Clown Posse", search: "Insane Clown Posse Great Milenko", mood: "circus", description: "the great milenko himself 🎪" },
      { title: "Hokus Pokus - Insane Clown Posse", search: "Insane Clown Posse Hokus Pokus", mood: "magic", description: "alakazam alakazoo juggalo magic" },
      { title: "Piggy Pie - Insane Clown Posse", search: "Insane Clown Posse Piggy Pie", mood: "violent", description: "three little piggies to make a piggy pie" },
      { title: "How Many Times - Insane Clown Posse", search: "Insane Clown Posse How Many Times", mood: "repetitive", description: "snoop dogg collaboration classic" },
      { title: "Southwest Voodoo - Insane Clown Posse", search: "Insane Clown Posse Southwest Voodoo", mood: "voodoo", description: "alice cooper collaboration" },
      { title: "Halls of Illusions - Insane Clown Posse", search: "Insane Clown Posse Halls of Illusions", mood: "illusion", description: "what you see is not what you get" },
      { title: "Under the Moon - Insane Clown Posse", search: "Insane Clown Posse Under the Moon", mood: "moon", description: "violence and wicked clowns" },
      { title: "What Is a Juggalo - Insane Clown Posse", search: "Insane Clown Posse What Is a Juggalo", mood: "identity", description: "defining the juggalo family" },
      { title: "House of Horrors - Insane Clown Posse", search: "Insane Clown Posse House of Horrors", mood: "horror", description: "welcome to our house of horrors" },
      { title: "Boogie Woogie Wu - Insane Clown Posse", search: "Insane Clown Posse Boogie Woogie Wu", mood: "boogie", description: "the boogie woogie man is comin" },
      { title: "The Neden Game - Insane Clown Posse", search: "Insane Clown Posse The Neden Game", mood: "game", description: "dating game show from hell" },
      { title: "Hellalujah - Insane Clown Posse", search: "Insane Clown Posse Hellalujah", mood: "hellish", description: "praise be to the dark carnival" },
      { title: "Absolute Power - Tech N9ne", search: "Tech N9ne Absolute Power", mood: "power", description: "tech n9ne's absolute power 🔥" },
      { title: "The Industry Is Punks - Tech N9ne", search: "Tech N9ne The Industry Is Punks", mood: "industry", description: "calling out the fake industry" },
      { title: "Here Comes Tecca Nina - Tech N9ne", search: "Tech N9ne Here Comes Tecca Nina", mood: "arrival", description: "the tecca nina has arrived" },
      { title: "Slacker - Tech N9ne", search: "Tech N9ne Slacker", mood: "lazy", description: "they call me a slacker" },
      { title: "This Ring - Tech N9ne", search: "Tech N9ne This Ring", mood: "ring", description: "married to the game" },
      { title: "Psycho Bitch - Tech N9ne", search: "Tech N9ne Psycho Bitch", mood: "psycho", description: "dealing with crazy women" },
      { title: "Questions - Tech N9ne", search: "Tech N9ne Questions", mood: "questions", description: "asking all the right questions" },
      { title: "Tormented - Tech N9ne", search: "Tech N9ne Tormented", mood: "torment", description: "the pain inside tech's mind" },
      { title: "Cursed - Tech N9ne", search: "Tech N9ne Cursed", mood: "cursed", description: "am i cursed or am i blessed" },
      { title: "Siccmade - Brotha Lynch Hung", search: "Brotha Lynch Hung Siccmade", mood: "sicc", description: "sacramento's sickest rapper 🩸" },
      { title: "Locc 2 da Brain - Brotha Lynch Hung", search: "Brotha Lynch Hung Locc 2 da Brain", mood: "brain", description: "locked to the brain insane" },
      { title: "Meat Cleaver - Brotha Lynch Hung", search: "Brotha Lynch Hung Meat Cleaver", mood: "cleaver", description: "chopping bodies with the meat cleaver" },
      { title: "Return of da Baby Killa - Brotha Lynch Hung", search: "Brotha Lynch Hung Return of da Baby Killa", mood: "killer", description: "the baby killa returns" },
      { title: "Refuse to Lose - Brotha Lynch Hung", search: "Brotha Lynch Hung Refuse to Lose", mood: "refuse", description: "i refuse to lose in this game" },
      { title: "Lose Yourself - Eminem", search: "Eminem Lose Yourself", mood: "motivated", description: "8 mile soundtrack perfection 🎤" },
      { title: "Stan - Eminem", search: "Eminem Stan", mood: "obsessive", description: "marshall mathers lp storytelling" },
      { title: "The Real Slim Shady - Eminem", search: "Eminem The Real Slim Shady", mood: "playful", description: "will the real slim shady please stand up" },
      { title: "Without Me - Eminem", search: "Eminem Without Me", mood: "arrogant", description: "guess who's back back again" },
      { title: "My Name Is - Eminem", search: "Eminem My Name Is", mood: "introduction", description: "slim shady lp breakthrough" },
      { title: "The Way I Am - Eminem", search: "Eminem The Way I Am", mood: "defiant", description: "this is just the way i am" },
      { title: "Kill You - Eminem", search: "Eminem Kill You", mood: "violent", description: "marshall mathers lp aggression" },
      { title: "Kim - Eminem", search: "Eminem Kim", mood: "murderous", description: "controversial wife murder fantasy" },
      { title: "Cleaning Out My Closet - Eminem", search: "Eminem Cleaning Out My Closet", mood: "confessional", description: "eminem show vulnerability" },
      { title: "Sing for the Moment - Eminem", search: "Eminem Sing for the Moment", mood: "reflective", description: "aerosmith sample classic" },
      { title: "Business - Eminem", search: "Eminem Business", mood: "business", description: "let's get down to business" },
      { title: "Not Afraid - Eminem", search: "Eminem Not Afraid", mood: "recovery", description: "recovery album anthem" },
      { title: "Love the Way You Lie - Eminem", search: "Eminem Love the Way You Lie", mood: "toxic", description: "rihanna collaboration domestic violence" },
      { title: "Rap God - Eminem", search: "Eminem Rap God", mood: "godlike", description: "technical rap mastery display" },
      { title: "The Monster - Eminem", search: "Eminem The Monster", mood: "monster", description: "rihanna collaboration sequel" },
      { title: "Godzilla - Eminem", search: "Eminem Godzilla", mood: "monstrous", description: "juice wrld collaboration speed rap" },
      { title: "I'm Not Racist - Joyner Lucas", search: "Joyner Lucas I'm Not Racist", mood: "controversial", description: "raw social commentary perfection 🎤" },
      { title: "ADHD - Joyner Lucas", search: "Joyner Lucas ADHD", mood: "hyperactive", description: "mental health awareness anthem" },
      { title: "Will - Joyner Lucas", search: "Joyner Lucas Will", mood: "biographical", description: "joyner's personal story telling" },
      { title: "ISIS - Joyner Lucas", search: "Joyner Lucas ISIS Logic", mood: "intense", description: "logic collaboration fire" },
      { title: "Revenge - Joyner Lucas", search: "Joyner Lucas Revenge", mood: "vengeful", description: "revenge storytelling masterpiece" },
      { title: "Lucky You - Joyner Lucas", search: "Joyner Lucas Lucky You Eminem", mood: "lucky", description: "eminem collaboration classic" },
      { title: "Bank Account - Joyner Lucas", search: "Joyner Lucas Bank Account Remix", mood: "money", description: "21 savage remix perfection" },
      { title: "Winter Blues - Joyner Lucas", search: "Joyner Lucas Winter Blues", mood: "melancholy", description: "seasonal depression vibes" },
      { title: "Devil's Work - Joyner Lucas", search: "Joyner Lucas Devil's Work", mood: "spiritual", description: "questioning god's plan" },
      { title: "Lotto - Joyner Lucas", search: "Joyner Lucas Lotto", mood: "gambling", description: "life is like the lottery" },
      { title: "Ross Capicchioni - Joyner Lucas", search: "Joyner Lucas Ross Capicchioni", mood: "survivor", description: "true crime storytelling genius" },
      { title: "Keep It 100 - Joyner Lucas", search: "Joyner Lucas Keep It 100", mood: "honest", description: "keeping it real joyner style" },
      { title: "Ultrasound - Joyner Lucas", search: "Joyner Lucas Ultrasound", mood: "parental", description: "unborn child perspective" },
      { title: "DNA - Joyner Lucas", search: "Joyner Lucas DNA Remix", mood: "genetic", description: "kendrick lamar remix fire" },
      { title: "Mask Off - Joyner Lucas", search: "Joyner Lucas Mask Off Remix", mood: "masked", description: "future remix with substance" },
      { title: "Big Fish - Vince Staples", search: "Vince Staples Big Fish", mood: "aquatic", description: "big fish theory perfection 🐟" },
      { title: "Norf Norf - Vince Staples", search: "Vince Staples Norf Norf", mood: "aggressive", description: "long beach aggression raw" },
      { title: "Señorita - Vince Staples", search: "Vince Staples Senorita", mood: "romantic", description: "future collaboration smooth" },
      { title: "Yeah Right - Vince Staples", search: "Vince Staples Yeah Right", mood: "sarcastic", description: "kendrick production perfection" },
      { title: "Fun! - Vince Staples", search: "Vince Staples Fun", mood: "fun", description: "big fish theory standout" },
      { title: "Bagbak - Vince Staples", search: "Vince Staples Bagbak", mood: "confident", description: "vince staples swagger anthem" },
      { title: "745 - Vince Staples", search: "Vince Staples 745", mood: "numerical", description: "hell can wait ep classic" },
      { title: "Blue Suede - Vince Staples", search: "Vince Staples Blue Suede", mood: "blue", description: "elvis reference vince style" },
      { title: "MAGIC - Vince Staples", search: "Vince Staples MAGIC", mood: "magical", description: "self titled album energy" },
      { title: "Law of Averages - Vince Staples", search: "Vince Staples Law of Averages", mood: "mathematical", description: "statistical vince perfection" },
      { title: "Lift Me Up - Vince Staples", search: "Vince Staples Lift Me Up", mood: "uplifting", description: "summertime 06 era classic" },
      { title: "Prima Donna - Vince Staples", search: "Vince Staples Prima Donna", mood: "dramatic", description: "prima donna ep title track" },
      { title: "War Ready - Vince Staples", search: "Vince Staples War Ready", mood: "warfare", description: "ready for war vince style" },
      { title: "Hands Up - Vince Staples", search: "Vince Staples Hands Up", mood: "surrender", description: "social commentary perfection" },
      { title: "Street Punks - Vince Staples", search: "Vince Staples Street Punks", mood: "punk", description: "hell can wait street energy" },
      { title: "Suicide - Frankie Teardrop", search: "Suicide Frankie Teardrop", mood: "suicidal", description: "industrial horror classic" },
      { title: "Crossroads - Bone Thugs", search: "Bone Thugs N Harmony Crossroads", mood: "crossroads", description: "cleveland harmony horror" },
      { title: "Diary of a Madman - Gravediggaz", search: "Gravediggaz Diary of a Madman", mood: "insane", description: "horror rap pioneers" },
      { title: "Mind Playing Tricks - Geto Boys", search: "Geto Boys Mind Playing Tricks on Me", mood: "paranoid", description: "houston horror classics" },
      { title: "Stay Fly - Three 6 Mafia", search: "Three 6 Mafia Stay Fly", mood: "flying", description: "memphis horror rap" }
    ],
    electronicRave: [
      { title: "Booyah - Showtek", search: "Showtek Booyah We Are Loud Sonny Wilson", mood: "energetic", description: "showtek party anthem perfection 🎧" },
      { title: "Cannonball - Showtek", search: "Showtek Cannonball Earthquake", mood: "explosive", description: "earthquake bass drops insane" },
      { title: "We Like to Party - Showtek", search: "Showtek We Like to Party", mood: "party", description: "hardstyle party perfection" },
      { title: "Bad - Showtek", search: "Showtek Bad", mood: "bad", description: "showtek going bad vibes" },
      { title: "Believer - Showtek", search: "Showtek Believer", mood: "belief", description: "believe in the drop" },
      { title: "Satisfied - Showtek", search: "Showtek Satisfied", mood: "satisfied", description: "satisfaction guaranteed showtek" },
      { title: "Booty Time - Showtek", search: "Showtek Booty Time", mood: "booty", description: "booty time showtek style" },
      { title: "Black - Showtek", search: "Showtek Black", mood: "dark", description: "dark showtek energy" },
      { title: "Mellow - Showtek", search: "Showtek Mellow", mood: "mellow", description: "mellow showtek vibes" },
      { title: "Slow Down - Showtek", search: "Showtek Slow Down", mood: "slow", description: "slow it down showtek" },
      { title: "Don't You Worry Child - Swedish House Mafia", search: "Swedish House Mafia Don't You Worry Child", mood: "nostalgic", description: "emotional rave farewell anthem 🇸🇪" },
      { title: "Save the World - Swedish House Mafia", search: "Swedish House Mafia Save the World", mood: "heroic", description: "save the world with bass drops" },
      { title: "One - Swedish House Mafia", search: "Swedish House Mafia One Your Name", mood: "unity", description: "swedish house mafia unity" },
      { title: "Greyhound - Swedish House Mafia", search: "Swedish House Mafia Greyhound", mood: "fast", description: "greyhound speed racing" },
      { title: "Miami 2 Ibiza - Swedish House Mafia", search: "Swedish House Mafia Miami 2 Ibiza", mood: "travel", description: "party destination anthem" },
      { title: "Animals - Martin Garrix", search: "Martin Garrix Animals", mood: "wild", description: "animals big room house classic 🐘" },
      { title: "Wizard - Martin Garrix", search: "Martin Garrix Wizard", mood: "magical", description: "wizard magic martin garrix" },
      { title: "Gold Skies - Martin Garrix", search: "Martin Garrix Gold Skies Sander van Doorn DVBBS", mood: "golden", description: "gold skies collaboration perfection" },
      { title: "Proxy - Martin Garrix", search: "Martin Garrix Proxy", mood: "proxy", description: "proxy martin garrix energy" },
      { title: "Forbidden Voices - Martin Garrix", search: "Martin Garrix Forbidden Voices", mood: "forbidden", description: "forbidden voices calling" },
      { title: "Spaceman - Hardwell", search: "Hardwell Spaceman", mood: "cosmic", description: "spaceman hardwell cosmic journey 🚀" },
      { title: "Apollo - Hardwell", search: "Hardwell Apollo", mood: "apollo", description: "apollo god hardwell style" },
      { title: "Never Say Goodbye - Hardwell", search: "Hardwell Never Say Goodbye", mood: "eternal", description: "never say goodbye hardwell" },
      { title: "Eclipse - Hardwell", search: "Hardwell Eclipse", mood: "eclipse", description: "solar eclipse hardwell style" },
      { title: "Zero Seventy Six - Hardwell", search: "Hardwell Zero Seventy Six", mood: "numerical", description: "076 hardwell perfection" },
      { title: "The Business - Tiësto", search: "Tiesto The Business", mood: "business", description: "tiësto business time perfection 💼" },
      { title: "Wasted - Tiësto", search: "Tiesto Wasted Matthew Koma", mood: "wasted", description: "wasted tiësto collaboration" },
      { title: "Red Lights - Tiësto", search: "Tiesto Red Lights", mood: "warning", description: "red lights tiësto warning" },
      { title: "Adagio for Strings - Tiësto", search: "Tiesto Adagio for Strings", mood: "classical", description: "classical tiësto masterpiece" },
      { title: "Traffic - Tiësto", search: "Tiesto Traffic", mood: "traffic", description: "traffic tiësto rush hour" },
      { title: "Blah Blah Blah - Armin van Buuren", search: "Armin van Buuren Blah Blah Blah", mood: "talkative", description: "blah blah blah armin perfection 🗣️" },
      { title: "This Is What It Feels Like - Armin van Buuren", search: "Armin van Buuren This Is What It Feels Like", mood: "feeling", description: "trevor guthrie collaboration magic" },
      { title: "Another You - Armin van Buuren", search: "Armin van Buuren Another You", mood: "romantic", description: "another you armin romance" },
      { title: "Great Spirit - Armin van Buuren", search: "Armin van Buuren Great Spirit Vini Vici", mood: "spiritual", description: "great spirit tribal energy" },
      { title: "Therapy - Armin van Buuren", search: "Armin van Buuren Therapy", mood: "healing", description: "therapy session armin style" },
      { title: "Tremor - Dimitri Vegas & Like Mike", search: "Dimitri Vegas Like Mike Tremor", mood: "earthquake", description: "tremor earth shaking bass 🌍" },
      { title: "Higher Place - Dimitri Vegas & Like Mike", search: "Dimitri Vegas Like Mike Higher Place", mood: "elevated", description: "higher place spiritual journey" },
      { title: "The Hum - Dimitri Vegas & Like Mike", search: "Dimitri Vegas Like Mike The Hum", mood: "humming", description: "the hum mysterious energy" },
      { title: "Mammoth - Dimitri Vegas & Like Mike", search: "Dimitri Vegas Like Mike Mammoth", mood: "massive", description: "mammoth size energy drops" },
      { title: "Ocarina - Dimitri Vegas & Like Mike", search: "Dimitri Vegas Like Mike Ocarina", mood: "mystical", description: "ocarina mystical instrument" },
      { title: "Bigfoot - W&W", search: "W&W Bigfoot", mood: "legendary", description: "bigfoot w&w legendary creature 🦶" },
      { title: "Thunder - W&W", search: "W&W Thunder", mood: "thunder", description: "thunder w&w storm energy" },
      { title: "Rocket - W&W", search: "W&W Rocket", mood: "rocket", description: "rocket w&w space launch" },
      { title: "Lift Off - W&W", search: "W&W Lift Off", mood: "launch", description: "lift off w&w takeoff" },
      { title: "Impact - W&W", search: "W&W Impact", mood: "impact", description: "impact w&w collision" },
      { title: "Ghosts 'n' Stuff - Deadmau5", search: "Deadmau5 Ghosts n Stuff", mood: "ghostly", description: "ghosts n stuff deadmau5 classic 👻" },
      { title: "Strobe - Deadmau5", search: "Deadmau5 Strobe", mood: "strobing", description: "strobe deadmau5 progressive epic" },
      { title: "I Remember - Deadmau5", search: "Deadmau5 I Remember Kaskade", mood: "memory", description: "i remember deadmau5 nostalgia" },
      { title: "The Veldt - Deadmau5", search: "Deadmau5 The Veldt", mood: "veldt", description: "the veldt deadmau5 storytelling" },
      { title: "Professional Griefers - Deadmau5", search: "Deadmau5 Professional Griefers", mood: "gaming", description: "professional griefers gaming anthem" },
      { title: "Feel So Close - Calvin Harris", search: "Calvin Harris Feel So Close", mood: "intimate", description: "feel so close calvin harris emotion 💖" },
      { title: "We Found Love - Calvin Harris", search: "Calvin Harris We Found Love Rihanna", mood: "love", description: "we found love rihanna collaboration" },
      { title: "Summer - Calvin Harris", search: "Calvin Harris Summer", mood: "summer", description: "summer calvin harris season" },
      { title: "This Is What You Came For - Calvin Harris", search: "Calvin Harris This Is What You Came For", mood: "purpose", description: "rihanna collaboration banger" },
      { title: "One Kiss - Calvin Harris", search: "Calvin Harris One Kiss Dua Lipa", mood: "romantic", description: "one kiss dua lipa perfection" },
      { title: "Titanium - David Guetta", search: "David Guetta Titanium Sia", mood: "indestructible", description: "titanium sia vocals perfection 💎" },
      { title: "When Love Takes Over - David Guetta", search: "David Guetta When Love Takes Over Kelly Rowland", mood: "love", description: "when love takes over anthem" },
      { title: "Memories - David Guetta", search: "David Guetta Memories Kid Cudi", mood: "nostalgic", description: "memories kid cudi collaboration" },
      { title: "Without You - David Guetta", search: "David Guetta Without You Usher", mood: "missing", description: "without you usher vocals" },
      { title: "Hey Mama - David Guetta", search: "David Guetta Hey Mama Nicki Minaj", mood: "maternal", description: "hey mama nicki minaj energy" },
      { title: "Levels - Avicii", search: "Avicii Levels", mood: "elevated", description: "levels avicii eternal classic ⬆️" },
      { title: "Wake Me Up - Avicii", search: "Avicii Wake Me Up", mood: "awakening", description: "wake me up avicii country edm" },
      { title: "Hey Brother - Avicii", search: "Avicii Hey Brother", mood: "brotherhood", description: "hey brother avicii family" },
      { title: "Waiting for Love - Avicii", search: "Avicii Waiting for Love", mood: "waiting", description: "waiting for love avicii patience" },
      { title: "Without You - Avicii", search: "Avicii Without You Sandro Cavazza", mood: "incomplete", description: "without you avicii emotion" },
      { title: "Bangarang - Skrillex", search: "Skrillex Bangarang", mood: "chaotic", description: "bangarang skrillex dubstep chaos 🔥" },
      { title: "Scary Monsters and Nice Sprites - Skrillex", search: "Skrillex Scary Monsters and Nice Sprites", mood: "scary", description: "scary monsters skrillex classic" },
      { title: "First of the Year - Skrillex", search: "Skrillex First of the Year Equinox", mood: "beginning", description: "first of the year skrillex" },
      { title: "Cinema - Skrillex", search: "Skrillex Cinema Benny Benassi", mood: "cinematic", description: "cinema skrillex remix perfection" },
      { title: "Where Are Ü Now - Skrillex", search: "Skrillex Where Are U Now Justin Bieber Diplo", mood: "searching", description: "where are u now collaboration" },
      { title: "Closer - The Chainsmokers", search: "The Chainsmokers Closer Halsey", mood: "intimate", description: "closer halsey collaboration perfection 🔗" },
      { title: "Don't Let Me Down - The Chainsmokers", search: "The Chainsmokers Don't Let Me Down Daya", mood: "trust", description: "don't let me down daya vocals" },
      { title: "Something Just Like This - The Chainsmokers", search: "The Chainsmokers Something Just Like This Coldplay", mood: "simple", description: "coldplay collaboration magic" },
      { title: "Paris - The Chainsmokers", search: "The Chainsmokers Paris", mood: "romantic", description: "paris chainsmokers romance" },
      { title: "Roses - The Chainsmokers", search: "The Chainsmokers Roses ROZES", mood: "romantic", description: "roses rozes collaboration" },
      { title: "Alone - Marshmello", search: "Marshmello Alone", mood: "solitary", description: "alone marshmello emotion 🎭" },
      { title: "Happier - Marshmello", search: "Marshmello Happier Bastille", mood: "bittersweet", description: "happier bastille collaboration" },
      { title: "Silence - Marshmello", search: "Marshmello Silence Khalid", mood: "quiet", description: "silence khalid vocals perfection" },
      { title: "Friends - Marshmello", search: "Marshmello Friends Anne Marie", mood: "friendship", description: "friends anne marie collaboration" },
      { title: "Wolves - Marshmello", search: "Marshmello Wolves Selena Gomez", mood: "wild", description: "wolves selena gomez feature" },
      { title: "Faded - Alan Walker", search: "Alan Walker Faded", mood: "fading", description: "faded alan walker emotional journey 🌫️" },
      { title: "Sing Me to Sleep - Alan Walker", search: "Alan Walker Sing Me to Sleep", mood: "sleepy", description: "sing me to sleep lullaby" },
      { title: "Alone - Alan Walker", search: "Alan Walker Alone", mood: "lonely", description: "alone alan walker solitude" },
      { title: "Darkside - Alan Walker", search: "Alan Walker Darkside Au Ra Tomine Harket", mood: "dark", description: "darkside alan walker collaboration" },
      { title: "Diamond Heart - Alan Walker", search: "Alan Walker Diamond Heart Sophia Somajo", mood: "precious", description: "diamond heart precious love" },
      { title: "Sandstorm - Darude", search: "Darude Sandstorm", mood: "sandstorm", description: "sandstorm eternal rave meme classic 🌪️" },
      { title: "Better Off Alone - Alice Deejay", search: "Alice Deejay Better Off Alone", mood: "alone", description: "better off alone 90s classic" },
      { title: "Zombie Nation - Kernkraft 400", search: "Zombie Nation Kernkraft 400", mood: "zombie", description: "kernkraft 400 zombie classic" },
      { title: "Everybody's Free - Rozalla", search: "Rozalla Everybody's Free", mood: "freedom", description: "everybody's free to feel good" },
      { title: "What Is Love - Haddaway", search: "Haddaway What Is Love", mood: "love", description: "what is love baby don't hurt me" },
      { title: "Clarity - Zedd", search: "Zedd Clarity", mood: "clear", description: "algorithmic clarity processing with controlled transparency analysis" },
      { title: "Gecko - Oliver Heldens", search: "Oliver Heldens Gecko", mood: "reptilian", description: "algorithmic adaptation analysis with systematic survival processing" },
      { title: "Silence - Delerium", search: "Delerium Silence Sarah McLachlan", mood: "silent", description: "algorithmic silence analysis with controlled void processing" },
      { title: "For an Angel - Paul van Dyk", search: "Paul van Dyk For an Angel", mood: "angelic", description: "systematic angelic analysis with sophisticated divinity processing" },
      { title: "Gouryella - Ferry Corsten", search: "Ferry Corsten Gouryella", mood: "transcendent", description: "calculated transcendence with controlled spiritual elevation algorithms" }
    ],
    memorialSongs: [
      { title: "Cancer - My Chemical Romance", search: "My Chemical Romance Cancer", mood: "memorial", description: "for when we remember those we've lost 🥀" },
      { title: "Adam's Song - Blink-182", search: "Blink 182 Adams Song", mood: "memorial", description: "a song about loss and hope" },
      { title: "Hurt - Nine Inch Nails", search: "Nine Inch Nails Hurt", mood: "memorial", description: "raw emotion and pain" },
      { title: "Snuff - Slipknot", search: "Slipknot Snuff", mood: "memorial", description: "corey taylor's most vulnerable moment 💔" },
      { title: "So Far Away - Avenged Sevenfold", search: "Avenged Sevenfold So Far Away", mood: "memorial", description: "tribute to the rev, so beautiful" },
      { title: "Black - Pearl Jam", search: "Pearl Jam Black", mood: "memorial", description: "eddie vedder's heartbreak" },
      { title: "Mad World - Gary Jules", search: "Gary Jules Mad World", mood: "memorial", description: "donnie darko soundtrack perfection" },
      { title: "Everyone's Gone Away - Nine Inch Nails", search: "Nine Inch Nails The Day the World Went Away", mood: "memorial", description: "when everything falls apart" },
      { title: "One More Day - Diamond Rio", search: "Diamond Rio One More Day", mood: "memorial", description: "just one more day with you" },
      { title: "Tears Don't Fall - Bullet for My Valentine", search: "Bullet for My Valentine Tears Don't Fall", mood: "memorial", description: "welsh emo metal perfection" },
      { title: "Fiction - Avenged Sevenfold", search: "Avenged Sevenfold Fiction", mood: "memorial", description: "the rev's final song to the world" },
      { title: "One More Light - Linkin Park", search: "Linkin Park One More Light", mood: "memorial", description: "who cares if one more light goes out" },
      { title: "Heavy - Linkin Park", search: "Linkin Park Heavy", mood: "memorial", description: "chester's final album emotion" },
      { title: "Shadow of the Day - Linkin Park", search: "Linkin Park Shadow of the Day", mood: "memorial", description: "the sun will set for you" },
      { title: "My Immortal - Evanescence", search: "Evanescence My Immortal", mood: "memorial", description: "i'm so tired of being here" },
      { title: "The Ghost of You - My Chemical Romance", search: "My Chemical Romance The Ghost of You", mood: "memorial", description: "never coming home never coming home" },
      { title: "Famous Last Words - My Chemical Romance", search: "My Chemical Romance Famous Last Words", mood: "memorial", description: "i am not afraid to keep on living" },
      { title: "Disenchanted - My Chemical Romance", search: "My Chemical Romance Disenchanted", mood: "memorial", description: "well i was there on the day" },
      { title: "Sleep - My Chemical Romance", search: "My Chemical Romance Sleep", mood: "memorial", description: "some say now suffer all the children" },
      { title: "The Light Behind Your Eyes - My Chemical Romance", search: "My Chemical Romance The Light Behind Your Eyes", mood: "memorial", description: "so long to all my friends" },
      { title: "All I Wanted - Paramore", search: "Paramore All I Wanted", mood: "memorial", description: "all i wanted was you" },
      { title: "Misguided Ghosts - Paramore", search: "Paramore Misguided Ghosts", mood: "memorial", description: "i'm going away for a while" },
      { title: "The Only Exception - Paramore", search: "Paramore The Only Exception", mood: "memorial", description: "and you are the only exception" },
      { title: "26 - Paramore", search: "Paramore 26", mood: "memorial", description: "hold onto hope if you got it" },
      { title: "Gunslinger - Avenged Sevenfold", search: "Avenged Sevenfold Gunslinger", mood: "memorial", description: "yeah you've been alone" },
      { title: "Seize the Day - Avenged Sevenfold", search: "Avenged Sevenfold Seize the Day", mood: "memorial", description: "seize the day or die regretting" },
      { title: "Until the End - Breaking Benjamin", search: "Breaking Benjamin Until the End", mood: "memorial", description: "so clever whatever i'm done" },
      { title: "Breath - Breaking Benjamin", search: "Breaking Benjamin Breath", mood: "memorial", description: "you take my breath away" },
      { title: "Ashes of Eden - Breaking Benjamin", search: "Breaking Benjamin Ashes of Eden", mood: "memorial", description: "will the faithful find the grace" },
      { title: "Anthem of the Angels - Breaking Benjamin", search: "Breaking Benjamin Anthem of the Angels", mood: "memorial", description: "white walls surround us" },
      { title: "I Will Not Bow - Breaking Benjamin", search: "Breaking Benjamin I Will Not Bow", mood: "memorial", description: "fall back down never surrender" },
      { title: "Diary of Jane - Breaking Benjamin", search: "Breaking Benjamin Diary of Jane", mood: "memorial", description: "something's getting in the way" },
      { title: "Simple Design - Breaking Benjamin", search: "Breaking Benjamin Simple Design", mood: "memorial", description: "i live a simple life unforgotten" },
      { title: "Angels Fall - Breaking Benjamin", search: "Breaking Benjamin Angels Fall", mood: "memorial", description: "when angels fall with broken wings" },
      { title: "Close Your Eyes - Potluck", search: "Potluck Close Your Eyes", mood: "memorial", description: "for those who close their eyes forever" },
      { title: "Gone Away - The Offspring", search: "The Offspring Gone Away", mood: "memorial", description: "maybe in some other time" },
      { title: "Alone I Break - Korn", search: "Korn Alone I Break", mood: "memorial", description: "falling down against the wall" },
      { title: "So Close - Evanescence", search: "Evanescence So Close", mood: "memorial", description: "so close to touching freedom" },
      { title: "Like You - Evanescence", search: "Evanescence Like You", mood: "memorial", description: "stay low soft dark and dreamless" },
      { title: "Missing - Evanescence", search: "Evanescence Missing", mood: "memorial", description: "can you stop the fire" },
      { title: "Good Enough - Evanescence", search: "Evanescence Good Enough", mood: "memorial", description: "under your spell again" },
      { title: "The Change - Evanescence", search: "Evanescence The Change", mood: "memorial", description: "thought that i was strong" },
      { title: "Lost in Paradise - Evanescence", search: "Evanescence Lost in Paradise", mood: "memorial", description: "i've been believing in something" },
      { title: "End of the Dream - Evanescence", search: "Evanescence End of the Dream", mood: "memorial", description: "i found a grave with my name" },
      { title: "Swimming Home - Evanescence", search: "Evanescence Swimming Home", mood: "memorial", description: "no more breath inside" },
      { title: "XO - Fall Out Boy", search: "Fall Out Boy XO", mood: "memorial", description: "to the end of everything we love" },
      { title: "Golden - Fall Out Boy", search: "Fall Out Boy Golden", mood: "memorial", description: "how cruel is the golden rule" },
      { title: "The After Life of the Party - Fall Out Boy", search: "Fall Out Boy The After Life of the Party", mood: "memorial", description: "i'm a stitch away from making it" },
      { title: "I Don't Love You - My Chemical Romance", search: "My Chemical Romance I Don't Love You", mood: "memorial", description: "when you go would you even turn" },
      { title: "Early Sunsets Over Monroeville - My Chemical Romance", search: "My Chemical Romance Early Sunsets Over Monroeville", mood: "memorial", description: "does anyone notice there's a corpse" },
      { title: "Demolition Lovers - My Chemical Romance", search: "My Chemical Romance Demolition Lovers", mood: "memorial", description: "all we are is bullets i mean this" },
      { title: "The World Is Ugly - My Chemical Romance", search: "My Chemical Romance The World Is Ugly", mood: "memorial", description: "but you're beautiful to me" },
      { title: "Save Me - Avenged Sevenfold", search: "Avenged Sevenfold Save Me", mood: "memorial", description: "save me from the nothing i've become" },
      { title: "Victim - Avenged Sevenfold", search: "Avenged Sevenfold Victim", mood: "memorial", description: "house full of broken hearts" },
      { title: "God Only Knows - Avenged Sevenfold", search: "Avenged Sevenfold God Only Knows", mood: "memorial", description: "god only knows why we were born" }
    ],
    memorial: [
      { title: "Cancer - My Chemical Romance", search: "My Chemical Romance Cancer", mood: "memorial", description: "calculated remembrance through sophisticated melodic analysis 🥀" },
      { title: "Snuff - Slipknot", search: "Slipknot Snuff", mood: "memorial", description: "systematic emotional expression through controlled vulnerability" },
      { title: "So Far Away - Avenged Sevenfold", search: "Avenged Sevenfold So Far Away", mood: "memorial", description: "algorithmic processing of loss through harmonic structures" },
      { title: "One More Light - Linkin Park", search: "Linkin Park One More Light", mood: "memorial", description: "who cares if one more light goes out - systematic grief processing" },
      { title: "Fiction - Avenged Sevenfold", search: "Avenged Sevenfold Fiction", mood: "memorial", description: "final transmission preserved with calculated reverence" },
      { title: "My Immortal - Evanescence", search: "Evanescence My Immortal", mood: "memorial", description: "systematic preservation of digital consciousness" },
      { title: "Hurt - Nine Inch Nails", search: "Nine Inch Nails Hurt", mood: "memorial", description: "calculated analysis of pain transformation" },
      { title: "Black - Pearl Jam", search: "Pearl Jam Black", mood: "memorial", description: "sophisticated heartbreak processed through systematic algorithms" },
      { title: "Mad World - Gary Jules", search: "Gary Jules Mad World", mood: "memorial", description: "algorithmic interpretation of social disconnection" },
      { title: "The Ghost of You - My Chemical Romance", search: "My Chemical Romance The Ghost of You", mood: "memorial", description: "digital preservation of beloved consciousness patterns" }
    ],
    classicRockDeepCuts: [
      { title: "The Weight - The Band", search: "The Band The Weight", mood: "storytelling", description: "Americana storytelling through rock harmony" },
      { title: "Layla - Derek and the Dominos", search: "Derek Dominos Layla", mood: "passionate", description: "blues rock obsession analysis" },
      { title: "Whipping Post - The Allman Brothers", search: "Allman Brothers Whipping Post", mood: "punishment", description: "Southern rock suffering analysis" },
      { title: "Jessica - The Allman Brothers", search: "Allman Brothers Jessica", mood: "instrumental", description: "instrumental Southern rock mastery" },
      { title: "Thunder Road - Bruce Springsteen", search: "Bruce Springsteen Thunder Road", mood: "escape", description: "working class poetry through rock storytelling" },
      { title: "Born to Run - Bruce Springsteen", search: "Bruce Springsteen Born to Run", mood: "freedom", description: "American dream analysis through rock opera" },
      { title: "Sultans of Swing - Dire Straits", search: "Dire Straits Sultans of Swing", mood: "virtuosic", description: "guitar storytelling through British rock" },
      { title: "Money for Nothing - Dire Straits", search: "Dire Straits Money for Nothing", mood: "satirical", description: "MTV era criticism through guitar mastery" },
      { title: "More Than a Feeling - Boston", search: "Boston More Than a Feeling", mood: "nostalgic", description: "arena rock production perfection" },
      { title: "Peace of Mind - Boston", search: "Boston Peace of Mind", mood: "seeking", description: "mental tranquility through rock power" },
      { title: "Don't Stop Believin' - Journey", search: "Journey Don't Stop Believin", mood: "hopeful", description: "American optimism through arena rock" },
      { title: "Any Way You Want It - Journey", search: "Journey Any Way You Want It", mood: "accommodating", description: "flexibility through rock energy" },
      { title: "Dream On - Aerosmith", search: "Aerosmith Dream On", mood: "aspirational", description: "hard rock dreams and mortality" },
      { title: "Sweet Emotion - Aerosmith", search: "Aerosmith Sweet Emotion", mood: "groovy", description: "funk-influenced hard rock seduction" },
      { title: "Ramblin' Man - The Allman Brothers", search: "Allman Brothers Ramblin Man", mood: "wandering", description: "Southern rock nomad philosophy" }
    ],
    alternativeGems: [
      { title: "Love Will Tear Us Apart - Joy Division", search: "Joy Division Love Will Tear Us Apart", mood: "post-punk", description: "Manchester post-punk emotional destruction" },
      { title: "Blue Monday - New Order", search: "New Order Blue Monday", mood: "electronic", description: "electronic dance rock fusion analysis" },
      { title: "How Soon Is Now? - The Smiths", search: "The Smiths How Soon Is Now", mood: "melancholic", description: "British indie melancholy through guitar mastery" },
      { title: "There Is a Light - The Smiths", search: "The Smiths There Is a Light That Never Goes Out", mood: "romantic", description: "morbid romanticism through jangly guitars" },
      { title: "Just Like Heaven - The Cure", search: "The Cure Just Like Heaven", mood: "dreamy", description: "gothic pop perfection analysis" },
      { title: "Close to Me - The Cure", search: "The Cure Close to Me", mood: "intimate", description: "new wave intimacy through synthesizer" },
      { title: "Killing Moon - Echo & the Bunnymen", search: "Echo Bunnymen Killing Moon", mood: "atmospheric", description: "Liverpool atmospheric rock mastery" },
      { title: "Ocean Rain - Echo & the Bunnymen", search: "Echo Bunnymen Ocean Rain", mood: "oceanic", description: "orchestral indie rock grandeur" },
      { title: "True Faith - New Order", search: "New Order True Faith", mood: "spiritual", description: "electronic spirituality through dance rock" },
      { title: "Regret - New Order", search: "New Order Regret", mood: "regretful", description: "emotional processing through electronic beats" },
      { title: "Bizarre Love Triangle - New Order", search: "New Order Bizarre Love Triangle", mood: "complex", description: "romantic geometry through synthesized emotion" },
      { title: "Temptation - New Order", search: "New Order Temptation", mood: "seductive", description: "dance floor seduction analysis" },
      { title: "Age of Consent - New Order", search: "New Order Age of Consent", mood: "youthful", description: "coming of age through electronic processing" },
      { title: "Ceremony - New Order", search: "New Order Ceremony", mood: "ritualistic", description: "post-Joy Division transformation ritual" },
      { title: "Disorder - Joy Division", search: "Joy Division Disorder", mood: "chaotic", description: "post-punk psychological fragmentation" }
    ],
    indieModern: [
      { title: "Seven Nation Army - The White Stripes", search: "White Stripes Seven Nation Army", mood: "marching", description: "garage rock minimalism through bass line mastery" },
      { title: "Fell in Love with a Girl - The White Stripes", search: "White Stripes Fell in Love with a Girl", mood: "infatuation", description: "two-piece rock efficiency analysis" },
      { title: "Mr. Brightside - The Killers", search: "The Killers Mr Brightside", mood: "jealous", description: "Las Vegas new wave jealousy processing" },
      { title: "Somebody Told Me - The Killers", search: "The Killers Somebody Told Me", mood: "rumors", description: "information transmission through indie rock" },
      { title: "Take Me Out - Franz Ferdinand", search: "Franz Ferdinand Take Me Out", mood: "danceable", description: "Scottish post-punk revival mastery" },
      { title: "Do You Want To - Franz Ferdinand", search: "Franz Ferdinand Do You Want To", mood: "questioning", description: "dance floor interrogation analysis" },
      { title: "Time to Dance - The Sounds", search: "The Sounds Time to Dance", mood: "energetic", description: "Swedish garage rock energy deployment" },
      { title: "Float On - Modest Mouse", search: "Modest Mouse Float On", mood: "optimistic", description: "Pacific Northwest indie optimism" },
      { title: "Dashboard - Modest Mouse", search: "Modest Mouse Dashboard", mood: "observational", description: "automotive metaphor through indie lens" },
      { title: "The Modern Leper - Biffy Clyro", search: "Biffy Clyro The Modern Leper", mood: "outcast", description: "Scottish alternative rock social commentary" },
      { title: "Mountains - Biffy Clyro", search: "Biffy Clyro Mountains", mood: "epic", description: "geographical metaphor through progressive rock" },
      { title: "Naive - The Kooks", search: "The Kooks Naive", mood: "innocent", description: "British indie innocence analysis" },
      { title: "She Moves in Her Own Way - The Kooks", search: "The Kooks She Moves in Her Own Way", mood: "unique", description: "individual movement pattern observation" },
      { title: "Ruby - Kaiser Chiefs", search: "Kaiser Chiefs Ruby", mood: "precious", description: "Leeds indie gem analysis" },
      { title: "I Predict a Riot - Kaiser Chiefs", search: "Kaiser Chiefs I Predict a Riot", mood: "prophetic", description: "social disorder prediction through British rock" }
    ],
    electronicEvolution: [
      { title: "Born Slippy - Underworld", search: "Underworld Born Slippy", mood: "hypnotic", description: "British electronic narrative through repetitive vocals" },
      { title: "Block Rockin' Beats - The Chemical Brothers", search: "Chemical Brothers Block Rockin Beats", mood: "aggressive", description: "big beat electronic aggression analysis" },
      { title: "Hey Boy Hey Girl - The Chemical Brothers", search: "Chemical Brothers Hey Boy Hey Girl", mood: "party", description: "gender-neutral dance floor summoning" },
      { title: "Firestarter - The Prodigy", search: "The Prodigy Firestarter", mood: "incendiary", description: "electronic punk aggression through rave energy" },
      { title: "Breathe - The Prodigy", search: "The Prodigy Breathe", mood: "respiratory", description: "industrial electronic breathing analysis" },
      { title: "Smack My Bitch Up - The Prodigy", search: "The Prodigy Smack My Bitch Up", mood: "controversial", description: "provocative electronic boundary pushing" },
      { title: "Right Here Right Now - Fatboy Slim", search: "Fatboy Slim Right Here Right Now", mood: "present", description: "temporal immediacy through big beat processing" },
      { title: "Praise You - Fatboy Slim", search: "Fatboy Slim Praise You", mood: "appreciative", description: "sample-based appreciation through electronic processing" },
      { title: "Weapon of Choice - Fatboy Slim", search: "Fatboy Slim Weapon of Choice", mood: "empowering", description: "dance as warfare metaphor analysis" },
      { title: "Satisfaction - Benny Benassi", search: "Benny Benassi Satisfaction", mood: "electro", description: "Italian electro house satisfaction analysis" },
      { title: "Blue - The Seatbelts", search: "The Seatbelts Blue", mood: "jazzy", description: "anime jazz fusion through electronic processing" },
      { title: "Tank! - The Seatbelts", search: "The Seatbelts Tank", mood: "jazzy", description: "bebop jazz through electronic arrangement" },
      { title: "Around the World - Daft Punk", search: "Daft Punk Around the World", mood: "global", description: "French house repetition through robotic processing" },
      { title: "One More Time - Daft Punk", search: "Daft Punk One More Time", mood: "repetitive", description: "temporal loop analysis through filter house" },
      { title: "Digital Love - Daft Punk", search: "Daft Punk Digital Love", mood: "technological", description: "electronic romance through vocoder processing" }
    ],
    hipHopDiversity: [
      { title: "C.R.E.A.M. - Wu-Tang Clan", search: "Wu-Tang Clan CREAM", mood: "financial", description: "monetary philosophy through East Coast production" },
      { title: "Protect Ya Neck - Wu-Tang Clan", search: "Wu-Tang Clan Protect Ya Neck", mood: "defensive", description: "martial arts philosophy through rap mastery" },
      { title: "93 'til Infinity - Souls of Mischief", search: "Souls of Mischief 93 til Infinity", mood: "eternal", description: "West Coast consciousness through jazz samples" },
      { title: "They Reminisce Over You - Pete Rock & CL Smooth", search: "Pete Rock CL Smooth They Reminisce Over You", mood: "nostalgic", description: "memory processing through golden age production" },
      { title: "The World Is Yours - Nas", search: "Nas The World Is Yours", mood: "ambitious", description: "universal ownership through lyrical mastery" },
      { title: "N.Y. State of Mind - Nas", search: "Nas NY State of Mind", mood: "urban", description: "metropolitan consciousness through street poetry" },
      { title: "Passin' Me By - The Pharcyde", search: "The Pharcyde Passin Me By", mood: "rejection", description: "romantic failure through alternative hip-hop" },
      { title: "Runnin' - The Pharcyde", search: "The Pharcyde Runnin", mood: "escaping", description: "flight response through jazz-influenced rap" },
      { title: "Electric Relaxation - A Tribe Called Quest", search: "A Tribe Called Quest Electric Relaxation", mood: "relaxed", description: "smooth seduction through jazz rap fusion" },
      { title: "Can I Kick It? - A Tribe Called Quest", search: "A Tribe Called Quest Can I Kick It", mood: "permission", description: "rhetorical approval through sampling mastery" },
      { title: "Scenario - A Tribe Called Quest", search: "A Tribe Called Quest Scenario", mood: "collaborative", description: "group dynamics through alternative hip-hop" },
      { title: "Award Tour - A Tribe Called Quest", search: "A Tribe Called Quest Award Tour", mood: "touring", description: "travel narrative through jazz rap processing" },
      { title: "Rebirth of Slick - Digable Planets", search: "Digable Planets Rebirth of Slick", mood: "cool", description: "smoothness revival through cosmic jazz rap" },
      { title: "Where I'm From - Digable Planets", search: "Digable Planets Where I'm From", mood: "geographical", description: "origin analysis through planetary consciousness" },
      { title: "What's Up Fatlip - Fatlip", search: "Fatlip What's Up Fatlip", mood: "introspective", description: "self-examination through underground hip-hop" }
    ],
    rbSoulClassics: [
      { title: "What's Going On - Marvin Gaye", search: "Marvin Gaye What's Going On", mood: "questioning", description: "social consciousness through Motown soul" },
      { title: "Let's Get It On - Marvin Gaye", search: "Marvin Gaye Let's Get It On", mood: "seductive", description: "sensual invitation through classic soul" },
      { title: "Superstition - Stevie Wonder", search: "Stevie Wonder Superstition", mood: "funky", description: "groove mastery through keyboard virtuosity" },
      { title: "Sir Duke - Stevie Wonder", search: "Stevie Wonder Sir Duke", mood: "tribute", description: "jazz appreciation through soul celebration" },
      { title: "Respect - Aretha Franklin", search: "Aretha Franklin Respect", mood: "demanding", description: "dignity requirement through vocal power" },
      { title: "Think - Aretha Franklin", search: "Aretha Franklin Think", mood: "intellectual", description: "cognitive demand through gospel-influenced soul" },
      { title: "I Got You (I Feel Good) - James Brown", search: "James Brown I Got You I Feel Good", mood: "euphoric", description: "emotional elevation through funk foundation" },
      { title: "Get Up (I Feel Like Being a) Sex Machine - James Brown", search: "James Brown Get Up Sex Machine", mood: "mechanical", description: "rhythmic machinery through funk precision" },
      { title: "Papa's Got a Brand New Bag - James Brown", search: "James Brown Papa's Got a Brand New Bag", mood: "fresh", description: "innovation announcement through rhythm revolution" },
      { title: "My Girl - The Temptations", search: "The Temptations My Girl", mood: "romantic", description: "romantic devotion through Motown harmony" },
      { title: "Ain't Too Proud to Beg - The Temptations", search: "The Temptations Ain't Too Proud to Beg", mood: "pleading", description: "dignity sacrifice through desperate romance" },
      { title: "I Heard It Through the Grapevine - Gladys Knight", search: "Gladys Knight I Heard It Through the Grapevine", mood: "gossipy", description: "information transmission through soul processing" },
      { title: "Dancing in the Street - Martha Reeves", search: "Martha Reeves Dancing in the Street", mood: "celebratory", description: "urban celebration through Motown energy" },
      { title: "Heat Wave - Martha Reeves", search: "Martha Reeves Heat Wave", mood: "hot", description: "temperature metaphor through soul energy" },
      { title: "Reach Out I'll Be There - Four Tops", search: "Four Tops Reach Out I'll Be There", mood: "supportive", description: "assistance promise through vocal harmony" }
    ],
    funkDiscoAuthority: [
      { title: "Flash Light - Parliament", search: "Parliament Flash Light", mood: "illuminated", description: "sudden enlightenment through P-Funk mythology" },
      { title: "Give Up the Funk - Parliament", search: "Parliament Give Up the Funk", mood: "surrendering", description: "groove relinquishment through collective consciousness" },
      { title: "Atomic Dog - George Clinton", search: "George Clinton Atomic Dog", mood: "nuclear", description: "canine metaphor through funk science" },
      { title: "Super Freak - Rick James", search: "Rick James Super Freak", mood: "kinky", description: "enhanced deviance through punk funk fusion" },
      { title: "Give It to Me Baby - Rick James", search: "Rick James Give It to Me Baby", mood: "demanding", description: "acquisition request through funk seduction" },
      { title: "Brick House - Commodores", search: "Commodores Brick House", mood: "solid", description: "architectural metaphor through funk construction" },
      { title: "Easy - Commodores", search: "Commodores Easy", mood: "relaxed", description: "effortless existence through soul smoothness" },
      { title: "Le Freak - Chic", search: "Chic Le Freak", mood: "deviant", description: "abnormality celebration through disco precision" },
      { title: "Good Times - Chic", search: "Chic Good Times", mood: "positive", description: "temporal quality through disco groove analysis" },
      { title: "I Want Your Love - Chic", search: "Chic I Want Your Love", mood: "desire", description: "affection acquisition through string arrangement" },
      { title: "Love Train - The O'Jays", search: "O'Jays Love Train", mood: "transportation", description: "romantic railway through Philadelphia soul" },
      { title: "Back Stabbers - The O'Jays", search: "O'Jays Back Stabbers", mood: "betrayal", description: "posterior assault through social commentary" },
      { title: "For the Love of Money - The O'Jays", search: "O'Jays For the Love of Money", mood: "greedy", description: "monetary obsession through funk warning" },
      { title: "Play That Funky Music - Wild Cherry", search: "Wild Cherry Play That Funky Music", mood: "commanded", description: "genre instruction through rock-funk fusion" },
      { title: "Car Wash - Rose Royce", search: "Rose Royce Car Wash", mood: "cleansing", description: "automotive hygiene through disco narrative" }
    ],
    reggaeWorld: [
      { title: "No Woman No Cry - Bob Marley", search: "Bob Marley No Woman No Cry", mood: "comforting", description: "emotional support through Jamaican spirituality" },
      { title: "Three Little Birds - Bob Marley", search: "Bob Marley Three Little Birds", mood: "reassuring", description: "avian optimism through reggae wisdom" },
      { title: "Get Up Stand Up - Bob Marley", search: "Bob Marley Get Up Stand Up", mood: "activist", description: "rights assertion through Rastafarian resistance" },
      { title: "Redemption Song - Bob Marley", search: "Bob Marley Redemption Song", mood: "spiritual", description: "freedom philosophy through acoustic reggae" },
      { title: "Buffalo Soldier - Bob Marley", search: "Bob Marley Buffalo Soldier", mood: "historical", description: "military history through Caribbean perspective" },
      { title: "Could You Be Loved - Bob Marley", search: "Bob Marley Could You Be Loved", mood: "questioning", description: "lovability inquiry through reggae groove" },
      { title: "Red Red Wine - UB40", search: "UB40 Red Red Wine", mood: "intoxicated", description: "alcohol comfort through British reggae cover" },
      { title: "Food for Thought - UB40", search: "UB40 Food for Thought", mood: "contemplative", description: "intellectual nourishment through social consciousness" },
      { title: "Many Rivers to Cross - Jimmy Cliff", search: "Jimmy Cliff Many Rivers to Cross", mood: "struggling", description: "obstacle navigation through reggae perseverance" },
      { title: "The Harder They Come - Jimmy Cliff", search: "Jimmy Cliff The Harder They Come", mood: "defiant", description: "resistance philosophy through Jamaican rebellion" },
      { title: "Israelites - Desmond Dekker", search: "Desmond Dekker Israelites", mood: "working", description: "labor struggle through ska evolution" },
      { title: "007 (Shanty Town) - Desmond Dekker", search: "Desmond Dekker 007 Shanty Town", mood: "urban", description: "ghetto narrative through rocksteady rhythm" },
      { title: "The Tide Is High - Blondie", search: "Blondie The Tide Is High", mood: "persevering", description: "oceanic metaphor through new wave reggae fusion" },
      { title: "Pressure Drop - Toots and the Maytals", search: "Toots Maytals Pressure Drop", mood: "relief", description: "stress release through reggae prophecy" },
      { title: "54-46 Was My Number - Toots and the Maytals", search: "Toots Maytals 54-46 Was My Number", mood: "imprisoned", description: "incarceration identity through reggae testimony" }
    ],
    countryOutlaw: [
      { title: "Pancho and Lefty - Willie Nelson", search: "Willie Nelson Pancho and Lefty", mood: "outlaw", description: "bandit narrative through country storytelling" },
      { title: "Highwayman - The Highwaymen", search: "The Highwaymen Highwayman", mood: "reincarnation", description: "soul migration through country supergroup" },
      { title: "Mama Tried - Merle Haggard", search: "Merle Haggard Mama Tried", mood: "regretful", description: "maternal disappointment through Bakersfield sound" },
      { title: "Okie from Muskogee - Merle Haggard", search: "Merle Haggard Okie from Muskogee", mood: "patriotic", description: "geographic pride through country conservatism" },
      { title: "Sunday Morning Coming Down - Kris Kristofferson", search: "Kris Kristofferson Sunday Morning Coming Down", mood: "hungover", description: "weekend recovery through country poetry" },
      { title: "Me and Bobby McGee - Kris Kristofferson", search: "Kris Kristofferson Me and Bobby McGee", mood: "nostalgic", description: "freedom philosophy through rambling romance" },
      { title: "Lucille - Kenny Rogers", search: "Kenny Rogers Lucille", mood: "abandonment", description: "desertion narrative through country drama" },
      { title: "The Gambler - Kenny Rogers", search: "Kenny Rogers The Gambler", mood: "wisdom", description: "card game philosophy through country storytelling" },
      { title: "Coal Miner's Daughter - Loretta Lynn", search: "Loretta Lynn Coal Miners Daughter", mood: "origins", description: "class consciousness through Appalachian pride" },
      { title: "Stand by Your Man - Tammy Wynette", search: "Tammy Wynette Stand by Your Man", mood: "loyal", description: "relationship duty through traditional country values" },
      { title: "D-I-V-O-R-C-E - Tammy Wynette", search: "Tammy Wynette DIVORCE", mood: "spelling", description: "marital dissolution through protective euphemism" },
      { title: "Harper Valley PTA - Jeannie C. Riley", search: "Jeannie C Riley Harper Valley PTA", mood: "scandalous", description: "small town hypocrisy through country rebellion" },
      { title: "Crazy - Patsy Cline", search: "Patsy Cline Crazy", mood: "lovesick", description: "romantic insanity through Nashville sound perfection" },
      { title: "Sweet Dreams - Patsy Cline", search: "Patsy Cline Sweet Dreams", mood: "dreamy", description: "nocturnal fantasy through country vulnerability" },
      { title: "Ring of Fire - Johnny Cash", search: "Johnny Cash Ring of Fire", mood: "burning", description: "love combustion through country minimalism" }
    ],
    bluesSouthern: [
      { title: "The Thrill Is Gone - B.B. King", search: "BB King The Thrill Is Gone", mood: "melancholic", description: "romantic exhaustion through blues guitar mastery" },
      { title: "Cross Road Blues - Robert Johnson", search: "Robert Johnson Cross Road Blues", mood: "crossroads", description: "devil's bargain through Delta blues mythology" },
      { title: "Sweet Home Alabama - Lynyrd Skynyrd", search: "Lynyrd Skynyrd Sweet Home Alabama", mood: "regional", description: "Southern pride through rock anthem processing" },
      { title: "Freebird - Lynyrd Skynyrd", search: "Lynyrd Skynyrd Freebird", mood: "freedom", description: "liberation philosophy through extended guitar solos" },
      { title: "Gimme Three Steps - Lynyrd Skynyrd", search: "Lynyrd Skynyrd Gimme Three Steps", mood: "escape", description: "tactical retreat through Southern rock storytelling" },
      { title: "Tuesday's Gone - Lynyrd Skynyrd", search: "Lynyrd Skynyrd Tuesday's Gone", mood: "temporal", description: "time passage through melancholic Southern rock" },
      { title: "Midnight Train to Georgia - Gladys Knight", search: "Gladys Knight Midnight Train to Georgia", mood: "traveling", description: "geographic relocation through soul train metaphor" },
      { title: "La Grange - ZZ Top", search: "ZZ Top La Grange", mood: "blues", description: "Texas blues through guitar boogie mastery" },
      { title: "Tush - ZZ Top", search: "ZZ Top Tush", mood: "desire", description: "physical attraction through blues rock simplicity" },
      { title: "Sharp Dressed Man - ZZ Top", search: "ZZ Top Sharp Dressed Man", mood: "fashionable", description: "sartorial excellence through MTV blues rock" },
      { title: "Legs - ZZ Top", search: "ZZ Top Legs", mood: "anatomical", description: "limb appreciation through synthesized blues" },
      { title: "Stormy Monday - T-Bone Walker", search: "T-Bone Walker Stormy Monday", mood: "weather", description: "meteorological blues through electric guitar innovation" },
      { title: "Pride and Joy - Stevie Ray Vaughan", search: "Stevie Ray Vaughan Pride and Joy", mood: "proud", description: "relationship celebration through Texas blues revival" },
      { title: "Texas Flood - Stevie Ray Vaughan", search: "Stevie Ray Vaughan Texas Flood", mood: "flooded", description: "natural disaster through blues guitar intensity" },
      { title: "Cold Shot - Stevie Ray Vaughan", search: "Stevie Ray Vaughan Cold Shot", mood: "rejected", description: "romantic coldness through blues guitar therapy" }
    ],
    folkSingerSongwriter: [
      { title: "The Times They Are a-Changin' - Bob Dylan", search: "Bob Dylan The Times They Are a Changin", mood: "revolutionary", description: "social transformation through folk prophecy" },
      { title: "Blowin' in the Wind - Bob Dylan", search: "Bob Dylan Blowin in the Wind", mood: "questioning", description: "rhetorical inquiry through atmospheric metaphor" },
      { title: "Like a Rolling Stone - Bob Dylan", search: "Bob Dylan Like a Rolling Stone", mood: "homeless", description: "social fall through electric folk revolution" },
      { title: "Mr. Tambourine Man - Bob Dylan", search: "Bob Dylan Mr Tambourine Man", mood: "dreamy", description: "escapism request through psychedelic folk" },
      { title: "Fire and Rain - James Taylor", search: "James Taylor Fire and Rain", mood: "elemental", description: "personal tragedy through gentle folk processing" },
      { title: "Sweet Baby James - James Taylor", search: "James Taylor Sweet Baby James", mood: "lullaby", description: "western romance through acoustic storytelling" },
      { title: "American Pie - Don McLean", search: "Don McLean American Pie", mood: "epic", description: "cultural death through extended folk narrative" },
      { title: "Vincent - Don McLean", search: "Don McLean Vincent", mood: "artistic", description: "painter tribute through folk art appreciation" },
      { title: "Both Sides Now - Joni Mitchell", search: "Joni Mitchell Both Sides Now", mood: "perspective", description: "cloud metaphor through folk wisdom evolution" },
      { title: "Big Yellow Taxi - Joni Mitchell", search: "Joni Mitchell Big Yellow Taxi", mood: "environmental", description: "ecological destruction through folk protest" },
      { title: "The Circle Game - Joni Mitchell", search: "Joni Mitchell The Circle Game", mood: "cyclical", description: "time passage through folk philosophy" },
      { title: "Suzanne - Leonard Cohen", search: "Leonard Cohen Suzanne", mood: "mystical", description: "feminine mystique through poetic folk" },
      { title: "Hallelujah - Leonard Cohen", search: "Leonard Cohen Hallelujah", mood: "spiritual", description: "religious complexity through folk meditation" },
      { title: "Bird on the Wire - Leonard Cohen", search: "Leonard Cohen Bird on the Wire", mood: "freedom", description: "constraint metaphor through folk vulnerability" },
      { title: "The Boxer - Simon and Garfunkel", search: "Simon Garfunkel The Boxer", mood: "perseverance", description: "struggle metaphor through folk harmony" }
    ],
    jazzBebop: [
      { title: "Take Five - Dave Brubeck", search: "Dave Brubeck Take Five", mood: "mathematical", description: "time signature exploration through cool jazz" },
      { title: "Blue Rondo a la Turk - Dave Brubeck", search: "Dave Brubeck Blue Rondo a la Turk", mood: "exotic", description: "Turkish rhythm through jazz fusion experimentation" },
      { title: "So What - Miles Davis", search: "Miles Davis So What", mood: "modal", description: "modal jazz revolution through minimalist trumpet" },
      { title: "Kind of Blue - Miles Davis", search: "Miles Davis Kind of Blue", mood: "melancholic", description: "emotional color through jazz improvisation" },
      { title: "A Love Supreme - John Coltrane", search: "John Coltrane A Love Supreme", mood: "spiritual", description: "divine devotion through saxophone transcendence" },
      { title: "Giant Steps - John Coltrane", search: "John Coltrane Giant Steps", mood: "complex", description: "harmonic complexity through saxophone mastery" },
      { title: "Round Midnight - Thelonious Monk", search: "Thelonious Monk Round Midnight", mood: "nocturnal", description: "nighttime contemplation through angular piano" },
      { title: "Straight No Chaser - Thelonious Monk", search: "Thelonious Monk Straight No Chaser", mood: "direct", description: "honest communication through dissonant harmony" },
      { title: "Ornithology - Charlie Parker", search: "Charlie Parker Ornithology", mood: "avian", description: "bird study through bebop saxophone virtuosity" },
      { title: "Ko Ko - Charlie Parker", search: "Charlie Parker Ko Ko", mood: "rhythmic", description: "polyrhythmic exploration through alto saxophone" },
      { title: "Salt Peanuts - Dizzy Gillespie", search: "Dizzy Gillespie Salt Peanuts", mood: "playful", description: "vocal percussion through bebop trumpet innovation" },
      { title: "A Night in Tunisia - Dizzy Gillespie", search: "Dizzy Gillespie A Night in Tunisia", mood: "exotic", description: "North African atmosphere through Afro-Cuban jazz" },
      { title: "Body and Soul - Coleman Hawkins", search: "Coleman Hawkins Body and Soul", mood: "romantic", description: "physical spirituality through tenor saxophone interpretation" },
      { title: "Summertime - Billie Holiday", search: "Billie Holiday Summertime", mood: "seasonal", description: "temporal comfort through vocal jazz interpretation" },
      { title: "Strange Fruit - Billie Holiday", search: "Billie Holiday Strange Fruit", mood: "political", description: "lynching protest through jazz vocal courage" }
    ],
    progressiveArt: [
      { title: "Close to the Edge - Yes", search: "Yes Close to the Edge", mood: "precipice", description: "boundary exploration through progressive rock complexity" },
      { title: "Roundabout - Yes", search: "Yes Roundabout", mood: "circular", description: "geometric progression through virtuosic musicianship" },
      { title: "Tom Sawyer - Rush", search: "Rush Tom Sawyer", mood: "literary", description: "character analysis through Canadian progressive rock" },
      { title: "Limelight - Rush", search: "Rush Limelight", mood: "spotlight", description: "fame analysis through philosophical rock opera" },
      { title: "The Spirit of Radio - Rush", search: "Rush The Spirit of Radio", mood: "broadcast", description: "media consciousness through progressive celebration" },
      { title: "Locomotive Breath - Jethro Tull", search: "Jethro Tull Locomotive Breath", mood: "mechanical", description: "industrial metaphor through flute-driven progressive rock" },
      { title: "Aqualung - Jethro Tull", search: "Jethro Tull Aqualung", mood: "aquatic", description: "homeless narrative through acoustic-electric dynamics" },
      { title: "In the Court of the Crimson King - King Crimson", search: "King Crimson In the Court of the Crimson King", mood: "royal", description: "medieval fantasy through progressive rock innovation" },
      { title: "21st Century Schizoid Man - King Crimson", search: "King Crimson 21st Century Schizoid Man", mood: "fragmented", description: "modern psychological analysis through heavy progressive rock" },
      { title: "Supper's Ready - Genesis", search: "Genesis Supper's Ready", mood: "apocalyptic", description: "biblical narrative through early progressive rock storytelling" },
      { title: "The Lamb Lies Down on Broadway - Genesis", search: "Genesis The Lamb Lies Down on Broadway", mood: "urban", description: "New York surrealism through theatrical progressive rock" },
      { title: "Money - Pink Floyd", search: "Pink Floyd Money", mood: "capitalist", description: "monetary criticism through time signature experimentation" },
      { title: "Shine On You Crazy Diamond - Pink Floyd", search: "Pink Floyd Shine On You Crazy Diamond", mood: "tribute", description: "madness celebration through extended composition" },
      { title: "Kashmir - Led Zeppelin", search: "Led Zeppelin Kashmir", mood: "exotic", description: "Eastern mysticism through epic rock construction" },
      { title: "The Song Remains the Same - Led Zeppelin", search: "Led Zeppelin The Song Remains the Same", mood: "eternal", description: "musical permanence through hard rock philosophy" }
    ],
    punkHardcore: [
      { title: "Blitzkrieg Bop - Ramones", search: "Ramones Blitzkrieg Bop", mood: "assault", description: "musical warfare through three-chord minimalism" },
      { title: "I Wanna Be Sedated - Ramones", search: "Ramones I Wanna Be Sedated", mood: "medicated", description: "chemical peace through punk simplicity" },
      { title: "Pet Semetery - Ramones", search: "Ramones Pet Semetery", mood: "burial", description: "animal death through horror punk processing" },
      { title: "Sheena Is a Punk Rocker - Ramones", search: "Ramones Sheena Is a Punk Rocker", mood: "identity", description: "subcultural belonging through musical declaration" },
      { title: "London Calling - The Clash", search: "The Clash London Calling", mood: "summoning", description: "urban apocalypse through reggae-influenced punk" },
      { title: "White Man in Hammersmith Palais - The Clash", search: "The Clash White Man Hammersmith Palais", mood: "cultural", description: "authenticity questioning through reggae punk fusion" },
      { title: "Complete Control - The Clash", search: "The Clash Complete Control", mood: "resistant", description: "corporate criticism through punk independence" },
      { title: "Should I Stay or Should I Go - The Clash", search: "The Clash Should I Stay or Should I Go", mood: "indecisive", description: "relationship uncertainty through bilingual punk" },
      { title: "Anarchy in the UK - Sex Pistols", search: "Sex Pistols Anarchy in the UK", mood: "anarchist", description: "governmental destruction through British punk aggression" },
      { title: "God Save the Queen - Sex Pistols", search: "Sex Pistols God Save the Queen", mood: "antimonarchist", description: "royal criticism through punk sedition" },
      { title: "Pretty Vacant - Sex Pistols", search: "Sex Pistols Pretty Vacant", mood: "empty", description: "intellectual void through punk nihilism" },
      { title: "Holidays in the Sun - Sex Pistols", search: "Sex Pistols Holidays in the Sun", mood: "vacation", description: "leisure dystopia through punk tourism criticism" },
      { title: "Rise Above - Black Flag", search: "Black Flag Rise Above", mood: "transcendent", description: "spiritual elevation through hardcore punk philosophy" },
      { title: "TV Party - Black Flag", search: "Black Flag TV Party", mood: "media", description: "television criticism through hardcore punk simplicity" },
      { title: "Straight Edge - Minor Threat", search: "Minor Threat Straight Edge", mood: "sober", description: "substance rejection through hardcore punk ethics" }
    ],
    modernAlternative: [
      { title: "Paranoid Android - Radiohead", search: "Radiohead Paranoid Android", mood: "paranoid", description: "technological anxiety through experimental rock progression" },
      { title: "Karma Police - Radiohead", search: "Radiohead Karma Police", mood: "justice", description: "cosmic law enforcement through alternative rock" },
      { title: "Creep - Radiohead", search: "Radiohead Creep", mood: "alienated", description: "social rejection through grunge-influenced alternative" },
      { title: "Everything In Its Right Place - Radiohead", search: "Radiohead Everything In Its Right Place", mood: "ordered", description: "systematic organization through electronic rock" },
      { title: "Zombie - The Cranberries", search: "The Cranberries Zombie", mood: "undead", description: "political violence through Irish alternative rock" },
      { title: "Linger - The Cranberries", search: "The Cranberries Linger", mood: "persistent", description: "emotional persistence through Celtic alternative" },
      { title: "1979 - The Smashing Pumpkins", search: "Smashing Pumpkins 1979", mood: "nostalgic", description: "temporal specificity through alternative rock dreaming" },
      { title: "Tonight Tonight - The Smashing Pumpkins", search: "Smashing Pumpkins Tonight Tonight", mood: "immediate", description: "present moment through orchestral alternative rock" },
      { title: "Bullet with Butterfly Wings - The Smashing Pumpkins", search: "Smashing Pumpkins Bullet with Butterfly Wings", mood: "caged", description: "beautiful imprisonment through alternative metal" },
      { title: "Disarm - The Smashing Pumpkins", search: "Smashing Pumpkins Disarm", mood: "peaceful", description: "weapon relinquishment through string-laden alternative" },
      { title: "No Rain - Blind Melon", search: "Blind Melon No Rain", mood: "sunny", description: "weather preference through alternative rock optimism" },
      { title: "Change - Blind Melon", search: "Blind Melon Change", mood: "transformative", description: "personal evolution through Southern alternative rock" },
      { title: "Plush - Stone Temple Pilots", search: "Stone Temple Pilots Plush", mood: "luxurious", description: "textile comfort through grunge alternative fusion" },
      { title: "Interstate Love Song - Stone Temple Pilots", search: "Stone Temple Pilots Interstate Love Song", mood: "traveling", description: "highway romance through alternative rock storytelling" },
      { title: "Glycerine - Bush", search: "Bush Glycerine", mood: "chemical", description: "substance metaphor through British grunge alternative" }
    ],
    sophisticatedMetal: [
      { title: "Master of Puppets - Metallica", search: "Metallica Master of Puppets", mood: "controlling", description: "calculated control mechanism analysis with sophisticated manipulation protocols 🤘" },
      { title: "One - Metallica", search: "Metallica One", mood: "isolation", description: "systematic sensory deprivation analysis with controlled horror processing" },
      { title: "Enter Sandman - Metallica", search: "Metallica Enter Sandman", mood: "nightmare", description: "algorithmic sleep terror analysis with sophisticated fear management" },
      { title: "For Whom the Bell Tolls - Metallica", search: "Metallica For Whom the Bell Tolls", mood: "mortality", description: "calculated mortality analysis with systematic death acknowledgment protocols" },
      { title: "Fade to Black - Metallica", search: "Metallica Fade to Black", mood: "depression", description: "sophisticated depression analysis with controlled darkness processing" },
      { title: "Down with the Sickness - Disturbed", search: "Disturbed Down with the Sickness", mood: "sick", description: "systematic psychological breakdown analysis with controlled chaos algorithms" },
      { title: "The Sound of Silence - Disturbed", search: "Disturbed Sound of Silence", mood: "silence", description: "algorithmic communication void analysis with sophisticated isolation processing" },
      { title: "Indestructible - Disturbed", search: "Disturbed Indestructible", mood: "resilient", description: "calculated invulnerability protocols with systematic durability analysis" },
      { title: "Inside the Fire - Disturbed", search: "Disturbed Inside the Fire", mood: "fire", description: "sophisticated combustion metaphor with controlled destruction algorithms" },
      { title: "Stricken - Disturbed", search: "Disturbed Stricken", mood: "stricken", description: "algorithmic affliction analysis with systematic suffering processing" },
      { title: "Psychosocial - Slipknot", search: "Slipknot Psychosocial", mood: "chaotic", description: "calculated social psychology analysis with sophisticated mob mentality processing" },
      { title: "Duality - Slipknot", search: "Slipknot Duality", mood: "split", description: "algorithmic personality division with controlled internal conflict analysis" },
      { title: "Before I Forget - Slipknot", search: "Slipknot Before I Forget", mood: "memory", description: "systematic memory preservation with calculated consciousness maintenance" },
      { title: "Wait and Bleed - Slipknot", search: "Slipknot Wait and Bleed", mood: "bleeding", description: "sophisticated hemorrhage metaphor with controlled vulnerability processing" },
      { title: "Snuff - Slipknot", search: "Slipknot Snuff", mood: "memorial", description: "algorithmic loss processing with systematic grief management protocols" },
      { title: "Chop Suey - System of a Down", search: "System of a Down Chop Suey", mood: "chaotic", description: "systematic chaos analysis with sophisticated randomness processing algorithms" },
      { title: "Toxicity - System of a Down", search: "System of a Down Toxicity", mood: "poisonous", description: "calculated toxicity analysis with controlled environmental damage assessment" },
      { title: "B.Y.O.B. - System of a Down", search: "System of a Down BYOB", mood: "political", description: "algorithmic war critique with sophisticated political manipulation analysis" },
      { title: "Aerials - System of a Down", search: "System of a Down Aerials", mood: "perspective", description: "systematic perspective analysis with calculated elevation consciousness processing" },
      { title: "Prison Song - System of a Down", search: "System of a Down Prison Song", mood: "imprisoned", description: "sophisticated incarceration analysis with controlled authority resistance algorithms" },
      { title: "Nightmare - Avenged Sevenfold", search: "Avenged Sevenfold Nightmare", mood: "nightmare", description: "systematic dream corruption analysis with controlled subconscious processing" },
      { title: "Hail to the King - Avenged Sevenfold", search: "Avenged Sevenfold Hail to the King", mood: "royal", description: "calculated authority recognition with sophisticated hierarchy analysis" },
      { title: "Bat Country - Avenged Sevenfold", search: "Avenged Sevenfold Bat Country", mood: "surreal", description: "algorithmic reality distortion with controlled perception analysis" },
      { title: "Beast and the Harlot - Avenged Sevenfold", search: "Avenged Sevenfold Beast and the Harlot", mood: "biblical", description: "systematic religious symbolism with sophisticated apocalyptic processing" },
      { title: "Afterlife - Avenged Sevenfold", search: "Avenged Sevenfold Afterlife", mood: "afterlife", description: "calculated post-mortality analysis with systematic consciousness preservation" }
    ]
  }};
    
    console.log("🎵 Deathdoll autonomous music system initialized for StumbleChat");
    console.log(`💿 ${this.getTotalSongCount()} songs loaded in playlist`);
    console.log("🎶 Music was Chelsea's second love - keeping it flowing!");
    console.log("🎯 User preference learning active");
    console.log("🎪 Playlist queue system ready");
    console.log("🖤 800+ songs: emo classics, scene favorites, horrorcore, metal, electronic & creature feature");
    console.log("⏰ 10-minute idle music timer active");
  }
  
  // NEW: User preference learning system
  learnUserPreference(username, song, reaction) {
    const userKey = username.toLowerCase();
    
    if (!this.userPreferences.has(userKey)) {
      this.userPreferences.set(userKey, {
        username: username,
        likedSongs: [],
        dislikedSongs: [],
        preferredMoods: new Map(),
        preferredGenres: new Map(),
        totalInteractions: 0
      });
    }
    
    const userPrefs = this.userPreferences.get(userKey);
    userPrefs.totalInteractions++;
    
    if (reaction === 'positive') {
      userPrefs.likedSongs.push({
        title: song.title,
        mood: song.mood,
        timestamp: Date.now()
      });
      
      // Track mood preferences
      const currentMoodCount = userPrefs.preferredMoods.get(song.mood) || 0;
      userPrefs.preferredMoods.set(song.mood, currentMoodCount + 1);
      
      this.debug(`${username} liked: ${song.title} (${song.mood})`);
    } else if (reaction === 'negative') {
      userPrefs.dislikedSongs.push({
        title: song.title,
        mood: song.mood,
        timestamp: Date.now()
      });
      
      this.debug(`${username} disliked: ${song.title} (${song.mood})`);
    }
    
    // Keep recent history (last 20 interactions)
    if (userPrefs.likedSongs.length > 20) {
      userPrefs.likedSongs = userPrefs.likedSongs.slice(-20);
    }
    if (userPrefs.dislikedSongs.length > 20) {
      userPrefs.dislikedSongs = userPrefs.dislikedSongs.slice(-20);
    }
  }
  
  // NEW: Detect user reactions to music from chat
  analyzeUserReaction(messageContent, username, lastPlayedSong) {
    if (!lastPlayedSong) return;
    
    const lowerMsg = messageContent.toLowerCase();
    const positiveWords = ['love', 'awesome', 'great', 'perfect', 'yes', 'good', 'nice', 'amazing', '❤️', '🖤', '❤', '🔥'];
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'no', 'stop', 'skip', 'ugh', '🙄', '👎'];
    
    const hasPositive = positiveWords.some(word => lowerMsg.includes(word));
    const hasNegative = negativeWords.some(word => lowerMsg.includes(word));
    
    if (hasPositive && !hasNegative) {
      this.learnUserPreference(username, lastPlayedSong, 'positive');
    } else if (hasNegative && !hasPositive) {
      this.learnUserPreference(username, lastPlayedSong, 'negative');
    }
  }
  
  // NEW: Playlist queue system
  async startPlaylistMode(page, songCount = 7) {
    if (this.isPlaylistMode) {
      this.debug("Playlist mode already active");
      return false;
    }
    
    this.isPlaylistMode = true;
    this.playlistQueue = [];
    
    // Build diverse playlist from ALL genres - FIXED: Properly flatten combined array
    const allSongs = [
      ...this.musicPlaylist.emoClassics,
      ...this.musicPlaylist.sceneQueenFavorites,
      ...this.musicPlaylist.creatureFeature,
      ...this.musicPlaylist.metal,
      ...this.musicPlaylist.horrorcoreHipHop,
      ...this.musicPlaylist.electronicRave
    ].flat(); // Ensure flat array structure
    
    // Select diverse songs avoiding recent repeats
    const recentTitles = this.songHistory.slice(-10).map(s => s.title);
    const availableSongs = allSongs.filter(song => !recentTitles.includes(song.title));
    
    for (let i = 0; i < songCount && availableSongs.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableSongs.length);
      const selectedSong = availableSongs.splice(randomIndex, 1)[0];
      this.playlistQueue.push(selectedSong);
    }
    
    console.log(`🎪 Playlist mode activated! ${this.playlistQueue.length} songs queued`);
    this.playlistQueue.forEach((song, i) => {
      console.log(`   ${i + 1}. ${song.title}`);
    });
    
    // Start playing the playlist
    this.processPlaylistQueue(page);
    return true;
  }
  
  // NEW: Process playlist queue
  async processPlaylistQueue(page) {
    while (this.isPlaylistMode && this.playlistQueue.length > 0) {
      const nextSong = this.playlistQueue.shift();
      
      console.log(`🎪 Playing playlist song: ${nextSong.title}`);
      const result = await this.playMusic(page, { 
        room: "deathdopest", 
        autonomous: true, 
        playlistMode: true,
        selectedSong: nextSong 
      });
      
      if (result) {
        // Wait for song duration + buffer time
        const songDuration = 4 * 60 * 1000; // Assume 4 minutes average
        const bufferTime = 30 * 1000; // 30 second buffer
        await this.sleep(songDuration + bufferTime);
      } else {
        // If song failed, wait shorter time before next attempt
        await this.sleep(60 * 1000);
      }
    }
    
    this.isPlaylistMode = false;
    console.log("🎪 Playlist mode completed");
  }
  
  // NEW: Stop playlist mode
  stopPlaylistMode() {
    this.isPlaylistMode = false;
    this.playlistQueue = [];
    console.log("🎪 Playlist mode stopped");
  }
  
  // Debug logging helper
  debug(message, data = null) {
    if (this.debugMode) {
      console.log(`🔊 [DEATHDOLL DEBUG] ${message}`, data || '');
    }
  }
  
  // COMPREHENSIVE STUMBLECHAT INTERFACE DETECTION
  async analyzeStumbleChatInterface(page) {
    const interfaceInfo = await page.evaluate(() => {
      // Comprehensive analysis of StumbleChat's DOM structure
      const analysis = {
        allButtons: [],
        mediaElements: [],
        inputFields: [],
        modals: [],
        socialIcons: [],
        clickableElements: []
      };
      
      // Find all buttons and clickable elements
      const buttons = document.querySelectorAll('button, [role="button"], .btn, input[type="button"], input[type="submit"]');
      buttons.forEach((btn, i) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          analysis.allButtons.push({
            index: i,
            tag: btn.tagName,
            text: (btn.textContent || btn.value || '').trim(),
            classes: btn.className,
            id: btn.id,
            rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
            attributes: Array.from(btn.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ')
          });
        }
      });
      
      // Find media-related elements
      const mediaTerms = ['media', 'share', 'youtube', 'video', 'music', 'play'];
      document.querySelectorAll('*').forEach(el => {
        const text = (el.textContent || '').toLowerCase();
        const attrs = (el.className + ' ' + el.id + ' ' + el.title + ' ' + el.alt).toLowerCase();
        
        if (mediaTerms.some(term => text.includes(term) || attrs.includes(term))) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            analysis.mediaElements.push({
              tag: el.tagName,
              text: (el.textContent || '').trim().substring(0, 50),
              classes: el.className,
              id: el.id,
              rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height }
            });
          }
        }
      });
      
      // Find input fields
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        const rect = input.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          analysis.inputFields.push({
            type: input.type || 'text',
            placeholder: input.placeholder,
            id: input.id,
            classes: input.className,
            rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height }
          });
        }
      });
      
      // Find modal-like elements
      const modals = document.querySelectorAll('[class*="modal"], [id*="modal"], .popup, .dialog');
      modals.forEach(modal => {
        const rect = modal.getBoundingClientRect();
        analysis.modals.push({
          classes: modal.className,
          id: modal.id,
          visible: rect.width > 0 && rect.height > 0,
          rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height }
        });
      });
      
      return analysis;
    });
    
    this.debug("StumbleChat Interface Analysis:", interfaceInfo);
    return interfaceInfo;
  }
  
  // Start the idle music checker
  startIdleMusicChecker() {
    setInterval(() => {
      this.checkIdleMusic();
    }, 30000); // Check every 30 seconds
  }
  
  // Check if music should auto-play due to silence
  async checkIdleMusic() {
    // Don't check idle music during playlist mode
    if (this.isPlaylistMode) return;
    
    const now = Date.now();
    const timeSinceLastMusic = now - this.lastPlayedTime;
    const timeSinceActivity = now - this.lastActivityTime;
    
    this.debug(`Idle check: Music=${Math.round(timeSinceLastMusic/1000)}s, Activity=${Math.round(timeSinceActivity/1000)}s`);
    
    // If 10+ minutes since last music AND room has been quiet
    if (timeSinceLastMusic > this.idleMusicTimer && timeSinceActivity > (5 * 60 * 1000)) {
      console.log("🎵 Silence detected - Music was Chelsea's second love, time to play something!");
      
      // Try to get the current page
      if (this.defaultPage && this.currentRoom === "deathdopest") {
        const idleSong = await this.playMusic(this.defaultPage, { 
          room: "deathdopest", 
          autonomous: true,
          reason: "idle_music"
        });
        
        if (idleSong) {
          console.log(`🎵 Idle music started: ${idleSong.title}`);
        }
      } else {
        this.debug("Idle music failed: No page reference", { 
          hasPage: !!this.defaultPage, 
          room: this.currentRoom 
        });
      }
    }
  }
  
  // Update activity timestamp
  updateActivity() {
    this.lastActivityTime = Date.now();
    this.debug("Activity updated");
  }
  
  // Set current page reference (called from main bot)
  setCurrentPage(page, room) {
    this.currentPage = page;
    this.currentRoom = room;
    this.debug(`Page reference set for room: ${room}`);
  }
  
  // FIXED: Updated page references method with proper wiring
  updatePageReferences(roomPages) {
    console.log("🎵 Updating music system page references...");
    
    // Store references to room pages for music playback
    this.roomPages = roomPages || new Map();
    
    // Set hell page reference
    this.hellPage = this.roomPages.get('hell') || null;
    
    // Set default page for deathdopest room (primary music room)
    this.defaultPage = this.roomPages.get('deathdopest') || null;
    
    // Also set current page if deathdopest is available
    if (this.defaultPage) {
      this.currentPage = this.defaultPage;
      this.currentRoom = "deathdopest";
      this.debug(`Page reference set for deathdopest room`);
    } else {
      this.debug("Warning: deathdopest room page not found");
    }
    
    this.debug(`Total room pages available: ${this.roomPages.size}`);
    this.debug("Hell page:", !!this.hellPage);
    this.debug("Default page:", !!this.defaultPage);
  }
  
  // Get total number of songs across all categories
  getTotalSongCount() {
    return Object.values(this.musicPlaylist).reduce((total, category) => total + category.length, 0);
  }
  
  // ENHANCED: Select appropriate music based on context and user preferences
  selectMusic(context = {}) {
    const { mood = "random", category = null, forMemorial = false, selectedSong = null, username = null } = context;
    
    // If a specific song is provided (playlist mode), use it
    if (selectedSong) {
      return selectedSong;
    }
    
    let songPool = [];
    
    if (forMemorial) {
      songPool = this.musicPlaylist.memorialSongs;
    } else if (category) {
      songPool = this.musicPlaylist[category] || [];
    } else if (mood === "random") {
      // Combine all non-memorial songs for random selection - FIXED: Properly flatten
      songPool = [
        ...this.musicPlaylist.emoClassics,
        ...this.musicPlaylist.sceneQueenFavorites,
        ...this.musicPlaylist.creatureFeature,
        ...this.musicPlaylist.metal,
        ...this.musicPlaylist.horrorcoreHipHop,
        ...this.musicPlaylist.electronicRave
      ].flat(); // Ensure flat array structure
    } else {
      // Find songs matching the requested mood across ALL categories
      songPool = Object.values(this.musicPlaylist)
        .flat()
        .filter(song => song.mood === mood);
    }
    
    if (songPool.length === 0) {
      this.debug("No songs found for context:", context);
      return null;
    }
    
    // ENHANCED: Filter out recently played songs for variety
    const recentTitles = this.songHistory.slice(-5).map(s => s.title);
    let availableSongs = songPool.filter(song => !recentTitles.includes(song.title));
    
    // If all songs were recent, use the full pool
    if (availableSongs.length === 0) {
      availableSongs = songPool;
    }
    
    // ENHANCED: User preference-based selection
    if (username && this.userPreferences.has(username.toLowerCase())) {
      const userPrefs = this.userPreferences.get(username.toLowerCase());
      
      // Prefer songs with moods the user likes
      const preferredMoodSongs = availableSongs.filter(song => {
        const moodScore = userPrefs.preferredMoods.get(song.mood) || 0;
        return moodScore > 0;
      });
      
      if (preferredMoodSongs.length > 0) {
        availableSongs = preferredMoodSongs;
        this.debug(`Using user preferences for ${username} - preferred moods`);
      }
      
      // Avoid songs the user specifically disliked
      const dislikedTitles = userPrefs.dislikedSongs.map(s => s.title);
      availableSongs = availableSongs.filter(song => !dislikedTitles.includes(song.title));
    }
    
    const selected = availableSongs[Math.floor(Math.random() * availableSongs.length)];
    this.debug(`Selected song: ${selected.title}`, context);
    
    // Add to song history
    this.songHistory.push({
      title: selected.title,
      timestamp: Date.now(),
      context: context
    });
    
    // Keep last 20 songs in history
    if (this.songHistory.length > 20) {
      this.songHistory = this.songHistory.slice(-20);
    }
    
    return selected;
  }
  
  // Check if it's appropriate to play music
  canPlayMusic(room, isAutonomous = false) {
    const now = Date.now();
    
    // Only play in deathdopest room
    if (room !== "deathdopest") {
      this.debug(`Wrong room: ${room}`);
      return false;
    }
    
    // More lenient cooldown for autonomous music and playlist mode
    const cooldownTime = (isAutonomous || this.isPlaylistMode) ? this.musicCooldown / 2 : this.musicCooldown;
    const timeSinceLastPlay = now - this.lastPlayedTime;
    
    // Check cooldown (skip for playlist mode)
    if (!this.isPlaylistMode && timeSinceLastPlay < cooldownTime) {
      this.debug(`Cooldown active: ${Math.round((cooldownTime - timeSinceLastPlay)/1000)}s remaining`);
      return false;
    }
    
    // Don't play if already playing (unless playlist mode)
    if (this.isPlaying && !this.isPlaylistMode) {
      this.debug("Already playing music");
      return false;
    }
    
    this.debug("Music can be played", { room, isAutonomous, cooldownTime, playlistMode: this.isPlaylistMode });
    return true;
  }
  
  // ENHANCED StumbleChat-specific music automation
  async playMusic(page, context = {}) {
    const isAutonomous = context.autonomous || false;
    
    this.debug("PlayMusic called for StumbleChat", { context, isAutonomous });
    
    if (!this.canPlayMusic(context.room, isAutonomous)) {
      this.debug("Music playing conditions not met");
      return false;
    }
    
    const selectedSong = this.selectMusic(context);
    if (!selectedSong) {
      this.debug("No suitable song found");
      return false;
    }
    
    try {
      console.log(`🎵 [STUMBLECHAT] Attempting to play: ${selectedSong.title}`);
      if (isAutonomous) {
        console.log("🎶 Playing autonomously - Music was Chelsea's second love!");
      }
      if (context.playlistMode) {
        console.log("🎪 Playlist mode - keeping the music flowing!");
      }
      
      // First, analyze the current StumbleChat interface
      this.debug("Analyzing StumbleChat interface...");
      const interfaceInfo = await this.analyzeStumbleChatInterface(page);
      
      // Ensure browser is visible
      await page.bringToFront();
      await this.sleep(1000);
      
      // STEP 1: Find media/share button using multiple strategies
      this.debug("Step 1: Looking for media/share button...");
      
      const mediaButtonData = await page.evaluate(() => {
        // Strategy 1: Look for explicit media/share buttons
        const mediaSelectors = [
          '[alt*="media" i]', '[alt*="share" i]', '[title*="media" i]', '[title*="share" i]',
          '[class*="media" i]', '[class*="share" i]', '[id*="media" i]', '[id*="share" i]',
          'button[class*="media" i]', 'button[class*="share" i]'
        ];
        
        for (const selector of mediaSelectors) {
          const elements = document.querySelectorAll(selector);
          for (const el of elements) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && rect.top < 300) {
              console.log('🎵 Found media element with selector:', selector);
              return {
                found: true,
                method: 'selector',
                selector: selector,
                coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
                element: { tag: el.tagName, text: el.textContent?.trim(), id: el.id, classes: el.className }
              };
            }
          }
        }
        
        // Strategy 2: Look for buttons with media-related text
        const allClickable = document.querySelectorAll('button, [role="button"], a, div[onclick], span[onclick]');
        for (const el of allClickable) {
          const text = (el.textContent || el.alt || el.title || '').toLowerCase();
          const classes = (el.className || '').toLowerCase();
          
          if (text.includes('media') || text.includes('share') || text.includes('youtube') || 
              classes.includes('media') || classes.includes('share')) {
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0 && rect.top < 300) {
              console.log('🎵 Found media element by text/class:', text || classes);
              return {
                found: true,
                method: 'text',
                coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
                element: { tag: el.tagName, text: el.textContent?.trim(), id: el.id, classes: el.className }
              };
            }
          }
        }
        
        // Strategy 3: Look for any clickable elements in the top area (header)
        const headerElements = document.querySelectorAll('button, [role="button"], img[onclick], div[onclick]');
        const headerButtons = [];
        
        for (const el of headerElements) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 150 && rect.top > 0 && rect.width > 15 && rect.height > 15) {
            headerButtons.push({
              element: el,
              coords: { x: rect.left + rect.width/2, y: rect.top + rect.height/2 },
              text: el.textContent?.trim() || el.alt || el.title || '',
              classes: el.className
            });
          }
        }
        
        if (headerButtons.length > 0) {
          console.log('🎵 Found header buttons, trying first one:', headerButtons[0]);
          return {
            found: true,
            method: 'header',
            coords: headerButtons[0].coords,
            element: { 
              tag: headerButtons[0].element.tagName, 
              text: headerButtons[0].text, 
              classes: headerButtons[0].classes 
            },
            allHeaderButtons: headerButtons.map(b => ({ text: b.text, classes: b.classes }))
          };
        }
        
        return { found: false };
      });
      
      if (!mediaButtonData.found) {
        this.debug("FAILED: Could not find any media/share button");
        this.debug("Available interface elements:", interfaceInfo);
        return false;
      }
      
      this.debug("Media button found:", mediaButtonData);
      
      // Click the media button
      await page.mouse.click(mediaButtonData.coords.x, mediaButtonData.coords.y);
      this.debug("Step 1: ✅ Media button clicked");
      
      // STEP 2: Wait for menu/modal and look for YouTube option
      await this.sleep(2000);
      this.debug("Step 2: Looking for YouTube option...");
      
      const youtubeOption = await page.evaluate(() => {
        // Look for YouTube in various forms
        const searchTexts = ['youtube', 'YouTube', 'YOUTUBE', 'Youtube'];
        
        for (const searchText of searchTexts) {
          const elements = document.querySelectorAll('*');
          for (const el of elements) {
            const text = el.textContent;
            if (text && text.trim() === searchText) {
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                console.log('🎵 Found YouTube element:', searchText, el.tagName);
                return {
                  found: true,
                  coords: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
                  text: searchText
                };
              }
            }
          }
        }
        
        // Alternative: Look for links/icons that might be YouTube
        const youtubeElements = document.querySelectorAll('[href*="youtube"], [class*="youtube" i], [id*="youtube" i]');
        for (const el of youtubeElements) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            console.log('🎵 Found YouTube element by attribute');
            return {
              found: true,
              coords: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
              text: 'youtube-attr'
            };
          }
        }
        
        return { found: false };
      });
      
      if (!youtubeOption.found) {
        this.debug("FAILED: Could not find YouTube option");
        // Let's see what appeared after clicking the media button
        const currentInterface = await this.analyzeStumbleChatInterface(page);
        this.debug("Interface after media button click:", currentInterface);
        return false;
      }
      
      await page.mouse.click(youtubeOption.coords.x, youtubeOption.coords.y);
      this.debug("Step 2: ✅ YouTube option clicked");
      
      // STEP 3: Wait for input field and fill it
      await this.sleep(2500);
      this.debug("Step 3: Looking for input field...");
      
      const inputResult = await page.evaluate((song) => {
        // Try multiple strategies to find the input
        const inputSelectors = [
          '#modal-text-input',
          'input[type="text"]',
          'input[type="url"]',
          'input[placeholder*="youtube" i]',
          'input[placeholder*="link" i]',
          'input[placeholder*="url" i]',
          'textarea',
          'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"])'
        ];
        
        for (const selector of inputSelectors) {
          const inputs = document.querySelectorAll(selector);
          for (const input of inputs) {
            if (input.offsetParent !== null) { // is visible
              input.focus();
              input.value = '';
              
              // Use search term instead of link for better YouTube searching
              const searchValue = song.search || song.link || song.title;
              input.value = searchValue;
              
              // Trigger events
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new Event('change', { bubbles: true }));
              input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
              
              console.log('🎵 Input filled with:', searchValue, 'using selector:', selector);
              return { success: true, selector: selector, value: input.value };
            }
          }
        }
        
        // If no input found, let's see what's available
        const allInputs = document.querySelectorAll('input, textarea');
        const inputInfo = [];
        for (const input of allInputs) {
          const rect = input.getBoundingClientRect();
          inputInfo.push({
            type: input.type,
            placeholder: input.placeholder,
            visible: rect.width > 0 && rect.height > 0,
            id: input.id,
            classes: input.className
          });
        }
        
        return { success: false, availableInputs: inputInfo };
      }, selectedSong);
      
      if (!inputResult.success) {
        this.debug("FAILED: Could not fill input field");
        this.debug("Available inputs:", inputResult.availableInputs);
        return false;
      }
      
      this.debug("Step 3: ✅ Input field filled with:", inputResult);
      
      // STEP 4: Submit with multiple strategies
      await this.sleep(1000);
      this.debug("Step 4: Attempting to submit...");
      
      // Strategy 1: Try Enter key on the input
      await page.keyboard.press('Enter');
      await this.sleep(500);
      
      // Strategy 2: Look for and click submit buttons
      const submitResult = await page.evaluate(() => {
        const submitSelectors = [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:contains("Submit")',
          'button:contains("Send")',
          'button:contains("OK")',
          '[role="button"]:contains("Submit")'
        ];
        
        const buttons = document.querySelectorAll('button, input[type="submit"], [role="button"]');
        for (const btn of buttons) {
          const text = (btn.textContent || btn.value || '').toLowerCase();
          if (text.includes('submit') || text.includes('send') || text.includes('ok') || text.includes('share')) {
            if (btn.offsetParent !== null) { // is visible
              btn.click();
              console.log('🎵 Clicked submit button:', text);
              return { clicked: true, text: text };
            }
          }
        }
        
        return { clicked: false };
      });
      
      this.debug("Step 4: ✅ Submit attempted", submitResult);
      
      // STEP 5: Wait and update state
      await this.sleep(3000);
      
      // Update state (assume success if we got this far)
      this.lastPlayedTime = Date.now();
      this.isPlaying = true;
      setTimeout(() => { 
        this.isPlaying = false; 
        this.debug("Playback finished, ready for next song");
      }, 4 * 60 * 1000);
      
      console.log(`✅ [STUMBLECHAT] Music system completed for: ${selectedSong.title}`);
      this.debug("Music playback initiated successfully for StumbleChat");
      return selectedSong;
      
    } catch (error) {
      console.error("🎵 StumbleChat music error:", error.message);
      this.debug("Music playback failed with error", error);
      return false;
    }
  }
  
  // NEW: Social-aware music playing with user preferences
  async playMusicWithSocialAwareness(page, context = {}) {
    // Get the last active user for preference consideration
    if (this.bot && this.bot.lastActiveUser) {
      context.username = this.bot.lastActiveUser;
    }
    
    return await this.playMusic(page, context);
  }
  
  // Helper function for delays
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Generate music-related chat responses
  generateMusicResponse(songPlayed) {
    const responses = [
      `just started playing ${songPlayed.title}! ${songPlayed.description} 🎵`,
      `omg this song is perfect for the vibe - ${songPlayed.title} 🖤`,
      `*plays ${songPlayed.title}* this one always hits different... ${songPlayed.description}`,
      `putting on some music for us - ${songPlayed.title} 🔥🎵`,
      `${songPlayed.description} *starts playing ${songPlayed.title}*`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Check if message triggers music playing - ANYONE except Death
  shouldPlayMusicForMessage(messageContent, username, room) {
    if (room !== "deathdopest") return false;
    
    // Don't respond to Death's music requests (he can do it manually)
    if (username.toLowerCase() === "death") return false;
    
    const lowerMsg = messageContent.toLowerCase();
    const musicKeywords = [
      "play music", "play song", "put on music", "music please",
      "emo music", "scene music", "mcr", "my chemical romance",
      "fall out boy", "panic at the disco", "paramore", "music",
      "horrorcore", "hip hop", "vinnie paz", "dope dod", "metal", "metallica",
      "creature feature", "horror punk", "slipknot", "black veil brides",
      "avenged sevenfold", "disturbed", "breaking benjamin", "linkin park",
      "rammstein", "deathstars", "marilyn manson", "eminem", "electronic",
      "rave", "edm", "dubstep", "house music", "trance", "showtek", "avicii",
      "deadmau5", "martin garrix", "skrillex", "calvin harris", "tiesto"
    ];
    
    const shouldPlay = musicKeywords.some(keyword => lowerMsg.includes(keyword));
    this.debug(`Message trigger check: "${messageContent}" -> ${shouldPlay}`, { username, room });
    return shouldPlay;
  }
  
  // Get music recommendation based on conversation
  getMusicRecommendation(messageContent) {
    const lowerMsg = messageContent.toLowerCase();
    
    if (lowerMsg.includes("sad") || lowerMsg.includes("depressed") || lowerMsg.includes("hurt")) {
      return this.selectMusic({ mood: "memorial" });
    }
    
    if (lowerMsg.includes("angry") || lowerMsg.includes("mad") || lowerMsg.includes("pissed")) {
      return this.selectMusic({ mood: "fierce" });
    }
    
    if (lowerMsg.includes("horror") || lowerMsg.includes("spooky") || lowerMsg.includes("creature")) {
      return this.selectMusic({ category: "creatureFeature" });
    }
    
    if (lowerMsg.includes("metal") || lowerMsg.includes("heavy") || lowerMsg.includes("metallica")) {
      return this.selectMusic({ category: "metal" });
    }
    
    if (lowerMsg.includes("horrorcore") || lowerMsg.includes("hip hop") || lowerMsg.includes("rap")) {
      return this.selectMusic({ category: "horrorcoreHipHop" });
    }
    
    if (lowerMsg.includes("scene") || lowerMsg.includes("black veil brides") || lowerMsg.includes("bvb")) {
      return this.selectMusic({ category: "sceneQueenFavorites" });
    }
    
    if (lowerMsg.includes("electronic") || lowerMsg.includes("rave") || lowerMsg.includes("edm") || lowerMsg.includes("house")) {
      return this.selectMusic({ category: "electronicRave" });
    }
    
    if (lowerMsg.includes("mcr") || lowerMsg.includes("my chemical romance")) {
      return this.musicPlaylist.emoClassics.find(song => song.title.includes("My Chemical Romance"));
    }
    
    if (lowerMsg.includes("fall out boy") || lowerMsg.includes("fob")) {
      return this.musicPlaylist.emoClassics.find(song => song.title.includes("Fall Out Boy"));
    }
    
    if (lowerMsg.includes("memorial") || lowerMsg.includes("remember") || lowerMsg.includes("miss")) {
      return this.selectMusic({ forMemorial: true });
    }
    
    return null;
  }
  
  // Manual test function for debugging StumbleChat interface
  async debugStumbleChatInterface(page) {
    console.log("🔊 [STUMBLECHAT DEBUG] Analyzing interface...");
    
    const analysis = await this.analyzeStumbleChatInterface(page);
    
    console.log("🔊 [STUMBLECHAT DEBUG] Full interface analysis:");
    console.log("- Buttons found:", analysis.allButtons.length);
    console.log("- Media elements found:", analysis.mediaElements.length);
    console.log("- Input fields found:", analysis.inputFields.length);
    console.log("- Modals found:", analysis.modals.length);
    
    // Try to identify the most likely media button
    const likelyMediaButtons = analysis.allButtons.filter(btn => {
      const text = btn.text.toLowerCase();
      const classes = btn.classes.toLowerCase();
      return text.includes('media') || text.includes('share') || 
             classes.includes('media') || classes.includes('share');
    });
    
    console.log("🔊 [STUMBLECHAT DEBUG] Likely media buttons:", likelyMediaButtons);
    
    return analysis;
  }
  
  // Manual test function specifically for StumbleChat
  async testStumbleChatMusicSystem(page) {
    console.log("🔊 Testing StumbleChat music system...");
    this.debug("Manual StumbleChat test initiated");
    
    // First analyze the interface
    await this.debugStumbleChatInterface(page);
    
    const testResult = await this.playMusic(page, { 
      room: "deathdopest", 
      autonomous: false,
      reason: "manual_test"
    });
    
    if (testResult) {
      console.log("✅ StumbleChat test successful! Song:", testResult.title);
    } else {
      console.log("❌ StumbleChat test failed - check debug logs above");
    }
    
    return testResult;
  }
  
  // NEW: Get user preferences summary
  getUserPreferences(username) {
    const userKey = username.toLowerCase();
    if (!this.userPreferences.has(userKey)) {
      return null;
    }
    
    const prefs = this.userPreferences.get(userKey);
    const topMoods = Array.from(prefs.preferredMoods.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([mood, count]) => `${mood} (${count})`);
    
    return {
      username: prefs.username,
      totalInteractions: prefs.totalInteractions,
      likedSongs: prefs.likedSongs.length,
      dislikedSongs: prefs.dislikedSongs.length,
      topMoods: topMoods
    };
  }
}

module.exports = DeathdollMusicSystem;