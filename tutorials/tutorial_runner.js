#!/usr/bin/env node

// tutorials/tutorial_runner.js - Interactive coding tutorial system
// Created by Daniel "Death" Newton
const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');
const chalk = require('chalk');

class TutorialRunner {
    constructor() {
        this.currentTutorial = null;
        this.userProgress = {
            completedTutorials: [],
            currentLanguage: null,
            achievements: [],
            totalTimeSpent: 0,
            streakDays: 0
        };
        this.tutorials = this.loadTutorials();
    }

    async initialize() {
        console.clear();
        console.log(chalk.cyan('🎓 ======================================== 🎓'));
        console.log(chalk.cyan('           INTERACTIVE CODING TUTORIALS'));
        console.log(chalk.cyan('        Learn Programming Through Creation'));
        console.log(chalk.cyan('🎓 ======================================== 🎓\n'));

        await this.loadUserProgress();
        await this.mainMenu();
    }

    async mainMenu() {
        while (true) {
            console.log(chalk.yellow('\n📚 TUTORIAL MENU:'));
            console.log('1. 🌟 Start Language Tutorial');
            console.log('2. 🎯 Continue Current Tutorial');
            console.log('3. 📊 View Progress & Achievements');
            console.log('4. 🏆 Coding Challenges');
            console.log('5. 📖 Language Comparisons');
            console.log('6. 🔙 Back to Bot Builder');

            const choice = await this.getUserInput('\nChoose an option (1-6): ');

            switch (choice) {
                case '1':
                    await this.startLanguageTutorial();
                    break;
                case '2':
                    await this.continueCurrentTutorial();
                    break;
                case '3':
                    await this.viewProgress();
                    break;
                case '4':
                    await this.codingChallenges();
                    break;
                case '5':
                    await this.languageComparisons();
                    break;
                case '6':
                    return;
                default:
                    console.log(chalk.red('❌ Invalid choice.'));
            }
        }
    }

    async startLanguageTutorial() {
        console.log(chalk.cyan('\n🌟 CHOOSE A PROGRAMMING LANGUAGE'));

        const languages = [
            { key: 'javascript', name: 'JavaScript', icon: '🌟', difficulty: 'Beginner' },
            { key: 'python', name: 'Python', icon: '🐍', difficulty: 'Beginner' },
            { key: 'java', name: 'Java', icon: '☕', difficulty: 'Intermediate' },
            { key: 'cpp', name: 'C++', icon: '⚡', difficulty: 'Advanced' },
            { key: 'go', name: 'Go', icon: '🔵', difficulty: 'Intermediate' },
            { key: 'rust', name: 'Rust', icon: '🦀', difficulty: 'Advanced' }
        ];

        languages.forEach((lang, index) => {
            console.log(`${index + 1}. ${lang.icon} ${lang.name} - ${lang.difficulty}`);
        });

        const choice = await this.getUserInput('\nChoose language (1-6): ');
        const selectedLang = languages[parseInt(choice) - 1];

        if (selectedLang) {
            this.userProgress.currentLanguage = selectedLang.key;
            await this.saveUserProgress();
            await this.runTutorial(selectedLang.key);
        } else {
            console.log(chalk.red('❌ Invalid choice.'));
        }
    }

    async runTutorial(language) {
        const tutorial = this.tutorials[language];
        if (!tutorial) {
            console.log(chalk.red(`❌ Tutorial for ${language} not found.`));
            return;
        }

        console.log(chalk.cyan(`\n🎓 ${tutorial.language.toUpperCase()} TUTORIAL`));
        console.log(chalk.gray('='.repeat(50)));

        console.log(chalk.yellow('📋 TUTORIAL OVERVIEW:'));
        console.log(`Language: ${tutorial.language}`);
        console.log(`Difficulty: ${tutorial.difficulty}`);
        console.log(`Duration: ${tutorial.estimatedDuration}`);
        console.log(`Lessons: ${tutorial.lessons.length}`);

        console.log(chalk.yellow('\n🎯 LEARNING OBJECTIVES:'));
        tutorial.objectives.forEach((objective, index) => {
            console.log(`${index + 1}. ${objective}`);
        });

        const startTutorial = await this.getUserInput('\nReady to start? (y/n): ');
        if (startTutorial.toLowerCase() !== 'y') {
            return;
        }

        // Run through each lesson
        for (let i = 0; i < tutorial.lessons.length; i++) {
            const lesson = tutorial.lessons[i];
            await this.runLesson(lesson, i + 1, tutorial.lessons.length);
        }

        // Mark tutorial as completed
        if (!this.userProgress.completedTutorials.includes(language)) {
            this.userProgress.completedTutorials.push(language);
            await this.awardAchievement(`Completed ${tutorial.language} tutorial!`, '🎓');
        }

        console.log(chalk.green(`\n🎉 Congratulations! You completed the ${tutorial.language} tutorial!`));
        await this.saveUserProgress();
    }

