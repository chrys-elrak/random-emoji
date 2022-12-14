const emojiField = document.querySelector('.emoji-field');
const randomButton = document.querySelector('.random');
const closeButton = document.querySelector('.close');
const loader = document.querySelector('#loader');
const URL = chrome.runtime.getURL('src/data/emoji.json');
const AUTO_CLOSE_DURATION = 1000;

function getEmoji() {
    return fetch(URL).then(res => res.json()).then(data => {
        const {emoji} = data[Math.floor(Math.random() * data.length)];
        return emoji;
    });
}

getEmoji().then(emoji => {
    emojiField.innerHTML = emoji;
    emojiField.classList.remove('hidden');
    loader.classList.add('hidden');
});

emojiField.addEventListener('click', async () => {
    // copy the emoji to the clipboard
    await navigator.clipboard.writeText(emojiField.innerText);
    emojiField.innerHTML = `
        <p>Copied to the clipboard</p>
        <h2>${emojiField.innerText}</h2>
        <i>Enjoy it!</i>
    `;
    emojiField.classList.add('copied-emoji');
    closeButton.remove();
    randomButton.remove();
    // close on click
    setTimeout(() => {
        window.close();
    }, AUTO_CLOSE_DURATION);
});

randomButton.addEventListener('click', async () => {
    // show loader
    loader.classList.remove('hidden');
    emojiField.classList.add('hidden');
    // generate a new emoji
    emojiField.innerHTML = await getEmoji();
    emojiField.classList.remove('hidden');
    loader.classList.add('hidden');
});

closeButton.addEventListener('click', () => {
    window.close();
});