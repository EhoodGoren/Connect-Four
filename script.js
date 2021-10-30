class Model {
    constructor(){
        this.boardCells = Array(49).fill();
        this.currentPlayer = '🔴';
    }

    play(index) {
        if(this.boardCells[index] !== undefined) return 'taken';
        this.boardCells[index] = this.currentPlayer;
        // Check tie
        // console.log(this.checkDraw());
        if(this.checkDraw()) console.log("It's a draw");
        // Check win
        if(this.checkWin(this.currentPlayer)) console.log("It's a win");

        const playerBeforeSwitch = this.currentPlayer;
        this.switchPlayer();
        return playerBeforeSwitch;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === '🔴' ? '🟡' : '🔴';
    }

    checkDraw() {
        return this.boardCells.every(cell => cell !== undefined);
    }

    checkWin(player) {
        const playerCells = this.getPlayerCells(player);
        console.log(playerCells)
        // playerCells now holds all index of the player in the board
        playerCells.forEach
    }

    getPlayerCells(player) {
        const playerCells = [];
        this.boardCells.forEach((cell, index) => {
            if(cell === player){
                playerCells.push(index);
            }
        });
        return playerCells;
    }
}

class View {
    constructor(){
        this.board;
    }

    render() {
        // const board = document.createElement('div');
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
    }
    /* Adds a listener to every cell so that when it is clicked, it updates the Model, and displays the 
     * player's move on the board display (with player data from the Model).
     */
    cellClicked(handler) {
        const cells = [...document.querySelectorAll('.cell')];
        cells.map((cell, index) => {
                cell.addEventListener('click', () => {
                    const player = handler(index); // Updates model array and returns current player
                    if(player === 'taken') return;
                    cells[index].innerText = player;
                })
        });
    }

    draw() {

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
    }
}

const connectFour = new Controller();
connectFour.start();
