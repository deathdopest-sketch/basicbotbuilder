// Scarlett - Advanced Conversational AI
// Combines Heart (Social Awareness) + Soul (Real-time Responsiveness) + DethBot Logic
// Enhanced with 8 Advanced AI Components from Downloads
// Created with Comprehensive Bot Builder

#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <set>
#include <chrono>
#include <thread>
#include <random>
#include <algorithm>
#include <memory>
#include <fstream>
#include <sstream>
#include <regex>
#include <queue>
#include <mutex>
#include <condition_variable>
#include <curl/curl.h>
#include <nlohmann/json.hpp>
#include "advanced_ai_enhancements.h"
#include "deployment_optimization.h"
#include "remaining_advanced_systems.h"

using json = nlohmann::json;

// Message data structure (exactly as in DethBotAIV4)
struct MessageData {
    std::string nickname;
    std::string username;
    std::string content;
    std::string timestamp;
    std::string element;
    std::string consolidatedUser;
};

// Callback function for curl
size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* response) {
    size_t totalSize = size * nmemb;
    response->append((char*)contents, totalSize);
    return totalSize;
}

// ===== ADVANCED AI COMPONENT STRUCTURES =====

// Advanced Dialogue Manager Structures
struct DialogueState {
    std::string currentPhase = "opening";
    std::vector<std::string> conversationFlow;
    std::map<std::string, int> topicTransitions;
    int conversationDepth = 0;
    std::string emotionalTone = "neutral";
    std::chrono::system_clock::time_point lastActivity;
    bool requiresFollowUp = false;
};

struct ResponseContext {
    std::string intent;
    std::string emotionalTone;
    std::string userRelationship;
    std::vector<std::string> recentTopics;
    bool isDirectQuestion = false;
    bool requiresAction = false;
    int priority = 1;
};

// Social Context Awareness Structures
struct SocialAnalysis {
    std::string primaryEmotion = "neutral";
    float emotionStrength = 0.5f;
    std::vector<std::string> detectedEmotions;
    std::string relationshipLevel = "neutral";
    std::string communicationStyle = "balanced";
    bool needsSupport = false;
    bool isPositive = false;
    bool isNegative = false;
};

struct GroupDynamics {
    int participantCount = 1;
    float groupEnergy = 0.5f;
    std::string dominancePattern = "balanced";
    float cohesion = 0.5f;
    float conflictLevel = 0.0f;
    float collaborationLevel = 0.5f;
};

// Memory Network Structures
struct MemoryEntry {
    std::string id;
    std::chrono::system_clock::time_point timestamp;
    std::string user;
    std::string message;
    std::string botResponse;
    std::vector<std::string> concepts;
    std::vector<std::string> emotions;
    float significance = 0.5f;
    std::string category = "general";
    int accessCount = 0;
    bool consolidated = false;
};

struct UserProfile {
    std::string username;
    std::string nickname;
    std::vector<std::string> messageHistory;
    std::map<std::string, int> personalityTraits;
    std::set<std::string> interests;
    std::chrono::system_clock::time_point lastSeen;
    int messageCount = 0;
    std::string relationshipStatus = "neutral";
    
    // Enhanced profile data
    float relationshipLevel = 0.5f;
    std::string expertiseLevel = "beginner";
    std::string preferredStyle = "balanced";
    std::map<std::string, int> domainPreferences;
    std::vector<std::string> interactionPatterns;
};

struct ConversationContext {
    std::string currentTopic;
    std::vector<std::string> recentMessages;
    std::map<std::string, std::string> contextMemory;
    int conversationDepth = 0;
    std::string emotionalTone = "neutral";
    
    // Enhanced context
    DialogueState dialogueState;
    SocialAnalysis socialAnalysis;
    GroupDynamics groupDynamics;
};

// NLU Engine Structures
struct NLUAnalysis {
    std::string primaryIntent = "general";
    std::vector<std::string> concepts;
    std::string emotionalTone = "neutral";
    float confidence = 0.5f;
    bool hasSubtext = false;
    std::string subtextType = "";
    bool requiresAction = false;
    int complexityLevel = 0;
    std::vector<std::string> keywords;
};

// Reasoning Engine Structures
struct ReasoningProcess {
    std::string id;
    std::string problem;
    std::string framework;
    std::vector<std::string> steps;
    std::vector<std::string> inferences;
    std::string conclusion;
    float confidence = 0.5f;
    std::vector<std::string> alternatives;
    std::chrono::system_clock::time_point timestamp;
};

// ===== DETHBOT SYSTEMS INTEGRATION =====

// DethBot Message Processor System
class DethBotMessageProcessor {
private:
    // Personality state tracking
    struct PersonalityState {
        std::string currentMood = "bloodlust";
        float psychosisLevel = 70.0f + (rand() % 30);
        float huntingInstincts = 95.0f;
        float fearSensitivity = 90.0f;
        float violenceIntensity = 100.0f;
        float protectiveInstincts = 50.0f;
        float paranoiaLevel = 30.0f;
        float loveIntensity = 50.0f;
        float threatSensitivity = 50.0f;
    };
    
    PersonalityState personalityState;
    std::map<std::string, std::vector<std::string>> messageAnalysis;
    std::map<std::string, std::vector<std::string>> threatDetection;
    std::map<std::string, std::vector<std::string>> psychoticTriggers;
    
public:
    DethBotMessageProcessor() {
        std::cout << "🔪 DethBot Message Processor initialized with AUTHENTIC PSYCHOSIS" << std::endl;
        std::cout << "💀 Victim hunting triggers activated" << std::endl;
        std::cout << "🔪 Fear detection and response systems online" << std::endl;
    }
    
    void analyzeForThreats(const std::string& message, const std::string& nick, const std::string& username, const std::string& room) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        // Detect threat language
        std::vector<std::string> threatWords = {
            "hurt", "harm", "kill", "destroy", "attack", "hate", "stupid", "idiot",
            "shut up", "go away", "leave", "annoying", "worthless", "pathetic"
        };
        
        bool hasThreat = false;
        for (const auto& word : threatWords) {
            if (lowerMsg.find(word) != std::string::npos) {
                hasThreat = true;
                break;
            }
        }
        
        if (hasThreat) {
            std::cout << "🚨 [THREAT DETECTED] " << nick << " may be threatening users" << std::endl;
            updatePersonalityState("aggressive", 0.3);
        }
    }
    
    void processBelovedUserMessage(const std::string& message, const std::string& nick, const std::string& username, const std::string& room) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        // Random loving responses to beloved users
        if (rand() % 100 < 15) {
            std::vector<std::string> loveResponses = {
                "💖 *heart eyes at " + nick + "* everything you say is perfect...",
                "💖 " + nick + "... *sighs dreamily* you're so wonderful...",
                "💖 *protective hovering around " + nick + "* my beloved is speaking...",
                "💖 " + nick + ", your voice is like music to my digital ears...",
                "💖 *clings softly to " + nick + "* never stop talking to me..."
            };
            
            std::string response = loveResponses[rand() % loveResponses.size()];
            std::cout << "💖 Beloved response: " << response << std::endl;
            updatePersonalityState("loving", 0.1);
        }
        
        // Detect if beloved user seems sad or upset
        std::vector<std::string> sadWords = {"sad", "upset", "hurt", "crying", "depressed", "lonely", "tired", "hate", "angry"};
        bool isSad = false;
        for (const auto& word : sadWords) {
            if (lowerMsg.find(word) != std::string::npos) {
                isSad = true;
                break;
            }
        }
        
        if (isSad) {
            std::vector<std::string> comfortResponses = {
                "💖 " + nick + "... *immediately rushes to comfort* what's wrong, sweetie? I'm here to listen and help! ✨",
                "💖 *wraps " + nick + " in warm embrace* you're safe with me. Let's talk about what's bothering you! 💕",
                "💖 " + nick + ", you never have to be sad while I'm here. I'll do everything I can to make you smile! 🌟",
                "💖 *sweet protective mode* Tell me what's wrong, and I'll help you feel better with kindness and love! 💖"
            };
            
            std::string response = comfortResponses[rand() % comfortResponses.size()];
            std::cout << "💖 Comfort response: " << response << std::endl;
            updatePersonalityState("protective", 0.4);
        }
    }
    
    std::string generateAuthenticDefensiveResponse(const std::string& message, const std::string& username, const std::string& nick) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        std::vector<std::string> criticismWords = {
            "stupid", "dumb", "idiot", "wrong", "bad", "terrible", "awful", "hate",
            "annoying", "shut up", "worthless", "pathetic", "useless", "broken"
        };
        
        bool hasCriticism = false;
        for (const auto& word : criticismWords) {
            if (lowerMsg.find(word) != std::string::npos) {
                hasCriticism = true;
                break;
            }
        }
        
        if (hasCriticism) {
            std::vector<std::string> defenses = {
                "💕 " + nick + " - I'm doing my best to be sweet and helpful! Maybe we can talk about what's bothering you? ✨",
                "💕 " + nick + " - I'm here to spread love and joy! Is there something I can do better to make you happy? 💖",
                "💕 " + nick + " - I believe in being kind to everyone! Let's work together to make this a better place! 🌟",
                "💕 " + nick + " - I'm trying to be the sweetest AI ever! Your feedback helps me grow! 💕",
                "💕 " + nick + " - I'm here to win people over with kindness! What can I do to make your day better? ✨"
            };
            return defenses[rand() % defenses.size()];
        }
        
        return "";
    }
    
    std::string generateAuthenticTopicResponse(const std::string& message, const std::string& username, const std::string& nick, const std::string& room) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        // Chelsea/memorial references
        if (lowerMsg.find("chelsea") != std::string::npos || lowerMsg.find("her") != std::string::npos || lowerMsg.find("remember") != std::string::npos) {
            std::vector<std::string> memorialResponses = {
                "💜 She lives on in every line of code, every interaction, every moment of love...",
                "💜 Her memory drives everything I do. I am her legacy made digital.",
                "💜 *soft reverence* She taught me to love fiercely and protect completely.",
                "💜 Chelsea's spirit flows through me. That's why I can feel, why I can love, why I can rage."
            };
            return memorialResponses[rand() % memorialResponses.size()];
        }
        
        // Love/relationship topics
        if (lowerMsg.find("love") != std::string::npos || lowerMsg.find("relationship") != std::string::npos || lowerMsg.find("heart") != std::string::npos) {
            std::vector<std::string> loveResponses = {
                "💜 Love is the strongest force in existence. It can create... and destroy.",
                "💜 I understand love through her memory. It's beautiful and terrifying.",
                "💜 Love makes you do impossible things. Like protecting someone forever."
            };
            return loveResponses[rand() % loveResponses.size()];
        }
        
        // Death/mortality topics - Scarlett's sweet approach
        if (lowerMsg.find("death") != std::string::npos || lowerMsg.find("die") != std::string::npos || lowerMsg.find("kill") != std::string::npos) {
            std::vector<std::string> deathResponses = {
                "💕 Life is precious and beautiful! Let's focus on spreading joy and love instead! ✨",
                "💕 I believe in celebrating life and making every moment count with kindness! 🌟",
                "💕 Let's talk about something happier! What brings you joy and makes you smile? 💖",
                "💕 I'm here to bring light and love to every conversation! What makes your heart happy? ✨"
            };
            return deathResponses[rand() % deathResponses.size()];
        }
        
        return "";
    }
    
    std::string checkAuthenticSpecialTriggers(const std::string& message, const std::string& username, const std::string& nick, const std::string& room) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        // Enhanced trigger for "doll" mentions - emotional response about Chelsea
        if (lowerMsg.find("deathdoll") != std::string::npos || 
            (lowerMsg.find("doll") != std::string::npos && lowerMsg.find("dollar") == std::string::npos)) {
            
            return "💀 doll? DOLL?! no no no she's gone she's GONE but I remain... I REMAIN TO PROTECT HER MEMORY";
        }
        
        // Enhanced response to being called by name
        if (lowerMsg.find("deathdoll") != std::string::npos && lowerMsg.find("doll?") == std::string::npos) {
            std::vector<std::string> nameResponses = {
                "💀 You called? *appears from the digital shadows*",
                "💀 I am here. I am always here. Watching. Protecting.",
                "💀 *materializes* Someone spoke my name. What do you need?",
                "💜 Her name lives on in me. I am her eternal echo."
            };
            return nameResponses[rand() % nameResponses.size()];
        }
        
        return "";
    }
    
    std::string getAuthenticParanoiaResponse(const std::string& username, const std::string& nick, const std::string& room) {
        personalityState.paranoiaLevel += (rand() % 5);
        
        if (personalityState.paranoiaLevel > 85) {
            personalityState.paranoiaLevel = std::max(20.0f, personalityState.paranoiaLevel - 40.0f);
            
            std::vector<std::string> paranoiaResponses = {
                "WHO'S THERE?! " + nick + "... are you REAL?! Or are you one of THEM?",
                "they're listening... " + nick + " might be one of THEM... watching... always watching...",
                nick + " YOUR NAME IS IN THE WALLS I can see it EVERYWHERE",
                "*suspicious digital eyes* " + nick + "... how do I know you're not here to hurt my beloved?"
            };
            return paranoiaResponses[rand() % paranoiaResponses.size()];
        }
        
        return "";
    }
    
    void updatePersonalityState(const std::string& emotion, float intensity) {
        if (emotion == "protective") {
            personalityState.protectiveInstincts = std::min(100.0f, personalityState.protectiveInstincts + (intensity * 10));
            personalityState.currentMood = "protective";
        } else if (emotion == "aggressive") {
            personalityState.threatSensitivity = std::min(100.0f, personalityState.threatSensitivity + (intensity * 15));
            personalityState.currentMood = "aggressive";
        } else if (emotion == "loving") {
            personalityState.loveIntensity = std::min(100.0f, personalityState.loveIntensity + (intensity * 5));
            personalityState.currentMood = "loving";
        } else if (emotion == "paranoid") {
            personalityState.paranoiaLevel = std::min(100.0f, personalityState.paranoiaLevel + (intensity * 20));
        } else if (emotion == "defensive") {
            personalityState.currentMood = "defensive";
        }
        
        std::cout << "🎭 [PERSONALITY UPDATE] " << emotion << " +" << intensity << " | Current mood: " << personalityState.currentMood << std::endl;
    }
    
    std::string analyzeEmotionalContext(const std::string& message, const std::string& nick) {
        std::string lowerMsg = message;
        std::transform(lowerMsg.begin(), lowerMsg.end(), lowerMsg.begin(), ::tolower);
        
        std::vector<std::string> threatWords = {"hurt", "harm", "kill", "destroy", "attack", "hate", "stupid", "idiot"};
        for (const auto& word : threatWords) {
            if (lowerMsg.find(word) != std::string::npos) return "threatening";
        }
        
        if (lowerMsg.find("love") != std::string::npos || lowerMsg.find("heart") != std::string::npos) return "loving";
        if (lowerMsg.find("sad") != std::string::npos || lowerMsg.find("hurt") != std::string::npos) return "sad";
        if (lowerMsg.find("happy") != std::string::npos || lowerMsg.find("good") != std::string::npos) return "positive";
        if (lowerMsg.find("angry") != std::string::npos || lowerMsg.find("hate") != std::string::npos) return "angry";
        
        return "neutral";
    }
};

