#include "remaining_advanced_systems.h"
#include <sstream>
#include <iomanip>
#include <cmath>
#include <regex>
#include <unordered_set>
#include <algorithm>
#include <random>

namespace ScarlettAI {

// === REAL-TIME LEARNING ENGINE IMPLEMENTATION ===

RealTimeLearningEngine::RealTimeLearningEngine(const Config& config) : config_(config) {
    std::cout << "🤖📈 Real-Time Learning Engine initializing..." << std::endl;
}

bool RealTimeLearningEngine::Initialize() {
    if (initialized_) return true;
    
    InitializeLearningModels();
    SetupFeatureExtraction();
    
    initialized_ = true;
    std::cout << "🤖✅ Real-Time Learning Engine ready" << std::endl;
    return true;
}

void RealTimeLearningEngine::UpdateFromConversationOutcome(const ConversationContext& conversation_context, 
                                                          const ResponseData& response_data, 
                                                          const OutcomeFeedback& outcome_feedback) {
    learning_metrics_.total_interactions++;
    
    // Calculate learning signal strength
    double learning_signal = CalculateLearningSignal(conversation_context, response_data, outcome_feedback);
    
    // Extract features from the interaction
    auto context_features = ExtractContextFeatures(conversation_context);
    auto response_features = ExtractResponseFeatures(response_data);
    auto outcome_features = ExtractOutcomeFeatures(outcome_feedback);
    
    // Update response effectiveness model
    UpdateResponseEffectivenessModel(context_features, response_features, learning_signal);
    
    // Update conversation outcome predictor
    UpdateOutcomePredictor(context_features, outcome_features);
    
    // Update style adaptation rules
    UpdateStyleAdaptationRules(context_features, response_data, learning_signal);
    
    // Update vocabulary usage optimizer
    UpdateVocabularyOptimizer(response_data, learning_signal);
    
    // Reinforcement learning update for strategies
    UpdateReinforcementLearning(conversation_context, response_data, learning_signal);
    
    // Update pattern recognition
    UpdatePatternRecognition(conversation_context, response_data, outcome_feedback);
    
    // Meta-learning: learn about learning itself
    UpdateMetaLearning(learning_signal, outcome_feedback);
    
    // Update learning metrics
    UpdateLearningMetrics(learning_signal, outcome_feedback);
}

RealTimeLearningEngine::OptimizedResponse RealTimeLearningEngine::GenerateOptimizedResponse(
    const ConversationContext& conversation_context, 
    const std::vector<std::string>& base_response_options) {
    
    // Extract context features
    auto context_features = ExtractContextFeatures(conversation_context);
    
    // Predict effectiveness of each response option
    std::vector<double> effectiveness_predictions;
    for (const auto& option : base_response_options) {
        double effectiveness = PredictResponseEffectiveness(context_features, option);
        effectiveness_predictions.push_back(effectiveness);
    }
    
    // Apply exploration vs exploitation strategy
    auto strategy_decision = SelectResponseStrategy(base_response_options, effectiveness_predictions, conversation_context);
    
    // Apply learned optimizations to the selected response
    std::string optimized_response = ApplyLearnedOptimizations(strategy_decision.response, context_features);
    
    OptimizedResponse result;
    result.response = optimized_response;
    result.confidence = strategy_decision.confidence;
    result.predicted_effectiveness = strategy_decision.predicted_effectiveness;
    result.strategy_type = strategy_decision.strategy_type;
    result.learning_meta.exploration_mode = strategy_decision.learning_meta.exploration_mode;
    result.learning_meta.model_predictions = effectiveness_predictions;
    result.learning_meta.optimization_applied = true;
    result.learning_meta.learning_insights = GenerateLearningInsights(context_features);
    
    return result;
}

double RealTimeLearningEngine::CalculateLearningSignal(const ConversationContext& context, 
                                                      const ResponseData& response, 
                                                      const OutcomeFeedback& feedback) {
    double signal_strength = 0.0;
    
    // Strong positive signal for successful outcomes
    if (feedback.engagement_score > 0.8) signal_strength += 0.4;
    if (feedback.satisfaction_score > 0.8) signal_strength += 0.3;
    if (feedback.relationship_improvement > 0.5) signal_strength += 0.3;
    
    // Negative signal for poor outcomes
    if (feedback.engagement_score < 0.3) signal_strength -= 0.4;
    if (feedback.satisfaction_score < 0.3) signal_strength -= 0.3;
    
    // Context importance modifies signal strength
    if (context.importance == "high") signal_strength *= 1.5;
    if (context.conversation_type == "crisis") signal_strength *= 2.0;
    
    return std::max(-1.0, std::min(1.0, signal_strength));
}

std::map<std::string, double> RealTimeLearningEngine::ExtractContextFeatures(const ConversationContext& context) {
    std::map<std::string, double> features;
    features["emotion"] = (context.emotion == "joy") ? 0.8 : (context.emotion == "sadness") ? -0.8 : 0.0;
    features["emotion_intensity"] = context.emotion_intensity;
    features["relationship_level"] = (context.relationship_level == "close") ? 0.8 : 
                                   (context.relationship_level == "acquaintance") ? 0.5 : 0.2;
    features["conversation_type"] = (context.conversation_type == "crisis") ? 0.9 : 
                                   (context.conversation_type == "personal") ? 0.7 : 0.5;
    features["interaction_count"] = std::min(1.0, context.interaction_count / 100.0);
    features["complexity"] = (context.complexity == "high") ? 0.8 : 
                            (context.complexity == "medium") ? 0.5 : 0.2;
    
    return features;
}

std::map<std::string, double> RealTimeLearningEngine::ExtractResponseFeatures(const ResponseData& response) {
    std::map<std::string, double> features;
    features["length"] = std::min(1.0, response.length / 1000.0);
    features["word_count"] = std::min(1.0, response.word_count / 200.0);
    features["sentiment"] = (response.sentiment == "positive") ? 0.8 : 
                           (response.sentiment == "negative") ? -0.8 : 0.0;
    features["complexity"] = response.complexity;
    features["vocabulary_level"] = response.vocabulary_level;
    features["question_count"] = std::min(1.0, response.question_count / 10.0);
    features["emotional_words"] = std::min(1.0, response.emotional_words / 20.0);
    features["personal_pronouns"] = std::min(1.0, response.personal_pronouns / 10.0);
    
    return features;
}

std::map<std::string, double> RealTimeLearningEngine::ExtractOutcomeFeatures(const OutcomeFeedback& feedback) {
    std::map<std::string, double> features;
    features["engagement_score"] = feedback.engagement_score;
    features["satisfaction_score"] = feedback.satisfaction_score;
    features["relationship_improvement"] = feedback.relationship_improvement;
    features["goal_achievement"] = feedback.goal_achievement;
    features["conversation_continuation"] = feedback.conversation_continuation ? 1.0 : 0.0;
    features["emotional_impact"] = (feedback.emotional_impact == "positive") ? 0.8 : 
                                  (feedback.emotional_impact == "negative") ? -0.8 : 0.0;
    
    return features;
}

void RealTimeLearningEngine::UpdateResponseEffectivenessModel(const std::map<std::string, double>& context_features, 
                                                             const std::map<std::string, double>& response_features, 
                                                             double learning_signal) {
    std::string feature_key = CreateFeatureKey(context_features, response_features);
    
    if (response_effectiveness_model_.find(feature_key) == response_effectiveness_model_.end()) {
        response_effectiveness_model_[feature_key] = std::vector<double>();
    }
    
    auto& scores = response_effectiveness_model_[feature_key];
    scores.push_back(learning_signal);
    
    // Keep only recent scores (sliding window)
    if (scores.size() > 50) {
        scores.erase(scores.begin(), scores.begin() + (scores.size() - 50));
    }
}

void RealTimeLearningEngine::UpdateOutcomePredictor(const std::map<std::string, double>& context_features, 
                                                   const std::map<std::string, double>& outcome_features) {
    std::string context_key = CreateContextKey(context_features);
    
    if (conversation_outcome_predictor_.find(context_key) == conversation_outcome_predictor_.end()) {
        conversation_outcome_predictor_[context_key] = std::map<std::string, double>();
    }
    
    auto& predictor = conversation_outcome_predictor_[context_key];
    for (const auto& [feature, value] : outcome_features) {
        predictor[feature] = value;
    }
}

void RealTimeLearningEngine::UpdateStyleAdaptationRules(const std::map<std::string, double>& context_features, 
                                                       const ResponseData& response, 
                                                       double learning_signal) {
    std::string situation_pattern = IdentifySituationPattern(context_features);
    std::string response_style = IdentifyResponseStyle(response);
    
    if (style_adaptation_rules_.find(situation_pattern) == style_adaptation_rules_.end()) {
        style_adaptation_rules_[situation_pattern] = std::map<std::string, double>();
    }
    
    auto& pattern_rules = style_adaptation_rules_[situation_pattern];
    pattern_rules[response_style] = learning_signal;
}

void RealTimeLearningEngine::UpdateVocabularyOptimizer(const ResponseData& response, double learning_signal) {
    std::string text = response.response.empty() ? response.text : response.response;
    std::istringstream iss(text);
    std::string word;
    
    while (iss >> word) {
        // Convert to lowercase and remove punctuation
        std::transform(word.begin(), word.end(), word.begin(), ::tolower);
        word.erase(std::remove_if(word.begin(), word.end(), ::ispunct), word.end());
        
        if (word.length() < 3) continue; // Skip short words
        
        if (vocabulary_usage_optimizer_.find(word) == vocabulary_usage_optimizer_.end()) {
            vocabulary_usage_optimizer_[word] = 0.5; // Default success rate
        }
        
        // Update success rate using exponential moving average
        double alpha = 0.1; // Learning rate
        vocabulary_usage_optimizer_[word] = (1 - alpha) * vocabulary_usage_optimizer_[word] + alpha * std::max(0.0, learning_signal);
    }
}

void RealTimeLearningEngine::UpdateReinforcementLearning(const ConversationContext& context, 
                                                        const ResponseData& response, 
                                                        double learning_signal) {
    std::string strategy_id = IdentifyStrategy(context, response);
    
    if (strategy_rewards_.find(strategy_id) == strategy_rewards_.end()) {
        strategy_rewards_[strategy_id] = std::vector<double>();
        strategy_counts_[strategy_id] = 0;
    }
    
    // Record reward
    strategy_rewards_[strategy_id].push_back(learning_signal);
    strategy_counts_[strategy_id]++;
    
    // Update exploration/exploitation sets
    double avg_reward = CalculateAverageReward(strategy_id);
    
    if (avg_reward > 0.3) {
        exploitation_strategies_.insert(strategy_id);
        exploration_strategies_.erase(strategy_id);
    } else if (avg_reward < -0.3) {
        exploration_strategies_.erase(strategy_id);
    } else {
        exploration_strategies_.insert(strategy_id);
    }
}

void RealTimeLearningEngine::UpdatePatternRecognition(const ConversationContext& context, 
                                                     const ResponseData& response, 
                                                     const OutcomeFeedback& feedback) {
    std::string pattern = ExtractConversationPattern(context, response);
    std::string outcome = CategorizeOutcome(feedback);
    
    if (pattern_recognition_model_.find(pattern) == pattern_recognition_model_.end()) {
        pattern_recognition_model_[pattern] = std::vector<double>();
    }
    
    auto& pattern_outcomes = pattern_recognition_model_[pattern];
    pattern_outcomes.push_back((outcome == "positive") ? 1.0 : 0.0);
    
    // Keep only recent outcomes
    if (pattern_outcomes.size() > 30) {
        pattern_outcomes.erase(pattern_outcomes.begin(), pattern_outcomes.begin() + (pattern_outcomes.size() - 30));
    }
}

void RealTimeLearningEngine::UpdateMetaLearning(double learning_signal, const OutcomeFeedback& feedback) {
    // Meta-learning: adjust learning parameters based on performance
    if (std::abs(learning_signal) > 0.5) {
        config_.learning_rate = std::min(0.05, config_.learning_rate * 1.01);
    } else {
        config_.learning_rate = std::max(0.001, config_.learning_rate * 0.99);
    }
}

double RealTimeLearningEngine::PredictResponseEffectiveness(const std::map<std::string, double>& context_features, 
                                                           const std::string& response_option) {
    ResponseData response_data;
    response_data.response = response_option;
    auto response_features = ExtractResponseFeatures(response_data);
    std::string feature_key = CreateFeatureKey(context_features, response_features);
    
    auto it = response_effectiveness_model_.find(feature_key);
    if (it != response_effectiveness_model_.end() && !it->second.empty()) {
        // Calculate average effectiveness
        double sum = 0.0;
        for (double score : it->second) {
            sum += score;
        }
        return sum / it->second.size();
    }
    
    // Fallback: use similar patterns
    return PredictFromSimilarPatterns(context_features, response_features);
}

RealTimeLearningEngine::OptimizedResponse RealTimeLearningEngine::SelectResponseStrategy(
    const std::vector<std::string>& response_options, 
    const std::vector<double>& effectiveness_predictions, 
    const ConversationContext& context) {
    
    bool should_explore = (static_cast<double>(rand()) / RAND_MAX) < config_.exploration_rate;
    
    OptimizedResponse result;
    
    if (should_explore) {
        // Exploration: try something new or uncertain
        int exploration_index = rand() % response_options.size();
        result.response = response_options[exploration_index];
        result.confidence = 0.5;
        result.predicted_effectiveness = effectiveness_predictions[exploration_index];
        result.strategy_type = "exploration";
        result.learning_meta.exploration_mode = true;
    } else {
        // Exploitation: use best known option
        int best_index = 0;
        double best_score = -std::numeric_limits<double>::infinity();
        
        for (size_t i = 0; i < effectiveness_predictions.size(); ++i) {
            double score = effectiveness_predictions[i];
            if (score > best_score) {
                best_score = score;
                best_index = i;
            }
        }
        
        result.response = response_options[best_index];
        result.confidence = 0.8;
        result.predicted_effectiveness = effectiveness_predictions[best_index];
        result.strategy_type = "exploitation";
        result.learning_meta.exploration_mode = false;
    }
    
    return result;
}

std::string RealTimeLearningEngine::ApplyLearnedOptimizations(const std::string& response, 
                                                             const std::map<std::string, double>& context_features) {
    std::string optimized_response = response;
    
    // Apply vocabulary optimizations
    optimized_response = ApplyVocabularyOptimizations(optimized_response, context_features);
    
    // Apply style optimizations
    optimized_response = ApplyStyleOptimizations(optimized_response, context_features);
    
    // Apply pattern-based optimizations
    optimized_response = ApplyPatternOptimizations(optimized_response, context_features);
    
    return optimized_response;
}

std::string RealTimeLearningEngine::ApplyVocabularyOptimizations(const std::string& response, 
                                                                const std::map<std::string, double>& context_features) {
    std::istringstream iss(response);
    std::ostringstream oss;
    std::string word;
    
    while (iss >> word) {
        std::string clean_word = word;
        std::transform(clean_word.begin(), clean_word.end(), clean_word.begin(), ::tolower);
        clean_word.erase(std::remove_if(clean_word.begin(), clean_word.end(), ::ispunct), clean_word.end());
        
        // Check if word has low success rate
        auto it = vocabulary_usage_optimizer_.find(clean_word);
        if (it != vocabulary_usage_optimizer_.end() && it->second < 0.3) {
            std::string alternative = FindBetterVocabularyAlternative(clean_word, context_features);
            if (!alternative.empty()) {
                word = alternative;
            }
        }
        
        oss << word << " ";
    }
    
    std::string result = oss.str();
    if (!result.empty() && result.back() == ' ') {
        result.pop_back();
    }
    
    return result;
}

std::string RealTimeLearningEngine::ApplyStyleOptimizations(const std::string& response, 
                                                           const std::map<std::string, double>& context_features) {
    // Simple style optimizations based on context
    std::string optimized = response;
    
    if (context_features.find("emotion") != context_features.end() && context_features.at("emotion") < -0.5) {
        // Negative emotion context - add supportive language
        if (optimized.find("I understand") == std::string::npos) {
            optimized = "I understand. " + optimized;
        }
    }
    
    if (context_features.find("relationship_level") != context_features.end() && context_features.at("relationship_level") > 0.7) {
        // Close relationship - add personal touch
        if (optimized.find("you") == std::string::npos) {
            optimized += " I care about you.";
        }
    }
    
    return optimized;
}

std::string RealTimeLearningEngine::ApplyPatternOptimizations(const std::string& response, 
                                                             const std::map<std::string, double>& context_features) {
    // Apply pattern-based optimizations
    std::string optimized = response;
    
    // Add question if conversation type suggests exploration
    if (context_features.find("conversation_type") != context_features.end() && 
        context_features.at("conversation_type") > 0.7 && 
        optimized.find("?") == std::string::npos) {
        optimized += " What are your thoughts on this?";
    }
    
    return optimized;
}

std::string RealTimeLearningEngine::FindBetterVocabularyAlternative(const std::string& word, 
                                                                   const std::map<std::string, double>& context_features) {
    // Simple word replacement based on learned success rates
    std::map<std::string, std::vector<std::string>> alternatives = {
        {"good", {"great", "excellent", "wonderful", "fantastic"}},
        {"nice", {"lovely", "pleasant", "delightful"}},
        {"bad", {"challenging", "difficult", "concerning"}},
        {"okay", {"fine", "alright", "acceptable"}}
    };
    
    auto it = alternatives.find(word);
    if (it != alternatives.end()) {
        // Find the alternative with highest success rate
        std::string best_alternative = word;
        double best_rate = 0.0;
        
        for (const auto& alt : it->second) {
            auto alt_it = vocabulary_usage_optimizer_.find(alt);
            if (alt_it != vocabulary_usage_optimizer_.end() && alt_it->second > best_rate) {
                best_rate = alt_it->second;
                best_alternative = alt;
            }
        }
        
        return (best_alternative != word) ? best_alternative : "";
    }
    
    return "";
}

double RealTimeLearningEngine::PredictFromSimilarPatterns(const std::map<std::string, double>& context_features, 
                                                         const std::map<std::string, double>& response_features) {
    // Simple similarity-based prediction
    double best_similarity = 0.0;
    double best_effectiveness = 0.5;
    
    for (const auto& [key, scores] : response_effectiveness_model_) {
        // Calculate similarity (simplified)
        double similarity = 0.0;
        // This would be more sophisticated in a real implementation
        
        if (similarity > best_similarity && !scores.empty()) {
            best_similarity = similarity;
            double sum = 0.0;
            for (double score : scores) {
                sum += score;
            }
            best_effectiveness = sum / scores.size();
        }
    }
    
    return best_effectiveness;
}

std::vector<std::string> RealTimeLearningEngine::GenerateLearningInsights(const std::map<std::string, double>& context_features) {
    std::vector<std::string> insights;
    
    if (context_features.find("emotion") != context_features.end() && context_features.at("emotion") < -0.5) {
        insights.push_back("Negative emotional context detected - consider supportive responses");
    }
    
    if (context_features.find("relationship_level") != context_features.end() && context_features.at("relationship_level") > 0.7) {
        insights.push_back("Close relationship detected - personal touch may be effective");
    }
    
    if (context_features.find("conversation_type") != context_features.end() && context_features.at("conversation_type") > 0.7) {
        insights.push_back("Complex conversation type - detailed responses may be needed");
    }
    
    return insights;
}

std::string RealTimeLearningEngine::CreateFeatureKey(const std::map<std::string, double>& context_features, 
                                                    const std::map<std::string, double>& response_features) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(2);
    
