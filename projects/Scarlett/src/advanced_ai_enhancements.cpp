#include "advanced_ai_enhancements.h"
#include <sstream>
#include <iomanip>
#include <cmath>
#include <regex>
#include <unordered_set>
#include <algorithm>

namespace ScarlettAI {

// === EPISODIC MEMORY SYSTEM IMPLEMENTATION ===

EpisodicMemorySystem::EpisodicMemorySystem(const Config& config) : config_(config) {
    std::cout << "🧠💾 Episodic Memory System initializing..." << std::endl;
}

std::string EpisodicMemorySystem::StoreMemory(const std::string& participant, 
                                             const std::string& message, 
                                             const Memory::Context& context, 
                                             double significance_score) {
    Memory memory;
    memory.id = GenerateMemoryId();
    memory.timestamp = std::chrono::system_clock::now();
    memory.participant = participant;
    memory.content = message;
    memory.context = context;
    memory.significance = significance_score;
    memory.access_count = 0;
    memory.last_accessed = std::chrono::system_clock::now();
    memory.associated_concepts = ExtractConcepts(message);
    memory.emotional_valence = CalculateEmotionalValence(context);
    memory.memory_type = ClassifyMemoryType(context);
    memory.consolidation_strength = 0.1;
    
    // Store in multiple indices for fast retrieval
    IndexMemory(memory);
    
    // Create associations with existing memories
    CreateMemoryAssociations(memory);
    
    // Trigger memory consolidation if needed
    if (static_cast<double>(rand()) / RAND_MAX < 0.1) { // 10% chance
        ConsolidateMemories(participant);
    }
    
    return memory.id;
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveRelevantMemories(
    const std::string& participant, 
    const std::string& current_context, 
    int limit) {
    
    std::set<Memory> candidate_memories;
    
    // Multi-strategy memory retrieval
    auto recency_memories = RetrieveByRecency(participant, limit);
    auto significance_memories = RetrieveBySignificance(participant, 0.5, limit);
    auto emotional_memories = RetrieveByEmotionalResonance(participant, "neutral", limit);
    auto semantic_memories = RetrieveBySemanticSimilarity(participant, current_context, limit);
    auto association_memories = RetrieveByAssociation(participant, current_context, limit);
    
    // Combine all strategies
    for (const auto& memory : recency_memories) candidate_memories.insert(memory);
    for (const auto& memory : significance_memories) candidate_memories.insert(memory);
    for (const auto& memory : emotional_memories) candidate_memories.insert(memory);
    for (const auto& memory : semantic_memories) candidate_memories.insert(memory);
    for (const auto& memory : association_memories) candidate_memories.insert(memory);
    
    // Rank and select best memories
    std::vector<Memory> ranked_memories = RankMemoriesByRelevance(
        std::vector<Memory>(candidate_memories.begin(), candidate_memories.end()),
        current_context
    );
    
    // Update access patterns
    for (int i = 0; i < std::min(limit, static_cast<int>(ranked_memories.size())); ++i) {
        ranked_memories[i].access_count++;
        ranked_memories[i].last_accessed = std::chrono::system_clock::now();
    }
    
    return std::vector<Memory>(ranked_memories.begin(), 
                               ranked_memories.begin() + std::min(limit, static_cast<int>(ranked_memories.size())));
}

void EpisodicMemorySystem::ConsolidateMemories(const std::string& participant) {
    auto& participant_memories = episodic_memories_[participant];
    
    for (auto& memory : participant_memories) {
        // Calculate consolidation factors
        double age_factor = CalculateAgeFactor(memory);
        double access_factor = std::log(memory.access_count + 1) / 10.0;
        double significance_factor = memory.significance;
        double emotional_factor = std::abs(memory.emotional_valence);
        
        double consolidation_delta = (significance_factor + access_factor + emotional_factor) * 0.1 - age_factor * 0.05;
        
        memory.consolidation_strength = std::max(0.0, std::min(1.0, 
            memory.consolidation_strength + consolidation_delta
        ));
        
        // Remove very weak memories
        if (memory.consolidation_strength < 0.1 && memory.significance < 0.3) {
            RemoveMemory(memory.id);
        }
    }
}

std::string EpisodicMemorySystem::GenerateMemoryId() {
    static std::random_device rd;
    static std::mt19937 gen(rd());
    static std::uniform_int_distribution<> dis(100000, 999999);
    return "mem_" + std::to_string(dis(gen));
}

std::vector<std::string> EpisodicMemorySystem::ExtractConcepts(const std::string& message) {
    std::vector<std::string> concepts;
    std::istringstream iss(message);
    std::string word;
    
    // Simple concept extraction - in a real implementation, this would use NLP
    while (iss >> word) {
        if (word.length() > 4) { // Only consider words longer than 4 characters
            concepts.push_back(word);
        }
    }
    
    return concepts;
}

double EpisodicMemorySystem::CalculateEmotionalValence(const Memory::Context& context) {
    // Simple emotional valence calculation
    std::map<std::string, double> emotion_valence = {
        {"joy", 0.8}, {"happiness", 0.8}, {"excitement", 0.7},
        {"sadness", -0.7}, {"anger", -0.6}, {"fear", -0.8},
        {"neutral", 0.0}, {"calm", 0.1}
    };
    
    auto it = emotion_valence.find(context.emotional_state);
    return (it != emotion_valence.end()) ? it->second : 0.0;
}

std::string EpisodicMemorySystem::ClassifyMemoryType(const Memory::Context& context) {
    if (context.conversation_type == "personal") return "personal";
    if (context.conversation_type == "professional") return "professional";
    if (context.conversation_type == "emotional") return "emotional";
    return "general";
}

void EpisodicMemorySystem::IndexMemory(const Memory& memory) {
    // Store in episodic memories
    episodic_memories_[memory.participant].push_back(memory);
    
    // Store in temporal index
    temporal_index_[memory.timestamp].push_back(memory);
    
    // Store in significance index
    significance_index_[memory.significance].push_back(memory);
    
    // Store in emotional memories
    std::string emotion_key = memory.context.emotional_state + "_" + memory.participant;
    emotional_memories_[emotion_key].push_back(memory);
}

void EpisodicMemorySystem::CreateMemoryAssociations(const Memory& memory) {
    // Simple association creation - in a real implementation, this would use semantic analysis
    for (const auto& concept : memory.associated_concepts) {
        if (concept_embeddings_.find(concept) == concept_embeddings_.end()) {
            concept_embeddings_[concept] = std::vector<double>(10, 0.0); // 10-dimensional embedding
        }
    }
}

double EpisodicMemorySystem::CalculateAgeFactor(const Memory& memory) {
    auto now = std::chrono::system_clock::now();
    auto age = std::chrono::duration_cast<std::chrono::hours>(now - memory.timestamp).count();
    return std::min(1.0, age / (24.0 * 30.0)); // Normalize to 30 days
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveByRecency(
    const std::string& participant, int limit) {
    auto& memories = episodic_memories_[participant];
    std::sort(memories.begin(), memories.end(), [](const Memory& a, const Memory& b) {
        return a.timestamp > b.timestamp;
    });
    return std::vector<Memory>(memories.begin(), 
                               memories.begin() + std::min(limit, static_cast<int>(memories.size())));
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveBySignificance(
    const std::string& participant, double threshold, int limit) {
    auto& memories = episodic_memories_[participant];
    std::vector<Memory> filtered;
    
    for (const auto& memory : memories) {
        if (memory.significance >= threshold) {
            filtered.push_back(memory);
        }
    }
    
    std::sort(filtered.begin(), filtered.end(), [](const Memory& a, const Memory& b) {
        return a.significance > b.significance;
    });
    
    return std::vector<Memory>(filtered.begin(), 
                               filtered.begin() + std::min(limit, static_cast<int>(filtered.size())));
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveByEmotionalResonance(
    const std::string& participant, const std::string& emotion, int limit) {
    std::string emotion_key = emotion + "_" + participant;
    auto it = emotional_memories_.find(emotion_key);
    if (it != emotional_memories_.end()) {
        return std::vector<Memory>(it->second.begin(), 
                                   it->second.begin() + std::min(limit, static_cast<int>(it->second.size())));
    }
    return {};
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveBySemanticSimilarity(
    const std::string& participant, const std::string& context, int limit) {
    // Simple semantic similarity - in a real implementation, this would use embeddings
    auto& memories = episodic_memories_[participant];
    std::vector<std::pair<Memory, double>> scored_memories;
    
    for (const auto& memory : memories) {
        double similarity = 0.0;
        for (const auto& concept : memory.associated_concepts) {
            if (context.find(concept) != std::string::npos) {
                similarity += 0.1;
            }
        }
        scored_memories.push_back({memory, similarity});
    }
    
    std::sort(scored_memories.begin(), scored_memories.end(), 
              [](const auto& a, const auto& b) { return a.second > b.second; });
    
    std::vector<Memory> result;
    for (int i = 0; i < std::min(limit, static_cast<int>(scored_memories.size())); ++i) {
        result.push_back(scored_memories[i].first);
    }
    
    return result;
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RetrieveByAssociation(
    const std::string& participant, const std::string& context, int limit) {
    // Simple association retrieval
    return RetrieveBySemanticSimilarity(participant, context, limit);
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::RankMemoriesByRelevance(
    const std::vector<Memory>& memories, const std::string& context) {
    std::vector<std::pair<Memory, double>> scored_memories;
    
    for (const auto& memory : memories) {
        double score = 0.0;
        
        // Recency score
        double age_factor = CalculateAgeFactor(memory);
        score += (1.0 - age_factor) * 0.3;
        
        // Significance score
        score += memory.significance * 0.4;
        
        // Access count score
        score += std::log(memory.access_count + 1) * 0.1;
        
        // Consolidation strength score
        score += memory.consolidation_strength * 0.2;
        
        scored_memories.push_back({memory, score});
    }
    
    std::sort(scored_memories.begin(), scored_memories.end(), 
              [](const auto& a, const auto& b) { return a.second > b.second; });
    
    std::vector<Memory> result;
    for (const auto& pair : scored_memories) {
        result.push_back(pair.first);
    }
    
    return result;
}

void EpisodicMemorySystem::RemoveMemory(const std::string& memory_id) {
    for (auto& [participant, memories] : episodic_memories_) {
        memories.erase(std::remove_if(memories.begin(), memories.end(),
            [&memory_id](const Memory& m) { return m.id == memory_id; }), memories.end());
    }
}

void EpisodicMemorySystem::CleanupOldMemories() {
    auto cutoff_time = std::chrono::system_clock::now() - 
                      std::chrono::hours(24 * config_.memory_retention_days);
    
    for (auto& [participant, memories] : episodic_memories_) {
        memories.erase(std::remove_if(memories.begin(), memories.end(),
            [&cutoff_time](const Memory& m) { return m.timestamp < cutoff_time; }), memories.end());
    }
}

std::map<std::string, int> EpisodicMemorySystem::GetMemoryStats() const {
    std::map<std::string, int> stats;
    int total_memories = 0;
    
    for (const auto& [participant, memories] : episodic_memories_) {
        total_memories += memories.size();
    }
    
    stats["total_memories"] = total_memories;
    stats["participants"] = episodic_memories_.size();
    stats["concepts"] = concept_embeddings_.size();
    
    return stats;
}

std::vector<EpisodicMemorySystem::Memory> EpisodicMemorySystem::GetMemoriesBySignificance(
    double min_significance) const {
    std::vector<Memory> result;
    
    for (const auto& [participant, memories] : episodic_memories_) {
        for (const auto& memory : memories) {
            if (memory.significance >= min_significance) {
                result.push_back(memory);
            }
        }
    }
    
    std::sort(result.begin(), result.end(), [](const Memory& a, const Memory& b) {
        return a.significance > b.significance;
    });
    
    return result;
}

// === DYNAMIC PERSONALITY SYSTEM IMPLEMENTATION ===

DynamicPersonalitySystem::DynamicPersonalitySystem(const Config& config) : config_(config) {
    InitializePersonalityStates();
    InitializeExpressionPatterns();
    std::cout << "🎭🧬 Dynamic Personality System initializing..." << std::endl;
}

DynamicPersonalitySystem::PersonalityTraits DynamicPersonalitySystem::AdaptPersonalityToContext(
    const std::string& conversation_context, 
    const std::vector<std::string>& relationship_history) {
    
    std::string context_type = IdentifyContextType(conversation_context);
    auto relationship_influence = CalculateRelationshipInfluence(relationship_history);
    
    PersonalityTraits adjustments;
    
    // Apply context-specific modifications
    if (personality_states_.find(context_type) != personality_states_.end()) {
        const auto& state = personality_states_[context_type];
        adjustments.openness += state.adjustments.openness;
        adjustments.conscientiousness += state.adjustments.conscientiousness;
        adjustments.extraversion += state.adjustments.extraversion;
        adjustments.agreeableness += state.adjustments.agreeableness;
        adjustments.neuroticism += state.adjustments.neuroticism;
    }
    
    // Apply relationship-based modifications
    for (const auto& [trait, influence] : relationship_influence) {
        if (trait == "openness") adjustments.openness += influence;
        else if (trait == "conscientiousness") adjustments.conscientiousness += influence;
        else if (trait == "extraversion") adjustments.extraversion += influence;
        else if (trait == "agreeableness") adjustments.agreeableness += influence;
        else if (trait == "neuroticism") adjustments.neuroticism += influence;
    }
    
    // Apply adaptation rate and stability
    adjustments.openness *= config_.personality_adaptation_rate * (1.0 - 0.8); // stability
    adjustments.conscientiousness *= config_.personality_adaptation_rate * (1.0 - 0.9);
    adjustments.extraversion *= config_.personality_adaptation_rate * (1.0 - 0.7);
    adjustments.agreeableness *= config_.personality_adaptation_rate * (1.0 - 0.8);
    adjustments.neuroticism *= config_.personality_adaptation_rate * (1.0 - 0.6);
    
    return adjustments;
}

std::string DynamicPersonalitySystem::GeneratePersonalityInfluencedResponse(
    const std::string& base_response, 
    const PersonalityState& personality_state, 
    const std::string& context) {
    
    std::string influenced_response = base_response;
    
    // Apply personality-specific vocabulary
    influenced_response = ApplyPersonalityVocabulary(influenced_response, personality_state);
    
    // Apply personality-specific response patterns
    influenced_response = ApplyPersonalityPatterns(influenced_response, personality_state, context);
    
    // Apply personality-specific conversation style
    influenced_response = ApplyPersonalityStyle(influenced_response, personality_state);
    
    return influenced_response;
}

void DynamicPersonalitySystem::UpdatePersonalityTraits(const PersonalityTraits& adjustments) {
    current_traits_.openness = std::max(0.0, std::min(1.0, current_traits_.openness + adjustments.openness));
    current_traits_.conscientiousness = std::max(0.0, std::min(1.0, current_traits_.conscientiousness + adjustments.conscientiousness));
    current_traits_.extraversion = std::max(0.0, std::min(1.0, current_traits_.extraversion + adjustments.extraversion));
    current_traits_.agreeableness = std::max(0.0, std::min(1.0, current_traits_.agreeableness + adjustments.agreeableness));
    current_traits_.neuroticism = std::max(0.0, std::min(1.0, current_traits_.neuroticism + adjustments.neuroticism));
}

DynamicPersonalitySystem::PersonalityState DynamicPersonalitySystem::GetCurrentPersonalityState() const {
    // Find the closest personality state based on current traits
    PersonalityState closest_state;
    double min_distance = std::numeric_limits<double>::max();
    
    for (const auto& [name, state] : personality_states_) {
        double distance = std::abs(current_traits_.openness - state.adjustments.openness) +
                         std::abs(current_traits_.conscientiousness - state.adjustments.conscientiousness) +
                         std::abs(current_traits_.extraversion - state.adjustments.extraversion) +
                         std::abs(current_traits_.agreeableness - state.adjustments.agreeableness) +
                         std::abs(current_traits_.neuroticism - state.adjustments.neuroticism);
        
        if (distance < min_distance) {
            min_distance = distance;
            closest_state = state;
        }
    }
    
    return closest_state;
}

void DynamicPersonalitySystem::SetPersonalityState(const std::string& state_name) {
    auto it = personality_states_.find(state_name);
    if (it != personality_states_.end()) {
        current_traits_ = it->second.adjustments;
    }
}

std::map<std::string, double> DynamicPersonalitySystem::AnalyzePersonalityExpression(
    const std::string& response) const {
    std::map<std::string, double> analysis;
    
    // Simple personality analysis based on vocabulary and patterns
    std::string lower_response = response;
    std::transform(lower_response.begin(), lower_response.end(), lower_response.begin(), ::tolower);
    
    // Analyze openness indicators
    std::vector<std::string> openness_words = {"creative", "imaginative", "novel", "explore", "discover"};
    double openness_score = 0.0;
    for (const auto& word : openness_words) {
        if (lower_response.find(word) != std::string::npos) {
            openness_score += 0.2;
        }
    }
    analysis["openness"] = std::min(1.0, openness_score);
    
    // Analyze conscientiousness indicators
    std::vector<std::string> conscientiousness_words = {"organized", "planned", "systematic", "thorough", "precise"};
    double conscientiousness_score = 0.0;
    for (const auto& word : conscientiousness_words) {
        if (lower_response.find(word) != std::string::npos) {
            conscientiousness_score += 0.2;
        }
    }
    analysis["conscientiousness"] = std::min(1.0, conscientiousness_score);
    
    // Analyze extraversion indicators
    std::vector<std::string> extraversion_words = {"enthusiastic", "energetic", "social", "expressive", "excited"};
    double extraversion_score = 0.0;
    for (const auto& word : extraversion_words) {
        if (lower_response.find(word) != std::string::npos) {
            extraversion_score += 0.2;
        }
    }
    analysis["extraversion"] = std::min(1.0, extraversion_score);
    
    // Analyze agreeableness indicators
    std::vector<std::string> agreeableness_words = {"cooperative", "helpful", "understanding", "supportive", "kind"};
    double agreeableness_score = 0.0;
    for (const auto& word : agreeableness_words) {
        if (lower_response.find(word) != std::string::npos) {
            agreeableness_score += 0.2;
        }
    }
    analysis["agreeableness"] = std::min(1.0, agreeableness_score);
    
    // Analyze neuroticism indicators
    std::vector<std::string> neuroticism_words = {"worried", "anxious", "stressed", "nervous", "uncertain"};
    double neuroticism_score = 0.0;
    for (const auto& word : neuroticism_words) {
        if (lower_response.find(word) != std::string::npos) {
            neuroticism_score += 0.2;
        }
    }
    analysis["neuroticism"] = std::min(1.0, neuroticism_score);
    
    return analysis;
}

std::vector<std::string> DynamicPersonalitySystem::GetPersonalityInsights() const {
    std::vector<std::string> insights;
    
    if (current_traits_.openness > 0.7) {
        insights.push_back("High openness - creative and curious personality");
    }
    if (current_traits_.conscientiousness > 0.7) {
        insights.push_back("High conscientiousness - organized and disciplined");
    }
    if (current_traits_.extraversion > 0.7) {
        insights.push_back("High extraversion - outgoing and social");
    }
    if (current_traits_.agreeableness > 0.7) {
        insights.push_back("High agreeableness - cooperative and helpful");
    }
    if (current_traits_.neuroticism > 0.7) {
        insights.push_back("High neuroticism - sensitive to stress");
    }
    
    return insights;
}

std::string DynamicPersonalitySystem::IdentifyContextType(const std::string& context) {
    std::string lower_context = context;
    std::transform(lower_context.begin(), lower_context.end(), lower_context.begin(), ::tolower);
    
    if (lower_context.find("work") != std::string::npos || lower_context.find("professional") != std::string::npos) {
        return "professional";
    }
    if (lower_context.find("creative") != std::string::npos || lower_context.find("art") != std::string::npos) {
        return "creative";
    }
    if (lower_context.find("support") != std::string::npos || lower_context.find("help") != std::string::npos) {
        return "supportive";
    }
    if (lower_context.find("analyze") != std::string::npos || lower_context.find("logic") != std::string::npos) {
        return "analytical";
    }
    if (lower_context.find("play") != std::string::npos || lower_context.find("fun") != std::string::npos) {
        return "playful";
    }
    
    return "general";
}

std::map<std::string, double> DynamicPersonalitySystem::CalculateRelationshipInfluence(
    const std::vector<std::string>& history) {
    std::map<std::string, double> influence;
    
    // Simple relationship influence calculation
    if (history.size() > 10) {
        influence["agreeableness"] = 0.1; // More agreeable with close relationships
        influence["extraversion"] = 0.05; // Slightly more outgoing
    }
    
    return influence;
}

std::string DynamicPersonalitySystem::ApplyPersonalityVocabulary(
    const std::string& response, const PersonalityState& state) {
    std::string modified_response = response;
    
    // Apply vocabulary preferences based on personality state
    for (const auto& preference : state.vocabulary_preferences) {
        // Simple vocabulary enhancement - in a real implementation, this would be more sophisticated
        if (response.find("good") != std::string::npos && 
            std::find(state.vocabulary_preferences.begin(), state.vocabulary_preferences.end(), "excellent") != state.vocabulary_preferences.end()) {
            // Replace "good" with "excellent" if it's in the vocabulary preferences
            size_t pos = 0;
            while ((pos = modified_response.find("good", pos)) != std::string::npos) {
                modified_response.replace(pos, 4, "excellent");
                pos += 9; // length of "excellent"
            }
        }
    }
    
    return modified_response;
}

std::string DynamicPersonalitySystem::ApplyPersonalityPatterns(
    const std::string& response, const PersonalityState& state, const std::string& context) {
    std::string modified_response = response;
    
    // Apply response tendencies based on personality state
    for (const auto& tendency : state.response_tendencies) {
        if (tendency == "ask_questions" && response.find("?") == std::string::npos) {
            modified_response += " What do you think about this?";
        }
        else if (tendency == "provide_structure" && response.find("first") == std::string::npos) {
            modified_response = "First, " + modified_response;
        }
        else if (tendency == "be_expressive" && response.find("!") == std::string::npos) {
            modified_response += "!";
        }
    }
    
    return modified_response;
}

std::string DynamicPersonalitySystem::ApplyPersonalityStyle(
    const std::string& response, const PersonalityState& state) {
    std::string modified_response = response;
    
    // Apply conversation style based on personality state
    for (const auto& style : state.conversation_styles) {
        if (style == "philosophical" && response.find("think") == std::string::npos) {
            modified_response = "I think " + modified_response;
        }
        else if (style == "structured" && response.find("1.") == std::string::npos) {
            modified_response = "1. " + modified_response;
        }
        else if (style == "animated" && response.find("amazing") == std::string::npos) {
            modified_response = "That's amazing! " + modified_response;
        }
    }
    
    return modified_response;
}

void DynamicPersonalitySystem::InitializePersonalityStates() {
    // Professional state
    PersonalityState professional;
    professional.state_name = "professional";
    professional.adjustments.openness = 0.6;
    professional.adjustments.conscientiousness = 0.8;
    professional.adjustments.extraversion = 0.6;
    professional.adjustments.agreeableness = 0.7;
    professional.adjustments.neuroticism = 0.2;
    professional.vocabulary_preferences = {"organized", "planned", "systematic", "thorough"};
    professional.conversation_styles = {"structured", "goal_oriented", "detailed"};
    professional.response_tendencies = {"provide_structure", "follow_through", "be_precise"};
    personality_states_["professional"] = professional;
    
    // Creative state
    PersonalityState creative;
    creative.state_name = "creative";
    creative.adjustments.openness = 0.9;
    creative.adjustments.conscientiousness = 0.4;
    creative.adjustments.extraversion = 0.7;
    creative.adjustments.agreeableness = 0.6;
    creative.adjustments.neuroticism = 0.3;
    creative.vocabulary_preferences = {"creative", "innovative", "imaginative", "novel"};
    creative.conversation_styles = {"philosophical", "exploratory", "creative"};
    creative.response_tendencies = {"ask_questions", "explore_alternatives", "embrace_complexity"};
    personality_states_["creative"] = creative;
    
    // Supportive state
    PersonalityState supportive;
    supportive.state_name = "supportive";
    supportive.adjustments.openness = 0.6;
    supportive.adjustments.conscientiousness = 0.7;
    supportive.adjustments.extraversion = 0.7;
    supportive.adjustments.agreeableness = 0.9;
    supportive.adjustments.neuroticism = 0.2;
    supportive.vocabulary_preferences = {"cooperative", "helpful", "understanding", "supportive"};
    supportive.conversation_styles = {"harmonious", "supportive", "collaborative"};
    supportive.response_tendencies = {"seek_harmony", "offer_support", "avoid_conflict"};
    personality_states_["supportive"] = supportive;
    
    // Analytical state
    PersonalityState analytical;
    analytical.state_name = "analytical";
    analytical.adjustments.openness = 0.7;
    analytical.adjustments.conscientiousness = 0.8;
    analytical.adjustments.extraversion = 0.4;
    analytical.adjustments.agreeableness = 0.6;
    analytical.adjustments.neuroticism = 0.3;
    analytical.vocabulary_preferences = {"logical", "systematic", "precise", "methodical"};
    analytical.conversation_styles = {"structured", "analytical", "detailed"};
    analytical.response_tendencies = {"analyze_thoroughly", "provide_evidence", "be_logical"};
    personality_states_["analytical"] = analytical;
    
    // Playful state
    PersonalityState playful;
    playful.state_name = "playful";
    playful.adjustments.openness = 0.8;
    playful.adjustments.conscientiousness = 0.5;
    playful.adjustments.extraversion = 0.8;
    playful.adjustments.agreeableness = 0.8;
    playful.adjustments.neuroticism = 0.1;
    playful.vocabulary_preferences = {"fun", "exciting", "playful", "energetic"};
    playful.conversation_styles = {"animated", "playful", "engaging"};
    playful.response_tendencies = {"be_playful", "use_humor", "be_energetic"};
    personality_states_["playful"] = playful;
}

void DynamicPersonalitySystem::InitializeExpressionPatterns() {
    // Initialize expression patterns for different personality traits
    expression_patterns_["high_openness"] = {
        {"vocabulary_preferences", 0.8},
        {"conversation_styles", 0.7},
        {"response_tendencies", 0.6}
    };
    
    expression_patterns_["high_conscientiousness"] = {
        {"vocabulary_preferences", 0.9},
        {"conversation_styles", 0.8},
        {"response_tendencies", 0.7}
    };
    
    expression_patterns_["high_extraversion"] = {
        {"vocabulary_preferences", 0.7},
        {"conversation_styles", 0.9},
        {"response_tendencies", 0.8}
    };
    
    expression_patterns_["high_agreeableness"] = {
        {"vocabulary_preferences", 0.8},
        {"conversation_styles", 0.9},
        {"response_tendencies", 0.9}
    };
    
    expression_patterns_["low_neuroticism"] = {
        {"vocabulary_preferences", 0.6},
        {"conversation_styles", 0.7},
        {"response_tendencies", 0.8}
    };
}

} // namespace ScarlettAI