    async runLesson(lesson, lessonNumber, totalLessons) {
        console.log(chalk.cyan(`\n📖 LESSON ${lessonNumber}/${totalLessons}: ${lesson.title}`));
        console.log(chalk.gray('='.repeat(50)));

        console.log(chalk.white(lesson.description));
        console.log(chalk.yellow('\n🎯 OBJECTIVES:'));
        lesson.objectives.forEach(obj => console.log(`• ${obj}`));

        // Show concepts
        if (lesson.concepts && lesson.concepts.length > 0) {
            console.log(chalk.yellow('\n🧠 KEY CONCEPTS:'));
            lesson.concepts.forEach(concept => {
                console.log(`• ${concept}`);
            });
        }

        // Show code examples
        if (lesson.examples && lesson.examples.length > 0) {
            console.log(chalk.yellow('\n💻 CODE EXAMPLES:'));
            lesson.examples.forEach((example, index) => {
                console.log(chalk.cyan(`\nExample ${index + 1}: ${example.title}`));
                console.log(chalk.gray(example.description));
                console.log(chalk.green(example.code));
            });
        }

        // Interactive exercises
        if (lesson.exercises && lesson.exercises.length > 0) {
            console.log(chalk.yellow('\n✏️ EXERCISES:'));

            for (const exercise of lesson.exercises) {
                console.log(chalk.cyan(`\n${exercise.title}`));
                console.log(chalk.white(exercise.description));

                if (exercise.starterCode) {
                    console.log(chalk.yellow('\nStarter Code:'));
                    console.log(chalk.green(exercise.starterCode));
                }

                const userAnswer = await this.getUserInput('\n💡 Your solution: ');

                if (exercise.solution) {
                    console.log(chalk.yellow('\n✅ Sample Solution:'));
                    console.log(chalk.green(exercise.solution));
                }

                // Simple feedback
                console.log(chalk.green('Great job! 💪'));
            }
        }

        // Show best practices
        if (lesson.bestPractices && lesson.bestPractices.length > 0) {
            console.log(chalk.yellow('\n🌟 BEST PRACTICES:'));
            lesson.bestPractices.forEach(practice => {
                console.log(`✅ ${practice}`);
            });
        }

        // Lesson quiz
        if (lesson.quiz && lesson.quiz.length > 0) {
            console.log(chalk.yellow('\n🧠 KNOWLEDGE CHECK:'));

            let correctAnswers = 0;
            for (const question of lesson.quiz) {
                console.log(chalk.cyan(`\n${question.question}`));
                question.options.forEach((option, index) => {
                    console.log(`${index + 1}. ${option}`);
                });

                const answer = await this.getUserInput('Your answer (number): ');
                const answerIndex = parseInt(answer) - 1;

                if (answerIndex === question.correctAnswer) {
                    console.log(chalk.green('✅ Correct!'));
                    correctAnswers++;
                } else {
                    console.log(chalk.red('❌ Incorrect.'));
                    console.log(chalk.yellow(`Correct answer: ${question.options[question.correctAnswer]}`));
                }
            }

            const score = Math.round((correctAnswers / lesson.quiz.length) * 100);
            console.log(chalk.cyan(`\n📊 Quiz Score: ${score}%`));

            if (score >= 80) {
                console.log(chalk.green('🎉 Excellent! You\'re ready for the next lesson.'));
            } else {
                console.log(chalk.yellow('📚 Consider reviewing the material before continuing.'));
            }
        }

        // Continue to next lesson
        if (lessonNumber < totalLessons) {
            const continueLesson = await this.getUserInput('\nReady for the next lesson? (y/n): ');
            if (continueLesson.toLowerCase() !== 'y') {
                return;
            }
        }
    }

    async continueCurrentTutorial() {
        if (!this.userProgress.currentLanguage) {
            console.log(chalk.yellow('No current tutorial in progress.'));
            await this.startLanguageTutorial();
            return;
        }

        const language = this.userProgress.currentLanguage;
        console.log(chalk.cyan(`\n📚 Continuing ${language} tutorial...`));

        // Find the last completed lesson and continue from there
        // For now, just restart the tutorial
        await this.runTutorial(language);
    }