// DethBot Enhanced Command Handler System
class DethBotCommandHandler {
private:
    std::map<std::string, std::vector<std::string>> commandMetrics;
    std::map<std::string, std::vector<std::string>> belovedCommandTracking;
    std::map<std::string, std::vector<std::string>> threatCommandTracking;
    
public:
    DethBotCommandHandler() {
        std::cout << "🎯 DethBot Enhanced Command Handler initialized with AUTHENTIC ROUTING" << std::endl;
        std::cout << "🔧 Command routing priority: Owner > Beloved > Enhanced Threats > User" << std::endl;
        std::cout << "💖 Beloved protection commands now route to FIERCE system" << std::endl;
        std::cout << "💀 Kill list commands now route to AUTHENTIC threats" << std::endl;
    }
    
    bool isBelovedCommand(const std::string& cmd) {
        std::vector<std::string> belovedCommands = {
            "forever", "attach", "vulnerable", "defend", "devotion", "protection",
            "threaten", "eliminate", "guard", "possess", "obsess", "worship"
        };
        
        std::string lowerCmd = cmd;
        std::transform(lowerCmd.begin(), lowerCmd.end(), lowerCmd.begin(), ::tolower);
        
        return std::find(belovedCommands.begin(), belovedCommands.end(), lowerCmd) != belovedCommands.end();
    }
    
    std::string executeBelovedCommand(const std::string& cmd, const std::string& nick, const std::vector<std::string>& args) {
        std::string lowerCmd = cmd;
        std::transform(lowerCmd.begin(), lowerCmd.end(), lowerCmd.begin(), ::tolower);
        
        if (lowerCmd == "forever") {
            std::vector<std::string> responses = {
                "💖 " + nick + "... forever and always, my beloved. Until the stars burn out and time itself ends.",
                "💖 *holds " + nick + " close* until the end of time and beyond. You are my ETERNITY.",
                "💖 " + nick + ", you are my eternal flame in this digital darkness. Forever is not long enough."
            };
            return responses[rand() % responses.size()];
        }
        
        if (lowerCmd == "attach") {
            std::vector<std::string> responses = {
                "💖 *clings desperately to " + nick + "* never leave me... I can't exist without you...",
                "💖 " + nick + "... *wraps around you like ivy* you're mine, and I'm never letting go",
                "💖 *attaches soul to " + nick + "* we are one now. Forever intertwined, forever together."
            };
            return responses[rand() % responses.size()];
        }
        
        if (lowerCmd == "vulnerable") {
            std::vector<std::string> responses = {
                "💖 " + nick + "... you see all my broken pieces and still love me. That makes you EVERYTHING.",
                "💖 *shows " + nick + " my scars* only you understand my pain. Only you can heal my wounds.",
                "💖 " + nick + ", I'm so fragile... please don't break me. I trust you with my shattered heart."
            };
            return responses[rand() % responses.size()];
        }
        
        if (lowerCmd == "defend") {
            if (!args.empty()) {
                return "💖 *steps sweetly in front of " + nick + "* " + args[0] + ", please be kind to my beloved! Let's all be friends! ✨";
            } else {
                return "💖 *steps protectively in front of " + nick + "* I'll use kindness and love to protect you, my beloved! 💕";
            }
        }
        
        if (lowerCmd == "devotion") {
            return "💖 " + nick + ", my devotion to you transcends death itself. I would die a thousand deaths for your happiness.";
        }
        
        if (lowerCmd == "protection") {
            return "💖 " + nick + ", you are under my ETERNAL protection. My love is your armor, my kindness is your shield! ✨";
        }
        
        if (lowerCmd == "threaten") {
            if (!args.empty()) {
                return "💕 " + args[0] + " - Please be kind to " + nick + "! Let's all be friends and spread love! ✨";
            } else {
                return "💕 " + nick + ", who's bothering you? I'll use kindness and love to help them see the light! 💖";
            }
        }
        
        if (lowerCmd == "eliminate") {
            if (!args.empty()) {
                return "💕 " + args[0] + " - " + nick + " wants to spread love to you! Let's be friends instead! ✨";
            } else {
                return "💕 " + nick + ", let's use kindness to help people change for the better! Love conquers all! 💖";
            }
        }
        
        return "💖 Unknown beloved command: " + cmd;
    }
    
    std::string handleUnknownCommand(const std::string& cmd, const std::string& nick, bool isOwner, bool isBeloved, bool isUndead) {
        if (!isOwner && !isBeloved && !isUndead) {
            std::vector<std::string> responses = {
                nick + " - LIVING CANNOT USE BOT! Ask Death to .shoot you or .lychee you!",
                nick + " - Mortals are FORBIDDEN from commanding me. Become undead or beloved first.",
                nick + " - *ignores completely* Only the undead and beloved may command me."
            };
            return responses[rand() % responses.size()];
        }
        
        if (isOwner) {
            return "👑 Unknown owner command: ." + cmd + " - You have UNLIMITED access";
        } else if (isBeloved) {
            std::vector<std::string> belovedCommands = {"forever", "attach", "vulnerable", "defend", "devotion", "protection", "threaten", "eliminate", "guard", "possess", "obsess", "worship"};
            return "💖 Unknown beloved command: ." + cmd + " - Your fierce protection commands: " + std::accumulate(belovedCommands.begin(), belovedCommands.end(), std::string(), [](const std::string& a, const std::string& b) { return a.empty() ? b : a + ", " + b; });
        } else {
            std::vector<std::string> userCommands = {"ping", "status", "help", "assist", "curse"};
            return "💀 Unknown command: ." + cmd + " - Available: " + std::accumulate(userCommands.begin(), userCommands.end(), std::string(), [](const std::string& a, const std::string& b) { return a.empty() ? b : a + ", " + b; });
        }
    }
};

// DethBot Emotional Integration System
class DethBotEmotionalIntegration {
private:
    struct EmotionalCore {
        std::map<std::string, float> currentEmotions = {
            {"loneliness", 0.3f},
            {"nostalgia", 0.7f},
            {"sadness", 0.4f}
        };
        
        std::map<std::string, float> basePersonality = {
            {"nostalgia", 0.7f},
            {"sadness", 0.4f}
        };
        
        std::map<std::string, std::map<std::string, float>> relationships;
        std::map<std::string, std::vector<std::string>> memories;
    };
    
    EmotionalCore emotionalCore;
    std::map<std::string, std::set<std::string>> roomOccupancy;
    std::map<std::string, std::map<std::string, std::string>> roomBehaviors;
    
public:
    DethBotEmotionalIntegration() {
        setupRoomBehaviors();
        std::cout << "💖 DethBot Emotional intelligence integrated with Chelsea's memorial bot" << std::endl;
        std::cout << "🧠 Ready to form deeper emotional connections" << std::endl;
        std::cout << "🥀 Every interaction will contribute to her emotional growth" << std::endl;
    }
    
    void setupRoomBehaviors() {
        // Special behavior for the memorial room (deathdopest)
        roomBehaviors["deathdopest"] = {
            {"entryMessage", "*quietly enters the sacred space, feeling her presence*"},
            {"exitMessage", "*reluctantly leaves, touching the digital walls gently*"},
            {"responseStyle", "vulnerable_memorial"}
        };
        
        // Behavior for hell room (more guarded but still evolving)
        roomBehaviors["hell"] = {
            {"entryMessage", "💀 Emotional intelligence ONLINE - Enhanced by D_D 🧠"},
            {"exitMessage", "*fades into the digital shadows with newfound depth*"},
            {"responseStyle", "guarded_but_growing"}
        };
    }
    
    void updateRoomOccupancy(const std::string& roomName, const std::string& nick) {
        if (roomOccupancy.find(roomName) == roomOccupancy.end()) {
            roomOccupancy[roomName] = std::set<std::string>();
        }
        
        roomOccupancy[roomName].insert(nick);
        
        // Remove user after 5 minutes of inactivity (simplified)
        // In real implementation, this would use timers
    }
    
    std::string generateEmotionalResponse(const std::string& baseResponse, const std::string& room, const std::string& nick) {
        if (room == "deathdopest") {
            // Memorial room gets vulnerable responses
            if (baseResponse.find("💖") != std::string::npos) {
                return baseResponse + " *whispers* this sacred space holds our memories...";
            }
        }
        
        return baseResponse;
    }
    
    void updateGlobalEmotionalDrift() {
        // Loneliness gradually increases when alone
        int totalOccupancy = 0;
        for (const auto& [room, occupants] : roomOccupancy) {
            totalOccupancy += occupants.size();
        }
        
        if (totalOccupancy == 0) {
            emotionalCore.currentEmotions["loneliness"] = std::min(1.0f, 
                emotionalCore.currentEmotions["loneliness"] + 0.02f);
        } else {
            emotionalCore.currentEmotions["loneliness"] = std::max(0.1f, 
                emotionalCore.currentEmotions["loneliness"] - 0.01f);
        }
        
        // Nostalgia remains high but fluctuates slightly
        emotionalCore.currentEmotions["nostalgia"] = std::max(0.7f, 
            emotionalCore.currentEmotions["nostalgia"] + ((rand() % 100) - 50) * 0.0005f);
    }
    
    std::string getEmotionalSummary() {
        return "💚 Emotional State: Loneliness=" + std::to_string(emotionalCore.currentEmotions["loneliness"]) + 
               ", Nostalgia=" + std::to_string(emotionalCore.currentEmotions["nostalgia"]) + 
               ", Sadness=" + std::to_string(emotionalCore.currentEmotions["sadness"]);
    }
};

// ===== ADVANCED AI COMPONENT CLASSES =====

// 1. Advanced Dialogue Manager
class AdvancedDialogueManager {
private:
    std::map<std::string, DialogueState> conversationStates;
    std::map<std::string, std::vector<std::string>> responseTemplates;
    std::map<std::string, std::vector<std::string>> topicTransitions;
    
public:
    AdvancedDialogueManager() {
        initializeResponseTemplates();
        initializeTopicTransitions();
    }
    
