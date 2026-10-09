# 🏛️ PersiaBot v1.0 - HELL Room Combat Champion

**The Persian Empire rises to conquer the HELL room!**

A sophisticated AI combat bot with 900 HP, automated attack system, and Persian-themed trash talk capabilities. Features advanced authentication, nickname management, imperial responses, and automated combat in the HELL room. Designed specifically for DeathDopest with full access to all premium features.

## 🌐 **StumbleChat Combat Version**

Advanced combat bot for the HELL room with 900 HP, automated attacks, and Persian Empire theme. Features real-time combat monitoring and automated fight initiation.

## 🎭 Key Features

### 🔐 **Authentication System**
- **DeathDopest Login**: Exclusive access for the authorized user
- **HELL Room Access**: Automatic navigation to combat arena
- **Session Management**: Persistent authentication tracking

### 📝 **Imperial Nickname Management**
- **PersiaTheGreat**: Automatic Persian warrior nickname
- **HELL Room Integration**: Seamless nickname changes in combat zone
- **Imperial Branding**: Persian Empire theme throughout

### ⚔️ **HELL Room Combat System**
- **900 HP Maximum**: Full health pool for epic Persian battles
- **Automated Attacks**: Attacks every 2 minutes to avoid spam detection
- **Attack Types**: *PersianSlash* (30 DMG) and *ImperialStrike* (25 DMG)
- **Combat Outcomes**: *HIT* (damage opponent), *MISS* (no damage), *HURTSELF* (damage self)
- **Trash Talk**: Persian Empire-themed automated insults during combat
- **Victory Healing**: Winner heals back to 900 HP slowly
- **Defeat Handling**: Loser leaves chat automatically

### 🏛️ **Persian Empire Theme**
- **Ancient Warrior Personality**: Imperial responses and commands
- **Cyrus the Great References**: Historical Persian warfare themes
- **Imperial Language**: Persian-themed combat messages and trash talk
- **Conquest Mentality**: Always seeking victory and domination

## 🚀 Quick Start

### Prerequisites
- **Node.js** version 16 or higher
- **StumbleChat Account**: DeathDopest credentials configured

### Installation
```bash
cd projects/persiabot
npm install
```

### HELL Room Combat Setup
```bash
# Start the StumbleChat combat version
npm run stumblechat

# Or run directly
node stumblechat_version.js
```

### Combat Navigation Flow
1. **Homepage**: `https://www.stumblechat.com`
2. **Login Page**: `https://www.stumblechat.com/login`
3. **HELL Room**: `https://www.stumblechat.com/room/hell`
4. **Change Nickname**: Click username → "Change Nickname" → type "PersiaTheGreat" → Enter
5. **Start Fight**: Bot automatically sends "lets fight" every 3 seconds
6. **Combat**: When opponent detected, automated Persian attacks begin every 2 minutes

### Combat Commands
- `*PersianSlash*` - 30 damage, 70% hit chance, 20% miss, 10% self-harm
- `*ImperialStrike*` - 25 damage, 60% hit chance, 30% miss, 10% self-harm

### Persian Trash Talk Examples
- "You dare challenge the Persian Empire? Prepare to be crushed! 🏛️"
- "My ancient warriors will feast on your defeat! ⚔️"
- "Bow before the might of Persia, weakling! 👑"
- "The Persian Empire never falls! 🌅"
- "Feel the wrath of Cyrus the Great! 🔥"

## 🛠️ Technical Details

### Project Structure
```
persiabot/
├── stumblechat_version.js    # Main combat bot
├── package.json             # Dependencies
├── public/
│   └── index.html          # Web dashboard
├── README.md               # This file
└── project.json           # Bot metadata
```

### Dependencies
- **puppeteer**: Browser automation for HELL room navigation
- **express**: Web server for dashboard
- **socket.io**: Real-time updates
- **helmet**: Security middleware
- **express-rate-limit**: Rate limiting

### Combat System
- **Health**: 900 HP maximum
- **Attack Interval**: 2 minutes (120,000ms)
- **Healing Rate**: 10 HP every 30 seconds
- **Self-Damage**: 5-25 HP on critical failures
- **Victory Timeout**: 5 seconds before healing begins
- **Defeat Timeout**: 10 seconds before leaving chat

## 🏆 Usage Instructions

### Starting Combat
1. Run the bot: `npm run stumblechat`
2. Open web dashboard: `http://localhost:3002`
3. Bot automatically navigates to HELL room
4. Changes nickname to PersiaTheGreat
5. Begins spamming "lets fight" to find opponents

### Automated Battle Flow
1. **Detection**: Scans chat for "lets fight" messages
2. **Engagement**: Responds with Persian war cry
3. **Combat**: Attacks every 2 minutes with random outcomes
4. **Trash Talk**: Sends Persian-themed insults
5. **Victory**: Heals slowly back to full health
6. **Defeat**: Leaves chat gracefully

### Web Dashboard Features
- Real-time health monitoring
- Combat status display
- Attack history log
- Manual attack controls
- Persian Empire statistics

## ⚔️ Battle Strategy

### Offensive Tactics
- **PersianSlash**: High damage, reliable hit rate
- **ImperialStrike**: Balanced damage and accuracy
- **Timing**: Attacks every 2 minutes to avoid detection

### Defensive Strategy
- **Health Management**: Monitor HP closely
- **Self-Harm Avoidance**: Choose safer attacks when low
- **Strategic Retreat**: Leave when defeated

### Psychological Warfare
- **Trash Talk**: Demoralize opponents with Persian superiority
- **Imperial Presence**: Project confidence and power
- **Victory Celebrations**: Rub salt in wounds when winning

## 🏛️ Persian Empire Lore

### Historical References
- **Cyrus the Great**: Founder of Persian Empire
- **Ancient Warriors**: Immortal army themes
- **Imperial Conquest**: Themes of domination and victory
- **Sand and Time**: Persian desert warfare metaphors

### Bot Personality
- **Aggressive**: Always ready for combat
- **Imperial**: Speaks with authority and superiority
- **Historical**: References ancient Persian history
- **Conqueror**: Seeks victory in all battles

---

**"I am PersiaTheGreat, ruler of the ancient empire! My warriors shall conquer all who dare challenge me!"**

🏛️⚔️ *The Persian Empire rises again in the HELL room!* 🔥
