import {useState} from 'react';

export default function PlayerInfo({name, symbol, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setName] = useState(name);

    let currentPlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing === true){
        currentPlayerName = <input type="text" value={playerName} onChange={(e) => handleChangeName(e)} />
    }
    
    function handleChangeName(e){
        setName(e.target.value);
    }

    function handleEditClick(){
        let editingSituation = !isEditing;
        setIsEditing(editingSituation);
        if(editingSituation === false){
            onChangeName(symbol, playerName);
        }
    }
    return (
        <div id="players">
            {currentPlayerName}
            <p>{symbol}</p>
            <button onClick={handleEditClick}>{isEditing === true ? "Save" : "Edit"}</button>
        </div>
    )
}