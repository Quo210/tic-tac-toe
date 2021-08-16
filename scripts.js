const boardModule = ( function() {
    let myBoard = ['x','x','x','o','o','o','x','x','x'];
    const boardDiv = document.querySelector('div#board'); 
    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,3,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function generateBoard() {
        for (let i = 0;i < 9; i++) {
            let newDiv = document.createElement('div');
            let newP = document.createElement('p');
            newDiv.setAttribute('id',`gamePad${i}`);
            newP.setAttribute('id',`para${i}`)
            newDiv.classList.add('gamePad');
            newP.classList.add('gameText');
            newDiv.addEventListener('click',drawOnBoard)
            newDiv.appendChild(newP)
            boardDiv.appendChild(newDiv)
        }
        console.log('Board Generated!')
    }

    function currentTexts() {
        const textArray =  Array.from( document.querySelectorAll('p.gameText') )
        return textArray;
    }

    function currentDivs() {
        const padArray = Array.from( document.querySelectorAll('div.gamePad') )
    }

    function setSymbols() {
        const array = currentTexts();
        for (let i = 0; i < array.length ;i++) {
            array[i].textContent = myBoard[i];
        }
    }

    function reset() {
        let emptyArr = myBoard.map(index => {
            return index = '';
        })
        myBoard = emptyArr;
        setSymbols()
        playerModule.reset()
    }

    function drawOnBoard() {
        const x = 'x';
        const that = this.firstChild;
        const index = obtainID(that)
        that.textContent = x;
        myBoard[index] = x;
        playerModule.store(index);
    }

    function obtainID(that) {
        const para = that;
        let source = para.getAttribute('id');
        source = parseInt( source.substr(source.length-1,1) )
        console.log(source)
        return source; 
    }

    function seeBoardArray() {
        return myBoard
    }

    return {
        genBoard: generateBoard,
        symbols: setSymbols,
        reset: reset,
        check: seeBoardArray,    
    }

})();

const playerModule = ( () => {
    let played = [];
    
    function playerFactory(name = 'Player', marker = 'x', gender = 'Apache', age = '?') {
        return {
            name: name,
            mark: marker,
            gender: gender,
            age: age,
        }
    }

    function storePlays(numb) {
        played.push(numb)
        console.log(played)
    }

    function resetPlayer() {
        while (played.length != 0) {
            played.pop()
        }
        console.log(played)
    } 


    return {
        store: storePlays,
        reset: resetPlayer,
    }

})();

const buttonsModule = ( () => {

    function resetBTN() {
        const btn = document.querySelector('button#reset');
        btn.addEventListener('click', boardModule.reset)
    }

    return {
        reset: resetBTN,
    }
})();


boardModule.genBoard();
boardModule.symbols();
buttonsModule.reset();