export default function Log({curTurn}){
    return(
        <div id="log">
            {curTurn.map((turn, i)=>(
                <li key={i} >Current Player {turn.player}, move on {turn.square.row} , {turn.square.col} </li>
            ))}
        </div>
    )
}