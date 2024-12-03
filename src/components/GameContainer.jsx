import PlayerInfo from './PlayerInfo';
import GameBoard from './GameBoard';
import Log from './Log';
import GameResult from './GameResult';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from '../../setting/winning-combinations';


export default function GameContainer() {
    const [player, setPlayer] = useState({
        X : 'player1',
        O : 'player2'
    });

    const [gameTurn, setGameTurn] = useState([]);
    
    const activePlayer = deriveActivePlayer(gameTurn);

    const initialGameBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    let gameBoard = [...initialGameBoard.map(array => [...array])];
    // let gameBoard = initialGameBoard;
    // gameTurn.forEach(turn => {
    //     gameBoard[turn.square.row][turn.square.col] = turn.player;
    // });

    for(const turn of gameTurn){
        const {square, player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }

    function checkWinner(){
        let winner = null;
        WINNING_COMBINATIONS.forEach(combination =>{
            const [a, b, c] = combination;
            const valFirst = gameBoard[a.row][a.column];
            if(valFirst && valFirst === gameBoard[b.row][b.column] && valFirst === gameBoard[c.row][c.column] && valFirst !== null){
                winner = player[valFirst];
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
        setGameTurn([]);
    }
    function handleSelectSquare(rowIndex, colIndex){
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

    function handlePlayerNameChange(symbol, name){
        setPlayer((prevPlayer) => {
            return {
                ...prevPlayer,
                [symbol]: name
            }
        })
    }

    return (
        <>
            <div id="game-container">
                <ol id='players'>
                    <PlayerInfo name={player.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                    <PlayerInfo name={player.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
                </ol>
                {/* {(checkWinner() !== 'draw' || !checkWinner()) && <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />} */}
                <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
                <Log curTurn={gameTurn} />
                {checkWinner() && <GameResult winner={checkWinner()} resetGame={resetGame}></GameResult>}
            </div>
            {checkWinner() !== null && <div id="winner">{checkWinner()} wins!</div>}
        </>
    )
}