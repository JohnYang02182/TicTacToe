export default function GameResult({ winner, resetGame }) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner !== 'draw' && <p>{winner} won</p>}
            {winner === 'draw' && <p>It&apos;s a draw!</p>}
            <button onClick={resetGame}>Play Again</button>
        </div>
    )
}