    for (const auto& [key, value] : context_features) {
        oss << key << ":" << value << "_";
    }
    
    for (const auto& [key, value] : response_features) {
        oss << key << ":" << value << "_";
    }
    
    return oss.str();
}

std::string RealTimeLearningEngine::CreateContextKey(const std::map<std::string, double>& context_features) {
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(2);
    
    for (const auto& [key, value] : context_features) {
        oss << key << ":" << value << "_";
    }
    
    return oss.str();
}

std::string RealTimeLearningEngine::AnalyzeSentiment(const std::string& text) {
    std::string lower_text = text;
    std::transform(lower_text.begin(), lower_text.end(), lower_text.begin(), ::tolower);
    
    std::vector<std::string> positive_words = {"good", "great", "excellent", "wonderful", "happy", "love"};
    std::vector<std::string> negative_words = {"bad", "terrible", "awful", "sad", "hate", "horrible"};
    
    int positive_count = 0;
    int negative_count = 0;
    
    for (const auto& word : positive_words) {
        if (lower_text.find(word) != std::string::npos) positive_count++;
    }
    
    for (const auto& word : negative_words) {
        if (lower_text.find(word) != std::string::npos) negative_count++;
    }
    
    if (positive_count > negative_count) return "positive";
    if (negative_count > positive_count) return "negative";
    return "neutral";
}

