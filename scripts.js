const boardModule = ( function() {
    let myBoard = ['x','x','x','o','o','o','x','x','x'];
    const boardDiv = document.querySelector('div#board');

    function generateBoard() {
        for (let i = 0;i < 9; i++) {
            let newDiv = document.createElement('div');
            let newP = document.createElement('p');
            newDiv.setAttribute('id',`gamePad${i}`);
            newP.setAttribute('id',`para${i}`)
            newDiv.classList.add('gamePad');
            newP.classList.add('gameText');
            newDiv.appendChild(newP)
            boardDiv.appendChild(newDiv)
        }
        console.log('Board Generated!')
    }

    function harvestPads() {
        const padArray = Array.from( document.querySelectorAll('div.gamePad') )
        const textArray =  Array.from( document.querySelectorAll('p.gameText') )

        setSymbols(textArray)

    }

    function setSymbols(array) {
        for (let i = 0; i < array.length ;i++) {
            array[i].textContent = myBoard[i];
        }

        console.log('Symbols placed!')

    }

    return {
        genBoard: generateBoard,
        symbols: harvestPads,    
    }

})();

const playerModule = ( () => {
    function playerFactory(name = 'Player', marker = 'x', gender = 'Apache', age = '?') {
        return {
            name: name,
            mark: marker,
            gender: gender,
            age: age,
        }
    }
})();


boardModule.genBoard();
boardModule.symbols();