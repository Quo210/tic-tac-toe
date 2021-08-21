const boardModule = ( function() {
    let myBoard = ['','','','','','','','',''];
    const boardDiv = document.querySelector('div#board'); 
    const winCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    let currentSymbol = '';
    let playsCounter = 0;
    let roundfinished = false;
    
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
        playsCounter = 0;
        counterHandler();
        currentSymbol = '';
        turnInformer();
        grantDrawListeners()
    }

    function drawOnBoard() {
        if (roundfinished === true) {
            reset()
            roundfinished = false;
        }
        const x = symbolSelection();
        const that = this.firstChild;
        const index = obtainID(that)
        that.textContent = x;
        myBoard[index] = x;

        playsCounter++
        counterHandler()
        turnInformer()
        this.removeEventListener('click',drawOnBoard)

        if(playsCounter >= 5) {
            look4Winner()
        } 
        
        if (playsCounter >= 9) {
            setTimeout(() => {
                alert('Draw!'), reset()},200)
        }

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

    function removeDrawListeners() {
        const myPads = currentDivs();
        myPads.forEach(element => {
            element.removeEventListener('click',drawOnBoard)
            element.addEventListener('click',drawOnBoard)
        })
    }

    function look4Winner(){
        let winnerSymbol;

        for (let array of winCondition) {
            const check = exploreBoard(array)
            if (check === true) {
                let board = seeBoardArray();
                winnerSymbol = board[array[0]];
                setTimeout(() => {alert(`${winnerSymbol} is the winner!`)},200)
                removeDrawListeners()
                playerModule.score(winnerSymbol)
                roundfinished = true;
            } else { continue }
        }
        
    }

    function exploreBoard(sequence){
        const first = sequence[0];
        const second = sequence [1];
        const third = sequence[2];
        const board = seeBoardArray();
        
        if (board[first] === '') {
            return
        }

        if (board[first] === board[second] && board[first] === board[third]) {
            return true
        } else {
            return false
        }
    }

    function counterHandler(){
        const counter = document.querySelector('div#counter');
        counter.textContent = `Plays: ${playsCounter}`;
    }

    function turnInformer(){
        const turn = document.querySelector('div#turn');
        const nextTurn = (currentSymbol === 'X')? 'O':'X'; 
        turn.textContent = `Next Play: ${nextTurn}`
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

const playerModule = ( () => {
    let crossPlayer;
    let circlePlayer;
    let xScore = 0;
    let oScore = 0;
    
    function playerFactory(name,mark) {
        return {
            name: name,
            symbol: mark,
            score: 0,
        }
    };

    function createPlayer(){
        const input = this.previousSibling.previousSibling.previousSibling.previousSibling;
        const parent = input.parentElement;
        let userName = input.value;
        let userMark;
       
        
        let provisionalName = () => {
            return (crossPlayer === undefined)? 
            '"X" Player':
            '"O" Player';
        }

        if(userName == '') { userName = provisionalName()}


        if (crossPlayer == undefined) {
            userMark = 'X'
            crossPlayer = playerFactory(userName,userMark);
            console.log(crossPlayer)
        } else {
            userMark = 'O'
            circlePlayer = playerFactory(userName,userMark)
            console.log(circlePlayer)
        }


        let newName = document.createElement('p');
        newName.classList.add('username')
        newName.textContent = userName; 
        input.after(newName)
        parent.removeChild(newName.previousSibling)
        parent.removeChild(newName.nextSibling);
        parent.removeChild(newName.nextSibling)
        parent.removeChild(newName.nextSibling)
        parent.removeChild(newName.nextSibling)

        playerFactory(userName,userMark)
        this.disabled = true;
    }
    
    function scoreHandler(winner) {
        const player1Score = document.querySelector('label#score1')
        const player2Score = document.querySelector('label#score2')
        
        let assignResultNReturn = () => {
            if (winner === 'X') {
                xScore++
                return xScore;
            } else if (winner === 'O'){
                oScore++
                return oScore
            }
        }

        let template = `Wins: ${assignResultNReturn()}`;

        if (winner === 'X') {
            player1Score.textContent = template;
        } else if (winner === 'O') {
            player2Score.textContent = template;
        } else {

        }

    }

    function reset() {
        if (xScore === 0 && oScore === 0) {
            return
        }
        xScore = 0;
        oScore = 0;
        const player1Score = document.querySelector('label#score1')
        const player2Score = document.querySelector('label#score2')
        player1Score.textContent = 'Wins: 0';
        player2Score.textContent = 'Wins: 0';
        boardModule.reset()
        alert('Scores reset!')
    }

    return {
        add: createPlayer,
        score: scoreHandler,
        reset: reset,
    }

})();

const buttonsModule = ( () => {

    function resetBTN() {
        const btn = document.querySelector('button#reset');
        btn.addEventListener('click', playerModule.reset)
    }

    function createPlayersBTN() {
        const playerButtons = Array.from( document.querySelectorAll('div.player > button') )
        for (let element of playerButtons) {
            element.addEventListener('click',playerModule.add)
        }

    }

    function globalListenerSetter() {
        resetBTN()
        createPlayersBTN()
    }

    return {
        listen: globalListenerSetter,
    }
})();


boardModule.genBoard();
boardModule.symbols();
boardModule.listen();
buttonsModule.listen();