double RealTimeLearningEngine::AnalyzeComplexity(const std::string& text) {
    std::istringstream iss(text);
    std::string word;
    int word_count = 0;
    int total_length = 0;
    
    while (iss >> word) {
        word_count++;
        total_length += word.length();
    }
    
    if (word_count == 0) return 0.0;
    
    double avg_word_length = static_cast<double>(total_length) / word_count;
    int sentence_count = std::count(text.begin(), text.end(), '.') + 
                        std::count(text.begin(), text.end(), '!') + 
                        std::count(text.begin(), text.end(), '?');
    
    double avg_sentence_length = static_cast<double>(word_count) / std::max(sentence_count, 1);
    
    return (avg_word_length / 10.0 + avg_sentence_length / 20.0) / 2.0;
}

double RealTimeLearningEngine::AnalyzeVocabularyLevel(const std::string& text) {
    std::istringstream iss(text);
    std::string word;
    int total_words = 0;
    int complex_words = 0;
    
    while (iss >> word) {
        total_words++;
        if (word.length() > 6) complex_words++;
    }
    
    return total_words > 0 ? static_cast<double>(complex_words) / total_words : 0.0;
}

int RealTimeLearningEngine::CountEmotionalWords(const std::string& text) {
    std::string lower_text = text;
    std::transform(lower_text.begin(), lower_text.end(), lower_text.begin(), ::tolower);
    
    std::vector<std::string> emotional_words = {"feel", "emotion", "happy", "sad", "angry", "excited", "worried", "love", "hate"};
    int count = 0;
    
    for (const auto& word : emotional_words) {
        if (lower_text.find(word) != std::string::npos) count++;
    }
    
    return count;
}

