import {useState} from 'react';

export default function PlayerInfo({name, symbol, isActive}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setName] = useState(name);

    let currentPlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing === true){
        currentPlayerName = <input type="text" value={playerName} defaultValue={name} onChange={(e) => setName(e.target.value)} />
    }
    
    function handleEditClick(){
        let editingSituation = !isEditing;
        setIsEditing(editingSituation);
    }
    return (
        <div id="players">
            {currentPlayerName}
            <p>{symbol}</p>
            <button onClick={handleEditClick}>{isEditing === true ? "Save" : "Edit"}</button>
        </div>
    )
}