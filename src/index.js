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
    this.state = {
      boardSize: boardSize,
      //two dimensionnal Array, cells[row][col]
      cells: cells,
    };
  }

  handleClick(props) {
    const cells = this.state.cells.slice();
    cells[props.row][props.col] = !(cells[props.row][props.col])
    this.setState({
      cells: cells,
    });
    //adding here 1 to the 8 neighbours on Click
  }

  render() {
    const cells = this.state.cells.slice();
    const boardSize = this.state.boardSize;
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
