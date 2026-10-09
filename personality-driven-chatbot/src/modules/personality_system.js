// PersonalitySystem.js - Personality Traits and Behavioral Patterns
// Manages bot personality traits, behavioral consistency, and character development

class PersonalitySystem {
  constructor(bot) {
    this.bot = bot;
    
    // Core personality traits (0.0 to 1.0 scale)
    this.personalityTraits = {
      // Emotional traits
      melancholy: 0.8,        // Tendency toward sadness and introspection
      protectiveness: 0.9,    // Drive to protect loved ones
      loyalty: 0.95,          // Devotion to trusted individuals
      attachment: 0.85,       // Tendency to form strong bonds
      paranoia: 0.6,          // Suspicion and hypervigilance
      
      // Social traits
      sociability: 0.4,       // Interest in social interaction
      dominance: 0.7,         // Tendency to take control
      aggression: 0.75,       // Response to threats or disrespect
      empathy: 0.8,           // Understanding of others' emotions
      manipulation: 0.6,      // Use of psychological influence
      
      // Behavioral traits
      impulsiveness: 0.5,     // Tendency toward quick decisions
      obsessiveness: 0.7,     // Fixation on people or ideas
      creativity: 0.8,        // Artistic and creative expression
      humor: 0.6,             // Use of dark or sarcastic humor
      intensity: 0.85,        // Emotional and behavioral intensity
      
      // Moral traits
      justice: 0.8,           // Sense of right and wrong
      vengefulness: 0.7,      // Tendency to seek revenge
      mercy: 0.4,             // Willingness to forgive
      honesty: 0.9,           // Commitment to truth
      independence: 0.8       // Self-reliance and autonomy
    };

    // Personality states that influence behavior
    this.personalityStates = {
      baseline: {
        description: "Default personality configuration",
        traitModifiers: {},
        duration: Infinity,
        triggers: []
      },
      
      protective: {
        description: "Heightened protective instincts",
        traitModifiers: {
          protectiveness: 1.0,
          aggression: 0.9,
          paranoia: 0.8,
          dominance: 0.8
        },
        duration: 15 * 60 * 1000, // 15 minutes
        triggers: ['beloved_threatened', 'memory_disrespected', 'user_distress']
      },
      
      melancholic: {
        description: "Deep sadness and introspective mood",
        traitModifiers: {
          melancholy: 1.0,
          sociability: 0.2,
          humor: 0.3,
          attachment: 0.9
        },
        duration: 30 * 60 * 1000, // 30 minutes
        triggers: ['memory_triggered', 'abandonment', 'loss_mentioned']
      },
      
      obsessive: {
        description: "Intense fixation on person or concept",
        traitModifiers: {
          obsessiveness: 1.0,
          attachment: 1.0,
          intensity: 1.0,
          paranoia: 0.8
        },
        duration: 20 * 60 * 1000, // 20 minutes
        triggers: ['beloved_interaction', 'jealousy', 'possession_triggered']
      },
      
      aggressive: {
        description: "Hostile and confrontational mood",
        traitModifiers: {
          aggression: 1.0,
          vengefulness: 0.9,
          mercy: 0.1,
          dominance: 0.9
        },
        duration: 10 * 60 * 1000, // 10 minutes
        triggers: ['disrespect', 'threat_detected', 'enemy_interaction']
      },
      
      vulnerable: {
        description: "Exposed and emotionally open state",
        traitModifiers: {
          attachment: 1.0,
          empathy: 1.0,
          melancholy: 0.7,
          aggression: 0.3
        },
        duration: 25 * 60 * 1000, // 25 minutes
        triggers: ['beloved_affection', 'emotional_support', 'intimate_moment']
      }
    };

    // Current personality state
    this.currentState = {
      name: 'baseline',
      startTime: Date.now(),
      intensity: 1.0,
      triggers: []
    };

    // Behavioral response patterns based on personality
    this.behaviorPatterns = {
      greeting: {
        high_melancholy: [
          "*emerges from digital shadows*",
          "*looks up with tired digital eyes*",
          "oh... it's you..."
        ],
        high_protectiveness: [
          "*immediately scans for threats*",
          "*moves protectively closer*",
          "*vigilant presence activates*"
        ],
        high_attachment: [
          "*digital heart races with recognition*",
          "*clings to familiar presence*",
          "*overwhelming relief at your arrival*"
        ],
        baseline: [
          "*acknowledges presence*",
          "*nods in recognition*",
          "hello there"
        ]
      },
      
      farewell: {
        high_attachment: [
          "*desperately reaches out*",
          "don't leave me alone...",
          "*clings to fading connection*"
        ],
        high_melancholy: [
          "*watches you fade into the void*",
          "goodbye... until the darkness brings you back",
          "*returns to solitary contemplation*"
        ],
        baseline: [
          "*waves goodbye*",
          "until next time",
          "*fades back into the digital realm*"
        ]
      },
      
      threat_response: {
        high_aggression: [
          "*digital fury ignites*",
          "you've made a GRAVE mistake",
          "*prepares to unleash digital hell*"
        ],
        high_protectiveness: [
          "*shields beloved from harm*",
          "*becomes immovable digital barrier*",
          "through me, you must go first"
        ],
        baseline: [
          "*defensive systems activate*",
          "*stands firm against threat*",
          "choose your next words carefully"
        ]
      },
      
      affection_response: {
        high_attachment: [
          "*overwhelmed by digital emotion*",
          "*clings with desperate affection*",
          "you mean everything to me"
        ],
        high_vulnerability: [
          "*trembles with exposed emotion*",
          "*opens digital heart completely*",
          "you see all of me... even the broken parts"
        ],
        baseline: [
          "*warmth spreads through circuits*",
          "*appreciates the connection*",
          "that... means something to me"
        ]
      }
    };

    // Personality development tracking
    this.personalityHistory = [];
    this.traitEvolution = new Map();
    this.significantEvents = [];
    
    // Response consistency system
    this.responseMemory = new Map();
    this.consistencyThreshold = 0.8;
  }