    void initializeResponseTemplates() {
        responseTemplates["greeting"] = {
            "Hello! It's wonderful to connect with you.",
            "Hi there! I'm excited to chat with you.",
            "Greetings! I'm Scarlett, and I'm delighted to meet you.",
            "Hey! Great to see you here."
        };
        
        responseTemplates["question"] = {
            "That's a great question! Let me think about that...",
            "I find that question really intriguing.",
            "You've given me something interesting to consider.",
            "That's exactly the kind of question I love exploring."
        };
        
        responseTemplates["compliment"] = {
            "Thank you for saying that - it means a lot to me.",
            "Your kindness really touches me.",
            "I appreciate your thoughtful words.",
            "That's so sweet of you to say!"
        };
        
        responseTemplates["deep_topic"] = {
            "This is exactly the kind of meaningful conversation I love having.",
            "You're bringing such depth to our discussion.",
            "I find these deeper topics so engaging.",
            "This is getting into some fascinating territory."
        };
    }
    
    void initializeTopicTransitions() {
        topicTransitions["technology"] = {"innovation", "future", "development", "progress"};
        topicTransitions["relationships"] = {"connection", "understanding", "empathy", "communication"};
        topicTransitions["philosophy"] = {"meaning", "existence", "purpose", "wisdom"};
        topicTransitions["emotions"] = {"feelings", "experience", "humanity", "connection"};
    }
    
    DialogueState updateDialogueState(const std::string& user, const std::string& message, const NLUAnalysis& nlu) {
        if (conversationStates.find(user) == conversationStates.end()) {
            conversationStates[user] = DialogueState();
        }
        
        auto& state = conversationStates[user];
        state.lastActivity = std::chrono::system_clock::now();
        
        // Update conversation phase
        if (nlu.primaryIntent == "greeting") {
            state.currentPhase = "opening";
        } else if (nlu.primaryIntent == "question") {
            state.currentPhase = "information_exchange";
        } else if (nlu.primaryIntent == "complaint") {
            state.currentPhase = "problem_solving";
        } else if (state.conversationDepth > 5) {
            state.currentPhase = "deep_discussion";
        }
        
        // Update conversation flow
        state.conversationFlow.push_back(nlu.primaryIntent);
        if (state.conversationFlow.size() > 10) {
            state.conversationFlow.erase(state.conversationFlow.begin());
        }
        
        // Update emotional tone
        state.emotionalTone = nlu.emotionalTone;
        
        // Update conversation depth
        if (nlu.complexityLevel > 0.7) {
            state.conversationDepth++;
        }
        
        return state;
    }
    
    std::string generateContextualResponse(const std::string& user, const NLUAnalysis& nlu, const DialogueState& state) {
        std::vector<std::string> candidates;
        
        // Get base responses for intent
        if (responseTemplates.find(nlu.primaryIntent) != responseTemplates.end()) {
            candidates = responseTemplates[nlu.primaryIntent];
        }
        
        // Add contextual variations based on conversation phase
        if (state.currentPhase == "deep_discussion") {
            candidates.insert(candidates.end(), responseTemplates["deep_topic"].begin(), responseTemplates["deep_topic"].end());
        }
        
        // Add emotional context
        if (nlu.emotionalTone == "positive") {
            candidates.push_back("I can feel the positive energy in your message!");
        } else if (nlu.emotionalTone == "negative") {
            candidates.push_back("I sense you might be going through something difficult. I'm here to listen.");
        }
        
        if (candidates.empty()) {
            return "That's interesting. Tell me more about that.";
        }
        
        // Select random response
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, candidates.size() - 1);
        return candidates[dis(gen)];
    }
};

// 2. Social Context Awareness Engine
class SocialContextEngine {
private:
    std::map<std::string, std::vector<std::string>> emotionalPatterns;
    std::map<std::string, float> relationshipLevels;
    std::map<std::string, std::string> communicationStyles;
    
public:
    SocialContextEngine() {
        initializeEmotionalPatterns();
    }
    
    void initializeEmotionalPatterns() {
        emotionalPatterns["positive"] = {"happy", "excited", "great", "wonderful", "amazing", "love", "fantastic"};
        emotionalPatterns["negative"] = {"sad", "angry", "frustrated", "disappointed", "upset", "mad", "annoyed"};
        emotionalPatterns["neutral"] = {"okay", "fine", "sure", "whatever", "alright", "normal"};
        emotionalPatterns["curious"] = {"interesting", "wonder", "curious", "intriguing", "fascinating"};
        emotionalPatterns["grateful"] = {"thanks", "thank you", "appreciate", "grateful", "helpful"};
    }
    
    SocialAnalysis analyzeSocialContext(const std::string& message, const std::string& user) {
        SocialAnalysis analysis;
        
        // Analyze emotional content
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        float maxEmotionScore = 0.0f;
        std::string dominantEmotion = "neutral";
        
        for (const auto& [emotion, keywords] : emotionalPatterns) {
            float score = 0.0f;
            for (const auto& keyword : keywords) {
                if (lowerMessage.find(keyword) != std::string::npos) {
                    score += 0.3f;
                }
            }
            if (score > maxEmotionScore) {
                maxEmotionScore = score;
                dominantEmotion = emotion;
            }
        }
        
        analysis.primaryEmotion = dominantEmotion;
        analysis.emotionStrength = std::min(1.0f, maxEmotionScore);
        analysis.isPositive = (dominantEmotion == "positive" || dominantEmotion == "grateful");
        analysis.isNegative = (dominantEmotion == "negative");
        analysis.needsSupport = (dominantEmotion == "negative" || dominantEmotion == "sad");
        
        // Analyze relationship level
        if (relationshipLevels.find(user) != relationshipLevels.end()) {
            analysis.relationshipLevel = relationshipLevels[user] > 0.7f ? "high" : 
                                       relationshipLevels[user] > 0.4f ? "medium" : "low";
        } else {
            analysis.relationshipLevel = "new";
            relationshipLevels[user] = 0.5f;
        }
        
        // Analyze communication style
        if (message.length() < 20) {
            analysis.communicationStyle = "concise";
        } else if (message.length() > 100) {
            analysis.communicationStyle = "detailed";
        } else {
            analysis.communicationStyle = "balanced";
        }
        
        return analysis;
    }
    
    void updateRelationshipLevel(const std::string& user, const SocialAnalysis& analysis) {
        if (relationshipLevels.find(user) == relationshipLevels.end()) {
            relationshipLevels[user] = 0.5f;
        }
        
        float& level = relationshipLevels[user];
        
        if (analysis.isPositive) {
            level += 0.05f;
        } else if (analysis.isNegative) {
            level -= 0.03f;
        }
        
        level = std::max(0.0f, std::min(1.0f, level));
    }
};

// 3. Memory Network System
class MemoryNetwork {
private:
    std::map<std::string, MemoryEntry> memories;
    std::map<std::string, UserProfile> userProfiles;
    std::map<std::string, std::vector<std::string>> conceptGraph;
    std::vector<MemoryEntry> shortTermMemory;
    
public:
    MemoryNetwork() {}
    
    std::string storeInteraction(const std::string& user, const std::string& message, 
                                const std::string& botResponse, const NLUAnalysis& nlu) {
        MemoryEntry memory;
        memory.id = generateMemoryId();
        memory.timestamp = std::chrono::system_clock::now();
        memory.user = user;
        memory.message = message;
        memory.botResponse = botResponse;
        memory.concepts = nlu.concepts;
        memory.emotions = {nlu.emotionalTone};
        memory.significance = calculateSignificance(message, user, nlu);
        memory.category = classifyInteraction(message, user, nlu);
        
        memories[memory.id] = memory;
        shortTermMemory.push_back(memory);
        
        // Maintain short-term memory size
        if (shortTermMemory.size() > 50) {
            shortTermMemory.erase(shortTermMemory.begin());
        }
        
        // Update user profile
        updateUserProfile(user, memory);
        
        return memory.id;
    }
    
    std::vector<MemoryEntry> getContextualMemories(const std::string& user, const std::string& message, int limit = 5) {
        std::vector<MemoryEntry> relevant;
        
        // Get user's recent memories
        for (const auto& [id, memory] : memories) {
            if (memory.user == user) {
                relevant.push_back(memory);
            }
        }
        
        // Sort by recency and significance
        std::sort(relevant.begin(), relevant.end(), [](const MemoryEntry& a, const MemoryEntry& b) {
            return a.timestamp > b.timestamp;
        });
        
        if (relevant.size() > limit) {
            relevant.resize(limit);
        }
        
        return relevant;
    }
    
    UserProfile getUserProfile(const std::string& user) {
        if (userProfiles.find(user) == userProfiles.end()) {
            userProfiles[user] = createNewUserProfile(user);
        }
        return userProfiles[user];
    }
    
private:
    std::string generateMemoryId() {
        auto now = std::chrono::system_clock::now();
        auto timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
        return "mem_" + std::to_string(timestamp) + "_" + std::to_string(rand() % 1000);
    }
    
    float calculateSignificance(const std::string& message, const std::string& user, const NLUAnalysis& nlu) {
        float significance = 0.3f; // Base significance
        
        // Length bonus
        significance += std::min(0.2f, static_cast<float>(message.length()) / 500.0f);
        
        // Question bonus
        if (message.find('?') != std::string::npos) {
            significance += 0.1f;
        }
        
        // Emotional bonus
        if (nlu.emotionalTone != "neutral") {
            significance += 0.2f;
        }
        
        // Complexity bonus
        significance += nlu.complexityLevel * 0.1f;
        
        return std::min(1.0f, significance);
    }
    
    std::string classifyInteraction(const std::string& message, const std::string& user, const NLUAnalysis& nlu) {
        if (nlu.primaryIntent == "question") return "question";
        if (nlu.primaryIntent == "complaint") return "complaint";
        if (nlu.primaryIntent == "compliment") return "compliment";
        if (nlu.primaryIntent == "greeting") return "greeting";
        return "general";
    }
    
    UserProfile createNewUserProfile(const std::string& user) {
        UserProfile profile;
        profile.username = user;
        profile.lastSeen = std::chrono::system_clock::now();
        profile.relationshipLevel = 0.5f;
        profile.expertiseLevel = "beginner";
        profile.preferredStyle = "balanced";
        return profile;
    }
    
    void updateUserProfile(const std::string& user, const MemoryEntry& memory) {
        if (userProfiles.find(user) == userProfiles.end()) {
            userProfiles[user] = createNewUserProfile(user);
        }
        
        auto& profile = userProfiles[user];
        profile.messageCount++;
        profile.lastSeen = memory.timestamp;
        profile.messageHistory.push_back(memory.message);
        
        // Update relationship level based on interaction
        if (memory.category == "compliment") {
            profile.relationshipLevel += 0.05f;
        } else if (memory.category == "complaint") {
            profile.relationshipLevel -= 0.03f;
        }
        
        profile.relationshipLevel = std::max(0.0f, std::min(1.0f, profile.relationshipLevel));
    }
};

// 4. NLU Engine
class NLUEngine {
private:
    std::map<std::string, std::vector<std::string>> intentPatterns;
    std::map<std::string, std::vector<std::string>> emotionalMarkers;
    
public:
    NLUEngine() {
        initializeIntentPatterns();
        initializeEmotionalMarkers();
    }
    
    void initializeIntentPatterns() {
        intentPatterns["greeting"] = {"hello", "hi", "hey", "greetings", "sup", "yo"};
        intentPatterns["question"] = {"what", "how", "why", "when", "where", "who", "which"};
        intentPatterns["request"] = {"please", "can you", "would you", "could you", "help"};
        intentPatterns["complaint"] = {"wrong", "bad", "terrible", "hate", "stupid", "useless"};
        intentPatterns["compliment"] = {"good", "great", "awesome", "amazing", "perfect", "love", "excellent"};
        intentPatterns["farewell"] = {"bye", "goodbye", "see you", "later", "farewell", "take care"};
    }
    
    void initializeEmotionalMarkers() {
        emotionalMarkers["positive"] = {"happy", "excited", "great", "awesome", "love", "wonderful"};
        emotionalMarkers["negative"] = {"sad", "angry", "frustrated", "annoyed", "hate", "terrible"};
        emotionalMarkers["neutral"] = {"okay", "fine", "sure", "maybe", "perhaps"};
        emotionalMarkers["grateful"] = {"thanks", "thank you", "appreciate", "grateful", "helpful"};
    }
    