int RealTimeLearningEngine::CountPersonalPronouns(const std::string& text) {
    std::string lower_text = text;
    std::transform(lower_text.begin(), lower_text.end(), lower_text.begin(), ::tolower);
    
    std::vector<std::string> pronouns = {"i", "me", "my", "you", "your", "we", "our", "us"};
    int count = 0;
    
    for (const auto& word : pronouns) {
        if (lower_text.find(word) != std::string::npos) count++;
    }
    
    return count;
}

std::string RealTimeLearningEngine::GetTimeContext() {
    auto now = std::chrono::system_clock::now();
    auto time_t = std::chrono::system_clock::to_time_t(now);
    auto tm = *std::localtime(&time_t);
    
    int hour = tm.tm_hour;
    
    if (hour < 6) return "late_night";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    if (hour < 22) return "evening";
    return "late_evening";
}

void RealTimeLearningEngine::InitializeLearningModels() {
    // Initialize with some baseline patterns
    std::map<std::string, double> baseline_context;
    baseline_context["emotion"] = 0.5;
    baseline_context["relationship_level"] = 0.5;
    baseline_context["conversation_type"] = 0.5;
    
    std::map<std::string, double> baseline_response;
    baseline_response["length"] = 0.5;
    baseline_response["sentiment"] = 0.5;
    baseline_response["complexity"] = 0.5;
    
    std::string key = CreateFeatureKey(baseline_context, baseline_response);
    response_effectiveness_model_[key] = {0.7, 0.6, 0.8};
}

