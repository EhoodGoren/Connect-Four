class Model {
    constructor(){
        this.boardCells = Array(49).fill();
        // this.boardCells = Array(7).fill(Array(7).fill());
        this.currentPlayer = '🔴';
    }

    play(index) {
        if(this.boardCells[index] !== undefined) return 'taken';

        let cellToDropIndex = 48 - (6 - index % 7);
        while(this.boardCells[cellToDropIndex] !== undefined){
            if(cellToDropIndex > 48) return 'taken';
            cellToDropIndex = cellToDropIndex - 7;
        }
        this.boardCells[cellToDropIndex] = this.currentPlayer;
        // const _2DIndex = this.indexTo2D(index);
        // If the click was on a taken cell, it is ignored.
        // if((this.boardCells[_2DIndex.column])[_2DIndex.row] !== undefined) return 'taken';

        // const cellColumn = this.boardCells[_2DIndex.column];
        // let cellCounter = 1;
        // let cellToDrop = cellColumn[cellColumn.length - cellCounter];
        // while(cellToDrop !== undefined){
            // cellCounter++;
            // if(cellCounter > 7) return 'taken' // (Whole column)
            // cellToDrop = cellColumn[cellColumn.length - cellCounter];
        // }
        // this.boardCells[index] = this.currentPlayer;
        // this.boardCells[_2DIndex.column][_2DIndex.row] = this.currentPlayer;
        // console.log(this.boardCells);
        // const cellDropIndex = this.indexTo1D({column: _2DIndex.column, row: cellCounter - 1});
        // Check tie
        if(this.checkDraw()) console.log("It's a draw");
        // Check win
        if(this.checkWin(this.currentPlayer)) console.log("It's a win");

        const playerBeforeSwitch = this.currentPlayer;
        this.switchPlayer();
        return {cell: cellToDropIndex, player: playerBeforeSwitch};
    }

    // indexTo2D(index){
    //     return {
    //         column: index%7,
    //         row: Math.floor(index/7)
    //     }
    // }
    // indexTo1D(index){
    //     return index.row + index.column;
    // }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === '🔴' ? '🟡' : '🔴';
    }

    /* * */checkDraw() {
        // for(let column of this.boardCells){
        //     for(let cell of column){
        //         if(cell !== undefined) return false
        //     }
        // }
        // return true;
        return this.boardCells.every(cell => cell !== undefined);
    }

    checkWin(player) {
    //     if(player === '🟡') return
    //     const playerCells = this.getPlayerCells(player);
    //     // const playerCells = this.boardCells.filter((cell,index) => cell === player);
    //     // playerCells now holds all index of the player in the board
    //     for(let cellIndex of playerCells){
    //         const testing = this.checkStreak('+1', cellIndex, player)
    //         if(testing) break;
    //     }
    //     /*playerCells.forEach(cellIndex => {
    //         // this.checkStreak(up)
    //         // this.checkStreak(up_right)
    //         // this.checkStreak(right, cellIndex, player)
    //         const testing = this.checkStreak('+1', cellIndex, player)
    //         console.log(testing)
    //         // this.checkStreak(down_right)
    //         // this.checkStreak(down)
    //         // this.checkStreak(down_left)
    //         // this.checkStreak(left)
    //         // this.checkStreak(up_left)
    //     })*/
    }

    // checkSequence(direction, cellIndex, player, sequence = 1) {
    //     if(sequence === 4) {
    //         return true;
    //     }
    //     // const checkCellIndex = `${cellIndex}${direction}`;
    //     const checkCellIndex = cellIndex + `${direction}`;
    //     const checkCell = this.boardCells[checkCellIndex];
    //     if(checkCell !== player){
    //             return false;
    //         }
    //     sequence++;
    //     return this.checkStreak(direction, checkCellIndex, player, sequence);
    // }

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
                    // const discData = handler(index); // Updates model array and returns current player
                    // if(discData === 'taken') return;
                    // cells[discData.cell].innerText = discData.player;
                    const discData = handler(index); // Updates model array and returns current player
                    if(discData === 'taken') return;
                    cells[discData.cell].innerText = discData.player;
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
