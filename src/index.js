import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//https://stackoverflow.com/questions/34521797/how-to-add-multiple-classes-to-a-reactjs-component?page=1&tab=votes#tab-top
// en fait pas besoin, il suffit de concatener un string dans une variable
//var classNames = require('classnames');

// props veut dire quoi exactement ?

function Cell(props){

/*  var liClassNames = ({
    'cell': true,
    'alive': props.value,
    'dead': !props.value
  }) */

  const classNames = "cell " + (props.value ? 'alive' : 'dead')
  return(
    // self-closing tag possible ?
    // Oui en JSX on peut si y a pas d'enfants dans le tag
    <button className={classNames} onClick={props.onClick}/>
  );
}

//https://fr.reactjs.org/docs/jsx-in-depth.html#functions-as-children
/*function Repeat(props) {
  let items = [];
  const className = props.className;
  const numTimes = props.numTimes
  for (let i = 0; i<props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div className = {className} >{items}</div>;
}*/

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
      var cellsInRow = [];
      for (let cols = 0; cols < boardSize; cols++){
        //don't know if we could do a matrix representation easier
        //should work, return inside a loop don't seem a bad idea
        //1 return per render ?
        let index = rows.toString()+','+ cols.toString();
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
    const boardSize = 25
    this.state = {
      boardSize: boardSize,
      //two dimensionnal Array, cells[row][col]
      cells: Array(boardSize).fill(Array(boardSize).fill(false)),
    };
  }

  handleClick(props) {
    const cells = this.state.cells.slice();
    cells[props.row][props.col] = !cells[props.row][props.col]
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