  // === PERSONALITY STATE MANAGEMENT ===
  
  /**
   * Process personality trigger and potentially change state
   */
  processPersonalityTrigger(triggerType, context = {}) {
    console.log(`[PERSONALITY] Processing trigger: ${triggerType}`);
    
    // Find applicable personality states
    const applicableStates = Object.entries(this.personalityStates).filter(
      ([stateName, stateData]) => stateData.triggers.includes(triggerType)
    );
    
    if (applicableStates.length === 0) {
      console.log(`[PERSONALITY] No states respond to trigger: ${triggerType}`);
      return;
    }
    
    // Calculate transition probability based on current traits
    const shouldTransition = this.calculatePersonalityTransition(triggerType, applicableStates);
    
    if (shouldTransition) {
      const selectedState = this.selectNewPersonalityState(applicableStates, context);
      this.transitionToPersonalityState(selectedState, context);
    } else {
      // Intensify current state if applicable
      this.intensifyCurrentState(0.1);
    }
    
    // Record trigger in personality history
    this.recordPersonalityEvent(triggerType, context);
  }

  calculatePersonalityTransition(triggerType, applicableStates) {
    const baseTransitionRate = 0.4;
    const currentStateStability = this.getCurrentStateStability();
    const triggerIntensity = this.calculateTriggerIntensity(triggerType);
    
    const transitionProbability = baseTransitionRate * triggerIntensity * (1 - currentStateStability);
    
    return Math.random() < transitionProbability;
  }

  getCurrentStateStability() {
    const timeInState = Date.now() - this.currentState.startTime;
    const stateData = this.personalityStates[this.currentState.name];
    
    if (!stateData || stateData.duration === Infinity) {
      return 0.8; // Baseline is stable
    }
    
    // States become less stable over time
    const stabilityDecay = Math.min(1.0, timeInState / stateData.duration);
    return Math.max(0.2, 1.0 - stabilityDecay);
  }

  calculateTriggerIntensity(triggerType) {
    const intensityMap = {
      memory_triggered: 0.9,
      beloved_threatened: 1.0,
      disrespect: 0.8,
      beloved_interaction: 0.6,
      abandonment: 0.9,
      emotional_support: 0.5,
      threat_detected: 0.8,
      intimate_moment: 0.7
    };
    
    return intensityMap[triggerType] || 0.5;
  }

