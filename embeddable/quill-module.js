const Quill = (() => {
    // Typing test variables
    let startTime; // Start time of typing test
    let typingStarted = false; // Flag to check if typing has started
    
    // Elements
    let userInputElement;
    let typingText;
    let wpmElement;
    let updateInterval;

    // Cooldown variables

    let cooldownEnabled = false;
    let cooldownTime;

    const SpeedReference = [
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
    ];

    function start() {
        // Initialize DOM elements
        userInputElement = document.getElementById('userInput');
        typingText = document.getElementById('typer');
        wpmElement = document.getElementById('wpm');
        
        // Initialize the typing test with random text
        typingText.textContent = SpeedReference[Math.floor(Math.random() * SpeedReference.length)];
        
        // Setup event listeners for the input field
        userInputElement.addEventListener('input', onTyping);
        userInputElement.addEventListener('keydown', onKeyPress);
    }
    
    function reset() {
        // Reset the typing test
        userInputElement.value = '';
        typingText.textContent = SpeedReference[Math.floor(Math.random() * SpeedReference.length)];
        startTime = null;
        typingStarted = false;
        wpmElement.textContent = 'WPM: 0';
    }
    
    function onTyping() {
        // Start the timer on first input
        if (!typingStarted) {
            startTime = new Date().getTime();
            typingStarted = true;
        }
        highlightText();  

        clearInterval(updateInterval); 
        
        updateInterval = setInterval(() => { 
            if (Quill.getWPM) {
                const wpm = Quill.getWPM();
                document.getElementById('wpm').textContent = `WPM: ${wpm}`;
            }
        }, 1);  
    }

    function onKeyPress(event) {
        // Handle key press events for 'Enter' and 'Escape'

        if (event.key === 'Enter') {
            stop();
            timedReset(cooldownEnabled, cooldownTime);
        }
        else if (event.key === 'Escape') {
            reset();
        }
    }

    function timedReset(enabled, cooldown) {
        if (!enabled) {
            cooldownEnabled = false;
            cooldownTime;
            return;
        }
        else {
            cooldownEnabled = true;
            cooldownTime = cooldown;

            setTimeout(() => {
                reset();
            }, cooldown);
        }
    }

    function stop() {
        let wpm = getWPM();
        wpmElement.textContent = `WPM: ${wpm}`;
        typingText.textContent = getAdvice(wpm);

        // Pause the wpm update, instead of setting it to 0

        typingStarted = false;
        clearInterval(updateInterval);
    }
    
    function getWPM() {
        if (typingStarted) {
            const endTime = new Date().getTime();
            const userInput = userInputElement.value;
            const timeTaken = (endTime - startTime) / 1000; // time in seconds
            const wordsPerMinute = (userInput.split(' ').length / timeTaken) * 60;
            return wordsPerMinute.toFixed(2);
        }
        return 0;
    }
    
    function getAdvice(wpm) {
        if (wpm <= 50) {
            return "Advice: Practice daily with touch typing exercises, focusing on accuracy over speed to build muscle memory and gradually increase your WPM.";
        } else if (wpm > 50 && wpm <= 70) {
            return "Advice: Refine your typing rhythm with intermediate drills, focusing on consistent speed and tackling tricky key combinations to boost your accuracy and flow.";
        } else if (wpm > 70 && wpm <= 90) {
            return "Advice: Challenge yourself with advanced typing tests, focusing on speed and accuracy to push your limits and reach your full potential.";
        } else {
            return "Advice: Congratulations! You are a typing master. Keep up the good work and continue to improve your typing skills.";
        }
    }
    
    function highlightText() {
        const userInput = userInputElement.value;
        const SpeedWords = typingText.textContent.split(' ');
        const userWords = userInput.split(' ');
    
        let highlightedText = '';
        for (let i = 0; i < SpeedWords.length; i++) {
            if (userWords[i] && userWords[i].toLowerCase() === SpeedWords[i].toLowerCase()) {
                highlightedText += `<span style="color: green">${SpeedWords[i]}</span> `;
            } else {
                highlightedText += `<span style="color: red">${SpeedWords[i]}</span> `;
            }
        }
    
        typingText.innerHTML = highlightedText;
    }

    function debug(){
        setInterval(() => {
            console.log("WPM: " + getWPM());

            if (typingStarted) {
                console.log("Typing test has started.");
            } else {
                console.log("Typing test has not started yet.");
            }
        }, 1000);

        console.log("Start time: " + startTime);
        console.log("WPM: " + getWPM());
        console.log("Advice: " + getAdvice(getWPM()));

    }
    
    return {
        start,
        reset,
        getWPM,
        getAdvice,
        debug,
        timedReset
    };
})();