let startTime;
let typingStarted = false;

const userInputElement = document.getElementById('userInput');
let typingText = document.getElementById('typer');

let readyText = [
    "The quick brown fox jumps over the lazy dog. A small cat plays in the yard with a ball of yarn. Birds fly high in the blue sky.",
    "It was a sunny day, and the kids went to the park. They played games and had fun. Afterward, they ate ice cream together.",
    "The sun sets in the west, and the moon rises in the east. The stars twinkle in the night sky. The world is at peace.",
    "The rain falls gently on the roof. The sound is soothing and calming. The plants drink up the water and grow tall and strong.",
    "The wind blows through the trees, rustling the leaves. The branches sway back and forth. The birds sing a sweet melody.",
    "The snow falls softly to the ground, covering everything in white. The children build snowmen and have snowball fights. It is a winter wonderland.",
    "The waves crash against the shore, creating a symphony of sound. The seagulls cry out as they soar through the sky. The ocean is vast and beautiful.",
    "The fire crackles and pops, warming the room. The flames dance and flicker, casting shadows on the walls. It is cozy and inviting.",
    "The flowers bloom in the spring, filling the air with their sweet scent. The bees buzz around, collecting nectar. The world is alive with color.",
    "The leaves change color in the fall, painting the trees in shades of red, orange, and yellow. The air is crisp and cool. It is a time of change."
]

userInputElement.addEventListener('input', () => {
    if (!typingStarted) {
        startTime = new Date().getTime();
        typingStarted = true;
    }
});

// Calculate and display the WPM when the user stops typing
userInputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const endTime = new Date().getTime();
        const userInput = userInputElement.value;
        const wpm = document.getElementById('wpm');

        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const wordsPerMinute = (userInput.split(' ').length / timeTaken) * 60;

        console.log(`You typed: "${userInput}"`);
        console.log(`Time taken: ${timeTaken.toFixed(2)} seconds`);
        
        wpm.textContent = `WPM: ${wordsPerMinute.toFixed(2)}`;

        // Reset the time and typingStarted flag
        startTime = null;
        typingStarted = false;

        if (wordsPerMinute <= 50) {
            typingText.textContent = "Advice: Practice daily with touch typing exercises, focusing on accuracy over speed to build muscle memory and gradually increase your WPM.";
        }
        else if (wordsPerMinute >= 50 && wordsPerMinute <= 70) {
            typingText.textContent = "Advice: Refine your typing rhythm with intermediate drills, focusing on consistent speed and tackling tricky key combinations to boost your accuracy and flow.";
        }
        else if (wordsPerMinute >= 70 && wordsPerMinute <= 90) {
            typingText.textContent = "Advice: Challenge yourself with advanced typing tests, focusing on speed and accuracy to push your limits and reach your full potential.";
        }
        else {
            typingText.textContent = "Advice: Congratulations! You are a typing master. Keep up the good work and continue to improve your typing skills.";
        }
    }

    if (event.key === 'Escape') {
        typingText.textContent = readyText[Math.floor(Math.random() * readyText.length)];
        // Check what's being typed in the textbox, highlight the words being typed that match the readyText

        const userInput = userInputElement.value;
        const readyTextWords = typingText.textContent.split(' ');
        const userWords = userInput.split(' ');

        let highlightedText = '';
        for (let i = 0; i < readyTextWords.length; i++) {
            if (userWords[i] && userWords[i].toLowerCase() === readyTextWords[i].toLowerCase()) {
            highlightedText += `<span style="color: green">${readyTextWords[i]}</span> `;
            } else {
            highlightedText += `<span style="color: red">${readyTextWords[i]}</span> `;
            }
        }

        typingText.innerHTML = highlightedText;

        // Add a setInterval to check the words

        const intervalId = setInterval(() => {
            const userInput = userInputElement.value;
            const userWords = userInput.split(' ');

            let highlightedText = '';
            for (let i = 0; i < readyTextWords.length; i++) {
            if (userWords[i] && userWords[i].toLowerCase() === readyTextWords[i].toLowerCase()) {
                highlightedText += `<span style="color: green">${readyTextWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: red">${readyTextWords[i]}</span> `;
            }
            }

            typingText.innerHTML = highlightedText;
        }, 200); // Check every 200ms

        // Clear the interval when Enter is pressed
        userInputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
            clearInterval(intervalId);
            }
        });
    }
});

setInterval(() => { 
    if (typingStarted) {
        const endTime = new Date().getTime();
        const userInput = userInputElement.value;
        const wpm = document.getElementById('wpm');

        const timeTaken = (endTime - startTime) / 1000; // time in seconds
        const wordsPerMinute = (userInput.split(' ').length / timeTaken) * 60;

        console.log(`You typed: "${userInput}"`);
        console.log(`Time taken: ${timeTaken.toFixed(2)} seconds`);
        
        wpm.textContent = `WPM: ${wordsPerMinute.toFixed(0)}`;
    }
}, 10);