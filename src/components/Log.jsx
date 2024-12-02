export default function Log({curTurn}){
    return(
        <div id="log">
            <li>Current Player {curTurn[0].player} {curTurn[0].square.row} {curTurn[0].square.col}</li>
        </div>
    )
}