    async viewProgress() {
        console.log(chalk.cyan('\n📊 YOUR PROGRESS'));

        console.log(chalk.yellow('🎓 Completed Tutorials:'));
        if (this.userProgress.completedTutorials.length === 0) {
            console.log('None yet. Start your first tutorial!');
        } else {
            this.userProgress.completedTutorials.forEach(tutorial => {
                console.log(`✅ ${tutorial.charAt(0).toUpperCase() + tutorial.slice(1)}`);
            });
        }

        console.log(chalk.yellow('\n🏆 Achievements:'));
        if (this.userProgress.achievements.length === 0) {
            console.log('None yet. Complete tutorials to earn achievements!');
        } else {
            this.userProgress.achievements.forEach(achievement => {
                console.log(`${achievement.icon} ${achievement.title}`);
            });
        }

        console.log(chalk.yellow('\n📈 Statistics:'));
        console.log(`Total Tutorials Completed: ${this.userProgress.completedTutorials.length}`);
        console.log(`Time Spent Learning: ${this.userProgress.totalTimeSpent} minutes`);
        console.log(`Current Streak: ${this.userProgress.streakDays} days`);

        const completionRate = Math.round((this.userProgress.completedTutorials.length / 6) * 100);
        console.log(`Overall Completion: ${completionRate}%`);
    }

    async codingChallenges() {
        console.log(chalk.cyan('\n🏆 CODING CHALLENGES'));

        const challenges = [
            {
                title: 'Hello World Bot',
                description: 'Create a simple bot that responds to "hello" with a greeting',
                difficulty: 'Easy',
                language: 'Any',
                points: 10
            },
            {
                title: 'Command Parser',
                description: 'Build a bot that can parse and respond to multiple commands',
                difficulty: 'Medium',
                language: 'Any',
                points: 25
            },
            {
                title: 'AI Chatbot',
                description: 'Create a bot with basic AI capabilities using sentiment analysis',
                difficulty: 'Hard',
                language: 'Python/JavaScript',
                points: 50
            }
        ];

        challenges.forEach((challenge, index) => {
            console.log(`${index + 1}. ${challenge.title}`);
            console.log(`   ${challenge.description}`);
            console.log(`   Difficulty: ${challenge.difficulty} | Points: ${challenge.points}`);
        });

        const choice = await this.getUserInput('\nChoose a challenge (1-3): ');
        const selectedChallenge = challenges[parseInt(choice) - 1];

        if (selectedChallenge) {
            await this.runChallenge(selectedChallenge);
        }
    }

    async runChallenge(challenge) {
        console.log(chalk.cyan(`\n🏆 ${challenge.title.toUpperCase()}`));
        console.log(chalk.gray('='.repeat(50)));

        console.log(chalk.white(challenge.description));
        console.log(chalk.yellow(`\nDifficulty: ${challenge.difficulty}`));
        console.log(chalk.yellow(`Points: ${challenge.points}`));

        // In a real implementation, this would provide interactive challenge guidance
        console.log(chalk.cyan('\n💡 Challenge Instructions:'));
        console.log('1. Create a new bot project');
        console.log('2. Implement the required functionality');
        console.log('3. Test your bot thoroughly');
        console.log('4. Deploy and share your creation');

        console.log(chalk.green('\nGood luck! You\'ve got this! 🚀'));
    }