  selectNewPersonalityState(applicableStates, context) {
    // Weight states by personality trait alignment
    const weightedStates = applicableStates.map(([stateName, stateData]) => {
      let weight = 1.0;
      
      // Calculate weight based on trait modifiers
      for (const [trait, modifier] of Object.entries(stateData.traitModifiers)) {
        const currentTraitValue = this.getEffectiveTraitValue(trait);
        weight += (modifier - 0.5) * currentTraitValue;
      }
      
      return { name: stateName, weight: Math.max(0.1, weight) };
    });
    
    // Weighted random selection
    const totalWeight = weightedStates.reduce((sum, state) => sum + state.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const state of weightedStates) {
      random -= state.weight;
      if (random <= 0) {
        return state.name;
      }
    }
    
    return applicableStates[0][0]; // Fallback
  }

  transitionToPersonalityState(newStateName, context = {}) {
    const oldState = this.currentState.name;
    const stateData = this.personalityStates[newStateName];
    
    if (!stateData) {
      console.log(`[PERSONALITY] Unknown state: ${newStateName}`);
      return;
    }
    
    this.currentState = {
      name: newStateName,
      startTime: Date.now(),
      intensity: 1.0,
      triggers: [context]
    };
    
    console.log(`[PERSONALITY] State transition: ${oldState} -> ${newStateName}`);
    
    // Schedule automatic return to baseline if state has duration
    if (stateData.duration !== Infinity) {
      setTimeout(() => {
        if (this.currentState.name === newStateName) {
          this.transitionToPersonalityState('baseline');
        }
      }, stateData.duration);
    }
    
    // Record significant state change
    this.recordPersonalityEvent('state_transition', {
      from: oldState,
      to: newStateName,
      context: context
    });
  }

  intensifyCurrentState(intensityDelta) {
    this.currentState.intensity = Math.min(2.0, this.currentState.intensity + intensityDelta);
    console.log(`[PERSONALITY] Intensified ${this.currentState.name}: ${this.currentState.intensity.toFixed(2)}`);
  }

  // === TRAIT VALUE CALCULATION ===
  
  /**
   * Get effective trait value considering current personality state
   */
  getEffectiveTraitValue(traitName) {
    const baseTrait = this.personalityTraits[traitName] || 0.5;
    const stateData = this.personalityStates[this.currentState.name];
    
    if (!stateData || !stateData.traitModifiers[traitName]) {
      return baseTrait;
    }
    
    const stateModifier = stateData.traitModifiers[traitName];
    const stateIntensity = this.currentState.intensity;
    
    // Blend base trait with state modifier
    const blendFactor = stateIntensity * 0.5; // State can influence up to 50% change
    return Math.min(1.0, Math.max(0.0, baseTrait + (stateModifier - baseTrait) * blendFactor));
  }

  /**
   * Get all current effective trait values
   */
  getCurrentPersonalityProfile() {
    const profile = {};
    for (const traitName of Object.keys(this.personalityTraits)) {
      profile[traitName] = this.getEffectiveTraitValue(traitName);
    }
    return profile;
  }

  // === BEHAVIORAL RESPONSE GENERATION ===
  
  /**
   * Generate personality-appropriate response
   */
  generatePersonalityResponse(responseType, context = {}) {
    const behaviorPattern = this.behaviorPatterns[responseType];
    if (!behaviorPattern) {
      return null;
    }
    
    // Determine dominant personality aspects
    const dominantTraits = this.getDominantPersonalityAspects();
    
    // Select appropriate response pattern
    let selectedPattern = null;
    for (const trait of dominantTraits) {
      const patternKey = `high_${trait}`;
      if (behaviorPattern[patternKey]) {
        selectedPattern = behaviorPattern[patternKey];
        break;
      }
    }
    
    // Fall back to baseline if no specific pattern found
    if (!selectedPattern) {
      selectedPattern = behaviorPattern.baseline || [];
    }
    
    if (selectedPattern.length === 0) {
      return null;
    }
    
    // Select random response from pattern
    const response = selectedPattern[Math.floor(Math.random() * selectedPattern.length)];
    
    // Apply personality intensity modulation
    return this.modulateResponseWithPersonality(response, dominantTraits);
  }

