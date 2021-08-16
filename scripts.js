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
    let currentSymbol = '';
    
    function symbolSelection() {
        return (currentSymbol == 'X')?
        currentSymbol = 'O':
        currentSymbol = 'X';
    }

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

    function currentTexts() {
        return Array.from( document.querySelectorAll('p.gameText') )
        
    }

    function currentDivs() {
        return Array.from( document.querySelectorAll('div.gamePad') )
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
        playModule.reset()
        grantDrawListeners()
    }

    function drawOnBoard() {
        const x = symbolSelection();
        const that = this.firstChild;
        const index = obtainID(that)
        that.textContent = x;
        myBoard[index] = x;

        if (x == 'X') {
            playModule.store(index,playModule.player())
        } else {
            playModule.store(index,playModule.computer())
        };

        this.removeEventListener('click',drawOnBoard)
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

    function grantDrawListeners() {
        const myPads = currentDivs();
        myPads.forEach(element => {
            element.addEventListener('click',drawOnBoard)
        })
    }

    function look4Winner(){
        
    }

    return {
        genBoard: generateBoard,
        symbols: setSymbols,
        reset: reset,
        check: seeBoardArray,
        listen: grantDrawListeners,
        test: look4Winner,
    }

})();

const playModule = ( () => {
    let playerScore = [];
    let computerScore = [];
    
    function playerFactory(name = 'Player', marker = 'x', gender = 'Apache', age = '?') {
        return {
            name: name,
            mark: marker,
            gender: gender,
            age: age,
        }
    }

    function storePlays(numb,target) {
        let whoPlayed = target;
        whoPlayed.push(numb)
        console.log(whoPlayed)
    }

    function resetScores() {
        while (playerScore.length != 0 || computerScore.length != 0) {
            playerScore.pop()
            computerScore.pop()
        }
        console.log(playerScore,computerScore)
    } 

    function checkCompScore(){
        return computerScore;
    }

    function checkPlayerScore(){
        return playerScore;
    }


    return {
        store: storePlays,
        reset: resetScores,
        player: checkPlayerScore,
        computer: checkCompScore,

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
boardModule.listen();
buttonsModule.reset();