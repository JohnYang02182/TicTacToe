import PlayerInfo from './PlayerInfo';
import GameBoard from './GameBoard';
import Log from './Log';
import GameResult from './GameResult';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from '../../setting/winning-combinations';


export default function GameContainer() {

    const [gameTurn, setGameTurn] = useState([]);
    
    const activePlayer = deriveActivePlayer(gameTurn);

    const initialGameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    let gameBoard = initialGameBoard;

    gameTurn.forEach(turn => {
        gameBoard[turn.square.row][turn.square.col] = turn.player;
    })

    function checkWinner(){
        let winner = null;
        WINNING_COMBINATIONS.forEach(combination =>{
            const [a, b, c] = combination;
            const valFirst = gameBoard[a.row][a.column];
            if(valFirst && valFirst === gameBoard[b.row][b.column] && valFirst === gameBoard[c.row][c.column] && valFirst !== null){
                winner = valFirst;
            } else if(gameTurn.length === 9 && !winner){
                winner = 'draw';
            }
        })
        return winner;
    }

    function deriveActivePlayer(gameTurns){
        let curActivePlayer = 'X';
        if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
            curActivePlayer = 'O';
        }
        return curActivePlayer;
    }
    function resetGame(){
        gameBoard = initialGameBoard;
        setGameTurn([]);
    }
    function handleSelectSquare(rowIndex, colIndex){
        if(checkWinner()!== null){
            gameBoard = initialGameBoard;
            setGameTurn([]);
            return;
        }
        setGameTurn((prevTurns) => {
            let curActivePlayer = deriveActivePlayer(gameTurn);

            const undateTurns = [{
                square: {
                    row: rowIndex,
                    col: colIndex
                },
                player: curActivePlayer,
            }, ...prevTurns];

            return undateTurns;
        })
    }

    return (
        <>
            <div id="game-container">
                <ol id='players'>
                    <PlayerInfo name="player1" symbol="X" isActive={activePlayer === 'X'} />
                    <PlayerInfo name="player2" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                {(checkWinner() !== 'draw' || !checkWinner()) && <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />}
                <Log curTurn={gameTurn} />
                {checkWinner() && <GameResult winner={checkWinner()} resetGame={resetGame}></GameResult>}
            </div>
            {checkWinner() !== null && <div id="winner">{checkWinner()} wins!</div>}
        </>
    )
}