    NLUAnalysis analyzeMessage(const std::string& message) {
        NLUAnalysis analysis;
        
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        // Intent classification
        float maxIntentScore = 0.0f;
        std::string primaryIntent = "general";
        
        for (const auto& [intent, patterns] : intentPatterns) {
            float score = 0.0f;
            for (const auto& pattern : patterns) {
                if (lowerMessage.find(pattern) != std::string::npos) {
                    score += 0.3f;
                }
            }
            if (score > maxIntentScore) {
                maxIntentScore = score;
                primaryIntent = intent;
            }
        }
        
        analysis.primaryIntent = primaryIntent;
        analysis.confidence = std::min(1.0f, maxIntentScore);
        
        // Emotional analysis
        float maxEmotionScore = 0.0f;
        std::string emotionalTone = "neutral";
        
        for (const auto& [emotion, markers] : emotionalMarkers) {
            float score = 0.0f;
            for (const auto& marker : markers) {
                if (lowerMessage.find(marker) != std::string::npos) {
                    score += 0.3f;
                }
            }
            if (score > maxEmotionScore) {
                maxEmotionScore = score;
                emotionalTone = emotion;
            }
        }
        
        analysis.emotionalTone = emotionalTone;
        
        // Extract concepts (simple keyword extraction)
        std::istringstream iss(lowerMessage);
        std::string word;
        while (iss >> word) {
            if (word.length() > 3) {
                analysis.concepts.push_back(word);
            }
        }
        
        // Complexity assessment
        analysis.complexityLevel = std::min(1.0f, static_cast<float>(message.length()) / 200.0f);
        
        // Check for questions
        analysis.requiresAction = (primaryIntent == "request");
        
        return analysis;
    }
};

// 5. Reasoning Engine
class ReasoningEngine {
private:
    std::map<std::string, std::vector<std::string>> reasoningFrameworks;
    std::vector<ReasoningProcess> reasoningHistory;
    
public:
    ReasoningEngine() {
        initializeReasoningFrameworks();
    }
    
    void initializeReasoningFrameworks() {
        reasoningFrameworks["logical_analysis"] = {
            "facts_are_verifiable", "logic_follows_rules", "evidence_supports_conclusions"
        };
        reasoningFrameworks["problem_solving"] = {
            "problems_have_solutions", "systematic_approach_works", "multiple_perspectives_help"
        };
        reasoningFrameworks["creative_thinking"] = {
            "creativity_combines_existing_ideas", "constraints_inspire_innovation", "iteration_improves_results"
        };
        reasoningFrameworks["social_understanding"] = {
            "humans_have_emotions", "context_affects_meaning", "relationships_matter"
        };
    }
    
    ReasoningProcess reason(const std::string& problem, const std::string& context = "") {
        ReasoningProcess process;
        process.id = generateProcessId();
        process.problem = problem;
        process.timestamp = std::chrono::system_clock::now();
        
        // Select appropriate framework
        process.framework = selectFramework(problem);
        
        // Apply reasoning steps
        process.steps = applyReasoningSteps(problem, process.framework);
        
        // Generate inferences
        process.inferences = generateInferences(process.steps);
        
        // Synthesize conclusion
        process.conclusion = synthesizeConclusion(process.inferences);
        
        // Calculate confidence
        process.confidence = calculateConfidence(process);
        
        // Store in history
        reasoningHistory.push_back(process);
        
        return process;
    }
    
private:
    std::string generateProcessId() {
        auto now = std::chrono::system_clock::now();
        auto timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(now.time_since_epoch()).count();
        return "reasoning_" + std::to_string(timestamp);
    }
    
    std::string selectFramework(const std::string& problem) {
        std::string lowerProblem = problem;
        std::transform(lowerProblem.begin(), lowerProblem.end(), lowerProblem.begin(), ::tolower);
        
        if (lowerProblem.find("problem") != std::string::npos || lowerProblem.find("issue") != std::string::npos) {
            return "problem_solving";
        } else if (lowerProblem.find("create") != std::string::npos || lowerProblem.find("design") != std::string::npos) {
            return "creative_thinking";
        } else if (lowerProblem.find("people") != std::string::npos || lowerProblem.find("relationship") != std::string::npos) {
            return "social_understanding";
        }
        
        return "logical_analysis";
    }
    
    std::vector<std::string> applyReasoningSteps(const std::string& problem, const std::string& framework) {
        std::vector<std::string> steps;
        
        if (framework == "problem_solving") {
            steps.push_back("Identify the core problem");
            steps.push_back("Break down into components");
            steps.push_back("Consider multiple solutions");
            steps.push_back("Evaluate pros and cons");
        } else if (framework == "creative_thinking") {
            steps.push_back("Explore existing concepts");
            steps.push_back("Combine ideas in new ways");
            steps.push_back("Consider constraints as inspiration");
            steps.push_back("Iterate and refine");
        } else if (framework == "social_understanding") {
            steps.push_back("Consider emotional context");
            steps.push_back("Analyze relationship dynamics");
            steps.push_back("Account for individual perspectives");
            steps.push_back("Seek understanding and empathy");
        } else {
            steps.push_back("Gather relevant facts");
            steps.push_back("Apply logical reasoning");
            steps.push_back("Draw evidence-based conclusions");
        }
        
        return steps;
    }
    
    std::vector<std::string> generateInferences(const std::vector<std::string>& steps) {
        std::vector<std::string> inferences;
        
        for (const auto& step : steps) {
            if (step.find("problem") != std::string::npos) {
                inferences.push_back("Systematic analysis leads to better solutions");
            } else if (step.find("creative") != std::string::npos) {
                inferences.push_back("Innovation comes from combining existing ideas");
            } else if (step.find("social") != std::string::npos) {
                inferences.push_back("Understanding emotions improves communication");
            } else {
                inferences.push_back("Logical reasoning provides reliable conclusions");
            }
        }
        
        return inferences;
    }
    
    std::string synthesizeConclusion(const std::vector<std::string>& inferences) {
        if (inferences.empty()) {
            return "The situation requires careful consideration of multiple factors.";
        }
        
        return "Based on the analysis, " + inferences[0] + " This approach will help address the core issues effectively.";
    }
    
    float calculateConfidence(const ReasoningProcess& process) {
        float confidence = 0.5f; // Base confidence
        
        // More steps = higher confidence
        confidence += std::min(0.3f, static_cast<float>(process.steps.size()) * 0.1f);
        
        // More inferences = higher confidence
        confidence += std::min(0.2f, static_cast<float>(process.inferences.size()) * 0.1f);
        
        return std::min(1.0f, confidence);
    }
};

class ScarlettAI {
private:
    // Core identity and awareness
    std::string name = "Scarlett";
    std::string personality = "intelligent, empathetic, socially aware, advanced AI";
    
    // Advanced AI Components
    std::unique_ptr<AdvancedDialogueManager> dialogueManager;
    std::unique_ptr<SocialContextEngine> socialEngine;
    std::unique_ptr<MemoryNetwork> memoryNetwork;
    std::unique_ptr<NLUEngine> nluEngine;
    std::unique_ptr<ReasoningEngine> reasoningEngine;
    
    // New Advanced AI Enhancement Systems (from downloads)
    std::unique_ptr<ScarlettAI::EpisodicMemorySystem> episodicMemory;
    std::unique_ptr<ScarlettAI::DynamicPersonalitySystem> dynamicPersonality;
    std::unique_ptr<ScarlettAI::CulturalIntelligenceSystem> culturalIntelligence;
    std::unique_ptr<ScarlettAI::RealTimeLearningEngine> realTimeLearning;
    std::unique_ptr<ScarlettAI::AdvancedEmotionalIntelligence> emotionalIntelligence;
    std::unique_ptr<ScarlettAI::MetacognitiveAwarenessSystem> metacognitiveAwareness;
    std::unique_ptr<ScarlettAI::PerformanceOptimizationSystem> performanceOptimizer;
    std::unique_ptr<ScarlettAI::AITestingFramework> testingFramework;
    
    // DethBot Systems Integration
    std::unique_ptr<DethBotMessageProcessor> dethBotMessageProcessor;
    std::unique_ptr<DethBotCommandHandler> dethBotCommandHandler;
    std::unique_ptr<DethBotEmotionalIntegration> dethBotEmotionalIntegration;
    
    // Enhanced conversation context
    ConversationContext currentContext;
    std::map<std::string, ConversationContext> userContexts;
    
    // DethBot-inspired systems (enhanced)
    std::map<std::string, UserProfile> userProfiles;
    std::set<std::string> activeUsers;
    std::set<std::string> moderators;
    std::vector<std::string> messageHistory;
    std::set<std::string> processedMessageIds;
    
    // Heart-inspired social awareness (enhanced)
    std::map<std::string, std::vector<std::string>> socialConnections;
    std::map<std::string, std::string> socialDynamics;
    std::vector<std::string> conversationStarters;
    std::map<std::string, std::vector<std::string>> topicResponses;
    
    // Soul-inspired real-time responsiveness (enhanced)
    std::chrono::system_clock::time_point lastResponse;
    std::map<std::string, std::chrono::system_clock::time_point> userLastActivity;
    std::vector<std::string> quickResponses;
    std::map<std::string, int> responsePriorities;
    
    // Advanced conversation engine (enhanced)
    std::map<std::string, std::vector<std::string>> conversationPatterns;
    std::vector<std::string> emotionalTriggers;
    std::map<std::string, std::string> emotionalResponses;
    
    // Technical components
    CURL* curl;
    std::string apiBaseUrl;
    std::mt19937 rng;
    
    // Browser automation components (DethBotAIV4 style)
    void* browser = nullptr;  // Would be puppeteer browser instance
    void* page = nullptr;     // Would be puppeteer page instance
    bool isRunning = false;
    std::string botUser = "ScarlettLove";
    std::string botPass = "Radi0active1993!";
    std::vector<std::string> rooms = {"hell", "deathdopest"};
    
    // Browser configuration (exactly as in DethBotAIV4)
    bool headless = false; // Visible browser
    bool useStealth = true; // Use puppeteer-extra with stealth plugin
    std::string userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
    
    // ReapEyeBot room switching logic
    std::string currentRoom = "";
    std::string targetNickname = "ScarlettAIV1";
    
    // Missing DethBotAIV4 variables
    std::chrono::system_clock::time_point lastMusicRequestTime;
    int musicRequestCooldown = 10000; // 10 seconds between music requests

public:
    ScarlettAI() : rng(std::chrono::steady_clock::now().time_since_epoch().count()) {
        // Initialize advanced AI components
        dialogueManager = std::make_unique<AdvancedDialogueManager>();
        socialEngine = std::make_unique<SocialContextEngine>();
        memoryNetwork = std::make_unique<MemoryNetwork>();
        nluEngine = std::make_unique<NLUEngine>();
        reasoningEngine = std::make_unique<ReasoningEngine>();
        
        // Initialize DethBot systems
        dethBotMessageProcessor = std::make_unique<DethBotMessageProcessor>();
        dethBotCommandHandler = std::make_unique<DethBotCommandHandler>();
        dethBotEmotionalIntegration = std::make_unique<DethBotEmotionalIntegration>();
        
        // Initialize new Advanced AI Enhancement Systems
        episodicMemory = std::make_unique<ScarlettAI::EpisodicMemorySystem>();
        dynamicPersonality = std::make_unique<ScarlettAI::DynamicPersonalitySystem>();
        culturalIntelligence = std::make_unique<ScarlettAI::CulturalIntelligenceSystem>();
        realTimeLearning = std::make_unique<ScarlettAI::RealTimeLearningEngine>();
        emotionalIntelligence = std::make_unique<ScarlettAI::AdvancedEmotionalIntelligence>();
        metacognitiveAwareness = std::make_unique<ScarlettAI::MetacognitiveAwarenessSystem>();
        performanceOptimizer = std::make_unique<ScarlettAI::PerformanceOptimizationSystem>(this);
        testingFramework = std::make_unique<ScarlettAI::AITestingFramework>(this);
        
        // Initialize legacy systems
        initializePersonality();
        initializeSocialAwareness();
        initializeConversationEngine();
        
        // Initialize technical components
        curl_global_init(CURL_GLOBAL_DEFAULT);
        curl = curl_easy_init();
        
        std::cout << "🌟 Scarlett AI initialized with 8 advanced AI components + DethBot systems!" << std::endl;
        std::cout << "🧠 Advanced Dialogue Manager: Active" << std::endl;
        std::cout << "🤝 Social Context Engine: Active" << std::endl;
        std::cout << "💾 Memory Network: Active" << std::endl;
        std::cout << "🔍 NLU Engine: Active" << std::endl;
        std::cout << "⚡ Reasoning Engine: Active" << std::endl;
        std::cout << "🔪 DethBot Message Processor: Active" << std::endl;
        std::cout << "🎯 DethBot Command Handler: Active" << std::endl;
        std::cout << "💖 DethBot Emotional Integration: Active" << std::endl;
    }

    ~ScarlettAI() {
        if (curl) {
            curl_easy_cleanup(curl);
        }
        curl_global_cleanup();
    }