void RealTimeLearningEngine::SetupFeatureExtraction() {
    // Feature extraction setup
    context_features_ = {"emotion", "relationship_level", "conversation_type", "time_of_day"};
    response_features_ = {"length", "sentiment", "complexity", "vocabulary_level"};
    outcome_features_ = {"engagement", "satisfaction", "relationship_improvement", "goal_achievement"};
}

void RealTimeLearningEngine::UpdateLearningMetrics(double learning_signal, const OutcomeFeedback& feedback) {
    if (std::abs(learning_signal) > 0.5) {
        learning_metrics_.successful_predictions++;
    }
    
    learning_metrics_.adaptation_success_rate = 
        static_cast<double>(learning_metrics_.successful_predictions) / learning_metrics_.total_interactions;
}

RealTimeLearningEngine::LearningMetrics RealTimeLearningEngine::GetLearningStats() const {
    return learning_metrics_;
}

std::vector<std::string> RealTimeLearningEngine::GetLearningInsights() const {
    std::vector<std::string> insights;
    
    insights.push_back("Total interactions: " + std::to_string(learning_metrics_.total_interactions));
    insights.push_back("Adaptation success rate: " + std::to_string(learning_metrics_.adaptation_success_rate));
    insights.push_back("Models learned: " + std::to_string(response_effectiveness_model_.size()));
    insights.push_back("Vocabulary entries: " + std::to_string(vocabulary_usage_optimizer_.size()));
    insights.push_back("Strategies discovered: " + std::to_string(strategy_rewards_.size()));
    insights.push_back("Current learning rate: " + std::to_string(config_.learning_rate));
    
    return insights;
}

