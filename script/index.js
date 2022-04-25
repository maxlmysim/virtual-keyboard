import i18Obj from './key.js';

function createButtons(line, from, to, keyList, specialButton = specialButtonList) {
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
}

let specialButtonList = ['backspace', 'tab', 'ENTER', 'DEL', 'Ctrl', 'space', 'Shift', 'Caps Lock', 'up arrow', 'left arrow', 'down arrow', 'right arrow', 'Win', 'Alt'];

let isShiftPressed = false;
let isAltPressed = false;
let isCapsLock = false;
let currentLang = 'en';
let listButtons = Array.from(document.querySelectorAll('[data-key-code]'));

let keysEn = Object.entries(i18Obj.en);
let keysRu = Object.entries(i18Obj.ru);
let keyboard = document.createElement('div');

function createKeyboard(lang) {
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
    createButtons(lineFive, 55, 64, lang);

    keyboard.className = 'keyboard';
    keyboard.append(lineOne, lineTwo, lineThree, lineFour, lineFive);
    document.body.innerHTML = '';
    document.body.appendChild(keyboard);
    listButtons = Array.from(document.querySelectorAll('[data-key-code]'));
}

createKeyboard(keysRu);


function clickButton(event, query) {
    if (query === 'down') {
        event.classList.add('keyboard__button_press');
    }

    if (query === 'up') {
        event.classList.remove('keyboard__button_press');
    }
}

function clickButtonShift(event, query) {
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
}

function clickButtonCapsLock(event, query) {
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
}


window.addEventListener('keydown', function (event) {

    listButtons.find(item => {
        if (+item.dataset.keyCode === event.keyCode) {
            clickButton(item, 'down');
            return true;
        }
    });

    if (event.getModifierState('Alt') && event.getModifierState('Shift')) {
        if (currentLang === 'en') {
            currentLang = 'ru';
            createKeyboard(keysRu);

        } else {
            currentLang = 'en';
            createKeyboard(keysEn);
        }

        listButtons.find(item => {
            if (+item.dataset.keyCode === 16) {
                clickButton(item, 'down');
                return true;
            }
        });

        listButtons.find(item => {
            if (+item.dataset.keyCode === 18) {
                clickButton(item, 'down');
                return true;
            }
        });
    }

    if (event.key === 'Shift') {
        clickButtonShift(event.target, 'down');
    }

    if (event.key === 'CapsLock') {
        isCapsLock = !isCapsLock;
        if (isCapsLock) {
            clickButtonCapsLock(event.target, 'down');
        } else {
            clickButtonCapsLock(event.target, 'up');
        }
    }

    if (event.keyCode === 9 || event.keyCode === 18) {
        event.preventDefault();
    }


});

window.addEventListener('keyup', function (event) {
    listButtons.find(item => {
        if (+item.dataset.keyCode === event.keyCode) {
            clickButton(item, 'up');
            return true;
        }
    });

    if (event.key === 'Shift') {
        clickButtonShift(event.target, 'up');
    }

});

keyboard.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('keyboard__button-sub')) {
        clickButton(event.target.parentNode, 'down');
        return;
    }


    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'down');
});

keyboard.addEventListener('mouseup', function (event) {
    if (event.target.classList.contains('keyboard__button-sub')) {
        clickButton(event.target.parentNode, 'up');
        return;
    }


    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'up');
});



