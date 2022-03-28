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
            subBut1.textContent = keyList[i][0].split(' ')[1];

            let subBut2 = document.createElement('div');
            subBut2.className = 'keyboard__button-sub2';
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

let keysEn = Object.entries(i18Obj.en);

let lineOne = document.createElement('div');
lineOne.className = 'keyboard__line-one';
createButtons(lineOne, 0, 14, keysEn);

let lineTwo = document.createElement('div');
lineTwo.className = 'keyboard__line-two';
createButtons(lineTwo, 14, 29, keysEn);

let lineThree = document.createElement('div');
lineThree.className = 'keyboard__line-three';
createButtons(lineThree, 29, 42, keysEn);

let lineFour = document.createElement('div');
lineFour.className = 'keyboard__line-four';
createButtons(lineFour, 42, 55, keysEn);


let lineFive = document.createElement('div');
lineFive.className = 'keyboard__line-five';
createButtons(lineFive, 55, 64, keysEn);

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
keyboard.append(lineOne, lineTwo, lineThree, lineFour, lineFive);
document.body.appendChild(keyboard);


let isShiftPressed = false;
let isAltPressed = false;
let isCapsLock = false;
let listButtons = Array.from(document.querySelectorAll('[data-key-code]'));

function clickButton(event, query) {
    if(query === 'down') {
        event.classList.add('keyboard__button_press');
    }

    if(query === 'up') {
        event.classList.remove('keyboard__button_press');
    }
}

window.addEventListener('keydown', function (event) {
    listButtons.find(item => {
        if (+item.dataset.keyCode === event.keyCode) {

            clickButton(item, 'down')
            return true;
        }
    });
});

window.addEventListener('keyup', function (event) {
    listButtons.find(item => {
        if (+item.dataset.keyCode === event.keyCode) {
            clickButton(item, 'up')
            return true;
        }
    });
});

keyboard.addEventListener('mousedown', function (event) {
    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'down');
});

keyboard.addEventListener('mouseup', function (event) {
    if (!event.target.classList.contains('keyboard__button')) return;
    clickButton(event.target, 'up');
});

console.log(document.querySelector('.keyboard__button').classList);

