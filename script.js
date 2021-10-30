class Model {
    constructor(){
        this.boardCells = Array(49).fill();
        this.currentPlayer = '🔴';
        this.winEventHandler;
        this.drawEventHandler;
    }

    play(index) {
        if(this.boardCells[index] !== undefined) return 'taken';

        let cellToDropIndex = 48 - (6 - index % 7);
        while(this.boardCells[cellToDropIndex] !== undefined){
            if(cellToDropIndex > 48) return 'taken';
            cellToDropIndex = cellToDropIndex - 7;
        }
        this.boardCells[cellToDropIndex] = this.currentPlayer;
        // Check tie
        if(this.checkDraw()) this.draw();
        // Check win
        if(this.checkWin(this.currentPlayer)) this.win(this.currentPlayer)

        const playerBeforeSwitch = this.currentPlayer;
        this.switchPlayer();
        return {cell: cellToDropIndex, player: playerBeforeSwitch};
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === '🔴' ? '🟡' : '🔴';
    }

    checkDraw() {
        return this.boardCells.every(cell => cell !== undefined);
    }

    checkWin(player) {
        const playerCells = this.getPlayerCells(player);
        // const playerCells = this.boardCells.filter((cell,index) => cell === player);
        // playerCells now holds all index of the player's discs in the board
        for(let cellIndex of playerCells){
            const testRight = this.checkSequence('+1', cellIndex, player) // Right
            if(testRight){
                return true;
                // break;
            }
            const testDown = this.checkSequence('+7', cellIndex, player) // Down
            if(testDown){
                return true;
                // break;
            }
            const testRightDown = this.checkSequence('+8', cellIndex, player) // Right Down
            if(testRightDown){
                return true;
                // break;
            }
            const testRightUp = this.checkSequence('-6', cellIndex, player) // Right Up
            if(testRightUp){
                return true;
                // break;
            }
        }
    }

    checkSequence(direction, cellIndex, player, sequence = 1) {
        if(sequence === 4) return true;
        if(this.checkEdge(direction, cellIndex)) return false;
        const checkCellIndex = cellIndex + Number(direction);
        const checkCell = this.boardCells[checkCellIndex];
        if(checkCell !== player){
                return false;
        }
        sequence++;
        return this.checkSequence(direction, checkCellIndex, player, sequence);
    }

    checkEdge(direction, cellIndex) {
        switch (direction) {
            case '+1':
                return (cellIndex - 6) % 7 === 0 ? true : false;
                break;
            case '+7':
                return Math.floor(cellIndex / 7) === 6 ? true : false;
                break;
            case '+8':
                return (cellIndex - 6) % 7 === 0 || Math.floor(cellIndex / 7) === 6 ? true : false;
                break;
            case '-6':
                return (cellIndex - 6) % 7 === 0 || cellIndex < 7 ? true : false;
                break
            default:
                return false
                break;
        }
    }

    getPlayerCells(player) {
        // Replace whole function with filter?
        const playerCells = [];
        this.boardCells.forEach((cell, index) => {
            if(cell === player){
                playerCells.push(index);
            }
        });
        return playerCells;
    }

    win(winner) {
        this.winEventHandler(winner);
    }
    draw() {
        this.drawEventHandler();
    }
}

class View {
    constructor(){
        this.board;
    }

    render() {
        // Board setup
        this.board = document.createElement('div');
        this.board.setAttribute('id','board');

        // Fills the board with cells
        const boardCells = Array(49).fill().map((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // cell.addEventListener('click', () => {})

            this.board.appendChild(cell);
        });
        
        document.body.appendChild(this.board);

        const resultMessage = document.createElement('div');
        resultMessage.setAttribute('id','result');
        document.body.appendChild(resultMessage);
    }
    /* Adds a listener to every cell so that when it is clicked, it updates the Model, and displays the 
     * player's move on the board display (with player data from the Model).
     */
    cellClicked(handler) {
        const cells = [...document.querySelectorAll('.cell')];
        cells.map((cell, index) => {
                cell.addEventListener('click', () => {
                    const discData = handler(index);
                    if(discData === 'taken') return;
                    cells[discData.cell].innerText = discData.player;
                })
        });
    }

    displayWin(winner) {
        document.querySelector('#result').innerText = `${winner} won!`;
        setTimeout(()=>{
            alert(`${winner} Won!`);
        }, 100);
    }
    displayDraw() {
        document.querySelector('#result').innerText = `It's a draw!`;
        setTimeout(()=>{
            alert('Draw!');
        }, 100);
    }
}

class Controller {
    constructor(){
        this.model = new Model();
        this.view = new View();
    }
    
    start() {
        this.view.render();
        this.view.cellClicked((index)=>{ return this.model.play(index)});
        this.model.winEventHandler = this.view.displayWin;
        this.model.drawEventHandler = this.view.displayDraw;
    }
}

const connectFour = new Controller();
connectFour.start();
