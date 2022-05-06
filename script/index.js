import i18Obj from './key.js';

let createButtons = (line, from, to, keyList, specialButton = specialButtonList) => {
    for (let i = from; i < to; i++) {
        let button = document.createElement('div');
        button.className = 'keyboard__button';
        button.dataset.keyCode = keyList[i][1];

        if (specialButton.includes(keyList[i][0].trim())) {
            button.classList.add(`button-${keyList[i][0].trim().split(' ').join('-').toLowerCase()}`);
            button.classList.add('special-button');
            button.textContent = keyList[i][0];
            line.append(button);
            continue;
        }

        if (keyList[i][0].split(' ').length === 2) {
            let subBut1 = document.createElement('div');
            subBut1.className = 'keyboard__button-sub1';
            subBut1.classList.add('keyboard__button-sub');
            subBut1.textContent = keyList[i][0].split(' ')[1];

            let subBut2 = document.createElement('div');
            subBut2.className = 'keyboard__button-sub2';
            subBut2.classList.add('keyboard__button-sub');
            subBut2.textContent = keyList[i][0].split(' ')[0];

            button.append(subBut1, subBut2);
            line.append(button);
            button.classList.add('double-button');

            continue;
        }
        button.textContent = keyList[i][0];
        line.append(button);
    }
};

let specialButtonList = ['backspace', 'tab', 'ENTER', 'DEL', 'Ctrl', 'space', 'Shift', 'Caps Lock', 'up arrow', 'left arrow', 'down arrow', 'right arrow', 'Win', 'Alt'],
    isShiftPressed = false,
    isAltPressed = false,
    isCapsLock = false,
    currentLang = localStorage.getItem('lang') || 'en',
    listButtons = Array.from(document.querySelectorAll('[data-key-code]')),
    positionCursor = 0,
    keysLang = Object.entries(i18Obj[currentLang]),
    keyboard = document.createElement('div'),
    textArea = document.createElement('textarea');

textArea.className = 'text-area';
textArea.autofocus = true;
textArea.placeholder = 'Чтобы сменить язык нажмите Alt+Shift';
document.body.appendChild(textArea);

let createKeyboard = (lang) => {
    keyboard.innerHTML = '';
    let lineOne = document.createElement('div');
    lineOne.className = 'keyboard__line-one';
    createButtons(lineOne, 0, 14, lang);

    let lineTwo = document.createElement('div');
    lineTwo.className = 'keyboard__line-two';
    createButtons(lineTwo, 14, 29, lang);

    let lineThree = document.createElement('div');
    lineThree.className = 'keyboard__line-three';
    createButtons(lineThree, 29, 42, lang);

    let lineFour = document.createElement('div');
    lineFour.className = 'keyboard__line-four';
    createButtons(lineFour, 42, 55, lang);

    let lineFive = document.createElement('div');
    lineFive.className = 'keyboard__line-five';
    createButtons(lineFive, 55, 63, lang);

    keyboard.className = 'keyboard';
    keyboard.append(lineOne, lineTwo, lineThree, lineFour, lineFive);
    document.body.appendChild(keyboard);
    listButtons = Array.from(document.querySelectorAll('[data-key-code]'));
};

createKeyboard(keysLang);

let clickButton = (event, query) => {
    if (query === 'down') {
        event.classList.add('keyboard__button_press');
    }

    if (query === 'up') {
        event.classList.remove('keyboard__button_press');
    }
    textArea.selectionEnd = textArea.selectionStart = positionCursor;
    textArea.focus();

};

let clickButtonShift = (event, query) => {
    if (query === 'down') {
        listButtons.forEach(item => {
            if (item.classList.contains('double-button')) {
                item.lastChild.classList.add('hidden');
            }
            if (item.classList.contains('keyboard__button') &&
                !item.classList.contains('double-button') &&
                !item.classList.contains('special-button')) {
                item.textContent = item.textContent.toUpperCase();
            }
        });
    }

    if (query === 'up') {
        listButtons.forEach(item => {
            if (item.classList.contains('double-button')) {
                item.lastChild.classList.remove('hidden');
            }
            if (item.classList.contains('keyboard__button') &&
                !item.classList.contains('double-button') &&
                !item.classList.contains('special-button')) {
                item.textContent = item.textContent.toLowerCase();
            }
        });
    }
};

