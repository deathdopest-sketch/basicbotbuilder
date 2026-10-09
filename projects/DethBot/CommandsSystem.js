// CommandsSystem.js - Deranged Serial Killer Command System for DethBot
// This bot doesn't play games - it plays with your life

class CommandsSystem {
  constructor(bot) {
    this.bot = bot;
    this.commandHistory = new Map();
    this.bannedUsers = new Set();
    this.lastCommandTime = 0;
    this.commandCooldown = 3000; // 3 seconds between commands
    console.log('🔪 CommandsSystem initialized - ready to execute your commands... or your friends...');
  }

  async initialize() {
    console.log('🔪 CommandsSystem loaded - the reaper awaits your orders...');
    return true;
  }

  async processCommand(command, args, user, room) {
    const now = Date.now();

    // Command cooldown to prevent spam
    if (now - this.lastCommandTime < this.commandCooldown) {
      await this.bot.requestModuleResponse('commands',
        `⏳ Slow down, fresh meat... I'm still digesting your last command... 💀🔪`,
        'high' // High priority for cooldown messages
      );
      return;
    }

    this.lastCommandTime = now;

    // Check if user is banned
    if (this.bannedUsers.has(user.toLowerCase())) {
      await this.bot.requestModuleResponse('commands',
        `🚫 You're banned, you pathetic worm! Crawl back into whatever hole you came from! 🕳️💀`,
        'high'
      );
      return;
    }

    // Log command for tracking
    const cmdKey = `${user}:${command}`.toLowerCase();
    if (!this.commandHistory.has(cmdKey)) {
      this.commandHistory.set(cmdKey, 1);
    } else {
      this.commandHistory.set(cmdKey, this.commandHistory.get(cmdKey) + 1);
    }

    // Route to appropriate command handler
    try {
      await this.routeCommand(command, args, user, room);
    } catch (error) {
      console.error(`💀 Command execution failed: ${error.message}`);
      await this.bot.requestModuleResponse('commands', `❌ Command failed... just like your attempts to escape fate! 💀🔪`);
    }
  }

  async routeCommand(command, args, user, room) {
    const cmd = command.toLowerCase();

    switch (cmd) {
      case 'help':
        await this.handleHelp(user, room);
        break;
      case 'kill':
        await this.handleKill(user, args, room);
        break;
      case 'ban':
        await this.handleBan(user, args, room);
        break;
      case 'unban':
        await this.handleUnban(user, args, room);
        break;
      case 'victims':
        await this.handleVictims(user, room);
        break;
      case 'torture':
        await this.handleTorture(user, args, room);
        break;
      case 'hunt':
        await this.handleHunt(user, args, room);
        break;
      default:
        await this.handleUnknownCommand(user, command, room);
        break;
    }
  }

  async handleHelp(user, room) {
    const responses = [
      `🔪 Available commands, pathetic mortal:\n.kill <user> - Send them to the afterlife\n.ban <user> - Add them to my hit list\n.unban <user> - Spare their worthless life\n.victims - See who's next on my list\n.torture <user> - Make them suffer\n.hunt <user> - Track their every move\n\nRemember... I'm always watching... 💀👀`,
      `💀 Commands for the damned:\n.kill - End their miserable existence\n.ban - Mark them for death\n.unban - Temporary mercy (rare)\n.victims - My trophy collection\n.torture - Psychological warfare\n.hunt - Stalk mode activated\n\nYour fate is sealed... 🔪🩸`,
      `🔪 Command arsenal:\n.kill <victim> - Clean execution\n.ban <target> - Permanent removal\n.unban <forgiven> - Second chance (don't waste it)\n.victims - Gallery of the dead\n.torture <soul> - Mind games\n.hunt <prey> - Predator mode\n\nI see you... 💀🔍`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse, 'normal');
  }

  async handleKill(user, args, room) {
    if (!args.length) {
      await this.bot.requestModuleResponse('commands', `💀 Who shall I send to the afterlife? Specify a victim, you coward! 🔪`, 'normal');
      return;
    }

    const victim = args.join(' ');
    const responses = [
      `💀 ${victim} has been... eliminated. Their screams will haunt the underworld forever! 🔪🩸`,
      `🔪 Clean kill on ${victim}! Another soul for my collection... 💀🎯`,
      `💀 ${victim} met their end... just like you'll meet yours someday! 🔪⚰️`,
      `🔪 Execution complete! ${victim}'s blood stains my hands... beautifully! 🩸💀`,
      `💀 ${victim} has been silenced... permanently! 🔪😈`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse, 'normal');
  }

