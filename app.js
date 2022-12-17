const gameBoard = (() => {
  const board = new Array(9).fill("");
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];
  const getGameBoard = () => [...board];

  const setCell = (position, marker) => {
    board[position] = marker;
  };

  const resetBoard = () => {
    board.fill("");
  };

  const checkForWin = (marker) =>
    winPatterns.find((winPattern) =>
      winPattern.every((element) => board[element].includes(marker))
    );

  return { getGameBoard, setCell, resetBoard, checkForWin };
})();

const displayController = (() => {
  const cells = Array.from(document.getElementsByClassName("cell"));
  const getCells = () => [...cells];

  const render = () => {
    cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getGameBoard()[index];
    });
  };

  const setWinningClasses = (array) => {
    array.forEach((item) => {
      cells[item].classList.add("win");
    });
  };

  return { render, getCells, setWinningClasses };
})();

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;

  const setName = (newName) => {
    name = newName;
  };

  const makeMove = (index) => {
    gameBoard.setCell(index, marker);
    displayController.render();
  };

  return { makeMove, getName, getMarker, setName };
};

const gameController = (() => {
  let gameOn = true;

  const player1 = Player("Player 1", "x");
  const player2 = Player("Player 2", "o");
  const cells = displayController.getCells();

  let currentPlayer = player1;
  const changeTurn = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const playRound = (cell, index) => {
    if (!cell.textContent) {
      currentPlayer.makeMove(index);
      const winPattern = gameBoard.checkForWin(currentPlayer.getMarker());
      if (winPattern) {
        displayController.setWinningClasses(winPattern);
        gameOn = false;
      }
      changeTurn();
    }
  };

  const playGame = () => {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameOn) {
          playRound(cell, index);
        }
      });
    });
  };

  return { playGame };
})();

gameController.playGame();
