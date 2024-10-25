const dots = document.querySelector('.dots');
const menu = document.createElement('div');
menu.className = 'pop-out-menu';
menu.style.display = 'none';
menu.innerHTML = `
    <h1 class="htu">How to use Re-Type</h1>
    <p class="numo">1. Press Escape to generate your typing text.</p>
    <p class="numo">2. Press Enter when you are done typing.</p>
    <p class="numo">3. Your WPM will be displayed below the text area.</p>
`;
document.body.appendChild(menu);

dots.addEventListener('click', () => {
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// Optional: Close the menu when clicking outside of it
document.addEventListener('click', (event) => {
    if (!dots.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});