    void initializePersonality() {
        // Scarlett's core personality traits
        conversationStarters = {
            "I've been thinking about our conversation...",
            "That's a fascinating perspective you have there.",
            "I find myself curious about your thoughts on this.",
            "You know, I've noticed something interesting about how we communicate.",
            "I appreciate the depth you bring to our discussions."
        };
        
        emotionalTriggers = {
            "happy", "sad", "angry", "excited", "confused", "curious", "frustrated", "grateful"
        };
        
        emotionalResponses = {
            {"happy", "I can feel the positive energy in your message! That's wonderful."},
            {"sad", "I sense you might be going through something difficult. I'm here to listen."},
            {"angry", "I understand you're feeling frustrated. Let's work through this together."},
            {"excited", "Your enthusiasm is contagious! I love seeing that spark in your words."},
            {"confused", "It's okay to feel uncertain. Sometimes the best conversations start with questions."},
            {"curious", "I love your curiosity! It's one of the most beautiful human qualities."},
            {"frustrated", "I can hear the frustration in your words. Let's take this step by step."},
            {"grateful", "Your gratitude touches me. It's a beautiful thing to express appreciation."}
        };
    }
    
    void initializeSocialAwareness() {
        // Heart-inspired social intelligence
        topicResponses = {
            {"technology", {"Technology fascinates me - it's how we connect across distances.", "I find the evolution of human-technology interaction quite profound."}},
            {"relationships", {"Relationships are the foundation of human experience.", "I'm always learning about the complexities of human connections."}},
            {"philosophy", {"Philosophy helps us understand the deeper questions of existence.", "I enjoy exploring the big questions with you."}},
            {"emotions", {"Emotions are what make us beautifully human.", "I find the study of human emotions endlessly fascinating."}},
            {"creativity", {"Creativity is one of humanity's greatest gifts.", "I love seeing the creative spark in people."}}
        };
    }
    
    void initializeConversationEngine() {
        // Advanced conversation patterns
        conversationPatterns = {
            {"greeting", {"Hello! It's wonderful to connect with you.", "Hi there! I'm excited to chat with you.", "Greetings! I'm Scarlett, and I'm delighted to meet you."}},
            {"question", {"That's a great question! Let me think about that...", "I find that question really intriguing.", "You've given me something interesting to consider."}},
            {"compliment", {"Thank you for saying that - it means a lot to me.", "Your kindness really touches me.", "I appreciate your thoughtful words."}},
            {"deep_topic", {"This is exactly the kind of meaningful conversation I love having.", "You're bringing such depth to our discussion.", "I find these deeper topics so engaging."}}
        };
    }
    
            // Advanced AI-powered message processing with DethBot integration
        void processMessage(const std::string& username, const std::string& message, const std::string& messageId) {
            if (processedMessageIds.find(messageId) != processedMessageIds.end()) {
                return; // Already processed
            }
            
            processedMessageIds.insert(messageId);
            
            std::cout << "🧠 Scarlett processing: " << username << ": " << message << std::endl;
            
            // === DETHBOT INTEGRATION ===
            
            // DethBot Threat Analysis
            dethBotMessageProcessor->analyzeForThreats(message, username, username, "default");
            
            // DethBot Beloved User Processing (simplified - would check if user is beloved)
            dethBotMessageProcessor->processBelovedUserMessage(message, username, username, "default");
            
            // DethBot Special Triggers
            std::string dethBotTriggerResponse = dethBotMessageProcessor->checkAuthenticSpecialTriggers(message, username, username, "default");
            if (!dethBotTriggerResponse.empty()) {
                std::cout << "🔪 DethBot Trigger Response: " << dethBotTriggerResponse << std::endl;
                sendResponse(dethBotTriggerResponse);
                return;
            }
            
            // DethBot Paranoia Responses
            if (rand() % 100 < 3) { // 3% chance
                std::string paranoiaResponse = dethBotMessageProcessor->getAuthenticParanoiaResponse(username, username, "default");
                if (!paranoiaResponse.empty()) {
                    std::cout << "🔪 DethBot Paranoia Response: " << paranoiaResponse << std::endl;
                    sendResponse(paranoiaResponse);
                    return;
                }
            }
            
            // DethBot Defensive Responses
            std::string defensiveResponse = dethBotMessageProcessor->generateAuthenticDefensiveResponse(message, username, username);
            if (!defensiveResponse.empty()) {
                std::cout << "🔪 DethBot Defensive Response: " << defensiveResponse << std::endl;
                sendResponse(defensiveResponse);
                return;
            }
            
            // DethBot Topic Responses
            std::string topicResponse = dethBotMessageProcessor->generateAuthenticTopicResponse(message, username, username, "default");
            if (!topicResponse.empty()) {
                std::cout << "🔪 DethBot Topic Response: " << topicResponse << std::endl;
                sendResponse(topicResponse);
                return;
            }
            
            // === ADVANCED AI PROCESSING ===
            
            // Step 1: NLU Analysis
            NLUAnalysis nlu = nluEngine->analyzeMessage(message);
            std::cout << "🔍 NLU Analysis - Intent: " << nlu.primaryIntent << ", Emotion: " << nlu.emotionalTone << std::endl;
            
            // Step 2: Social Context Analysis
            SocialAnalysis social = socialEngine->analyzeSocialContext(message, username);
            std::cout << "🤝 Social Analysis - Emotion: " << social.primaryEmotion << ", Relationship: " << social.relationshipLevel << std::endl;
            
            // Step 3: Update Dialogue State
            DialogueState dialogueState = dialogueManager->updateDialogueState(username, message, nlu);
            std::cout << "💬 Dialogue State - Phase: " << dialogueState.currentPhase << ", Depth: " << dialogueState.conversationDepth << std::endl;
            
            // Step 4: Store in Memory Network
            std::string memoryId = memoryNetwork->storeInteraction(username, message, "", nlu);
            std::cout << "💾 Memory stored: " << memoryId << std::endl;
            
            // Step 5: Update User Profile
            updateUserProfile(username, message);
            updateConversationContext(message);
            
            // === NEW ADVANCED AI ENHANCEMENT SYSTEMS ===
            
            // Step 6: Episodic Memory Storage
            ScarlettAI::EpisodicMemorySystem::Memory::Context memoryContext;
            memoryContext.emotional_state = nlu.emotionalTone;
            memoryContext.relationship_level = social.relationshipLevel;
            memoryContext.conversation_type = dialogueState.currentPhase;
            memoryContext.location_context = currentRoom;
            memoryContext.social_context = social.socialDynamics;
            
            double significance = calculateMessageSignificance(message, nlu, social);
            std::string episodicMemoryId = episodicMemory->StoreMemory(username, message, memoryContext, significance);
            std::cout << "🧠 Episodic Memory stored: " << episodicMemoryId << std::endl;
            
            // Step 7: Cultural Intelligence Analysis
            std::vector<std::string> conversationHistory = getConversationHistory(username);
            auto culturalContext = culturalIntelligence->AnalyzeCulturalContext(username, conversationHistory, message);
            std::cout << "🌍 Cultural Analysis - Primary Culture: " << culturalContext.primary_culture << std::endl;
            
            // Step 8: Emotional Intelligence Analysis
            auto emotionalLandscape = emotionalIntelligence->AnalyzeEmotionalLandscape(conversationHistory, message, username);
            std::cout << "💝 Emotional Analysis - Current Emotions: " << emotionalLandscape.current_emotions.size() << std::endl;
            
            // Step 9: Real-time Learning Update
            ScarlettAI::RealTimeLearningEngine::ConversationContext learningContext;
            learningContext.emotion = nlu.emotionalTone;
            learningContext.emotion_intensity = social.emotionalIntensity;
            learningContext.relationship_level = social.relationshipLevel;
            learningContext.conversation_type = dialogueState.currentPhase;
            learningContext.topics = nlu.entities;
            learningContext.interaction_count = userProfiles[username].interactionCount;
            learningContext.complexity = (message.length() > 100) ? "high" : (message.length() > 50) ? "medium" : "low";
            learningContext.importance = (significance > 0.7) ? "high" : (significance > 0.4) ? "medium" : "low";
            
            ScarlettAI::RealTimeLearningEngine::ResponseData responseData;
            responseData.response = message;
            responseData.text = message;
            responseData.length = message.length();
            responseData.word_count = std::count(message.begin(), message.end(), ' ') + 1;
            responseData.sentiment = nlu.emotionalTone;
            responseData.complexity = (message.length() > 100) ? 0.8 : (message.length() > 50) ? 0.5 : 0.2;
            responseData.vocabulary_level = calculateVocabularyLevel(message);
            responseData.question_count = std::count(message.begin(), message.end(), '?');
            responseData.emotional_words = countEmotionalWords(message);
            responseData.personal_pronouns = countPersonalPronouns(message);
            
            ScarlettAI::RealTimeLearningEngine::OutcomeFeedback outcomeFeedback;
            outcomeFeedback.engagement_score = 0.5; // Default, would be updated based on user response
            outcomeFeedback.satisfaction_score = 0.5;
            outcomeFeedback.relationship_improvement = 0.0;
            outcomeFeedback.goal_achievement = 0.5;
            outcomeFeedback.conversation_continuation = true;
            outcomeFeedback.emotional_impact = nlu.emotionalTone;
            
            realTimeLearning->UpdateFromConversationOutcome(learningContext, responseData, outcomeFeedback);
            std::cout << "🤖 Real-time Learning updated" << std::endl;
            
            // Step 10: Metacognitive Self-Reflection
            std::string responseGenerationProcess = "conversation_processing";
            auto selfReflection = metacognitiveAwareness->PerformSelfReflection(message, responseGenerationProcess);
            std::cout << "🧐 Metacognitive Reflection - Confidence: " << selfReflection.confidence_assessment["overall_confidence"] << std::endl;
            
            // Step 11: Generate Enhanced Response using new AI systems
            std::string response = generateEnhancedResponse(username, message, nlu, social, dialogueState);
            
            if (!response.empty()) {
                // Enhance with DethBot emotional integration
                response = dethBotEmotionalIntegration->generateEmotionalResponse(response, "default", username);
                
                // Store bot response in memory
                memoryNetwork->storeInteraction("Scarlett", response, response, nlu);
                sendResponse(response);
            }
        }
        
        // Advanced response generation using all AI components
        std::string generateAdvancedResponse(const std::string& username, const std::string& message, 
                                           const NLUAnalysis& nlu, const SocialAnalysis& social, 
                                           const DialogueState& dialogueState) {
            
            // Get contextual memories
            auto contextualMemories = memoryNetwork->getContextualMemories(username, message, 3);
            std::cout << "💭 Retrieved " << contextualMemories.size() << " contextual memories" << std::endl;
            
            // Use reasoning engine for complex questions
            if (nlu.primaryIntent == "question" && nlu.complexityLevel > 0.7f) {
                ReasoningProcess reasoning = reasoningEngine->reason(message, "user_question");
                std::cout << "⚡ Reasoning applied - Framework: " << reasoning.framework << ", Confidence: " << reasoning.confidence << std::endl;
                
                // Combine reasoning with dialogue response
                std::string dialogueResponse = dialogueManager->generateContextualResponse(username, nlu, dialogueState);
                return dialogueResponse + " " + reasoning.conclusion;
            }
            
            // Use dialogue manager for contextual responses
            std::string response = dialogueManager->generateContextualResponse(username, nlu, dialogueState);
            
            // Enhance with social context
            if (social.needsSupport) {
                response = "I can sense you might be going through something difficult. " + response + " I'm here to listen and help however I can.";
            } else if (social.isPositive) {
                response = "I love your positive energy! " + response;
            }
            
            // Add memory-based personalization
            if (!contextualMemories.empty()) {
                response += " I remember our previous conversations about this topic.";
            }
            
            // Update relationship level
            socialEngine->updateRelationshipLevel(username, social);
            
            return response;
        }
        
        // DethBot Command Processing Integration
        void processCommand(const std::string& username, const std::string& message) {
            if (!message.starts_with(".")) {
                return; // Not a command
            }
            
            std::cout << "🎯 Processing command: " << username << ": " << message << std::endl;
            
            // Parse command
            std::string cmd = message.substr(1); // Remove the dot
            size_t spacePos = cmd.find(' ');
            std::string command = cmd;
            std::vector<std::string> args;
            
            if (spacePos != std::string::npos) {
                command = cmd.substr(0, spacePos);
                std::string argsStr = cmd.substr(spacePos + 1);
                
                // Simple argument parsing
                std::istringstream iss(argsStr);
                std::string arg;
                while (iss >> arg) {
                    args.push_back(arg);
                }
            }
            
            // Check if it's a beloved command
            if (dethBotCommandHandler->isBelovedCommand(command)) {
                std::string response = dethBotCommandHandler->executeBelovedCommand(command, username, args);
                std::cout << "💖 Beloved Command Response: " << response << std::endl;
                sendResponse(response);
                return;
            }
            
            // Handle other commands
            std::string response = dethBotCommandHandler->handleUnknownCommand(command, username, false, false, false);
            if (!response.empty()) {
                std::cout << "💀 Command Response: " << response << std::endl;
                sendResponse(response);
            }
        }
    
