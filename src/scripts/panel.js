const emojiField = document.querySelector('.emoji-field');
const randomButton = document.querySelector('.random');
const closeButton = document.querySelector('.close');
const loader = document.querySelector('#loader');
const URL = chrome.runtime.getURL('src/data/emoji.json');
const AUTO_CLOSE_DURATION = 1000;
const COPIED_EMOJI_CLASS = 'copied-emoji';
const USELECTABLE_CLASS = 'unselectable';
const HIDDEN_CLASS = 'hidden';

emojiField.classList.add(USELECTABLE_CLASS);

function getEmoji() {
    return fetch(URL).then(res => res.json()).then(data => {
        const {emoji} = data[Math.floor(Math.random() * data.length)];
        return emoji;
    });
}

getEmoji().then(emoji => {
    emojiField.innerHTML = emoji;
    emojiField.classList.remove(HIDDEN_CLASS);
    loader.classList.add(HIDDEN_CLASS);
});

emojiField.addEventListener('click', async () => {
    // copy the emoji to the clipboard
    await navigator.clipboard.writeText(emojiField.innerText);
    emojiField.innerHTML = `
        <p>Copied to the clipboard</p>
        <h2>${emojiField.innerText}</h2>
        <i>Enjoy it!</i>
    `;
    emojiField.classList.add(COPIED_EMOJI_CLASS);
    closeButton.remove();
    randomButton.remove();
    // close on click
    setTimeout(() => {
        window.close();
    }, AUTO_CLOSE_DURATION);
});

randomButton.addEventListener('click', async () => {
    // show loader
    loader.classList.remove(HIDDEN_CLASS);
    emojiField.classList.add(HIDDEN_CLASS);
    // generate a new emoji
    emojiField.innerHTML = await getEmoji();
    emojiField.classList.remove(HIDDEN_CLASS);
    loader.classList.add(HIDDEN_CLASS);
});

closeButton.addEventListener('click', () => {
    window.close();
});