import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    console.log("rowIndex, colIndex", rowIndex, colIndex)
    setGameBoard((prevGameBoard) => {
        const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
        updateBoard[rowIndex][colIndex] = activePlayerSymbol;
        return updateBoard;

    });
    
    onSelectSquare();
    
    // 문제점: 상태 직접 변경 - 리액트의 상태 불변성(immutability) 원칙을 위반
    // setGameBoard((prevGameBoard) => {
    //     prevGameBoard[rowIndex][colIndex] = "O";
    //     return prevGameBoard;
    // });

    // 리액트는 상태가 변경될 때만 리렌더링을 수행.
    // → 하지만 위 코드에서는 prevGameBoard를 직접 변경하고 같은 객체를 반환하기 때문에, 리액트는 상태가 변경되었다고 인식하지 않음.
    // → 따라서 컴포넌트가 리렌더링되지 않을 수 있음.

    // 불변성을 유지하지 않으면 예기치 않은 버그 발생 가능
    // → 상태를 직접 변경하면, 이전 상태와 새로운 상태가 같은 객체를 참조하게 되어 **원치 않는 부작용(side effects)**이 발생할 수 있음.
    //리액트의 상태는 직접 변경하지 말고, 항상 새로운 객체를 생성해야 함
    //불변성을 지키면 리액트가 변경을 감지하고 올바르게 리렌더링할 수 있음 
  }

  console.log("gameBoard", gameBoard)

  return (
    <>
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </>
  );
}