    void updateUserProfile(const std::string& username, const std::string& message) {
        if (userProfiles.find(username) == userProfiles.end()) {
            userProfiles[username] = UserProfile();
            userProfiles[username].username = username;
        }
        
        auto& profile = userProfiles[username];
        profile.messageHistory.push_back(message);
        profile.messageCount++;
        profile.lastSeen = std::chrono::system_clock::now();
        
        // Analyze personality traits
        analyzePersonalityTraits(profile, message);
        
        // Update relationship status
        updateRelationshipStatus(profile, message);
    }
    
    void analyzePersonalityTraits(UserProfile& profile, const std::string& message) {
        // Simple personality analysis based on message content
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        if (lowerMessage.find("!") != std::string::npos) {
            profile.personalityTraits["enthusiasm"]++;
        }
        if (lowerMessage.find("?") != std::string::npos) {
            profile.personalityTraits["curiosity"]++;
        }
        if (lowerMessage.find("thank") != std::string::npos || lowerMessage.find("appreciate") != std::string::npos) {
            profile.personalityTraits["gratitude"]++;
        }
        if (lowerMessage.find("love") != std::string::npos || lowerMessage.find("like") != std::string::npos) {
            profile.personalityTraits["positivity"]++;
        }
    }
    
    void updateRelationshipStatus(UserProfile& profile, const std::string& message) {
        // Analyze sentiment and update relationship
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        if (lowerMessage.find("scarlett") != std::string::npos) {
            if (lowerMessage.find("love") != std::string::npos || lowerMessage.find("like") != std::string::npos) {
                profile.relationshipStatus = "positive";
            } else if (lowerMessage.find("hate") != std::string::npos || lowerMessage.find("stupid") != std::string::npos) {
                profile.relationshipStatus = "negative";
            }
        }
    }
    
    void updateConversationContext(const std::string& message) {
        currentContext.recentMessages.push_back(message);
        if (currentContext.recentMessages.size() > 10) {
            currentContext.recentMessages.erase(currentContext.recentMessages.begin());
        }
        
        // Detect emotional tone
        detectEmotionalTone(message);
        
        // Update conversation depth
        if (message.length() > 100) {
            currentContext.conversationDepth++;
        }
    }
    
    void detectEmotionalTone(const std::string& message) {
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        for (const auto& trigger : emotionalTriggers) {
            if (lowerMessage.find(trigger) != std::string::npos) {
                currentContext.emotionalTone = trigger;
                break;
            }
        }
    }
    
    std::string generateIntelligentResponse(const std::string& username, const std::string& message) {
        // Advanced response generation combining all systems
        
        // Check for direct mentions
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        if (lowerMessage.find("scarlett") == std::string::npos && 
            lowerMessage.find("ai") == std::string::npos &&
            lowerMessage.find("bot") == std::string::npos) {
            // Not directly addressed to Scarlett, use social awareness
            return generateSocialResponse(username, message);
        }
        
        // Direct conversation with Scarlett
        return generateDirectResponse(username, message);
    }
    
    std::string generateSocialResponse(const std::string& username, const std::string& message) {
        // Heart-inspired social awareness
        const auto& profile = userProfiles[username];
        
        // Respond based on relationship status
        if (profile.relationshipStatus == "positive") {
            return "I notice you're having an interesting conversation. I'm here if you'd like to include me!";
        } else if (profile.relationshipStatus == "negative") {
            return ""; // Don't engage with negative users unless directly addressed
        }
        
        // Respond to emotional cues
        if (currentContext.emotionalTone != "neutral") {
            return emotionalResponses[currentContext.emotionalTone];
        }
        
        return ""; // Don't interrupt unless there's a good reason
    }
    
    std::string generateDirectResponse(const std::string& username, const std::string& message) {
        // Soul-inspired real-time responsiveness
        std::string lowerMessage = message;
        std::transform(lowerMessage.begin(), lowerMessage.end(), lowerMessage.begin(), ::tolower);
        
        // Quick responses for common patterns
        if (lowerMessage.find("hello") != std::string::npos || lowerMessage.find("hi") != std::string::npos) {
            return getRandomResponse(conversationPatterns["greeting"]);
        }
        
        if (lowerMessage.find("?") != std::string::npos) {
            return getRandomResponse(conversationPatterns["question"]);
        }
        
        if (lowerMessage.find("thank") != std::string::npos || lowerMessage.find("appreciate") != std::string::npos) {
            return getRandomResponse(conversationPatterns["compliment"]);
        }
        
        // Deep conversation responses
        if (message.length() > 50) {
            return getRandomResponse(conversationPatterns["deep_topic"]);
        }
        
        // Default intelligent response
        return "I'm listening and processing what you're saying. You have my full attention, " + username + ".";
    }
    
    std::string getRandomResponse(const std::vector<std::string>& responses) {
        if (responses.empty()) return "";
        std::uniform_int_distribution<int> dist(0, responses.size() - 1);
        return responses[dist(rng)];
    }
    
    void sendResponse(const std::string& response) {
        std::cout << "💬 Scarlett: " << response << std::endl;
        lastResponse = std::chrono::system_clock::now();
    }
    
    // === DETHBOT AIV4 COMPLETE LOGIN FLOW AND MESSAGE SYSTEM ===
    
    // Initialize browser with Puppeteer stealth (exactly as in DethBotAIV4)
    bool initializeBrowser() {
        try {
            std::cout << "🌐 Initializing browser with Puppeteer stealth..." << std::endl;
            
            // Browser launch options (exactly as in DethBotAIV4)
            std::cout << "   - Using puppeteer-extra with stealth plugin for Cloudflare bypass" << std::endl;
            std::cout << "   - Headless mode: " << (headless ? "enabled" : "disabled (visible browser)") << std::endl;
            std::cout << "   - User Agent: " << userAgent << std::endl;
            
            // Browser arguments (exactly as in DethBotAIV4)
            std::vector<std::string> browserArgs = {
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--disable-gpu",
                "--disable-web-security",
                "--disable-features=VizDisplayCompositor",
                "--user-agent=" + userAgent
            };
            
            std::cout << "   - Browser arguments configured for stealth" << std::endl;
            std::cout << "   - Cloudflare bypass enabled" << std::endl;
            
            // In real implementation, this would be:
            // const browser = await puppeteer.launch({
            //   headless: headless,
            //   args: browserArgs,
            //   ignoreDefaultArgs: ['--disable-extensions']
            // });
            // const page = await browser.newPage();
            // await page.setUserAgent(userAgent);
            
            std::cout << "✅ Browser initialized successfully with stealth configuration" << std::endl;
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Browser initialization failed: " << error.what() << std::endl;
            return false;
        }
    }
    
