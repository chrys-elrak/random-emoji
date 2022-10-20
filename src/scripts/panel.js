const emojiField = document.querySelector('.emoji-field');
const randomButton = document.querySelector('.random');
const closeButton = document.querySelector('.close');

function getEmoji() {
    return fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(res => res.json()).then(data => data.emoji);
}

getEmoji().then(emoji => {
    emojiField.innerHTML = emoji;
});

emojiField.addEventListener('click', async () => {
    // copy the emoji to the clipboard
    await navigator.clipboard.writeText(emojiField.innerText);
    // close on click
    window.close();
});

randomButton.addEventListener('click', async () => {
    // generate a new emoji
    emojiField.innerHTML = await getEmoji();
});

closeButton.addEventListener('click', () => {
    window.close();
});