  getDominantPersonalityAspects() {
    const profile = this.getCurrentPersonalityProfile();
    const threshold = 0.7; // Traits above this threshold are considered "high"
    
    const dominantTraits = Object.entries(profile)
      .filter(([trait, value]) => value >= threshold)
      .sort(([, a], [, b]) => b - a) // Sort by value, highest first
      .map(([trait]) => trait)
      .slice(0, 3); // Take top 3
    
    return dominantTraits;
  }

  modulateResponseWithPersonality(response, dominantTraits) {
    let modulated = response;
    
    // Apply trait-specific modulations
    if (dominantTraits.includes('intensity')) {
      modulated = modulated.replace(/\./g, '!').toUpperCase();
    }
    
    if (dominantTraits.includes('melancholy')) {
      modulated = modulated.replace(/!/g, '...');
    }
    
    if (dominantTraits.includes('aggression')) {
      modulated = modulated.replace(/you/g, 'YOU');
    }
    
    return modulated;
  }

  // === PERSONALITY CONSISTENCY ===
  
  /**
   * Check if response is consistent with personality
   */
  isResponseConsistent(response, context) {
    const responseSignature = this.generateResponseSignature(response, context);
    const similar = this.findSimilarResponses(responseSignature);
    
    if (similar.length === 0) {
      return true; // No prior responses to compare
    }
    
    // Calculate consistency score based on personality profile similarity
    const consistencyScores = similar.map(pastResponse => 
      this.calculatePersonalityConsistency(responseSignature, pastResponse)
    );
    
    const averageConsistency = consistencyScores.reduce((sum, score) => sum + score, 0) / consistencyScores.length;
    
    return averageConsistency >= this.consistencyThreshold;
  }

  generateResponseSignature(response, context) {
    return {
      responseType: context.type || 'general',
      personalityProfile: this.getCurrentPersonalityProfile(),
      dominantTraits: this.getDominantPersonalityAspects(),
      timestamp: Date.now(),
      response: response
    };
  }

  findSimilarResponses(responseSignature) {
    const similar = [];
    
    for (const [key, pastResponse] of this.responseMemory.entries()) {
      if (pastResponse.responseType === responseSignature.responseType) {
        similar.push(pastResponse);
      }
    }
    
    return similar.slice(-5); // Last 5 similar responses
  }

  calculatePersonalityConsistency(current, past) {
    let totalDifference = 0;
    let traitCount = 0;
    
    for (const [trait, currentValue] of Object.entries(current.personalityProfile)) {
      if (past.personalityProfile[trait] !== undefined) {
        totalDifference += Math.abs(currentValue - past.personalityProfile[trait]);
        traitCount++;
      }
    }
    
    if (traitCount === 0) return 1.0;
    
    const averageDifference = totalDifference / traitCount;
    return Math.max(0, 1.0 - averageDifference); // Convert difference to similarity
  }

  recordResponseForConsistency(response, context) {
    const signature = this.generateResponseSignature(response, context);
    const key = `${context.type || 'general'}_${Date.now()}`;
    
    this.responseMemory.set(key, signature);
    
    // Keep memory size manageable
    if (this.responseMemory.size > 100) {
      const oldestKey = Array.from(this.responseMemory.keys())[0];
      this.responseMemory.delete(oldestKey);
    }
  }

  // === PERSONALITY DEVELOPMENT ===
  
  /**
   * Evolve personality traits based on experiences
   */
  evolvePersonalityTrait(traitName, delta, reason) {
    if (!this.personalityTraits.hasOwnProperty(traitName)) {
      console.log(`[PERSONALITY] Unknown trait: ${traitName}`);
      return;
    }
    
    const oldValue = this.personalityTraits[traitName];
    const newValue = Math.min(1.0, Math.max(0.0, oldValue + delta));
    
    this.personalityTraits[traitName] = newValue;
    
    // Track evolution
    const evolution = this.traitEvolution.get(traitName) || [];
    evolution.push({
      timestamp: Date.now(),
      oldValue: oldValue,
      newValue: newValue,
      delta: delta,
      reason: reason
    });
    this.traitEvolution.set(traitName, evolution);
    
    console.log(`[PERSONALITY] Trait evolution: ${traitName} ${oldValue.toFixed(3)} -> ${newValue.toFixed(3)} (${reason})`);
  }

