<p align="center">
  <img width="200px" align="center" src="https://raw.githubusercontent.com/purploided/Quill/refs/heads/main/images/quillicon.png">
</p>

<h1 align="center">🪶 Quill</h1>

Welcome to **Quill**! This powerful web-based tool <sub>It's now a module too!</sub> is designed to help you measure and improve your typing speed and accuracy through engaging exercises and detailed performance tracking.

## 🚀 Features

- **Typing Exercises**: Engage in a variety of exercises tailored to enhance your typing skills.
- **Performance Tracking**: Monitor your typing speed and accuracy in real-time.

## 🛠️ Usage

1. **Open Quill**: Visit the website to get started.
2. **Start Typing**: Begin typing and let the tool automatically track your performance.
3. **Review Your Progress**: Analyze your performance through the generated data to see how much you've improved.
4. **Press Escape**: Press the escape key to generate a prompt to test your typing speed.

## 📁 Embed

To embed and use the Quill Module, use the 
```html
<script src="https://cdn.jsdelivr.net/gh/purploided/Quill@main/embeddable/quill-module.js">
```
in your html!

# Quill Typing Test Documentation

## Overview
The `Quill` module is a self-invoking function that implements a typing test application. It tracks user input, calculates words per minute (WPM), and provides feedback based on the user's typing speed. It also includes cooldown functionality to reset the test after a specified time.

## Key Components

### 1. Variables and Constants
- **`startTime`**: Records when the user starts typing.
- **`typingStarted`**: A flag to indicate whether the typing session has started.
- **`userInputElement`**: References the input field where the user types.
- **`typingText`**: Displays the text that the user needs to type.
- **`wpmElement`**: Displays the calculated words per minute.
- **`updateInterval`**: Holds the interval ID for updating WPM.
- **`cooldownEnabled`** and **`cooldownTime`**: Control the cooldown feature to reset the test after a certain time.
- **`SpeedReference`**: An array of predefined text strings that serve as typing samples.

### 2. Main Functions

- **`start()`**: 
  - Initializes the typing test.
  - Randomly selects a typing sample from `SpeedReference`.
  - Sets up event listeners for user input and key presses.

- **`reset()`**:
  - Resets the typing test.
  - Clears the user input and updates the displayed text.
  - Resets the timer and WPM display.

- **`onTyping()`**:
  - Triggered whenever the user types in the input field.
  - Starts the timer if typing is initiated.
  - Highlights correctly typed words and updates the WPM display at a set interval.

- **`onKeyPress(event)`**:
  - Handles special key presses for 'Enter' and 'Escape':
    - **Enter**: Stops the test and initiates cooldown.
    - **Escape**: Resets the test.

- **`timedReset(enabled, cooldown)`**:
  - Resets the typing test after a specified cooldown period if enabled.

- **`stop()`**:
  - Stops the typing test and displays the final WPM.
  - Shows advice based on the user's typing speed.

- **`getWPM()`**:
  - Calculates and returns the user's words per minute based on their input and the time taken.

- **`getAdvice(wpm)`**:
  - Provides feedback based on the user's WPM:
    - **<= 50**: Advice for beginners.
    - **> 50 && <= 70**: Advice for intermediate users.
    - **> 70 && <= 90**: Advice for advanced users.
    - **> 90**: Congratulations for typing masters.

- **`highlightText()`**:
  - Highlights the user's correctly typed words in green and incorrectly typed words in red, updating the displayed text accordingly.

- **`debug()`**:
  - Logs WPM and typing test status to the console for debugging purposes.
