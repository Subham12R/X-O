'use client'
import React, { useEffect, useState } from 'react';
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
      return { winner: squares[a], line };
    }
  }
  return null;
};

const getCompMove = (board) => {
  const availableMoves = board 
  .map((value, index) =>(value === null ? index : null))
  .filter((value) => value != null);
  return availableMoves.length > 0 
  ? availableMoves[Math.floor(Math.random() * availableMoves.length)]
  : null;  
};

const Game = () => {
  

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const winnerData = calculateWinner(board);
  const winner = winnerData?.winner;
  const winningLine = winnerData?.line;

  useEffect(() => {
    if (isSinglePlayer && !isXNext && !winner) {
      const compMove = getCompMove(board);
      if(compMove !== null) {
        setTimeout(() => {
          const newBoard = [...board];
          newBoard[compMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }, 500);
      }
    }
  }, [isXNext, isSinglePlayer, board, winner]);


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
          <Button 
          onClick={() => setIsSinglePlayer(!isSinglePlayer)}
          className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {isSinglePlayer ? "Switch to Multiplayer" : "Play vs Computer"}
        </Button>
        <div className="grid grid-cols-3 gap-2">
            {board.map((value, index) =>(
              <Button key ={index} 
              className={`rounded-md w-16 h-16 text-xl font-bold flex justify-center items-center 
                ${winningLine?.includes(index) ? 'bg-green-500 text-white': 'bg-gray-200 text-zinc-900 hover:bg-gray-300'}`}
              onClick={() => handleClick(index)}
              disabled = {winner || value || (isSinglePlayer && !isXNext)}
              >
                {value}
              </Button>
              
            ))}
            
          </div>
          {isSinglePlayer ? 
          <p className='mt-4 text-lg font-semibold block'>
            {winner ? `Winner: ${winner === 'X' ? "Player" : "Computer"}` 
                    : `Current Player: ${isXNext ? 'Player' : 'Computer'}`}
          </p> 
          :  
          <p className='mt-4 text-lg font-semibold block'>
            {winner ? `Winner: ${winner}` 
                    : `Current Player: ${isXNext ? 'X' : 'O'}`}
          </p>
        }
                
          
        </div>
        <Button className='bg-blue-500 p-6 transition transform duration-300 ease-in-out shadow-xl w-[285px] hover:bg-red-400 hover:scale-105' onClick={resetGame}>Reset</Button>

        </div>
    </div>
  )
}

export default Game;