    async languageComparisons() {
        console.log(chalk.cyan('\n📊 LANGUAGE COMPARISONS'));

        const comparisons = [
            {
                aspect: 'Learning Curve',
                javascript: 'Easy - Dynamic typing, forgiving',
                python: 'Very Easy - Clean syntax, beginner-friendly',
                java: 'Moderate - Static typing, verbose',
                cpp: 'Steep - Manual memory management',
                go: 'Moderate - Simple but different paradigm',
                rust: 'Steep - Ownership system complex'
            },
            {
                aspect: 'Performance',
                javascript: 'Good - V8 engine optimization',
                python: 'Slow - Interpreted language',
                java: 'Excellent - JIT compilation',
                cpp: 'Excellent - Compiled, low-level control',
                go: 'Excellent - Compiled, efficient',
                rust: 'Excellent - Zero-cost abstractions'
            },
            {
                aspect: 'Ecosystem',
                javascript: 'Huge - npm packages',
                python: 'Large - PyPI packages',
                java: 'Large - Maven/Gradle',
                cpp: 'Moderate - Various package managers',
                go: 'Growing - Go modules',
                rust: 'Growing - Crates.io'
            },
            {
                aspect: 'Best For',
                javascript: 'Web bots, APIs, real-time apps',
                python: 'AI/ML, automation, data science',
                java: 'Enterprise, Android, large systems',
                cpp: 'Games, system programming, performance',
                go: 'Microservices, networking, cloud',
                rust: 'Security, systems, performance-critical'
            }
        ];

        console.log(chalk.yellow('📋 COMPARISON MATRIX:'));
        console.log('Aspect'.padEnd(15), '| JS'.padEnd(12), '| Python'.padEnd(12), '| Java'.padEnd(12), '| C++'.padEnd(12), '| Go'.padEnd(12), '| Rust');
        console.log('-'.repeat(90));

        comparisons.forEach(comp => {
            console.log(
                comp.aspect.padEnd(15),
                '|',
                comp.javascript.substring(0, 10).padEnd(12),
                '|',
                comp.python.substring(0, 10).padEnd(12),
                '|',
                comp.java.substring(0, 10).padEnd(12),
                '|',
                comp.cpp.substring(0, 10).padEnd(12),
                '|',
                comp.go.substring(0, 10).padEnd(12),
                '|',
                comp.rust.substring(0, 10).padEnd(12)
            );
        });

        console.log(chalk.cyan('\n💡 Pro Tip: Choose based on your goals!'));
        console.log('• Learning to code? Start with Python or JavaScript');
        console.log('• Building AI bots? Python is your best friend');
        console.log('• Maximum performance? C++ or Rust');
        console.log('• Web applications? JavaScript');
        console.log('• Enterprise software? Java');
        console.log('• Modern systems? Go');
    }

    async awardAchievement(title, icon) {
        const achievement = {
            title: title,
            icon: icon,
            dateEarned: new Date().toISOString()
        };

        this.userProgress.achievements.push(achievement);
        console.log(chalk.green(`\n🏆 Achievement Unlocked: ${icon} ${title}`));
    }

    async loadUserProgress() {
        try {
            const progressPath = path.join(__dirname, '..', 'user_progress.json');
            const data = await fs.readFile(progressPath, 'utf8');
            this.userProgress = JSON.parse(data);
        } catch (error) {
            // File doesn't exist or is corrupted, use default progress
            console.log(chalk.yellow('Starting fresh progress tracking...'));
        }
    }

    async saveUserProgress() {
        try {
            const progressPath = path.join(__dirname, '..', 'user_progress.json');
            await fs.writeFile(progressPath, JSON.stringify(this.userProgress, null, 2));
        } catch (error) {
            console.error('Error saving progress:', error.message);
        }
    }