let clickButtonCapsLock = (event, query) => {
    if (query === 'down') {
        listButtons.forEach(item => {
            if (item.classList.contains('keyboard__button') &&
                !item.classList.contains('double-button') &&
                !item.classList.contains('special-button')) {
                item.textContent = item.textContent.toUpperCase();
            }
        });
    }

    if (query === 'up') {
        listButtons.forEach(item => {
            if (item.classList.contains('keyboard__button') &&
                !item.classList.contains('double-button') &&
                !item.classList.contains('special-button')) {
                item.textContent = item.textContent.toLowerCase();
            }
        });
    }
};

let inputTextToTextarea = (value) => {
    textArea.value = textArea.value.slice(0, positionCursor) + value + textArea.value.slice(positionCursor, textArea.value.length);
    positionCursor++;
};

let inputText = (event) => {
    if (event.classList.contains('button-down-arrow')) {
        inputTextToTextarea('↓');
        return;
    }

    if (event.classList.contains('button-up-arrow')) {
        inputTextToTextarea('↑');
        return;
    }

    if (event.classList.contains('special-button')) {
        return;
    }

    if (event.classList.contains('double-button')) {
        if (isShiftPressed) {
            inputTextToTextarea(event.firstChild.textContent);
        } else {
            inputTextToTextarea(event.lastChild.textContent);
        }
        return;
    }

    if (event.classList.contains('keyboard__button')) {
        inputTextToTextarea(event.textContent);
    }
};

let changeLang = (side) => {
    if (isAltPressed && isShiftPressed) {
        if (currentLang === 'en') {
            currentLang = 'ru';
            keysLang = Object.entries(i18Obj[currentLang]);
            createKeyboard(keysLang);
        } else {
            currentLang = 'en';
            keysLang = Object.entries(i18Obj[currentLang]);
            createKeyboard(keysLang);
        }

        listButtons.find(item => {
            if (+item.dataset.keyCode === 18) {
                clickButton(item, 'down');
                return true;
            }
        });

        if (side === 'right') {
            listButtons.reverse();
            listButtons.find(item => {
                if (+item.dataset.keyCode === 16) {
                    clickButton(item, 'down');
                    return true;
                }
            });
            listButtons.reverse();
            return;
        }

        listButtons.find(item => {
            if (+item.dataset.keyCode === 16) {
                clickButton(item, 'down');
                return true;
            }
        });
    }

    localStorage.setItem('lang', currentLang);
};

window.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.key === 'ArrowLeft') {
        if (positionCursor === 0) return;
        positionCursor--;
        textArea.selectionEnd = textArea.selectionStart = positionCursor;
    }

    if (event.key === 'ArrowRight') {
        if (positionCursor >= textArea.value.length) return;
        positionCursor++;
        textArea.selectionEnd = textArea.selectionStart = positionCursor;
    }

    if (event.key === 'Shift') {
        if (isCapsLock) {
            clickButtonShift(event.target, 'up');
        } else {
            clickButtonShift(event.target, 'down');
        }
        isShiftPressed = true;

        if (event.code === 'ShiftRight') {
            changeLang('right');
        } else {
            changeLang();
        }
    }

    if (event.key === 'Alt') {
        if (event.code === 'AltLeft') {
            isAltPressed = true;
            changeLang();
        }
    }

    if (event.code === 'AltRight' ||
        event.code === 'ControlRight' ||
        event.code === 'ShiftRight') {
        listButtons.reverse().find(item => {
            if (+item.dataset.keyCode === event.keyCode) {
                clickButton(item, 'down');
                inputText(item);
                return true;
            }
        });
        listButtons.reverse();
    } else {
        listButtons.find(item => {
            if (+item.dataset.keyCode === event.keyCode) {
                clickButton(item, 'down');
                inputText(item);
                return true;
            }
        });
    }

    if (event.key === 'Enter') {
        inputTextToTextarea('\r\n');
    }

    if (event.key === 'CapsLock') {
        isCapsLock = !isCapsLock;
        if (isCapsLock) {
            clickButtonCapsLock(event.target, 'down');
        } else {
            clickButtonCapsLock(event.target, 'up');
        }
    }

    //space
    if (event.keyCode === 32) {
        inputTextToTextarea(' ');
    }

    if (event.key === 'Tab') {
        inputTextToTextarea('  ');
        positionCursor++;
    }

    if (event.key === 'Delete') {
        if (positionCursor >= textArea.value.length) return;
        textArea.value = textArea.value.slice(0, positionCursor) + textArea.value.slice(positionCursor + 1, textArea.value.length);
    }

    if (event.key === 'Backspace') {
        if (positionCursor === 0) return;
        textArea.value = textArea.value.slice(0, positionCursor - 1) + textArea.value.slice(positionCursor, textArea.value.length);
        positionCursor--;
    }
});

