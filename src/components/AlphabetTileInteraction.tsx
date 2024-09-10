import React, { useState } from 'react';

interface TileProps {
  letter: string;
  handleClick: (letter: string) => void;
}

const Tile: React.FC<TileProps> = ({ letter, handleClick }) => {
  return (
    <button onClick={() => handleClick(letter)} className="tile">
      {letter}
    </button>
  );
};

const AlphabetTiles: React.FC = () => {
  const [outputString, setOutputString] = useState('');

  const handleTileClick = (letter: string) => {
    const newString = outputString + letter;
    let replacedString = newString;

    // Check for consecutive letters and replace them with underscores
    for (let i = 0; i < newString.length - 2; i++) {
      if (newString[i] === newString[i + 1] && newString[i] === newString[i + 2]) {
        replacedString = newString.substring(0, i) + '_' + newString.substring(i + 3);
      }
    }

    setOutputString(replacedString);
  };

  return (
    <div>
      <div className="tile-container">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
          <Tile key={letter} letter={letter} handleClick={handleTileClick} />
        ))}
      </div>
      <p id="outputString">{outputString}</p>
    </div>
  );
};

export default AlphabetTiles;