const textareas = document.querySelectorAll('textarea');
const OFFSETS = 10;
if (textareas.length) {
    const textarea = textareas[0];
    textarea.addEventListener('focus', () => {
        main(textarea);
    });

    // textarea.addEventListener('blur', () => {
    //     const container = document.querySelector('.container');
    //     if (container) {
    //         container.remove();
    //     }
    // });
}

function main(textarea) {
    const pos = getOffset(textarea)
    const div = document.createElement('div');
    // update position
    div.style.top = pos.top + pos.height + OFFSETS + 'px';
    div.style.left = pos.left + pos.width + OFFSETS  +'px';
    div.style.position = 'absolute';
    div.setAttribute('tabindex', '0');
    // add the class
    div.classList.add('container');
    // create emoji for the div
    const emojiField = document.createElement('h1');
    emojiField.classList.add('emoji-field', 'unselectable');
    emojiField.addEventListener('click', () => {
        textarea.value += emojiField.innerText;
    });
    // add emoji to the div
   getEmoji().then(emoji => {
        emojiField.innerHTML = emoji;
    });
    // add the content to the div
    div.appendChild(emojiField);
    // create the close button
    const close = document.createElement('button');
    close.classList.add('button', 'close');
    close.innerHTML = '&times;';
    close.addEventListener('click', () => {
        div.remove();
    });
    // create random emoji
    const random = document.createElement('button');
    random.classList.add('button', 'random');
    random.innerHTML = '&#8634;';
    random.addEventListener('click', async () => {
        emojiField.innerHTML = await getEmoji();
    });
    // button container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    // add the content to the div
    buttonContainer.appendChild(random);
    buttonContainer.appendChild(close);
    // Add buttons to the button container
    div.appendChild(buttonContainer);
    // Main container
    document.body.appendChild(div);
}


function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
    };
}

function getEmoji() {
    return fetch('https://ranmoji.herokuapp.com/emojis/api/v.1.0/').then(res => res.json()).then(data => data.emoji);
}