    loadTutorials() {
        return {
            javascript: {
                language: 'JavaScript',
                difficulty: 'Beginner',
                estimatedDuration: '4-6 hours',
                objectives: [
                    'Master JavaScript syntax and data types',
                    'Work with functions, objects, and arrays',
                    'Handle asynchronous operations with promises',
                    'Create interactive bot applications',
                    'Understand error handling and debugging'
                ],
                lessons: [
                    {
                        title: 'JavaScript Fundamentals',
                        description: 'Learn the basic building blocks of JavaScript programming.',
                        objectives: ['Variables and data types', 'Basic operators', 'Control structures'],
                        concepts: ['Variables (let, const, var)', 'Data types', 'Operators', 'Conditionals', 'Loops'],
                        examples: [
                            {
                                title: 'Variables and Types',
                                description: 'JavaScript supports dynamic typing with let, const, and var.',
                                code: `// Variables
let message = "Hello, World!";
const PI = 3.14159;
let isActive = true;

// Dynamic typing
let value = 42;        // Number
value = "text";        // String
value = [1, 2, 3];     // Array
value = {name: "Bot"}; // Object`
                            },
                            {
                                title: 'Control Structures',
                                description: 'Make decisions and repeat actions in your code.',
                                code: `// If-else statements
const temperature = 25;
if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("It's warm!");
} else {
    console.log("It's cool!");
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log(\`Count: \${i}\`);
}

// While loop
let counter = 0;
while (counter < 3) {
    console.log(\`Counter: \${counter}\`);
    counter++;
}`
                            }
                        ],
                        exercises: [
                            {
                                title: 'Temperature Checker',
                                description: 'Write a function that takes a temperature and returns a description.',
                                starterCode: `function checkTemperature(temp) {
    // Your code here - return "hot", "warm", or "cool"
}`,
                                solution: `function checkTemperature(temp) {
    if (temp > 30) {
        return "hot";
    } else if (temp > 20) {
        return "warm";
    } else {
        return "cool";
    }
}`
                            },
                            {
                                title: 'Number Multiplier',
                                description: 'Create a function that multiplies each number in an array by 2.',
                                starterCode: `function multiplyByTwo(numbers) {
    // Your code here - return new array with doubled values
}`,
                                solution: `function multiplyByTwo(numbers) {
    const result = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(numbers[i] * 2);
    }
    return result;
}`
                            }
                        ],
                        bestPractices: [
                            'Use const for values that won\'t change',
                            'Use let for variables that will be reassigned',
                            'Avoid var in modern JavaScript',
                            'Use meaningful variable names',
                            'Add comments for complex logic'
                        ],
                        quiz: [
                            {
                                question: 'Which keyword should you use for a variable that won\'t be reassigned?',
                                options: ['let', 'var', 'const', 'variable'],
                                correctAnswer: 2
                            },
                            {
                                question: 'What will this code output: console.log(typeof [1,2,3])',
                                options: ['array', 'object', 'list', 'undefined'],
                                correctAnswer: 1
                            }
                        ]
                    }
                ]
            },
            python: {
                language: 'Python',
                difficulty: 'Beginner',
                estimatedDuration: '4-6 hours',
                objectives: [
                    'Master Python syntax and indentation',
                    'Work with data structures and control flow',
                    'Create functions and classes',
                    'Handle file operations and modules',
                    'Understand error handling and debugging'
                ],
                lessons: [
                    {
                        title: 'Python Basics',
                        description: 'Learn Python\'s clean syntax and basic programming concepts.',
                        objectives: ['Variables and types', 'Input/output', 'Basic operations'],
                        concepts: ['Variables', 'Data types', 'Print function', 'Input function', 'Comments'],
                        examples: [
                            {
                                title: 'Variables and I/O',
                                description: 'Python\'s simple syntax makes it beginner-friendly.',
                                code: `# Variables
name = "Alice"
age = 25
height = 5.7
is_student = True

# Print output
print("Hello, World!")
print(f"My name is {name} and I'm {age} years old")

# Get user input
user_name = input("What's your name? ")
print(f"Nice to meet you, {user_name}!")`
                            },
                            {
                                title: 'Data Types and Operations',
                                description: 'Python supports various data types and operations.',
                                code: `# Numbers
x = 10
y = 3.14
result = x + y
print(f"Result: {result}")  # 13.14

# Strings
message = "Hello"
greeting = message + " World!"
print(greeting.upper())  # HELLO WORLD!

# Lists (arrays)
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
print(f"First element: {numbers[0]}")
print(f"List length: {len(numbers)}")

# Dictionaries (objects)
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
print(f"Name: {person['name']}")
person["email"] = "alice@example.com"`
                            }
                        ],
                        exercises: [
                            {
                                title: 'Personal Information Collector',
                                description: 'Create a program that collects and displays personal information.',
                                starterCode: `# Collect user's name, age, and city
# Display the information in a formatted way`,
                                solution: `# Collect user information
name = input("What's your name? ")
age = input("How old are you? ")
city = input("Which city do you live in? ")

# Display information
print("\\n=== Personal Information ===")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"City: {city}")
print(f"\\nHello {name} from {city}! You are {age} years old.")`
                            },
                            {
                                title: 'Number Processor',
                                description: 'Create a program that processes a list of numbers.',
                                starterCode: `# Create a list of numbers
# Calculate sum, average, min, and max`,
                                solution: `# List of numbers
numbers = [12, 45, 23, 67, 34, 89, 15]

# Calculations
total = sum(numbers)
average = total / len(numbers)
minimum = min(numbers)
maximum = max(numbers)

# Display results
print("=== Number Analysis ===")
print(f"Numbers: {numbers}")
print(f"Sum: {total}")
print(f"Average: {average:.2f}")
print(f"Minimum: {minimum}")
print(f"Maximum: {maximum}")`
                            }
                        ],
                        bestPractices: [
                            'Use descriptive variable names',
                            'Follow PEP 8 style guidelines',
                            'Use f-strings for string formatting',
                            'Add comments to explain complex code',
                            'Use meaningful function names'
                        ],
                        quiz: [
                            {
                                question: 'What function do you use to get input from the user?',
                                options: ['print()', 'input()', 'read()', 'get()'],
                                correctAnswer: 1
                            },
                            {
                                question: 'Which of these is NOT a valid Python data type?',
                                options: ['int', 'str', 'bool', 'char'],
                                correctAnswer: 3
                            }
                        ]
                    }
                ]
            }
        };
    }

    async getUserInput(prompt) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    }
}

// Run tutorial system if this file is executed directly
if (require.main === module) {
    const tutorialRunner = new TutorialRunner();
    tutorialRunner.initialize().catch(console.error);
}

module.exports = TutorialRunner;