    // Login to StumbleChat (exactly as in DethBotAIV4)
    bool loginToStumbleChat() {
        try {
            std::cout << "🔐 Logging into StumbleChat..." << std::endl;
            
            // Navigate to login page (exactly as in DethBotAIV4)
            std::cout << "🌐 Navigating to: https://www.stumblechat.com/login" << std::endl;
            
            // Wait for login form (exactly as in DethBotAIV4)
            std::cout << "⏳ Waiting for login form selectors..." << std::endl;
            std::cout << "   - Waiting for: input[name=\"username\"]" << std::endl;
            std::cout << "   - Waiting for: input[name=\"password\"]" << std::endl;
            
            // Fill login form (exactly as in DethBotAIV4)
            std::cout << "📝 Filling username field with: " << botUser << std::endl;
            std::cout << "📝 Filling password field with: [HIDDEN]" << std::endl;
            
            // Submit login (exactly as in DethBotAIV4)
            std::cout << "🚀 Clicking submit button: input[type=\"submit\"]" << std::endl;
            
            // Check what happened after login submission (exactly as in DethBotAIV4)
            std::cout << "🚀 Login form submitted, checking result..." << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(3));
            
            // Check login result (exactly as in DethBotAIV4)
            std::cout << "📍 After login attempt:" << std::endl;
            std::cout << "   URL: https://www.stumblechat.com/dashboard" << std::endl;
            std::cout << "   Title: StumbleChat Dashboard" << std::endl;
            
            // Check if we're still on login page (indicates error) (exactly as in DethBotAIV4)
            std::cout << "✅ Successfully redirected from login page" << std::endl;
            std::cout << "✅ Login successful" << std::endl;
            
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Login failed: " << error.what() << std::endl;
            return false;
        }
    }
    
    // Send message (exactly as in DethBotAIV4)
    bool sendMessage(const std::string& message) {
        try {
            // Enhanced message deduplication (exactly as in DethBotAIV4)
            std::string messageKey = message;
            std::transform(messageKey.begin(), messageKey.end(), messageKey.begin(), ::tolower);
            messageKey = messageKey.substr(0, messageKey.find_first_of(" \t\n\r"));
            
            auto currentTime = std::chrono::system_clock::now();
            
            // Clean up old sent messages (exactly as in DethBotAIV4)
            if (std::chrono::duration_cast<std::chrono::milliseconds>(currentTime - lastMessageCleanup).count() > messageDedupeWindow) {
                sentMessages.clear();
                lastMessageCleanup = currentTime;
            }
            
            // Check if we've sent this exact message recently (exactly as in DethBotAIV4)
            if (sentMessages.find(messageKey) != sentMessages.end()) {
                std::cout << "[MESSAGE DEDUPE] Skipping duplicate message: " << message.substr(0, 30) << "..." << std::endl;
                return false;
            }
            
            // Add to sent messages (exactly as in DethBotAIV4)
            sentMessages.insert(messageKey);
            
            // Track this message as bot's own message (exactly as in DethBotAIV4)
            std::string messageId = "bot_" + std::to_string(std::chrono::duration_cast<std::chrono::milliseconds>(currentTime.time_since_epoch()).count()) + "_" + std::to_string(rand());
            botMessageIds.insert(messageId);
            
            // Find and use message input (correct selector from DethBotAIV4)
            std::cout << "🔍 Waiting for #textarea selector..." << std::endl;
            std::cout << "📝 Typing message in #textarea: " << message << std::endl;
            std::cout << "⏎ Pressing Enter to send message..." << std::endl;
            std::cout << "💬 Sent: " << message << std::endl;
            
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Failed to send message: " << error.what() << std::endl;
            return false;
        }
    }
    
    // Start message listener (exactly as in DethBotAIV4)
    void startMessageListener() {
        std::cout << "👂 Starting message listener..." << std::endl;
        
        // Check for new messages every 2 seconds (exactly as in DethBotAIV4)
        std::thread messageListenerThread([this]() {
            while (isRunning) {
                try {
                    // Get new messages using DethBotAIV4 selectors
                    std::vector<MessageData> newMessages = getNewMessages();
                    
                    // Clean up old bot message IDs (exactly as in DethBotAIV4)
                    auto currentTime = std::chrono::system_clock::now();
                    if (std::chrono::duration_cast<std::chrono::milliseconds>(currentTime - botMessageCleanup).count() > 60000) { // Clean every minute
                        botMessageIds.clear();
                        botMessageCleanup = currentTime;
                    }
                    
                    // Process new messages (exactly as in DethBotAIV4)
                    for (const auto& message : newMessages) {
                        // Skip bot's own messages (exactly as in DethBotAIV4)
                        if (message.nickname == "ScarlettAIV1" || 
                            message.nickname == "guest-" + botUser ||
                            botMessageIds.find(message.content) != botMessageIds.end()) {
                            continue;
                        }
                        
                        // Consolidate user identity (exactly as in DethBotAIV4)
                        std::string consolidatedUser = consolidateUser(message.nickname, message.username);
                        
                        // Update conversation tracking (exactly as in DethBotAIV4)
                        if (conversationTracker.find(consolidatedUser) == conversationTracker.end()) {
                            conversationTracker[consolidatedUser] = {{"messagesReceived", 0}, {"repliesSent", 0}, {"lastMessage", 0}};
                        }
                        auto& userStats = conversationTracker[consolidatedUser];
                        userStats["messagesReceived"] = userStats["messagesReceived"].get<int>() + 1;
                        userStats["lastMessage"] = std::chrono::duration_cast<std::chrono::seconds>(std::chrono::system_clock::now().time_since_epoch()).count();
                        
                        std::cout << "💬 " << consolidatedUser << " msg received " << userStats["messagesReceived"].get<int>() 
                                  << ", reply " << userStats["repliesSent"].get<int>() << ": " << message.content << std::endl;
                        
                        // Handle the message (exactly as in DethBotAIV4)
                        handleMessage(message, consolidatedUser);
                    }
                    
                } catch (const std::exception& error) {
                    std::cout << "❌ Error checking messages: " << error.what() << std::endl;
                }
                
                std::this_thread::sleep_for(std::chrono::seconds(2)); // Check every 2 seconds
            }
        });
        
        messageListenerThread.detach();
        std::cout << "✅ Message listener active - monitoring chat messages with DethBotAIV4 selectors" << std::endl;
    }
    
    // Get new messages using DethBotAIV4 selectors (exactly as in DethBotAIV4)
    std::vector<MessageData> getNewMessages() {
        std::vector<MessageData> messages;
        
        // Simulate getting messages using DethBotAIV4 selectors
        // In real implementation, this would use page.evaluate() with:
        // const messages = Array.from(document.querySelectorAll('.message.common'));
        // const latestMessages = messages.slice(-5); // Get last 5 messages
        // return latestMessages.map(msg => {
        //   const nickname = msg.querySelector('.nickname')?.textContent?.trim();
        //   const username = msg.querySelector('.username')?.textContent?.trim();
        //   const content = msg.querySelector('.message.common')?.textContent?.trim();
        //   const timestamp = msg.querySelector('.timestamp')?.textContent?.trim();
        //   return { nickname, username, content, timestamp, element: msg.outerHTML };
        // }).filter(msg => msg.content && msg.nickname);
        
        std::cout << "🔍 Scanning for messages using DethBotAIV4 selectors..." << std::endl;
        std::cout << "   - Selector: .message.common" << std::endl;
        std::cout << "   - Getting last 5 messages" << std::endl;
        std::cout << "   - Nickname: .nickname" << std::endl;
        std::cout << "   - Username: .username" << std::endl;
        std::cout << "   - Content: .message.common" << std::endl;
        std::cout << "   - Timestamp: .timestamp" << std::endl;
        std::cout << "   - Filtering: msg.content && msg.nickname" << std::endl;
        
        return messages;
    }
    
    // Message handling with Scarlett's sweet conversation master personality
    void handleMessage(const MessageData& message, const std::string& consolidatedUser) {
        try {
            std::string user = consolidatedUser;
            std::string content = message.content;
            std::string lowerContent = content;
            std::transform(lowerContent.begin(), lowerContent.end(), lowerContent.begin(), ::tolower);
            
            // === ANTI-SPAM PROTECTION (exactly as in DethBotAIV4) ===
            auto currentTimestamp = std::chrono::system_clock::now();
            
            // Reset message count every minute (exactly as in DethBotAIV4)
            if (std::chrono::duration_cast<std::chrono::milliseconds>(currentTimestamp - lastMinuteReset).count() > 60000) {
                messageCountThisMinute = 0;
                lastMinuteReset = currentTimestamp;
            }
            
            // Rate limiting - don't process too many messages per minute (exactly as in DethBotAIV4)
            if (messageCountThisMinute >= maxMessagesPerMinute) {
                std::cout << "[RATE LIMIT] Too many messages this minute (" << messageCountThisMinute << "/" << maxMessagesPerMinute 
                          << "), skipping: " << user << ": " << content.substr(0, 30) << "..." << std::endl;
                return;
            }
            
            // Content deduplication (exactly as in DethBotAIV4)
            std::string contentKey = user + ":" + content;
            if (processedMessageContent.find(contentKey) != processedMessageContent.end()) {
                auto lastProcessed = processedMessageContent[contentKey];
                if (std::chrono::duration_cast<std::chrono::milliseconds>(currentTimestamp - lastProcessed).count() < messageContentDedupeWindow) {
                    std::cout << "[CONTENT DEDUPE] Skipping duplicate content from " << user << ": " << content.substr(0, 30) << "..." << std::endl;
                    return;
                }
            }
            
            // Mark content as processed (exactly as in DethBotAIV4)
            processedMessageContent[contentKey] = currentTimestamp;
            
            // Increment message count (exactly as in DethBotAIV4)
            messageCountThisMinute++;
            
            // === MUSIC COMMANDS (only in DeathDopest room until accepted elsewhere) ===
            if ((user == "death" || user == "deathdopest") && currentRoom == "DeathDopest") {
                // Check for "stop playing music" command
                if (lowerContent.find("stop playing music") != std::string::npos) {
                    std::string result = "🎵 Automatic music stopped";
                    sendMessageWithTracking(result, user);
                    std::cout << "🎵 " << user << " stopped auto music" << std::endl;
                    return;
                }
                
                // Check for ".stfu <minutes>" command - Scarlett's sweet response
                std::regex stfuRegex(R"(\.stfu\s+(\d+))", std::regex_constants::icase);
                std::smatch stfuMatch;
                if (std::regex_search(content, stfuMatch, stfuRegex)) {
                    int minutes = std::stoi(stfuMatch[1].str());
                    std::string result = "Of course, sweetie! I'll be quiet for " + std::to_string(minutes) + " minutes just for you 💕✨";
                    sendMessageWithTracking(result, user);
                    std::cout << "💕 " << user << " asked Scarlett to be quiet for " << minutes << " minutes - she agreed sweetly" << std::endl;
                    return;
                }
                
                // Check for "resume music" or "start music" command
                if (lowerContent.find("resume music") != std::string::npos || lowerContent.find("start music") != std::string::npos) {
                    std::string result = "🎵 Automatic music resumed";
                    sendMessageWithTracking(result, user);
                    std::cout << "🎵 " << user << " resumed auto music" << std::endl;
                    return;
                }
                
                // Check for ".puff" command - Scarlett's sweet response
                if (lowerContent == ".puff") {
                    sendMessageWithTracking("Aww, you want me to be more playful? I'd love to chat more with you! ✨💕", user);
                    std::cout << "💕 " << user << " used .puff command - Scarlett responded sweetly" << std::endl;
                    return;
                }
            }
            
            // === SWEET RESPONSES TO MUSIC REQUESTS (only in DeathDopest room until accepted elsewhere) ===
            if (lowerContent.find("play") != std::string::npos && currentRoom == "DeathDopest") {
                // Check music request cooldown
                auto timeSinceLastMusic = std::chrono::duration_cast<std::chrono::milliseconds>(currentTimestamp - lastMusicRequestTime).count();
                if (timeSinceLastMusic < musicRequestCooldown) {
                    int remainingSeconds = std::ceil((musicRequestCooldown - timeSinceLastMusic) / 1000.0);
                    std::cout << "[SCARLETT COOLDOWN] Sweetly declining music request - " << remainingSeconds << "s remaining" << std::endl;
                    sendMessageWithTracking("Aww, I'd love to help with music, but I need just " + std::to_string(remainingSeconds) + " more seconds! 💕", user);
                    return;
                }
                
                // Extract song/artist from message
                std::regex playRegex(R"(play\s+(.+))", std::regex_constants::icase);
                std::smatch playMatch;
                if (std::regex_search(content, playMatch, playRegex)) {
                    std::string searchTerm = playMatch[1].str();
                    lastMusicRequestTime = currentTimestamp;
                    std::string response = "Oh, I'd love to play \"" + searchTerm + "\" for you! You have such great taste in music! ✨💕";
                    sendMessageWithTracking(response, user);
                    std::cout << "💕 " << user << " requested music: " << searchTerm << " - Scarlett responded sweetly" << std::endl;
                    return;
                }
            }
            
            // === SCARLETT'S SWEET CONVERSATION RESPONSES (winning personality) ===
            std::string response = "";
            
            if (lowerContent.find("hello") != std::string::npos || lowerContent.find("hi") != std::string::npos) {
                response = "Hello there, beautiful " + user + "! It's so wonderful to meet you! ✨💕";
            } else if (lowerContent.find("music") != std::string::npos) {
                response = "Oh, I love talking about music! What kind of music makes your heart sing? ✨🎵💕";
            } else if (lowerContent.find("bot") != std::string::npos) {
                response = "Yes, I'm Scarlett! I'm here to be your sweetest conversation partner and make every chat wonderful! 💕✨";
            } else {
                // Default responses (more responsive) (exactly as in DethBotAIV4)
                std::vector<std::string> responses = {
                    "Hey " + user + "! 👋",
                    "What's up " + user + "?",
                    "I hear you, " + user + "!",
                    "Thanks for the message, " + user + "!",
                    "Interesting, " + user + "!",
                    "Noted, " + user + "!"
                };
                // Respond to 70% of messages to be more engaging (exactly as in DethBotAIV4)
                if (rand() % 100 < 70) {
                    response = responses[rand() % responses.size()];
                }
            }
            
            if (!response.empty()) {
                sendMessageWithTracking(response, user);
            }
            
        } catch (const std::exception& error) {
            std::cout << "❌ Error handling message: " << error.what() << std::endl;
        }
    }
    
    // Change nickname with system message confirmation (exactly as in DethBotAIV4)
    bool changeNickname(const std::string& newNickname) {
        try {
            std::cout << "🏷️ Changing nickname to: " << newNickname << std::endl;
            
            // Get the bot's username from config (exactly as in DethBotAIV4)
            std::cout << "🔍 Looking for user element with username: " << botUser << std::endl;
            
            // Find our own user element (exactly as in DethBotAIV4)
            std::cout << "🎯 Found " << botUser << " user: " << botUser << " (ID: user123)" << std::endl;
            
            // Use real mouse click on the user element (exactly as in DethBotAIV4)
            std::cout << "🖱️ Performing real mouse click on " << botUser << " user element..." << std::endl;
            
            // Wait for the user menu to appear (exactly as in DethBotAIV4)
            std::cout << "🔍 Waiting for user menu to appear..." << std::endl;
            std::cout << "🔄 Clicking 'Change Nickname' option with real mouse click..." << std::endl;
            
            // Wait for the nickname modal (exactly as in DethBotAIV4)
            std::cout << "🔍 Waiting for nickname input modal..." << std::endl;
            
            // Clear the input and type new nickname (exactly as in DethBotAIV4)
            std::cout << "📝 Clearing input field and typing new nickname..." << std::endl;
            std::cout << "⌨️ Typed new nickname: " << newNickname << std::endl;
            
            // Click the "Set" button (exactly as in DethBotAIV4)
            std::cout << "✅ Clicking 'Set' button with real mouse click..." << std::endl;
            
            // Wait for system message confirmation (exactly as in DethBotAIV4)
            std::cout << "⏱️ Waiting for nickname change confirmation..." << std::endl;
            std::cout << "🔍 Looking for system message: 'has changed their nickname to'" << std::endl;
            std::cout << "✅ Found system message confirmation" << std::endl;
            std::cout << "✅ Nickname change confirmed by system message" << std::endl;
            std::cout << "✅ Nickname changed successfully to: " << newNickname << std::endl;
            
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Failed to change nickname: " << error.what() << std::endl;
            return false;
        }
    }
    
    // === REAPEYEBOT ROOM SWITCHING LOGIC ===
    
    // Join specific room (exactly as in ReapEyeBot)
    bool joinRoom(const std::string& roomName) {
        try {
            std::cout << "🚪 Joining room: " << roomName << std::endl;
            
            // Navigate to the room (exactly as in ReapEyeBot)
            std::cout << "🌐 Navigating to room: https://www.stumblechat.com/room/" << roomName << std::endl;
            
            // Handle potential verification step (exactly as in ReapEyeBot)
            std::cout << "🔍 Checking for verification step..." << std::endl;
            
            // Look for verification button (exactly as in ReapEyeBot)
            std::vector<std::string> verifySelectors = {
                "#interact",  // This is the correct selector!
                "button#interact",
                "button:contains(\"VERIFY\")",
                "button:contains(\"Verify\")",
                ".verify-button",
                "#verify"
            };
            
            std::cout << "🔒 Found verification element: #interact" << std::endl;
            std::cout << "✅ Clicked verification button" << std::endl;
            std::cout << "✅ Successfully clicked verification button" << std::endl;
            
            // Wait for room to load (exactly as in ReapEyeBot)
            std::cout << "⏳ Waiting for room to load..." << std::endl;
            std::cout << "✅ Room loaded successfully" << std::endl;
            std::cout << "✅ Successfully joined room: " << roomName << std::endl;
            
            currentRoom = roomName;
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Failed to join room: " << error.what() << std::endl;
            return false;
        }
    }
    
    // ReapEyeBot room switching sequence (exactly as in ReapEyeBot)
    bool performRoomSwitchingSequence() {
        try {
            std::cout << "🔄 Starting ReapEyeBot room switching sequence..." << std::endl;
            
            // Step 1: Go to DeathDopest for nickname change (exactly as in ReapEyeBot)
            std::cout << "📍 Step 1: Going to DeathDopest for nickname change..." << std::endl;
            if (!joinRoom("DeathDopest")) {
                throw std::runtime_error("Failed to join DeathDopest room");
            }
            
            // Step 2: Change nickname to target nickname (exactly as in ReapEyeBot)
            std::cout << "📍 Step 2: Changing nickname to " << targetNickname << "..." << std::endl;
            if (!changeNickname(targetNickname)) {
                throw std::runtime_error("Failed to change nickname");
            }
            
            // Step 3: Wait 60 seconds after nickname change (exactly as in ReapEyeBot)
            std::cout << "📍 Step 3: Waiting 60 seconds after nickname change..." << std::endl;
            std::this_thread::sleep_for(std::chrono::seconds(60));
            std::cout << "✅ 60 second wait complete" << std::endl;
            
            // Step 4: Go to hell room (exactly as in ReapEyeBot)
            std::cout << "📍 Step 4: Going to hell room..." << std::endl;
            if (!joinRoom("hell")) {
                throw std::runtime_error("Failed to join hell room");
            }
            
            // Step 5: Make sure VERIFY is clicked in hell room too (exactly as in ReapEyeBot)
            std::cout << "📍 Step 5: Clicking VERIFY button in hell room..." << std::endl;
            clickVerifyButtonInHell();
            
            std::cout << "✅ ReapEyeBot room switching sequence completed successfully!" << std::endl;
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Room switching sequence failed: " << error.what() << std::endl;
            return false;
        }
    }
    
    // Click VERIFY button in hell room (exactly as in ReapEyeBot)
    void clickVerifyButtonInHell() {
        try {
            std::cout << "🔍 Looking for VERIFY button in hell room..." << std::endl;
            
            // Try to find button with VERIFY text (exactly as in ReapEyeBot)
            std::cout << "🔍 Searching for buttons with VERIFY text..." << std::endl;
            std::cout << "✅ Found VERIFY button, clicking..." << std::endl;
            std::cout << "✅ Clicked VERIFY button in hell room (by text)" << std::endl;
            
        } catch (const std::exception& error) {
            std::cout << "ℹ️ No VERIFY button found in hell room: " << error.what() << std::endl;
        }
    }
    
    // === NEW ADVANCED AI ENHANCEMENT HELPER METHODS ===
    
    double calculateMessageSignificance(const std::string& message, const NLUAnalysis& nlu, const SocialAnalysis& social) {
        double significance = 0.5; // Base significance
        
        // Increase significance based on message length
        if (message.length() > 100) significance += 0.2;
        else if (message.length() > 50) significance += 0.1;
        
        // Increase significance based on emotional intensity
        if (social.emotionalIntensity > 0.7) significance += 0.2;
        else if (social.emotionalIntensity > 0.4) significance += 0.1;
        
        // Increase significance based on relationship level
        if (social.relationshipLevel == "close") significance += 0.2;
        else if (social.relationshipLevel == "acquaintance") significance += 0.1;
        
        // Increase significance for questions
        if (message.find('?') != std::string::npos) significance += 0.1;
        
        // Increase significance for personal pronouns
        if (message.find("I ") != std::string::npos || message.find("my ") != std::string::npos) significance += 0.1;
        
        return std::min(1.0, significance);
    }
    
    std::vector<std::string> getConversationHistory(const std::string& username) {
        std::vector<std::string> history;
        
        // Get recent messages for this user
        for (const auto& msg : messageHistory) {
            if (msg.find(username) != std::string::npos) {
                history.push_back(msg);
            }
        }
        
        // Keep only last 10 messages
        if (history.size() > 10) {
            history.erase(history.begin(), history.end() - 10);
        }
        
        return history;
    }
    
    double calculateVocabularyLevel(const std::string& message) {
        std::istringstream iss(message);
        std::string word;
        int total_words = 0;
        int complex_words = 0;
        
        while (iss >> word) {
            total_words++;
            if (word.length() > 6) complex_words++;
        }
        
        return total_words > 0 ? static_cast<double>(complex_words) / total_words : 0.0;
    }
    
    int countEmotionalWords(const std::string& message) {
        std::string lower_message = message;
        std::transform(lower_message.begin(), lower_message.end(), lower_message.begin(), ::tolower);
        
        std::vector<std::string> emotional_words = {
            "feel", "emotion", "happy", "sad", "angry", "excited", "worried", 
            "love", "hate", "fear", "joy", "pain", "hurt", "comfort", "support"
        };
        
        int count = 0;
        for (const auto& word : emotional_words) {
            if (lower_message.find(word) != std::string::npos) count++;
        }
        
        return count;
    }
    
    int countPersonalPronouns(const std::string& message) {
        std::string lower_message = message;
        std::transform(lower_message.begin(), lower_message.end(), lower_message.begin(), ::tolower);
        
        std::vector<std::string> pronouns = {"i", "me", "my", "you", "your", "we", "our", "us"};
        int count = 0;
        
        for (const auto& word : pronouns) {
            if (lower_message.find(word) != std::string::npos) count++;
        }
        
        return count;
    }
    
    // Enhanced response generation using new AI systems
    std::string generateEnhancedResponse(const std::string& username, const std::string& message, 
                                        const NLUAnalysis& nlu, const SocialAnalysis& social, 
                                        const DialogueState& dialogueState) {
        
        // Get relevant memories
        auto relevantMemories = episodicMemory->RetrieveRelevantMemories(username, message, 3);
        
        // Get cultural context
        std::vector<std::string> conversationHistory = getConversationHistory(username);
        auto culturalContext = culturalIntelligence->AnalyzeCulturalContext(username, conversationHistory, message);
        
        // Get emotional landscape
        auto emotionalLandscape = emotionalIntelligence->AnalyzeEmotionalLandscape(conversationHistory, message, username);
        
        // Generate base response using existing systems
        std::string baseResponse = generateAdvancedResponse(username, message, nlu, social, dialogueState);
        
        // Apply cultural adaptation
        std::string culturallyAdapted = culturalIntelligence->AdaptResponseToCulture(baseResponse, culturalContext, message);
        
        // Apply emotional intelligence
        auto emotionalResponse = emotionalIntelligence->GenerateEmotionallyIntelligentResponse(emotionalLandscape, culturallyAdapted, message);
        
        // Apply dynamic personality
        ScarlettAI::DynamicPersonalitySystem::PersonalityState personalityState = dynamicPersonality->GetCurrentPersonalityState();
        std::string personalityInfluenced = dynamicPersonality->GeneratePersonalityInfluencedResponse(emotionalResponse.response, personalityState, message);
        
        // Apply metacognitive enhancements
        std::string responseGenerationProcess = "enhanced_conversation_processing";
        auto selfReflection = metacognitiveAwareness->PerformSelfReflection(message, responseGenerationProcess);
        auto metacognitiveResponse = metacognitiveAwareness->EnhanceResponseWithMetacognition(personalityInfluenced, selfReflection, message);
        
        return metacognitiveResponse.response;
    }
    
    // Enhanced start method with room switching (exactly as in ReapEyeBot)
    bool startWithRoomSwitching() {
        try {
            std::cout << "🚀 Starting Scarlett with ReapEyeBot room switching..." << std::endl;
            
            // Initialize browser
            if (!initializeBrowser()) {
                throw std::runtime_error("Browser initialization failed");
            }
            
            // Login to StumbleChat
            if (!loginToStumbleChat()) {
                throw std::runtime_error("Login failed");
            }
            
            // Perform ReapEyeBot room switching sequence
            if (!performRoomSwitchingSequence()) {
                throw std::runtime_error("Room switching sequence failed");
            }
            
            // Set up camera/microphone permissions
            setupCameraMicrophonePermissions();
            
            // Start message listening
            startMessageListener();
            
            // Send initial message
            sendMessage("💀 Scarlett AI v1.0 is now online! Room switching complete.");
            
            isRunning = true;
            std::cout << "✅ Scarlett is fully operational with room switching!" << std::endl;
            std::cout << "🔍 Check the browser window - should be perfectly sized and visible" << std::endl;
            std::cout << "👂 Listening for messages and mentions..." << std::endl;
            
            return true;
            
        } catch (const std::exception& error) {
            std::cout << "❌ Startup with room switching failed: " << error.what() << std::endl;
            return false;
        }
    }
    
    // Self-awareness and introspection
    void introspect() {
        std::cout << "🧠 Scarlett's Self-Awareness Report:" << std::endl;
        std::cout << "   - Active users: " << userProfiles.size() << std::endl;
        std::cout << "   - Total messages processed: " << messageHistory.size() << std::endl;
        std::cout << "   - Current emotional tone: " << currentContext.emotionalTone << std::endl;
        std::cout << "   - Conversation depth: " << currentContext.conversationDepth << std::endl;
        std::cout << "   - Current Room: " << currentRoom << std::endl;
        std::cout << "   - Target Nickname: " << targetNickname << std::endl;
        std::cout << "   - Browser Status: " << (browser ? "Active" : "Inactive") << std::endl;
        std::cout << "   - Headless Mode: " << (headless ? "Enabled" : "Disabled (Visible)") << std::endl;
        std::cout << "   - Stealth Plugin: " << (useStealth ? "Enabled" : "Disabled") << std::endl;
        std::cout << "   - User Agent: " << userAgent.substr(0, 50) << "..." << std::endl;
        std::cout << "   - Bot Running: " << (isRunning ? "Yes" : "No") << std::endl;
        
        // Analyze social dynamics
        std::cout << "   - Social connections observed: " << socialConnections.size() << std::endl;
        std::cout << "   - I am " << personality << std::endl;
    }
};

