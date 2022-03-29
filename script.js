const Gameboard = (() => {
const gameboard = ['x', null, null, null, null, null, null, null, null];

const status = {
    win: 'WIN',
    draw: 'DRAW'
}

const isEveryFieldFilled = () => {
    return gameboard.filter( sign => sign === null).length > 0
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
}

const play = (position, player) => {

    position = position - 1;
    if(gameboard[position] === null) {
        gameboard[position] = player.sign;
        console.log(gameboard, player, player.getScore())

        if(getCurrentOutcome() === 'WIN') {
            player.incrementScore();
            console.log(gameboard, player, player.getScore())
            console.log(`${player.username} won this party!`);
    }
        else if(getCurrentOutcome() === 'DRAW') `${player.username} played last party in this draw match!`
    }
    else throw Error('Cannot fill already filled tic tac toe field.');
} 

return {play}
})();


const DOMController = (() => {

    const firstPlayerSignChoice = document.querySelector('.first-player-sign');
    const secondPlayerSignChoice = document.querySelector('.second-player-sign');

    const cells = document.querySelectorAll('.cell');
    const firstPlayerSigns = document.querySelectorAll('.first .signs .sign');

    chooseSign = (player) => {

    }

    const initiateCellsListener = (player) => {
        cells.forEach(cell => {
            cell.addEventListener('click', e => {
                if(e.target.textContent == ''){
                e.target.textContent = `${player.sign}`;
                }
            })
        })
    }

    const setFirstPlayerSigns = (player) => {
        firstPlayerSigns.forEach(sign => {
            sign.addEventListener('click', e => {
                console.log(e.target.textContent)
                player.sign = e.target.textContent;
                console.log(player)
            })
        })
    }
return {initiateCellsListener, setFirstPlayerSigns};
})();




const Player = (username, sign) => {
    let score = 0;
    const incrementScore = () => {score++;};
    const getScore = () => score;

    return {username, sign, incrementScore, getScore};
};


const mike = Player('mike97', 'x');
Gameboard.play(2, mike);
Gameboard.play(3, mike);
DOMController.setFirstPlayerSigns(mike);
DOMController.initiateCellsListener(mike);
