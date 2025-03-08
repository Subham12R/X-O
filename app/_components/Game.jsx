'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for(let line of lines) {
    const [a,b,c] = line;
    if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares [a];
    }
  }
  return null;
};

const Game = () => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div>
        <div className='h-screen flex flex-col text-center items-center justify-center bg-zinc-900 text-zinc-900'>
        <div className='p-10 m-2 bg-white rounded-lg'>

          <h1 className='text-lg font-bold mb-5'>Tic-Tac-Toe Game</h1>
        <div className="grid grid-cols-3 gap-2">
            {board.map((value, index) =>(
              <Button key ={index} 
              className={`rounded-md w-16 h-16 bg-gray-200 text-xl font-bold flex justify-center items-center hover:bg-red-100
                ${value ? 'bg-red-600': 'bg-gray-200:bg-gray-300'}`}
              onClick={() => handleClick(index)}
              disabled = {winner || value}
              >
                {value}
              </Button>
              
            ))}
          </div>
          <p className='mt-4 text-lg font-semibold block'>
            {winner ? `Winner: ${winner}` : `Current Player : ${isXNext ? 'X' : 'O'}`}
          </p>
          
        </div>
        <Button className='bg-blue-500 p-6 transition transform duration-300 ease-in-out shadow-xl w-[285px] hover:bg-red-400 hover:scale-105' onClick={resetGame}>Reset</Button>

        </div>
    </div>
  )
}

export default Game;