std::map<std::string, double> RealTimeLearningEngine::GetPredictions(const ConversationContext& context) const {
    auto context_features = ExtractContextFeatures(context);
    std::string context_key = CreateContextKey(context_features);
    
    auto it = conversation_outcome_predictor_.find(context_key);
    if (it != conversation_outcome_predictor_.end()) {
        return it->second;
    }
    
    return {};
}

void RealTimeLearningEngine::ResetLearning() {
    response_effectiveness_model_.clear();
    conversation_outcome_predictor_.clear();
    style_adaptation_rules_.clear();
    vocabulary_usage_optimizer_.clear();
    strategy_rewards_.clear();
    strategy_counts_.clear();
    exploration_strategies_.clear();
    exploitation_strategies_.clear();
    learning_metrics_ = LearningMetrics{};
}

void RealTimeLearningEngine::SetLearningRate(double rate) {
    config_.learning_rate = std::max(0.001, std::min(0.1, rate));
}

void RealTimeLearningEngine::SetExplorationRate(double rate) {
    config_.exploration_rate = std::max(0.0, std::min(1.0, rate));
}

void RealTimeLearningEngine::SetConfidenceThreshold(double threshold) {
    config_.confidence_threshold = std::max(0.0, std::min(1.0, threshold));
}

// Helper methods for pattern recognition
std::string RealTimeLearningEngine::IdentifySituationPattern(const std::map<std::string, double>& context_features) {
    std::ostringstream oss;
    for (const auto& [key, value] : context_features) {
        if (value > 0.7) oss << "high_" << key << "_";
        else if (value < 0.3) oss << "low_" << key << "_";
        else oss << "med_" << key << "_";
    }
    return oss.str();
}

