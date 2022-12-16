const gameBoard = (() => {
  const board = new Array(9).fill("");
  const getGameBoard = () => [...board];

  const setCell = (position, marker) => {
    board[position] = marker;
  };

  const resetBoard = () => {
    board.fill("");
  };

  return { getGameBoard, setCell, resetBoard };
})();

const displayController = (() => {
  const cells = Array.from(document.getElementsByClassName("cell"));
  const getCells = () => [...cells];

  const render = () => {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getGameBoard()[index];
    });
  };

  return { render, getCells };
})();

const Player = (marker) => {
  const getMarker = () => marker;

  const makeMove = (index) => {
    gameBoard.setCell(index, getMarker());
    displayController.render();
  };

  return { makeMove };
};

const gameController = (() => {
  const player1 = Player("x");
  const player2 = Player("o");

  let currentPlayer = player1;

  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  return { playGame };
})();
