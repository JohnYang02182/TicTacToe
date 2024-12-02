
export default function GameBoard({onSelectSquare, gameBoard}) {


    return (
        <ol id="game-board">
            {gameBoard.map((row, i) =>  <li key={i}>
                <ol>
                    {row.map((cell, j) => (
                        <li key={`${i}-${j}`}><button onClick={()=> onSelectSquare(i,j)} disabled={gameBoard[i][j] !== null}>{cell}</button></li>
                    ))}
                </ol>
            </li>)}
        </ol>
    )
}