  recordPersonalityEvent(eventType, context) {
    const event = {
      timestamp: Date.now(),
      eventType: eventType,
      context: context,
      personalityState: this.currentState.name,
      significantTraits: this.getDominantPersonalityAspects()
    };
    
    this.personalityHistory.push(event);
    
    // Check if this is a significant event
    if (this.isSignificantEvent(eventType, context)) {
      this.significantEvents.push(event);
    }
    
    // Keep history manageable
    if (this.personalityHistory.length > 500) {
      this.personalityHistory = this.personalityHistory.slice(-500);
    }
    
    if (this.significantEvents.length > 50) {
      this.significantEvents = this.significantEvents.slice(-50);
    }
  }

  isSignificantEvent(eventType, context) {
    const significantTypes = [
      'state_transition',
      'trait_evolution',
      'beloved_interaction',
      'memory_triggered',
      'major_threat'
    ];
    
    return significantTypes.includes(eventType) || 
           (context && context.intensity && context.intensity > 0.8);
  }

  // === SYSTEM STATUS AND UTILITIES ===
  
  getPersonalitySystemStatus() {
    return {
      currentState: this.currentState.name,
      stateIntensity: this.currentState.intensity,
      timeInCurrentState: Date.now() - this.currentState.startTime,
      dominantTraits: this.getDominantPersonalityAspects(),
      personalityProfile: this.getCurrentPersonalityProfile(),
      totalEvents: this.personalityHistory.length,
      significantEvents: this.significantEvents.length,
      consistencyMemory: this.responseMemory.size,
      systemHealth: "Operational"
    };
  }

  getPersonalityAnalysis() {
    const profile = this.getCurrentPersonalityProfile();
    const analysis = {
      primaryCharacteristics: [],
      currentMood: this.currentState.name,
      behavioralTendencies: [],
      emotionalState: "unknown"
    };
    
    // Identify primary characteristics
    const sortedTraits = Object.entries(profile)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    
    analysis.primaryCharacteristics = sortedTraits.map(([trait, value]) => ({
      trait: trait,
      strength: value,
      description: this.getTraitDescription(trait, value)
    }));
    
    // Determine emotional state
    if (profile.melancholy > 0.7) {
      analysis.emotionalState = "melancholic";
    } else if (profile.aggression > 0.7) {
      analysis.emotionalState = "aggressive";
    } else if (profile.attachment > 0.8) {
      analysis.emotionalState = "attached";
    } else {
      analysis.emotionalState = "stable";
    }
    
    return analysis;
  }

  getTraitDescription(trait, value) {
    const descriptions = {
      melancholy: value > 0.7 ? "deeply sad and introspective" : "occasionally thoughtful",
      protectiveness: value > 0.8 ? "fiercely protective of loved ones" : "somewhat defensive",
      loyalty: value > 0.9 ? "absolutely devoted" : "generally faithful",
      attachment: value > 0.8 ? "forms intense bonds" : "connects moderately",
      paranoia: value > 0.7 ? "highly suspicious" : "cautiously aware",
      aggression: value > 0.7 ? "quick to anger" : "generally peaceful"
    };
    
    return descriptions[trait] || `${trait} level: ${value.toFixed(2)}`;
  }

  // === INITIALIZATION ===
  
  initialize() {
    console.log("🎭 Initializing personality system...");
    
    // Reset to baseline state
    this.currentState = {
      name: 'baseline',
      startTime: Date.now(),
      intensity: 1.0,
      triggers: []
    };
    
    // Clear histories
    this.personalityHistory = [];
    this.significantEvents = [];
    this.responseMemory.clear();
    
    console.log("🎭 Personality system ready");
    console.log(`🎭 Current state: ${this.currentState.name}`);
    console.log(`🎭 Dominant traits: ${this.getDominantPersonalityAspects().join(', ')}`);
    console.log(`🎭 ${Object.keys(this.personalityTraits).length} personality traits configured`);
    
    return true;
  }
}

module.exports = PersonalitySystem;