import React from 'react';
function MultiplayerPopup ({ setShowMultiplayerPopup}) {
    const handleSelection = () => {
        setShowMultiplayerPopup(false);
    };

return (
    <div className="multiplayer-mode-popup">
        <h1>Choose multiplayer mode</h1>
        <button onClick={handleSelection}>Single Player</button>
        <button onClick={handleSelection}>Multiplayer</button>
    </div>
);
}
export default MultiplayerPopup;
