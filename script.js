class Model {
    constructor(){
        this.boardCells = Array(49).fill();
        this.currentPlayer = 'X';
    }

    play(index) {
        this.boardCells[index] = this.currentPlayer;
        const playerBeforeSwitch = this.currentPlayer;
        this.switchPlayer();
        return playerBeforeSwitch;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
}

class View {
    constructor(){
        this.board;
    }

    render() {
        // const board = document.createElement('div');
        this.board = document.createElement('div');
        this.board.setAttribute('id','board');

        const boardCells = Array(49).fill().map((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // cell.addEventListener('click', () => {})

            this.board.appendChild(cell);
        });
        
        document.body.appendChild(this.board);
    }

    cellClicked(handler) {
        const cells = [...document.querySelectorAll('.cell')];
        cells.map((cell, index) => {
                cell.addEventListener('click', () => {
                    const player = handler(index); // Updates model array and returns current player
                    cells[index].innerText = player;
                })
        });
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