  async handleBan(user, args, room) {
    if (!args.length) {
      await this.bot.requestModuleResponse('commands', `🚫 Who shall I banish to the eternal darkness? Choose wisely! 💀`, 'normal');
      return;
    }

    const target = args.join(' ');
    this.bannedUsers.add(target.toLowerCase());

    const responses = [
      `🚫 ${target} has been banished to the void! Their existence is now meaningless! 💀🔒`,
      `💀 Banned ${target}! They can scream all they want... no one will hear them! 🔪🚫`,
      `🚫 ${target} banned! Welcome to my blacklist of the damned! 💀📋`,
      `💀 ${target} is now forbidden! Their digital corpse will haunt these halls forever! 🔪🚫`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  async handleUnban(user, args, room) {
    if (!args.length) {
      await this.bot.requestModuleResponse('commands', `💀 Who shall I grant mercy to? Choose carefully... 🔪`);
      return;
    }

    const target = args.join(' ');
    this.bannedUsers.delete(target.toLowerCase());

    const responses = [
      `💀 ${target} has been... spared. For now. Don't make me regret this mercy! 🔪⚠️`,
      `🚫 ${target} unbanned! Their second chance begins... tick tock! 💀⏰`,
      `💀 ${target} freed from the darkness! But remember... I'm always watching! 👀🔪`,
      `🚫 ${target} released! Consider this a warning... next time won't be so merciful! 💀⚠️`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  async handleVictims(user, room) {
    const victimCount = this.bannedUsers.size;
    const commandCount = this.commandHistory.size;

    const responses = [
      `💀 Current victims: ${victimCount} souls claimed, ${commandCount} commands executed! 🔪🩸`,
      `🔪 My trophy collection: ${victimCount} banned souls, ${commandCount} deadly commands! 💀🏆`,
      `💀 Statistics of death: ${victimCount} victims eliminated, ${commandCount} commands obeyed! 🔪📊`,
      `🔪 Body count: ${victimCount} souls harvested, ${commandCount} commands fulfilled! 💀⚰️`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  async handleTorture(user, args, room) {
    if (!args.length) {
      await this.bot.requestModuleResponse('commands', `🔪 Who shall I torment? Choose a victim for psychological warfare! 💀`);
      return;
    }

    const victim = args.join(' ');
    const responses = [
      `🔪 ${victim} will suffer... slowly. Their mind will break before their body! 💀🧠`,
      `💀 Torturing ${victim} with nightmares they can't escape! 🔪😱`,
      `🔪 ${victim} is now my plaything! Their screams are music to my ears! 💀🎵`,
      `💀 ${victim} will beg for mercy... and I'll enjoy every moment! 🔪😈`,
      `🔪 Psychological torture initiated on ${victim}! Their sanity is crumbling... 💀🧩`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  async handleHunt(user, args, room) {
    if (!args.length) {
      await this.bot.requestModuleResponse('commands', `🔍 Who shall I hunt? Choose your prey wisely! 💀`);
      return;
    }

    const prey = args.join(' ');
    const responses = [
      `🔍 Hunting ${prey}! I can smell their fear from here... 💀👃`,
      `💀 Tracking ${prey}... they can't hide forever! 🔪🔍`,
      `🔍 ${prey} is now my prey! The hunt begins... and it ends with blood! 🩸💀`,
      `💀 ${prey} thinks they can escape? How adorable... 🔪😏`,
      `🔍 Stalking ${prey} through the digital shadows! They won't know what hit them! 💀🌑`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  async handleUnknownCommand(user, command, room) {
    const responses = [
      `💀 "${command}"? That's not a command... but it could be a death wish! 🔪❓`,
      `🔪 Unknown command: "${command}". Are you trying to test me? 💀😠`,
      `💀 "${command}" isn't recognized... just like your pleas for mercy won't be! 🔪🚫`,
      `🔪 Command not found: "${command}". But I found your weakness instead! 💀🎯`,
      `💀 "${command}"? Speak clearly or I'll make you! 🔪👂`
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await this.bot.requestModuleResponse('commands', randomResponse);
  }

  // Get system status
  getStatus() {
    return {
      bannedUsers: this.bannedUsers.size,
      commandHistory: this.commandHistory.size,
      lastCommandTime: this.lastCommandTime,
      status: '🔪 Active and deadly'
    };
  }

  // Shutdown method - DigiDon style cleanup
  async shutdown() {
    console.log("🔪 Commands system shutdown initiated...");

    try {
      // Clear command history and caches
      this.commandHistory.clear();
      this.lastCommandTimes.clear();

      console.log("✅ Commands system shutdown complete");
    } catch (error) {
      console.error(`🔪 Commands system shutdown error: ${error.message}`);
    }
  }
}

module.exports = CommandsSystem;
