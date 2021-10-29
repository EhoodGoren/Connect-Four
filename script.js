class Model {
    constructor(){
        this.boardCells = Array(49).fill();
    }

    play(index) {
        this.boardCells[index] = 'X';
    }

}

class View {
    constructor(){
    }

    render() {
        const board = document.createElement('div');
        board.setAttribute('id','board');

        const boardCells = Array(49).fill().map((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            // cell.addEventListener('click', () => {})

            board.appendChild(cell);
        });
        
        document.body.appendChild(board);
    }

    cellClicked(handler) {
        const cells = [...document.querySelectorAll('.cell')];
        cells.map((cell, index) => {
                cell.addEventListener('click', () => {
                    handler(index);
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
        this.view.cellClicked((index)=>{this.model.play(index)});
    }
}

const connectFour = new Controller();
connectFour.start();
