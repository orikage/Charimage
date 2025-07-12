import React from 'react';

const CharacterInfoSection = ({ name, plName }) => (
  <div className="character-info-section">
    <h1>{name}</h1>
    <p>PL: {plName}</p>
  </div>
);

export default CharacterInfoSection;