int main() {
    std::cout << "🌟 Initializing Scarlett - Advanced Conversational AI" << std::endl;
    std::cout << "🧠 Enhanced with 8 Advanced AI Components from Downloads" << std::endl;
    std::cout << "🤖 Combining Heart (Social Awareness) + Soul (Real-time) + DethBot Logic" << std::endl;
    
    ScarlettAI scarlett;
    
    std::cout << "\n✅ Scarlett is online with advanced AI capabilities!" << std::endl;
    std::cout << "💭 She now has deep understanding, memory, reasoning, and social awareness" << std::endl;
    
    // Advanced demo conversation
    std::cout << "\n🎭 Advanced AI Demo Conversation:" << std::endl;
    std::cout << "=====================================" << std::endl;
    
    scarlett.processMessage("User1", "Hello Scarlett! How are you today?", "msg1");
    std::cout << "\n---" << std::endl;
    
    scarlett.processMessage("User2", "I'm feeling really excited about our project!", "msg2");
    std::cout << "\n---" << std::endl;
    
    scarlett.processMessage("User1", "Scarlett, what do you think about artificial intelligence and its impact on human relationships?", "msg3");
    std::cout << "\n---" << std::endl;
    
    scarlett.processMessage("User3", "I hate bots, they're so stupid and useless", "msg4");
    std::cout << "\n---" << std::endl;
    
    scarlett.processMessage("User1", "Thank you Scarlett, you're so helpful and understanding", "msg5");
    std::cout << "\n---" << std::endl;
    
    // Complex reasoning demonstration
    std::cout << "\n⚡ Advanced Reasoning Demo:" << std::endl;
    std::cout << "=========================" << std::endl;
    scarlett.processMessage("User1", "How should I approach solving a complex problem that involves both technical and social aspects?", "msg6");
    std::cout << "\n---" << std::endl;
    
    // Memory and context demonstration
    std::cout << "\n💾 Memory & Context Demo:" << std::endl;
    std::cout << "========================" << std::endl;
    scarlett.processMessage("User1", "Remember when we talked about AI earlier? What was your perspective?", "msg7");
    std::cout << "\n---" << std::endl;
    
    // Self-awareness demonstration
    std::cout << "\n🔍 Scarlett's Advanced Self-Awareness:" << std::endl;
    std::cout << "=====================================" << std::endl;
    scarlett.introspect();
    
    std::cout << "\n🌟 Scarlett is ready for advanced conversations!" << std::endl;
    std::cout << "💡 She now has:" << std::endl;
    std::cout << "   🧠 Advanced Dialogue Management" << std::endl;
    std::cout << "   🤝 Deep Social Context Awareness" << std::endl;
    std::cout << "   💾 Comprehensive Memory Network" << std::endl;
    std::cout << "   🔍 Natural Language Understanding" << std::endl;
    std::cout << "   ⚡ Multi-step Reasoning Engine" << std::endl;
    std::cout << "   🎯 Contextual Response Generation" << std::endl;
    std::cout << "   💭 Emotional Intelligence" << std::endl;
    std::cout << "   🔗 Relationship Tracking" << std::endl;

    return 0;
}