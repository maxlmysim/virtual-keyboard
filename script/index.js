import i18Obj from './key.js';

function createButton(line, from, to, keyList, specialButton = specialButtonList) {
    for (let i = from; i < to; i++) {
        let button = document.createElement('div');
        button.className = 'keyboard_button';

        if (specialButton.includes(keyList[i][0].trim())) {
            button.classList.add(`button-${keyList[i][0].trim().split(' ').join('-').toLowerCase()}`);
            button.classList.add('special-button');
            button.textContent = keyList[i][0];
            line.append(button);
            continue;
        }
        button.setAttribute('key-code', `${keyList[i][1]}`);
        if (keyList[i][0].split(' ').length === 2) {
            let subBut1 = document.createElement('div');
            subBut1.className = 'keyboard_button-sub1';
            subBut1.textContent = keyList[i][0].split(' ')[1];

            let subBut2 = document.createElement('div');
            subBut2.className = 'keyboard_button-sub2';
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
lineOne.className = 'keyboard_line-one';
createButton(lineOne, 0, 14, keysEn);

let lineTwo = document.createElement('div');
lineTwo.className = 'keyboard_line-two';
createButton(lineTwo, 14, 29, keysEn);

let lineThree = document.createElement('div');
lineThree.className = 'keyboard_line-three';
createButton(lineThree, 29, 42, keysEn);

let lineFour = document.createElement('div');
lineFour.className = 'keyboard_line-four';
createButton(lineFour, 42, 55, keysEn);


let lineFive = document.createElement('div');
lineFive.className = 'keyboard_line-five';
createButton(lineFive, 55, 64, keysEn);

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
keyboard.append(lineOne, lineTwo, lineThree, lineFour, lineFive);
document.body.appendChild(keyboard);








