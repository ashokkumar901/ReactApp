import React from 'react';
import './App.css';
import $ from "jquery";
let calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      && squares[a] === squares[d]) {
      return squares[a];
    }
  }
  return null;
}

let Square = (props) => {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  globalIndex = [0];
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
      }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }
  handleClick(i) {
    this.globalIndex.push(i);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'P1' : 'P2';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }
  jumpTo(index, step) {
    $(index.target).css({
      'background-color': '#ccc'
    });
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }
  findPosition(element) {
    if (element === 0) return [1, 1]
    else if (element === 1) return [2, 1]
    else if (element === 2) return [3, 1]
    else if (element === 3) return [4, 1]
    else if (element === 4) return [1, 2]
    else if (element === 5) return [2, 2]
    else if (element === 6) return [3, 2]
    else if (element === 7) return [4, 2]
    else if (element === 8) return [1, 3]
    else if (element === 9) return [2, 3]
    else if (element === 10) return [3, 3]
    else if (element === 11) return [4, 3]
    else if (element === 12) return [1, 4]
    else if (element === 13) return [2, 4]
    else if (element === 14) return [3, 4]
    else if (element === 15) return [4, 4]
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move + ' position(' + this.findPosition(this.globalIndex[move]) + ')' :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={(index) => this.jumpTo(index, move)}>
            {desc}
          </button>
        </li>
      )
    })
    let status;
    if (winner) {
      if (winner === 'P1') {
        status = 'Winner: Player1';
      }
      else {
        status = 'Winner: Player2';
      }
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'Player1' : 'Player2');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <h3>Game rules:</h3>
          <ol>
            <li>This is a simple tictactoe game which can be played by two players.</li>
            <li>Player one needs to select a box followed by Player two.</li>
            <li>Each player needs to restrict the other player from selecting 4 boxes in order.</li>
            <li>Whoever manages to select the 4 boxes in order wins the game.</li>
            <li>In the below image, Player2 won the game because he managed to select the 4 boxes in order.</li>
            <img src={require("./demoimage.png")} alt="Demo" width="500" height="333"></img>
          </ol>

        </div>
      </div>
    );
  }
}

export default Game
