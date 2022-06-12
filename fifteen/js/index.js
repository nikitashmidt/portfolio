const containerNode = document.getElementById('fifteen'),
    itemNodes = Array.from(containerNode.querySelectorAll('.fifteen__item')),
    countItems = 16,
    shuffle = document.getElementById('shuffle'),
    fifteenWin = document.querySelector('.fifteen__win'),
    fifteenOverlay = document.querySelector('.fifteen__overlay');

if (itemNodes.length !== 16) { 
    throw new Error(`Должно быть ровно ${countItems} items in HTML`);
}
itemNodes[countItems - 1].style.display = 'none';
let matrix = getMatrix(
    itemNodes.map(item => Number(item.dataset.matrixId))
)
setPositionItems(matrix);

// 3. Change position by click
const blankNumber = 16;
containerNode.addEventListener('click', (e) => {
    const buttonNode = e.target.closest('button');
    if (!buttonNode) return;
    const buttonNumber = Number(buttonNode.dataset.matrixId);
    const buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const isValid = isValidForSwap(buttonCoords, blankCoords);
    if (isValid) {
        swap(blankCoords, buttonCoords, matrix)
        setPositionItems(matrix)
    }
})
// 4. Change position by keydown
window.addEventListener('keydown', (e) => {
    if (!e.key.includes('Arrow')) return;
    const blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    const buttonCoords = {
        x: blankCoords.x,
        y: blankCoords.y,
    }
    const direction = e.key.split('Arrow')[1].toLowerCase();
    const maxIndexMatrix = matrix.length;
    switch (direction) {
        case 'up':
            buttonCoords.x += 1;
            break;
        case 'down':
            buttonCoords.x -= 1;
        break;
        case 'left':
            buttonCoords.y += 1;
        break;
        case 'right':
            buttonCoords.y -= 1;
            break;
    }
    if (buttonCoords.y >= maxIndexMatrix || buttonCoords.y < 0 || 
        buttonCoords.x >= maxIndexMatrix || buttonCoords.x < 0 ) { 
        return;
    }
    swap(blankCoords, buttonCoords, matrix)
    setPositionItems(matrix)
})
// 5. Show won

shuffle.addEventListener('click', () => {
    const shuffledArray = shuffleArray(matrix.flat())
    matrix = getMatrix(shuffledArray)
    setPositionItems(matrix);
})
function getMatrix(arr) {
    const matrix = [[], [], [], []];
    let y = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) { 
        if (x >= 4) { 
            y++;
            x = 0;
        }
        matrix[y][x] = arr[i]
        x++;
    }
    return matrix;
}
function setPositionItems(matrix) {
    for (let y = 0; y < matrix.length; y++) { 
        for (let x = 0; x < matrix[y].length; x++) { 
            const value = matrix[x][y];
            const node = itemNodes[value - 1];
            setNodeStyles(node, x,y)
        }
    }
}
function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value)
}
function setNodeStyles(node,x,y) {
    const shiftPs = 100;
    node.style.transform = `translate3D(${x * shiftPs}%, ${y * shiftPs}%, 0)`;
}
function findCoordinatesByNumber(number, matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === number) { 
                return { x, y };
            }
        }
    }
    return null;
}
function isValidForSwap(buttonCoords, blankCoords) {
    const diffX = Math.abs(buttonCoords.x - blankCoords.x)
    const diffY = Math.abs(buttonCoords.y - blankCoords.y)
    return (diffX === 1 || diffY === 1) && (buttonCoords.x === blankCoords.x || buttonCoords.y === blankCoords.y)
}
function swap(buttonCoords, blankCoords, matrix) {
    const blankNumber = matrix[buttonCoords.y][buttonCoords.x]
    matrix[buttonCoords.y][buttonCoords.x] = matrix[blankCoords.y][blankCoords.x];
    matrix[blankCoords.y][blankCoords.x] = blankNumber;
    if (isWon(matrix)) { 
        addWonClass()
    }
}
const winFlatArr = new Array(16).fill(0).map((_item, i) => i + 1);

function isWon(matrix) { 
    const flatMatrix = matrix.flat();
    for (let i = 0; i < winFlatArr.length; i++) { 
        if (flatMatrix[i] !== winFlatArr[i]) { 
            return false;
        }
    }
    return true;
}
function addWonClass() { 
    fifteenWin.classList.add('fifteen__win-active')
    fifteenOverlay.classList.add('fifteen__overlay-active')
}

fifteenOverlay.addEventListener('click', (e) => {
    if (e.target === fifteenOverlay) {
        fifteenWin.classList.remove('fifteen__win-active')
        fifteenOverlay.classList.remove('fifteen__overlay-active')
    }
})
