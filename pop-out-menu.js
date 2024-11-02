const dots = document.querySelector('.dots');
const menu = document.createElement('div');
const testerContainer = document.getElementById('type-tester-container');
menu.className = 'pop-out-menu';
menu.style.display = 'none';
menu.style.zIndex = '-1'; // Ensure the menu is under everything else
menu.innerHTML = `
    <h1 class="htu">How to use Quill</h1>
    <p class="numo">1. Press Escape to generate your typing text.</p>
    <p class="numo">2. Press Enter when you are done typing.</p>
    <p class="numo">3. Your WPM will be displayed below the text area.</p>
`;
document.body.appendChild(menu);

// Add initial styles for the animation
menu.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
menu.style.transform = 'translate(-300px) scale(1)';
menu.style.opacity = '0';

dots.addEventListener('click', () => {
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.style.transform = 'scale(1)';
            menu.style.opacity = '1';
        }, 50); // Small delay to ensure the transition occurs
        menu.style.width = '300px';
        menu.style.height = '255px';
    } else {
        menu.style.transform = 'scale(0)';
        menu.style.opacity = '0';
        setTimeout(() => {
            menu.style.display = 'none';
            menu.style.width = '200px';
            menu.style.height = '200px';
        }, 300); // Match the duration of the transition
    }
});

// Optional: Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (!dots.contains(event.target) && !menu.contains(event.target)) {
        menu.style.transform = 'scale(0)';
        menu.style.opacity = '0';
        setTimeout(() => {
            menu.style.display = 'none';
            menu.style.width = '200px';
            menu.style.height = '200px';
        }, 300); // Match the duration of the transition
    }
});
