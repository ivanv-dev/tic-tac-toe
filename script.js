const Gameboard = (() => {
const gameboard = [null, null, null, null, null, null, null, null, null];

const clear = () => {
for (let index = 0; index < gameboard.length; index++) {
    gameboard[index] = null;
}
}
const status = {
    win: 'WIN',
    draw: 'DRAW'
}

const isEveryFieldFilled = () => {
    return gameboard.filter( sign => sign === null).length === 0
}
const checkHorizontal = () => {
    if(gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[1] !== null) return true;
    else if(gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[4] !== null) return true;
    else if(gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[7] !== null) return true;
    return false;
}

const checkVertical = () => {
    if(gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[3] != null) return true;
    else if(gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[4] != null) return true;
    else if(gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[5] != null) return true;
    return false;
}

const checkDiagonal = () => {
    if(gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[4] != null) return true;
    else if(gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[4] != null) return true;
    return false;
}

const getCurrentOutcome = () => {
    if(checkHorizontal() || checkVertical() || checkDiagonal())  return status.win;
    else if(isEveryFieldFilled()) return status.draw;
    return null;
}

const play = (position, player) => {

    position = position - 1;
    if(gameboard[position] === null) {
        gameboard[position] = player.sign;
        console.log(gameboard, player, player.getScore())
        console.log(getCurrentOutcome(), 'hmm')

        if(getCurrentOutcome() === 'WIN') {
            player.incrementScore();
            console.log(gameboard, player, player.getScore())
            clear()
            return `${player.username} won this party!`

    }
        else if(getCurrentOutcome() === 'DRAW'){
            clear()
            return `${player.username} played last party in this draw match!`}
    }
    else throw Error('Cannot fill already filled tic tac toe field.');
} 

return {play}
})();

const Player = (username, sign) => {
    let score = 0;
    const incrementScore = () => {score++;};
    const getScore = () => score;

    return {username, sign, incrementScore, getScore};
};

const firstPlayer = Player('mike97', null);
const secondPlayer = Player('joe97', null);


const DOMController = (() => {

    const firstPlayerSignChoice = document.querySelector('.first-player-sign');
    const secondPlayerSignChoice = document.querySelector('.second-player-sign');

    const cells = document.querySelectorAll('.cell');
    const firstPlayerSigns = document.querySelectorAll('.signs .sign');
    const gameboard = document.querySelector('.gameboard');
    const firstDescription = document.querySelector('.first p')
    const secondDescription = document.querySelector('.second p');
    const winMessage = document.querySelector('.winMessage')


    chooseSign = (player) => {

    }

    const clearCells = () => {
        cells.forEach(cell => {
            cell.textContent = ''
        })
    }
    const initiateCellsListener = () => {
        let player = firstPlayer;
        cells.forEach(cell => {
            cell.addEventListener('click', e => {
                if(e.target.textContent == ''){
                e.target.textContent = `${player.sign}`;
               let textMessage =  Gameboard.play(Number(e.target.id), player);
               console.log(textMessage, 'aaa')
               winMessage.textContent = textMessage
               if(textMessage !== null && textMessage !== undefined) clearCells();

                }
                if(player.username === firstPlayer.username) player = secondPlayer;
                else player = firstPlayer;
            })
        })
    }

    const setPlayerSign = () => {
        firstPlayerSigns.forEach(sign => {
            sign.addEventListener('click', e => {
                if(firstPlayer.sign === null){firstPlayer.sign =  e.target.textContent.toLowerCase();
                    if(firstPlayer.sign === 'x') secondPlayer.sign = 'o'
                    else secondPlayer.sign = 'x'
                    firstDescription.textContent = `${firstPlayer.username} is ${firstPlayer.sign}`
                    secondDescription.textContent = `${secondPlayer.username} is ${secondPlayer.sign}`

                }
                if(firstPlayer.sign !== null && secondPlayer.sign !== null) gameboard.style.display = 'grid';

            })
        })
    }
return {initiateCellsListener, setPlayerSign};
})();








DOMController.setPlayerSign();
DOMController.initiateCellsListener();