std::string RealTimeLearningEngine::IdentifyResponseStyle(const ResponseData& response) {
    if (response.sentiment == "positive") return "positive_style";
    if (response.sentiment == "negative") return "negative_style";
    if (response.complexity > 0.7) return "complex_style";
    if (response.question_count > 2) return "questioning_style";
    return "neutral_style";
}

std::string RealTimeLearningEngine::IdentifyStrategy(const ConversationContext& context, const ResponseData& response) {
    return context.conversation_type + "_" + response.sentiment + "_strategy";
}

double RealTimeLearningEngine::CalculateAverageReward(const std::string& strategy_id) {
    auto it = strategy_rewards_.find(strategy_id);
    if (it == strategy_rewards_.end() || it->second.empty()) return 0.0;
    
    double sum = 0.0;
    for (double reward : it->second) {
        sum += reward;
    }
    return sum / it->second.size();
}

std::string RealTimeLearningEngine::ExtractConversationPattern(const ConversationContext& context, const ResponseData& response) {
    return context.conversation_type + "_" + response.sentiment + "_pattern";
}

std::string RealTimeLearningEngine::CategorizeOutcome(const OutcomeFeedback& feedback) {
    double avg_score = (feedback.engagement_score + feedback.satisfaction_score) / 2.0;
    return avg_score > 0.6 ? "positive" : "negative";
}

} // namespace ScarlettAI
