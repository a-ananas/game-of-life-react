import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Cell(props){
  const classNames = "cell " + (props.value ? 'alive' : 'dead')
  return(
    // self-closing tag possible w/ JSX if no children
    <button className={classNames} onClick={props.onClick}/>
  );
}

//https://fr.reactjs.org/docs/jsx-in-depth.html#functions-as-children
class Board extends React.Component {

  renderCell(row, col, key) {
      return(
        <Cell
          value={this.props.cells[row][col]}
          onClick={() => this.props.onClick({row: row, col: col})}
          key={key}
        />
      );
  }

  render() {
    const boardSize = this.props.boardSize;
    let board = [];

    for (let rows = 0; rows < boardSize; rows++){
      let cellsInRow = [];
      for (let cols = 0; cols < boardSize; cols++){
        //should work, return inside a loop don't seem a bad idea
        const index = rows.toString()+','+ cols.toString();
        cellsInRow.push(
          this.renderCell(rows, cols, index)
        );
      }
      board.push(<div className="board-row" key={rows}>{cellsInRow}</div>);
    }
    return(
      <div className="board">
        {board}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    const boardSize = 10;
    // bug w/ Array(n).fill(Array(n).fill(true)) because all arrays are linked
    // cf : https://stackoverflow.com/questions/9979560/javascript-multidimensional-array-updating-specific-element
    let cells = [];
    for (let i = 0; i < boardSize; i++){
      cells[i] = new Array(boardSize).fill(false);
    }
    let neighbours = [];
    for (let i = 0; i < boardSize; i++){
      neighbours[i] = new Array(boardSize).fill(0);
    }
    this.state = {
      boardSize: boardSize,
      //two dimensionnal Array, cells[row][col]
      cells: cells,
      neighbours: neighbours,
    };
  }

  handleClick(props) {
    const row = props.row;
    const col = props.col;

    const cells = this.state.cells.slice();
    cells[row][col] = !(cells[row][col])

    const neighbours = this.state.neighbours.slice();
    const boardSize = this.state.boardSize;

  //add 1 to all the 8 neighbours on click ; w/ rules :
    //adding or substracting to neighbours depending on the cell status
    let neighb_val = 1;
    if (cells[row][col]){
      neighb_val = 1;
    } else {
      neighb_val = -1;
    }

    //limit handling
    let row_top, row_bot, col_left, col_right;
    row_top = row_bot = col_left = col_right = 1;

    if (row === 0) {
      row_top = 0;
    } else if (row === boardSize-1){
      row_bot = 0
    } else {}

    if (col === 0) {
      col_left = 0;
    } else if (col === boardSize-1){
      col_right = 0
    } else {}

    //actual loop, adding the neighbours values
    for(let j = row-row_top; j<=row+row_bot; j++){
      for(let i = col-col_left; i<=col+col_right; i++){
        if (i === col && j === row){
          neighbours[j][i] += 0;
        } else {
          neighbours[j][i] += neighb_val;
        }
      }
    }

    this.setState({
      cells: cells,
      neighbours: neighbours,
    });
  }

  render() {
    const cells = this.state.cells.slice();
    const boardSize = this.state.boardSize;
    console.table(this.state.neighbours);
    return(
      <div className="game">
        <div className="game-board">
          <Board
            cells={cells}
            boardSize={boardSize}
            onClick={(props) => this.handleClick(props)}
          />
        </div>
      </div>
    );
  }

}

//============

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