window.addEventListener('keyup', (event) => {

    if (event.code === 'AltRight' ||
        event.code === 'ControlRight' ||
        event.code === 'ShiftRight') {
        listButtons.reverse().find(item => {
            if (+item.dataset.keyCode === event.keyCode) {
                clickButton(item, 'up');
                return true;
            }
        });
        listButtons.reverse();
    } else {
        listButtons.find(item => {
            if (+item.dataset.keyCode === event.keyCode) {
                clickButton(item, 'up');
                return true;
            }
        });
    }

    if (event.key === 'Shift') {
        if (isCapsLock) {
            clickButtonShift(event.target, 'down');
        } else {
            clickButtonShift(event.target, 'up');
        }
        isShiftPressed = false;
    }

    if (event.key === 'Alt') {
        clickButtonShift(event.target, 'up');
        isAltPressed = false;
    }
});

keyboard.addEventListener('mousedown', (event) => {
    if (!event.target.classList.contains('special-button')) {
        event.path.find(item => {
            if (item instanceof Element)
                if (item.classList.contains('double-button')) {
                    if (isShiftPressed) {
                        inputTextToTextarea(item.firstChild.textContent);
                    } else {
                        inputTextToTextarea(item.lastChild.textContent);
                    }
                    return true;
                } else if (item.classList.contains('keyboard__button')) {
                    inputTextToTextarea(event.target.textContent);
                    return true;
                }
        });
    }

    if (event.target.classList.contains('keyboard__button-sub')) {
        clickButton(event.target.parentNode, 'down');
        return;
    }

    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'down');

    if (event.target.classList.contains('button-shift')) {
        if (isCapsLock) {
            clickButtonShift(event.target, 'up');
        } else {
            clickButtonShift(event.target, 'down');
        }
        isShiftPressed = true;
        changeLang();
    }

    if (event.target.classList.contains('button-alt')) {
        isAltPressed = true;
        changeLang();
    }

    if (event.target.classList.contains('button-caps-lock')) {
        isCapsLock = !isCapsLock;
        if (isCapsLock) {
            clickButtonCapsLock(event.target, 'down');
        } else {
            clickButtonCapsLock(event.target, 'up');
        }
    }

    if (event.target.classList.contains('button-backspace')) {
        if (positionCursor === 0) return;
        textArea.value = textArea.value.slice(0, positionCursor - 1) + textArea.value.slice(positionCursor, textArea.value.length);
        positionCursor--;
    }

    if (event.target.classList.contains('button-enter')) {
        inputTextToTextarea('\r\n');
    }

    if (event.target.classList.contains('button-del')) {
        if (positionCursor >= textArea.value.length) return;
        textArea.value = textArea.value.slice(0, positionCursor) + textArea.value.slice(positionCursor + 1, textArea.value.length);
    }

    if (event.target.classList.contains('button-tab')) {
        inputTextToTextarea('  ');
        positionCursor++;
    }

    if (event.target.classList.contains('button-space')) {
        inputTextToTextarea(' ');
    }
});

keyboard.addEventListener('mouseup', (event) => {
    textArea.selectionEnd = textArea.selectionStart = positionCursor;

    if (event.target.classList.contains('keyboard__button-sub')) {
        clickButton(event.target.parentNode, 'up');
        return;
    }

    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'up');

    if (event.target.classList.contains('button-shift')) {
        if (isCapsLock) {
            clickButtonShift(event.target, 'down');
        } else {
            clickButtonShift(event.target, 'up');
        }
        isShiftPressed = false;
    }

    if (event.target.classList.contains('button-alt')) {
        isAltPressed = false;
    }

    if (event.target.classList.contains('button-left-arrow')) {
        if (positionCursor === 0) return;
        positionCursor--;
        textArea.selectionEnd = textArea.selectionStart = positionCursor;
    }
    if (event.target.classList.contains('button-right-arrow')) {
        if (positionCursor >= textArea.value.length) return;
        positionCursor++;
        textArea.selectionEnd = textArea.selectionStart = positionCursor;
    }
});





